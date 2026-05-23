/**
 * Notion CMS 관련 타입 정의
 * Notion 데이터베이스 스키마를 기반으로 한 TypeScript 인터페이스
 */

/** 블로그 포스트 카테고리 */
export type PostCategory = '주식' | '부동산' | '거시경제' | '기업·산업'

/** 경제뉴스와 관련된 주식 종목 */
export interface RelatedStock {
  /** 종목명 (예: "삼성전자") */
  name: string
  /** 종목코드 (예: "005930") */
  code: string
}

/** Notion 뉴스 데이터베이스에서 가져온 포스트 메타데이터 */
export interface Post {
  /** Notion 페이지 고유 ID */
  id: string
  /** 글 제목 */
  title: string
  /** 한 줄 요약 (카드 미리보기용) */
  summary: string | null
  /** 카테고리 분류 */
  category: PostCategory | null
  /** 태그 목록 */
  tags: string[]
  /** 발행일 */
  published: string | null
  /** 발행 상태 */
  status: '초안' | '발행됨' | null
  /** 원본 뉴스 링크 */
  newsLink: string | null
  /** 관련 주식 종목 (최대 3개) */
  relatedStocks: RelatedStock[]
}

/** 오늘의 추천종목 활성 상태 */
export type StockStatus = '활성' | '비활성'

/** Notion 종목 데이터베이스에서 가져온 추천 종목 */
export interface Stock {
  /** Notion 페이지 고유 ID */
  id: string
  /** 종목명 */
  name: string
  /** 종목코드 (예: "005930") */
  code: string
  /** 업종 분류 */
  sector: string | null
  /** 추천일 */
  date: string | null
  /** 활성 상태 */
  status: StockStatus | null
  /** 추천 이유 요약 */
  reason: string | null
  /** 관련 뉴스 링크 */
  newsLink: string | null
}

/** Notion 블록 유형 */
export type NotionBlockType =
  | 'paragraph'
  | 'heading_1'
  | 'heading_2'
  | 'heading_3'
  | 'bulleted_list_item'
  | 'numbered_list_item'
  | 'image'
  | 'code'
  | 'quote'
  | 'divider'

/** 렌더링을 위한 파싱된 Notion 블록 */
export interface NotionBlock {
  /** 블록 고유 ID */
  id: string
  /** 블록 유형 */
  type: NotionBlockType
  /** 텍스트 콘텐츠 (이미지 블록의 경우 URL) */
  content: string
  /** 코드 블록의 프로그래밍 언어 */
  language?: string
}
