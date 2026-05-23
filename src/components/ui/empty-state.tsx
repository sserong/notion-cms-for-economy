/**
 * 빈 상태 컴포넌트
 * 데이터가 없을 때 중앙 정렬된 안내 메시지를 표시합니다
 */
import { FileSearch } from 'lucide-react'

interface EmptyStateProps {
  /** 주 메시지 (굵은 텍스트) */
  message?: string
  /** 보조 설명 (muted 텍스트) */
  description?: string
}

export function EmptyState({
  message = '검색 결과가 없습니다',
  description = '다른 검색어나 카테고리를 선택해보세요.',
}: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 text-center"
      role="status"
      aria-live="polite"
    >
      {/* 아이콘 (크게 표시) */}
      <FileSearch
        className="text-muted-foreground mb-4 h-12 w-12"
        aria-hidden="true"
      />

      {/* 주 메시지 */}
      <p className="mb-2 text-lg font-semibold">{message}</p>

      {/* 보조 설명 */}
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  )
}
