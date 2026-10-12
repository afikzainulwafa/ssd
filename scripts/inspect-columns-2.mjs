import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fznoqzxbgjcsqfyulilf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6bm9xenhiZ2pjc3FmeXVsaWxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4OTM2MjIsImV4cCI6MjA5NjQ2OTYyMn0.cQFWsPmzMW3IfLWIRbKuVAiTgJEIsjOWAJ31qiYLLcU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testSelect() {
  const { data, error } = await supabase.from('patrol_results').select('id, priority_level, manager_comment, rc_comment').limit(1)
  if (error) {
    console.error('Error with explicit columns:', error)
  } else {
    console.log('Success, data:', data)
  }
}

testSelect()
