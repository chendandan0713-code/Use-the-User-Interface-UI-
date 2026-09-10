<template>
  <div class="bg-white rounded-xl border border-[#b4c7e0] shadow-2xs flex-1 flex flex-col min-h-0 overflow-hidden select-none">
    <!-- 表格滚动区 -->
    <div class="flex-1 overflow-x-auto overflow-y-auto custom-scrollbar">
      <table class="w-full text-xs text-left border-collapse min-w-[980px] border-l border-t border-[#b8cde6]">
        <!-- 表头 (第一行固定 top-0，序号与操作同时固定左右两端与第一行) -->
        <thead class="bg-[#eaf1fb] text-gray-800 font-bold sticky top-0 z-20 border-b border-[#a6c1e2]">
          <tr>
            <th class="py-3 px-3 text-center w-14 font-medium text-gray-700 border-r border-b border-[#b8cde6] sticky top-0 left-0 z-30 bg-[#eaf1fb] shadow-[2px_0_6px_-2px_rgba(0,0,0,0.06)]">序号</th>
            <th class="py-3 px-3 text-center w-20 font-medium text-gray-700 border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">省</th>
            <th class="py-3 px-3 text-center w-20 font-medium text-gray-700 border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">市</th>
            <th class="py-3 px-3 text-center w-24 font-medium text-gray-700 border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">县</th>
            <th class="py-3 px-3 text-center w-28 font-medium text-gray-700 border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">问题批次年份</th>
            <th class="py-3 px-3 text-center w-28 font-medium text-gray-700 border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">处置时限</th>
            <th class="py-3 px-3 text-center w-24 font-medium text-gray-700 border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">处置阶段</th>
            <th class="py-3 px-3 text-center w-36 font-medium text-gray-700 border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">处置状态</th>
            <th class="py-3 px-4 text-center min-w-[180px] font-medium text-gray-700 border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">问题处置单位</th>
            <th class="py-3 px-4 text-center w-40 font-medium text-gray-700 border-r border-b border-[#b8cde6] sticky top-0 right-0 z-30 bg-[#eaf1fb] shadow-[-3px_0_6px_-2px_rgba(0,0,0,0.08)]">操作</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#c4d8ee]">
          <tr
            v-for="(item, idx) in paginatedItems"
            :key="item.id"
            class="group hover:bg-[#f5f8fd] transition h-14"
            :class="idx % 2 === 1 ? 'bg-[#fcfdfd]' : 'bg-white'"
          >
            <!-- 序号 (固定在最左侧) -->
            <td
              class="py-2.5 px-3 text-center text-gray-600 font-mono border-r border-b border-[#c4d8ee] sticky left-0 z-10 transition-colors shadow-[2px_0_6px_-2px_rgba(0,0,0,0.06)]"
              :class="idx % 2 === 1 ? 'bg-[#fcfdfd] group-hover:bg-[#f5f8fd]' : 'bg-white group-hover:bg-[#f5f8fd]'"
            >
              {{ (currentPage - 1) * pageSize + idx + 1 }}
            </td>

            <!-- 省 -->
            <td class="py-2.5 px-3 text-center text-gray-800 font-normal border-r border-b border-[#c4d8ee]">
              {{ item.province }}
            </td>

            <!-- 市 -->
            <td class="py-2.5 px-3 text-center text-gray-800 font-normal border-r border-b border-[#c4d8ee]">
              {{ item.city }}
            </td>

            <!-- 县 -->
            <td class="py-2.5 px-3 text-center text-gray-800 font-normal border-r border-b border-[#c4d8ee]">
              {{ item.county }}
            </td>

            <!-- 问题批次年份 -->
            <td class="py-2.5 px-3 text-center text-gray-800 font-mono border-r border-b border-[#c4d8ee]">
              {{ item.batchYear }}
            </td>

            <!-- 处置时限 (截图显示为鲜亮绿色：剩余5个工作日 / 剩余2个工作日) -->
            <td class="py-2.5 px-3 text-center font-medium border-r border-b border-[#c4d8ee]">
              <span
                :class="[
                  item.deadline.includes('超期')
                    ? 'text-red-500'
                    : item.deadline.includes('1') || item.deadline.includes('2')
                    ? 'text-amber-600 font-semibold'
                    : 'text-[#10b981]'
                ]"
              >
                {{ item.deadline }}
              </span>
            </td>

            <!-- 处置阶段 (排查复核) -->
            <td class="py-2.5 px-3 text-center text-gray-800 font-normal border-r border-b border-[#c4d8ee]">
              {{ item.stage }}
            </td>

            <!-- 处置状态 (待排查 / 排查-省级待审核，带淡橙色背景浅徽章) -->
            <td class="py-2.5 px-3 text-center border-r border-b border-[#c4d8ee]">
              <span
                v-if="item.status === '待排查'"
                class="inline-block px-2.5 py-0.5 rounded text-[11px] font-normal bg-[#fff7ed] text-[#ea580c] border border-[#ffedd5]"
              >
                待排查
              </span>
              <span
                v-else-if="item.status === '排查-省级待审核'"
                class="inline-block px-2.5 py-0.5 rounded text-[11px] font-normal bg-[#fff7ed] text-[#ea580c] border border-[#ffedd5]"
              >
                排查-省级待审核
              </span>
              <span
                v-else-if="item.status === '整改中'"
                class="inline-block px-2.5 py-0.5 rounded text-[11px] font-normal bg-blue-50 text-blue-600 border border-blue-100"
              >
                整改中
              </span>
              <span
                v-else
                class="inline-block px-2.5 py-0.5 rounded text-[11px] font-normal bg-emerald-50 text-emerald-600 border border-emerald-100"
              >
                {{ item.status }}
              </span>
            </td>

            <!-- 问题处置单位 (完整单位名称，居中或靠左) -->
            <td class="py-2.5 px-4 text-center text-gray-800 font-normal border-r border-b border-[#c4d8ee] truncate max-w-[220px]" :title="item.handleUnit">
              {{ item.handleUnit }}
            </td>

            <!-- 操作: 详情 催办/已催办 审核 删除 (固定在最右侧) -->
            <td
              class="py-2.5 px-4 text-center whitespace-nowrap border-r border-b border-[#c4d8ee] sticky right-0 z-10 transition-colors shadow-[-3px_0_6px_-2px_rgba(0,0,0,0.08)]"
              :class="idx % 2 === 1 ? 'bg-[#fcfdfd] group-hover:bg-[#f5f8fd]' : 'bg-white group-hover:bg-[#f5f8fd]'"
            >
              <div class="flex items-center justify-center gap-3">
                <!-- 详情 -->
                <button
                  type="button"
                  @click="emit('view-detail', item)"
                  class="text-[#1677ff] hover:text-blue-700 font-normal transition cursor-pointer"
                >
                  详情
                </button>

                <!-- 审核 (当为 省级待审核 时出现) -->
                <button
                  v-if="item.status === '排查-省级待审核' || item.checkStatus === '省级待审核'"
                  type="button"
                  @click="emit('audit', item)"
                  class="text-[#0d9488] hover:text-teal-700 font-medium transition cursor-pointer"
                >
                  审核
                </button>

                <!-- 催办 (待排查且未催办为蓝字，已催办为灰色不可点) -->
                <template v-else>
                  <span
                    v-if="item.isUrged"
                    class="text-gray-400 cursor-not-allowed select-none"
                    title="已发送督办短信与系统提醒"
                  >
                    已催办
                  </span>
                  <button
                    v-else
                    type="button"
                    @click="emit('urge', item)"
                    class="text-[#1677ff] hover:text-blue-700 font-normal transition cursor-pointer"
                  >
                    催办
                  </button>
                </template>

                <!-- 删除 -->
                <button
                  type="button"
                  @click="emit('delete', item)"
                  class="text-[#ef4444] hover:text-red-700 font-normal transition cursor-pointer"
                >
                  删除
                </button>
              </div>
            </td>
          </tr>

          <!-- 空状态 -->
          <tr v-if="items.length === 0">
            <td colspan="10" class="py-12 text-center text-gray-400 border-r border-b border-[#c4d8ee]">
              <div class="flex flex-col items-center justify-center gap-2">
                <svg class="w-8 h-8 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <span>未找到符合条件的违规问题记录</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 底部原生分页器 (与截图完全一致：共 93 条数据、20 条/页、页码选择器、跳至) -->
    <div class="px-5 py-3 border-t border-[#b4c7e0] flex items-center justify-between gap-4 text-xs text-gray-600 shrink-0 bg-[#fafcff]">
      <!-- 左侧总条数 -->
      <div class="font-normal text-gray-700">
        共 <span class="font-bold text-gray-900">{{ items.length }}</span> 条数据
      </div>

      <!-- 右侧页码控制 -->
      <div class="flex items-center gap-3">
        <!-- 20 条/页 下拉 -->
        <CustomSelect
          v-model="pageSize"
          :options="[
            { value: 10, label: '10 条/页' },
            { value: 20, label: '20 条/页' },
            { value: 50, label: '50 条/页' },
            { value: 100, label: '100 条/页' },
          ]"
          :clearable="false"
          customClass="w-[98px]"
          @change="currentPage = 1"
        />

        <!-- 页码列表 -->
        <div class="flex items-center gap-1">
          <!-- 上一页 -->
          <button
            type="button"
            @click="changePage(currentPage - 1)"
            :disabled="currentPage <= 1"
            class="w-7 h-7 flex items-center justify-center rounded border border-[#b8cde6] bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-gray-500 transition cursor-pointer"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <!-- 数字页码按钮 (如 1 2 3 4 5) -->
          <button
            v-for="p in totalPages"
            :key="p"
            type="button"
            @click="changePage(p)"
            class="w-7 h-7 flex items-center justify-center rounded text-xs transition cursor-pointer font-medium"
            :class="[
              currentPage === p
                ? 'bg-[#1677ff] text-white shadow-xs font-bold'
                : 'bg-white border border-[#b8cde6] text-gray-700 hover:bg-gray-50'
            ]"
          >
            {{ p }}
          </button>

          <!-- 下一页 -->
          <button
            type="button"
            @click="changePage(currentPage + 1)"
            :disabled="currentPage >= totalPages"
            class="w-7 h-7 flex items-center justify-center rounded border border-[#b8cde6] bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-gray-500 transition cursor-pointer"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        <!-- 跳至某页 -->
        <div class="flex items-center gap-1.5 ml-1">
          <span>跳至</span>
          <input
            v-model.number="jumpPageNumber"
            @keyup.enter="handleJumpPage"
            type="number"
            min="1"
            :max="totalPages"
            class="w-10 h-7 text-center bg-white border border-[#b8cde6] rounded-md text-xs text-gray-800 focus:outline-none focus:border-[#1677ff]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { ViolationItem } from '../../mockViolationData';
import CustomSelect from './CustomSelect.vue';

const props = defineProps<{
  items: ViolationItem[];
}>();

const emit = defineEmits<{
  (e: 'view-detail', item: ViolationItem): void;
  (e: 'audit', item: ViolationItem): void;
  (e: 'urge', item: ViolationItem): void;
  (e: 'delete', item: ViolationItem): void;
}>();

const currentPage = ref(1);
const pageSize = ref(20); // 默认 20 条/页 (截图一致)
const jumpPageNumber = ref(1);

const totalPages = computed(() => {
  return Math.ceil(props.items.length / pageSize.value) || 1;
});

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return props.items.slice(start, start + pageSize.value);
});

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    jumpPageNumber.value = page;
  }
};

const handleJumpPage = () => {
  if (jumpPageNumber.value >= 1 && jumpPageNumber.value <= totalPages.value) {
    currentPage.value = jumpPageNumber.value;
  }
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f8fafc;
}
</style>
