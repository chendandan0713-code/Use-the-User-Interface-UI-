<template>
  <div class="bg-white rounded-xl border border-slate-200/80 p-3 shadow-2xs shrink-0 flex flex-col gap-2.5">
    <!-- Row 1: Function View Tabs & Role Switcher Banner (体现县级、市级、省级同一后台登录流转) -->
    <div class="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100">
      <!-- Left: View Mode Navigation (按月填报核算流转 vs 当年本行政区划数据大盘 vs 4大细化核算管理模块) -->
      <div class="flex items-center gap-2">
        <div class="flex flex-wrap items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200 text-xs">
          <!-- Tab 1: 按月核算与任务流转 -->
          <button
            type="button"
            @click="$emit('update:activeTab', 'monthly_accounting')"
            :class="[
              'px-3 py-1 rounded-md font-semibold transition cursor-pointer flex items-center gap-1.5',
              activeTab === 'monthly_accounting'
                ? 'bg-white text-blue-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            ]"
          >
            <svg class="w-3.5 h-3.5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>月度核算与任务流转</span>
            <span v-if="pendingTaskCount && pendingTaskCount > 0" class="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500 text-white font-bold animate-pulse">
              {{ pendingTaskCount }}待办
            </span>
          </button>

          <!-- Tab 2: 当年本行政区划数据大盘 (一年为维度) -->
          <button
            type="button"
            @click="$emit('update:activeTab', 'annual_district')"
            :class="[
              'px-3 py-1 rounded-md font-semibold transition cursor-pointer flex items-center gap-1.5',
              activeTab === 'annual_district'
                ? 'bg-white text-emerald-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            ]"
          >
            <svg class="w-3.5 h-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="20" x2="18" y2="10"></line>
              <line x1="12" y1="20" x2="12" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="14"></line>
            </svg>
            <span>当年行政区划大盘 (年度维度)</span>
          </button>

          <!-- Tab 3: 小型灌区核算管理 (规范) -->
          <button
            type="button"
            @click="$emit('update:activeTab', 'small_irrigation')"
            :class="[
              'px-2.5 py-1 rounded-md font-semibold transition cursor-pointer flex items-center gap-1',
              activeTab === 'small_irrigation'
                ? 'bg-white text-blue-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            ]"
            title="小型灌区核算管理：基础信息、面积比对、定额与直报比对"
          >
            <svg class="w-3.5 h-3.5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
            </svg>
            <span>小型灌区管理</span>
          </button>

          <!-- Tab 4: 畜禽用水核算管理 -->
          <button
            type="button"
            @click="$emit('update:activeTab', 'livestock')"
            :class="[
              'px-2.5 py-1 rounded-md font-semibold transition cursor-pointer flex items-center gap-1',
              activeTab === 'livestock'
                ? 'bg-white text-amber-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            ]"
            title="畜禽用水核算管理：年鉴年末存栏、定额、肉蛋奶平衡"
          >
            <svg class="w-3.5 h-3.5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="9"></circle>
              <path d="M9 10h.01M15 10h.01M9.5 15a3.5 3.5 0 0 0 5 0"></path>
            </svg>
            <span>畜禽用水管理</span>
          </button>

          <!-- Tab 5: 鱼塘用水核算管理 -->
          <button
            type="button"
            @click="$emit('update:activeTab', 'fishpond')"
            :class="[
              'px-2.5 py-1 rounded-md font-semibold transition cursor-pointer flex items-center gap-1',
              activeTab === 'fishpond'
                ? 'bg-white text-cyan-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            ]"
            title="鱼塘用水核算管理：有效水面、补水定额、水产品产量平衡"
          >
            <svg class="w-3.5 h-3.5 text-cyan-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M2 12h20M2 12c4-6 16-6 20 0M2 12c4 6 16 6 20 0"></path>
            </svg>
            <span>鱼塘用水管理</span>
          </button>

          <!-- Tab 6: 建筑业用水核算管理 -->
          <button
            type="button"
            @click="$emit('update:activeTab', 'construction')"
            :class="[
              'px-2.5 py-1 rounded-md font-semibold transition cursor-pointer flex items-center gap-1',
              activeTab === 'construction'
                ? 'bg-white text-indigo-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            ]"
            title="建筑业用水核算管理：施工面积、竣工定额、增加值比对"
          >
            <svg class="w-3.5 h-3.5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4"></path>
            </svg>
            <span>建筑业用水管理</span>
          </button>

          <!-- Tab 7: 证照水量填报与审核 (县级填报·市级审核·年度数据支撑) -->
          <button
            type="button"
            @click="$emit('update:activeTab', 'water_reporting')"
            :class="[
              'px-2.5 py-1 rounded-md font-bold transition cursor-pointer flex items-center gap-1',
              activeTab === 'water_reporting'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-blue-700 bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200/60'
            ]"
            title="水量填报与审核：由县级以证照维度按月填报，市级审核入库，用于每年年度汇总数据支撑，市县一体化复用"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
            </svg>
            <span>水量填报(证照月报·年度支撑)</span>
            <span class="px-1 py-0.2 rounded text-[9.5px] bg-amber-400 text-slate-900 font-bold">
              新
            </span>
          </button>
        </div>

        <div class="hidden xl:flex items-center gap-1.5 text-[11px] text-slate-500">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>统一后台登录：{{ currentRoleLabel }}</span>
        </div>
      </div>

      <!-- Right: Role Switcher Segmented Buttons (县级、市级、省级同一后台登录流转) -->
      <div class="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200/80 text-xs">
        <span class="text-[11px] text-slate-400 px-1.5 font-medium hidden md:inline">登录角色切换：</span>
        
        <!-- 县级填报单位 -->
        <button
          type="button"
          @click="$emit('update:role', 'county')"
          :class="[
            'px-2.5 py-1 rounded-md font-medium transition cursor-pointer flex items-center gap-1 text-[11.5px]',
            currentRole === 'county'
              ? 'bg-white text-blue-700 shadow-2xs font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
          ]"
          title="县级水务局：负责按月录入和上报小型灌区农业用水量"
        >
          <svg class="w-3.5 h-3.5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          <span>县级填报端</span>
          <span v-if="draftCount > 0" class="ml-0.5 px-1 py-0.2 rounded-full text-[10px] bg-slate-200 text-slate-700">
            {{ draftCount }}草稿
          </span>
        </button>

        <!-- 市级审核部门 -->
        <button
          type="button"
          @click="$emit('update:role', 'city')"
          :class="[
            'px-2.5 py-1 rounded-md font-medium transition cursor-pointer flex items-center gap-1 text-[11.5px]',
            currentRole === 'city'
              ? 'bg-white text-amber-700 shadow-2xs font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
          ]"
          title="市级水务局：负责对各县区上报的小型灌区核算数据进行初审"
        >
          <svg class="w-3.5 h-3.5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>市级审核端</span>
          <span v-if="pendingCityCount > 0" class="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] bg-amber-100 text-amber-800 font-bold animate-pulse">
            {{ pendingCityCount }}待审
          </span>
        </button>

        <!-- 省级审核部门 -->
        <button
          type="button"
          @click="$emit('update:role', 'province')"
          :class="[
            'px-2.5 py-1 rounded-md font-medium transition cursor-pointer flex items-center gap-1 text-[11.5px]',
            currentRole === 'province'
              ? 'bg-white text-indigo-700 shadow-2xs font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
          ]"
          title="省级水利厅：负责对市级初审通过的核算数据进行终审归档"
        >
          <svg class="w-3.5 h-3.5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
          <span>省级审核端</span>
          <span v-if="pendingProvinceCount > 0" class="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-100 text-indigo-800 font-bold animate-pulse">
            {{ pendingProvinceCount }}待终审
          </span>
        </button>
      </div>
    </div>


    <!-- Row 2: 5 High-Impact Key Metrics -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 text-xs">
      <!-- Card 1: 纳入核算小型灌区证照 -->
      <div class="p-2.5 rounded-lg bg-slate-50/90 border border-slate-200/70 flex items-center justify-between">
        <div>
          <div class="text-[11px] text-slate-500">纳入核算灌区证照</div>
          <div class="text-lg font-bold font-mono text-slate-800 mt-0.5">
            {{ totalLicenses }} <span class="text-xs font-normal text-slate-400">本</span>
          </div>
          <div class="text-[10px] text-blue-600 mt-0.5">以证照维度建档核算</div>
        </div>
        <div class="w-8 h-8 rounded-lg bg-blue-100/70 text-blue-700 flex items-center justify-center shrink-0">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
      </div>

      <!-- Card 2: 累计核算农业用水总量 -->
      <div class="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200/70 flex items-center justify-between">
        <div>
          <div class="text-[11px] text-emerald-800">核算农业用水总量</div>
          <div class="text-lg font-bold font-mono text-emerald-700 mt-0.5">
            {{ totalWaterVolume.toFixed(2) }} <span class="text-xs font-normal text-emerald-600">万m³</span>
          </div>
          <div class="text-[10px] text-emerald-600 mt-0.5">耕/林/园/草/渔/畜 7项小计</div>
        </div>
        <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
        </div>
      </div>

      <!-- Card 3: 其中取用地下水量及占比 -->
      <div class="p-2.5 rounded-lg bg-cyan-50/60 border border-cyan-200/70 flex items-center justify-between">
        <div>
          <div class="text-[11px] text-cyan-800">其中: 取用地下水</div>
          <div class="text-lg font-bold font-mono text-cyan-700 mt-0.5">
            {{ totalGroundwater.toFixed(2) }} <span class="text-xs font-normal text-cyan-600">万m³</span>
          </div>
          <div class="text-[10px] text-cyan-600 mt-0.5">
            占农业用水小计 {{ groundwaterRatio }}%
          </div>
        </div>
        <div class="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        </div>
      </div>

      <!-- Card 4: 待市级审核 -->
      <div class="p-2.5 rounded-lg bg-amber-50/60 border border-amber-200/70 flex items-center justify-between">
        <div>
          <div class="text-[11px] text-amber-800">待市级审核</div>
          <div class="text-lg font-bold font-mono text-amber-700 mt-0.5">
            {{ pendingCityCount }} <span class="text-xs font-normal text-amber-600">单</span>
          </div>
          <div class="text-[10px] text-amber-600 mt-0.5">县级已提交待西宁市审核</div>
        </div>
        <div class="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
      </div>

      <!-- Card 5: 待省级审核 / 已入库 -->
      <div class="p-2.5 rounded-lg bg-indigo-50/60 border border-indigo-200/70 flex items-center justify-between col-span-2 sm:col-span-1">
        <div>
          <div class="text-[11px] text-indigo-800">待省级终审 / 已入库</div>
          <div class="text-lg font-bold font-mono text-indigo-700 mt-0.5">
            {{ pendingProvinceCount }} <span class="text-xs font-normal text-indigo-400">待审</span> / 
            {{ approvedCount }} <span class="text-xs font-normal text-emerald-600">入库</span>
          </div>
          <div class="text-[10px] text-indigo-600 mt-0.5">省厅终审归档闭环</div>
        </div>
        <div class="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { IrrigationRoleLevel } from '../../../types';

const props = defineProps<{
  currentRole: IrrigationRoleLevel;
  activeTab?: 'monthly_accounting' | 'annual_district' | 'small_irrigation' | 'livestock' | 'fishpond' | 'construction' | 'water_reporting';
  totalLicenses: number;
  totalWaterVolume: number;
  totalGroundwater: number;
  pendingCityCount: number;
  pendingProvinceCount: number;
  approvedCount: number;
  draftCount: number;
  pendingTaskCount?: number;
}>();

defineEmits<{
  (e: 'update:role', role: IrrigationRoleLevel): void;
  (e: 'update:activeTab', tab: 'monthly_accounting' | 'annual_district' | 'small_irrigation' | 'livestock' | 'fishpond' | 'construction' | 'water_reporting'): void;
}>();


const currentRoleLabel = computed(() => {
  switch (props.currentRole) {
    case 'county':
      return '县级填报单位（湟中区/湟源县/大通县水务局）';
    case 'city':
      return '市级审核部门（西宁市水务局 水资源管理科）';
    case 'province':
      return '省级审核部门（青海省水利厅 水资源处）';
  }
});

const roleDescription = computed(() => {
  switch (props.currentRole) {
    case 'county':
      return '权限范围：按月填报农业用水量（7项明细+其中地下水），保存草稿、提交市审、修改驳回数据';
    case 'city':
      return '权限范围：对县级上报数据进行初审，核对以电折水与实测依据，审核通过转呈省水利厅或驳回退回';
    case 'province':
      return '权限范围：对市级初审通过的核算数据进行终审，审核通过后正式计入全省农业用水入库台账';
  }
});

const groundwaterRatio = computed(() => {
  if (props.totalWaterVolume <= 0) return '0.0';
  return ((props.totalGroundwater / props.totalWaterVolume) * 100).toFixed(1);
});
</script>
