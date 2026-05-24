/**
 * 카테고리 페이지 (서버 컴포넌트)
 * 특정 카테고리에 속하는 글 목록을 표시합니다 (F003, F005, F010)
 */
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Container } from '@/components/layout/container'
import { PostCard } from '@/components/post/post-card'
import { CategoryTabs } from '@/components/ui/category-tabs'
import { EmptyState } from '@/components/ui/empty-state'
import { getPostsByCategory } from '@/lib/notion'
import { isValidCategory } from '@/lib/categories'

export const revalidate = 60

interface CategoryPageProps {
  params: Promise<{ name: string }>
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { name } = await params
  const decodedName = decodeURIComponent(name)
  return {
    title: `${decodedName} 카테고리`,
    description: `${decodedName} 분야의 경제뉴스 글 목록`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { name } = await params
  const decodedName = decodeURIComponent(name)

  // 타입 가드로 유효한 카테고리인지 검증 — 유효하지 않으면 404
  if (!isValidCategory(decodedName)) {
    notFound()
  }
  const categoryName = decodedName

  const posts = await getPostsByCategory(categoryName)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        <Container>
          <div className="py-8">
            {/* 카테고리 제목 */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold">{categoryName}</h1>
              <p className="text-muted-foreground mt-2">
                {categoryName} 분야의 최신 경제뉴스를 확인하세요.
              </p>
            </div>

            {/* 카테고리 탭 (현재 카테고리 강조) */}
            <CategoryTabs currentCategory={categoryName} />

            {/* 포스트 카드 그리드 또는 빈 상태 표시 */}
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <EmptyState
                message={`${categoryName} 글이 없습니다`}
                description="아직 해당 카테고리의 글이 발행되지 않았습니다."
              />
            )}
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
