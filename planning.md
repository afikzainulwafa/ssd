# Finalized Reports & Analytics Implementation Plan & Verification Log

Dokumen ini memuat keputusan arsitektur, aturan bisnis klasifikasi laporan patroli, struktur antarmuka antarmuka terbaru (Single Horizontal Summary Row Container), spesifikasi data mock deterministik 6 bulan, serta hasil verifikasi runtime pada proyek SmartTrack.

---

## 1. Aturan Bisnis & Klasifikasi Utama (Final Report Model)

### A. Model Laporan Harian
- **Kuantitas Laporan**: Sistem secara otomatis menggenerasi **tepat 1 laporan patroli harian per kendaraan per tanggal patroli**.
- **Status Pengiriman (Submission Status)**: Tepat 2 status pengiriman:
  1. `Sudah Dikirim` (Submitted)
  2. `Belum Dikirim` (Awaiting PIC Submission)
- **Kategori Utama Laporan Terkirim (Primary Categories)**: Setiap laporan yang `Sudah Dikirim` tergolong secara eksklusif ke tepat 1 kategori utama:
  1. `Normal`
  2. `Urgent`
  3. `Unit Rusak`
  4. `GPS Rusak`

### B. Urutan Preseden Klasifikasi (Classification Precedence)
1. **Preseden 1 (Unit Rusak)**: Jika kendaraan mengalami breakdown/kerusakan teknis pada hari patroli, klasifikasikan laporan sebagai **Unit Rusak**, terlepas dari kondisi GPS. Jika kendaraan dan GPS sama-sama rusak, hitung laporan hanya di **Unit Rusak** (catatan detail GPS tetap disimpan pada log insiden, tetapi tidak menambah count kategori GPS Rusak).
2. **Preseden 2 (GPS Rusak)**: Jika kendaraan berfungsi normal tetapi perangkat GPS rusak/off sinyal, klasifikasikan laporan sebagai **GPS Rusak** (kendaraan tetap beroperasi patroli tanpa GPS).
3. **Preseden 3 (Normal & Urgent)**: Jika kendaraan dan GPS berfungsi normal, klasifikasikan laporan sebagai **Normal** atau **Urgent** sesuai aturan prioritas operasional patroli.

### C. Rekonsiliasi Matematika Laporan
- `Sudah Dikirim = Normal + Urgent + Unit Rusak + GPS Rusak`
- `Total Expected Reports = Sudah Dikirim + Belum Dikirim`
- Formulasi Disiplin Upload:
  $$\text{Disiplin Upload (\%)} = \frac{\text{Laporan Sudah Dikirim}}{\text{Total Target Expected Reports}} \times 100\%$$
- `Target Expected Reports = Hari Kalender Periode × Jumlah Unit Kendaraan Milik Scope`

---

## 2. Aturan Insiden / Eksepsi GPS (Kecepatan, Keluar Rute, Berhenti)

1. **Child Metrics dari Combined Normal + Urgent Group**:
   - Indikator `Kecepatan >50 km/jam`, `Keluar Rute`, dan `Berhenti >30 menit` adalah anak metrik dari gabungan kelompok **Normal + Urgent**.
   - Eksepsi dapat muncul baik pada laporan **Normal** maupun **Urgent**. Suatu laporan tidak menjadi Urgent hanya karena memiliki insiden eksepsi.
2. **Eksklusi Laporan Rusak**:
   - Laporan kategori **Unit Rusak** dan **GPS Rusak** secara eksklusif **dikecualikan** dari ringkasan eksepsi berbasis GPS.
3. **Primary Value = Event Count (`kejadian`)**:
   - Nilai utama indikator eksepsi menggunakan **jumlah kejadian** (`kejadian`).
   - Jumlah laporan terpengaruh (*affected-report count*) dan total durasi/jarak ditampilkan pada tooltip dan detail view.
   - Event count tidak bersifat aditif terhadap total laporan terkirim.

---

## 3. Desain Antarmuka Desktop: Single Horizontal Summary Container

Wadah utama `Laporan Patroli` disusun dalam **1 baris horizontal pada layar desktop** (lebar 1280px & 1440px dengan sidebar terbuka) dengan 3 kelompok utama:

1. **Left Group: Pengiriman (~25% width)**
   - Highlight visual utama: Persentase `Sudah Dikirim (%)`.
   - Jumlah laporan terkirim / expected target (`reportsKpis.sudahDikirimCount / reportsKpis.targetReports`).
   - Di bawahnya: Komponen klik ringkas terpisah `Belum Dikirim` dengan jumlah count.
2. **Middle Group: Laporan Patroli (~45% width)**
   - Dua ringkasan interaktif berdampingan: `Normal` dan `Urgent`.
   - Tepat di bawah keduanya: 3 indikator eksepsi ringkas interaktif yang **tampil secara default**: `Kecepatan | Keluar Rute | Berhenti`.
3. **Right Group: Laporan Kerusakan (~30% width)**
   - Dua ringkasan interaktif berdampingan: `Unit Rusak` dan `GPS Rusak`.

---

## 4. Perilaku Panel Detail Terintegrasi (Shared Detail Panel)

Masing-masing dari 9 elemen ringkasan dapat diklik untuk membuka/mengubah panel detail di bawah container utama:
- **Sudah Dikirim**: Menampilkan chart kolom vertikal pengiriman, tabel ringkasan (Perbandingan / Tren 6 Bulan), dan tabel detail laporan harian dari 4 kategori utama.
- **Belum Dikirim**: Menampilkan daftar/tabel laporan harian otomatis yang belum dikirim oleh PIC.
- **Normal**: Menampilkan daftar laporan harian terkirim dengan kategori Normal.
- **Urgent**: Menampilkan daftar laporan harian terkirim dengan kategori Urgent.
- **Unit Rusak**: Menampilkan daftar laporan harian terkirim dengan kategori Unit Rusak.
- **GPS Rusak**: Menampilkan daftar laporan harian terkirim dengan kategori GPS Rusak (kendaraan aktif).
- **Kecepatan / Keluar Rute / Berhenti**: Menampilkan detail insiden eksepsi dengan **Local Priority Filter** (`Semua | Normal | Urgent`), grafik distribusi alasan, rincian shift 1–3, serta tabel detail kejadian dengan ikon aksi kaca pembesar (`🔍 Detail`).

---

## 5. Grafik Vertikal & Perilaku Referensi Bar Chart

- **Grafik Vertikal Bar Chart**: Menyediakan 2 tombol segmen kanan (`Perbandingan | Tren 6 Bulan` dan `% | Jumlah`).
- **Penghapusan Garis Referensi**: Sesuai petunjuk final, **seluruh garis referensi 90% dan 100% dihapus dari grafik**.
- **Skema Warna Disiplin Upload**:
  - Hijau $\ge 100\%$
  - Kuning $90\% \le x < 100\%$
  - Merah $< 90\%$
  - N/A jika penyebut nol

---

## 6. Matriks Verifikasi Fitur & Status Kode

| No | Kebutuhan / Spesifikasi | Path Kode Target | Status | Bukti & Catatan Verifikasi |
| :- | :--- | :--- | :--- | :--- |
| 1 | **Submission Vertical Bar Charts & Axis Scaling** | [`app/reports/page.tsx`](file:///c:/Users/23000984/Downloads/Downloads/Projects/Dashbaord%20Enhancement/Replatform/Milestone%203/mockup/smarttrack/smarttrack/app/reports/page.tsx) | **Passed** | Explicit Y-axis (0-100% for `%` mode with 10% ticks; integer ticks for `Jumlah` mode). Vertical bar heights reflect exact proportions. In-page daily report drilldowns below summary tables. |
| 2 | **Donut Chart & Legend Table for Exception Breakdowns** | [`lib/selectors.ts`](file:///c:/Users/23000984/Downloads/Downloads/Projects/Dashbaord%20Enhancement/Replatform/Milestone%203/mockup/smarttrack/smarttrack/lib/selectors.ts), [`app/reports/page.tsx`](file:///c:/Users/23000984/Downloads/Downloads/Projects/Dashbaord%20Enhancement/Replatform/Milestone%203/mockup/smarttrack/smarttrack/app/reports/page.tsx) | **Passed** | Applied to `Kecepatan >50 km/jam`, `Keluar Rute`, and `Berhenti >30m`. Modes restricted to `Alasan | Perbandingan` (Tren removed). Desktop layout ~65% Summary Table + ~35% Donut Chart. SVG donut center displays total matching event count (`"18"` / `"kejadian"`). Event % represents event share. Columns: `[Dynamic Label] | S1 | S2 | S3 | Total | %`. Colors identify categories with color markers in table. |
| 3 | **Event Detail Tables & Single Shift Column** | [`lib/selectors.ts`](file:///c:/Users/23000984/Downloads/Downloads/Projects/Dashbaord%20Enhancement/Replatform/Milestone%203/mockup/smarttrack/smarttrack/lib/selectors.ts), [`app/reports/page.tsx`](file:///c:/Users/23000984/Downloads/Downloads/Projects/Dashbaord%20Enhancement/Replatform/Milestone%203/mockup/smarttrack/smarttrack/app/reports/page.tsx) | **Passed** | 3 shift-duration columns replaced with single `Shift` column (`Shift 1` / `Shift 2` / `Shift 3`). Single `Durasi` column (`formatDurationFormatted`). `Kejadian` displays original index `#1`, `#2`... Tailored columns: Kecepatan -> `Jarak`, Keluar Rute -> `Jarak Keluar`, Berhenti -> `Lokasi`. Magnifying glass `🔍` button. |
| 4 | **Priority Filter & Card Interaction** | [`app/reports/page.tsx`](file:///c:/Users/23000984/Downloads/Downloads/Projects/Dashbaord%20Enhancement/Replatform/Milestone%203/mockup/smarttrack/smarttrack/app/reports/page.tsx) | **Passed** | Normal/Urgent cards remain sole priority controls. Click to filter, click again to toggle off. Exclude `Unit Rusak` and `GPS Rusak` from exception calculations. |
| 5 | **Refined Belum Dikirim Dedicated View** | [`app/reports/page.tsx`](file:///c:/Users/23000984/Downloads/Downloads/Projects/Dashbaord%20Enhancement/Replatform/Milestone%203/mockup/smarttrack/smarttrack/app/reports/page.tsx) | **Passed** | Columns: `Tanggal Patroli | Estate | Tipe | Nopol / Vehicle ID | Pelacakan | Status Pengiriman | Detail`. Tipe shows `🚗 Mobil` / `🏍️ Motor`. Plate on line 1, ID on line 2. `Pelacakan` shows `Tersedia` green / `Tidak Tersedia` gray badge. |
| 6 | **TypeScript Type Checking (`npx tsc --noEmit`)** | Terminal Check | **Passed** | **Exit code 0**, 0 errors across the entire codebase. |
| 9 | **Persistent Toggleable Priority Filter (`Normal / Urgent / ALL`)** | `app/reports/page.tsx` & `lib/selectors.ts` | **Passed** | `priorityFilter` (`ALL`, `Normal`, `Urgent`) recalculates exception counters dynamically while maintaining top-level sibling totals. Preserved when selecting exception details and updates in-place when priority is toggled. |
| 10 | **Footnote Text Removal** | `app/reports/page.tsx` | **Passed** | Breakdown footnote text (`* Kendaraan breakdown diutamakan di Unit Rusak (GPS tidak ganda).`) completely removed without replacement. Underlying business rule maintained. |
| 11 | **Redundant Priority Controls Removal** | `app/reports/page.tsx` | **Passed** | Separate priority buttons inside exception detail containers removed. Plain text context displayed (`Normal`, `Urgent`, `Normal + Urgent`). Summary cards `Normal`/`Urgent` remain sole priority controls. |
| 12 | **Date-Range Filtering (Periode)** | `app/reports/page.tsx` & `lib/selectors.ts` | **Passed** | Date-range picker added (`Bulan Ini`, `Bulan Lalu`, `7 Hari Terakhir`, `30 Hari Terakhir`, `Rentang Kustom`). Recalculates expected reports, KPI cards, charts, and exports. |
| 13 | **Speeding Detail Side-by-Side Container & Primary Reason Table** | `app/reports/page.tsx` & `lib/selectors.ts` | **Passed** | Primary reason summary table (`Alasan`, `Kejadian`, `%`) side-by-side with chart mode (`Alasan | Tren | Perbandingan`). Percentage denominator is total speeding events in scope. |
| 14 | **Secondary Drilldown Table & Individual Event Modal** | `app/reports/page.tsx` | **Passed** | Secondary table displays daily vehicle rows with `Shift 1`, `Shift 2`, `Shift 3` duration columns and `🔍 Detail` action button opening exact timestamped event details. |

---

## 7. Interaksi Filter Prioritas Persisten (`Normal / Urgent`) & Penghapusan Footnote

1. **State Independen**:
   - `priorityFilter`: `'ALL' | 'Normal' | 'Urgent'` (Default: `'ALL'`).
   - `selectedSummaryKey`: `'Sudah Dikirim' | 'Belum Dikirim' | 'Normal' | 'Urgent' | 'Unit Rusak' | 'GPS Rusak' | 'Kecepatan' | 'Keluar Rute' | 'Berhenti'`.

2. **Perilaku Klik Prioritas**:
   - **Klik Normal**: Mengaktifkan filter `Normal`. Eksepsi (`Kecepatan`, `Keluar Rute`, `Berhenti`) dihitung ulang khusus dari laporan Normal.
   - **Klik Urgent**: Mengaktifkan filter `Urgent`. Eksepsi dihitung ulang khusus dari laporan Urgent.
   - **Klik Prioritas Aktif Lagi**: Menghapus filter prioritas (kembali ke `ALL`). Indikator eksepsi dihitung ulang dari gabungan Normal + Urgent.
   - **Ganti Prioritas Directly**: Langsung beralih antara Normal dan Urgent. Normal dan Urgent tidak dapat dipilih bersamaan.
   - **Preservasi Detail Saat Prioritas Berubah**: Jika detail eksepsi (`Kecepatan`, `Keluar Rute`, `Berhenti`) sedang terbuka, mengubah atau menghapus filter prioritas akan memperbarui view detail eksepsi **di tempat (in-place)** dengan konteks dinamis (misal `"Berhenti · Normal"`, `"Kecepatan · Urgent"`, `"Keluar Rute · Semua"`). View tidak ter-reset ke daftar laporan umum.
   - **Buka Eksepsi Tanpa Prioritas**: Membuka eksepsi dari state default (`ALL`) menampilkan detail eksepsi dari gabungan Normal + Urgent.

3. **Gaya Visual & Feedback**:
   - Card `Normal` dan `Urgent` yang aktif memiliki highlight border/background tebal khusus.
   - Indikator eksepsi yang dipilih di-highlight secara independen (dua highlight visible bersamaan).
   - Tooltip pada card Normal & Urgent: `"Klik lagi untuk menampilkan semua."`
   - Judul konteks detail yang jelas (`"Kecepatan · Normal"`, `"Berhenti · Urgent"`, `"Keluar Rute · Semua"`).
   - Menampilkan angka `0` dan empty state jika tidak ada kejadian eksepsi yang cocok pada filter prioritas aktif.

4. **Penghapusan Footnote**:
   - Teks footnote `* Kendaraan breakdown diutamakan di Unit Rusak (GPS tidak ganda).` telah dihapus sepenuhnya dari tampilan antarmuka.
   - Aturan klasifikasi mendasar tetap dipertahankan secara konsisten di backend selector & generator.

---

## 8. Modul Analisis Patroli: Filter Periode Tanggal & Container Detail Kecepatan >50 km/jam

1. **Pembersihan Kontrol Prioritas Redundan**:
   - Menghapus kontrol tombol "Filter Prioritas: Semua | Normal | Urgent" dari dalam container detail eksepsi.
   - Menampilkan konteks prioritas sebagai teks biasa: `"Normal"`, `"Urgent"`, atau `"Normal + Urgent"`.
   - Card summary `Normal` dan `Urgent` pada bagian atas tetap menjadi satu-satunya kontrol prioritas interaktif.

2. **Filter Periode Tanggal (Date-Range Picker)**:
   - Menyediakan pilihan rentang tanggal: `Bulan Ini` (Default), `Bulan Lalu`, `7 Hari Terakhir`, `30 Hari Terakhir`, dan `Rentang Kustom`.
   - Menghitung hari operasional secara dinamis dan memperbarui target laporan expected (`Target = Hari Operasional × Jumlah Unit Kendaraan Milik Scope`).

3. **Speeding Detail Container (`Kecepatan >50 km/jam`)**:
   - **Header & 4 Compact KPI Cards**: `Kejadian`, `Total Durasi`, `Kecepatan Maks.`, `Kendaraan Terdampak`.
   - **Side-by-Side Container (Desktop)**:
     - **Tabel Alasan Utama (Kiri ~40%)**: Kolom `Alasan` | `Kejadian` | `%`. Persentase dihitung terhadap total kejadian kecepatan pada scope aktif (`Reason Events ÷ Total Speeding Events × 100`). Baris Total di bagian bawah. Input pencarian alasan. Export CSV.
     - **Grafik Visualisasi (Kanan ~60%)**: Mode `Alasan | Tren | Perbandingan`.
   - **Tabel Drilldown Sekunder**: Menampilkan rincian kendaraan harian dengan kolom durasi `Shift 1`, `Shift 2`, `Shift 3`, kecepatan maks., dan tombol `🔍 Detail` untuk membuka Modal insiden individual dengan koordinat GPS dan catatan PIC.

---

## 9. File Yang Berubah (Changed Files)

1. **[`lib/types.ts`](file:///c:/Users/23000984/Downloads/Downloads/Projects/Dashbaord%20Enhancement/Replatform/Milestone%203/mockup/smarttrack/smarttrack/lib/types.ts)**:
   - Menambahkan field `submissionStatus` dan memperbarui `reportType` ke 4 kategori utama (`Normal`, `Urgent`, `Unit Rusak`, `GPS Rusak`).
   - Menambahkan `startTime`, `endTime`, `lat`, `lng`, `picComment` pada `ExceptionEventRecord`.
2. **[`scratch/generate_full_mock.py`](file:///c:/Users/23000984/Downloads/Downloads/Projects/Dashbaord%20Enhancement/Replatform/Milestone%203/mockup/smarttrack/smarttrack/scratch/generate_full_mock.py)**:
   - Mengisi data mock 82.446 laporan patroli harian dan 138.682 kejadian insiden dengan variasi alasan operasional, waktu mulai/selesai, koordinat GPS, dan kecepatan maksimum.
   - Menerapkan preseden klasifikasi ketat dan meregenerasi [`lib/mock-database.ts`](file:///c:/Users/23000984/Downloads/Downloads/Projects/Dashbaord%20Enhancement/Replatform/Milestone%203/mockup/smarttrack/smarttrack/lib/mock-database.ts).
3. **[`lib/selectors.ts`](file:///c:/Users/23000984/Downloads/Downloads/Projects/Dashbaord%20Enhancement/Replatform/Milestone%203/mockup/smarttrack/smarttrack/lib/selectors.ts)**:
   - Memperbarui `selectReportsKpis` untuk menghitung target laporan secara dinamis berdasarkan rentang tanggal `startDate` & `endDate`.
   - Menambahkan `selectSpeedingDetails` untuk menghitung distribusi alasan utama (denominator total speeding events), tren waktu, perbandingan entitas, dan rincian kendaraan harian per shift.
4. **[`app/reports/page.tsx`](file:///c:/Users/23000984/Downloads/Downloads/Projects/Dashbaord%20Enhancement/Replatform/Milestone%203/mockup/smarttrack/smarttrack/app/reports/page.tsx)**:
   - Menghapus kontrol prioritas redundan dari dalam container eksepsi.
   - Menambahkan picker Periode tanggal (`Bulan Ini`, `Bulan Lalu`, `7 Hari Terakhir`, `30 Hari Terakhir`, `Rentang Kustom`).
   - Membangun container detail kecepatan side-by-side (Tabel Alasan + Grafik Visual + Tabel Drilldown Sekunder per Shift).
5. **`planning.md`**:
   - Memperbarui dokumentasi rencana, aturan bisnis klasifikasi, spesifikasi filter prioritas persisten, filter periode tanggal, dan log verifikasi.

---

## 10. Keterbatasan & Catatan Pengoperasian (Remaining Limitations)

- **Mock Data Scope**: Data diperhitungkan secara deterministik untuk 6 bulan penuh (Desember 2025 s/d Mei 2026) mencakup seluruh 140 estate dan 453 kendaraan.
- **Pencapaian Blok Spasial**: Pembacaan cakupan blok murni berbasis rekam jejak GPS tanpa target kuantitas per blok.

---

## 11. Log Verifikasi 10 Penyempurnaan Terbaru (Analisis Patroli Refinements)

| No | Kebutuhan Refinement | File Kode | Status | Verifikasi & Bukti Implementasi |
| :- | :--- | :--- | :--- | :--- |
| 1 | **Konsolidasi Filter Periode ke Top Bar** | [`components/HierarchyFilterBar.tsx`](file:///c:/Users/23000984/Downloads/Downloads/Projects/Dashbaord%20Enhancement/Replatform/Milestone%203/mockup/smarttrack/smarttrack/components/HierarchyFilterBar.tsx) | **Passed** | Dropdown `Bulan Ini ▾` sejajar dengan PSM, Region, dan Estate. Memiliki opsi `Bulan Ini`, `Bulan Lalu`, `7 Hari Terakhir`, `30 Hari Terakhir`, `Rentang Kustom` dengan popover `Tanggal Mulai`, `Tanggal Akhir`, `Terapkan`, `Batal`. Label kustom ringkas: `"12–25 Mei 2026"`. Menghapus kontrol Tahun/Bulan lama, baris periode full-width, input tanggal permanen, dan baris "Rentang Efektif". |
| 2 | **Penghapusan Redundant Red Speeding Cards** | [`app/reports/page.tsx`](file:///c:/Users/23000984/Downloads/Downloads/Projects/Dashbaord%20Enhancement/Replatform/Milestone%203/mockup/smarttrack/smarttrack/app/reports/page.tsx) | **Passed** | Baris 4 KPI Card merah (`Kejadian`, `Total Durasi`, `Kecepatan Maks.`, `Kendaraan Terdampak`) dihapus sepenuhnya. Tampilan lansung dimulai dari judul/konteks dan tabel alasan + grafik. |
| 3 | **Filter Prioritas Berbasis Summary Cards** | [`app/reports/page.tsx`](file:///c:/Users/23000984/Downloads/Downloads/Projects/Dashbaord%20Enhancement/Replatform/Milestone%203/mockup/smarttrack/smarttrack/app/reports/page.tsx) | **Passed** | Card Normal dan Urgent menjadi satu-satunya kontrol prioritas interaktif. Konteks prioritas pada header berupa teks biasa (`Prioritas: Normal + Urgent`). |
| 4 | **Tabel Detail Bawah per Event Kejadian Speeding** | [`app/reports/page.tsx`](file:///c:/Users/23000984/Downloads/Downloads/Projects/Dashbaord%20Enhancement/Replatform/Milestone%203/mockup/smarttrack/smarttrack/app/reports/page.tsx) & [`lib/selectors.ts`](file:///c:/Users/23000984/Downloads/Downloads/Projects/Dashbaord%20Enhancement/Replatform/Milestone%203/mockup/smarttrack/smarttrack/lib/selectors.ts) | **Passed** | Tabel sekunder bawah menampilkan baris per event kejadian overspeed (bukan agregat harian). Urutan kolom: `Tanggal`, `Kendaraan`, `Prioritas`, `Kejadian`, `Mulai` (`HH:mm:ss`), `Durasi` (`1m 20s`), `Shift 1`, `Shift 2`, `Shift 3`, `Jarak` (`0.62 km`, menggantikan Maks km/h), `Detail` (tombol ikon kaca pembesar `🔍`). |
| 5 | **Indeks Kejadian Laporan Harian Asli (#1, #2, #3...)** | [`lib/selectors.ts`](file:///c:/Users/23000984/Downloads/Downloads/Projects/Dashbaord%20Enhancement/Replatform/Milestone%203/mockup/smarttrack/smarttrack/lib/selectors.ts) | **Passed** | Kolom `Kejadian` menampilkan `#1`, `#2`, `#3`... sesuai indeks yang ditetapkan di laporan harian awal kendaraan & tanggal tersebut (stabil terhadap filter reason, priority, sorting, dan paginasi). |
| 6 | **Hierarki Alasan Speeding Berformat "Parent \| Sub"** | [`scratch/generate_full_mock.py`](file:///c:/Users/23000984/Downloads/Downloads/Projects/Dashbaord%20Enhancement/Replatform/Milestone%203/mockup/smarttrack/smarttrack/scratch/generate_full_mock.py) & `lib/mock-database.ts` | **Passed** | Menggunakan tepat 6 kombinasi alasan resmi: `Tugas Non-Patroli \| Mengantar Tamu`, `Tugas Non-Patroli \| Mengantar Tersangka Pencurian`, `Tugas Non-Patroli \| Mengantar Karyawan`, `Tugas Non-Patroli \| Mengantar Tim Patroli`, `Melewati Jalan Raya`, `Melakukan Pengejaran`. Format `" \| "` hanya ada jika sub-comment ada. |
| 7 | **Tabel Utama Distribusi Alasan & Persentase** | [`app/reports/page.tsx`](file:///c:/Users/23000984/Downloads/Downloads/Projects/Dashbaord%20Enhancement/Replatform/Milestone%203/mockup/smarttrack/smarttrack/app/reports/page.tsx) & `lib/selectors.ts` | **Passed** | Tabel utama `Alasan \| Kejadian \| %` mengelompokkan berdasarkan kombinasi lengkap comment/sub-comment. Persentase = (Kejadian Alasan / Total Event Overspeed Scope) × 100%. Denominator tetap stabil saat filter pencarian atau drilldown alasan dipilih. Teks alasan panjang ter-wrap dengan rapi (`whiteSpace: 'normal'`). |
| 8 | **Dummy Data Variatif & Koheren** | `scratch/generate_full_mock.py` | **Passed** | Generasi mock 82.446 laporan patroli & 142.354 record eksepsi dengan variasi 0, 1, 2, 3 event per kendaraan-hari, waktu mulai, durasi detik, jarak km (kecepatan masuk akal 52-77 km/h), dan kontribusi shift yang konsisten. |
| 9 | **Preservasi Fitur Grafik Vertikal** | `app/reports/page.tsx` | **Passed** | Grafik batang vertikal dengan mode `Alasan`, `Tren`, dan `Perbandingan` dipertahankan tanpa garis threshold buatan. |
| 10 | **Verifikasi Penuh TypeScript (`npx tsc --noEmit`)** | Terminal Verification | **Passed** | Compiles with **0 errors** (Exit code 0). |

---

## 12. Log Verifikasi Penyempurnaan Tambahan Data Speeding & Target Metadata Card

| No | Kebutuhan Refinement | File Kode | Status | Verifikasi & Bukti Implementasi |
| :- | :--- | :--- | :--- | :--- |
| 1 | **Durasi & Jarak Kejadian Speeding Koheren** | [`scratch/generate_full_mock.py`](file:///c:/Users/23000984/Downloads/Downloads/Projects/Dashbaord%20Enhancement/Replatform/Milestone%203/mockup/smarttrack/smarttrack/scratch/generate_full_mock.py) & [`lib/mock-database.ts`](file:///c:/Users/23000984/Downloads/Downloads/Projects/Dashbaord%20Enhancement/Replatform/Milestone%203/mockup/smarttrack/smarttrack/lib/mock-database.ts) | **Passed** | Seluruh dummy event speeding memiliki durasi $\ge 60$ detik (75s – 209s) dan jarak $> 1.0$ km (1.15km – 4.0km). Jarak dihitung secara matematis menggunakan rumus $distanceKm = averageSpeedKmh \times durationSeconds / 3600$ (misal: 75s @ 54 km/jam $\rightarrow$ 1.13 km). Threshold deteksi asli tetap Kecepatan >50 km/jam. |
| 2 | **Penetapan Shift dari Timestamp Asli** | `scratch/generate_full_mock.py` | **Passed** | Shift ditetapkan berdasarkan jam mulai asli (`st_hr`): Shift 1 (06:00–14:00), Shift 2 (14:00–22:00), Shift 3 (22:00–06:00). Tidak ada penetapan acak. |
| 3 | **Stabilitas Indeks Kejadian Laporan Harian** | `scratch/generate_full_mock.py` & [`lib/selectors.ts`](file:///c:/Users/23000984/Downloads/Downloads/Projects/Dashbaord%20Enhancement/Replatform/Milestone%203/mockup/smarttrack/smarttrack/lib/selectors.ts) | **Passed** | Indeks kejadian asli per laporan harian per kendaraan dipertahankan secara stabil (`#1`, `#2`, `#3`) bahkan setelah dilakukan filtering/sorting. |
| 4 | **Metrik Target Pengiriman di dalam Card Sudah Dikirim** | [`lib/selectors.ts`](file:///c:/Users/23000984/Downloads/Downloads/Projects/Dashbaord%20Enhancement/Replatform/Milestone%203/mockup/smarttrack/smarttrack/lib/selectors.ts) & [`app/reports/page.tsx`](file:///c:/Users/23000984/Downloads/Downloads/Projects/Dashbaord%20Enhancement/Replatform/Milestone%203/mockup/smarttrack/smarttrack/app/reports/page.tsx) | **Passed** | Menampilkan teks sekunder ringkas `"20 unit · 31 hari"` tepat di bawah `578 / 620 laporan` di dalam card `Sudah Dikirim`. Tooltip card menampilkan: `"Target: 20 kendaraan × 31 hari = 620 laporan."` Persentase tetap mendominasi visual. |
| 5 | **Konsistensi Penyebut Target (Vehicle × Days)** | `lib/selectors.ts` | **Passed** | Target dihitung dari `Jumlah Kendaraan MILIK Scope × Jumlah Hari Efektif Periode`. Kendaraan rusak tetap dihitung dalam penyebut target. UI menggunakan kata `"hari"`. |
| 6 | **Verifikasi Penuh TypeScript (`npx tsc --noEmit`)** | Terminal Verification | **Passed** | Compiles with **0 errors** (Exit code 0). |

---

## 13. Log Verifikasi 11 Penyempurnaan Final Analisis Patroli (Patrol Analysis Final Corrections)

| No | Kebutuhan Correction | File Kode Target | Status | Verifikasi & Bukti Implementasi |
| :- | :--- | :--- | :--- | :--- |
| 1 | **Period Dropdown & Portal Calendar Overlay** | [`components/HierarchyFilterBar.tsx`](file:///c:/Users/23000984/Downloads/Downloads/Projects/Dashbaord%20Enhancement/Replatform/Milestone%203/mockup/smarttrack/smarttrack/components/HierarchyFilterBar.tsx) | **Passed** | High-level controls `Bulan Ini`, `Bulan Lalu`, `30 Hari Terakhir`, `Rentang Kustom` (`7 Hari Terakhir` removed). Overlay popover rendered via `createPortal(..., document.body)` with fixed positioning and Escape key / outside click dismissal above all cards and sticky headers. |
| 2 | **Shared Formatting Helpers Across All Summaries** | [`lib/formatters.ts`](file:///c:/Users/23000984/Downloads/Downloads/Projects/Dashbaord%20Enhancement/Replatform/Milestone%203/mockup/smarttrack/smarttrack/lib/formatters.ts) & [`app/reports/page.tsx`](file:///c:/Users/23000984/Downloads/Downloads/Projects/Dashbaord%20Enhancement/Replatform/Milestone%203/mockup/smarttrack/smarttrack/app/reports/page.tsx) | **Passed** | Replaced raw floats (e.g. `60.06999999999999m`) with `formatDurationFormatted` (`1j 0m 4d`), `formatDurationLong` tooltip (`1 jam 0 menit 4 detik`), `formatDistanceKm` (`1.13 km`), `formatCount` (`1.234`), and `formatPercentage` (`87.5%`). Applied across cards, tooltips, tables, and exports. |
| 3 | **Exact Two Submission-Chart Modes (`Perbandingan` \| `Tren 6 Bulan`)** | [`app/reports/page.tsx`](file:///c:/Users/23000984/Downloads/Downloads/Projects/Dashbaord%20Enhancement/Replatform/Milestone%203/mockup/smarttrack/smarttrack/app/reports/page.tsx) | **Passed** | Removed any "Tren Periode" mode. Both `Perbandingan` and `Tren 6 Bulan` always maintain a vertical bar chart on top and a corresponding summary table directly below. |
| 4 | **Reconciliation of Perbandingan with Pengiriman Card** | [`lib/selectors.ts`](file:///c:/Users/23000984/Downloads/Downloads/Projects/Dashbaord%20Enhancement/Replatform/Milestone%203/mockup/smarttrack/smarttrack/lib/selectors.ts) | **Passed** | `selectLaporanChartAndTable` filters reports strictly within the active date range (`filters.startDate` to `filters.endDate`) and hierarchy scope. Actual sum = card submitted (14), Target sum = card expected (16). |
| 5 | **Grouped Actual / Target Vertical Bars in Jumlah Mode** | [`app/reports/page.tsx`](file:///c:/Users/23000984/Downloads/Downloads/Projects/Dashbaord%20Enhancement/Replatform/Milestone%203/mockup/smarttrack/smarttrack/app/reports/page.tsx) | **Passed** | `Jumlah` mode displays side-by-side vertical bars: neutral gray for `Target` and colored bar for `Sudah Dikirim`. Legend and tooltips include actual, expected, shortfall, compliance %, and period. Applied to both `Perbandingan` and `Tren 6 Bulan`. |
| 6 | **Percentage Mode Bar Charts (% Mode)** | [`app/reports/page.tsx`](file:///c:/Users/23000984/Downloads/Downloads/Projects/Dashbaord%20Enhancement/Replatform/Milestone%203/mockup/smarttrack/smarttrack/app/reports/page.tsx) | **Passed** | `%` mode displays single compliance bar per category/month, zero baseline with 10% Y-axis increments (0%–100%+). Tooltip format: `"87.5% · 14/16 laporan"`. Zero expected reports displays N/A. |
| 7 | **Tren 6 Bulan Anchored to Selected Range Ending Month** | [`lib/selectors.ts`](file:///c:/Users/23000984/Downloads/Downloads/Projects/Dashbaord%20Enhancement/Replatform/Milestone%203/mockup/smarttrack/smarttrack/lib/selectors.ts) | **Passed** | 6-month window anchors to month containing selected end date (e.g., 1 Dec–5 Apr anchors to Nov–Apr). The final month includes dates only through selected end date, marked as partial (`Apr*`) with an explicit cutoff tooltip. |
| 8 | **Summary Table Below Each Chart** | [`app/reports/page.tsx`](file:///c:/Users/23000984/Downloads/Downloads/Projects/Dashbaord%20Enhancement/Replatform/Milestone%203/mockup/smarttrack/smarttrack/app/reports/page.tsx) & [`lib/selectors.ts`](file:///c:/Users/23000984/Downloads/Downloads/Projects/Dashbaord%20Enhancement/Replatform/Milestone%203/mockup/smarttrack/smarttrack/lib/selectors.ts) | **Passed** | `Perbandingan` table has child unit rows + Total row reconciling with Pengiriman card. `Tren 6 Bulan` table has child unit/vehicle rows + 6 month columns + Total Periode column + Aggregate Total row reconciling with monthly chart. |
| 9 | **Table Pagination (10 Rows/Page) & Full Export** | [`app/reports/page.tsx`](file:///c:/Users/23000984/Downloads/Downloads/Projects/Dashbaord%20Enhancement/Replatform/Milestone%203/mockup/smarttrack/smarttrack/app/reports/page.tsx) | **Passed** | Pagination handles large scopes (>6 territories/vehicles) cleanly without horizontal page overflow or breaking aggregate total calculations. CSV exports include all rows in scope. |
| 10 | **Cleanup Preservation** | [`app/reports/page.tsx`](file:///c:/Users/23000984/Downloads/Downloads/Projects/Dashbaord%20Enhancement/Replatform/Milestone%203/mockup/smarttrack/smarttrack/app/reports/page.tsx) | **Passed** | Red speeding KPI row, separate priority controls, and breakdown footnote text (`Kendaraan rusak diutamakan Unit Rusak...`) remain removed. |
| 11 | **Full TypeScript Verification (`npx tsc --noEmit`)** | Terminal Verification | **Passed** | Compiles with **0 errors** (Exit code 0). |



