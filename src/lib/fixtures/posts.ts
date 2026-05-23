/**
 * 더미 포스트 데이터 픽스처
 * Notion API 연동 전 UI 개발 및 테스트용 더미 데이터
 */
import type { Post, PostCategory } from '@/types/notion'

/** 더미 포스트 데이터 배열 (카테고리 4종 고루 포함) */
const DUMMY_POSTS: Post[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    title: '삼성전자 2분기 실적 어닝서프라이즈, HBM 수요 급증이 견인',
    summary:
      '삼성전자가 HBM 메모리 수요 급증으로 2분기 영업이익 예상치를 30% 상회하는 어닝서프라이즈를 기록했습니다.',
    category: '주식',
    tags: ['삼성전자', 'HBM', '반도체', '실적'],
    published: '2026-05-20',
    status: '발행됨',
    newsLink: 'https://news.naver.com/article/001/0001234567',
    relatedStocks: [
      { name: '삼성전자', code: '005930' },
      { name: 'SK하이닉스', code: '000660' },
    ],
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    title: '강남 아파트 가격 3개월 연속 상승, 재건축 규제 완화 기대감 반영',
    summary:
      '강남 3구 아파트 매매가격이 재건축 규제 완화 기대감과 학군 수요로 3개월 연속 상승세를 이어가고 있습니다.',
    category: '부동산',
    tags: ['강남', '아파트', '재건축', '부동산시장'],
    published: '2026-05-19',
    status: '발행됨',
    newsLink: 'https://news.naver.com/article/002/0002345678',
    relatedStocks: [
      { name: '현대건설', code: '000720' },
      { name: 'GS건설', code: '006360' },
    ],
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    title: '연준 금리 동결 결정, 인플레이션 지속에 추가 인하 시그널 후퇴',
    summary:
      '미 연방준비제도가 FOMC 회의에서 기준금리를 동결하며 인플레이션 지속 우려에 추가 인하 시그널을 철회했습니다.',
    category: '거시경제',
    tags: ['연준', 'FOMC', '금리', '인플레이션'],
    published: '2026-05-18',
    status: '발행됨',
    newsLink: 'https://news.naver.com/article/003/0003456789',
    relatedStocks: [{ name: '미래에셋증권', code: '006800' }],
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    title: 'LG에너지솔루션 북미 배터리 공장 증설 확정, ESS 사업 확대',
    summary:
      'LG에너지솔루션이 미국 미시간 주에 ESS(에너지저장장치) 배터리 생산 공장 추가 증설을 공식 확정했습니다.',
    category: '기업·산업',
    tags: ['LG에너지솔루션', '배터리', 'ESS', '북미'],
    published: '2026-05-17',
    status: '발행됨',
    newsLink: 'https://news.naver.com/article/004/0004567890',
    relatedStocks: [
      { name: 'LG에너지솔루션', code: '373220' },
      { name: 'LG화학', code: '051910' },
      { name: '포스코퓨처엠', code: '003670' },
    ],
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    title: 'POSCO홀딩스 리튬 광산 지분 추가 확보, 2차전지 소재 자급률 목표',
    summary:
      'POSCO홀딩스가 아르헨티나 리튬 염호 지분을 추가 확보하여 2030년 2차전지 소재 자급률 70% 달성 목표를 공표했습니다.',
    category: '주식',
    tags: ['POSCO', '리튬', '2차전지', '자원'],
    published: '2026-05-16',
    status: '발행됨',
    newsLink: 'https://news.naver.com/article/001/0001345678',
    relatedStocks: [
      { name: 'POSCO홀딩스', code: '005490' },
      { name: '포스코퓨처엠', code: '003670' },
    ],
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440006',
    title: '한국은행 기준금리 0.25%p 인하, 내수 부진 대응 경기부양',
    summary:
      '한국은행 금융통화위원회가 기준금리를 3.25%에서 3.00%로 0.25%p 인하하며 내수 진작을 위한 경기부양에 나섰습니다.',
    category: '거시경제',
    tags: ['한국은행', '기준금리', '금통위', '경기부양'],
    published: '2026-05-15',
    status: '발행됨',
    newsLink: 'https://news.naver.com/article/003/0003567890',
    relatedStocks: [
      { name: 'KB금융', code: '105560' },
      { name: '신한지주', code: '055550' },
    ],
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440007',
    title: '서울 오피스 공실률 역대 최저, IT 스타트업 임차 수요 급증',
    summary:
      '서울 도심 오피스 공실률이 IT·테크 스타트업의 임차 수요 증가로 역대 최저 수준인 2.3%를 기록했습니다.',
    category: '부동산',
    tags: ['오피스', '공실률', '상업용부동산', '스타트업'],
    published: '2026-05-14',
    status: '발행됨',
    newsLink: 'https://news.naver.com/article/002/0002456789',
    relatedStocks: [{ name: '이지스레지던스리츠', code: '350520' }],
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440008',
    title: '현대차 미국 전기차 시장 점유율 2위 등극, 테슬라 추격 본격화',
    summary:
      '현대자동차그룹이 아이오닉 시리즈 판매 호조로 미국 전기차 시장에서 GM을 제치고 시장 점유율 2위에 올랐습니다.',
    category: '기업·산업',
    tags: ['현대차', '전기차', '미국시장', '아이오닉'],
    published: '2026-05-13',
    status: '발행됨',
    newsLink: 'https://news.naver.com/article/004/0004678901',
    relatedStocks: [
      { name: '현대차', code: '005380' },
      { name: '기아', code: '000270' },
      { name: '현대모비스', code: '012330' },
    ],
  },
]

/** 모든 더미 포스트 반환 */
export function getDummyPosts(): Post[] {
  return DUMMY_POSTS
}

/** 카테고리별 더미 포스트 반환 */
export function getDummyPostsByCategory(category: PostCategory): Post[] {
  return DUMMY_POSTS.filter(post => post.category === category)
}

/** ID로 더미 포스트 단건 반환 */
export function getDummyPostById(id: string): Post | undefined {
  return DUMMY_POSTS.find(post => post.id === id)
}
