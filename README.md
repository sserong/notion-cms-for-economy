# 오늘의 경제뉴스 겟 블로그

Notion을 CMS로 활용한 경제뉴스 블로그입니다. Notion에서 글을 작성하면 자동으로 블로그에 반영됩니다.

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **CMS**: Notion API (`@notionhq/client`)
- **Styling**: Tailwind CSS + shadcn/ui
- **Icons**: Lucide React
- **Deployment**: Vercel

## 주요 기능

- Notion 데이터베이스에서 블로그 글 목록 자동 동기화
- 개별 글 상세 페이지 (Notion 블록 렌더링)
- 카테고리별 필터링
- 글 검색
- 반응형 디자인

## 시작하기

### 환경 변수 설정

`.env.local.example` 파일을 복사하여 `.env.local`을 생성하고 실제 값을 입력합니다.

```bash
cp .env.local.example .env.local
# .env.local 파일에 NOTION_API_KEY와 NOTION_DATABASE_ID 입력
```

Notion Integration 생성: https://www.notion.so/my-integrations

### Notion 데이터베이스 구조

| 필드      | 타입         | 설명          |
| --------- | ------------ | ------------- |
| Title     | title        | 글 제목       |
| Category  | select       | 카테고리      |
| Tags      | multi_select | 태그          |
| Published | date         | 발행일        |
| Status    | select       | 초안 / 발행됨 |

### 개발 서버 실행

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

### 빌드

```bash
npm run build
npm run start
```

## 프로젝트 문서

- [PRD (요구사항 명세)](./docs/PRD.md)
- [프로젝트 구조](./docs/guides/project-structure.md)
- [스타일링 가이드](./docs/guides/styling-guide.md)
- [컴포넌트 패턴](./docs/guides/component-patterns.md)

## 배포

Vercel에 연결하면 `main` 브랜치 push 시 자동 배포됩니다.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
