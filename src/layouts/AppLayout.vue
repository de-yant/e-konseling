<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppSidebar from '@/components/AppSidebar.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import MobileMenu from '@/components/MobileMenu.vue'

const route = useRoute()
const title = computed(() => route.meta?.title || 'Dashboard')
</script>

<template>
  <div class="shell">
    <AppSidebar />

    <div class="main">
      <AppHeader :title="title" />

      <RouterView />

      <AppFooter />
    </div>
  </div>

  <MobileMenu />
</template>

<style scoped>
@media (max-width: 720px) {
  .main {
    padding-bottom: 68px;
  }
}
</style>
