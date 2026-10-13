export function getMenus(role, home) {
  const staff = [
    { label: 'Dashboard', to: home || '/', icon: 'grid' },
    { label: 'Pelanggaran', href: '#', icon: 'alert' },
    { label: 'Kategori', href: '#', icon: 'tag' },
    { label: 'Siswa', href: '#', icon: 'users' },
    { label: 'Laporan', href: '#', icon: 'chart' },
  ]

  const student = [
    { label: 'Dashboard', to: home || '/student', icon: 'grid' },
    { label: 'Pelanggaran', to: '/student/pelanggaran', icon: 'alert' },
    { label: 'Profil', to: '/student/profil', icon: 'user' },
  ]

  return role === 'student' ? student : staff
}
