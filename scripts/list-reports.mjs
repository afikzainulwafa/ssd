import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fznoqzxbgjcsqfyulilf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6bm9xenhiZ2pjc3FmeXVsaWxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4OTM2MjIsImV4cCI6MjA5NjQ2OTYyMn0.cQFWsPmzMW3IfLWIRbKuVAiTgJEIsjOWAJ31qiYLLcU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function listAll() {
  const { data: reports } = await supabase.from('patrol_reports').select('*').order('date', { ascending: false })
  console.log('--- PATROL REPORTS ---')
  console.log(JSON.stringify(reports, null, 2))

  const { data: results } = await supabase.from('patrol_results').select('*')
  console.log('--- PATROL RESULTS ---')
  console.log(JSON.stringify(results, null, 2))

  const { data: issues } = await supabase.from('patrol_issues').select('*')
  console.log('--- PATROL ISSUES ---')
  console.log(JSON.stringify(issues, null, 2))
}

listAll()
