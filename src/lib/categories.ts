import type { PostCategory } from '@/types/notion'

/** 카테고리 목록 (전체 제외) */
export const POST_CATEGORIES: PostCategory[] = [
  '주식',
  '부동산',
  '거시경제',
  '기업·산업',
]

/** 카테고리 배지/카드에 적용할 Tailwind 색상 클래스 (다크모드 포함) */
export const CATEGORY_COLORS: Record<PostCategory, string> = {
  주식: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  부동산: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  거시경제:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  '기업·산업':
    'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
}

/** 카테고리별 네비게이션 href */
export const CATEGORY_HREFS: Record<string, string> = {
  전체: '/',
  주식: '/category/주식',
  부동산: '/category/부동산',
  거시경제: '/category/거시경제',
  '기업·산업': '/category/기업·산업',
}

/** PostCategory 타입 가드 — 런타임에 유효한 카테고리인지 검증 */
export function isValidCategory(value: string): value is PostCategory {
  return POST_CATEGORIES.includes(value as PostCategory)
}
