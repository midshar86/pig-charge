<template>
  <div class="m-10">
    <router-view :key="uuid" />
  </div>
</template>

<script setup>
import { computed } from "vue";
const uuid = computed(() => crypto.randomUUID());
</script>

<style scoped lang="scss"></style>
