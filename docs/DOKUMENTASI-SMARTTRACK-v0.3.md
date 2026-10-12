# SmartTrack — Smart Security Dashboard
## Dokumen Spesifikasi Sistem · Patroli Keamanan Berbasis GPS

---

| | |
|---|---|
| **Versi dokumen** | 0.3 |
| **Tanggal** | 11 Juni 2026 |
| **Status** | Draft — review bisnis & IT |
| **Disusun untuk** | Tim IT Development, Operasional Keamanan, Manajemen Estate |
| **Cakupan** | Data flow, algoritma analisis, spesifikasi modul Tinjau Laporan Patroli |
| **Belum masuk cakupan** | SRMD Monitoring, Profiling, modul Input Data (detail), hak akses per role |

---

## Cara Membaca Dokumen Ini

Dokumen ini menjadi acuan awal sebelum pengembangan penuh oleh IT. Setiap bagian yang memerlukan ilustrasi mockup disediakan placeholder **`[SCREENSHOT: ...]`** — sisipkan gambar di Microsoft Word pada posisi tersebut.

Diagram alur disajikan dalam format bernomor agar mudah direproduksi di Visio atau PowerPoint bila diperlukan.

---

## Daftar Isi

1. Ringkasan Eksekutif
2. Gambaran Umum Sistem
3. Alur Data (Data Flow)
4. Master Data & Input Sistem
5. Pengambilan & Klasifikasi Data GPS
6. Algoritma Analisis Patroli
7. Penentuan Shift pada Exception Report
8. Spesifikasi Tampilan: Tinjau Laporan Patroli
9. Validasi & Alur Submit Laporan
10. Modul Lain (Placeholder)
11. Glosarium & Parameter Sistem
12. Pertanyaan Terbuka untuk IT
13. Lampiran — Daftar Screenshot

---

## 1. Ringkasan Eksekutif

**SmartTrack** adalah modul patroli dalam ekosistem **Smart Security Dashboard** Sinarmas Agribusiness and Food. Sistem ini membantu tim keamanan estate memantau pergerakan kendaraan patroli, membandingkannya dengan rute yang dijadwalkan, dan menghasilkan laporan terstruktur untuk ditinjau PIC sebelum diserahkan ke manajemen.

### Apa yang dilakukan sistem ini?

Secara garis besar, SmartTrack menjalankan lima fungsi utama:

1. **Mengelola aset patroli** — inventaris kendaraan dan perangkat GPS (IMEI).
2. **Menjadwalkan rute** — memplot rute patroli ke kendaraan per hari dan per shift.
3. **Mengambil data GPS** — menarik data tracking harian dari server GPS eksternal.
4. **Menganalisis pergerakan** — mendeteksi anomaly (berhenti lama, keluar rute, kecepatan tinggi) dan menghitung metrik kinerja patroli.
5. **Menyajikan laporan** — menampilkan hasil analisis ke PIC untuk dikomentari, divalidasi, dan disubmit ke manajemen.

### Siapa pengguna utamanya?

| Peran | Tanggung jawab dalam sistem |
|-------|----------------------------|
| **Admin / Input Data** | Mengelola inventaris, rute, jadwal, dan master blok |
| **PIC (Person In Charge)** | Meninjau laporan harian, memberi komentar pada anomaly, submit laporan |
| **Manajer** | Mereview laporan yang sudah disubmit, memberi arahan tindak lanjut |
| **RC / Manajemen** | Review tingkat lanjut (fase berikutnya) |

### Dua konsep waktu yang penting

Sistem membedakan **window analisis** dan **waktu fetch** — keduanya sengaja tidak sama:

| Konsep | Waktu | Penjelasan |
|--------|-------|------------|
| **Window analisis** | **07:00 → 07:00** (24 jam) | Rentang data GPS yang dianalisis untuk satu laporan harian |
| **Waktu fetch** | **08:00** setiap pagi | Jadwal pengambilan data dari server GPS — satu jam setelah window ditutup, untuk memastikan tidak ada data yang masih pending |

---

## 2. Gambaran Umum Sistem

### 2.1 Arsitektur Komponen

Sistem terdiri dari empat lapisan yang saling berinteraksi:

```
┌────────────────────────────────────────────────────────────────────┐
│  LAPISAN 1 — MASTER DATA (Smart Security Dashboard)               │
│  Inventaris kendaraan · IMEI GPS · Rute · Blok rawan · Jadwal    │
└───────────────────────────────┬────────────────────────────────────┘
                                │ Penugasan rute harian
                                ▼
┌────────────────────────────────────────────────────────────────────┐
│  LAPISAN 2 — PERANGKAT & SERVER GPS                               │
│  GPS tracker (IMEI) → transmisi real-time → Server GPS eksternal │
└───────────────────────────────┬────────────────────────────────────┘
                                │ Fetch harian 08:00
                                ▼
┌────────────────────────────────────────────────────────────────────┐
│  LAPISAN 3 — ENGINE ANALISIS (Smart Security Dashboard)         │
│  Klasifikasi tracking · Deteksi event · Perhitungan statistik    │
└───────────────────────────────┬────────────────────────────────────┘
                                │ Laporan siap review
                                ▼
┌────────────────────────────────────────────────────────────────────┐
│  LAPISAN 4 — PRESENTASI & WORKFLOW                                │
│  Tinjau Laporan Patroli (PIC) → Hasil Laporan (Manajemen)        │
└────────────────────────────────────────────────────────────────────┘
```

`[DIAGRAM: Arsitektur 4 lapis — dapat digambar ulang di Visio/PowerPoint]`

### 2.2 Siklus Operasional Harian

**Diagram 1 — Alur End-to-End**

| Tahap | Aktivitas | Pelaku / Sistem | Output |
|:-----:|-----------|-----------------|--------|
| **A** | Input inventaris kendaraan & IMEI GPS | Admin | Master kendaraan |
| **B** | Plot rute ke kendaraan (per tanggal, per shift) | Admin | Jadwal rute 3–9 rute/hari |
| **C** | Patroli berjalan; GPS mengirim data | Kendaraan patroli | Data mentah di server GPS |
| **D** | Fetch data window 07:00–07:00 | Sistem (jam **08:00**) | Raw GPS per IMEI |
| **E** | Klasifikasi: Ada / Tidak Ada tracking | Engine analisis | Flag ketersediaan |
| **F** | Analisis event & statistik | Engine analisis | Laporan terolah |
| **G** | Review, komentar, submit | PIC | Laporan final |
| **H** | Review manajemen | Manajer & RC | Tindak lanjut |

`[DIAGRAM: Flowchart A → H — sisipkan diagram corporate di sini]`

---

## 3. Alur Data (Data Flow)

### 3.1 Window Analisis vs Waktu Fetch

Satu **hari patroli** didefinisikan sebagai periode **07:00 (hari D) hingga 07:00 (hari D+1)** — bukan mengikuti kalender 00:00–23:59.

| Parameter | Nilai | Keterangan |
|-----------|-------|------------|
| Window analisis | 07:00 D → 07:00 D+1 | Data GPS yang masuk ke perhitungan |
| Waktu fetch | **08:00** setiap pagi | Pengambilan data dari server GPS |
| Alasan fetch 08:00 | Buffer 1 jam | Menghindari data pending dari Shift 3 yang baru berakhir pukul 07:00 |
| Tanggal laporan | Hari D (awal window) | Contoh: laporan 14 Feb = data 14 Feb 07:00 s.d. 15 Feb 07:00 |

**Contoh konkret:**

> Laporan patroli tanggal **14 Februari 2026** menganalisis seluruh data GPS dari **14 Feb pukul 07:00** hingga **15 Feb pukul 07:00**. Data tersebut di-fetch dari server GPS pada **15 Feb pukul 08:00**.

### 3.2 Definisi Shift Operasional

| Shift | Jam Operasional | Keterangan |
|-------|-----------------|------------|
| **Shift 1** | 07:00 – 15:00 | Patroli siang |
| **Shift 2** | 15:00 – 23:00 | Patroli sore–malam |
| **Shift 3** | 23:00 – 07:00 (D+1) | Patroli malam — lintas hari |

### 3.3 Aturan Penjadwalan Rute

| Aturan | Nilai |
|--------|-------|
| Rute minimum per shift | 1 rute |
| Rute maksimum per shift | 3 rute |
| Shift minimum per kendaraan per hari | 3 shift |
| Shift maksimum per kendaraan per hari | 9 shift |
| **Implikasi** | Satu kendaraan dapat memiliki **3 hingga 9 rute baseline** dalam satu hari patroli |

### 3.4 Pengecualian: Rentang 06:42 – 06:59

Pada menit-menit terakhir Shift 3 (sebelum reset window pukul 07:00), kendaraan patroli sering kali sudah kembali ke pos atau area parkir. Berhenti di periode ini **bukan** anomali operasional yang perlu ditindaklanjuti PIC.

| Rentang waktu | Berhenti > 30 menit | Event lain (speeding, keluar rute) |
|---------------|:-------------------:|:----------------------------------:|
| **06:42 – 06:59** | Tidak dianalisis | Tetap dianalisis |
| Di luar rentang tersebut | Dianalisis normal | Dianalisis normal |

> Contoh: Kecepatan 06:42–06:43 tetap tercatat sebagai event Shift 3. Namun berhenti di jam yang sama tidak dihitung sebagai anomaly.

### 3.5 Diagram Alur Klasifikasi Laporan

**Diagram 2 — Dari Data GPS ke Jenis Laporan**

```
  Data GPS (window 07:00–07:00)
           │
           ▼
  ┌─────────────────────┐
  │ Total jarak ≥ 1 km? │
  └─────────┬───────────┘
            │
     ┌──────┴──────┐
     │ Tidak       │ Ya
     ▼             ▼
┌──────────┐  ┌──────────────┐
│ TROUBLE  │  │ NORMAL       │
│ REPORT   │  │ (Ada tracking)│
│          │  │              │
│ PIC isi  │  │ Engine       │
│ form     │  │ analisis +   │
│ kendala  │  │ review penuh │
└──────────┘  └──────┬───────┘
                     │
              ┌──────┴──────┐
              │ PIC tekan   │
              │ INTERVENSI? │
              └──────┬──────┘
                     │ Ya
                     ▼
              ┌──────────┐
              │ TROUBLE  │
              │ REPORT   │
              └──────────┘
```

`[DIAGRAM: Flowchart klasifikasi laporan — sisipkan versi corporate]`

> **Catatan operasional:** Ketersediaan tracking GPS tidak selalu berarti patroli berjalan normal. Contoh: motor rusak tetapi GPS masih merekam perpindahan ke bengkel. PIC dapat menekan **INTERVENSI** untuk mengalihkan laporan ke form kendala.

---

## 4. Master Data & Input Sistem

### 4.1 Inventaris Kendaraan & GPS

Data ini menjadi fondasi seluruh alur patroli.

| Field | Deskripsi | Contoh |
|-------|-----------|--------|
| Estate | Lokasi operasional | KULE |
| Tipe kendaraan | Jenis unit patroli | Mobil / Motor |
| Plat nomor | Identitas kendaraan | BK 3344 EF |
| IMEI GPS | ID perangkat tracker | (nomor IMEI) |
| Status kendaraan | Kondisi operasional | Aktif / Non-aktif |
| Status GPS | Kondisi perangkat | Aktif / Rusak / Maintenance |

**Relasi:** Satu kendaraan terhubung ke satu IMEI aktif dalam satu periode operasional.

### 4.2 Rute Bank (Master Rute)

| Field | Deskripsi |
|-------|-----------|
| ID & Nama rute | Identitas unik, mis. Jalur Pringgaan, Jalur Poros |
| Estate | Pemilik rute |
| Shift default | Shift 1 / 2 / 3 (opsional) |
| Geometri | Polyline GeoJSON sebagai baseline |
| Panjang rute | Dihitung otomatis dari geometri (km) |

### 4.3 Penugasan Rute Harian

| Field | Deskripsi |
|-------|-----------|
| Tanggal patroli | Tanggal awal window (hari D) |
| Kendaraan | Referensi ke inventaris |
| Shift | 1, 2, atau 3 |
| Rute yang diplot | 1–3 rute per shift |

### 4.4 Master Blok Rawan

| Field | Deskripsi |
|-------|-----------|
| Kode blok | D-48, D-39, E-60, dll. |
| Estate | Pemilik blok |
| Geometri | Polygon GeoJSON |
| Status | Rawan / Non-rawan |

---

## 5. Pengambilan & Klasifikasi Data GPS

### 5.1 Sumber & Format Data

| Aspek | Spesifikasi |
|-------|-------------|
| Sumber | Server GPS eksternal |
| Jadwal fetch | **Setiap hari pukul 08:00** |
| Rentang data | 07:00 (D) s.d. 07:00 (D+1) |
| Granularitas | Per IMEI, per tanggal patroli |
| Field minimum | `latitude`, `longitude`, `fix_time`, `speed` |

### 5.2 Klasifikasi Ketersediaan Tracking

Sebelum analisis dimulai, sistem menentukan apakah data GPS cukup representatif untuk dijadikan laporan patroli normal.

**Logika klasifikasi:**

1. Hitung **total jarak tempuh** dari seluruh titik GPS berurutan dalam window harian.
2. Jika total jarak **kurang dari 1 km** → klasifikasi **Tidak Tersedia** (Trouble Report).
3. Jika total jarak **1 km atau lebih** → klasifikasi **Tersedia** (Laporan Normal).

| Kondisi Data | Klasifikasi | Jenis Laporan |
|--------------|-------------|---------------|
| Tidak ada data sama sekali | Tidak Tersedia | Trouble Report |
| Ada data, total jarak < 1 km | Tidak Tersedia | Trouble Report |
| Ada data, total jarak ≥ 1 km | Tersedia | Laporan Normal |

---

## 6. Algoritma Analisis Patroli

Bagian ini menjelaskan bagaimana sistem mengolah data GPS menjadi metrik dan event yang tampil di dashboard. Setiap algoritma disertai parameter default yang dapat dikonfigurasi per estate.

### 6.0 Parameter Sistem (Ringkasan)

| Parameter | Default | Fungsi |
|-----------|---------|--------|
| `WINDOW_HARIAN` | 07:00 – 07:00 (D+1) | Rentang waktu analisis |
| `FETCH_GPS_CRON` | 08:00 harian | Jadwal pengambilan data |
| `THRESHOLD_TIDAK_ADA_TRACKING` | 1 km/hari | Batas minimum jarak agar dianggap ada tracking |
| `THRESHOLD_BERHENTI_DURASI` | 30 menit | Durasi minimum event berhenti |
| `THRESHOLD_BERHENTI_RADIUS` | 50 m | Radius clustering titik diam |
| `THRESHOLD_KECEPATAN` | 50 km/jam | Batas pelanggaran kecepatan |
| `THRESHOLD_KELUAR_RUTE` | 1 km | Jarak maksimum dari rute sebelum dianggap keluar rute |
| `BUFFER_JALAN` | 20 m | Lebar area jalan |
| `BUFFER_AKURASI_GPS` | 3–5 m | Margin error perangkat |
| `BUFFER_TOTAL` | **25 m** | Buffer gabungan (on-route detection) |
| `MIN_JARAK_LEWAT_BLOK` | **600 m** | Jarak minimum agar blok dihitung "dilewati" |
| `MIN_GAP_LEWAT_BLOK` | 23 menit | Jeda minimum antar kunjungan blok yang sama |
| `EXCLUDE_STOP_WINDOW` | 06:42 – 06:59 | Rentang yang dikecualikan dari deteksi berhenti |

---

### 6.1 Berhenti Lebih dari 30 Menit

**Tujuan bisnis:** Mengidentifikasi kendaraan yang diam terlalu lama di satu lokasi — potensi tidak patroli sesuai jadwal.

**Kapan dianggap berhenti?**

Kendaraan diklasifikasikan berhenti apabila memenuhi salah satu kondisi berikut:

- GPS tidak bergerak secara signifikan selama **lebih dari 30 menit**, atau
- GPS tetap berada dalam **radius 50 meter** dari satu titik selama **lebih dari 30 menit**.

**Data yang dicatat per event:**

| Output | Keterangan |
|--------|------------|
| Waktu mulai & selesai | Rentang berhenti |
| Koordinat | Titik pusat (centroid) area berhenti |
| Blok terdekat | Hasil spatial join ke polygon estate |
| Shift | Berdasarkan waktu mulai (lihat Bab 7) |

**Pengecualian:** Event yang jatuh pada rentang **06:42–06:59** tidak dihitung (lihat §3.4).

**Pengembangan mendatang — Geofencing otomatis:**

Apabila titik berhenti berada di dalam area geofence yang telah didefinisikan (misalnya pondok, pos, kantor), sistem dapat mengisi alasan secara otomatis, contoh: *"Standby di Pondok"*. PIC tetap dapat mengoreksi manual jika diperlukan.

---

### 6.2 Kecepatan Lebih dari 50 km/jam

**Tujuan bisnis:** Mendeteksi pelanggaran batas kecepatan selama patroli.

**Kapan dianggap speeding?**

Kecepatan dihitung dari perpindahan antar dua titik GPS berurutan. Jika hasil perhitungan **melebihi 50 km/jam**, sistem mencatatnya sebagai event kecepatan tinggi.

**Data yang dicatat per event:**

| Output | Keterangan |
|--------|------------|
| Waktu mulai & selesai | Rentang kejadian |
| Kecepatan maksimum | Tertinggi dalam periode event |
| Total jarak | Panjang segmen selama speeding |
| Track | Rangkaian koordinat (polyline) |
| Shift | Berdasarkan waktu mulai |

**Catatan teknis:** Untuk mengurangi noise GPS, sistem mengakhiri grup speeding setelah kecepatan kembali normal pada minimal 2 titik berurutan.

---

### 6.3 Keluar Rute per Shift

**Tujuan bisnis:** Memastikan kendaraan patroli mengikuti rute yang telah dijadwalkan.

**Definisi "di dalam rute":**

Titik GPS dianggap **sesuai rute** jika berada dalam jarak **≤ 25 m** (buffer total) dari polyline rute baseline shift tersebut.

**Definisi "keluar rute":**

Titik GPS dianggap **keluar rute** jika jarak ke titik terdekat pada rute baseline **melebihi 1 km** (nilai dapat dikonfigurasi per estate).

**Data yang dicatat per event:**

| Output | Keterangan |
|--------|------------|
| Waktu mulai | Saat pertama kali keluar rute |
| Waktu kembali | Saat kembali ke rute (jika ada) |
| Track | Koordinat selama deviasi |
| Total jarak deviasi | Panjang perjalanan di luar rute |
| Shift | Berdasarkan waktu mulai |

---

### 6.4 Waktu Bergerak & Berhenti

**Tujuan bisnis:** Menampilkan proporsi waktu efektif patroli vs waktu diam (donut chart *Waktu Bergerak*).

| Status | Definisi |
|--------|----------|
| **Berhenti** | Kecepatan = 0, atau di bawah threshold diam (< 2 km/jam) |
| **Bergerak** | Kecepatan di atas threshold diam |

**Perhitungan:** Akumulasi durasi per status → persentase bergerak vs berhenti.

---

### 6.5 Coverage Area Rawan vs Non Rawan

**Tujuan bisnis:** Mengukur seberapa besar proporsi patroli yang dilakukan di area berisiko (donut chart *Blok Rawan vs Non Rawan*).

**Cara kerja:** Setiap segmen pergerakan GPS diklasifikasikan ke blok rawan atau non-rawan berdasarkan polygon master. Jarak diakumulasi per kategori → dihitung persentasenya.

---

### 6.6 Frekuensi Blok Rawan Dicek

**Tujuan bisnis:** Memastikan blok-blok rawan mendapat kunjungan patroli yang memadai (donut chart *Blok Rawan Dicek per Shift*).

**Aturan agar kunjungan dihitung valid:**

| Aturan | Nilai | Alasan |
|--------|-------|--------|
| Jarak minimum dalam blok | **≥ 600 m** | Mencegah false positive dari GPS yang hanya "menyentuh" tepi blok |
| Jeda antar kunjungan | **≥ 23 menit** | Mencegah double-count dari bolak-balik dalam waktu singkat |

**Klasifikasi per blok:**

| Kunjungan valid | Status |
|:---------------:|--------|
| 0 | Belum dicek |
| 1 | Dicek 1× |
| 2 | Dicek 2× |
| ≥ 3 | Dicek >2× |

---

### 6.7 Jarak Rute yang Dijadwalkan

Total panjang seluruh rute baseline yang diplot untuk kendaraan pada hari patroli — dihitung per shift dan diagregasi per hari.

---

### 6.8 Jarak Aktual Patroli

Total jarak riil yang ditempuh berdasarkan track GPS, dihitung dari kumulasi jarak antar titik berurutan (dengan filter noise/spike jika diperlukan).

---

### 6.9 Keluar Rute — Frekuensi & Jarak

Agregasi dari event keluar rute (§6.3):

- **Jumlah kejadian** keluar rute per shift / per hari
- **Total jarak** deviasi dari rute

---

### 6.10 Rute Tercover

**Tujuan bisnis:** Mengukur sejauh mana patroli aktual menutupi rute yang dijadwalkan.

Segmen baseline dianggap **tercover** jika ada titik GPS (sedang bergerak) dalam jarak ≤ 25 m dari segmen tersebut.

| Metrik | Rumus |
|--------|-------|
| Rute tercover (km) | Panjang baseline yang ter-cover |
| % Rute tercover | (Rute tercover ÷ Jarak rute dijadwalkan) × 100 |
| Sesuai rute (km) | Jarak aktual − Total keluar rute |

---

### 6.11 Kecepatan — Rata-rata, Maksimal, Minimal

Dihitung dari titik GPS saat kendaraan bergerak:

| Metrik | Cara hitung |
|--------|-------------|
| Rata-rata | Mean kecepatan, atau weighted by durasi segmen |
| Maksimal | Titik kecepatan tertinggi |
| Minimal | Titik kecepatan terendah (kecepatan > 0) |

Dihitung per shift dan per hari.

---

### 6.12 Ringkasan Metrik Laporan

**Diagram 3 — Peta Metrik di Dashboard**

| No | Metrik | Tampilan di UI | Algoritma |
|:--:|--------|----------------|-----------|
| 1 | Berhenti > 30 menit | Exception Report | §6.1 |
| 2 | Keluar rute | Exception Report | §6.3 |
| 3 | Kecepatan > 50 km/jam | Exception Report | §6.2 |
| 4 | Waktu bergerak / berhenti | Donut chart | §6.4 |
| 5 | Coverage rawan / non-rawan | Donut chart | §6.5 |
| 6 | Blok rawan dicek | Donut chart | §6.6 |
| 7 | Jarak rute dijadwalkan | Panel statistik | §6.7 |
| 8 | Jarak aktual | Panel statistik | §6.8 |
| 9 | Keluar rute (km) | Panel statistik | §6.9 |
| 10 | Rute tercover | Panel statistik | §6.10 |
| 11 | Kecepatan rata/min/maks | Tabel per shift | §6.11 |

---

## 7. Penentuan Shift pada Exception Report

**Prinsip:** Shift ditentukan berdasarkan **waktu mulai (start)** event — bukan waktu selesai.

| Shift | Rentang waktu mulai event |
|-------|---------------------------|
| Shift 1 | 07:00 – 14:59 |
| Shift 2 | 15:00 – 22:59 |
| Shift 3 | 23:00 – 06:59 (D+1) |

**Contoh penerapan:**

| Event | Waktu | Shift | Keterangan |
|-------|-------|-------|------------|
| Berhenti | 14:55 – 15:27 | Shift 1 | Start 14:55 → masih Shift 1 |
| Keluar rute | 00:07 – 00:11 | Shift 3 | — |
| Speeding | 06:42 – 06:43 | Shift 3 | Masih dalam Shift 3 (berakhir 07:00) |
| Berhenti | 06:30 – 07:10 | — | Dikecualikan (overlap 06:42–06:59) |

**Visualisasi di peta:**

| Elemen | Warna |
|--------|-------|
| Track aktual Shift 1 | Merah |
| Track aktual Shift 2 | Biru |
| Track aktual Shift 3 | Cyan |
| Rute baseline (per shift) | Garis transparan, lebih tebal |

---

## 8. Spesifikasi Tampilan: Tinjau Laporan Patroli

Modul ini adalah antarmuka utama PIC dalam meninjau dan menyelesaikan laporan patroli harian.

---

### 8.1 Halaman Indeks — Antrian Laporan

**URL:** `/review-patrol`

**Fungsi:** Menampilkan seluruh laporan yang belum direview dan disubmit oleh PIC.

`[SCREENSHOT: Halaman indeks — stat cards + tabel daftar laporan]`

#### Kartu Ringkasan (3 kartu)

| Kartu | Informasi | Keterangan |
|-------|-----------|------------|
| **Laporan Belum Ditinjau** | Total count | Menunggu review PIC |
| **Pelacakan** | Tersedia / Tidak Tersedia | Breakdown ketersediaan GPS |
| **Tipe Kendaraan** | Mobil / Motor | Breakdown jenis kendaraan |

#### Tabel Daftar Laporan

| Kolom | Deskripsi |
|-------|-----------|
| No | Urutan |
| Tanggal | Tanggal patroli (hari D) |
| Estate | Nama estate |
| Tipe Kendaraan | Mobil / Motor |
| Plat Nomor | Nopol kendaraan |
| Ketersediaan Pelacakan | Tersedia ✓ / Tidak Tersedia ✗ |
| Aksi | Tombol masuk ke detail laporan |

**Routing berdasarkan ketersediaan:**

| Pelacakan | Halaman tujuan |
|-----------|----------------|
| Tidak Tersedia | Form Laporan Kendala (§8.2) |
| Tersedia | Laporan Hasil Patroli — mode review (§8.3) |

---

### 8.2 Form Laporan Kendala (Trouble Report)

**URL:** `/review-patrol/[id]/kendala`

**Kapan muncul:**
- Tracking diklasifikasikan **Tidak Tersedia**, atau
- PIC menekan tombol **INTERVENSI** dari laporan normal.

`[SCREENSHOT: Form Laporan Kendala]`

#### Informasi Laporan (4 kartu)

Estate · Tipe Kendaraan · Plat Nomor · Tanggal

#### Form Detail Kerusakan

| Field | Input | Pilihan |
|-------|-------|---------|
| Jenis Kerusakan | Radio button | Motor Patroli / Unit Rusak — **atau** — Alat GPS / WiFi Rusak |
| Keterangan | Textarea | Penjelasan detail kondisi |

**Aksi:** Batal | **Kirim Laporan** → laporan keluar dari antrian, tersimpan sebagai trouble report.

> Laporan kendala tidak memerlukan komentar exception, analisis patroli, atau ringkasan naratif.

---

### 8.3 Laporan Hasil Patroli — Mode Review

**URL:** `/review-patrol/[id]/hasil`

**Kondisi:** Tracking tersedia; PIC membuka dari antrian.

`[SCREENSHOT: Overview — header, peta, exception report]`

#### Header & Kontrol

| Elemen | Fungsi |
|--------|--------|
| **Kembali** | Kembali ke indeks antrian |
| **INTERVENSI** (merah) | Alihkan ke form kendala |
| **+ KIRIM** (biru) | Submit laporan (jika validasi terpenuhi) |
| **Prioritas** | Normal / **Urgent** — Urgent memicu notifikasi berbeda ke manajemen |

#### Peta Interaktif

`[SCREENSHOT: Peta — blok, baseline, track aktual, legend, playback]`

**Layer default saat pertama kali dibuka:**

| Layer | Tampilan |
|-------|----------|
| Blok estate | Polygon + label kode blok |
| Blok rawan | Highlight merah transparan |
| Rute baseline | Garis tebal transparan per shift |
| Track aktual | Garis solid per shift dari GPS |

**Kontrol Playback:** Play · Pause · Resume · Progress bar (0–100%)

#### Exception Report (Panel Kanan)

`[SCREENSHOT: Berhenti — expanded dengan dropdown komentar]`
`[SCREENSHOT: Keluar Rute — expanded]`
`[SCREENSHOT: Kecepatan — expanded]`

Tiga kategori dalam format accordion:

| Kategori | Indikator progress |
|----------|-------------------|
| Berhenti > 30 menit | X/Y dikomentari |
| Keluar Rute | X/Y dikomentari |
| Kecepatan > 50 km/h | X/Y dikomentari |

**Opsi komentar PIC:**

| Event | Kategori | Sub-kategori (wajib jika ada) |
|-------|----------|-------------------------------|
| Berhenti | Standby | di Pos · di Kantor Besar · di Workshop |
| Berhenti | Istirahat · Operasional · Lainnya | — |
| Keluar Rute | Mendadak · Jalur · Lainnya | — |
| Keluar Rute | Operasional | Pengisian BBM · Koordinasi lapangan · Akses blok terpencil |
| Kecepatan | Darurat · Lainnya | — |
| Kecepatan | Operasional | Mengejar target · Koordinasi cepat · Respon insiden |

Event yang sudah dikomentari ditandai ✓ hijau di panel dan di peta.

#### Analisis Patroli

`[SCREENSHOT: Tiga donut chart]`

| Chart | Isi |
|-------|-----|
| Waktu Bergerak | % bergerak vs % berhenti |
| Blok Rawan vs Non Rawan | Proporsi area patroli |
| Blok Rawan Dicek | Belum dicek · 1× · 2× · >2× |

#### Panel Statistik

`[SCREENSHOT: Panel statistik jarak]`

Jarak Rute · Jarak Aktual · Keluar Rute · Sesuai Rute · Rute Tercover · % Rute Tercover

#### Tabel Detail per Shift

`[SCREENSHOT: Tabel 3 shift]`

Shift · Waktu Bergerak · Waktu Berhenti · Kecepatan Rata-rata · Nama Rute · Jarak Rute · Jarak Aktual · Keluar Rute · Sesuai Rute · % Rute Tercover

**Indikator warna % cover:** ≥70% hijau · 60–69% kuning · <60% merah

#### Penugasan Tim

`[SCREENSHOT: Grid penugasan tim 3×3]`

Manajer (pre-filled) · Kanitpam · PIC · Danru Shift 1–3 · Anggota Shift 1–3

#### Ringkasan & Rencana Tindakan

`[SCREENSHOT: Dua textarea]`

| Field | Validasi |
|-------|----------|
| Ringkasan Patroli | Wajib · **minimal 10 kata** |
| Rencana Tindakan | Wajib · **minimal 10 kata** |

---

## 9. Validasi & Alur Submit Laporan

### 9.1 Syarat Submit — Laporan Normal

Tombol **+ KIRIM** aktif hanya jika seluruh kondisi berikut terpenuhi:

| # | Syarat |
|:-:|--------|
| 1 | Semua exception (Berhenti, Keluar Rute, Kecepatan) sudah dikomentari |
| 2 | Ringkasan Patroli diisi (≥ 10 kata) |
| 3 | Rencana Tindakan diisi (≥ 10 kata) |
| 4 | Penugasan tim terisi (minimal PIC — field wajib lainnya TBD) |
| 5 | Prioritas dipilih (Normal / Urgent) |

### 9.2 Alur Setelah Submit

**Diagram 4 — Status Laporan**

| Status | Deskripsi | Halaman |
|--------|-----------|---------|
| **Dibuat otomatis** | Engine selesai analisis (fetch 08:00) | — |
| **Menunggu Review PIC** | Belum disubmit | Tinjau Laporan Patroli |
| **Trouble / Normal** | PIC membuka detail sesuai jenis | Form kendala / Review penuh |
| **Disubmit** | PIC menekan Kirim | Hasil Laporan Patroli |
| **Review Manajemen** | Manajer & RC memberi komentar | Hasil Laporan Patroli |

`[DIAGRAM: State diagram status laporan — sisipkan versi corporate]`

**Notifikasi:**
- Prioritas **Normal** → notifikasi ke Manajer
- Prioritas **Urgent** → notifikasi ke Manajer **dan** level manajemen

---

## 10. Modul Lain (Placeholder)

> Dokumentasi detail modul berikut akan dilengkapi setelah mockup tersedia.

| Modul | Status | Placeholder |
|-------|--------|-------------|
| Hasil Laporan Patroli | Mockup partial | `[SCREENSHOT: Indeks hasil laporan]` |
| Hasil Laporan — Detail | Mockup partial | `[SCREENSHOT: Detail + komentar manajer]` |
| SRMD Monitoring | Static SPA | `[SCREENSHOT: Dashboard SRMD]` |
| Profiling | Static HTML | `[SCREENSHOT: Profiling overview]` |
| Input Data — Tag Rute | Belum ada mockup | `[SCREENSHOT: Tag Rute]` |
| Input Data — GPS & Kendaraan | Belum ada mockup | `[SCREENSHOT: GPS & Kendaraan]` |
| Input Data — Anggota Tim | Belum ada mockup | `[SCREENSHOT: Anggota Tim]` |
| Input Data — Blok Rawan | Belum ada mockup | `[SCREENSHOT: Blok Rawan]` |
| Input Data — Rute Bank | Belum ada mockup | `[SCREENSHOT: Rute Bank]` |
| Input Data — Jadwal | Belum ada mockup | `[SCREENSHOT: Jadwal]` |

---

## 11. Glosarium & Parameter Sistem

### Glosarium

| Istilah | Arti |
|---------|------|
| **Baseline / Rute** | Jalur patroli terjadwal (polyline GeoJSON) |
| **Track aktual** | Jalur riil dari data GPS |
| **IMEI** | Identitas unik perangkat GPS |
| **Window harian** | Periode analisis 07:00 – 07:00 (24 jam) |
| **Blok rawan** | Area berisiko tinggi yang wajib dipatroli |
| **Exception** | Event anomaly yang wajib dikomentari PIC |
| **Trouble Report** | Laporan tanpa tracking valid atau hasil intervensi manual |
| **PIC** | Person In Charge — penanggung jawab review per estate |
| **Buffer total** | 25 m (20 m lebar jalan + 3–5 m akurasi GPS) |

### Parameter Konfigurasi

| Key | Default | Dapat diubah |
|-----|---------|:------------:|
| `WINDOW_HARIAN` | 07:00 – 07:00 (D+1) | ✓ |
| `FETCH_GPS_CRON` | **08:00** harian | ✓ |
| `THRESHOLD_TIDAK_ADA_TRACKING` | 1 km | ✓ |
| `THRESHOLD_BERHENTI_MENIT` | 30 menit | ✓ |
| `THRESHOLD_BERHENTI_RADIUS` | 50 m | ✓ |
| `THRESHOLD_KECEPATAN` | 50 km/jam | ✓ |
| `THRESHOLD_KELUAR_RUTE` | 1 km | ✓ |
| `BUFFER_TOTAL` | 25 m | ✓ |
| `MIN_JARAK_LEWAT_BLOK` | **600 m** | ✓ |
| `MIN_GAP_LEWAT_BLOK` | 23 menit | ✓ |
| `EXCLUDE_STOP_WINDOW` | 06:42 – 06:59 | ✓ |
| `MIN_KATA_RINGKASAN` | 10 kata | ✓ |

---

## 12. Pertanyaan Terbuka untuk IT

| # | Pertanyaan | Area |
|:-:|------------|------|
| 1 | Platform dan protokol integrasi server GPS eksternal? | Integrasi |
| 2 | Field penugasan tim mana yang wajib sebelum submit? | Validasi form |
| 3 | Mekanisme notifikasi Urgent (push, email, WA)? | Notifikasi |
| 4 | Apakah trouble report juga memerlukan approval manajer? | Workflow |
| 5 | Penyimpanan geometri — PostGIS atau file GeoJSON? | Arsitektur GIS |
| 6 | Kebijakan retensi data GPS mentah? | Storage |

---

## 13. Lampiran — Daftar Screenshot

| # | Placeholder | Referensi mockup |
|:-:|-------------|------------------|
| 1 | Indeks Tinjau Laporan Patroli | 7 laporan, stat cards |
| 2 | Form Laporan Kendala | Motor BK 5566 GH |
| 3 | Laporan hasil — overview peta | Peta + exception collapsed |
| 4 | Exception Berhenti expanded | Dropdown Standby / Istirahat |
| 5 | Exception Keluar Rute expanded | Mendadak / Operasional |
| 6 | Exception Kecepatan expanded | Darurat / Operasional |
| 7 | Analisis Patroli (3 donut) | Waktu · Rawan · Dicek |
| 8 | Statistik + Tabel per shift | Panel + tabel 3 shift |
| 9 | Penugasan tim + Ringkasan | Form bawah halaman |
| 10+ | Modul lain | Lihat Bab 10 |

---

*SmartTrack — Smart Security Dashboard · Dokumen Spesifikasi v0.3 · Sinarmas Agribusiness and Food*
