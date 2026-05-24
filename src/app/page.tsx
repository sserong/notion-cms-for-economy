/**
 * 홈 페이지 (서버 컴포넌트)
 * 최근 발행된 경제뉴스 글 목록을 표시합니다 (F001, F003, F004, F005)
 *
 * TODO: Notion API 연동 후 getDummyPosts()를 실제 API 호출로 교체
 */
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Container } from '@/components/layout/container'
import { PostListClient } from '@/components/post/post-list-client'
import { getDummyPosts } from '@/lib/fixtures/posts'

export default function HomePage() {
  // 더미 포스트 데이터 로드 (추후 Notion API로 교체)
  const posts = getDummyPosts()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        <Container>
          <div className="py-8">
            {/* 페이지 헤더 */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold">최신 경제뉴스</h1>
              <p className="text-muted-foreground mt-2">
                주식, 부동산, 거시경제, 기업·산업 분야의 최신 소식을 전달합니다.
              </p>
            </div>

            {/* 검색 + 카테고리 탭 + 포스트 그리드 (클라이언트 컴포넌트) */}
            <PostListClient posts={posts} />
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
