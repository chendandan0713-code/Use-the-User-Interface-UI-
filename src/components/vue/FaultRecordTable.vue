<template>
  <div class="bg-white rounded-xl border border-[#b4c7e0] shadow-xs flex-1 flex flex-col min-h-0 overflow-hidden select-none">
    <div class="flex-1 overflow-x-auto overflow-y-auto custom-scrollbar">
      <table class="w-full text-left border-collapse text-xs border-l border-t border-[#c4d8ee]">
        <thead class="bg-[#eaf1fb] text-slate-700 font-semibold sticky top-0 z-20 border-b border-[#a6c1e2]">
          <tr>
            <th class="p-3 whitespace-nowrap border-r border-b border-[#c4d8ee] sticky top-0 left-0 z-30 bg-[#eaf1fb] shadow-[2px_0_6px_-2px_rgba(0,0,0,0.06)]">序号</th>
            <th class="p-3 whitespace-nowrap min-w-[180px] border-r border-b border-[#c4d8ee] sticky top-0 bg-[#eaf1fb]">取水权人 / 证照</th>
            <th class="p-3 whitespace-nowrap min-w-[160px] border-r border-b border-[#c4d8ee] sticky top-0 bg-[#eaf1fb]">计量设施 / 编号</th>
            <th class="p-3 whitespace-nowrap border-r border-b border-[#c4d8ee] sticky top-0 bg-[#eaf1fb]">故障表底数</th>
            <th class="p-3 whitespace-nowrap min-w-[140px] border-r border-b border-[#c4d8ee] sticky top-0 bg-[#eaf1fb]">故障情况说明</th>
            <th class="p-3 whitespace-nowrap border-r border-b border-[#c4d8ee] sticky top-0 bg-[#eaf1fb]">佐证材料</th>
            <th class="p-3 whitespace-nowrap border-r border-b border-[#c4d8ee] sticky top-0 bg-[#eaf1fb]">上报人 / 时间</th>
            <th class="p-3 whitespace-nowrap border-r border-b border-[#c4d8ee] sticky top-0 bg-[#eaf1fb]">当前状态</th>
            <th class="p-3 whitespace-nowrap text-right pr-4 min-w-[140px] border-r border-b border-[#c4d8ee] sticky top-0 right-0 z-30 bg-[#eaf1fb] shadow-[-3px_0_6px_-2px_rgba(0,0,0,0.08)]">操作</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#c4d8ee] text-slate-700">
          <tr
            v-for="(row, idx) in paginatedRecords"
            :key="row.id"
            class="group hover:bg-[#f5f8fd] transition"
            :class="idx % 2 === 1 ? 'bg-[#fcfdfd]' : 'bg-white'"
          >
            <!-- 序号 (固定在最左侧) -->
            <td
              class="p-3 font-mono text-slate-500 border-r border-b border-[#c4d8ee] sticky left-0 z-10 transition-colors shadow-[2px_0_6px_-2px_rgba(0,0,0,0.06)]"
              :class="idx % 2 === 1 ? 'bg-[#fcfdfd] group-hover:bg-[#f5f8fd]' : 'bg-white group-hover:bg-[#f5f8fd]'"
            >
              {{ (currentPage - 1) * pageSize + idx + 1 }}
            </td>

            <td class="p-3 border-r border-b border-[#c4d8ee]">
              <div class="font-bold text-slate-800">{{ row.waterOwner }}</div>
              <div class="text-[11px] text-slate-400 font-mono mt-0.5">{{ row.permitNumber }}</div>
            </td>

            <td class="p-3 border-r border-b border-[#c4d8ee]">
              <div class="font-medium text-slate-800">{{ row.facilityName }}</div>
              <div class="text-[11px] text-slate-400 font-mono mt-0.5">{{ row.facilityCode }}</div>
            </td>

            <td class="p-3 font-mono font-bold text-slate-700 border-r border-b border-[#c4d8ee]">
              {{ row.faultWaterMeterReading }} m³
            </td>

            <td class="p-3 text-slate-600 max-w-[200px] truncate border-r border-b border-[#c4d8ee]" :title="row.faultDesc">
              {{ row.faultDesc }}
            </td>

            <td class="p-3 border-r border-b border-[#c4d8ee]">
              <button
                type="button"
                @click="$emit('preview-media', row)"
                class="text-blue-600 hover:text-blue-800 font-medium cursor-pointer flex items-center gap-1"
              >
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <span>查看照片({{ row.faultImages?.length || 1 }})</span>
              </button>
            </td>

            <td class="p-3 text-[11px] border-r border-b border-[#c4d8ee]">
              <div class="font-medium text-slate-800">{{ row.reporter }}</div>
              <div class="text-slate-400 font-mono">{{ row.faultTime }}</div>
            </td>

            <td class="p-3 whitespace-nowrap border-r border-b border-[#c4d8ee]">
              <t-tag
                v-if="row.status === '已完成'"
                theme="success"
                variant="light"
                size="small"
              >
                已完成
              </t-tag>
              <t-tag
                v-else-if="row.status === '故障待审'"
                theme="warning"
                variant="light"
                size="small"
              >
                故障待审
              </t-tag>
              <t-tag
                v-else-if="row.status === '处理待审'"
                theme="primary"
                variant="light"
                size="small"
              >
                处理待审
              </t-tag>
              <t-tag
                v-else
                theme="danger"
                variant="light"
                size="small"
              >
                {{ row.status }}
              </t-tag>
            </td>

            <!-- 操作 (固定在最右侧) -->
            <td
              class="p-3 whitespace-nowrap text-right pr-4 border-r border-b border-[#c4d8ee] sticky right-0 z-10 transition-colors shadow-[-3px_0_6px_-2px_rgba(0,0,0,0.08)]"
              :class="idx % 2 === 1 ? 'bg-[#fcfdfd] group-hover:bg-[#f5f8fd]' : 'bg-white group-hover:bg-[#f5f8fd]'"
            >
              <div class="flex items-center justify-end gap-1.5">
                <t-button
                  theme="primary"
                  variant="text"
                  size="small"
                  @click="$emit('view-workflow', row)"
                >
                  流程进度
                </t-button>
                <t-button
                  v-if="row.canReapply"
                  theme="default"
                  variant="text"
                  size="small"
                  @click="$emit('reapply-fault', row)"
                >
                  重报
                </t-button>
              </div>
            </td>
          </tr>

          <tr v-if="paginatedRecords.length === 0">
            <td colspan="9" class="text-center py-12 text-slate-400 border-r border-b border-[#c4d8ee]">
              暂无匹配的故障工单记录
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Footer -->
    <div class="p-3 border-t border-[#b4c7e0] flex items-center justify-between shrink-0 bg-[#fafcff]">
      <div class="text-xs text-slate-500">
        共 <strong class="text-slate-800 font-mono">{{ total }}</strong> 条报修工单 · 当前第 {{ currentPage }} / {{ totalPages }} 页
      </div>
      <t-pagination
        v-model:current="currentPage"
        v-model:pageSize="pageSize"
        :total="total"
        :pageSizeOptions="[10, 20, 50]"
        size="small"
        showJumper
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { FaultRecord } from '../../types';

const props = defineProps<{
  records: FaultRecord[];
}>();

defineEmits<{
  (e: 'view-workflow', record: FaultRecord): void;
  (e: 'preview-media', record: FaultRecord): void;
  (e: 'reapply-fault', record: FaultRecord): void;
}>();

const currentPage = ref(1);
const pageSize = ref(10);

const total = computed(() => props.records.length);
const totalPages = computed(() => Math.ceil(total.value / pageSize.value) || 1);

const paginatedRecords = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return props.records.slice(start, start + pageSize.value);
});
</script>
