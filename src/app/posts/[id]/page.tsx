/**
 * 글 상세 페이지 (서버 컴포넌트)
 * Notion 페이지 블록을 렌더링합니다 (F002, F005, F010, F011)
 */
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CategoryBadge } from '@/components/post/category-badge'
import { RelatedStockBadge } from '@/components/post/related-stock-badge'
import { NotionBlockRenderer } from '@/components/post/notion-block-renderer'
import { formatDate } from '@/lib/utils'
import { getPostById, getPostBlocks } from '@/lib/notion'

interface PostPageProps {
  params: Promise<{ id: string }>
}

export const revalidate = 3600

/** 포스트 제목을 메타데이터 title로 사용 */
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { id } = await params
  try {
    const post = await getPostById(id)
    if (!post) return { title: '글을 찾을 수 없습니다' }
    return { title: post.title, description: post.summary ?? undefined }
  } catch {
    return { title: '글을 찾을 수 없습니다' }
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params

  // ID에 해당하는 포스트 조회 — API 오류 또는 null이면 404
  let post
  try {
    post = await getPostById(id)
  } catch {
    notFound()
  }
  if (!post) notFound()

  // 본문 블록 데이터 로드
  const blocks = await getPostBlocks(id)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        <Container>
          {/* 본문 최대 너비 제한 */}
          <div className="mx-auto max-w-2xl py-8">
            {/* 홈으로 돌아가기 버튼 */}
            <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                홈으로 돌아가기
              </Link>
            </Button>

            {/* 포스트 메타 정보 헤더 */}
            <div className="mb-8">
              {/* 카테고리 배지 + 발행일 */}
              <div className="mb-3 flex items-center gap-3">
                {post.category && <CategoryBadge category={post.category} />}
                {post.published && (
                  <span className="text-muted-foreground text-sm">
                    {formatDate(post.published)}
                  </span>
                )}
              </div>

              {/* 글 제목 */}
              <h1 className="mb-4 text-3xl leading-tight font-bold">
                {post.title}
              </h1>

              {/* 뉴스 원본 링크 버튼 (newsLink 있을 때만 표시) */}
              {post.newsLink && (
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={post.newsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {/* TODO: 뉴스 링크 클릭 트래킹 구현 필요 */}
                    <ExternalLink className="mr-2 h-4 w-4" />
                    뉴스 원본 보기
                  </a>
                </Button>
              )}
            </div>

            {/* 관련 종목 섹션 (relatedStocks가 있을 때만 표시) */}
            {post.relatedStocks.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-muted-foreground text-sm font-medium">
                    관련 종목:
                  </span>
                  {post.relatedStocks.map(stock => (
                    <RelatedStockBadge key={stock.code} stock={stock} />
                  ))}
                </div>
              </div>
            )}

            {/* 구분선 */}
            <Separator className="mb-8" />

            {/* 본문 블록 렌더러 */}
            <NotionBlockRenderer blocks={blocks} />
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
