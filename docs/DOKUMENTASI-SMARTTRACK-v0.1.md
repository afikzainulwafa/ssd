# SmartTrack / Smart Security Dashboard
## Dokumentasi Sistem — Draft v0.1

| Item | Keterangan |
|------|------------|
| **Versi** | 0.2 |
| **Tanggal** | 11 Juni 2026 |
| **Status** | Draft — untuk review bisnis & IT |
| **Scope dokumen ini** | Data flow, algoritma analisis patroli, spesifikasi halaman Tinjau Laporan Patroli |
| **Belum masuk scope** | SRMD Monitoring, Profiling, modul Input Data (detail), role & permission penuh |

---

> **Catatan penggunaan dokumen**
> Dokumen ini disusun sebagai referensi awal sebelum development penuh oleh IT.
> Setiap bagian yang membutuhkan screenshot mockup disediakan placeholder `[SCREENSHOT: ...]`.
> Salin isi dokumen ke Microsoft Word, lalu sisipkan gambar pada placeholder yang sesuai.

---

## Daftar Isi

1. [Ringkasan Eksekutif](#1-ringkasan-eksekutif)
2. [Data Flow Sistem](#2-data-flow-sistem)
3. [Spesifikasi Input & Master Data](#3-spesifikasi-input--master-data)
4. [Ingest & Klasifikasi Data GPS](#4-ingest--klasifikasi-data-gps)
5. [Algoritma Analisis Patroli](#5-algoritma-analisis-patroli)
6. [Algoritma Penentuan Shift pada Exception](#6-algoritma-penentuan-shift-pada-exception)
7. [Spesifikasi Halaman: Tinjau Laporan Patroli](#7-spesifikasi-halaman-tinjau-laporan-patroli)
8. [Validasi & Alur Submit Laporan](#8-validasi--alur-submit-laporan)
9. [Modul Lain (Placeholder)](#9-modul-lain-placeholder)
10. [Glosarium & Parameter Konfigurasi](#10-glosarium--parameter-konfigurasi)
11. [Pertanyaan Terbuka untuk IT](#11-pertanyaan-terbuka-untuk-it)

---

## 1. Ringkasan Eksekutif

**SmartTrack** (bagian dari **Smart Security Dashboard**) adalah sistem pemantauan dan pelaporan patroli keamanan estate berbasis GPS. Sistem ini:

1. Mengelola inventaris kendaraan patroli dan perangkat GPS (IMEI).
2. Menjadwalkan rute patroli per kendaraan, per tanggal, per shift.
3. Mengambil data GPS harian dari server GPS eksternal.
4. Mengolah data menjadi laporan analisis otomatis (event, statistik, coverage).
5. Menyajikan laporan ke **PIC** untuk review, komentar, dan submit.
6. Mengalirkan laporan yang sudah disubmit ke **Manajer** dan level manajemen di atasnya.

Dokumen ini fokus pada alur data end-to-end dan spesifikasi algoritma + tampilan modul **Tinjau Laporan Patroli**.

---

## 2. Data Flow Sistem

### 2.1 Diagram Alur End-to-End

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        SMART SECURITY DASHBOARD                             │
│                                                                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────────────────┐ │
│  │ Inventarisasi│    │ Penjadwalan  │    │ Penyimpanan Master Data      │ │
│  │ Kendaraan +  │───▶│ Rute per     │───▶│ • Kendaraan (plat, tipe)     │ │
│  │ IMEI GPS     │    │ Kendaraan /  │    │ • IMEI ↔ Kendaraan           │ │
│  └──────────────┘    │ Hari / Shift │    │ • Rute baseline (GeoJSON)    │ │
│                      └──────────────┘    │ • Blok rawan per estate      │ │
│                                          │ • Jadwal shift               │ │
│                                          └──────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        │ Plot rute ke kendaraan
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PERANGKAT GPS (IMEI)                            │
│         Mengirim koordinat, waktu fix, kecepatan → Server GPS             │
└─────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        │ Fetch harian (jam 07:00)
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                     SMART SECURITY DASHBOARD — SERVER                     │
│                                                                             │
│  ┌─────────────────┐    ┌──────────────────┐    ┌───────────────────────┐ │
│  │ Ambil data GPS  │───▶│ Klasifikasi      │───▶│ Engine Analisis       │ │
│  │ per IMEI / hari │    │ Ada / Tidak Ada  │    │ (11+ metrik & event)  │ │
│  └─────────────────┘    └──────────────────┘    └───────────────────────┘   │
│           │                       │                         │               │
│           │                       │                         ▼               │
│           │              ┌────────┴────────┐    ┌───────────────────────┐   │
│           │              │ Tidak Ada       │    │ patrol_reports        │   │
│           │              │ (< 1 km / hari) │    │ + hasil analisis      │   │
│           │              └────────┬────────┘    └───────────┬───────────┘   │
│           │                       │                         │               │
│           │                       ▼                         ▼               │
│           │              ┌─────────────────┐    ┌───────────────────────┐   │
│           │              │ Laporan Trouble │    │ Laporan Normal        │   │
│           │              │ (tanpa tracking)│    │ (dengan tracking)     │   │
│           │              └────────┬────────┘    └───────────┬───────────┘   │
│           │                       │                         │               │
│           └───────────────────────┴─────────────────────────┘               │
│                                   │                                         │
│                                   ▼                                         │
│                    ┌──────────────────────────────┐                         │
│                    │ Tinjau Laporan Patroli (PIC) │                         │
│                    │ Review → Komentar → Submit   │                         │
│                    └──────────────┬───────────────┘                         │
│                                   │                                         │
│                                   ▼                                         │
│                    ┌──────────────────────────────┐                         │
│                    │ Hasil Laporan Patroli        │                         │
│                    │ Review Manajer & ke atas     │                         │
│                    └──────────────────────────────┘                         │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Urutan Proses Harian

| No | Waktu / Trigger | Proses | Output |
|----|-----------------|--------|--------|
| 1 | Sebelum patroli | Admin input inventaris kendaraan + IMEI; plot rute ke kendaraan per tanggal & shift | Master data & jadwal rute |
| 2 | Selama patroli (real-time) | GPS mengirim data ke server GPS | Raw GPS positions |
| 3 | **Jam 07:00** (harian) | Smart Security Dashboard fetch data GPS periode 07:00 (D−1) s.d. 07:00 (D) dari server GPS | Raw data per IMEI per tanggal patroli |
| 4 | Setelah fetch | Klasifikasi ketersediaan tracking (Ada / Tidak Ada) | Flag `tracking_available` |
| 5 | Jika Ada | Engine analisis menghitung event & statistik | Data laporan terolah |
| 6 | Setelah analisis | Laporan muncul di antrian **Tinjau Laporan Patroli** | `patrol_reports` menunggu review |
| 7 | Saat PIC submit | Data masuk ke **Hasil Laporan Patroli** | `patrol_results` + notifikasi ke manajemen |

### 2.3 Window Harian & Filosofi Waktu Fetch (Jam 07:00)

**Satu hari patroli** didefinisikan sebagai window **07:00 (D) s.d. 07:00 (D+1)** — bukan kalender 00:00–23:59.

Fetch & analisis dilakukan **jam 07:00 pagi** setelah window 24 jam patroli sebelumnya selesai.

Patroli berjalan dalam 3 shift per hari operasional:

| Shift | Rentang Waktu |
|-------|---------------|
| Shift 1 | 07:00 – 15:00 |
| Shift 2 | 15:00 – 23:00 |
| Shift 3 | 23:00 – 07:00 (D+1, lintas hari) |

**Filosofi fetch jam 07:00:**
- Shift 3 (23:00 – 07:00) sudah selesai penuh pada saat fetch.
- Window analisis = **07:00 kemarin → 07:00 hari ini** mencakup ketiga shift secara utuh.
- Tanggal laporan = tanggal **awal window** (hari D saat jam 07:00 dimulai).

**Contoh:** Laporan tanggal **14 Feb 2026** menganalisis data GPS dari **14 Feb 07:00** s.d. **15 Feb 07:00**.

### 2.4 Pengecualian Analisis Berhenti (06:42 – 06:59)

Rentang waktu **06:42 – 06:59** (menjelang akhir Shift 3 / reset window 07:00) **tidak dihitung** sebagai event **Berhenti > 30 menit**.

Alasan: periode transisi akhir shift — kendaraan sering diam di pos/base sebelum pergantian window harian; ini bukan anomali patroli yang perlu dikomentari PIC.

| Rentang | Berhenti > 30 min | Event lain (speeding, keluar rute) |
|---------|-------------------|-------------------------------------|
| 06:42 – 06:59 | **Tidak dianalisis** | Tetap dianalisis (contoh: speeding 06:42–06:43 → Shift 3) |
| Di luar rentang di atas | Dianalisis normal | Dianalisis normal |

### 2.5 Aturan Penjadwalan Rute

| Parameter | Nilai |
|-----------|-------|
| Rute per shift (min) | 1 rute |
| Rute per shift (maks) | 3 rute |
| Shift per kendaraan per hari (min) | 3 shift |
| Shift per kendaraan per hari (maks) | 9 shift |
| Implikasi | Satu kendaraan per hari dapat memiliki **3–9 rute baseline** yang diplot |

---

## 3. Spesifikasi Input & Master Data

### 3.1 Inventarisasi Kendaraan & GPS

| Field | Keterangan |
|-------|------------|
| Estate | Lokasi operasional (contoh: KULE) |
| Tipe kendaraan | Mobil / Motor |
| Plat nomor | Identitas kendaraan |
| IMEI GPS | Perangkat GPS yang terpasang pada kendaraan |
| Status kendaraan | Aktif / non-aktif |
| Status GPS | Aktif / rusak / maintenance |

**Relasi:** Satu kendaraan ↔ satu IMEI aktif (per periode).

### 3.2 Master Rute (Rute Bank)

| Field | Keterangan |
|-------|------------|
| ID rute | Identifier unik |
| Nama rute | Contoh: Jalur Pringgaan, Jalur Poros |
| Estate | Estate pemilik rute |
| Shift default | Shift 1 / 2 / 3 (opsional) |
| Geometri | Polyline GeoJSON (baseline) |
| Panjang rute | Total km (dihitung dari geometri) |

### 3.3 Penugasan Rute Harian

| Field | Keterangan |
|-------|------------|
| Tanggal patroli | Tanggal laporan |
| Kendaraan | Referensi inventaris |
| Shift | 1 / 2 / 3 |
| Rute yang diplot | 1–3 rute per shift |
| Total rute per hari | 3–9 rute |

### 3.4 Master Blok Rawan

| Field | Keterangan |
|-------|------------|
| Kode blok | Contoh: D-48, D-39, E-60 |
| Estate | Estate pemilik blok |
| Geometri | Polygon blok (GeoJSON) |
| Status | Rawan / non-rawan |

---

## 4. Ingest & Klasifikasi Data GPS

### 4.1 Sumber Data

- **Server GPS eksternal** → Smart Security Dashboard fetch harian jam 07:00.
- **Window data per laporan:** 07:00 (D) s.d. 07:00 (D+1).
- Data per **IMEI** per **tanggal patroli**.
- Field minimum: `latitude`, `longitude`, `fix_time`, `speed` (jika tersedia dari device).

### 4.2 Algoritma Klasifikasi Ketersediaan Tracking

```
INPUT:  gps_points[] untuk satu IMEI pada satu tanggal patroli
OUTPUT: tracking_available ∈ { ADA, TIDAK_ADA }

LANGKAH:
1. Hitung total_jarak = panjang kumulatif semua segmen antar titik GPS berurutan
   (gunakan haversine atau projected distance sesuai standar GIS estate)

2. IF total_jarak < 1 km THEN
     tracking_available = TIDAK_ADA
   ELSE
     tracking_available = ADA

3. Simpan flag ke patrol_reports.tracking_available
```

| Kondisi | Klasifikasi | Alur laporan |
|---------|-------------|--------------|
| Tidak ada data sama sekali | Tidak Tersedia | Laporan Trouble |
| Data ada tetapi total jarak < 1 km/hari | Tidak Tersedia | Laporan Trouble |
| Data ada dan total jarak ≥ 1 km/hari | Tersedia | Laporan Normal (hasil patroli) |

> **Catatan:** Meskipun klasifikasi "Tersedia", PIC tetap dapat menekan **INTERVENSI** jika patroli sebenarnya gagal (contoh: motor rusak tetapi GPS masih merekam perpindahan ke bengkel).

---

## 5. Algoritma Analisis Patroli

### 5.0 Parameter Global (Konfigurasi Sistem)

| Parameter | Default | Keterangan |
|-----------|---------|------------|
| `BUFFER_JALAN` | 20 m | Buffer lebar area jalan |
| `BUFFER_AKURASI_GPS` | 3–5 m | Margin error GPS |
| `BUFFER_TOTAL` | **25 m** | Buffer total untuk cek on-route / off-route |
| `THRESHOLD_KELUAR_RUTE` | **1 km** | Jarak maks dari titik terdekat rute sebelum dianggap keluar rute |
| `THRESHOLD_BERHENTI_RADIUS` | 50 m | Radius clustering titik berhenti |
| `THRESHOLD_BERHENTI_DURASI` | 30 menit | Durasi minimum untuk event berhenti |
| `THRESHOLD_KECEPATAN` | 50 km/jam | Batas speeding |
| `MIN_JARAK_LEWAT_BLOK` | 1000 m (1 CR) | Jarak minimum agar blok dihitung "dilewati" |
| `MIN_GAP_LEWAT_BLOK` | 23 menit | Jeda minimum antar kunjungan blok yang sama |
| `THRESHOLD_TIDAK_ADA_TRACKING` | 1 km/hari | Batas klasifikasi tidak ada tracking |
| `WINDOW_HARIAN` | 07:00 – 07:00 (D+1) | Periode analisis per tanggal laporan |
| `EXCLUDE_STOP_FROM` | 06:42 | Awal rentang yang dikecualikan dari deteksi berhenti |
| `EXCLUDE_STOP_TO` | 06:59 | Akhir rentang yang dikecualikan dari deteksi berhenti |

---

### 5.1 Berhenti > 30 Menit

**Tujuan:** Mendeteksi kendaraan yang berhenti terlalu lama di satu area.

**Kondisi deteksi** — event berhenti terjadi apabila **salah satu** terpenuhi:
- Perangkat GPS tidak mengalami perpindahan signifikan selama > 30 menit, **atau**
- Perangkat tetap berada dalam radius ≤ 50 m dari satu titik selama > 30 menit.

**Algoritma:**

```
INPUT:  gps_points[] berurutan per shift
OUTPUT: stop_events[]

LANGKAH:
1. Cluster titik berurutan yang berada dalam radius 50 m dari centroid cluster

2. Untuk setiap cluster:
   a. waktu_mulai  = fix_time titik pertama cluster
   b. waktu_selesai = fix_time titik terakhir cluster
   c. durasi = waktu_selesai - waktu_mulai

3. IF durasi > 30 menit THEN
     catat event:
       - waktu_mulai
       - waktu_selesai
       - koordinat (centroid cluster)
       - blok terdekat (spatial join ke polygon blok estate)
       - shift (lihat §6 — berdasarkan waktu_mulai)

4. Gabungkan cluster yang overlap temporal jika masih dalam radius 50 m

5. EXCLUDE: Abaikan event jika seluruh atau sebagian signifikan berada
   dalam rentang 06:42 – 06:59 (lihat §2.4)
```

**Output per event:**

| Field | Keterangan |
|-------|------------|
| `time` | Rentang waktu (HH:mm – HH:mm) |
| `duration` | Durasi berhenti |
| `lat`, `lng` | Koordinat lokasi |
| `blockPair` | Blok terdekat / pasangan blok |
| `shift` | Shift berdasarkan waktu_mulai |

**Enhancement (fase berikutnya) — Geofencing Reason:**

```
IF titik berhenti berada di dalam geofence master (pondok, pos, kantor, workshop) THEN
  reason otomatis = "Standby di [nama geofence]"
  PIC tidak wajib memilih kategori manual (opsional override)
```

---

### 5.2 Kecepatan > 50 km/jam

**Tujuan:** Mendeteksi pelanggaran batas kecepatan.

**Kondisi deteksi:**
- Perpindahan antar koordinat berurutan menghasilkan kecepatan > 50 km/jam.

**Algoritma:**

```
INPUT:  gps_points[] berurutan
OUTPUT: speed_events[]

LANGKAH:
1. Untuk setiap pasangan titik berurutan (p[i], p[i+1]):
   a. hitung kecepatan:
        v = jarak(p[i], p[i+1]) / selisih_waktu(p[i], p[i+1])
      (konversi ke km/jam)

2. IF v > 50 km/jam THEN masukkan p[i] ke grup speeding aktif

3. Akhiri grup saat v ≤ 50 km/jam selama ≥ N titik berturut-turut
   (N konfigurasi, default 2 — untuk menghindari spike noise GPS)

4. Untuk setiap grup:
   catat:
     - waktu_mulai (titik pertama grup)
     - waktu_selesai (titik terakhir grup)
     - total_jarak (sum jarak segmen dalam grup)
     - kecepatan_maks dalam grup
     - track[] (rangkaian koordinat)
     - shift (berdasarkan waktu_mulai, §6)
```

**Output per event:**

| Field | Keterangan |
|-------|------------|
| `time` | Rentang waktu kejadian |
| `distance` | Kecepatan maksimum (km/jam) |
| `speedKm` | Total jarak selama event (km) |
| `track` | Polyline segmen speeding |
| `blockPair` | Blok awal → blok akhir |

---

### 5.3 Keluar Rute per Shift

**Tujuan:** Mendeteksi deviasi dari rute baseline yang dijadwalkan.

**Kondisi deteksi:**
- Posisi GPS berada di luar jalur rute yang ditentukan untuk shift tersebut.
- Jarak dari posisi GPS ke **titik terdekat pada rute** melebihi threshold.
- **Default threshold: > 1 km** (dapat dikonfigurasi per estate).

**Definisi "di dalam rute":**
- Titik GPS dianggap on-route jika jarak ke polyline rute ≤ `BUFFER_TOTAL` (25 m).
- Titik dianggap off-route jika jarak > `THRESHOLD_KELUAR_RUTE` (1 km).

**Algoritma:**

```
INPUT:  gps_points[] per shift, baseline_routes[] (1–3 rute per shift)
OUTPUT: off_route_events[]

LANGKAH:
1. Merge semua rute shift menjadi satu atau lebih polyline baseline

2. Untuk setiap titik GPS (dengan speed > 0, sedang bergerak):
   a. d = jarak_minimum(titik, semua_baseline_shift_ini)

3. IF d > THRESHOLD_KELUAR_RUTE THEN masukkan ke grup off-route

4. Akhiri grup saat d ≤ BUFFER_TOTAL (kembali ke rute)

5. Untuk setiap grup (minimal M titik, default M=5):
   catat:
     - waktu_mulai
     - waktu_kembali (jika ada)
     - track[] selama off-route
     - total_jarak_deviasi (panjang track off-route)
     - blockPair (blok awal → akhir)
     - shift
```

**Output per event:**

| Field | Keterangan |
|-------|------------|
| `time` | Waktu mulai – selesai (atau – sekarang) |
| `distance` | Total jarak deviasi (km) |
| `track` | Koordinat selama keluar rute |
| `blockPair` | Contoh: D-48 → E-60 |

---

### 5.4 Waktu Bergerak & Berhenti

**Tujuan:** Menghitung proporsi waktu kendaraan bergerak vs berhenti (untuk donut chart Analisis Patroli).

**Definisi:**
- **Berhenti:** kecepatan = 0 (atau < threshold diam, mis. < 2 km/jam — konfigurasi)
- **Bergerak:** kecepatan > 0 (atau ≥ threshold diam)

**Algoritma:**

```
INPUT:  gps_points[] per hari
OUTPUT: moving_pct, stop_pct

LANGKAH:
1. Untuk setiap segmen antar titik berurutan:
   durasi_segmen = selisih_waktu

2. IF speed ≤ threshold_diam THEN
     total_berhenti += durasi_segmen
   ELSE
     total_bergerak += durasi_segmen

3. moving_pct = total_bergerak / (total_bergerak + total_berhenti) × 100
   stop_pct    = 100 - moving_pct
```

**Tampilan mockup:** Donut "Waktu Bergerak" — contoh 88% bergerak / 12% berhenti.

---

### 5.5 Coverage Area Rawan vs Non Rawan

**Tujuan:** Menghitung proporsi waktu/jarak patroli di area blok rawan vs non-rawan.

**Algoritma:**

```
INPUT:  gps_points[] (bergerak), polygon_blok[]
OUTPUT: vuln_area_pct, non_rawan_pct

LANGKAH:
1. Untuk setiap segmen GPS (bergerak):
   tentukan blok yang dilalui (point-in-polygon atau line intersect)

2. Akumulasi jarak per kategori:
   - jarak_blok_rawan
   - jarak_blok_non_rawan

3. vuln_area_pct    = jarak_blok_rawan / total_jarak × 100
   non_rawan_pct    = 100 - vuln_area_pct
```

**Tampilan mockup:** Donut "Blok Rawan vs Non Rawan" — contoh 82% non-rawan / 18% rawan.

---

### 5.6 Frekuensi Blok Rawan Dicek

**Tujuan:** Menghitung berapa kali setiap blok rawan dikunjungi patroli, dengan aturan anti-double-count.

**Aturan robust:**

| Aturan | Nilai |
|--------|-------|
| Jarak minimum lewat 1x | ≥ 1000 m (1 CR) dalam satu kunjungan |
| Gap antar kunjungan | ≥ 23 menit sejak kunjungan sebelumnya di blok yang sama |

**Algoritma:**

```
INPUT:  gps_track, polygon_blok_rawan[]
OUTPUT: per_blok: { unchecked, checked_1x, checked_2x, checked_gt2x }

LANGKAH:
1. Untuk setiap blok rawan B:
   kunjungan[] = []

2. Scan track berurutan:
   saat track memasuki blok B:
     catat waktu_masuk, akumulasi_jarak_dalam_blok

3. Saat track keluar blok B:
   IF jarak_dalam_blok ≥ 1000 m THEN
     IF kunjungan kosong ATAU (waktu_masuk - kunjungan_terakhir.selesai) ≥ 23 menit THEN
       tambahkan kunjungan baru

4. Klasifikasi per blok:
   0 kunjungan  → belum dicek
   1 kunjungan  → dicek 1x
   2 kunjungan  → dicek 2x
   ≥ 3 kunjungan → dicek >2x

5. Agregasi donut chart:
   uncheckedCount, checked1xCount, checked2xCount, checkedGt2xCount
```

**Tampilan mockup:** Donut "Blok Rawan Dicek per Shift" dengan legenda: Belum Dicek (2), Dicek 1x (1), Dicek 2x (1), Dicek >2x (0).

---

### 5.7 Jarak Rute yang Dijadwalkan

**Tujuan:** Total panjang baseline rute yang diplot untuk kendaraan pada tanggal patroli.

```
jarak_rute_harian = Σ panjang_geometri(rute) untuk semua rute 3–9 per hari
jarak_rute_per_shift = Σ panjang_geometri(rute) per shift
```

---

### 5.8 Jarak Aktual Patroli

**Tujuan:** Total jarak yang benar-benar ditempuh berdasarkan track GPS.

```
jarak_aktual = Σ jarak_haversine(p[i], p[i+1]) untuk semua titik valid
             (filter noise: hapus spike > MAX_JUMP jika perlu)

Per shift: filter titik berdasarkan rentang waktu shift
Per hari:  akumulasi semua shift
```

---

### 5.9 Keluar Rute — Times & Jarak

**Tujuan:** Agregasi dari event §5.3.

```
jumlah_event_keluar_rute = count(off_route_events)
total_jarak_keluar_rute  = Σ total_jarak_deviasi per event
                           (per shift dan per hari)
```

---

### 5.10 Rute Tercover

**Tujuan:** Seberapa panjang rute baseline yang "tercover" oleh track GPS aktual.

**Definisi:**
- Segmen baseline dianggap tercover jika ada titik GPS (bergerak) dalam jarak ≤ `BUFFER_TOTAL` (25 m) dari segmen tersebut.

**Algoritma:**

```
INPUT:  baseline_polyline, gps_track
OUTPUT: baseline_covered_km, baseline_covered_pct

LANGKAH:
1. Buffer baseline dengan BUFFER_TOTAL (25 m)

2. Hitung panjang bagian baseline yang intersect / dekat dengan track GPS

3. baseline_covered_km  = panjang_tercover
   baseline_covered_pct  = baseline_covered_km / jarak_rute_dijadwalkan × 100

4. in_route_km = jarak_aktual - total_jarak_keluar_rute (validasi silang)
```

**Tampilan mockup:** Statistik panel — Rute Tercover 59 km, % Rute Tercover 69%.

---

### 5.11 Kecepatan — Rata-rata, Maksimal, Minimal

```
INPUT:  gps_points[] dengan speed valid (bergerak)

kecepatan_rata_rata = mean(speed) atau weighted by durasi segmen
kecepatan_maksimal  = max(speed)
kecepatan_minimal   = min(speed) where speed > 0

Dihitung per shift dan agregat per hari.
```

---

## 6. Algoritma Penentuan Shift pada Exception

**Prinsip:** Shift ditentukan berdasarkan **waktu mulai (start)** event, bukan waktu selesai.

| Shift | Rentang Waktu Mulai |
|-------|---------------------|
| Shift 1 | 07:00 – 14:59 |
| Shift 2 | 15:00 – 22:59 |
| Shift 3 | 23:00 – 06:59 (D+1) |

**Contoh:**

| Event | Waktu | Shift | Catatan |
|-------|-------|-------|---------|
| Berhenti | 14:55 – 15:27 | **Shift 1** | Start 14:55 masuk Shift 1 |
| Keluar rute | 00:07 – 00:11 | **Shift 3** | — |
| Speeding | 06:42 – 06:43 | **Shift 3** | Masih dalam Shift 3 (berakhir 07:00) |
| Berhenti | 06:30 – 07:10 | — | **Tidak dihitung** jika overlap 06:42–06:59 (§2.4) |

> **Catatan:** Untuk event lintas shift (start Shift 1, selesai Shift 2), tetap masukkan ke shift berdasarkan **waktu_mulai** sesuai aturan di atas.

**Penerapan di UI:**
- Badge shift pada setiap baris exception report.
- Warna track di peta: Shift 1 merah, Shift 2 biru, Shift 3 cyan.
- Baseline rute: garis transparan & lebih lebar per shift.

---

## 7. Spesifikasi Halaman: Tinjau Laporan Patroli

### 7.1 Halaman Indeks — Daftar Laporan Belum Disubmit

**URL:** `/review-patrol`

**Tujuan:** Antrian laporan yang menunggu review & submit oleh PIC.

#### Ringkasan Statistik (3 kartu)

| Kartu | Metrik | Sumber |
|-------|--------|--------|
| 1 | Total laporan belum ditinjau | `COUNT(patrol_reports WHERE belum submit)` |
| 2 | Pelacakan: Tersedia / Tidak Tersedia | Breakdown `tracking_available` |
| 3 | Tipe kendaraan: Mobil / Motor | Breakdown `type` |

`[SCREENSHOT: Halaman indeks Tinjau Laporan Patroli — stat cards + tabel]`

**Referensi mockup:** Screenshot indeks dengan 7 laporan, 4 tersedia / 3 tidak tersedia, 4 mobil / 3 motor.

#### Tabel Daftar Laporan

| Kolom | Keterangan |
|-------|------------|
| No | Urutan |
| Tanggal | Tanggal patroli |
| Estate | Nama estate |
| Tipe Kendaraan | Mobil / Motor (ikon + label) |
| Plat Nomor | Nopol kendaraan |
| Ketersediaan Pelacakan | Tersedia (hijau) / Tidak Tersedia (merah) |
| Aksi | Tombol edit → masuk detail laporan |

**Routing aksi:**

| Ketersediaan | Destinasi |
|--------------|-----------|
| Tidak Tersedia | Form Laporan Kendala (§7.2) |
| Tersedia | Laporan Hasil Patroli — mode review (§7.3) |

---

### 7.2 Halaman Laporan Kendala (Tidak Ada Tracking)

**URL:** `/review-patrol/[id]/kendala`

**Kondisi:** `tracking_available = false` ATAU PIC menekan **INTERVENSI** dari laporan normal.

`[SCREENSHOT: Form Laporan Kendala — metadata + jenis kerusakan + keterangan]`

#### Metadata (4 kartu)

| Field | Contoh |
|-------|--------|
| Estate | KULE |
| Tipe Kendaraan | Motor |
| Plat Nomor | BK 5566 GH |
| Tanggal | 15 Feb 2026 |

#### Form Detail Kerusakan

| Field | Tipe | Opsi |
|-------|------|------|
| Jenis Kerusakan | Radio | Motor Patroli / Unit Rusak **atau** Alat GPS / WiFi Rusak |
| Keterangan | Textarea | Penjelasan detail kerusakan |

**Aksi:** Batal | Kirim Laporan → simpan ke `patrol_issues`, keluar dari antrian review.

> **Catatan bisnis:** Laporan kendala tidak memerlukan komentar exception, analisis patroli, atau ringkasan 10 kata — hanya konfirmasi jenis & keterangan kerusakan.

---

### 7.3 Halaman Laporan Hasil Patroli — Mode Review (Ada Tracking)

**URL:** `/review-patrol/[id]/hasil`

**Kondisi:** `tracking_available = true` dan PIC membuka dari antrian.

`[SCREENSHOT: Laporan hasil — header + peta + exception report collapsed]`

#### Header & Metadata

| Elemen | Keterangan |
|--------|------------|
| Tombol Kembali | Kembali ke indeks |
| **INTERVENSI** (merah) | Alihkan ke form kendala (§7.2) — untuk kasus GPS aktif tetapi patroli gagal |
| **+ KIRIM** (biru) | Submit laporan (jika validasi lolos, §8) |
| Kartu metadata | Estate, Tipe Kendaraan, Plat Nomor, Tanggal |
| Prioritas | Normal / **Urgent** — jika Urgent, notifikasi berbeda ke manajer & manajemen |

---

#### Peta Interaktif

`[SCREENSHOT: Peta — blok estate, baseline, track aktual, legend, playback]`

**Saat pertama load (default):**

| Layer | Tampilan |
|-------|----------|
| Blok estate | Polygon per blok dengan label kode |
| Blok rawan | Fill merah transparan |
| Rute baseline | Garis tebal, transparan, per shift (warna berbeda) |
| Track aktual | Garis solid per shift dari data GPS |

**Legenda peta:**

| Elemen | Visual |
|--------|--------|
| Aktual Shift 1 | Garis merah |
| Aktual Shift 2 | Garis biru |
| Aktual Shift 3 | Garis cyan |
| Rute Shift 1–3 | Garis transparan (baseline) |
| Berhenti > 30 min | Marker lingkaran oranye |
| Keluar Rute | Marker / segmen oranye |
| Kecepatan > 50 km/h | Segmen pink |
| Blok Rawan | Area merah transparan |

**Fitur Playback:**

| Kontrol | Fungsi |
|---------|--------|
| Play | Animasi pergerakan kendaraan dari awal ke akhir track |
| Pause | Jeda animasi |
| Resume | Lanjut animasi |
| Progress bar | Posisi playback (0–100%) |

---

#### Exception Report (Panel Kanan)

`[SCREENSHOT: Exception — Berhenti expanded dengan dropdown komentar]`
`[SCREENSHOT: Exception — Keluar Rute expanded]`
`[SCREENSHOT: Exception — Kecepatan expanded]`

Tiga kategori accordion:

| Kategori | Badge | Progress |
|----------|-------|----------|
| Berhenti > 30 min | Jumlah event | X/Y dikomentari |
| Keluar Rute | Jumlah event | X/Y dikomentari |
| Kecepatan > 50 km/h | Jumlah event | X/Y dikomentari |

**Per baris event:**

| Field | Contoh |
|-------|--------|
| Nomor | #1, #2, ... |
| Blok | D-48, D-39 → D-47 |
| Durasi / Jarak / Kecepatan | 32 menit / 0.9 km / 52 km/jam |
| Shift & Waktu | Shift 3 · 00:45 – 05:03 |
| Status | ✓ hijau (sudah dikomentari) / ⚠ oranye (belum) |
| Komentar PIC | Dropdown kategori + sub-kategori |

**Opsi komentar per kategori:**

| Kategori Event | Kategori Komentar | Sub-kategori (jika wajib) |
|----------------|-------------------|---------------------------|
| Berhenti | Standby | di Pos, di Kantor Besar, di Workshop |
| Berhenti | Istirahat | — |
| Berhenti | Operasional, Lainnya | — |
| Keluar Rute | Mendadak | — |
| Keluar Rute | Jalur | — |
| Keluar Rute | Operasional | Pengisian BBM, Koordinasi lapangan, Akses blok terpencil |
| Keluar Rute | Lainnya | — |
| Kecepatan | Darurat | — |
| Kecepatan | Operasional | Mengejar target, Koordinasi cepat, Respon insiden |
| Kecepatan | Lainnya | — |

**Aturan komentar:**
- Jika kategori membutuhkan sub-kategori (Standby, Operasional) → sub **wajib** diisi agar dianggap "dikomentari".
- Event yang sudah dikomentari → marker hijau di peta.

---

#### Analisis Patroli (Donut Charts)

`[SCREENSHOT: Tiga donut chart — Waktu Bergerak, Blok Rawan vs Non Rawan, Blok Rawan Dicek]`

| Chart | Metrik | Algoritma |
|-------|--------|-----------|
| Waktu Bergerak | % bergerak / % berhenti | §5.4 |
| Blok Rawan vs Non Rawan | % non-rawan / % rawan | §5.5 |
| Blok Rawan Dicek per Shift | Belum / 1x / 2x / >2x | §5.6 |

---

#### Statistik (Panel Kanan)

`[SCREENSHOT: Panel statistik — 6 baris metrik jarak]`

| Metrik | Algoritma |
|--------|-----------|
| Jarak Rute | §5.7 |
| Jarak Aktual | §5.8 |
| Keluar Rute | §5.9 |
| Sesuai Rute | Jarak Aktual − Keluar Rute |
| Rute Tercover | §5.10 (km) |
| % Rute Tercover | §5.10 (%) |

---

#### Detail Patroli per Shift (Tabel)

`[SCREENSHOT: Tabel 3 shift dengan metrik lengkap]`

| Kolom | Algoritma |
|-------|-----------|
| Shift | 1 / 2 / 3 |
| Waktu Bergerak | §5.4 per shift |
| Waktu Berhenti | §5.4 per shift |
| Kecepatan Rata-rata | §5.11 per shift |
| Nama Rute | Dari jadwal rute shift |
| Jarak Rute (km) | §5.7 per shift |
| Jarak Aktual (km) | §5.8 per shift |
| Keluar Rute (km) | §5.9 per shift |
| Sesuai Rute (km) | Per shift |
| % Rute Tercover | §5.10 per shift |

**Indikator warna % cover:** ≥70% hijau, 60–69% kuning, <60% merah.

---

#### Penugasan Tim

`[SCREENSHOT: Grid 3×3 dropdown penugasan tim]`

| Role | Tipe Input |
|------|------------|
| Manajer | Dropdown (pre-filled, tidak editable) |
| Kanitpam | Dropdown |
| PIC | Dropdown |
| Danru Shift 1 / 2 / 3 | Dropdown per shift |
| Anggota Shift 1 / 2 / 3 | Dropdown per shift |

---

#### Ringkasan & Rencana Tindakan

`[SCREENSHOT: Dua textarea — Ringkasan Patroli dan Rencana Tindakan]`

| Field | Validasi |
|-------|----------|
| Ringkasan Patroli | Wajib diisi, **minimal 10 kata** |
| Rencana Tindakan | Wajib diisi, **minimal 10 kata** |

---

## 8. Validasi & Alur Submit Laporan

### 8.1 Syarat Submit (Laporan Normal)

Tombol **+ KIRIM** aktif hanya jika **semua** terpenuhi:

| No | Validasi |
|----|----------|
| 1 | Semua exception (Berhenti, Keluar Rute, Kecepatan) sudah dikomentari |
| 2 | Ringkasan Patroli ≥ 10 kata |
| 3 | Rencana Tindakan ≥ 10 kata |
| 4 | Penugasan tim terisi (PIC minimal — konfirmasi field wajib lainnya) |
| 5 | Prioritas dipilih (Normal / Urgent) |

### 8.2 Alur Setelah Submit

```
PIC klik KIRIM
  → INSERT patrol_results (events, stats, summary, team, priority)
  → Laporan hilang dari antrian Tinjau Laporan Patroli
  → Laporan muncul di Hasil Laporan Patroli
  → Notifikasi ke Manajer (Normal) atau Manajer + Manajemen (Urgent)
  → Manajer dapat memberi komentar & review
  → RC review (fase berikutnya)
```

### 8.3 Diagram Status Laporan

```
[Dibuat otomatis jam 07:00]
        │
        ▼
  ┌─────────────┐
  │ MENUNGGU    │  ← Tinjau Laporan Patroli (indeks)
  │ REVIEW PIC  │
  └──────┬──────┘
         │
    ┌────┴────┐
    ▼         ▼
[Trouble]  [Normal]
    │         │
    ▼         ▼
[Kirim     [Review penuh
 kendala]   + Kirim]
    │         │
    └────┬────┘
         ▼
  ┌─────────────┐
  │ DISUBMIT    │  ← Hasil Laporan Patroli
  └──────┬──────┘
         ▼
  [Review Manajer → RC → ...]
```

---

## 9. Modul Lain (Placeholder)

> Bagian ini disiapkan untuk dokumentasi lanjutan. Screenshot dan spesifikasi detail akan ditambahkan setelah mockup tersedia.

### 9.1 Hasil Laporan Patroli

`[SCREENSHOT: Halaman indeks Hasil Laporan Patroli — placeholder]`

- Riwayat laporan sudah disubmit
- View-only + komentar Manajer
- Kolom: Tanggal patroli, Estate, Kendaraan, Pelacakan, Tanggal submit, PIC, Aksi (lihat detail)

`[SCREENSHOT: Detail hasil laporan — view only + komentar manajer — placeholder]`

---

### 9.2 SRMD Monitoring

`[SCREENSHOT: Dashboard SRMD Monitoring — placeholder]`

- Modul monitoring keamanan makro per estate
- Status: mockup static SPA tersedia (`/srmd-monitoring`)
- Spesifikasi fungsional: **TBD**

---

### 9.3 Profiling

`[SCREENSHOT: Halaman Profiling Overview — placeholder]`

- Overview man power, tech infrastructure, basic infrastructure
- Status: mockup static HTML tersedia (`/profiling`)
- Spesifikasi fungsional: **TBD**

---

### 9.4 Input Data

| Sub-modul | Status | Placeholder |
|-----------|--------|-------------|
| Tag Rute | Belum ada mockup | `[SCREENSHOT: Tag Rute — placeholder]` |
| Perangkat GPS & Kendaraan | Belum ada mockup | `[SCREENSHOT: GPS & Kendaraan — placeholder]` |
| Anggota Tim Patroli | Belum ada mockup | `[SCREENSHOT: Anggota Tim — placeholder]` |
| Blok Rawan | Belum ada mockup | `[SCREENSHOT: Blok Rawan — placeholder]` |
| Rute Bank | Belum ada mockup | `[SCREENSHOT: Rute Bank — placeholder]` |
| Jadwal | Belum ada mockup | `[SCREENSHOT: Jadwal — placeholder]` |

---

## 10. Glosarium & Parameter Konfigurasi

| Istilah | Definisi |
|---------|----------|
| **Baseline / Rute** | Jalur patroli yang dijadwalkan (polyline GeoJSON) |
| **Track aktual** | Jalur riil dari data GPS |
| **IMEI** | Identitas unik perangkat GPS |
| **CR** | Chainage / unit jarak estate (1 CR = 1000 m) |
| **Blok rawan** | Area berisiko tinggi yang wajib dipatroli |
| **Exception** | Event anomali yang wajib dikomentari PIC |
| **Trouble report** | Laporan tanpa tracking valid atau intervensi manual |
| **PIC** | Person In Charge — reviewer laporan per estate |
| **Buffer total** | 25 m (20 m jalan + 3–5 m akurasi GPS) |

### Tabel Parameter Konfigurasi (Ringkas)

| Key | Default | Dapat diubah |
|-----|---------|--------------|
| `FETCH_GPS_CRON` | 07:00 harian | Ya |
| `WINDOW_HARIAN` | 07:00 – 07:00 (D+1) | Ya |
| `EXCLUDE_STOP_WINDOW` | 06:42 – 06:59 | Ya |
| `THRESHOLD_TIDAK_ADA_TRACKING` | 1 km | Ya |
| `THRESHOLD_BERHENTI_MENIT` | 30 | Ya |
| `THRESHOLD_BERHENTI_RADIUS` | 50 m | Ya |
| `THRESHOLD_KECEPATAN` | 50 km/jam | Ya |
| `THRESHOLD_KELUAR_RUTE` | 1 km | Ya |
| `BUFFER_TOTAL` | 25 m | Ya |
| `MIN_JARAK_LEWAT_BLOK` | 1000 m | Ya |
| `MIN_GAP_LEWAT_BLOK` | 23 menit | Ya |
| `MIN_KATA_RINGKASAN` | 10 kata | Ya |

---

## 11. Pertanyaan Terbuka untuk IT

| No | Pertanyaan | Dampak |
|----|------------|--------|
| 1 | Platform & protokol server GPS eksternal? | Integrasi fetch |
| 2 | Field penugasan tim mana yang wajib sebelum submit? | Validasi form |
| 3 | Mekanisme notifikasi Urgent ke manajemen? | Push / email / WA |
| 4 | Apakah laporan kendala juga perlu approval manajer? | Workflow |
| 5 | Penyimpanan geometri — PostGIS di Supabase atau file GeoJSON? | Arsitektur GIS |
| 6 | Retensi data GPS mentah? | Storage & biaya |

---

## Lampiran A — Daftar Screenshot yang Perlu Disisipkan

| No | Placeholder | File mockup (saran) |
|----|-------------|---------------------|
| 1 | Indeks Tinjau Laporan Patroli | Screenshot indeks 7 laporan |
| 2 | Form Laporan Kendala | Screenshot form kerusakan motor |
| 3 | Laporan hasil — overview peta | Screenshot peta + exception collapsed |
| 4 | Exception Berhenti expanded | Screenshot dropdown Standby / Istirahat |
| 5 | Exception Keluar Rute expanded | Screenshot Mendadak / Operasional |
| 6 | Exception Kecepatan expanded | Screenshot Darurat / Operasional |
| 7 | Analisis Patroli (3 donut) | Screenshot donut charts |
| 8 | Statistik + Tabel per shift | Screenshot stat panel + tabel |
| 9 | Penugasan tim + Ringkasan | Screenshot form bawah |
| 10+ | Modul lain | Placeholder §9 |

---

*Akhir dokumen — Draft v0.2*
