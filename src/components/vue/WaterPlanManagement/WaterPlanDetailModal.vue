<template>
  <div
    v-if="visible && record"
    class="fixed inset-0 z-60 flex items-center justify-center bg-black/45 p-4 backdrop-blur-2xs select-none"
    @click.self="handleClose"
  >
    <div
      class="bg-white rounded-xl shadow-2xl border border-slate-200/90 w-full max-w-[1120px] my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]"
    >
      <!-- 1. 顶部浅色标题栏 -->
      <div class="px-6 py-3.5 bg-[#f8fafc] border-b border-slate-200/80 flex items-center justify-between shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1677ff] shadow-2xs">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-[15px] font-semibold text-slate-800 tracking-wide">用水计划申报与审批详情</h3>
              <span
                class="px-2 py-0.5 rounded text-[11px] font-medium border"
                :class="[
                  record.status === '审核通过'
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                    : record.status === '审核驳回'
                    ? 'bg-rose-50 text-rose-600 border-rose-200'
                    : 'bg-blue-50 text-blue-600 border-blue-200'
                ]"
              >
                {{ record.status }}
              </span>
              <span class="px-2 py-0.5 rounded text-[11px] font-mono bg-purple-50 text-purple-600 border border-purple-200">
                {{ record.itemType }}
              </span>
              <span class="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 text-slate-600 border border-slate-200">
                {{ record.year }}年度
              </span>
            </div>
            <p class="text-[11px] text-slate-400 font-mono mt-0.5">
              单位名称: {{ record.unitName }} · 统一信用代码: {{ record.creditCode }} · 行政区划: {{ record.city }} · {{ record.district }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button
            type="button"
            @click="handlePrint"
            class="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
          >
            <svg class="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            <span>打印核定通知书</span>
          </button>

          <button
            type="button"
            @click="handleClose"
            class="text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition cursor-pointer p-1.5 rounded-lg -mr-1"
            title="关闭"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <!-- 2. Tab 切换栏 -->
      <div class="bg-white border-b border-slate-200/90 px-6 flex items-center gap-3 overflow-x-auto no-scrollbar shrink-0 select-none">
        <button
          type="button"
          @click="activeTab = 'info'"
          class="py-3 px-2.5 text-xs font-medium border-b-2 transition-all cursor-pointer flex items-center gap-1.5"
          :class="activeTab === 'info' ? 'border-[#1677ff] text-[#1677ff] font-semibold' : 'border-transparent text-slate-600 hover:text-slate-900'"
        >
          <span>基本信息与配额核对</span>
        </button>
        <button
          type="button"
          @click="activeTab = 'audit'"
          class="py-3 px-2.5 text-xs font-medium border-b-2 transition-all cursor-pointer flex items-center gap-1.5"
          :class="activeTab === 'audit' ? 'border-[#1677ff] text-[#1677ff] font-semibold' : 'border-transparent text-slate-600 hover:text-slate-900'"
        >
          <span>全流程审批履历</span>
          <span class="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-100 text-slate-600 font-mono">
            {{ (record.auditHistory || []).length }}
          </span>
        </button>
        <button
          type="button"
          @click="activeTab = 'document'"
          class="py-3 px-2.5 text-xs font-medium border-b-2 transition-all cursor-pointer flex items-center gap-1.5"
          :class="activeTab === 'document' ? 'border-[#1677ff] text-[#1677ff] font-semibold' : 'border-transparent text-slate-600 hover:text-slate-900'"
        >
          <span>计划用水核定书（凭证）</span>
        </button>
      </div>

      <!-- 3. 内容滚动区 -->
      <div class="p-6 overflow-y-auto space-y-5 text-xs text-slate-800 custom-scrollbar flex-1 bg-[#f8fafc]/50">
        
        <!-- Tab 1: 基本信息与配额核对 -->
        <div v-if="activeTab === 'info'" class="space-y-4 animate-in fade-in duration-150">
          <!-- 卡片 1.1: 基础登记参数 -->
          <div class="bg-white rounded-lg border border-slate-200/80 p-5 shadow-2xs space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2">
                <span class="w-1 h-3.5 bg-[#1677ff] rounded-full"></span>
                <span class="text-[14px] font-bold text-slate-800">申报单位及取水基本信息</span>
              </div>
              <span class="text-[11px] text-slate-400 font-mono">
                档案状态：<strong class="text-emerald-600 font-medium">指标档案完备</strong>
              </span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3.5 text-[12.5px]">
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">用水单位全称</span>
                <span class="text-slate-800 font-medium leading-relaxed truncate" :title="record.unitName">{{ record.unitName }}</span>
              </div>
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">统一社会信用代码</span>
                <span class="text-slate-800 font-mono font-medium">{{ record.creditCode }}</span>
              </div>
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">所属行政区划</span>
                <span class="text-slate-800 font-medium">{{ record.city }} · {{ record.district }}</span>
              </div>

              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">行业类型</span>
                <span class="text-slate-800 font-medium">{{ record.industryType }}</span>
              </div>
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">取水类型</span>
                <span class="text-slate-800 font-medium">{{ record.waterIntakeType }}</span>
              </div>
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">直管类型</span>
                <span class="text-slate-800 font-medium">{{ record.directManageType }}</span>
              </div>

              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">是否自备水源取水</span>
                <span :class="record.isSelfWaterSource === '是' ? 'text-emerald-600 font-semibold' : 'text-slate-600'">
                  {{ record.isSelfWaterSource === '是' ? '是（自备井取水）' : '否' }}
                </span>
              </div>
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">公共管网取水</span>
                <span class="text-slate-800 font-medium">{{ record.isPublicPipeNetwork }}</span>
              </div>
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">是否规上企业</span>
                <span :class="record.isAboveDesignatedSize === '是' ? 'text-amber-600 font-semibold' : 'text-slate-500'">
                  {{ record.isAboveDesignatedSize === '是' ? '是（规上工业）' : '否' }}
                </span>
              </div>

              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">重点监督类型</span>
                <span class="text-slate-800 font-medium">{{ record.keyType }}</span>
              </div>
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">取水许可证编号</span>
                <span class="text-slate-800 font-mono font-medium">{{ record.permitNumber || '取水（青宁）字[2025]第0012号' }}</span>
              </div>
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">上级主管部门</span>
                <span class="text-slate-800 font-medium">{{ record.supervisorUnit || '西宁市水务局' }}</span>
              </div>
            </div>
          </div>

          <!-- 卡片 1.2: 水量指标申报与核定批复对照 -->
          <div class="bg-white rounded-lg border border-slate-200/80 p-5 shadow-2xs space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2">
                <span class="w-1 h-3.5 bg-emerald-500 rounded-full"></span>
                <span class="text-[14px] font-bold text-slate-800">水量指标申报与核定批复对照 (万m³)</span>
              </div>
              <span class="text-xs font-bold text-[#1677ff]">计量单位: 万m³</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div class="p-3.5 bg-[#f8fafc] rounded-lg border border-slate-200">
                <span class="text-slate-400 block mb-1">取水许可证年度许可额度</span>
                <div class="text-xl font-bold font-mono text-slate-800">
                  {{ record.permitVolume.toFixed(2) }} <span class="text-xs font-normal text-slate-500">万m³</span>
                </div>
                <span class="text-[11px] text-slate-400 mt-1 block">取水许可红线刚性控制值</span>
              </div>

              <div class="p-3.5 bg-blue-50/40 rounded-lg border border-blue-200">
                <span class="text-blue-600 font-medium block mb-1">企业申请填报计划水量</span>
                <div class="text-xl font-bold font-mono text-[#1677ff]">
                  {{ record.planVolume.toFixed(2) }} <span class="text-xs font-normal text-slate-500">万m³</span>
                </div>
                <span class="text-[11px] text-blue-500 mt-1 block">申请时间：{{ record.applyDate || '2025-01-15' }}</span>
              </div>

              <div class="p-3.5 bg-emerald-50/40 rounded-lg border border-emerald-200">
                <span class="text-emerald-700 font-medium block mb-1">最终核定批复计划总量</span>
                <div class="text-xl font-bold font-mono text-emerald-600">
                  {{ (record.approvedVolume || record.planVolume).toFixed(2) }} <span class="text-xs font-normal text-slate-500">万m³</span>
                </div>
                <span class="text-[11px] text-emerald-600 mt-1 block">
                  {{ record.status === '审核通过' ? '已正式批准下达' : '待最终审核批复' }}
                </span>
              </div>
            </div>

            <!-- 明细表格 -->
            <table class="w-full text-xs text-left border-collapse border border-slate-200">
              <thead class="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr class="divide-x divide-slate-200">
                  <th class="px-3 py-2">水源构成</th>
                  <th class="px-3 py-2 text-right font-mono">申报水量 (万m³)</th>
                  <th class="px-3 py-2 text-right font-mono">核定水量 (万m³)</th>
                  <th class="px-3 py-2">水源调配与节水评价分析</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-slate-700">
                <tr class="divide-x divide-slate-100">
                  <td class="px-3 py-2 font-medium text-slate-800">常规地表水</td>
                  <td class="px-3 py-2 text-right font-mono">{{ record.surfaceWater.toFixed(2) }}</td>
                  <td class="px-3 py-2 text-right font-mono text-emerald-700 font-semibold">{{ (record.approvedSurfaceWater || record.surfaceWater).toFixed(2) }}</td>
                  <td class="px-3 py-2 text-slate-600">按西宁市湟水河流域地表水取水指标配额下达</td>
                </tr>
                <tr class="divide-x divide-slate-100">
                  <td class="px-3 py-2 font-medium text-slate-800">承压地下水</td>
                  <td class="px-3 py-2 text-right font-mono">{{ record.groundwater.toFixed(2) }}</td>
                  <td class="px-3 py-2 text-right font-mono text-emerald-700 font-semibold">{{ (record.approvedGroundwater || record.groundwater).toFixed(2) }}</td>
                  <td class="px-3 py-2 text-slate-600">严格落实超采区地下水压采减量方案</td>
                </tr>
                <tr class="divide-x divide-slate-100 bg-slate-50/40">
                  <td class="px-3 py-2 font-medium text-emerald-700">非常规水总计</td>
                  <td class="px-3 py-2 text-right font-mono font-medium text-emerald-700">{{ record.unconventionalTotal.toFixed(2) }}</td>
                  <td class="px-3 py-2 text-right font-mono font-semibold text-emerald-700">{{ (record.approvedUnconventionalWater || record.unconventionalTotal).toFixed(2) }}</td>
                  <td class="px-3 py-2 text-emerald-600">包含中水利用、矿坑疏干水及雨水循环</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Tab 2: 全流程审批履历 -->
        <div v-else-if="activeTab === 'audit'" class="space-y-4 animate-in fade-in duration-150">
          <div class="bg-white rounded-lg border border-slate-200/80 p-5 shadow-2xs space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2">
                <span class="w-1 h-3.5 bg-blue-600 rounded-full"></span>
                <span class="text-[14px] font-bold text-slate-800">审批流程轨迹跟踪</span>
              </div>
              <span class="text-[11px] text-slate-400">数字政务电子签章已备案</span>
            </div>

            <div class="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-100">
              <div
                v-for="(item, idx) in record.auditHistory || []"
                :key="idx"
                class="relative flex flex-col gap-1 text-xs"
              >
                <div
                  class="absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full border-2 bg-white flex items-center justify-center"
                  :class="item.status === 'passed' ? 'border-emerald-500 text-emerald-500' : item.status === 'rejected' ? 'border-rose-500 text-rose-500' : 'border-blue-500 text-blue-500'"
                >
                  <div class="w-1.5 h-1.5 rounded-full" :class="item.status === 'passed' ? 'bg-emerald-500' : item.status === 'rejected' ? 'bg-rose-500' : 'bg-blue-500'"></div>
                </div>
                <div class="flex items-center gap-2">
                  <span class="font-bold text-slate-800 text-[13px]">{{ item.stepName }}</span>
                  <span class="text-slate-400 font-mono text-[11px]">{{ item.time }}</span>
                  <span
                    class="px-2 py-0.5 rounded text-[10.5px] font-medium"
                    :class="item.status === 'passed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : item.status === 'rejected' ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-blue-50 text-blue-600 border border-blue-200'"
                  >
                    {{ item.action }}
                  </span>
                </div>
                <div class="text-slate-700 text-xs leading-relaxed bg-[#f8fafc] p-3 rounded-lg border border-slate-200/80 space-y-1 mt-1">
                  <div class="flex items-center justify-between text-slate-500 text-[11px]">
                    <span>办理人：{{ item.operator }}</span>
                    <span>所属部门：{{ item.department }}</span>
                  </div>
                  <p class="text-slate-800 font-medium">{{ item.opinion }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab 3: 计划用水核定告知书凭证 (模版) -->
        <div v-else-if="activeTab === 'document'" class="space-y-4 animate-in fade-in duration-150">
          <div class="bg-white rounded-lg border border-slate-200/90 p-8 shadow-sm max-w-[800px] mx-auto text-slate-800 space-y-6 relative overflow-hidden">
            <!-- 红色官方公章水印模拟 -->
            <div class="absolute right-12 bottom-16 pointer-events-none opacity-85 select-none rotate-[-12deg]">
              <div class="w-32 h-32 rounded-full border-4 border-rose-600 flex flex-col items-center justify-center text-rose-600 text-[11px] font-bold p-2 text-center tracking-tight shadow-xs">
                <span>★</span>
                <span>西宁市水务局</span>
                <span class="text-[9px] font-normal">水资源管理专用章</span>
                <span class="text-[8px] font-mono mt-0.5">63010002891</span>
              </div>
            </div>

            <!-- 公文头 -->
            <div class="text-center space-y-1.5 border-b-2 border-rose-600 pb-4">
              <h2 class="text-xl font-bold tracking-widest text-rose-700 font-serif">西宁市水资源管理委员会办公室文件</h2>
              <div class="text-xs text-slate-500 font-mono">宁水资计〔{{ record.year }}〕第 0428 号</div>
            </div>

            <!-- 正文 -->
            <div class="space-y-3.5 text-xs leading-relaxed text-slate-800">
              <p class="font-bold text-sm">【{{ record.unitName }}】：</p>
              <p class="indent-6">
                贵单位报送的《{{ record.year }}年度计划用水申请表》（信用代码：{{ record.creditCode }}）收悉。
                依据《青海省节约用水条例》及《西宁市计划用水管理实施细则》，经组织专家与水行政主管部门严格核实，
                现核定下达贵单位 {{ record.year }} 年度用水计划指标如下：
              </p>

              <div class="bg-[#f8fafc] p-4 rounded border border-slate-200 space-y-2 my-2 font-mono text-[11.5px]">
                <div class="flex justify-between">
                  <span class="text-slate-500">一、年度计划总用水量：</span>
                  <strong class="text-slate-900 text-sm">{{ (record.approvedVolume || record.planVolume).toFixed(2) }} 万立方米 (万m³)</strong>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-500">二、其中常规地表水取水指标：</span>
                  <span>{{ (record.approvedSurfaceWater || record.surfaceWater).toFixed(2) }} 万m³</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-500">三、其中承压地下水取水指标：</span>
                  <span>{{ (record.approvedGroundwater || record.groundwater).toFixed(2) }} 万m³</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-500">四、非常规水（中水/雨水等）配置指标：</span>
                  <span class="text-emerald-700">{{ (record.approvedUnconventionalWater || record.unconventionalTotal).toFixed(2) }} 万m³</span>
                </div>
              </div>

              <p class="indent-6">
                请贵单位严格按照批复的计划指标组织生产用水，健全内部用水台账，按期报送计量抄表数据。
                超计划、超定额取用水将严格按照《城镇供水价格管理办法》累进加价征收水资源费（税）。
              </p>
            </div>

            <!-- 落款 -->
            <div class="pt-8 text-right space-y-1 text-xs">
              <div class="font-bold text-slate-800">西宁市水务局（代章）</div>
              <div class="text-slate-500 font-mono">{{ record.auditDate || record.applyDate || '2025年02月15日' }}</div>
            </div>
          </div>
        </div>

      </div>

      <!-- 4. 底部关闭按钮 -->
      <div class="px-6 py-3 bg-white border-t border-slate-200/90 flex items-center justify-end shrink-0">
        <button
          type="button"
          @click="handleClose"
          class="px-5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer text-xs font-medium"
        >
          关闭
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { WaterPlanRecord } from '../../../types';

const props = defineProps<{
  visible: boolean;
  record: WaterPlanRecord | null;
}>();

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void;
}>();

const activeTab = ref<'info' | 'audit' | 'document'>('info');

const handleClose = () => {
  emit('update:visible', false);
};

const handlePrint = () => {
  activeTab.value = 'document';
  setTimeout(() => {
    window.print();
  }, 200);
};
</script>
