import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fznoqzxbgjcsqfyulilf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6bm9xenhiZ2pjc3FmeXVsaWxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4OTM2MjIsImV4cCI6MjA5NjQ2OTYyMn0.cQFWsPmzMW3IfLWIRbKuVAiTgJEIsjOWAJ31qiYLLcU'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testFetch() {
  const [{ data: results }, { data: issues }] = await Promise.all([
    supabase.from('patrol_results').select('*, patrol_reports(*)'),
    supabase.from('patrol_issues').select('*, patrol_reports(*)'),
  ])

  const rowsMap = new Map()

  if (results) {
    results.forEach((row) => {
      const report = row.patrol_reports
      if (report) {
        if (report.id === '307b9e87-548e-4a14-9cf8-03146a5b646d') {
          report.type = 'Car'
          report.nopol = 'BK 7788 XY'
        }
        const assignment = row.team_assignment || {}
        rowsMap.set(report.id, {
          report,
          result: row,
          issue: null,
          pic: assignment.pic?.trim() || '—',
        })
      }
    })
  }

  if (issues) {
    issues.forEach((row) => {
      const report = row.patrol_reports
      if (report) {
        if (report.id === '307b9e87-548e-4a14-9cf8-03146a5b646d') {
          report.type = 'Car'
          report.nopol = 'BK 7788 XY'
        }
        const existing = rowsMap.get(report.id)
        if (existing) {
          existing.issue = row
        } else {
          rowsMap.set(report.id, {
            report,
            result: null,
            issue: row,
            pic: '—',
          })
        }
      }
    })
  }

  const dbRows = Array.from(rowsMap.values())
  console.log('dbRows Count:', dbRows.length)
  dbRows.forEach((r, idx) => {
    console.log(`- ${idx+1}: ID=${r.report.id} Nopol=${r.report.nopol} Date=${r.report.date} PIC=${r.pic}`)
  })
}

testFetch()
