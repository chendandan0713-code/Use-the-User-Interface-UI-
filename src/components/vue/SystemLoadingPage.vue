<template>
  <div
    :class="[
      'flex-1 h-full flex flex-col items-center justify-between p-4 sm:p-6 select-none overflow-y-auto custom-scrollbar transition-colors duration-500 relative',
      currentTheme.bgClass
    ]"
  >
    <!-- Background Ambient Grid -->
    <div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

    <!-- Top Controls Bar -->
    <div class="w-full max-w-4xl flex items-center justify-between z-10 text-xs">
      <div class="flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full animate-ping" :class="currentTheme.accentDot"></span>
        <span class="text-white font-bold tracking-wider">西宁水务监管与智能制造数字孪生系统 · 启动就绪状态</span>
      </div>

      <!-- Theme Switcher & Loop Controls -->
      <div class="flex items-center gap-3 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
        <span class="text-slate-400 text-[11px]">动效主题:</span>
        <button
          v-for="t in themeOptions"
          :key="t.id"
          type="button"
          @click="selectedTheme = t.id"
          :class="[
            'px-2 py-0.5 rounded-md text-[11px] font-semibold transition cursor-pointer',
            selectedTheme === t.id ? 'bg-white/20 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          ]"
        >
          {{ t.label }}
        </button>

        <div class="h-3 w-px bg-white/20"></div>

        <button
          type="button"
          @click="toggleLoop"
          :class="[
            'px-2 py-0.5 rounded-md text-[11px] font-semibold transition cursor-pointer',
            isLooping ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
          ]"
        >
          {{ isLooping ? '循环演示开启' : '单次加载' }}
        </button>
      </div>
    </div>

    <!-- Center: Liquid Wave Core Spherical Loader -->
    <div class="my-auto flex flex-col items-center justify-center relative z-10 py-6">
      
      <!-- Outer HUD Glowing Rings -->
      <div class="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
        
        <!-- Spinning Orbit 1 -->
        <div class="absolute inset-0 rounded-full border border-dashed border-cyan-400/30 animate-[spin_12s_linear_infinite] pointer-events-none"></div>

        <!-- Spinning Orbit 2 (reverse) -->
        <div class="absolute -inset-3 rounded-full border border-dotted border-blue-400/25 animate-[spin_18s_linear_infinite_reverse] pointer-events-none"></div>

        <!-- Outer Radar Ping Pulse -->
        <div class="absolute -inset-6 rounded-full border border-cyan-500/20 animate-ping pointer-events-none opacity-40"></div>

        <!-- Main Circular Vessel (Clip container for liquid waves) -->
        <div class="w-56 h-56 sm:w-60 sm:h-60 rounded-full bg-slate-950/80 border-2 border-cyan-400/60 shadow-[0_0_50px_rgba(6,182,212,0.35)] overflow-hidden relative flex items-center justify-center">
          
          <!-- Liquid SVG Wave 1 -->
          <div
            class="absolute left-0 right-0 bottom-0 transition-all duration-300 pointer-events-none"
            :style="{ height: `${Math.max(10, progress)}%` }"
          >
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" class="w-[200%] h-8 absolute -top-7 left-0 animate-[wave_4s_linear_infinite] opacity-60">
              <path
                d="M0,0 C150,90 350,-40 500,20 C650,80 900,-30 1200,10 L1200,120 L0,120 Z"
                :fill="currentTheme.waveColor1"
              />
            </svg>
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" class="w-[200%] h-8 absolute -top-5 left-[-50%] animate-[wave_6s_linear_infinite_reverse] opacity-80">
              <path
                d="M0,20 C200,-30 400,60 600,10 C800,-40 1000,50 1200,20 L1200,120 L0,120 Z"
                :fill="currentTheme.waveColor2"
              />
            </svg>
            <div class="w-full h-full" :style="{ backgroundColor: currentTheme.waveBase }"></div>
          </div>

          <!-- Central Telemetry Text -->
          <div class="relative z-10 flex flex-col items-center justify-center text-center">
            <span class="text-4xl sm:text-5xl font-black font-mono tracking-tighter text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              {{ Math.round(progress) }}<span class="text-xl font-light text-cyan-300">%</span>
            </span>
            <span class="text-[11px] font-semibold text-cyan-200 tracking-wider uppercase mt-1 drop-shadow-md">
              {{ statusText }}
            </span>
            <span class="text-[9px] font-mono text-cyan-400/80 mt-0.5">
              LATENCY: 14ms · 128-BIT TLS
            </span>
          </div>

        </div>

      </div>

      <!-- Step Pipeline Display -->
      <div class="w-full max-w-xl mt-8 bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-lg">
        <div class="flex items-center justify-between mb-3 text-xs text-slate-300">
          <span class="font-bold text-white flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
            微服务初始化全流程 (5/5)
          </span>
          <span class="font-mono text-cyan-300">{{ activeStepIndex + 1 }} / {{ pipelineSteps.length }}</span>
        </div>

        <div class="space-y-2">
          <div
            v-for="(step, idx) in pipelineSteps"
            :key="step.title"
            :class="[
              'p-2 rounded-lg border transition-all duration-300 flex items-center justify-between text-xs',
              idx < activeStepIndex
                ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
                : idx === activeStepIndex
                ? 'bg-blue-900/60 border-cyan-400 text-white shadow-xs'
                : 'bg-white/5 border-white/5 text-slate-500'
            ]"
          >
            <div class="flex items-center gap-2.5">
              <span
                class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold font-mono"
                :class="idx <= activeStepIndex ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'"
              >
                {{ idx + 1 }}
              </span>
              <span class="font-medium">{{ step.title }}</span>
            </div>
            <span class="text-[11px] font-mono">
              {{ idx < activeStepIndex ? 'DONE 100%' : idx === activeStepIndex ? `${Math.round(progress)}%` : 'WAIT' }}
            </span>
          </div>
        </div>
      </div>

    </div>

    <!-- Bottom Action Buttons -->
    <div class="w-full max-w-md flex items-center justify-center gap-3 z-10 pb-2">
      <t-button theme="default" variant="outline" size="medium" @click="restartProgress">
        <template #icon>
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
          </svg>
        </template>
        重新演示加载动效
      </t-button>

      <t-button theme="primary" size="medium" @click="$emit('navigate', 'home')">
        <template #icon>
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </template>
        进入全域监管首页看板
      </t-button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

defineEmits<{
  (e: 'navigate', menu: string): void;
}>();

const progress = ref(0);
const isLooping = ref(true);
let timer: any = null;

const selectedTheme = ref<'ocean' | 'cyan' | 'emerald'>('ocean');

const themeOptions = [
  { id: 'ocean' as const, label: '深海蓝' },
  { id: 'cyan' as const, label: '科技青' },
  { id: 'emerald' as const, label: '生态绿' },
];

const themes = {
  ocean: {
    bgClass: 'bg-gradient-to-b from-[#0b1b36] via-[#071326] to-[#040a14]',
    accentDot: 'bg-cyan-400',
    waveColor1: '#0284c7',
    waveColor2: '#0369a1',
    waveBase: '#075985',
  },
  cyan: {
    bgClass: 'bg-gradient-to-b from-[#06242b] via-[#04191e] to-[#020d10]',
    accentDot: 'bg-teal-300',
    waveColor1: '#0d9488',
    waveColor2: '#0f766e',
    waveBase: '#115e59',
  },
  emerald: {
    bgClass: 'bg-gradient-to-b from-[#06291a] via-[#041c12] to-[#020e09]',
    accentDot: 'bg-emerald-400',
    waveColor1: '#059669',
    waveColor2: '#047857',
    waveBase: '#065f46',
  },
};

const currentTheme = computed(() => themes[selectedTheme.value]);

const pipelineSteps = [
  { title: '西宁市三维地理与行政边界数据加载', weight: 20 },
  { title: '物联遥测感知终端（4G/NB-IoT）握手同步', weight: 20 },
  { title: '全域取水许可证照与定额模型校核', weight: 20 },
  { title: '智慧水务管网拓扑与水力仿真就绪', weight: 20 },
  { title: '智造生产与业务监管协同引擎挂载', weight: 20 },
];

const activeStepIndex = computed(() => {
  if (progress.value < 20) return 0;
  if (progress.value < 40) return 1;
  if (progress.value < 60) return 2;
  if (progress.value < 80) return 3;
  return 4;
});

const statusText = computed(() => {
  if (progress.value < 25) return '正在加载遥测网...';
  if (progress.value < 55) return '校核全域许可证照...';
  if (progress.value < 85) return '构建管网水动力模型...';
  if (progress.value < 100) return '同步智造协同数据...';
  return '系统加载完毕 · 随时进入';
});

const startProgress = () => {
  if (timer) clearInterval(timer);
  progress.value = 0;
  timer = setInterval(() => {
    if (progress.value < 100) {
      progress.value += 1;
    } else {
      if (isLooping.value) {
        setTimeout(() => {
          progress.value = 0;
        }, 1200);
      } else {
        clearInterval(timer);
      }
    }
  }, 40);
};

const restartProgress = () => {
  startProgress();
};

const toggleLoop = () => {
  isLooping.value = !isLooping.value;
  if (isLooping.value && progress.value >= 100) {
    startProgress();
  }
};

onMounted(() => {
  startProgress();
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped>
@keyframes wave {
  0% { transform: translateX(0); }
  50% { transform: translateX(-25%); }
  100% { transform: translateX(-50%); }
}
</style>
