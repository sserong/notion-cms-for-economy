'use server'

import { revalidatePath } from 'next/cache'
import { env } from '@/lib/env'

/**
 * 지정 경로의 ISR 캐시를 즉시 무효화합니다 (F012).
 * Server Action으로 실행되어 REVALIDATE_SECRET이 클라이언트에 노출되지 않습니다.
 */
export async function revalidatePageAction(path: string): Promise<void> {
  if (!path) {
    throw new Error('경로(path)가 필요합니다')
  }

  // env.ts Zod 검증으로 REVALIDATE_SECRET 존재가 보장됨
  void env.REVALIDATE_SECRET

  revalidatePath(path)

  console.log(
    '[revalidate]',
    JSON.stringify({
      timestamp: new Date().toISOString(),
      path,
      success: true,
    })
  )
}
