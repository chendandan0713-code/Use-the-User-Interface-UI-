<template>
  <!-- 模态背景层 -->
  <div
    v-if="visible"
    class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xs select-none"
    @click.self="handleClose"
  >
    <!-- 拓扑图主弹窗容器 -->
    <div
      class="bg-white rounded-xl shadow-2xl border border-slate-200 w-full flex flex-col overflow-hidden transition-all duration-200"
      :class="isFullscreen ? 'fixed inset-2 z-50 rounded-lg' : 'max-w-7xl h-[92vh]'"
    >
      <!-- 1. 顶部标题栏 (与参考截图一致：“拓扑图”，右侧配置关闭与辅助操作) -->
      <div class="px-5 py-3 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2">
            <div class="w-2.5 h-2.5 rounded-full bg-[#1677ff]"></div>
            <h3 class="text-base font-bold text-slate-900 tracking-tight">拓扑图</h3>
          </div>
          <span class="text-xs text-slate-400 hidden sm:inline-block">|</span>
          <span class="text-xs text-slate-500 font-medium hidden sm:inline-block">
            {{ displayOwnerName }} - 水资源全链路实体拓扑网络
          </span>
        </div>

        <div class="flex items-center gap-2">
          <!-- 许可证切换 (如果有多证) -->
          <div class="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs mr-2">
            <button
              type="button"
              @click="currentPermitIndex = 0"
              class="px-2.5 py-1 rounded-md transition font-medium cursor-pointer"
              :class="currentPermitIndex === 0 ? 'bg-white text-blue-700 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'"
            >
              证1: {{ displayPermitNumber }}
            </button>
            <button
              type="button"
              @click="currentPermitIndex = 1"
              class="px-2.5 py-1 rounded-md transition font-medium cursor-pointer"
              :class="currentPermitIndex === 1 ? 'bg-white text-blue-700 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'"
            >
              证2: B630121S2023-0118
            </button>
          </div>

          <!-- 画布缩放工具按钮 -->
          <div class="flex items-center bg-slate-100 rounded-lg border border-slate-200 p-0.5">
            <button
              type="button"
              @click="handleZoomOut"
              class="p-1 rounded text-slate-600 hover:text-slate-900 hover:bg-white transition cursor-pointer"
              title="缩小 (Zoom Out)"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </button>
            <span class="text-[11px] font-mono px-1.5 text-slate-600 min-w-[42px] text-center font-medium">
              {{ Math.round(scale * 100) }}%
            </span>
            <button
              type="button"
              @click="handleZoomIn"
              class="p-1 rounded text-slate-600 hover:text-slate-900 hover:bg-white transition cursor-pointer"
              title="放大 (Zoom In)"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </button>
            <button
              type="button"
              @click="handleResetView"
              class="px-1.5 py-1 text-[11px] rounded text-slate-600 hover:text-slate-900 hover:bg-white transition cursor-pointer"
              title="重置视图"
            >
              复位
            </button>
          </div>

          <!-- 全屏切换 -->
          <button
            type="button"
            @click="isFullscreen = !isFullscreen"
            class="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            :title="isFullscreen ? '退出全屏' : '全屏显示'"
          >
            <svg v-if="!isFullscreen" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
            </svg>
            <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
            </svg>
          </button>

          <!-- 关闭按钮 -->
          <button
            type="button"
            @click="handleClose"
            class="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            title="关闭弹窗"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <!-- 2. 拓扑图可视工作区 (左侧绝对定位图例 + 右侧平移缩放拓扑主图) -->
      <div
        ref="viewportRef"
        class="flex-1 relative overflow-hidden bg-white cursor-grab active:cursor-grabbing"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
        @mouseleave="handleMouseUp"
        @wheel.prevent="handleWheel"
      >
        <!-- 左侧信息栏与图例 (严格匹配截图左侧排版) -->
        <div class="absolute left-6 top-6 z-20 pointer-events-auto bg-white/90 backdrop-blur-xs p-3.5 rounded-xl border border-slate-200/80 shadow-xs space-y-3 select-none">
          <!-- 概况指标 -->
          <div class="text-xs text-slate-600 space-y-1">
            <div class="font-medium text-slate-700">当前取水户共 <span class="font-bold text-slate-900">2</span> 个证</div>
            <div class="font-medium text-slate-700">当前取水许可证 <span class="font-bold text-blue-700">2</span> 个工程</div>
          </div>

          <div class="border-t border-slate-100 pt-2">
            <!-- 计量状态图例 -->
            <div class="text-xs font-bold text-slate-800 mb-2">计量状态</div>
            <div class="space-y-2">
              <!-- 正常 -->
              <div class="flex items-center gap-2.5">
                <span class="w-3.5 h-3.5 rounded-full bg-[#68d391] shadow-xs inline-block"></span>
                <span class="text-xs text-slate-700">正常</span>
              </div>
              <!-- 故障 -->
              <div class="flex items-center gap-2.5">
                <span class="w-3.5 h-3.5 rounded-full bg-[#f87171] shadow-xs inline-block"></span>
                <span class="text-xs text-slate-700">故障</span>
              </div>
              <!-- 停用 -->
              <div class="flex items-center gap-2.5">
                <span class="w-3.5 h-3.5 rounded-full bg-[#fb923c] shadow-xs inline-block"></span>
                <span class="text-xs text-slate-700">停用</span>
              </div>
            </div>
          </div>

          <!-- 交互提示 -->
          <div class="border-t border-slate-100 pt-2 text-[11px] text-slate-400">
            <span>支持滚轮缩放、拖拽平移</span><br>
            <span>点击节点查看实时数据</span>
          </div>
        </div>

        <!-- 拓扑主画布容器 (应用 translate 和 scale) -->
        <div
          class="w-[1240px] h-[720px] origin-top-left absolute transition-transform ease-out"
          :style="{
            transform: `translate(${panX}px, ${panY}px) scale(${scale})`,
            transitionDuration: isDragging ? '0ms' : '100ms'
          }"
        >
          <!-- SVG 连线层 (绘制平滑贝塞尔曲线与连线文字标签) -->
          <svg
            class="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 1240 720"
          >
            <defs>
              <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="1" stdDeviation="1" flood-opacity="0.1" />
              </filter>
            </defs>

            <!-- 1. 【户】到【证】的垂直连线 -->
            <!-- 户底部中心: (620, 115) -> 证顶部中心: (620, 185) -->
            <line
              x1="620"
              y1="115"
              x2="620"
              y2="185"
              stroke="#555555"
              stroke-width="1.8"
            />

            <!-- 2. 【证】到底部三个【工程/口】及一个直接到计量点的分支连线 -->
            <!-- 证底部发射点: (620, 225) -->

            <!-- 分支 2.1: 证 -> 工程1(铬污染防治水井, 顶部中心 220, 325) -->
            <path
              d="M 620 225 C 620 275, 220 265, 220 325"
              fill="none"
              stroke="#555555"
              stroke-width="1.8"
            />

            <!-- 分支 2.2: 证 -> 工程2(互助县东渠工程, 顶部中心 570, 325) -->
            <path
              d="M 620 225 C 620 280, 570 275, 570 325"
              fill="none"
              stroke="#555555"
              stroke-width="1.8"
            />

            <!-- 分支 2.3: 证 -> 工程3(刚察县人畜饮水工程, 顶部中心 890, 325) -->
            <path
              d="M 620 225 C 620 280, 890 275, 890 325"
              fill="none"
              stroke="#555555"
              stroke-width="1.8"
            />

            <!-- 分支 2.4: 证 -> 右侧第6个计量点(虚线，标注“未关联口”) -->
            <!-- 证发射点 (625, 228) -> 计量点6 顶部中心 (1200, 580) -->
            <path
              d="M 625 228 C 650 250, 950 340, 1200 580"
              fill="none"
              stroke="#555555"
              stroke-width="1.8"
              stroke-dasharray="5,4"
            />
            <!-- 连线文字：未关联口 (约位于 x=995, y=365) -->
            <g transform="translate(980, 360)">
              <rect x="-2" y="-12" width="56" height="18" fill="#ffffff" rx="4" />
              <text x="26" y="0" font-size="12" fill="#555555" text-anchor="middle" font-family="sans-serif">未关联口</text>
            </g>

            <!-- 3. 【工程1】到其下两个计量点的连线 -->
            <!-- 工程1底部发射点: (220, 420) -->

            <!-- 3.1: 工程1 -> 计量点1 (实线，取水口) -> 计量点1中心 (110, 580) -->
            <path
              d="M 220 420 C 220 490, 110 500, 110 580"
              fill="none"
              stroke="#555555"
              stroke-width="1.8"
            />
            <!-- 连线文字：取水口 (位于 x=160, y=515) -->
            <g transform="translate(142, 515)">
              <rect x="-2" y="-12" width="46" height="18" fill="#ffffff" rx="4" />
              <text x="21" y="0" font-size="12" fill="#555555" text-anchor="middle" font-family="sans-serif">取水口</text>
            </g>

            <!-- 3.2: 工程1 -> 计量点2 (虚线，供水口) -> 计量点2中心 (330, 580) -->
            <path
              d="M 220 420 C 220 490, 330 500, 330 580"
              fill="none"
              stroke="#555555"
              stroke-width="1.8"
              stroke-dasharray="5,4"
            />
            <!-- 连线文字：供水口 (位于 x=280, y=515) -->
            <g transform="translate(262, 515)">
              <rect x="-2" y="-12" width="46" height="18" fill="#ffffff" rx="4" />
              <text x="21" y="0" font-size="12" fill="#555555" text-anchor="middle" font-family="sans-serif">供水口</text>
            </g>

            <!-- 4. 【工程2】到计量点3的连线 (实线，垂直，取水口) -->
            <!-- 工程2底部中心: (570, 420) -> 计量点3中心: (570, 580) -->
            <line
              x1="570"
              y1="420"
              x2="570"
              y2="580"
              stroke="#555555"
              stroke-width="1.8"
            />
            <!-- 连线文字：取水口 (位于 x=570, y=515) -->
            <g transform="translate(548, 515)">
              <rect x="-2" y="-12" width="46" height="18" fill="#ffffff" rx="4" />
              <text x="21" y="0" font-size="12" fill="#555555" text-anchor="middle" font-family="sans-serif">取水口</text>
            </g>

            <!-- 5. 【工程3】到其下两个计量点的连线 -->
            <!-- 工程3底部发射点: (890, 420) -->

            <!-- 5.1: 工程3 -> 计量点4 (实线，取水口) -> 计量点4中心 (790, 580) -->
            <path
              d="M 890 420 C 890 490, 790 500, 790 580"
              fill="none"
              stroke="#555555"
              stroke-width="1.8"
            />
            <!-- 连线文字：取水口 (位于 x=830, y=515) -->
            <g transform="translate(812, 515)">
              <rect x="-2" y="-12" width="46" height="18" fill="#ffffff" rx="4" />
              <text x="21" y="0" font-size="12" fill="#555555" text-anchor="middle" font-family="sans-serif">取水口</text>
            </g>

            <!-- 5.2: 工程3 -> 计量点5 (虚线，退水口) -> 计量点5中心 (1000, 580) -->
            <path
              d="M 890 420 C 890 490, 1000 500, 1000 580"
              fill="none"
              stroke="#555555"
              stroke-width="1.8"
              stroke-dasharray="5,4"
            />
            <!-- 连线文字：退水口 (位于 x=950, y=515) -->
            <g transform="translate(930, 515)">
              <rect x="-2" y="-12" width="46" height="18" fill="#ffffff" rx="4" />
              <text x="21" y="0" font-size="12" fill="#555555" text-anchor="middle" font-family="sans-serif">退水口</text>
            </g>
          </svg>

          <!-- ==================== 节点层 (绝对定位与截图完全一致) ==================== -->

          <!-- 1. 顶层节点：【户】 -->
          <div
            class="absolute left-[480px] top-[35px] w-[280px] h-[80px] bg-[#eeeeee] hover:bg-[#e4e4e4] rounded-xl border border-slate-300 shadow-xs flex flex-col items-center justify-center text-center p-2.5 transition-all duration-150 cursor-pointer hover:border-blue-400 hover:shadow-sm"
            @click="handleSelectNode('user', { title: displayOwnerName, code: displayCreditCode })"
          >
            <div class="text-xs font-semibold text-slate-800 leading-snug line-clamp-2 px-1">
              【户】 {{ displayOwnerName }}
            </div>
            <div class="font-mono text-xs text-slate-600 mt-1 font-medium">
              {{ displayCreditCode }}
            </div>
          </div>

          <!-- 2. 第二层节点：【证】 -->
          <div
            class="absolute left-[515px] top-[185px] w-[210px] h-[40px] bg-[#f2f2f2] hover:bg-[#e8e8e8] rounded-xl border border-slate-300 shadow-xs flex items-center justify-center text-center px-3 transition-all duration-150 cursor-pointer hover:border-blue-400 hover:shadow-sm"
            @click="handleSelectNode('permit', { title: displayPermitNumber, validUntil: '2030-01-30' })"
          >
            <span class="text-xs font-semibold text-slate-800 font-mono">
              【证】 {{ displayPermitNumber }}
            </span>
          </div>

          <!-- 3. 第三层节点：三个【工程/口】 -->

          <!-- 3.1 工程/口 1 -->
          <div
            class="absolute left-[105px] top-[325px] w-[230px] h-[95px] bg-[#eeeeee] hover:bg-[#e4e4e4] rounded-xl border border-slate-300 shadow-xs flex flex-col items-center justify-center text-center p-3 transition-all duration-150 cursor-pointer hover:border-blue-400 hover:shadow-sm"
            @click="handleSelectNode('project', { name: '铬污染防治杨沟湾铬渣堆场水井', code: 'A632521S2024-0505-001', type: '地下水井' })"
          >
            <div class="text-xs font-semibold text-slate-800 leading-snug">
              【工程/口】铬污染防治杨沟湾<br>铬渣堆场水井
            </div>
            <div class="font-mono text-[11.5px] text-slate-600 mt-1.5 font-medium">
              A632521S2024-0505-001
            </div>
          </div>

          <!-- 3.2 工程/口 2 -->
          <div
            class="absolute left-[455px] top-[325px] w-[230px] h-[95px] bg-[#eeeeee] hover:bg-[#e4e4e4] rounded-xl border border-slate-300 shadow-xs flex flex-col items-center justify-center text-center p-3 transition-all duration-150 cursor-pointer hover:border-blue-400 hover:shadow-sm"
            @click="handleSelectNode('project', { name: '互助县哈拉直沟东渠灌区工程取水闸', code: 'A632521S2024-0505-001', type: '地表引水渠' })"
          >
            <div class="text-xs font-semibold text-slate-800 leading-snug">
              【工程/口】互助县哈拉直沟东<br>渠灌区工程取水闸
            </div>
            <div class="font-mono text-[11.5px] text-slate-600 mt-1.5 font-medium">
              A632521S2024-0505-001
            </div>
          </div>

          <!-- 3.3 工程/口 3 -->
          <div
            class="absolute left-[775px] top-[325px] w-[230px] h-[95px] bg-[#eeeeee] hover:bg-[#e4e4e4] rounded-xl border border-slate-300 shadow-xs flex flex-col items-center justify-center text-center p-3 transition-all duration-150 cursor-pointer hover:border-blue-400 hover:shadow-sm"
            @click="handleSelectNode('project', { name: '海北州刚察县哈尔盖镇郁木多人畜饮水工程', code: 'A632521S2024-0505-001', type: '人畜引水工程' })"
          >
            <div class="text-xs font-semibold text-slate-800 leading-snug">
              【工程/口】海北州刚察县哈尔盖<br>镇郁木多人畜饮水工程
            </div>
            <div class="font-mono text-[11.5px] text-slate-600 mt-1.5 font-medium">
              A632521S2024-0505-001
            </div>
          </div>

          <!-- 4. 第四层节点：六个【点】计量点卡片 (按横向排列，对应各连线末端) -->

          <!-- 4.1 计量点 1: 正常 (绿) -->
          <div
            class="absolute left-[20px] top-[580px] w-[180px] h-[48px] bg-[#eeeeee] hover:bg-[#e4e4e4] rounded-xl border border-slate-300 shadow-xs flex items-center gap-2.5 px-3 transition-all duration-150 cursor-pointer hover:border-blue-400 hover:shadow-sm"
            @click="handleSelectNode('meter', { name: '电磁流量计', code: '630224JL00192', status: '正常', flow: '142.5 m³/h', reading: '128450.2 m³' })"
          >
            <span class="w-3.5 h-3.5 rounded-full bg-[#68d391] shrink-0 shadow-xs"></span>
            <div class="flex flex-col text-left min-w-0">
              <span class="text-xs font-semibold text-slate-800 truncate">【点】电磁流量计</span>
              <span class="font-mono text-[11px] text-slate-600 font-medium">630224JL00192</span>
            </div>
          </div>

          <!-- 4.2 计量点 2: 故障 (红) -->
          <div
            class="absolute left-[240px] top-[580px] w-[180px] h-[48px] bg-[#eeeeee] hover:bg-[#e4e4e4] rounded-xl border border-slate-300 shadow-xs flex items-center gap-2.5 px-3 transition-all duration-150 cursor-pointer hover:border-blue-400 hover:shadow-sm"
            @click="handleSelectNode('meter', { name: '超声波流量计', code: '630224JL00192', status: '故障', faultReason: '通信信号中断超时超24小时' })"
          >
            <span class="w-3.5 h-3.5 rounded-full bg-[#f87171] shrink-0 shadow-xs"></span>
            <div class="flex flex-col text-left min-w-0">
              <span class="text-xs font-semibold text-slate-800 truncate">【点】超声波流量计</span>
              <span class="font-mono text-[11px] text-slate-600 font-medium">630224JL00192</span>
            </div>
          </div>

          <!-- 4.3 计量点 3: 停用 (橙) -->
          <div
            class="absolute left-[480px] top-[580px] w-[180px] h-[48px] bg-[#eeeeee] hover:bg-[#e4e4e4] rounded-xl border border-slate-300 shadow-xs flex items-center gap-2.5 px-3 transition-all duration-150 cursor-pointer hover:border-blue-400 hover:shadow-sm"
            @click="handleSelectNode('meter', { name: '水位计', code: '630224JL00192', status: '停用', reason: '枯水期机井季节性停用' })"
          >
            <span class="w-3.5 h-3.5 rounded-full bg-[#fb923c] shrink-0 shadow-xs"></span>
            <div class="flex flex-col text-left min-w-0">
              <span class="text-xs font-semibold text-slate-800 truncate">【点】水位计</span>
              <span class="font-mono text-[11px] text-slate-600 font-medium">630224JL00192</span>
            </div>
          </div>

          <!-- 4.4 计量点 4: 正常 (绿) -->
          <div
            class="absolute left-[700px] top-[580px] w-[180px] h-[48px] bg-[#eeeeee] hover:bg-[#e4e4e4] rounded-xl border border-slate-300 shadow-xs flex items-center gap-2.5 px-3 transition-all duration-150 cursor-pointer hover:border-blue-400 hover:shadow-sm"
            @click="handleSelectNode('meter', { name: '超声波流量计', code: '630224JL00192', status: '正常', flow: '68.0 m³/h', reading: '94560.8 m³' })"
          >
            <span class="w-3.5 h-3.5 rounded-full bg-[#68d391] shrink-0 shadow-xs"></span>
            <div class="flex flex-col text-left min-w-0">
              <span class="text-xs font-semibold text-slate-800 truncate">【点】超声波流量计</span>
              <span class="font-mono text-[11px] text-slate-600 font-medium">630224JL00192</span>
            </div>
          </div>

          <!-- 4.5 计量点 5: 正常 (绿) -->
          <div
            class="absolute left-[910px] top-[580px] w-[180px] h-[48px] bg-[#eeeeee] hover:bg-[#e4e4e4] rounded-xl border border-slate-300 shadow-xs flex items-center gap-2.5 px-3 transition-all duration-150 cursor-pointer hover:border-blue-400 hover:shadow-sm"
            @click="handleSelectNode('meter', { name: '超声波流量计', code: '630224JL00192', status: '正常', flow: '42.1 m³/h', reading: '41200.5 m³' })"
          >
            <span class="w-3.5 h-3.5 rounded-full bg-[#68d391] shrink-0 shadow-xs"></span>
            <div class="flex flex-col text-left min-w-0">
              <span class="text-xs font-semibold text-slate-800 truncate">【点】超声波流量计</span>
              <span class="font-mono text-[11px] text-slate-600 font-medium">630224JL00192</span>
            </div>
          </div>

          <!-- 4.6 计量点 6: 正常 (绿，通过虚线直接由证引出的未关联口) -->
          <div
            class="absolute left-[1110px] top-[580px] w-[180px] h-[48px] bg-[#eeeeee] hover:bg-[#e4e4e4] rounded-xl border border-slate-300 shadow-xs flex items-center gap-2.5 px-3 transition-all duration-150 cursor-pointer hover:border-blue-400 hover:shadow-sm"
            @click="handleSelectNode('meter', { name: '超声波流量计', code: '630224JL00192', status: '正常', flow: '15.4 m³/h', reading: '18320.0 m³', note: '未关联取水工程取水口直连计量设施' })"
          >
            <span class="w-3.5 h-3.5 rounded-full bg-[#68d391] shrink-0 shadow-xs"></span>
            <div class="flex flex-col text-left min-w-0">
              <span class="text-xs font-semibold text-slate-800 truncate">【点】超声波流量计</span>
              <span class="font-mono text-[11px] text-slate-600 font-medium">630224JL00192</span>
            </div>
          </div>
        </div>

        <!-- 节点详情浮动卡片 (当点击某个节点时在右下角优雅弹出) -->
        <div
          v-if="selectedNode"
          class="absolute right-6 bottom-6 z-30 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-4 animate-in fade-in slide-in-from-bottom-3 duration-150"
        >
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
            <div class="flex items-center gap-2">
              <span
                class="px-2 py-0.5 rounded text-[11px] font-bold"
                :class="
                  selectedNode.type === 'user' ? 'bg-blue-100 text-blue-700' :
                  selectedNode.type === 'permit' ? 'bg-purple-100 text-purple-700' :
                  selectedNode.type === 'project' ? 'bg-amber-100 text-amber-700' :
                  'bg-emerald-100 text-emerald-700'
                "
              >
                {{ selectedNode.type === 'user' ? '取水权人' : selectedNode.type === 'permit' ? '取水许可证' : selectedNode.type === 'project' ? '工程/口' : '计量点' }}
              </span>
              <span class="text-xs font-bold text-slate-800 truncate max-w-[170px]">
                {{ selectedNode.data.name || selectedNode.data.title }}
              </span>
            </div>
            <button
              type="button"
              @click="selectedNode = null"
              class="text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- 属性明细列表 -->
          <div class="space-y-2 text-xs">
            <div v-if="selectedNode.data.code" class="flex justify-between">
              <span class="text-slate-400">编码/号码：</span>
              <span class="font-mono text-slate-800 font-medium">{{ selectedNode.data.code }}</span>
            </div>
            <div v-if="selectedNode.data.status" class="flex justify-between items-center">
              <span class="text-slate-400">运行状态：</span>
              <span
                class="px-2 py-0.5 rounded text-[11px] font-medium"
                :class="
                  selectedNode.data.status === '正常' ? 'bg-emerald-50 text-emerald-700' :
                  selectedNode.data.status === '故障' ? 'bg-rose-50 text-rose-700' :
                  'bg-amber-50 text-amber-700'
                "
              >
                {{ selectedNode.data.status }}
              </span>
            </div>
            <div v-if="selectedNode.data.flow" class="flex justify-between">
              <span class="text-slate-400">瞬时流量：</span>
              <span class="font-mono font-bold text-blue-700">{{ selectedNode.data.flow }}</span>
            </div>
            <div v-if="selectedNode.data.reading" class="flex justify-between">
              <span class="text-slate-400">最新表底：</span>
              <span class="font-mono font-bold text-slate-900">{{ selectedNode.data.reading }}</span>
            </div>
            <div v-if="selectedNode.data.faultReason" class="flex justify-between text-rose-600">
              <span class="text-slate-400">告警原因：</span>
              <span>{{ selectedNode.data.faultReason }}</span>
            </div>
            <div v-if="selectedNode.data.note" class="flex justify-between text-slate-500">
              <span class="text-slate-400">拓扑关系：</span>
              <span>{{ selectedNode.data.note }}</span>
            </div>
            <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>数据采集周期：5分钟</span>
              <span class="text-blue-600 cursor-pointer hover:underline" @click="handleOpenNodeDetail">调阅历史曲线</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. 弹窗底部操作与状态汇总 -->
      <div class="px-5 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
        <div class="flex items-center gap-4 text-xs text-slate-600">
          <div>
            <span class="text-slate-400">拓扑结构：</span>
            <span class="font-medium text-slate-800">1户 → 1证 → 3工程/口 → 6计量设施 (含1处直连未关联口)</span>
          </div>
          <span class="text-slate-300">|</span>
          <div>
            <span class="text-slate-400">计量在线率：</span>
            <span class="font-mono font-bold text-emerald-600">83.3% (4正常 / 1故障 / 1停用)</span>
          </div>
        </div>

        <div class="flex items-center gap-2.5">
          <button
            type="button"
            @click="handleExportImage"
            class="px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
          >
            <svg class="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>导出拓扑图</span>
          </button>

          <button
            type="button"
            @click="handleClose"
            class="px-5 py-1.5 bg-[#1677ff] hover:bg-blue-600 text-white rounded-lg text-xs font-medium transition cursor-pointer shadow-2xs"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { EnterpriseDossier } from '../../types';

const props = defineProps<{
  visible: boolean;
  dossierData?: EnterpriseDossier | null;
}>();

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void;
  (e: 'close'): void;
}>();

// 全屏状态
const isFullscreen = ref(false);

// 许可证选择（用于支持“当前取水户共2个证”）
const currentPermitIndex = ref(0);

// 画布视口平移与缩放
const viewportRef = ref<HTMLDivElement | null>(null);
const scale = ref(0.95);
const panX = ref(60);
const panY = ref(20);
const isDragging = ref(false);
const startDragX = ref(0);
const startDragY = ref(0);

// 节点详情抽屉/卡片
const selectedNode = ref<{
  type: 'user' | 'permit' | 'project' | 'meter';
  data: any;
} | null>(null);

// 动态取水权人与证照信息（优先取 props，如果没有传则取截图示例数据）
const displayOwnerName = computed(() => {
  return props.dossierData?.waterOwnerName || '青海省海东工业园区开发建设有限公司';
});

const displayCreditCode = computed(() => {
  return props.dossierData?.creditCode || '916300007104026458';
});

const displayPermitNumber = computed(() => {
  if (currentPermitIndex.value === 1) {
    return 'B630121S2023-0118';
  }
  return props.dossierData?.permitNumber || 'B630121S2020-0046';
});

// 缩放控制
const handleZoomIn = () => {
  if (scale.value < 1.8) {
    scale.value = Number((scale.value + 0.1).toFixed(2));
  }
};

const handleZoomOut = () => {
  if (scale.value > 0.5) {
    scale.value = Number((scale.value - 0.1).toFixed(2));
  }
};

const handleResetView = () => {
  scale.value = 0.95;
  panX.value = 60;
  panY.value = 20;
  selectedNode.value = null;
};

// 滚轮缩放
const handleWheel = (e: WheelEvent) => {
  const delta = e.deltaY > 0 ? -0.05 : 0.05;
  const newScale = Math.min(Math.max(scale.value + delta, 0.4), 2.0);
  scale.value = Number(newScale.toFixed(2));
};

// 鼠标拖拽平移画布
const handleMouseDown = (e: MouseEvent) => {
  if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('.z-30')) return;
  isDragging.value = true;
  startDragX.value = e.clientX - panX.value;
  startDragY.value = e.clientY - panY.value;
};

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return;
  panX.value = e.clientX - startDragX.value;
  panY.value = e.clientY - startDragY.value;
};

const handleMouseUp = () => {
  isDragging.value = false;
};

// 节点点击
const handleSelectNode = (type: 'user' | 'permit' | 'project' | 'meter', data: any) => {
  selectedNode.value = { type, data };
};

const handleOpenNodeDetail = () => {
  MessagePlugin.info({
    content: `已加载【${selectedNode.value?.data.name || selectedNode.value?.data.title}】近30天水量监测折线图与时序遥测报表`,
    duration: 3000,
  });
};

// 导出拓扑图
const handleExportImage = () => {
  MessagePlugin.success({
    content: `拓扑图导出成功：【${displayOwnerName.value}】水资源全链路拓扑图.png`,
    duration: 3000,
  });
};

// 关闭弹窗
const handleClose = () => {
  emit('update:visible', false);
  emit('close');
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
</style>
