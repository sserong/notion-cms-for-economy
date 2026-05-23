/**
 * 추천종목 카드 컴포넌트
 * 종목 정보를 카드 형태로 표시합니다
 */
import { ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDate, formatStockCode, truncateText } from '@/lib/utils'
import type { Stock } from '@/types/notion'

interface StockCardProps {
  /** 표시할 종목 데이터 */
  stock: Stock
}

export function StockCard({ stock }: StockCardProps) {
  return (
    <Card className="gap-0 py-0 transition-shadow hover:shadow-md">
      <CardContent className="flex h-full flex-col p-5">
        {/* 종목명 + 종목코드 배지 */}
        <div className="mb-2 flex items-center gap-2">
          <span className="text-lg font-bold">{stock.name}</span>
          <Badge variant="outline" className="font-mono text-xs">
            {formatStockCode(stock.code)}
          </Badge>
        </div>

        {/* 업종 */}
        {stock.sector && (
          <p className="text-muted-foreground mb-1 text-sm">{stock.sector}</p>
        )}

        {/* 추천일 */}
        {stock.date && (
          <p className="text-muted-foreground mb-3 text-xs">
            추천일: {formatDate(stock.date)}
          </p>
        )}

        {/* 추천 이유 (100자 제한) */}
        {stock.reason && (
          <p className="mb-4 flex-1 text-sm leading-relaxed">
            {truncateText(stock.reason, 100)}
          </p>
        )}

        {/* 뉴스 링크 버튼 (newsLink가 있을 때만 표시) */}
        {stock.newsLink && (
          <div className="mt-auto">
            <Button variant="outline" size="sm" asChild>
              <a
                href={stock.newsLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${stock.name} 관련 뉴스 보기`}
              >
                {/* TODO: 뉴스 링크 클릭 이벤트 트래킹 구현 필요 */}
                <ExternalLink className="mr-2 h-3 w-3" />
                관련 뉴스 보기
              </a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
