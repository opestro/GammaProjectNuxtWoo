<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const logoUrl = runtimeConfig?.public?.LOGO || null;
</script>

<template>
  <NuxtLink to="/">
    <img  src="../../static/images/LogoLong.webp" alt="Logo" class=""  />
  </NuxtLink>
</template>
