<script setup>
defineProps({
  name: { type: String, default: 'grid' },
})
</script>

<template>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
    <template v-if="name === 'grid'">
      <rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/>
      <rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/>
    </template>
    <template v-else-if="name === 'alert'">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/>
    </template>
    <template v-else-if="name === 'tag'">
      <path d="M20.59 13.41 12 22l-8.59-8.59A2 2 0 0 1 3 12V5a2 2 0 0 1 2-2h7a2 2 0 0 1 1.41.59L22 12z"/><circle cx="7.5" cy="7.5" r="1.2"/>
    </template>
    <template v-else-if="name === 'users'">
      <circle cx="9" cy="8" r="3.5"/><path d="M2 21c0-3.9 3.1-7 7-7s7 3.1 7 7"/><path d="M16 3.5a3.5 3.5 0 0 1 0 7M22 21c0-3.1-2-5.7-4.8-6.6"/>
    </template>
    <template v-else-if="name === 'chart'">
      <path d="M12 20V10M18 20V4M6 20v-4"/>
    </template>
    <template v-else-if="name === 'user'">
      <circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>
    </template>
    <template v-else>
      <circle cx="12" cy="12" r="9"/>
    </template>
  </svg>
</template>
