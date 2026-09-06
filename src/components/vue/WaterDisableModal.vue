<template>
  <t-dialog
    v-model:visible="visible"
    :header="isDisableAction ? '计量设施停用登记' : '计量设施恢复启用'"
    width="520px"
    :confirm-btn="{ content: isDisableAction ? '确认停用' : '确认恢复启用', theme: isDisableAction ? 'danger' : 'primary' }"
    :cancel-btn="{ content: '取消' }"
    @confirm="handleConfirm"
  >
    <div v-if="facility" class="space-y-3 text-xs select-none py-1">
      <div class="p-3 bg-slate-50 rounded-lg border border-slate-200">
        <div class="font-bold text-slate-800">{{ facility.name }}</div>
        <div class="text-slate-400 font-mono mt-0.5">器具编号: {{ facility.code }} · 所属: {{ facility.waterOwner }}</div>
      </div>

      <div v-if="isDisableAction" class="space-y-2">
        <div>
          <label class="block text-slate-600 mb-1 font-medium">停用原因 <span class="text-red-500">*</span></label>
          <t-select v-model="reason" placeholder="请选择停用原因">
            <t-option value="水厂冬季停水检修" label="水厂冬季停水检修" />
            <t-option value="取水工程管网改造升级" label="取水工程管网改造升级" />
            <t-option value="计量器具送法定检定机构校准" label="计量器具送法定检定机构校准" />
            <t-option value="取水许可证注销或变更" label="取水许可证注销或变更" />
            <t-option value="其他法定事由" label="其他法定事由" />
          </t-select>
        </div>
        <div>
          <label class="block text-slate-600 mb-1 font-medium">证明材料说明</label>
          <t-input v-model="material" placeholder="如：西宁市水务局停运核准函-202609号.pdf" />
        </div>
      </div>

      <div v-else class="text-slate-600 text-xs py-2">
        确定将当前处于停用状态的计量设施恢复为【正常】运行状态并重新启动物联遥测数据采集吗？
      </div>
    </div>
  </t-dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type { WaterFacility } from '../../types';

const props = defineProps<{
  visible: boolean;
  facility: WaterFacility | null;
}>();

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void;
  (e: 'confirm', payload: { id: string; status: '正常' | '停用'; reason?: string; material?: string }): void;
}>();

const visible = computed({
  get: () => props.visible,
  set: (val: boolean) => emit('update:visible', val),
});

const isDisableAction = computed(() => props.facility?.status !== '停用');

const reason = ref('水厂冬季停水检修');
const material = ref('西宁市水政设施停用报备表.pdf');

const handleConfirm = () => {
  if (!props.facility) return;
  if (isDisableAction.value) {
    emit('confirm', {
      id: props.facility.id,
      status: '停用',
      reason: reason.value,
      material: material.value,
    });
    MessagePlugin.warning(`设施【${props.facility.name}】已成功标记停用`);
  } else {
    emit('confirm', {
      id: props.facility.id,
      status: '正常',
    });
    MessagePlugin.success(`设施【${props.facility.name}】已成功恢复正常运行`);
  }
  visible.value = false;
};
</script>
