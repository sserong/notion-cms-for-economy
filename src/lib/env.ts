/**
 * 환경 변수 유효성 검사 스키마
 * Zod를 사용하여 런타임에 환경 변수를 검증합니다
 */
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  // Notion API 설정 (서버 사이드 전용)
  NOTION_API_KEY: z.string().min(1, 'Notion API 키가 필요합니다').optional(),
  NOTION_DATABASE_ID: z
    .string()
    .min(1, 'Notion 데이터베이스 ID가 필요합니다')
    .optional(),

  // 앱 URL 설정
  VERCEL_URL: z.string().optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
})

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NOTION_API_KEY: process.env.NOTION_API_KEY,
  NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
  VERCEL_URL: process.env.VERCEL_URL,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
})

export type Env = z.infer<typeof envSchema>
