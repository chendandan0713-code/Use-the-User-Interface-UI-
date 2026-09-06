<template>
  <WaterDistrictTree
    :selected-district="selectedDistrict"
    @select-district="(district, city) => $emit('select-district', district, city)"
  />
</template>

<script setup lang="ts">
import WaterDistrictTree from './WaterDistrictTree.vue';

defineProps<{
  selectedDistrict: string;
}>();

defineEmits<{
  (e: 'select-district', district: string, city?: string): void;
}>();
</script>
