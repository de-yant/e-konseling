import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import { isLoggedIn, getSession } from '@/services/authService'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/teacher',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'teacher.home', meta: { title: 'Dashboard Guru' }, component: () => import('@/views/teacher/HomeView.vue') },
    ],
  },
  {
    path: '/homeroom',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'homeroom.home', meta: { title: 'Dashboard Wali Kelas' }, component: () => import('@/views/homeroom/HomeView.vue') },
    ],
  },
  {
    path: '/counselor',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'counselor.home', meta: { title: 'Dashboard BK' }, component: () => import('@/views/counselor/HomeView.vue') },
    ],
  },
  {
    path: '/student',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'student.home', meta: { title: 'Dashboard Siswa' }, component: () => import('@/views/student/HomeView.vue') },
      { path: 'pelanggaran', name: 'student.pelanggaran', meta: { title: 'Pelanggaran Saya' }, component: () => import('@/views/student/PelanggaranView.vue') },
      { path: 'profil', name: 'student.profil', meta: { title: 'Profil Saya' }, component: () => import('@/views/student/ProfilView.vue') },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isLoggedIn()) {
    return { name: 'login' }
  }
  if (to.name === 'login' && isLoggedIn()) {
    return getSession()?.home || '/'
  }
  return true
})

export default router
