import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/sonner'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

/** 사이트 기본 설명 (OG와 공통으로 사용) */
const siteDescription =
  'Notion CMS 기반 경제뉴스 블로그. 주식, 부동산, 거시경제, 기업·산업 분야의 최신 뉴스를 한눈에.'

export const metadata: Metadata = {
  title: {
    default: '오늘의 경제뉴스 겟',
    template: '%s | 오늘의 경제뉴스 겟',
  },
  description: siteDescription,
  // Open Graph: 카카오톡, 슬랙 등 SNS 공유 시 미리보기에 사용
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    title: '오늘의 경제뉴스 겟',
    description: siteDescription,
    siteName: '오늘의 경제뉴스 겟',
  },
  // Twitter Card: 트위터(X) 공유 시 미리보기에 사용
  twitter: {
    card: 'summary_large_image',
    title: '오늘의 경제뉴스 겟',
    description: siteDescription,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 스킵 내비게이션: 키보드 사용자가 반복 메뉴를 건너뛰고 본문으로 바로 이동 */}
        <a
          href="#main-content"
          className="focus:bg-background focus:ring-ring sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:ring-2 focus:ring-offset-2"
        >
          본문으로 건너뛰기
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
