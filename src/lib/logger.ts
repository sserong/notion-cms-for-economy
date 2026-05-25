import { APIResponseError } from '@notionhq/client'

interface NotionErrorLog {
  timestamp: string
  endpoint: string
  statusCode: number | null
  code: string | null
  message: string
}

/** Notion API 호출 실패를 구조화된 포맷으로 콘솔에 기록 */
export function logNotionError(endpoint: string, error: unknown): void {
  const log: NotionErrorLog = {
    timestamp: new Date().toISOString(),
    endpoint,
    statusCode: null,
    code: null,
    message: error instanceof Error ? error.message : String(error),
  }

  // @notionhq/client의 APIResponseError에서 status/code 안전 추출
  if (error instanceof APIResponseError) {
    log.statusCode = error.status
    log.code = error.code
  }

  console.error('[notion-error]', JSON.stringify(log))
}
