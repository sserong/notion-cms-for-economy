/**
 * 글 상세 페이지
 * Notion 페이지 블록을 렌더링합니다 (F002, F005, F010, F011)
 *
 * TODO: Notion API 연동 후 실제 데이터로 교체
 */
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface PostPageProps {
  params: Promise<{ id: string }>
}

// TODO: Notion API 연동 후 동적 메타데이터 생성
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { id } = await params
  return {
    title: `글 ${id}`,
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params

  // TODO: getPostById(id)와 getPostBlocks(id)로 데이터 조회
  // 현재는 플레이스홀더
  if (!id) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Container>
          <div className="mx-auto max-w-2xl py-8">
            {/* 홈으로 돌아가기 버튼 */}
            <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                홈으로 돌아가기
              </Link>
            </Button>

            {/* TODO: 포스트 메타 정보 헤더 */}
            <div className="mb-8">
              <Badge variant="secondary" className="mb-3">
                카테고리
              </Badge>
              <h1 className="text-3xl font-bold">글 제목</h1>
              <p className="text-muted-foreground mt-2 text-sm">발행일</p>
            </div>

            {/* TODO: Notion 블록 렌더러 컴포넌트 (F011) */}
            <div className="text-muted-foreground py-12 text-center">
              <p>Notion API 연동 후 본문이 표시됩니다.</p>
              <p className="mt-1 text-sm">페이지 ID: {id}</p>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
