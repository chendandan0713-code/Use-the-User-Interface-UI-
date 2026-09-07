<template>
  <div
    v-if="visible && item"
    class="fixed inset-0 z-60 flex items-center justify-center bg-black/45 p-4 backdrop-blur-2xs select-none"
    @click.self="handleClose"
  >
    <div
      class="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-[620px] my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]"
    >
      <!-- Header -->
      <div class="px-5 py-3 flex items-center justify-between border-b border-gray-100 bg-[#f8fafc] shrink-0">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 11l3 3L22 4"></path>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-sm font-bold text-gray-900">省级审核复核认定</h3>
          </div>
        </div>
        <button
          type="button"
          @click="handleClose"
          class="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg transition cursor-pointer"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- 表单内容 -->
      <div class="p-3.5 overflow-y-auto space-y-2.5 text-xs text-gray-700 flex-1">
        <div class="p-2.5 bg-amber-50/70 border border-amber-200/70 rounded-xl text-amber-800 text-xs">
          基层排查单位 <strong>{{ item.handleUnit }}</strong> 已提交现场核实卷宗，请省级水资源主管部门完成认定审批。
        </div>

        <!-- 审核结论 -->
        <div class="space-y-1.5">
          <label class="block font-medium text-gray-800">
            <span class="text-red-500 mr-1">*</span>复核结论认定
          </label>
          <div class="flex items-center gap-4 pt-1">
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input type="radio" value="属实确认违规" v-model="auditConclusion" class="accent-[#1677ff]" />
              <span>属实（确认违规，下达整改）</span>
            </label>
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input type="radio" value="不属实撤销" v-model="auditConclusion" class="accent-[#1677ff]" />
              <span>不属实（属于防汛抗旱应急用水，准予免责核销）</span>
            </label>
          </div>
        </div>

        <!-- 处置措施 -->
        <div class="space-y-1.5">
          <label class="block font-medium text-gray-800">
            <span class="text-red-500 mr-1">*</span>处置督办要求
          </label>
          <CustomSelect
            v-model="actionRequirement"
            :options="[
              '限期15日内整改完毕并补缴水资源费',
              '停水封表并立案调查',
              '责令补办水资源论证与变更许可',
              '准予归档核销',
            ]"
            placeholder="请选择处置督办要求"
            :clearable="false"
          />
        </div>

        <!-- 审核意见 -->
        <div class="space-y-1.5">
          <label class="block font-medium text-gray-800">省级复核审核意见</label>
          <textarea
            v-model="auditRemark"
            rows="3"
            placeholder="请输入省级复核专家意见与督办纪要..."
            class="w-full p-2.5 bg-white border border-[#dce6f5] rounded-md text-xs text-gray-800 focus:outline-none focus:border-[#1677ff]"
          ></textarea>
        </div>
      </div>

      <!-- Footer -->
      <div class="px-5 py-2.5 border-t border-gray-100 bg-[#f8fafc] flex items-center justify-end gap-2.5 shrink-0">
        <button
          type="button"
          @click="handleClose"
          class="px-4 py-1.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 rounded-lg text-xs font-medium transition cursor-pointer"
        >
          取消
        </button>
        <button
          type="button"
          @click="handleSubmitAudit"
          class="px-5 py-1.5 bg-[#1677ff] hover:bg-blue-600 text-white rounded-lg text-xs font-medium transition cursor-pointer"
        >
          确认审核通过
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type { ViolationItem } from '../../mockViolationData';
import CustomSelect from './CustomSelect.vue';

const props = defineProps<{
  visible: boolean;
  item: ViolationItem | null;
}>();

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void;
  (e: 'audit-complete', item: ViolationItem, conclusion: string): void;
}>();

const auditConclusion = ref('属实确认违规');
const actionRequirement = ref('限期15日内整改完毕并补缴水资源费');
const auditRemark = ref('经青海省水资源管理中心组织专家复核，监测数据属实无误，同意基层水利局排查认定意见。');

const handleClose = () => {
  emit('update:visible', false);
};

const handleSubmitAudit = () => {
  if (props.item) {
    emit('audit-complete', props.item, auditConclusion.value);
    MessagePlugin.success(`已完成【${props.item.waterOwner}】的省级审核，已流转至整改落实阶段`);
    handleClose();
  }
};
</script>
