<template>
  <WaterFacilityDetailModal
    :visible="visible"
    :facility="facility"
    @update:visible="(val) => emit('update:visible', val)"
    @close="emit('close')"
  />
</template>

<script setup lang="ts">
import type { WaterFacility } from '../../types';
import WaterFacilityDetailModal from './WaterFacilityDetailModal.vue';

defineProps<{
  visible: boolean;
  facility: WaterFacility | null;
}>();

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void;
  (e: 'close'): void;
}>();
</script>
