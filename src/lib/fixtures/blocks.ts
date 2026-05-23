/**
 * 더미 Notion 블록 데이터 픽스처
 * 경제뉴스 본문처럼 구성된 블록 배열 (Notion API 연동 전 UI 테스트용)
 */
import type { NotionBlock } from '@/types/notion'

/** 경제뉴스 본문 더미 블록 배열 */
const DUMMY_BLOCKS: NotionBlock[] = [
  {
    id: 'block-001',
    type: 'heading_1',
    content: '삼성전자 2분기 실적 분석',
  },
  {
    id: 'block-002',
    type: 'paragraph',
    content:
      '삼성전자가 2026년 2분기 영업이익에서 시장 예상치를 크게 상회하는 어닝서프라이즈를 기록했습니다. HBM(고대역폭메모리) 수요 급증과 파운드리 부문 수율 개선이 주요 요인으로 분석됩니다. 반도체 사이클의 본격적인 상승 국면 진입 신호로 해석되며, 시장의 관심이 집중되고 있습니다.',
  },
  {
    id: 'block-003',
    type: 'heading_2',
    content: '핵심 실적 요약',
  },
  {
    id: 'block-004',
    type: 'bulleted_list_item',
    content: '2분기 영업이익: 15조 2,000억 원 (전년 대비 +85%)',
  },
  {
    id: 'block-005',
    type: 'bulleted_list_item',
    content: 'HBM3E 출하량: 전분기 대비 40% 증가, 엔비디아 공급 재개 확인',
  },
  {
    id: 'block-006',
    type: 'bulleted_list_item',
    content: '파운드리 부문 흑자 전환, 2nm 공정 수율 60% 돌파',
  },
  {
    id: 'block-007',
    type: 'paragraph',
    content:
      '특히 HBM3E 12단 제품의 엔비디아 납품이 본격화되면서 메모리 부문의 수익성이 크게 개선되었습니다. 하반기에는 HBM4 양산이 예정되어 있어 실적 개선 추세는 지속될 것으로 전망됩니다.',
  },
  {
    id: 'block-008',
    type: 'heading_2',
    content: '향후 투자 전략',
  },
  {
    id: 'block-009',
    type: 'numbered_list_item',
    content: '단기(1~3개월): HBM 공급 확대 모멘텀 지속 여부 모니터링',
  },
  {
    id: 'block-010',
    type: 'numbered_list_item',
    content:
      '중기(3~6개월): 파운드리 2nm 수율 개선 및 대형 고객사 확보 여부 확인',
  },
  {
    id: 'block-011',
    type: 'numbered_list_item',
    content:
      '장기(6개월 이상): AI 반도체 사이클 및 경쟁사 대비 기술 우위 유지 여부 판단',
  },
  {
    id: 'block-012',
    type: 'quote',
    content:
      '"반도체 슈퍼사이클은 AI 수요를 기반으로 이번 사이클은 과거와 다른 구조적 성장을 보여줄 것입니다." — 삼성전자 IR 담당 부사장',
  },
  {
    id: 'block-013',
    type: 'paragraph',
    content:
      '증권가에서는 삼성전자의 12개월 목표주가를 평균 12만 원으로 상향 조정하고 있습니다. 다만 미중 반도체 규제 리스크와 환율 변동성은 주요 하방 요인으로 지속 모니터링이 필요합니다.',
  },
  {
    id: 'block-014',
    type: 'code',
    content: `// 삼성전자 실적 데이터 (단위: 억 원)
const earnings = {
  Q2_2025: { revenue: 740000, operatingProfit: 82000 },
  Q2_2026: { revenue: 890000, operatingProfit: 152000 },
  yoyGrowth: {
    revenue: '+20.3%',
    operatingProfit: '+85.4%',
  },
}`,
    language: 'javascript',
  },
  {
    id: 'block-015',
    type: 'divider',
    content: '',
  },
  {
    id: 'block-016',
    type: 'paragraph',
    content:
      '본 콘텐츠는 투자 참고용으로 제공되며, 특정 종목에 대한 매수·매도를 권유하는 것이 아닙니다. 투자 판단의 최종 책임은 투자자 본인에게 있으며, 투자 시 손실이 발생할 수 있습니다.',
  },
  {
    id: 'block-017',
    type: 'image',
    content:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=60',
  },
]

/** 더미 블록 배열 반환 */
export function getDummyBlocks(): NotionBlock[] {
  return DUMMY_BLOCKS
}
