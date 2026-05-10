/**
 * 모바일 헤더 및 네비게이션 컴포넌트
 * 햄버거 메뉴 버튼과 슬라이드 메뉴를 포함합니다
 */
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'

/** 카테고리 네비게이션 아이템 */
const categoryItems = [
  { title: '전체', href: '/' },
  { title: '주식', href: '/category/주식' },
  { title: '부동산', href: '/category/부동산' },
  { title: '거시경제', href: '/category/거시경제' },
  { title: '기업·산업', href: '/category/기업·산업' },
]

export function MobileHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">메뉴 열기</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px]">
        <div className="flex flex-col space-y-3 pt-4">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="px-2 text-lg font-bold"
          >
            오늘의 경제뉴스 겟
          </Link>
          <Separator />
          <div className="space-y-1">
            {categoryItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'block rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  'hover:bg-accent hover:text-accent-foreground',
                  pathname === item.href
                    ? 'bg-accent text-accent-foreground'
                    : 'text-foreground/70'
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
