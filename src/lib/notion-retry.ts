import { APIResponseError } from '@notionhq/client'
import { logNotionError } from '@/lib/logger'

interface RetryOptions {
  maxRetries?: number
  baseDelayMs?: number
  endpoint?: string
}

/**
 * Notion API 호출을 최대 maxRetries회 재시도합니다
 * 429(rate limit) 응답에만 재시도하고, 나머지 오류는 즉시 throw합니다
 * 대기 시간: 1초 → 2초 → 4초 (exponential backoff)
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  {
    maxRetries = 3,
    baseDelayMs = 1000,
    endpoint = 'unknown',
  }: RetryOptions = {}
): Promise<T> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      const is429 = error instanceof APIResponseError && error.status === 429

      // 429가 아니거나 마지막 시도면 즉시 throw
      if (!is429 || attempt === maxRetries - 1) throw error

      const delayMs = baseDelayMs * 2 ** attempt
      logNotionError(`${endpoint}:retry(${attempt + 1})`, error)
      await new Promise(resolve => setTimeout(resolve, delayMs))
    }
  }

  // 루프를 정상적으로 빠져나오는 경우는 없지만 TypeScript 만족을 위해
  throw new Error('withRetry: unreachable')
}
