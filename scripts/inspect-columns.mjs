import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fznoqzxbgjcsqfyulilf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6bm9xenhiZ2pjc3FmeXVsaWxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4OTM2MjIsImV4cCI6MjA5NjQ2OTYyMn0.cQFWsPmzMW3IfLWIRbKuVAiTgJEIsjOWAJ31qiYLLcU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function inspectColumns() {
  // Let's run a query to get column names for patrol_results
  // We can query a dummy select or run rpc if available, or just query a row.
  // Actually, we can run a custom SQL query via the REST API if we query information_schema,
  // but Supabase REST API doesn't allow direct SELECT from information_schema unless exposed.
  // Let's check if we can fetch a single row and print its keys.
  const { data, error } = await supabase.from('patrol_results').select('*').limit(1)
  if (error) {
    console.error('Error fetching results:', error)
  } else if (data && data.length > 0) {
    console.log('Columns in patrol_results:', Object.keys(data[0]))
  } else {
    console.log('No rows in patrol_results to inspect keys.')
  }

  const { data: issueData, error: issueError } = await supabase.from('patrol_issues').select('*').limit(1)
  if (issueError) {
    console.error('Error fetching issues:', issueError)
  } else if (issueData && issueData.length > 0) {
    console.log('Columns in patrol_issues:', Object.keys(issueData[0]))
  } else {
    console.log('No rows in patrol_issues to inspect keys.')
  }
}

inspectColumns()
