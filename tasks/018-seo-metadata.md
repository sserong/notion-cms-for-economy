# T018: SEO 및 메타데이터 최적화

- **상태**: ✅ 완료
- **기능 ID**: 인프라
- **예상 소요시간**: 3h
- **Phase**: Phase 4 (운영 품질 및 배포)

## 고수준 명세서

검색엔진 노출과 SNS 공유 미리보기 품질을 높이기 위해 페이지별 동적 메타데이터, 사이트맵, robots, 구조화 데이터(JSON-LD)를 추가합니다. 이미 존재하는 기본 메타데이터 위에 **동적 OG/description 보강 + 크롤링 자산(sitemap/robots) + Article 스키마**를 더하는 작업입니다.

> 이미 `src/app/layout.tsx`에 기본 `metadata`(title template, description, Open Graph, Twitter Card), `lang="ko"`가 설정되어 있습니다. 또한 `src/app/posts/[id]/page.tsx`에는 `generateMetadata`가 title/description까지, `src/app/category/[name]/page.tsx`에는 `generateMetadata`가 title/description까지 이미 구현되어 있습니다. 이번 작업은 **OG 필드 보강, sitemap/robots 신규 생성, JSON-LD 추가**가 핵심입니다.

### 현재 상태 (작업 전)

- `layout.tsx`: 기본 metadata 존재, 단 `metadataBase` 미설정 (절대 OG URL 생성을 위해 필요)
- `posts/[id]/page.tsx`: `generateMetadata`가 `{ title, description }`까지만 반환 (OG 미보강)
- `category/[name]/page.tsx`: `generateMetadata`가 `{ title, description }`까지만 반환 (OG 미보강)
- `sitemap.ts`, `robots.ts` 부재
- JSON-LD 구조화 데이터 부재

## 관련 파일

- `src/app/layout.tsx` — `metadata.metadataBase` 추가 (절대 URL 기준점)
- `src/app/posts/[id]/page.tsx` — `generateMetadata`에 `openGraph`(글 제목·요약) 보강, JSON-LD `Article` 스크립트 삽입
- `src/app/category/[name]/page.tsx` — `generateMetadata`에 `openGraph`(카테고리명) 보강
- `src/app/sitemap.ts` — **신규 생성**: 정적 페이지 + 동적 포스트 URL
- `src/app/robots.ts` — **신규 생성**: 크롤링 허용 및 sitemap 위치 지정
- `src/lib/notion.ts` — sitemap에서 사용할 글 목록(`getPosts`) 재사용
- `src/lib/env.ts` — `NEXT_PUBLIC_APP_URL` / `VERCEL_URL`로 base URL 결정 (이미 선택 env로 정의됨)
- `src/lib/categories.ts` — sitemap의 카테고리 경로 생성에 재사용

## 수락 기준

- [x] `src/app/layout.tsx`에 `metadataBase`가 설정되어 OG 이미지/URL이 절대 경로로 생성된다
- [x] `src/app/posts/[id]/page.tsx`의 `generateMetadata`가 글 제목을 OG title로, 요약을 OG description으로 설정한다
- [x] `src/app/category/[name]/page.tsx`의 `generateMetadata`가 카테고리명을 title/OG에 포함한다
- [x] `src/app/sitemap.ts`가 정적 페이지(홈, 종목, 4개 카테고리)와 동적 포스트 URL을 모두 포함한다
- [x] `src/app/robots.ts`가 검색엔진 크롤링을 허용하고 sitemap 위치를 명시한다
- [x] 글 상세 페이지에 JSON-LD `Article` 구조화 데이터가 삽입된다 (제목, 발행일, 작성자/발행처)
- [x] `npm run build` 성공, `npm run check-all` 통과
- [x] `/sitemap.xml`, `/robots.txt`가 정상 응답한다 (빌드 출력에서 확인됨)

## 구현 단계

- [x] 1단계: base URL 결정 헬퍼 정리
  - `NEXT_PUBLIC_APP_URL`(우선) → `VERCEL_URL`(https 접두 보강) → 로컬 `http://localhost:3000` 순서의 fallback 헬퍼 작성/확인
- [x] 2단계: `src/app/layout.tsx`에 `metadataBase` 추가
  - 1단계 base URL을 `new URL(...)`로 설정
- [x] 3단계: `src/app/posts/[id]/page.tsx` `generateMetadata` OG 보강
  - `openGraph: { type: 'article', title, description, publishedTime }` 추가
  - 기존 `{ title, description }` 반환 형태 유지하며 확장
- [x] 4단계: `src/app/category/[name]/page.tsx` `generateMetadata` OG 보강
  - `openGraph: { title: '카테고리명 | ...', description }` 추가
- [x] 5단계: `src/app/sitemap.ts` 신규 생성
  - 정적 경로: `/`, `/stocks`, `/category/{4개}` (카테고리는 `src/lib/categories.ts` 재사용)
  - 동적 경로: `getPosts()`로 발행된 글의 `/posts/[id]` URL 생성, `lastModified`에 발행일 매핑
- [x] 6단계: `src/app/robots.ts` 신규 생성
  - `rules: { userAgent: '*', allow: '/' }`, `sitemap: '{baseUrl}/sitemap.xml'`
- [x] 7단계: 글 상세 페이지에 JSON-LD `Article` 삽입
  - `<script type="application/ld+json">`로 `@type: Article` (headline, datePublished, author/publisher, mainEntityOfPage) 삽입
- [x] 8단계: 빌드 및 검증 (`npm run check-all` 통과, `npm run build` 성공)

## 테스트 체크리스트 (Playwright MCP)

> 동적 메타데이터·sitemap·robots·JSON-LD가 실제로 HTML에 올바르게 출력되는지 검증합니다.

- [ ] `browser_navigate`로 글 상세(`/posts/[유효 ID]`) 접속 후 `browser_evaluate`로 `document.querySelector('meta[property="og:title"]')?.content`가 글 제목과 일치하는지 확인
- [ ] `browser_evaluate`로 `meta[property="og:description"]`이 글 요약과 일치하는지 확인
- [ ] `browser_evaluate`로 `script[type="application/ld+json"]` 존재 및 파싱 시 `@type === 'Article'`, `headline`이 글 제목과 일치하는지 확인
- [ ] `browser_navigate`로 카테고리(`/category/주식`) 접속 후 `<title>`에 카테고리명이 포함되는지 확인
- [ ] `browser_navigate`로 `/sitemap.xml` 접속 → 홈/종목/4개 카테고리/포스트 URL이 포함되고, 응답이 유효한 XML인지 확인
- [ ] `browser_navigate`로 `/robots.txt` 접속 → `Allow: /` 및 `Sitemap:` 라인 포함 확인
- [ ] `browser_evaluate`로 OG title의 절대 URL(`metadataBase` 적용) 정상 생성 확인
- [ ] `browser_console_messages`로 콘솔 에러 0건 확인

## 변경 사항 요약

### 신규 생성 파일

- `src/lib/site.ts`: base URL 헬퍼(`getBaseUrl`)와 `siteConfig` 상수 정의. 환경변수 우선순위 — `NEXT_PUBLIC_APP_URL` → `VERCEL_URL`(https 접두) → `http://localhost:3000`
- `src/app/sitemap.ts`: `/sitemap.xml` 자동 생성. 정적 경로(홈, 종목, 4개 카테고리) + Notion API로 가져온 동적 포스트 URL 포함. API 오류 시 정적 경로만 반환하는 try-catch 처리
- `src/app/robots.ts`: `/robots.txt` 자동 생성. 전체 크롤러 허용 + sitemap 위치 명시

### 수정 파일

- `src/app/layout.tsx`: `metadataBase: new URL(getBaseUrl())` 추가 — OG 이미지/URL의 절대경로 생성을 위한 기준점 설정
- `src/app/posts/[id]/page.tsx`:
  - `generateMetadata`에 `openGraph: { type: 'article', title, description, publishedTime, url }` 추가
  - 페이지 컴포넌트에 JSON-LD Article 구조화 데이터 삽입 (`<script type="application/ld+json">`)
- `src/app/category/[name]/page.tsx`: `generateMetadata`에 `openGraph: { title: '카테고리명 | 사이트명', description }` 추가

### 빌드 결과

- `npm run check-all`: 통과 (typecheck, lint, format 모두 정상)
- `npm run build`: 성공 — `/robots.txt`, `/sitemap.xml` 라우트가 빌드 출력에서 정상 확인됨
