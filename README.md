# 오늘의 경제뉴스 겟 블로그

Notion을 CMS로 활용한 경제뉴스 블로그입니다. Notion에서 글을 작성하면 자동으로 블로그에 반영됩니다.

## 기술 스택

- **Framework**: Next.js 15.5.3 (App Router + Turbopack)
- **Language**: TypeScript 5
- **CMS**: Notion API (`@notionhq/client`)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Icons**: Lucide React
- **Deployment**: Vercel

## 주요 기능

- Notion 뉴스 데이터베이스에서 블로그 글 목록 자동 동기화 (ISR 10분)
- 개별 글 상세 페이지 (Notion 블록 렌더링, ISR 1시간)
- 카테고리별 필터링 (주식 / 부동산 / 거시경제 / 기업·산업)
- 제목 실시간 검색 (클라이언트 사이드)
- 오늘의 추천종목 페이지 (Notion 종목 DB 연동)
- 반응형 디자인 (모바일 / 태블릿 / 데스크톱)

## 시작하기

### 1. Notion Integration 설정

1. [Notion My Integrations](https://www.notion.so/my-integrations)에서 새 Integration 생성
2. Integration 시크릿 키 복사 → `NOTION_API_KEY`에 사용
3. 뉴스 데이터베이스와 종목 데이터베이스 각각에 Integration 연결 권한 부여

### 2. 환경 변수 설정

`.env.local.example`을 복사하여 `.env.local`을 생성하고 실제 값을 입력합니다.

```bash
cp .env.local.example .env.local
```

| 변수명                      | 필수 여부 | 설명                             |
| --------------------------- | --------- | -------------------------------- |
| `NOTION_API_KEY`            | 필수      | Notion Integration 시크릿 키     |
| `NOTION_DATABASE_ID`        | 필수      | 뉴스 데이터베이스 ID             |
| `NOTION_STOCKS_DATABASE_ID` | 필수      | 추천종목 데이터베이스 ID         |
| `NEXT_PUBLIC_APP_URL`       | 선택      | 배포 도메인 (예: https://my.com) |

> **주의**: 필수 환경 변수가 누락된 경우 서버 시작 및 빌드 시 Zod 검증 에러가 발생합니다.

### 3. Notion 데이터베이스 스키마

**뉴스 데이터베이스**

| 필드명     | Notion 타입  | 설명                           |
| ---------- | ------------ | ------------------------------ |
| Title      | title        | 글 제목                        |
| Category   | select       | 주식/부동산/거시경제/기업·산업 |
| Tags       | multi_select | 태그 목록                      |
| Published  | date         | 발행일                         |
| Status     | select       | 초안 / 발행됨                  |
| NewsLink   | url          | 원본 뉴스 URL                  |
| Stock1Name | rich_text    | 관련 종목 1 이름               |
| Stock1Code | rich_text    | 관련 종목 1 코드               |
| Stock2Name | rich_text    | 관련 종목 2 이름               |
| Stock2Code | rich_text    | 관련 종목 2 코드               |
| Stock3Name | rich_text    | 관련 종목 3 이름               |
| Stock3Code | rich_text    | 관련 종목 3 코드               |

**추천종목 데이터베이스**

| 필드명   | Notion 타입 | 설명                  |
| -------- | ----------- | --------------------- |
| Name     | title       | 종목명                |
| Code     | rich_text   | 종목코드 (예: 005930) |
| Sector   | select      | 업종                  |
| Date     | date        | 추천일                |
| Status   | select      | 활성 / 비활성         |
| Reason   | rich_text   | 추천 이유             |
| NewsLink | url         | 관련 뉴스 링크        |

### 4. 개발 서버 실행

```bash
npm install
npm run dev     # http://localhost:3000
```

### 5. 빌드 및 검사

```bash
npm run check-all   # typecheck + lint + format 통합 검사
npm run build       # 프로덕션 빌드
npm run start       # 프로덕션 서버 실행
```

## Vercel 배포

### GitHub 연동 배포 (권장)

1. [vercel.com](https://vercel.com)에서 GitHub 저장소를 Import
2. **Settings > Environment Variables**에서 아래 3개 변수 등록 (Production + Preview + Development)

   | 변수명                      | 값                           |
   | --------------------------- | ---------------------------- |
   | `NOTION_API_KEY`            | Notion Integration 시크릿 키 |
   | `NOTION_DATABASE_ID`        | 뉴스 데이터베이스 ID         |
   | `NOTION_STOCKS_DATABASE_ID` | 추천종목 데이터베이스 ID     |

3. (선택) `NEXT_PUBLIC_APP_URL`에 프로덕션 도메인 등록 — sitemap/OG URL에 사용
4. `main` 브랜치 push 시 자동 배포, PR 생성 시 프리뷰 배포 자동 발급

### CLI 배포

```bash
npm i -g vercel
vercel login
vercel link                                    # 프로젝트 연결
vercel env add NOTION_API_KEY production
vercel env add NOTION_DATABASE_ID production
vercel env add NOTION_STOCKS_DATABASE_ID production
vercel --prod                                  # 프로덕션 배포
```

## 프로젝트 문서

- [PRD (요구사항 명세)](./docs/PRD.md)
- [개발 로드맵](./docs/ROADMAP.md)
- [프로젝트 구조](./docs/guides/project-structure.md)
- [스타일링 가이드](./docs/guides/styling-guide.md)
- [컴포넌트 패턴](./docs/guides/component-patterns.md)
