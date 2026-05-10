/**
 * 데스크톱 메인 네비게이션
 * 카테고리 링크를 표시합니다
 */
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

/** 카테고리 네비게이션 아이템 */
const categoryItems = [
  { title: '전체', href: '/' },
  { title: '주식', href: '/category/주식' },
  { title: '부동산', href: '/category/부동산' },
  { title: '거시경제', href: '/category/거시경제' },
  { title: '기업·산업', href: '/category/기업·산업' },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-1">
      {categoryItems.map(item => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
            'hover:bg-accent hover:text-accent-foreground',
            pathname === item.href
              ? 'bg-accent text-accent-foreground'
              : 'text-foreground/60'
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
