/**
 * 카테고리 배지 컴포넌트
 * 포스트 카테고리를 색상으로 구분하여 표시합니다
 */
import { Badge } from '@/components/ui/badge'
import { CATEGORY_COLORS } from '@/lib/categories'
import { cn } from '@/lib/utils'
import type { PostCategory } from '@/types/notion'

interface CategoryBadgeProps {
  /** 표시할 카테고리 */
  category: PostCategory
  /** 추가 CSS 클래스 */
  className?: string
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  // 카테고리별 색상 클래스 조회
  const colorClass = CATEGORY_COLORS[category]

  return (
    <Badge
      className={cn('border-transparent font-medium', colorClass, className)}
    >
      {category}
    </Badge>
  )
}
