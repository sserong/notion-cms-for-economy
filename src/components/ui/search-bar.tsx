/**
 * 검색 바 컴포넌트
 * 아이콘이 포함된 검색 입력창을 표시합니다
 * 상태 관리는 부모 컴포넌트에서 담당합니다
 */
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface SearchBarProps {
  /** 현재 검색어 값 */
  value: string
  /** 검색어 변경 핸들러 */
  onChange: (value: string) => void
  /** 입력창 플레이스홀더 텍스트 */
  placeholder?: string
}

export function SearchBar({
  value,
  onChange,
  placeholder = '검색어를 입력하세요',
}: SearchBarProps) {
  return (
    <div className="relative mb-6 w-full">
      {/* 왼쪽 검색 아이콘 */}
      <Search
        className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
        aria-hidden="true"
      />

      {/* 검색 입력창 (아이콘 공간 확보를 위해 pl-9 적용) */}
      <Input
        type="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-9"
        aria-label="글 검색"
      />
    </div>
  )
}
