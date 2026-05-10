/**
 * 홈 페이지
 * 최근 발행된 경제뉴스 글 목록을 표시합니다 (F001, F003, F004, F005)
 *
 * TODO: Notion API 연동 후 실제 데이터로 교체
 */
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Container } from '@/components/layout/container'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Container>
          <div className="py-8">
            {/* 페이지 헤더 */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold">최신 경제뉴스</h1>
              <p className="text-muted-foreground mt-2">
                주식, 부동산, 거시경제, 기업·산업 분야의 최신 소식을 전달합니다.
              </p>
            </div>

            {/* TODO: 검색바 컴포넌트 추가 (F004) */}

            {/* TODO: 카테고리 필터 버튼 추가 (F003) */}

            {/* TODO: 글 목록 그리드 추가 (F001, F005) */}
            <div className="text-muted-foreground py-20 text-center">
              <p>Notion API 연동 후 글 목록이 표시됩니다.</p>
              <p className="mt-2 text-sm">
                .env.local 파일에 NOTION_API_KEY와 NOTION_DATABASE_ID를
                설정하세요.
              </p>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
