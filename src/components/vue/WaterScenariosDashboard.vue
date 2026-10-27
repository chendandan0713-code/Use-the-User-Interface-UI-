<template>
  <div
    class="fixed inset-0 z-50 w-screen h-screen text-[#DCF2FF] flex flex-col overflow-hidden select-none transition-all duration-500"
    :style="{
      background: scenarioMode === 'comprehensive'
        ? 'radial-gradient(1200px 650px at 50% -10%, rgba(56,189,248,0.45), transparent 75%), radial-gradient(1400px 850px at 50% 50%, rgba(14,116,204,0.38), transparent 80%), radial-gradient(1600px 950px at 50% 45%, #184c82 0%, #103762 50%, #0b2648 100%)'
        : 'radial-gradient(1200px 650px at 50% -10%, rgba(56,189,248,0.38), transparent 75%), radial-gradient(1400px 850px at 50% 50%, rgba(14,116,204,0.30), transparent 80%), radial-gradient(1600px 950px at 50% 45%, #154476 0%, #0e3158 50%, #092240 100%)',
      fontFamily: 'var(--spec-cn)'
    }"
  >

    <!-- ================= 0. TECH SCREEN OUTER FRAME OVERLAY (Design Spec Section 02) ================= -->
    <svg class="absolute inset-0 w-full h-full pointer-events-none z-30" viewBox="0 0 1920 1080" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" fill="none">
      <defs>
        <!-- Left Wing Gradient -->
        <linearGradient id="specSwL" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#3FD0FF" stop-opacity="0"/>
          <stop offset="40%" stop-color="#3FD0FF" stop-opacity=".5"/>
          <stop offset="100%" stop-color="#9BEAFF" stop-opacity=".95"/>
        </linearGradient>
        <!-- Right Wing Gradient -->
        <linearGradient id="specSwR" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stop-color="#3FD0FF" stop-opacity="0"/>
          <stop offset="40%" stop-color="#3FD0FF" stop-opacity=".5"/>
          <stop offset="100%" stop-color="#9BEAFF" stop-opacity=".95"/>
        </linearGradient>
        <!-- Title Plate Gradient -->
        <linearGradient id="specPl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#144d82"/>
          <stop offset="100%" stop-color="#0a284a"/>
        </linearGradient>
        <!-- Horizontal Tick Pattern for Wings -->
        <pattern id="specTk" width="16" height="6" patternUnits="userSpaceOnUse">
          <rect width="1.5" height="6" fill="#3FD0FF" opacity=".6"/>
        </pattern>
        <!-- Vertical Tick Pattern for Side Combs -->
        <pattern id="specTkv" width="6" height="16" patternUnits="userSpaceOnUse">
          <rect width="6" height="1.5" fill="#3FD0FF" opacity=".5"/>
        </pattern>
      </defs>

      <!-- 6. 外发光层 (Outer Glow Path) -->
      <path d="M 38 18 H 1882 L 1902 38 V 1042 L 1882 1062 H 38 L 18 1042 V 38 Z" stroke="#2BA8E8" stroke-width="7" opacity=".18"/>

      <!-- 3. 主框线 (Outer Main Border - 22px Chamfers) -->
      <path d="M 38 18 H 1882 L 1902 38 V 1042 L 1882 1062 H 38 L 18 1042 V 38 Z" stroke="#60D6FF" stroke-opacity=".75" stroke-width="1.4"/>

      <!-- 3. 内框线 (Inner Secondary Border - 9px Offset) -->
      <path d="M 44 27 H 1876 L 1893 44 V 1036 L 1876 1053 H 44 L 27 1036 V 44 Z" stroke="#60D6FF" stroke-opacity=".28" stroke-width="1"/>

      <!-- 4. L形角标 (Outer Layer 2px, stroke-opacity .8) -->
      <g stroke="#7FE3FF" stroke-opacity=".8" stroke-width="2">
        <path d="M 8 78 V 8 H 78" />
        <path d="M 1842 8 H 1912 V 78" />
        <path d="M 8 1002 V 1072 H 78" />
        <path d="M 1912 1002 V 1072 H 1842" />
      </g>

      <!-- 4. 内侧辅助角线 (Inner Layer 1px, stroke-opacity .35) -->
      <g stroke="#7FE3FF" stroke-opacity=".35" stroke-width="1">
        <path d="M 8 118 V 8 M 8 8 H 118" />
        <path d="M 1802 8 H 1912 M 1912 8 V 118" />
        <path d="M 8 962 V 1072 M 8 1072 H 118" />
        <path d="M 1912 962 V 1072 M 1802 1072 H 1912" />
      </g>

      <!-- 4. 切角斜边高亮 (Chamfer Highlight Lines) -->
      <g stroke="#8CE8FF" stroke-width="2.6" stroke-linecap="round" stroke-opacity=".95">
        <path d="M 35 21 L 21 35" />
        <path d="M 1885 21 L 1899 35" />
        <path d="M 21 1045 L 35 1059" />
        <path d="M 1899 1045 L 1885 1059" />
      </g>

      <!-- 4. 四角端头高光点 (Corner Terminal Dots) -->
      <g fill="#B7F2FF">
        <circle cx="12" cy="12" r="2.2" />
        <circle cx="1908" cy="12" r="2.2" />
        <circle cx="12" cy="1068" r="2.2" />
        <circle cx="1908" cy="1068" r="2.2" />
      </g>

      <!-- 5. 侧边梳齿与刻度 (Side Comb Ticks - 节距 16px) -->
      <rect x="9" y="452" width="5" height="176" fill="url(#specTkv)" />
      <rect x="1906" y="452" width="5" height="176" fill="url(#specTkv)" />
      <g stroke="#7FE3FF" stroke-opacity=".35" stroke-width="1">
        <path d="M 17 172 H 28 M 17 196 H 28 M 17 220 H 28" />
        <path d="M 1903 172 H 1892 M 1903 196 H 1892 M 1903 220 H 1892" />
      </g>

      <!-- 2. 双侧翼 (Top Dual Wings) -->
      <!-- Left Wing -->
      <line x1="56" y1="36" x2="664" y2="36" stroke="url(#specSwL)" stroke-width="1.8" />
      <line x1="120" y1="44" x2="664" y2="44" stroke="url(#specSwL)" stroke-width="1" opacity=".45" />
      <rect x="150" y="30" width="300" height="6" fill="url(#specTk)" opacity=".8" />
      <path d="M 650 32 L 656 36 L 650 40 L 644 36 Z" fill="#B7F2FF" />

      <!-- Right Wing -->
      <line x1="1864" y1="36" x2="1256" y2="36" stroke="url(#specSwR)" stroke-width="1.8" />
      <line x1="1800" y1="44" x2="1256" y2="44" stroke="url(#specSwR)" stroke-width="1" opacity=".45" />
      <rect x="1470" y="30" width="300" height="6" fill="url(#specTk)" opacity=".8" />
      <path d="M 1270 32 L 1276 36 L 1270 40 L 1264 36 Z" fill="#B7F2FF" />

      <!-- 1. 六角名匾 (Title Plate) - 560×62px, 居中 -->
      <path d="M 698 8 H 1222 L 1256 38 L 1222 68 H 698 L 664 38 Z" fill="url(#specPl)" stroke="#54DAFF" stroke-width="1.8" stroke-opacity=".95" />
      <path d="M 708 16 H 1212 L 1238 38 L 1212 60 H 708 L 682 38 Z" stroke="#7FE3FF" stroke-opacity=".38" stroke-width="1" />
      <!-- 名匾底部亮线 -->
      <line x1="820" y1="69" x2="1100" y2="69" stroke="#B7F2FF" stroke-width="2" stroke-opacity=".95" />

      <!-- 底部收口构件 (Bottom Chin) -->
      <path d="M 858 1062 H 1062 L 1042 1046 H 878 Z" fill="#08243E" stroke="#4FD8FF" stroke-opacity=".6" stroke-width="1.2" />
      <line x1="900" y1="1054" x2="1020" y2="1054" stroke="#9BEAFF" stroke-width="1.6" stroke-opacity=".85" />
      <circle cx="960" cy="1054" r="2.2" fill="#D8F8FF" />
    </svg>

    <!-- ================= 1. TOP GLOBAL NAVIGATION & TITLE BAR ================= -->
    <header
      id="dev-anno-1"
      class="relative px-8 xl:px-12 2xl:px-16 pt-2 pb-1.5 shrink-0 z-40 flex items-center justify-between pointer-events-auto transition-all duration-300"
      :class="{ 'ring-2 ring-[#FFB800] shadow-[0_0_24px_rgba(255,184,0,0.65)]': activeAnnotationId === 1 }"
    >
      <!-- Numbered Point 1 Badge (顶部标签栏 / 全局控制) -->
      <div
        v-if="showAnnotationBadges && scenarioMode === 'comprehensive'"
        class="absolute top-1.5 left-2 z-50 flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-[#FFD043] to-[#FF9F00] text-[#0A1626] font-extrabold text-xs shadow-[0_0_12px_rgba(255,184,0,0.95)] border-2 border-white cursor-pointer select-none transition-all duration-300 hover:scale-125"
        :class="{ 'scale-125 ring-4 ring-[#FFB800]/60 animate-bounce': activeAnnotationId === 1 }"
        @mouseenter="activeAnnotationId = 1"
        @mouseleave="activeAnnotationId = null"
        @click="scrollToAnnotation(1)"
        title="开发标注 #1: 顶部标签栏 / 全局控制 (点击查看说明)"
      >
        1
      </div>
      
      <!-- Top Center: 六角名匾平台标题 (绝对居中于名匾内) -->
      <div class="absolute top-2 inset-x-0 flex flex-col items-center justify-center pointer-events-none z-50">
        <div class="flex items-center gap-2 drop-shadow-[0_2px_8px_rgba(63,208,255,0.7)]">
          <span class="w-2 h-2 rounded-full bg-[#9BEAFF] animate-pulse"></span>
          <h1 class="text-xl 2xl:text-2xl font-bold tracking-[4px] bg-gradient-to-b from-white via-[#DCF2FF] to-[#79D8FF] bg-clip-text text-transparent">
            西宁市取用水管理平台
          </h1>
        </div>
        <div class="text-[10px] text-[#8FB6D4] font-spec-num tracking-[2px] -mt-0.5 opacity-90">
          COMPREHENSIVE SCENARIO COMMAND CENTER
        </div>
      </div>

      <!-- Top Left: 平台Logo + 5大核心导航 Tab -->
      <div class="flex items-center gap-3">
        <!-- Glowing Hexagon Droplet Logo -->
        <div class="relative w-8 h-8 flex items-center justify-center shrink-0">
          <div class="absolute inset-0 bg-[#3FD0FF]/25 rounded-md blur-xs"></div>
          <div class="relative w-7 h-7 rounded-md bg-gradient-to-br from-[#3FD0FF] to-[#1E7BE8] flex items-center justify-center text-white shadow-md border border-[#9BEAFF]/60">
            <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" opacity="0.9" />
              <path d="M12 7l2.8 2.8a3.8 3.8 0 1 1-5.6 0z" fill="#ffffff" />
            </svg>
          </div>
        </div>

        <!-- 5 Master Navigation Tabs (Sleek Tech Bar) -->
        <nav class="flex items-center gap-1.5 bg-[#06182c]/80 p-1 rounded border border-[#46B4EB]/25 backdrop-blur-md">
          <!-- Tab 1: 综合应用场景 (Active Glowing Spec Tag) -->
          <div class="relative px-3.5 py-1 rounded bg-[#0b2b4c] border border-[#3FD0FF] text-[#E4F6FF] font-semibold text-xs tracking-wide shadow-[0_0_12px_rgba(63,208,255,0.45)] flex items-center gap-1.5 cursor-pointer">
            <span class="w-1.5 h-1.5 rounded-full bg-[#3FD0FF] shadow-[0_0_6px_#3FD0FF]"></span>
            <span>综合应用场景</span>
          </div>

          <!-- Tab 2: 取用水量核算 -->
          <button
            type="button"
            @click="navigate('irrigation_accounting')"
            class="px-3 py-1 text-[#8FB6D4] hover:text-[#DCF2FF] hover:bg-white/5 rounded text-xs font-medium transition cursor-pointer"
          >
            取用水量核算
          </button>

          <!-- Tab 3: 数据归集 -->
          <button
            type="button"
            @click="navigate('manual_collection')"
            class="px-3 py-1 text-[#8FB6D4] hover:text-[#DCF2FF] hover:bg-white/5 rounded text-xs font-medium transition cursor-pointer"
          >
            数据归集
          </button>

          <!-- Tab 4: 取用水户数据资源规范化整合 -->
          <button
            type="button"
            @click="navigate('enterprise_dossier')"
            class="px-3 py-1 text-[#8FB6D4] hover:text-[#DCF2FF] hover:bg-white/5 rounded text-xs font-medium transition cursor-pointer"
          >
            数据资源规范化整合
          </button>

          <!-- Tab 5: 数据治理及质量控制 -->
          <button
            type="button"
            @click="navigate('violation_national')"
            class="px-3 py-1 text-[#8FB6D4] hover:text-[#DCF2FF] hover:bg-white/5 rounded text-xs font-medium transition cursor-pointer"
          >
            数据治理与质控
          </button>
        </nav>
      </div>

      <!-- Top Right: Notification & Weather & Realtime Clock & Actions -->
      <div class="flex items-center gap-3 text-xs font-spec-num text-[#8FB6D4] z-50">
        
        <!-- Notifications Bell with Red Badge 12 -->
        <div class="relative cursor-pointer hover:opacity-85 transition p-1" @click="showWarningModal = true" title="常态化预警与工单调度">
          <svg class="w-4 h-4 text-[#8FB6D4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span class="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full bg-[#FF6B7A] text-white text-[9.5px] font-bold border border-[#061423] font-spec-num shadow-[0_0_8px_rgba(255,107,122,0.8)]">
            12
          </span>
        </div>

        <!-- Weather Chip -->
        <div class="spec-tag flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5 text-[#FFC65C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
          </svg>
          <span class="font-bold text-[#DCF2FF]">18℃</span>
        </div>

        <!-- Realtime Clock & Date -->
        <div class="spec-tag flex items-center gap-2">
          <span class="font-bold text-[#DCF2FF] tracking-wider">{{ currentTimeStr }}</span>
          <div class="flex items-center gap-1 text-[10.5px] text-[#8FB6D4] font-spec-cn">
            <span>2025-05-20</span>
            <span>星期二</span>
          </div>
        </div>

        <!-- Fullscreen / Return Workbench Icon Buttons -->
        <div class="flex items-center gap-1.5 pl-1">
          <button
            type="button"
            @click="toggleFullscreen"
            class="spec-tag p-1.5 text-[#8FB6D4] hover:text-[#DCF2FF] transition cursor-pointer"
            title="全屏切换"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
            </svg>
          </button>

          <!-- Back to Workbench button -->
          <button
            type="button"
            @click="navigate('home')"
            class="spec-tag px-2.5 py-1 text-[#DCF2FF] hover:bg-[#3FD0FF]/15 transition cursor-pointer flex items-center gap-1 font-spec-cn"
            title="返回标准工作台"
          >
            <svg class="w-3 h-3 text-[#3FD0FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>工作台</span>
          </button>
        </div>

      </div>
    </header>

    <!-- ================= 2. MAIN WORKSPACE: 3 COLUMNS + CENTRAL GIS DIGITAL TWIN ================= -->
    <main class="flex-1 relative min-h-0 overflow-hidden flex gap-3 xl:gap-4 2xl:gap-6 px-6 xl:px-10 2xl:px-14 pb-5 xl:pb-6 2xl:pb-7 pt-1">
      
      <!-- Central GIS Satellite Vector & Contour Map (Background Layer) -->
      
      <!-- Central GIS Satellite Vector & Contour Map (Background Layer) -->
      <div class="absolute inset-0 z-0 bg-[#092548] overflow-hidden">
        
        <!-- Satellite Terrain Gradients & Contours (大屏背景亮蓝色质感提升) -->
        <div
          class="absolute inset-0 transition-all duration-500"
          :class="scenarioMode === 'comprehensive'
            ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1c5a98] via-[#123e6d] to-[#0b284a]'
            : 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#184e85] via-[#0f3660] to-[#092342]'"
        ></div>
        
        <!-- Subtle Topographic Contour Lines (大屏等高线纹理提亮) -->
        <svg
          class="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500"
          :class="scenarioMode === 'comprehensive' ? 'opacity-45' : 'opacity-30'"
          xmlns="http://www.w3.org/2000/svg"
        >
          <pattern id="topo-grid" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M 0 60 Q 30 10 60 60 T 120 60" fill="none" stroke="#38bdf8" stroke-width="0.6" />
            <path d="M 0 20 Q 30 70 60 20 T 120 20" fill="none" stroke="#0284c7" stroke-width="0.6" />
            <path d="M 0 100 Q 30 50 60 100 T 120 100" fill="none" stroke="#0369a1" stroke-width="0.6" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#topo-grid)" />
        </svg>

        <!-- GIS SVG Map of Xining (Surrounded by glowing neon cyan border) -->
        <div class="absolute inset-0 flex items-center justify-center p-6 pointer-events-none">
          <svg viewBox="0 0 1000 760" class="w-full h-full max-h-[88vh] overflow-visible pointer-events-auto">
            <defs>
              <!-- Glowing neon drop shadow filter for Xining boundary -->
              <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <!-- Warning Red Glow Filter for Exceeded District Boundaries (直报水量 > 计划水量, 降低饱和度, 仅边缘优先级凸显) -->
              <filter id="red-warning-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feFlood flood-color="#f87171" flood-opacity="0.65" result="color" />
                <feComposite in2="blur" operator="in" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <!-- Water body gradient -->
              <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#0284c7" stop-opacity="0.8" />
                <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.9" />
              </linearGradient>

              <!-- Terrain Elevation Texture Pattern (大屏背景亮蓝色质感提升) -->
              <radialGradient id="terrainGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" :stop-color="scenarioMode === 'comprehensive' ? '#2e75bc' : '#225d98'" :stop-opacity="scenarioMode === 'comprehensive' ? '0.95' : '0.9'" />
                <stop offset="45%" :stop-color="scenarioMode === 'comprehensive' ? '#1f5791' : '#174778'" :stop-opacity="scenarioMode === 'comprehensive' ? '0.9' : '0.85'" />
                <stop offset="100%" :stop-color="scenarioMode === 'comprehensive' ? '#154272' : '#10375f'" :stop-opacity="scenarioMode === 'comprehensive' ? '0.95' : '0.9'" />
              </radialGradient>
            </defs>

            <!-- Huangshui River & Tributaries Blue Line Network (Real River System) -->
            <g stroke="url(#riverGrad)" fill="none" stroke-linecap="round" opacity="0.8">
              <!-- Huangshui River main trunk (West to East) -->
              <path d="M 330 460 Q 400 480 480 485 T 600 490 T 660 500 T 715 535" stroke-width="4.2" />
              <!-- Beichuan River (North Datong to Center) -->
              <path d="M 490 120 Q 510 240 550 360 T 630 485" stroke-width="2.6" />
              <!-- Nanchuan River (South Huangzhong to Center) -->
              <path d="M 540 650 Q 560 590 590 540 T 630 495" stroke-width="2.8" />
              <!-- Tributaries -->
              <path d="M 360 410 Q 400 440 430 480" stroke-width="1.8" />
              <path d="M 670 410 Q 660 450 655 495" stroke-width="1.8" />
            </g>

            <!-- 1. Real GIS Outer Boundary with Glowing Neon Cyan Contour -->
            <path
              :d="xiningOuterBoundaryPath"
              fill="url(#terrainGrad)"
              stroke="#00e5ff"
              stroke-width="3"
              stroke-linejoin="round"
              filter="url(#neon-glow)"
              class="transition-all duration-300 pointer-events-none"
            />

            <!-- 2. Real GIS Sub-district Internal Boundaries (综合场景按水量使用情况4个等级着色标记) -->
            <g>
              <path
                v-for="district in xiningDistrictsGeo"
                :key="district.adcode"
                :d="district.path"
                :fill="getDistrictFill(district.name)"
                :fill-opacity="getDistrictFillOpacity(district.name)"
                :stroke="getDistrictStroke(district.name)"
                :stroke-width="getDistrictStrokeWidth(district.name)"
                :filter="isDirectReportExceeded(district.name) ? 'url(#red-warning-glow)' : undefined"
                stroke-linejoin="round"
                class="transition-all duration-200 cursor-pointer"
                @mouseenter="hoveredDistrictName = district.name"
                @mouseleave="hoveredDistrictName = null"
                @click="filterParams.district = normalizeDistrictName(district.name)"
              >
                <title>{{ normalizeDistrictName(district.name) }} - 计划: {{ getDistrictQuota(district.name).planned }}万m³, 直报: {{ getDistrictQuota(district.name).reported }}万m³ ({{ isDirectReportExceeded(district.name) ? '直报超计划！边缘红色标记' : '正常合规' }})</title>
              </path>
            </g>

            <!-- 2.1 行政区划边缘用红色标记：直报水量大于计划水量置顶高亮红边层 (仅边框优先级凸显，内部不填色，低饱和度柔和红边) -->
            <g v-if="activeLayers.quotaWarning" class="pointer-events-none">
              <path
                v-for="district in xiningDistrictsGeo.filter(d => isDirectReportExceeded(d.name))"
                :key="'exceeded-boundary-' + district.adcode"
                :d="district.path"
                fill="none"
                stroke="#f87171"
                :stroke-width="filterParams.district === normalizeDistrictName(district.name) || hoveredDistrictName === district.name ? 3.0 : 2.4"
                stroke-linejoin="round"
                stroke-linecap="round"
                filter="url(#red-warning-glow)"
                class="transition-all duration-300"
              />
            </g>

            <!-- 3. Central Prominent Label: 西宁市 -->
            <text x="638" y="488" fill="#ffffff" font-size="20" font-weight="900" text-anchor="middle" filter="drop-shadow(0 2px 6px rgba(0,0,0,0.9))" pointer-events="none">
              西宁市
            </text>

            <!-- 4. District Name & Overall Arrival Rate (区名直接落在区域内，下方展示整体到报率) -->
            <g
              v-for="district in xiningDistrictsGeo"
              :key="'label-' + district.adcode"
              :transform="getDistrictBadgeTransform(district)"
            >
              <g
                class="cursor-pointer select-none"
                @click="filterParams.district = normalizeDistrictName(district.name)"
                @mouseenter="hoveredDistrictName = district.name"
                @mouseleave="hoveredDistrictName = null"
              >
                <text
                  x="0"
                  y="-3"
                  fill="#ffffff"
                  font-size="12"
                  font-weight="bold"
                  text-anchor="middle"
                  filter="drop-shadow(0 2px 5px rgba(0,0,0,0.95))"
                  pointer-events="none"
                >
                  {{ normalizeDistrictName(district.name) }}
                </text>
                <text
                  v-if="activeLayers.arrivalRate"
                  x="0"
                  y="11"
                  fill="#9BEAFF"
                  font-size="9.5"
                  font-weight="bold"
                  text-anchor="middle"
                  font-family="monospace"
                  filter="drop-shadow(0 1px 3px rgba(0,0,0,0.95))"
                  pointer-events="none"
                >
                  到报率 {{ getDistrictArrivalRate(district.name).overallReportRate }}%
                </text>
              </g>
            </g>

            <!-- 5. 综合应用场景：区县悬浮详细水量卡片 (跟随光标区划即时提示) -->
            <g
              v-if="hoveredDistrictName && !activeLayers.arrivalRate"
              :transform="(() => {
                const geo = xiningDistrictsGeo.find(d => d.name === hoveredDistrictName || normalizeDistrictName(d.name) === normalizeDistrictName(hoveredDistrictName));
                const cx = geo ? geo.center[0] : 500;
                const cy = geo ? geo.center[1] - 46 : 300;
                return `translate(${cx}, ${cy})`;
              })()"
              pointer-events="none"
              class="transition-opacity duration-150 select-none"
            >
              <rect
                x="-105"
                y="-44"
                width="210"
                height="44"
                rx="6"
                fill="#051326"
                fill-opacity="0.96"
                :stroke="isDirectReportExceeded(hoveredDistrictName) ? '#f87171' : getDistrictStroke(hoveredDistrictName)"
                :stroke-width="isDirectReportExceeded(hoveredDistrictName) ? 1.5 : 1.2"
                filter="drop-shadow(0 6px 16px rgba(0,0,0,0.85))"
              />
              <polygon
                points="0,0 -5,-5 5,-5"
                fill="#051326"
                :stroke="isDirectReportExceeded(hoveredDistrictName) ? '#f87171' : getDistrictStroke(hoveredDistrictName)"
                stroke-width="1.2"
              />

              <!-- Header row -->
              <circle cx="-92" cy="-28" r="3.5" :fill="isDirectReportExceeded(hoveredDistrictName) ? '#f87171' : getDistrictFill(hoveredDistrictName)" />
              <text x="-82" y="-25" fill="#ffffff" font-size="11" font-weight="bold">
                {{ normalizeDistrictName(hoveredDistrictName) }}
              </text>
              <text
                x="-22"
                y="-25"
                :fill="getDistrictTier(hoveredDistrictName)?.strokeColor || '#38bdf8'"
                font-size="9"
                font-weight="bold"
              >
                {{ getDistrictTier(hoveredDistrictName)?.label || '用水监测' }}
              </text>
              <text
                v-if="isDirectReportExceeded(hoveredDistrictName)"
                x="95"
                y="-25"
                text-anchor="end"
                fill="#fb7185"
                font-size="9.5"
                font-weight="bold"
              >
                ⚠️ 直报超计划 {{ (getDistrictQuota(hoveredDistrictName).reported - getDistrictQuota(hoveredDistrictName).planned).toFixed(1) }}万m³
              </text>
              <text
                v-else
                x="95"
                y="-25"
                text-anchor="end"
                fill="#10b981"
                font-size="9.5"
                font-weight="bold"
              >
                ✓ 计划余量 {{ (getDistrictQuota(hoveredDistrictName).planned - getDistrictQuota(hoveredDistrictName).reported).toFixed(1) }}万m³
              </text>

              <!-- Data row -->
              <text x="-92" y="-9" fill="#94a3b8" font-size="9" font-family="monospace">
                计划水量: <tspan fill="#e2e8f0" font-weight="bold">{{ getDistrictQuota(hoveredDistrictName).planned }}</tspan>万m³
              </text>
              <text x="5" y="-9" fill="#94a3b8" font-size="9" font-family="monospace">
                直报水量: <tspan :fill="isDirectReportExceeded(hoveredDistrictName) ? '#ef4444' : '#38bdf8'" font-weight="bold">{{ getDistrictQuota(hoveredDistrictName).reported }}</tspan>万m³
              </text>
            </g>

            <!-- 5.1 到报率图层悬浮弹窗：证照维度 / 在线计量 / 非在线计量 -->
            <g
              v-if="hoveredDistrictName && activeLayers.arrivalRate"
              :transform="getArrivalPopupTransform(hoveredDistrictName)"
              pointer-events="none"
              class="transition-opacity duration-150 select-none"
            >
              <rect
                x="-154"
                y="0"
                width="308"
                height="172"
                rx="7"
                fill="#051326"
                fill-opacity="0.97"
                stroke="#2BA8E8"
                stroke-width="1.2"
                filter="drop-shadow(0 8px 18px rgba(0,0,0,0.85))"
              />
              <circle cx="-138" cy="18" r="3.5" fill="#34d399" />
              <text x="-128" y="21" fill="#ffffff" font-size="11" font-weight="bold">
                {{ normalizeDistrictName(hoveredDistrictName) }}
              </text>
              <text x="140" y="21" fill="#9BEAFF" font-size="11" font-weight="bold" text-anchor="end" font-family="monospace">
                整体到报率 {{ getDistrictArrivalRate(hoveredDistrictName).overallReportRate }}%
              </text>
              <line x1="-140" y1="29" x2="140" y2="29" stroke="rgba(70,180,235,0.25)" stroke-width="1" />

              <!-- 证照维度 -->
              <text x="-140" y="45" fill="#ffffff" font-size="9" font-weight="bold">证照维度</text>
              <text x="-140" y="61" fill="#7f9bb8" font-size="8.5">应接证照数量</text>
              <text x="-48" y="61" fill="#e2e8f0" font-size="8.5" text-anchor="end" font-family="monospace">{{ getDistrictArrivalRate(hoveredDistrictName).certDue }}</text>
              <text x="-140" y="77" fill="#7f9bb8" font-size="8.5">已接证照数</text>
              <text x="-48" y="77" fill="#e2e8f0" font-size="8.5" text-anchor="end" font-family="monospace">{{ getDistrictArrivalRate(hoveredDistrictName).certConnected }}</text>
              <text x="-140" y="93" fill="#7f9bb8" font-size="8.5">证照接入率</text>
              <text x="-48" y="93" fill="#9BEAFF" font-size="8.5" text-anchor="end" font-family="monospace">{{ getDistrictArrivalRate(hoveredDistrictName).certAccessRate }}%</text>

              <!-- 在线计量接入情况 -->
              <text x="-34" y="45" fill="#ffffff" font-size="9" font-weight="bold">在线计量接入情况</text>
              <text x="-34" y="61" fill="#7f9bb8" font-size="8.5">计量接入率</text>
              <text x="52" y="61" fill="#e2e8f0" font-size="8.5" text-anchor="end" font-family="monospace">{{ getDistrictArrivalRate(hoveredDistrictName).onlineAccessRate }}%</text>
              <text x="-34" y="77" fill="#7f9bb8" font-size="8.5">计量到报率</text>
              <text x="52" y="77" fill="#9BEAFF" font-size="8.5" text-anchor="end" font-family="monospace">{{ getDistrictArrivalRate(hoveredDistrictName).onlineReportRate }}%</text>

              <!-- 非在线计量接入情况 -->
              <text x="68" y="45" fill="#ffffff" font-size="9" font-weight="bold">非在线计量接入情况</text>
              <text x="68" y="61" fill="#7f9bb8" font-size="8.5">计量接入率</text>
              <text x="140" y="61" fill="#e2e8f0" font-size="8.5" text-anchor="end" font-family="monospace">{{ getDistrictArrivalRate(hoveredDistrictName).offlineAccessRate }}%</text>
              <text x="68" y="77" fill="#7f9bb8" font-size="8.5">计量到报率</text>
              <text x="140" y="77" fill="#9BEAFF" font-size="8.5" text-anchor="end" font-family="monospace">{{ getDistrictArrivalRate(hoveredDistrictName).offlineReportRate }}%</text>
            </g>

            <!-- 6. Dynamic Interactive Map Layers (点位图层：仅在专项业务应用场景展示，综合应用场景不展示点位) -->
            
            <!-- Layer B: 用水户图层 (规上工业、现代化灌区、自来水厂 - 标点小巧精致) -->
            <g v-if="scenarioMode === 'comprehensive' && activeLayers.users">
              <g
                v-for="user in waterUsersList"
                :key="'user-' + user.id"
                :transform="`translate(${user.x}, ${user.y})`"
                class="cursor-pointer transition-transform duration-150 hover:scale-125"
                @click="filterParams.district = user.district"
              >
                <!-- 超计划取水户红色虚线提醒环 -->
                <circle
                  v-if="user.actualVolume > user.quotaVolume"
                  cx="0"
                  cy="0"
                  r="7"
                  fill="none"
                  stroke="#FF6B7A"
                  stroke-width="1.6"
                  stroke-dasharray="2 1.5"
                  filter="drop-shadow(0 0 5px rgba(255,107,122,0.9))"
                />
                <!-- 规上工业点: 纤巧菱形蓝色徽标 -->
                <polygon
                  v-if="user.industry === 'industry'"
                  points="0,-4.5 4,0 0,4.5 -4,0"
                  fill="#38bdf8"
                  fill-opacity="0.9"
                  stroke="#ffffff"
                  stroke-width="0.8"
                  filter="drop-shadow(0 1px 3px rgba(0,0,0,0.8))"
                />
                <!-- 现代化灌区: 纤巧青色方标 -->
                <rect
                  v-else-if="user.industry === 'agriculture'"
                  x="-3.5"
                  y="-3.5"
                  width="7"
                  height="7"
                  rx="1.5"
                  fill="#00e5ff"
                  fill-opacity="0.85"
                  stroke="#ffffff"
                  stroke-width="0.8"
                  filter="drop-shadow(0 1px 3px rgba(0,0,0,0.8))"
                />
                <!-- 自来水厂: 纤巧紫蓝色圆标 -->
                <circle
                  v-else
                  cx="0"
                  cy="0"
                  r="3.5"
                  fill="#818cf8"
                  fill-opacity="0.9"
                  stroke="#ffffff"
                  stroke-width="0.8"
                  filter="drop-shadow(0 1px 3px rgba(0,0,0,0.8))"
                />
              </g>
            </g>

            <!-- Layer C: 预警事件图层 (高风险红 / 中风险橙 / 低风险黄，纤巧紧凑雷达波) -->
            <g v-if="scenarioMode !== 'comprehensive' && activeLayers.warnings">
              <g
                v-for="w in warningEventsList"
                :key="'warn-' + w.id"
                :transform="`translate(${w.x}, ${w.y})`"
                class="cursor-pointer transition-transform duration-150 hover:scale-125"
                @click="handleEventClick(w.title)"
              >
                <circle
                  cx="0"
                  cy="0"
                  :r="w.level === 'red' ? 7.5 : 6"
                  :fill="w.level === 'red' ? '#ef4444' : w.level === 'orange' ? '#f97316' : '#f59e0b'"
                  fill-opacity="0.35"
                  class="animate-ping"
                />
                <circle
                  cx="0"
                  cy="0"
                  :r="w.level === 'red' ? 4 : 3.2"
                  :fill="w.level === 'red' ? '#dc2626' : w.level === 'orange' ? '#ea580c' : '#d97706'"
                  stroke="#ffffff"
                  stroke-width="1"
                  filter="drop-shadow(0 1px 4px rgba(0,0,0,0.9))"
                />
                <!-- 告警感叹标 (微型精致) -->
                <line x1="0" y1="-1.6" x2="0" y2="0.5" stroke="#ffffff" stroke-width="0.9" stroke-linecap="round" />
                <circle cx="0" cy="1.6" r="0.45" fill="#ffffff" />
              </g>
            </g>

            <!-- Layer A: 计量点图层 (用颜色严格区分: 正常(绿)、故障(红)、待检定(黄) - 标点小巧紧凑) -->
            <g v-if="scenarioMode !== 'comprehensive' && activeLayers.meters">
              <g
                v-for="meter in filteredMeterPoints"
                :key="'meter-' + meter.id"
                :transform="`translate(${meter.x}, ${meter.y})`"
                class="cursor-pointer"
                @click="openMeterDetail(meter)"
                @mouseenter="hoveredMeterPoint = meter"
                @mouseleave="hoveredMeterPoint = null"
              >
                <!-- 透明碰撞层 (Hit Area): 适中鼠标捕获半径，防止悬浮抖动 -->
                <circle cx="0" cy="0" r="14" fill="transparent" />

                <!-- 悬浮高亮外光晕 (小巧平滑渐变) -->
                <circle
                  v-if="hoveredMeterPoint?.id === meter.id"
                  cx="0"
                  cy="0"
                  r="7"
                  fill="none"
                  stroke="#00e5ff"
                  stroke-width="1.2"
                  stroke-opacity="0.8"
                  filter="drop-shadow(0 0 3px #00e5ff)"
                  pointer-events="none"
                />

                <!-- 1. 正常状态 (Normal): 翠绿纤细光圈与稳态微绿核 -->
                <template v-if="meter.meterStatus === 'normal'">
                  <circle
                    cx="0"
                    cy="0"
                    r="4.8"
                    fill="#10b981"
                    fill-opacity="0.15"
                    stroke="#10b981"
                    stroke-width="0.7"
                    stroke-opacity="0.6"
                    pointer-events="none"
                  />
                  <circle
                    cx="0"
                    cy="0"
                    r="2.8"
                    fill="#10b981"
                    stroke="#ffffff"
                    stroke-width="0.9"
                    filter="drop-shadow(0 1px 3px rgba(0,0,0,0.8))"
                    pointer-events="none"
                  />
                  <circle cx="0" cy="0" r="0.7" fill="#ffffff" pointer-events="none" />
                </template>

                <!-- 2. 故障状态 (Fault): 警示红环与警示微红核 -->
                <template v-else-if="meter.meterStatus === 'fault'">
                  <circle
                    cx="0"
                    cy="0"
                    r="5.2"
                    fill="#ef4444"
                    fill-opacity="0.2"
                    stroke="#ef4444"
                    stroke-width="0.7"
                    pointer-events="none"
                  />
                  <circle
                    cx="0"
                    cy="0"
                    r="3.2"
                    fill="#dc2626"
                    stroke="#ffffff"
                    stroke-width="0.9"
                    filter="drop-shadow(0 1px 3px rgba(220,38,38,0.9))"
                    pointer-events="none"
                  />
                  <!-- 白色微叉标 -->
                  <line x1="-1.1" y1="-1.1" x2="1.1" y2="1.1" stroke="#ffffff" stroke-width="0.9" stroke-linecap="round" pointer-events="none" />
                  <line x1="1.1" y1="-1.1" x2="-1.1" y2="1.1" stroke="#ffffff" stroke-width="0.9" stroke-linecap="round" pointer-events="none" />
                </template>

                <!-- 3. 待检定状态 (Pending): 橙黄色虚线定检外环与黄色内质微核 -->
                <template v-else-if="meter.meterStatus === 'pending'">
                  <circle
                    cx="0"
                    cy="0"
                    r="5.2"
                    fill="#f59e0b"
                    fill-opacity="0.15"
                    stroke="#f59e0b"
                    stroke-width="0.7"
                    stroke-dasharray="2 1.5"
                    pointer-events="none"
                  />
                  <circle
                    cx="0"
                    cy="0"
                    r="3.0"
                    fill="#f59e0b"
                    stroke="#ffffff"
                    stroke-width="0.9"
                    filter="drop-shadow(0 1px 3px rgba(245,158,11,0.8))"
                    pointer-events="none"
                  />
                  <!-- 定检表盘微时针刻画 -->
                  <line x1="0" y1="-1.2" x2="0" y2="0" stroke="#ffffff" stroke-width="0.8" stroke-linecap="round" pointer-events="none" />
                  <line x1="0" y1="0" x2="1.0" y2="0.6" stroke="#ffffff" stroke-width="0.8" stroke-linecap="round" pointer-events="none" />
                </template>
              </g>

              <!-- 计量点悬停即时信息浮窗 (Hover Tooltip Pin, 紧随微标点) -->
              <g
                v-if="hoveredMeterPoint"
                :transform="`translate(${hoveredMeterPoint.x}, ${hoveredMeterPoint.y - 18})`"
                pointer-events="none"
                class="transition-opacity duration-150 select-none pointer-events-none"
              >
                <!-- Tooltip 背景卡片 -->
                <rect
                  x="-110"
                  y="-62"
                  width="220"
                  height="58"
                  rx="6"
                  fill="#06152b"
                  fill-opacity="0.96"
                  stroke="#00e5ff"
                  stroke-width="1.2"
                  filter="drop-shadow(0 4px 12px rgba(0,0,0,0.8))"
                  pointer-events="none"
                />
                <!-- 小三角指针 -->
                <polygon points="0,0 -5,-4 5,-4" fill="#06152b" stroke="#00e5ff" stroke-width="1.2" pointer-events="none" />

                <!-- 状态徽标与编码 -->
                <circle
                  cx="-95"
                  cy="-45"
                  r="3.5"
                  :fill="hoveredMeterPoint.meterStatus === 'normal' ? '#10b981' : hoveredMeterPoint.meterStatus === 'fault' ? '#ef4444' : '#f59e0b'"
                  pointer-events="none"
                />
                <text x="-85" y="-42" fill="#00e5ff" font-size="10" font-family="monospace" font-weight="bold" pointer-events="none">
                  {{ hoveredMeterPoint.meterCode }}
                </text>
                <text
                  x="96"
                  y="-42"
                  text-anchor="end"
                  :fill="hoveredMeterPoint.meterStatus === 'normal' ? '#34d399' : hoveredMeterPoint.meterStatus === 'fault' ? '#f87171' : '#fbbf24'"
                  font-size="10"
                  font-weight="bold"
                  pointer-events="none"
                >
                  {{ hoveredMeterPoint.meterStatus === 'normal' ? '● 正常' : hoveredMeterPoint.meterStatus === 'fault' ? '▲ 故障' : '◆ 待检定' }}
                </text>

                <!-- 测站名称 -->
                <text x="-95" y="-28" fill="#ffffff" font-size="11" font-weight="bold" pointer-events="none">
                  {{ hoveredMeterPoint.name.length > 15 ? hoveredMeterPoint.name.slice(0, 15) + '...' : hoveredMeterPoint.name }}
                </text>

                <!-- 器具类型与点击提示 -->
                <text x="-95" y="-12" fill="#94a3b8" font-size="9" pointer-events="none">
                  {{ hoveredMeterPoint.deviceType.slice(0, 14) }} · 点击查看详情
                </text>
              </g>
            </g>
          </svg>
        </div>

      </div>

      <!-- ================= 3. LEFT COLUMN (区域用水态势分析) ================= -->
      <aside
        class="relative z-20 w-[395px] xl:w-[415px] 2xl:w-[440px] h-full p-1 xl:p-1.5 gap-2.5 pointer-events-auto shrink-0 overflow-y-auto custom-dark-scrollbar"
        :class="scenarioMode === 'comprehensive' ? 'grid grid-rows-[2fr_1fr]' : 'flex flex-col'"
      >
        
        <!-- A. 综合应用场景 -->
        <template v-if="scenarioMode === 'comprehensive'">
        <!-- ================= 区域用水态势分析 (大卡片: 筛选条件 + 五维统计 + 区域统计图 + 年度趋势) ================= -->
        <div
          id="dev-anno-2"
          class="spec-card rounded-lg p-3 min-h-0 flex flex-col relative transition-all duration-300"
          :class="{ 'ring-2 ring-[#FFB800] shadow-[0_0_24px_rgba(255,184,0,0.65)]': activeAnnotationId === 2 }"
        >
          <!-- Numbered Point 2 Badge (区域用水态势分析 - 左1) -->
          <div
            v-if="showAnnotationBadges && scenarioMode === 'comprehensive'"
            class="absolute -top-2 -left-2 z-40 flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-[#FFD043] to-[#FF9F00] text-[#0A1626] font-extrabold text-xs shadow-[0_0_12px_rgba(255,184,0,0.95)] border-2 border-white cursor-pointer select-none transition-all duration-300 hover:scale-125"
            :class="{ 'scale-125 ring-4 ring-[#FFB800]/60 animate-bounce': activeAnnotationId === 2 }"
            @mouseenter="activeAnnotationId = 2"
            @mouseleave="activeAnnotationId = null"
            @click="scrollToAnnotation(2)"
            title="开发标注 #2: 区域用水态势分析 (左1)"
          >
            2
          </div>
          <!-- 内容区：高度不足时卡片内部滚动，避免趋势图被挤压消失 -->
          <div class="flex-1 min-h-0 flex flex-col overflow-y-auto custom-dark-scrollbar pr-0.5">
          <!-- Card Header -->
          <div class="flex items-center justify-between pb-1.5">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-[#3FD0FF] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polygon points="12 2 21 7 21 17 12 22 3 17 3 7 12 2" stroke-width="1.8" />
                <polygon points="12 6 18 9.5 18 14.5 12 18 6 14.5 6 9.5 12 6" stroke-width="1.2" stroke-opacity="0.6" />
              </svg>
              <h2 class="text-sm 2xl:text-[15.5px] font-semibold text-[#E4F6FF] tracking-[0.8px]">区域用水态势分析</h2>
              <span class="text-xs text-[#8FB6D4] font-medium">(万m³)</span>
            </div>
           
          </div>
          <!-- 标题底线 (规范 64px 高亮带外发光) -->
          <div class="spec-header-divider mb-2"></div>

          <!-- 第一行：搜索条件 (行业类型 / 水源类型 / 年份) -->
          <div class="grid grid-cols-3 gap-1.5 mb-2">
            <label class="min-w-0">
              <span class="block text-[9px] text-[#5D8AAA] mb-0.5">行业类型</span>
              <select
                v-model="filterParams.industry"
                class="w-full min-w-0 bg-[#0b2447] border border-[#1b4372] rounded px-1.5 py-1 text-[#DCF2FF] text-[11px] focus:outline-none focus:border-[#3FD0FF] cursor-pointer"
              >
                <option value="all">全部行业</option>
                <option value="agriculture">农业用水</option>
                <option value="industry">工业用水</option>
                <option value="urban">城镇公共</option>
                <option value="residential">居民生活</option>
                <option value="ecology">生态环境</option>
                <option value="other">其他用水</option>
              </select>
            </label>
            <label class="min-w-0">
              <span class="block text-[9px] text-[#5D8AAA] mb-0.5">水源类型</span>
              <select
                v-model="filterParams.source"
                class="w-full min-w-0 bg-[#0b2447] border border-[#1b4372] rounded px-1.5 py-1 text-[#DCF2FF] text-[11px] focus:outline-none focus:border-[#3FD0FF] cursor-pointer"
              >
                <option value="all">全部水源</option>
                <option value="surface">地表水</option>
                <option value="ground">地下水</option>
              </select>
            </label>
            <label class="min-w-0">
              <span class="block text-[9px] text-[#5D8AAA] mb-0.5">年份</span>
              <select
                v-model="filterParams.year"
                class="w-full min-w-0 bg-[#0b2447] border border-[#1b4372] rounded px-1.5 py-1 text-[#DCF2FF] text-[11px] focus:outline-none focus:border-[#3FD0FF] cursor-pointer"
              >
                <option value="2026">2026年</option>
                <option value="2025">2025年</option>
              </select>
            </label>
          </div>

          <!-- 第二行：五个统计数量 (计量 / 直报 / 税务 / 许可 / 计划) -->
          <div class="bg-[rgba(10,36,58,0.5)] rounded p-1.5 mb-2 border border-[rgba(70,180,235,0.16)]">
            <div class="grid grid-cols-5 gap-1">
              <div class="text-center">
                <div class="text-[10.5px] text-[#8FB6D4]">计量水量</div>
                <div class="text-[13px] font-bold font-spec-num text-[#3FD0FF] mt-0.5">{{ districtTotals.metered.toLocaleString() }}</div>
              </div>
              <div class="text-center">
                <div class="text-[10.5px] text-[#8FB6D4]">直报水量</div>
                <div class="text-[13px] font-bold font-spec-num text-[#9BEAFF] mt-0.5">{{ districtTotals.reported.toLocaleString() }}</div>
              </div>
              <div class="text-center">
                <div class="text-[10.5px] text-[#8FB6D4]">税务水量</div>
                <div class="text-[13px] font-bold font-spec-num text-[#60a5fa] mt-0.5">{{ districtTotals.taxWater.toLocaleString() }}</div>
              </div>
              <div class="text-center">
                <div class="text-[10.5px] text-[#8FB6D4]">许可水量</div>
                <div class="text-[13px] font-bold font-spec-num text-[#FFC65C] mt-0.5">{{ districtTotals.licensed.toLocaleString() }}</div>
              </div>
              <div class="text-center">
                <div class="text-[10.5px] text-[#8FB6D4]">计划水量</div>
                <div class="text-[13px] font-bold font-spec-num text-[#DCF2FF] mt-0.5">{{ districtTotals.planned.toLocaleString() }}</div>
              </div>
            </div>
          </div>

          <!-- 第三个区域：行政区域用水对比 -->
          <div class="flex items-center justify-between gap-1.5 px-1 mb-1">
            <div class="flex items-center gap-1.5 shrink-0">
              <span class="w-1 h-3 rounded-sm bg-[#3FD0FF] shadow-[0_0_6px_#3FD0FF]"></span>
              <span class="text-xs font-semibold text-[#DCF2FF] tracking-wide">行政区域用水对比</span>
            </div>
            <div class="flex items-center gap-1.5 text-[9.5px] flex-wrap justify-end">
              <!-- 水蓝柱族 -->
              <div class="flex items-center gap-1">
                <span class="w-2 h-2 rounded-xs bg-[#3FD0FF]"></span>
                <span class="text-[#8FB6D4]">计量水量</span>
              </div>
              <div class="flex items-center gap-1">
                <span class="w-2 h-2 rounded-xs bg-[#9BEAFF]"></span>
                <span class="text-[#8FB6D4]">直报水量</span>
              </div>
              <div class="flex items-center gap-1">
                <span class="w-2 h-2 rounded-xs bg-[#60a5fa]"></span>
                <span class="text-[#8FB6D4]">税务水量</span>
              </div>
              <!-- 管控线族 -->
              <div class="flex items-center gap-1">
                <span class="inline-flex items-center text-[#FFC65C] font-bold text-[10px] tracking-tighter">―●―</span>
                <span class="text-[#FFC65C]">许可水量</span>
              </div>
              <div class="flex items-center gap-1">
                <span class="inline-flex items-center text-[#DCF2FF] font-bold text-[10px] tracking-tighter">┄○┄</span>
                <span class="text-[#DCF2FF]">计划水量</span>
              </div>
            </div>
          </div>

          <!-- SVG 5-Parameter Combo Chart: 3 Bars (水蓝同色系) + 2 Lines (金白管控线) -->
          <div class="w-full flex-1 min-h-[80px] relative">
            <svg viewBox="0 0 380 120" class="w-full h-full overflow-visible">
              <!-- Horizontal grids -->
              <g stroke="rgba(70,180,235,0.14)" stroke-width="0.8">
                <line x1="34" y1="18" x2="375" y2="18" />
                <line x1="34" y1="44" x2="375" y2="44" />
                <line x1="34" y1="70" x2="375" y2="70" />
                <line x1="34" y1="96" x2="375" y2="96" stroke="rgba(70,180,235,0.25)" stroke-width="1.2" />
              </g>

              <!-- Y-Axis labels (font-size 10, monospace) -->
              <g fill="#5D8AAA" font-size="10" font-family="var(--spec-num)" text-anchor="end">
                <text x="30" y="21">35k</text>
                <text x="30" y="47">25k</text>
                <text x="30" y="73">12k</text>
                <text x="30" y="99">0</text>
              </g>

              <!-- 1. 7 Districts Grouped 3 Bars: 计量水量 (青 #3FD0FF), 直报水量 (天蓝 #9BEAFF), 税务水量 (柔蓝 #60a5fa) -->
              <g
                v-for="(item, idx) in districtBarData"
                :key="item.name"
                class="cursor-pointer group"
                @mouseenter="hoveredBarDistrict = item"
                @mouseleave="hoveredBarDistrict = null"
                @click="filterParams.district = item.name"
              >
                <!-- District Highlight Background Column on Hover -->
                <rect
                  :x="38 + idx * 46"
                  y="16"
                  width="33"
                  height="82"
                  fill="#3FD0FF"
                  :fill-opacity="filterParams.district === item.name ? 0.12 : 0"
                  class="group-hover:fill-opacity-15 transition-all rounded"
                  rx="3"
                />

                <!-- 1. 计量水量 Bar (Cyan #3FD0FF) -->
                <rect
                  :x="41.5 + idx * 46"
                  :y="96 - Math.max(3, (item.metered / 35000) * 78)"
                  width="7.5"
                  :height="Math.max(3, (item.metered / 35000) * 78)"
                  fill="#3FD0FF"
                  rx="1"
                  class="transition-opacity group-hover:opacity-90"
                >
                  <title>{{ item.name }} 计量水量: {{ item.metered }} 万m³</title>
                </rect>

                <!-- 2. 直报水量 Bar (Light Cyan #9BEAFF) -->
                <rect
                  :x="50.5 + idx * 46"
                  :y="96 - Math.max(3, (item.reported / 35000) * 78)"
                  width="7.5"
                  :height="Math.max(3, (item.reported / 35000) * 78)"
                  fill="#9BEAFF"
                  rx="1"
                  class="transition-opacity group-hover:opacity-90"
                >
                  <title>{{ item.name }} 直报水量: {{ item.reported }} 万m³</title>
                </rect>

                <!-- 3. 税务水量 Bar (Blue #60a5fa) -->
                <rect
                  :x="59.5 + idx * 46"
                  :y="96 - Math.max(3, (item.taxWater / 35000) * 78)"
                  width="7.5"
                  :height="Math.max(3, (item.taxWater / 35000) * 78)"
                  fill="#60a5fa"
                  rx="1"
                  class="transition-opacity group-hover:opacity-90"
                >
                  <title>{{ item.name }} 税务水量: {{ item.taxWater }} 万m³</title>
                </rect>

                <!-- District Name on X-Axis -->
                <text
                  :x="54.5 + idx * 46"
                  y="112"
                  text-anchor="middle"
                  font-size="11"
                  font-weight="bold"
                  :fill="filterParams.district === item.name ? '#3FD0FF' : '#8FB6D4'"
                  class="group-hover:fill-[#9BEAFF] transition-colors"
                >
                  {{ item.name }}
                </text>
              </g>

              <!-- 2. 许可水量折线 (金黄暖色 #FFC65C) -->
              <path
                :d="licensedLinePath"
                fill="none"
                stroke="#FFC65C"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="pointer-events-none drop-shadow-[0_0_4px_rgba(255,198,92,0.6)]"
              />

              <!-- 许可水量数据节点 (Circles) -->
              <g
                v-for="(item, idx) in districtBarData"
                :key="'lic-' + item.name"
                class="cursor-pointer"
                @mouseenter="hoveredBarDistrict = item"
                @mouseleave="hoveredBarDistrict = null"
                @click="filterParams.district = item.name"
              >
                <circle
                  :cx="54.5 + idx * 46"
                  :cy="96 - (item.licensed / 35000) * 78"
                  r="3.2"
                  fill="#FFC65C"
                  stroke="#ffffff"
                  stroke-width="1.6"
                  class="hover:scale-125 transition-transform"
                >
                  <title>{{ item.name }} 许可水量: {{ item.licensed }} 万m³</title>
                </circle>
              </g>

              <!-- 3. 计划水量折线 (银白虚线 #DCF2FF) -->
              <path
                :d="plannedLinePath"
                fill="none"
                stroke="#DCF2FF"
                stroke-width="1.8"
                stroke-dasharray="4 3"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="pointer-events-none opacity-85"
              />

              <!-- 计划水量数据节点 (Circles) -->
              <g
                v-for="(item, idx) in districtBarData"
                :key="'plan-' + item.name"
                class="cursor-pointer"
                @mouseenter="hoveredBarDistrict = item"
                @mouseleave="hoveredBarDistrict = null"
                @click="filterParams.district = item.name"
              >
                <circle
                  :cx="54.5 + idx * 46"
                  :cy="96 - (item.planned / 35000) * 78"
                  r="2.8"
                  fill="#ffffff"
                  stroke="#5D8AAA"
                  stroke-width="1.4"
                  class="hover:scale-125 transition-transform"
                >
                  <title>{{ item.name }} 计划水量: {{ item.planned }} 万m³</title>
                </circle>
              </g>
            </svg>

            <!-- Hover Popover Tooltip for District 5 Parameters (Design Spec Section 07 Tooltip) -->
            <div
              v-if="hoveredBarDistrict"
              class="spec-tooltip absolute top-1 right-2 p-2.5 text-xs shadow-2xl pointer-events-none z-30 min-w-[180px]"
            >
              <i class="tooltip-bar"></i>
              <div class="font-bold text-[#DCF2FF] mb-1.5 border-b border-[rgba(70,180,235,0.18)] pb-1 flex items-center justify-between">
                <span>{{ hoveredBarDistrict.name }} 水量明细</span>
                <span class="text-[10px] text-[#5D8AAA] font-normal">万m³</span>
              </div>
              <div class="space-y-1 font-spec-num text-[11px]">
                <div class="text-[#3FD0FF] flex justify-between gap-3 items-center">
                  <span class="flex items-center gap-1.5 text-[#8FB6D4] font-sans"><span class="w-2 h-2 rounded-xs bg-[#3FD0FF]"></span>计量水量:</span>
                  <span class="font-bold text-white">{{ hoveredBarDistrict.metered.toLocaleString() }}</span>
                </div>
                <div class="text-[#9BEAFF] flex justify-between gap-3 items-center">
                  <span class="flex items-center gap-1.5 text-[#8FB6D4] font-sans"><span class="w-2 h-2 rounded-xs bg-[#9BEAFF]"></span>直报水量:</span>
                  <span class="font-bold text-white">{{ hoveredBarDistrict.reported.toLocaleString() }}</span>
                </div>
                <div class="text-[#60a5fa] flex justify-between gap-3 items-center">
                  <span class="flex items-center gap-1.5 text-[#8FB6D4] font-sans"><span class="w-2 h-2 rounded-xs bg-[#60a5fa]"></span>税务水量:</span>
                  <span class="font-bold text-white">{{ hoveredBarDistrict.taxWater.toLocaleString() }}</span>
                </div>
                <div class="text-[#FFC65C] flex justify-between gap-3 items-center">
                  <span class="flex items-center gap-1.5 text-[#8FB6D4] font-sans"><span class="w-2.5 h-0.5 bg-[#FFC65C]"></span>许可水量:</span>
                  <span class="font-bold text-white">{{ hoveredBarDistrict.licensed.toLocaleString() }}</span>
                </div>
                <div class="text-[#DCF2FF] flex justify-between gap-3 items-center">
                  <span class="flex items-center gap-1.5 text-[#8FB6D4] font-sans"><span class="w-2.5 h-0.5 border-t border-dashed border-[#DCF2FF]"></span>计划水量:</span>
                  <span class="font-bold text-white">{{ hoveredBarDistrict.planned.toLocaleString() }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 第四个区域：用水时间变化趋势 (2026 / 2025 双年度) -->
          <div
            id="dev-anno-3"
            class="border-t border-[rgba(70,180,235,0.18)] pt-2 mt-1 flex flex-col flex-1 min-h-[116px] relative rounded transition-all duration-300"
            :class="{ 'ring-2 ring-[#FFB800] shadow-[0_0_24px_rgba(255,184,0,0.65)]': activeAnnotationId === 3 }"
          >
            <div class="flex items-center justify-between pb-1">
              <div class="flex items-center gap-1.5">
                <span class="w-1 h-3 rounded-sm bg-[#9BEAFF] shadow-[0_0_6px_#9BEAFF]"></span>
                <h3 class="text-xs font-semibold text-[#DCF2FF] tracking-wide">用水时间变化趋势</h3>
                <span class="text-[10px] text-[#8FB6D4]">(万m³)</span>
              </div>
              <div class="flex items-center gap-2.5 text-[10px]">
                <div class="flex items-center gap-1.5">
                  <span
                    class="w-3.5 h-0.5 rounded-xs"
                    :class="filterParams.year === '2026' ? 'bg-[#3FD0FF] shadow-[0_0_5px_#3FD0FF]' : 'bg-[#3FD0FF]/40'"
                  ></span>
                  <span :class="filterParams.year === '2026' ? 'text-[#3FD0FF] font-semibold' : 'text-[#8FB6D4]'">2026年</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <span
                    class="w-3.5 h-0.5 border-t-2 border-dashed"
                    :class="filterParams.year === '2025' ? 'border-[#60a5fa]' : 'border-[#60a5fa]/40'"
                  ></span>
                  <span :class="filterParams.year === '2025' ? 'text-[#60a5fa] font-semibold' : 'text-[#8FB6D4]'">2025年</span>
                </div>
              </div>
            </div>

            <!-- SVG Smooth Curve & Area Gradient Trend Chart -->
            <div class="w-full flex-1 min-h-[80px] relative">
            <svg viewBox="0 0 380 120" class="w-full h-full overflow-visible">
              <defs>
                <!-- Area gradient for 2026年 -->
                <linearGradient id="actualAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#3FD0FF" stop-opacity="0.45" />
                  <stop offset="50%" stop-color="#1E7BE8" stop-opacity="0.18" />
                  <stop offset="100%" stop-color="#02070E" stop-opacity="0.0" />
                </linearGradient>
                <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <!-- Horizontal Grid Lines -->
              <g stroke="rgba(70,180,235,0.14)" stroke-width="0.8">
                <line x1="36" y1="16" x2="368" y2="16" />
                <line x1="36" y1="42" x2="368" y2="42" />
                <line x1="36" y1="68" x2="368" y2="68" />
                <line x1="36" y1="94" x2="368" y2="94" stroke="rgba(70,180,235,0.25)" stroke-width="1.2" />
              </g>

              <!-- Y-Axis labels (font-size 10) -->
              <g fill="#5D8AAA" font-size="10" font-family="var(--spec-num)" text-anchor="end">
                <text x="32" y="19">18k</text>
                <text x="32" y="45">12k</text>
                <text x="32" y="71">6k</text>
                <text x="32" y="97">0</text>
              </g>

              <!-- 1. 2026年 Gradient Area -->
              <path
                :d="trendChartData.area2026"
                fill="url(#actualAreaGrad)"
                class="transition-all duration-300"
              />

              <!-- 2. 2025年 Line (Blue Dashed #60a5fa) -->
              <path
                :d="trendChartData.line2025"
                fill="none"
                stroke="#60a5fa"
                :stroke-width="filterParams.year === '2025' ? 2.2 : 1.6"
                stroke-dasharray="4 3"
                :opacity="filterParams.year === '2025' ? 0.95 : 0.65"
              />

              <!-- 3. 2026年 Line (Glowing Cyan #3FD0FF) -->
              <path
                :d="trendChartData.line2026"
                fill="none"
                stroke="#3FD0FF"
                :stroke-width="filterParams.year === '2026' ? 2.5 : 1.8"
                :opacity="filterParams.year === '2026' ? 1 : 0.65"
                filter="url(#cyanGlow)"
              />

              <!-- Month X-Axis Labels (font-size 10.5, clear & readable) -->
              <g
                v-for="(item, idx) in monthlyTrendData"
                :key="item.month"
                class="cursor-pointer group"
                @mouseenter="hoveredTrendIdx = idx"
                @mouseleave="hoveredTrendIdx = null"
              >
                <!-- Month text -->
                <text
                  :x="36 + idx * (332 / 11)"
                  y="110"
                  text-anchor="middle"
                  font-size="10.5"
                  font-weight="bold"
                  :fill="hoveredTrendIdx === idx ? '#3FD0FF' : '#8FB6D4'"
                >
                  {{ item.month }}
                </text>

                <!-- Data point dot on 2025 line -->
                <circle
                  :cx="36 + idx * (332 / 11)"
                  :cy="94 - (item.y2025 / 18000) * 78"
                  :r="hoveredTrendIdx === idx ? 3.6 : 2"
                  fill="#0b2447"
                  stroke="#60a5fa"
                  :stroke-width="hoveredTrendIdx === idx ? 2.2 : 1.4"
                  class="transition-all"
                />

                <!-- Data point dot on 2026 line -->
                <circle
                  :cx="36 + idx * (332 / 11)"
                  :cy="94 - (item.y2026 / 18000) * 78"
                  :r="hoveredTrendIdx === idx ? 4.5 : 2.5"
                  fill="#ffffff"
                  stroke="#3FD0FF"
                  :stroke-width="hoveredTrendIdx === idx ? 2.5 : 1.5"
                  class="transition-all"
                />
              </g>
            </svg>

            <!-- Hover Month Tooltip (Spec 07 Tooltip) -->
            <div
              v-if="hoveredTrendIdx !== null"
              class="spec-tooltip absolute top-1 right-2 p-2.5 text-xs shadow-2xl pointer-events-none z-30 min-w-[170px]"
            >
              <i class="tooltip-bar"></i>
              <div class="font-bold text-[#DCF2FF] mb-1.5 border-b border-[rgba(70,180,235,0.18)] pb-1 flex items-center justify-between">
                <span>{{ monthlyTrendData[hoveredTrendIdx].month }} 用水情况</span>
                <span class="text-[10px] text-[#5D8AAA] font-normal">年度对比</span>
              </div>
              <div class="space-y-1 font-spec-num text-[11px]">
                <div class="text-[#3FD0FF] flex justify-between gap-3 items-center">
                  <span class="flex items-center gap-1.5 font-sans text-[#8FB6D4]"><i class="w-1.5 h-1.5 rounded-xs bg-[#3FD0FF]"></i>2026年:</span>
                  <span class="font-bold text-[#E4F6FF]">{{ monthlyTrendData[hoveredTrendIdx].y2026 }} <small class="text-[#5D8AAA] text-[10px] font-normal">万m³</small></span>
                </div>
                <div class="text-[#60a5fa] flex justify-between gap-3 items-center">
                  <span class="flex items-center gap-1.5 font-sans text-[#8FB6D4]"><i class="w-1.5 h-1.5 rounded-xs bg-[#60a5fa]"></i>2025年:</span>
                  <span class="text-[#DCF2FF]">{{ monthlyTrendData[hoveredTrendIdx].y2025 }} <small class="text-[#5D8AAA] text-[10px] font-normal">万m³</small></span>
                </div>
                <div class="text-[#FFC65C] flex justify-between gap-3 items-center">
                  <span class="flex items-center gap-1.5 font-sans text-[#8FB6D4]"><i class="w-1.5 h-1.5 rounded-xs bg-[#FFC65C]"></i>同比:</span>
                  <span class="font-semibold text-[#FFC65C]">{{ trendYoY(monthlyTrendData[hoveredTrendIdx]) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>

        <!-- ================= Card 3: 行业用水结构占比 (独立卡片 3) ================= -->
        <div
          id="dev-anno-4"
          class="spec-card rounded-lg p-3 min-h-0 flex flex-col justify-between relative transition-all duration-300"
          :class="{ 'ring-2 ring-[#FFB800] shadow-[0_0_24px_rgba(255,184,0,0.65)]': activeAnnotationId === 4 }"
        >
          <!-- Numbered Point 4 Badge (行业用水结构占比 - 左3) -->
          <div
            v-if="showAnnotationBadges && scenarioMode === 'comprehensive'"
            class="absolute -top-2 -left-2 z-40 flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-[#FFD043] to-[#FF9F00] text-[#0A1626] font-extrabold text-xs shadow-[0_0_12px_rgba(255,184,0,0.95)] border-2 border-white cursor-pointer select-none transition-all duration-300 hover:scale-125"
            :class="{ 'scale-125 ring-4 ring-[#FFB800]/60 animate-bounce': activeAnnotationId === 4 }"
            @mouseenter="activeAnnotationId = 4"
            @mouseleave="activeAnnotationId = null"
            @click="scrollToAnnotation(4)"
            title="开发标注 #4: 行业用水结构占比 (左3)"
          >
            4
          </div>
          <!-- 内容区：1/3 高度不足时卡片内部滚动 -->
          <div class="flex-1 min-h-0 flex flex-col overflow-y-auto custom-dark-scrollbar pr-0.5">
          <div class="flex items-center justify-between pb-1.5">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-[#3FD0FF] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polygon points="12 2 21 7 21 17 12 22 3 17 3 7 12 2" stroke-width="1.8" />
                <polygon points="12 6 18 9.5 18 14.5 12 18 6 14.5 6 9.5 12 6" stroke-width="1.2" stroke-opacity="0.6" />
              </svg>
              <h2 class="text-sm 2xl:text-[15.5px] font-semibold text-[#E4F6FF] tracking-[0.8px]">行业用水结构占比</h2>
            </div>
            <div class="text-xs text-[#9BEAFF] font-spec-num font-bold">
              全域总额: 61,327 万m³
            </div>
          </div>
          <div class="spec-header-divider mb-2"></div>

          <!-- Donut Chart & Detailed Industry Breakdown (统一水蓝渐变色系，减少杂色) -->
          <div class="flex items-center gap-4 my-auto py-1">
            <!-- Left: Donut Chart with center total -->
            <div class="w-32 h-32 relative shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 100 100" class="w-full h-full -rotate-90">
                <!-- 农业 38.60% (circumference ~ 226) #3FD0FF -->
                <circle cx="50" cy="50" r="36" fill="transparent" stroke="#3FD0FF" stroke-width="15" stroke-dasharray="87.2 138.8" stroke-dashoffset="0" />
                <!-- 工业 31.78% #1E7BE8 -->
                <circle cx="50" cy="50" r="36" fill="transparent" stroke="#1E7BE8" stroke-width="15" stroke-dasharray="71.8 154.2" stroke-dashoffset="-87.2" />
                <!-- 城镇公共 12.35% #9BEAFF -->
                <circle cx="50" cy="50" r="36" fill="transparent" stroke="#9BEAFF" stroke-width="15" stroke-dasharray="27.9 198.1" stroke-dashoffset="-159.0" />
                <!-- 居民生活 7.02% #60a5fa -->
                <circle cx="50" cy="50" r="36" fill="transparent" stroke="#60a5fa" stroke-width="15" stroke-dasharray="15.9 210.1" stroke-dashoffset="-186.9" />
                <!-- 生态环境 6.85% #9B8CFF (Spec 第四类目) -->
                <circle cx="50" cy="50" r="36" fill="transparent" stroke="#9B8CFF" stroke-width="15" stroke-dasharray="15.5 210.5" stroke-dashoffset="-202.8" />
                <!-- 其他 3.40% #5D8AAA -->
                <circle cx="50" cy="50" r="36" fill="transparent" stroke="#5D8AAA" stroke-width="15" stroke-dasharray="7.7 218.3" stroke-dashoffset="-218.3" />
              </svg>
              <!-- Center Text Inside Donut -->
              <div class="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span class="text-[11px] text-[#8FB6D4] font-medium">全行业</span>
                <span class="text-sm font-bold font-spec-num text-[#9BEAFF]">100%</span>
              </div>
            </div>

            <!-- Right: 6 Industry Items List with Volumes & Percentages -->
            <div class="flex-1 space-y-1.5 text-xs">
              <div class="flex items-center justify-between pb-1 border-b border-[rgba(70,180,235,0.12)] border-dashed">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-xs bg-[#3FD0FF]"></span>
                  <span class="text-[#DCF2FF] font-medium">农业用水</span>
                </div>
                <div class="flex items-center gap-2 font-spec-num">
                  <span class="text-[#8FB6D4]">23,672万m³</span>
                  <span class="font-bold text-[#3FD0FF]">38.60%</span>
                </div>
              </div>

              <div class="flex items-center justify-between pb-1 border-b border-[rgba(70,180,235,0.12)] border-dashed">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-xs bg-[#1E7BE8]"></span>
                  <span class="text-[#DCF2FF] font-medium">工业用水</span>
                </div>
                <div class="flex items-center gap-2 font-spec-num">
                  <span class="text-[#8FB6D4]">19,490万m³</span>
                  <span class="font-bold text-[#9BEAFF]">31.78%</span>
                </div>
              </div>

              <div class="flex items-center justify-between pb-1 border-b border-[rgba(70,180,235,0.12)] border-dashed">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-xs bg-[#9BEAFF]"></span>
                  <span class="text-[#DCF2FF] font-medium">城镇公共</span>
                </div>
                <div class="flex items-center gap-2 font-spec-num">
                  <span class="text-[#8FB6D4]">7,574万m³</span>
                  <span class="font-bold text-[#DCF2FF]">12.35%</span>
                </div>
              </div>

              <div class="flex items-center justify-between pb-1 border-b border-[rgba(70,180,235,0.12)] border-dashed">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-xs bg-[#60a5fa]"></span>
                  <span class="text-[#DCF2FF] font-medium">居民生活</span>
                </div>
                <div class="flex items-center gap-2 font-spec-num">
                  <span class="text-[#8FB6D4]">4,305万m³</span>
                  <span class="font-bold text-[#60a5fa]">7.02%</span>
                </div>
              </div>

              <div class="flex items-center justify-between pb-1 border-b border-[rgba(70,180,235,0.12)] border-dashed">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-xs bg-[#9B8CFF]"></span>
                  <span class="text-[#DCF2FF] font-medium">生态环境</span>
                </div>
                <div class="flex items-center gap-2 font-spec-num">
                  <span class="text-[#8FB6D4]">4,201万m³</span>
                  <span class="font-bold text-[#9B8CFF]">6.85%</span>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-xs bg-[#5D8AAA]"></span>
                  <span class="text-[#DCF2FF] font-medium">其他用水</span>
                </div>
                <div class="flex items-center gap-2 font-spec-num">
                  <span class="text-[#8FB6D4]">2,085万m³</span>
                  <span class="font-bold text-[#8FB6D4]">3.40%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        </template>

        <!-- B. 专项业务应用场景 (左侧模块 1: 计量设施总体情况 & 模块 2: 重点取水户概况 - 紧凑合理布局，消除空白) -->
        <template v-else>
          <!-- ================= 专项 Card 1: 计量设施总体情况 ================= -->
          <div class="spec-card rounded-lg p-3 flex-1 min-h-0 flex flex-col gap-2 overflow-hidden">
            <!-- Card Header -->
            <div class="flex items-center justify-between pb-1.5 shrink-0">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-[#3FD0FF] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polygon points="12 2 21 7 21 17 12 22 3 17 3 7 12 2" stroke-width="1.8" />
                  <polygon points="12 6 18 9.5 18 14.5 12 18 6 14.5 6 9.5 12 6" stroke-width="1.2" stroke-opacity="0.6" />
                </svg>
                <h2 class="text-sm 2xl:text-[15.5px] font-semibold text-[#E4F6FF] tracking-[0.8px]">计量设施总体情况</h2>
              </div>
              <div class="flex items-center gap-1.5 text-xs text-[#3FD0FF] font-spec-num">
                <span class="text-[#8FB6D4] font-spec-cn">全域正常率:</span>
                <span class="font-bold text-[#3FD0FF]">{{ meterDeviceOverview.onlineRate }}</span>
                <span class="spec-tag text-[10px] text-[#3DDC97] border-[#3DDC97]/40 bg-[#3DDC97]/10 font-spec-cn">运行良好</span>
              </div>
            </div>
            <div class="spec-header-divider mb-1"></div>

            <!-- 5 Status Badges: 站点总数、正常站点、停用站点、故障异常、待检定 -->
            <div class="grid grid-cols-5 gap-1.5 shrink-0">
              <!-- 站点总数 -->
              <div class="bg-[rgba(10,36,58,0.5)] border border-[rgba(70,180,235,0.16)] rounded p-2 text-center">
                <span class="text-[10px] text-[#8FB6D4] block font-medium">站点总数</span>
                <span class="text-base 2xl:text-lg font-bold font-spec-num text-white mt-0.5 block">{{ meterDeviceOverview.total }}</span>
                <span class="text-[9px] text-[#5D8AAA] block">全网纳管</span>
              </div>
              <!-- 正常站点 -->
              <div class="bg-cyan-950/30 border border-[#3FD0FF]/35 rounded p-2 text-center">
                <span class="text-[10px] text-[#9BEAFF] block font-medium">正常站点</span>
                <span class="text-base 2xl:text-lg font-bold font-spec-num text-[#3FD0FF] mt-0.5 block">{{ meterDeviceOverview.online }}</span>
                <span class="text-[9px] text-[#3FD0FF]/80 block">实时传输</span>
              </div>
              <!-- 停用站点 -->
              <div class="bg-slate-800/40 border border-slate-600/35 rounded p-2 text-center">
                <span class="text-[10px] text-[#8FB6D4] block font-medium">停用站点</span>
                <span class="text-base 2xl:text-lg font-bold font-spec-num text-[#8FB6D4] mt-0.5 block">{{ meterDeviceOverview.offline }}</span>
                <span class="text-[9px] text-[#5D8AAA] block">按需停用</span>
              </div>
              <!-- 故障异常 -->
              <div class="bg-rose-950/25 border border-[#FF6B7A]/40 rounded p-2 text-center">
                <span class="text-[10px] text-[#FF6B7A] block font-medium">故障异常</span>
                <span class="text-base 2xl:text-lg font-bold font-spec-num text-[#FF6B7A] mt-0.5 block">{{ meterDeviceOverview.fault }}</span>
                <span class="text-[9px] text-[#FF6B7A]/80 block">需抢修</span>
              </div>
              <!-- 待检定 -->
              <div class="bg-amber-950/25 border border-[#FFC65C]/40 rounded p-2 text-center">
                <span class="text-[10px] text-[#FFC65C] block font-medium">待检定</span>
                <span class="text-base 2xl:text-lg font-bold font-spec-num text-[#FFC65C] mt-0.5 block">{{ meterDeviceOverview.pending }}</span>
                <span class="text-[9px] text-[#FFC65C]/80 block">周期到期</span>
              </div>
            </div>

            <!-- 区域计量设施在线分析 (按 国控监控、自建/自计量、中央资金、省级资金 4大来源统计) -->
            <div class="flex-1 flex flex-col gap-2 min-h-0">
              <div class="flex items-center justify-between text-xs font-semibold text-[#DCF2FF] shrink-0">
                <div class="flex items-center gap-1.5">
                  <span class="text-[#3FD0FF] font-bold">|</span>
                  <span>区域计量设施在线分析</span>
                  <span class="text-[10px] text-[#8FB6D4] font-normal">(分类统计)</span>
                </div>
                <!-- 统计图切换: 对比柱状图 / 占比环形图 -->
                <div class="flex items-center bg-[#071932] p-0.5 rounded border border-[rgba(70,180,235,0.25)] text-[10px]">
                  <button
                    type="button"
                    class="px-2 py-0.5 rounded cursor-pointer transition font-spec-cn"
                    :class="facilityChartMode === 'bar'
                      ? 'bg-[#00E5FF]/25 text-[#9BEAFF] font-bold shadow-[0_0_6px_rgba(0,229,255,0.3)]'
                      : 'text-[#8AAEC8] hover:text-white'"
                    @click="facilityChartMode = 'bar'"
                  >
                    对比柱状图
                  </button>
                  <button
                    type="button"
                    class="px-2 py-0.5 rounded cursor-pointer transition font-spec-cn"
                    :class="facilityChartMode === 'donut'
                      ? 'bg-[#00E5FF]/25 text-[#9BEAFF] font-bold shadow-[0_0_6px_rgba(0,229,255,0.3)]'
                      : 'text-[#8AAEC8] hover:text-white'"
                    @click="facilityChartMode = 'donut'"
                  >
                    占比环形图
                  </button>
                </div>
              </div>

              <!-- 4大资金与建设分类指标概览 (国控监控、自建/自计量、中央资金、省级资金) -->
              <div class="grid grid-cols-4 gap-1.5 shrink-0">
                <div
                  v-for="cat in facilitySourceStats"
                  :key="'cat-card-' + cat.id"
                  class="p-2 rounded-lg border transition-all duration-200 cursor-pointer flex flex-col justify-between"
                  :class="hoveredFacilityCategory === cat.id
                    ? 'bg-[rgba(16,52,86,0.95)] border-[#3FD0FF] shadow-[0_0_12px_rgba(63,208,255,0.4)] scale-[1.02]'
                    : 'bg-[rgba(10,36,58,0.55)] border-[rgba(70,180,235,0.18)] hover:border-[#3FD0FF]/60 hover:bg-[rgba(14,44,74,0.7)]'"
                  @mouseenter="hoveredFacilityCategory = cat.id"
                  @mouseleave="hoveredFacilityCategory = null"
                >
                  <!-- Top: Indicator Dot & Name -->
                  <div class="flex items-center gap-1.5 min-w-0">
                    <span class="w-2 h-2 rounded-full shrink-0 shadow-sm" :style="{ backgroundColor: cat.color }"></span>
                    <span class="text-[11px] 2xl:text-xs font-semibold text-[#DCF2FF] truncate font-spec-cn">{{ cat.shortName }}</span>
                  </div>
                  <!-- Mid: Total & Rate -->
                  <div class="flex items-baseline justify-between mt-1">
                    <div class="flex items-baseline gap-0.5 font-spec-num">
                      <span class="text-sm 2xl:text-base font-bold text-white">{{ cat.total }}</span>
                      <span class="text-[9px] text-[#8FB6D4]">处</span>
                    </div>
                    <span class="text-[10.5px] 2xl:text-[11px] font-bold font-spec-num" :style="{ color: cat.color }">{{ cat.rate }}%</span>
                  </div>
                  <!-- Bottom: Normal vs Status -->
                  <div class="flex items-center justify-between text-[9px] text-[#8FB6D4] mt-0.5 pt-0.5 border-t border-[rgba(70,180,235,0.12)] font-spec-cn">
                    <span>正常 {{ cat.normal }}</span>
                    <span :class="cat.fault > 0 ? 'text-[#FF6B7A]' : 'text-[#3DDC97]'">{{ cat.fault > 0 ? '异常' + cat.fault : '运行良好' }}</span>
                  </div>
                </div>
              </div>

              <!-- 统计图展示容器 (填补原留白，增强高度协调感) -->
              <div class="flex-1 min-h-[175px] 2xl:min-h-[195px] flex flex-col justify-between">
                <!-- 统计图模式 1: 分类对比柱状图 (站点总数 vs 正常站点 + 正常率连线) -->
                <div v-if="facilityChartMode === 'bar'" class="w-full flex-1 relative flex flex-col justify-between">
                  <!-- Chart Legend & Subtitle -->
                  <div class="flex items-center justify-between text-[10px] mb-1 shrink-0 font-spec-cn pt-0.5">
                    <span class="text-[#8FB6D4]">各类设施总数与正常运行对比</span>
                    <div class="flex items-center gap-3">
                      <div class="flex items-center gap-1">
                        <span class="w-2.5 h-2 rounded-xs bg-[#1E7BE8]"></span>
                        <span class="text-[#8FB6D4]">站点总数</span>
                      </div>
                      <div class="flex items-center gap-1">
                        <span class="w-2.5 h-2 rounded-xs bg-[#3FD0FF] shadow-[0_0_4px_#3FD0FF]"></span>
                        <span class="text-[#3FD0FF]">正常站点</span>
                      </div>
                      <div class="flex items-center gap-1">
                        <span class="w-2.5 h-0.5 bg-[#FFC65C]"></span>
                        <span class="text-[#FFC65C]">正常率(%)</span>
                      </div>
                    </div>
                  </div>

                  <!-- SVG Grouped Bar Chart (高挑饱满，比例协调) -->
                  <div class="w-full flex-1 min-h-[155px] relative">
                    <svg viewBox="0 0 380 165" class="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="facilityTotalGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stop-color="#1E7BE8" stop-opacity="0.95" />
                          <stop offset="100%" stop-color="#0b2c52" stop-opacity="0.4" />
                        </linearGradient>
                        <linearGradient id="facilityNormalGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stop-color="#3FD0FF" stop-opacity="1" />
                          <stop offset="100%" stop-color="#0f6496" stop-opacity="0.45" />
                        </linearGradient>
                      </defs>

                      <!-- Grid Lines -->
                      <g stroke="rgba(70,180,235,0.12)" stroke-width="0.8">
                        <line x1="30" y1="18" x2="372" y2="18" />
                        <line x1="30" y1="47" x2="372" y2="47" />
                        <line x1="30" y1="76" x2="372" y2="76" />
                        <line x1="30" y1="105" x2="372" y2="105" />
                        <line x1="30" y1="125" x2="372" y2="125" stroke="rgba(70,180,235,0.24)" />
                      </g>

                      <!-- Y-Axis labels -->
                      <g fill="#5D8AAA" font-size="8.5" font-family="var(--spec-num)" text-anchor="end">
                        <text x="26" y="21">140</text>
                        <text x="26" y="50">100</text>
                        <text x="26" y="79">60</text>
                        <text x="26" y="108">20</text>
                        <text x="26" y="128">0</text>
                      </g>

                      <!-- 1. 国控监控 - Center x=76 -->
                      <g class="cursor-pointer group" @mouseenter="hoveredFacilityCategory = 'national'" @mouseleave="hoveredFacilityCategory = null">
                        <!-- Total Bar (126) -->
                        <rect x="62.5" y="28.7" width="12" height="96.3" fill="url(#facilityTotalGrad)" rx="2" :stroke="hoveredFacilityCategory === 'national' ? '#1E7BE8' : 'none'" stroke-width="1" />
                        <text x="68.5" y="24" fill="#8FB6D4" font-size="8.5" font-family="var(--spec-num)" text-anchor="middle">126</text>
                        <!-- Normal Bar (116) -->
                        <rect x="77.5" y="36.3" width="12" height="88.7" fill="url(#facilityNormalGrad)" rx="2" :stroke="hoveredFacilityCategory === 'national' ? '#3FD0FF' : 'none'" stroke-width="1" />
                        <text x="83.5" y="32" fill="#3FD0FF" font-size="8.5" font-weight="bold" font-family="var(--spec-num)" text-anchor="middle">116</text>
                        <!-- Labels -->
                        <text x="76" y="142" :fill="hoveredFacilityCategory === 'national' ? '#3FD0FF' : '#DCF2FF'" font-size="9" text-anchor="middle" font-family="var(--spec-cn)" font-weight="500">国控监控</text>
                        <text x="76" y="156" fill="#FFC65C" font-size="8.5" font-weight="bold" font-family="var(--spec-num)" text-anchor="middle">92.1%</text>
                      </g>

                      <!-- 2. 自建/自计量 - Center x=161 -->
                      <g class="cursor-pointer group" @mouseenter="hoveredFacilityCategory = 'self'" @mouseleave="hoveredFacilityCategory = null">
                        <!-- Total Bar (98) -->
                        <rect x="147.5" y="50.1" width="12" height="74.9" fill="url(#facilityTotalGrad)" rx="2" :stroke="hoveredFacilityCategory === 'self' ? '#1E7BE8' : 'none'" stroke-width="1" />
                        <text x="153.5" y="45" fill="#8FB6D4" font-size="8.5" font-family="var(--spec-num)" text-anchor="middle">98</text>
                        <!-- Normal Bar (86) -->
                        <rect x="162.5" y="59.3" width="12" height="65.7" fill="url(#facilityNormalGrad)" rx="2" :stroke="hoveredFacilityCategory === 'self' ? '#3FD0FF' : 'none'" stroke-width="1" />
                        <text x="168.5" y="55" fill="#3FD0FF" font-size="8.5" font-weight="bold" font-family="var(--spec-num)" text-anchor="middle">86</text>
                        <!-- Labels -->
                        <text x="161" y="142" :fill="hoveredFacilityCategory === 'self' ? '#3FD0FF' : '#DCF2FF'" font-size="9" text-anchor="middle" font-family="var(--spec-cn)" font-weight="500">自建/自计量</text>
                        <text x="161" y="156" fill="#FFC65C" font-size="8.5" font-weight="bold" font-family="var(--spec-num)" text-anchor="middle">87.8%</text>
                      </g>

                      <!-- 3. 中央资金 - Center x=246 -->
                      <g class="cursor-pointer group" @mouseenter="hoveredFacilityCategory = 'central_fund'" @mouseleave="hoveredFacilityCategory = null">
                        <!-- Total Bar (54) -->
                        <rect x="232.5" y="83.7" width="12" height="41.3" fill="url(#facilityTotalGrad)" rx="2" :stroke="hoveredFacilityCategory === 'central_fund' ? '#FFC65C' : 'none'" stroke-width="1" />
                        <text x="238.5" y="79" fill="#8FB6D4" font-size="8.5" font-family="var(--spec-num)" text-anchor="middle">54</text>
                        <!-- Normal Bar (48) -->
                        <rect x="247.5" y="88.3" width="12" height="36.7" fill="url(#facilityNormalGrad)" rx="2" :stroke="hoveredFacilityCategory === 'central_fund' ? '#3FD0FF' : 'none'" stroke-width="1" />
                        <text x="253.5" y="84" fill="#3FD0FF" font-size="8.5" font-weight="bold" font-family="var(--spec-num)" text-anchor="middle">48</text>
                        <!-- Labels -->
                        <text x="246" y="142" :fill="hoveredFacilityCategory === 'central_fund' ? '#FFC65C' : '#DCF2FF'" font-size="9" text-anchor="middle" font-family="var(--spec-cn)" font-weight="500">中央资金</text>
                        <text x="246" y="156" fill="#FFC65C" font-size="8.5" font-weight="bold" font-family="var(--spec-num)" text-anchor="middle">88.9%</text>
                      </g>

                      <!-- 4. 省级资金 - Center x=331 -->
                      <g class="cursor-pointer group" @mouseenter="hoveredFacilityCategory = 'provincial_fund'" @mouseleave="hoveredFacilityCategory = null">
                        <!-- Total Bar (40) -->
                        <rect x="317.5" y="94.4" width="12" height="30.6" fill="url(#facilityTotalGrad)" rx="2" :stroke="hoveredFacilityCategory === 'provincial_fund' ? '#3DDC97' : 'none'" stroke-width="1" />
                        <text x="323.5" y="90" fill="#8FB6D4" font-size="8.5" font-family="var(--spec-num)" text-anchor="middle">40</text>
                        <!-- Normal Bar (34) -->
                        <rect x="332.5" y="99.0" width="12" height="26.0" fill="url(#facilityNormalGrad)" rx="2" :stroke="hoveredFacilityCategory === 'provincial_fund' ? '#3FD0FF' : 'none'" stroke-width="1" />
                        <text x="338.5" y="95" fill="#3FD0FF" font-size="8.5" font-weight="bold" font-family="var(--spec-num)" text-anchor="middle">34</text>
                        <!-- Labels -->
                        <text x="331" y="142" :fill="hoveredFacilityCategory === 'provincial_fund' ? '#3DDC97' : '#DCF2FF'" font-size="9" text-anchor="middle" font-family="var(--spec-cn)" font-weight="500">省级资金</text>
                        <text x="331" y="156" fill="#FFC65C" font-size="8.5" font-weight="bold" font-family="var(--spec-num)" text-anchor="middle">85.0%</text>
                      </g>

                      <!-- Normal Rate Connecting Polyline -->
                      <polyline
                        points="76,24 161,46 246,75 331,88"
                        fill="none"
                        stroke="#FFC65C"
                        stroke-width="1.8"
                        stroke-dasharray="3 2"
                        opacity="0.9"
                      />
                      <circle cx="76" cy="24" r="3" fill="#FFC65C" stroke="#061423" stroke-width="1" />
                      <circle cx="161" cy="46" r="3" fill="#FFC65C" stroke="#061423" stroke-width="1" />
                      <circle cx="246" cy="75" r="3" fill="#FFC65C" stroke="#061423" stroke-width="1" />
                      <circle cx="331" cy="88" r="3" fill="#FFC65C" stroke="#061423" stroke-width="1" />
                    </svg>
                  </div>
                </div>

                <!-- 统计图模式 2: 分类占比环形统计图 (Donut Ring Chart + Metrics) -->
                <div v-else class="w-full flex-1 min-h-[175px] flex items-center justify-between gap-4 py-2 px-1">
                  <!-- Left: SVG Donut Chart -->
                  <div class="w-28 h-28 2xl:w-32 2xl:h-32 relative shrink-0">
                    <svg viewBox="0 0 100 100" class="w-full h-full -rotate-90">
                      <circle
                        v-for="cat in facilitySourceStats"
                        :key="cat.id"
                        cx="50"
                        cy="50"
                        r="36"
                        fill="transparent"
                        :stroke="cat.color"
                        stroke-width="14"
                        :stroke-dasharray="`${cat.dashLength} 226.2`"
                        :stroke-dashoffset="cat.dashOffset"
                        class="transition-all duration-300 cursor-pointer"
                        :opacity="hoveredFacilityCategory && hoveredFacilityCategory !== cat.id ? 0.35 : 1"
                        @mouseenter="hoveredFacilityCategory = cat.id"
                        @mouseleave="hoveredFacilityCategory = null"
                      />
                    </svg>
                    <!-- Center Metric Text -->
                    <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span class="text-lg 2xl:text-xl font-bold font-spec-num text-white leading-none">318</span>
                      <span class="text-[9.5px] text-[#8FB6D4] font-spec-cn mt-0.5">全域站点</span>
                    </div>
                  </div>

                  <!-- Right: 4 Category Metrics List with Mini Progress Bars -->
                  <div class="flex-1 space-y-1.5 text-xs min-w-0 font-spec-cn">
                    <div
                      v-for="cat in facilitySourceStats"
                      :key="cat.id"
                      class="p-1.5 rounded transition bg-[rgba(10,36,58,0.55)] border flex flex-col gap-1 cursor-pointer"
                      :class="hoveredFacilityCategory === cat.id ? 'border-[#3FD0FF] bg-[rgba(14,46,78,0.9)] shadow-sm' : 'border-[rgba(70,180,235,0.15)]'"
                      @mouseenter="hoveredFacilityCategory = cat.id"
                      @mouseleave="hoveredFacilityCategory = null"
                    >
                      <div class="flex items-center justify-between">
                        <div class="flex items-center gap-1.5 min-w-0">
                          <span class="w-2 h-2 rounded-xs shrink-0" :style="{ backgroundColor: cat.color }"></span>
                          <span class="text-[11px] text-[#DCF2FF] truncate font-medium">{{ cat.shortName }}</span>
                        </div>
                        <div class="flex items-center gap-2 font-spec-num shrink-0 text-[10.5px]">
                          <span class="text-[#8FB6D4]">正常 {{ cat.normal }}/{{ cat.total }}</span>
                          <span class="font-bold text-[#9BEAFF]">{{ cat.percentage }}%</span>
                        </div>
                      </div>
                      <!-- Category Progress Track -->
                      <div class="w-full h-1 bg-black/40 rounded-full overflow-hidden">
                        <div
                          class="h-full rounded-full transition-all duration-300"
                          :style="{ width: `${cat.percentage}%`, backgroundColor: cat.color }"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 设施运行与在线度简报底栏 -->
              <div class="pt-1.5 border-t border-[rgba(70,180,235,0.16)] flex items-center justify-between text-[10.5px] text-[#8FB6D4] shrink-0 font-spec-cn">
                <span>设施健康度评定：<span class="text-[#3DDC97] font-bold font-spec-num">优良 (98.2分)</span></span>
                <span>巡检消缺：<span class="text-[#DCF2FF]">月度全域覆盖</span></span>
              </div>
            </div>
          </div>

          <!-- ================= 专项 Card 2: 重点取水户概况 ================= -->
          <div class="spec-card rounded-lg p-3 flex-1 min-h-0 flex flex-col gap-2 overflow-hidden">
            <!-- Card Header -->
            <div class="flex items-center justify-between pb-1.5 shrink-0">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-[#3FD0FF] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polygon points="12 2 21 7 21 17 12 22 3 17 3 7 12 2" stroke-width="1.8" />
                  <polygon points="12 6 18 9.5 18 14.5 12 18 6 14.5 6 9.5 12 6" stroke-width="1.2" stroke-opacity="0.6" />
                </svg>
                <h2 class="text-sm 2xl:text-[15.5px] font-semibold text-[#E4F6FF] tracking-[0.8px]">重点取水户概况</h2>
              </div>
              <div class="text-xs text-[#3FD0FF] font-spec-num">
                纳管率: <span class="font-bold text-[#3FD0FF]">100%</span>
                <span class="text-[#8FB6D4] ml-1 font-spec-cn">重点监控 58 家</span>
              </div>
            </div>
            <div class="spec-header-divider mb-1"></div>

            <!-- 4大核心统计参数: 重点取水户数量、年许可水量总量、今日累计取水量、今日告警次数 -->
            <div class="grid grid-cols-4 gap-2 shrink-0">
              <!-- 1. 重点取水户数量 -->
              <div class="bg-[rgba(10,36,58,0.5)] border border-[rgba(70,180,235,0.16)] rounded p-2 text-center">
                <span class="text-[10px] text-[#8FB6D4] block font-medium">重点取水户</span>
                <div class="flex items-baseline justify-center gap-0.5 mt-0.5">
                  <span class="text-xl font-bold font-spec-num text-[#3FD0FF]">{{ majorUserStats.totalCount }}</span>
                  <span class="text-[10px] text-[#8FB6D4] font-spec-cn">家</span>
                </div>
                <span class="text-[9px] text-[#5D8AAA] block mt-0.5">规上重点监造</span>
              </div>

              <!-- 2. 年许可水量总量 -->
              <div class="bg-[rgba(10,36,58,0.5)] border border-[rgba(70,180,235,0.16)] rounded p-2 text-center">
                <span class="text-[10px] text-[#8FB6D4] block font-medium">年许可总量</span>
                <div class="flex items-baseline justify-center gap-0.5 mt-0.5">
                  <span class="text-xl font-bold font-spec-num text-[#9BEAFF]">{{ (majorUserStats.annualLicensedQuota / 10000).toFixed(2) }}</span>
                  <span class="text-[10px] text-[#8FB6D4] font-spec-cn">亿m³</span>
                </div>
                <span class="text-[9px] text-[#5D8AAA] block mt-0.5">占全域 71.8%</span>
              </div>

              <!-- 3. 今日累计取水量 -->
              <div class="bg-[rgba(10,36,58,0.5)] border border-[rgba(70,180,235,0.16)] rounded p-2 text-center">
                <span class="text-[10px] text-[#8FB6D4] block font-medium">今日累计取水</span>
                <div class="flex items-baseline justify-center gap-0.5 mt-0.5">
                  <span class="text-xl font-bold font-spec-num text-[#3FD0FF]">{{ majorUserStats.todayAccumulatedWater }}</span>
                  <span class="text-[10px] text-[#8FB6D4] font-spec-cn">万m³</span>
                </div>
                <span class="text-[9px] text-[#5D8AAA] block mt-0.5">较昨日 -1.2%</span>
              </div>

              <!-- 4. 今日告警次数 -->
              <div class="bg-rose-950/20 border border-[#FF6B7A]/40 rounded p-2 text-center">
                <span class="text-[10px] text-[#FF6B7A] block font-medium">今日告警次数</span>
                <div class="flex items-baseline justify-center gap-0.5 mt-0.5">
                  <span class="text-xl font-bold font-spec-num text-[#FF6B7A]">{{ majorUserStats.todayAlertCount }}</span>
                  <span class="text-[10px] text-[#FF6B7A] font-spec-cn">次</span>
                </div>
                <span class="text-[9px] text-[#FF6B7A]/80 block mt-0.5">高危预警 2次</span>
              </div>
            </div>

            <!-- 取水量排名列表 (框内独立平滑滚动展示，避免溢出卡片) -->
            <div class="flex-1 flex flex-col gap-1.5 min-h-0">
              <div class="flex items-center justify-between text-xs font-semibold text-[#DCF2FF] shrink-0">
                <span class="flex items-center gap-1">
                  <span class="text-[#3FD0FF] font-bold">|</span>
                  <span>重点取水户取水量排名 (Top 5)</span>
                </span>
                <span class="text-[10px] text-[#8FB6D4] font-normal">框内滚动</span>
              </div>

              <!-- 框内平滑滚动列表容器 -->
              <div class="space-y-1.5 text-xs flex-1 min-h-0 max-h-[160px] 2xl:max-h-[210px] overflow-y-auto custom-dark-scrollbar pr-1">
                <div
                  v-for="(user, idx) in majorUserRankings"
                  :key="user.id"
                  class="p-2 rounded bg-[rgba(10,36,58,0.5)] border border-[rgba(70,180,235,0.16)] hover:bg-[#0d2a52] transition flex flex-col gap-1.5 cursor-pointer"
                  @click="navigate('enterprise_dossier')"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2 min-w-0">
                      <span
                        class="w-4 h-4 rounded-full flex items-center justify-center font-spec-num font-bold text-[10px] shrink-0"
                        :class="idx === 0 ? 'bg-[#FFC65C] text-amber-950' : idx === 1 ? 'bg-slate-300 text-slate-900' : idx === 2 ? 'bg-[#1E7BE8] text-white' : 'bg-slate-700 text-slate-300'"
                      >
                        {{ idx + 1 }}
                      </span>
                      <span class="font-medium text-[#DCF2FF] truncate max-w-[210px] 2xl:max-w-[250px]" :title="user.name">{{ user.name }}</span>
                    </div>

                    <div class="flex items-center gap-2.5 font-spec-num shrink-0">
                      <span class="text-[#8FB6D4] text-[11px]">今日 {{ user.todayWater }}m³</span>
                      <span
                        class="text-xs font-bold"
                        :class="user.progressRate >= 90 ? 'text-[#FF6B7A]' : user.progressRate >= 80 ? 'text-[#FFC65C]' : 'text-[#3FD0FF]'"
                      >
                        {{ user.progressRate }}%
                      </span>
                    </div>
                  </div>

                  <!-- 年度取水进度条与配额使用情况 -->
                  <div class="flex items-center gap-2 text-[10px] text-[#8FB6D4] font-spec-num">
                    <div class="flex-1 h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                      <div
                        class="h-full rounded-full transition-all duration-300"
                        :class="user.progressRate >= 90 ? 'bg-gradient-to-r from-amber-500 to-[#FF6B7A]' : user.progressRate >= 80 ? 'bg-gradient-to-r from-[#3FD0FF] to-[#FFC65C]' : 'bg-gradient-to-r from-[#3FD0FF] to-[#1E7BE8]'"
                        :style="{ width: `${user.progressRate}%` }"
                      ></div>
                    </div>
                    <span class="shrink-0 text-[10px] text-[#8FB6D4]">已累取 {{ user.annualAccumulated }} / 许可 {{ user.annualLicensed }}万m³</span>
                  </div>
                </div>
              </div>

              <!-- 重点户监管底栏 -->
              <div class="pt-1.5 border-t border-[rgba(70,180,235,0.16)] flex items-center justify-between text-[10.5px] text-[#8FB6D4] shrink-0">
                <span>重点户纳管覆盖：<span class="text-[#3FD0FF] font-bold">100% 实时遥测</span></span>
                <span>异常工单：<span class="text-[#FFC65C] font-bold">0 未派</span></span>
              </div>
            </div>
          </div>
        </template>

      </aside>

      <!-- ================= Central Column: Top 6-Metrics KPI Banner & Unblocked Map Overlay ================= -->
      <div class="flex-1 min-w-0 pointer-events-none relative flex flex-col justify-between items-center pt-2 pb-3 z-30 h-full">
        <!-- 6 Metrics Banner (Above Map) with design spec styling -->
        <div class="w-full max-w-5xl px-3 pointer-events-auto">
          <div
            id="dev-anno-6"
            class="spec-card rounded-lg shadow-[0_8px_30px_rgba(0,10,20,0.7)] overflow-hidden relative transition-all duration-300"
            :class="{ 'ring-2 ring-[#FFB800] shadow-[0_0_24px_rgba(255,184,0,0.65)]': activeAnnotationId === 6 }"
          >
            <!-- Numbered Point 6 Badge (核心指标与直报看板 - 地图上方) -->
            <div
              v-if="showAnnotationBadges && scenarioMode === 'comprehensive'"
              class="absolute -top-1.5 -left-1.5 z-40 flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-[#FFD043] to-[#FF9F00] text-[#0A1626] font-extrabold text-xs shadow-[0_0_12px_rgba(255,184,0,0.95)] border-2 border-white cursor-pointer select-none transition-all duration-300 hover:scale-125"
              :class="{ 'scale-125 ring-4 ring-[#FFB800]/60 animate-bounce': activeAnnotationId === 6 }"
              @mouseenter="activeAnnotationId = 6"
              @mouseleave="activeAnnotationId = null"
              @click="scrollToAnnotation(6)"
              title="开发标注 #6: 核心指标与直报看板 (地图上方)"
            >
              6
            </div>
            <!-- 6 Columns Grid with Dividers -->
            <div class="grid grid-cols-6 divide-x divide-[rgba(70,180,235,0.18)] py-2.5 px-1 bg-[rgba(6,22,40,0.35)]">
              <div
                v-for="item in topMapMetrics"
                :key="item.title"
                class="flex flex-col items-center justify-center px-2 py-1 text-center hover:bg-white/5 transition-colors cursor-pointer group"
                @click="item.action()"
              >
                <!-- Title -->
                <span class="text-xs 2xl:text-[13px] font-semibold text-[#8FB6D4] tracking-wide group-hover:text-[#9BEAFF] transition-colors">
                  {{ item.title }}
                </span>
                
                <!-- Main Value (Spec KPI Gradient) -->
                <div class="my-1 flex items-baseline justify-center gap-1">
                  <span class="text-2xl lg:text-[27px] font-bold tracking-tight spec-kpi-val group-hover:scale-105 transition-transform duration-150 inline-block font-spec-num">
                    {{ item.value }}
                  </span>
                  <span class="text-xs text-[#8FB6D4] font-spec-cn font-medium">
                    {{ item.unit }}
                  </span>
                </div>

                <!-- Subtitle / Status badge -->
                <div class="text-[11px] font-medium flex items-center justify-center gap-1.5 mt-0.5" :class="item.subClass">
                  <span v-if="item.iconType === 'warning'" class="inline-flex items-center text-[#FFC65C]">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </span>
                  <span v-else-if="item.iconType === 'red-dot'" class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B7A] opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-[#FF6B7A]"></span>
                  </span>
                  <span class="font-spec-num">{{ item.subText }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ================= 行政区划全局统一搜索 (地图左上角，顶部对齐地图图层，整体下移至 top-28，支持收起/展开) ================= -->
        <div
          id="dev-anno-5"
          class="absolute top-28 left-6 pointer-events-auto z-30 transition-all duration-300"
          :class="{ 'ring-2 ring-[#FFB800] rounded-xl shadow-[0_0_28px_rgba(255,184,0,0.7)]': activeAnnotationId === 5 }"
        >
          <!-- Numbered Point 5 Badge (西宁全域 GIS 数字孪生底图 - 核心) -->
          <div
            v-if="showAnnotationBadges && scenarioMode === 'comprehensive'"
            class="absolute -top-3 -left-2.5 z-50 flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-[#FFD043] to-[#FF9F00] text-[#0A1626] font-extrabold text-xs shadow-[0_0_12px_rgba(255,184,0,0.95)] border-2 border-white cursor-pointer select-none transition-all duration-300 hover:scale-125 pointer-events-auto"
            :class="{ 'scale-125 ring-4 ring-[#FFB800]/60 animate-bounce': activeAnnotationId === 5 }"
            @mouseenter="activeAnnotationId = 5"
            @mouseleave="activeAnnotationId = null"
            @click="scrollToAnnotation(5)"
            title="开发标注 #5: 西宁全域 GIS 数字孪生底图 (核心)"
          >
            5
          </div>
          <!-- 1. 收起状态：紧凑胶囊入口 -->
          <div
            v-if="isDistrictPanelCollapsed"
            class="spec-card rounded px-3 py-1.5 shadow-2xl flex items-center gap-2 cursor-pointer hover:border-[#3FD0FF] transition group"
            @click="isDistrictPanelCollapsed = false"
            title="点击展开行政区划与全局搜索"
          >
            <span class="w-2 h-2 rounded-full bg-[#3FD0FF] shadow-[0_0_6px_#3FD0FF]"></span>
            <span class="text-xs font-semibold text-[#DCF2FF] tracking-wide">行政区划</span>
            <span
              class="text-[10px] px-1.5 py-0.5 rounded font-spec-num font-medium border"
              :class="filterParams.district === '西宁市'
                ? 'bg-[#3FD0FF]/15 text-[#9BEAFF] border-[#3FD0FF]/40'
                : 'bg-[#1E7BE8]/25 text-[#DCF2FF] border-[#3FD0FF]/50 font-bold'"
            >
              {{ filterParams.district === '西宁市' ? '全市视角' : filterParams.district }}
            </span>
            <span class="text-[11px] text-[#3FD0FF] group-hover:text-[#9BEAFF] transition ml-0.5 flex items-center gap-0.5 font-medium">
              <span>展开</span>
              <svg class="w-3.5 h-3.5 transition group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18l6-6-6-6"></path>
              </svg>
            </span>
          </div>

          <!-- 2. 展开状态：完整行政区划与全局搜索卡片 -->
          <div
            v-else
            class="w-72 2xl:w-80 spec-card rounded-lg p-2.5 shadow-2xl transition-all"
          >
            <!-- Header: Title, Selected District Badge & 收起/重置操作 -->
            <div class="flex items-center justify-between pb-1.5 mb-1.5">
              <div class="flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-[#3FD0FF] shadow-[0_0_6px_#3FD0FF]"></span>
                <span class="text-xs font-semibold text-[#E4F6FF] tracking-wide">行政区划 · 全局搜索</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span
                  class="text-[10px] font-medium px-1.5 py-0.5 rounded border transition font-spec-num"
                  :class="filterParams.district === '西宁市'
                    ? 'bg-[#3FD0FF]/15 text-[#9BEAFF] border-[#3FD0FF]/40'
                    : 'bg-[#1E7BE8]/25 text-[#DCF2FF] border-[#3FD0FF]/50 font-bold'"
                >
                  {{ filterParams.district === '西宁市' ? '全市视角' : filterParams.district }}
                </span>
                <button
                  v-if="filterParams.district !== '西宁市'"
                  type="button"
                  @click="resetMapView"
                  class="text-[10px] text-[#3FD0FF] hover:text-[#9BEAFF] transition cursor-pointer p-0.5"
                  title="重置为全域西宁"
                >
                  重置
                </button>
                <button
                  type="button"
                  @click="isDistrictPanelCollapsed = true"
                  class="flex items-center gap-0.5 text-[10px] text-[#8FB6D4] hover:text-[#3FD0FF] transition cursor-pointer px-1 py-0.5 rounded hover:bg-white/10 ml-0.5"
                  title="收起行政区划"
                >
                  <span>收起</span>
                  <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 18l-6-6 6-6"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div class="spec-header-divider mb-2"></div>

            <!-- Global Unified Search Input -->
            <div class="relative">
              <div class="flex items-center bg-[#07172f] border border-[#1b4372] focus-within:border-cyan-400 rounded-lg px-2.5 py-1.5 transition">
                <svg class="w-3.5 h-3.5 text-cyan-400 shrink-0 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  v-model="globalSearchText"
                  type="text"
                  placeholder="搜索行政区划 / 计量点 / 用水企业 / 预警..."
                  class="w-full bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none"
                  @keydown.esc="globalSearchText = ''"
                />
                <button
                  v-if="globalSearchText"
                  type="button"
                  @click="globalSearchText = ''"
                  class="text-slate-400 hover:text-white transition p-0.5 text-xs cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <!-- Unified Search Dropdown Results -->
              <div
                v-if="globalSearchText.trim().length > 0"
                class="absolute left-0 right-0 top-full mt-1.5 bg-[#06182e]/98 border border-cyan-500/60 rounded-xl shadow-2xl p-2 max-h-72 overflow-y-auto space-y-2 z-50 divide-y divide-[#1b4372]/60"
              >
                <!-- 1. 区划匹配结果 -->
                <div v-if="matchedDistricts.length > 0" class="pt-1 first:pt-0">
                  <div class="text-[10px] font-semibold text-slate-300 mb-1 flex items-center justify-between">
                    <span class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>行政区划 ({{ matchedDistricts.length }})</span>
                    <span class="text-slate-400 font-normal">点击切换</span>
                  </div>
                  <div class="space-y-1">
                    <div
                      v-for="d in matchedDistricts"
                      :key="d"
                      class="flex items-center justify-between px-2 py-1 rounded hover:bg-[#0c2447] text-xs text-slate-200 hover:text-white cursor-pointer transition"
                      @click="selectSearchDistrict(d)"
                    >
                      <span class="font-medium">{{ d }}</span>
                      <span class="text-[10px] text-cyan-300">切换视角 &gt;</span>
                    </div>
                  </div>
                </div>

                <!-- 2. 计量点匹配结果 -->
                <div v-if="matchedMeters.length > 0" class="pt-1.5">
                  <div class="text-[10px] font-semibold text-slate-300 mb-1 flex items-center justify-between">
                    <span class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>计量点 ({{ matchedMeters.length }})</span>
                    <span class="text-slate-400 font-normal">点击定位详情</span>
                  </div>
                  <div class="space-y-1 max-h-32 overflow-y-auto">
                    <div
                      v-for="m in matchedMeters"
                      :key="m.id"
                      class="p-1.5 rounded hover:bg-[#0c2447] text-xs cursor-pointer transition flex items-center justify-between"
                      @click="selectSearchMeter(m)"
                    >
                      <div class="min-w-0 pr-2">
                        <div class="font-semibold text-white truncate text-[11px]">{{ m.name }}</div>
                        <div class="text-[10px] text-slate-400 flex items-center gap-1.5">
                          <span>{{ m.district }}</span>
                          <span>·</span>
                          <span class="font-mono text-slate-300">{{ m.meterCode }}</span>
                        </div>
                      </div>
                      <span
                        class="text-[10px] px-1.5 py-0.2 rounded shrink-0 font-medium"
                        :class="m.meterStatus === 'normal' ? 'bg-slate-800 text-slate-300 border border-slate-700' : m.meterStatus === 'fault' ? 'bg-rose-950/60 text-rose-300 border border-rose-500/30' : 'bg-amber-950/60 text-amber-300 border border-amber-500/30'"
                      >
                        {{ m.meterStatus === 'normal' ? '正常' : m.meterStatus === 'fault' ? '故障' : '待检' }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- 3. 用水户匹配结果 -->
                <div v-if="matchedUsers.length > 0" class="pt-1.5">
                  <div class="text-[10px] font-semibold text-slate-300 mb-1 flex items-center justify-between">
                    <span class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>重点用水户 ({{ matchedUsers.length }})</span>
                    <span class="text-slate-400 font-normal">点击定位</span>
                  </div>
                  <div class="space-y-1 max-h-28 overflow-y-auto">
                    <div
                      v-for="u in matchedUsers"
                      :key="u.id"
                      class="p-1.5 rounded hover:bg-[#0c2447] text-xs cursor-pointer transition flex items-center justify-between"
                      @click="selectSearchUser(u)"
                    >
                      <div class="min-w-0 pr-2">
                        <div class="font-semibold text-white truncate text-[11px]">{{ u.name }}</div>
                        <div class="text-[10px] text-slate-400 flex items-center gap-1.5">
                          <span>{{ u.district }}</span>
                          <span>·</span>
                          <span>{{ u.industryLabel }}</span>
                        </div>
                      </div>
                      <span class="text-[10px] text-slate-300 font-mono">{{ u.actualVolume }}m³</span>
                    </div>
                  </div>
                </div>

                <!-- 4. 预警事件匹配结果 -->
                <div v-if="matchedWarnings.length > 0" class="pt-1.5">
                  <div class="text-[10px] font-semibold text-slate-300 mb-1 flex items-center justify-between">
                    <span class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-rose-400"></span>预警事件 ({{ matchedWarnings.length }})</span>
                    <span class="text-slate-400 font-normal">点击研判</span>
                  </div>
                  <div class="space-y-1 max-h-28 overflow-y-auto">
                    <div
                      v-for="w in matchedWarnings"
                      :key="w.id"
                      class="p-1.5 rounded hover:bg-[#0c2447] text-xs cursor-pointer transition flex items-center justify-between"
                      @click="selectSearchWarning(w)"
                    >
                      <div class="min-w-0 pr-2">
                        <div class="font-semibold text-white truncate text-[11px]">{{ w.title }}</div>
                        <div class="text-[10px] text-slate-400 flex items-center gap-1.5">
                          <span>{{ w.district }}</span>
                          <span>·</span>
                          <span class="text-slate-300">{{ w.enterprise }}</span>
                        </div>
                      </div>
                      <span class="text-[10px] px-1.5 py-0.2 rounded bg-rose-950/60 text-rose-300 border border-rose-500/30 shrink-0 font-medium">
                        {{ w.levelLabel }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- 无匹配结果提示 -->
                <div v-if="!matchedDistricts.length && !matchedMeters.length && !matchedUsers.length && !matchedWarnings.length" class="py-4 text-center text-slate-400 text-xs">
                  未检索到与 "{{ globalSearchText }}" 相关的信息
                </div>
              </div>
            </div>

            <!-- Quick District Switcher Pills (行政区划快捷检索切换) -->
            <div class="mt-2 pt-2 border-t border-[#1b4372]/60">
              <div class="text-[10px] font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>行政区划快捷直达:</span>
                <span class="text-[9px] text-slate-400 font-mono">4区3县</span>
              </div>
              <div class="grid grid-cols-4 gap-1 text-[11px]">
                <button
                  v-for="dist in quickDistrictList"
                  :key="dist"
                  type="button"
                  class="py-1 px-1 rounded text-center transition cursor-pointer border truncate text-[11px]"
                  :class="filterParams.district === dist
                    ? 'bg-cyan-500/30 text-cyan-200 border-cyan-400/80 font-bold shadow-[0_0_6px_rgba(6,182,212,0.3)]'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'"
                  @click="selectSearchDistrict(dist)"
                >
                  {{ dist === '西宁市' ? '全域' : dist.replace(/区|县/, '') }}
                </button>
              </div>
            </div>

            <!-- District Overview Mini Summary (when a district is selected) -->
            <div v-if="filterParams.district !== '西宁市'" class="mt-2 pt-1.5 border-t border-[#1b4372]/40 flex items-center justify-between text-[10px] text-slate-300">
              <span>{{ filterParams.district }} 监控状态:</span>
              <span class="font-mono text-cyan-300 font-bold">{{ filteredMeterPoints.length }} 测站 · {{ currentDistrictUsersCount }} 重点户</span>
            </div>
          </div>
        </div>

        <!-- ================= Floating Map Controls (Top Right of Center Area - 顶部对齐行政区划，统一 top-28) ================= -->
        <div class="absolute top-28 right-4 pointer-events-auto z-30 flex flex-col items-end gap-2">
          <!-- Layer Toolbox (3核心图层: 计量点 / 用水户 / 预警事件) -->
          <div class="spec-card flex flex-col rounded-xl p-2.5 shadow-2xl text-xs w-[136px] 2xl:w-[144px]">
            <!-- Header with Compass & reset button -->
            <div class="px-1 py-0.5 flex items-center justify-between border-b border-[rgba(70,180,235,0.2)] mb-1.5">
              <div class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-[#00E5FF] shrink-0" viewBox="0 0 16 16" fill="none">
                  <polygon points="8,1 15,4.5 15,11.5 8,15 1,11.5 1,4.5" stroke="#00E5FF" stroke-width="1.2" fill="none" />
                  <circle cx="8" cy="8" r="2" fill="#00E5FF" />
                </svg>
                <span class="text-[11px] font-bold text-white tracking-wide font-spec-cn">地图图层</span>
              </div>
              <div class="flex items-center gap-1">
                <!-- Compass (指北针徽标) -->
                <button
                  type="button"
                  class="w-5 h-5 rounded-full border border-[rgba(70,180,235,0.4)] bg-[#071932] flex items-center justify-center cursor-pointer hover:border-[#00E5FF] hover:bg-[#00E5FF]/20 transition shadow-sm"
                  title="正北方向·点击重置全域视角"
                  @click="resetMapView"
                >
                  <span class="text-[9px] font-bold text-[#00E5FF] font-spec-num leading-none">N</span>
                </button>
                <button
                  type="button"
                  class="text-[#5D8AAA] hover:text-[#00E5FF] transition cursor-pointer p-0.5 rounded hover:bg-white/5"
                  title="重置全域视角"
                  @click="resetMapView"
                >
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                    <path d="M3 3v5h5"></path>
                  </svg>
                </button>
              </div>
            </div>

            <!-- A. 综合应用场景专属图层 (无点位，核心为水量使用情况等地图图层) -->
            <template v-if="scenarioMode === 'comprehensive'">
              <div class="flex flex-col gap-1.5">
                <!-- 1. 水量使用情况图层 (4个等级颜色标记各区域) -->
                <button
                  type="button"
                  class="map-layer-tile group relative min-h-[64px] px-1 py-1.5 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-200"
                  :class="activeLayers.waterUsage
                    ? 'is-active text-cyan-100'
                    : 'text-[#8FB6D4] hover:text-white'"
                  :aria-pressed="activeLayers.waterUsage"
                  @click="activeLayers.waterUsage = !activeLayers.waterUsage"
                  title="按水量使用情况4个等级（>100万方、>70万方、>50万方、<50万方）色块标记各区域"
                >
                  <span class="map-layer-hex-shell">
                    <span class="map-layer-hex">
                      <svg class="w-[19px] h-[19px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 3 3 7.5 12 12l9-4.5L12 3Z" fill="currentColor" stroke="none" />
                        <path d="m3 12 9 4.5 9-4.5" />
                        <path d="m3 16.5 9 4.5 9-4.5" />
                      </svg>
                    </span>
                  </span>
                  <span class="text-[10px] leading-none whitespace-nowrap font-medium">水量使用</span>
                </button>

                <!-- 2. 到报率图层 -->
                <button
                  type="button"
                  class="map-layer-tile group relative min-h-[64px] px-1 py-1.5 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-200"
                  :class="activeLayers.arrivalRate
                    ? 'is-active text-emerald-100'
                    : 'text-[#8FB6D4] hover:text-white'"
                  :aria-pressed="activeLayers.arrivalRate"
                  @click="activeLayers.arrivalRate = !activeLayers.arrivalRate"
                  title="在行政区划内展示整体到报率，悬浮可查看证照、在线计量与非在线计量接入情况"
                >
                  <span class="map-layer-hex-shell">
                    <span class="map-layer-hex">
                      <svg class="w-[18px] h-[18px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="8.5" />
                        <path d="M8.5 15.5a5 5 0 0 1 7 0" />
                        <path d="M6.5 13a8 8 0 0 1 11 0" />
                        <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
                      </svg>
                    </span>
                  </span>
                  <span class="text-[10px] leading-none whitespace-nowrap font-medium">到报率</span>
                </button>

                <!-- 3. 用水户图层 (综合应用场景展示) -->
                <button
                  type="button"
                  class="map-layer-tile group relative min-h-[64px] px-1 py-1.5 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-200"
                  :class="activeLayers.users
                    ? 'is-active text-blue-100'
                    : 'text-[#8FB6D4] hover:text-white'"
                  :aria-pressed="activeLayers.users"
                  @click="activeLayers.users = !activeLayers.users"
                  title="展示重点规上工业 / 现代化灌区 / 自来水厂分布"
                >
                  <span class="map-layer-hex-shell">
                    <span class="map-layer-hex">
                      <svg class="w-[18px] h-[18px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 21V8l7-4 7 4v13" />
                        <path d="M9 21v-5h6v5M9 9h.01M15 9h.01M9 12h.01M15 12h.01" />
                      </svg>
                    </span>
                  </span>
                  <span class="text-[10px] leading-none whitespace-nowrap font-medium">用水户</span>
                </button>

            <!-- 4. 直报超计划预警图层 (直报 > 计划 红色边缘标记) -->
                <button
                  type="button"
                  class="map-layer-tile group relative min-h-[64px] px-1 py-1.5 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-200"
                  :class="activeLayers.quotaWarning
                    ? 'is-active text-rose-100'
                    : 'text-[#8FB6D4] hover:text-white'"
                  :aria-pressed="activeLayers.quotaWarning"
                  @click="activeLayers.quotaWarning = !activeLayers.quotaWarning"
                  title="直报水量大于计划水量时，行政区划边缘用红色显著标记"
                >
                  <span class="map-layer-hex-shell">
                    <span class="map-layer-hex">
                      <svg class="w-[18px] h-[18px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 3 4.5 6v5.4c0 4.6 3.2 7.6 7.5 9.6 4.3-2 7.5-5 7.5-9.6V6L12 3Z" />
                        <path d="M12 8v4.5" />
                        <circle cx="12" cy="16" r="0.9" fill="currentColor" stroke="none" />
                      </svg>
                    </span>
                  </span>
                  <span class="text-[10px] leading-none whitespace-nowrap font-medium">超计划</span>
                </button>
              </div>
            </template>

            <!-- B. 专项业务应用场景图层 (计量点 / 用水户 / 预警事件) -->
            <template v-else>
              <div class="flex flex-col gap-1.5">
                <!-- 1. 计量点图层 -->
                <button
                  type="button"
                  class="map-layer-tile group relative min-h-[64px] px-1 py-1.5 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-200"
                  :class="activeLayers.meters
                    ? 'is-active text-cyan-100'
                    : 'text-[#8FB6D4] hover:text-white'"
                  :aria-pressed="activeLayers.meters"
                  @click="toggleMeterLayer"
                  title="展示西宁全域计量点分布与运行状态"
                >
                  <span class="map-layer-hex-shell">
                    <span class="map-layer-hex">
                      <svg class="w-[18px] h-[18px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="8.5" />
                        <path d="M12 12l4-3" />
                        <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
                        <path d="M8.5 19.5h7" />
                      </svg>
                    </span>
                  </span>
                  <span class="text-[10px] leading-none whitespace-nowrap font-medium">计量点</span>
                </button>

                <!-- 2. 到报率图层 -->
                <button
                  type="button"
                  class="map-layer-tile group relative min-h-[64px] px-1 py-1.5 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-200"
                  :class="activeLayers.arrivalRate
                    ? 'is-active text-emerald-100'
                    : 'text-[#8FB6D4] hover:text-white'"
                  :aria-pressed="activeLayers.arrivalRate"
                  @click="activeLayers.arrivalRate = !activeLayers.arrivalRate"
                  title="在行政区划内展示整体到报率，悬浮可查看证照、在线计量与非在线计量接入情况"
                >
                  <span class="map-layer-hex-shell">
                    <span class="map-layer-hex">
                      <svg class="w-[18px] h-[18px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="8.5" />
                        <path d="M8.5 15.5a5 5 0 0 1 7 0" />
                        <path d="M6.5 13a8 8 0 0 1 11 0" />
                        <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
                      </svg>
                    </span>
                  </span>
                  <span class="text-[10px] leading-none whitespace-nowrap font-medium">到报率</span>
                </button>

                <!-- 3. 预警事件图层 -->
                <button
                  type="button"
                  class="map-layer-tile group relative min-h-[64px] px-1 py-1.5 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-200"
                  :class="activeLayers.warnings
                    ? 'is-active text-rose-100'
                    : 'text-[#8FB6D4] hover:text-white'"
                  :aria-pressed="activeLayers.warnings"
                  @click="activeLayers.warnings = !activeLayers.warnings"
                  title="展示超许可预警 / 设备离线等告警点位"
                >
                  <span class="map-layer-hex-shell">
                    <span class="map-layer-hex">
                      <svg class="w-[18px] h-[18px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                        <path d="M10 21h4" />
                      </svg>
                    </span>
                  </span>
                  <span class="text-[10px] leading-none whitespace-nowrap font-medium">预警事件</span>
                </button>
              </div>
            </template>
          </div>
        </div>

        <!-- ================= Fully Visible Map Legend (Bottom-Left of Center Area) ================= -->
        <div class="absolute bottom-16 left-6 pointer-events-auto z-30">
          <div class="spec-card rounded-xl p-2.5 shadow-2xl transition-all duration-200 min-w-[260px] max-w-[290px]">
            <!-- Legend Header -->
            <div class="flex items-center justify-between gap-3 pb-1.5 border-b border-[rgba(70,180,235,0.2)]">
              <div class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-[#3FD0FF] shrink-0" viewBox="0 0 16 16" fill="none">
                  <polygon points="8,1 15,4.5 15,11.5 8,15 1,11.5 1,4.5" stroke="#3FD0FF" stroke-width="1.2" fill="none" />
                  <circle cx="8" cy="8" r="2" fill="#3FD0FF" />
                </svg>
                <span class="text-xs font-bold text-white tracking-wide font-spec-cn">
                  {{ scenarioMode === 'comprehensive' ? '水量使用情况' : '西宁全域监控图例' }}
                </span>
              </div>
              <div class="flex items-center gap-2">
                <button
                  v-if="selectedUsageTierFilter"
                  type="button"
                  class="text-[10.5px] text-[#3FD0FF] hover:underline cursor-pointer"
                  @click.stop="selectedUsageTierFilter = null"
                >
                  重置
                </button>
                <button
                  type="button"
                  class="text-[11px] text-[#5D8AAA] hover:text-[#3FD0FF] transition cursor-pointer font-spec-cn"
                  @click="showMapLegend = !showMapLegend"
                >
                  {{ showMapLegend ? '收起' : '展开' }}
                </button>
              </div>
            </div>

            <!-- Legend Body (Unblocked and clean) -->
            <div v-if="showMapLegend" class="mt-2 space-y-1.5 text-xs">
              
              <!-- A. 综合应用场景图例：水量使用情况 4个等级图例 (极简紧凑 2x2 网格) -->
              <template v-if="scenarioMode === 'comprehensive'">
                <div class="grid grid-cols-2 gap-1.5">
                  <div
                    v-for="tier in waterUsageTiers"
                    :key="tier.id"
                    class="p-1.5 rounded transition-all cursor-pointer border flex items-center justify-between"
                    :class="selectedUsageTierFilter === tier.id
                      ? 'bg-[rgba(63,208,255,0.2)] border-[#3FD0FF] shadow-[0_0_8px_rgba(63,208,255,0.3)]'
                      : 'bg-[rgba(10,36,58,0.5)] border-[rgba(70,180,235,0.18)] hover:bg-[rgba(18,52,86,0.6)] hover:border-[#3FD0FF]/40'"
                    @click="selectedUsageTierFilter = selectedUsageTierFilter === tier.id ? null : tier.id"
                    :title="`${tier.label}: ${tier.districts.join('、')}`"
                  >
                    <div class="flex items-center gap-1.5 min-w-0">
                      <span
                        class="w-2.5 h-2.5 rounded-xs shrink-0 shadow-xs"
                        :style="{ backgroundColor: tier.color, border: '1px solid ' + tier.strokeColor }"
                      ></span>
                      <span class="text-[11px] font-bold font-spec-num text-[#E4F6FF] truncate">{{ tier.range }}</span>
                    </div>
                    <span class="text-[10px] text-[#5D8AAA] shrink-0 font-spec-num ml-1">{{ tier.districts.length }}区</span>
                  </div>
                </div>

                <!-- 直报超计划红边提示 (紧凑单行) -->
                <div
                  class="p-1.5 rounded transition-all cursor-pointer border flex items-center justify-between"
                  :class="selectedUsageTierFilter === 'exceeded'
                    ? 'bg-rose-500/20 border-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.3)]'
                    : 'bg-[rgba(10,36,58,0.5)] border-rose-500/30 hover:border-rose-400/60'"
                  @click="selectedUsageTierFilter = selectedUsageTierFilter === 'exceeded' ? null : 'exceeded'"
                  title="点击高亮直报水量超计划的区县"
                >
                  <div class="flex items-center gap-1.5">
                    <span class="w-2.5 h-2.5 rounded-xs border-2 border-rose-400 bg-rose-500/40 shrink-0"></span>
                    <span class="text-[11px] font-medium text-rose-200">直报超计划</span>
                    <span class="text-[10px] text-rose-300 font-spec-num font-normal">(直报 > 计划)</span>
                  </div>
                  <span class="text-[10px] px-1 py-0.2 rounded font-bold font-spec-num text-rose-300 bg-rose-500/20 border border-rose-500/40">
                    {{ exceededDistrictsList.length }} 区县
                  </span>
                </div>

                <!-- 取水户图例 (类型 + 超计划取水户) -->
                <div class="pt-1.5 border-t border-[rgba(70,180,235,0.18)]">
                  <div class="flex items-center justify-between mb-1.5">
                    <span class="text-[11px] font-semibold text-[#DCF2FF] font-spec-cn">取水户图例</span>
                    <span class="text-[10px] text-[#5D8AAA] font-spec-num">{{ waterUsersList.length }}户</span>
                  </div>
                  <div class="grid grid-cols-3 gap-1">
                    <div class="p-1 rounded bg-[rgba(10,36,58,0.5)] border border-[rgba(70,180,235,0.18)] flex items-center gap-1.5">
                      <span class="w-2.5 h-2.5 rotate-45 bg-[#38bdf8] border border-white/70 shrink-0"></span>
                      <span class="text-[10px] text-slate-300 font-spec-cn">规上工业</span>
                    </div>
                    <div class="p-1 rounded bg-[rgba(10,36,58,0.5)] border border-[rgba(70,180,235,0.18)] flex items-center gap-1.5">
                      <span class="w-2.5 h-2.5 rounded-xs bg-[#00e5ff] border border-white/70 shrink-0"></span>
                      <span class="text-[10px] text-slate-300 font-spec-cn">现代化灌区</span>
                    </div>
                    <div class="p-1 rounded bg-[rgba(10,36,58,0.5)] border border-[rgba(70,180,235,0.18)] flex items-center gap-1.5">
                      <span class="w-2.5 h-2.5 rounded-full bg-[#818cf8] border border-white/70 shrink-0"></span>
                      <span class="text-[10px] text-slate-300 font-spec-cn">自来水厂</span>
                    </div>
                  </div>
                  <div class="mt-1 p-1.5 rounded bg-[rgba(10,36,58,0.5)] border border-rose-500/40 flex items-center justify-between">
                    <div class="flex items-center gap-1.5">
                      <span class="w-2.5 h-2.5 rounded-full border-2 border-dashed border-rose-400 bg-rose-500/20 shrink-0"></span>
                      <span class="text-[10px] text-rose-200 font-spec-cn">超计划取水户</span>
                    </div>
                    <span class="text-[10px] font-bold font-spec-num text-rose-300">{{ overPlanWaterUsers.length }}户</span>
                  </div>
                </div>

                <!-- 底部快捷比对管控 -->
                <div class="pt-1.5 border-t border-[rgba(70,180,235,0.18)] flex items-center justify-between text-[10px] text-[#5D8AAA]">
                  <span>点击等级联动高亮地图</span>
                  <button
                    type="button"
                    class="px-2 py-0.5 rounded bg-[rgba(10,36,58,0.8)] hover:bg-[#1E7BE8]/30 text-[#9BEAFF] border border-[rgba(70,180,235,0.3)] cursor-pointer font-medium transition flex items-center gap-1"
                    @click.stop="showWaterQuotaModal = true"
                  >
                    <span>比对管控</span>
                    <span class="w-1.5 h-1.5 rounded-full bg-rose-400" v-if="exceededDistrictsList.length"></span>
                  </button>
                </div>
              </template>

              <!-- B. 专项业务应用场景图例：极简风格 (计量点3色状态、用水户纵向展示、预警事件保留) -->
              <template v-else>
                <!-- 1. 计量点运行状态 (仅展示正常、故障、待检定三个颜色) -->
                <div>
                  <div class="text-[11px] font-semibold text-slate-300 mb-1.5 font-spec-cn flex items-center justify-between">
                    <div class="flex items-center gap-1.5">
                      <span class="w-1.5 h-1.5 rounded-full bg-[#00E5FF]"></span>
                      <span>计量点运行状态</span>
                    </div>
                    <span class="text-[10px] text-[#5D8AAA] font-spec-num">{{ meterStats.total }}处</span>
                  </div>
                  <div class="flex items-center justify-between px-2 py-1.5 rounded bg-[rgba(10,36,58,0.5)] border border-[rgba(70,180,235,0.18)] text-[11px] font-spec-cn">
                    <!-- 正常 (绿色) -->
                    <div
                      class="flex items-center gap-1.5 cursor-pointer hover:opacity-85 transition"
                      :class="meterStatusFilter === 'normal' ? 'text-emerald-300 font-bold' : 'text-slate-200'"
                      @click="meterStatusFilter = meterStatusFilter === 'normal' ? 'all' : 'normal'"
                      title="点击筛选正常站点"
                    >
                      <span class="w-2.5 h-2.5 rounded-full bg-[#10b981] shadow-[0_0_6px_#10b981] border border-white/60"></span>
                      <span>正常</span>
                    </div>

                    <!-- 故障 (红色) -->
                    <div
                      class="flex items-center gap-1.5 cursor-pointer hover:opacity-85 transition"
                      :class="meterStatusFilter === 'fault' ? 'text-rose-300 font-bold' : 'text-slate-200'"
                      @click="meterStatusFilter = meterStatusFilter === 'fault' ? 'all' : 'fault'"
                      title="点击筛选故障站点"
                    >
                      <span class="w-2.5 h-2.5 rounded-full bg-[#ef4444] shadow-[0_0_6px_#ef4444] border border-white/60"></span>
                      <span>故障</span>
                    </div>

                    <!-- 待检定 (橙黄色) -->
                    <div
                      class="flex items-center gap-1.5 cursor-pointer hover:opacity-85 transition"
                      :class="meterStatusFilter === 'pending' ? 'text-amber-300 font-bold' : 'text-slate-200'"
                      @click="meterStatusFilter = meterStatusFilter === 'pending' ? 'all' : 'pending'"
                      title="点击筛选待检定站点"
                    >
                      <span class="w-2.5 h-2.5 rounded-full bg-[#f59e0b] shadow-[0_0_6px_#f59e0b] border border-white/60"></span>
                      <span>待检定</span>
                    </div>
                  </div>
                </div>

                <!-- 2. 用水户类型 (保留纵向展示) -->
                <div class="pt-1.5 border-t border-[rgba(70,180,235,0.18)]">
                  <div class="text-[11px] font-semibold text-slate-300 mb-1.5 font-spec-cn flex items-center justify-between">
                    <div class="flex items-center gap-1.5">
                      <span class="w-1.5 h-1.5 rounded-full bg-[#38BDF8]"></span>
                      <span>用水户类型</span>
                    </div>
                    <span class="text-[10px] text-[#5D8AAA] font-spec-num">{{ waterUsersList.length }}户</span>
                  </div>
                  <!-- 纵向展示 -->
                  <div class="space-y-1.5 px-2 py-1.5 rounded bg-[rgba(10,36,58,0.5)] border border-[rgba(70,180,235,0.18)] text-[11px] font-spec-cn text-slate-200">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <span class="w-2.5 h-2.5 bg-[#38bdf8] rotate-45 border border-white/80 shrink-0"></span>
                        <span class="text-[#DCF2FF]">规上工业</span>
                      </div>
                      <span class="text-[10px] text-[#5D8AAA] font-spec-num">5户</span>
                    </div>
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <span class="w-2.5 h-2.5 rounded-xs bg-[#00e5ff] border border-white/80 shrink-0"></span>
                        <span class="text-[#DCF2FF]">规上农业</span>
                      </div>
                      <span class="text-[10px] text-[#5D8AAA] font-spec-num">3处</span>
                    </div>
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <span class="w-2.5 h-2.5 rounded-full bg-[#818cf8] border border-white/80 shrink-0"></span>
                        <span class="text-[#DCF2FF]">公共供水</span>
                      </div>
                      <span class="text-[10px] text-[#5D8AAA] font-spec-num">2座</span>
                    </div>
                  </div>
                </div>

                <!-- 3. 预警事件展示保留 -->
                <div class="pt-1.5 border-t border-[rgba(70,180,235,0.18)]">
                  <div class="text-[11px] font-semibold text-slate-300 mb-1.5 font-spec-cn flex items-center justify-between">
                    <div class="flex items-center gap-1.5">
                      <span class="w-1.5 h-1.5 rounded-full bg-[#ef4444]"></span>
                      <span>预警事件展示</span>
                    </div>
                    <span class="text-[10px] text-[#5D8AAA] font-spec-num">{{ warningEventsList.length }}起</span>
                  </div>
                  <div class="flex items-center justify-between px-2 py-1.5 rounded bg-[rgba(10,36,58,0.5)] border border-[rgba(70,180,235,0.18)] text-[11px] font-spec-cn text-slate-200">
                    <div class="flex items-center gap-1.5">
                      <span class="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping shrink-0"></span>
                      <span>高风险预警</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <span class="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0"></span>
                      <span>中/低风险预警</span>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>

        <!-- ================= Bottom Center: Scenario Switcher Tabs (两个切换: 综合应用场景 / 专项业务应用场景) ================= -->
        <div class="absolute bottom-5 xl:bottom-6 inset-x-0 mx-auto w-fit pointer-events-auto z-30" id="dev-anno-7">
          <div
            class="spec-card flex items-center rounded-full p-1 shadow-[0_4px_28px_rgba(0,10,25,0.8)] text-xs gap-1.5 border border-[rgba(70,180,235,0.35)] relative transition-all duration-300"
            :class="{ 'ring-2 ring-[#FFB800] shadow-[0_0_24px_rgba(255,184,0,0.65)]': activeAnnotationId === 7 }"
          >
            <!-- Numbered Point 7 Badge (综合管控场景切换与图例联动 - 中下) -->
            <div
              v-if="showAnnotationBadges && scenarioMode === 'comprehensive'"
              class="absolute -top-2.5 -left-2.5 z-40 flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-[#FFD043] to-[#FF9F00] text-[#0A1626] font-extrabold text-xs shadow-[0_0_12px_rgba(255,184,0,0.95)] border-2 border-white cursor-pointer select-none transition-all duration-300 hover:scale-125"
              :class="{ 'scale-125 ring-4 ring-[#FFB800]/60 animate-bounce': activeAnnotationId === 7 }"
              @mouseenter="activeAnnotationId = 7"
              @mouseleave="activeAnnotationId = null"
              @click="scrollToAnnotation(7)"
              title="开发标注 #7: 综合管控场景切换与图例联动 (中下)"
            >
              7
            </div>
            <!-- 1. 综合应用场景 -->
            <button
              type="button"
              class="px-5 py-2 rounded-full font-bold transition-all duration-200 cursor-pointer flex items-center gap-2"
              :class="scenarioMode === 'comprehensive'
                ? 'bg-gradient-to-r from-[#00E5FF]/25 to-[#38BDF8]/15 text-white shadow-[0_0_16px_rgba(0,229,255,0.35)] border border-[#00E5FF]'
                : 'text-[#8AAEC8] hover:text-white hover:bg-white/5 border border-transparent'"
              @click="switchScenarioMode('comprehensive')"
            >
              <svg class="w-4 h-4 text-[#00E5FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              <span class="tracking-wide text-xs 2xl:text-sm font-spec-cn">综合应用场景</span>
            </button>

            <!-- 2. 专项业务应用场景 -->
            <button
              type="button"
              class="px-5 py-2 rounded-full font-bold transition-all duration-200 cursor-pointer flex items-center gap-2"
              :class="scenarioMode === 'special'
                ? 'bg-gradient-to-r from-[#00E5FF]/25 to-[#38BDF8]/15 text-white shadow-[0_0_16px_rgba(0,229,255,0.35)] border border-[#00E5FF]'
                : 'text-[#8AAEC8] hover:text-white hover:bg-white/5 border border-transparent'"
              @click="switchScenarioMode('special')"
            >
              <svg class="w-4 h-4 text-[#00E5FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span class="tracking-wide text-xs 2xl:text-sm font-spec-cn">专项业务应用场景</span>
            </button>
          </div>
        </div>

      </div>

      <!-- ================= 4. RIGHT COLUMN (综合应用场景 预警研判 vs 专项业务应用场景 异常处置与对比分析引擎) ================= -->
      <aside class="relative z-10 w-[395px] xl:w-[415px] 2xl:w-[440px] h-full p-1 xl:p-1.5 flex flex-col gap-2.5 pointer-events-auto shrink-0 overflow-y-auto custom-dark-scrollbar">
        
        <!-- A. 综合应用场景 (常态化预警监测 & 业务关联研判 & 计量点接入与到报率监控) -->
        <template v-if="scenarioMode === 'comprehensive'">
        <!-- ================= Right Box 1: 常态化预警监测 ================= -->
        <div
          id="dev-anno-8"
          class="spec-card p-3.5 flex-1 min-h-[200px] flex flex-col justify-between relative transition-all duration-300"
          :class="{ 'ring-2 ring-[#FFB800] shadow-[0_0_24px_rgba(255,184,0,0.65)]': activeAnnotationId === 8 }"
        >
          <!-- Numbered Point 8 Badge (常态化预警监测 - 右1) -->
          <div
            v-if="showAnnotationBadges && scenarioMode === 'comprehensive'"
            class="absolute -top-2 -left-2 z-40 flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-[#FFD043] to-[#FF9F00] text-[#0A1626] font-extrabold text-xs shadow-[0_0_12px_rgba(255,184,0,0.95)] border-2 border-white cursor-pointer select-none transition-all duration-300 hover:scale-125"
            :class="{ 'scale-125 ring-4 ring-[#FFB800]/60 animate-bounce': activeAnnotationId === 8 }"
            @mouseenter="activeAnnotationId = 8"
            @mouseleave="activeAnnotationId = null"
            @click="scrollToAnnotation(8)"
            title="开发标注 #8: 常态化预警监测 (右1)"
          >
            8
          </div>
          <div>
            <div class="flex items-center justify-between pb-2">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-[#00E5FF] shrink-0" viewBox="0 0 16 16" fill="none">
                  <polygon points="8,1 15,4.5 15,11.5 8,15 1,11.5 1,4.5" stroke="#00E5FF" stroke-width="1.2" fill="none" />
                  <polygon points="8,4 12,6 12,10 8,12 4,10 4,6" fill="rgba(0,229,255,0.3)" />
                </svg>
                <h2 class="text-sm 2xl:text-base font-bold text-white tracking-wide font-spec-cn">常态化预警监测</h2>
              </div>
              <button
                type="button"
                class="text-xs text-[#00E5FF] hover:text-[#79D8FF] transition cursor-pointer flex items-center gap-0.5 font-spec-cn"
                @click="navigate('violation_national')"
              >
                <span>更多</span>
                <span>&gt;</span>
              </button>
            </div>
            <div class="spec-header-divider mb-2"></div>
          </div>

          <!-- 3 Warning Status Badges (Enlarged) -->
          <div class="grid grid-cols-3 gap-2 my-1.5">
            <!-- 1. 接近计划值 (12) -->
            <div class="bg-[rgba(10,36,58,0.55)] border border-[rgba(255,198,92,0.3)] rounded-lg p-2.5 flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-full bg-[#FFC65C]/20 text-[#FFC65C] flex items-center justify-center shrink-0">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <div class="min-w-0">
                <div class="text-xs text-slate-200 font-medium truncate font-spec-cn">接近计划值</div>
                <div class="text-xl font-bold font-spec-num text-[#FFC65C] leading-tight">12</div>
                <div class="text-[10px] text-[#5D8AAA] font-spec-num">80%≤占&lt;100%</div>
              </div>
            </div>

            <!-- 2. 超计划预警 (7) -->
            <div class="bg-[rgba(10,36,58,0.55)] border border-[rgba(255,159,67,0.35)] rounded-lg p-2.5 flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-full bg-[#FF9F43]/20 text-[#FF9F43] flex items-center justify-center shrink-0">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2l10 18H2L12 2z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <div class="min-w-0">
                <div class="text-xs text-slate-200 font-medium truncate font-spec-cn">超计划预警</div>
                <div class="text-xl font-bold font-spec-num text-[#FF9F43] leading-tight">7</div>
                <div class="text-[10px] text-[#5D8AAA] font-spec-num">占比≥100%</div>
              </div>
            </div>

            <!-- 3. 超许可预警 (3) -->
            <div class="bg-[rgba(10,36,58,0.55)] border border-[rgba(255,107,122,0.35)] rounded-lg p-2.5 flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-full bg-[#FF6B7A]/20 text-[#FF6B7A] flex items-center justify-center shrink-0">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <div class="min-w-0">
                <div class="text-xs text-slate-200 font-medium truncate font-spec-cn">超许可预警</div>
                <div class="text-xl font-bold font-spec-num text-[#FF6B7A] leading-tight">3</div>
                <div class="text-[10px] text-[#5D8AAA] font-spec-num">超许可红线</div>
              </div>
            </div>
          </div>

          <!-- Table: 预警事项列表 (Improved readability) -->
          <div class="flex-1 min-h-[95px] mt-1 overflow-x-auto custom-dark-scrollbar">
            <div class="text-xs font-bold text-white mb-1.5 flex items-center gap-1.5 font-spec-cn">
              <span class="text-[#00E5FF] font-bold">|</span>
              <span>实时预警事项列表</span>
            </div>
            <table class="w-full text-xs text-left">
              <thead>
                <tr class="text-[#5D8AAA] border-b border-[rgba(70,180,235,0.2)] bg-[rgba(10,36,58,0.4)]">
                  <th class="py-1 px-1 font-medium font-spec-cn">预警类型</th>
                  <th class="py-1 px-1 font-medium font-spec-cn">行政区</th>
                  <th class="py-1 px-1 text-right font-medium font-spec-cn">当前用水(万m³)</th>
                  <th class="py-1 px-1 text-right font-medium font-spec-cn">占指标比</th>
                  <th class="py-1 px-1 text-right font-medium font-spec-cn">预警时间</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[rgba(70,180,235,0.12)] divide-dashed font-spec-num text-slate-300">
                <tr class="hover:bg-white/5 transition cursor-pointer" @click="handleEventClick('城东区接近计划值')">
                  <td class="py-1 px-1 text-[#FFC65C] font-spec-cn font-medium">接近计划值</td>
                  <td class="py-1 px-1 font-spec-cn">城东区</td>
                  <td class="py-1 px-1 text-right">8,432.21</td>
                  <td class="py-1 px-1 text-right text-[#FFC65C]">82.6%</td>
                  <td class="py-1 px-1 text-right text-[#5D8AAA] font-spec-cn">05-20 08:30</td>
                </tr>
                <tr class="hover:bg-white/5 transition cursor-pointer" @click="handleEventClick('城中区超计划预警')">
                  <td class="py-1 px-1 text-[#FF9F43] font-spec-cn font-medium">超计划预警</td>
                  <td class="py-1 px-1 font-spec-cn">城中区</td>
                  <td class="py-1 px-1 text-right">6,512.44</td>
                  <td class="py-1 px-1 text-right text-[#FF9F43] font-bold">105.3%</td>
                  <td class="py-1 px-1 text-right text-[#5D8AAA] font-spec-cn">05-20 08:10</td>
                </tr>
                <tr class="hover:bg-white/5 transition cursor-pointer" @click="handleEventClick('湟源县超许可预警')">
                  <td class="py-1 px-1 text-[#FF6B7A] font-spec-cn font-medium">超许可预警</td>
                  <td class="py-1 px-1 font-spec-cn">湟源县</td>
                  <td class="py-1 px-1 text-right">2,153.75</td>
                  <td class="py-1 px-1 text-right text-[#FF6B7A] font-bold">112.7%</td>
                  <td class="py-1 px-1 text-right text-[#5D8AAA] font-spec-cn">05-20 07:45</td>
                </tr>
                <tr class="hover:bg-white/5 transition cursor-pointer" @click="handleEventClick('湟中区接近计划值')">
                  <td class="py-1 px-1 text-[#FFC65C] font-spec-cn font-medium">接近计划值</td>
                  <td class="py-1 px-1 font-spec-cn">湟中区</td>
                  <td class="py-1 px-1 text-right">5,326.18</td>
                  <td class="py-1 px-1 text-right text-[#FFC65C]">78.4%</td>
                  <td class="py-1 px-1 text-right text-[#5D8AAA] font-spec-cn">05-20 07:30</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- ================= Right Box 2: 业务关联研判 ================= -->
        <div
          id="dev-anno-9"
          class="spec-card p-3.5 flex-1 min-h-[200px] flex flex-col justify-between relative transition-all duration-300"
          :class="{ 'ring-2 ring-[#FFB800] shadow-[0_0_24px_rgba(255,184,0,0.65)]': activeAnnotationId === 9 }"
        >
          <!-- Numbered Point 9 Badge (业务关联研判 - 右2) -->
          <div
            v-if="showAnnotationBadges && scenarioMode === 'comprehensive'"
            class="absolute -top-2 -left-2 z-40 flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-[#FFD043] to-[#FF9F00] text-[#0A1626] font-extrabold text-xs shadow-[0_0_12px_rgba(255,184,0,0.95)] border-2 border-white cursor-pointer select-none transition-all duration-300 hover:scale-125"
            :class="{ 'scale-125 ring-4 ring-[#FFB800]/60 animate-bounce': activeAnnotationId === 9 }"
            @mouseenter="activeAnnotationId = 9"
            @mouseleave="activeAnnotationId = null"
            @click="scrollToAnnotation(9)"
            title="开发标注 #9: 业务关联研判 (右2)"
          >
            9
          </div>
          <div>
            <div class="flex items-center justify-between pb-2">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-[#00E5FF] shrink-0" viewBox="0 0 16 16" fill="none">
                  <polygon points="8,1 15,4.5 15,11.5 8,15 1,11.5 8,15 1,11.5 1,4.5" stroke="#00E5FF" stroke-width="1.2" fill="none" />
                  <polygon points="8,4 12,6 12,10 8,12 4,10 4,6" fill="rgba(0,229,255,0.3)" />
                </svg>
                <h2 class="text-sm 2xl:text-base font-bold text-white tracking-wide font-spec-cn">业务关联研判</h2>
              </div>
              <button
                type="button"
                class="text-xs text-[#00E5FF] hover:text-[#79D8FF] transition cursor-pointer flex items-center gap-0.5 font-spec-cn"
                @click="navigate('enterprise_dossier')"
              >
                <span>更多</span>
                <span>&gt;</span>
              </button>
            </div>
            <div class="spec-header-divider mb-2"></div>
          </div>

          <!-- 3 Key Metric Cards (Enlarged) -->
          <div class="grid grid-cols-3 gap-2 text-center my-1.5">
            <div class="bg-[rgba(10,36,58,0.55)] border border-[rgba(70,180,235,0.2)] rounded-lg p-1.5">
              <div class="text-xs text-slate-300 font-medium font-spec-cn">证照问题数</div>
              <div class="text-sm lg:text-base font-bold font-spec-num text-[#FFC65C] mt-0.5">56 个</div>
              <div class="text-[10px] text-[#3DDC97] font-spec-num mt-0.5">-12 个</div>
            </div>

            <div class="bg-[rgba(10,36,58,0.55)] border border-[rgba(70,180,235,0.2)] rounded-lg p-1.5">
              <div class="text-xs text-slate-300 font-medium font-spec-cn">治理完成率</div>
              <div class="text-sm lg:text-base font-bold font-spec-num text-[#3DDC97] mt-0.5">92.35%</div>
              <div class="text-[10px] text-[#3DDC97] font-spec-num mt-0.5">+2.35%</div>
            </div>

            <div class="bg-[rgba(10,36,58,0.55)] border border-[rgba(70,180,235,0.2)] rounded-lg p-1.5">
              <div class="text-xs text-slate-300 font-medium font-spec-cn">未治理占比</div>
              <div class="text-sm lg:text-base font-bold font-spec-num text-[#FF6B7A] mt-0.5">7.65%</div>
              <div class="text-[10px] text-[#3DDC97] font-spec-num mt-0.5">-2.35%</div>
            </div>
          </div>

          <!-- Sub-Row: License Issue Types -->
          <div class="pt-1.5 border-t border-[rgba(70,180,235,0.2)] flex-1">
            <!-- Right: 证照问题类型分布 (Donut chart & stats) -->
            <div class="flex flex-col justify-between">
              <div class="text-xs font-bold text-white mb-1.5 flex items-center justify-between font-spec-cn">
                <div class="flex items-center gap-1.5">
                  <span class="text-[#00E5FF] font-bold">|</span>
                  <span>证照问题分布</span>
                </div>
                <span class="text-[10px] text-[#5D8AAA] font-spec-num font-normal">共 56 个</span>
              </div>
              <div class="flex items-center gap-2 mt-0.5">
                <!-- Mini Donut -->
                <div class="w-14 h-14 relative shrink-0">
                  <svg viewBox="0 0 100 100" class="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="36" fill="transparent" stroke="#00E5FF" stroke-width="15" stroke-dasharray="72.4 153.8" stroke-dashoffset="0">
                      <title>计量水量超许可: 18个 (32%)</title>
                    </circle>
                    <circle cx="50" cy="50" r="36" fill="transparent" stroke="#38BDF8" stroke-width="15" stroke-dasharray="56.5 169.7" stroke-dashoffset="-72.4">
                      <title>直报水量超许可: 14个 (25%)</title>
                    </circle>
                    <circle cx="50" cy="50" r="36" fill="transparent" stroke="#FFC65C" stroke-width="15" stroke-dasharray="40.7 185.5" stroke-dashoffset="-128.9">
                      <title>违规新增取水许可: 10个 (18%)</title>
                    </circle>
                    <circle cx="50" cy="50" r="36" fill="transparent" stroke="#FF6B7A" stroke-width="15" stroke-dasharray="31.7 194.5" stroke-dashoffset="-169.6">
                      <title>证照失效仍取水: 8个 (14%)</title>
                    </circle>
                    <circle cx="50" cy="50" r="36" fill="transparent" stroke="#A78BFA" stroke-width="15" stroke-dasharray="24.9 201.3" stroke-dashoffset="-201.3">
                      <title>取水计量数据异常: 6个 (11%)</title>
                    </circle>
                  </svg>
                  <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span class="text-[11px] font-bold font-spec-num text-[#00E5FF] leading-none">56</span>
                    <span class="text-[8px] text-[#5D8AAA] scale-90 leading-none mt-0.5 font-spec-cn">个</span>
                  </div>
                </div>

                <!-- Labels -->
                <div class="space-y-0.5 text-[11px] text-slate-300 leading-tight flex-1 min-w-0 font-spec-cn">
                  <div
                    class="flex items-center justify-between gap-1 hover:text-white transition-colors cursor-pointer group"
                    title="计量水量超许可: 18个 (32%)"
                    @click="handleEventClick('计量水量超许可研判')"
                  >
                    <div class="flex items-center gap-1.5 min-w-0">
                      <span class="w-1.5 h-1.5 rounded-xs shrink-0 bg-[#00E5FF]"></span>
                      <span class="truncate group-hover:text-[#00E5FF] transition-colors">计量水量超许可</span>
                    </div>
                    <span class="font-spec-num text-[#00E5FF] text-[10px] shrink-0">32%</span>
                  </div>

                  <div
                    class="flex items-center justify-between gap-1 hover:text-white transition-colors cursor-pointer group"
                    title="直报水量超许可: 14个 (25%)"
                    @click="handleEventClick('直报水量超许可研判')"
                  >
                    <div class="flex items-center gap-1.5 min-w-0">
                      <span class="w-1.5 h-1.5 rounded-xs shrink-0 bg-[#38BDF8]"></span>
                      <span class="truncate group-hover:text-[#38BDF8] transition-colors">直报水量超许可</span>
                    </div>
                    <span class="font-spec-num text-[#38BDF8] text-[10px] shrink-0">25%</span>
                  </div>

                  <div
                    class="flex items-center justify-between gap-1 hover:text-white transition-colors cursor-pointer group"
                    title="违规新增取水许可: 10个 (18%)"
                    @click="handleEventClick('违规新增取水许可研判')"
                  >
                    <div class="flex items-center gap-1.5 min-w-0">
                      <span class="w-1.5 h-1.5 rounded-xs shrink-0 bg-[#FFC65C]"></span>
                      <span class="truncate group-hover:text-[#FFC65C] transition-colors">违规新增取水许可</span>
                    </div>
                    <span class="font-spec-num text-[#FFC65C] text-[10px] shrink-0">18%</span>
                  </div>

                  <div
                    class="flex items-center justify-between gap-1 hover:text-white transition-colors cursor-pointer group"
                    title="证照失效仍取水: 8个 (14%)"
                    @click="handleEventClick('证照失效仍取水研判')"
                  >
                    <div class="flex items-center gap-1.5 min-w-0">
                      <span class="w-1.5 h-1.5 rounded-xs shrink-0 bg-[#FF6B7A]"></span>
                      <span class="truncate group-hover:text-[#FF6B7A] transition-colors">证照失效仍取水</span>
                    </div>
                    <span class="font-spec-num text-[#FF6B7A] text-[10px] shrink-0">14%</span>
                  </div>

                  <div
                    class="flex items-center justify-between gap-1 hover:text-white transition-colors cursor-pointer group"
                    title="取水计量数据异常: 6个 (11%)"
                    @click="handleEventClick('取水计量数据异常研判')"
                  >
                    <div class="flex items-center gap-1.5 min-w-0">
                      <span class="w-1.5 h-1.5 rounded-xs shrink-0 bg-[#A78BFA]"></span>
                      <span class="truncate group-hover:text-[#A78BFA] transition-colors">取水计量数据异常</span>
                    </div>
                    <span class="font-spec-num text-[#A78BFA] text-[10px] shrink-0">11%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ================= Right Box 3: 计量点接入与到报率监控 ================= -->
        <div
          id="dev-anno-10"
          class="spec-card p-3.5 flex-1 min-h-[200px] flex flex-col justify-between relative transition-all duration-300"
          :class="{ 'ring-2 ring-[#FFB800] shadow-[0_0_24px_rgba(255,184,0,0.65)]': activeAnnotationId === 10 }"
        >
          <!-- Numbered Point 10 Badge (计量点接入与到报率监控 - 右3) -->
          <div
            v-if="showAnnotationBadges && scenarioMode === 'comprehensive'"
            class="absolute -top-2 -left-2 z-40 flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-[#FFD043] to-[#FF9F00] text-[#0A1626] font-extrabold text-xs shadow-[0_0_12px_rgba(255,184,0,0.95)] border-2 border-white cursor-pointer select-none transition-all duration-300 hover:scale-125"
            :class="{ 'scale-125 ring-4 ring-[#FFB800]/60 animate-bounce': activeAnnotationId === 10 }"
            @mouseenter="activeAnnotationId = 10"
            @mouseleave="activeAnnotationId = null"
            @click="scrollToAnnotation(10)"
            title="开发标注 #10: 计量点接入与到报率监控 (右3)"
          >
            10
          </div>
          <div>
            <div class="flex items-center justify-between pb-2">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-[#00E5FF] shrink-0" viewBox="0 0 16 16" fill="none">
                  <polygon points="8,1 15,4.5 15,11.5 8,15 1,11.5 1,4.5" stroke="#00E5FF" stroke-width="1.2" fill="none" />
                  <polygon points="8,4 12,6 12,10 8,12 4,10 4,6" fill="rgba(0,229,255,0.3)" />
                </svg>
                <h2 class="text-sm 2xl:text-base font-bold text-white tracking-wide font-spec-cn">计量点接入与到报率监控</h2>
              </div>
              <button
                type="button"
                class="text-xs text-[#00E5FF] hover:text-[#79D8FF] transition cursor-pointer flex items-center gap-0.5 font-spec-cn"
                @click="navigate('facility_management')"
              >
                <span>更多</span>
                <span>&gt;</span>
              </button>
            </div>
            <div class="spec-header-divider mb-2"></div>
          </div>

          <!-- 3 Meter Category Stats -->
          <div class="grid grid-cols-3 gap-1.5 text-center text-xs my-1.5">
            <div class="min-w-0 bg-[rgba(10,36,58,0.55)] border border-[rgba(70,180,235,0.2)] rounded-lg p-1.5">
              <div class="text-xs text-slate-300 font-medium mb-1 font-spec-cn">规模以上农业计量点</div>
              <div class="flex justify-around items-center font-spec-num">
                <div>
                  <span class="text-[10px] text-[#5D8AAA] block font-spec-cn">接入率</span>
                  <span class="font-bold text-[#00E5FF] text-sm">92.36%</span>
                </div>
                <div class="w-px h-6 bg-[rgba(70,180,235,0.2)]"></div>
                <div>
                  <span class="text-[10px] text-[#5D8AAA] block font-spec-cn">到报率</span>
                  <span class="font-bold text-[#3DDC97] text-sm">88.45%</span>
                </div>
              </div>
            </div>

            <div class="min-w-0 bg-[rgba(10,36,58,0.55)] border border-[rgba(70,180,235,0.2)] rounded-lg p-1.5">
              <div class="text-xs text-slate-300 font-medium mb-1 font-spec-cn">规模以上非农计量点</div>
              <div class="flex justify-around items-center font-spec-num">
                <div>
                  <span class="text-[10px] text-[#5D8AAA] block font-spec-cn">接入率</span>
                  <span class="font-bold text-[#00E5FF] text-sm">95.12%</span>
                </div>
                <div class="w-px h-6 bg-[rgba(70,180,235,0.2)]"></div>
                <div>
                  <span class="text-[10px] text-[#5D8AAA] block font-spec-cn">到报率</span>
                  <span class="font-bold text-[#3DDC97] text-sm">91.27%</span>
                </div>
              </div>
            </div>

            <div class="min-w-0 bg-[rgba(10,36,58,0.55)] border border-[rgba(70,180,235,0.2)] rounded-lg p-1.5">
              <div class="text-xs text-slate-300 font-medium mb-1 font-spec-cn">其他在线计量点</div>
              <div class="flex justify-around items-center font-spec-num">
                <div>
                  <span class="text-[10px] text-[#5D8AAA] block font-spec-cn">接入率</span>
                  <span class="font-bold text-[#00E5FF] text-sm">93.87%</span>
                </div>
                <div class="w-px h-6 bg-[rgba(70,180,235,0.2)]"></div>
                <div>
                  <span class="text-[10px] text-[#5D8AAA] block font-spec-cn">到报率</span>
                  <span class="font-bold text-[#3DDC97] text-sm">89.42%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Sub-Row: 仅展示接入率趋势对比 (全宽展示，已去掉到报率滞后TOP) -->
          <div class="pt-2 border-t border-[rgba(70,180,235,0.2)] flex-1 flex flex-col justify-between">
            <div class="flex items-center justify-between text-xs font-bold text-white mb-1.5 font-spec-cn">
              <div class="flex items-center gap-1.5">
                <span class="text-[#00E5FF] font-bold">|</span>
                <span>计量点接入率月度趋势对比</span>
              </div>
              <div class="flex items-center gap-3 text-xs text-slate-300">
                <span class="flex items-center gap-1 text-[#38BDF8]">
                  <span class="w-2.5 h-0.5 bg-[#38BDF8] rounded-xs"></span>
                  <span class="font-medium text-[11px]">农业计量点</span>
                </span>
                <span class="flex items-center gap-1 text-[#00E5FF]">
                  <span class="w-2.5 h-0.5 bg-[#00E5FF] rounded-xs shadow-[0_0_4px_#00E5FF]"></span>
                  <span class="font-medium text-[11px]">非农计量点</span>
                </span>
              </div>
            </div>

            <!-- Full-width SVG Trend Chart -->
            <div class="w-full h-28 relative">
              <svg viewBox="0 0 380 95" class="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="accessAgriArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.25" />
                    <stop offset="100%" stop-color="#38BDF8" stop-opacity="0.0" />
                  </linearGradient>
                  <linearGradient id="accessNonAgriArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#00E5FF" stop-opacity="0.3" />
                    <stop offset="100%" stop-color="#00E5FF" stop-opacity="0.0" />
                  </linearGradient>
                </defs>

                <!-- Horizontal Grid Lines (100%, 90%, 80%, 70%) -->
                <g stroke="rgba(70,180,235,0.12)" stroke-width="0.8">
                  <line x1="30" y1="12" x2="368" y2="12" />
                  <line x1="30" y1="34" x2="368" y2="34" />
                  <line x1="30" y1="56" x2="368" y2="56" />
                  <line x1="30" y1="78" x2="368" y2="78" stroke="rgba(70,180,235,0.22)" />
                </g>

                <!-- Y-Axis Labels -->
                <g fill="#5D8AAA" font-size="8.5" font-family="var(--spec-num)" text-anchor="end">
                  <text x="26" y="15">100%</text>
                  <text x="26" y="37">90%</text>
                  <text x="26" y="59">80%</text>
                  <text x="26" y="81">70%</text>
                </g>

                <!-- 1. 农业 Area & Smooth Line (88.5% -> 92.4%) -->
                <path
                  d="M 55,37.3 Q 85,36.5 115,35.8 T 175,33.1 T 235,31.6 T 295,30.0 T 355,28.7 L 355,78 L 55,78 Z"
                  fill="url(#accessAgriArea)"
                />
                <path
                  d="M 55,37.3 Q 85,36.5 115,35.8 T 175,33.1 T 235,31.6 T 295,30.0 T 355,28.7"
                  fill="none"
                  stroke="#38BDF8"
                  stroke-width="2"
                />

                <!-- 2. 非农 Area & Smooth Line (91.0% -> 95.1%) -->
                <path
                  d="M 55,31.8 Q 85,30.1 115,28.5 T 175,26.5 T 235,24.8 T 295,23.4 T 355,22.8 L 355,78 L 55,78 Z"
                  fill="url(#accessNonAgriArea)"
                />
                <path
                  d="M 55,31.8 Q 85,30.1 115,28.5 T 175,26.5 T 235,24.8 T 295,23.4 T 355,22.8"
                  fill="none"
                  stroke="#00E5FF"
                  stroke-width="2.2"
                />

                <!-- Data Points & Labels -->
                <g>
                  <circle cx="55" cy="37.3" r="2.5" fill="#38BDF8" stroke="#07172f" stroke-width="1.2" />
                  <circle cx="55" cy="31.8" r="2.5" fill="#00E5FF" stroke="#07172f" stroke-width="1.2" />
                  <text x="55" y="90" text-anchor="middle" font-size="8.5" fill="#8AAEC8" font-family="var(--spec-num)">1月</text>
                </g>
                <g>
                  <circle cx="115" cy="35.8" r="2.5" fill="#38BDF8" stroke="#07172f" stroke-width="1.2" />
                  <circle cx="115" cy="28.5" r="2.5" fill="#00E5FF" stroke="#07172f" stroke-width="1.2" />
                  <text x="115" y="90" text-anchor="middle" font-size="8.5" fill="#8AAEC8" font-family="var(--spec-num)">2月</text>
                </g>
                <g>
                  <circle cx="175" cy="33.1" r="2.5" fill="#38BDF8" stroke="#07172f" stroke-width="1.2" />
                  <circle cx="175" cy="26.5" r="2.5" fill="#00E5FF" stroke="#07172f" stroke-width="1.2" />
                  <text x="175" y="90" text-anchor="middle" font-size="8.5" fill="#8AAEC8" font-family="var(--spec-num)">3月</text>
                </g>
                <g>
                  <circle cx="235" cy="31.6" r="2.5" fill="#38BDF8" stroke="#07172f" stroke-width="1.2" />
                  <circle cx="235" cy="24.8" r="2.5" fill="#00E5FF" stroke="#07172f" stroke-width="1.2" />
                  <text x="235" y="90" text-anchor="middle" font-size="8.5" fill="#8AAEC8" font-family="var(--spec-num)">4月</text>
                </g>
                <g>
                  <circle cx="295" cy="30.0" r="2.5" fill="#38BDF8" stroke="#07172f" stroke-width="1.2" />
                  <circle cx="295" cy="23.4" r="2.5" fill="#00E5FF" stroke="#07172f" stroke-width="1.2" />
                  <text x="295" y="90" text-anchor="middle" font-size="8.5" fill="#8AAEC8" font-family="var(--spec-num)">5月</text>
                </g>
                <!-- 6月 (当前高亮点) -->
                <g>
                  <circle cx="355" cy="28.7" r="3.5" fill="#ffffff" stroke="#38BDF8" stroke-width="2" />
                  <text x="355" y="19" text-anchor="middle" font-size="8.5" fill="#38BDF8" font-weight="bold" font-family="var(--spec-num)">92.4%</text>
                  <circle cx="355" cy="22.8" r="3.5" fill="#ffffff" stroke="#00E5FF" stroke-width="2" />
                  <text x="355" y="10" text-anchor="middle" font-size="8.5" fill="#00E5FF" font-weight="bold" font-family="var(--spec-num)">95.1%</text>
                  <text x="355" y="90" text-anchor="middle" font-size="8.5" fill="#00E5FF" font-weight="bold" font-family="var(--spec-num)">6月</text>
                </g>
              </svg>
            </div>

            <!-- Footer summary strip -->
            <div class="mt-1 pt-1.5 border-t border-[rgba(70,180,235,0.15)] flex items-center justify-between text-[10px] text-[#8FB6D4]">
              <span>接入趋势研判：<span class="text-[#3DDC97] font-bold font-spec-cn">平稳上扬 (较年初 +3.8%)</span></span>
              <span>通信质量：<span class="text-[#DCF2FF] font-spec-cn">99.1% 优良传输</span></span>
            </div>
          </div>
        </div>
        </template>

        <!-- B. 专项业务应用场景 (右侧模块 3: 异常情况处置 & 模块 4: 取水数据对比分析与复核跟踪 - 精炼色彩) -->
        <template v-else>
          <!-- ================= 专项 Card 3: 异常情况处置与运维能效评估 ================= -->
          <div class="spec-card p-3 flex-1 min-h-0 flex flex-col justify-between overflow-hidden relative">
            <!-- Card Header -->
            <div>
              <div class="flex items-center justify-between pb-1.5">
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-[#00E5FF] shrink-0" viewBox="0 0 16 16" fill="none">
                    <polygon points="8,1 15,4.5 15,11.5 8,15 1,11.5 8,15 1,11.5 1,4.5" stroke="#00E5FF" stroke-width="1.2" fill="none" />
                    <polygon points="8,4 12,6 12,10 8,12 4,10 4,6" fill="rgba(0,229,255,0.3)" />
                  </svg>
                  <h2 class="text-sm 2xl:text-base font-bold text-white tracking-wide font-spec-cn">异常情况处置与能效评估</h2>
                </div>
                <div class="flex items-center gap-2">
                  <div class="flex items-center gap-1.5 text-xs text-[#00E5FF] font-spec-num">
                    <span class="text-[#5D8AAA] font-spec-cn">闭环率:</span>
                    <span class="font-bold text-[#00E5FF]">{{ operationEfficiencyMetrics.closedLoopRate }}%</span>
                  </div>
                  <button
                    type="button"
                    class="text-xs text-[#00E5FF] hover:text-[#79D8FF] transition cursor-pointer flex items-center gap-0.5 font-spec-cn ml-1"
                    @click="navigate('alarm_work_order')"
                    title="跳转至告警工单处置台账"
                  >
                    <span>工单台账</span>
                    <span>&gt;</span>
                  </button>
                </div>
              </div>
              <div class="spec-header-divider mb-1.5"></div>
            </div>

            <!-- 1. 异常工单处置统计 (调整后标题，去掉青海/西宁按钮，与地图区县联动) -->
            <div class="p-2 bg-[rgba(6,26,46,0.65)] rounded-lg border border-[rgba(70,180,235,0.22)]">
              <!-- Header with Title and Map District Linkage Badge -->
              <div class="flex items-center justify-between pb-1 mb-1.5 border-b border-[rgba(70,180,235,0.18)]">
                <div class="flex items-center gap-1.5">
                  <span class="text-[#00E5FF] font-bold">|</span>
                  <span class="text-xs font-semibold text-white tracking-wide font-spec-cn">异常工单处置统计</span>
                </div>

                <!-- 地图区县联动指示与切换 -->
                <div class="flex items-center gap-1.5 text-[10px]">
                  <span class="text-[#8AAEC8] font-spec-cn">地图联动:</span>
                  <button
                    type="button"
                    class="px-2 py-0.5 rounded cursor-pointer transition font-spec-cn flex items-center gap-1"
                    :class="filterParams.district !== '西宁市'
                      ? 'bg-[#00E5FF]/25 text-[#9BEAFF] font-bold border border-[#00E5FF]/60 shadow-[0_0_8px_rgba(0,229,255,0.3)]'
                      : 'bg-[#071932] text-[#8AAEC8] border border-[rgba(70,180,235,0.25)] hover:text-white'"
                    @click="filterParams.district = '西宁市'"
                    :title="filterParams.district !== '西宁市' ? '点击重置为全域' : '当前展示西宁全域'"
                  >
                    <span>{{ filterParams.district === '西宁市' ? '西宁全域 (7区县)' : filterParams.district }}</span>
                    <span v-if="filterParams.district !== '西宁市'" class="text-[#00E5FF] hover:text-white ml-0.5">✕</span>
                  </button>
                </div>
              </div>

              <!-- 4-Metric Aggregated Summary Strip for Active Linked District -->
              <div class="grid grid-cols-4 gap-1.5 mb-1.5 text-center text-xs">
                <!-- 待处置 -->
                <div class="bg-[rgba(10,36,58,0.55)] border border-[rgba(255,198,92,0.3)] rounded p-1">
                  <span class="text-[9.5px] text-[#FFC65C] font-spec-cn block">待处置</span>
                  <div class="text-sm font-bold font-spec-num text-[#FFC65C] mt-0.5">
                    {{ currentWorkOrderTotals.pending }} <span class="text-[9px] font-normal text-[#FFC65C]/80">起</span>
                  </div>
                </div>
                <!-- 处置中 -->
                <div class="bg-[rgba(10,36,58,0.55)] border border-[rgba(0,229,255,0.3)] rounded p-1">
                  <span class="text-[9.5px] text-[#00E5FF] font-spec-cn block">处置中</span>
                  <div class="text-sm font-bold font-spec-num text-[#00E5FF] mt-0.5">
                    {{ currentWorkOrderTotals.processing }} <span class="text-[9px] font-normal text-[#00E5FF]/80">起</span>
                  </div>
                </div>
                <!-- 待水量修订 -->
                <div class="bg-[rgba(10,36,58,0.55)] border border-[rgba(56,189,248,0.3)] rounded p-1">
                  <span class="text-[9.5px] text-[#38BDF8] font-spec-cn block">待水量修订</span>
                  <div class="text-sm font-bold font-spec-num text-[#38BDF8] mt-0.5">
                    {{ currentWorkOrderTotals.revisionNeeded }} <span class="text-[9px] font-normal text-[#38BDF8]/80">起</span>
                  </div>
                </div>
                <!-- 已完成修订 -->
                <div class="bg-[rgba(10,36,58,0.55)] border border-[rgba(61,220,151,0.3)] rounded p-1">
                  <span class="text-[9.5px] text-[#3DDC97] font-spec-cn block">已完成修订</span>
                  <div class="text-sm font-bold font-spec-num text-[#3DDC97] mt-0.5">
                    {{ currentWorkOrderTotals.completed }} <span class="text-[9px] font-normal text-[#3DDC97]/80">起</span>
                  </div>
                </div>
              </div>

              <!-- Data Table: 行政区划、待处置、处置中、待水量修订、已完成修订、合计 (与地图区县点击联动) -->
              <div class="overflow-x-auto max-h-[135px] custom-dark-scrollbar">
                <table class="w-full text-xs text-left">
                  <thead class="sticky top-0 z-10">
                    <tr class="text-[#8FB6D4] border-b border-[rgba(70,180,235,0.2)] bg-[rgba(10,36,58,0.95)] backdrop-blur-xs text-[10.5px]">
                      <th class="py-1 px-1.5 font-medium font-spec-cn text-left">行政区划</th>
                      <th class="py-1 px-1 font-medium font-spec-cn text-right text-[#FFC65C]">待处置</th>
                      <th class="py-1 px-1 font-medium font-spec-cn text-right text-[#00E5FF]">处置中</th>
                      <th class="py-1 px-1 font-medium font-spec-cn text-right text-[#38BDF8]">待修订</th>
                      <th class="py-1 px-1 font-medium font-spec-cn text-right text-[#3DDC97]">已完成</th>
                      <th class="py-1 px-1.5 font-medium font-spec-cn text-right text-[#E4F6FF]">合计</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[rgba(70,180,235,0.12)] font-spec-num text-slate-300">
                    <tr
                      v-for="item in currentWorkOrderStats"
                      :key="item.district"
                      class="transition cursor-pointer group"
                      :class="filterParams.district === item.district
                        ? 'bg-[rgba(0,229,255,0.18)] font-semibold'
                        : 'hover:bg-white/5'"
                      @click="filterParams.district = filterParams.district === item.district ? '西宁市' : item.district"
                      :title="`点击联动地图定位 ${item.district}`"
                    >
                      <td class="py-1 px-1.5 font-spec-cn font-medium flex items-center gap-1.5"
                          :class="filterParams.district === item.district ? 'text-[#00E5FF]' : 'text-[#DCF2FF] group-hover:text-[#00E5FF]'">
                        <span
                          class="w-1.5 h-1.5 rounded-full transition-all"
                          :class="filterParams.district === item.district ? 'bg-[#00E5FF] shadow-[0_0_6px_#00E5FF]' : 'bg-[#00E5FF]/60'"
                        ></span>
                        <span class="truncate">{{ item.district }}</span>
                        <span v-if="filterParams.district === item.district" class="text-[9px] px-1 py-0 rounded bg-[#00E5FF]/30 text-[#00E5FF] font-normal font-spec-cn">选中</span>
                      </td>
                      <td class="py-1 px-1 text-right text-[#FFC65C] font-semibold">
                        {{ item.pending }}
                      </td>
                      <td class="py-1 px-1 text-right text-[#00E5FF]">
                        {{ item.processing }}
                      </td>
                      <td class="py-1 px-1 text-right text-[#38BDF8]">
                        {{ item.revisionNeeded }}
                      </td>
                      <td class="py-1 px-1 text-right text-[#3DDC97]">
                        {{ item.completed }}
                      </td>
                      <td class="py-1 px-1.5 text-right font-bold text-[#E4F6FF]">
                        {{ item.total }}
                      </td>
                    </tr>
                    <!-- Total Row -->
                    <tr
                      class="bg-[rgba(10,36,58,0.9)] font-bold border-t border-[rgba(70,180,235,0.3)] sticky bottom-0 cursor-pointer hover:bg-[rgba(10,36,58,1)] transition"
                      @click="filterParams.district = '西宁市'"
                      title="点击切换为全域总览"
                    >
                      <td class="py-1.5 px-1.5 font-spec-cn text-[#9BEAFF] flex items-center gap-1">
                        <span class="w-1.5 h-1.5 rounded-full bg-[#9BEAFF]"></span>
                        <span>全域汇总</span>
                      </td>
                      <td class="py-1.5 px-1 text-right text-[#FFC65C]">{{ currentWorkOrderTotals.pending }}</td>
                      <td class="py-1.5 px-1 text-right text-[#00E5FF]">{{ currentWorkOrderTotals.processing }}</td>
                      <td class="py-1.5 px-1 text-right text-[#38BDF8]">{{ currentWorkOrderTotals.revisionNeeded }}</td>
                      <td class="py-1.5 px-1 text-right text-[#3DDC97]">{{ currentWorkOrderTotals.completed }}</td>
                      <td class="py-1.5 px-1.5 text-right text-[#00E5FF] font-bold">{{ currentWorkOrderTotals.total }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- 2. 运维单位能效排名 (支持区域内滚动展示，绝不溢出容器) -->
            <div class="mt-1.5 pt-1.5 border-t border-[rgba(70,180,235,0.22)]">
              <div class="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1.5 font-spec-cn">
                <div class="flex items-center gap-1.5">
                  <span class="text-[#00E5FF] font-bold">|</span>
                  <span class="text-white">运维单位能效排名</span>
                  <span class="text-[9.5px] text-[#5D8AAA] font-normal font-spec-cn">区域滚动展示</span>
                </div>
                <div class="text-[10px] text-[#5D8AAA] font-spec-num">
                  平均响应: <span class="text-[#00E5FF] font-bold">{{ operationEfficiencyMetrics.avgResolutionTime }}h</span>
                  <span class="mx-1 text-slate-600">|</span>
                  成功率: <span class="text-[#3DDC97] font-bold">{{ operationEfficiencyMetrics.successRate }}%</span>
                </div>
              </div>

              <!-- 运维单位排名列表卡片 (在区域内纵向自适应滚动展示) -->
              <div class="space-y-1.5 max-h-[135px] 2xl:max-h-[160px] overflow-y-auto custom-dark-scrollbar pr-1">
                <div
                  v-for="team in maintenanceTeamRanks"
                  :key="team.rank"
                  class="p-2 rounded-lg bg-[rgba(10,36,58,0.6)] border border-[rgba(70,180,235,0.2)] hover:border-[#00E5FF]/60 hover:bg-[rgba(10,42,70,0.75)] transition cursor-pointer"
                  :title="`${team.name} - 综合得分: ${team.score}分, 平均消缺历时: ${team.avgHours}小时`"
                >
                  <div class="flex items-center justify-between gap-2">
                    <!-- 左侧: 排名与单位名称 -->
                    <div class="flex items-center gap-2 min-w-0">
                      <!-- 排名徽章 -->
                      <span
                        class="w-5 h-5 rounded flex items-center justify-center font-spec-num font-bold text-[11px] shrink-0 shadow-xs"
                        :class="team.rank === 1
                          ? 'bg-gradient-to-br from-[#FFE279] to-[#F59E0B] text-slate-950 ring-1 ring-[#FFE279]/60'
                          : team.rank === 2
                          ? 'bg-gradient-to-br from-[#F1F5F9] to-[#94A3B8] text-slate-950 ring-1 ring-white/50'
                          : team.rank === 3
                          ? 'bg-gradient-to-br from-[#FDBA74] to-[#C2410C] text-white ring-1 ring-[#FDBA74]/50'
                          : 'bg-[#122b49] text-[#8AAEC8] border border-[rgba(70,180,235,0.25)]'"
                      >
                        {{ team.rank }}
                      </span>
                      <span class="font-medium text-[#DCF2FF] truncate text-xs font-spec-cn" :title="team.name">
                        {{ team.name }}
                      </span>
                    </div>

                    <!-- 右侧: 工单处置数、响应耗时与评分 -->
                    <div class="flex items-center gap-3 shrink-0 font-spec-num text-xs">
                      <!-- 办结工单数 -->
                      <div class="text-[11px] text-[#8AAEC8] font-spec-cn flex items-center gap-1">
                        <span>办结</span>
                        <span class="text-white font-spec-num font-semibold">{{ team.resolvedOrders }}</span>
                        <span class="text-slate-500">/</span>
                        <span class="font-spec-num">{{ team.totalOrders }}</span>
                      </div>

                      <!-- 平均时效 -->
                      <div class="text-[11px] px-1.5 py-0.2 rounded bg-[#071d37] border border-[rgba(70,180,235,0.2)] text-[#00E5FF]">
                        {{ team.avgHours }}h
                      </div>

                      <!-- 能效得分 -->
                      <div class="flex items-center gap-1 min-w-[58px] justify-end">
                        <span class="font-bold text-sm" :class="team.rank <= 2 ? 'text-[#00E5FF]' : team.rank === 3 ? 'text-[#FFC65C]' : 'text-[#38BDF8]'">
                          {{ team.score }}
                        </span>
                        <span class="text-[10px] text-[#5D8AAA] font-spec-cn">分</span>
                      </div>
                    </div>
                  </div>

                  <!-- 评分直观微型能效进度条 -->
                  <div class="mt-1.5 h-1 w-full bg-[#071932] rounded-full overflow-hidden flex items-center">
                    <div
                      class="h-full rounded-full transition-all duration-500"
                      :style="{
                        width: `${Math.min(100, Math.max(0, team.score))}%`,
                        backgroundColor: team.rank === 1 ? '#00E5FF' : team.rank === 2 ? '#38BDF8' : team.rank === 3 ? '#FFC65C' : '#3DDC97'
                      }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ================= 专项 Card 4: 取水数据对比分析与复核跟踪 ================= -->
          <div class="spec-card p-3 2xl:p-3.5 flex-1 min-h-0 flex flex-col justify-between overflow-hidden relative">
            <!-- Card Header with Engine Controls -->
            <div>
              <div class="flex items-center justify-between pb-2">
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-[#00E5FF] shrink-0" viewBox="0 0 16 16" fill="none">
                    <polygon points="8,1 15,4.5 15,11.5 8,15 1,11.5 1,4.5" stroke="#00E5FF" stroke-width="1.2" fill="none" />
                    <polygon points="8,4 12,6 12,10 8,12 4,10 4,6" fill="rgba(0,229,255,0.3)" />
                  </svg>
                  <h2 class="text-sm 2xl:text-base font-bold text-white tracking-wide font-spec-cn">取水数据对比分析</h2>
                </div>

                <!-- Actions: Time Window & Review Tracking Button -->
                <div class="flex items-center gap-1.5 font-spec-cn">
                  <!-- Time Window Select (自动重算对比数据) -->
                  <select
                    v-model="compareTimeWindow"
                    @change="triggerCompareAnalysis"
                    class="bg-[rgba(10,36,58,0.8)] border border-[rgba(70,180,235,0.3)] rounded-md px-2 py-1 text-slate-100 text-[11px] focus:outline-none focus:border-[#00E5FF] cursor-pointer"
                    title="切换对比时间窗口"
                  >
                    <option value="month">当月计划期</option>
                    <option value="30d">近30天累计</option>
                    <option value="quarter">二季度(4-6月)</option>
                    <option value="year">2025年度累计</option>
                  </select>

                  <!-- 复核任务跟踪中心按钮 -->
                  <button
                    type="button"
                    @click="showReviewTaskModal = true"
                    class="px-2 py-1 rounded-md bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 text-[#00E5FF] text-[11px] border border-[#00E5FF]/40 flex items-center gap-1 cursor-pointer transition"
                    title="查看复核任务流转与跟踪中心"
                  >
                    <span>复核跟踪</span>
                    <span class="w-4 h-4 rounded-full bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/50 text-[10px] font-spec-num font-bold flex items-center justify-center">
                      {{ reviewTaskList.filter(t => t.status !== 'closed').length }}
                    </span>
                  </button>
                </div>
              </div>
              <div class="spec-header-divider mb-2"></div>
            </div>

            <!-- 柱状图直观呈现比对结果 (4 Bars: 水蓝系+计划金+剩余银灰) -->
            <div class="my-1.5">
              <div class="flex items-center justify-between text-xs mb-1">
                <span class="font-semibold text-slate-300 flex items-center gap-1 font-spec-cn">
                  <span class="text-[#00E5FF] font-bold">|</span>
                  <span>多维水量比对 (万m³)</span>
                </span>

                <!-- 4 Legends -->
                <div class="flex items-center gap-2 text-[10px] font-spec-cn">
                  <div class="flex items-center gap-1">
                    <span class="w-2 h-2 rounded-xs bg-[#00E5FF]"></span>
                    <span class="text-slate-300">当前取水</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <span class="w-2 h-2 rounded-xs bg-[#38BDF8]"></span>
                    <span class="text-slate-300">3年均值</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <span class="w-2 h-2 rounded-xs bg-[#FFC65C]"></span>
                    <span class="text-slate-300">当月计划</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <span class="w-2 h-2 rounded-xs bg-[#8AAEC8]"></span>
                    <span class="text-slate-300">许可剩余</span>
                  </div>
                </div>
              </div>

              <!-- SVG Grouped 4-Bar Chart -->
              <div class="w-full h-24 relative bg-[rgba(6,26,46,0.6)] rounded-lg p-1 border border-[rgba(70,180,235,0.2)]">
                <svg viewBox="0 0 380 90" class="w-full h-full overflow-visible">
                  <!-- Horizontal grid lines -->
                  <line x1="25" y1="15" x2="375" y2="15" stroke="rgba(70,180,235,0.15)" stroke-width="0.7" stroke-dasharray="2,2" />
                  <line x1="25" y1="40" x2="375" y2="40" stroke="rgba(70,180,235,0.15)" stroke-width="0.7" stroke-dasharray="2,2" />
                  <line x1="25" y1="65" x2="375" y2="65" stroke="rgba(70,180,235,0.3)" stroke-width="1" />

                  <g fill="#5D8AAA" font-size="8" font-family="Bahnschrift, monospace" text-anchor="end">
                    <text x="22" y="18">3500</text>
                    <text x="22" y="43">1800</text>
                    <text x="22" y="68">0</text>
                  </g>

                  <!-- 5 monitored items -->
                  <g v-for="(item, idx) in standardCompareList" :key="'cmp-bar-' + item.id">
                    <!-- Current Bar (Cyan #00e5ff) -->
                    <rect
                      :x="42 + idx * 68"
                      :y="65 - Math.max(4, (item.currentWater / 3500) * 50)"
                      width="5"
                      :height="Math.max(4, (item.currentWater / 3500) * 50)"
                      fill="#00E5FF"
                      rx="1"
                    >
                      <title>{{ item.name }} 当前取水: {{ item.currentWater }} 万m³</title>
                    </rect>

                    <!-- 3-Year Avg Bar (Sky Blue #38bdf8) -->
                    <rect
                      :x="48 + idx * 68"
                      :y="65 - Math.max(4, (item.threeYearAvg / 3500) * 50)"
                      width="5"
                      :height="Math.max(4, (item.threeYearAvg / 3500) * 50)"
                      fill="#38BDF8"
                      rx="1"
                    >
                      <title>{{ item.name }} 近3年同期均值: {{ item.threeYearAvg }} 万m³</title>
                    </rect>

                    <!-- Monthly Plan Bar (Amber #f59e0b) -->
                    <rect
                      :x="54 + idx * 68"
                      :y="65 - Math.max(4, (item.monthlyPlan / 3500) * 50)"
                      width="5"
                      :height="Math.max(4, (item.monthlyPlan / 3500) * 50)"
                      fill="#FFC65C"
                      rx="1"
                    >
                      <title>{{ item.name }} 当月计划: {{ item.monthlyPlan }} 万m³</title>
                    </rect>

                    <!-- Licensed Remaining Bar (Cool Slate #64748b) -->
                    <rect
                      :x="60 + idx * 68"
                      :y="65 - Math.max(4, (item.licensedRemaining / 3500) * 50)"
                      width="5"
                      :height="Math.max(4, (item.licensedRemaining / 3500) * 50)"
                      fill="#64748b"
                      rx="1"
                    >
                      <title>{{ item.name }} 许可剩余: {{ item.licensedRemaining }} 万m³</title>
                    </rect>

                    <!-- Label -->
                    <text
                      :x="55 + idx * 68"
                      y="79"
                      text-anchor="middle"
                      font-size="9"
                      fill="#cbd5e1"
                      class="font-medium font-spec-cn"
                    >
                      {{ item.name.slice(0, 4) }}
                    </text>
                  </g>
                </svg>
              </div>
            </div>

            <!-- 差值表直观呈现比对结果与复核任务下发 (框内独立平滑滚动展示，避免溢出卡片) -->
            <div class="mt-1 flex-1 min-h-0 flex flex-col">
              <div class="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1 font-spec-cn shrink-0">
                <span class="flex items-center gap-1">
                  <span class="text-[#00E5FF] font-bold">|</span>
                  <span>取水数据差值比对</span>
                </span>
                <span class="text-[10px] text-[#5D8AAA]">框内滚动 / 支持下发指令</span>
              </div>

              <!-- Difference Table (Scrollable within container) -->
              <div class="max-h-[140px] 2xl:max-h-[185px] overflow-y-auto overflow-x-auto custom-dark-scrollbar rounded bg-[rgba(6,26,46,0.6)] border border-[rgba(70,180,235,0.2)]">
                <table class="w-full text-xs text-left">
                  <thead class="sticky top-0 z-10 bg-[#071F38] shadow-xs">
                    <tr class="text-[#5D8AAA] border-b border-[rgba(70,180,235,0.25)] text-[10px]">
                      <th class="py-1 px-1.5 font-medium font-spec-cn bg-[#071F38]">分析对象</th>
                      <th class="py-1 px-1 text-right font-medium font-spec-cn bg-[#071F38]">当前(万m³)</th>
                      <th class="py-1 px-1 text-right font-medium font-spec-cn bg-[#071F38]">同期均值/偏差</th>
                      <th class="py-1 px-1 text-right font-medium font-spec-cn bg-[#071F38]">当月计划</th>
                      <th class="py-1 px-1 text-right font-medium font-spec-cn bg-[#071F38]">许可剩余</th>
                      <th class="py-1 px-1.5 text-center font-medium font-spec-cn bg-[#071F38]">复核操作</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[rgba(70,180,235,0.12)] divide-dashed text-slate-300 text-[11px] font-spec-num">
                    <tr
                      v-for="item in standardCompareList"
                      :key="item.id"
                      class="hover:bg-white/5 transition"
                    >
                      <!-- Name -->
                      <td class="py-1.5 px-1.5 font-spec-cn">
                        <div class="font-medium text-white truncate max-w-[90px] 2xl:max-w-[105px]" :title="item.name">
                          {{ item.name }}
                        </div>
                        <span class="text-[9px] text-[#5D8AAA]">{{ item.category }}</span>
                      </td>

                      <!-- Current Water -->
                      <td class="py-1.5 px-1 text-right font-bold text-[#00E5FF]">
                        {{ item.currentWater }}
                      </td>

                      <!-- Three Year Avg & Deviation -->
                      <td class="py-1.5 px-1 text-right">
                        <div>{{ item.threeYearAvg }}</div>
                        <span
                          class="text-[10px] font-bold block"
                          :class="item.isAbnormal ? (item.avgDeviation > 0 ? 'text-[#00E5FF]' : 'text-[#38BDF8]') : 'text-[#5D8AAA]'"
                        >
                          {{ item.avgDeviation > 0 ? '+' : '' }}{{ item.avgDeviation }}%
                        </span>
                      </td>

                      <!-- Monthly Plan & Deviation -->
                      <td class="py-1.5 px-1 text-right text-slate-300">
                        <div>{{ item.monthlyPlan }}</div>
                        <span class="text-[9px] text-[#5D8AAA] block font-spec-cn">
                          {{ item.planDeviation > 0 ? '+' : '' }}{{ item.planDeviation }}%
                        </span>
                      </td>

                      <!-- Licensed Remaining -->
                      <td class="py-1.5 px-1 text-right text-slate-200 font-bold">
                        {{ item.licensedRemaining }}
                      </td>

                      <!-- Action: Dispatch Review Task Button -->
                      <td class="py-1.5 px-1.5 text-center font-spec-cn">
                        <button
                          v-if="item.isAbnormal"
                          type="button"
                          @click="dispatchReviewTask(item)"
                          class="px-2 py-0.5 rounded bg-[#00E5FF]/20 hover:bg-[#00E5FF]/30 text-[#00E5FF] border border-[#00E5FF]/50 font-bold text-[10px] shadow-sm cursor-pointer transition active:scale-95 whitespace-nowrap"
                          title="下发复核指令"
                        >
                          下发复核
                        </button>
                        <span v-else class="text-[10px] text-[#3DDC97] bg-[#3DDC97]/10 px-1.5 py-0.5 rounded border border-[#3DDC97]/30">
                          正常受控
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- 复核任务实时流转跟踪状态简报条 -->
            <div class="mt-2 pt-1.5 border-t border-[rgba(70,180,235,0.2)] flex items-center justify-between text-xs">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse"></span>
                <span class="text-slate-300 text-[11px] font-spec-cn">
                  复核任务流转跟踪：<span class="text-white font-bold font-spec-num">{{ reviewTaskList.length }}</span> 件在线
                </span>
              </div>
              <button
                type="button"
                @click="showReviewTaskModal = true"
                class="text-[11px] text-[#00E5FF] hover:text-[#79D8FF] transition flex items-center gap-0.5 cursor-pointer font-medium font-spec-cn"
              >
                <span>任务看板与反馈跟踪</span>
                <span>&gt;</span>
              </button>
            </div>
          </div>
        </template>

      </aside>

    </main>

    <!-- ================= 5. BOTTOM STATUS BAR ================= -->
    <footer class="h-8 bg-[#072444]/90 backdrop-blur-md border-t border-[rgba(70,180,235,0.3)] flex items-center justify-between px-5 text-[11px] text-[#8FB6D4] font-spec-cn z-40 shrink-0">
      <div class="flex items-center gap-2">
        <span>数据更新时间: <span class="font-spec-num text-slate-300">2025-05-20 10:25:00</span></span>
        <button
          type="button"
          @click="refreshData"
          class="text-[#00E5FF] hover:text-white transition cursor-pointer"
          title="刷新数据"
        >
          <svg class="w-3.5 h-3.5" :class="{ 'animate-spin': isRefreshing }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
          </svg>
        </button>
      </div>

      <div class="flex items-center gap-4 text-[#5D8AAA]">
        <span>数据来源: 西宁市水务局</span>
      </div>
    </footer>

    <!-- ================= 6. MODAL: 预警事件处置中心 ================= -->
    <div
      v-if="showWarningModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 font-spec-cn"
    >
      <div class="spec-card rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden text-white animate-scale-in border border-[rgba(70,180,235,0.4)]">
        <div class="px-5 py-3.5 bg-gradient-to-r from-[#071F38] to-[#0A2E50] border-b border-[rgba(70,180,235,0.3)] flex items-center justify-between">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-[#FFC65C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
            </svg>
            <span class="font-bold text-sm tracking-wide font-spec-cn">常态化预警与工单调度中心</span>
          </div>
          <button
            type="button"
            class="text-[#5D8AAA] hover:text-white cursor-pointer"
            @click="showWarningModal = false"
          >
            ✕
          </button>
        </div>

        <div class="p-5 space-y-4 text-xs">
          <div class="p-3 bg-[rgba(6,26,46,0.8)] rounded-lg border border-[rgba(70,180,235,0.25)]">
            <div class="font-bold text-[#00E5FF] mb-1">当前处置预警事件: {{ selectedEvent || '西宁全域水资源风控事件' }}</div>
            <div class="text-slate-300 leading-relaxed text-[11px]">
              监测到湟源县某工业取水户累计已超许可 12.7%，系统已自动锁定相关取水闸门遥控频次，触发二级水政督办流程。
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 text-slate-300">
            <div class="p-2.5 rounded bg-[rgba(10,36,58,0.55)] border border-[rgba(70,180,235,0.2)]">
              <div class="text-[#5D8AAA] text-[10px]">事件等级</div>
              <div class="font-bold text-[#FF6B7A] mt-0.5">高风险 (超许可预警)</div>
            </div>
            <div class="p-2.5 rounded bg-[rgba(10,36,58,0.55)] border border-[rgba(70,180,235,0.2)]">
              <div class="text-[#5D8AAA] text-[10px]">响应时限</div>
              <div class="font-bold text-[#FFC65C] mt-0.5">剩余 2 小时 45 分</div>
            </div>
          </div>
        </div>

        <div class="px-5 py-3 bg-[rgba(4,14,26,0.9)] border-t border-[rgba(70,180,235,0.2)] flex justify-end gap-2 text-xs">
          <button
            type="button"
            class="px-4 py-1.5 rounded border border-[rgba(70,180,235,0.3)] text-slate-300 hover:bg-white/10 cursor-pointer"
            @click="showWarningModal = false"
          >
            关闭
          </button>
          <button
            type="button"
            class="px-4 py-1.5 rounded bg-[#00E5FF]/20 border border-[#00E5FF]/60 text-[#00E5FF] font-bold hover:bg-[#00E5FF]/30 cursor-pointer shadow-[0_0_12px_rgba(0,229,255,0.3)]"
            @click="dispatchWarningWorkOrder"
          >
            下发督办工单
          </button>
        </div>
      </div>
    </div>

    <!-- ================= 2. 计量点详情简洁小弹窗 (点击地图计量点触发) ================= -->
    <div
      v-if="showMeterDetailModal && selectedMeterPoint"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 font-spec-cn"
      @click.self="showMeterDetailModal = false"
    >
      <div class="spec-card rounded-2xl shadow-2xl w-full max-w-md overflow-hidden text-white transition-all transform animate-fade-in border border-[rgba(70,180,235,0.4)]">
        <!-- 弹窗顶栏 (简洁紧凑) -->
        <div class="px-4 py-3 bg-gradient-to-r from-[#071F38] to-[#0A2E50] border-b border-[rgba(70,180,235,0.3)] flex items-center justify-between">
          <div class="flex items-center gap-2 min-w-0">
            <span
              class="w-2.5 h-2.5 rounded-full shrink-0"
              :class="selectedMeterPoint.meterStatus === 'normal'
                ? 'bg-[#3DDC97] shadow-[0_0_6px_#3DDC97]'
                : selectedMeterPoint.meterStatus === 'fault'
                  ? 'bg-[#FF6B7A] shadow-[0_0_6px_#FF6B7A]'
                  : 'bg-[#FFC65C] shadow-[0_0_6px_#FFC65C]'"
            ></span>
            <h3 class="text-sm font-bold text-white truncate tracking-wide font-spec-cn">
              {{ selectedMeterPoint.name }}
            </h3>
            <span
              class="px-1.5 py-0.2 rounded text-[10px] font-bold border shrink-0 font-spec-cn"
              :class="selectedMeterPoint.meterStatus === 'normal'
                ? 'bg-[#3DDC97]/20 text-[#3DDC97] border-[#3DDC97]/40'
                : selectedMeterPoint.meterStatus === 'fault'
                  ? 'bg-[#FF6B7A]/20 text-[#FF6B7A] border-[#FF6B7A]/40'
                  : 'bg-[#FFC65C]/20 text-[#FFC65C] border-[#FFC65C]/40'"
            >
              {{ selectedMeterPoint.meterStatus === 'normal' ? '正常' : selectedMeterPoint.meterStatus === 'fault' ? '故障' : '待检定' }}
            </span>
          </div>

          <button
            type="button"
            class="text-[#5D8AAA] hover:text-white p-1 rounded hover:bg-white/10 transition cursor-pointer text-xs"
            @click="showMeterDetailModal = false"
          >
            ✕
          </button>
        </div>

        <!-- 弹窗主体内容: 简洁清晰指标卡片 + 核心参数清单 -->
        <div class="p-4 space-y-3 text-xs">
          <!-- 实时数据双指标卡片 -->
          <div class="grid grid-cols-2 gap-2 text-center">
            <div class="p-2.5 rounded-lg bg-[rgba(10,36,58,0.55)] border border-[rgba(70,180,235,0.25)]">
              <span class="text-[#5D8AAA] text-[10px] block font-spec-cn">瞬时流速 / 流量</span>
              <div class="text-lg font-bold font-spec-num text-[#00E5FF] mt-0.5">
                {{ selectedMeterPoint.instantFlow }} <span class="text-[10px] font-normal text-[#5D8AAA]">m³/h</span>
              </div>
            </div>
            <div class="p-2.5 rounded-lg bg-[rgba(10,36,58,0.55)] border border-[rgba(70,180,235,0.25)]">
              <span class="text-[#5D8AAA] text-[10px] block font-spec-cn">今日累计取水</span>
              <div class="text-lg font-bold font-spec-num text-[#38BDF8] mt-0.5">
                {{ selectedMeterPoint.dailyAccumulated }} <span class="text-[10px] font-normal text-[#5D8AAA]">m³</span>
              </div>
            </div>
          </div>

          <!-- 核心属性精简列表 -->
          <div class="p-3 rounded-lg bg-[rgba(6,26,46,0.8)] border border-[rgba(70,180,235,0.2)] space-y-1.5 text-[11px] font-spec-cn">
            <div class="flex items-center justify-between">
              <span class="text-[#5D8AAA]">计量编码</span>
              <span class="font-spec-num text-[#00E5FF] font-semibold select-all">{{ selectedMeterPoint.meterCode }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-[#5D8AAA]">器具类型</span>
              <span class="text-slate-200 font-medium">{{ selectedMeterPoint.deviceType }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-[#5D8AAA]">所属用水户</span>
              <span class="text-slate-200 truncate max-w-[210px] text-right">{{ selectedMeterPoint.userEnterprise }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-[#5D8AAA]">安装位置</span>
              <span class="text-slate-200 truncate max-w-[210px] text-right" :title="selectedMeterPoint.installLocation">{{ selectedMeterPoint.installLocation }}</span>
            </div>
            <div class="flex items-center justify-between pt-1 border-t border-[rgba(70,180,235,0.2)]">
              <span class="text-[#5D8AAA]">检定有效期</span>
              <span class="font-spec-num" :class="selectedMeterPoint.meterStatus === 'pending' ? 'text-[#FFC65C] font-bold' : 'text-slate-200'">
                {{ selectedMeterPoint.lastCheckDate }} ~ {{ selectedMeterPoint.nextCheckDate }}
              </span>
            </div>
          </div>

          <!-- 异常状态极简提醒 (仅在故障/待检定时显示) -->
          <div
            v-if="selectedMeterPoint.meterStatus === 'fault'"
            class="p-2.5 rounded-lg bg-rose-950/40 border border-[#FF6B7A]/40 text-[11px] text-rose-200 flex items-start gap-1.5 font-spec-cn"
          >
            <span class="text-[#FF6B7A] font-bold shrink-0">异常诊断:</span>
            <span>{{ selectedMeterPoint.faultDesc || '设备通信中断，已连续脱网超24小时' }}</span>
          </div>
          <div
            v-else-if="selectedMeterPoint.meterStatus === 'pending'"
            class="p-2.5 rounded-lg bg-amber-950/40 border border-[#FFC65C]/40 text-[11px] text-amber-200 flex items-start gap-1.5 font-spec-cn"
          >
            <span class="text-[#FFC65C] font-bold shrink-0">定检催告:</span>
            <span>{{ selectedMeterPoint.pendingReason || '法定周期已满，请安排送检核验' }}</span>
          </div>
        </div>

        <!-- 弹窗底栏极简按钮 -->
        <div class="px-4 py-2.5 bg-[#06152b] border-t border-[#1b4372] flex items-center justify-between text-xs">
          <span class="text-slate-400 text-[10px]">{{ selectedMeterPoint.district }} · 遥测在线</span>
          <div class="flex items-center gap-2">
            <button
              v-if="selectedMeterPoint.meterStatus === 'fault'"
              type="button"
              class="px-3 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white font-medium transition cursor-pointer text-xs"
              @click="dispatchMeterWorkOrder"
            >
              抢修派单
            </button>
            <button
              v-else-if="selectedMeterPoint.meterStatus === 'pending'"
              type="button"
              class="px-3 py-1 rounded bg-amber-600 hover:bg-amber-500 text-white font-medium transition cursor-pointer text-xs"
              @click="bookMeterVerification"
            >
              预约检定
            </button>
            <button
              type="button"
              class="px-3 py-1 rounded bg-white/10 hover:bg-white/15 text-slate-200 transition cursor-pointer text-xs"
              @click="showMeterDetailModal = false"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ================= 3. 浮动通知栏: 复核任务下发即时通知 ================= -->
    <transition name="fade">
      <div
        v-if="reviewTaskNotice"
        class="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#092244]/95 border border-cyan-400 text-white px-5 py-2.5 rounded-xl shadow-[0_0_25px_rgba(6,182,212,0.4)] flex items-center gap-2.5 text-xs font-semibold backdrop-blur-md"
      >
        <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
        <span>{{ reviewTaskNotice }}</span>
        <button
          type="button"
          @click="showReviewTaskModal = true"
          class="text-cyan-300 underline hover:text-white cursor-pointer ml-2"
        >
          查看跟踪详情 &gt;
        </button>
      </div>
    </transition>

    <!-- ================= 4. MODAL: 标准化对比偏差复核与任务跟踪中心 ================= -->
    <div
      v-if="showReviewTaskModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 font-spec-cn"
      @click.self="showReviewTaskModal = false"
    >
      <div class="spec-card rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden text-white transition-all animate-fade-in flex flex-col max-h-[85vh] border border-[rgba(70,180,235,0.4)]">
        <!-- Modal Header -->
        <div class="px-6 py-4 bg-gradient-to-r from-[#071F38] to-[#0A2E50] border-b border-[rgba(70,180,235,0.3)] flex items-center justify-between shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF]">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 11l3 3L22 4"></path>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-base font-bold text-white tracking-wide font-spec-cn">
                取水数据对比与复核任务跟踪中心
              </h3>
              <p class="text-xs text-[#5D8AAA] mt-0.5 font-spec-cn">
                针对取用水户下发复核指令，实施全流程穿透式跟踪与闭环核销
              </p>
            </div>
          </div>

          <button
            type="button"
            class="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
            @click="showReviewTaskModal = false"
          >
            ✕
          </button>
        </div>

        <!-- Modal Summary Metrics -->
        <div class="px-6 py-3 bg-[rgba(6,26,46,0.85)] border-b border-[rgba(70,180,235,0.2)] grid grid-cols-4 gap-3 text-center shrink-0">
          <div
            class="p-2 rounded-lg border transition cursor-pointer"
            :class="reviewTaskStatusFilter === 'all' ? 'bg-[#00E5FF]/20 border-[#00E5FF] text-[#00E5FF]' : 'bg-[rgba(10,36,58,0.5)] border-[rgba(70,180,235,0.2)] text-slate-300'"
            @click="reviewTaskStatusFilter = 'all'"
          >
            <span class="text-[10px] block font-medium font-spec-cn">复核任务总数</span>
            <span class="text-lg font-bold font-spec-num text-[#00E5FF] mt-0.5 block">{{ reviewTaskList.length }}</span>
          </div>
          <div
            class="p-2 rounded-lg border transition cursor-pointer"
            :class="reviewTaskStatusFilter === 'pending' ? 'bg-[#FFC65C]/20 border-[#FFC65C] text-[#FFC65C]' : 'bg-amber-950/20 border-amber-500/30 text-amber-300'"
            @click="reviewTaskStatusFilter = 'pending'"
          >
            <span class="text-[10px] block font-medium font-spec-cn">待现场核验</span>
            <span class="text-lg font-bold font-spec-num text-[#FFC65C] mt-0.5 block">
              {{ reviewTaskList.filter(t => t.status === 'pending').length }}
            </span>
          </div>
          <div
            class="p-2 rounded-lg border transition cursor-pointer"
            :class="reviewTaskStatusFilter === 'in_progress' ? 'bg-[#38BDF8]/20 border-[#38BDF8] text-[#38BDF8]' : 'bg-blue-950/20 border-blue-500/30 text-blue-300'"
            @click="reviewTaskStatusFilter = 'in_progress'"
          >
            <span class="text-[10px] block font-medium font-spec-cn">核查进行中</span>
            <span class="text-lg font-bold font-spec-num text-[#38BDF8] mt-0.5 block">
              {{ reviewTaskList.filter(t => t.status === 'in_progress').length }}
            </span>
          </div>
          <div
            class="p-2 rounded-lg border transition cursor-pointer"
            :class="reviewTaskStatusFilter === 'closed' ? 'bg-slate-700/40 border-slate-400 text-slate-100' : 'bg-slate-800/20 border-slate-600/30 text-slate-300'"
            @click="reviewTaskStatusFilter = 'closed'"
          >
            <span class="text-[10px] block font-medium font-spec-cn">已完成水量核定</span>
            <span class="text-lg font-bold font-spec-num text-[#3DDC97] mt-0.5 block">
              {{ reviewTaskList.filter(t => t.status === 'closed').length }}
            </span>
          </div>
        </div>

        <!-- Modal Task List Content -->
        <div class="p-6 overflow-y-auto custom-dark-scrollbar space-y-3 flex-1 text-xs">
          <div
            v-for="task in filteredReviewTasks"
            :key="task.id"
            class="p-4 rounded-xl bg-[rgba(10,36,58,0.55)] border border-[rgba(70,180,235,0.2)] space-y-2 hover:border-[#00E5FF]/50 transition"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="font-spec-num text-xs font-bold text-[#00E5FF] bg-[#00E5FF]/15 px-2 py-0.5 rounded border border-[#00E5FF]/30">
                  {{ task.taskCode }}
                </span>
                <span class="font-bold text-sm text-white font-spec-cn">{{ task.targetName }}</span>
              </div>

              <span
                class="px-2.5 py-0.5 rounded-full text-xs font-bold border font-spec-cn"
                :class="task.status === 'pending'
                  ? 'bg-[#FFC65C]/20 text-[#FFC65C] border-[#FFC65C]/40 animate-pulse'
                  : task.status === 'in_progress'
                    ? 'bg-[#38BDF8]/20 text-[#38BDF8] border-[#38BDF8]/40'
                    : 'bg-[#3DDC97]/20 text-[#3DDC97] border-[#3DDC97]/40'"
              >
                ● {{ task.statusLabel }}
              </span>
            </div>

            <div class="grid grid-cols-3 gap-2 text-slate-300 bg-black/20 p-2.5 rounded-lg border border-white/5 font-spec-cn">
              <div><span class="text-[#5D8AAA]">偏差特征：</span><span class="text-[#FF6B7A] font-bold font-spec-num">{{ task.deviationInfo }}</span></div>
              <div><span class="text-[#5D8AAA]">责任专员：</span>{{ task.inspector }}</div>
              <div><span class="text-[#5D8AAA]">调度时限：</span><span class="font-spec-num text-[#FFC65C]">{{ task.deadline }}</span></div>
            </div>

            <div class="text-slate-300 flex items-start gap-2 bg-[rgba(6,26,46,0.8)] p-2.5 rounded-lg border border-[rgba(70,180,235,0.2)] font-spec-cn">
              <span class="text-[#00E5FF] font-bold shrink-0">现场进展与复核结果：</span>
              <span class="leading-relaxed">{{ task.result || '专员排班中，等待现场核验反馈。' }}</span>
            </div>

            <div class="flex items-center justify-end gap-2 pt-1 font-spec-cn">
              <button
                v-if="task.status === 'pending'"
                type="button"
                class="px-3 py-1 rounded bg-[#00E5FF]/20 hover:bg-[#00E5FF]/30 text-[#00E5FF] border border-[#00E5FF]/50 font-semibold transition cursor-pointer"
                @click="task.status = 'in_progress'; task.statusLabel = '核查进行中'; task.result = '专员已到达现场，正在校验超声流量计读数与出厂标定曲线。'"
              >
                开始现场核查
              </button>
              <button
                v-if="task.status === 'in_progress'"
                type="button"
                class="px-3 py-1 rounded bg-[#3DDC97]/20 hover:bg-[#3DDC97]/30 text-[#3DDC97] border border-[#3DDC97]/50 font-semibold transition cursor-pointer"
                @click="task.status = 'closed'; task.statusLabel = '已完成复核修正'; task.result = '现场核实完成，误差系水表阻尼卡滞，已现场校正并完成历史电量-水量折算修订。'"
              >
                核定修正并销号闭环
              </button>
              <button
                v-if="task.status === 'closed'"
                type="button"
                class="px-3 py-1 rounded bg-white/10 text-slate-400 font-semibold cursor-not-allowed"
                disabled
              >
                已归档核销
              </button>
            </div>
          </div>

          <div v-if="filteredReviewTasks.length === 0" class="text-center py-8 text-[#5D8AAA] text-xs font-spec-cn">
            暂无该状态下的复核任务
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="px-6 py-3.5 bg-[rgba(4,14,26,0.9)] border-t border-[rgba(70,180,235,0.2)] flex items-center justify-between text-xs shrink-0 font-spec-cn">
          <div class="text-[#5D8AAA] flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-[#3DDC97]"></span>
            <span>标准化复核引擎闭环率：<span class="font-spec-num text-white">99.2%</span></span>
          </div>

          <button
            type="button"
            class="px-5 py-1.5 rounded-lg bg-[#00E5FF]/15 hover:bg-[#00E5FF]/25 text-[#00E5FF] border border-[#00E5FF]/40 font-semibold transition cursor-pointer"
            @click="showReviewTaskModal = false"
          >
            关闭
          </button>
        </div>
      </div>
    </div>

    <!-- ================= 8. 区县计划水量与直报水量管控比对弹窗 (支持实时微调直报/计划水量，直观验证红色边缘联动) ================= -->
    <div
      v-if="showWaterQuotaModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm select-none font-spec-cn"
      @click.self="showWaterQuotaModal = false"
    >
      <div class="spec-card rounded-2xl w-full max-w-4xl max-h-[88vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-[rgba(70,180,235,0.4)]">
        <!-- Modal Header -->
        <div class="px-6 py-4 bg-gradient-to-r from-[#071F38] to-[#0A2E50] border-b border-[rgba(70,180,235,0.3)] flex items-center justify-between shrink-0">
          <div class="flex items-center gap-3">
            <span class="w-3.5 h-3.5 rounded-sm bg-gradient-to-br from-[#FF6B7A] to-[#FFC65C] shadow-[0_0_8px_#FF6B7A]"></span>
            <div>
              <div class="flex items-center gap-2.5">
                <h3 class="text-base font-bold text-white tracking-wide font-spec-cn">
                  西宁市区县计划水量与直报水量管控比对
                </h3>
                <span class="px-2 py-0.5 rounded text-[11px] font-bold font-spec-num bg-[#FF6B7A]/20 text-[#FF6B7A] border border-[#FF6B7A]/50">
                  {{ exceededDistrictsList.length }} 个区县直报超计划 (已标红)
                </span>
              </div>
              <p class="text-xs text-[#5D8AAA] mt-0.5 font-spec-cn">
                规则联动：在地图区县名称处展示计划与直报水量；若直报水量大于计划水量，相应行政区划边缘自动以红色发光标记
              </p>
            </div>
          </div>
          <button
            type="button"
            class="text-[#5D8AAA] hover:text-white transition cursor-pointer p-1.5 rounded-lg hover:bg-white/10"
            @click="showWaterQuotaModal = false"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="flex-1 overflow-y-auto p-5 space-y-4 font-spec-cn">
          <!-- KPI Summary Strip -->
          <div class="grid grid-cols-4 gap-3">
            <div class="bg-[rgba(10,36,58,0.55)] p-3 rounded-xl border border-[rgba(70,180,235,0.25)]">
              <div class="text-[11px] text-[#5D8AAA]">全市核定计划总量</div>
              <div class="text-xl font-bold font-spec-num text-[#00E5FF] mt-1">
                {{ Object.values(districtWaterQuotaMap).reduce((s, i) => s + i.planned, 0).toFixed(1) }} <span class="text-xs font-normal font-spec-cn">万m³</span>
              </div>
            </div>
            <div class="bg-[rgba(10,36,58,0.55)] p-3 rounded-xl border border-[rgba(70,180,235,0.25)]">
              <div class="text-[11px] text-[#5D8AAA]">全市实际直报总量</div>
              <div class="text-xl font-bold font-spec-num text-[#38BDF8] mt-1">
                {{ Object.values(districtWaterQuotaMap).reduce((s, i) => s + i.reported, 0).toFixed(1) }} <span class="text-xs font-normal font-spec-cn">万m³</span>
              </div>
            </div>
            <div class="bg-[rgba(10,36,58,0.55)] p-3 rounded-xl border border-[#FF6B7A]/35">
              <div class="text-[11px] text-[#5D8AAA]">直报超计划区县数</div>
              <div class="text-xl font-bold font-spec-num text-[#FF6B7A] mt-1">
                {{ exceededDistrictsList.length }} <span class="text-xs font-normal font-spec-cn">个区县 (边缘红标)</span>
              </div>
            </div>
            <div class="bg-[rgba(10,36,58,0.55)] p-3 rounded-xl border border-[#3DDC97]/30">
              <div class="text-[11px] text-[#5D8AAA]">合规受控区县数</div>
              <div class="text-xl font-bold font-spec-num text-[#3DDC97] mt-1">
                {{ 7 - exceededDistrictsList.length }} <span class="text-xs font-normal font-spec-cn">个区县 (正常边缘)</span>
              </div>
            </div>
          </div>

          <!-- District Quotas Table -->
          <div class="border border-[rgba(70,180,235,0.2)] rounded-xl overflow-hidden bg-[rgba(6,26,46,0.8)]">
            <table class="w-full text-left text-xs">
              <thead class="bg-[rgba(10,36,58,0.6)] text-[#5D8AAA] border-b border-[rgba(70,180,235,0.2)]">
                <tr>
                  <th class="py-2.5 px-3 font-spec-cn">行政区县</th>
                  <th class="py-2.5 px-2 font-spec-cn">水量梯级</th>
                  <th class="py-2.5 px-3 text-right font-spec-cn">计划水量 (万m³)</th>
                  <th class="py-2.5 px-3 text-right font-spec-cn">直报水量 (万m³)</th>
                  <th class="py-2.5 px-3 text-right font-spec-cn">差额 (直报-计划)</th>
                  <th class="py-2.5 px-2 text-center font-spec-cn">管控状态</th>
                  <th class="py-2.5 px-2 text-center font-spec-cn">地图边缘标记</th>
                  <th class="py-2.5 px-3 text-center font-spec-cn">动态调节测试</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[rgba(70,180,235,0.12)] divide-dashed font-spec-num">
                <tr
                  v-for="d in Object.values(districtWaterQuotaMap)"
                  :key="d.name"
                  class="transition-colors hover:bg-white/5"
                  :class="d.reported > d.planned ? 'bg-rose-950/20' : ''"
                >
                  <td class="py-2.5 px-3 font-spec-cn font-bold text-white flex items-center gap-1.5">
                    <span
                      class="w-2 h-2 rounded-full"
                      :class="d.reported > d.planned ? 'bg-[#FF6B7A]' : 'bg-[#3DDC97]'"
                    ></span>
                    <span>{{ d.name }}</span>
                  </td>
                  <td class="py-2.5 px-2 font-spec-cn">
                    <span
                      class="px-1.5 py-0.5 rounded text-[10px] font-bold"
                      :style="{
                        backgroundColor: (getDistrictTier(d.name)?.color || '#0284c7') + '33',
                        color: getDistrictTier(d.name)?.strokeColor || '#38bdf8',
                        border: '1px solid ' + (getDistrictTier(d.name)?.strokeColor || '#38bdf8') + '55'
                      }"
                    >
                      {{ getDistrictTier(d.name)?.label || '—' }}
                    </span>
                  </td>
                  <td class="py-2.5 px-3 text-right text-slate-300 font-bold">
                    {{ d.planned.toFixed(1) }}
                  </td>
                  <td class="py-2.5 px-3 text-right font-bold" :class="d.reported > d.planned ? 'text-[#FF6B7A] font-black' : 'text-[#38BDF8]'">
                    {{ d.reported.toFixed(1) }}
                  </td>
                  <td class="py-2.5 px-3 text-right font-bold" :class="d.reported > d.planned ? 'text-[#FF6B7A]' : 'text-[#3DDC97]'">
                    {{ d.reported > d.planned ? '+' + (d.reported - d.planned).toFixed(1) : (d.reported - d.planned).toFixed(1) }}
                  </td>
                  <td class="py-2.5 px-2 text-center font-spec-cn">
                    <span
                      v-if="d.reported > d.planned"
                      class="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FF6B7A]/20 text-[#FF6B7A] border border-[#FF6B7A]/50 inline-flex items-center gap-1"
                    >
                      <span class="w-1.5 h-1.5 rounded-full bg-[#FF6B7A] animate-pulse"></span>
                      超计划
                    </span>
                    <span
                      v-else
                      class="px-2 py-0.5 rounded text-[10px] font-bold bg-[#3DDC97]/20 text-[#3DDC97] border border-[#3DDC97]/40"
                    >
                      合规安全
                    </span>
                  </td>
                  <td class="py-2.5 px-2 text-center font-spec-cn">
                    <span
                      v-if="d.reported > d.planned"
                      class="text-xs font-bold text-[#FF6B7A] flex items-center justify-center gap-1"
                    >
                      <span class="w-2.5 h-1 rounded bg-[#FF6B7A] shadow-[0_0_6px_#FF6B7A]"></span>
                      红色边缘标记
                    </span>
                    <span
                      v-else
                      class="text-xs text-[#5D8AAA] flex items-center justify-center gap-1"
                    >
                      <span class="w-2.5 h-1 rounded bg-slate-500"></span>
                      标准边缘
                    </span>
                  </td>
                  <td class="py-2.5 px-3 text-center">
                    <div class="flex items-center justify-center gap-1">
                      <button
                        type="button"
                        class="px-1.5 py-0.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition cursor-pointer text-[10px]"
                        title="直报水量 -5万m³"
                        @click="adjustDistrictQuota(d.name, 'reported', -5)"
                      >
                        -5
                      </button>
                      <button
                        type="button"
                        class="px-1.5 py-0.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition cursor-pointer text-[10px]"
                        title="直报水量 +5万m³"
                        @click="adjustDistrictQuota(d.name, 'reported', 5)"
                      >
                        +5
                      </button>
                      <button
                        type="button"
                        class="px-2 py-0.5 rounded transition cursor-pointer text-[10px] font-bold border ml-1 font-spec-cn"
                        :class="d.reported > d.planned
                          ? 'bg-[#3DDC97]/20 hover:bg-[#3DDC97]/30 text-[#3DDC97] border-[#3DDC97]/40'
                          : 'bg-[#FF6B7A]/20 hover:bg-[#FF6B7A]/30 text-[#FF6B7A] border-[#FF6B7A]/40'"
                        @click="toggleDistrictExceed(d.name)"
                      >
                        {{ d.reported > d.planned ? '设为合规' : '设为超量' }}
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Description Callout -->
          <div class="p-3 bg-[rgba(6,26,46,0.8)] border border-[rgba(70,180,235,0.25)] rounded-xl text-xs text-slate-300 flex items-start gap-2.5">
            <span class="text-[#00E5FF] font-bold text-sm shrink-0">💡</span>
            <div class="space-y-1 leading-relaxed font-spec-cn">
              <div>
                <strong>当前比对规则：</strong>系统针对西宁全域 4区3县（湟中区、大通县、城北区、城东区、城西区、城中区、湟源县）实时计算直报水量与计划水量的管控关系。
              </div>
              <div class="text-[#5D8AAA] text-[11px]">
                当 <code class="text-[#FF6B7A] bg-black/40 px-1 py-0.5 rounded font-spec-num">直报水量 > 计划水量</code> 时，地图对应的行政区划多边形边缘将采用红色（<span class="text-[#FF6B7A] font-bold font-spec-num">#FF6B7A</span>）发光描边显著高亮，区县中心胶囊显示红底警示标与直报红字；当直报水量受控在计划以内时，恢复为水量梯级色与标准边界。
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="px-6 py-3.5 bg-[rgba(4,14,26,0.9)] border-t border-[rgba(70,180,235,0.2)] flex items-center justify-between text-xs shrink-0 font-spec-cn">
          <button
            type="button"
            class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition cursor-pointer"
            @click="resetDistrictQuotas"
          >
            恢复默认基准数据
          </button>

          <button
            type="button"
            class="px-5 py-1.5 rounded-lg bg-[#00E5FF]/20 hover:bg-[#00E5FF]/30 text-[#00E5FF] border border-[#00E5FF]/50 font-semibold transition cursor-pointer shadow-[0_0_12px_rgba(0,229,255,0.25)]"
            @click="showWaterQuotaModal = false"
          >
            返回地图查看
          </button>
        </div>
      </div>
    </div>

    <!-- ================= 9. DEV ANNOTATION DRAWER & BADGES SYSTEM (开发标注抽屉组件) ================= -->
    <div
      v-if="scenarioMode === 'comprehensive'"
      class="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      <!-- Collapsed floating pill button on the right edge -->
      <transition name="fade">
        <button
          v-if="!showAnnotationPanel"
          type="button"
          @click="showAnnotationPanel = true"
          class="pointer-events-auto fixed right-0 top-24 z-50 px-3 py-2 rounded-l-xl bg-gradient-to-r from-[#FFD043] to-[#FF9F00] text-[#0A1626] font-extrabold text-xs shadow-[0_0_20px_rgba(255,184,0,0.85)] border-y-2 border-l-2 border-white flex items-center gap-2 cursor-pointer hover:pl-4 transition-all duration-200 group"
          title="点击展开开发标注面板 (快捷键 A)"
        >
          <span class="w-2.5 h-2.5 rounded-full bg-[#0A1626] animate-pulse"></span>
          <span class="font-spec-cn tracking-wide">开发标注 · 10项</span>
          <span class="text-[10px] bg-black/20 text-[#0A1626] px-1 py-0.2 rounded font-mono font-bold">A</span>
        </button>
      </transition>

      <!-- Expanded Right-Side Specification Panel -->
      <transition name="slide-right">
        <aside
          v-if="showAnnotationPanel"
          id="dev-anno-source"
          class="pointer-events-auto fixed top-0 right-0 h-full w-[380px] 2xl:w-[420px] bg-[#071628]/96 backdrop-blur-xl border-l-2 border-[#00E5FF]/40 shadow-[-12px_0_40px_rgba(0,0,0,0.85)] z-50 flex flex-col font-spec-cn text-white select-none animate-slide-in"
        >
          <!-- Panel Header Bar -->
          <div class="px-4 py-3 bg-gradient-to-r from-[#071F38] via-[#0A2E50] to-[#071F38] border-b border-[rgba(70,180,235,0.3)] flex items-center justify-between shrink-0">
            <!-- Title with Amber Dot -->
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-[#FFB800] shadow-[0_0_8px_#FFB800] border border-white"></span>
              <span class="font-bold text-sm tracking-wide text-white">开发标注 · 共 10 项</span>
            </div>

            <!-- 3 Action Buttons -->
            <div class="flex items-center gap-1.5 text-xs">
              <!-- 标注展开/收起 (切换标点可见性) -->
              <button
                type="button"
                @click="showAnnotationBadges = !showAnnotationBadges"
                class="px-2 py-1 rounded bg-[rgba(10,36,58,0.8)] hover:bg-[#3FD0FF]/20 text-[#9BEAFF] border border-[rgba(70,180,235,0.35)] cursor-pointer transition text-[11px] font-medium"
                :title="showAnnotationBadges ? '点击隐藏页面黄色标注圆圈' : '点击显示页面黄色标注圆圈'"
              >
                {{ showAnnotationBadges ? '标点隐藏' : '标点展开' }}
              </button>

              <!-- 复制清单 -->
              <button
                type="button"
                @click="copyAnnotationList"
                class="px-2 py-1 rounded bg-[rgba(10,36,58,0.8)] hover:bg-[#3FD0FF]/20 text-[#9BEAFF] border border-[rgba(70,180,235,0.35)] cursor-pointer transition text-[11px] font-medium flex items-center gap-1"
                title="复制所有10项卡片规格说明为文本格式"
              >
                <svg class="w-3 h-3 text-[#3FD0FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span>复制清单</span>
              </button>

              <!-- 折叠 -->
              <button
                type="button"
                @click="showAnnotationPanel = false"
                class="px-2 py-1 rounded bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 cursor-pointer transition text-[11px] font-medium"
                title="折叠标注面板 (快捷键 A)"
              >
                折叠
              </button>
            </div>
          </div>

          <!-- Subtitle & Usage Hint -->
          <div class="px-3.5 py-2 bg-[#051322]/80 border-b border-[rgba(70,180,235,0.18)] text-[10.5px] text-[#8FB6D4] leading-relaxed shrink-0">
            <span class="text-[#FFC65C] font-semibold">编码说明:</span>
            <span class="text-slate-300 ml-1">HTML中的 <code class="text-[#00E5FF] font-mono bg-black/40 px-1 py-0.5 rounded">#dev-anno-source</code>; 编号与页面黄色圆圈一一对应; 快捷键 <kbd class="px-1 py-0.2 rounded bg-white/10 text-white font-mono font-bold">A</kbd> 开关标注框，悬停清单条目可高亮对应模块。</span>
          </div>

          <!-- Scrollable Annotation Items List -->
          <div class="flex-1 overflow-y-auto custom-dark-scrollbar p-3 space-y-2.5">
            <div
              v-for="item in annotationList"
              :key="item.id"
              :id="'anno-card-' + item.id"
              class="p-3 rounded-lg border transition-all duration-200 cursor-pointer"
              :class="activeAnnotationId === item.id
                ? 'bg-[rgba(18,52,86,0.9)] border-[#FFB800] shadow-[0_0_16px_rgba(255,184,0,0.35)] scale-[1.01]'
                : 'bg-[rgba(10,36,58,0.55)] border-[rgba(70,180,235,0.2)] hover:border-[#3FD0FF]/60 hover:bg-[rgba(12,42,70,0.7)]'"
              @mouseenter="activeAnnotationId = item.id"
              @mouseleave="activeAnnotationId = null"
              @click="scrollToPageElement(item.id)"
            >
              <!-- Item Title Bar with Circular Badge -->
              <div class="flex items-center gap-2 pb-1.5 border-b border-[rgba(70,180,235,0.18)] mb-2">
                <span class="w-5 h-5 rounded-full bg-gradient-to-br from-[#FFD043] to-[#FF9F00] text-[#0A1626] font-extrabold text-[11px] flex items-center justify-center border border-white shrink-0 shadow-sm">
                  {{ item.id }}
                </span>
                <h4 class="font-bold text-xs 2xl:text-sm text-white truncate font-spec-cn flex-1">
                  {{ item.title }}
                </h4>
                <span class="text-[10px] text-[#5D8AAA] font-mono shrink-0">#{{ item.id }}</span>
              </div>

              <!-- Structured Content -->
              <div class="space-y-1.5 text-xs">
                <!-- 1. 数据来源 -->
                <div class="leading-relaxed">
                  <span class="text-[#00E5FF] font-semibold">数据来源: </span>
                  <span class="text-slate-200 text-[11px]">{{ item.source }}</span>
                </div>

                <!-- 2. 交互 -->
                <div class="leading-relaxed">
                  <span class="text-[#FFC65C] font-semibold">交互: </span>
                  <span class="text-slate-200 text-[11px]">{{ item.interaction }}</span>
                </div>

                <!-- 3. 开发要点 -->
                <div>
                  <div class="text-[#9BEAFF] font-semibold mb-1">开发要点:</div>
                  <div class="space-y-1 pl-2 border-l-2 border-[#00E5FF]/30 text-slate-300 text-[11px] leading-relaxed">
                    <div v-for="(p, pIdx) in item.keyPoints" :key="pIdx">
                      {{ pIdx + 1 }}、{{ p }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Panel Footer Status Strip -->
          <div class="px-4 py-2.5 bg-[#051322] border-t border-[rgba(70,180,235,0.25)] flex items-center justify-between text-[11px] text-[#8FB6D4] shrink-0 font-spec-cn">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-[#3DDC97]"></span>
              <span>联动状态: <span class="text-white font-bold">{{ activeAnnotationId ? `高亮模块 #${activeAnnotationId}` : '就绪待选' }}</span></span>
            </div>
            <span class="text-[#5D8AAA] font-mono">10 / 10 模块已对齐</span>
          </div>
        </aside>
      </transition>

      <!-- Copy Success Toast Notification -->
      <transition name="fade">
        <div
          v-if="copySuccessToast"
          class="pointer-events-auto fixed bottom-14 right-6 z-50 bg-[#072444]/95 border border-[#3DDC97] text-white px-4 py-2 rounded-xl shadow-[0_0_20px_rgba(61,220,151,0.5)] flex items-center gap-2 text-xs font-semibold backdrop-blur-md"
        >
          <span class="text-[#3DDC97] text-sm">✓</span>
          <span>10项开发标注清单已成功复制到剪贴板！</span>
        </div>
      </transition>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { xiningDistrictsGeo, xiningOuterBoundaryPath } from '../../data/xiningGeoData';

const emit = defineEmits<{
  (e: 'navigate', menu: string): void;
}>();

const hoveredDistrictName = ref<string | null>(null);

function navigate(menu: string) {
  emit('navigate', menu);
}

// Current Time Str
const currentTimeStr = ref('10:30:25');
let timer: number | null = null;

// ================= 开发标注 (Design Specification & Callout System) =================
interface AnnotationItem {
  id: number;
  title: string;
  source: string;
  interaction: string;
  keyPoints: string[];
}

const showAnnotationPanel = ref(false);
const showAnnotationBadges = ref(true);
const activeAnnotationId = ref<number | null>(null);
const copySuccessToast = ref(false);

const annotationList = ref<AnnotationItem[]>([
  {
    id: 1,
    title: '顶部标签栏 / 全局控制',
    source: '时间取浏览器本地时间；实时气象接口获取西宁市气温(18℃)；常态化预警待办工单中枢(12起待办)。',
    interaction: '顶部依次展示星期、气温、当前时间；常态化预警铃铛可唤起调度面板；点击工作台退出大屏模式。',
    keyPoints: [
      '顶部名匾采用SVG切角科技底衬，标题居中自适应。',
      '快捷键 A 开关右侧标注框，悬停清单条目可高亮对应模块。',
      '全局时钟秒级精准自更新，断网时自动降级为本地时钟。',
    ],
  },
  {
    id: 2,
    title: '区域用水态势分析 (左1)',
    source: '全域及7区县取用水数据库，包含计量水量、直报水量、税务水量、许可水量与计划水量五维融合数据，以及2025/2026年度月度用水时序数据。',
    interaction: '行业类型、水源类型、年份筛选联动；鼠标悬浮柱体或数据节点弹出5维指标对比浮窗；点击区划联动全域地图定位。',
    keyPoints: [
      '大卡片自上而下依次为筛选条件、五维统计数量、行政区域用水对比图与年度时间趋势。',
      '三维同色水蓝柱族（计量/直报/税务）与双轨管控折线（许可金黄/计划虚白）在同一SVG坐标系下归一化渲染。',
      '用水时间趋势仅保留2026年与2025年两条年度序列，年份筛选控制对应曲线高亮。如果选择25年，则显示25年和24年的趋势，依次类推',
    ],
  },
  {
    id: 3,
    title: '用水时间变化趋势 (区域内子项)',
    source: '2025年与2026年逐月用水量时序数据。',
    interaction: '鼠标悬停任意月份节点展示当月2026年/2025年用水量与同比变化浮窗；年份筛选控制对应曲线高亮。',
    keyPoints: [
      '2026年采用平滑贝塞尔曲线叠加天蓝色纵向渐变光晕面积（LinearGradient）。',
      '2025年采用蓝色虚线对照，便于直观研判年度变化趋势。',
      '月份坐标轴自适应12个月跨度，提供同比变化率实时计算。',
    ],
  },
  {
    id: 4,
    title: '行业用水结构占比 (左3)',
    source: '重点取水户行业分类数据库，涵盖规上工业、农业灌区、城镇供水、生态环境及特种行业。',
    interaction: '环形图扇区悬浮高亮放大；点击行业卡片筛选对应行业用水明细与占比趋势。',
    keyPoints: [
      '采用SVG Ring仪表盘展示规上工业与农业灌区双核心比重。',
      '提供行业用水量与占比双重指标标注，保证极端小数值依然具备视觉辨识度。',
      '内嵌结构健康度评估微标签，辅助研判产业节水成效。',
    ],
  },
  {
    id: 5,
    title: '西宁全域 GIS 数字孪生底图 (核心)',
    source: '西宁市国土三调矢量底图、湟水河全水系地理矢量、各区县水量使用情况与直报计划差值比对引擎。',
    interaction: '鼠标移入区县矢量多边形即时弹出直报/计划水量卡片；点击区县触发全屏联动；支持图层开关与视角重置。',
    keyPoints: [
      '按水量使用情况4个等级（>100万、>70万、>50万、<50万方）色块动态着色渲染区县图层。',
      '若直报水量超过计划指标，自动叠加红色呼吸警示光晕与警示角标。',
      '矢量湟水河主干道与南北川支流具备水流流动动态渐变。',
    ],
  },
  {
    id: 6,
    title: '核心指标与直报看板 (地图上方)',
    source: '全域水资源综合调度引擎，融合全网实时遥测、取水户直报系统、税务涉税信息及预警研判中枢。',
    interaction: '点击各指标胶囊快速联动聚焦对应业务模块或打开专项管控弹窗。',
    keyPoints: [
      '横向6栏均分高科技微边框卡片，包含总取水量、直报水量、税务偏差、预警事件等核心数据。',
      '数据采用科技大字体呈现，超许可等告警指标内置红色呼吸闪烁指示器。',
    ],
  },
  {
    id: 7,
    title: '综合管控场景切换与图例联动 (中下)',
    source: '场景模式控制器、水资源使用情况分级标准规范及地图图层配置中心。',
    interaction: '点击胶囊在“综合应用场景”与“专项业务应用场景”间平滑切换；点击图例色块反向过滤高亮地图区县。',
    keyPoints: [
      '支持图例展开/收起切换，不遮挡中央数字孪生地图核心水系。',
      '直报超计划高风险区县具备一键比对管控弹窗直达能力。',
    ],
  },
  {
    id: 8,
    title: '常态化预警监测 (右1)',
    source: '取用水常态化预警中枢，对标接近计划(80%-100%)、超计划(≥100%)、超许可(红线)三级预警规则。',
    interaction: '点击预警统计卡片过滤不同严重等级；点击表格事项明细触发该区县与涉事单位的联合诊断。',
    keyPoints: [
      '三级预警徽标采用暖黄、鲜橙、亮红梯度警戒色，视觉层级分明。',
      '实时预警列表以微秒级时间戳排序，提供占指标比值实时换算。',
    ],
  },
  {
    id: 9,
    title: '业务关联研判 (右2)',
    source: '水行政许可执法台账、企业涉税取水量比对核查库与取水工程规范化档案。',
    interaction: '点击证照问题环形图筛选对应违规类型。',
    keyPoints: [
      '展示证照问题数、治理完成率与未治理占比三项关键健康度量化指标。',
      '微型多色环形图直观呈现5大证照违规类型（计量超许可、直报超许可、违规新增等）占比结构。',
    ],
  },
  {
    id: 10,
    title: '计量点接入与到报率监控 (右3)',
    source: '规模以上农业与工业计量遥测终端(RTU)、水资源监控传输协议前置机心跳上报日志。',
    interaction: '切换规模农业/规上工业对比视图；鼠标悬浮趋势折线查看近7日到报率波动；点击异常派单直达运维。',
    keyPoints: [
      '分别监控农业与工业两类关键站点的接入率与到报率指标。',
      '采用双折线平滑渲染近7日接入率趋势，低到报率时段提供红点异常告警标记。',
    ],
  },
]);

async function copyAnnotationList() {
  const text = annotationList.value.map(item => {
    const points = item.keyPoints.map((p, idx) => `  ${idx + 1}、${p}`).join('\n');
    return `【${item.id} ${item.title}】\n- 数据来源: ${item.source}\n- 交互: ${item.interaction}\n- 开发要点:\n${points}`;
  }).join('\n\n');
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    copySuccessToast.value = true;
    setTimeout(() => {
      copySuccessToast.value = false;
    }, 2500);
  } catch {
    copySuccessToast.value = true;
    setTimeout(() => {
      copySuccessToast.value = false;
    }, 2500);
  }
}

function scrollToAnnotation(id: number) {
  showAnnotationPanel.value = true;
  activeAnnotationId.value = id;
  nextTick(() => {
    const el = document.getElementById('anno-card-' + id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}

function scrollToPageElement(id: number) {
  activeAnnotationId.value = id;
  const el = document.getElementById('dev-anno-' + id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function handleAnnotationKeydown(e: KeyboardEvent) {
  if ((e.key === 'a' || e.key === 'A') && !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
    showAnnotationPanel.value = !showAnnotationPanel.value;
  }
}

onMounted(() => {
  const updateClock = () => {
    const d = new Date();
    const h = String(d.getHours()).padStart(2, '0');
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    currentTimeStr.value = `${h}:${m}:${s}`;
  };
  updateClock();
  timer = window.setInterval(updateClock, 1000);
  window.addEventListener('keydown', handleAnnotationKeydown);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
  window.removeEventListener('keydown', handleAnnotationKeydown);
});

// Fullscreen toggle
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
}

// Refresh logic
const isRefreshing = ref(false);
function refreshData() {
  isRefreshing.value = true;
  setTimeout(() => {
    isRefreshing.value = false;
  }, 800);
}

// Scenario Mode: 综合应用场景 vs 专项业务应用场景
const scenarioMode = ref<'comprehensive' | 'special'>('comprehensive');
const currentScenarioTag = ref<'comprehensive' | 'special'>('comprehensive');
const showMapLegend = ref(true);
const mapBaseLayer = ref<'satellite' | 'vector' | 'terrain'>('satellite');

function switchScenarioMode(mode: 'comprehensive' | 'special') {
  scenarioMode.value = mode;
  currentScenarioTag.value = mode;
}

function resetMapView() {
  filterParams.value.district = '西宁市';
  hoveredDistrictName.value = null;
}

// Filter parameters
const filterParams = ref({
  district: '西宁市',
  industry: 'all',
  source: 'all',
  year: '2026',
});

// Layer Toggles (综合场景: 水量使用情况 / 到报率 / 直报超计划红边; 专项场景: 计量点 / 用水户 / 预警事件)
const activeLayers = ref({
  waterUsage: true,   // 综合应用场景：区域水量使用情况图层 (4个等级颜色标记)
  arrivalRate: true,  // 综合应用场景：行政区划内整体到报率图层
  quotaWarning: true, // 综合应用场景：直报超计划红色边缘标记图层 (直报 > 计划 标红)
  meters: true,       // 专项应用场景：计量点
  users: true,        // 专项应用场景：用水户
  warnings: true,     // 专项应用场景：预警事件
});

// ================= 水量使用情况 4个等级定义与区域映射 =================
interface WaterUsageTier {
  id: 'gt100' | 'gt70' | 'gt50' | 'lt50';
  label: string;       // '大于100万方', '大于70万方', '大于50万方', '小于50万方'
  range: string;       // '> 100万m³', '70 ~ 100万m³', '50 ~ 70万m³', '< 50万m³'
  color: string;       // 地图区域填充色 (高质感专业水务深/中/浅蓝绿梯级)
  strokeColor: string; // 边界描边高亮色
  districts: string[]; // 对应区县
  description: string;
}

const waterUsageTiers: WaterUsageTier[] = [
  {
    id: 'gt100',
    label: '大于100万方',
    range: '> 100万m³',
    color: '#2563eb',       // 宝蓝深水色 (大用水负荷)
    strokeColor: '#60a5fa',
    districts: ['湟中区', '大通县'],
    description: '重度用水区域·农业规模灌区与重工业聚集',
  },
  {
    id: 'gt70',
    label: '大于70万方',
    range: '70 ~ 100万m³',
    color: '#00e5ff',       // 亮水青色 (较高用水负荷)
    strokeColor: '#22d3ee',
    districts: ['城北区', '城东区'],
    description: '较高用水区域·经济开发区与工业集聚',
  },
  {
    id: 'gt50',
    label: '大于50万方',
    range: '50 ~ 70万m³',
    color: '#10b981',       // 翠绿水色 (中等用水负荷)
    strokeColor: '#34d399',
    districts: ['城西区', '城中区'],
    description: '中等用水区域·城市综合生活与现代商贸',
  },
  {
    id: 'lt50',
    label: '小于50万方',
    range: '< 50万m³',
    color: '#64748b',       // 蓝灰稳重色 (轻度用水负荷)
    strokeColor: '#94a3b8',
    districts: ['湟源县'],
    description: '轻度用水区域·生态屏障与水源涵养保护',
  },
];

// ================= 区县到报率数据 (证照维度 / 在线计量 / 非在线计量) =================
interface DistrictArrivalRateDetail {
  certDue: number;
  certConnected: number;
  certAccessRate: number;
  onlineAccessRate: number;
  onlineReportRate: number;
  offlineAccessRate: number;
  offlineReportRate: number;
  overallAccessRate: number;
  overallReportRate: number;
}

const districtArrivalRateBase: Record<string, {
  certDue: number;
  certConnected: number;
  onlineMeters: number;
  onlineAccessRate: number;
  onlineReportRate: number;
  offlineMeters: number;
  offlineAccessRate: number;
  offlineReportRate: number;
}> = {
  '湟中区': { certDue: 96, certConnected: 88, onlineMeters: 146, onlineAccessRate: 96.8, onlineReportRate: 94.2, offlineMeters: 42, offlineAccessRate: 88.1, offlineReportRate: 82.6 },
  '大通县': { certDue: 84, certConnected: 76, onlineMeters: 121, onlineAccessRate: 95.2, onlineReportRate: 92.8, offlineMeters: 36, offlineAccessRate: 85.6, offlineReportRate: 80.4 },
  '城北区': { certDue: 72, certConnected: 68, onlineMeters: 98,  onlineAccessRate: 97.6, onlineReportRate: 95.1, offlineMeters: 21, offlineAccessRate: 90.0, offlineReportRate: 86.7 },
  '城东区': { certDue: 64, certConnected: 61, onlineMeters: 89,  onlineAccessRate: 96.4, onlineReportRate: 93.8, offlineMeters: 24, offlineAccessRate: 88.9, offlineReportRate: 84.5 },
  '城西区': { certDue: 58, certConnected: 55, onlineMeters: 76,  onlineAccessRate: 96.1, onlineReportRate: 94.6, offlineMeters: 18, offlineAccessRate: 90.2, offlineReportRate: 86.1 },
  '城中区': { certDue: 55, certConnected: 52, onlineMeters: 71,  onlineAccessRate: 95.9, onlineReportRate: 93.4, offlineMeters: 17, offlineAccessRate: 89.5, offlineReportRate: 85.3 },
  '湟源县': { certDue: 43, certConnected: 39, onlineMeters: 52,  onlineAccessRate: 93.8, onlineReportRate: 90.6, offlineMeters: 15, offlineAccessRate: 86.4, offlineReportRate: 81.8 },
};

/**
 * 获取区县到报率详情，并计算证照接入率与整体到报率
 */
function getDistrictArrivalRate(rawName: string): DistrictArrivalRateDetail {
  const key = normalizeDistrictName(rawName);
  const base = districtArrivalRateBase[key] || districtArrivalRateBase['城中区'];
  const certAccessRate = +(base.certConnected / base.certDue * 100).toFixed(1);
  const totalMeters = base.onlineMeters + base.offlineMeters;
  const overallAccessRate = +((base.onlineMeters * base.onlineAccessRate + base.offlineMeters * base.offlineAccessRate) / totalMeters).toFixed(1);
  const overallReportRate = +((base.onlineMeters * base.onlineReportRate + base.offlineMeters * base.offlineReportRate) / totalMeters).toFixed(1);
  return {
    certDue: base.certDue,
    certConnected: base.certConnected,
    certAccessRate,
    onlineAccessRate: base.onlineAccessRate,
    onlineReportRate: base.onlineReportRate,
    offlineAccessRate: base.offlineAccessRate,
    offlineReportRate: base.offlineReportRate,
    overallAccessRate,
    overallReportRate,
  };
}

/**
 * 到报率悬浮弹窗锚点 (顶部固定在区县中心上方，适配全域地图坐标系)
 */
function getArrivalPopupTransform(rawName: string): string {
  const geo = xiningDistrictsGeo.find(d => d.name === rawName || normalizeDistrictName(d.name) === normalizeDistrictName(rawName));
  const cx = geo ? geo.center[0] : 500;
  const cy = geo ? geo.center[1] : 300;
  return `translate(${cx - 154}, ${cy - 202})`;
}

// ================= 区县计划水量与直报水量管控数据 =================
export interface DistrictWaterQuota {
  name: string;
  planned: number;   // 计划水量 (万m³)
  reported: number;  // 直报水量 (万m³)
  metered: number;   // 计量水量 (万m³)
  taxWater: number;  // 税务水量 (万m³)
  licensed: number;  // 许可水量 (万m³)
  usage: number;     // 综合用水量 (万m³)
  tierId: 'gt100' | 'gt70' | 'gt50' | 'lt50';
}

const defaultDistrictWaterQuotas: Record<string, DistrictWaterQuota> = {
  '湟中区': { name: '湟中区', planned: 125.0, reported: 138.5, metered: 136.2, taxWater: 135.0, licensed: 160.0, usage: 138.5, tierId: 'gt100' },
  '大通县': { name: '大通县', planned: 120.0, reported: 112.4, metered: 110.8, taxWater: 109.5, licensed: 140.0, usage: 112.4, tierId: 'gt100' },
  '城北区': { name: '城北区', planned: 80.0,  reported: 88.6,  metered: 87.2,  taxWater: 86.0,  licensed: 105.0, usage: 88.6,  tierId: 'gt70' },
  '城东区': { name: '城东区', planned: 70.0,  reported: 76.2,  metered: 75.1,  taxWater: 74.2,  licensed: 95.0,  usage: 76.2,  tierId: 'gt70' },
  '城西区': { name: '城西区', planned: 65.0,  reported: 58.4,  metered: 57.0,  taxWater: 56.5,  licensed: 78.0,  usage: 58.4,  tierId: 'gt50' },
  '城中区': { name: '城中区', planned: 56.0,  reported: 52.8,  metered: 51.9,  taxWater: 51.0,  licensed: 68.0,  usage: 52.8,  tierId: 'gt50' },
  '湟源县': { name: '湟源县', planned: 42.0,  reported: 36.2,  metered: 35.4,  taxWater: 34.8,  licensed: 50.0,  usage: 36.2,  tierId: 'lt50' },
};

const districtWaterQuotaMap = ref<Record<string, DistrictWaterQuota>>({
  '湟中区': { ...defaultDistrictWaterQuotas['湟中区'] },
  '大通县': { ...defaultDistrictWaterQuotas['大通县'] },
  '城北区': { ...defaultDistrictWaterQuotas['城北区'] },
  '城东区': { ...defaultDistrictWaterQuotas['城东区'] },
  '城西区': { ...defaultDistrictWaterQuotas['城西区'] },
  '城中区': { ...defaultDistrictWaterQuotas['城中区'] },
  '湟源县': { ...defaultDistrictWaterQuotas['湟源县'] },
});

// 图例点击快速高亮选中的等级 / 超限过滤
const selectedUsageTierFilter = ref<string | null>(null);

// 计划与直报水量管控微调弹窗状态
const showWaterQuotaModal = ref(false);

/**
 * 区县名称标准化（支持处理 GeoJSON 全称如 '大通回族土族自治县' 与简称 '大通县'）
 */
function normalizeDistrictName(name: string): string {
  if (!name) return '';
  if (name.includes('大通')) return '大通县';
  if (name.includes('湟中')) return '湟中区';
  if (name.includes('湟源')) return '湟源县';
  if (name.includes('城北')) return '城北区';
  if (name.includes('城东')) return '城东区';
  if (name.includes('城西')) return '城西区';
  if (name.includes('城中')) return '城中区';
  return name;
}

/**
 * 获取区县计划水量与直报水量详情
 */
function getDistrictQuota(rawName: string): DistrictWaterQuota {
  const key = normalizeDistrictName(rawName);
  return districtWaterQuotaMap.value[key] || {
    name: key,
    planned: 60.0,
    reported: 50.0,
    metered: 48.0,
    taxWater: 47.0,
    licensed: 70.0,
    usage: 50.0,
    tierId: 'gt50',
  };
}

/**
 * 判断区县直报水量是否大于计划水量（超计划）
 */
function isDirectReportExceeded(rawName: string): boolean {
  if (!activeLayers.value.quotaWarning) return false;
  const item = getDistrictQuota(rawName);
  return item.reported > item.planned;
}

/**
 * 所有直报水量大于计划水量的区县列表
 */
const exceededDistrictsList = computed(() => {
  return Object.values(districtWaterQuotaMap.value).filter(d => d.reported > d.planned);
});

/**
 * 依据真实地理中心自适应微调胶囊标签坐标（避免城东/城中/城西/城北近邻重叠）
 */
function getDistrictBadgeTransform(district: { name: string; center: [number, number] }): string {
  let [x, y] = district.center;
  const name = normalizeDistrictName(district.name);
  if (name === '城西区') {
    x -= 28;
    y += 2;
  } else if (name === '城北区') {
    y -= 12;
  } else if (name === '城中区') {
    y += 14;
    x += 8;
  } else if (name === '城东区') {
    x += 14;
  }
  return `translate(${x}, ${y})`;
}

function getDistrictUsage(districtName: string): number {
  return getDistrictQuota(districtName).usage;
}

function getDistrictTier(districtName: string): WaterUsageTier | undefined {
  const quota = getDistrictQuota(districtName);
  return waterUsageTiers.find(t => t.id === quota.tierId);
}

function getDistrictFill(districtName: string): string {
  if (scenarioMode.value === 'comprehensive' && activeLayers.value.waterUsage) {
    const tier = getDistrictTier(districtName);
    return tier ? tier.color : '#0ea5e9';
  }
  return hoveredDistrictName.value === districtName || filterParams.value.district === districtName || filterParams.value.district === normalizeDistrictName(districtName) ? '#00b4d8' : '#0ea5e9';
}

function getDistrictFillOpacity(districtName: string): number {
  const isSelectedOrHovered = hoveredDistrictName.value === districtName || filterParams.value.district === districtName || filterParams.value.district === normalizeDistrictName(districtName);
  if (scenarioMode.value === 'comprehensive' && activeLayers.value.waterUsage) {
    if (isSelectedOrHovered) return 0.85;
    if (selectedUsageTierFilter.value) {
      if (selectedUsageTierFilter.value === 'exceeded') {
        return isDirectReportExceeded(districtName) ? 0.78 : 0.25;
      }
      const tier = getDistrictTier(districtName);
      if (tier && tier.id === selectedUsageTierFilter.value) return 0.76;
      return 0.22; // 非高亮等级透明淡化
    }
    const tier = getDistrictTier(districtName);
    if (!tier) return 0.46;
    if (tier.id === 'gt100') return 0.68;
    if (tier.id === 'gt70') return 0.60;
    if (tier.id === 'gt50') return 0.54;
    return 0.46;
  }
  return isSelectedOrHovered ? 0.42 : 0.20;
}

/**
 * 行政区划边界描边颜色：如果直报水量大于计划水量，则行政区划边缘用低饱和度红色标记
 */
function getDistrictStroke(districtName: string): string {
  const isExceeded = isDirectReportExceeded(districtName);
  const isSelectedOrHovered = hoveredDistrictName.value === districtName || filterParams.value.district === districtName || filterParams.value.district === normalizeDistrictName(districtName);

  // 关键规则：直报水量大于计划水量，行政区划边缘用低饱和度红边标记优先级凸显
  if (isExceeded) {
    if (isSelectedOrHovered) return '#fb7185';
    return '#f87171'; // 低饱和度柔和红边
  }

  if (scenarioMode.value === 'comprehensive' && activeLayers.value.waterUsage) {
    if (isSelectedOrHovered) return '#ffffff';
    if (selectedUsageTierFilter.value) {
      if (selectedUsageTierFilter.value === 'exceeded') {
        return 'rgba(100, 116, 139, 0.4)';
      }
      const tier = getDistrictTier(districtName);
      if (tier && tier.id === selectedUsageTierFilter.value) return '#ffffff';
      return 'rgba(100, 116, 139, 0.4)';
    }
    const tier = getDistrictTier(districtName);
    return tier ? tier.strokeColor : '#67e8f9';
  }
  return isSelectedOrHovered ? '#00e5ff' : '#67e8f9';
}

/**
 * 行政区划边界描边线宽：直报超计划边缘加粗凸显
 */
function getDistrictStrokeWidth(districtName: string): number {
  const isExceeded = isDirectReportExceeded(districtName);
  const isSelectedOrHovered = hoveredDistrictName.value === districtName || filterParams.value.district === districtName || filterParams.value.district === normalizeDistrictName(districtName);
  if (isExceeded) {
    return isSelectedOrHovered ? 3.4 : 2.6;
  }
  return isSelectedOrHovered ? 2.4 : 1.3;
}

/**
 * 计划水量与直报水量快速微调与测试
 */
function adjustDistrictQuota(name: string, field: 'planned' | 'reported', delta: number) {
  const key = normalizeDistrictName(name);
  if (districtWaterQuotaMap.value[key]) {
    const current = districtWaterQuotaMap.value[key][field];
    const updated = Math.max(0, +(current + delta).toFixed(1));
    districtWaterQuotaMap.value[key][field] = updated;
    if (field === 'reported') {
      districtWaterQuotaMap.value[key].usage = updated;
    }
  }
}

/**
 * 一键将区县设为超量或合规（方便交互验证红边效果）
 */
function toggleDistrictExceed(name: string) {
  const key = normalizeDistrictName(name);
  const d = districtWaterQuotaMap.value[key];
  if (!d) return;
  if (d.reported > d.planned) {
    // 设为合规
    d.reported = +(d.planned - 5.0).toFixed(1);
  } else {
    // 设为超计划
    d.reported = +(d.planned + 8.5).toFixed(1);
  }
  d.usage = d.reported;
}

/**
 * 恢复默认基准计划与直报水量
 */
function resetDistrictQuotas() {
  districtWaterQuotaMap.value = {
    '湟中区': { ...defaultDistrictWaterQuotas['湟中区'] },
    '大通县': { ...defaultDistrictWaterQuotas['大通县'] },
    '城北区': { ...defaultDistrictWaterQuotas['城北区'] },
    '城东区': { ...defaultDistrictWaterQuotas['城东区'] },
    '城西区': { ...defaultDistrictWaterQuotas['城西区'] },
    '城中区': { ...defaultDistrictWaterQuotas['城中区'] },
    '湟源县': { ...defaultDistrictWaterQuotas['湟源县'] },
  };
}


// 计量点状态筛选 (全部 / 正常 / 故障 / 待检定)
const meterStatusFilter = ref<'all' | 'normal' | 'fault' | 'pending'>('all');

// 计量点详情弹窗与悬浮提示状态
const showMeterDetailModal = ref(false);
const selectedMeterPoint = ref<MeterPoint | null>(null);
const hoveredMeterPoint = ref<MeterPoint | null>(null);

interface MeterPoint {
  id: string;
  meterCode: string;         // 计量编码 (如: JLD-630104-0028)
  name: string;              // 测站/计量点名称
  deviceType: string;        // 计量器具类型 (如: 超声波时差式流量计 / 电磁管道流量计 / 机械水表 / 智慧多普勒流量计)
  installLocation: string;   // 安装位置
  lastCheckDate: string;     // 上次检定日期
  nextCheckDate: string;     // 下次检定日期
  meterStatus: 'normal' | 'fault' | 'pending'; // 计量状态: 正常 | 故障 | 待检定
  district: string;          // 行政区划
  userEnterprise: string;    // 所属用水户
  waterType: string;         // 水源类型
  instantFlow: number;       // 瞬时流量 m³/h
  dailyAccumulated: number;  // 当日累计水量 m³
  checkAgency: string;       // 检定机构
  certificateNo: string;     // 检定证书编号
  checkCycle: string;        // 检定周期
  faultDesc?: string;        // 故障描述 (若故障)
  pendingReason?: string;    // 待检说明 (若待检定)
  x: number;                 // SVG x 坐标
  y: number;                 // SVG y 坐标
}

interface WaterUserPoint {
  id: string;
  name: string;
  industry: 'industry' | 'agriculture' | 'tapwater' | 'service';
  industryLabel: string;
  quotaVolume: number;
  actualVolume: number;
  district: string;
  x: number;
  y: number;
}

interface WarningEventPoint {
  id: string;
  title: string;
  level: 'red' | 'orange' | 'yellow';
  levelLabel: string;
  district: string;
  enterprise: string;
  desc: string;
  time: string;
  x: number;
  y: number;
}

// 模拟全西宁市 31 个代表性计量点分布 (涵盖 4区3县，区分正常、故障、待检定)
const meterPointsList = ref<MeterPoint[]>([
  // 城北区
  {
    id: 'm-cb-1',
    meterCode: 'JLD-630104-0012',
    name: '金座商贸自备取水主测点',
    deviceType: '电磁管道流量计 (DN150)',
    installLocation: '城北区门源路120号取水计量井',
    lastCheckDate: '2024-04-10',
    nextCheckDate: '2025-04-09',
    meterStatus: 'normal',
    district: '城北区',
    userEnterprise: '西宁金座商贸实业有限公司',
    waterType: '地下水自备井',
    instantFlow: 45.2,
    dailyAccumulated: 580,
    checkAgency: '青海省计量检定测试院',
    certificateNo: 'QH-JL-2024-04108',
    checkCycle: '12个月',
    x: 620,
    y: 410,
  },
  {
    id: 'm-cb-2',
    meterCode: 'JLD-630104-0028',
    name: '海湖铝业取水泵房A出口主管道',
    deviceType: '超声波时差式流量计 (DN200)',
    installLocation: '城北区柴达木路88号取水泵房A出口主管道',
    lastCheckDate: '2023-09-12',
    nextCheckDate: '2024-09-11',
    meterStatus: 'pending',
    district: '城北区',
    userEnterprise: '青海海湖铝业高科有限公司',
    waterType: '湟水河地表取水',
    instantFlow: 82.5,
    dailyAccumulated: 1420,
    checkAgency: '青海省计量检定测试院',
    certificateNo: 'QH-JL-2023-09124',
    checkCycle: '12个月',
    pendingReason: '法定检定周期已满12个月，已进入超期待检核验阶段，请及时联络计量院现场送检',
    x: 605,
    y: 435,
  },
  {
    id: 'm-cb-3',
    meterCode: 'JLD-630104-0035',
    name: '生物科技产业园自备动力车间计量点',
    deviceType: '智能多普勒明渠流量计',
    installLocation: '城北区经二路国家生物园区动力车间泵房',
    lastCheckDate: '2024-05-18',
    nextCheckDate: '2025-05-17',
    meterStatus: 'normal',
    district: '城北区',
    userEnterprise: '青海普兰特生物工程制药股份有限公司',
    waterType: '自备深井水',
    instantFlow: 32.8,
    dailyAccumulated: 410,
    checkAgency: '青海省计量检定测试院',
    certificateNo: 'QH-JL-2024-05182',
    checkCycle: '12个月',
    x: 635,
    y: 395,
  },
  {
    id: 'm-cb-4',
    meterCode: 'JLD-630104-0046',
    name: '朝阳热电厂冷却循环水分流支管测站',
    deviceType: '超声波管道流量计 (DN300)',
    installLocation: '城北区朝阳西路15号热电厂循环泵房B阀室',
    lastCheckDate: '2023-11-20',
    nextCheckDate: '2024-11-19',
    meterStatus: 'fault',
    district: '城北区',
    userEnterprise: '西宁朝阳热电有限责任公司',
    waterType: '工业冷却循环回用水',
    instantFlow: 0,
    dailyAccumulated: 0,
    checkAgency: '西宁市特种设备检验检测所',
    certificateNo: 'XN-TJ-2023-11209',
    checkCycle: '12个月',
    faultDesc: '4G远传通信模组掉线超过48小时，传感器超声换能器探头信号回波失真（信号强度不足15%）',
    x: 645,
    y: 425,
  },
  {
    id: 'm-cb-5',
    meterCode: 'JLD-630104-0051',
    name: '北川河生态补水闸门在线监控测流点',
    deviceType: '光电直读远传水表 (DN250)',
    installLocation: '城北区北川湿地公园北闸口管理处',
    lastCheckDate: '2024-06-02',
    nextCheckDate: '2025-06-01',
    meterStatus: 'normal',
    district: '城北区',
    userEnterprise: '西宁市北川湿地生态管理局',
    waterType: '北川河河道生态水',
    instantFlow: 110.4,
    dailyAccumulated: 2350,
    checkAgency: '青海省水文水资源测报中心',
    certificateNo: 'QH-SW-2024-06021',
    checkCycle: '12个月',
    x: 625,
    y: 450,
  },

  // 城西区
  {
    id: 'm-cx-1',
    meterCode: 'JLD-630103-0005',
    name: '海湖新区供水加压站2号输水主管',
    deviceType: '电磁流量计 (DN300)',
    installLocation: '城西区五四西路海湖加压泵站2号泵出水井',
    lastCheckDate: '2024-02-18',
    nextCheckDate: '2025-02-17',
    meterStatus: 'normal',
    district: '城西区',
    userEnterprise: '西宁供水集团海湖分公司',
    waterType: '城市公共管网原水',
    instantFlow: 145.6,
    dailyAccumulated: 3120,
    checkAgency: '青海省计量检定测试院',
    certificateNo: 'QH-JL-2024-02188',
    checkCycle: '12个月',
    x: 585,
    y: 475,
  },
  {
    id: 'm-cx-2',
    meterCode: 'JLD-630103-0019',
    name: '师大新校区后勤综合给水总表',
    deviceType: '机械双向水表 (DN100)',
    installLocation: '城西区海晏路青海师范大学后勤动力中心',
    lastCheckDate: '2024-01-15',
    nextCheckDate: '2025-01-14',
    meterStatus: 'normal',
    district: '城西区',
    userEnterprise: '青海师范大学后勤管理处',
    waterType: '市政供水',
    instantFlow: 28.4,
    dailyAccumulated: 380,
    checkAgency: '西宁市计量测试所',
    certificateNo: 'XN-JL-2024-01153',
    checkCycle: '12个月',
    x: 598,
    y: 495,
  },
  {
    id: 'm-cx-3',
    meterCode: 'JLD-630103-0027',
    name: '新宁广场绿化取水智能计量栓',
    deviceType: '智能无线远传流量计 (DN80)',
    installLocation: '城西区西川南路新宁广场地下喷灌泵房',
    lastCheckDate: '2023-10-08',
    nextCheckDate: '2024-10-07',
    meterStatus: 'pending',
    district: '城西区',
    userEnterprise: '城西区园林绿化管护中心',
    waterType: '绿化中水/地下水',
    instantFlow: 15.2,
    dailyAccumulated: 190,
    checkAgency: '青海省计量检定测试院',
    certificateNo: 'QH-JL-2023-10086',
    checkCycle: '12个月',
    pendingReason: '检定有效期即将到期（剩余不到15天），建议立即申报本季度法定制式定检',
    x: 615,
    y: 468,
  },
  {
    id: 'm-cx-4',
    meterCode: 'JLD-630103-0033',
    name: '西川绿岛大型换热泵房冷却主管',
    deviceType: '管道式超声波流量计 (DN150)',
    installLocation: '城西区昆仑西路88号动力机房',
    lastCheckDate: '2024-07-22',
    nextCheckDate: '2025-07-21',
    meterStatus: 'normal',
    district: '城西区',
    userEnterprise: '青海绿岛酒店物业管理有限公司',
    waterType: '市政中水管网',
    instantFlow: 19.8,
    dailyAccumulated: 240,
    checkAgency: '青海省计量检定测试院',
    certificateNo: 'QH-JL-2024-07221',
    checkCycle: '12个月',
    x: 575,
    y: 495,
  },

  // 城中区
  {
    id: 'm-cz-1',
    meterCode: 'JLD-630102-0008',
    name: '南川高科光伏材料厂自备取水点',
    deviceType: '电磁流量计 (DN200)',
    installLocation: '城中区南川工业园区同安路16号水处理站',
    lastCheckDate: '2024-03-25',
    nextCheckDate: '2025-03-24',
    meterStatus: 'normal',
    district: '城中区',
    userEnterprise: '青海南川高科半导体材料有限公司',
    waterType: '工业自备水源',
    instantFlow: 92.4,
    dailyAccumulated: 1680,
    checkAgency: '青海省计量检定测试院',
    certificateNo: 'QH-JL-2024-03259',
    checkCycle: '12个月',
    x: 635,
    y: 530,
  },
  {
    id: 'm-cz-2',
    meterCode: 'JLD-630102-0015',
    name: '饮马街集中供水支网加压站测流井',
    deviceType: '机械法兰水表 (DN150)',
    installLocation: '城中区饮马街供水井4号闸室',
    lastCheckDate: '2024-04-12',
    nextCheckDate: '2025-04-11',
    meterStatus: 'normal',
    district: '城中区',
    userEnterprise: '西宁中区供水工程运营处',
    waterType: '城市公共管网水',
    instantFlow: 54.1,
    dailyAccumulated: 890,
    checkAgency: '西宁市计量测试所',
    certificateNo: 'XN-JL-2024-04128',
    checkCycle: '12个月',
    x: 645,
    y: 512,
  },
  {
    id: 'm-cz-3',
    meterCode: 'JLD-630102-0023',
    name: '南山公园景观跌水循环补水测站',
    deviceType: '多普勒明渠超声计',
    installLocation: '城中区南山路南山公园水泵站出水口',
    lastCheckDate: '2023-08-30',
    nextCheckDate: '2024-08-29',
    meterStatus: 'fault',
    district: '城中区',
    userEnterprise: '西宁市南山生态景区管理处',
    waterType: '中水生态回用',
    instantFlow: -3.2,
    dailyAccumulated: 45,
    checkAgency: '青海省计量检定测试院',
    certificateNo: 'QH-JL-2023-08304',
    checkCycle: '12个月',
    faultDesc: '瞬时流速突发反向超差负值（-3.2m³/h），疑似电极受水垢杂质吸附或传感器接地断路',
    x: 622,
    y: 548,
  },
  {
    id: 'm-cz-4',
    meterCode: 'JLD-630102-0031',
    name: '时代大道市政绿化专用消火栓计量栓',
    deviceType: '智能物联网射频水表 (DN100)',
    installLocation: '城中区时代大道中段绿化泵房计量井',
    lastCheckDate: '2024-05-06',
    nextCheckDate: '2025-05-05',
    meterStatus: 'normal',
    district: '城中区',
    userEnterprise: '西宁城中市政公用事业服务中心',
    waterType: '市政雨水收集水',
    instantFlow: 22.0,
    dailyAccumulated: 310,
    checkAgency: '西宁市计量测试所',
    certificateNo: 'XN-JL-2024-05062',
    checkCycle: '12个月',
    x: 652,
    y: 535,
  },

  // 城东区
  {
    id: 'm-cd-1',
    meterCode: 'JLD-630101-0010',
    name: '青海水泥八一路干法生产线总进水主表',
    deviceType: '电磁流量计 (DN250)',
    installLocation: '城东区八一路水泥厂原料车间南侧取水计量井',
    lastCheckDate: '2024-03-01',
    nextCheckDate: '2025-02-28',
    meterStatus: 'normal',
    district: '城东区',
    userEnterprise: '青海水泥股份有限公司',
    waterType: '地下深井水源',
    instantFlow: 76.5,
    dailyAccumulated: 1250,
    checkAgency: '青海省计量检定测试院',
    certificateNo: 'QH-JL-2024-03011',
    checkCycle: '12个月',
    x: 675,
    y: 485,
  },
  {
    id: 'm-cd-2',
    meterCode: 'JLD-630101-0018',
    name: '互助路自备水井2号泵出口流量计',
    deviceType: '超声波流量计 (DN150)',
    installLocation: '城东区互助中路自备水井泵站2号机房',
    lastCheckDate: '2023-09-18',
    nextCheckDate: '2024-09-17',
    meterStatus: 'pending',
    district: '城东区',
    userEnterprise: '西宁东区工业投资开发集团',
    waterType: '自备深井水',
    instantFlow: 38.6,
    dailyAccumulated: 520,
    checkAgency: '青海省计量检定测试院',
    certificateNo: 'QH-JL-2023-09187',
    checkCycle: '12个月',
    pendingReason: '定检周期已超期7天，系统已下发定检催办通知书，请在15日内完成强制检定',
    x: 692,
    y: 472,
  },
  {
    id: 'm-cd-3',
    meterCode: 'JLD-630101-0024',
    name: '湟水河南岸排灌补水泵站自动测站',
    deviceType: '明渠雷达流量计 (DN400)',
    installLocation: '城东区南山路东延段排灌泵站前池',
    lastCheckDate: '2024-06-15',
    nextCheckDate: '2025-06-14',
    meterStatus: 'normal',
    district: '城东区',
    userEnterprise: '西宁市东川防汛排灌管理所',
    waterType: '湟水河干流水',
    instantFlow: 120.8,
    dailyAccumulated: 2600,
    checkAgency: '青海省水文水资源测报中心',
    certificateNo: 'QH-SW-2024-06159',
    checkCycle: '12个月',
    x: 665,
    y: 510,
  },
  {
    id: 'm-cd-4',
    meterCode: 'JLD-630101-0036',
    name: '乐家湾工业园区2号分流口超声测表',
    deviceType: '超声波外贴式流量计 (DN200)',
    installLocation: '城东区乐家湾工业园区2号分流管井',
    lastCheckDate: '2024-05-20',
    nextCheckDate: '2025-05-19',
    meterStatus: 'normal',
    district: '城东区',
    userEnterprise: '青海乐家湾现代物流制造园',
    waterType: '工业供水管网',
    instantFlow: 64.2,
    dailyAccumulated: 980,
    checkAgency: '青海省计量检定测试院',
    certificateNo: 'QH-JL-2024-05206',
    checkCycle: '12个月',
    x: 700,
    y: 505,
  },
  {
    id: 'm-cd-5',
    meterCode: 'JLD-630101-0042',
    name: '东川高新区微电子纯水制备取水点',
    deviceType: '智能微流式电磁计 (DN100)',
    installLocation: '城东区开元路高新技术园区B幢水处理间',
    lastCheckDate: '2024-02-11',
    nextCheckDate: '2025-02-10',
    meterStatus: 'fault',
    district: '城东区',
    userEnterprise: '青海青晶微电子半导体科技有限公司',
    waterType: '园区高品质自来水',
    instantFlow: 0,
    dailyAccumulated: 0,
    checkAgency: '西宁市计量测试所',
    certificateNo: 'XN-JL-2024-02117',
    checkCycle: '12个月',
    faultDesc: 'NB-IoT通信模块天线松动失联，连续未上报最新瞬时计量数据超24小时',
    x: 685,
    y: 525,
  },

  // 湟中区
  {
    id: 'm-hz-1',
    meterCode: 'JLD-630121-0004',
    name: '鲁沙尔灌区引湟总干渠分水口测流断面',
    deviceType: '多普勒明渠流速仪',
    installLocation: '湟中区鲁沙尔镇总干渠3号节制闸门',
    lastCheckDate: '2024-04-18',
    nextCheckDate: '2025-04-17',
    meterStatus: 'normal',
    district: '湟中区',
    userEnterprise: '西宁市湟中区水利水保灌溉服务中心',
    waterType: '湟水河引水干渠',
    instantFlow: 210.5,
    dailyAccumulated: 4500,
    checkAgency: '青海省水文水资源测报中心',
    certificateNo: 'QH-SW-2024-04183',
    checkCycle: '12个月',
    x: 545,
    y: 575,
  },
  {
    id: 'm-hz-2',
    meterCode: 'JLD-630121-0012',
    name: '塔尔寺镇集中生活供水泵房主表',
    deviceType: '机械法兰水表 (DN200)',
    installLocation: '湟中区迎宾路供水加压站泵房',
    lastCheckDate: '2024-01-20',
    nextCheckDate: '2025-01-19',
    meterStatus: 'normal',
    district: '湟中区',
    userEnterprise: '湟中区自来水公司',
    waterType: '深井地下水',
    instantFlow: 55.4,
    dailyAccumulated: 910,
    checkAgency: '西宁市计量测试所',
    certificateNo: 'XN-JL-2024-01201',
    checkCycle: '12个月',
    x: 565,
    y: 590,
  },
  {
    id: 'm-hz-3',
    meterCode: 'JLD-630121-0029',
    name: '多巴新城高原体育基地取水井测表',
    deviceType: '超声波流量计 (DN150)',
    installLocation: '湟中区多巴新城高原训练基地动力房地下井',
    lastCheckDate: '2023-11-05',
    nextCheckDate: '2024-11-04',
    meterStatus: 'pending',
    district: '湟中区',
    userEnterprise: '多巴国家高原体育训练基地',
    waterType: '地下深井水',
    instantFlow: 33.2,
    dailyAccumulated: 480,
    checkAgency: '青海省计量检定测试院',
    certificateNo: 'QH-JL-2023-11058',
    checkCycle: '12个月',
    pendingReason: '定检周期临近到期预警（距复核截止期剩余7天），请及时提交定期检定校准申请单',
    x: 515,
    y: 555,
  },
  {
    id: 'm-hz-4',
    meterCode: 'JLD-630121-0038',
    name: '甘河工业园区水处理回用管线主计量点',
    deviceType: '耐腐蚀电磁流量计 (DN250)',
    installLocation: '湟中区甘河工业园区西区动力总站水泵房',
    lastCheckDate: '2024-03-30',
    nextCheckDate: '2025-03-29',
    meterStatus: 'normal',
    district: '湟中区',
    userEnterprise: '青海甘河工业园区投资开发有限公司',
    waterType: '工业循环中水',
    instantFlow: 165.0,
    dailyAccumulated: 3200,
    checkAgency: '青海省计量检定测试院',
    certificateNo: 'QH-JL-2024-03305',
    checkCycle: '12个月',
    x: 540,
    y: 535,
  },
  {
    id: 'm-hz-5',
    meterCode: 'JLD-630121-0045',
    name: '上新庄农田提灌站1号机组测流表',
    deviceType: '智能多普勒流量计 (DN200)',
    installLocation: '湟中区上新庄镇农水提灌站出水阀井',
    lastCheckDate: '2024-05-12',
    nextCheckDate: '2025-05-11',
    meterStatus: 'normal',
    district: '湟中区',
    userEnterprise: '上新庄农业灌溉农民专业合作社',
    waterType: '农田地表水',
    instantFlow: 88.0,
    dailyAccumulated: 1600,
    checkAgency: '西宁市水务局计量站',
    certificateNo: 'XN-SW-2024-05126',
    checkCycle: '12个月',
    x: 575,
    y: 565,
  },

  // 大通县
  {
    id: 'm-dt-1',
    meterCode: 'JLD-630122-0003',
    name: '黑泉水库引水总渠测流断面自动站',
    deviceType: '激光多普勒三维流速仪',
    installLocation: '大通县宝库乡黑泉水库入渠测水堰',
    lastCheckDate: '2024-05-08',
    nextCheckDate: '2025-05-07',
    meterStatus: 'normal',
    district: '大通县',
    userEnterprise: '青海省引大济湟工程建设管理局',
    waterType: '黑泉水库地表水源',
    instantFlow: 340.0,
    dailyAccumulated: 7200,
    checkAgency: '青海省水文水资源测报中心',
    certificateNo: 'QH-SW-2024-05088',
    checkCycle: '12个月',
    x: 510,
    y: 215,
  },
  {
    id: 'm-dt-2',
    meterCode: 'JLD-630122-0016',
    name: '桥头铝电自备深井泵房主流量计',
    deviceType: '超声波流量计 (DN200)',
    installLocation: '大通县桥头镇解放路深井泵房',
    lastCheckDate: '2024-02-14',
    nextCheckDate: '2025-02-13',
    meterStatus: 'normal',
    district: '大通县',
    userEnterprise: '国家电投集团黄河上游水电桥头铝电',
    waterType: '工业自备深井水',
    instantFlow: 98.6,
    dailyAccumulated: 1950,
    checkAgency: '青海省计量检定测试院',
    certificateNo: 'QH-JL-2024-02142',
    checkCycle: '12个月',
    x: 535,
    y: 250,
  },
  {
    id: 'm-dt-3',
    meterCode: 'JLD-630122-0025',
    name: '大通现代农业生态观光园水肥一体化主表',
    deviceType: '智能远传涡轮流量计 (DN100)',
    installLocation: '大通县景阳镇农业观光园主进水口计量井',
    lastCheckDate: '2023-10-12',
    nextCheckDate: '2024-10-11',
    meterStatus: 'pending',
    district: '大通县',
    userEnterprise: '大通县现代农业科技示范园',
    waterType: '农田浅层地下水',
    instantFlow: 42.1,
    dailyAccumulated: 610,
    checkAgency: '大通县水务计量检测所',
    certificateNo: 'DT-SW-2023-10129',
    checkCycle: '12个月',
    pendingReason: '定检周期已满12个月，待县水务局计量站统一安排校准核验',
    x: 520,
    y: 275,
  },
  {
    id: 'm-dt-4',
    meterCode: 'JLD-630122-0039',
    name: '黄家寨煤电热力循环供水管高精度测点',
    deviceType: '高温型电磁流量计 (DN250)',
    installLocation: '大通县黄家寨镇电厂供水管路3号井',
    lastCheckDate: '2024-04-01',
    nextCheckDate: '2025-03-31',
    meterStatus: 'normal',
    district: '大通县',
    userEnterprise: '青海黄家寨热电有限公司',
    waterType: '热网循环自备水',
    instantFlow: 135.2,
    dailyAccumulated: 2700,
    checkAgency: '青海省计量检定测试院',
    certificateNo: 'QH-JL-2024-04015',
    checkCycle: '12个月',
    x: 550,
    y: 235,
  },

  // 湟源县
  {
    id: 'm-hy-1',
    meterCode: 'JLD-630123-0007',
    name: '城关镇自来水厂源水进水管在线测站',
    deviceType: '超声波流量计 (DN250)',
    installLocation: '湟源县城关镇自来水厂一期进水沉淀池',
    lastCheckDate: '2024-03-16',
    nextCheckDate: '2025-03-15',
    meterStatus: 'normal',
    district: '湟源县',
    userEnterprise: '湟源县润泉自来水有限责任公司',
    waterType: '湟水河上游天然地表水',
    instantFlow: 115.8,
    dailyAccumulated: 2200,
    checkAgency: '青海省计量检定测试院',
    certificateNo: 'QH-JL-2024-03164',
    checkCycle: '12个月',
    x: 405,
    y: 495,
  },
  {
    id: 'm-hy-2',
    meterCode: 'JLD-630123-0014',
    name: '丹噶尔古城文化街区市政给水计量表',
    deviceType: '机械双向水表 (DN100)',
    installLocation: '湟源县明清老街2号计量管井',
    lastCheckDate: '2024-01-10',
    nextCheckDate: '2025-01-09',
    meterStatus: 'normal',
    district: '湟源县',
    userEnterprise: '湟源县丹噶尔文化旅游投资公司',
    waterType: '市政管网水',
    instantFlow: 24.5,
    dailyAccumulated: 340,
    checkAgency: '西宁市计量测试所',
    certificateNo: 'XN-JL-2024-01107',
    checkCycle: '12个月',
    x: 425,
    y: 515,
  },
  {
    id: 'm-hy-3',
    meterCode: 'JLD-630123-0022',
    name: '大华工业园区特种耐火材料车间取水口',
    deviceType: '超声波流量计 (DN150)',
    installLocation: '湟源县大华工业园区B区取水泵站',
    lastCheckDate: '2023-12-05',
    nextCheckDate: '2024-12-04',
    meterStatus: 'fault',
    district: '湟源县',
    userEnterprise: '青海湟源大华耐火新材料有限公司',
    waterType: '工业自备深井水',
    instantFlow: 0,
    dailyAccumulated: 0,
    checkAgency: '青海省计量检定测试院',
    certificateNo: 'QH-JL-2023-12053',
    checkCycle: '12个月',
    faultDesc: '管道空管报警触发，传感器两端接地电位跳变异常，可能存在泵管干烧或换能探头损坏脱落',
    x: 435,
    y: 475,
  },
  {
    id: 'm-hy-4',
    meterCode: 'JLD-630123-0031',
    name: '日月乡高标准农田节水滴灌分水闸测站',
    deviceType: '智能微功耗明渠流量计 (DN150)',
    installLocation: '湟源县日月藏族乡农田干渠2号分水闸',
    lastCheckDate: '2024-05-25',
    nextCheckDate: '2025-05-24',
    meterStatus: 'normal',
    district: '湟源县',
    userEnterprise: '日月乡农牧节水灌溉合作联社',
    waterType: '高标准农田地表水',
    instantFlow: 75.3,
    dailyAccumulated: 1380,
    checkAgency: '青海省水文水资源测报中心',
    certificateNo: 'QH-SW-2024-05258',
    checkCycle: '12个月',
    x: 385,
    y: 525,
  },
]);

// 模拟代表性用水户分布 (规上工业、现代化灌区、自来水厂等)
const waterUsersList = ref<WaterUserPoint[]>([
  { id: 'u-1', name: '青海水泥股份有限公司', industry: 'industry', industryLabel: '规上工业', quotaVolume: 1200, actualVolume: 980, district: '城东区', x: 685, y: 480 },
  { id: 'u-2', name: '青海南川高科半导体', industry: 'industry', industryLabel: '规上工业', quotaVolume: 850, actualVolume: 710, district: '城中区', x: 630, y: 535 },
  { id: 'u-3', name: '青海海湖铝业高科', industry: 'industry', industryLabel: '规上工业', quotaVolume: 1500, actualVolume: 1380, district: '城北区', x: 615, y: 420 },
  { id: 'u-4', name: '桥头铝电自备动力厂', industry: 'industry', industryLabel: '规上工业', quotaVolume: 1800, actualVolume: 1650, district: '大通县', x: 540, y: 245 },
  { id: 'u-5', name: '湟源大华特种耐火新材料', industry: 'industry', industryLabel: '规上工业', quotaVolume: 650, actualVolume: 590, district: '湟源县', x: 440, y: 480 },
  { id: 'u-6', name: '鲁沙尔万亩现代化灌区', industry: 'agriculture', industryLabel: '现代化灌区', quotaVolume: 3200, actualVolume: 2850, district: '湟中区', x: 550, y: 580 },
  { id: 'u-7', name: '大通景阳农田滴灌片区', industry: 'agriculture', industryLabel: '现代化灌区', quotaVolume: 2100, actualVolume: 1820, district: '大通县', x: 515, y: 270 },
  { id: 'u-8', name: '湟源日月农水合作片区', industry: 'agriculture', industryLabel: '现代化灌区', quotaVolume: 1400, actualVolume: 1210, district: '湟源县', x: 380, y: 530 },
  { id: 'u-9', name: '西宁市第一水厂 (海湖加压)', industry: 'tapwater', industryLabel: '自来水厂', quotaVolume: 4500, actualVolume: 4120, district: '城西区', x: 590, y: 470 },
  { id: 'u-10', name: '西宁城关供水有限责任公司', industry: 'tapwater', industryLabel: '自来水厂', quotaVolume: 2800, actualVolume: 2460, district: '城北区', x: 630, y: 445 },
  { id: 'u-11', name: '湟中联合钢铁取水站', industry: 'industry', industryLabel: '规上工业', quotaVolume: 1200, actualVolume: 1320, district: '湟中区', x: 575, y: 545 },
  { id: 'u-12', name: '城北双苏供水加压站', industry: 'tapwater', industryLabel: '自来水厂', quotaVolume: 900, actualVolume: 1020, district: '城北区', x: 660, y: 460 },
]);

// 超计划取水户 (实际取水量大于计划/许可水量)
const overPlanWaterUsers = computed(() => waterUsersList.value.filter(u => u.actualVolume > u.quotaVolume));

// 模拟预警事件分布
const warningEventsList = ref<WarningEventPoint[]>([
  { id: 'w-1', title: '东川园区某微电子企业设备断线', level: 'red', levelLabel: '高风险', district: '城东区', enterprise: '青晶微电子半导体', desc: '通信中断超24小时，数据缺失', time: '10:15:22', x: 685, y: 525 },
  { id: 'w-2', title: '南山公园水泵站流速反向超差', level: 'orange', levelLabel: '中风险', district: '城中区', enterprise: '南山生态景区管理处', desc: '瞬时流速突发负差异常', time: '09:40:11', x: 622, y: 548 },
  { id: 'w-3', title: '湟源大华耐火车间空管干烧告警', level: 'red', levelLabel: '高风险', district: '湟源县', enterprise: '大华耐火新材料', desc: '管道空管告警，传感器接地异常', time: '08:50:03', x: 435, y: 475 },
  { id: 'w-4', title: '海湖铝业取水泵房定检超期', level: 'yellow', levelLabel: '低风险', district: '城北区', enterprise: '青海海湖铝业', desc: '法定检定周期届满，待核验', time: '昨天', x: 605, y: 435 },
  { id: 'w-5', title: '朝阳热电厂冷却水表连续断联', level: 'red', levelLabel: '高风险', district: '城北区', enterprise: '朝阳热电有限责任公司', desc: '4G远传失联，信号极弱', time: '07:20:18', x: 645, y: 425 },
]);

// 计量点数量统计 (全部、正常、故障、待检定)
const meterStats = computed(() => {
  const total = meterPointsList.value.length;
  const normal = meterPointsList.value.filter(m => m.meterStatus === 'normal').length;
  const fault = meterPointsList.value.filter(m => m.meterStatus === 'fault').length;
  const pending = meterPointsList.value.filter(m => m.meterStatus === 'pending').length;
  return { total, normal, fault, pending };
});

// 筛选后的计量点列表
const filteredMeterPoints = computed(() => {
  return meterPointsList.value.filter(m => {
    if (filterParams.value.district !== '西宁市' && m.district !== filterParams.value.district) {
      return false;
    }
    if (meterStatusFilter.value === 'all') return true;
    return m.meterStatus === meterStatusFilter.value;
  });
});

// 打开计量点详情弹窗
function openMeterDetail(meter: MeterPoint) {
  selectedMeterPoint.value = meter;
  showMeterDetailModal.value = true;
}

// 切换计量点图层 (同时保证图例显示)
function toggleMeterLayer() {
  activeLayers.value.meters = !activeLayers.value.meters;
  if (activeLayers.value.meters) {
    showMapLegend.value = true;
  }
}

// 计量点运维工单流转
function dispatchMeterWorkOrder() {
  showMeterDetailModal.value = false;
  navigate('fault');
}

// 计量点预约定检
function bookMeterVerification() {
  if (selectedMeterPoint.value) {
    selectedMeterPoint.value.pendingReason = '已提交定检校准预约申请，等待检验所排期现场检测';
  }
  setTimeout(() => {
    showMeterDetailModal.value = false;
  }, 400);
}

// 1. 行政区域用水量对比 5项指标: 计量水量, 直报水量, 税务水量, 许可水量, 计划水量
interface DistrictWaterItem {
  name: string;
  metered: number;   // 计量水量 (万m³)
  reported: number;  // 直报水量 (万m³)
  taxWater: number;  // 税务水量 (万m³)
  licensed: number;  // 许可水量 (万m³)
  planned: number;   // 计划水量 (万m³)
}

const districtBarData = ref<DistrictWaterItem[]>([
  { name: '城东区', metered: 12450, reported: 16500, taxWater: 12100, licensed: 16200, planned: 15100 },
  { name: '城中区', metered: 8320,  reported: 9200,  taxWater: 8150,  licensed: 11400, planned: 10600 },
  { name: '城西区', metered: 9680,  reported: 10800, taxWater: 9500,  licensed: 12600, planned: 11900 },
  { name: '城北区', metered: 15820, reported: 20500, taxWater: 15400, licensed: 20200, planned: 19100 },
  { name: '湟中区', metered: 24200, reported: 31200, taxWater: 23600, licensed: 31500, planned: 29800 },
  { name: '湟源县', metered: 12600, reported: 13800, taxWater: 12300, licensed: 16800, planned: 15400 },
  { name: '大通县', metered: 18450, reported: 21500, taxWater: 18050, licensed: 24200, planned: 22800 },
]);

const hoveredBarDistrict = ref<DistrictWaterItem | null>(null);

// 5项指标汇总动态计算 (支持当前区划选中联动或全域总和)
const districtTotals = computed(() => {
  const list = filterParams.value.district === '西宁市'
    ? districtBarData.value
    : districtBarData.value.filter(d => d.name === filterParams.value.district);
  const metered = list.reduce((s, i) => s + i.metered, 0);
  const reported = list.reduce((s, i) => s + i.reported, 0);
  const taxWater = list.reduce((s, i) => s + i.taxWater, 0);
  const licensed = list.reduce((s, i) => s + i.licensed, 0);
  const planned = list.reduce((s, i) => s + i.planned, 0);
  return { metered, reported, taxWater, licensed, planned };
});

// 许可水量折线路径 (Green #10b981)
const licensedLinePath = computed(() => {
  return districtBarData.value.map((item, idx) => {
    const x = 54.5 + idx * 46;
    const y = 96 - (item.licensed / 35000) * 78;
    return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');
});

// 计划水量折线路径 (Amber #f59e0b)
const plannedLinePath = computed(() => {
  return districtBarData.value.map((item, idx) => {
    const x = 54.5 + idx * 46;
    const y = 96 - (item.planned / 35000) * 78;
    return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');
});

// ================= 行政区划全局统一搜索 (地图左上角) =================
const isDistrictPanelCollapsed = ref(false);
const globalSearchText = ref('');
const quickDistrictList = ['西宁市', '城东区', '城中区', '城西区', '城北区', '湟中区', '湟源县', '大通县'];

const currentDistrictUsersCount = computed(() => {
  if (filterParams.value.district === '西宁市') return waterUsersList.value.length;
  return waterUsersList.value.filter(u => u.district === filterParams.value.district).length;
});

const matchedDistricts = computed(() => {
  const q = globalSearchText.value.trim();
  if (!q) return [];
  return quickDistrictList.filter(d => d.includes(q));
});

const matchedMeters = computed(() => {
  const q = globalSearchText.value.trim().toLowerCase();
  if (!q) return [];
  return meterPointsList.value.filter(m =>
    m.name.toLowerCase().includes(q) ||
    m.meterCode.toLowerCase().includes(q) ||
    m.district.toLowerCase().includes(q) ||
    m.userEnterprise.toLowerCase().includes(q) ||
    m.deviceType.toLowerCase().includes(q) ||
    m.installLocation.toLowerCase().includes(q)
  );
});

const matchedUsers = computed(() => {
  const q = globalSearchText.value.trim().toLowerCase();
  if (!q) return [];
  return waterUsersList.value.filter(u =>
    u.name.toLowerCase().includes(q) ||
    u.district.toLowerCase().includes(q) ||
    u.industryLabel.toLowerCase().includes(q)
  );
});

const matchedWarnings = computed(() => {
  const q = globalSearchText.value.trim().toLowerCase();
  if (!q) return [];
  return warningEventsList.value.filter(w =>
    w.title.toLowerCase().includes(q) ||
    w.district.toLowerCase().includes(q) ||
    w.enterprise.toLowerCase().includes(q) ||
    w.desc.toLowerCase().includes(q)
  );
});

function selectSearchDistrict(dist: string) {
  filterParams.value.district = dist;
  hoveredDistrictName.value = dist === '西宁市' ? null : dist;
  globalSearchText.value = '';
}

function selectSearchMeter(meter: MeterPoint) {
  filterParams.value.district = meter.district;
  openMeterDetail(meter);
  globalSearchText.value = '';
}

function selectSearchUser(user: WaterUserPoint) {
  filterParams.value.district = user.district;
  globalSearchText.value = '';
}

function selectSearchWarning(warn: WarningEventPoint) {
  filterParams.value.district = warn.district;
  handleEventClick(warn.title);
  globalSearchText.value = '';
}

// 2. 用水时间变化趋势 2项序列: 2026年 (带面积渐变) / 2025年
interface MonthlyTrendItem {
  month: string;
  y2026: number;       // 2026年用水量 (万m³)
  y2025: number;       // 2025年用水量 (万m³)
}

const monthlyTrendData = ref<MonthlyTrendItem[]>([
  { month: '1月', y2026: 4850, y2025: 4520 },
  { month: '2月', y2026: 4320, y2025: 4020 },
  { month: '3月', y2026: 6980, y2025: 6480 },
  { month: '4月', y2026: 9450, y2025: 8760 },
  { month: '5月', y2026: 12850, y2025: 11840 },
  { month: '6月', y2026: 14120, y2025: 13020 },
  { month: '7月', y2026: 14680, y2025: 13560 },
  { month: '8月', y2026: 13950, y2025: 12880 },
  { month: '9月', y2026: 10840, y2025: 10020 },
  { month: '10月', y2026: 8250, y2025: 7620 },
  { month: '11月', y2026: 5920, y2025: 5460 },
  { month: '12月', y2026: 5120, y2025: 4720 },
]);

const hoveredTrendIdx = ref<number | null>(null);

// 平滑曲线路径生成函数
function getSmoothLinePath(pts: { x: number; y: number }[]): string {
  if (pts.length === 0) return '';
  let d = `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = i > 0 ? pts[i - 1] : pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = i < pts.length - 2 ? pts[i + 2] : p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
  }
  return d;
}

// 用水时间变化趋势坐标计算: viewBox="0 0 380 120"
const trendChartData = computed(() => {
  const xStart = 36;
  const xEnd = 368;
  const yBaseline = 94;
  const yTop = 16;
  const maxY = 18000;
  const count = monthlyTrendData.value.length;
  const stepX = (xEnd - xStart) / (count - 1);

  const pts2026 = monthlyTrendData.value.map((d, i) => ({
    x: xStart + i * stepX,
    y: yBaseline - (d.y2026 / maxY) * (yBaseline - yTop),
    val: d.y2026,
    item: d
  }));

  const pts2025 = monthlyTrendData.value.map((d, i) => ({
    x: xStart + i * stepX,
    y: yBaseline - (d.y2025 / maxY) * (yBaseline - yTop),
    val: d.y2025,
    item: d
  }));

  const line2026 = getSmoothLinePath(pts2026);
  const area2026 = `${line2026} L ${pts2026[count - 1].x.toFixed(1)},${yBaseline} L ${pts2026[0].x.toFixed(1)},${yBaseline} Z`;
  const line2025 = getSmoothLinePath(pts2025);

  return {
    pts2026,
    pts2025,
    line2026,
    area2026,
    line2025,
    yBaseline,
  };
});

// 2026 年较 2025 年同比变化率
function trendYoY(item: MonthlyTrendItem): string {
  if (!item.y2025) return '—';
  const rate = ((item.y2026 - item.y2025) / item.y2025) * 100;
  return `${rate >= 0 ? '+' : ''}${rate.toFixed(1)}%`;
}

// Warning Modal state
const showWarningModal = ref(false);
const selectedEvent = ref('');

// Top Map 6 Metrics KPI Strip (根据综合应用场景 vs 专项业务应用场景动态展现)
const topMapMetrics = computed(() => {
  if (scenarioMode.value === 'special') {
    return [
      {
        title: '专项核定取水',
        value: '12.45',
        unit: '亿m³',
        subText: '定额达标 94.2%',
        subClass: 'text-cyan-300',
        iconType: 'none',
        action: () => {}
      },
      {
        title: '刚性红线管控',
        value: '98.6',
        unit: '%',
        subText: '超许可红线 0起',
        subClass: 'text-cyan-300',
        iconType: 'none',
        action: () => {}
      },
      {
        title: '专项督办工单',
        value: '11',
        unit: '件',
        subText: '核办中 2件',
        subClass: 'text-amber-400',
        iconType: 'warning',
        action: () => {
          selectedEvent.value = '专项业务督办工单处理';
          showWarningModal.value = true;
        }
      },
      {
        title: '重点监控在线率',
        value: '99.2',
        unit: '%',
        subText: '全天候智能遥测',
        subClass: 'text-cyan-300',
        iconType: 'none',
        action: () => {
          navigate('facility_management');
        }
      },
      {
        title: '灌区水效比值',
        value: '0.612',
        unit: 'm³/亩',
        subText: '节水成效领先',
        subClass: 'text-cyan-300',
        iconType: 'none',
        action: () => {
          navigate('irrigation_accounting');
        }
      },
      {
        title: '非常规水利用率',
        value: '18.5',
        unit: '%',
        subText: '中水回用利用率',
        subClass: 'text-cyan-300',
        iconType: 'none',
        action: () => {
          navigate('enterprise_dossier');
        }
      }
    ];
  }

  // 综合应用场景
  return [
    {
      title: '区域用水总量',
      value: '18.62',
      unit: '亿m³',
      subText: '同比 +2.3%',
      subClass: 'text-cyan-300',
      iconType: 'none',
      action: () => {}
    },
    {
      title: '许可执行率',
      value: '92.4',
      unit: '%',
      subText: '3区超80%',
      subClass: 'text-slate-300',
      iconType: 'none',
      action: () => {}
    },
    {
      title: '今日预警数量',
      value: '27',
      unit: '条',
      subText: '高风险 5条',
      subClass: 'text-rose-400',
      iconType: 'red-dot',
      action: () => {
        selectedEvent.value = '今日高危预警综合态势研判';
        showWarningModal.value = true;
      }
    },
    {
      title: '计量点到报率',
      value: '94.6',
      unit: '%',
      subText: '较昨日 +0.8%',
      subClass: 'text-cyan-300',
      iconType: 'none',
      action: () => {
        navigate('facility_management');
      }
    },
    {
      title: '证照治理完成率',
      value: '86.2',
      unit: '%',
      subText: '未治理42件',
      subClass: 'text-amber-400',
      iconType: 'warning',
      action: () => {
        navigate('enterprise_dossier');
      }
    },
    {
      title: '数据质量评分',
      value: '91.5',
      unit: '分',
      subText: '异常率 1.2%',
      subClass: 'text-slate-300',
      iconType: 'none',
      action: () => {
        navigate('water_data_revision');
      }
    }
  ];
});

function handleEventClick(eventName: string) {
  selectedEvent.value = eventName;
  showWarningModal.value = true;
}

function dispatchWarningWorkOrder() {
  showWarningModal.value = false;
  navigate('fault');
}

// =========================================================================
// 专项业务应用场景 4 大专业模块数据结构与交互
// =========================================================================

// 1. 计量设施总体情况 (站点总数、正常站点、停用站点、故障异常、待检定)
const meterDeviceOverview = ref({
  total: 318,       // 站点总数
  online: 284,      // 正常站点
  offline: 14,      // 停用站点
  fault: 8,         // 故障异常
  pending: 12,      // 待检定
  onlineRate: '89.3%', // 正常率
});

// 区域计量设施在线分析 (按 国控水资源(监控)、自计量、中央发展基金、省级发展基金 4大类统计)
export interface FacilitySourceCategoryStat {
  id: string;
  name: string;             // 类别全称
  shortName: string;        // 简称
  total: number;            // 站点总数
  normal: number;           // 正常站点
  disabled: number;         // 停用站点
  fault: number;            // 故障站点
  pending: number;          // 待检站点
  rate: number;             // 正常率 %
  percentage: number;       // 占全域总站点比例 %
  color: string;            // 主色
  strokeColor: string;      // 边框色
  dashOffset: number;       // 环形图 offset
  dashLength: number;       // 环形图 length
}

const facilitySourceStats = ref<FacilitySourceCategoryStat[]>([
  {
    id: 'national',
    name: '国控水资源(监控)',
    shortName: '国控监控',
    total: 126,
    normal: 116,
    disabled: 4,
    fault: 2,
    pending: 4,
    rate: 92.1,
    percentage: 39.6,
    color: '#3FD0FF',
    strokeColor: '#00E5FF',
    dashLength: 89.6,
    dashOffset: 0,
  },
  {
    id: 'self',
    name: '企业自建自计量',
    shortName: '自建/自计量',
    total: 98,
    normal: 86,
    disabled: 6,
    fault: 3,
    pending: 3,
    rate: 87.8,
    percentage: 30.8,
    color: '#1E7BE8',
    strokeColor: '#3b82f6',
    dashLength: 69.7,
    dashOffset: -89.6,
  },
  {
    id: 'central_fund',
    name: '中央发展资金',
    shortName: '中央资金',
    total: 54,
    normal: 48,
    disabled: 2,
    fault: 2,
    pending: 2,
    rate: 88.9,
    percentage: 17.0,
    color: '#FFC65C',
    strokeColor: '#f59e0b',
    dashLength: 38.4,
    dashOffset: -159.3,
  },
  {
    id: 'provincial_fund',
    name: '省级发展资金',
    shortName: '省级资金',
    total: 40,
    normal: 34,
    disabled: 2,
    fault: 1,
    pending: 3,
    rate: 85.0,
    percentage: 12.6,
    color: '#3DDC97',
    strokeColor: '#10b981',
    dashLength: 28.5,
    dashOffset: -197.7,
  },
]);

// 统计图显示模式: 'bar' (柱状对比图) | 'donut' (占比环形图)
const facilityChartMode = ref<'bar' | 'donut'>('bar');
const hoveredFacilityCategory = ref<string | null>(null);

interface DistrictDeviceStat {
  district: string;
  total: number;
  online: number;
  offline: number;
  fault: number;
  pending: number;
  rate: number; // 在线率 %
}

const districtDeviceStats = ref<DistrictDeviceStat[]>([
  { district: '城北区', total: 68, online: 62, offline: 2, fault: 1, pending: 3, rate: 91.2 },
  { district: '城西区', total: 52, online: 48, offline: 2, fault: 0, pending: 2, rate: 92.3 },
  { district: '城中区', total: 46, online: 42, offline: 2, fault: 1, pending: 1, rate: 91.3 },
  { district: '城东区', total: 58, online: 51, offline: 3, fault: 2, pending: 2, rate: 87.9 },
  { district: '湟中区', total: 48, online: 42, offline: 3, fault: 1, pending: 2, rate: 87.5 },
  { district: '大通县', total: 42, online: 37, offline: 2, fault: 1, pending: 2, rate: 88.1 },
  { district: '湟源县', total: 34, online: 29, offline: 2, fault: 1, pending: 2, rate: 85.3 },
]);

// 2. 重点取水户概况
const majorUserStats = ref({
  totalCount: 86,             // 重点取水户数量 (家)
  annualLicensedQuota: 42850, // 年许可水量总量 (万m³)
  todayAccumulatedWater: 14.62, // 今日累计取水量 (万m³)
  todayAlertCount: 6,         // 今日告警次数 (次)
});

interface MajorUserRankingItem {
  id: string;
  name: string;
  industry: string;
  todayWater: number;         // 今日取水 m³
  annualAccumulated: number;  // 年累取水 万m³
  annualLicensed: number;     // 年许可量 万m³
  progressRate: number;       // 许可进度比 %
  status: 'normal' | 'warn' | 'danger';
}

const majorUserRankings = ref<MajorUserRankingItem[]>([
  { id: 'mur-1', name: '青海水泥股份有限公司', industry: '非金属矿物制品', todayWater: 1250, annualAccumulated: 3820, annualLicensed: 4200, progressRate: 90.9, status: 'warn' },
  { id: 'mur-2', name: '桥头铝电自备动力厂', industry: '有色金属冶炼', todayWater: 1950, annualAccumulated: 3510, annualLicensed: 4100, progressRate: 85.6, status: 'warn' },
  { id: 'mur-3', name: '青海南川高科半导体', industry: '微电子材料制造', todayWater: 1680, annualAccumulated: 2980, annualLicensed: 3800, progressRate: 78.4, status: 'normal' },
  { id: 'mur-4', name: '青海海湖铝业高科', industry: '铝合金高新材料', todayWater: 1420, annualAccumulated: 2850, annualLicensed: 3500, progressRate: 81.4, status: 'warn' },
  { id: 'mur-5', name: '黄家寨煤电热力公司', industry: '电力热力生产', todayWater: 2700, annualAccumulated: 2640, annualLicensed: 3400, progressRate: 77.6, status: 'normal' },
]);

// 3. 异常情况处置与运维能效评估
const anomalyTypeStats = ref([
  { type: '负值异常', count: 8, percentage: 18.2, color: '#f43f5e', desc: '瞬时流速反向回流负值' },
  { type: '超阈值突增', count: 16, percentage: 36.4, color: '#f59e0b', desc: '瞬时流速超历史峰值150%' },
  { type: '奇异值/恒值', count: 12, percentage: 27.3, color: '#00e5ff', desc: '超12小时数据完全无波动' },
  { type: '通信掉线', count: 8, percentage: 18.2, color: '#64748b', desc: '连续超24小时未上传' },
]);

// 各市州 / 区县异常告警工单处置情况统计
export interface CityWorkOrderStat {
  district: string;       // 行政区划
  pending: number;        // 待处置
  processing: number;     // 处置中
  revisionNeeded: number; // 待水量修订
  completed: number;      // 已完成修订
  total: number;          // 告警工单总数
}

// 青海省 8 个市州告警工单情况统计
const provinceCityWorkOrderStats = ref<CityWorkOrderStat[]>([
  { district: '西宁市', pending: 6, processing: 8, revisionNeeded: 4, completed: 58, total: 76 },
  { district: '海东市', pending: 4, processing: 5, revisionNeeded: 3, completed: 42, total: 54 },
  { district: '海西州', pending: 5, processing: 6, revisionNeeded: 5, completed: 39, total: 55 },
  { district: '海南州', pending: 2, processing: 3, revisionNeeded: 2, completed: 28, total: 35 },
  { district: '海北州', pending: 2, processing: 3, revisionNeeded: 1, completed: 24, total: 30 },
  { district: '黄南州', pending: 1, processing: 2, revisionNeeded: 1, completed: 18, total: 22 },
  { district: '玉树州', pending: 1, processing: 1, revisionNeeded: 1, completed: 14, total: 17 },
  { district: '果洛州', pending: 1, processing: 1, revisionNeeded: 0, completed: 12, total: 14 },
]);

// 西宁市 7 个区县告警工单情况统计
const xiningDistrictWorkOrderStats = ref<CityWorkOrderStat[]>([
  { district: '城东区', pending: 1, processing: 2, revisionNeeded: 1, completed: 12, total: 16 },
  { district: '城中区', pending: 1, processing: 1, revisionNeeded: 1, completed: 8,  total: 11 },
  { district: '城西区', pending: 0, processing: 1, revisionNeeded: 0, completed: 9,  total: 10 },
  { district: '城北区', pending: 2, processing: 2, revisionNeeded: 1, completed: 14, total: 19 },
  { district: '湟中区', pending: 1, processing: 1, revisionNeeded: 1, completed: 7,  total: 10 },
  { district: '大通县', pending: 1, processing: 1, revisionNeeded: 0, completed: 5,  total: 7 },
  { district: '湟源县', pending: 0, processing: 0, revisionNeeded: 0, completed: 3,  total: 3 },
]);

// 异常工单处置统计 (西宁市 7 个区县，与地图选中区县实时联动)
const currentWorkOrderStats = computed(() => {
  return xiningDistrictWorkOrderStats.value;
});

// 当地图中选中特定区县时，实时联动过滤该区县数据
const activeDistrictWorkOrderStat = computed(() => {
  if (filterParams.value.district === '西宁市') return null;
  const target = normalizeDistrictName(filterParams.value.district);
  return xiningDistrictWorkOrderStats.value.find(d => d.district === target) || null;
});

const currentWorkOrderTotals = computed(() => {
  if (activeDistrictWorkOrderStat.value) {
    return {
      pending: activeDistrictWorkOrderStat.value.pending,
      processing: activeDistrictWorkOrderStat.value.processing,
      revisionNeeded: activeDistrictWorkOrderStat.value.revisionNeeded,
      completed: activeDistrictWorkOrderStat.value.completed,
      total: activeDistrictWorkOrderStat.value.total,
    };
  }
  const list = xiningDistrictWorkOrderStats.value;
  return {
    pending: list.reduce((s, i) => s + i.pending, 0),
    processing: list.reduce((s, i) => s + i.processing, 0),
    revisionNeeded: list.reduce((s, i) => s + i.revisionNeeded, 0),
    completed: list.reduce((s, i) => s + i.completed, 0),
    total: list.reduce((s, i) => s + i.total, 0),
  };
});

const anomalyWorkOrderStatus = computed(() => {
  return {
    pending: currentWorkOrderTotals.value.pending,
    processing: currentWorkOrderTotals.value.processing,
    revisionNeeded: currentWorkOrderTotals.value.revisionNeeded,
    completed: currentWorkOrderTotals.value.completed,
    total: currentWorkOrderTotals.value.total,
  };
});

const operationEfficiencyMetrics = ref({
  avgResolutionTime: '1.8', // 平均处置时长 (小时)
  successRate: '98.4',      // 处置成功率 %
  repeatAnomalyRate: '2.1', // 重复异常率 %
  closedLoopRate: '99.2',   // 闭环率 %
});

interface MaintenanceTeamRank {
  rank: number;
  name: string;
  totalOrders: number;
  resolvedOrders: number;
  avgHours: number;
  score: number;
}

const maintenanceTeamRanks = ref<MaintenanceTeamRank[]>([
  { rank: 1, name: '西宁水务第一运维保障组', totalOrders: 28, resolvedOrders: 28, avgHours: 1.2, score: 98.6 },
  { rank: 2, name: '城北区水政智控巡维队', totalOrders: 22, resolvedOrders: 21, avgHours: 1.6, score: 95.4 },
  { rank: 3, name: '湟中区农水智联运维所', totalOrders: 18, resolvedOrders: 17, avgHours: 2.1, score: 93.8 },
  { rank: 4, name: '青海汇智测控运维服务部', totalOrders: 15, resolvedOrders: 14, avgHours: 2.4, score: 91.2 },
  { rank: 5, name: '海东水务管护维保二队', totalOrders: 14, resolvedOrders: 13, avgHours: 2.6, score: 89.8 },
]);

// 4. 标准化对比分析引擎与复核跟踪
const compareTimeWindow = ref<'month' | '30d' | 'quarter' | 'year'>('month');
const isComparing = ref(false);

interface StandardCompareItem {
  id: string;
  name: string;              // 分析对象 / 行业区划
  category: string;          // 类别
  currentWater: number;      // 当前取水量 (万m³)
  threeYearAvg: number;      // 近3年同期均值 (万m³)
  avgDeviation: number;      // 与近3年均值偏差率 (%)
  monthlyPlan: number;       // 当月计划 (万m³)
  planDeviation: number;     // 与当月计划偏差率 (%)
  licensedRemaining: number; // 许可剩余水量 (万m³)
  isAbnormal: boolean;       // 是否偏差超 ±20%
  alertTag?: string;         // 异常标签
  suggest: string;           // 处置建议
}

const standardCompareList = ref<StandardCompareItem[]>([
  {
    id: 'cmp-1',
    name: '城北区铝加工工业集中取水点',
    category: '重点工业',
    currentWater: 1850,
    threeYearAvg: 1480,
    avgDeviation: 25.0,    // +25% > +20% -> 异常
    monthlyPlan: 1520,
    planDeviation: 21.7,   // +21.7% > +20% -> 异常
    licensedRemaining: 840,
    isAbnormal: true,
    alertTag: '突增异常 (+25.0%)',
    suggest: '当前取水远超同期与计划，疑似产能扩增或管网漏损，建议立即下发实地核查',
  },
  {
    id: 'cmp-2',
    name: '鲁沙尔万亩现代化灌区总干渠',
    category: '现代化灌区',
    currentWater: 3200,
    threeYearAvg: 3120,
    avgDeviation: 2.6,
    monthlyPlan: 3300,
    planDeviation: -3.0,
    licensedRemaining: 2450,
    isAbnormal: false,
    suggest: '引湟配水与历史同期吻合度高，节水滴灌成效平稳',
  },
  {
    id: 'cmp-3',
    name: '城东区八一路建材加工区自备井',
    category: '重点工业',
    currentWater: 890,
    threeYearAvg: 1320,
    avgDeviation: -32.6,   // -32.6% < -20% -> 骤减异常
    monthlyPlan: 1200,
    planDeviation: -25.8,
    licensedRemaining: 1680,
    isAbnormal: true,
    alertTag: '骤减异常 (-32.6%)',
    suggest: '取水量急剧下挫超30%，疑似表计断电卡阻或企业停产未报备',
  },
  {
    id: 'cmp-4',
    name: '湟源县城关集中供水加压管网',
    category: '公共供水',
    currentWater: 1420,
    threeYearAvg: 1390,
    avgDeviation: 2.2,
    monthlyPlan: 1450,
    planDeviation: -2.1,
    licensedRemaining: 1820,
    isAbnormal: false,
    suggest: '市政供水水压平稳，漏损率控制在6.8%以内良好区间',
  },
  {
    id: 'cmp-5',
    name: '大通桥头煤电热力循环供水管',
    category: '重点工业',
    currentWater: 2450,
    threeYearAvg: 1980,
    avgDeviation: 23.7,    // +23.7% > +20% -> 异常
    monthlyPlan: 2050,
    planDeviation: 19.5,
    licensedRemaining: 1120,
    isAbnormal: true,
    alertTag: '超计划预警 (+23.7%)',
    suggest: '取水增速较快且超同期23.7%，建议调度专员核验冷却回用水比重',
  },
]);

// 复核任务流转列表
interface ReviewTaskItem {
  id: string;
  taskCode: string;          // 任务编码
  targetName: string;        // 复核对象
  deviationInfo: string;     // 偏差特征
  inspector: string;         // 负责核查专员
  deadline: string;          // 截止时限
  status: 'pending' | 'in_progress' | 'revised' | 'closed';
  statusLabel: string;
  result?: string;
}

const reviewTaskList = ref<ReviewTaskItem[]>([
  {
    id: 'rt-1',
    taskCode: 'REV-20250520-001',
    targetName: '城北区铝加工工业集中取水点',
    deviationInfo: '较近3年同期均值偏高 +25.0%，超月度计划 +21.7%',
    inspector: '李健 (水政监察二组)',
    deadline: '24小时内',
    status: 'in_progress',
    statusLabel: '核查进行中',
    result: '专员正在调阅该企业近两周生产用电与回水表读数',
  },
  {
    id: 'rt-2',
    taskCode: 'REV-20250520-002',
    targetName: '城东区八一路建材加工区自备井',
    deviationInfo: '较同期均值突降 -32.6%，疑似超声计量探头信号失真',
    inspector: '张强 (计量检定专员)',
    deadline: '12小时内',
    status: 'pending',
    statusLabel: '待现场核验',
    result: '已联系企业动力车间负责人，预约下午2点现场比对便携式超声流量计',
  },
  {
    id: 'rt-3',
    taskCode: 'REV-20250519-008',
    targetName: '大通桥头煤电热力循环供水管',
    deviationInfo: '5月上旬取水量超月度定额计划 23.7%',
    inspector: '王晓敏 (计划用水室)',
    deadline: '已归档',
    status: 'closed',
    statusLabel: '已完成复核修正',
    result: '核实系电厂1号发电机组提前结束大修并网试水，指标已完成水量修订备案',
  },
]);

const showReviewTaskModal = ref(false);
const reviewTaskNotice = ref<string | null>(null);
const reviewTaskStatusFilter = ref<'all' | 'pending' | 'in_progress' | 'closed'>('all');

const filteredReviewTasks = computed(() => {
  if (reviewTaskStatusFilter.value === 'all') return reviewTaskList.value;
  return reviewTaskList.value.filter(t => t.status === reviewTaskStatusFilter.value);
});

// 触发对比分析引擎重算 (支持自定义时间窗口联动重新计算水量与偏差率)
function triggerCompareAnalysis() {
  isComparing.value = true;
  setTimeout(() => {
    isComparing.value = false;
    let factor = 1.0;
    if (compareTimeWindow.value === '30d') factor = 0.95;
    else if (compareTimeWindow.value === 'quarter') factor = 2.82;
    else if (compareTimeWindow.value === 'year') factor = 11.2;

    const baseData = [
      {
        id: 'cmp-1',
        name: '城北区铝加工工业集中取水点',
        category: '重点工业',
        baseCurrent: 1850,
        baseAvg: 1480,
        basePlan: 1520,
        baseRemain: 840,
        suggest: '当前取水远超同期与计划，疑似产能扩增或管网漏损，建议立即下发实地核查',
      },
      {
        id: 'cmp-2',
        name: '鲁沙尔万亩现代化灌区总干渠',
        category: '现代化灌区',
        baseCurrent: 3200,
        baseAvg: 3120,
        basePlan: 3300,
        baseRemain: 2450,
        suggest: '引湟配水与历史同期吻合度高，节水滴灌成效平稳',
      },
      {
        id: 'cmp-3',
        name: '城东区八一路建材加工区自备井',
        category: '重点工业',
        baseCurrent: 890,
        baseAvg: 1320,
        basePlan: 1200,
        baseRemain: 1680,
        suggest: '取水量急剧下挫超30%，疑似表计断电卡阻或企业停产未报备',
      },
      {
        id: 'cmp-4',
        name: '湟源县城关集中供水加压管网',
        category: '公共供水',
        baseCurrent: 1420,
        baseAvg: 1390,
        basePlan: 1450,
        baseRemain: 1820,
        suggest: '市政供水水压平稳，漏损率控制在6.8%以内良好区间',
      },
      {
        id: 'cmp-5',
        name: '大通桥头煤电热力循环供水管',
        category: '重点工业',
        baseCurrent: 2450,
        baseAvg: 1980,
        basePlan: 2050,
        baseRemain: 1120,
        suggest: '取水增速较快且超同期23.7%，建议调度专员核验冷却回用水比重',
      },
    ];

    standardCompareList.value = baseData.map(b => {
      const cur = Math.round(b.baseCurrent * factor);
      const avg = Math.round(b.baseAvg * factor);
      const plan = Math.round(b.basePlan * factor);
      const rem = Math.round(b.baseRemain * (compareTimeWindow.value === 'year' ? 0.75 : factor));
      const avgDev = Number((((cur - avg) / avg) * 100).toFixed(1));
      const planDev = Number((((cur - plan) / plan) * 100).toFixed(1));
      const isAb = Math.abs(avgDev) >= 20 || Math.abs(planDev) >= 20;
      return {
        id: b.id,
        name: b.name,
        category: b.category,
        currentWater: cur,
        threeYearAvg: avg,
        avgDeviation: avgDev,
        monthlyPlan: plan,
        planDeviation: planDev,
        licensedRemaining: rem,
        isAbnormal: isAb,
        alertTag: isAb ? (avgDev > 0 ? `突增异常 (+${avgDev}%)` : `骤减异常 (${avgDev}%)`) : undefined,
        suggest: b.suggest,
      };
    });
  }, 400);
}

// 下发复核任务
function dispatchReviewTask(item: StandardCompareItem) {
  const newCode = `REV-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(reviewTaskList.value.length + 1).padStart(3, '0')}`;
  reviewTaskList.value.unshift({
    id: 'rt-' + Date.now(),
    taskCode: newCode,
    targetName: item.name,
    deviationInfo: `偏差 ${item.avgDeviation > 0 ? '+' : ''}${item.avgDeviation}% (较近3年同期均值)`,
    inspector: '系统派单 (西宁水政执法大队)',
    deadline: '24小时内',
    status: 'pending',
    statusLabel: '待现场核验',
    result: '复核任务已进入待办队列，专员已收到短信调度指令',
  });

  reviewTaskNotice.value = `已成功下发复核任务【${newCode}】至负责片区执法专员！`;
  setTimeout(() => {
    reviewTaskNotice.value = null;
  }, 4000);
}
</script>

<style scoped>
.map-layer-tile {
  isolation: isolate;
  background: transparent;
  box-shadow: none;
}

.map-layer-tile:hover {
  background: transparent;
}

.map-layer-tile.is-active {
  background: transparent;
  box-shadow: none;
}

.map-layer-hex-shell {
  width: 37px;
  height: 41px;
  padding: 1.5px;
  display: grid;
  place-items: center;
  clip-path: polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%);
  background: linear-gradient(180deg, #74d8ff 0%, #1688e7 42%, #0a4c9c 100%);
  filter: drop-shadow(0 3px 7px rgba(0, 106, 215, 0.42));
  transition: transform 0.2s ease, filter 0.2s ease, opacity 0.2s ease;
}

.map-layer-hex {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  clip-path: polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%);
  background: linear-gradient(180deg, #0d5ca7 0%, #0a4c91 48%, #07366f 100%);
  box-shadow: inset 0 1px 6px rgba(132, 222, 255, 0.18);
}

.map-layer-tile:not(.is-active) .map-layer-hex-shell {
  opacity: 0.78;
}

.map-layer-tile:hover .map-layer-hex-shell,
.map-layer-tile.is-active .map-layer-hex-shell {
  opacity: 1;
  transform: translateY(-1px);
  filter: drop-shadow(0 0 10px rgba(44, 190, 255, 0.58));
}

.map-layer-tile.is-active .map-layer-hex-shell {
  background: linear-gradient(180deg, #b4f2ff 0%, #26a9ff 40%, #0b62bd 100%);
}

.custom-dark-scrollbar::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
.custom-dark-scrollbar::-webkit-scrollbar-thumb {
  background: #1b4372;
  border-radius: 4px;
}
.custom-dark-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

/* Slide right transition for annotation panel */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
}
.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
