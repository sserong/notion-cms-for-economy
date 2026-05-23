/**
 * 글로벌 로딩 UI
 * Next.js App Router의 Suspense 경계로 자동 래핑됩니다
 * 페이지 이동 시 데이터를 가져오는 동안 표시됩니다
 */
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Container } from '@/components/layout/container'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Container>
          <div className="py-8">
            {/* 페이지 헤더 스켈레톤 */}
            <div className="mb-8 space-y-3">
              <Skeleton className="h-9 w-48" />
              <Skeleton className="h-5 w-80" />
            </div>

            {/* 글 카드 목록 스켈레톤 (3개) */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="space-y-3 rounded-lg border p-4">
                  {/* 카테고리 뱃지 스켈레톤 */}
                  <Skeleton className="h-5 w-16" />
                  {/* 제목 스켈레톤 */}
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  {/* 날짜 스켈레톤 */}
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
