import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fznoqzxbgjcsqfyulilf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6bm9xenhiZ2pjc3FmeXVsaWxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4OTM2MjIsImV4cCI6MjA5NjQ2OTYyMn0.cQFWsPmzMW3IfLWIRbKuVAiTgJEIsjOWAJ31qiYLLcU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function check() {
  const { data: reports } = await supabase.from('patrol_reports').select('*')
  console.log('REPORTS COUNT:', reports?.length)
  console.log('REPORTS sample:', reports?.slice(0, 3))

  const { data: results } = await supabase.from('patrol_results').select('*')
  console.log('RESULTS COUNT:', results?.length)
  console.log('RESULTS sample:', results?.slice(0, 3))

  const { data: issues } = await supabase.from('patrol_issues').select('*')
  console.log('ISSUES COUNT:', issues?.length)
  console.log('ISSUES sample:', issues?.slice(0, 3))
}

check()
