const SESSION_KEY = 'pelanggaran-session'

// Akun demo (tampilan awal) — password semua: 123
export const ACCOUNTS = {
  guru: { password: '123', role: 'teacher', label: 'Guru', home: '/teacher' },
  walikelas: { password: '123', role: 'homeroom', label: 'Wali Kelas', home: '/homeroom' },
  bk: { password: '123', role: 'counselor', label: 'Counselor', home: '/counselor' },
  murid: { password: '123', role: 'student', label: 'Murid', home: '/student' },
}

export function login(username, password) {
  const u = String(username || '').trim().toLowerCase()
  const p = String(password || '')
  const account = ACCOUNTS[u]

  if (!account || account.password !== p) return null

  const session = { username: u, role: account.role, label: account.label, home: account.home, ts: Date.now() }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}

export function logout() {
  localStorage.removeItem(SESSION_KEY)
}

export function getSession() {
  try {
    const s = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
    // anggap tidak login bila sesi tidak lengkap/tidak dikenal (mis. sesi format lama)
    if (!s || !s.role || !s.home || !ACCOUNTS[s.username]) {
      localStorage.removeItem(SESSION_KEY)
      return null
    }
    return s
  } catch {
    return null
  }
}

export function isLoggedIn() {
  return !!getSession()
}
