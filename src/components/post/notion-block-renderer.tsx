/**
 * Notion 블록 렌더러 컴포넌트
 * NotionBlock 배열을 받아 각 타입에 맞는 HTML 요소로 렌더링합니다
 * 연속된 bulleted_list_item / numbered_list_item은 하나의 ul/ol로 그루핑합니다
 */
import type { NotionBlock, NotionBlockType } from '@/types/notion'

interface NotionBlockRendererProps {
  /** 렌더링할 블록 배열 */
  blocks: NotionBlock[]
}

/** 리스트 타입 판별 유틸리티 */
function isListType(
  type: NotionBlockType
): type is 'bulleted_list_item' | 'numbered_list_item' {
  return type === 'bulleted_list_item' || type === 'numbered_list_item'
}

/**
 * 블록 배열을 그루핑된 세그먼트로 변환합니다
 * 연속된 같은 타입의 리스트 블록을 하나의 그룹으로 묶습니다
 */
function groupBlocks(
  blocks: NotionBlock[]
): Array<NotionBlock | NotionBlock[]> {
  const result: Array<NotionBlock | NotionBlock[]> = []
  let i = 0

  while (i < blocks.length) {
    const block = blocks[i]

    if (isListType(block.type)) {
      // 같은 리스트 타입이 연속되는 구간을 찾아 그루핑
      const listType = block.type
      const group: NotionBlock[] = [block]
      let j = i + 1

      while (j < blocks.length && blocks[j].type === listType) {
        group.push(blocks[j])
        j++
      }

      result.push(group)
      i = j
    } else {
      result.push(block)
      i++
    }
  }

  return result
}

/** 단일 블록을 렌더링하는 함수 */
function renderBlock(block: NotionBlock) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p key={block.id} className="mb-4 leading-7">
          {block.content}
        </p>
      )

    case 'heading_1':
      return (
        <h1 key={block.id} className="mt-8 mb-4 text-3xl font-bold">
          {block.content}
        </h1>
      )

    case 'heading_2':
      return (
        <h2 key={block.id} className="mt-6 mb-3 text-2xl font-semibold">
          {block.content}
        </h2>
      )

    case 'heading_3':
      return (
        <h3 key={block.id} className="mt-4 mb-2 text-xl font-semibold">
          {block.content}
        </h3>
      )

    case 'image':
      return (
        <div key={block.id}>
          {/* next/image 대신 img 태그 사용 — 외부 도메인 설정 불필요 */}
          {/* TODO: 이미지 최적화를 위해 추후 next/image로 교체 고려 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.content} alt="" className="my-4 w-full rounded-lg" />
        </div>
      )

    case 'code':
      return (
        <pre
          key={block.id}
          className="bg-muted my-4 overflow-x-auto rounded-lg p-4"
        >
          <code className="text-sm">{block.content}</code>
        </pre>
      )

    case 'quote':
      return (
        <blockquote
          key={block.id}
          className="border-primary my-4 border-l-4 pl-4 italic"
        >
          {block.content}
        </blockquote>
      )

    case 'divider':
      return <hr key={block.id} className="my-8" />

    default:
      return null
  }
}

/** 그루핑된 리스트 블록을 ul/ol로 렌더링 */
function renderListGroup(group: NotionBlock[]) {
  if (group.length === 0) return null
  const firstBlock = group[0]
  const groupKey = firstBlock.id

  if (firstBlock.type === 'bulleted_list_item') {
    return (
      <ul key={groupKey} className="mb-4">
        {group.map(block => (
          <li key={block.id} className="mb-1 ml-6 list-disc">
            {block.content}
          </li>
        ))}
      </ul>
    )
  }

  if (firstBlock.type === 'numbered_list_item') {
    return (
      <ol key={groupKey} className="mb-4">
        {group.map(block => (
          <li key={block.id} className="mb-1 ml-6 list-decimal">
            {block.content}
          </li>
        ))}
      </ol>
    )
  }

  return null
}

export function NotionBlockRenderer({ blocks }: NotionBlockRendererProps) {
  // 연속된 리스트 블록을 그루핑
  const groupedSegments = groupBlocks(blocks)

  return (
    <div className="prose-neutral prose max-w-none">
      {groupedSegments.map(segment => {
        // 배열이면 리스트 그룹, 단일 객체면 일반 블록
        if (Array.isArray(segment)) {
          return renderListGroup(segment)
        }
        return renderBlock(segment)
      })}
    </div>
  )
}
