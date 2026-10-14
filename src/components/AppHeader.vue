<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { logout, getSession } from '@/services/authService'
import { APP_NAME } from '@/config'
import AppIcon from '@/components/AppIcon.vue'

defineProps({
  title: { type: String, default: 'Dashboard' },
  sidebarCollapsed: { type: Boolean, default: false },
})

defineEmits(['toggle-sidebar'])

const router = useRouter()

const session = getSession()
const initials = (session?.username || 'u').slice(0, 2).toUpperCase()

// ===== dropdown =====
const openMenu = ref(null)
function toggleMenu(name) {
  openMenu.value = openMenu.value === name ? null : name
}
function handleClickOutside(e) {
  if (!e.target.closest('.dd-wrap')) openMenu.value = null
}

// ===== tema =====
const theme = ref(document.documentElement.getAttribute('data-theme') || 'light')
function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', theme.value)
  try {
    localStorage.setItem('pelanggaran-theme', theme.value)
  } catch {}
}

// ===== pencarian (modal tengah) =====
const searchOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)

function openSearch() {
  searchOpen.value = true
  searchQuery.value = ''
  requestAnimationFrame(() => searchInput.value?.focus())
}
function closeSearch() {
  searchOpen.value = false
}

const notifications = ref([
  { av: 'AF', text: 'Ahmad Fauzi', note: 'mendapat pelanggaran baru', time: '5 MENIT LALU' },
  { av: 'SN', text: 'Siti Nurhaliza', note: 'pengajuan disetujui', time: '12 MENIT LALU' },
  { av: 'BS', text: 'Budi Santoso', note: 'poin bertambah', time: '1 JAM LALU' },
])
const hasUnreadNotifications = computed(() => notifications.value.length > 0)

function markAllNotificationsRead() {
  notifications.value = []
}

const messages = ref([
  { av: 'WK', text: 'Wali Kelas X IPS 2', preview: 'Mohon konfirmasi pelanggaran murid kami.', time: '5 MNT' },
  { av: 'BK', text: 'Tim BK', preview: 'Rekap pekan ini sudah siap.', time: '23 MNT' },
])
const hasUnreadMessages = computed(() => messages.value.length > 0)

function markAllMessagesRead() {
  messages.value = []
}

function handleLogout() {
  logout()
  router.push('/login')
}

function handleKeydown(e) {
  if (e.key === 'Escape') {
    openMenu.value = null
    if (searchOpen.value) closeSearch()
  } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    openSearch()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
})
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <header class="d-topbar">
    <div class="crumbs">
      <button
        class="hamburger"
        type="button"
        :aria-label="sidebarCollapsed ? 'Buka sidebar' : 'Tutup sidebar'"
        :aria-expanded="!sidebarCollapsed"
        @click="$emit('toggle-sidebar')"
      >
        <AppIcon name="menu" />
      </button>
      <div class="header-brand-icon">
        <AppIcon name="brand" />
      </div>
      <div class="header-brand-text">
        <strong>{{ APP_NAME }}</strong>
        <span class="current">{{ title }}</span>
      </div>
    </div>

    <div class="topbar-actions">
      <button class="cmd" type="button" @click="openSearch">
        <AppIcon name="search" />
        <span>Search...</span>
        <kbd class="kbd">⌘K</kbd>
      </button>

      <div class="dd-wrap" :class="{ 'is-open': openMenu === 'notif' }">
        <button class="icon-btn" type="button" aria-label="Notifikasi" @click="toggleMenu('notif')">
          <AppIcon name="bell" />
          <span class="count danger">{{ notifications.length }}</span>
        </button>
        <div class="dd-menu" role="menu">
          <div class="dd-head">
            <div class="dd-head-title">
              <AppIcon name="bell" />
              Notifikasi
            </div>
            <button
              class="dd-mark-all"
              type="button"
              :disabled="!hasUnreadNotifications"
              @click="markAllNotificationsRead"
            >
              Tandai semua telah dibaca
            </button>
          </div>
          <div class="dd-list">
            <a v-for="(n, i) in notifications" :key="i" class="dd-item" href="#">
              <div class="dd-avatar" :class="`a${(i % 3) + 1}`">{{ n.av }}</div>
              <div class="dd-body">
                <div class="dd-text"><strong>{{ n.text }}</strong> {{ n.note }}</div>
                <div class="dd-time">{{ n.time }}</div>
              </div>
            </a>
            <p v-if="!notifications.length" class="dd-empty">Tidak ada notifikasi.</p>
          </div>
          <a class="dd-footer" href="#">Lihat semua notifikasi</a>
        </div>
      </div>

      <div class="dd-wrap" :class="{ 'is-open': openMenu === 'msg' }">
        <button class="icon-btn" type="button" aria-label="Pesan" @click="toggleMenu('msg')">
          <AppIcon name="mail" />
          <span class="count info">{{ messages.length }}</span>
        </button>
        <div class="dd-menu" role="menu">
          <div class="dd-head">
            <div class="dd-head-title">
              <AppIcon name="mail" />
              Pesan
            </div>
            <button
              class="dd-mark-all"
              type="button"
              :disabled="!hasUnreadMessages"
              @click="markAllMessagesRead"
            >
              Tandai semua telah dibaca
            </button>
          </div>
          <div class="dd-list">
            <a v-for="(m, i) in messages" :key="i" class="dd-item" href="#">
              <div class="dd-avatar" :class="`a${(i % 3) + 1}`">{{ m.av }}</div>
              <div class="dd-body">
                <div class="dd-row-head"><strong>{{ m.text }}</strong><span class="dd-time">{{ m.time }}</span></div>
                <div class="dd-preview">{{ m.preview }}</div>
              </div>
            </a>
            <p v-if="!messages.length" class="dd-empty">Tidak ada pesan.</p>
          </div>
          <a class="dd-footer" href="#">Lihat semua pesan</a>
        </div>
      </div>

      <button class="icon-btn" type="button" :aria-label="theme === 'dark' ? 'Mode terang' : 'Mode gelap'" @click="toggleTheme">
        <AppIcon :name="theme === 'dark' ? 'sun' : 'moon'" />
      </button>

      <div class="dd-wrap" :class="{ 'is-open': openMenu === 'profile' }">
        <div class="avatar" role="button" tabindex="0" :aria-label="session?.label || 'Akun'" @click="toggleMenu('profile')">{{ initials }}</div>
        <div class="dd-menu dd-profile" role="menu">
          <div class="dd-profile-head">
            <div class="dd-profile-name">{{ session?.username || 'Pengguna' }}</div>
            <div class="dd-profile-email">{{ session?.label || 'demo' }}</div>
          </div>
          <a class="dd-menu-item" href="#">
            <AppIcon name="user" />
            Profil
          </a>
          <a class="dd-menu-item" href="#">
            <AppIcon name="settings" />
            Pengaturan
          </a>
          <a class="dd-menu-item" href="#">
            <AppIcon name="book" />
            Panduan
          </a>
          <div class="dd-divider"></div>
          <button class="dd-menu-item danger" type="button" @click="handleLogout">
            <AppIcon name="logout" />
            Keluar
          </button>
        </div>
      </div>
    </div>
  </header>

  <Teleport to="body">
    <div v-if="searchOpen" class="search-overlay" @click.self="closeSearch">
      <div class="search-card" role="dialog" aria-modal="true" aria-label="Pencarian">
        <div class="search-row">
          <span class="search-ic"><AppIcon name="search" :size="18" /></span>
          <input
            ref="searchInput"
            v-model="searchQuery"
            class="search-input"
            type="text"
            placeholder="Cari murid atau pelanggaran..."
            autocomplete="off"
          >
          <kbd class="search-esc">esc</kbd>
        </div>
        <div class="search-body">
          <p v-if="!searchQuery" class="search-hint">Ketik nama murid atau jenis pelanggaran untuk mencari.</p>
          <p v-else class="search-hint">Tidak ada hasil untuk "{{ searchQuery }}".</p>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.d-topbar {
  background: var(--bg-card, #fff);
  border-bottom: 1px solid var(--border, #e4e8ef);
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
}

.header-brand-icon {
  width: 38px;
  height: 38px;
  flex: 0 0 38px;
  display: grid;
  place-items: center;
  border-radius: 11px;
  background: var(--primary, #2563eb);
}

.header-brand-icon svg {
  width: 24px;
  height: 24px;
}

.header-brand-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  line-height: 1.25;
  row-gap: 1px;
}

.header-brand-text strong {
  font-size: 15px;
  font-weight: 700;
  color: var(--t-base, #1e293b);
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header-brand-text .current {
  font-size: 12px;
  color: var(--t-muted, #64748b);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* modal pencarian — tengah, tanpa blur */
.search-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 76px 16px 16px;
  background: rgba(15, 23, 42, 0.5);
}

.search-card {
  width: min(520px, 100%);
  max-height: 70vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--bg-card, #fff);
  border: 1px solid var(--border, #e4e8ef);
  border-radius: 14px;
  box-shadow: var(--shadow-lg, 0 10px 15px rgba(15, 23, 42, 0.08));
}

.search-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--border-soft, #eef1f5);
}

.search-ic {
  width: 18px;
  height: 18px;
  flex: 0 0 auto;
  color: var(--t-muted, #64748b);
}

.search-input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--t-base, #1e293b);
  font-family: inherit;
  font-size: 15px;
  padding: 4px 0;
}

.search-input::placeholder {
  color: var(--t-light, #94a3b8);
}

.search-esc {
  flex: 0 0 auto;
  padding: 3px 7px;
  border-radius: 5px;
  border: 1px solid var(--border, #e4e8ef);
  background: var(--bg-muted, #f1f5f9);
  color: var(--t-muted, #64748b);
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  letter-spacing: 0.04em;
  text-transform: lowercase;
}

.search-body {
  padding: 24px 16px;
}

.search-hint {
  margin: 0;
  text-align: center;
  font-size: 13px;
  color: var(--t-muted, #64748b);
}

/* mobile: dropdown notifikasi/pesan jadi panel atas; akun tetap menempel kanan */
@media (max-width: 720px) {
  .dd-menu:not(.dd-profile),
  .dd-wrap.is-open .dd-menu:not(.dd-profile) {
    position: fixed;
    top: 68px;
    right: auto;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100vw - 16px);
    max-width: 380px;
    max-height: 70vh;
  }
}

/* head notifikasi: kiri judul, kanan tandai semua */
.dd-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.dd-head-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.dd-head-title svg {
  width: 15px;
  height: 15px;
}

.dd-mark-all {
  border: 0;
  background: transparent;
  color: var(--primary, #2563eb);
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 6px;
  white-space: nowrap;
}

.dd-mark-all:hover:not(:disabled) {
  background: var(--primary-soft, #eff6ff);
}

.dd-mark-all:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.dd-empty {
  margin: 0;
  padding: 20px 16px;
  text-align: center;
  font-size: 12.5px;
  color: var(--t-muted, #64748b);
}
</style>
