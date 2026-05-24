/**
 * 추천종목 페이지 (서버 컴포넌트)
 * 활성 상태인 추천 종목 목록을 카드 그리드로 표시합니다 (F006, F007, F008, F009)
 */
import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Container } from '@/components/layout/container'
import { StockCard } from '@/components/stock/stock-card'
import { EmptyState } from '@/components/ui/empty-state'
import { getStocks } from '@/lib/notion'

export const revalidate = 3600

export const metadata: Metadata = {
  title: '오늘의 추천종목',
  description: '매일 업데이트되는 관심 종목 정보를 확인하세요.',
}

export default async function StocksPage() {
  const stocks = await getStocks()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        <Container>
          <div className="py-8">
            {/* 페이지 헤더 */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold">오늘의 추천종목</h1>
              <p className="text-muted-foreground mt-2">
                매일 업데이트되는 관심 종목 정보를 확인하세요.
              </p>
            </div>

            {/* 활성 종목 카드 그리드 또는 빈 상태 표시 */}
            {stocks.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {stocks.map(stock => (
                  <StockCard key={stock.id} stock={stock} />
                ))}
              </div>
            ) : (
              <EmptyState
                message="현재 추천종목이 없습니다"
                description="추천종목 업데이트를 기다려주세요."
              />
            )}
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
