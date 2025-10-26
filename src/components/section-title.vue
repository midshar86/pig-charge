<template>
  <div class="flex my-4 flex-col gap-10 border-2 box-border p-4 rounded-2xl border-orange-500">
    <div class="font-bold text-red-700 text-3xl">
      {{ title }}:
    </div>
    <slot name="default" />
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '标题',
  },
})
</script>

<style scoped lang="scss"></style>
