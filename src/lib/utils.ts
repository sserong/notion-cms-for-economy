import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// "2026-05-23" → "2026.05.23" / null·빈값은 빈 문자열 반환
export function formatDate(dateString: string | null): string {
  if (!dateString) return ''
  return dateString.replace(/-/g, '.')
}

// maxLength 초과 시 "..." 붙여 자름
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

// 종목코드 6자리 0-패딩 보장: "5930" → "005930"
export function formatStockCode(code: string): string {
  return code.padStart(6, '0')
}
