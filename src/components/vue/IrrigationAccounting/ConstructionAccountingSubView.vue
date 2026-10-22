<template>
  <div class="space-y-3">
    <!-- Filter & Action Bar -->
    <div class="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-2.5 text-xs">
      <div class="flex flex-wrap items-center gap-2">
        <div class="flex items-center gap-1.5">
          <span class="text-slate-500 font-medium">所属区县：</span>
          <select
            v-model="filterDistrict"
            class="bg-slate-50 border border-slate-300 rounded-md px-2.5 py-1 text-xs text-slate-700 focus:outline-none focus:border-blue-500"
          >
            <option value="全部">全部区县</option>
            <option value="城北区">城北区</option>
            <option value="湟中区">湟中区</option>
            <option value="城东区">城东区</option>
            <option value="大通县">大通县</option>
          </select>
        </div>

        <div class="flex items-center gap-1.5">
          <span class="text-slate-500 font-medium">审核状态：</span>
          <select
            v-model="filterStatus"
            class="bg-slate-50 border border-slate-300 rounded-md px-2.5 py-1 text-xs text-slate-700 focus:outline-none focus:border-blue-500"
          >
            <option value="全部">全部状态</option>
            <option value="draft">县级草稿</option>
            <option value="pending_city">待市级审核</option>
            <option value="approved">审核通过(已入库)</option>
            <option value="rejected">已退回</option>
          </select>
        </div>

        <div class="relative">
          <input
            v-model="searchKeyword"
            type="text"
            placeholder="搜索工程项目群/企业名称..."
            class="w-56 bg-slate-50 border border-slate-300 rounded-md pl-7 pr-2.5 py-1 text-xs text-slate-700 focus:outline-none focus:border-blue-500"
          />
          <svg class="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <button
          v-if="currentRole === 'county'"
          type="button"
          @click="openAddModal"
          class="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>区县填报建筑业用水核算</span>
        </button>

        <div class="text-[11px] text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
          来源：<strong>统计部门《房屋建筑施工与竣工面积》× 单位建筑面积用水定额</strong>
        </div>
      </div>
    </div>

    <!-- Summary Metrics Cards -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
      <div class="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
        <span class="text-slate-500 block text-[11px]">建筑施工项目群</span>
        <div class="text-xl font-bold font-mono text-slate-800 mt-0.5">
          {{ list.length }} <span class="text-xs font-normal text-slate-500">个片区</span>
        </div>
        <div class="text-[10px] text-slate-400 mt-0.5">涵盖城北/湟中/城东/大通重点工程</div>
      </div>

      <div class="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
        <span class="text-slate-500 block text-[11px]">统计部门核实竣工面积</span>
        <div class="text-xl font-bold font-mono text-blue-700 mt-0.5">
          {{ (totalAreaSum / 10000).toFixed(2) }} <span class="text-xs font-normal text-slate-500">万㎡</span>
        </div>
        <div class="text-[10px] text-blue-600 mt-0.5">严格源自统计部门年报台账</div>
      </div>

      <div class="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
        <span class="text-slate-500 block text-[11px]">建筑业自备水取用水量</span>
        <div class="text-xl font-bold font-mono text-emerald-700 mt-0.5">
          {{ totalWaterSum.toFixed(2) }} <span class="text-xs font-normal text-slate-500">万m³</span>
        </div>
        <div class="text-[10px] text-slate-500 mt-0.5">
          地表 {{ totalSurfaceSum.toFixed(2) }} | 地下 {{ totalGroundSum.toFixed(2) }} | 其他 {{ totalOtherSum.toFixed(2) }}
        </div>
      </div>

      <div class="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
        <span class="text-slate-500 block text-[11px]">市级审核通过进度</span>
        <div class="text-xl font-bold font-mono text-indigo-700 mt-0.5">
          {{ approvedCount }} <span class="text-xs font-normal text-slate-500">/ {{ list.length }} 通过</span>
        </div>
        <div class="text-[10px] text-amber-600 font-medium mt-0.5">待市级审核 {{ pendingCityCount }} 个项目群</div>
      </div>
    </div>

    <!-- 规范模板表格 -->
    <div class="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
      <div class="p-2.5 px-3.5 bg-slate-50/90 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div class="font-bold text-slate-800 flex items-center gap-1.5">
          <span class="w-1.5 h-3.5 rounded-full bg-indigo-600"></span>
          <span>建筑业用水核算统计表（规范模板）</span>
        </div>
        <div class="text-[11px] text-slate-500">
          包含：房屋建筑竣工面积、单位面积用水定额、自备地表水/地下水/非常规水拆分、定额(20%)与直报比对
        </div>
      </div>

      <div class="overflow-x-auto no-scrollbar">
        <table class="w-full text-left text-xs border-collapse border-spacing-0">
          <thead class="bg-slate-100/90 text-slate-700 font-semibold border-b border-slate-200 text-[11px]">
            <tr>
              <th rowspan="2" class="p-2.5 text-center w-12 border-r border-slate-200">序号</th>
              <th colspan="3" class="p-2 text-center bg-blue-50/80 border-r border-blue-200 text-blue-900 font-bold border-b border-blue-200">
                建筑工程与竣工基础信息
              </th>
              <th colspan="4" class="p-2 text-center bg-emerald-50/80 border-r border-emerald-200 text-emerald-900 font-bold border-b border-emerald-200">
                自备水源取用水量 (万m³)
              </th>
              <th rowspan="2" class="p-2.5 min-w-[130px] text-center border-r border-slate-200 bg-amber-50/50">
                市级审核指标 (定额/直报)
              </th>
              <th rowspan="2" class="p-2.5 min-w-[95px] text-center border-r border-slate-200">审核状态</th>
              <th rowspan="2" class="p-2.5 min-w-[120px] text-center sticky right-0 bg-slate-100 z-10 shadow-[-3px_0_6px_-2px_rgba(0,0,0,0.06)]">
                业务操作
              </th>
            </tr>
            <tr class="bg-slate-50/90 text-[10.5px]">
              <th class="p-1.5 px-2 border-r border-slate-200">建设项目群 / 企业名称</th>
              <th class="p-1.5 px-2 text-right border-r border-slate-200">竣工建筑面积 (㎡)</th>
              <th class="p-1.5 px-2 text-right border-r border-blue-200">单位建筑面积用水量 (m³/㎡)</th>

              <th class="p-1.5 px-2 text-right border-r border-slate-200">自备地表水 (万m³)</th>
              <th class="p-1.5 px-2 text-right border-r border-slate-200">自备地下水 (万m³)</th>
              <th class="p-1.5 px-2 text-right border-r border-slate-200">其他非常规水 (万m³)</th>
              <th class="p-1.5 px-2 text-right border-r border-emerald-200 font-bold text-emerald-800 bg-emerald-100/40">取用水合计 (万m³)</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="(item, idx) in filteredList"
              :key="item.id"
              class="transition hover:bg-indigo-50/20"
            >
              <td class="p-2.5 text-center text-slate-400 font-mono border-r border-slate-100">
                {{ idx + 1 }}
              </td>

              <!-- 项目群 -->
              <td class="p-2.5 border-r border-slate-100">
                <div class="font-bold text-slate-900">{{ item.enterpriseName }}</div>
                <div class="text-[10.5px] text-slate-400 font-mono">{{ item.district }} · {{ item.statDeptSource }}</div>
              </td>

              <!-- 竣工面积 -->
              <td class="p-2.5 text-right font-mono font-medium text-slate-800 border-r border-slate-100">
                {{ item.completedArea.toLocaleString() }}
              </td>

              <!-- 单位建筑面积用水量 -->
              <td class="p-2.5 text-right font-mono border-r border-blue-100">
                <div class="font-bold text-blue-700">{{ item.waterQuotaPerSquare.toFixed(2) }}</div>
                <div class="text-[10px] text-slate-400">定额基准: {{ item.standardQuotaPerSquare }}</div>
              </td>

              <!-- 自备地表水 -->
              <td class="p-2.5 text-right font-mono text-slate-700 border-r border-slate-100">
                {{ item.selfSurfaceWater.toFixed(2) }}
              </td>

              <!-- 自备地下水 -->
              <td class="p-2.5 text-right font-mono text-cyan-700 font-semibold border-r border-slate-100">
                {{ item.selfGroundwater.toFixed(2) }}
              </td>

              <!-- 其他非常规水 -->
              <td class="p-2.5 text-right font-mono text-slate-500 border-r border-slate-100">
                {{ item.otherWater.toFixed(2) }}
              </td>

              <!-- 合计 -->
              <td class="p-2.5 text-right font-mono font-bold text-emerald-700 bg-emerald-50/30 border-r border-emerald-100">
                {{ item.totalWater.toFixed(2) }}
              </td>

              <!-- 审核指标 -->
              <td class="p-2.5 border-r border-slate-100 text-[10.5px]">
                <div class="flex items-center justify-between">
                  <span class="text-slate-500">定额偏差:</span>
                  <span :class="Math.abs(item.quotaDeviation) > 20 ? 'text-rose-600 font-bold' : 'text-slate-700 font-mono'">
                    {{ item.quotaDeviation > 0 ? '+' : '' }}{{ item.quotaDeviation.toFixed(1) }}%
                  </span>
                </div>
                <div class="flex items-center justify-between mt-0.5">
                  <span class="text-slate-500">直报比对:</span>
                  <span class="text-emerald-700 font-mono">{{ item.directReportDeviation.toFixed(1) }}%</span>
                </div>
              </td>

              <!-- 状态 -->
              <td class="p-2.5 text-center border-r border-slate-100">
                <span
                  v-if="item.status === 'draft'"
                  class="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-slate-100 text-slate-700"
                >
                  县级草稿
                </span>
                <span
                  v-else-if="item.status === 'pending_city'"
                  class="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-amber-100 text-amber-800 border border-amber-300 animate-pulse"
                >
                  待市级审核
                </span>
                <span
                  v-else-if="item.status === 'approved'"
                  class="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300"
                >
                  审核通过
                </span>
                <span
                  v-else
                  class="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-rose-100 text-rose-800"
                >
                  已退回
                </span>
              </td>

              <!-- 操作 -->
              <td class="p-2.5 text-center sticky right-0 bg-white z-10 shadow-[-3px_0_6px_-2px_rgba(0,0,0,0.06)]">
                <div class="flex items-center justify-center gap-1.5">
                  <button
                    v-if="(currentRole === 'city' || currentRole === 'province') && item.status === 'pending_city'"
                    type="button"
                    @click="openAuditModal(item)"
                    class="px-2 py-0.5 rounded bg-amber-500 hover:bg-amber-600 text-white font-medium cursor-pointer"
                  >
                    审核
                  </button>
                  <button
                    v-if="currentRole === 'county' && (item.status === 'draft' || item.status === 'rejected')"
                    type="button"
                    @click="submitToCity(item)"
                    class="px-2 py-0.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium cursor-pointer"
                  >
                    上报市审
                  </button>
                  <button
                    type="button"
                    @click="viewDetail(item)"
                    class="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                  >
                    凭证
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="filteredList.length === 0">
              <td colspan="11" class="p-8 text-center text-slate-400">
                暂无符合条件的建筑业用水核算记录
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 填报弹窗 -->
    <t-dialog
      v-model:visible="addModalVisible"
      header="区、县级水行政主管部门 - 建筑业用水核算填报"
      width="750px"
      :footer="false"
      :close-on-overlay-click="false"
    >
      <div class="space-y-4 max-h-[75vh] overflow-y-auto pr-1 text-xs select-none">
        <div class="bg-blue-50 border border-blue-200 p-2.5 rounded-lg text-blue-900 text-[11.5px] leading-relaxed">
          <strong>填报须知：</strong>竣工面积需源自统计部门年报凭证。填报单位建筑面积用水量定额与自备水源取水量（自备地表水、自备地下水、再生水等），提交后系统将核验定额偏差与直报系统吻合度。
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-slate-600 mb-1 font-medium">工程建设项目群/企业名称 <span class="text-rose-500">*</span></label>
            <input
              v-model="newForm.enterpriseName"
              type="text"
              placeholder="例如：城北区重点工程建设项目群"
              class="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800"
            />
          </div>

          <div>
            <label class="block text-slate-600 mb-1 font-medium">所属区县 <span class="text-rose-500">*</span></label>
            <select
              v-model="newForm.district"
              class="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800"
            >
              <option value="城北区">城北区</option>
              <option value="湟中区">湟中区</option>
              <option value="城东区">城东区</option>
              <option value="大通县">大通县</option>
            </select>
          </div>

          <div>
            <label class="block text-slate-600 mb-1 font-medium">统计部门核准竣工面积 (㎡) <span class="text-rose-500">*</span></label>
            <input
              v-model.number="newForm.completedArea"
              type="number"
              class="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800"
            />
          </div>

          <div>
            <label class="block text-slate-600 mb-1 font-medium">单位建筑面积用水量 (m³/㎡) <span class="text-rose-500">*</span></label>
            <input
              v-model.number="newForm.waterQuotaPerSquare"
              type="number"
              step="0.01"
              class="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-blue-700 font-bold"
            />
          </div>

          <div>
            <label class="block text-slate-600 mb-1 font-medium">自备地表水水量 (万m³)</label>
            <input
              v-model.number="newForm.selfSurfaceWater"
              type="number"
              step="0.01"
              class="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800"
            />
          </div>

          <div>
            <label class="block text-slate-600 mb-1 font-medium">自备地下水水量 (万m³)</label>
            <input
              v-model.number="newForm.selfGroundwater"
              type="number"
              step="0.01"
              class="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-cyan-700 font-bold"
            />
          </div>

          <div>
            <label class="block text-slate-600 mb-1 font-medium">其他非常规水源 (万m³)</label>
            <input
              v-model.number="newForm.otherWater"
              type="number"
              step="0.01"
              class="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800"
            />
          </div>

          <div>
            <label class="block text-slate-600 mb-1 font-medium">统计数据来源凭证说明</label>
            <input
              v-model="newForm.statDeptSource"
              type="text"
              class="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800"
            />
          </div>
        </div>

        <div class="p-3 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center justify-between text-xs">
          <span class="text-emerald-900 font-bold">总自备用水量合计：</span>
          <span class="text-base font-mono font-bold text-emerald-700">
            {{ (newForm.selfSurfaceWater + newForm.selfGroundwater + newForm.otherWater).toFixed(2) }} 万m³
          </span>
        </div>

        <div class="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-200">
          <button
            type="button"
            @click="addModalVisible = false"
            class="px-3.5 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            取消
          </button>
          <button
            type="button"
            @click="saveNewForm(true)"
            class="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition cursor-pointer shadow-2xs"
          >
            提交市级审核
          </button>
        </div>
      </div>
    </t-dialog>

    <!-- 市级审核弹窗 -->
    <t-dialog
      v-model:visible="auditModalVisible"
      header="市级水行政主管部门审核 - 建筑业用水核算"
      width="720px"
      :footer="false"
      :close-on-overlay-click="false"
    >
      <div v-if="currentAuditItem" class="space-y-3.5 max-h-[75vh] overflow-y-auto pr-1 text-xs">
        <div class="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-950">
          <div class="font-bold">【市级审核要求】</div>
          <div class="text-[11px] mt-0.5">
            审核竣工面积是否源于统计部门资料；核验单位建筑面积用水量定额合理性；检查自备井/自备水源取水许可与水费凭据。
          </div>
        </div>

        <div class="p-2.5 rounded bg-slate-50 border border-slate-200">
          <div>审核对象：<strong>{{ currentAuditItem.enterpriseName }}</strong> ({{ currentAuditItem.district }})</div>
          <div>竣工面积：{{ currentAuditItem.completedArea }} ㎡ | 单位面积用水：{{ currentAuditItem.waterQuotaPerSquare }} m³/㎡</div>
          <div>总取用水量：<strong class="text-emerald-700">{{ currentAuditItem.totalWater }} 万m³</strong></div>
        </div>

        <div>
          <label class="block text-slate-700 font-bold mb-1">市级审核意见 <span class="text-rose-500">*</span></label>
          <textarea
            v-model="auditComment"
            rows="3"
            class="w-full bg-white border border-slate-300 rounded p-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
            placeholder="填写审核意见..."
          ></textarea>
        </div>

        <div class="flex items-center justify-between pt-2 border-t border-slate-200">
          <button
            type="button"
            @click="auditModalVisible = false"
            class="px-3.5 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            取消
          </button>
          <div class="flex items-center gap-2">
            <button
              type="button"
              @click="submitAudit('reject')"
              class="px-4 py-1.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-300 hover:bg-rose-100 font-semibold cursor-pointer"
            >
              审核退回
            </button>
            <button
              type="button"
              @click="submitAudit('pass')"
              class="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold cursor-pointer shadow-2xs"
            >
              审核通过
            </button>
          </div>
        </div>
      </div>
    </t-dialog>

    <!-- 凭证详情弹窗 -->
    <t-dialog
      v-model:visible="detailModalVisible"
      header="建筑业竣工面积与自备水凭证详情"
      width="600px"
      :footer="false"
    >
      <div v-if="currentDetailItem" class="space-y-3 text-xs">
        <div class="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
          <div class="font-bold text-slate-900">{{ currentDetailItem.enterpriseName }}</div>
          <div>统计数据源：{{ currentDetailItem.statDeptSource }}</div>
          <div>凭证文件：<span class="text-blue-700 font-mono underline">{{ currentDetailItem.statVoucherFile }}</span></div>
        </div>
        <div class="p-2.5 bg-blue-50 text-blue-900 rounded border border-blue-200">
          统计局房屋建筑施工与竣工面积年报核对一致，施工降水与养护自备水计量水表齐备。
        </div>
      </div>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type { ConstructionAccountingRecord, IrrigationRoleLevel } from '../../../types';
import { initialConstructionRecords } from '../../../data/mockAccountingCategoriesData';

const props = defineProps<{
  currentRole: IrrigationRoleLevel;
}>();

const list = ref<ConstructionAccountingRecord[]>([...initialConstructionRecords]);

const filterDistrict = ref<string>('全部');
const filterStatus = ref<string>('全部');
const searchKeyword = ref<string>('');

const filteredList = computed(() => {
  return list.value.filter((i) => {
    if (filterDistrict.value !== '全部' && i.district !== filterDistrict.value) return false;
    if (filterStatus.value !== '全部' && i.status !== filterStatus.value) return false;
    if (searchKeyword.value.trim() && !i.enterpriseName.includes(searchKeyword.value.trim())) return false;
    return true;
  });
});

const totalAreaSum = computed(() => list.value.reduce((acc, c) => acc + c.completedArea, 0));
const totalWaterSum = computed(() => list.value.reduce((acc, c) => acc + c.totalWater, 0));
const totalSurfaceSum = computed(() => list.value.reduce((acc, c) => acc + c.selfSurfaceWater, 0));
const totalGroundSum = computed(() => list.value.reduce((acc, c) => acc + c.selfGroundwater, 0));
const totalOtherSum = computed(() => list.value.reduce((acc, c) => acc + c.otherWater, 0));
const approvedCount = computed(() => list.value.filter((i) => i.status === 'approved').length);
const pendingCityCount = computed(() => list.value.filter((i) => i.status === 'pending_city').length);

// 填报
const addModalVisible = ref(false);
const newForm = reactive({
  enterpriseName: '',
  district: '城北区',
  completedArea: 800000,
  waterQuotaPerSquare: 0.33,
  selfSurfaceWater: 10.0,
  selfGroundwater: 15.0,
  otherWater: 1.4,
  statDeptSource: '西宁市统计局建筑业施工与竣工报表',
});

function openAddModal() {
  newForm.enterpriseName = '';
  newForm.district = '城北区';
  newForm.completedArea = 800000;
  newForm.waterQuotaPerSquare = 0.33;
  newForm.selfSurfaceWater = 10.0;
  newForm.selfGroundwater = 15.0;
  newForm.otherWater = 1.4;
  newForm.statDeptSource = '西宁市统计局建筑业施工与竣工报表';
  addModalVisible.value = true;
}

function saveNewForm(submitDirectly: boolean) {
  if (!newForm.enterpriseName.trim()) {
    MessagePlugin.warning('请输入工程建设项目群/企业名称');
    return;
  }
  const total = Number((newForm.selfSurfaceWater + newForm.selfGroundwater + newForm.otherWater).toFixed(2));
  const newRec: ConstructionAccountingRecord = {
    id: `const-${Date.now()}`,
    district: newForm.district,
    year: 2026,
    periodLabel: '2026年度',
    enterpriseName: newForm.enterpriseName,
    completedArea: newForm.completedArea,
    waterQuotaPerSquare: newForm.waterQuotaPerSquare,
    standardQuotaPerSquare: 0.35,
    quotaDeviation: -5.7,
    selfSurfaceWater: newForm.selfSurfaceWater,
    selfGroundwater: newForm.selfGroundwater,
    otherWater: newForm.otherWater,
    totalWater: total,
    statDeptSource: newForm.statDeptSource,
    hasStatVoucher: true,
    statVoucherFile: '建筑业竣工面积与自备水源核算单.pdf',
    directReportWater: Number((total * 0.98).toFixed(2)),
    directReportDeviation: 2.0,
    status: submitDirectly ? 'pending_city' : 'draft',
    reporter: {
      name: '县级填报员',
      unit: `${newForm.district}水务局水资源股`,
      time: new Date().toLocaleString(),
    },
    logs: [
      {
        id: `log-${Date.now()}`,
        action: '县级填报提交',
        operatorName: '县级填报员',
        roleName: `${newForm.district}水务局`,
        time: new Date().toLocaleString(),
        statusAfter: submitDirectly ? 'pending_city' : 'draft',
      },
    ],
  };

  list.value.unshift(newRec);
  addModalVisible.value = false;
  MessagePlugin.success('建筑业用水核算已提交至市水行政主管部门');
}

function submitToCity(item: ConstructionAccountingRecord) {
  item.status = 'pending_city';
  MessagePlugin.success(`${item.enterpriseName}已上报市水务局审核`);
}

// 审核
const auditModalVisible = ref(false);
const currentAuditItem = ref<ConstructionAccountingRecord | null>(null);
const auditComment = ref('');

function openAuditModal(item: ConstructionAccountingRecord) {
  currentAuditItem.value = item;
  auditComment.value = '竣工面积符合统计部门口径，定额用水指标合理，自备井计量有效，准予审核通过。';
  auditModalVisible.value = true;
}

function submitAudit(result: 'pass' | 'reject') {
  if (!currentAuditItem.value) return;
  if (!auditComment.value.trim()) {
    MessagePlugin.warning('请填写审核意见');
    return;
  }
  currentAuditItem.value.status = result === 'pass' ? 'approved' : 'rejected';
  currentAuditItem.value.cityAuditor = {
    name: '刘洪涛',
    unit: '西宁市水务局水资源管理科',
    time: new Date().toLocaleString(),
    result,
    comment: auditComment.value,
  };
  auditModalVisible.value = false;
  MessagePlugin.success(result === 'pass' ? '审核通过，已纳入市级建筑业用水汇总' : '已退回县级部门修改');
}

// 详情
const detailModalVisible = ref(false);
const currentDetailItem = ref<ConstructionAccountingRecord | null>(null);

function viewDetail(item: ConstructionAccountingRecord) {
  currentDetailItem.value = item;
  detailModalVisible.value = true;
}
</script>
