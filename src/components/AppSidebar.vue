<script setup>
import { getSession } from '@/services/authService'
import { getMenus } from '@/utils/menus'
import { APP_NAME } from '@/config'
import NavIcon from '@/components/NavIcon.vue'

const session = getSession()
const menus = getMenus(session?.role, session?.home)
</script>

<template>
  <aside class="d-sidebar">
    <div class="brand">
      <div class="brand-logo">
        <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
          <path fill="#ffffff" d="M14.747 9.125c.527-1.426 1.736-2.573 3.317-2.573c1.643 0 2.792 1.085 3.318 2.573l6.077 16.867c.186.496.248.931.248 1.147c0 1.209-.992 2.046-2.139 2.046c-1.303 0-1.954-.682-2.264-1.611l-.931-2.915h-8.62l-.93 2.884c-.31.961-.961 1.642-2.232 1.642c-1.24 0-2.294-.93-2.294-2.17c0-.496.155-.868.217-1.023l6.233-16.867zm.34 11.256h5.891l-2.883-8.992h-.062l-2.946 8.992z"/>
        </svg>
      </div>
      <div class="brand-text">
        <div class="brand-name">{{ APP_NAME }}</div>
        <div class="brand-tag">{{ session?.label || 'demo' }}</div>
      </div>
    </div>

    <nav class="nav-section">
      <div class="nav-label">Menu</div>

      <template v-for="m in menus" :key="m.label">
        <RouterLink v-if="m.to" class="nav-link" :to="m.to" active-class="active">
          <NavIcon :name="m.icon" />
          <span>{{ m.label }}</span>
        </RouterLink>

        <a v-else class="nav-link" :href="m.href">
          <NavIcon :name="m.icon" />
          <span>{{ m.label }}</span>
        </a>
      </template>
    </nav>

    <div class="sidebar-footer">
      <div class="workspace">
        <div class="workspace-avatar">{{ (session?.username || 'u').slice(0, 2).toUpperCase() }}</div>
        <div class="workspace-text">
          <div class="workspace-name">{{ session?.username || 'Pengguna' }}</div>
          <div class="workspace-role">{{ session?.label || 'demo' }}</div>
        </div>
      </div>
    </div>
  </aside>
</template>
