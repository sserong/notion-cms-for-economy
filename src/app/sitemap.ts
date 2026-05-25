/**
 * 사이트맵 생성기
 * Next.js App Router가 /sitemap.xml 엔드포인트로 자동 처리합니다
 * 정적 페이지 + Notion에서 가져온 동적 포스트 URL을 포함합니다
 */
import type { MetadataRoute } from 'next'
import { getBaseUrl } from '@/lib/site'
import { POST_CATEGORIES } from '@/lib/categories'
import { getPosts } from '@/lib/notion'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl()

  // 항상 존재하는 정적 페이지 목록
  const staticRoutes: MetadataRoute.Sitemap = [
    // 홈 페이지 — 매일 업데이트되므로 최우선 순위
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    // 종목 페이지 — 매일 업데이트
    {
      url: `${baseUrl}/stocks`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    // 4개 카테고리 페이지 — POST_CATEGORIES 상수 재사용으로 단일 진실 공급원 유지
    ...POST_CATEGORIES.map(category => ({
      url: `${baseUrl}/category/${encodeURIComponent(category)}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    })),
  ]

  // Notion API에서 발행된 포스트 목록을 가져와 동적 경로 생성
  let postRoutes: MetadataRoute.Sitemap = []
  try {
    const posts = await getPosts()
    postRoutes = posts.map(post => ({
      url: `${baseUrl}/posts/${post.id}`,
      // 발행일이 있으면 해당 날짜, 없으면 현재 날짜 사용
      lastModified: post.published ? new Date(post.published) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
  } catch {
    // Notion API 오류 시 정적 경로만 반환 — 빌드/렌더링 실패 방지
  }

  return [...staticRoutes, ...postRoutes]
}
