<template>
  <!-- 模态背景遮罩 -->
  <div
    v-if="visible"
    class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs select-none"
    @click.self="handleClose"
  >
    <!-- 弹窗主卡片 -->
    <div
      class="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
    >
      <!-- 1. 顶部标题栏 -->
      <div class="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-blue-50 text-[#1677ff] flex items-center justify-center font-bold">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-base font-bold text-slate-900 tracking-tight">一户一档完整度诊断评估明细</h3>
              <span
                class="px-2 py-0.5 rounded text-[11px] font-semibold"
                :class="getLevelBadgeClass(scoreData?.level)"
              >
                评级：{{ scoreData?.level }}
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">
              {{ scoreData?.waterOwnerName }} · {{ scoreData?.permitNumber }}
            </p>
          </div>
        </div>

        <button
          type="button"
          @click="handleClose"
          class="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          title="关闭"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- 2. 主体内容区 (滚动) -->
      <div class="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-4 bg-[#f8fafc]">
        <!-- 综合评分总览看板 -->
        <div class="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <!-- 环形总分仪表盘 -->
            <div class="relative w-24 h-24 flex items-center justify-center shrink-0">
              <svg class="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <!-- 轨道 -->
                <path
                  class="text-slate-100"
                  stroke-width="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <!-- 进度 -->
                <path
                  :class="getStrokeColor(scoreData?.level)"
                  stroke-dasharray="100, 100"
                  :stroke-dashoffset="100 - (scoreData?.totalScore || 0)"
                  stroke-width="3.5"
                  stroke-linecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span class="text-2xl font-black font-mono tracking-tight" :class="getTextColor(scoreData?.level)">
                  {{ scoreData?.totalScore }}
                </span>
                <span class="text-[10px] text-slate-400">综合得分</span>
              </div>
            </div>

            <!-- 基本属性清单 -->
            <div class="space-y-1 text-xs">
              <div class="flex items-center gap-2">
                <span class="text-slate-400">统一信用代码：</span>
                <span class="font-mono text-slate-700 font-medium">{{ scoreData?.creditCode }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-slate-400">所属行政辖区：</span>
                <span class="text-slate-800 font-medium">{{ scoreData?.district }}</span>
                <span class="text-slate-300">|</span>
                <span class="text-slate-400">发证机关：</span>
                <span class="text-slate-700">{{ scoreData?.issuingAuthority }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-slate-400">数据源与规模：</span>
                <span class="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 font-medium">
                  {{ scoreData?.dataSourceType }}
                </span>
                <span class="px-1.5 py-0.5 rounded text-[10px] font-medium" :class="scoreData?.aboveDesignatedScale ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-500'">
                  {{ scoreData?.aboveDesignatedScale ? '规模以上' : '规下户' }}
                </span>
                <span class="text-slate-300">|</span>
                <span class="text-slate-400">运行状态：</span>
                <span class="text-emerald-700 font-medium">{{ scoreData?.status }}</span>
              </div>
              <div class="text-[11px] text-slate-400 pt-0.5">
                最近一次核算时间：{{ scoreData?.lastAccountingDate }}
              </div>
            </div>
          </div>

          <!-- 评级标准指引提示 -->
          <div class="bg-blue-50/70 border border-blue-100 rounded-lg p-3 text-xs w-full md:w-64 space-y-1 shrink-0">
            <div class="font-bold text-blue-900 flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              <span>四级评价等级基准</span>
            </div>
            <div class="grid grid-cols-2 gap-1 text-[11px] text-slate-600 pt-1">
              <div><span class="font-bold text-emerald-600">优秀</span>：90 ~ 100 分</div>
              <div><span class="font-bold text-blue-600">良好</span>：80 ~ 89 分</div>
              <div><span class="font-bold text-amber-600">一般</span>：60 ~ 79 分</div>
              <div><span class="font-bold text-rose-600">较差</span>：低于 60 分</div>
            </div>
          </div>
        </div>

        <!-- 五大分项核验进度条明细 -->
        <div class="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-3.5">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <div class="flex items-center gap-2">
              <span class="w-1.5 h-4 bg-[#1677ff] rounded-full"></span>
              <h4 class="text-xs font-bold text-slate-800">一户一档五维考核分项诊断</h4>
            </div>
            <span class="text-[11px] text-slate-400">满分 100 分 · 各项权重清晰可溯</span>
          </div>

          <div class="space-y-3 text-xs">
            <!-- 1. 基础信息规范 (25分) -->
            <div>
              <div class="flex items-center justify-between mb-1">
                <div class="flex items-center gap-1.5 font-medium text-slate-700">
                  <span class="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span>1. 基础信息规范 (统一社会信用代码、法人代表、联系电话、取水地点、经营地址)</span>
                </div>
                <div class="font-mono text-slate-800">
                  <span class="font-bold text-blue-600">{{ scoreData?.basicInfoScore }}</span> / 25 分
                </div>
              </div>
              <div class="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  class="h-full bg-blue-500 transition-all duration-300"
                  :style="{ width: `${((scoreData?.basicInfoScore || 0) / 25) * 100}%` }"
                ></div>
              </div>
            </div>

            <!-- 2. 取水许可凭证规范 (25分) -->
            <div>
              <div class="flex items-center justify-between mb-1">
                <div class="flex items-center gap-1.5 font-medium text-slate-700">
                  <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
                  <span>2. 取水许可凭证规范 (电子证照号、有效期限、发证机关、年许可水量、水源类型合规)</span>
                </div>
                <div class="font-mono text-slate-800">
                  <span class="font-bold text-indigo-600">{{ scoreData?.licenseInfoScore }}</span> / 25 分
                </div>
              </div>
              <div class="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  class="h-full bg-indigo-500 transition-all duration-300"
                  :style="{ width: `${((scoreData?.licenseInfoScore || 0) / 25) * 100}%` }"
                ></div>
              </div>
            </div>

            <!-- 3. 取水口与工程规范 (20分) -->
            <div>
              <div class="flex items-center justify-between mb-1">
                <div class="flex items-center gap-1.5 font-medium text-slate-700">
                  <span class="w-2 h-2 rounded-full bg-teal-500"></span>
                  <span>3. 取水口与工程规范 (水源取水工程建档、取水口具体点位登记、无违规隐患)</span>
                </div>
                <div class="font-mono text-slate-800">
                  <span class="font-bold text-teal-600">{{ scoreData?.engineeringScore }}</span> / 20 分
                </div>
              </div>
              <div class="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  class="h-full bg-teal-500 transition-all duration-300"
                  :style="{ width: `${((scoreData?.engineeringScore || 0) / 20) * 100}%` }"
                ></div>
              </div>
            </div>

            <!-- 4. 计量监测体系规范 (20分) -->
            <div>
              <div class="flex items-center justify-between mb-1">
                <div class="flex items-center gap-1.5 font-medium text-slate-700">
                  <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>4. 计量监测体系规范 (法定计量点设置、实时在线监控传输接入、在线率全量覆盖)</span>
                </div>
                <div class="font-mono text-slate-800">
                  <span class="font-bold text-emerald-600">{{ scoreData?.meteringScore }}</span> / 20 分
                </div>
              </div>
              <div class="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  class="h-full bg-emerald-500 transition-all duration-300"
                  :style="{ width: `${((scoreData?.meteringScore || 0) / 20) * 100}%` }"
                ></div>
              </div>
            </div>

            <!-- 5. 电子资料与档案凭证 (10分) -->
            <div>
              <div class="flex items-center justify-between mb-1">
                <div class="flex items-center gap-1.5 font-medium text-slate-700">
                  <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>5. 电子资料与档案凭证 (电子档案凭证完整性、年度计划/历史水量资料支撑)</span>
                </div>
                <div class="font-mono text-slate-800">
                  <span class="font-bold text-amber-600">{{ scoreData?.materialsScore }}</span> / 10 分
                </div>
              </div>
              <div class="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  class="h-full bg-amber-500 transition-all duration-300"
                  :style="{ width: `${((scoreData?.materialsScore || 0) / 10) * 100}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 缺失薄弱清单与督办建议 -->
        <div class="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-2.5">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <div class="flex items-center gap-2">
              <span class="w-1.5 h-4 bg-amber-500 rounded-full"></span>
              <h4 class="text-xs font-bold text-slate-800">档案缺失薄弱要素与整改指引</h4>
            </div>
            <span class="text-[11px] text-slate-400">
              共检出 <strong class="text-amber-600">{{ scoreData?.missingItems.length || 0 }}</strong> 条待补全项目
            </span>
          </div>

          <div v-if="(scoreData?.missingItems.length || 0) > 0" class="space-y-2">
            <div
              v-for="(item, idx) in scoreData?.missingItems"
              :key="idx"
              class="flex items-start gap-2.5 p-2.5 rounded-lg bg-amber-50/60 border border-amber-200/70 text-xs text-amber-900"
            >
              <div class="w-4 h-4 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                {{ idx + 1 }}
              </div>
              <div class="flex-1">
                <div class="font-medium">{{ item }}</div>
                <div class="text-[11px] text-amber-700/80 mt-0.5">建议操作：前往「一户一档」编辑修改或在计量设施管理模块补录校核数据。</div>
              </div>
              <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-white text-amber-700 border border-amber-300 shrink-0">
                待补正
              </span>
            </div>
          </div>

          <div v-else class="py-6 flex flex-col items-center justify-center text-center text-emerald-600 bg-emerald-50/40 rounded-lg border border-emerald-100">
            <svg class="w-8 h-8 text-emerald-500 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span class="text-xs font-bold">该取水户一户一档各项数据完备规范！</span>
            <span class="text-[11px] text-slate-400 mt-0.5">无任何要素缺失，符合水利部国省两级一户一档标准化验收标准。</span>
          </div>
        </div>
      </div>

      <!-- 3. 底部操作栏 -->
      <div class="px-5 py-3 border-t border-slate-200 flex items-center justify-between bg-white shrink-0">
        <div class="text-xs text-slate-500 flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          <span>核算规则依据水利部取用水监管系统标准算法自动生成</span>
        </div>

        <div class="flex items-center gap-2">
          <button
            type="button"
            @click="handleClose"
            class="px-4 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-medium transition cursor-pointer"
          >
            关闭返回
          </button>
          <button
            type="button"
            @click="handleReEvaluate"
            class="px-4 py-1.5 bg-[#1677ff] hover:bg-blue-600 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M23 4v6h-6"></path>
              <path d="M1 20v-6h6"></path>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
            <span>重新核算此档案</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import type { DossierCompletenessScore, DossierCompletenessLevel } from '../../types';

const props = defineProps<{
  visible: boolean;
  scoreData: DossierCompletenessScore | null;
}>();

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void;
  (e: 'recalculate', id: string): void;
}>();

const handleClose = () => {
  emit('update:visible', false);
};

const handleReEvaluate = () => {
  if (props.scoreData) {
    emit('recalculate', props.scoreData.dossierId);
    MessagePlugin.success(`【${props.scoreData.waterOwnerName}】一户一档已触发在线重新核算`);
  }
};

const getLevelBadgeClass = (level?: DossierCompletenessLevel) => {
  switch (level) {
    case '优秀':
      return 'bg-emerald-100 text-emerald-800 border border-emerald-300';
    case '良好':
      return 'bg-blue-100 text-blue-800 border border-blue-300';
    case '一般':
      return 'bg-amber-100 text-amber-800 border border-amber-300';
    case '较差':
      return 'bg-rose-100 text-rose-800 border border-rose-300';
    default:
      return 'bg-slate-100 text-slate-700';
  }
};

const getTextColor = (level?: DossierCompletenessLevel) => {
  switch (level) {
    case '优秀':
      return 'text-emerald-600';
    case '良好':
      return 'text-blue-600';
    case '一般':
      return 'text-amber-600';
    case '较差':
      return 'text-rose-600';
    default:
      return 'text-slate-700';
  }
};

const getStrokeColor = (level?: DossierCompletenessLevel) => {
  switch (level) {
    case '优秀':
      return 'text-emerald-500';
    case '良好':
      return 'text-blue-500';
    case '一般':
      return 'text-amber-500';
    case '较差':
      return 'text-rose-500';
    default:
      return 'text-slate-400';
  }
};
</script>
