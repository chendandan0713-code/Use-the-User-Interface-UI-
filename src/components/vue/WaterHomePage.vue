<template>
  <div class="flex-1 h-full overflow-y-auto bg-slate-100/80 p-3 sm:p-4 text-slate-800 flex flex-col gap-3.5 custom-scrollbar select-none">
    <!-- Top 4 Metrics Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <div class="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <div class="text-[11px] text-slate-500 font-medium">年度取水审批总量</div>
          <div class="text-xl font-bold font-mono text-slate-900 mt-1">
            12.85 <span class="text-xs font-normal text-slate-500">亿m³</span>
          </div>
          <div class="text-[10px] text-emerald-600 mt-1 flex items-center gap-1">
            <span>↑ 较去年同期定额平衡</span>
          </div>
        </div>
        <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
          </svg>
        </div>
      </div>

      <div class="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <div class="text-[11px] text-slate-500 font-medium">当前累计已用水量</div>
          <div class="text-xl font-bold font-mono text-blue-600 mt-1">
            8.42 <span class="text-xs font-normal text-slate-500">亿m³</span>
          </div>
          <div class="text-[10px] text-blue-500 mt-1">
            配额使用率 <strong class="font-mono">65.5%</strong>
          </div>
        </div>
        <div class="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
          </svg>
        </div>
      </div>

      <div class="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <div class="text-[11px] text-slate-500 font-medium">计量设施在线率</div>
          <div class="text-xl font-bold font-mono text-emerald-600 mt-1">
            98.38 <span class="text-xs font-normal text-slate-500">%</span>
          </div>
          <div class="text-[10px] text-slate-400 mt-1">
            正常 206 处 · 故障 4 处
          </div>
        </div>
        <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
      </div>

      <div class="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <div class="text-[11px] text-slate-500 font-medium">风控预警与工单</div>
          <div class="text-xl font-bold font-mono text-amber-600 mt-1">
            12 <span class="text-xs font-normal text-slate-500">件待办</span>
          </div>
          <div class="text-[10px] text-amber-600 mt-1 flex items-center gap-1">
            <span>超计划 2 件 · 离线 4 件</span>
          </div>
        </div>
        <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
      </div>
    </div>

    <!-- Main Section: GIS Hard Border Map & Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-3.5 flex-1 min-h-0">
      
      <!-- Left Column (span 8): GIS Hard Border Map -->
      <div class="lg:col-span-8 bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col min-h-[460px]">
        <!-- Map header -->
        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-blue-600"></div>
            <span class="text-xs font-bold text-slate-800">西宁市行政区划水资源审批余量分布</span>
            <span class="text-[10px] px-1.5 py-0.2 rounded bg-blue-50 text-blue-600 border border-blue-200 font-medium">
              GIS测绘真实折线硬边界
            </span>
          </div>

          <!-- Region level switcher -->
          <div class="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            <button
              type="button"
              @click="mapScope = 'xining'"
              :class="[
                'px-2.5 py-1 rounded-md font-semibold transition cursor-pointer',
                mapScope === 'xining' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              ]"
            >
              西宁市 (7区县)
            </button>
            <button
              type="button"
              @click="mapScope = 'qinghai'"
              :class="[
                'px-2.5 py-1 rounded-md font-semibold transition cursor-pointer',
                mapScope === 'qinghai' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              ]"
            >
              青海省全域
            </button>
          </div>
        </div>

        <!-- SVG Map Canvas -->
        <div class="flex-1 relative bg-gradient-to-b from-slate-900 via-[#0d2238] to-[#071626] rounded-xl overflow-hidden mt-3 border border-slate-800/80 flex items-center justify-center">
          
          <!-- Background Grid Lines -->
          <div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

          <!-- Compass -->
          <div class="absolute top-3 left-3 z-10 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-white text-[10px] flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>北 N · 坐标系 WGS-84 / 测绘边界</span>
          </div>

          <!-- Hover District Tooltip Card -->
          <div
            v-if="hoveredDistrict"
            class="absolute bottom-3 left-3 z-10 bg-slate-900/90 backdrop-blur-md p-3 rounded-lg border border-cyan-400/40 text-white shadow-xl max-w-xs"
          >
            <div class="flex items-center justify-between gap-3">
              <span class="font-bold text-cyan-300 text-xs">{{ hoveredDistrict.name }}</span>
              <span class="text-[10px] px-1 rounded bg-blue-500/30 text-blue-200">
                许可证: {{ hoveredDistrict.permits }} 本
              </span>
            </div>
            <div class="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-white/10 text-[11px]">
              <div>
                <span class="text-slate-400">审批余量:</span>
                <span class="font-bold text-emerald-400 font-mono ml-1">{{ hoveredDistrict.margin }} 万m³</span>
              </div>
              <div>
                <span class="text-slate-400">水质合规:</span>
                <span class="font-bold text-white font-mono ml-1">{{ hoveredDistrict.waterQuality }}</span>
              </div>
            </div>
          </div>

          <!-- SVG Polygon Boundaries (Xining 7 Districts) -->
          <svg viewBox="0 0 800 520" class="w-full h-full max-h-[440px] select-none p-4">
            <defs>
              <filter id="glow-hard" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0284c7" flood-opacity="0.3" />
              </filter>
            </defs>

            <!-- Datong County (North) -->
            <polygon
              points="280,40 480,30 570,90 530,170 410,180 340,150 260,110"
              :fill="hoveredDistrict?.name === '大通县' ? '#0284c7' : '#0c4a6e'"
              stroke="#ffffff"
              stroke-width="1.8"
              stroke-linejoin="bevel"
              class="transition-all duration-200 cursor-pointer opacity-90 hover:opacity-100"
              @mouseenter="hoveredDistrict = districtInfo['datong']"
              @mouseleave="hoveredDistrict = null"
              @click="$emit('select-district', '大通县')"
            />
            <text x="420" y="105" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle" pointer-events="none">
              大通回族土族自治县 (余量 8.42万m³)
            </text>

            <!-- Huangyuan County (West) -->
            <polygon
              points="110,130 260,110 340,150 310,240 210,290 120,240 80,180"
              :fill="hoveredDistrict?.name === '湟源县' ? '#0284c7' : '#0369a1'"
              stroke="#ffffff"
              stroke-width="1.8"
              stroke-linejoin="bevel"
              class="transition-all duration-200 cursor-pointer opacity-90 hover:opacity-100"
              @mouseenter="hoveredDistrict = districtInfo['huangyuan']"
              @mouseleave="hoveredDistrict = null"
              @click="$emit('select-district', '湟源县')"
            />
            <text x="200" y="205" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle" pointer-events="none">
              湟源县 (余量 6.15万m³)
            </text>

            <!-- Huangzhong District (South ring) -->
            <polygon
              points="310,240 430,220 540,240 610,340 510,460 360,450 240,370 210,290"
              :fill="hoveredDistrict?.name === '湟中区' ? '#0284c7' : '#075985'"
              stroke="#ffffff"
              stroke-width="1.8"
              stroke-linejoin="bevel"
              class="transition-all duration-200 cursor-pointer opacity-90 hover:opacity-100"
              @mouseenter="hoveredDistrict = districtInfo['huangzhong']"
              @mouseleave="hoveredDistrict = null"
              @click="$emit('select-district', '湟中区')"
            />
            <text x="430" y="360" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle" pointer-events="none">
              湟中区 (余量 4.58万m³)
            </text>

            <!-- Urban Core Valley: Chengbei, Chengxi, Chengzhong, Chengdong -->
            <!-- Chengbei -->
            <polygon
              points="340,150 430,170 410,220 310,200"
              :fill="hoveredDistrict?.name === '城北区' ? '#38bdf8' : '#0284c7'"
              stroke="#ffffff"
              stroke-width="1.8"
              stroke-linejoin="bevel"
              class="transition-all duration-200 cursor-pointer opacity-95 hover:opacity-100"
              @mouseenter="hoveredDistrict = districtInfo['chengbei']"
              @mouseleave="hoveredDistrict = null"
              @click="$emit('select-district', '城北区')"
            />
            <text x="375" y="190" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle" pointer-events="none">
              城北区
            </text>

            <!-- Chengxi -->
            <polygon
              points="310,200 410,220 400,260 310,240"
              :fill="hoveredDistrict?.name === '城西区' ? '#38bdf8' : '#0369a1'"
              stroke="#ffffff"
              stroke-width="1.8"
              stroke-linejoin="bevel"
              class="transition-all duration-200 cursor-pointer opacity-95 hover:opacity-100"
              @mouseenter="hoveredDistrict = districtInfo['chengxi']"
              @mouseleave="hoveredDistrict = null"
              @click="$emit('select-district', '城西区')"
            />
            <text x="360" y="240" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle" pointer-events="none">
              城西区
            </text>

            <!-- Chengzhong -->
            <polygon
              points="410,220 460,220 460,265 400,260"
              :fill="hoveredDistrict?.name === '城中区' ? '#38bdf8' : '#0284c7'"
              stroke="#ffffff"
              stroke-width="1.8"
              stroke-linejoin="bevel"
              class="transition-all duration-200 cursor-pointer opacity-95 hover:opacity-100"
              @mouseenter="hoveredDistrict = districtInfo['chengzhong']"
              @mouseleave="hoveredDistrict = null"
              @click="$emit('select-district', '城中区')"
            />
            <text x="435" y="245" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle" pointer-events="none">
              城中区
            </text>

            <!-- Chengdong -->
            <polygon
              points="460,220 540,240 520,290 460,265"
              :fill="hoveredDistrict?.name === '城东区' ? '#38bdf8' : '#0369a1'"
              stroke="#ffffff"
              stroke-width="1.8"
              stroke-linejoin="bevel"
              class="transition-all duration-200 cursor-pointer opacity-95 hover:opacity-100"
              @mouseenter="hoveredDistrict = districtInfo['chengdong']"
              @mouseleave="hoveredDistrict = null"
              @click="$emit('select-district', '城东区')"
            />
            <text x="495" y="260" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle" pointer-events="none">
              城东区
            </text>
          </svg>
        </div>
      </div>

      <!-- Right Column (span 4): Quota Bar Chart & Fast Navigation -->
      <div class="lg:col-span-4 flex flex-col gap-3.5">
        
        <!-- District Quota Ranking -->
        <div class="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col">
          <div class="flex items-center justify-between pb-2 border-b border-slate-100">
            <span class="text-xs font-bold text-slate-800">各区县审批余量阶梯排行</span>
            <span class="text-[10px] text-slate-400">单位: 万m³</span>
          </div>

          <div class="space-y-2.5 mt-3">
            <div v-for="item in quotaList" :key="item.name" class="text-xs">
              <div class="flex items-center justify-between mb-1">
                <span class="font-medium text-slate-700">{{ item.name }}</span>
                <span class="font-mono font-bold text-blue-600">{{ item.value }}</span>
              </div>
              <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
                  :style="{ width: `${(item.value / 10) * 100}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick actions -->
        <div class="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex-1 flex flex-col justify-between">
          <div>
            <div class="text-xs font-bold text-slate-800 mb-2.5">快捷监管调度</div>
            <div class="grid grid-cols-2 gap-2">
              <button
                type="button"
                @click="$emit('navigate', 'facility_management')"
                class="p-2.5 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-left transition cursor-pointer"
              >
                <div class="text-xs font-bold text-slate-800">计量设施台账</div>
                <div class="text-[10px] text-slate-400 mt-0.5">210处设施监测</div>
              </button>

              <button
                type="button"
                @click="$emit('navigate', 'fault')"
                class="p-2.5 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-left transition cursor-pointer"
              >
                <div class="text-xs font-bold text-slate-800">故障报修处置</div>
                <div class="text-[10px] text-slate-400 mt-0.5">12件流程流转</div>
              </button>
            </div>
          </div>

          <!-- Bottom Notice -->
          <div class="mt-3 p-2.5 rounded-lg bg-blue-50/70 border border-blue-100 text-[11px] text-blue-800 flex items-center gap-2">
            <svg class="w-4 h-4 text-blue-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <span>西宁水政遥测采集频次已调优至每 15 分钟一次。</span>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineEmits<{
  (e: 'navigate', menu: string): void;
  (e: 'select-district', district: string): void;
}>();

const mapScope = ref<'xining' | 'qinghai'>('xining');

interface DistrictDetail {
  name: string;
  margin: number;
  permits: number;
  waterQuality: string;
}

const districtInfo: Record<string, DistrictDetail> = {
  datong: { name: '大通县', margin: 8.42, permits: 14, waterQuality: 'Ⅰ类地表水' },
  huangyuan: { name: '湟源县', margin: 6.15, permits: 8, waterQuality: 'Ⅱ类地表水' },
  huangzhong: { name: '湟中区', margin: 4.58, permits: 28, waterQuality: 'Ⅱ类地表水' },
  chengbei: { name: '城北区', margin: 3.82, permits: 45, waterQuality: 'Ⅲ类地下水' },
  chengxi: { name: '城西区', margin: 2.94, permits: 35, waterQuality: 'Ⅱ类地表水' },
  chengzhong: { name: '城中区', margin: 2.15, permits: 42, waterQuality: 'Ⅲ类地下水' },
  chengdong: { name: '城东区', margin: 1.88, permits: 38, waterQuality: 'Ⅱ类地表水' },
};

const hoveredDistrict = ref<DistrictDetail | null>(null);

const quotaList = [
  { name: '大通县', value: 8.42 },
  { name: '湟源县', value: 6.15 },
  { name: '湟中区', value: 4.58 },
  { name: '城北区', value: 3.82 },
  { name: '城西区', value: 2.94 },
  { name: '城中区', value: 2.15 },
  { name: '城东区', value: 1.88 },
];
</script>
