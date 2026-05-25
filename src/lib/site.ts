/**
 * 사이트 설정 및 base URL 헬퍼
 * OG URL, sitemap, robots 등에서 절대 URL 생성에 사용됩니다
 */
import { env } from '@/lib/env'

/**
 * 현재 환경에 맞는 base URL을 반환합니다
 * 우선순위: NEXT_PUBLIC_APP_URL → VERCEL_URL(https 접두) → localhost:3000
 */
export function getBaseUrl(): string {
  if (env.NEXT_PUBLIC_APP_URL) return env.NEXT_PUBLIC_APP_URL
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`
  return 'http://localhost:3000'
}

/** 사이트 공통 설정 */
export const siteConfig = {
  name: '오늘의 경제뉴스 겟',
  description:
    'Notion CMS 기반 경제뉴스 블로그. 주식, 부동산, 거시경제, 기업·산업 분야의 최신 뉴스를 한눈에.',
}
