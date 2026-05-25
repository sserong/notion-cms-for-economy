# T020: 모니터링, 로깅 및 Notion API 복원력 강화

- **상태**: ⬜ 미시작
- **기능 ID**: 인프라
- **예상 소요시간**: 3h
- **Phase**: Phase 4 (운영 품질 및 배포)

## 고수준 명세서

운영 중 발생하는 트래픽과 오류를 관찰할 수 있도록 기초 모니터링/로깅 체계를 마련하고, Notion API 429(rate limit) 응답에 대한 retry + exponential backoff 로직을 추가합니다.

**세 가지 목표:**

1. **Vercel Analytics** — 방문 지표 수집
2. **구조화 로그** — Notion API 호출 실패를 식별 가능한 포맷으로 기록
3. **429 Retry 복원력** — Notion API rate limit 초과 시 자동 재시도로 사용자 노출 최소화

> Notion API는 초당 3회 제한이 있으며, 빌드 타임 `generateStaticParams` 병렬 호출이나 캐시 미스 동시 발생 시 429를 받을 수 있습니다. 현재 코드는 429를 그냥 throw하여 페이지 에러로 노출됩니다.

### 현재 상태 (작업 전)

- `src/lib/notion.ts`: 5개 함수의 catch에서 `console.error` 단순 출력 후 에러 rethrow
- 429 응답 시 retry 없이 즉시 throw → 사용자에게 에러 페이지 노출
- `@vercel/analytics` 미설치, `<Analytics />` 미적용
- 이슈 백로그 템플릿 부재

### Retry 전략 (설계)

```
최대 3회 재시도 / 초기 대기 1초 / 2배 exponential backoff
시도 1 실패(429) → 1초 대기 → 시도 2 실패(429) → 2초 대기 → 시도 3
3회 모두 실패 시 → 구조화 로그 기록 후 throw
```

429 이외의 에러(401, 404 등)는 retry 없이 즉시 throw합니다.

## 관련 파일

- `package.json` — `@vercel/analytics` 의존성 추가
- `src/app/layout.tsx` — `<Analytics />` 컴포넌트 추가
- `src/lib/notion.ts` — 5개 함수에 `withRetry` 래퍼 적용, catch 블록 구조화 로그로 개선
- `src/lib/notion-retry.ts` — **신규 생성**: 429 retry + exponential backoff 헬퍼
- `src/lib/logger.ts` — **신규 생성**: 구조화 로그 헬퍼 (timestamp, endpoint, code, message)
- `docs/issue-template.md` — **신규 생성**: 운영 이슈 백로그 템플릿

## 수락 기준

- [ ] `@vercel/analytics`가 설치되고 `src/app/layout.tsx`에 `<Analytics />`가 추가된다
- [ ] `src/lib/notion-retry.ts`에 429 전용 retry + exponential backoff 헬퍼가 구현된다
  - 최대 3회 재시도, 초기 1초·2배 backoff
  - 429 이외 에러는 즉시 throw
- [ ] `src/lib/notion.ts`의 5개 함수가 `withRetry`로 래핑되어 429 시 자동 재시도한다
- [ ] 모든 API 호출 실패 로그가 `timestamp`, `endpoint`, `statusCode`, `message`를 포함한 구조화 포맷으로 기록된다
- [ ] `docs/issue-template.md`에 이슈 백로그 템플릿이 작성된다
- [ ] `npm run build` 성공, `npm run check-all` 통과

## 구현 단계

- [ ] 1단계: `@vercel/analytics` 설치 및 적용
  - `npm install @vercel/analytics`
  - `src/app/layout.tsx`에 `import { Analytics } from '@vercel/analytics/next'` 추가 후 `<body>` 내부 배치
- [ ] 2단계: `src/lib/logger.ts` 구조화 로그 헬퍼 작성
  - 입력: `{ endpoint: string, error: unknown }` → `console.error`로 `{ timestamp, endpoint, statusCode, code, message }` 직렬화
  - `@notionhq/client`의 `APIResponseError` 타입 가드로 `status`/`code` 안전 추출
- [ ] 3단계: `src/lib/notion-retry.ts` retry 헬퍼 작성

  ```ts
  // 구현 참고 스케치
  async function withRetry<T>(
    fn: () => Promise<T>,
    { maxRetries = 3, baseDelayMs = 1000, endpoint = 'unknown' } = {}
  ): Promise<T> {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await fn()
      } catch (error) {
        const is429 = error instanceof APIResponseError && error.status === 429
        if (!is429 || attempt === maxRetries - 1) throw error
        const delay = baseDelayMs * 2 ** attempt
        // 재시도 전 구조화 로그 기록
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
    throw new Error('unreachable')
  }
  ```

- [ ] 4단계: `src/lib/notion.ts` 5개 함수에 `withRetry` 적용
  - `getPosts`, `getPostsByCategory`, `getPostById`, `getPostBlocks`, `getStocks`의 핵심 API 호출을 `withRetry(() => notion.xxx(...))` 로 래핑
  - 기존 catch 블록은 구조화 로그(2단계 헬퍼)로 교체 후 throw 유지
- [ ] 5단계: `docs/issue-template.md` 작성
  - 섹션: 제목 / 심각도(P0~P3) / 발생 환경 / 재현 절차 / 기대 동작 / 실제 동작 / 관련 로그 / 대응 방안 / 상태
- [ ] 6단계: 빌드 및 검증 (아래 "## 테스트 체크리스트" 수행)

## 테스트 체크리스트 (Playwright MCP)

> Analytics 로드, 구조화 로그, retry 동작을 검증합니다.

- [ ] `browser_navigate`로 홈(`/`) 접속 후 `browser_network_requests`로 Vercel Analytics 스크립트(`/_vercel/insights/...`) 요청 발생 확인 (프로덕션/프리뷰 환경)
- [ ] `browser_console_messages`로 정상 페이지에서 콘솔 에러 0건 확인
- [ ] 존재하지 않는 글 ID로 `/posts/<무효 ID>` 접속 → 404 정상 처리 및 서버 로그에 `timestamp`·`endpoint`·`statusCode`를 포함한 구조화 로그 1건 기록 확인
- [ ] 구조화 로그가 JSON 또는 일관된 key=value 포맷으로 파싱 가능한지 확인
- [ ] `docs/issue-template.md`의 "관련 로그" 섹션에 구조화 로그 샘플 붙여넣기로 템플릿 사용성 검증
- [ ] `browser_console_messages`로 Analytics 추가 후 콘솔 경고/에러 증가 없음 확인
- [ ] (선택, 수동) Notion API key를 의도적으로 잘못된 값으로 교체 후 `npm run dev` 실행 → 서버 로그에 retry 3회 후 구조화 에러 로그가 기록되는지 확인

## 변경 사항 요약

<!-- 작업 완료 후 작성 -->
