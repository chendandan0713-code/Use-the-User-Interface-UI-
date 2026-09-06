<template>
  <div class="bg-white rounded-lg border border-[#b4c7e0] shadow-2xs flex-1 flex flex-col min-h-0 overflow-hidden select-none">
    <!-- Table Container with distinct deeper grid lines & grayish-blue header (#eaf1fb) -->
    <div class="flex-1 overflow-x-auto overflow-y-auto custom-scrollbar min-h-[460px]">
      <table class="w-full text-left border-collapse text-xs border-l border-t border-[#b8cde6]">
        <!-- Header: 柔和灰蓝底 (#eaf1fb) 与深灰标题字，加深边框清晰分列 (第一行吸顶固定) -->
        <thead class="sticky top-0 z-20">
          <tr class="bg-[#eaf1fb] text-gray-800 font-semibold border-b border-[#a6c1e2]">
            <!-- 1. 序号与选项框合并为一列 (固定在第一行和最左侧) -->
            <th class="py-3 px-2 whitespace-nowrap w-16 text-center border-r border-b border-[#b8cde6] sticky top-0 left-0 z-30 bg-[#eaf1fb] shadow-[2px_0_6px_-2px_rgba(0,0,0,0.06)]">
              <div class="flex items-center justify-center gap-1.5">
                <input
                  type="checkbox"
                  :checked="isAllSelected"
                  @change="toggleSelectAll"
                  class="rounded border-gray-400 text-[#1677ff] focus:ring-[#1677ff] cursor-pointer"
                />
                <span>序号</span>
              </div>
            </th>

            <!-- 2. 设施名称 -->
            <th class="py-3 px-2.5 whitespace-nowrap min-w-[150px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
              设施名称
            </th>

            <!-- 3. 计量设施(器具)编号 -->
            <th class="py-3 px-2.5 whitespace-nowrap min-w-[150px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
              计量设施(器具)编号
            </th>

            <!-- 4. 使用状态 -->
            <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[80px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
              使用状态
            </th>

            <!-- 5. 上报方式 -->
            <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[80px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
              上报方式
            </th>

            <!-- 6. 数据传输方式 -->
            <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[90px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
              数据传输方式
            </th>

            <!-- 7. 水源类型 -->
            <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[80px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
              水源类型
            </th>

            <!-- 8. 建设来源 -->
            <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[100px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
              建设来源
            </th>

            <!-- 9. 资金年份 -->
            <th class="py-3 px-2.5 whitespace-nowrap text-center w-20 border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
              资金年份
            </th>

            <!-- 10. 规格型号 -->
            <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[90px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
              规格型号
            </th>

            <!-- 11. 计量设施类型 -->
            <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[110px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
              计量设施类型
            </th>

            <!-- 12. 附件查看 (参考截图带下方气泡 Popover) -->
            <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[90px] border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
              附件查看
            </th>

            <!-- 13. 档案是否完善 -->
            <th class="py-3 px-2.5 whitespace-nowrap text-center w-24 border-r border-b border-[#b8cde6] sticky top-0 bg-[#eaf1fb]">
              档案是否完善
            </th>

            <!-- 14. 操作 (固定在第一行和最右侧) -->
            <th class="py-3 px-2.5 whitespace-nowrap text-center min-w-[140px] border-r border-b border-[#b8cde6] sticky top-0 right-0 z-30 bg-[#eaf1fb] shadow-[-3px_0_6px_-2px_rgba(0,0,0,0.08)]">
              <div class="inline-flex items-center gap-1">
                <span>操作</span>
                <svg class="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="9" y1="3" x2="9" y2="21"></line>
                </svg>
              </div>
            </th>
          </tr>
        </thead>

        <!-- Table Body: 行高加高 (py-3.5) 且自带浅淡细边框与柔和悬浮态 -->
        <tbody class="text-gray-800 bg-white">
          <tr
            v-for="(row, idx) in paginatedFacilities"
            :key="row.id"
            class="group"
            :class="[
              'hover:bg-[#f5f8fd] transition-colors',
              selectedRowKeys.includes(row.id) ? 'bg-[#eef4fe]' : ''
            ]"
          >
            <!-- 1. 序号与选项框合并一列 (固定在最左侧) -->
            <td
              class="py-3.5 px-2 text-center border-r border-b border-[#b8cde6] whitespace-nowrap sticky left-0 z-10 transition-colors shadow-[2px_0_6px_-2px_rgba(0,0,0,0.06)]"
              :class="selectedRowKeys.includes(row.id) ? 'bg-[#eef4fe]' : 'bg-white group-hover:bg-[#f5f8fd]'"
            >
              <div class="flex items-center justify-center gap-1.5">
                <input
                  type="checkbox"
                  :checked="selectedRowKeys.includes(row.id)"
                  @change="toggleSelectRow(row.id)"
                  class="rounded border-gray-300 text-[#1677ff] focus:ring-[#1677ff] cursor-pointer"
                />
                <span class="font-mono text-gray-500 text-xs">{{ (currentPage - 1) * pageSize + idx + 1 }}</span>
              </div>
            </td>

            <!-- 2. 设施名称 -->
            <td class="py-3.5 px-2.5 font-medium text-gray-900 border-r border-b border-[#b8cde6]">
              <span class="hover:text-[#1677ff] cursor-pointer" @click="$emit('view-detail', row)">
                {{ row.name }}
              </span>
            </td>

            <!-- 3. 计量设施(器具)编号 (可复制) -->
            <td class="py-3.5 px-2.5 font-mono border-r border-b border-[#b8cde6]">
              <div class="flex items-center gap-1 text-[#1677ff]">
                <span class="hover:underline cursor-pointer" @click="$emit('view-detail', row)">
                  {{ row.code }}
                </span>
                <button
                  type="button"
                  @click="copyCode(row.code)"
                  title="复制编号"
                  class="text-gray-400 hover:text-[#1677ff] p-0.5 cursor-pointer rounded"
                >
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </button>
              </div>
            </td>

            <!-- 4. 使用状态 (徽章胶囊) -->
            <td class="py-3.5 px-2.5 whitespace-nowrap text-center border-r border-b border-[#b8cde6]">
              <span
                v-if="row.status === '正常'"
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-600 border border-emerald-200"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                正常
              </span>
              <span
                v-else-if="row.status === '故障'"
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-600 border border-amber-200"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                故障
              </span>
              <span
                v-else
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-500 border border-gray-200"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                停用
              </span>
            </td>

            <!-- 5. 上报方式 -->
            <td class="py-3.5 px-2.5 whitespace-nowrap text-center text-gray-700 border-r border-b border-[#b8cde6]">
              {{ row.reportingMethod || (idx % 3 === 0 ? '接口' : idx % 3 === 1 ? '在线' : '非在线') }}
            </td>

            <!-- 6. 数据传输方式 (在线蓝胶囊 / 非在线灰胶囊) -->
            <td class="py-3.5 px-2.5 whitespace-nowrap text-center border-r border-b border-[#b8cde6]">
              <span
                v-if="row.status !== '停用' && idx % 4 !== 2"
                class="px-1.5 py-0.5 rounded bg-[#e6f1fc] text-[#1677ff] text-[11px]"
              >
                在线
              </span>
              <span
                v-else
                class="px-1.5 py-0.5 rounded bg-[#f0f2f5] text-gray-400 text-[11px]"
              >
                非在线
              </span>
            </td>

            <!-- 7. 水源类型 -->
            <td class="py-3.5 px-2.5 whitespace-nowrap text-center text-gray-700 border-r border-b border-[#b8cde6]">
              {{ row.waterSourceType || (idx % 4 === 0 ? '地表水' : idx % 4 === 1 ? '地下水' : idx % 4 === 2 ? '泉水' : '自备井') }}
            </td>

            <!-- 8. 建设来源 -->
            <td class="py-3.5 px-2.5 whitespace-nowrap text-center text-gray-700 border-r border-b border-[#b8cde6]">
              {{ row.constructionSource || (idx % 3 === 0 ? '自计量' : idx % 3 === 1 ? '中央发展基金' : '省级水利专项') }}
            </td>

            <!-- 9. 资金年份 -->
            <td class="py-3.5 px-2.5 whitespace-nowrap text-center font-mono text-gray-700 border-r border-b border-[#b8cde6]">
              {{ row.fundYear || '2026' }}
            </td>

            <!-- 10. 规格型号 -->
            <td class="py-3.5 px-2.5 whitespace-nowrap text-center font-mono text-gray-700 border-r border-b border-[#b8cde6]">
              {{ row.modelSpecification || getMockModel(idx) }}
            </td>

            <!-- 11. 计量设施类型 -->
            <td class="py-3.5 px-2.5 whitespace-nowrap text-center text-gray-700 border-r border-b border-[#b8cde6]">
              {{ row.meteringMethod || row.facilityType || getMockMeterType(idx) }}
            </td>

            <!-- 12. 附件查看字段 (带下方气泡弹窗，参考截图) -->
            <td class="py-3.5 px-2.5 whitespace-nowrap text-center border-r border-b border-[#b8cde6]">
              <t-popup
                trigger="click"
                placement="bottom"
                show-arrow
                :overlay-inner-style="{ padding: '0px' }"
              >
                <button
                  type="button"
                  class="px-2.5 py-0.5 rounded bg-[#eef4fe] text-[#1677ff] hover:bg-blue-100 font-normal text-xs transition cursor-pointer"
                >
                  查看
                </button>

                <!-- 气泡弹窗内容 (完全按照截图比例与图标高保真还原) -->
                <template #content>
                  <div class="w-[320px] p-3 bg-white rounded-xl shadow-xl border border-gray-200 text-left select-none">
                    <!-- 气泡标题行 -->
                    <div class="flex items-center justify-between pb-2 mb-2.5 border-b border-gray-200">
                      <div class="flex items-center gap-1.5">
                        <span class="font-medium text-gray-900 text-xs">附件查看</span>
                        <span class="text-gray-400 text-xs">({{ getAttachments(row).length }})</span>
                      </div>
                      <span class="text-[11px] text-gray-400">水利核验附件</span>
                    </div>

                    <!-- 附件列表卡片条目 -->
                    <div class="space-y-2">
                      <div
                        v-for="(att, aIdx) in getAttachments(row)"
                        :key="aIdx"
                        class="flex items-center justify-between p-2 rounded-lg border border-[#c4d8ee] bg-[#f9fbfe] hover:bg-[#f0f5fd] transition gap-2"
                      >
                        <div class="flex items-center gap-2 min-w-0 flex-1">
                          <!-- 1. 图片图标 (蓝底相机) -->
                          <div
                            v-if="att.type === 'image'"
                            class="w-6 h-6 rounded bg-[#e6f1fc] text-[#1677ff] flex items-center justify-center shrink-0"
                          >
                            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                              <circle cx="8.5" cy="8.5" r="1.5"></circle>
                              <polyline points="21 15 16 10 5 21"></polyline>
                            </svg>
                          </div>

                          <!-- 2. Word 图标 (蓝紫色底 W) -->
                          <div
                            v-else-if="att.type === 'word'"
                            class="w-6 h-6 rounded bg-[#eef0fe] text-[#2f54eb] flex items-center justify-center shrink-0 font-bold text-[11px]"
                          >
                            W
                          </div>

                          <!-- 3. PDF 图标 (红底文档) -->
                          <div
                            v-else
                            class="w-6 h-6 rounded bg-[#feebee] text-[#f5222d] flex items-center justify-center shrink-0"
                          >
                            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                              <polyline points="14 2 14 8 20 8"></polyline>
                              <line x1="16" y1="13" x2="8" y2="13"></line>
                              <line x1="16" y1="17" x2="8" y2="17"></line>
                            </svg>
                          </div>

                          <!-- 文件名 -->
                          <span class="text-xs text-gray-800 truncate font-normal" :title="att.name">
                            {{ att.name }}
                          </span>
                        </div>

                        <!-- 动作图标 (眼睛预览 / 箭头下载) -->
                        <div class="flex items-center gap-1.5 shrink-0 text-gray-400">
                          <button
                            v-if="att.type === 'image' || att.type === 'pdf'"
                            type="button"
                            @click.stop="openPreview(att, row)"
                            class="hover:text-[#1677ff] p-1 cursor-pointer rounded transition"
                            title="预览附件"
                          >
                            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                          </button>
                          <button
                            type="button"
                            @click.stop="downloadFile(att)"
                            class="hover:text-[#1677ff] p-1 cursor-pointer rounded transition"
                            title="下载附件"
                          >
                            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                              <polyline points="7 10 12 15 17 10"></polyline>
                              <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </t-popup>
            </td>

            <!-- 13. 档案是否完善 (圆形是/否徽章) -->
            <td class="py-3.5 px-2.5 whitespace-nowrap text-center border-r border-b border-[#b8cde6]">
              <div class="flex justify-center">
                <span
                  v-if="row.isArchived || idx % 4 === 0"
                  class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 text-[11px] font-medium flex items-center justify-center"
                >
                  是
                </span>
                <span
                  v-else
                  class="w-5 h-5 rounded-full bg-gray-100 text-gray-400 text-[11px] font-medium flex items-center justify-center"
                >
                  否
                </span>
              </div>
            </td>

            <!-- 14. 操作 (编辑 / 详情 / 更多，固定在最右侧) -->
            <td
              class="py-3.5 px-2.5 whitespace-nowrap text-center border-r border-b border-[#b8cde6] sticky right-0 z-10 transition-colors shadow-[-3px_0_6px_-2px_rgba(0,0,0,0.08)]"
              :class="selectedRowKeys.includes(row.id) ? 'bg-[#eef4fe]' : 'bg-white group-hover:bg-[#f5f8fd]'"
            >
              <div class="flex items-center justify-center gap-2.5 text-xs text-[#1677ff]">
                <button
                  type="button"
                  @click="$emit('edit-facility', row)"
                  class="hover:underline cursor-pointer"
                >
                  编辑
                </button>
                <button
                  type="button"
                  @click="$emit('view-detail', row)"
                  class="hover:underline cursor-pointer"
                >
                  详情
                </button>
                <t-dropdown
                  :options="[
                    { content: row.status === '停用' ? '启用设备' : '停用设备', value: 'toggle' },
                    { content: '绑定数采仪网关', value: 'bind' },
                    { content: '校准与检定记录', value: 'calibrate' },
                    { content: '删除设施', value: 'delete' },
                  ]"
                  @click="(data: any) => handleAction(data.value, row)"
                >
                  <button type="button" class="inline-flex items-center hover:underline cursor-pointer gap-0.5">
                    <span>更多</span>
                    <svg class="w-3.5 h-3.5 text-[#1677ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                </t-dropdown>
              </div>
            </td>
          </tr>

          <!-- Empty State -->
          <tr v-if="paginatedFacilities.length === 0">
            <td colspan="14" class="text-center py-16 text-gray-400 border-r border-b border-[#b8cde6]">
              <div class="flex flex-col items-center justify-center gap-2">
                <svg class="w-8 h-8 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <span>暂无符合条件的计量设施数据</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Footer: 去掉多余的“共2条数据”，整行只保留一个清晰的条数统计 -->
    <div class="px-3 py-2 border-t border-[#b4c7e0] flex flex-wrap items-center justify-between gap-2 shrink-0 bg-white">
      <div class="text-xs text-gray-500">
        共 <strong class="text-gray-800 font-mono font-medium">{{ total }}</strong> 条数据
      </div>
      <t-pagination
        v-model:current="currentPage"
        v-model:pageSize="pageSize"
        :total="total"
        :pageSizeOptions="[10, 20, 50, 100]"
        :total-content="false"
        size="small"
        showJumper
      />
    </div>

    <!-- 附件在线预览弹窗 -->
    <t-dialog
      v-model:visible="previewVisible"
      :header="previewTitle"
      width="600px"
      :footer="false"
    >
      <div class="p-2 space-y-3">
        <div v-if="previewType === 'image'" class="flex flex-col items-center">
          <div class="w-full max-h-[360px] overflow-hidden rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center p-2">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
              alt="现场设备照片"
              class="max-h-[340px] object-contain rounded"
            />
          </div>
          <div class="mt-2 text-xs text-gray-500 flex items-center justify-between w-full px-1">
            <span>现场拍摄设备：DN100超声波水表</span>
            <span>拍摄时间：2026-03-05 10:24</span>
          </div>
        </div>
        <div v-else-if="previewType === 'pdf'" class="p-4 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-600 space-y-2">
          <div class="flex items-center gap-2 font-medium text-gray-900 border-b pb-2">
            <svg class="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            <span>青海省水利工程计量器具质量自检合格证书</span>
          </div>
          <p>检验依据：JJG 162-2019 《冷水水表检定规程》、SL 426-2008 《水资源监控设备技术条件》</p>
          <p>检定结论：合格，符合取水计量国家一级标准与省水资源综合监控接入技术规范。</p>
          <div class="pt-2 text-right text-gray-400">青海省水利水电科学研究院 检验专用章</div>
        </div>
      </div>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type { WaterFacility } from '../../types';

const props = defineProps<{
  facilities: WaterFacility[];
  selectedRowKeys: string[];
}>();

const emit = defineEmits<{
  (e: 'view-detail', facility: WaterFacility): void;
  (e: 'edit-facility', facility: WaterFacility): void;
  (e: 'toggle-disable', facility: WaterFacility): void;
  (e: 'bind-gateway', facility: WaterFacility): void;
  (e: 'update:selectedRowKeys', keys: string[]): void;
}>();

const currentPage = ref(1);
const pageSize = ref(10);

const previewVisible = ref(false);
const previewTitle = ref('');
const previewType = ref<'image' | 'pdf'>('image');

const total = computed(() => props.facilities.length);

const paginatedFacilities = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return props.facilities.slice(start, start + pageSize.value);
});

const isAllSelected = computed(() => {
  if (paginatedFacilities.value.length === 0) return false;
  return paginatedFacilities.value.every((f) => props.selectedRowKeys.includes(f.id));
});

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    const pageIds = paginatedFacilities.value.map((f) => f.id);
    const updated = props.selectedRowKeys.filter((id) => !pageIds.includes(id));
    emit('update:selectedRowKeys', updated);
  } else {
    const pageIds = paginatedFacilities.value.map((f) => f.id);
    const updated = Array.from(new Set([...props.selectedRowKeys, ...pageIds]));
    emit('update:selectedRowKeys', updated);
  }
};

const toggleSelectRow = (id: string) => {
  let updated: string[];
  if (props.selectedRowKeys.includes(id)) {
    updated = props.selectedRowKeys.filter((k) => k !== id);
  } else {
    updated = [...props.selectedRowKeys, id];
  }
  emit('update:selectedRowKeys', updated);
};

const copyCode = (code: string) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(code);
    MessagePlugin.success(`设施编号 ${code} 已复制`);
  }
};

const handleAction = (action: string, row: WaterFacility) => {
  if (action === 'toggle') {
    emit('toggle-disable', row);
  } else if (action === 'bind') {
    emit('bind-gateway', row);
  } else if (action === 'calibrate') {
    MessagePlugin.info(`已调取设施 [${row.name}] 最近检定报告`);
  } else if (action === 'delete') {
    MessagePlugin.warning(`已向监管部门提交注销申请 [${row.name}]`);
  }
};

// 附件列表获取 (严格参考截图格式)
interface FacilityAttachment {
  name: string;
  type: 'image' | 'word' | 'pdf';
  size?: string;
}

const getAttachments = (row: WaterFacility): FacilityAttachment[] => {
  return [
    {
      name: '现场水表故障照片.jpg',
      type: 'image',
      size: '2.4MB',
    },
    {
      name: '水表故障勘测鉴定报告.docx',
      type: 'word',
      size: '158KB',
    },
    {
      name: '设备出厂自检证明.pdf',
      type: 'pdf',
      size: '1.1MB',
    },
  ];
};

const openPreview = (att: FacilityAttachment, row: WaterFacility) => {
  previewTitle.value = `附件预览 - ${att.name}`;
  previewType.value = att.type === 'pdf' ? 'pdf' : 'image';
  previewVisible.value = true;
};

const downloadFile = (att: FacilityAttachment) => {
  MessagePlugin.success(`正在下载附件：${att.name}`);
};

const getMockModel = (idx: number) => {
  const models = ['DN100-W4', 'DN80-G2', 'DN150-Z5', 'DN65-K1', 'DN80-E3', 'DN50-M1', 'DN200-L8', 'DN300-S6'];
  return models[idx % models.length];
};

const getMockMeterType = (idx: number) => {
  const types = ['电磁水表', '超声波水表', '机械水表', '多普勒流速仪', '超声波明渠流量计'];
  return types[idx % types.length];
};
</script>
