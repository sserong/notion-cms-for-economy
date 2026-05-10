/**
 * 블로그 헤더 컴포넌트
 * 로고, 카테고리 네비게이션, 모바일 메뉴를 포함합니다
 */
import Link from 'next/link'
import { Container } from './container'
import { MainNav } from '@/components/navigation/main-nav'
import { MobileHeader } from '@/components/navigation/mobile-nav'

export function Header() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* 로고 */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-lg font-bold">오늘의 경제뉴스 겟</span>
          </Link>

          {/* 데스크톱 네비게이션 */}
          <div className="hidden md:flex">
            <MainNav />
          </div>

          {/* 모바일 메뉴 */}
          <div className="md:hidden">
            <MobileHeader />
          </div>
        </div>
      </Container>
    </header>
  )
}
