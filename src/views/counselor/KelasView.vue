<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import AppPagination from '@/components/AppPagination.vue'
import { useSearch } from '@/composables/useSearch'

const { keyword, setProvider, clearProvider } = useSearch()

const rows = [
  { id: 1, nama: 'X IPA 1', tingkat: 'X', wali: 'Maya Sari, S.Pd.', murid: 32, poin: 85, status: 'Aktif' },
  { id: 2, nama: 'X IPA 2', tingkat: 'X', wali: 'Rizky Kurniawan, S.Pd.', murid: 30, poin: 120, status: 'Aktif' },
  { id: 3, nama: 'X IPS 1', tingkat: 'X', wali: 'Ayu Lestari, S.Pd.', murid: 34, poin: 95, status: 'Aktif' },
  { id: 4, nama: 'X IPS 2', tingkat: 'X', wali: 'Siti Aminah, S.Pd.', murid: 31, poin: 140, status: 'Aktif' },
  { id: 5, nama: 'XI IPA 1', tingkat: 'XI', wali: 'Drs. H. Ahmad Subarjo', murid: 33, poin: 110, status: 'Aktif' },
  { id: 6, nama: 'XI IPA 2', tingkat: 'XI', wali: '', murid: 29, poin: 130, status: 'Perlu Wali' },
  { id: 7, nama: 'XI IPA 3', tingkat: 'XI', wali: 'Dewi Anggraeni, M.Pd.', murid: 32, poin: 78, status: 'Aktif' },
  { id: 8, nama: 'XI IPS 1', tingkat: 'XI', wali: 'Intan Permata, S.Pd.', murid: 35, poin: 150, status: 'Aktif' },
  { id: 9, nama: 'XI IPS 2', tingkat: 'XI', wali: 'Hendra Gunawan, S.Pd.', murid: 30, poin: 118, status: 'Aktif' },
  { id: 10, nama: 'XII IPA 1', tingkat: 'XII', wali: 'Fitri Handayani, S.Pd.', murid: 28, poin: 90, status: 'Aktif' },
  { id: 11, nama: 'XII IPA 2', tingkat: 'XII', wali: 'Fajar Setiawan, S.Pd.', murid: 31, poin: 132, status: 'Aktif' },
  { id: 12, nama: 'XII IPS 1', tingkat: 'XII', wali: 'Budi Hartono, S.Pd.', murid: 33, poin: 160, status: 'Aktif' },
  { id: 13, nama: 'XII IPS 2', tingkat: 'XII', wali: '', murid: 30, poin: 105, status: 'Perlu Wali' },
]

const statusClass = { Aktif: 'success', 'Perlu Wali': 'warning' }
const tingkatOptions = ['Semua', 'X', 'XI', 'XII']

const kpi = computed(() => {
  const count = (t) => rows.filter((r) => r.tingkat === t).length
  const totalMurid = rows.reduce((sum, r) => sum + r.murid, 0)
  return [
    { key: 'primary', icon: 'book', label: 'Total Kelas', value: String(rows.length), pill: 'flat', pillText: 'aktif', compare: 'semua tingkat' },
    { key: 'primary', icon: 'users', label: 'Total Murid', value: String(totalMurid), pill: 'flat', pillText: 'murid', compare: 'seluruh kelas' },
    { key: 'info', icon: 'graduation', label: 'Tingkat X', value: String(count('X')), pill: 'flat', pillText: 'kelas', compare: 'kelas' },
    { key: 'warning', icon: 'alert', label: 'Perlu Wali', value: String(rows.filter((r) => !r.wali).length), pill: 'down', pillText: 'kosong', compare: 'belum ada wali' },
  ]
})

const tingkat = ref('Semua')
const page = ref(1)
const perPage = ref(10)

const filtered = computed(() => {
  const term = keyword.value.trim().toLowerCase()
  return rows.filter((r) => {
    const okTingkat = tingkat.value === 'Semua' || r.tingkat === tingkat.value
    const okTerm = !term || r.nama.toLowerCase().includes(term) || (r.wali || '').toLowerCase().includes(term)
    return okTingkat && okTerm
  })
})

const paged = computed(() => {
  const start = (page.value - 1) * perPage.value
  return filtered.value.slice(start, start + perPage.value)
})

watch([keyword, tingkat], () => {
  page.value = 1
})

onMounted(() => {
  setProvider('Kelas', (q) => {
    const term = q.trim().toLowerCase()
    return rows
      .filter(
        (r) =>
          r.nama.toLowerCase().includes(term) ||
          (r.wali || '').toLowerCase().includes(term)
      )
      .slice(0, 50)
      .map((r) => ({ key: r.id, title: r.nama, subtitle: r.wali || 'Perlu wali kelas' }))
  })
})
onUnmounted(clearProvider)
</script>

<template>
  <div class="content">
    <section class="hero">
      <div class="hero-main">
        <div class="hero-icon">
          <AppIcon name="book" :size="24" />
        </div>
        <div class="hero-text">
          <span class="eyebrow">Data</span>
          <h1 class="hero-title">Daftar <span class="accent">Kelas</span></h1>
        </div>
      </div>
    </section>

    <section class="kpi-grid" aria-label="Statistik kelas">
      <article v-for="k in kpi" :key="k.label" class="kpi-card" :class="`c-${k.key}`">
        <div class="kpi-top">
          <div class="kpi-identity">
            <div class="kpi-icon" :class="k.key">
              <AppIcon :name="k.icon" />
            </div>
            <div class="kpi-label">{{ k.label }}</div>
          </div>
          <span class="kpi-pill" :class="k.pill">
            <AppIcon :name="k.pill === 'up' ? 'arrow-up-right' : k.pill === 'down' ? 'arrow-down-right' : 'minus'" />
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
            <span class="eyebrow">Daftar</span>
            <h2 class="card-title">Kelas &amp; Wali Kelas</h2>
          </div>
          <span class="badge primary">{{ filtered.length }} KELAS</span>
        </div>

        <div class="data-toolbar">
          <div class="data-toolbar-left">
            <div class="input-icon">
              <span class="ico"><AppIcon name="search" /></span>
              <input v-model="q" class="input" type="text" placeholder="Cari kelas atau wali kelas...">
            </div>
          </div>
          <div class="data-toolbar-right">
            <select v-model="tingkat" class="select" aria-label="Filter tingkat">
              <option v-for="t in tingkatOptions" :key="t" :value="t">{{ t }}</option>
            </select>
          </div>
        </div>

        <div class="table-scroll">
          <table class="table">
            <thead>
              <tr>
                <th>Kelas</th>
                <th>Tingkat</th>
                <th>Wali Kelas</th>
                <th style="text-align: right">Murid</th>
                <th style="text-align: right">Total Poin</th>
                <th style="text-align: right">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in paged" :key="r.id">
                <td class="cell-name">{{ r.nama }}</td>
                <td>{{ r.tingkat }}</td>
                <td>{{ r.wali || '—' }}</td>
                <td class="cell-price">{{ r.murid }}</td>
                <td class="cell-price">{{ r.poin }}</td>
                <td style="text-align: right">
                  <span class="badge" :class="statusClass[r.status]">{{ r.status }}</span>
                </td>
              </tr>
              <tr v-if="!paged.length">
                <td colspan="6" class="table-empty">Tidak ada kelas.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="card-foot">
          <AppPagination v-model="page" v-model:per-page="perPage" :total="filtered.length" show-info />
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.card-foot {
  border-top: 1px solid var(--border-soft, #eef1f5);
  margin-top: 16px;
  padding-top: 14px;
}

.table-empty {
  color: var(--t-muted, #64748b);
  padding: 24px 0;
  text-align: center;
}
</style>
