/**
 * 관련 종목 배지 컴포넌트
 * 종목명과 종목코드를 배지 형태로 표시합니다
 */
import { Badge } from '@/components/ui/badge'
import { cn, formatStockCode } from '@/lib/utils'
import type { RelatedStock } from '@/types/notion'

interface RelatedStockBadgeProps {
  /** 표시할 관련 종목 정보 */
  stock: RelatedStock
  /** 추가 CSS 클래스 */
  className?: string
}

export function RelatedStockBadge({
  stock,
  className,
}: RelatedStockBadgeProps) {
  return (
    <Badge variant="outline" className={cn('font-normal', className)}>
      {/* "종목명 · 005930" 형태로 표시 */}
      {stock.name} · {formatStockCode(stock.code)}
    </Badge>
  )
}
