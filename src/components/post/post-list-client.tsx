/**
 * 포스트 목록 클라이언트 컴포넌트
 * 검색 기능과 카테고리 탭을 포함한 포스트 카드 그리드를 렌더링합니다
 * 검색 상태 관리를 위해 'use client'로 선언합니다
 */
'use client'

import { useMemo, useRef, useState } from 'react'
import { PostCard } from '@/components/post/post-card'
import { CategoryTabs } from '@/components/ui/category-tabs'
import { SearchBar } from '@/components/ui/search-bar'
import { EmptyState } from '@/components/ui/empty-state'
import type { Post } from '@/types/notion'

interface PostListClientProps {
  /** 서버에서 전달받은 포스트 배열 */
  posts: Post[]
}

export function PostListClient({ posts }: PostListClientProps) {
  // inputValue: 입력창에 즉시 반영되는 값
  // searchQuery: 150ms 디바운스 후 필터링에 사용되는 값
  const [inputValue, setInputValue] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleSearchChange = (value: string) => {
    setInputValue(value)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setSearchQuery(value), 150)
  }

  // 제목 기준으로 필터링 (대소문자 무관) — useMemo로 불필요한 재계산 방지
  const filteredPosts = useMemo(
    () =>
      posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [posts, searchQuery]
  )

  return (
    <div>
      {/* 검색 바 */}
      <SearchBar
        value={inputValue}
        onChange={handleSearchChange}
        placeholder="글 제목으로 검색하세요"
      />

      {/* 카테고리 탭 (전체 탭은 currentCategory 없음) */}
      <CategoryTabs />

      {/* 포스트 카드 그리드 또는 빈 상태 표시 */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <EmptyState
          message="검색 결과가 없습니다"
          description={`"${inputValue}"에 해당하는 글을 찾을 수 없습니다. 다른 검색어를 입력해보세요.`}
        />
      )}
    </div>
  )
}
