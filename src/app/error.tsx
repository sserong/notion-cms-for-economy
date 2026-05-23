'use client'

/**
 * 글로벌 에러 UI
 * 페이지 렌더링 중 처리되지 않은 에러가 발생했을 때 표시됩니다
 *
 * Next.js 요구사항: 반드시 클라이언트 컴포넌트여야 합니다
 * - error: 발생한 에러 객체 (digest는 서버 에러의 고유 ID)
 * - reset: 에러 경계를 초기화하고 페이지를 다시 렌더링하는 함수
 */
import { Button } from '@/components/ui/button'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center py-20 text-center">
        {/* 에러 상태 표시 */}
        <p className="text-muted-foreground mb-2 text-sm font-medium tracking-widest uppercase">
          오류
        </p>
        <h1 className="mb-4 text-3xl font-bold">오류가 발생했습니다</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          페이지를 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.
        </p>

        {/* 개발 환경에서만 에러 메시지 표시 */}
        {process.env.NODE_ENV === 'development' && error.message && (
          <p className="bg-muted text-muted-foreground mb-6 max-w-md rounded-md px-4 py-2 font-mono text-xs">
            {error.message}
          </p>
        )}

        {/* 다시 시도 버튼: reset()을 호출해 에러 경계를 초기화 */}
        <Button onClick={reset}>다시 시도</Button>
      </div>
    </div>
  )
}
