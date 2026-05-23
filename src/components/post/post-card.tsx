/**
 * 포스트 카드 컴포넌트
 * 글 목록에서 개별 포스트를 카드 형태로 표시합니다
 */
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CategoryBadge } from '@/components/post/category-badge'
import { RelatedStockBadge } from '@/components/post/related-stock-badge'
import { formatDate, truncateText } from '@/lib/utils'
import type { Post } from '@/types/notion'

interface PostCardProps {
  /** 표시할 포스트 데이터 */
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="gap-0 py-0 transition-shadow hover:shadow-md">
      <CardContent className="flex h-full flex-col p-5">
        {/* 카테고리 배지 */}
        {post.category && (
          <div className="mb-3">
            <CategoryBadge category={post.category} />
          </div>
        )}

        {/* 글 제목 — 클릭 시 상세 페이지로 이동 */}
        <Link
          href={`/posts/${post.id}`}
          className="mb-2 leading-snug font-semibold hover:underline"
        >
          {post.title}
        </Link>

        {/* 한 줄 요약 (60자 제한) */}
        {post.summary && (
          <p className="text-muted-foreground mb-4 flex-1 text-sm">
            {truncateText(post.summary, 60)}
          </p>
        )}

        {/* 하단 행: 발행일, 뉴스 링크, 관련 종목 */}
        <div className="mt-auto flex flex-wrap items-center gap-2">
          {/* 발행일 */}
          {post.published && (
            <span className="text-muted-foreground text-xs">
              {formatDate(post.published)}
            </span>
          )}

          {/* 뉴스 원본 링크 버튼 (newsLink가 있을 때만 표시) */}
          {post.newsLink && (
            <Button variant="ghost" size="sm" className="h-auto p-1" asChild>
              <a
                href={post.newsLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${post.title} 원본 뉴스 보기`}
              >
                {/* TODO: 뉴스 링크 클릭 이벤트 트래킹 구현 필요 */}
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          )}

          {/* 관련 종목 배지 (최대 3개) */}
          {post.relatedStocks.slice(0, 3).map(stock => (
            <RelatedStockBadge key={stock.code} stock={stock} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
