<template>
  <div class="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 space-y-4 select-none shrink-0 overflow-hidden">
    <!-- 1. Top Pipeline Header & Flow Overview -->
    <div class="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
        </div>
        <div>
          <div class="flex items-center gap-2.5 flex-wrap">
            <h2 class="text-base font-bold text-slate-900 tracking-tight">日水量数据获取至国家平台推送 · 全链路流程流转图</h2>
            <span class="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60 shadow-2xs">
              工业级数据管道拓扑
            </span>
            <span class="px-2 py-0.5 rounded-full text-[10.5px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60 flex items-center gap-1.5 shadow-2xs">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              国家水资源平台专线 (142ms)
            </span>
          </div>
          <p class="text-xs text-slate-500 mt-0.5">
            全景呈现协议归集、接口归集（日频次流水线并轨报送）与人工归集（月频次独立闭环）从底层采集至国家平台完整过程
          </p>
        </div>
      </div>

      <!-- Controls: Animation Switch & Filter Reset -->
      <div class="flex items-center gap-2.5 text-xs">
        <!-- Animation Toggle -->
        <button
          type="button"
          @click="isAnimationEnabled = !isAnimationEnabled"
          class="px-2.5 py-1 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
          :class="isAnimationEnabled ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-slate-100 border-slate-200 text-slate-500'"
          title="切换水流/报文传输管线动画"
        >
          <span class="w-2 h-2 rounded-full" :class="isAnimationEnabled ? 'bg-indigo-500 animate-ping' : 'bg-slate-400'"></span>
          <span>{{ isAnimationEnabled ? '流转动画: 开启' : '流转动画: 暂停' }}</span>
        </button>

        <!-- Current Filter Feedback -->
        <div v-if="activeFilterLabel" class="flex items-center gap-1.5 bg-blue-50 text-blue-800 px-3 py-1 rounded-lg border border-blue-200 shadow-2xs">
          <span class="text-[11px] text-blue-500">已锁定节点:</span>
          <span class="font-bold text-[11px]">{{ activeFilterLabel }}</span>
          <button
            type="button"
            @click="handleClearFilter"
            class="text-blue-500 hover:text-blue-800 font-bold ml-1 cursor-pointer text-sm"
            title="清除当前节点筛选"
          >
            ×
          </button>
        </div>

        <button
          type="button"
          @click="handleClearFilter"
          :class="[
            'px-3 py-1 rounded-lg text-xs font-medium transition cursor-pointer border shadow-2xs',
            !activeFilterLabel
              ? 'bg-slate-800 text-white border-slate-800 font-bold'
              : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
          ]"
        >
          查看全网全量
        </button>
      </div>
    </div>

    <!-- 2. Five-Stage Process Milestone Bar (顶部五阶流水线进度标识) -->
    <div class="hidden lg:grid grid-cols-5 gap-2 px-3 py-2 bg-slate-50/80 rounded-xl border border-slate-200/60 text-xs">
      <div class="flex items-center gap-2">
        <span class="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px]">1</span>
        <div>
          <div class="font-bold text-slate-800 text-[11.5px]">第一阶段 · 数据感知接入</div>
          <div class="text-[10px] text-slate-400">协议遥测 / 接口同步 / 抄表填报</div>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px]">2</span>
        <div>
          <div class="font-bold text-slate-800 text-[11.5px]">第二阶段 · 报文前置接收</div>
          <div class="text-[10px] text-slate-400">专网信道 / 帧头校验 / 流量缓冲</div>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px]">3</span>
        <div>
          <div class="font-bold text-slate-800 text-[11.5px]">第三阶段 · 规约清洗解析</div>
          <div class="text-[10px] text-slate-400">SL651解码 / 数据纠偏 / 脏数据拦截</div>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px]">4</span>
        <div>
          <div class="font-bold text-slate-800 text-[11.5px]">第四阶段 · 水量计算汇集</div>
          <div class="text-[10px] text-slate-400">日累积量折算 / 许可指标平衡核对</div>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[10px]">5</span>
        <div>
          <div class="font-bold text-slate-800 text-[11.5px]">第五阶段 · 国家平台推送</div>
          <div class="text-[10px] text-slate-400">国密验签 / 并轨推送 / 回执确认</div>
        </div>
      </div>
    </div>

    <!-- 3. PIPELINE FLOW CANVAS (主流程管道画布) -->
    <div class="space-y-4">
      
      <!-- ================= 3.1 按日推送链路（协议归集 + 接口归集 -> 汇聚合并至统一推送总量） ================= -->
      <div class="pipeline-board bg-slate-900/[0.02] border-2 border-dashed border-blue-200/90 rounded-2xl p-3.5 sm:p-4.5 relative overflow-hidden">
        <!-- Canvas Background Watermark / Grid -->
        <div class="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>

        <!-- Section Header -->
        <div class="relative z-10 flex flex-wrap items-center justify-between gap-2 mb-3.5">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-blue-600 text-white shadow-xs tracking-wide">
              按日推送流水线
            </span>
            <span class="text-xs font-bold text-slate-800">
              协议归集链路 & 接口归集链路（每日自动化汇聚与统一上报国家平台）
            </span>
          </div>
          <div class="flex items-center gap-3 text-xs text-slate-500">
            <span>调度批次：<strong class="text-slate-700">02:00定时 / 04:00增量</strong></span>
            <span>日核定汇集总水量：<strong class="text-blue-600 font-mono text-sm">{{ stats.dailyPushTotal.totalVolumeTenThousandM3 }}</strong> 万m³</span>
          </div>
        </div>

        <!-- Pipeline Flow Layout -->
        <div class="relative z-10 flex flex-col xl:flex-row items-stretch gap-4">
          <!-- Left: 2 Parallel Daily Pipeline Channels -->
          <div class="flex-1 flex flex-col justify-between gap-4">
            
            <!-- ================= 第一条：协议归集链路 ================= -->
            <!-- 协议归集应到/已到/未到 -> 报文接收 -> 报文解析 -> 汇集日水量 -->
            <div class="channel-card bg-gradient-to-r from-blue-50/60 to-white rounded-xl p-3 border border-blue-200 shadow-2xs relative">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-blue-100"></span>
                  <span class="text-xs font-bold text-blue-950">第一条：协议归集链路</span>
                  <span class="px-1.5 py-0.2 rounded text-[10px] bg-blue-100 text-blue-800 font-mono">SL651-2014 / SZY206规约 · 按日推送</span>
                </div>
                <div class="text-[11px] text-blue-600 font-medium">
                  到报完整率 <strong class="font-mono text-slate-800">{{ stats.protocol.arrivalRate }}%</strong>
                </div>
              </div>

              <!-- Pipeline Nodes Grid with Connectors -->
              <div class="flex items-center gap-0 overflow-x-auto no-scrollbar py-1">
                
                <!-- 节点 1: 协议归集 (应到/已到/未到) -->
                <div
                  @click="handleSelectFilter({ receiveMethod: '协议归集', label: '协议归集 · 全部 (1,480处)' })"
                  class="flow-node flex-1 min-w-[130px] bg-white rounded-xl p-2.5 border-2 transition cursor-pointer relative"
                  :class="isFilterActive('协议归集') && !activeFilterLabel.includes('汇集日水量') ? 'border-blue-600 shadow-md ring-2 ring-blue-300/50 bg-blue-50/30' : 'border-slate-200 hover:border-blue-400 hover:shadow-xs'"
                >
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] font-bold text-blue-700 uppercase tracking-wider">STEP 01</span>
                    <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  </div>
                  <div class="font-bold text-slate-800 text-xs mt-0.5">协议归集设施</div>
                  <div class="text-[10px] text-slate-400">应到总数：<strong class="text-slate-700 font-mono">1,480</strong> 处</div>

                  <!-- Arrival Status Sub-buttons -->
                  <div class="grid grid-cols-2 gap-1 mt-2 text-[10.5px]">
                    <div
                      @click.stop="handleSelectFilter({ receiveMethod: '协议归集', arrivalStatus: '已到', label: '协议归集 · 已到 (1,438处)' })"
                      class="px-1.5 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 font-medium text-center transition"
                      title="点击仅筛选协议已到设施"
                    >
                      已到 <strong class="font-mono">{{ stats.protocol.arrived }}</strong>
                    </div>
                    <div
                      @click.stop="handleSelectFilter({ receiveMethod: '协议归集', arrivalStatus: '未到', label: '协议归集 · 未到 (42处)' })"
                      class="px-1.5 py-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200/80 font-medium text-center transition"
                      title="点击仅筛选协议未到异常设施"
                    >
                      未到 <strong class="font-mono">{{ stats.protocol.notArrived }}</strong>
                    </div>
                  </div>
                </div>

                <!-- Conduit 1 -> 2 (动态水流管线) -->
                <div class="pipeline-connector w-8 sm:w-10 shrink-0 flex items-center justify-center relative">
                  <div class="pipe-line h-1.5 w-full bg-blue-200 relative overflow-hidden">
                    <div v-if="isAnimationEnabled" class="pipe-flow-pulse bg-blue-600 h-full w-4 rounded-full"></div>
                  </div>
                  <svg class="w-3 h-3 text-blue-600 absolute right-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>

                <!-- 节点 2: 报文接收 -->
                <div
                  @click="handleSelectFilter({ receiveMethod: '协议归集', label: '协议归集 · 报文接收' })"
                  class="flow-node flex-1 min-w-[125px] bg-white rounded-xl p-2.5 border-2 transition cursor-pointer relative"
                  :class="activeFilterLabel?.includes('报文接收') ? 'border-blue-600 shadow-md ring-2 ring-blue-300/50 bg-blue-50/30' : 'border-slate-200 hover:border-blue-400 hover:shadow-xs'"
                >
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] font-bold text-blue-700 uppercase tracking-wider">STEP 02</span>
                    <span class="text-[9.5px] px-1 rounded bg-slate-100 text-slate-500 font-mono">前置机</span>
                  </div>
                  <div class="font-bold text-slate-800 text-xs mt-0.5">报文接收</div>
                  <div class="text-sm font-bold font-mono text-slate-900 mt-1">
                    {{ stats.protocol.packetReceived.toLocaleString() }} <span class="text-[10px] font-normal text-slate-400">条</span>
                  </div>
                  <div class="text-[10px] text-slate-400 mt-1 flex items-center justify-between">
                    <span>峰值 {{ stats.protocol.packetPeakPerSec }}/s</span>
                    <span class="text-emerald-600 font-medium">丢包 {{ stats.protocol.packetLossRate }}</span>
                  </div>
                </div>

                <!-- Conduit 2 -> 3 (动态水流管线) -->
                <div class="pipeline-connector w-8 sm:w-10 shrink-0 flex items-center justify-center relative">
                  <div class="pipe-line h-1.5 w-full bg-blue-200 relative overflow-hidden">
                    <div v-if="isAnimationEnabled" class="pipe-flow-pulse bg-blue-600 h-full w-4 rounded-full"></div>
                  </div>
                  <svg class="w-3 h-3 text-blue-600 absolute right-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>

                <!-- 节点 3: 报文解析 -->
                <div
                  @click="handleSelectFilter({ receiveMethod: '协议归集', label: '协议归集 · 报文解析' })"
                  class="flow-node flex-1 min-w-[135px] bg-white rounded-xl p-2.5 border-2 transition cursor-pointer relative"
                  :class="activeFilterLabel?.includes('报文解析') ? 'border-blue-600 shadow-md ring-2 ring-blue-300/50 bg-blue-50/30' : 'border-slate-200 hover:border-blue-400 hover:shadow-xs'"
                >
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] font-bold text-blue-700 uppercase tracking-wider">STEP 03</span>
                    <span class="text-[9.5px] font-bold text-emerald-600 font-mono">{{ stats.protocol.parseSuccessRate }}%</span>
                  </div>
                  <div class="font-bold text-slate-800 text-xs mt-0.5">报文解析清洗</div>
                  <div class="flex items-center justify-between mt-1 text-[10.5px]">
                    <span class="text-emerald-700 font-bold font-mono">成功 {{ stats.protocol.packetParsed.toLocaleString() }}</span>
                    <button
                      type="button"
                      @click.stop="handleSelectFilter({ aggregationStatus: '解析失败', label: '协议报文解析失败 (220条)' })"
                      class="px-1.5 py-0.5 rounded bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-medium"
                      title="点击筛选解析失败的脏数据"
                    >
                      异常 {{ stats.protocol.parseFailed }}
                    </button>
                  </div>
                  <div class="text-[10px] text-slate-400 mt-1">自动过滤乱码与CRC差错</div>
                </div>

                <!-- Conduit 3 -> 4 (动态水流管线) -->
                <div class="pipeline-connector w-8 sm:w-10 shrink-0 flex items-center justify-center relative">
                  <div class="pipe-line h-1.5 w-full bg-blue-200 relative overflow-hidden">
                    <div v-if="isAnimationEnabled" class="pipe-flow-pulse bg-blue-600 h-full w-4 rounded-full"></div>
                  </div>
                  <svg class="w-3 h-3 text-blue-600 absolute right-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>

                <!-- 节点 4: 汇集日水量 (协议) -->
                <div
                  @click="handleSelectFilter({ receiveMethod: '协议归集', aggregationStatus: '汇集成功', label: '协议归集 · 汇集日水量 (1,438处)' })"
                  class="flow-node flex-1 min-w-[145px] bg-blue-50/60 rounded-xl p-2.5 border-2 transition cursor-pointer relative"
                  :class="activeFilterLabel?.includes('协议归集 · 汇集日水量') ? 'border-blue-600 shadow-md ring-2 ring-blue-300/50 bg-blue-100/40' : 'border-blue-300 hover:border-blue-500 hover:shadow-xs'"
                >
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] font-bold text-blue-700 uppercase tracking-wider">STEP 04</span>
                    <span class="px-1.5 py-0.2 rounded bg-blue-600 text-white font-mono text-[9.5px]">日水量</span>
                  </div>
                  <div class="font-bold text-blue-900 text-xs mt-0.5">汇集日水量 (协议)</div>
                  <div class="text-sm font-bold font-mono text-blue-700 mt-1">
                    {{ stats.protocol.aggregatedVolumeTenThousandM3 }} <span class="text-[10px] font-normal text-slate-500">万m³</span>
                  </div>
                  <div class="text-[10px] text-blue-700/80 mt-1 flex items-center justify-between">
                    <span>已核定 <strong>1,438</strong> 处</span>
                    <span class="text-slate-400">等待汇聚</span>
                  </div>
                </div>

              </div>
            </div>

            <!-- ================= 第二条：接口归集链路 ================= -->
            <!-- 接口归集应到/已到/未到 -> 汇集日水量 -->
            <div class="channel-card bg-gradient-to-r from-cyan-50/60 to-white rounded-xl p-3 border border-cyan-200 shadow-2xs relative">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-cyan-600 ring-4 ring-cyan-100"></span>
                  <span class="text-xs font-bold text-cyan-950">第二条：接口归集链路</span>
                  <span class="px-1.5 py-0.2 rounded text-[10px] bg-cyan-100 text-cyan-800 font-mono">企业/园区SCADA · RESTful / Kafka流 · 按日推送</span>
                </div>
                <div class="text-[11px] text-cyan-600 font-medium">
                  到报完整率 <strong class="font-mono text-slate-800">{{ stats.interface.arrivalRate }}%</strong>
                </div>
              </div>

              <!-- Pipeline Nodes for Interface -->
              <div class="flex items-center gap-0 overflow-x-auto no-scrollbar py-1">
                
                <!-- 节点 1: 接口归集 (应到/已到/未到) -->
                <div
                  @click="handleSelectFilter({ receiveMethod: '接口归集', label: '接口归集 · 全部 (620处)' })"
                  class="flow-node w-60 sm:w-72 bg-white rounded-xl p-2.5 border-2 transition cursor-pointer relative shrink-0"
                  :class="isFilterActive('接口归集') && !activeFilterLabel.includes('汇集日水量') ? 'border-cyan-600 shadow-md ring-2 ring-cyan-300/50 bg-cyan-50/30' : 'border-slate-200 hover:border-cyan-400 hover:shadow-xs'"
                >
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] font-bold text-cyan-700 uppercase tracking-wider">STEP 01</span>
                    <span class="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                  </div>
                  <div class="font-bold text-slate-800 text-xs mt-0.5">接口归集设施</div>
                  <div class="text-[10px] text-slate-400">应到总数：<strong class="text-slate-700 font-mono">620</strong> 处</div>

                  <!-- Arrival Status Sub-buttons -->
                  <div class="grid grid-cols-2 gap-1.5 mt-2 text-[10.5px]">
                    <div
                      @click.stop="handleSelectFilter({ receiveMethod: '接口归集', arrivalStatus: '已到', label: '接口归集 · 已到 (608处)' })"
                      class="px-1.5 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 font-medium text-center transition"
                      title="点击仅筛选接口已到设施"
                    >
                      已到 <strong class="font-mono">{{ stats.interface.arrived }}</strong>
                    </div>
                    <div
                      @click.stop="handleSelectFilter({ receiveMethod: '接口归集', arrivalStatus: '未到', label: '接口归集 · 未到 (12处)' })"
                      class="px-1.5 py-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200/80 font-medium text-center transition"
                      title="点击仅筛选接口未到异常设施"
                    >
                      未到 <strong class="font-mono">{{ stats.interface.notArrived }}</strong>
                    </div>
                  </div>
                </div>

                <!-- Extended Data Pipeline Conduit -->
                <div class="pipeline-connector flex-1 shrink-0 px-2 flex items-center justify-center relative min-w-[80px]">
                  <div class="pipe-line h-1.5 w-full bg-cyan-200 relative overflow-hidden rounded-full">
                    <div v-if="isAnimationEnabled" class="pipe-flow-pulse bg-cyan-600 h-full w-8 rounded-full"></div>
                  </div>
                  <div class="absolute text-[9.5px] font-mono text-cyan-700 bg-cyan-50/90 px-1.5 rounded border border-cyan-200 -top-3">
                    RESTful / Kafka即时萃取
                  </div>
                  <svg class="w-3.5 h-3.5 text-cyan-600 absolute right-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>

                <!-- 节点 2: 汇集日水量 (接口) -->
                <div
                  @click="handleSelectFilter({ receiveMethod: '接口归集', aggregationStatus: '汇集成功', label: '接口归集 · 汇集日水量 (608处)' })"
                  class="flow-node w-60 sm:w-64 bg-cyan-50/60 rounded-xl p-2.5 border-2 transition cursor-pointer relative shrink-0"
                  :class="activeFilterLabel?.includes('接口归集 · 汇集日水量') ? 'border-cyan-600 shadow-md ring-2 ring-cyan-300/50 bg-cyan-100/40' : 'border-cyan-300 hover:border-cyan-500 hover:shadow-xs'"
                >
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] font-bold text-cyan-700 uppercase tracking-wider">STEP 04</span>
                    <span class="px-1.5 py-0.2 rounded bg-cyan-600 text-white font-mono text-[9.5px]">日水量</span>
                  </div>
                  <div class="font-bold text-cyan-900 text-xs mt-0.5">汇集日水量 (接口)</div>
                  <div class="text-sm font-bold font-mono text-cyan-800 mt-1">
                    {{ stats.interface.aggregatedVolumeTenThousandM3 }} <span class="text-[10px] font-normal text-slate-500">万m³</span>
                  </div>
                  <div class="text-[10px] text-cyan-700/80 mt-1 flex items-center justify-between">
                    <span>已核定 <strong>608</strong> 处</span>
                    <span class="text-slate-400">等待汇聚</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          <!-- Y-Junction Convergence Graphic (双管汇流弯道) -->
          <div class="hidden xl:flex flex-col items-center justify-center shrink-0 w-12 relative px-1">
            <svg class="w-12 h-64 overflow-visible" viewBox="0 0 48 240" fill="none">
              <!-- Top pipe curve from Protocol node -->
              <path
                d="M 0 55 C 24 55, 24 120, 48 120"
                stroke="#3B82F6"
                stroke-width="4"
                stroke-linecap="round"
                fill="none"
              />
              <!-- Bottom pipe curve from Interface node -->
              <path
                d="M 0 185 C 24 185, 24 120, 48 120"
                stroke="#06B6D4"
                stroke-width="4"
                stroke-linecap="round"
                fill="none"
              />
              <!-- Flow dots when animation enabled -->
              <circle v-if="isAnimationEnabled" r="3.5" fill="#2563EB" class="pipe-flow-dot">
                <animateMotion path="M 0 55 C 24 55, 24 120, 48 120" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <circle v-if="isAnimationEnabled" r="3.5" fill="#0891B2" class="pipe-flow-dot">
                <animateMotion path="M 0 185 C 24 185, 24 120, 48 120" dur="1.5s" repeatCount="indefinite" />
              </circle>
            </svg>
            <div class="absolute text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded shadow-2xs whitespace-nowrap">
              汇流合并
            </div>
          </div>

          <!-- ================= 合计推送节点（同协议归集的推送总量需要合计成一个） ================= -->
          <div
            @click="handleSelectFilter({ label: '国家平台日推送总量 (全部 2,046处)' })"
            class="hub-terminal w-full xl:w-80 bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white rounded-2xl p-4 shadow-xl border-2 border-indigo-400/50 flex flex-col justify-between cursor-pointer transition hover:border-indigo-300 relative overflow-hidden group"
          >
            <!-- Watermark / Background Network Grid -->
            <div class="absolute -right-8 -bottom-8 w-36 h-36 bg-blue-500/10 rounded-full blur-xl pointer-events-none"></div>

            <div>
              <!-- Hub Header -->
              <div class="flex items-center justify-between pb-2 border-b border-white/15">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 font-bold flex items-center justify-center text-xs shadow-xs">
                    国
                  </div>
                  <div>
                    <h3 class="font-bold text-sm text-white flex items-center gap-1.5">
                      国家平台日推送总量
                    </h3>
                    <div class="text-[10px] text-indigo-200">协议与接口日水量合并报送枢纽</div>
                  </div>
                </div>
                <span class="px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-amber-400/20 text-amber-300 border border-amber-300/30">
                  统一合并
                </span>
              </div>

              <!-- Aggregated Volume Metrics -->
              <div class="mt-3 space-y-2.5">
                <div class="bg-white/5 rounded-xl p-2.5 border border-white/10">
                  <div class="text-[10.5px] text-indigo-200 flex items-center justify-between">
                    <span>全网已汇集拟上报总量</span>
                    <span class="text-white font-mono font-bold">{{ stats.dailyPushTotal.totalFacilitiesTarget }} 处设施</span>
                  </div>
                  <div class="text-2xl font-bold font-mono text-amber-300 tracking-tight mt-0.5">
                    {{ stats.dailyPushTotal.totalVolumeTenThousandM3 }} <span class="text-xs font-normal text-slate-300">万m³</span>
                  </div>
                  <!-- Breakdown details -->
                  <div class="grid grid-cols-2 gap-1 pt-1.5 mt-1.5 border-t border-white/10 text-[10px] text-indigo-200">
                    <div>协议: <strong class="text-white font-mono">1,438</strong>处 (284.6万m³)</div>
                    <div>接口: <strong class="text-white font-mono">608</strong>处 (112.4万m³)</div>
                  </div>
                </div>

                <!-- Sub-status Interactive Click Blocks -->
                <div class="grid grid-cols-2 gap-2">
                  <!-- 成功 -->
                  <div
                    @click.stop="handleSelectFilter({ pushStatus: '推送成功', label: '日推送总量 · 推送成功 (1,988处)' })"
                    class="p-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/30 transition cursor-pointer text-center group/btn"
                    title="点击联动下方表格只看推送成功记录"
                  >
                    <div class="text-[10px] text-emerald-200 flex items-center justify-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      已推送成功
                    </div>
                    <div class="font-bold font-mono text-base text-emerald-300 mt-0.5">
                      {{ stats.dailyPushTotal.pushedSuccess }} <span class="text-[10px] font-normal">处</span>
                    </div>
                    <div class="text-[9.5px] text-emerald-200/80">{{ stats.dailyPushTotal.pushedSuccessVolumeTenThousandM3 }} 万m³</div>
                  </div>

                  <!-- 失败 -->
                  <div
                    @click.stop="handleSelectFilter({ pushStatus: '推送失败', label: '日推送总量 · 推送失败 (58处)' })"
                    class="p-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 transition cursor-pointer text-center group/btn"
                    title="点击联动下方表格只看推送失败记录"
                  >
                    <div class="text-[10px] text-rose-200 flex items-center justify-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                      推送失败/异常
                    </div>
                    <div class="font-bold font-mono text-base text-rose-300 mt-0.5">
                      {{ stats.dailyPushTotal.pushFailed }} <span class="text-[10px] font-normal">处</span>
                    </div>
                    <div class="text-[9.5px] text-rose-200/80">{{ stats.dailyPushTotal.pushFailedVolumeTenThousandM3 }} 万m³</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Terminal Actions -->
            <div class="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between text-[10.5px]">
              <span class="text-indigo-200">
                推送成功率：<strong class="text-emerald-300 font-mono text-xs">{{ stats.dailyPushTotal.pushSuccessRate }}%</strong>
              </span>
              <button
                type="button"
                @click.stop="$emit('trigger-batch-retry')"
                class="px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 font-bold shadow-xs transition flex items-center gap-1"
              >
                <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="23 4 23 10 17 10"></polyline>
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                </svg>
                <span>重推异常58处</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      <!-- ================= 3.2 第三条：人工归集链路（按月归集，独立展示） ================= -->
      <!-- 用户明确要求：“第三条是人工归集，人工归集应到/已到/未到-汇集月水量，人工归集是单独一条，所以单独展示。” -->
      <div class="pipeline-board bg-amber-500/[0.03] border-2 border-dashed border-amber-300/90 rounded-2xl p-3.5 sm:p-4.5 relative overflow-hidden">
        <!-- Canvas Background Watermark -->
        <div class="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>

        <!-- Section Header -->
        <div class="relative z-10 flex flex-wrap items-center justify-between gap-2 mb-3">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-600 text-white shadow-xs tracking-wide">
              按月归集流水线
            </span>
            <span class="text-xs font-bold text-slate-800">
              第三条：人工归集链路（非在线人工抄表 · 按月核定与汇集 · 独立闭环展示）
            </span>
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-medium border border-amber-300/50">
              月度单条专线
            </span>
          </div>
          <div class="flex items-center gap-3 text-xs text-slate-500">
            <span>归集周期：<strong class="text-slate-800">{{ stats.manual.month }}</strong></span>
            <span>归集核定率：<strong class="text-emerald-600 font-mono text-sm">{{ stats.manual.archivedRate }}%</strong></span>
          </div>
        </div>

        <!-- Flow Nodes for Manual Pipeline -->
        <div class="relative z-10 flex flex-col md:flex-row items-center gap-0 overflow-x-auto no-scrollbar">
          
          <!-- 节点 1: 人工归集 (应到/已到/未到) -->
          <div
            @click="handleSelectFilter({ receiveMethod: '人工归集', label: '人工归集 · 全部 (310处)' })"
            class="flow-node flex-1 w-full md:w-auto bg-white rounded-xl p-3 border-2 transition cursor-pointer relative shadow-2xs"
            :class="isFilterActive('人工归集') && !activeFilterLabel.includes('汇集月水量') ? 'border-amber-500 shadow-md ring-2 ring-amber-300/50 bg-amber-50/30' : 'border-slate-200 hover:border-amber-400 hover:shadow-xs'"
          >
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-bold text-amber-700 uppercase tracking-wider">MONTHLY STEP 01</span>
              <span class="w-2 h-2 rounded-full bg-amber-500"></span>
            </div>
            <div class="font-bold text-slate-800 text-xs mt-0.5 flex items-center justify-between">
              <span>人工归集设施</span>
              <span class="text-[11px] text-slate-500 font-normal">应到：<strong class="text-slate-800 font-mono">{{ stats.manual.shouldArrive }}</strong> 处</span>
            </div>
            <div class="text-[10.5px] text-slate-400 mt-0.5">小型水源地、分散取水户与无信号非在线表计</div>

            <!-- Arrival Status Sub-buttons -->
            <div class="grid grid-cols-2 gap-2 mt-2 text-xs">
              <div
                @click.stop="handleSelectFilter({ receiveMethod: '人工归集', arrivalStatus: '已到', label: '人工归集 · 已到填报 (286处)' })"
                class="px-2 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-medium text-center transition"
                title="点击仅筛选人工已到填报设施"
              >
                <div class="text-[10px] text-emerald-600">已到填报 (已初审)</div>
                <div class="font-bold font-mono text-sm text-emerald-700">{{ stats.manual.arrived }} <span class="text-[10px] font-normal">处</span></div>
              </div>
              <div
                @click.stop="handleSelectFilter({ receiveMethod: '人工归集', arrivalStatus: '未到', label: '人工归集 · 未到/待催报 (24处)' })"
                class="px-2 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-medium text-center transition"
                title="点击仅筛选未填报待催报设施"
              >
                <div class="text-[10px] text-amber-600">未到 / 待催报</div>
                <div class="font-bold font-mono text-sm text-amber-700">{{ stats.manual.notArrived }} <span class="text-[10px] font-normal">处</span></div>
              </div>
            </div>
          </div>

          <!-- Extended Conduit with audit workflow step -->
          <div class="pipeline-connector w-full md:w-36 py-2 md:py-0 px-3 flex flex-col items-center justify-center relative shrink-0">
            <div class="pipe-line h-1.5 w-full bg-amber-200 relative overflow-hidden rounded-full">
              <div v-if="isAnimationEnabled" class="pipe-flow-pulse bg-amber-600 h-full w-8 rounded-full"></div>
            </div>
            <div class="text-[10px] font-bold text-amber-700 bg-amber-100/90 px-2 py-0.5 rounded border border-amber-300/60 mt-1 shadow-2xs whitespace-nowrap">
              三级审核确认流
            </div>
          </div>

          <!-- 节点 2: 汇集月水量 -->
          <div
            @click="handleSelectFilter({ receiveMethod: '人工归集', aggregationStatus: '汇集成功', label: '人工归集 · 汇集月水量 (286处)' })"
            class="flow-node flex-1 w-full md:w-auto bg-emerald-50/40 rounded-xl p-3 border-2 transition cursor-pointer relative shadow-2xs"
            :class="activeFilterLabel?.includes('人工归集 · 汇集月水量') ? 'border-emerald-500 shadow-md ring-2 ring-emerald-300/50 bg-emerald-100/30' : 'border-emerald-300 hover:border-emerald-400 hover:shadow-xs'"
          >
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">MONTHLY STEP 02</span>
              <span class="px-2 py-0.5 rounded-full bg-emerald-600 text-white font-mono text-[10px]">全国水资源月报</span>
            </div>
            <div class="font-bold text-emerald-950 text-xs mt-0.5 flex items-center justify-between">
              <span>汇集月水量</span>
              <span class="text-[11px] text-emerald-700 font-bold font-mono">已核定汇集 {{ stats.manual.aggregatedMonthlyFacilities }} 处</span>
            </div>

            <div class="mt-1 flex items-baseline justify-between">
              <div>
                <div class="text-[10px] text-slate-400">本月累计核定归集水量</div>
                <div class="text-xl font-bold font-mono text-emerald-700 mt-0.5">
                  {{ stats.manual.aggregatedMonthlyVolumeTenThousandM3 }} <span class="text-xs font-normal text-slate-500">万m³</span>
                </div>
              </div>
              <div class="text-right">
                <div class="text-[10px] text-slate-400">月度数据入库状态</div>
                <div class="text-[11px] text-emerald-600 font-bold mt-0.5 flex items-center gap-1 justify-end">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>已完成市级月度汇总</span>
                </div>
              </div>
            </div>

            <div class="mt-2 pt-2 border-t border-emerald-200/60 text-[10.5px] text-slate-500 flex items-center justify-between">
              <span>{{ stats.manual.note }}</span>
              <span class="text-amber-700 font-medium">待市级复核 {{ stats.manual.pendingDistrictAudit }} 处</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { mockPipelineTopologyStats } from '../../../data/mockPushPipelineData';

const emit = defineEmits<{
  (e: 'filter-link', filter: {
    receiveMethod?: string;
    aggregationStatus?: string;
    pushStatus?: string;
    arrivalStatus?: string;
    label: string;
  }): void;
  (e: 'clear-filter'): void;
  (e: 'trigger-batch-retry'): void;
}>();

const stats = ref(mockPipelineTopologyStats);
const activeFilterLabel = ref('');
const isAnimationEnabled = ref(true);

const isFilterActive = (name: string) => {
  return activeFilterLabel.value.includes(name);
};

const handleSelectFilter = (filter: {
  receiveMethod?: string;
  aggregationStatus?: string;
  pushStatus?: string;
  arrivalStatus?: string;
  label: string;
}) => {
  activeFilterLabel.value = filter.label;
  emit('filter-link', filter);
};

const handleClearFilter = () => {
  activeFilterLabel.value = '';
  emit('clear-filter');
};
</script>

<style scoped>
/* Technical pipeline background mesh */
.bg-grid-pattern {
  background-image: radial-gradient(rgba(148, 163, 184, 0.25) 1.5px, transparent 1.5px);
  background-size: 18px 18px;
}

/* Pipe Flow Animation */
.pipe-flow-pulse {
  animation: pipePulse 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes pipePulse {
  0% {
    transform: translateX(-100%);
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(350%);
    opacity: 0.2;
  }
}

/* Flow Node Hover Elevation */
.flow-node {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.flow-node:hover {
  transform: translateY(-2px);
}

.hub-terminal {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.hub-terminal:hover {
  transform: translateY(-3px);
  box-shadow: 0 20px 25px -5px rgba(30, 27, 75, 0.4), 0 8px 10px -6px rgba(30, 27, 75, 0.4);
}
</style>
