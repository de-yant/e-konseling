<script setup>
import { getSession } from '@/services/authService'
import { getMenus } from '@/utils/menus'

const session = getSession()
const menus = getMenus(session?.role, session?.home)
</script>

<template>
  <nav class="mobile-nav" aria-label="Menu utama">
    <template v-for="m in menus" :key="m.label">
      <RouterLink v-if="m.to" class="mobile-nav-item" :to="m.to" active-class="active">
        <svg v-if="m.icon === 'grid'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>
        <svg v-else-if="m.icon === 'alert'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>
        <svg v-else-if="m.icon === 'tag'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.59 13.41 12 22l-8.59-8.59A2 2 0 0 1 3 12V5a2 2 0 0 1 2-2h7a2 2 0 0 1 1.41.59L22 12z"/><circle cx="7.5" cy="7.5" r="1.2"/></svg>
        <svg v-else-if="m.icon === 'users'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="8" r="3.5"/><path d="M2 21c0-3.9 3.1-7 7-7s7 3.1 7 7"/><path d="M16 3.5a3.5 3.5 0 0 1 0 7M22 21c0-3.1-2-5.7-4.8-6.6"/></svg>
        <svg v-else-if="m.icon === 'chart'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20V10M18 20V4M6 20v-4"/></svg>
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>
        <span>{{ m.label }}</span>
      </RouterLink>

      <a v-else class="mobile-nav-item" :href="m.href">
        <svg v-if="m.icon === 'alert'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>
        <svg v-else-if="m.icon === 'tag'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.59 13.41 12 22l-8.59-8.59A2 2 0 0 1 3 12V5a2 2 0 0 1 2-2h7a2 2 0 0 1 1.41.59L22 12z"/><circle cx="7.5" cy="7.5" r="1.2"/></svg>
        <svg v-else-if="m.icon === 'users'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="8" r="3.5"/><path d="M2 21c0-3.9 3.1-7 7-7s7 3.1 7 7"/><path d="M16 3.5a3.5 3.5 0 0 1 0 7M22 21c0-3.1-2-5.7-4.8-6.6"/></svg>
        <svg v-else-if="m.icon === 'chart'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20V10M18 20V4M6 20v-4"/></svg>
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>
        <span>{{ m.label }}</span>
      </a>
    </template>
  </nav>
</template>

<style scoped>
.mobile-nav {
  display: none;
}

@media (max-width: 720px) {
  .mobile-nav {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 80;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    align-items: center;
    gap: 2px;
    padding: 6px 6px calc(6px + env(safe-area-inset-bottom, 0px));
    background: var(--bg-card, #fff);
    border-top: 1px solid var(--border, #e4e8ef);
    box-shadow: 0 -4px 16px rgba(15, 23, 42, 0.06);
  }

  .mobile-nav-item {
    display: grid;
    place-items: center;
    gap: 3px;
    padding: 7px 2px;
    border-radius: 10px;
    color: var(--t-muted, #64748b);
    font-size: 10.5px;
    font-weight: 600;
    text-align: center;
  }

  .mobile-nav-item svg {
    width: 20px;
    height: 20px;
  }

  .mobile-nav-item span {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .mobile-nav-item.active {
    color: var(--primary, #2563eb);
    background: var(--primary-soft, #eff6ff);
  }
}
</style>
