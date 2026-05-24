/**
 * 데스크톱 메인 네비게이션
 * 카테고리 링크와 추천종목 링크를 표시합니다
 */
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

/** 카테고리 네비게이션 아이템 */
const categoryItems = [
  { title: '전체', href: '/' },
  { title: '주식', href: '/category/주식' },
  { title: '부동산', href: '/category/부동산' },
  { title: '거시경제', href: '/category/거시경제' },
  { title: '기업·산업', href: '/category/기업·산업' },
]

/** 링크 기본 스타일: 활성/비활성 상태에 따라 조합하여 사용 */
function navLinkClass(isActive: boolean) {
  return cn(
    'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
    'hover:bg-accent hover:text-accent-foreground',
    isActive ? 'bg-accent text-accent-foreground' : 'text-foreground/60'
  )
}

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="주요 내비게이션" className="flex items-center space-x-1">
      {/* 카테고리 링크 목록 */}
      {categoryItems.map(item => (
        <Link
          key={item.href}
          href={item.href}
          className={navLinkClass(pathname === item.href)}
        >
          {item.title}
        </Link>
      ))}

      {/* 카테고리와 추천종목을 시각적으로 구분하는 세로 구분선 */}
      <Separator orientation="vertical" className="mx-1 h-5" />

      {/* 추천종목 링크: 카테고리와 별도로 분리 */}
      <Link href="/stocks" className={navLinkClass(pathname === '/stocks')}>
        오늘의 추천종목
      </Link>
    </nav>
  )
}
