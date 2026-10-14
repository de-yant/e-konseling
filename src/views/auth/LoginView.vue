<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login, DEMO_ACCOUNTS } from '@/services/authService'
import { useToast } from '@/composables/useToast'
import { APP_NAME } from '@/config'
import AppIcon from '@/components/AppIcon.vue'

const router = useRouter()
const toast = useToast()

const username = ref('')
const password = ref('')
const remember = ref(true)
const loading = ref(false)
const error = ref('')

const demoAccounts = Object.entries(DEMO_ACCOUNTS).map(([user, a]) => ({
  user,
  password: a.password,
  label: a.label,
}))

function useDemo(user) {
  username.value = user
  password.value = '123'
}

async function handleSubmit() {
  error.value = ''
  loading.value = true

  try {
    const session = await login(username.value, password.value)

    if (session.demo) {
      toast.info('Login sebagai akun demo', { title: 'Mode Demo' })
    } else {
      toast.success(`Selamat datang, ${session.name || session.username}`, { title: 'Berhasil login' })
    }

    router.push(session.home)
  } catch (err) {
    error.value = err?.response?.data?.message || err?.message || 'Username/email atau password salah.'
    password.value = ''
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-shell">
    <aside class="auth-aside">
      <div class="auth-brand">
        <div class="logo">
          <AppIcon name="brand" />
        </div>
        <div class="name">{{ APP_NAME }}</div>
      </div>

      <div class="auth-aside-body">
        <span class="auth-aside-eyebrow">Sistem Pencatatan Pelanggaran Murid</span>
        <h1>Pantau dan kelola kedisiplinan murid dalam satu tempat.</h1>
        <p>Catat pelanggaran, verifikasi bukti, dan lihat rekap poin secara real-time dengan alur kerja yang rapi.</p>
        <div class="auth-quote">
          "Pencatatan manual jadi digital dan transparan. Rekap poin tiap murid langsung terlihat."
          <div class="auth-quote-author">
            <div class="av">BK</div>
            <div>Tim Bimbingan Konseling</div>
          </div>
        </div>
      </div>

      <div class="auth-aside-footer">
        <span>&copy; {{ new Date().getFullYear() }}</span>
        <span>SMART PRESENCE</span>
      </div>
    </aside>

    <main class="auth-main">
      <div class="auth-main-top">
        <RouterLink to="/" style="font-size: 12.5px; color: var(--t-muted); display: inline-flex; align-items: center; gap: 6px">
          <AppIcon name="arrow-left" :size="13" />
          Kembali ke beranda
        </RouterLink>
      </div>

      <div class="auth-card">
        <h2>Selamat datang kembali</h2>
        <p class="sub">Masuk ke akunmu untuk melanjutkan.</p>

        <form class="auth-form" @submit.prevent="handleSubmit">
          <div class="field">
            <label class="field-label" for="username">Username / Email</label>
            <div class="input-icon">
              <span class="ico">
                <AppIcon name="user" />
              </span>
              <input id="username" v-model="username" class="input" type="text" placeholder="username atau email" autocomplete="username" required>
            </div>
          </div>

          <div class="field">
            <div class="field-row">
              <label class="field-label" for="password">Password</label>
              <a href="#">Lupa?</a>
            </div>
            <div class="input-icon">
              <span class="ico">
                <AppIcon name="lock" />
              </span>
              <input id="password" v-model="password" class="input" type="password" autocomplete="current-password" required>
            </div>
          </div>

          <label class="check">
            <input v-model="remember" type="checkbox">
            <span class="box"></span>
            Ingat saya selama 30 hari
          </label>

          <p v-if="error" class="auth-error">{{ error }}</p>

          <button class="btn btn--primary auth-submit" type="submit" :disabled="loading">
            {{ loading ? 'Memproses...' : 'Masuk' }}
            <AppIcon name="arrow-right" />
          </button>
        </form>

        <div class="demo-accounts">
          <div class="demo-title">Akun demo (klik untuk isi otomatis)</div>
          <button
            v-for="a in demoAccounts"
            :key="a.user"
            type="button"
            class="demo-item"
            @click="useDemo(a.user)"
          >
            <strong>{{ a.user }}</strong>
            <span>/ {{ a.password }}</span>
            <em>{{ a.label }}</em>
          </button>
        </div>

        <div class="auth-main-bottom">
          Dengan masuk, kamu menyetujui <a href="#">Ketentuan</a> dan <a href="#">Kebijakan Privasi</a>.
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.auth-error {
  margin: 0;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--danger, #ef4444);
}

.demo-accounts {
  display: grid;
  gap: 6px;
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px dashed var(--border, #e4e8ef);
}

.demo-title {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--t-muted, #64748b);
}

.demo-item {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid var(--border, #e4e8ef);
  background: var(--bg-muted, #f1f5f9);
  color: var(--t-base, #1e293b);
  font-size: 12.5px;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease;
}

.demo-item:hover {
  border-color: var(--primary, #2563eb);
}

.demo-item em {
  margin-left: auto;
  font-style: normal;
  font-size: 11px;
  color: var(--t-muted, #64748b);
}
</style>
