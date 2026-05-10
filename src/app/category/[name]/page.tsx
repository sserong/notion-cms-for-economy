/**
 * 카테고리 페이지
 * 특정 카테고리에 속하는 글 목록을 표시합니다 (F003, F005, F010)
 *
 * TODO: Notion API 연동 후 실제 데이터로 교체
 */
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Container } from '@/components/layout/container'
import type { PostCategory } from '@/types/notion'

/** 유효한 카테고리 목록 */
const VALID_CATEGORIES: PostCategory[] = [
  '주식',
  '부동산',
  '거시경제',
  '기업·산업',
]

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
  // URL 인코딩된 한글 카테고리 이름 디코딩
  const categoryName = decodeURIComponent(name) as PostCategory

  // 유효하지 않은 카테고리는 404 반환
  if (!VALID_CATEGORIES.includes(categoryName)) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Container>
          <div className="py-8">
            {/* 카테고리 제목 */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold">{categoryName}</h1>
              <p className="text-muted-foreground mt-2">
                {categoryName} 분야의 최신 경제뉴스를 확인하세요.
              </p>
            </div>

            {/* 카테고리 탭 버튼 */}
            {/* TODO: 카테고리 탭 컴포넌트 추가 */}

            {/* TODO: getPostsByCategory(categoryName)으로 글 목록 조회 */}
            <div className="text-muted-foreground py-20 text-center">
              <p>Notion API 연동 후 {categoryName} 글 목록이 표시됩니다.</p>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
