<script setup>
import { useRouter } from 'vue-router'
import { logout, getSession } from '@/services/authService'

defineProps({
  roleLabel: { type: String, default: 'Guru' },
})

const router = useRouter()
const session = getSession()

const kpis = [
  { key: 'primary', icon: 'users', label: 'Total Siswa', value: '1.248', pill: 'flat', pillText: 'aktif', compare: 'semester ini' },
  { key: 'danger', icon: 'alert', label: 'Pelanggaran Bulan Ini', value: '37', pill: 'down', pillText: '-8%', compare: 'turun dari 40 bulan lalu' },
  { key: 'warning', icon: 'star', label: 'Poin Terkumpul', value: '412', pill: 'flat', pillText: 'steady', compare: 'stabil dari pekan lalu' },
  { key: 'success', icon: 'check', label: 'Siswa Bersih', value: '1.198', pill: 'up', pillText: '+5', compare: 'naik dari 1.193 pekan lalu' },
]

const kategori = [
  { nama: 'Terlambat', jumlah: 18, pct: 48, color: 'var(--warning)' },
  { nama: 'Tidak mengerjakan tugas', jumlah: 12, pct: 32, color: 'var(--info)' },
  { nama: 'Bolos', jumlah: 5, pct: 14, color: 'var(--danger)' },
  { nama: 'Atribut tidak lengkap', jumlah: 2, pct: 6, color: 'var(--success)' },
]

const kelas = [
  { nama: 'XI IPA 1', jumlah: 9, pct: 60, color: 'var(--purple)' },
  { nama: 'X IPS 2', jumlah: 6, pct: 40, color: 'var(--primary)' },
  { nama: 'XII IPS 1', jumlah: 5, pct: 33, color: 'var(--info)' },
]

const rows = [
  { nama: 'Ahmad Fauzi', kelas: 'XI IPA 1', jenis: 'Terlambat masuk', poin: 5, tanggal: '12 Okt', status: 'Diproses' },
  { nama: 'Siti Nurhaliza', kelas: 'X IPS 2', jenis: 'Tidak mengerjakan tugas', poin: 10, tanggal: '12 Okt', status: 'Disetujui' },
  { nama: 'Budi Santoso', kelas: 'XII IPS 1', jenis: 'Bolos pelajaran', poin: 25, tanggal: '11 Okt', status: 'Disetujui' },
  { nama: 'Dewi Lestari', kelas: 'XI IPA 3', jenis: 'Tidak memakai atribut', poin: 5, tanggal: '11 Okt', status: 'Diproses' },
  { nama: 'Rizky Pratama', kelas: 'X IPA 2', jenis: 'Membuat keributan', poin: 15, tanggal: '10 Okt', status: 'Ditolak' },
]

const statusClass = { Diproses: 'warning', Disetujui: 'success', Ditolak: 'danger' }

function handleLogout() {
  logout()
  router.push('/login')
}
</script>

<template>
  <div class="content">
    <section class="hero">
      <div class="hero-text">
        <span class="eyebrow">Dashboard {{ roleLabel }}</span>
        <h1 class="hero-title">Ringkasan <span class="accent">Pelanggaran</span></h1>
        <p class="hero-sub">Pantau kedisiplinan siswa: total pelanggaran, poin, dan catatan terbaru.</p>
      </div>
      <div class="hero-actions">
        <button class="btn btn--ghost" type="button" @click="handleLogout">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/>
          </svg>
          Keluar
        </button>
        <button class="btn btn--primary" type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Catat Pelanggaran
        </button>
      </div>
    </section>

    <section class="kpi-grid" aria-label="Statistik pelanggaran">
      <article v-for="k in kpis" :key="k.label" class="kpi-card" :class="`c-${k.key}`">
        <div class="kpi-top">
          <div class="kpi-identity">
            <div class="kpi-icon" :class="k.key">
              <svg v-if="k.icon === 'users'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>
              </svg>
              <svg v-else-if="k.icon === 'alert'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/>
              </svg>
              <svg v-else-if="k.icon === 'star'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.1V12a10 10 0 1 1-5.9-9.1"/><path d="m22 4-10 10-3-3"/>
              </svg>
            </div>
            <div class="kpi-label">{{ k.label }}</div>
          </div>
          <span class="kpi-pill" :class="k.pill">
            <svg v-if="k.pill === 'up'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17l10-10M7 7h10v10"/></svg>
            <svg v-else-if="k.pill === 'down'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 7l10 10M7 17h10V7"/></svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/></svg>
            {{ k.pillText }}
          </span>
        </div>
        <div class="kpi-value">{{ k.value }}</div>
        <div class="kpi-compare">{{ k.compare }}</div>
      </article>
    </section>

    <div class="grid">
      <section class="col-6 card">
        <div class="card-head">
          <div class="card-title-wrap">
            <span class="eyebrow">Distribusi</span>
            <h2 class="card-title">Kategori Pelanggaran</h2>
          </div>
        </div>
        <div class="sv-regions">
          <div v-for="k in kategori" :key="k.nama" class="sv-region">
            <div class="sv-region-head">
              <span class="marker" :style="{ background: k.color }"></span>
              {{ k.nama }}
            </div>
            <div class="sv-region-value">{{ k.jumlah }}<span class="pct">{{ k.pct }}%</span></div>
            <div class="sv-region-bar">
              <div class="sv-region-bar-fill" :style="{ width: k.pct + '%', background: k.color }"></div>
            </div>
          </div>
        </div>
      </section>

      <section class="col-6 card">
        <div class="card-head">
          <div class="card-title-wrap">
            <span class="eyebrow">Per Kelas</span>
            <h2 class="card-title">Kelas Paling Sering</h2>
          </div>
        </div>
        <div class="sv-regions">
          <div v-for="k in kelas" :key="k.nama" class="sv-region">
            <div class="sv-region-head">
              <span class="marker" :style="{ background: k.color }"></span>
              {{ k.nama }}
            </div>
            <div class="sv-region-value">{{ k.jumlah }}<span class="pct">{{ k.pct }}%</span></div>
            <div class="sv-region-bar">
              <div class="sv-region-bar-fill" :style="{ width: k.pct + '%', background: k.color }"></div>
            </div>
          </div>
        </div>
      </section>

      <section class="col-12 card">
        <div class="card-head">
          <div class="card-title-wrap">
            <span class="eyebrow">Terbaru</span>
            <h2 class="card-title">Pelanggaran Terakhir</h2>
          </div>
          <span class="badge primary">{{ rows.length }} RECORDS</span>
        </div>
        <div class="table-scroll">
          <table class="table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Kelas</th>
                <th>Jenis Pelanggaran</th>
                <th>Poin</th>
                <th>Tanggal</th>
                <th style="text-align: right">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in rows" :key="r.nama">
                <td class="cell-name">{{ r.nama }}</td>
                <td>{{ r.kelas }}</td>
                <td>{{ r.jenis }}</td>
                <td class="cell-price">{{ r.poin }}</td>
                <td class="cell-date">{{ r.tanggal }}</td>
                <td style="text-align: right">
                  <span class="badge" :class="statusClass[r.status]">{{ r.status }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>
