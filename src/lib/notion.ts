/**
 * Notion API 클라이언트 및 데이터 조회 함수
 * @notionhq/client 2.x를 사용하여 Notion 데이터베이스와 통신
 */
import { Client } from '@notionhq/client'
import type {
  PageObjectResponse,
  BlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'
import type {
  Post,
  PostCategory,
  NotionBlock,
  RelatedStock,
  Stock,
} from '@/types/notion'
import { env } from '@/lib/env'
import { logNotionError } from '@/lib/logger'
import { withRetry } from '@/lib/notion-retry'

/** Notion API 클라이언트 인스턴스 (서버 사이드 전용) */
const notion = new Client({
  auth: env.NOTION_API_KEY,
})

/**
 * RichText 배열에서 일반 텍스트 추출
 * @param richText - Notion RichText 배열
 * @returns 합쳐진 텍스트 문자열
 */
function extractPlainText(richText: RichTextItemResponse[]): string {
  return richText.map(item => item.plain_text).join('')
}

/**
 * Notion 페이지 객체를 Post 타입으로 변환
 * @param page - Notion 페이지 응답 객체
 * @returns 변환된 Post 객체
 */
function pageToPost(page: PageObjectResponse): Post {
  const props = page.properties

  // 제목 추출
  const titleProp = props['Title']
  const title =
    titleProp?.type === 'title' ? extractPlainText(titleProp.title) : ''

  // 요약 추출
  const summaryProp = props['Summary']
  const summary =
    summaryProp?.type === 'rich_text'
      ? extractPlainText(summaryProp.rich_text) || null
      : null

  // 카테고리 추출
  const categoryProp = props['Category']
  const category =
    categoryProp?.type === 'select'
      ? ((categoryProp.select?.name as PostCategory) ?? null)
      : null

  // 태그 추출
  const tagsProp = props['Tags']
  const tags =
    tagsProp?.type === 'multi_select'
      ? tagsProp.multi_select.map(tag => tag.name)
      : []

  // 발행일 추출
  const publishedProp = props['Published']
  const published =
    publishedProp?.type === 'date' ? (publishedProp.date?.start ?? null) : null

  // 상태 추출
  const statusProp = props['Status']
  const status =
    statusProp?.type === 'select'
      ? ((statusProp.select?.name as '초안' | '발행됨') ?? null)
      : null

  // 원본 뉴스 링크 추출
  const newsLinkProp = props['NewsLink']
  const newsLink =
    newsLinkProp?.type === 'url' ? (newsLinkProp.url ?? null) : null

  // 관련 종목 추출 (Stock1Name/Stock1Code ~ Stock3Name/Stock3Code)
  const relatedStocks: RelatedStock[] = []
  for (let i = 1; i <= 3; i++) {
    const nameProp = props[`Stock${i}Name`]
    const codeProp = props[`Stock${i}Code`]
    const name =
      nameProp?.type === 'rich_text' ? extractPlainText(nameProp.rich_text) : ''
    const code =
      codeProp?.type === 'rich_text' ? extractPlainText(codeProp.rich_text) : ''
    if (name && code) relatedStocks.push({ name, code })
  }

  return {
    id: page.id,
    title,
    summary,
    category,
    tags,
    published,
    status,
    newsLink,
    relatedStocks,
  }
}

/**
 * 발행된 포스트 목록 조회 (최신순)
 * @returns 발행된 포스트 배열
 */
export async function getPosts(): Promise<Post[]> {
  try {
    const response = await withRetry(
      () =>
        notion.databases.query({
          database_id: env.NOTION_DATABASE_ID,
          filter: {
            property: 'Status',
            select: { equals: '발행됨' },
          },
          sorts: [{ property: 'Published', direction: 'descending' }],
        }),
      { endpoint: 'getPosts' }
    )

    return response.results
      .filter(
        (page): page is PageObjectResponse =>
          page.object === 'page' && 'properties' in page
      )
      .map(pageToPost)
  } catch (error) {
    logNotionError('getPosts', error)
    throw error
  }
}

/**
 * 특정 카테고리의 발행된 포스트 목록 조회
 * @param category - 필터링할 카테고리 이름
 * @returns 해당 카테고리의 포스트 배열
 */
export async function getPostsByCategory(
  category: PostCategory
): Promise<Post[]> {
  try {
    const response = await withRetry(
      () =>
        notion.databases.query({
          database_id: env.NOTION_DATABASE_ID,
          filter: {
            and: [
              { property: 'Status', select: { equals: '발행됨' } },
              { property: 'Category', select: { equals: category } },
            ],
          },
          sorts: [{ property: 'Published', direction: 'descending' }],
        }),
      { endpoint: 'getPostsByCategory' }
    )

    return response.results
      .filter(
        (page): page is PageObjectResponse =>
          page.object === 'page' && 'properties' in page
      )
      .map(pageToPost)
  } catch (error) {
    logNotionError('getPostsByCategory', error)
    throw error
  }
}

/**
 * 포스트 ID로 단일 포스트 메타데이터 조회
 * @param postId - Notion 페이지 ID
 * @returns Post 객체 또는 null
 */
export async function getPostById(postId: string): Promise<Post | null> {
  try {
    const page = await withRetry(
      () => notion.pages.retrieve({ page_id: postId }),
      { endpoint: 'getPostById' }
    )

    if (page.object !== 'page' || !('properties' in page)) return null

    return pageToPost(page as PageObjectResponse)
  } catch (error) {
    logNotionError('getPostById', error)
    throw error
  }
}

/**
 * 포스트의 본문 블록 목록 조회
 * @param postId - Notion 페이지 ID
 * @returns 파싱된 NotionBlock 배열
 */
export async function getPostBlocks(postId: string): Promise<NotionBlock[]> {
  try {
    const response = await withRetry(
      () => notion.blocks.children.list({ block_id: postId }),
      { endpoint: 'getPostBlocks' }
    )

    const blocks: NotionBlock[] = []

    for (const block of response.results) {
      // 타입 가드: 전체 블록 응답인지 확인
      if (!('type' in block)) continue

      const b = block as BlockObjectResponse

      switch (b.type) {
        case 'paragraph': {
          const text = extractPlainText(b.paragraph.rich_text)
          if (text) blocks.push({ id: b.id, type: 'paragraph', content: text })
          break
        }
        case 'heading_1': {
          const text = extractPlainText(b.heading_1.rich_text)
          if (text) blocks.push({ id: b.id, type: 'heading_1', content: text })
          break
        }
        case 'heading_2': {
          const text = extractPlainText(b.heading_2.rich_text)
          if (text) blocks.push({ id: b.id, type: 'heading_2', content: text })
          break
        }
        case 'heading_3': {
          const text = extractPlainText(b.heading_3.rich_text)
          if (text) blocks.push({ id: b.id, type: 'heading_3', content: text })
          break
        }
        case 'bulleted_list_item': {
          const text = extractPlainText(b.bulleted_list_item.rich_text)
          if (text)
            blocks.push({ id: b.id, type: 'bulleted_list_item', content: text })
          break
        }
        case 'numbered_list_item': {
          const text = extractPlainText(b.numbered_list_item.rich_text)
          if (text)
            blocks.push({ id: b.id, type: 'numbered_list_item', content: text })
          break
        }
        case 'code': {
          const text = extractPlainText(b.code.rich_text)
          if (text)
            blocks.push({
              id: b.id,
              type: 'code',
              content: text,
              language: b.code.language,
            })
          break
        }
        case 'quote': {
          const text = extractPlainText(b.quote.rich_text)
          if (text) blocks.push({ id: b.id, type: 'quote', content: text })
          break
        }
        case 'image': {
          // 이미지 URL 추출 (외부 URL 또는 파일 URL)
          const imageUrl =
            b.image.type === 'external'
              ? b.image.external.url
              : b.image.type === 'file'
                ? b.image.file.url
                : null
          if (imageUrl)
            blocks.push({ id: b.id, type: 'image', content: imageUrl })
          break
        }
        case 'divider': {
          blocks.push({ id: b.id, type: 'divider', content: '' })
          break
        }
      }
    }

    return blocks
  } catch (error) {
    logNotionError('getPostBlocks', error)
    throw error
  }
}

/**
 * Notion 종목 페이지 객체를 Stock 타입으로 변환
 * @param page - Notion 페이지 응답 객체
 * @returns 변환된 Stock 객체
 */
function pageToStock(page: PageObjectResponse): Stock {
  const props = page.properties

  // 종목명 추출 (title 속성)
  const nameProp = props['Name']
  const name =
    nameProp?.type === 'title' ? extractPlainText(nameProp.title) : ''

  // 종목코드 추출
  const codeProp = props['Code']
  const code =
    codeProp?.type === 'rich_text' ? extractPlainText(codeProp.rich_text) : ''

  // 업종 추출
  const sectorProp = props['Sector']
  const sector =
    sectorProp?.type === 'select' ? (sectorProp.select?.name ?? null) : null

  // 추천일 추출
  const dateProp = props['Date']
  const date = dateProp?.type === 'date' ? (dateProp.date?.start ?? null) : null

  // 활성 상태 추출
  const statusProp = props['Status']
  const status =
    statusProp?.type === 'select'
      ? ((statusProp.select?.name as '활성' | '비활성') ?? null)
      : null

  // 추천 이유 추출
  const reasonProp = props['Reason']
  const reason =
    reasonProp?.type === 'rich_text'
      ? extractPlainText(reasonProp.rich_text) || null
      : null

  // 관련 뉴스 링크 추출
  const newsLinkProp = props['NewsLink']
  const newsLink =
    newsLinkProp?.type === 'url' ? (newsLinkProp.url ?? null) : null

  return { id: page.id, name, code, sector, date, status, reason, newsLink }
}

/**
 * 활성 상태의 추천 종목 목록 조회 (최신순)
 * @returns 활성 추천 종목 배열
 */
export async function getStocks(): Promise<Stock[]> {
  try {
    const response = await withRetry(
      () =>
        notion.databases.query({
          database_id: env.NOTION_STOCKS_DATABASE_ID,
          filter: {
            property: 'Status',
            select: { equals: '활성' },
          },
          sorts: [{ property: 'Date', direction: 'descending' }],
        }),
      { endpoint: 'getStocks' }
    )

    return response.results
      .filter(
        (page): page is PageObjectResponse =>
          page.object === 'page' && 'properties' in page
      )
      .map(pageToStock)
  } catch (error) {
    logNotionError('getStocks', error)
    throw error
  }
}
