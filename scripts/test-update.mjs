import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fznoqzxbgjcsqfyulilf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6bm9xenhiZ2pjc3FmeXVsaWxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4OTM2MjIsImV4cCI6MjA5NjQ2OTYyMn0.cQFWsPmzMW3IfLWIRbKuVAiTgJEIsjOWAJ31qiYLLcU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testUpdate() {
  const { data: results } = await supabase.from('patrol_results').select('report_id').limit(1)
  if (!results || results.length === 0) {
    console.log('No results to test update.')
    return
  }

  const reportId = results[0].report_id
  console.log('Testing update for report_id:', reportId)

  const { error } = await supabase.from('patrol_results').update({
    manager_comment: 'Test manager comment',
    manager_comment_at: new Date().toISOString()
  }).eq('report_id', reportId)

  if (error) {
    console.error('Update failed:', error)
  } else {
    console.log('Update succeeded!')
  }
}

testUpdate()
