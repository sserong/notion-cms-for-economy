# T017: 성능 최적화 및 캐싱 전략

- **상태**: ✅ 완료 (2026-05-25)
- **기능 ID**: 인프라
- **예상 소요시간**: 4h
- **Phase**: Phase 4 (운영 품질 및 배포)

## 고수준 명세서

Phase 3에서 실제 Notion API 연동까지 완료된 상태에서, 빌드 타임 정적 생성과 캐싱 전략을 강화하여 Notion API 요청을 절감하고 사용자 체감 속도를 끌어올립니다. Lighthouse 성능 점수 90+ 달성을 목표로 합니다.

> 이미 `next.config.ts`에 `compress: true`, `images.formats: ['image/webp', 'image/avif']`, `images.remotePatterns`, `experimental.optimizePackageImports: ['lucide-react']`가 설정되어 있으므로, 이번 작업은 **그 위에 추가로 필요한 정적 생성 / 캐싱 / 이미지 sizes 최적화**에만 집중합니다.

### 현재 상태 (작업 전)

- 홈(`src/app/page.tsx`): `revalidate = 60`
- 카테고리(`src/app/category/[name]/page.tsx`): `revalidate = 60`
- 글 상세(`src/app/posts/[id]/page.tsx`): `revalidate = 3600`
- 종목(`src/app/stocks/page.tsx`): `revalidate = 3600`
- `generateStaticParams` 미적용 (모든 동적 라우트가 요청 시점에 렌더링됨)
- 카드 그리드 이미지에 `sizes` 속성 미적용

## 관련 파일

- `src/app/posts/[id]/page.tsx` — `generateStaticParams` 추가, `revalidate` 조정
- `src/app/category/[name]/page.tsx` — `generateStaticParams` 추가(고정 카테고리 4종), `revalidate` 조정
- `src/app/page.tsx` — `revalidate` 조정 검토
- `src/components/post/notion-block-renderer.tsx` — 이미지 블록 `next/image`에 `sizes` 속성 추가
- `src/components/post/post-card.tsx` — 썸네일 이미지가 있을 경우 `sizes` 적용 (현재 카드에는 이미지 미사용, 확인만)
- `src/lib/categories.ts` — `generateStaticParams`에서 카테고리 목록 재사용
- `src/lib/notion.ts` — 정적 생성에 필요한 ID 목록 조회 함수 검토(`getPosts` 재사용)
- `next.config.ts` — 추가 최적화 옵션 필요 시 검토 (기존 설정은 유지)

## 수락 기준

- [x] `src/app/category/[name]/page.tsx`에 `generateStaticParams`가 추가되어 4개 카테고리(주식/부동산/거시경제/기업·산업)가 빌드 타임에 정적 생성된다
- [x] `src/app/posts/[id]/page.tsx`에 `generateStaticParams`가 추가되어 발행된 글이 빌드 타임에 정적 생성되고, 신규 글은 ISR(`revalidate`)로 반영된다
- [x] `revalidate` 값이 Notion API 요청 절감 관점에서 재검토되어, 홈/카테고리가 600초 등 적절한 값으로 상향된다 (변경 사유를 주석으로 명시)
- [x] 카드 그리드 및 본문 이미지의 `next/image`에 반응형 `sizes` 속성이 적용된다
- [x] `npm run build` 성공, `npm run check-all` 통과
- [ ] Lighthouse 성능 점수 90+ 달성 (Performance 카테고리 기준)

## 구현 단계

- [x] 1단계: `src/app/category/[name]/page.tsx`에 `generateStaticParams` 추가
  - `src/lib/categories.ts`의 카테고리 상수를 재사용하여 4개 카테고리 경로 반환
  - 한글 카테고리명이므로 `encodeURIComponent` 처리 일관성 확인
- [x] 2단계: `src/app/posts/[id]/page.tsx`에 `generateStaticParams` 추가
  - `getPosts()`로 발행된 글 ID 목록을 조회하여 `{ id }[]` 반환
  - 빌드 타임에 존재하지 않던 신규 글은 첫 요청 시 생성되도록 ISR 동작 확인
- [x] 3단계: `revalidate` 전략 재검토 및 조정
  - 홈/카테고리: 60초 → 600초 상향 검토 (Notion API 요청 빈도 절감)
  - 종목: 3600초 유지 적절성 확인
  - 각 값에 대한 근거를 주석으로 기록
- [x] 4단계: 이미지 `sizes` 속성 최적화
  - `notion-block-renderer.tsx`의 본문 이미지에 뷰포트 대응 `sizes` 추가
  - 카드 그리드(1열/2열/3열)에 이미지가 노출되는 경우 그리드 컬럼 기준 `sizes` 적용
- [x] 5단계: 빌드 및 검증
  - `npm run build`로 정적 생성 페이지 수 확인 (빌드 로그의 ● / ○ 표기 점검)
  - `npm run check-all` 통과 확인
- [ ] 6단계: Lighthouse 측정 (아래 "## 테스트 체크리스트" 수행)

### Lighthouse 로컬 실행 방법 가이드

```bash
# 1. 프로덕션 빌드 후 실행 (개발 서버가 아닌 프로덕션 모드에서 측정해야 정확함)
npm run build
npm run start          # 기본 http://localhost:3000

# 2-A. Chrome DevTools > Lighthouse 탭에서 측정 (가장 간단)
#   - Mode: Navigation, Device: Mobile/Desktop 각각 측정

# 2-B. CLI로 측정 (선택)
npx lighthouse http://localhost:3000 --view --preset=desktop
npx lighthouse http://localhost:3000/stocks --view
```

## 테스트 체크리스트 (Playwright MCP)

> 정적 생성 및 캐싱 변경이 실제 페이지 렌더링과 데이터 표시에 영향을 주지 않는지 검증합니다. 프로덕션 빌드(`npm run build && npm run start`) 환경에서 측정합니다.

- [ ] `browser_navigate`로 홈(`/`) 접속 → 글 카드 그리드 정상 렌더링, 콘솔 에러 0건
- [ ] `browser_navigate`로 카테고리 페이지(예: `/category/주식`) 접속 → 정적 생성된 페이지가 정상 표시되고 글 목록 렌더링
- [ ] `browser_navigate`로 글 상세(`/posts/[유효 ID]`) 접속 → 메타·본문·이미지 블록 정상 렌더링
- [ ] 본문 이미지가 `next/image`를 통해 webp/avif 포맷으로 응답되는지 `browser_network_requests`로 확인
- [ ] `browser_navigate`로 종목 페이지(`/stocks`) 접속 → 종목 카드 정상 렌더링
- [ ] `browser_console_messages`로 전 페이지 콘솔 에러/경고 0건 확인
- [ ] Lighthouse Performance 점수 90+ 달성 결과 기록 (모바일/데스크톱)

## 변경 사항 요약

### 변경 파일 목록

| 파일                                            | 변경 내용                                                                                                     |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `src/app/page.tsx`                              | `revalidate` 60 → 600 (10분, Notion API 요청 절감)                                                            |
| `src/app/category/[name]/page.tsx`              | `generateStaticParams` 추가 (4개 카테고리 빌드 타임 정적 생성), `revalidate` 60 → 600                         |
| `src/app/posts/[id]/page.tsx`                   | `generateStaticParams` 추가 (발행된 글 빌드 타임 정적 생성, 오류 시 빈 배열 fallback), `revalidate` 3600 유지 |
| `src/components/post/notion-block-renderer.tsx` | 이미지 블록 `<img>` → `next/image` 교체, `sizes` 반응형 속성 추가                                             |

### 빌드 결과 확인

```
Route (app)                              Revalidate
┌ ○ /                                       10m ← 60s에서 상향
├ ● /category/[name]                        10m ← generateStaticParams 추가, 60s에서 상향
├   ├ /category/%EC%A3%BC%EC%8B%9D          (주식)
├   ├ /category/%EB%B6%80%EB%8F%99%EC%82%B0 (부동산)
├   ├ /category/%EA%B1%B0%EC%8B%9C%EA%B2%BD%EC%A0%9C (거시경제)
├   └ /category/%EA%B8%B0%EC%97%85%C2%B7%EC%82%B0%EC%97%85 (기업·산업)
├ ● /posts/[id]                              1h ← generateStaticParams 추가
└ ○ /stocks                                  1h
```

- `npm run check-all` 통과 (typecheck, lint, format 모두 통과)
- `npm run build` 성공
- Lighthouse 측정은 배포 후 별도 수행 예정
