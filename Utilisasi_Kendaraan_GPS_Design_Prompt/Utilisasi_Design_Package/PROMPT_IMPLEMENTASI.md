# Prompt implementasi — Utilisasi Kendaraan & GPS

Ubah halaman Utilisasi Kendaraan & GPS pada dashboard baru menggunakan lima mockup dalam folder `designs/`. Tujuannya replatform fungsi SmartTrack existing dengan design system halaman Analisis Laporan Patroli yang sudah ada di aplikasi. Kerjakan perubahan pada kode halaman existing, bukan membuat aplikasi terpisah.

## Prioritas acuan

1. Ketentuan tertulis dalam prompt ini, khususnya summary compact dan tanpa Export.
2. Komponen, token, dan perilaku aktual halaman Analytics/Analisis Laporan Patroli dalam repository.
3. Lima mockup sebagai acuan komposisi masing-masing state detail. Angka, nama unit, tanggal, dan master wilayah di gambar hanya ilustrasi; jangan hardcode sebagai data produksi.

Sebelum mengedit, periksa struktur halaman Utilisasi, komponen Analytics, filter global, tabel, sumber data, dan perhitungan existing. Reuse komponen yang sudah tersedia. Pertahankan business logic SmartTrack dan field laporan existing; jangan mengganti definisi metrik agar cocok dengan angka mockup.

## 1. Layout dan visual

- Ikuti sidebar, header, background, font Poppins, warna navy, radius, shadow, spacing, dan ukuran ikon halaman Analytics yang sudah settle.
- Pertahankan header dengan judul Utilisasi Kendaraan & GPS dan filter seperti halaman summary lain. Gunakan komponen header existing, jangan membuat panel filter besar baru di bawah judul.
- Container konten berwarna putih dengan garis tipis gradasi biru → teal → hijau di bagian atas, sama seperti Analytics. KPI mengikuti aksen semantik existing.
- Semua tabel memakai header biru dengan teks putih, pembatas halus, baris putih/pale blue, hover, typography, search, sort, filter, page-size, dan pagination yang konsisten dengan tabel Analytics/Laporan. Reuse kemampuan yang sudah ada.
- HAPUS tombol Export dari semua lima detail; jangan sediakan ikon Export atau tombol penggantinya.

## 2. Summary harus compact agar tabel harian naik

Ini adalah revisi penting terhadap desain sebelumnya. Kurangi TINGGI container summary di bawah lima KPI, bukan mempersempit lebarnya. Lebar tetap sejajar dengan KPI dan tabel di bawahnya.

- Target pengurangan tinggi sekitar 35–40% terhadap mockup sebelumnya, melalui pengurangan whitespace dan padding, tanpa menghilangkan statistik existing.
- Padding container sekitar 16px; jarak antarbagian sekitar 8–12px; gap summary ke tabel harian sekitar 16px. Sesuaikan dengan token repository.
- Heading summary sekitar 20–22px, angka statistik sekitar 24–28px, label sekitar 12–14px pada desktop. Gunakan skala typography existing bila berbeda.
- Total, Average/Rata-rata, Lowest/Terendah, dan Highest/Tertinggi ditempatkan dalam satu strip horizontal dengan pemisah tipis. Tanggal minimum/maksimum tetap terlihat.
- Vehicle Breakdown: satu baris ringkasan tiga statistik, target tinggi sekitar 120–150px.
- GPS/WiFi Breakdown: ringkasan angka dan tabel penyebab ringkas, target sekitar 210–250px.
- Mileage, Moving Time, Stopping Time: strip statistik dan tabel Shift 1–3 ringkas, target sekitar 240–280px.
- Angka tinggi adalah panduan desktop, bukan fixed-height yang memotong konten. Pakai tinggi natural, jangan hide overflow atau mengecilkan font hingga sulit dibaca.
- Tabel harian langsung berada setelah summary, lebih tinggi dari posisi sebelumnya. Hindari margin besar atau placeholder kosong. Layout tetap rapi ketika sidebar collapse/expand dan pada viewport lebih kecil.

## 3. Filter bertingkat dan periode

- Urutan: PSM → Region → Estate → Kendaraan/Nopol.
- Pilihan child mengikuti parent. Ketika parent berubah, reset hanya pilihan child yang tidak valid. Sediakan opsi Semua sesuai akses pengguna dan master data.
- Periode memakai komponen yang sama dengan summary pages: Bulan Ini, Bulan Lalu, 30 Hari Terakhir, Custom. Date picker range muncul saat Custom dipilih sesuai pola aplikasi.
- Gunakan definisi tanggal, timezone, dan batas hari yang sama dengan summary pages; hindari implementasi preset yang berbeda sendiri.
- Semua KPI dan detail mengikuti filter yang sama. Ganti card mempertahankan filter; perubahan filter tidak perlu mereset card aktif.
- Pada agregasi multiwilayah, tampilkan kolom wilayah yang diperlukan mengikuti pola tabel aplikasi. Jangan mengasumsikan satu Estate ketika filter Semua dipakai.
- Batasi pilihan berdasarkan role dan scope akses existing.

## 4. Lima KPI tetap tersedia

Urutan desktop dalam satu baris:

1. Vehicle Breakdown — jumlah kejadian dan HK sesuai sumber existing.
2. GPS/WiFi Breakdown — jumlah kejadian.
3. Mileage — total km periode terpilih.
4. Moving Time — persentase dan durasi bergerak.
5. Stopping Time — persentase dan durasi berhenti.

Tinggi card seragam. Card aktif memakai border biru halus dan indikator interaktif seperti Analytics. Klik card mengganti detail di bawahnya pada halaman yang sama. Gunakan default state existing jika sudah ditentukan; jangan membuat aturan operasional baru.

## 5. Detail setiap card

### A. Vehicle Breakdown — designs/01_Vehicle_Breakdown.png

- Ringkasan compact: jumlah kejadian, unit terdampak, HK breakdown, selama didukung sumber existing. Unit terdampak adalah unit unik; jangan menyamakannya dengan jumlah kejadian.
- Tabel harian: tanggal, wilayah yang relevan, unit kendaraan, shift, status aktif/breakdown, HK breakdown jika tersedia, dan keterangan.
- Pertahankan keterangan aktivitas/kerusakan dari laporan existing, termasuk record normal bila memang ditampilkan oleh laporan existing.
- Pertahankan perbedaan kejadian, hari/HK, dan jumlah kendaraan. Jangan menghitung ulang berdasarkan jumlah baris yang sedang tampil pada satu halaman pagination.
- Jangan tambahkan progress bengkel, SLA, overdue, atau workflow perbaikan.

### B. GPS/WiFi Breakdown — designs/02_GPS_WiFi_Breakdown.png

- Ringkasan angka compact serta tabel ringkasan penyebab, misalnya GPS dan Access Point/WiFi, mengikuti klasifikasi sumber existing.
- Tabel detail: tanggal, wilayah yang relevan, unit kendaraan, shift, penyebab, dan keterangan.
- Ringkasan dan detail memakai periode serta cakupan filter yang sama. Jangan mengganti missing GPS data menjadi kejadian breakdown tanpa dasar laporan existing.

### C. Mileage — designs/03_Mileage.png

- Total km, Average, Lowest, Highest, serta tanggal minimum/maksimum.
- Tabel compact Shift 1, Shift 2, Shift 3: total, rata-rata, minimum, maksimum; pertahankan tanggal minimum/maksimum per shift bila ada pada existing, boleh sebagai subteks ringkas.
- Tabel harian: tanggal, wilayah yang relevan, kendaraan, total km, Shift 1, Shift 2, Shift 3.
- Satuan km dan pembulatan konsisten. Total dan statistik dihitung dari data terfilter lengkap, bukan baris pagination.

### D. Moving Time — designs/04_Moving_Time.png

- Total durasi bergerak, Average, Lowest, Highest dan tanggalnya.
- Statistik Shift 1–3 compact dengan total, rata-rata, minimum, maksimum, serta tanggal bila ada pada existing.
- Tabel harian: tanggal, wilayah yang relevan, kendaraan, total moving, Shift 1, Shift 2, Shift 3.

### E. Stopping Time — designs/05_Stopping_Time.png

- Struktur sama seperti Moving Time, dengan data durasi berhenti.
- Tabel harian: tanggal, wilayah yang relevan, kendaraan, total stopping, Shift 1, Shift 2, Shift 3.
- Ini laporan total stopping time existing, berbeda dari exception berhenti >30 menit. Jangan mengubah total stopping menjadi hanya event >30 menit atau menambahkan aturan radius exception ke modul ini.

## 6. Konsistensi Moving + Stopping

- Kedua persentase memakai cakupan kendaraan, periode, dan denominator waktu yang SAMA.
- Moving % = total moving / (total moving + total stopping) × 100.
- Stopping % = total stopping / (total moving + total stopping) × 100.
- Total persentase yang ditampilkan harus 100% ketika denominator valid >0; atur pembulatan agar tidak muncul 99,9%/100,1%.
- Contoh ilustrasi: 158 jam 24 menit + 369 jam 36 menit = 528 jam, sehingga 30% + 70% = 100%.
- Jangan mengasumsikan seluruh record selalu 24 jam. Pertahankan cakupan waktu/shift yang sah sesuai existing. Jangan mengubah waktu tanpa data menjadi stopping semata-mata untuk memenuhi persentase.
- Jika denominator nol/tidak tersedia, tampilkan — sesuai empty state aplikasi; jangan membuat nilai persentase fiktif.
- Average agregat dihitung dari total numerator dan denominator yang relevan sesuai definisi existing, bukan rata-rata sederhana dari rata-rata wilayah yang bobotnya berbeda.

## 7. Batas scope

Fokus pada replatform dan refinement visual. Pertahankan fungsi existing: lima kategori laporan, statistik, shift, tabel harian, keterangan dan penyebab. Tambahan fungsional hanya hierarki filter dan preset periode yang disepakati. Jangan menambahkan kalender status, chart tren baru, maintenance workflow, escalation, atau modul lain. Jangan menghapus fitur perbaikan pada halaman Laporan lain; perubahan scope ini hanya untuk Utilisasi.

## 8. Pemeriksaan hasil

- Kelima card membuka detail yang benar tanpa mengubah filter.
- Semua detail bebas tombol Export.
- Summary lebih pendek secara nyata, seluruh statistik tetap terbaca, dan tabel harian naik.
- Header filter, font, gradasi atas container, warna tabel dan pagination konsisten dengan Analytics aktual.
- Perubahan PSM/Region/Estate memperbarui pilihan child dan data secara konsisten.
- Semua preset periode dan Custom bekerja mengikuti summary pages lain.
- Persentase Moving + Stopping 100% untuk data valid; kondisi kosong tidak menampilkan angka palsu.
- Jumlah per shift sesuai total harian bila cakupan datanya lengkap; formatting durasi tidak menampilkan menit >=60.
- Verifikasi loading, empty state, error state, panjang keterangan, sidebar collapse dan overflow tabel pada desktop.
- Jalankan build/lint dan pemeriksaan yang relevan sesuai repository. Laporkan file yang diubah, pemeriksaan yang dijalankan, dan keterbatasan sumber data jika ditemukan.

Implementasikan hingga kelima state selesai. Jika menemukan ketidaksesuaian mockup dengan field sumber, pertahankan field/definisi existing dan jelaskan penyesuaiannya; jangan mengarang data atau merombak business logic secara diam-diam.
