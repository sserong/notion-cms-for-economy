# T019: Vercel 배포 및 운영 설정

- **상태**: ⬜ 미시작
- **기능 ID**: 인프라
- **예상 소요시간**: 3h
- **Phase**: Phase 4 (운영 품질 및 배포)

## 고수준 명세서

로컬에서 검증된 애플리케이션을 Vercel에 배포하여 실서비스 환경을 구성합니다. GitHub 연동을 통한 프리뷰/프로덕션 자동 배포 워크플로우를 확립하고, 배포된 실제 도메인에서 핵심 사용자 플로우를 Playwright MCP로 재검증합니다.

> 환경 변수는 로컬 `.env.local`에만 존재하므로, Vercel 프로젝트에 동일한 3개 변수를 등록하는 것이 핵심입니다. `src/lib/env.ts`가 빌드/런타임에 누락된 변수를 Zod로 검증하여 실패하므로, 변수 누락 시 배포 빌드가 실패함에 유의합니다.

### 등록 대상 환경 변수 (3개)

| 변수명                      | 설명                         | 적용 환경                        |
| --------------------------- | ---------------------------- | -------------------------------- |
| `NOTION_API_KEY`            | Notion Integration 시크릿 키 | Production, Preview, Development |
| `NOTION_DATABASE_ID`        | 뉴스 데이터베이스 ID         | Production, Preview, Development |
| `NOTION_STOCKS_DATABASE_ID` | 종목 추천 데이터베이스 ID    | Production, Preview, Development |

> (선택) `NEXT_PUBLIC_APP_URL`을 프로덕션 도메인으로 등록하면 T018의 `metadataBase`/sitemap이 올바른 절대 URL을 생성합니다.

## 관련 파일

- `next.config.ts` — 빌드 설정 확인 (변경 없이 그대로 배포 가능한지 점검)
- `package.json` — `build`/`start` 스크립트 확인 (`next build --turbopack`)
- `src/lib/env.ts` — 배포 환경에서 검증되는 필수 env 변수 확인
- `.env.local.example` — Vercel에 등록할 변수 목록의 기준 문서
- `README.md` — 배포 절차 및 환경 변수 안내 추가
- (신규 가능) `vercel.json` — 필요 시 리전/빌드 설정 (기본값으로 충분하면 생성하지 않음)

## 수락 기준

- [ ] Vercel 프로젝트가 GitHub 저장소(`main` 브랜치)와 연결된다
- [ ] 환경 변수 3개(`NOTION_API_KEY`, `NOTION_DATABASE_ID`, `NOTION_STOCKS_DATABASE_ID`)가 Production/Preview에 등록된다
- [ ] `main` 브랜치 푸시 시 프로덕션 배포가 성공한다
- [ ] PR 생성 시 프리뷰 배포가 자동 생성되어 고유 URL이 발급된다
- [ ] 프로덕션 배포 빌드 로그에 env 검증 에러가 없다
- [ ] 배포된 도메인에서 홈/카테고리/검색/글 상세/종목 핵심 플로우가 정상 동작한다
- [ ] `README.md`에 배포 절차와 환경 변수 안내가 추가된다

## 구현 단계

- [ ] 1단계: Vercel 프로젝트 연결
  - GitHub 연동(권장) 또는 Vercel CLI(`vercel link`)로 프로젝트 연결
  - Framework Preset이 Next.js로 자동 감지되는지 확인
- [ ] 2단계: 환경 변수 등록
  - 대시보드 Settings > Environment Variables에서 3개 변수 등록
  - Production/Preview/Development 환경 모두 체크
  - (선택) `NEXT_PUBLIC_APP_URL`에 프로덕션 도메인 등록
- [ ] 3단계: 프로덕션 배포 검증
  - `main` 브랜치 배포 트리거 → 빌드 로그에서 env 검증 통과 및 정적 생성 확인
  - 배포 완료 후 프로덕션 URL 접속 확인
- [ ] 4단계: 프리뷰 배포 워크플로우 검증
  - 임의 브랜치/PR 생성 → 프리뷰 배포 URL 자동 발급 확인
  - 프리뷰 URL에서 페이지 정상 렌더링 확인
- [x] 5단계: `README.md` 업데이트
  - 배포 절차, 환경 변수 등록 방법, 도메인 정보 추가
- [ ] 6단계: 배포 도메인 재검증 (아래 "## 테스트 체크리스트" 수행)

### Vercel 연결 참고 명령어 (CLI 사용 시)

```bash
# Vercel CLI 설치 및 로그인
npm i -g vercel
vercel login

# 프로젝트 연결 (대화형)
vercel link

# 환경 변수 추가 (예시 — 실제 값은 비공개로 입력)
vercel env add NOTION_API_KEY production
vercel env add NOTION_DATABASE_ID production
vercel env add NOTION_STOCKS_DATABASE_ID production

# 프로덕션 배포
vercel --prod
```

## 테스트 체크리스트 (Playwright MCP)

> 로컬이 아닌 **실제 배포된 도메인**(프로덕션 또는 프리뷰 URL)을 대상으로 핵심 사용자 플로우를 재검증합니다. `browser_navigate`의 대상 URL을 배포 도메인으로 지정합니다.

- [ ] `browser_navigate`로 배포 도메인 홈(`https://<도메인>/`) 접속 → 글 카드 그리드 정상 렌더링
- [ ] `browser_click`으로 카테고리 탭 클릭(예: 주식) → `/category/주식` 라우팅 및 필터링 동작 확인
- [ ] `browser_type`으로 검색바에 키워드 입력 → 클라이언트 사이드 제목 필터링 동작 확인
- [ ] `browser_click`으로 글 카드 클릭 → 글 상세 페이지 메타·본문·이미지 정상 렌더링
- [ ] `browser_navigate`로 종목 페이지(`/stocks`) 접속 → 종목 카드 정상 렌더링
- [ ] 잘못된 포스트 ID / 유효하지 않은 카테고리 접속 → 404 정상 처리 확인
- [ ] 모바일 viewport(`browser_resize` 390×844)에서 햄버거 메뉴 → 카테고리 → 글 상세 플로우 확인
- [ ] `browser_console_messages`로 배포 도메인 전 페이지 콘솔 에러 0건 확인
- [ ] `browser_network_requests`로 Notion API 데이터가 정상 응답(200)하는지 확인

## 변경 사항 요약

<!-- 작업 완료 후 작성 -->
