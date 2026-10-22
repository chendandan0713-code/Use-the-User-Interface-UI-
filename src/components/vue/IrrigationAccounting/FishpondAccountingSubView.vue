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
            <option value="湟中区">湟中区</option>
            <option value="湟源县">湟源县</option>
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
            placeholder="搜索养殖场/鱼塘名称..."
            class="w-52 bg-slate-50 border border-slate-300 rounded-md pl-7 pr-2.5 py-1 text-xs text-slate-700 focus:outline-none focus:border-blue-500"
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
          <span>区县填报鱼塘补水核算</span>
        </button>

        <div class="text-[11px] text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
          依据：<strong>鱼塘补水面积 × 亩均补水量定额（地表水/地下水拆分）</strong>
        </div>
      </div>
    </div>

    <!-- Summary Metrics Cards -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
      <div class="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
        <span class="text-slate-500 block text-[11px]">纳入核算鱼塘养殖场</span>
        <div class="text-xl font-bold font-mono text-slate-800 mt-0.5">
          {{ list.length }} <span class="text-xs font-normal text-slate-500">家</span>
        </div>
        <div class="text-[10px] text-slate-400 mt-0.5">涵盖高原冷水鱼/垂钓基地</div>
      </div>

      <div class="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
        <span class="text-slate-500 block text-[11px]">鱼塘总补水面积</span>
        <div class="text-xl font-bold font-mono text-blue-700 mt-0.5">
          {{ totalAreaSum.toLocaleString() }} <span class="text-xs font-normal text-slate-500">亩</span>
        </div>
        <div class="text-[10px] text-blue-600 mt-0.5">经农业农村部门渔业报表核实</div>
      </div>

      <div class="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
        <span class="text-slate-500 block text-[11px]">鱼塘补水量总计（万m³）</span>
        <div class="text-xl font-bold font-mono text-emerald-700 mt-0.5">
          {{ totalWaterSum.toFixed(2) }} <span class="text-xs font-normal text-slate-500">万m³</span>
        </div>
        <div class="text-[10px] text-slate-500 mt-0.5">
          地表水 {{ totalSurfaceSum.toFixed(2) }} | 地下水 {{ totalGroundSum.toFixed(2) }}
        </div>
      </div>

      <div class="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
        <span class="text-slate-500 block text-[11px]">市级审核通过情况</span>
        <div class="text-xl font-bold font-mono text-indigo-700 mt-0.5">
          {{ approvedCount }} <span class="text-xs font-normal text-slate-500">/ {{ list.length }} 通过</span>
        </div>
        <div class="text-[10px] text-amber-600 font-medium mt-0.5">待审核 {{ pendingCityCount }} 家</div>
      </div>
    </div>

    <!-- 规范模板表格 -->
    <div class="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
      <div class="p-2.5 px-3.5 bg-slate-50/90 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div class="font-bold text-slate-800 flex items-center gap-1.5">
          <span class="w-1.5 h-3.5 rounded-full bg-cyan-600"></span>
          <span>鱼塘用水核算统计表（规范模板）</span>
        </div>
        <div class="text-[11px] text-slate-500">
          包含：鱼塘补水面积、亩均补水量定额、地表水/地下水水源拆分、定额(20%)与直报系统对比
        </div>
      </div>

      <div class="overflow-x-auto no-scrollbar">
        <table class="w-full text-left text-xs border-collapse border-spacing-0">
          <thead class="bg-slate-100/90 text-slate-700 font-semibold border-b border-slate-200 text-[11px]">
            <tr>
              <th rowspan="2" class="p-2.5 text-center w-12 border-r border-slate-200">序号</th>
              <th colspan="3" class="p-2 text-center bg-blue-50/80 border-r border-blue-200 text-blue-900 font-bold border-b border-blue-200">
                鱼塘养殖基础信息
              </th>
              <th colspan="3" class="p-2 text-center bg-emerald-50/80 border-r border-emerald-200 text-emerald-900 font-bold border-b border-emerald-200">
                补水取用水量 (万m³)
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
              <th class="p-1.5 px-2 border-r border-slate-200">鱼塘/水产基地名称</th>
              <th class="p-1.5 px-2 text-right border-r border-slate-200">鱼塘面积 (亩)</th>
              <th class="p-1.5 px-2 text-right border-r border-blue-200">亩均补水量 (m³/亩·年)</th>

              <th class="p-1.5 px-2 text-right border-r border-slate-200">地表水补水 (万m³)</th>
              <th class="p-1.5 px-2 text-right border-r border-slate-200">地下水补水 (万m³)</th>
              <th class="p-1.5 px-2 text-right border-r border-emerald-200 font-bold text-emerald-800 bg-emerald-100/40">合计补水量 (万m³)</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="(item, idx) in filteredList"
              :key="item.id"
              class="transition hover:bg-cyan-50/20"
            >
              <td class="p-2.5 text-center text-slate-400 font-mono border-r border-slate-100">
                {{ idx + 1 }}
              </td>

              <!-- 鱼塘名称 -->
              <td class="p-2.5 border-r border-slate-100">
                <div class="font-bold text-slate-900">{{ item.pondName }}</div>
                <div class="text-[10.5px] text-slate-400 font-mono">{{ item.district }} · {{ item.dataSourceType }}</div>
              </td>

              <!-- 面积 -->
              <td class="p-2.5 text-right font-mono font-medium text-slate-800 border-r border-slate-100">
                {{ item.pondArea.toLocaleString() }}
              </td>

              <!-- 亩均补水量 -->
              <td class="p-2.5 text-right font-mono border-r border-blue-100">
                <div class="font-bold text-blue-700">{{ item.quotaPerMuYear }}</div>
                <div class="text-[10px] text-slate-400">定额基准: {{ item.standardQuota }}</div>
              </td>

              <!-- 地表水补水 -->
              <td class="p-2.5 text-right font-mono text-slate-700 border-r border-slate-100">
                {{ item.surfaceWaterSupply.toFixed(2) }}
              </td>

              <!-- 地下水补水 -->
              <td class="p-2.5 text-right font-mono text-cyan-700 font-semibold border-r border-slate-100">
                {{ item.groundwaterSupply.toFixed(2) }}
              </td>

              <!-- 合计补水量 -->
              <td class="p-2.5 text-right font-mono font-bold text-emerald-700 bg-emerald-50/30 border-r border-emerald-100">
                {{ item.totalWaterSupply.toFixed(2) }}
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
              <td colspan="10" class="p-8 text-center text-slate-400">
                暂无符合条件的鱼塘用水核算记录
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 填报弹窗 -->
    <t-dialog
      v-model:visible="addModalVisible"
      header="区、县级水行政主管部门 - 鱼塘用水核算填报"
      width="720px"
      :footer="false"
      :close-on-overlay-click="false"
    >
      <div class="space-y-4 max-h-[75vh] overflow-y-auto pr-1 text-xs select-none">
        <div class="bg-blue-50 border border-blue-200 p-2.5 rounded-lg text-blue-900 text-[11.5px] leading-relaxed">
          <strong>填报须知：</strong>填报鱼塘补水面积、亩均补水量定额（根据地方定额标准核算），并分别填报地表水与地下水补水量。提交后将进行定额比对（偏差超20%需说明）及直报系统复核。
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-slate-600 mb-1 font-medium">鱼塘/养殖场名称 <span class="text-rose-500">*</span></label>
            <input
              v-model="newForm.pondName"
              type="text"
              placeholder="例如：湟中区冷水鱼养殖基地"
              class="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800"
            />
          </div>

          <div>
            <label class="block text-slate-600 mb-1 font-medium">所属区县 <span class="text-rose-500">*</span></label>
            <select
              v-model="newForm.district"
              class="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800"
            >
              <option value="湟中区">湟中区</option>
              <option value="湟源县">湟源县</option>
              <option value="大通县">大通县</option>
            </select>
          </div>

          <div>
            <label class="block text-slate-600 mb-1 font-medium">鱼塘补水面积 (亩) <span class="text-rose-500">*</span></label>
            <input
              v-model.number="newForm.pondArea"
              type="number"
              class="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800"
            />
          </div>

          <div>
            <label class="block text-slate-600 mb-1 font-medium">亩均补水量 (m³/亩·年) <span class="text-rose-500">*</span></label>
            <input
              v-model.number="newForm.quotaPerMuYear"
              type="number"
              class="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-blue-700 font-bold"
            />
          </div>

          <div>
            <label class="block text-slate-600 mb-1 font-medium">地表水补水量 (万m³)</label>
            <input
              v-model.number="newForm.surfaceWaterSupply"
              type="number"
              step="0.01"
              class="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800"
            />
          </div>

          <div>
            <label class="block text-slate-600 mb-1 font-medium">地下水补水量 (万m³)</label>
            <input
              v-model.number="newForm.groundwaterSupply"
              type="number"
              step="0.01"
              class="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-cyan-700 font-bold"
            />
          </div>
        </div>

        <div class="p-3 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center justify-between text-xs">
          <span class="text-emerald-900 font-bold">总补水量合计：</span>
          <span class="text-base font-mono font-bold text-emerald-700">
            {{ (newForm.surfaceWaterSupply + newForm.groundwaterSupply).toFixed(2) }} 万m³
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
      header="市级水行政主管部门审核 - 鱼塘用水核算"
      width="700px"
      :footer="false"
      :close-on-overlay-click="false"
    >
      <div v-if="currentAuditItem" class="space-y-3.5 max-h-[75vh] overflow-y-auto pr-1 text-xs">
        <div class="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-950">
          <div class="font-bold">【市级审核要求】</div>
          <div class="text-[11px] mt-0.5">
            核对鱼塘补水面积与亩均补水量定额；检查地表水与地下水计量凭证；偏差超20%需核查养殖品种及水循环工艺。
          </div>
        </div>

        <div class="p-2.5 rounded bg-slate-50 border border-slate-200">
          <div>审核对象：<strong>{{ currentAuditItem.pondName }}</strong> ({{ currentAuditItem.district }})</div>
          <div>补水面积：{{ currentAuditItem.pondArea }} 亩 | 亩均补水：{{ currentAuditItem.quotaPerMuYear }} m³/亩</div>
          <div>总补水量：<strong class="text-emerald-700">{{ currentAuditItem.totalWaterSupply }} 万m³</strong></div>
        </div>

        <div>
          <label class="block text-slate-700 font-bold mb-1">市级审核意见 <span class="text-rose-500">*</span></label>
          <textarea
            v-model="auditComment"
            rows="3"
            class="w-full bg-white border border-slate-300 rounded p-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
            placeholder="填写审核通过或退回批注..."
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
      header="鱼塘补水计量核查凭证详情"
      width="600px"
      :footer="false"
    >
      <div v-if="currentDetailItem" class="space-y-3 text-xs">
        <div class="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
          <div class="font-bold text-slate-900">{{ currentDetailItem.pondName }}</div>
          <div>数据来源部门：{{ currentDetailItem.dataSourceType }}</div>
          <div>附带凭证文件：<span class="text-blue-700 font-mono underline">{{ currentDetailItem.sourceVoucherFile }}</span></div>
        </div>
        <div class="p-2.5 bg-blue-50 text-blue-900 rounded border border-blue-200">
          该水产基地配备有独立明渠计量水尺与深井流量表，已核实抄表周期与补水季节匹配。
        </div>
      </div>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type { FishpondAccountingRecord, IrrigationRoleLevel } from '../../../types';
import { initialFishpondRecords } from '../../../data/mockAccountingCategoriesData';

const props = defineProps<{
  currentRole: IrrigationRoleLevel;
}>();

const list = ref<FishpondAccountingRecord[]>([...initialFishpondRecords]);

const filterDistrict = ref<string>('全部');
const filterStatus = ref<string>('全部');
const searchKeyword = ref<string>('');

const filteredList = computed(() => {
  return list.value.filter((i) => {
    if (filterDistrict.value !== '全部' && i.district !== filterDistrict.value) return false;
    if (filterStatus.value !== '全部' && i.status !== filterStatus.value) return false;
    if (searchKeyword.value.trim() && !i.pondName.includes(searchKeyword.value.trim())) return false;
    return true;
  });
});

const totalAreaSum = computed(() => list.value.reduce((acc, c) => acc + c.pondArea, 0));
const totalWaterSum = computed(() => list.value.reduce((acc, c) => acc + c.totalWaterSupply, 0));
const totalSurfaceSum = computed(() => list.value.reduce((acc, c) => acc + c.surfaceWaterSupply, 0));
const totalGroundSum = computed(() => list.value.reduce((acc, c) => acc + c.groundwaterSupply, 0));
const approvedCount = computed(() => list.value.filter((i) => i.status === 'approved').length);
const pendingCityCount = computed(() => list.value.filter((i) => i.status === 'pending_city').length);

// 填报
const addModalVisible = ref(false);
const newForm = reactive({
  pondName: '',
  district: '湟中区',
  pondArea: 500,
  quotaPerMuYear: 1200,
  surfaceWaterSupply: 40.0,
  groundwaterSupply: 20.0,
});

function openAddModal() {
  newForm.pondName = '';
  newForm.district = '湟中区';
  newForm.pondArea = 500;
  newForm.quotaPerMuYear = 1200;
  newForm.surfaceWaterSupply = 40.0;
  newForm.groundwaterSupply = 20.0;
  addModalVisible.value = true;
}

function saveNewForm(submitDirectly: boolean) {
  if (!newForm.pondName.trim()) {
    MessagePlugin.warning('请输入鱼塘/养殖场名称');
    return;
  }
  const total = Number((newForm.surfaceWaterSupply + newForm.groundwaterSupply).toFixed(2));
  const newRec: FishpondAccountingRecord = {
    id: `fish-${Date.now()}`,
    district: newForm.district,
    year: 2026,
    periodLabel: '2026年度',
    pondName: newForm.pondName,
    pondArea: newForm.pondArea,
    quotaPerMuYear: newForm.quotaPerMuYear,
    standardQuota: 1250,
    quotaDeviation: -4.0,
    surfaceWaterSupply: newForm.surfaceWaterSupply,
    groundwaterSupply: newForm.groundwaterSupply,
    totalWaterSupply: total,
    dataSourceType: `${newForm.district}农业农村局渔业水产台账`,
    hasSourceVoucher: true,
    sourceVoucherFile: '水产养殖补水计量台账凭证.pdf',
    directReportWater: Number((total * 0.98).toFixed(2)),
    directReportDeviation: 2.0,
    status: submitDirectly ? 'pending_city' : 'draft',
    reporter: {
      name: '县级填报员',
      unit: `${newForm.district}水务局`,
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
  MessagePlugin.success('鱼塘用水核算已提交至市水行政主管部门');
}

function submitToCity(item: FishpondAccountingRecord) {
  item.status = 'pending_city';
  MessagePlugin.success(`${item.pondName}已提交市水务局审核`);
}

// 审核
const auditModalVisible = ref(false);
const currentAuditItem = ref<FishpondAccountingRecord | null>(null);
const auditComment = ref('');

function openAuditModal(item: FishpondAccountingRecord) {
  currentAuditItem.value = item;
  auditComment.value = '补水面积与亩均补水量符合高寒冷水鱼定额标准，取水凭证完备，准予通过。';
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
  MessagePlugin.success(result === 'pass' ? '审核通过，已纳入市级鱼塘用水汇总' : '已退回县级部门修改');
}

// 详情
const detailModalVisible = ref(false);
const currentDetailItem = ref<FishpondAccountingRecord | null>(null);

function viewDetail(item: FishpondAccountingRecord) {
  currentDetailItem.value = item;
  detailModalVisible.value = true;
}
</script>
