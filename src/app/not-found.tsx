/**
 * 404 Not Found 페이지
 * 존재하지 않는 경로로 접근했을 때 표시됩니다
 */
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center">
        <Container>
          <div className="flex flex-col items-center justify-center py-20 text-center">
            {/* 404 상태 표시 */}
            <p className="text-muted-foreground mb-2 text-sm font-medium tracking-widest uppercase">
              404
            </p>
            <h1 className="mb-4 text-3xl font-bold">
              페이지를 찾을 수 없습니다
            </h1>
            <p className="text-muted-foreground mb-8 max-w-md">
              요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
            </p>

            {/* 홈으로 이동 버튼 */}
            <Button asChild>
              <Link href="/">홈으로 돌아가기</Link>
            </Button>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
