<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login, ACCOUNTS } from '@/services/authService'
import { APP_NAME } from '@/config'

const router = useRouter()

const username = ref('')
const password = ref('')
const remember = ref(true)
const loading = ref(false)
const error = ref('')

const demoAccounts = Object.entries(ACCOUNTS).map(([user, a]) => ({
  user,
  password: a.password,
  label: a.label,
}))

function useDemo(user) {
  username.value = user
  password.value = '123'
}

function handleSubmit() {
  error.value = ''
  loading.value = true

  setTimeout(() => {
    const session = login(username.value, password.value)
    loading.value = false

    if (session) {
      router.push(session.home)
    } else {
      error.value = 'Username atau password salah.'
      password.value = ''
    }
  }, 400)
}
</script>

<template>
  <div class="auth-shell">
    <aside class="auth-aside">
      <div class="auth-brand">
        <div class="logo">
          <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            <path fill="#fff" d="M14.747 9.125c.527-1.426 1.736-2.573 3.317-2.573c1.643 0 2.792 1.085 3.318 2.573l6.077 16.867c.186.496.248.931.248 1.147c0 1.209-.992 2.046-2.139 2.046c-1.303 0-1.954-.682-2.264-1.611l-.931-2.915h-8.62l-.93 2.884c-.31.961-.961 1.642-2.232 1.642c-1.24 0-2.294-.93-2.294-2.17c0-.496.155-.868.217-1.023l6.233-16.867zm.34 11.256h5.891l-2.883-8.992h-.062l-2.946 8.992z"/>
          </svg>
        </div>
        <div class="name">{{ APP_NAME }}</div>
      </div>

      <div class="auth-aside-body">
        <span class="auth-aside-eyebrow">Sistem Pencatatan Pelanggaran Siswa</span>
        <h1>Pantau dan kelola kedisiplinan siswa dalam satu tempat.</h1>
        <p>Catat pelanggaran, verifikasi bukti, dan lihat rekap poin secara real-time dengan alur kerja yang rapi.</p>
        <div class="auth-quote">
          "Pencatatan manual jadi digital dan transparan. Rekap poin tiap siswa langsung terlihat."
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
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Kembali ke beranda
        </RouterLink>
      </div>

      <div class="auth-card">
        <h2>Selamat datang kembali</h2>
        <p class="sub">Masuk ke akunmu untuk melanjutkan.</p>

        <form class="auth-form" @submit.prevent="handleSubmit">
          <div class="field">
            <label class="field-label" for="username">Username</label>
            <div class="input-icon">
              <span class="ico">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="8" r="4"/>
                  <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>
                </svg>
              </span>
              <input id="username" v-model="username" class="input" type="text" placeholder="guru" autocomplete="username" required>
            </div>
          </div>

          <div class="field">
            <div class="field-row">
              <label class="field-label" for="password">Password</label>
              <a href="#">Lupa?</a>
            </div>
            <div class="input-icon">
              <span class="ico">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
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
            <svg viewBox="0 0 24 24">
              <path d="M5 12h14M13 5l7 7-7 7"/>
            </svg>
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
