/**
 * 카테고리 탭 컴포넌트
 * 카테고리 목록을 수평 탭으로 표시하며, 현재 카테고리를 강조합니다
 */
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { CATEGORY_HREFS } from '@/lib/categories'

/** 탭으로 표시할 카테고리 목록 */
const TAB_ITEMS = ['전체', '주식', '부동산', '거시경제', '기업·산업'] as const

interface CategoryTabsProps {
  /** 현재 선택된 카테고리 (없으면 '전체'로 처리) */
  currentCategory?: string
}

export function CategoryTabs({ currentCategory }: CategoryTabsProps) {
  const pathname = usePathname()

  return (
    <nav className="mb-6 overflow-x-auto" aria-label="카테고리 탭">
      {/* 모바일에서 가로 스크롤 가능한 탭 바 */}
      <div className="flex min-w-max gap-1 border-b pb-0">
        {TAB_ITEMS.map(tab => {
          const href = CATEGORY_HREFS[tab]

          // 현재 탭 활성화 여부 판단
          // '전체' 탭: 루트 경로이거나 currentCategory가 없을 때 활성화
          // 다른 탭: currentCategory와 일치할 때 활성화
          const isActive =
            tab === '전체'
              ? pathname === '/' && !currentCategory
              : currentCategory === tab

          return (
            <Link
              key={tab}
              href={href}
              className={cn(
                'rounded-t-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              {tab}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
