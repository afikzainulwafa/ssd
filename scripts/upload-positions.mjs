import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import { parse } from 'csv-parse/sync'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const file = fs.readFileSync('/Users/charamargarethmanalu/Downloads/Tracking New/positions.csv', 'utf8')
const records = parse(file, { columns: true, skip_empty_lines: true })

const rows = records.map(r => ({
  id: parseInt(r.id),
  device_id: parseInt(r.deviceId),
  fix_time: new Date(r.fixTime).toISOString(),
  latitude: parseFloat(r.latitude),
  longitude: parseFloat(r.longitude),
  speed: parseFloat(r.speed),
  course: parseFloat(r.course),
  distance: parseFloat(r.distance),
  motion: r.motion === 'true'
}))

console.log(`Uploading ${rows.length} rows...`)

for (let i = 0; i < rows.length; i += 100) {
  const batch = rows.slice(i, i + 100)
  const { error } = await supabase.from('gps_positions').insert(batch)
  if (error) console.error('Error:', error)
  else console.log(`Uploaded ${i + batch.length}/${rows.length}`)
}

console.log('Done!')
