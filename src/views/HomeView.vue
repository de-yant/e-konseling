<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="content">
    <section class="hero">
      <div class="hero-text">
        <span class="eyebrow">Pelanggaran Siswa</span>
        <h1 class="hero-title">Halaman Beranda</h1>
        <p class="hero-sub">Sistem pencatatan dan pemantauan pelanggaran siswa.</p>
      </div>
      <div class="hero-actions">
        <RouterLink class="btn btn--primary" to="/login">
          Masuk
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M13 5l7 7-7 7"/>
          </svg>
        </RouterLink>
      </div>
    </section>
  </div>
</template>
