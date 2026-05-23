/**
 * 더미 추천종목 데이터 픽스처
 * Notion API 연동 전 UI 개발 및 테스트용 더미 데이터
 */
import type { Stock } from '@/types/notion'

/** 더미 추천종목 배열 (활성 4개, 비활성 1개) */
const DUMMY_STOCKS: Stock[] = [
  {
    id: '660e8400-e29b-41d4-a716-446655440001',
    name: '삼성전자',
    code: '005930',
    sector: '반도체·전자',
    date: '2026-05-20',
    status: '활성',
    reason:
      'HBM3E 공급 본격화로 메모리 부문 수익성이 빠르게 개선되고 있습니다. 파운드리 2nm 수율 개선에 따른 대형 고객사 확보 가능성이 높아 하반기 추가 실적 모멘텀이 기대됩니다. AI 반도체 수요 사이클의 최대 수혜주로 중장기 매수 관점을 유지합니다.',
    newsLink: 'https://news.naver.com/article/001/0001234567',
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440002',
    name: '현대차',
    code: '005380',
    sector: '자동차',
    date: '2026-05-19',
    status: '활성',
    reason:
      '미국 전기차 시장 점유율 2위 등극으로 글로벌 EV 경쟁력이 입증되었습니다. 아이오닉 9 출시와 함께 SUV 라인업 확대로 북미 매출 성장이 가속화될 전망입니다. PBR 0.7배 수준의 저평가 구간으로 배당 매력도도 함께 부각되고 있습니다.',
    newsLink: 'https://news.naver.com/article/004/0004678901',
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440003',
    name: 'LG에너지솔루션',
    code: '373220',
    sector: '2차전지',
    date: '2026-05-17',
    status: '활성',
    reason:
      '북미 ESS 배터리 공장 증설 확정으로 에너지저장장치 사업 성장 기반을 강화했습니다. GM·GM·스텔란티스 등 글로벌 완성차 업체와의 JV 공장 가동률이 상승 중이며, 전방 수요 회복과 함께 수익성 개선이 기대됩니다.',
    newsLink: 'https://news.naver.com/article/004/0004567890',
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440004',
    name: 'KB금융',
    code: '105560',
    sector: '금융·은행',
    date: '2026-05-15',
    status: '활성',
    reason:
      '한국은행 금리 인하에도 순이자마진(NIM) 방어가 예상보다 견조하게 나타나고 있습니다. 자사주 매입·소각 및 배당 확대 정책으로 주주환원율이 업계 최상위 수준을 유지하고 있어 안정적인 배당 수익이 기대됩니다.',
    newsLink: 'https://news.naver.com/article/003/0003567890',
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440005',
    name: 'NAVER',
    code: '035420',
    sector: 'IT·플랫폼',
    date: '2026-04-10',
    status: '비활성',
    reason:
      '라인야후 지분 매각 이슈가 장기화되면서 불확실성이 지속되고 있습니다. 국내 쇼핑·광고 매출 성장률 둔화와 AI 사업 투자 비용 증가로 단기 수익성 회복이 지연될 수 있어 관망 전환합니다.',
    newsLink: null,
  },
]

/** 더미 추천종목 배열 전체 반환 */
export function getDummyStocks(): Stock[] {
  return DUMMY_STOCKS
}
