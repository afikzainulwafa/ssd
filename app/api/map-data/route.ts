import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const estate = searchParams.get('estate') || 'LPYE'

    const mapDir = path.join(process.cwd(), 'map')
    const filePath = path.join(mapDir, `${estate.toUpperCase()}.json`)

    if (!fs.existsSync(filePath)) {
      if (estate.toUpperCase() === 'LPYE') {
        const fallbackPath = path.join(process.cwd(), 'public', 'LPYE_Selection.json')
        if (fs.existsSync(fallbackPath)) {
          const content = await fs.promises.readFile(fallbackPath, 'utf8')
          const parsed = JSON.parse(content)
          return NextResponse.json({ success: true, estate: 'LPYE', data: parsed.data || parsed })
        }
      }
      return NextResponse.json(
        { success: false, estate, error: `Peta GeoJSON tidak tersedia untuk estate ${estate}` },
        { status: 404 }
      )
    }

    const fileContent = await fs.promises.readFile(filePath, 'utf8')
    const jsonData = JSON.parse(fileContent)
    const geoData = jsonData.data || jsonData

    return NextResponse.json({
      success: true,
      estate: estate.toUpperCase(),
      data: geoData
    })
  } catch (error) {
    console.error('Error loading map data:', error)
    return NextResponse.json({ success: false, error: 'Gagal memuat berkas peta' }, { status: 500 })
  }
}
