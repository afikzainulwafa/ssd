import { createClient } from '@supabase/supabase-js'
import type { PatrolEvent } from '@/components/event-panel-types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-smarttrack.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project') &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')
)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type GpsPosition = {
  id: number
  device_id: number
  fix_time: string
  latitude: number
  longitude: number
  speed: number
  course: number
  distance: number
  motion: boolean
}

export type PatrolReport = {
  id: string
  date: string
  estate: string
  type: 'Car' | 'Motorcycle'
  nopol: string
  tracking_available: boolean
  created_at: string
}

export type TeamAssignment = {
  manager: string
  pic: string
  kanitpam: string
  danru_shift1?: string
  danru_shift2?: string
  danru_shift3?: string
  driver_shift1?: string
  driver_shift2?: string
  driver_shift3?: string
  anggota_shift1: string | string[]
  anggota_shift2: string | string[]
  anggota_shift3: string | string[]
  priority_level?: 'normal' | 'urgent'
  manager_comment?: string
  manager_comment_at?: string
  manager_comment_nik?: string
  manager_comment_name?: string
  rc_comment?: string
  rc_comment_at?: string
  rc_comment_nik?: string
  rc_comment_name?: string
  srmd_comment?: string
  srmd_comment_at?: string
  srmd_comment_nik?: string
  srmd_comment_name?: string
}

export type PatrolResult = {
  id: string
  report_id: string
  stops: PatrolEvent[]
  out_of_route: PatrolEvent[]
  speed_violations: PatrolEvent[]
  baseline_distance: number
  actual_distance: number
  out_of_route_km: number
  baseline_covered: number
  baseline_covered_pct: number
  patrol_summary: string
  action_plan: string
  team_assignment: TeamAssignment
  priority_level?: 'normal' | 'urgent'
  manager_comment?: string
  manager_comment_at?: string
  rc_comment?: string
  rc_comment_at?: string
  submitted_at: string
}

export type PatrolIssue = {
  id: string
  report_id: string
  issue_type: 'vehicle' | 'gps'
  description: string
  submitted_at: string
}