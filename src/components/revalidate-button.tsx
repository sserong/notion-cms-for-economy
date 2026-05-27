'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { RefreshCw } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { revalidatePageAction } from '@/app/actions'

export function RevalidateButton() {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)

  async function handleClick() {
    if (isLoading) return
    setIsLoading(true)
    try {
      await revalidatePageAction(pathname)
      toast.success('최신 정보로 업데이트되었습니다', {
        duration: 1500,
        onAutoClose: () => window.location.reload(),
      })
    } catch {
      toast.error('업데이트에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      aria-label="최신정보 확인하기"
      className="fixed right-6 bottom-6 z-50 gap-2 shadow-lg"
    >
      <RefreshCw className={isLoading ? 'animate-spin' : ''} />
      최신정보 확인하기
    </Button>
  )
}
