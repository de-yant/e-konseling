<script setup>
import { useRouter } from 'vue-router'
import { logout, getSession } from '@/services/authService'

const router = useRouter()
const session = getSession()

const kpis = [
  { key: 'warning', icon: 'star', label: 'Total Poin', value: '15', pill: 'down', pillText: '-', compare: 'dari batas 100 poin' },
  { key: 'danger', icon: 'alert', label: 'Total Pelanggaran', value: '3', pill: 'flat', pillText: 'bulan ini', compare: '2 ringan · 1 sedang' },
  { key: 'success', icon: 'check', label: 'Kehadiran', value: '95%', pill: 'up', pillText: '+2%', compare: 'dari pekan lalu' },
  { key: 'primary', icon: 'user', label: 'Kelas', value: 'XI IPA 1', pill: 'flat', pillText: 'aktif', compare: 'wali: Bu Sri' },
]

const riwayat = [
  { tanggal: '12 Okt 2026', jenis: 'Terlambat masuk', poin: 5, oleh: 'Guru Piket', status: 'Disetujui' },
  { tanggal: '05 Okt 2026', jenis: 'Tidak mengerjakan tugas', poin: 5, oleh: 'Bu Sri', status: 'Disetujui' },
  { tanggal: '28 Sep 2026', jenis: 'Atribut tidak lengkap', poin: 5, oleh: 'Pak Andi', status: 'Diproses' },
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
        <span class="eyebrow">Dashboard Siswa</span>
        <h1 class="hero-title">Halo, <span class="accent">{{ session?.username || 'Siswa' }}</span></h1>
        <p class="hero-sub">Lihat rekap poin dan riwayat pelanggaranmu di sini.</p>
      </div>
      <div class="hero-actions">
        <button class="btn btn--ghost" type="button" @click="handleLogout">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/>
          </svg>
          Keluar
        </button>
      </div>
    </section>

    <section class="kpi-grid" aria-label="Statistik saya">
      <article v-for="k in kpis" :key="k.label" class="kpi-card" :class="`c-${k.key}`">
        <div class="kpi-top">
          <div class="kpi-identity">
            <div class="kpi-icon" :class="k.key">
              <svg v-if="k.icon === 'star'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <svg v-else-if="k.icon === 'alert'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/>
              </svg>
              <svg v-else-if="k.icon === 'check'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.1V12a10 10 0 1 1-5.9-9.1"/><path d="m22 4-10 10-3-3"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>
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
      <section class="col-12 card">
        <div class="card-head">
          <div class="card-title-wrap">
            <span class="eyebrow">Riwayat</span>
            <h2 class="card-title">Pelanggaran Saya</h2>
          </div>
          <span class="badge primary">{{ riwayat.length }} RECORDS</span>
        </div>
        <div class="table-scroll">
          <table class="table">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Jenis Pelanggaran</th>
                <th>Dicatat oleh</th>
                <th>Poin</th>
                <th style="text-align: right">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in riwayat" :key="r.tanggal">
                <td class="cell-date">{{ r.tanggal }}</td>
                <td class="cell-name">{{ r.jenis }}</td>
                <td>{{ r.oleh }}</td>
                <td class="cell-price">{{ r.poin }}</td>
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
