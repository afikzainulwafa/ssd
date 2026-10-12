const fs = require('fs');
const path = require('path');

try {
  const jsonPath = path.join(process.cwd(), 'map', 'LPYE.json');
  if (!fs.existsSync(jsonPath)) {
    console.error('Error: map/LPYE.json not found at:', jsonPath);
    process.exit(1);
  }

  const rawData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const geojson = rawData.data || rawData;
  const features = geojson.features || [];

  const stats = {};

  features.forEach(f => {
    const p = f.properties;
    const parent = p.ket_ast || 'Lain-lain';
    const child = p.keterangan || 'Lain-lain';
    const ha = p.hectare || 0;
    
    if (!stats[child]) {
      stats[child] = {
        parent: parent,
        count: 0,
        area: 0
      };
    }
    stats[child].count += 1;
    stats[child].area += ha;
  });

  // Convert stats to array and sort by area descending
  const rows = Object.entries(stats).map(([childName, val]) => ({
    child: childName,
    parent: val.parent,
    count: val.count,
    area: parseFloat(val.area.toFixed(4))
  })).sort((a, b) => b.area - a.area);

  // Create CSV content (UTF-8 BOM for Excel auto-detection of encoding)
  let csvContent = '\uFEFF';
  csvContent += '"No","Kategori Induk (Parent)","Nama Atribut (Child)","Jumlah Blok","Total Luas (Ha)"\n';

  rows.forEach((row, i) => {
    csvContent += `${i + 1},"${row.parent.replace(/"/g, '""')}","${row.child.replace(/"/g, '""')}",${row.count},${row.area}\n`;
  });

  const outputPath = path.join(process.cwd(), 'Rangkuman_Atribut_Peta_LPYE.csv');
  fs.writeFileSync(outputPath, csvContent, 'utf8');
  console.log('SUCCESS: CSV file successfully generated at:', outputPath);
} catch (error) {
  console.error('Error generating summary:', error);
  process.exit(1);
}
