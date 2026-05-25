/**
 * robots.txt 생성기
 * Next.js App Router가 /robots.txt 엔드포인트로 자동 처리합니다
 * 모든 크롤러에 전체 접근을 허용하고 사이트맵 위치를 명시합니다
 */
import type { MetadataRoute } from 'next'
import { getBaseUrl } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl()
  return {
    // 모든 검색엔진 크롤러에 전체 사이트 접근 허용
    rules: { userAgent: '*', allow: '/' },
    // 크롤러가 사이트맵을 찾을 수 있도록 위치 명시
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
