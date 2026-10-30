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

              <!-- 三类超计划：蓝色透明悬浮标签 -->
              <linearGradient id="overPlanTagGlass" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.24" />
                <stop offset="52%" stop-color="#0284C7" stop-opacity="0.12" />
                <stop offset="100%" stop-color="#0EA5E9" stop-opacity="0.03" />
              </linearGradient>
              <linearGradient id="overPlanTagLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#38BDF8" stop-opacity="0" />
                <stop offset="22%" stop-color="#9BEAFF" stop-opacity="0.78" />
                <stop offset="78%" stop-color="#9BEAFF" stop-opacity="0.78" />
                <stop offset="100%" stop-color="#38BDF8" stop-opacity="0" />
              </linearGradient>
              <filter id="overPlanTagGlow" x="-30%" y="-100%" width="160%" height="300%">
                <feGaussianBlur stdDeviation="2.2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
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

            <!-- 2. Real GIS Sub-district Internal Boundaries (按当前研判图例着色标记) -->
            <g>
              <path
                v-for="district in xiningDistrictsGeo"
                :key="district.adcode"
                :d="district.path"
                :fill="getDistrictFill(district.name)"
                :fill-opacity="getDistrictFillOpacity(district.name)"
                :stroke="getDistrictStroke(district.name)"
                :stroke-width="getDistrictStrokeWidth(district.name)"
                stroke-linejoin="round"
                class="transition-all duration-200 cursor-pointer"
                :class="{ 'approval-warning-district': isApprovalWarningDistrict(district.name) }"
                @mouseenter="hoveredDistrictName = district.name"
                @mouseleave="hoveredDistrictName = null"
                @click="filterParams.district = normalizeDistrictName(district.name)"
              >
                <title>{{ getDistrictMapTitle(district.name) }}</title>
              </path>
            </g>

            <!-- 3. Central Prominent Label: 西宁市 -->
            <text x="638" y="488" fill="#ffffff" font-size="20" font-weight="900" text-anchor="middle" filter="drop-shadow(0 2px 6px rgba(0,0,0,0.9))" pointer-events="none">
              西宁市
            </text>

            <!-- 4. District Name & Current Monitoring Layer Summary -->
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
                  v-if="scenarioMode === 'comprehensive' && isMapLegendTypeActive('approval')"
                  x="0"
                  y="11"
                  :fill="getApprovalControlLevel(district.name).strokeColor"
                  font-size="9.5"
                  font-weight="bold"
                  text-anchor="middle"
                  font-family="monospace"
                  filter="drop-shadow(0 1px 3px rgba(0,0,0,0.95))"
                  pointer-events="none"
                >
                  {{ getApprovalControlRate(district.name).toFixed(1) }}%
                </text>
              </g>
            </g>

            <!-- 4.1 综合场景：四类证照预警点位 (一证一标，区划仅用于定位) -->
            <g v-if="scenarioMode === 'comprehensive'">
              <template
                v-for="marker in licenseWarningMarkers"
                :key="marker.id"
              >
                <g
                  v-if="isMapLegendTypeActive(marker.typeId)"
                  :transform="`translate(${marker.x}, ${marker.y})`"
                  :class="marker.typeId === 'meterOver' ? 'cursor-help select-none' : 'cursor-pointer select-none'"
                  :aria-label="marker.typeId === 'meterOver' ? `${marker.meterName}，${marker.meterCode}，累计计量水量 ${formatWaterVolume(marker.currentValue)} 万立方米` : undefined"
                  @mouseenter="showLicenseMarkerHover(marker)"
                  @mouseleave="hideLicenseMarkerHover(marker)"
                  @click.stop="marker.typeId !== 'meterOver' && handleLicenseWarningMarker(marker)"
                >
                  <!-- 计量超许可：红色证照点位 -->
                  <template v-if="marker.typeId === 'meterOver'">
                    <circle
                      cx="0"
                      cy="0"
                      r="9"
                      fill="none"
                      :stroke="marker.color"
                      stroke-width="1"
                      class="meter-alarm-wave"
                    />
                    <circle
                      cx="0"
                      cy="0"
                      r="6"
                      :fill="marker.color"
                      fill-opacity="0.2"
                      class="meter-alarm-wave meter-alarm-wave-delay"
                    />
                    <circle cx="0" cy="0" r="4.4" :fill="marker.color" stroke="#ffffff" stroke-width="1" filter="drop-shadow(0 1px 4px rgba(0,0,0,0.9))" />
                    <text x="0" y="0.6" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-size="5.8" font-weight="bold" font-family="sans-serif">!</text>
                  </template>

                  <!-- 直报超许可：琥珀色标签形证照点位 -->
                  <template v-else-if="marker.typeId === 'directOver'">
                    <path
                      d="M -9 -6 H 4 L 9 0 L 4 6 H -9 Z"
                      fill="rgba(69,35,10,0.94)"
                      stroke="#FF9F43"
                      stroke-width="1.1"
                      filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))"
                    />
                    <text x="-1" y="0.5" text-anchor="middle" dominant-baseline="middle" fill="#FFD29A" font-size="6.5" font-weight="bold" font-family="sans-serif">证</text>
                  </template>

                  <!-- 税务超计划：青蓝色菱形证照点位 -->
                  <template v-else-if="marker.typeId === 'taxOver'">
                    <polygon
                      points="0,-7.5 7.5,0 0,7.5 -7.5,0"
                      fill="rgba(8,47,76,0.96)"
                      stroke="#38BDF8"
                      stroke-width="1.1"
                      filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))"
                    />
                    <text x="0" y="0.5" text-anchor="middle" dominant-baseline="middle" fill="#9BEAFF" font-size="6.5" font-weight="bold" font-family="sans-serif">证</text>
                  </template>

                  <!-- 执行超月计划：紫色方形证照点位 -->
                  <template v-else>
                    <rect
                      x="-7"
                      y="-7"
                      width="14"
                      height="14"
                      rx="3"
                      fill="rgba(43,32,78,0.96)"
                      stroke="#A78BFA"
                      stroke-width="1.1"
                      filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))"
                    />
                    <rect x="-9" y="-9" width="18" height="18" rx="5" fill="none" stroke="#A78BFA" stroke-width="0.55" stroke-dasharray="2 1.5" stroke-opacity="0.75" />
                    <text x="0" y="0.5" text-anchor="middle" dominant-baseline="middle" fill="#DDD6FE" font-size="6.5" font-weight="bold" font-family="sans-serif">证</text>
                  </template>
                  <title v-if="marker.typeId !== 'meterOver'">{{ marker.licensee }} · {{ marker.licenseNo }} · {{ getLicenseWarningTypeLabel(marker.typeId) }} {{ marker.ratio }}%</title>
                </g>
              </template>
            </g>

            <!-- 计量超许可点位：纯悬浮气泡，不触发点击弹窗 -->
            <g
              v-if="hoveredMeterOverMarker && meterOverHoverStats"
              :transform="`translate(${hoveredMeterOverMarker.x}, ${hoveredMeterOverMarker.y - 12})`"
              pointer-events="none"
              class="select-none"
            >
              <rect
                x="-148"
                y="-182"
                width="296"
                height="172"
                rx="7"
                fill="#06152B"
                fill-opacity="0.98"
                stroke="rgba(255,107,122,0.78)"
                stroke-width="1"
                filter="drop-shadow(0 8px 18px rgba(0,0,0,0.82))"
              />
              <polygon points="0,0 -6,-10 6,-10" fill="#06152B" stroke="rgba(255,107,122,0.78)" stroke-width="1" />

              <circle cx="-132" cy="-165" r="3" fill="#FF6B7A" filter="drop-shadow(0 0 4px rgba(255,107,122,0.9))" />
              <text x="-124" y="-161.5" fill="#9BEAFF" font-size="9.5" font-family="monospace" font-weight="bold">
                {{ hoveredMeterOverMarker.meterCode }}
              </text>
              <text x="132" y="-161.5" text-anchor="end" fill="#FF9DA7" font-size="7.5" font-weight="bold">
                计量超许可 {{ hoveredMeterOverMarker.ratio.toFixed(1) }}%
              </text>
              <line x1="-132" y1="-153" x2="132" y2="-153" stroke="rgba(70,180,235,0.24)" stroke-width="0.7" />

              <text x="-132" y="-141" fill="#6F91AA" font-size="6.5" font-family="var(--spec-cn)">计量点名称</text>
              <text x="-132" y="-129" fill="#FFFFFF" font-size="9" font-family="var(--spec-cn)" font-weight="700">
                {{ hoveredMeterOverMarker.meterName }}
              </text>

              <text x="-132" y="-114" fill="#6F91AA" font-size="6.5" font-family="var(--spec-cn)">取水权人</text>
              <text x="-86" y="-114" fill="#DCF2FF" font-size="8" font-family="var(--spec-cn)">
                {{ hoveredMeterOverMarker.licensee }}
              </text>
              <text x="-132" y="-99" fill="#6F91AA" font-size="6.5" font-family="var(--spec-cn)">关联证照</text>
              <text x="-86" y="-99" fill="#FFC65C" font-size="8" font-family="monospace">
                {{ hoveredMeterOverMarker.licenseNo }}
              </text>
              <text x="-132" y="-84" fill="#6F91AA" font-size="6.5" font-family="var(--spec-cn)">接入方式</text>
              <text x="-86" y="-84" fill="#9BEAFF" font-size="8" font-family="var(--spec-cn)">
                {{ hoveredMeterOverMarker.accessMethod }}
              </text>

              <line x1="-132" y1="-72" x2="132" y2="-72" stroke="rgba(70,180,235,0.2)" stroke-width="0.7" />
              <text x="-132" y="-59" fill="#8FB6D4" font-size="7" font-family="var(--spec-cn)">对应证照年度水量（万m³）</text>

              <g
                v-for="(metric, metricIndex) in meterOverHoverWaterMetrics"
                :key="`meter-hover-${metric.label}`"
                :transform="`translate(${(metricIndex % 3) * 94}, ${metricIndex >= 3 ? 22 : 0})`"
              >
                <text x="-132" y="-45" :fill="metric.color" font-size="6.5" font-family="var(--spec-cn)">
                  {{ metric.label }}
                </text>
                <text x="-132" y="-36" fill="#FFFFFF" font-size="8.4" font-family="monospace" font-weight="700">
                  {{ formatWaterVolume(metric.value) }}
                </text>
              </g>
            </g>

            <!-- 4.3 综合场景图层3：悬浮于行政区划上方的蓝色透明三类超计划标签 -->
            <g v-if="scenarioMode === 'comprehensive' && activeLayers.overPlanLabel">
              <g
                v-for="summary in overPlanDistrictSummaries"
                :key="`over-plan-district-${summary.name}`"
                class="over-plan-district-tag cursor-pointer"
                :class="{ 'is-selected': selectedOverPlanDistrictName === summary.name && showOverPlanBubble }"
                role="button"
                tabindex="0"
                :aria-label="`${summary.name}三类超计划告警：${summary.groups.map(group => `${group.label}${group.items.length}条`).join('，')}`"
                @click.stop="toggleOverPlanDistrictBubble(summary.name)"
                @keydown.enter.prevent="toggleOverPlanDistrictBubble(summary.name)"
              >
                <line
                  :x1="summary.center[0]"
                  :y1="summary.center[1]"
                  :x2="summary.anchor.x"
                  :y2="summary.anchor.y"
                  stroke="rgba(155,234,255,0.5)"
                  stroke-width="0.7"
                  stroke-dasharray="1.5 2.5"
                  pointer-events="none"
                />
                <circle
                  :cx="summary.center[0]"
                  :cy="summary.center[1]"
                  r="2.1"
                  fill="rgba(155,234,255,0.36)"
                  stroke="#C9F6FF"
                  stroke-width="0.75"
                  pointer-events="none"
                />
                <g :transform="`translate(${summary.anchor.x}, ${summary.anchor.y})`">
                  <!-- 外侧括号，保留透明悬浮标识轮廓 -->
                  <path
                    class="over-plan-tag-chevron"
                    d="M -81 -7 L -88 1.5 L -81 10"
                    fill="none"
                    stroke="#B9F3FF"
                    stroke-width="1.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    class="over-plan-tag-chevron"
                    d="M 81 -7 L 88 1.5 L 81 10"
                    fill="none"
                    stroke="#B9F3FF"
                    stroke-width="1.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />

                  <path
                    class="over-plan-tag-glass"
                    d="M -66 -9 H 66 L 72 -3 V 6 L 66 12 H -66 L -72 6 V -3 Z"
                    fill="url(#overPlanTagGlass)"
                    stroke="rgba(155,234,255,0.7)"
                    stroke-width="0.75"
                    filter="url(#overPlanTagGlow)"
                  />
                  <path d="M -66 -8.5 H 66" fill="none" stroke="rgba(220,250,255,0.34)" stroke-width="0.55" />
                  <path d="M -61 13.5 H 61" fill="none" stroke="url(#overPlanTagLine)" stroke-width="1.1" />
                  <circle cx="0" cy="13.5" r="1.1" fill="#D9FAFF" />

                  <g
                    v-for="(group, groupIndex) in summary.groups"
                    :key="`over-plan-tag-${summary.name}-${group.typeId}`"
                    :transform="`translate(${(groupIndex - 1) * 45}, 0)`"
                    :opacity="group.items.length > 0 ? 1 : 0.55"
                  >
                    <text
                      x="-4"
                      y="1.2"
                      text-anchor="end"
                      font-family="var(--spec-cn)"
                      font-size="7"
                      font-weight="600"
                      fill="#A9E9FF"
                      pointer-events="none"
                    >
                      {{ group.shortLabel }}
                    </text>
                    <text
                      x="1"
                      y="2"
                      text-anchor="start"
                      font-family="monospace"
                      font-size="10.2"
                      font-weight="800"
                      :fill="group.items.length > 0 ? '#FFFFFF' : '#7FBED5'"
                      pointer-events="none"
                    >
                      {{ group.items.length }}
                    </text>
                  </g>
                  <line x1="-22.5" y1="-6.5" x2="-22.5" y2="8.5" stroke="rgba(155,234,255,0.24)" stroke-width="0.5" />
                  <line x1="22.5" y1="-6.5" x2="22.5" y2="8.5" stroke="rgba(155,234,255,0.24)" stroke-width="0.5" />
                  <text x="0" y="-12" text-anchor="middle" fill="#79CDEB" font-family="var(--spec-cn)" font-size="6" font-weight="600" letter-spacing="0.6" pointer-events="none">
                    {{ summary.name }} · 超计划
                  </text>
                  <title>{{ summary.name }} · 直报超许可 {{ summary.groups[0].items.length }} | 税务超计划 {{ summary.groups[1].items.length }} | 执行超计划 {{ summary.groups[2].items.length }} · 点击查看明细</title>
                </g>
              </g>
            </g>

            <!-- 5. 综合应用场景：当前研判图例悬浮摘要 -->
            <g
              v-if="hoveredDistrictName && scenarioMode === 'comprehensive' && activeMapLegendTypes.length > 0"
              :transform="getComprehensiveHoverTransform(hoveredDistrictName)"
              pointer-events="none"
              class="transition-opacity duration-150 select-none"
            >
              <rect
                x="-92"
                y="-18"
                width="184"
                height="30"
                rx="6"
                fill="#051326"
                fill-opacity="0.96"
                :stroke="getActiveMapAccent(hoveredDistrictName)"
                stroke-width="1.2"
                filter="drop-shadow(0 6px 16px rgba(0,0,0,0.85))"
              />
              <polygon
                points="0,12 -5,17 5,17"
                fill="#051326"
                :stroke="getActiveMapAccent(hoveredDistrictName)"
                stroke-width="1.2"
              />
              <circle cx="-76" cy="-3" r="3.2" :fill="getActiveMapAccent(hoveredDistrictName)" />
              <text x="-68" y="0" fill="#ffffff" font-size="10" font-weight="bold">
                {{ normalizeDistrictName(hoveredDistrictName) }}
              </text>
              <text
                x="84"
                y="0"
                text-anchor="end"
                :fill="getActiveMapAccent(hoveredDistrictName)"
                font-size="9.5"
                font-weight="bold"
              >
                {{ getActiveMapHoverValue(hoveredDistrictName) }}
              </text>
            </g>

            <!-- 5.1 专项应用场景：区县悬浮详细水量卡片 -->
            <g
              v-if="hoveredDistrictName && scenarioMode !== 'comprehensive' && !activeLayers.meterMonitoring"
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
                :data-warning-level="w.level"
                :data-warning-type="w.alarmType"
                class="cursor-pointer"
                @click="openWarningEventDetail(w)"
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
                <!-- 告警类型常显标签：仅表达类型，悬浮不展开内容 -->
                <text
                  x="0"
                  y="14"
                  text-anchor="middle"
                  font-size="7.8"
                  font-weight="700"
                  fill="#FFF4F5"
                  stroke="#071A2E"
                  stroke-width="2.6"
                  paint-order="stroke"
                  stroke-linejoin="round"
                  class="pointer-events-none"
                >
                  {{ w.alarmType }}
                </text>
              </g>
            </g>

            <!-- Layer A: 计量点 / 计量监控 / 国控计量点图层 -->
            <g v-if="scenarioMode !== 'comprehensive' && (activeLayers.meters || activeLayers.meterMonitoring || activeLayers.nationalControl)">
              <g
                v-for="meter in visibleMeterPoints"
                :key="'meter-' + meter.id"
                :transform="`translate(${meter.x}, ${meter.y})`"
                :data-meter-status="meter.meterStatus"
                class="cursor-pointer"
                @click="openMeterDetail(meter)"
                @mouseenter="hoveredMeterPoint = meter"
                @mouseleave="hoveredMeterPoint = null"
              >
                <!-- 透明碰撞层 (Hit Area): 适中鼠标捕获半径，防止悬浮抖动 -->
                <circle cx="0" cy="0" r="14" fill="transparent" />

                <!-- 国控计量点：金色双环与菱形外框，状态色仍由中心点位表达 -->
                <template v-if="activeLayers.nationalControl">
                  <polygon
                    points="0,-8.5 8.5,0 0,8.5 -8.5,0"
                    fill="none"
                    stroke="#FFD043"
                    stroke-width="1.2"
                    filter="drop-shadow(0 0 5px rgba(255,208,67,0.75))"
                    pointer-events="none"
                  />
                  <circle
                    cx="0"
                    cy="0"
                    r="6.1"
                    fill="none"
                    stroke="#FFE89B"
                    stroke-width="0.65"
                    stroke-dasharray="1.5 1"
                    pointer-events="none"
                  />
                </template>

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
                  :fill="getMeterStatusColor(hoveredMeterPoint.meterStatus)"
                  pointer-events="none"
                />
                <text x="-85" y="-42" fill="#00e5ff" font-size="10" font-family="monospace" font-weight="bold" pointer-events="none">
                  {{ hoveredMeterPoint.meterCode }}
                </text>
                <text
                  x="96"
                  y="-42"
                  text-anchor="end"
                  :fill="getMeterStatusColor(hoveredMeterPoint.meterStatus)"
                  font-size="10"
                  font-weight="bold"
                  pointer-events="none"
                >
                  {{ getMeterStatusLabel(hoveredMeterPoint.meterStatus) }}
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

        <!-- 图层3：行政区划悬浮标签的三类超计划明细气泡 -->
        <div
          v-if="scenarioMode === 'comprehensive' && activeLayers.overPlanLabel && showOverPlanBubble && selectedOverPlanDistrictSummary"
          class="absolute left-[58%] top-[48%] z-20 -translate-x-1/2 pointer-events-none select-none"
        >
          <div
            v-if="showOverPlanBubble"
            class="relative w-[560px] max-w-[calc(100vw-32px)] pointer-events-auto"
            @click.stop
          >
            <span class="absolute -top-2 left-1/2 -z-0 w-4 h-4 -translate-x-1/2 rotate-45 bg-[#071A31] border-l border-t border-[rgba(112,196,255,0.42)]"></span>
            <div class="relative rounded-xl border border-[rgba(112,196,255,0.42)] bg-[linear-gradient(160deg,rgba(7,27,49,0.99),rgba(5,18,35,0.99))] shadow-[0_24px_60px_rgba(0,0,0,0.72)] overflow-hidden">
              <div class="px-4 py-2.5 border-b border-[rgba(70,180,235,0.2)] flex items-center justify-between gap-3">
                <div class="flex items-center gap-2">
                  <span class="w-1 h-4 rounded-full bg-[#9BEAFF]"></span>
                  <span class="text-xs font-bold text-[#E4F6FF]">{{ selectedOverPlanDistrictSummary.name }} · 三类超计划告警明细</span>
                  <span class="text-[8.5px] text-[#5D8AAA] font-spec-num">{{ selectedOverPlanDistrictSummary.total }} 条</span>
                </div>
                <button
                  type="button"
                  class="text-[#5D8AAA] hover:text-white p-1 rounded hover:bg-white/10 transition cursor-pointer"
                  title="关闭告警明细"
                  @click="showOverPlanBubble = false"
                >
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>

              <div class="p-3 grid grid-cols-3 gap-2.5">
                <div
                  v-for="group in selectedOverPlanDistrictSummary.groups"
                  :key="`bubble-${group.typeId}`"
                  class="min-w-0 rounded-lg border bg-[rgba(8,28,49,0.82)] overflow-hidden"
                  :style="{ borderColor: `${group.color}45` }"
                >
                  <div class="px-2.5 py-2 border-b border-[rgba(70,180,235,0.16)] flex items-center justify-between gap-2">
                    <div class="flex items-center gap-1.5 min-w-0">
                      <span class="w-2 h-2 rounded-sm shrink-0" :style="{ backgroundColor: group.color }"></span>
                      <span class="text-[10px] font-bold text-[#E4F6FF] truncate">{{ group.label }}</span>
                    </div>
                    <span class="text-sm font-bold font-spec-num shrink-0" :style="{ color: group.color }">{{ group.items.length }}</span>
                  </div>

                  <div class="p-1.5 space-y-1 max-h-[222px] overflow-y-auto custom-dark-scrollbar">
                    <div
                      v-for="item in group.items"
                      :key="`${group.typeId}-${item.id}`"
                      class="rounded-md border border-[rgba(70,180,235,0.14)] bg-[rgba(10,35,58,0.58)] px-2 py-1.5"
                    >
                      <div class="flex items-start justify-between gap-2">
                        <span class="min-w-0 text-[9px] leading-tight text-[#DCF2FF] font-spec-cn truncate" :title="item.licensee">{{ item.licensee }}</span>
                        <span class="shrink-0 text-[10px] leading-tight font-bold font-spec-num" :style="{ color: group.color }">{{ item.ratio.toFixed(1) }}%</span>
                      </div>
                      <div class="mt-1 text-[7.5px] text-[#6F91AA] font-spec-num truncate" :title="item.licenseNo">{{ item.licenseNo }}</div>
                      <div class="mt-1 flex items-center justify-between gap-1 text-[7.5px] font-spec-num">
                        <span class="text-[#8FB6D4]">{{ formatWaterVolume(item.currentValue) }} / {{ formatWaterVolume(item.limitValue) }} 万m³</span>
                        <span class="text-[#5D8AAA] font-spec-cn shrink-0">{{ item.district }}</span>
                      </div>
                    </div>
                    <div v-if="group.items.length === 0" class="py-5 text-center text-[9px] text-[#5D8AAA] font-spec-cn">
                      当前区县无该类告警
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- ================= 3. LEFT COLUMN (区域用水态势分析) ================= -->
      <aside class="relative z-20 w-[395px] xl:w-[415px] 2xl:w-[440px] h-full p-1 xl:p-1.5 flex flex-col gap-2.5 pointer-events-auto shrink-0 overflow-y-auto custom-dark-scrollbar">
        
        <!-- A. 综合应用场景 -->
        <template v-if="scenarioMode === 'comprehensive'">
        <!-- ================= 区域用水态势分析 (全景大卡片: 五类水量环形进度 + 区域对比 + 行业水源结构占比 + 年度时间趋势) ================= -->
        <div
          id="dev-anno-2"
          class="spec-card rounded-lg p-3 xl:p-3.5 flex-1 min-h-0 flex flex-col relative transition-all duration-300"
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
          <!-- 内容区：保持自然高度，由左侧整栏统一滚动，避免卡片内多层滚动挤压 -->
          <div class="flex flex-1 min-h-0 flex-col pr-0.5">
          <!-- Card Header -->
          <div class="flex items-center justify-between pb-2">
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
          <div class="spec-header-divider mb-3"></div>

          <!-- 第三个区域：行政区域用水对比 -->
          <div class="flex flex-col gap-2 border-t border-[rgba(70,180,235,0.18)] px-0.5 mt-3 pt-4 pb-3">
            <div class="flex items-center gap-1.5 shrink-0">
              <span class="w-1 h-3 rounded-sm bg-[#3FD0FF] shadow-[0_0_6px_#3FD0FF]"></span>
              <span class="text-xs font-semibold text-[#DCF2FF] tracking-wide">行政区域用水对比</span>
            </div>
            <div class="flex items-center gap-x-2.5 gap-y-1.5 text-[9.5px] flex-wrap justify-start">
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
              <div class="flex items-center gap-1">
                <span class="w-3 border-t-2 border-dashed border-[#FF5F6D]"></span>
                <span class="text-[#FF8A8A]">管控指标</span>
              </div>
            </div>
          </div>

          <!-- SVG 6-Parameter Combo Chart: 3 Bars + 许可/计划/管控指标 3 Lines -->
          <div class="w-full h-[126px] xl:h-[140px] relative overflow-visible shrink-0">
            <svg viewBox="0 0 380 150" class="w-full h-full overflow-visible">
              <!-- Horizontal grids -->
              <g stroke="rgba(70,180,235,0.14)" stroke-width="0.8">
                <line x1="34" y1="18" x2="375" y2="18" />
                <line x1="34" y1="37.5" x2="375" y2="37.5" />
                <line x1="34" y1="57" x2="375" y2="57" />
                <line x1="34" y1="76.5" x2="375" y2="76.5" />
                <line x1="34" y1="96" x2="375" y2="96" stroke="rgba(70,180,235,0.25)" stroke-width="1.2" />
              </g>

              <!-- Y-Axis labels (font-size 10, monospace) -->
              <g fill="#5D8AAA" font-size="10" font-family="var(--spec-num)" text-anchor="end">
                <text x="30" y="21">40k</text>
                <text x="30" y="40.5">30k</text>
                <text x="30" y="60">20k</text>
                <text x="30" y="79.5">10k</text>
                <text x="30" y="99">0</text>
              </g>

              <!-- 1. 7 Districts Grouped 3 Bars: 计量水量 (青 #3FD0FF), 直报水量 (天蓝 #9BEAFF), 税务水量 (柔蓝 #60a5fa) -->
              <g
                v-for="(item, idx) in districtBarData"
                :key="item.name"
                class="cursor-pointer group"
                @mouseenter="hoveredBarDistrict = item; hoveredBarDistrictIdx = idx"
                @mouseleave="hoveredBarDistrict = null; hoveredBarDistrictIdx = null"
                @click="filterParams.district = item.name"
              >
                <!-- District Highlight Background Column on Hover -->
                <rect
                  :x="38 + idx * 46"
                  y="16"
                  width="33"
                  height="82"
                  fill="#3FD0FF"
                  :fill-opacity="filterParams.district === item.name || hoveredBarDistrictIdx === idx ? 0.14 : 0"
                  class="transition-all rounded"
                  rx="3"
                />

                <!-- 1. 计量水量 Bar (Cyan #3FD0FF) -->
                <rect
                  :x="41.5 + idx * 46"
                  :y="Math.min(93, districtWaterChartY(item.metered))"
                  width="7.5"
                  :height="Math.max(3, 96 - Math.min(93, districtWaterChartY(item.metered)))"
                  fill="#3FD0FF"
                  rx="1"
                  class="transition-opacity group-hover:opacity-90"
                >
                  <title>{{ item.name }} 计量水量: {{ item.metered }} 万m³</title>
                </rect>

                <!-- 2. 直报水量 Bar (Light Cyan #9BEAFF) -->
                <rect
                  :x="50.5 + idx * 46"
                  :y="Math.min(93, districtWaterChartY(item.reported))"
                  width="7.5"
                  :height="Math.max(3, 96 - Math.min(93, districtWaterChartY(item.reported)))"
                  fill="#9BEAFF"
                  rx="1"
                  class="transition-opacity group-hover:opacity-90"
                >
                  <title>{{ item.name }} 直报水量: {{ item.reported }} 万m³</title>
                </rect>

                <!-- 3. 税务水量 Bar (Blue #60a5fa) -->
                <rect
                  :x="59.5 + idx * 46"
                  :y="Math.min(93, districtWaterChartY(item.taxWater))"
                  width="7.5"
                  :height="Math.max(3, 96 - Math.min(93, districtWaterChartY(item.taxWater)))"
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
                  :fill="filterParams.district === item.name || hoveredBarDistrictIdx === idx ? '#3FD0FF' : '#8FB6D4'"
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
                @mouseenter="hoveredBarDistrict = item; hoveredBarDistrictIdx = idx"
                @mouseleave="hoveredBarDistrict = null; hoveredBarDistrictIdx = null"
                @click="filterParams.district = item.name"
              >
                <circle
                  :cx="54.5 + idx * 46"
                  :cy="districtWaterChartY(item.licensed)"
                  :r="hoveredBarDistrictIdx === idx ? 4 : 3.2"
                  fill="#FFC65C"
                  stroke="#ffffff"
                  stroke-width="1.6"
                  class="transition-all"
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
                @mouseenter="hoveredBarDistrict = item; hoveredBarDistrictIdx = idx"
                @mouseleave="hoveredBarDistrict = null; hoveredBarDistrictIdx = null"
                @click="filterParams.district = item.name"
              >
                <circle
                  :cx="54.5 + idx * 46"
                  :cy="districtWaterChartY(item.planned)"
                  :r="hoveredBarDistrictIdx === idx ? 3.6 : 2.8"
                  fill="#ffffff"
                  stroke="#5D8AAA"
                  stroke-width="1.4"
                  class="transition-all"
                >
                  <title>{{ item.name }} 计划水量: {{ item.planned }} 万m³</title>
                </circle>
              </g>

              <!-- 4. 管控指标折线 (红色虚线 #FF5F6D) -->
              <path
                :d="controlTargetLinePath"
                fill="none"
                stroke="#FF5F6D"
                stroke-width="2"
                stroke-dasharray="6 4"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="pointer-events-none drop-shadow-[0_0_4px_rgba(255,95,109,0.7)]"
              />

              <!-- 管控指标数据节点 (Circles) -->
              <g
                v-for="(item, idx) in districtBarData"
                :key="'control-' + item.name"
                class="cursor-pointer"
                @mouseenter="hoveredBarDistrict = item; hoveredBarDistrictIdx = idx"
                @mouseleave="hoveredBarDistrict = null; hoveredBarDistrictIdx = null"
                @click="filterParams.district = item.name"
              >
                <circle
                  :cx="54.5 + idx * 46"
                  :cy="districtWaterChartY(item.controlTarget)"
                  :r="hoveredBarDistrictIdx === idx ? 3.8 : 3"
                  fill="#0B284A"
                  stroke="#FF5F6D"
                  stroke-width="1.8"
                  class="transition-all"
                >
                  <title>{{ item.name }} 管控指标: {{ item.controlTarget }} 万m³</title>
                </circle>
              </g>
            </svg>

            <!-- Hover Popover Tooltip for District Parameters (动态跟随柱位，紧凑实色无透明度) -->
            <div
              v-if="hoveredBarDistrict && hoveredBarDistrictIdx !== null"
              class="spec-tooltip absolute p-2 text-xs shadow-2xl pointer-events-none z-30 w-max max-w-[195px] border border-[#3FD0FF]/70 rounded"
              :style="districtBarTooltipStyle"
            >
              <i class="tooltip-bar"></i>
              <div class="font-bold text-[#DCF2FF] mb-1 border-b border-[rgba(70,180,235,0.2)] pb-1 flex items-center justify-between gap-2">
                <span>{{ hoveredBarDistrict.name }} 水量参数</span>
                <span
                  class="text-[9px] px-1 py-0.2 rounded font-normal"
                  :class="hoveredBarDistrict.reported > hoveredBarDistrict.planned ? 'text-rose-300 bg-rose-500/25 border border-rose-500/40' : 'text-emerald-300 bg-emerald-500/25 border border-emerald-500/40'"
                >
                  {{ hoveredBarDistrict.reported > hoveredBarDistrict.planned ? '直报超计划' : '指标受控' }}
                </span>
              </div>
              <div class="space-y-0.5 font-spec-num text-[10.5px]">
                <div class="text-[#3FD0FF] flex justify-between gap-3 items-center">
                  <span class="flex items-center gap-1.5 text-[#8FB6D4] font-sans"><span class="w-1.5 h-1.5 rounded-xs bg-[#3FD0FF]"></span>计量水量:</span>
                  <span class="font-bold text-[#E4F6FF]">{{ hoveredBarDistrict.metered.toLocaleString() }} <small class="text-[#5D8AAA] text-[9px] font-normal">万m³</small></span>
                </div>
                <div class="text-[#9BEAFF] flex justify-between gap-3 items-center">
                  <span class="flex items-center gap-1.5 text-[#8FB6D4] font-sans"><span class="w-1.5 h-1.5 rounded-xs bg-[#9BEAFF]"></span>直报水量:</span>
                  <span class="font-bold text-white">{{ hoveredBarDistrict.reported.toLocaleString() }} <small class="text-[#5D8AAA] text-[9px] font-normal">万m³</small></span>
                </div>
                <div class="text-[#60a5fa] flex justify-between gap-3 items-center">
                  <span class="flex items-center gap-1.5 text-[#8FB6D4] font-sans"><span class="w-1.5 h-1.5 rounded-xs bg-[#60a5fa]"></span>税务水量:</span>
                  <span class="font-bold text-[#E4F6FF]">{{ hoveredBarDistrict.taxWater.toLocaleString() }} <small class="text-[#5D8AAA] text-[9px] font-normal">万m³</small></span>
                </div>
                <div class="text-[#FFC65C] flex justify-between gap-3 items-center">
                  <span class="flex items-center gap-1.5 text-[#8FB6D4] font-sans"><span class="w-2 h-0.5 bg-[#FFC65C]"></span>许可水量:</span>
                  <span class="font-bold text-[#FFC65C]">{{ hoveredBarDistrict.licensed.toLocaleString() }} <small class="text-[#5D8AAA] text-[9px] font-normal">万m³</small></span>
                </div>
                <div class="text-[#DCF2FF] flex justify-between gap-3 items-center">
                  <span class="flex items-center gap-1.5 text-[#8FB6D4] font-sans"><span class="w-2 h-0.5 border-t border-dashed border-[#DCF2FF]"></span>计划水量:</span>
                  <span class="font-bold text-[#DCF2FF]">{{ hoveredBarDistrict.planned.toLocaleString() }} <small class="text-[#5D8AAA] text-[9px] font-normal">万m³</small></span>
                </div>
                <div class="text-[#FF8A8A] flex justify-between gap-3 items-center">
                  <span class="flex items-center gap-1.5 text-[#8FB6D4] font-sans"><span class="w-2.5 border-t border-dashed border-[#FF5F6D]"></span>管控指标:</span>
                  <span class="font-bold text-[#FF8A8A]">{{ hoveredBarDistrict.controlTarget.toLocaleString() }} <small class="text-[#5D8AAA] text-[9px] font-normal">万m³</small></span>
                </div>
                <div class="flex justify-between gap-3 items-center pt-0.5 border-t border-[rgba(70,180,235,0.15)] text-[10px]">
                  <span class="text-[#8FB6D4] font-sans">计划偏差:</span>
                  <span
                    class="font-bold font-spec-num"
                    :class="hoveredBarDistrict.reported > hoveredBarDistrict.planned ? 'text-[#FF6B7A]' : 'text-[#3DDC97]'"
                  >
                    {{ (hoveredBarDistrict.reported - hoveredBarDistrict.planned > 0 ? '+' : '') + (hoveredBarDistrict.reported - hoveredBarDistrict.planned).toLocaleString() }} 万m³
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- 第三个区域：结构占比分析 (并排展示：左 行业用水 4类 + 右 水源类型 2类) -->
          <div
            id="dev-anno-4"
            class="border-t border-[rgba(70,180,235,0.18)] pt-4 mt-3 relative rounded transition-all duration-300"
            :class="{ 'ring-2 ring-[#FFB800] shadow-[0_0_24px_rgba(255,184,0,0.65)]': activeAnnotationId === 4 }"
          >
            <!-- Numbered Point 4 Badge (行业与水源结构占比) -->
            <div
              v-if="showAnnotationBadges && scenarioMode === 'comprehensive'"
              class="absolute -top-2 -left-2 z-40 flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-br from-[#FFD043] to-[#FF9F00] text-[#0A1626] font-extrabold text-[11px] shadow-[0_0_10px_rgba(255,184,0,0.95)] border-2 border-white cursor-pointer select-none transition-all duration-300 hover:scale-125"
              :class="{ 'scale-125 ring-4 ring-[#FFB800]/60 animate-bounce': activeAnnotationId === 4 }"
              @mouseenter="activeAnnotationId = 4"
              @mouseleave="activeAnnotationId = null"
              @click="scrollToAnnotation(4)"
              title="开发标注 #4: 用水结构"
            >
              4
            </div>

            <div class="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-[rgba(70,180,235,0.14)]">
              <div class="flex items-center gap-1.5">
                <span class="w-1 h-3 rounded-sm bg-[#3FD0FF] shadow-[0_0_6px_#3FD0FF]"></span>
                <span class="text-xs font-semibold text-[#DCF2FF] tracking-wide">用水结构</span>
              </div>
              <span class="text-[9px] text-[#8FB6D4] font-spec-num">
                {{ currentWaterStructureMetric.label }}水量
                <b class="ml-1 text-[#E4F6FF]">{{ Math.round(currentWaterStructureTotal).toLocaleString() }}</b>
                万m³
              </span>
            </div>

            <div class="grid grid-cols-5 gap-1 mb-2.5" role="tablist" aria-label="用水结构统计类型">
              <button
                v-for="option in waterStructureMetricOptions"
                :key="option.key"
                type="button"
                class="h-6 rounded border text-[10px] font-spec-cn font-semibold transition-all cursor-pointer"
                role="tab"
                :aria-selected="waterStructureMetric === option.key"
                :style="{
                  borderColor: waterStructureMetric === option.key ? `${option.color}AA` : 'rgba(70,180,235,0.18)',
                  color: waterStructureMetric === option.key ? option.color : '#8FB6D4',
                  backgroundColor: waterStructureMetric === option.key ? `${option.color}16` : 'rgba(8,28,49,0.42)',
                  boxShadow: waterStructureMetric === option.key ? `inset 0 0 10px ${option.color}18` : 'none',
                }"
                @click="selectWaterStructureMetric(option.key)"
              >
                {{ option.label }}
              </button>
            </div>

            <div class="grid grid-cols-1 2xl:grid-cols-2 gap-2.5 relative">
              <!-- 左栏：行业用水结构占比 (4类: 工业/农业/生活/环境) -->
              <div class="bg-[rgba(10,36,58,0.45)] border border-[rgba(70,180,235,0.16)] rounded-lg p-2.5 flex flex-col justify-between transition-colors hover:border-[rgba(70,180,235,0.35)]">
                <div class="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[rgba(70,180,235,0.12)]">
                  <div class="flex items-center gap-1.5">
                    <span class="w-1 h-2.5 rounded-sm bg-[#3FD0FF] shadow-[0_0_5px_#3FD0FF]"></span>
                    <span class="text-[11.5px] font-semibold text-[#DCF2FF] tracking-wide">行业用水结构</span>
                  </div>
                  <span class="text-[9px] text-[#8FB6D4] font-spec-num">4大行业</span>
                </div>

                <div class="flex items-center gap-3 py-1">
                  <!-- Donut Chart -->
                  <div class="w-16 h-16 relative shrink-0 flex items-center justify-center">
                    <svg viewBox="0 0 60 60" class="w-full h-full -rotate-90">
                      <circle
                        v-for="item in waterStructureIndustryShares"
                        :key="`industry-${item.key}`"
                        cx="30"
                        cy="30"
                        r="22"
                        fill="transparent"
                        :stroke="item.color"
                        stroke-width="8"
                        :stroke-dasharray="item.dashArray"
                        :stroke-dashoffset="item.dashOffset"
                        class="cursor-pointer transition-all duration-300 hover:stroke-opacity-80"
                        @mouseenter="showStructureDetail('industry', item, 'left')"
                        @mouseleave="hoveredStructureDetail = null"
                      />
                    </svg>
                    <div class="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                      <span class="text-[8.5px] text-[#8FB6D4] leading-tight">{{ currentWaterStructureMetric.label }}</span>
                      <span class="text-[10px] font-bold font-spec-num text-[#9BEAFF] leading-tight">100%</span>
                    </div>
                  </div>

                  <!-- 当前业务类型对应的行业占比 -->
                  <div class="flex-1 space-y-1 text-[10.5px]">
                    <div
                      v-for="item in waterStructureIndustryShares"
                      :key="`industry-list-${item.key}`"
                      class="flex items-center justify-between cursor-pointer rounded px-1 py-0.2 hover:bg-[rgba(63,208,255,0.12)] transition-colors"
                      @mouseenter="showStructureDetail('industry', item, 'left')"
                      @mouseleave="hoveredStructureDetail = null"
                    >
                      <div class="flex items-center gap-1">
                        <span class="w-1.5 h-1.5 rounded-xs shrink-0" :style="{ backgroundColor: item.color }"></span>
                        <span class="text-[#8FB6D4]">{{ item.label }}</span>
                      </div>
                      <span class="font-bold font-spec-num" :style="{ color: item.color }">{{ item.percent.toFixed(1) }}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 右栏：水源类型占比 (2类: 地表水/地下水) -->
              <div class="bg-[rgba(10,36,58,0.45)] border border-[rgba(70,180,235,0.16)] rounded-lg p-2.5 flex flex-col justify-between transition-colors hover:border-[rgba(70,180,235,0.35)]">
                <div class="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[rgba(70,180,235,0.12)]">
                  <div class="flex items-center gap-1.5">
                    <span class="w-1 h-2.5 rounded-sm bg-[#00E5FF] shadow-[0_0_5px_#00E5FF]"></span>
                    <span class="text-[11.5px] font-semibold text-[#DCF2FF] tracking-wide">水源类型结构</span>
                  </div>
                  <span class="text-[9px] text-[#8FB6D4] font-spec-num">2大类</span>
                </div>

                <div class="flex items-center gap-3 py-1">
                  <!-- Donut Chart -->
                  <div class="w-16 h-16 relative shrink-0 flex items-center justify-center">
                    <svg viewBox="0 0 60 60" class="w-full h-full -rotate-90">
                      <circle
                        v-for="item in waterStructureSourceShares"
                        :key="`source-${item.key}`"
                        cx="30"
                        cy="30"
                        r="22"
                        fill="transparent"
                        :stroke="item.color"
                        stroke-width="8"
                        :stroke-dasharray="item.dashArray"
                        :stroke-dashoffset="item.dashOffset"
                        class="cursor-pointer transition-all duration-300 hover:stroke-opacity-80"
                        @mouseenter="showStructureDetail('source', item, 'right')"
                        @mouseleave="hoveredStructureDetail = null"
                      />
                    </svg>
                    <div class="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                      <span class="text-[8.5px] text-[#8FB6D4] leading-tight">{{ currentWaterStructureMetric.label }}</span>
                      <span class="text-[10px] font-bold font-spec-num text-[#00E5FF] leading-tight">100%</span>
                    </div>
                  </div>

                  <!-- 当前业务类型对应的水源占比 -->
                  <div class="flex-1 space-y-1.5 text-[10.5px]">
                    <div
                      v-for="item in waterStructureSourceShares"
                      :key="`source-list-${item.key}`"
                      class="cursor-pointer rounded px-1 py-0.2 hover:bg-[rgba(63,208,255,0.12)] transition-colors"
                      @mouseenter="showStructureDetail('source', item, 'right')"
                      @mouseleave="hoveredStructureDetail = null"
                    >
                      <div class="flex items-center justify-between">
                        <div class="flex items-center gap-1">
                          <span class="w-1.5 h-1.5 rounded-xs shrink-0" :style="{ backgroundColor: item.color }"></span>
                          <span class="text-[#8FB6D4]">{{ item.label }}</span>
                        </div>
                        <span class="font-bold font-spec-num" :style="{ color: item.color }">{{ item.percent.toFixed(1) }}%</span>
                      </div>
                      <div class="text-[8.5px] text-[#5D8AAA] font-spec-num pl-2.5">{{ item.volumeText }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 结构占比悬浮参数弹窗 (实色纯底，紧凑跟随) -->
              <div
                v-if="hoveredStructureDetail"
                class="spec-tooltip absolute top-0 z-30 p-2 text-xs shadow-2xl pointer-events-none w-max max-w-[195px] border border-[#3FD0FF]/70 rounded"
                :style="hoveredStructureSide === 'left' ? { left: '8px' } : { right: '8px' }"
              >
                <i class="tooltip-bar" :style="{ background: hoveredStructureDetail.color }"></i>
                <div class="font-bold text-[#DCF2FF] mb-1 border-b border-[rgba(70,180,235,0.2)] pb-1 flex items-center justify-between gap-3">
                  <span class="flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-xs" :style="{ background: hoveredStructureDetail.color }"></span>
                    {{ hoveredStructureDetail.name }}
                  </span>
                  <span class="font-spec-num font-bold text-white">{{ hoveredStructureDetail.rate }}</span>
                </div>
                <div class="space-y-0.5 text-[10px] font-spec-num">
                  <div class="flex justify-between gap-2 text-[#8FB6D4]">
                    <span class="font-sans">{{ currentWaterStructureMetric.label }}水量:</span>
                    <span class="font-bold text-[#E4F6FF]">{{ hoveredStructureDetail.volume }}</span>
                  </div>
                  <div class="text-[#8FB6D4] font-sans text-[9px] leading-tight pt-0.5">
                    {{ hoveredStructureDetail.focus }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 第四个区域：【行政区划用水统计趋势】(跟着中间行政区划切换联动，以月为维度统计实际用水与计划用水) -->
          <div
            id="dev-anno-11"
            class="border-t border-[rgba(70,180,235,0.18)] pt-4 mt-3 relative rounded transition-all duration-300"
            :class="{ 'ring-2 ring-[#FFB800] shadow-[0_0_24px_rgba(255,184,0,0.65)]': activeAnnotationId === 11 }"
          >
            <!-- Numbered Point 11 Badge (行政区划用水统计趋势 - 计划用水年度统计) -->
            <div
              v-if="showAnnotationBadges && scenarioMode === 'comprehensive'"
              class="absolute -top-2 -left-2 z-40 flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-br from-[#FFD043] to-[#FF9F00] text-[#0A1626] font-extrabold text-[11px] shadow-[0_0_10px_rgba(255,184,0,0.95)] border-2 border-white cursor-pointer select-none transition-all duration-300 hover:scale-125"
              :class="{ 'scale-125 ring-4 ring-[#FFB800]/60 animate-bounce': activeAnnotationId === 11 }"
              @mouseenter="activeAnnotationId = 11"
              @mouseleave="activeAnnotationId = null"
              @click="scrollToAnnotation(11)"
              title="开发标注 #11: 行政区划用水统计趋势 (计划用水年度统计)"
            >
              11
            </div>

            <!-- 标题栏 & 联动状态提示 & 图例 -->
            <div class="flex items-center justify-between pb-2">
              <div class="flex items-center gap-1.5">
                <span class="w-1 h-3 rounded-sm bg-[#3FD0FF] shadow-[0_0_6px_#3FD0FF]"></span>
                <h3 class="text-xs font-semibold text-[#DCF2FF] tracking-wide">行政区划用水统计趋势</h3>
                <span class="text-[10px] text-[#8FB6D4]">(万m³)</span>
              </div>
              <div class="flex items-center gap-2 text-[10px]">
                <div class="flex items-center gap-1">
                  <span class="w-2.5 h-2 rounded-xs bg-gradient-to-t from-[#1E7BE8] to-[#3FD0FF]"></span>
                  <span class="text-[#3FD0FF] font-medium">实际用水</span>
                </div>
                <div class="flex items-center gap-1">
                  <span class="inline-flex items-center text-[#FFC65C] font-bold text-[9px] tracking-tighter">┄●┄</span>
                  <span class="text-[#FFC65C] font-medium">计划用水</span>
                </div>
              </div>
            </div>

            <!-- 区划联动月度汇总指示条 -->
            <div class="grid grid-cols-4 gap-1.5 p-2  border border-[rgba(70,180,235,0.16)] mb-2 text-center">
              <div>
                <div class="text-[9px] text-[#8FB6D4]">关联区划</div>
                <div class="text-[11px] font-bold font-spec-cn text-[#9BEAFF] mt-0.5 truncate flex items-center justify-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_5px_#00E5FF]"></span>
                  <span>{{ filterParams.district === '西宁市' ? '西宁市' : filterParams.district }}</span>
                </div>
              </div>
              <div>
                <div class="text-[9px] text-[#8FB6D4]">年实际用水</div>
                <div class="text-[11px] font-bold font-spec-num text-[#9BEAFF] mt-0.5">
                  {{ currentDistrictMonthTotals.totalActual.toLocaleString() }}
                </div>
              </div>
              <div>
                <div class="text-[9px] text-[#8FB6D4]">年计划指标</div>
                <div class="text-[11px] font-bold font-spec-num text-[#9BEAFF] mt-0.5">
                  {{ currentDistrictMonthTotals.totalPlanned.toLocaleString() }}
                </div>
              </div>
              <div>
                <div class="text-[9px] text-[#8FB6D4]">综合执行率</div>
                <div class="text-[11px] font-bold font-spec-num mt-0.5 flex items-center justify-center gap-0.5 text-[#9BEAFF]">
                  <span>{{ currentDistrictMonthTotals.executionRate }}%</span>
                </div>
              </div>
            </div>

            <!-- SVG 实际用水(柱) vs 计划用水(折线) 月度对比图 -->
            <div class="w-full h-[128px] xl:h-[145px] relative overflow-visible shrink-0">
              <svg viewBox="0 0 380 120" class="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="districtActualBarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#3FD0FF" />
                    <stop offset="100%" stop-color="#0E5CAD" />
                  </linearGradient>
                  <linearGradient id="districtExceedBarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#FF6B7A" />
                    <stop offset="100%" stop-color="#991B1B" />
                  </linearGradient>
                </defs>

                <!-- Horizontal Grid Lines -->
                <g stroke="rgba(70,180,235,0.14)" stroke-width="0.8">
                  <line x1="36" y1="16" x2="368" y2="16" />
                  <line x1="36" y1="42" x2="368" y2="42" />
                  <line x1="36" y1="68" x2="368" y2="68" />
                  <line x1="36" y1="94" x2="368" y2="94" stroke="rgba(70,180,235,0.25)" stroke-width="1.2" />
                </g>

                <!-- Y-Axis labels -->
                <g fill="#5D8AAA" font-size="9" font-family="var(--spec-num)" text-anchor="end">
                  <text v-for="tick in districtMonthChartData.yTicks" :key="tick.label" x="32" :y="tick.y">
                    {{ tick.label }}
                  </text>
                </g>

                <!-- 1. 实际用水柱 (正常水蓝柱与超计划红柱) -->
                <g>
                  <rect
                    v-for="(item, idx) in districtMonthChartData.items"
                    :key="'bar-' + item.record.month"
                    :x="item.barX"
                    :y="item.barY"
                    :width="item.barWidth"
                    :height="item.barHeight"
                    rx="1.5"
                    :fill="item.isExceeded ? 'url(#districtExceedBarGrad)' : 'url(#districtActualBarGrad)'"
                    :stroke="item.isExceeded ? '#FF8595' : (hoveredDistrictMonthIdx === idx ? '#E4F6FF' : '#3FD0FF')"
                    :stroke-width="hoveredDistrictMonthIdx === idx ? 1.4 : 0.7"
                    class="transition-all duration-300 cursor-pointer"
                    @mouseenter="hoveredDistrictMonthIdx = idx"
                    @mouseleave="hoveredDistrictMonthIdx = null"
                  />
                </g>

                <!-- 2. 计划用水折线 (金黄折线 #FFC65C) -->
                <path
                  :d="districtMonthChartData.planLinePath"
                  fill="none"
                  stroke="#FFC65C"
                  stroke-width="1.6"
                  stroke-dasharray="3 2"
                  class="transition-all duration-300"
                />

                <!-- 3. 数据节点与月份 X 轴标签 -->
                <g
                  v-for="(item, idx) in districtMonthChartData.items"
                  :key="'pt-' + item.record.month"
                  class="cursor-pointer group"
                  @mouseenter="hoveredDistrictMonthIdx = idx"
                  @mouseleave="hoveredDistrictMonthIdx = null"
                >
                  <!-- 悬浮触发背景高亮矩形 -->
                  <rect
                    :x="item.cx - 12"
                    y="10"
                    width="24"
                    height="94"
                    fill="rgba(63,208,255,0.08)"
                    class="opacity-0 group-hover:opacity-100 transition-opacity rounded"
                  />

                  <!-- 计划节点点位 -->
                  <circle
                    :cx="item.cx"
                    :cy="item.planY"
                    :r="hoveredDistrictMonthIdx === idx ? 3.8 : 2"
                    fill="#FFC65C"
                    stroke="#ffffff"
                    stroke-width="1"
                    class="transition-all"
                  />

                  <!-- 超计划告警角标点 -->
                  <circle
                    v-if="item.isExceeded"
                    :cx="item.cx"
                    :cy="item.barY - 3"
                    r="2"
                    fill="#FF6B7A"
                    class="animate-pulse"
                  />

                  <!-- X 轴月份文字 -->
                  <text
                    :x="item.cx"
                    y="108"
                    text-anchor="middle"
                    font-size="9.5"
                    font-weight="bold"
                    :fill="hoveredDistrictMonthIdx === idx ? '#3FD0FF' : '#8FB6D4'"
                    class="transition-colors"
                  >
                    {{ item.record.month }}
                  </text>
                </g>
              </svg>

              <!-- 悬浮浮窗 Tooltip (跟随月份柱位动态移动，实色紧凑无透明度) -->
              <div
                v-if="hoveredDistrictMonthIdx !== null && currentDistrictMonthlyList[hoveredDistrictMonthIdx]"
                class="spec-tooltip absolute p-2 text-xs shadow-2xl pointer-events-none z-30 w-max max-w-[190px] border border-[#3FD0FF]/70 rounded"
                :style="districtMonthTooltipStyle"
              >
                <i class="tooltip-bar"></i>
                <div class="font-bold text-[#DCF2FF] mb-1 border-b border-[rgba(70,180,235,0.2)] pb-1 flex items-center justify-between gap-2">
                  <span>{{ filterParams.district === '西宁市' ? '全市' : filterParams.district }} · {{ currentDistrictMonthlyList[hoveredDistrictMonthIdx].month }}</span>
                  <span
                    class="text-[9px] px-1 py-0.2 rounded font-normal"
                    :class="currentDistrictMonthlyList[hoveredDistrictMonthIdx].rate > 100 ? 'text-rose-300 bg-rose-500/25 border border-rose-500/40' : 'text-emerald-300 bg-emerald-500/25 border border-emerald-500/40'"
                  >
                    {{ currentDistrictMonthlyList[hoveredDistrictMonthIdx].rate > 100 ? '超计划预警' : '定额受控' }}
                  </span>
                </div>
                <div class="space-y-0.5 font-spec-num text-[10.5px]">
                  <div class="text-[#3FD0FF] flex justify-between gap-3 items-center">
                    <span class="flex items-center gap-1 font-sans text-[#8FB6D4]"><i class="w-1.5 h-1.5 rounded-xs bg-[#3FD0FF]"></i>实际用水:</span>
                    <span class="font-bold text-[#E4F6FF]">{{ currentDistrictMonthlyList[hoveredDistrictMonthIdx].actual.toLocaleString() }} <small class="text-[#5D8AAA] text-[9px] font-normal">万m³</small></span>
                  </div>
                  <div class="text-[#FFC65C] flex justify-between gap-3 items-center">
                    <span class="flex items-center gap-1 font-sans text-[#8FB6D4]"><i class="w-1.5 h-1.5 rounded-xs bg-[#FFC65C]"></i>计划指标:</span>
                    <span class="font-bold text-[#FFC65C]">{{ currentDistrictMonthlyList[hoveredDistrictMonthIdx].planned.toLocaleString() }} <small class="text-[#5D8AAA] text-[9px] font-normal">万m³</small></span>
                  </div>
                  <div class="flex justify-between gap-3 items-center pt-0.5 border-t border-[rgba(70,180,235,0.15)] text-[10px]">
                    <span class="font-sans text-[#8FB6D4]">偏差水量:</span>
                    <span
                      class="font-bold"
                      :class="currentDistrictMonthlyList[hoveredDistrictMonthIdx].rate > 100 ? 'text-[#FF6B7A]' : 'text-[#3DDC97]'"
                    >
                      {{ (currentDistrictMonthlyList[hoveredDistrictMonthIdx].actual - currentDistrictMonthlyList[hoveredDistrictMonthIdx].planned > 0 ? '+' : '') + (currentDistrictMonthlyList[hoveredDistrictMonthIdx].actual - currentDistrictMonthlyList[hoveredDistrictMonthIdx].planned).toLocaleString() }} 万m³
                    </span>
                  </div>
                  <div class="flex justify-between gap-3 items-center text-[10px]">
                    <span class="font-sans text-[#8FB6D4]">月执行率:</span>
                    <span
                      class="font-bold"
                      :class="currentDistrictMonthlyList[hoveredDistrictMonthIdx].rate > 100 ? 'text-[#FF6B7A]' : 'text-[#3DDC97]'"
                    >
                      {{ currentDistrictMonthlyList[hoveredDistrictMonthIdx].rate }}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 第五个区域：用水时间变化趋势 (放在最后一栏) -->
          <div
            id="dev-anno-3"
            class="border-t border-[rgba(70,180,235,0.18)] pt-4 mt-auto flex flex-col flex-none min-h-[190px] relative rounded transition-all duration-300"
            :class="{ 'ring-2 ring-[#FFB800] shadow-[0_0_24px_rgba(255,184,0,0.65)]': activeAnnotationId === 3 }"
          >
            <!-- Numbered Point 3 Badge (用水时间变化趋势 - 最后一栏) -->
            <div
              v-if="showAnnotationBadges && scenarioMode === 'comprehensive'"
              class="absolute -top-2 -left-2 z-40 flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-br from-[#FFD043] to-[#FF9F00] text-[#0A1626] font-extrabold text-[11px] shadow-[0_0_10px_rgba(255,184,0,0.95)] border-2 border-white cursor-pointer select-none transition-all duration-300 hover:scale-125"
              :class="{ 'scale-125 ring-4 ring-[#FFB800]/60 animate-bounce': activeAnnotationId === 3 }"
              @mouseenter="activeAnnotationId = 3"
              @mouseleave="activeAnnotationId = null"
              @click="scrollToAnnotation(3)"
              title="开发标注 #3: 用水时间变化趋势 (最后一栏)"
            >
              3
            </div>

            <div class="flex items-center justify-between gap-3 pb-1">
              <div class="flex items-center gap-1.5 whitespace-nowrap">
                <span class="w-1 h-3 rounded-sm bg-[#9BEAFF] shadow-[0_0_6px_#9BEAFF]"></span>
                <h3 class="text-xs font-semibold text-[#DCF2FF] tracking-wide">用水时间变化趋势</h3>
                <span class="text-[10px] text-[#8FB6D4]">(万m³)</span>
              </div>
              <span class="shrink-0 rounded border border-[rgba(155,234,255,0.24)] px-1.5 py-0.5 text-[8.5px] text-[#9BEAFF]">近5年</span>
            </div>
            <div class="flex flex-wrap items-center gap-x-2.5 gap-y-1 pb-1.5 text-[9px]">
                <div
                  v-for="metric in annualTrendMetricDefinitions"
                  :key="`trend-legend-${metric.key}`"
                  class="flex items-center gap-1 whitespace-nowrap"
                >
                  <span class="w-2.5 h-0.5 rounded-xs" :style="{ backgroundColor: metric.color, boxShadow: `0 0 4px ${metric.color}` }"></span>
                  <span :style="{ color: metric.color }">{{ metric.shortLabel }}</span>
                </div>
                <div class="flex items-center gap-1 whitespace-nowrap">
                  <span class="w-3 border-t border-dashed border-[#FF6B7A]"></span>
                  <span class="text-[#FF8A95]">管控</span>
                </div>
            </div>

            <!-- SVG 五指标年度趋势图 -->
            <div class="w-full h-[164px] xl:h-[180px] relative overflow-visible shrink-0">
            <svg viewBox="0 0 380 120" class="w-full h-full overflow-visible">
              <defs>
                <linearGradient
                  v-for="metric in annualTrendMetricDefinitions"
                  :id="`trendArea-${metric.key}`"
                  :key="`trend-area-gradient-${metric.key}`"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" :stop-color="metric.color" stop-opacity="0.48" />
                  <stop offset="58%" :stop-color="metric.color" stop-opacity="0.14" />
                  <stop offset="100%" :stop-color="metric.color" stop-opacity="0" />
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
                <line x1="36" y1="20" x2="368" y2="20" />
                <line x1="36" y1="56" x2="368" y2="56" />
                <line x1="36" y1="92" x2="368" y2="92" />
                <line x1="36" y1="128" x2="368" y2="128" stroke="rgba(70,180,235,0.25)" stroke-width="1.2" />
              </g>

              <!-- Y-Axis labels (font-size 10) -->
              <g fill="#5D8AAA" font-size="10" font-family="var(--spec-num)" text-anchor="end">
                <text v-for="tick in trendChartData.yTicks" :key="tick.value" x="32" :y="tick.y">{{ tick.label }}</text>
              </g>

              <!-- 五类年度水量渐变面积 -->
              <g>
                <path
                  v-for="series in trendChartData.series"
                  :key="`trend-area-${series.key}`"
                  :d="series.areaPath"
                  :fill="`url(#trendArea-${series.key})`"
                  class="transition-all duration-300"
                />
              </g>

              <!-- 五类年度水量曲线 -->
              <g
                v-for="series in trendChartData.series"
                :key="`trend-series-${series.key}`"
              >
                <path
                  :d="series.path"
                  fill="none"
                  :stroke="series.color"
                  :stroke-width="series.key === 'planned' ? 1.8 : 2.1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  :stroke-dasharray="series.key === 'planned' ? '4 2.5' : undefined"
                  :filter="series.key === 'metered' ? 'url(#cyanGlow)' : undefined"
                  class="transition-all duration-300"
                />
                <circle
                  v-for="point in series.points"
                  :key="`trend-point-${series.key}-${point.year}`"
                  :cx="point.x"
                  :cy="point.y"
                  :r="hoveredTrendIdx === point.index ? 3.2 : 1.9"
                  fill="#071A31"
                  :stroke="series.color"
                  :stroke-width="hoveredTrendIdx === point.index ? 2 : 1.35"
                  class="transition-all"
                />
              </g>

              <!-- 管控指标：仅红色虚线，不绘制面积 -->
              <g pointer-events="none">
                <path
                  :d="trendChartData.controlSeries.path"
                  fill="none"
                  stroke="#FF6B7A"
                  stroke-width="2"
                  stroke-dasharray="5 3"
                  stroke-linecap="round"
                  filter="drop-shadow(0 0 3px rgba(255,107,122,0.5))"
                />
                <circle
                  v-for="point in trendChartData.controlSeries.points"
                  :key="`trend-control-${point.year}`"
                  :cx="point.x"
                  :cy="point.y"
                  :r="hoveredTrendIdx === point.index ? 3.1 : 1.8"
                  fill="#071A31"
                  stroke="#FF6B7A"
                  :stroke-width="hoveredTrendIdx === point.index ? 2 : 1.3"
                  class="transition-all"
                />
              </g>

              <!-- 年份悬浮区域与 X 轴 -->
              <g
                v-for="(yearPoint, idx) in trendChartData.yearPoints"
                :key="yearPoint.year"
                class="cursor-pointer"
                @mouseenter="hoveredTrendIdx = idx"
                @mouseleave="hoveredTrendIdx = null"
              >
                <rect
                  :x="yearPoint.x - 26"
                  y="14"
                  width="52"
                  height="118"
                  fill="transparent"
                />
                <line
                  v-if="hoveredTrendIdx === idx"
                  :x1="yearPoint.x"
                  y1="20"
                  :x2="yearPoint.x"
                  y2="128"
                  stroke="rgba(155,234,255,0.3)"
                  stroke-width="0.8"
                  stroke-dasharray="2 2"
                />
                <text
                  :x="yearPoint.x"
                  y="142"
                  text-anchor="middle"
                  font-size="10.5"
                  font-weight="bold"
                  :fill="hoveredTrendIdx === idx ? '#9BEAFF' : '#8FB6D4'"
                >
                  {{ yearPoint.year }}
                </text>
              </g>
            </svg>

            <!-- 年度五指标悬浮明细 -->
            <div
              v-if="hoveredTrendIdx !== null && trendYearData[hoveredTrendIdx]"
              class="spec-tooltip absolute p-2 text-xs shadow-2xl pointer-events-none z-30 w-max max-w-[220px] border border-[#3FD0FF]/70 rounded"
              :style="trendTooltipStyle"
            >
              <i class="tooltip-bar"></i>
              <div class="font-bold text-[#DCF2FF] mb-1 border-b border-[rgba(70,180,235,0.2)] pb-1 flex items-center justify-between gap-3">
                <span>{{ trendYearData[hoveredTrendIdx].year }}年度用水参数</span>
                <span class="text-[9px] px-1 py-0.2 rounded font-normal text-cyan-300 bg-cyan-500/20 border border-cyan-500/35">年度汇总</span>
              </div>
              <div class="space-y-0.5 font-spec-num text-[10.5px]">
                <div
                  v-for="metric in annualTrendMetricDefinitions"
                  :key="`trend-tooltip-${metric.key}`"
                  class="flex justify-between gap-4 items-center"
                >
                  <span class="flex items-center gap-1.5 font-sans text-[#8FB6D4]">
                    <i class="w-1.5 h-1.5 rounded-xs" :style="{ backgroundColor: metric.color }"></i>{{ metric.label }}:
                  </span>
                  <span class="font-bold" :style="{ color: metric.color }">
                    {{ trendYearData[hoveredTrendIdx][metric.key].toLocaleString() }}
                    <small class="text-[#5D8AAA] text-[9px] font-normal">万m³</small>
                  </span>
                </div>
                <div class="flex justify-between gap-4 items-center mt-1 pt-1 border-t border-[rgba(255,107,122,0.22)]">
                  <span class="flex items-center gap-1.5 font-sans text-[#8FB6D4]">
                    <i class="w-3 border-t border-dashed border-[#FF6B7A]"></i>管控指标:
                  </span>
                  <span class="font-bold text-[#FF8A95]">
                    {{ trendYearData[hoveredTrendIdx].controlTarget.toLocaleString() }}
                    <small class="text-[#5D8AAA] text-[9px] font-normal">万m³</small>
                  </span>
                </div>
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
                <h2 class="text-sm 2xl:text-[15.5px] font-semibold text-[#E4F6FF] tracking-[0.8px]">计量设施统筹管理</h2>
              </div>
            </div>
            <div class="spec-header-divider mb-1"></div>

            <!-- 5 Status Badges: 站点总数、正常站点、停用站点、故障异常、待检定 -->
            <div class="grid grid-cols-5 gap-1.5 shrink-0">
              <!-- 站点总数 -->
              <div class="bg-[rgba(10,36,58,0.5)] border border-[rgba(70,180,235,0.16)] rounded p-2 text-center">
                <span class="text-[10px] text-[#8FB6D4] block font-medium">站点总数</span>
                <span class="text-base 2xl:text-lg font-bold font-spec-num text-white mt-0.5 block">{{ meterDeviceSummary.total }}</span>
                <span class="text-[9px] text-[#5D8AAA] block">{{ filterParams.district === '西宁市' ? '下级区县汇总' : '当前区划' }}</span>
              </div>
              <!-- 正常站点 -->
              <div class="bg-cyan-950/30 border border-[#3FD0FF]/35 rounded p-2 text-center">
                <span class="text-[10px] text-[#9BEAFF] block font-medium">正常站点</span>
                <span class="text-base 2xl:text-lg font-bold font-spec-num text-[#3FD0FF] mt-0.5 block">{{ meterDeviceSummary.online }}</span>
                <span class="text-[9px] text-[#3FD0FF]/80 block">实时传输</span>
              </div>
              <!-- 停用站点 -->
              <div class="bg-slate-800/40 border border-slate-600/35 rounded p-2 text-center">
                <span class="text-[10px] text-[#8FB6D4] block font-medium">停用站点</span>
                <span class="text-base 2xl:text-lg font-bold font-spec-num text-[#8FB6D4] mt-0.5 block">{{ meterDeviceSummary.offline }}</span>
                <span class="text-[9px] text-[#5D8AAA] block">按需停用</span>
              </div>
              <!-- 故障异常 -->
              <div class="bg-rose-950/25 border border-[#FF6B7A]/40 rounded p-2 text-center">
                <span class="text-[10px] text-[#FF6B7A] block font-medium">故障异常</span>
                <span class="text-base 2xl:text-lg font-bold font-spec-num text-[#FF6B7A] mt-0.5 block">{{ meterDeviceSummary.fault }}</span>
                <span class="text-[9px] text-[#FF6B7A]/80 block">需抢修</span>
              </div>
              <!-- 待检定 -->
              <div class="bg-amber-950/25 border border-[#FFC65C]/40 rounded p-2 text-center">
                <span class="text-[10px] text-[#FFC65C] block font-medium">待检定</span>
                <span class="text-base 2xl:text-lg font-bold font-spec-num text-[#FFC65C] mt-0.5 block">{{ meterDeviceSummary.pending }}</span>
                <span class="text-[9px] text-[#FFC65C]/80 block">周期到期</span>
              </div>
            </div>

            <!-- 当前行政区划下级管理单位设施状态分析 -->
            <div class="flex-1 flex flex-col gap-2 min-h-0">
              <div class="flex items-center justify-between text-xs font-semibold text-[#DCF2FF] shrink-0">
                <div class="flex items-center gap-1.5">
                  <span class="text-[#3FD0FF] font-bold">|</span>
                  <span>中央发展资金年度统计</span>
                  <span class="text-[10px] text-[#8FB6D4] font-normal">(与上方总量联动)</span>
                </div>
                <span class="text-[9px] text-[#FFC65C] font-spec-cn">
                  {{ filterParams.district === '西宁市' ? '区县' : '当前区划' }} · {{ currentFacilityUnits.length }} 个管理单位
                </span>
              </div>

              <!-- 近四年中央发展资金计量点总量 -->
              <div class="grid grid-cols-4 gap-1.5 shrink-0">
                <div
                  v-for="item in centralFundYearStats"
                  :key="'central-fund-' + item.year"
                  class="p-2 rounded-lg border border-[rgba(70,180,235,0.18)] bg-[rgba(10,36,58,0.55)] flex flex-col justify-between"
                >
                  <div class="flex items-center justify-between gap-1 min-w-0">
                    <span class="text-[10px] font-semibold text-[#DCF2FF] font-spec-num">{{ item.year }}</span>
                    <span class="text-[8px] text-[#5D8AAA] font-spec-cn">计量点</span>
                  </div>
                  <div class="flex items-baseline gap-0.5 mt-1 font-spec-num">
                    <span class="text-lg 2xl:text-xl font-bold text-white">{{ item.total }}</span>
                    <span class="text-[9px] text-[#8FB6D4]">处</span>
                  </div>
                  <div class="mt-1 pt-1 border-t border-[rgba(70,180,235,0.12)] text-[8px] leading-tight text-[#5D8AAA] font-spec-cn whitespace-nowrap">
                    正常 <b class="text-[#3FD0FF] font-spec-num">{{ item.normal }}</b>
                    · 故障 <b class="text-[#FF6B7A] font-spec-num">{{ item.fault }}</b>
                    · 停用 <b class="text-[#8FB6D4] font-spec-num">{{ item.offline }}</b>
                  </div>
                </div>
              </div>

              <!-- 当前区划下级单位：正常、故障、停用、待检定 -->
              <div class="flex-1 min-h-[175px] 2xl:min-h-[195px] flex flex-col justify-between">
                <div class="flex items-center justify-between text-[10px] mb-1 shrink-0 font-spec-cn pt-0.5">
                  <span class="text-[#8FB6D4]">下级管理单位站点状态对比</span>
                  <div class="flex items-center gap-3">
                    <div class="flex items-center gap-1">
                      <span class="w-2.5 h-2 rounded-xs bg-[#3FD0FF]"></span>
                      <span class="text-[#3FD0FF]">正常</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <span class="w-2.5 h-2 rounded-xs bg-[#FF6B7A]"></span>
                      <span class="text-[#FF6B7A]">故障</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <span class="w-2.5 h-2 rounded-xs bg-[#64748B]"></span>
                      <span class="text-[#8FB6D4]">停用</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <span class="w-2.5 h-2 rounded-xs bg-[#FFC65C]"></span>
                      <span class="text-[#FFC65C]">待检定</span>
                    </div>
                  </div>
                </div>

                <div class="w-full flex-1 min-h-[155px] relative">
                  <svg viewBox="0 0 380 160" class="w-full h-full overflow-visible" role="img" aria-label="当前行政区划下级管理单位正常站点、故障站点、停用站点和待检定站点对比">
                    <defs>
                      <linearGradient id="facilityNormalGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#3FD0FF" stop-opacity="1" />
                        <stop offset="100%" stop-color="#0F6496" stop-opacity="0.4" />
                      </linearGradient>
                      <linearGradient id="facilityFaultGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#FF6B7A" stop-opacity="1" />
                        <stop offset="100%" stop-color="#8B2636" stop-opacity="0.45" />
                      </linearGradient>
                      <linearGradient id="facilityOfflineGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#94A3B8" stop-opacity="0.9" />
                        <stop offset="100%" stop-color="#334155" stop-opacity="0.45" />
                      </linearGradient>
                      <linearGradient id="facilityPendingGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#FFC65C" stop-opacity="1" />
                        <stop offset="100%" stop-color="#8A641E" stop-opacity="0.45" />
                      </linearGradient>
                    </defs>

                    <g stroke="rgba(70,180,235,0.12)" stroke-width="0.8">
                      <line x1="28" y1="18" x2="370" y2="18" />
                      <line x1="28" y1="54" x2="370" y2="54" />
                      <line x1="28" y1="90" x2="370" y2="90" />
                      <line x1="28" y1="126" x2="370" y2="126" stroke="rgba(70,180,235,0.24)" />
                    </g>
                    <g fill="#5D8AAA" font-size="8.5" font-family="var(--spec-num)" text-anchor="end">
                      <text x="24" y="21">{{ facilityStatusChartMax }}</text>
                      <text x="24" y="57">{{ Math.round(facilityStatusChartMax * 2 / 3) }}</text>
                      <text x="24" y="93">{{ Math.round(facilityStatusChartMax / 3) }}</text>
                      <text x="24" y="129">0</text>
                    </g>

                    <g
                      v-for="(item, idx) in facilityStatusChartUnits"
                      :key="item.district"
                      data-chart-group
                    >
                      <rect
                        :x="item.barX[0]"
                        :y="126 - (item.online / facilityStatusChartMax) * 108"
                        :width="currentFacilityUnits.length > 4 ? 7 : 14"
                        :height="(item.online / facilityStatusChartMax) * 108"
                        fill="url(#facilityNormalGrad)"
                        rx="2"
                      >
                        <title>{{ item.district }} 正常站点 {{ item.online }}</title>
                      </rect>

                      <rect
                        :x="item.barX[1]"
                        :y="126 - (item.fault / facilityStatusChartMax) * 108"
                        :width="currentFacilityUnits.length > 4 ? 7 : 14"
                        :height="(item.fault / facilityStatusChartMax) * 108"
                        fill="url(#facilityFaultGrad)"
                        rx="2"
                      >
                        <title>{{ item.district }} 故障站点 {{ item.fault }}</title>
                      </rect>

                      <rect
                        :x="item.barX[2]"
                        :y="126 - (item.offline / facilityStatusChartMax) * 108"
                        :width="currentFacilityUnits.length > 4 ? 7 : 14"
                        :height="(item.offline / facilityStatusChartMax) * 108"
                        fill="url(#facilityOfflineGrad)"
                        rx="2"
                      >
                        <title>{{ item.district }} 停用站点 {{ item.offline }}</title>
                      </rect>

                      <rect
                        :x="item.barX[3]"
                        :y="126 - (item.pending / facilityStatusChartMax) * 108"
                        :width="currentFacilityUnits.length > 4 ? 7 : 14"
                        :height="(item.pending / facilityStatusChartMax) * 108"
                        fill="url(#facilityPendingGrad)"
                        rx="2"
                      >
                        <title>{{ item.district }} 待检定站点 {{ item.pending }}</title>
                      </rect>

                      <text :x="item.centerX" y="139" fill="#DCF2FF" font-size="8.5" text-anchor="middle" font-family="var(--spec-cn)" font-weight="600">{{ item.shortName }}</text>
                      <text :x="item.centerX" y="150" fill="#5D8AAA" font-size="7.5" text-anchor="middle" font-family="var(--spec-num)">总 {{ item.total }}</text>
                    </g>
                  </svg>
                </div>
              </div>

              <!-- 设施运行与在线度简报底栏 -->
              <div class="pt-1.5 border-t border-[rgba(70,180,235,0.16)] flex items-center justify-between text-[10.5px] text-[#8FB6D4] shrink-0 font-spec-cn">
                <span>设施正常率：<span class="text-[#3DDC97] font-bold font-spec-num">{{ meterDeviceSummary.onlineRate }}</span></span>
                <span>统计范围：<span class="text-[#DCF2FF]">{{ currentFacilityUnits.length }} 个管理单位</span></span>
              </div>
            </div>
          </div>

          <!-- ================= 专项 Card 1-B: 计量设施状态监控 ================= -->
          <div class="spec-card rounded-lg p-3 shrink-0 flex flex-col gap-2">
            <div class="flex items-center justify-between pb-1.5">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-[#FFC65C] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path d="M12 3 3 7v5c0 4.2 3.4 7.4 9 9 5.6-1.6 9-4.8 9-9V7l-9-4Z"></path>
                  <path d="M12 8v5"></path>
                  <path d="M12 16h.01"></path>
                </svg>
                <h2 class="text-sm 2xl:text-[15.5px] font-semibold text-[#E4F6FF] tracking-[0.8px]">计量设施状态监控</h2>
              </div>
              <span class="text-[9px] text-[#8FB6D4] font-spec-cn">
                当天事件 · 合计
                <b class="ml-1 text-[#FFC65C] font-spec-num">{{ meterAbnormalStats.reduce((sum, item) => sum + item.count, 0) }}</b>
                条
              </span>
            </div>
            <div class="spec-header-divider mb-0.5"></div>
            <div class="grid grid-cols-4 gap-2">
              <div
                v-for="item in meterAbnormalStats"
                :key="item.key"
                class="rounded-lg border px-2.5 py-2 min-w-0"
                :style="{
                  borderColor: `${item.color}45`,
                  backgroundColor: `${item.color}0E`,
                }"
                :title="item.desc"
              >
                <div class="flex items-center justify-between gap-2">
                  <span class="text-[10px] text-[#8FB6D4] truncate font-spec-cn">{{ item.label }}</span>
                  <span class="text-xl font-bold font-spec-num leading-none shrink-0" :style="{ color: item.color }">{{ item.count }}</span>
                </div>
                <span class="mt-1 block text-[8.5px] text-[#5D8AAA] truncate">{{ item.desc }}</span>
              </div>
            </div>
          </div>

          <!-- ================= 专项 Card 2: 重点取水户概况 ================= -->
          <div
            id="dev-anno-12"
            class="spec-card rounded-lg p-3 flex-1 min-h-0 flex flex-col gap-2 overflow-hidden relative transition-all duration-300"
            :class="{ 'ring-2 ring-[#FFB800] shadow-[0_0_24px_rgba(255,184,0,0.65)]': activeAnnotationId === 12 }"
          >
            <!-- Numbered Point 12 Badge (重点取水户概况 - 证照维度) -->
            <div
              v-if="showAnnotationBadges && scenarioMode === 'special'"
              class="absolute top-1 left-1 z-40 flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-br from-[#FFD043] to-[#FF9F00] text-[#0A1626] font-extrabold text-[10px] shadow-[0_0_12px_rgba(255,184,0,0.95)] border-2 border-white cursor-pointer select-none transition-all duration-300 hover:scale-125"
              :class="{ 'scale-125 ring-4 ring-[#FFB800]/60 animate-bounce': activeAnnotationId === 12 }"
              @mouseenter="activeAnnotationId = 12"
              @mouseleave="activeAnnotationId = null"
              @click="scrollToAnnotation(12)"
              title="开发标注 #12: 重点取水户概况 (按证照统计规上企业)"
            >
              12
            </div>
            <!-- Card Header -->
            <div class="flex items-center justify-between pb-1.5 shrink-0 pl-5">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-[#3FD0FF] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polygon points="12 2 21 7 21 17 12 22 3 17 3 7 12 2" stroke-width="1.8" />
                  <polygon points="12 6 18 9.5 18 14.5 12 18 6 14.5 6 9.5 12 6" stroke-width="1.2" stroke-opacity="0.6" />
                </svg>
                <h2 class="text-sm 2xl:text-[15.5px] font-semibold text-[#E4F6FF] tracking-[0.8px]">重点取水户概况</h2>
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
                <span class="text-[9px] text-[#5D8AAA] block mt-0.5">规上重点取水户</span>
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
                <span class="text-[10px] text-[#8FB6D4] block font-medium">年累计取水</span>
                <div class="flex items-baseline justify-center gap-0.5 mt-0.5">
                  <span class="text-xl font-bold font-spec-num text-[#3FD0FF]">{{ majorUserStats.todayAccumulatedWater }}</span>
                  <span class="text-[10px] text-[#8FB6D4] font-spec-cn">万m³</span>
                </div>
                <span class="text-[9px] text-[#5D8AAA] block mt-0.5">占许可水量 89%</span>
              </div>

              <!-- 4. 今日告警次数 -->
              <div class="bg-rose-950/20 border border-[#FF6B7A]/40 rounded p-2 text-center">
                <span class="text-[10px] text-[#FF6B7A] block font-medium">今日告警次数</span>
                <div class="flex items-baseline justify-center gap-0.5 mt-0.5">
                  <span class="text-xl font-bold font-spec-num text-[#FF6B7A]">{{ majorUserStats.todayAlertCount }}</span>
                  <span class="text-[10px] text-[#FF6B7A] font-spec-cn">次</span>
                </div>
                <span class="text-[9px] text-[#FF6B7A]/80 block mt-0.5">预警取水户3家</span>
              </div>
            </div>

            <!-- 取水量排名列表 (框内独立平滑滚动展示，避免溢出卡片) -->
            <div class="flex-1 flex flex-col gap-1.5 min-h-0">
              <div class="flex items-center justify-between text-xs font-semibold text-[#DCF2FF] shrink-0">
                <span class="flex items-center gap-1">
                  <span class="text-[#3FD0FF] font-bold">|</span>
                  <span>重点取水户取水量排名 (Top 10)</span>
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
                    <span class="shrink-0 text-[10px] text-[#8FB6D4]">累计 {{ user.annualAccumulated }} / 许可 {{ user.annualLicensed }}万m³</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>

      </aside>

      <!-- ================= Central Column: Top 6-Metrics KPI Banner & Unblocked Map Overlay ================= -->
      <div class="flex-1 min-w-0 pointer-events-none relative flex flex-col justify-between items-center pt-5 pb-3 z-30 h-full">
        <!-- 6 Metrics Banner (Above Map) with design spec styling -->
        <div v-if="scenarioMode === 'comprehensive'" class="w-full max-w-5xl px-3 pointer-events-auto">
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
                class="flex flex-col items-center justify-center px-2 py-1 text-center transition-colors"
                :class="item.clickable === false ? 'cursor-default' : 'cursor-pointer group hover:bg-white/5'"
                @click="item.clickable !== false && item.action()"
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
                <div class="text-[11px] font-medium flex items-center justify-center gap-1.5 mt-0.5 text-center whitespace-pre-line leading-tight" :class="item.subClass">
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

        <!-- ================= 地图主控：行政区划 与 年份筛选 (同一排独立排布) ================= -->
        <div
          id="dev-anno-5"
          class="absolute top-40 left-6 pointer-events-auto z-40 transition-all duration-300 flex items-start gap-2.5"
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

          <!-- 1. 行政区划主控 (收起状态 / 展开状态) -->
          <div class="shrink-0">
            <!-- 1.1 收起状态：紧凑胶囊入口 -->
            <div
              v-if="isDistrictPanelCollapsed"
              class="spec-card rounded px-3 py-1.5 shadow-2xl flex items-center gap-2 cursor-pointer hover:border-[#3FD0FF] transition group h-[34px]"
              @click="isDistrictPanelCollapsed = false"
              title="点击展开行政区划与全局搜索"
            >
            <span class="w-2 h-2 rounded-full bg-[#3FD0FF] shadow-[0_0_6px_#3FD0FF]"></span>
            <span class="text-xs font-semibold text-[#DCF2FF] tracking-wide">行政区划</span>
            <span
              class="text-[10px] px-1.5 py-0.5 rounded font-spec-num font-medium border"
                :class="selectedAdministrativeRegion === '西宁市'
                ? 'bg-[#3FD0FF]/15 text-[#9BEAFF] border-[#3FD0FF]/40'
                : 'bg-[#1E7BE8]/25 text-[#DCF2FF] border-[#3FD0FF]/50 font-bold'"
            >
                {{ administrativeSelectionLabel }}
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
                <span class="text-xs font-semibold text-[#E4F6FF] tracking-wide">行政区划</span>
              </div>
              <div class="flex items-center gap-1.5">
                <button
                  v-if="selectedAdministrativeRegion !== '青海省'"
                  type="button"
                  @click="resetMapView"
                  class="text-[10px] text-[#3FD0FF] hover:text-[#9BEAFF] transition cursor-pointer p-0.5"
                  title="重置为全省全域视角"
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

            <!-- Global Unified Search Input (由三级下拉替代，保留检索能力供后续扩展) -->
            <div v-if="false" class="relative">
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
                        :class="getMeterStatusBadgeClass(m.meterStatus)"
                      >
                        {{ getMeterStatusLabel(m.meterStatus) }}
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

            <!-- Province → City → County hierarchy: one horizontal control row -->
            <div class="mt-2 pt-2 border-t border-[#1b4372]/60 grid grid-cols-3 gap-1.5">
              <div class="relative min-w-0">
                <select
                  id="admin-province-select"
                  v-model="selectedAdministrativeProvince"
                  class="dashboard-dark-select w-full h-7 border border-[#3FD0FF]/35 rounded pl-2 pr-5 text-[9.5px] text-[#DCF2FF] focus:outline-none focus:border-[#3FD0FF] cursor-pointer appearance-none transition"
                  aria-label="选择省级行政区"
                >
                  <option value="青海省">青海省</option>
                </select>
                <svg class="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-[#3FD0FF]" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </div>

              <div class="relative min-w-0">
                <select
                  id="admin-city-select"
                  v-model="selectedAdministrativeCity"
                  class="dashboard-dark-select w-full h-7 border border-[#3FD0FF]/35 rounded pl-2 pr-5 text-[9.5px] text-[#DCF2FF] focus:outline-none focus:border-[#3FD0FF] cursor-pointer appearance-none transition"
                  aria-label="选择市州"
                >
                  <option v-for="city in qinghaiCityOptions" :key="city" :value="city">{{ city }}</option>
                </select>
                <svg class="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-[#3FD0FF]" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </div>

              <div class="relative min-w-0">
                <select
                  id="admin-county-select"
                  v-model="selectedAdministrativeCounty"
                  class="dashboard-dark-select w-full h-7 border border-[#3FD0FF]/35 rounded pl-2 pr-5 text-[9.5px] text-[#DCF2FF] focus:outline-none focus:border-[#3FD0FF] cursor-pointer appearance-none transition"
                  aria-label="选择区县"
                >
                  <option value="">全部区县</option>
                  <option v-for="county in administrativeCountyOptions" :key="county" :value="county">{{ county }}</option>
                </select>
                <svg class="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-[#3FD0FF]" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>

            <!-- District Overview Mini Summary (when a district is selected) -->
            <div v-if="filterParams.district !== '西宁市'" class="mt-2 pt-1.5 border-t border-[#1b4372]/40 flex items-center justify-between text-[10px] text-slate-300">
              <span>{{ filterParams.district }} 监控状态:</span>
              <span class="font-mono text-cyan-300 font-bold">{{ filteredMeterPoints.length }} 测站 · {{ currentDistrictUsersCount }} 重点户</span>
            </div>
          </div>
          </div>

          <!-- 2. 年份筛选单独一栏下拉展示 (与行政区划排在同一排) -->
          <div class="spec-card rounded px-3 py-1.5 shadow-2xl flex items-center gap-2 border border-[#1E7BE8]/45 backdrop-blur-md select-none shrink-0 h-[34px]">
            <span class="w-2 h-2 rounded-full bg-[#3FD0FF] shadow-[0_0_6px_#3FD0FF]"></span>
            <span class="text-xs font-semibold text-[#DCF2FF] tracking-wide font-spec-cn">年份</span>
            <div ref="yearFilterRef" class="relative">
              <button
                type="button"
                class="min-w-[76px] h-6  rounded pl-2.5 pr-6 text-[#DCF2FF] text-xs focus:outline-none focus:border-[#3FD0FF] cursor-pointer hover:border-[#3FD0FF]/60 transition font-spec-cn font-medium flex items-center justify-between"
                :aria-expanded="isYearMenuOpen"
                aria-haspopup="listbox"
                @click="isYearMenuOpen = !isYearMenuOpen"
              >
                <span>{{ filterParams.year }}年</span>
                <svg class="w-3 h-3 text-[#3FD0FF] transition-transform" :class="{ 'rotate-180': isYearMenuOpen }" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
              <transition
                enter-active-class="transition duration-150 ease-out"
                enter-from-class="opacity-0 -translate-y-1 scale-[0.98]"
                enter-to-class="opacity-100 translate-y-0 scale-100"
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100 translate-y-0 scale-100"
                leave-to-class="opacity-0 -translate-y-1 scale-[0.98]"
              >
                <div
                  v-if="isYearMenuOpen"
                  class="absolute left-0 top-full mt-1.5 w-[92px] rounded-lg border border-[#3FD0FF]/35 bg-[#06182e]/98 shadow-[0_10px_24px_rgba(0,0,0,0.55)] p-1 z-[90] backdrop-blur-md"
                  role="listbox"
                >
                  <button
                    v-for="year in yearFilterOptions"
                    :key="year"
                    type="button"
                    class="w-full px-2 py-1.5 rounded text-left text-[11px] font-spec-num transition cursor-pointer flex items-center justify-between"
                    :class="filterParams.year === year
                      ? 'bg-[#0D3A63] text-[#9BEAFF] font-bold'
                      : 'text-[#8FB6D4] hover:bg-[#0A2948] hover:text-white'"
                    role="option"
                    :aria-selected="filterParams.year === year"
                    @click="selectYearFilter(year)"
                  >
                    <span>{{ year }}年</span>
                    <span v-if="filterParams.year === year" class="w-1.5 h-1.5 rounded-full bg-[#3FD0FF] shadow-[0_0_5px_#3FD0FF]"></span>
                  </button>
                </div>
              </transition>
            </div>
          </div>
        </div>

        <!-- ================= Floating Map Controls (Top Right of Center Area - 顶部对齐行政区划，统一 top-28) ================= -->
        <div class="absolute top-40 right-4 pointer-events-auto z-30 flex flex-col items-end gap-2">
          <!-- Layer Toolbox (综合场景: 用水户叠加; 专项场景: 计量点 / 计量监控 / 预警事件) -->
          <div class="spec-card flex flex-col rounded-xl p-2.5 shadow-2xl text-xs w-[120px] 2xl:w-[128px]">
            <!-- Header -->
            <div class="px-1 py-0.5 flex items-center justify-between border-b border-[rgba(70,180,235,0.2)] mb-1.5">
              <span class="text-[11px] font-bold text-white tracking-wide font-spec-cn">
                {{ scenarioMode === 'comprehensive' ? '专题图层' : '地图图层' }}
              </span>
              <button
                type="button"
                class="text-[9px] text-[#8FB6D4] hover:text-[#00E5FF] transition cursor-pointer px-1 py-0.5 rounded hover:bg-white/5"
                title="重置全域视角"
                @click="resetMapView"
              >
                重置
              </button>
            </div>

            <!-- A. 综合应用场景：三项专题图层，当前接入图层1 -->
            <template v-if="scenarioMode === 'comprehensive'">
              <div class="flex flex-col gap-1.5">
                <!-- 图层1：审批管控占比 -->
                <button
                  type="button"
                  class="map-layer-tile group relative min-h-[72px] px-1 py-1.5 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all duration-200"
                  :class="activeLayers.approvalRatio
                    ? 'is-active text-amber-50'
                    : 'text-[#8FB6D4] hover:text-white'"
                  :aria-pressed="activeLayers.approvalRatio"
                  @click="toggleApprovalRatioLayer"
                  title="图层1：审批管控占比，按行政区划四档填色"
                >
                  <span class="map-layer-hex-shell">
                    <span class="map-layer-hex">
                      <svg class="w-[18px] h-[18px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z" />
                        <path d="M9 3v15M15 6v15" />
                        <path d="M4.5 8.5 7 9.8l2-1.1" />
                      </svg>
                    </span>
                  </span>
                  <span class="flex flex-col items-center gap-0.5">
                    <span class="text-[10px] leading-none whitespace-nowrap font-medium">审批管控占比</span>
                  </span>
                </button>

                <!-- 图层2：计量超许可 -->
                <button
                  type="button"
                  class="map-layer-tile group relative min-h-[72px] px-1 py-1.5 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all duration-200"
                  :class="activeLayers.meterOver
                    ? 'is-active text-rose-50'
                    : 'text-[#8FB6D4] hover:text-white'"
                  :aria-pressed="activeLayers.meterOver"
                  @click="toggleMeterOverMapLayer"
                  title="图层2：计量超许可点位，悬浮点位查看计量点与证照水量信息"
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
                  <span class="flex flex-col items-center gap-0.5">
                    <span class="text-[10px] leading-none whitespace-nowrap font-medium">计量超许可</span>
                  </span>
                </button>

                <!-- 图层3：三类超计划蓝色透明悬浮标签 -->
                <button
                  type="button"
                  class="map-layer-tile group relative min-h-[72px] px-1 py-1.5 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all duration-200"
                  :class="activeLayers.overPlanLabel
                    ? 'is-active text-sky-50'
                    : 'text-[#8FB6D4] hover:text-white'"
                  :aria-pressed="activeLayers.overPlanLabel"
                  @click="toggleOverPlanLabelLayer"
                  title="图层3：直报、税务、执行三类超计划蓝色透明悬浮标签与明细气泡"
                >
                  <span class="map-layer-hex-shell">
                    <span class="map-layer-hex">
                      <svg class="w-[18px] h-[18px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 7.5 12 3l8 4.5-8 4.5z" />
                        <path d="m4 12 8 4.5 8-4.5M4 16.5 12 21l8-4.5" />
                      </svg>
                    </span>
                  </span>
                  <span class="flex flex-col items-center gap-0.5">
                    <span class="text-[10px] leading-none whitespace-nowrap font-medium">三类超计划</span>
                  </span>
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
                  title="展示西宁全域计量点分布；开启后将关闭其他专项地图图层"
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

                <!-- 2. 计量设施运行状态监控图层 -->
                <button
                  type="button"
                  class="map-layer-tile group relative min-h-[64px] px-1 py-1.5 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-200"
                  :class="activeLayers.meterMonitoring
                    ? 'is-active text-cyan-100'
                    : 'text-[#8FB6D4] hover:text-white'"
                  :aria-pressed="activeLayers.meterMonitoring"
                  @click="toggleMeterMonitoringLayer"
                  title="展示五类计量设施状态；可点击图例筛选单一状态"
                >
                  <span class="map-layer-hex-shell">
                    <span class="map-layer-hex">
                      <svg class="w-[18px] h-[18px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="8.5" />
                        <path d="M12 12l4-3" />
                        <path d="M7.8 16.4h8.4" />
                        <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
                      </svg>
                    </span>
                  </span>
                  <span class="text-[10px] leading-none whitespace-nowrap font-medium">计量监控</span>
                </button>

                <!-- 3. 国控计量点图层 -->
                <button
                  type="button"
                  class="map-layer-tile group relative min-h-[64px] px-1 py-1.5 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-200"
                  :class="activeLayers.nationalControl
                    ? 'is-active text-amber-100'
                    : 'text-[#8FB6D4] hover:text-white'"
                  :aria-pressed="activeLayers.nationalControl"
                  @click="toggleNationalControlLayer"
                  title="展示国控计量点；开启后将关闭其他专项地图图层"
                >
                  <span class="map-layer-hex-shell">
                    <span class="map-layer-hex">
                      <svg class="w-[18px] h-[18px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 3 21 8l-9 5-9-5z" />
                        <path d="M5 10.5V16l7 4 7-4v-5.5" />
                        <circle cx="12" cy="8" r="1.3" fill="currentColor" stroke="none" />
                      </svg>
                    </span>
                  </span>
                  <span class="text-[10px] leading-none whitespace-nowrap font-medium">国控计量点</span>
                </button>

                <!-- 4. 预警事件图层 -->
                <button
                  type="button"
                  class="map-layer-tile group relative min-h-[64px] px-1 py-1.5 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-200"
                  :class="activeLayers.warnings
                    ? 'is-active text-rose-100'
                    : 'text-[#8FB6D4] hover:text-white'"
                  :aria-pressed="activeLayers.warnings"
                  @click="toggleWarningLayer"
                  title="展示预警事件点位；开启后将关闭其他专项地图图层"
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
        <div
          v-if="scenarioMode !== 'special' || hasActiveSpecialMapLayer"
          data-map-legend
          class="map-legend-filter absolute bottom-16 left-6 pointer-events-auto z-30"
        >
          <div
            class="spec-card rounded-xl p-2.5 shadow-2xl transition-all duration-200"
            :class="scenarioMode === 'comprehensive'
              ? 'w-[218px] min-w-[218px] max-w-[218px]'
              : 'min-w-[260px] max-w-[290px]'"
          >
            <!-- Legend Header -->
            <div class="flex items-center justify-between gap-3 pb-1.5 border-b border-[rgba(70,180,235,0.2)]">
              <div class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-[#3FD0FF] shrink-0" viewBox="0 0 16 16" fill="none">
                  <polygon points="8,1 15,4.5 15,11.5 8,15 1,11.5 1,4.5" stroke="#3FD0FF" stroke-width="1.2" fill="none" />
                  <circle cx="8" cy="8" r="2" fill="#3FD0FF" />
                </svg>
                <span data-legend-title class="text-xs font-bold text-white tracking-wide font-spec-cn">
                  {{ mapLegendTitle }}
                </span>
              </div>
              <div class="flex items-center gap-2">
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

              <!-- A. 综合应用场景：图层1审批管控占比四档图例 -->
              <template v-if="scenarioMode === 'comprehensive'">
                <div v-if="activeLayers.approvalRatio" class="w-full min-w-0">
                  <div class="flex items-center justify-between gap-2">
                    <div class="flex items-center gap-1.5">
                      <span class="w-1 h-3 rounded-full bg-[#FFC65C]"></span>
                      <span class="text-[11px] font-bold text-[#E4F6FF] font-spec-cn">审批管控占比</span>
                    </div>
                    <button
                      type="button"
                      class="text-[9px] text-[#9BEAFF] hover:text-white cursor-pointer font-medium transition"
                      @click.stop="showWaterQuotaModal = true"
                    >
                      比对管控
                    </button>
                  </div>

                  <div class="mt-1.5 flex flex-col gap-1">
                    <div
                      v-for="level in approvalControlLevels"
                      :key="level.id"
                      class="flex items-center gap-2.5 py-0.5"
                    >
                      <span
                        class="w-4 h-3.5 rounded-sm shrink-0 shadow-[0_0_6px_rgba(255,255,255,0.12)]"
                        :style="{ backgroundColor: level.color, borderColor: level.strokeColor }"
                      ></span>
                      <span class="text-[12px] leading-tight font-bold" :style="{ color: level.strokeColor }">{{ level.label }}</span>
                    </div>
                  </div>
                </div>

                <div
                  v-if="activeLayers.meterOver"
                  class="w-full min-w-0 pt-2 mt-2 border-t border-[rgba(70,180,235,0.18)]"
                >
                  <div class="flex items-center justify-between gap-2">
                    <div class="flex items-center gap-1.5">
                      <span class="w-1 h-3 rounded-full bg-[#FF6B7A]"></span>
                      <span class="text-[11px] font-bold text-[#E4F6FF] font-spec-cn">计量超许可点位</span>
                    </div>
                  </div>

                  <div class="mt-1.5 flex items-center gap-2.5">
                    <span class="relative w-7 h-7 flex items-center justify-center shrink-0">
                      <span class="absolute w-6 h-6 rounded-full border border-[#FF6B7A]/55 meter-legend-wave"></span>
                      <span class="relative w-3 h-3 rounded-full bg-[#FF6B7A] border border-white shadow-[0_0_8px_rgba(255,107,122,0.85)]"></span>
                    </span>
                    <span class="text-[12px] leading-tight text-[#FFD0D5] font-bold">告警点位</span>
                    <span class="ml-auto shrink-0 text-base leading-none font-bold font-spec-num text-[#FF8A8A]">
                      {{ licenseWarningMarkers.filter(item => item.typeId === 'meterOver').length }}
                      <span class="ml-0.5 text-[10px] text-[#C47B85]">处</span>
                    </span>
                  </div>
                </div>

                <div
                  v-if="activeLayers.overPlanLabel"
                  class="w-full min-w-0 pt-2 mt-2 border-t border-[rgba(70,180,235,0.18)]"
                >
                  <div class="flex items-center justify-between gap-2">
                    <div class="flex items-center gap-1.5">
                      <span class="w-1 h-3 rounded-full bg-[#9BEAFF]"></span>
                      <span class="text-[11px] font-bold text-[#E4F6FF] font-spec-cn">三类超计划悬浮标签</span>
                    </div>
                  </div>
                  <div class="mt-1.5 flex flex-col gap-1">
                    <div
                      v-for="group in overPlanWarningGroups"
                      :key="`legend-${group.typeId}`"
                      class="flex items-center gap-2.5 py-0.5"
                    >
                      <span class="w-3 h-3 rounded-sm bg-[#9BEAFF] shadow-[0_0_6px_rgba(155,234,255,0.72)] shrink-0"></span>
                      <span class="text-[12px] leading-tight font-bold text-[#D7F7FF]">{{ group.label }}</span>
                      <span class="ml-auto text-base leading-none font-bold font-spec-num text-white">{{ group.items.length }}</span>
                    </div>
                  </div>
                </div>

                <div
                  v-if="!activeLayers.approvalRatio && !activeLayers.meterOver && !activeLayers.overPlanLabel"
                  class="w-full min-w-0 py-2 text-center text-[9.5px] text-[#5D8AAA] font-spec-cn"
                >
                  暂未开启专题图层
                </div>
              </template>

              <!-- B. 专项业务应用场景：当前图层对应图例，统一纵向展示 -->
              <template v-else>
                <!-- 1. 计量点图层 -->
                <template v-if="activeLayers.meters">
                  <div class="text-[11px] font-semibold text-slate-300 mb-1.5 font-spec-cn flex items-center justify-between">
                    <div class="flex items-center gap-1.5">
                      <span class="w-1.5 h-1.5 rounded-full bg-[#00E5FF]"></span>
                      <span>计量点运行状态</span>
                    </div>
                    <span class="text-[10px] text-[#5D8AAA] font-spec-num">{{ districtMeterPoints.length }}处</span>
                  </div>
                  <div class="space-y-1">
                    <button
                      v-for="item in meterPointLegendItems"
                      :key="item.key"
                      type="button"
                      class="w-full min-h-7 px-2 flex items-center gap-2 rounded border text-left transition cursor-pointer"
                      :class="meterStatusFilter === item.status
                        ? 'border-[rgba(63,208,255,0.52)] bg-[rgba(30,123,232,0.22)]'
                        : 'border-transparent bg-[rgba(10,36,58,0.42)] hover:bg-[rgba(30,123,232,0.12)]'"
                      @click="meterStatusFilter = meterStatusFilter === item.status ? 'all' : item.status"
                    >
                      <span
                        class="shrink-0 shadow-[0_0_6px_rgba(255,255,255,0.2)]"
                        :class="item.iconClass"
                        :style="{ backgroundColor: item.color, borderColor: item.borderColor }"
                      ></span>
                      <span class="text-[11px] text-[#DCF2FF]">{{ item.label }}</span>
                      <span class="ml-auto text-[12px] font-bold font-spec-num" :style="{ color: item.color }">{{ item.value }}</span>
                    </button>
                  </div>
                </template>

                <!-- 2. 计量监控图层 -->
                <template v-else-if="activeLayers.meterMonitoring">
                  <div class="text-[11px] font-semibold text-slate-300 mb-1.5 font-spec-cn flex items-center justify-between">
                    <div class="flex items-center gap-1.5">
                      <span class="w-1.5 h-1.5 rounded-full bg-[#3FD0FF]"></span>
                      <span>计量设施状态</span>
                    </div>
                    <span class="text-[10px] text-[#5D8AAA] font-spec-cn">当前区划</span>
                  </div>
                  <div class="space-y-1">
                    <button
                      v-for="item in meterMonitoringLegendItems"
                      :key="item.key"
                      type="button"
                      class="w-full flex items-center gap-2 min-h-7 px-2 rounded border text-left transition cursor-pointer"
                      :class="monitoringStatusFilter === item.filter
                        ? 'border-[rgba(63,208,255,0.65)] bg-[rgba(30,123,232,0.24)] shadow-[0_0_8px_rgba(63,208,255,0.12)]'
                        : 'border-transparent bg-[rgba(10,36,58,0.42)] hover:border-[rgba(63,208,255,0.3)] hover:bg-[rgba(30,123,232,0.14)]'"
                      :aria-pressed="monitoringStatusFilter === item.filter"
                      :title="item.filter === 'all' ? '展示全部计量点' : `仅展示${item.label}`"
                      @click="selectMeterMonitoringStatus(item.filter)"
                    >
                      <span
                        class="shrink-0"
                        :class="item.iconClass"
                        :style="{ backgroundColor: item.color, borderColor: item.borderColor }"
                      ></span>
                      <span class="text-[11px] font-medium text-[#DCF2FF]">{{ item.label }}</span>
                      <span class="ml-auto text-[12px] font-bold font-spec-num" :style="{ color: item.color }">
                        {{ item.value }}
                        <span class="text-[8px] font-normal text-[#5D8AAA]">处</span>
                      </span>
                    </button>
                  </div>
                </template>

                <!-- 3. 国控计量点图层 -->
                <template v-else-if="activeLayers.nationalControl">
                  <div class="text-[11px] font-semibold text-slate-300 mb-1.5 font-spec-cn flex items-center justify-between">
                    <div class="flex items-center gap-1.5">
                      <span class="w-2 h-2 rotate-45 border border-[#FFD043] bg-[#FFD043]/20 shadow-[0_0_6px_rgba(255,208,67,0.55)]"></span>
                      <span>国控计量点</span>
                    </div>
                    <span class="text-[10px] text-[#FFD88C] font-spec-num">{{ nationalControlMeterPoints.length }}处</span>
                  </div>
                  <div class="space-y-1">
                    <div
                      v-for="item in nationalControlLegendItems"
                      :key="item.key"
                      class="min-h-7 px-2 flex items-center gap-2 rounded bg-[rgba(10,36,58,0.42)] border border-transparent"
                    >
                      <span
                        class="shrink-0"
                        :class="item.iconClass"
                        :style="{ backgroundColor: item.color, borderColor: item.borderColor }"
                      ></span>
                      <span class="text-[11px] text-[#DCF2FF]">{{ item.label }}</span>
                      <span class="ml-auto text-[12px] font-bold font-spec-num" :style="{ color: item.color }">{{ item.value }}</span>
                    </div>
                  </div>
                </template>

                <!-- 4. 预警事件图层 -->
                <template v-else-if="activeLayers.warnings">
                  <div class="text-[11px] font-semibold text-slate-300 mb-1.5 font-spec-cn flex items-center justify-between">
                    <div class="flex items-center gap-1.5">
                      <span class="w-1.5 h-1.5 rounded-full bg-[#ef4444]"></span>
                      <span>预警事件</span>
                    </div>
                    <span class="text-[10px] text-[#5D8AAA] font-spec-num">{{ warningEventsList.length }}起</span>
                  </div>
                  <div class="space-y-1">
                    <div
                      v-for="item in warningLegendItems"
                      :key="item.key"
                      class="min-h-7 px-2 flex items-center gap-2 rounded bg-[rgba(10,36,58,0.42)] border border-transparent"
                    >
                      <span class="w-2.5 h-2.5 rounded-full border border-white/65 shrink-0" :style="{ backgroundColor: item.color, boxShadow: `0 0 6px ${item.color}` }"></span>
                      <span class="text-[11px] text-[#DCF2FF]">{{ item.label }}</span>
                      <span class="ml-auto text-[12px] font-bold font-spec-num" :style="{ color: item.color }">{{ item.value }}</span>
                    </div>
                  </div>
                </template>
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
          class="spec-card p-3.5 flex-1 min-h-[310px] flex flex-col justify-between relative transition-all duration-300"
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

          <!-- 5 Warning Type Badges (审批 / 计量 / 直报 / 税务 / 执行) -->
          <div class="grid grid-cols-5 gap-1.5 my-2">
            <button
              v-for="alert in warningTypeCards"
              :key="alert.label"
              type="button"
              class="relative overflow-hidden border rounded-lg py-1.5 pl-2 pr-1 text-left transition-all cursor-pointer group"
              :class="selectedWarningType === alert.label
                ? 'bg-white/[0.09]'
                : 'bg-[rgba(10,36,58,0.55)] hover:bg-white/5'"
              :style="{
                borderColor: selectedWarningType === alert.label ? alert.color : alert.borderColor,
                boxShadow: selectedWarningType === alert.label
                  ? `inset 0 0 0 1px ${alert.color}55, 0 0 12px ${alert.color}22`
                  : 'none'
              }"
              :title="getWarningTypeCardTitle(alert)"
              :aria-pressed="selectedWarningType === alert.label"
              @click.stop="toggleWarningTypeFilter(alert.label)"
            >
              <div class="h-[26px] flex items-center text-[10px] leading-[1.2] text-slate-200 font-spec-cn">{{ alert.label }}</div>
              <div class="text-lg leading-6 font-bold font-spec-num text-[#3FD0FF]">{{ alert.count }}</div>
              <div class="text-[8.5px] leading-tight truncate font-spec-cn">
                <span class="text-[#8FB6D4]">
                  {{ alert.dimensionLabel === '证照' ? '证照' : '区划' }}
                </span>
                <span class="text-[#5D8AAA]"> · {{ alert.rule }}</span>
              </div>
            </button>
          </div>

          <!-- Table: 预警事项列表 (Improved readability) -->
          <div class="flex-1 min-h-[95px] max-h-[148px] mt-1 overflow-auto custom-dark-scrollbar">
            <div class="text-xs font-bold text-white mb-1.5 flex items-center justify-between gap-2 font-spec-cn">
              <div class="flex items-center gap-1.5 min-w-0">
                <span class="text-[#00E5FF] font-bold">|</span>
                <span class="truncate">实时预警事项列表</span>
                <span class="text-[9px] font-normal text-[#5D8AAA] shrink-0">{{ selectedWarningType ?? '全部类型' }}</span>
              </div>
              <button
                v-if="selectedWarningType"
                type="button"
                class="text-[9px] font-normal text-[#8FB6D4] hover:text-white transition-colors cursor-pointer shrink-0"
                title="清除预警类型筛选"
                @click="clearWarningTypeFilter"
              >
                查看全部 ×
              </button>
            </div>
            <table class="w-full min-w-[365px] text-[9.5px] text-left">
              <thead>
                <tr class="sticky top-0 z-10 text-[#5D8AAA] border-b border-[rgba(70,180,235,0.2)] bg-[#0A243A]">
                  <th class="w-[54px] py-1 px-1 font-medium font-spec-cn">预警类型</th>
                  <th class="py-1 px-1 font-medium font-spec-cn">统计对象</th>
                  <th class="w-[56px] py-1 px-1 text-right font-medium font-spec-cn">当前值</th>
                  <th class="w-[46px] py-1 px-1 text-right font-medium font-spec-cn">占限额比</th>
                  <th class="w-[52px] py-1 px-1 text-right font-medium font-spec-cn">预警时间</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[rgba(70,180,235,0.12)] divide-dashed font-spec-num text-slate-300">
                <tr
                  v-for="row in filteredWarningTableRows"
                  :key="row.id"
                >
                  <td class="py-1 px-1 font-spec-cn font-medium leading-tight" :style="{ color: getWarningTypeColor(row.type) }">{{ row.type }}</td>
                  <td class="py-1 px-1 font-spec-cn min-w-0">
                    <div class="max-w-[104px] truncate text-[9.5px] text-[#DCF2FF]" :title="row.objectName">{{ row.objectName }}</div>
                    <div class="mt-0.5 max-w-[118px] truncate text-[7.5px]" :title="`${row.district} · ${row.licenseNo || '行政区划统计'}`">
                      <span :style="{ color: row.dimensionLabel === '证照' ? '#7DD3FC' : '#FFC65C' }">{{ row.dimensionLabel }}</span>
                      <span class="text-[#5D8AAA]"> · {{ row.licenseNo || `${row.district}行政区划` }}</span>
                    </div>
                  </td>
                  <td class="py-1 px-1 text-right">{{ row.currentValue }}</td>
                  <td class="py-1 px-1 text-right font-bold text-[#DCF2FF]">{{ row.indicatorRate }}</td>
                  <td class="py-1 px-1 text-right text-[#5D8AAA] font-spec-cn">{{ row.time }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- ================= Right Box 2: 业务关联研判 ================= -->
        <div
          id="dev-anno-9"
          class="spec-card p-3.5 flex-1 min-h-[300px] flex flex-col justify-between relative transition-all duration-300"
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

          <!-- 数据治理三联视图：证照治理 / 档案完整度 / 名录治理 -->
          <div class="flex-1 flex flex-col gap-2.5 my-1">
            <div class="grid grid-cols-2 gap-2">
              <!-- 1. 证照数据治理 -->
              <div class="license-governance-card rounded-lg border border-[rgba(70,180,235,0.2)] p-2 flex flex-col overflow-hidden">
                <div class="flex items-center justify-between gap-1">
                  <div class="flex items-center gap-1.5 min-w-0">
                    <span class="w-1 h-3 rounded-sm bg-[#00E5FF] shadow-[0_0_6px_#00E5FF] shrink-0"></span>
                    <span class="text-[11px] font-bold text-white font-spec-cn truncate">证照数据治理</span>
                  </div>
                  <span class="text-[9px] text-[#5D8AAA] font-spec-num shrink-0">{{ licenseGovernanceStats.total }}件</span>
                </div>

                <div class="flex flex-1 flex-col items-center justify-center pt-1">
                  <div
                    class="relative w-[66px] h-[66px] shrink-0"
                    :title="`证照治理完成率 ${licenseGovernanceStats.completionRate}，已完成 ${licenseGovernanceStats.completed} 件，共 ${licenseGovernanceStats.total} 件`"
                  >
                    <svg viewBox="0 0 96 96" class="w-full h-full overflow-visible" :aria-label="`证照治理完成率 ${licenseGovernanceStats.completionRate}`">
                      <defs>
                        <linearGradient id="licenseGovernanceRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stop-color="#00E5FF" />
                          <stop offset="55%" stop-color="#3FD0FF" />
                          <stop offset="100%" stop-color="#3DDC97" />
                        </linearGradient>
                      </defs>
                      <circle
                        cx="48"
                        cy="48"
                        r="45"
                        fill="none"
                        stroke="#3FD0FF"
                        stroke-opacity="0.2"
                        stroke-width="1"
                        stroke-dasharray="2 5"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="37"
                        fill="none"
                        stroke="rgba(61,220,151,0.13)"
                        stroke-width="7"
                      />
                      <circle
                        class="license-governance-ring-progress"
                        cx="48"
                        cy="48"
                        r="37"
                        fill="none"
                        stroke="url(#licenseGovernanceRingGradient)"
                        stroke-width="7"
                        stroke-linecap="round"
                        transform="rotate(-90 48 48)"
                        :style="{
                          '--license-ring-circumference': licenseGovernanceRing.circumference,
                          '--license-ring-offset': licenseGovernanceRing.offset
                        }"
                      />
                    </svg>
                    <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span class="text-[15px] leading-none font-bold font-spec-num text-[#E9FFF8]">{{ licenseGovernanceStats.completionRate }}</span>
                      <span class="mt-1 text-[7.5px] leading-none text-[#8FB6D4] font-spec-cn">治理完成率</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  class="license-governance-issue mt-1.5 w-full rounded-md border border-[rgba(255,198,92,0.3)] px-2 py-1 text-left transition-all hover:border-[rgba(255,198,92,0.7)] cursor-pointer group"
                  title="查看证照疑似问题明细"
                  :aria-label="`查看疑似存在的问题明细，${licenseGovernanceStats.issueCount} 件待整改`"
                  @click="openLicenseIssueDetail"
                >
                  <div class="flex items-center justify-between gap-1">
                    <div class="flex items-baseline gap-1 min-w-0">
                      <span class="text-[9px] text-[#B7D7EB] font-spec-cn truncate">疑似存在的问题</span>
                      <span class="text-base leading-5 font-bold font-spec-num text-[#FFC65C]">{{ licenseGovernanceStats.issueCount }}</span>
                      <span class="text-[8px] text-[#FFC65C]/75 font-spec-cn">件</span>
                    </div>
                    <span class="text-[8px] text-[#FFC65C] font-spec-cn flex items-center gap-0.5">
                      <span>待整改</span>
                      <span class="transition-transform group-hover:translate-x-0.5">&gt;</span>
                    </span>
                  </div>
                </button>
              </div>

              <!-- 2. 档案完整度 -->
              <div class="rounded-lg border border-[rgba(70,180,235,0.2)] bg-[rgba(10,36,58,0.45)] p-2.5 flex flex-col">
                <div class="flex items-center justify-between gap-1">
                  <div class="flex items-center gap-1.5 min-w-0">
                    <span class="w-1 h-3 rounded-sm bg-[#38BDF8] shadow-[0_0_6px_#38BDF8] shrink-0"></span>
                    <span class="text-[11px] font-bold text-white font-spec-cn truncate">档案完整度</span>
                  </div>
                  <span class="text-[9px] text-[#5D8AAA] font-spec-cn shrink-0">共{{ archiveCompletenessTotal.toLocaleString() }}证</span>
                </div>
                <div class="grid grid-cols-2 gap-1 mt-2 flex-1">
                  <div
                    v-for="level in archiveCompletenessLevels"
                    :key="level.label"
                    class="min-w-0 rounded bg-[rgba(6,26,46,0.6)] border border-[rgba(70,180,235,0.14)] px-1.5 py-1 flex items-center justify-between gap-1"
                  >
                    <div class="flex items-center gap-1 shrink-0">
                      <span class="w-1.5 h-1.5 rounded-full shrink-0" :style="{ background: level.color }"></span>
                      <span class="text-[10px] font-spec-cn" :style="{ color: level.color }">{{ level.label }}</span>
                    </div>
                    <div class="text-right leading-tight min-w-0">
                      <div class="text-[12px] font-bold font-spec-num" :style="{ color: level.color }">{{ level.count.toLocaleString() }}</div>
                      <div class="text-[8.5px] text-[#5D8AAA] font-spec-num">{{ level.rate }}</div>
                    </div>
                  </div>
                </div>
                <div class="flex h-1 rounded-full overflow-hidden mt-2 bg-[rgba(6,26,46,0.8)]">
                  <div
                    v-for="level in archiveCompletenessLevels"
                    :key="`bar-${level.label}`"
                    class="h-full"
                    :style="{ width: level.rate, background: level.color }"
                  ></div>
                </div>
              </div>
            </div>

            <!-- 3. 名录数据治理 -->
            <div class="rounded-lg border border-[rgba(70,180,235,0.2)] bg-[rgba(10,36,58,0.45)] p-2.5">
              <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-1.5 min-w-0">
                  <span class="w-1 h-3 rounded-sm bg-[#A78BFA] shadow-[0_0_6px_#A78BFA] shrink-0"></span>
                  <span class="text-[11px] font-bold text-white font-spec-cn truncate">名录数据治理</span>
                </div>
                <span class="text-[9.5px] text-[#5D8AAA] font-spec-cn shrink-0">问题 {{ directoryIssueTotal }} 条</span>
              </div>
              <div class="grid grid-cols-4 gap-1.5 mt-2">
                <button
                  v-for="category in directoryIssueCategories"
                  :key="category.key"
                  type="button"
                  class="min-w-0 rounded-md bg-[rgba(6,26,46,0.6)] border border-[rgba(70,180,235,0.14)] px-1.5 py-1.5 text-left transition-colors hover:bg-white/5 hover:border-[rgba(70,180,235,0.35)] cursor-pointer group"
                  :title="`${category.label}（${category.desc}）：${directoryIssueCounts[category.key]} 条，查看问题明细`"
                  @click="openDirectoryIssueDetail(category.key)"
                >
                  <div class="flex items-center gap-1 min-w-0">
                    <span class="text-[9.5px] text-slate-200 truncate font-spec-cn group-hover:text-white transition-colors">{{ category.label }}</span>
                  </div>
                  <div class="flex items-end justify-between gap-1 mt-0.5">
                    <span class="text-[8.5px] text-[#5D8AAA] truncate font-spec-cn">{{ category.desc }}</span>
                    <span class="text-sm leading-4 font-bold font-spec-num shrink-0 text-[#3FD0FF]">{{ directoryIssueCounts[category.key] }}</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- ================= Right Box 3: 计量点接入与到报率监控 ================= -->
        <div
          id="dev-anno-10"
          class="spec-card p-3.5 flex-1 min-h-[300px] flex flex-col justify-between relative transition-all duration-300"
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
            title="开发标注 #10: 计量点接入、到报与异常率监控 (右3)"
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

          <!-- 3 Meter Category Stats: 前两类展示接入率、到报率和异常率，中央发展资金不展示异常率 -->
          <div class="grid grid-cols-3 gap-1.5 text-center text-xs my-1.5">
            <div
              v-for="category in meterMonitorCategories"
              :key="category.key"
              class="min-w-0 bg-[rgba(10,36,58,0.55)] border border-[rgba(70,180,235,0.2)] rounded-lg px-1.5 py-1"
            >
              <div class="text-[11px] text-slate-300 font-medium mb-1 font-spec-cn truncate flex items-center justify-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full shrink-0" :style="{ backgroundColor: category.accent }"></span>
                <span>{{ category.label }}</span>
              </div>
              <div class="grid grid-cols-2 gap-0.5 font-spec-num">
                <div>
                  <span class="text-[9px] text-[#5D8AAA] block font-spec-cn">接入率</span>
                  <span class="font-bold text-[#38BDF8] text-[13px] leading-4">{{ category.accessRate }}%</span>
                </div>
                <div class="border-l border-[rgba(70,180,235,0.2)]">
                  <span class="text-[9px] text-[#5D8AAA] block font-spec-cn">到报率</span>
                  <span class="font-bold text-[#3DDC97] text-[13px] leading-4">{{ category.reportRate }}%</span>
                </div>
              </div>
              <div
                v-if="category.showAnomalyRate"
                class="mt-1 pt-1 border-t border-[rgba(70,180,235,0.16)] flex items-center justify-between gap-1"
              >
                <span class="text-[9px] text-[#5D8AAA] font-spec-cn">异常率</span>
                <span class="font-bold text-[#FF8A8A] text-[13px] leading-4 font-spec-num">{{ category.anomalyRate }}%</span>
              </div>
            </div>
          </div>

          <!-- Dual-axis monthly trend: report rate (left) and anomaly rate (right) -->
          <div class="pt-1.5 border-t border-[rgba(70,180,235,0.2)] flex-1 flex flex-col">
            <div class="flex items-center justify-between gap-2 mb-1.5">
              <div class="flex items-center gap-1.5 min-w-0">
                <span class="text-[#00E5FF] font-bold">|</span>
                <span class="text-xs font-bold text-white whitespace-nowrap font-spec-cn">计量点到报率与异常率月度趋势</span>
              </div>
              <div class="flex items-center gap-2 shrink-0 text-[8.5px] text-slate-300">
                <span v-for="category in meterMonitorCategories" :key="`legend-${category.key}`" class="flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full" :style="{ backgroundColor: category.accent }"></span>
                  <span class="font-spec-cn">{{ category.shortLabel }}</span>
                </span>
              </div>
            </div>

            <div class="flex items-center justify-between gap-2 text-[8px] leading-none mb-1">
              <span class="text-[#3DDC97] flex items-center gap-1">
                <svg class="w-3 h-1.5" viewBox="0 0 12 6" aria-hidden="true">
                  <line x1="1" y1="3" x2="11" y2="3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                </svg>
                左轴 到报率 (%) · 正向指标
              </span>
              <span class="text-[#FF8A8A] flex items-center gap-1">
                右轴 异常率 (%) · 负向指标
                <svg class="w-3 h-1.5" viewBox="0 0 12 6" aria-hidden="true">
                  <line x1="1" y1="3" x2="11" y2="3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="3 2" />
                </svg>
              </span>
            </div>

            <div class="flex-1 min-h-[118px] rounded-md border border-[rgba(70,180,235,0.16)] bg-[rgba(5,20,38,0.5)] px-1 pt-1">
              <svg
                viewBox="0 0 400 150"
                class="w-full h-full min-h-[112px] overflow-visible"
                role="img"
                aria-label="规模以上农业、规模以上非农、中央发展资金三类计量点到报率及前两类异常率月度趋势双轴折线图"
              >
                <g>
                  <line
                    v-for="tick in meterTrendChart.yTicks"
                    :key="`grid-${tick.value}`"
                    :x1="meterTrendChart.plotLeft"
                    :x2="meterTrendChart.plotRight"
                    :y1="tick.y"
                    :y2="tick.y"
                    stroke="rgba(70,180,235,0.14)"
                    stroke-width="0.75"
                    :stroke-dasharray="tick.value === 50 ? '3 3' : undefined"
                  />
                </g>

                <line
                  :x1="meterTrendChart.plotLeft"
                  :x2="meterTrendChart.plotLeft"
                  :y1="meterTrendChart.plotTop"
                  :y2="meterTrendChart.plotBottom"
                  stroke="rgba(61,220,151,0.55)"
                  stroke-width="0.9"
                />
                <line
                  :x1="meterTrendChart.plotRight"
                  :x2="meterTrendChart.plotRight"
                  :y1="meterTrendChart.plotTop"
                  :y2="meterTrendChart.plotBottom"
                  stroke="rgba(255,138,138,0.55)"
                  stroke-width="0.9"
                />
                <line
                  :x1="meterTrendChart.plotLeft"
                  :x2="meterTrendChart.plotRight"
                  :y1="meterTrendChart.plotBottom"
                  :y2="meterTrendChart.plotBottom"
                  stroke="rgba(70,180,235,0.3)"
                  stroke-width="0.9"
                />

                <g font-family="var(--spec-num)" font-size="8">
                  <text
                    v-for="tick in meterTrendChart.yTicks"
                    :key="`left-${tick.value}`"
                    :x="meterTrendChart.plotLeft - 4"
                    :y="tick.y + 2.5"
                    text-anchor="end"
                    fill="#6FA2BF"
                  >
                    {{ tick.value }}
                  </text>
                  <text
                    v-for="tick in meterTrendChart.yTicks"
                    :key="`right-${tick.value}`"
                    :x="meterTrendChart.plotRight + 4"
                    :y="tick.y + 2.5"
                    text-anchor="start"
                    fill="#9B7D85"
                  >
                    {{ tick.value }}
                  </text>
                </g>

                <g v-for="series in meterTrendChart.series" :key="series.id">
                  <polyline
                    :points="series.points"
                    fill="none"
                    :stroke="series.color"
                    :stroke-width="series.metric === 'report' ? 1.9 : 1.55"
                    :stroke-dasharray="series.metric === 'anomaly' ? '4 3' : undefined"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    :opacity="series.metric === 'anomaly' ? 0.9 : 1"
                  />
                  <circle
                    v-for="point in series.pointList"
                    :key="`${series.id}-${point.month}`"
                    :cx="point.x"
                    :cy="point.y"
                    r="1.55"
                    :fill="series.color"
                    stroke="#06152B"
                    stroke-width="0.75"
                  >
                    <title>{{ series.categoryLabel }} · {{ point.month }} · {{ series.metricLabel }} {{ point.value.toFixed(2) }}%</title>
                  </circle>
                </g>

                <g font-family="var(--spec-cn)" font-size="8.5" fill="#6FA2BF">
                  <text
                    v-for="tick in meterTrendChart.xTicks"
                    :key="`month-${tick.label}`"
                    :x="tick.x"
                    y="145"
                    text-anchor="middle"
                  >
                    {{ tick.label }}
                  </text>
                </g>

                <g font-family="var(--spec-cn)" font-size="8" font-weight="600">
                  <text :x="meterTrendChart.plotLeft - 25" y="9" fill="#3DDC97">到报率/%</text>
                  <text :x="meterTrendChart.plotRight + 25" y="9" text-anchor="end" fill="#FF8A8A">异常率/%</text>
                </g>
              </svg>
            </div>

            <div class="mt-1 flex items-center justify-center gap-3 text-[8.5px] text-[#8FB6D4]">
              <span class="flex items-center gap-1">
                <svg class="w-4 h-1.5" viewBox="0 0 16 6" aria-hidden="true">
                  <line x1="1" y1="3" x2="15" y2="3" stroke="#8FB6D4" stroke-width="1.6" stroke-linecap="round" />
                </svg>
                实线：到报率
              </span>
              <span class="flex items-center gap-1">
                <svg class="w-4 h-1.5" viewBox="0 0 16 6" aria-hidden="true">
                  <line x1="1" y1="3" x2="15" y2="3" stroke="#8FB6D4" stroke-width="1.6" stroke-linecap="round" stroke-dasharray="4 2.5" />
                </svg>
                虚线：异常率
              </span>
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
                  <span class="text-white">运维单位能效排名</span>
                  <span class="text-[9.5px] text-[#5D8AAA] font-normal font-spec-cn">区域滚动展示</span>
                </div>
                <div class="text-[10px] text-[#5D8AAA] font-spec-num">
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
                      <!-- 能效得分 -->
                      <div class="flex items-center gap-1 min-w-[58px] justify-end">
                        <span class="font-bold text-sm" :class="team.rank <= 2 ? 'text-[#00E5FF]' : team.rank === 3 ? 'text-[#FFC65C]' : 'text-[#38BDF8]'">
                          {{ team.score }}
                        </span>
                        <span class="text-[10px] text-[#5D8AAA] font-spec-cn">%</span>
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
                    <span class="text-slate-300">计量水量</span>
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
                    <span class="text-slate-300">许可水量</span>
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
                <span class="text-[10px] text-[#5D8AAA]">框内滚动</span>
              </div>

              <!-- Difference Table (Scrollable within container) -->
              <div class="max-h-[140px] 2xl:max-h-[185px] overflow-y-auto overflow-x-auto custom-dark-scrollbar rounded bg-[rgba(6,26,46,0.6)] border border-[rgba(70,180,235,0.2)]">
                <table class="w-full text-xs text-left">
                  <thead class="sticky top-0 z-10 bg-[#071F38] shadow-xs">
                    <tr class="text-[#5D8AAA] border-b border-[rgba(70,180,235,0.25)] text-[10px]">
                      <th class="py-1 px-1.5 font-medium font-spec-cn bg-[#071F38]">分析对象</th>
                      <th class="py-1 px-1 text-right font-medium font-spec-cn bg-[#071F38]">当前计量(万m³)</th>
                      <th class="py-1 px-1 text-right font-medium font-spec-cn bg-[#071F38]">同期均值/偏差</th>
                      <th class="py-1 px-1 text-right font-medium font-spec-cn bg-[#071F38]">当月计划</th>
                      <th class="py-1 px-1 text-right font-medium font-spec-cn bg-[#071F38]">许可水量</th>
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
                  水量对比偏差总量<span class="text-white font-bold font-spec-num">{{ reviewTaskList.length }}</span> 件
                </span>
              </div>
              <button
                type="button"
                @click="showReviewTaskModal = true"
                class="text-[11px] text-[#00E5FF] hover:text-[#79D8FF] transition flex items-center gap-0.5 cursor-pointer font-medium font-spec-cn"
              >
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
              {{ warningEventMeta.description }}
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 text-slate-300">
            <div class="p-2.5 rounded bg-[rgba(10,36,58,0.55)] border border-[rgba(70,180,235,0.2)]">
              <div class="text-[#5D8AAA] text-[10px]">事件等级</div>
              <div class="font-bold mt-0.5" :class="warningEventMeta.levelClass">{{ warningEventMeta.level }}</div>
            </div>
            <div class="p-2.5 rounded bg-[rgba(10,36,58,0.55)] border border-[rgba(70,180,235,0.2)]">
              <div class="text-[#5D8AAA] text-[10px]">响应时限</div>
              <div class="font-bold text-[#FFC65C] mt-0.5">{{ warningEventMeta.deadline }}</div>
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

    <!-- ================= 6-1. MODAL: 预警点位告警信息 ================= -->
    <div
      v-if="showWarningEventDetailModal && selectedWarningEvent"
      data-warning-detail
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 font-spec-cn"
      @click.self="closeWarningEventDetail"
    >
      <div class="spec-card rounded-xl shadow-2xl w-full max-w-3xl max-h-[88vh] overflow-hidden text-white animate-scale-in border border-[rgba(70,180,235,0.4)] flex flex-col">
        <div class="px-5 py-3.5 bg-gradient-to-r from-[#071F38] to-[#0A2E50] border-b border-[rgba(70,180,235,0.3)] flex items-center justify-between shrink-0">
          <div class="flex items-center gap-2.5 min-w-0">
            <span
              class="relative w-5 h-5 flex items-center justify-center rounded-full border shrink-0"
              :style="{
                borderColor: `${getWarningLevelColor(selectedWarningEvent.level)}80`,
                backgroundColor: `${getWarningLevelColor(selectedWarningEvent.level)}18`,
              }"
            >
              <svg
                class="w-3 h-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
                :style="{ color: getWarningLevelColor(selectedWarningEvent.level) }"
              >
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"></path>
                <line x1="12" x2="12" y1="9" y2="13"></line>
                <line x1="12" x2="12.01" y1="17" y2="17"></line>
              </svg>
            </span>
            <span class="font-bold text-sm tracking-wide text-[#E4F6FF]">计量点告警信息</span>
            <span
              class="px-2 py-0.5 rounded border text-[9px] font-bold shrink-0"
              :style="{
                color: getWarningLevelColor(selectedWarningEvent.level),
                borderColor: `${getWarningLevelColor(selectedWarningEvent.level)}70`,
                backgroundColor: `${getWarningLevelColor(selectedWarningEvent.level)}14`,
              }"
            >
              {{ selectedWarningEvent.levelLabel }}
            </span>
          </div>
          <button
            type="button"
            class="text-[#5D8AAA] hover:text-white p-1 rounded hover:bg-white/10 transition cursor-pointer"
            title="关闭告警信息"
            @click="closeWarningEventDetail"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>

        <div class="p-4 xl:p-5 overflow-y-auto custom-dark-scrollbar">
          <div class="mb-3 flex items-start justify-between gap-4">
            <div class="min-w-0">
              <div class="text-[9.5px] text-[#5D8AAA]">当前计量点</div>
              <div class="mt-1 text-sm font-bold text-[#E4F6FF] leading-snug break-words">{{ selectedWarningEvent.facilityName }}</div>
              <div class="mt-1 text-[10px] text-[#8FB6D4]">{{ selectedWarningEvent.enterprise }} · {{ selectedWarningEvent.district }}</div>
            </div>
            <div class="shrink-0 text-right">
              <div class="text-[9.5px] text-[#5D8AAA]">告警类型</div>
              <div
                class="mt-1 px-2.5 py-1 rounded border text-[11px] font-bold"
                :style="{
                  color: getWarningLevelColor(selectedWarningEvent.level),
                  borderColor: `${getWarningLevelColor(selectedWarningEvent.level)}65`,
                  backgroundColor: `${getWarningLevelColor(selectedWarningEvent.level)}16`,
                }"
              >
                {{ selectedWarningEvent.alarmType }}
              </div>
            </div>
          </div>

          <div class="rounded-lg border border-[rgba(70,180,235,0.24)] bg-[rgba(5,20,38,0.66)] overflow-hidden">
            <div class="grid grid-cols-[86px_minmax(0,1fr)_86px_minmax(0,1fr)] text-[11px] leading-relaxed">
              <div class="px-2.5 py-2 text-[#7FA4C0] bg-white/[0.025] border-b border-r border-[rgba(70,180,235,0.16)]">单号</div>
              <div class="px-2.5 py-2 text-[#DCF2FF] font-spec-num break-all border-b border-r border-[rgba(70,180,235,0.16)]">{{ selectedWarningEvent.orderNo }}</div>
              <div class="px-2.5 py-2 text-[#7FA4C0] bg-white/[0.025] border-b border-r border-[rgba(70,180,235,0.16)]">超时情况</div>
              <div class="px-2.5 py-2 border-b border-[rgba(70,180,235,0.16)]">
                <span
                  class="px-1.5 py-0.5 rounded text-[10px] font-bold"
                  :class="selectedWarningEvent.timeoutStatus === '未超时'
                    ? 'text-[#71E7B4] bg-[#3DDC97]/12'
                    : 'text-[#FF9AA4] bg-[#FF6B7A]/12'"
                >
                  {{ selectedWarningEvent.timeoutStatus }}
                </span>
              </div>

              <div class="px-2.5 py-2 text-[#7FA4C0] bg-white/[0.025] border-b border-r border-[rgba(70,180,235,0.16)]">工单状态</div>
              <div class="px-2.5 py-2 border-b border-r border-[rgba(70,180,235,0.16)]">
                <span class="px-1.5 py-0.5 rounded text-[10px] font-bold text-[#FFD88C] bg-[#FFC65C]/12">{{ selectedWarningEvent.orderStatus }}</span>
              </div>
              <div class="px-2.5 py-2 text-[#7FA4C0] bg-white/[0.025] border-b border-r border-[rgba(70,180,235,0.16)]">工单类型</div>
              <div class="px-2.5 py-2 border-b border-[rgba(70,180,235,0.16)]">
                <span class="px-1.5 py-0.5 rounded text-[10px] font-bold text-[#9BEAFF] bg-[#3FD0FF]/10">{{ selectedWarningEvent.orderType }}</span>
              </div>

              <div class="px-2.5 py-2 text-[#7FA4C0] bg-white/[0.025] border-b border-r border-[rgba(70,180,235,0.16)]">计量设施名称</div>
              <div class="col-span-3 px-2.5 py-2 text-[#DCF2FF] border-b border-[rgba(70,180,235,0.16)] break-words">{{ selectedWarningEvent.facilityName }}</div>

              <div class="px-2.5 py-2 text-[#7FA4C0] bg-white/[0.025] border-b border-r border-[rgba(70,180,235,0.16)]">计量设施编码</div>
              <div class="px-2.5 py-2 text-[#DCF2FF] font-spec-num break-all border-b border-r border-[rgba(70,180,235,0.16)]">{{ selectedWarningEvent.facilityCode }}</div>
              <div class="px-2.5 py-2 text-[#7FA4C0] bg-white/[0.025] border-b border-r border-[rgba(70,180,235,0.16)]">最新告警时间</div>
              <div class="px-2.5 py-2 text-[#DCF2FF] font-spec-num border-b border-[rgba(70,180,235,0.16)]">{{ selectedWarningEvent.latestAlarmTime }}</div>

              <div class="px-2.5 py-2 text-[#7FA4C0] bg-white/[0.025] border-b border-r border-[rgba(70,180,235,0.16)]">告警内容</div>
              <div class="col-span-3 px-2.5 py-2 text-[#DCF2FF] border-b border-[rgba(70,180,235,0.16)] break-words">{{ selectedWarningEvent.alarmContent }}</div>

              <div class="px-2.5 py-2 text-[#7FA4C0] bg-white/[0.025] border-b border-r border-[rgba(70,180,235,0.16)]">工单处置时间</div>
              <div class="col-span-3 px-2.5 py-2 text-[#DCF2FF] font-spec-num border-b border-[rgba(70,180,235,0.16)] break-words">{{ selectedWarningEvent.disposalTimeRange }}</div>

              <div class="px-2.5 py-2 text-[#7FA4C0] bg-white/[0.025] border-b border-r border-[rgba(70,180,235,0.16)]">运维单位</div>
              <div class="px-2.5 py-2 text-[#DCF2FF] border-b border-r border-[rgba(70,180,235,0.16)] break-words">{{ selectedWarningEvent.maintenanceUnit }}</div>
              <div class="px-2.5 py-2 text-[#7FA4C0] bg-white/[0.025] border-b border-r border-[rgba(70,180,235,0.16)]">运维人员</div>
              <div class="px-2.5 py-2 text-[#DCF2FF] border-b border-[rgba(70,180,235,0.16)]">{{ selectedWarningEvent.maintenancePerson }}</div>

              <div class="px-2.5 py-2 text-[#7FA4C0] bg-white/[0.025] border-b border-r border-[rgba(70,180,235,0.16)]">联系电话</div>
              <div class="px-2.5 py-2 text-[#DCF2FF] font-spec-num border-b border-r border-[rgba(70,180,235,0.16)]">{{ selectedWarningEvent.contactPhone }}</div>
              <div class="px-2.5 py-2 text-[#7FA4C0] bg-white/[0.025] border-b border-r border-[rgba(70,180,235,0.16)]">处理附件</div>
              <div class="px-2.5 py-2 text-[#8FB6D4] border-b border-[rgba(70,180,235,0.16)]">{{ selectedWarningEvent.attachments }}</div>

              <div class="px-2.5 py-2 text-[#7FA4C0] bg-white/[0.025] border-b border-r border-[rgba(70,180,235,0.16)]">产生告警原因</div>
              <div class="col-span-3 px-2.5 py-2 text-[#DCF2FF] border-b border-[rgba(70,180,235,0.16)] break-words">{{ selectedWarningEvent.alarmCause }}</div>

              <div class="px-2.5 py-2 text-[#7FA4C0] bg-white/[0.025] border-r border-[rgba(70,180,235,0.16)]">处理情况</div>
              <div class="col-span-3 px-2.5 py-2 text-[#DCF2FF] break-words">{{ selectedWarningEvent.handlingStatus }}</div>
            </div>
          </div>
        </div>

        <div class="px-5 py-3 bg-[rgba(4,14,26,0.9)] border-t border-[rgba(70,180,235,0.2)] flex justify-end text-xs shrink-0">
          <button
            type="button"
            class="px-4 py-1.5 rounded border border-[rgba(70,180,235,0.3)] text-slate-300 hover:bg-white/10 cursor-pointer"
            @click="closeWarningEventDetail"
          >
            关闭
          </button>
        </div>
      </div>
    </div>

    <!-- ================= 6-1. MODAL: 证照维度预警研判 ================= -->
    <div
      v-if="showCertificateWarningModal && selectedCertificateData"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 font-spec-cn"
      @click.self="closeCertificateWarningDetail"
    >
      <div class="spec-card rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden text-white animate-scale-in border border-[rgba(70,180,235,0.4)] flex flex-col">
        <div class="px-5 py-3.5 bg-gradient-to-r from-[#071F38] to-[#0A2E50] border-b border-[rgba(70,180,235,0.3)] flex items-center justify-between shrink-0">
          <div class="flex items-center gap-2.5 min-w-0">
            <span
              class="w-2.5 h-2.5 rounded-full shrink-0"
              :style="{ background: selectedCertificateData.marker.color, boxShadow: `0 0 10px ${selectedCertificateData.marker.color}` }"
            ></span>
            <span class="font-bold text-sm tracking-wide text-[#E4F6FF]">证照预警研判</span>
            <span
              class="px-2 py-0.5 rounded border text-[10px] font-bold shrink-0"
              :style="{
                color: selectedCertificateData.marker.color,
                borderColor: `${selectedCertificateData.marker.color}80`,
                backgroundColor: `${selectedCertificateData.marker.color}14`,
              }"
            >
              {{ selectedCertificateData.typeLabel }}
            </span>
          </div>
          <button
            type="button"
            class="text-[#5D8AAA] hover:text-white p-1 rounded hover:bg-white/10 transition cursor-pointer"
            title="关闭证照预警详情"
            @click="closeCertificateWarningDetail"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>

        <div class="p-4 xl:p-5 space-y-3.5 overflow-y-auto custom-dark-scrollbar">
          <div class="rounded-xl border border-[rgba(70,180,235,0.24)] bg-[linear-gradient(135deg,rgba(12,45,72,0.9),rgba(7,27,46,0.94))] p-3.5">
            <div class="grid grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] gap-4 items-start">
              <div class="min-w-0">
                <div class="text-[10px] text-[#5D8AAA]">取水户名称</div>
                <div class="mt-1 text-sm xl:text-base font-bold text-[#E4F6FF] leading-snug break-words">{{ selectedCertificateData.marker.licensee }}</div>
              </div>
              <div class="min-w-0">
                <div class="text-[10px] text-[#5D8AAA]">证照编号</div>
                <div class="mt-1 text-[11px] xl:text-xs font-spec-num font-bold text-[#9BEAFF] break-all">{{ selectedCertificateData.marker.licenseNo }}</div>
              </div>
            </div>
            <div class="mt-3 pt-2.5 border-t border-[rgba(70,180,235,0.16)] flex items-center justify-between gap-3 text-[10px]">
              <div class="flex items-center gap-4 text-[#8FB6D4]">
                <span>归属区县 <b class="text-[#DCF2FF] font-spec-cn">{{ selectedCertificateData.marker.district }}</b></span>
                <span>预警时间 <b class="text-[#DCF2FF] font-spec-num">{{ selectedCertificateData.marker.time }}</b></span>
              </div>
              <span class="text-[#5D8AAA]">数据口径：本年累计</span>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div class="rounded-lg border border-[rgba(255,107,122,0.3)] bg-[rgba(62,22,34,0.42)] p-3">
              <div class="text-[10px] text-[#C99AA5]">超出告警值</div>
              <div class="mt-1 text-lg xl:text-xl font-bold font-spec-num text-[#FF8A8A]">
                +{{ formatWaterVolume(selectedCertificateData.overValue) }}
                <span class="text-[10px] font-normal text-[#C99AA5]">万m³</span>
              </div>
              <div class="mt-1 text-[9px] text-[#7E6670] font-spec-num">
                当前 {{ formatWaterVolume(selectedCertificateData.marker.currentValue) }} / 阈值 {{ formatWaterVolume(selectedCertificateData.marker.limitValue) }}
              </div>
            </div>
            <div class="rounded-lg border border-[rgba(255,198,92,0.3)] bg-[rgba(61,46,20,0.38)] p-3">
              <div class="text-[10px] text-[#B8A078]">超出比例</div>
              <div class="mt-1 text-lg xl:text-xl font-bold font-spec-num text-[#FFC65C]">+{{ selectedCertificateData.overRate.toFixed(1) }}%</div>
              <div class="mt-1 text-[9px] text-[#7F745D]">按当前证照预警阈值计算</div>
            </div>
            <div class="rounded-lg border border-[rgba(70,180,235,0.25)] bg-[rgba(10,36,58,0.55)] p-3">
              <div class="text-[10px] text-[#5D8AAA]">预警状态</div>
              <div class="mt-1 text-lg xl:text-xl font-bold" :style="{ color: selectedCertificateData.marker.color }">超限</div>
              <div class="mt-1 text-[9px] text-[#7092AE]">{{ selectedCertificateData.marker.ratio.toFixed(1) }}% · 已触发预警</div>
            </div>
          </div>

          <div class="rounded-xl border border-[rgba(70,180,235,0.22)] bg-[rgba(5,20,38,0.72)] p-3.5">
            <div class="flex items-end justify-between gap-3 pb-2 border-b border-[rgba(70,180,235,0.16)]">
              <div>
                <div class="text-xs font-bold text-[#E4F6FF]">本年累计水量统计</div>
                <div class="mt-0.5 text-[9.5px] text-[#5D8AAA]">计量、直报、税务、许可、计划与执行六项业务值对比</div>
              </div>
              <div class="text-right shrink-0">
                <div class="text-[9px] text-[#5D8AAA]">单位</div>
                <div class="text-[10px] font-spec-num text-[#9BEAFF]">万m³</div>
              </div>
            </div>

            <div
              class="mt-4 grid grid-cols-6 gap-2 xl:gap-4"
              role="img"
              :aria-label="`${selectedCertificateData.marker.licensee}本年累计水量统计`"
            >
              <div
                v-for="metric in selectedCertificateWaterChart"
                :key="metric.key"
                class="min-w-0 flex flex-col items-center"
                :title="`${metric.label}：${formatWaterVolume(metric.value)} 万m³`"
              >
                <div
                  class="text-[9.5px] xl:text-[10.5px] font-bold font-spec-num whitespace-nowrap"
                  :style="{ color: metric.color }"
                >
                  {{ formatWaterVolume(metric.value) }}
                </div>
                <div class="relative mt-2 w-full max-w-[48px] h-[124px] xl:h-[140px] rounded-t-md bg-[rgba(70,180,235,0.08)] border border-[rgba(70,180,235,0.13)] flex items-end overflow-hidden">
                  <div
                    class="certificate-water-bar w-full rounded-t-md"
                    :class="{ 'certificate-water-bar-alert': metric.isAlertMetric }"
                    :style="{
                      height: `${metric.heightPercent}%`,
                      background: `linear-gradient(180deg, ${metric.color}, ${metric.color}55)`,
                      boxShadow: metric.isAlertMetric ? `0 0 14px ${metric.color}66` : 'none',
                    }"
                  ></div>
                </div>
                <div class="mt-2 h-[24px] flex flex-col items-center justify-start">
                  <span class="text-[10px] font-bold text-[#B7D7EB]">{{ metric.label }}</span>
                  <span v-if="metric.isAlertMetric" class="mt-0.5 text-[7.5px] leading-none" :style="{ color: metric.color }">触发项</span>
                </div>
              </div>
            </div>

            <div class="mt-2 flex items-center justify-between text-[9px] text-[#5D8AAA]">
              <span>柱高按六项中最高年度累计值等比展示</span>
              <span class="font-spec-num">峰值 {{ formatWaterVolume(selectedCertificateChartMax) }} 万m³</span>
            </div>
          </div>
        </div>

        <div class="px-5 py-3 bg-[rgba(4,14,26,0.9)] border-t border-[rgba(70,180,235,0.2)] flex justify-end gap-2 text-xs shrink-0">
          <button
            type="button"
            class="px-4 py-1.5 rounded border border-[rgba(70,180,235,0.3)] text-slate-300 hover:bg-white/10 cursor-pointer"
            @click="closeCertificateWarningDetail"
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

    <!-- ================= 6-2. MODAL: 计量超许可点位基础信息 ================= -->
    <div
      v-if="showMeterOverPointModal && selectedMeterOverPoint"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 font-spec-cn"
      @click.self="closeMeterOverPointDetail"
    >
      <div class="spec-card rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden text-white animate-scale-in border border-[rgba(255,107,122,0.42)]">
        <div class="px-5 py-3.5 bg-gradient-to-r from-[#2B1320] via-[#111D32] to-[#0A2E50] border-b border-[rgba(255,107,122,0.3)] flex items-center justify-between">
          <div class="flex items-center gap-2.5 min-w-0">
            <span class="relative w-5 h-5 flex items-center justify-center shrink-0">
              <span class="absolute w-5 h-5 rounded-full border border-[#FF6B7A]/55 meter-legend-wave"></span>
              <span class="relative w-2.5 h-2.5 rounded-full bg-[#FF6B7A] shadow-[0_0_8px_rgba(255,107,122,0.8)]"></span>
            </span>
            <span class="font-bold text-sm tracking-wide text-[#FFE4E7]">计量超许可点位</span>
            <span class="px-2 py-0.5 rounded border border-[#FF6B7A]/45 bg-[#FF6B7A]/10 text-[8.5px] font-bold text-[#FF9DA7] shrink-0">
              图层2
            </span>
          </div>
          <button
            type="button"
            class="text-[#B98A92] hover:text-white p-1 rounded hover:bg-white/10 transition cursor-pointer"
            title="关闭计量点信息"
            @click="closeMeterOverPointDetail"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>

        <div class="p-5 space-y-4">
          <div class="rounded-xl border border-[rgba(255,107,122,0.24)] bg-[linear-gradient(135deg,rgba(59,26,39,0.78),rgba(7,27,46,0.9))] p-4">
            <div class="flex items-start gap-3">
              <span class="relative w-10 h-10 flex items-center justify-center shrink-0 mt-0.5">
                <span class="absolute w-9 h-9 rounded-full border border-[#FF6B7A]/55 meter-legend-wave"></span>
                <span class="absolute w-6 h-6 rounded-full bg-[#FF6B7A]/16"></span>
                <span class="relative w-3.5 h-3.5 rounded-full bg-[#FF6B7A] border border-white shadow-[0_0_10px_rgba(255,107,122,0.85)]"></span>
              </span>
              <div class="min-w-0">
                <div class="text-[9.5px] text-[#A47B83]">计量点名称</div>
                <div class="mt-1 text-sm xl:text-base font-bold text-[#FFF0F2] leading-snug">{{ selectedMeterOverPoint.meterName }}</div>
                <div class="mt-1.5 text-[10px] text-[#8FB6D4]">
                  {{ selectedMeterOverPoint.licensee }} · {{ selectedMeterOverPoint.district }}
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div class="rounded-lg border border-[rgba(70,180,235,0.22)] bg-[rgba(10,36,58,0.55)] p-3">
              <div class="text-[9.5px] text-[#5D8AAA]">计量点编号</div>
              <div class="mt-1 text-[11px] font-bold font-spec-num text-[#DCF2FF] break-all">{{ selectedMeterOverPoint.meterCode }}</div>
            </div>
            <div class="rounded-lg border border-[rgba(70,180,235,0.22)] bg-[rgba(10,36,58,0.55)] p-3">
              <div class="text-[9.5px] text-[#5D8AAA]">接入方式</div>
              <div class="mt-1 text-[11px] font-bold text-[#9BEAFF]">{{ selectedMeterOverPoint.accessMethod }}</div>
            </div>
            <div class="col-span-2 rounded-lg border border-[rgba(255,198,92,0.25)] bg-[rgba(56,43,21,0.32)] p-3">
              <div class="text-[9.5px] text-[#9F8B66]">证照编号</div>
              <div class="mt-1 text-[11px] font-bold font-spec-num text-[#FFC65C] break-all">{{ selectedMeterOverPoint.licenseNo }}</div>
            </div>
          </div>

          <div class="rounded-xl border border-[rgba(255,107,122,0.28)] bg-[rgba(63,22,34,0.42)] p-4 flex items-end justify-between gap-4">
            <div>
              <div class="text-[9.5px] text-[#C99AA5]">计量点累计水量</div>
              <div class="mt-1 text-[10px] text-[#7E6670]">当前统计周期累计值</div>
            </div>
            <div class="text-right shrink-0">
              <span class="text-2xl xl:text-3xl font-bold font-spec-num text-[#FFD2D7]">{{ formatWaterVolume(selectedMeterOverPoint.currentValue) }}</span>
              <span class="ml-1 text-[10px] text-[#C99AA5]">万m³</span>
            </div>
          </div>
        </div>

        <div class="px-5 py-3 bg-[rgba(4,14,26,0.9)] border-t border-[rgba(70,180,235,0.2)] flex justify-end gap-2 text-xs">
          <button
            type="button"
            class="px-4 py-1.5 rounded border border-[rgba(70,180,235,0.3)] text-slate-300 hover:bg-white/10 cursor-pointer"
            @click="closeMeterOverPointDetail"
          >
            关闭
          </button>
          <button
            type="button"
            class="px-4 py-1.5 rounded bg-[#FF6B7A]/15 border border-[#FF6B7A]/55 text-[#FFB2B9] font-bold hover:bg-[#FF6B7A]/25 cursor-pointer"
            @click="openCertificateWarningDetail(selectedMeterOverPoint)"
          >
            查看证照详情
          </button>
        </div>
      </div>
    </div>

    <!-- ================= 6-3. MODAL: 业务关联研判数据治理明细 ================= -->
    <div
      v-if="showGovernanceDetailModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 font-spec-cn"
      @click.self="showGovernanceDetailModal = false"
    >
      <div class="spec-card rounded-2xl shadow-2xl w-full max-w-3xl max-h-[78vh] overflow-hidden text-white animate-scale-in border border-[rgba(70,180,235,0.4)] flex flex-col">
        <div class="px-4 py-3 bg-gradient-to-r from-[#071F38] to-[#0A2E50] border-b border-[rgba(70,180,235,0.3)] flex items-center justify-between shrink-0">
          <div class="flex items-center gap-2 min-w-0">
            <span
              class="w-2.5 h-2.5 rounded-full shrink-0"
              :style="{ background: governanceDetailAccent, boxShadow: `0 0 8px ${governanceDetailAccent}` }"
            ></span>
            <div class="min-w-0">
              <div class="text-sm font-bold text-white truncate">{{ governanceDetailTitle }}</div>
              <div class="text-[10px] text-[#5D8AAA] mt-0.5 truncate">{{ governanceDetailSubtitle }}</div>
            </div>
          </div>
          <button
            type="button"
            class="text-[#5D8AAA] hover:text-white p-1 rounded hover:bg-white/10 transition cursor-pointer text-xs"
            @click="showGovernanceDetailModal = false"
          >
            ✕
          </button>
        </div>

        <div class="p-3 overflow-auto custom-dark-scrollbar">
          <table class="w-full text-left text-[10.5px]">
            <thead>
              <tr class="text-[#5D8AAA] border-b border-[rgba(70,180,235,0.25)] bg-[rgba(10,36,58,0.6)]">
                <th
                  v-for="column in governanceDetailColumns"
                  :key="column"
                  class="py-1.5 px-2 font-medium font-spec-cn whitespace-nowrap"
                >
                  {{ column }}
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[rgba(70,180,235,0.12)]">
              <tr
                v-for="row in governanceDetailRows"
                :key="row.id"
                class="hover:bg-white/5 transition-colors align-top"
              >
                <td class="py-1.5 px-2 text-slate-200 font-medium">{{ row.name }}</td>
                <td class="py-1.5 px-2 font-spec-num text-[#8FB6D4] break-all">{{ row.creditCode }}</td>
                <td class="py-1.5 px-2 font-spec-num text-[#00E5FF] break-all">{{ row.licenseNo }}</td>
                <td class="py-1.5 px-2 text-slate-300 font-spec-cn whitespace-nowrap">{{ row.district }}</td>
                <td class="py-1.5 px-2 text-[#FFC65C] font-spec-cn">{{ row.note }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="px-4 py-2.5  border-t border-[rgba(70,180,235,0.2)] flex items-center justify-between gap-3 shrink-0 text-xs">
          <span class="text-[10px] text-[#5D8AAA]">共 {{ governanceDetailRows.length }} 条 · 数据更新于 2026-10-28</span>
          <button
            type="button"
            class="px-4 py-1.5 rounded border border-[rgba(70,180,235,0.3)] text-slate-300 hover:bg-white/10 cursor-pointer"
            @click="showGovernanceDetailModal = false"
          >
            关闭
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
              :style="{
                backgroundColor: getMeterStatusColor(selectedMeterPoint.meterStatus),
                boxShadow: `0 0 6px ${getMeterStatusColor(selectedMeterPoint.meterStatus)}`,
              }"
            ></span>
            <h3 class="text-sm font-bold text-white truncate tracking-wide font-spec-cn">
              {{ selectedMeterPoint.name }}
            </h3>
            <span
              class="px-1.5 py-0.2 rounded text-[10px] font-bold border shrink-0 font-spec-cn"
              :class="getMeterStatusBadgeClass(selectedMeterPoint.meterStatus)"
            >
              {{ getMeterStatusLabel(selectedMeterPoint.meterStatus) }}
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
          <div
            v-else-if="selectedMeterPoint.meterStatus === 'offline'"
            class="p-2.5 rounded-lg bg-slate-800/50 border border-[#8FB6D4]/35 text-[11px] text-slate-300 flex items-start gap-1.5 font-spec-cn"
          >
            <span class="text-[#B9D1E5] font-bold shrink-0">停用说明:</span>
            <span>{{ selectedMeterPoint.offlineReason || '计量设施按计划停用，当前不参与实时监控' }}</span>
          </div>
        </div>

        <!-- 弹窗底栏极简按钮 -->
        <div class="px-4 py-2.5 bg-[#06152b] border-t border-[#1b4372] flex items-center justify-between text-xs">
          <span class="text-slate-400 text-[10px]">
            {{ selectedMeterPoint.district }} ·
            {{ selectedMeterPoint.meterStatus === 'offline' ? '设备停用' : selectedMeterPoint.meterStatus === 'fault' ? '通信异常' : '遥测在线' }}
          </span>
          <div class="flex items-center gap-2">
            <button
              type="button"
              class="px-3 py-1 rounded bg-[#2f80ed] hover:bg-[#246fcf] text-white font-medium transition cursor-pointer text-xs"
              @click="openMeterWaterDetail"
            >
              水量查看
            </button>
            <button
              v-if="selectedMeterPoint.meterStatus === 'pending'"
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

    <!-- ================= 2-1. MODAL: 计量点水量详情 (静态数据展示) ================= -->
    <div
      v-if="showMeterWaterModal && selectedMeterPoint"
      data-meter-water-detail
      class="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 font-spec-cn"
      @click.self="closeMeterWaterDetail"
    >
      <div class="w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-lg border border-[rgba(70,180,235,0.52)] bg-[linear-gradient(145deg,#071C33_0%,#0A2948_50%,#071A2E_100%)] text-[#DCF2FF] shadow-[0_24px_80px_rgba(0,6,18,0.72)] animate-scale-in flex flex-col">
        <div class="h-12 px-5 bg-gradient-to-r from-[#071F38] via-[#0A2E50] to-[#0C3A62] border-b border-[rgba(70,180,235,0.35)] flex items-center justify-between shrink-0">
          <div class="flex items-center gap-2.5 min-w-0">
            <svg class="w-4 h-4 text-[#3FD0FF] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M12 2.7 6.8 8.1a7.35 7.35 0 1 0 10.4 0Z"></path>
              <path d="M9.5 14.5a3.4 3.4 0 0 0 3.4 3.4"></path>
            </svg>
            <h3 class="shrink-0 text-base font-bold text-[#E4F6FF] tracking-wide whitespace-nowrap">计量水量</h3>
            <span class="h-4 w-px bg-[#2A5A85]"></span>
            <span class="text-[11px] text-[#8FB6D4] truncate">{{ selectedMeterPoint.name }}</span>
          </div>
          <button
            type="button"
            class="w-8 h-8 flex items-center justify-center rounded text-[#8FB6D4] hover:text-white hover:bg-white/10 transition cursor-pointer"
            title="关闭水量详情"
            @click="closeMeterWaterDetail"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>

        <div class="min-h-0 flex-1 grid lg:grid-cols-[250px_minmax(0,1fr)]">
          <aside class="min-h-0 overflow-y-auto bg-[rgba(5,20,38,0.84)] border-b lg:border-b-0 lg:border-r border-[rgba(70,180,235,0.25)] text-[11px]">
            <div class="bg-gradient-to-r from-[#0C4B78] to-[#082A49] border-l-2 border-[#3FD0FF] px-5 py-2 text-[#E4F6FF] text-[12px] font-bold">基本信息</div>
            <div class="px-5 py-3 space-y-3">
              <div class="grid grid-cols-[82px_minmax(0,1fr)] gap-2 items-start">
                <span class="text-[#7FA4C0]">计量设施编码:</span>
                <span class="font-spec-num text-[#9BEAFF] break-all">{{ selectedMeterPoint.meterCode }}</span>
              </div>
              <div class="grid grid-cols-[82px_minmax(0,1fr)] gap-2 items-start">
                <span class="text-[#7FA4C0]">计量设施名称:</span>
                <span class="text-[#DCF2FF] leading-relaxed break-words">{{ selectedMeterPoint.userEnterprise }}<br>{{ selectedMeterPoint.name }}</span>
              </div>
              <div class="grid grid-cols-[82px_minmax(0,1fr)] gap-2 items-start">
                <span class="text-[#7FA4C0]">数据来源:</span>
                <span class="text-[#DCF2FF]">{{ getMeterWaterSource(selectedMeterPoint) }}</span>
              </div>
              <div class="grid grid-cols-[82px_minmax(0,1fr)] gap-2 items-start">
                <span class="text-[#7FA4C0]">流域:</span>
                <span class="text-[#DCF2FF]">--</span>
              </div>
              <div class="grid grid-cols-[82px_minmax(0,1fr)] gap-2 items-start">
                <span class="text-[#7FA4C0]">上报方式:</span>
                <span class="text-[#DCF2FF]">{{ getMeterWaterReportMethod(selectedMeterPoint) }}</span>
              </div>
            </div>

            <div class="mt-2 bg-gradient-to-r from-[#0C4B78] to-[#082A49] border-l-2 border-[#3FD0FF] px-5 py-2 text-[#E4F6FF] text-[12px] font-bold">水量统计</div>
            <div class="px-5 py-3 space-y-3">
              <div class="grid grid-cols-[82px_minmax(0,1fr)] gap-2 items-baseline">
                <span class="text-[#7FA4C0]">本月计量水量:</span>
                <span class="text-[13px] font-bold text-[#DCF2FF] font-spec-num">
                  {{ getMeterMonthVolume(selectedMeterPoint).toFixed(4) }}<small class="ml-0.5 text-[9px] font-normal text-[#5D8AAA]">万m³</small>
                </span>
              </div>
              <div class="grid grid-cols-[82px_minmax(0,1fr)] gap-2 items-baseline">
                <span class="text-[#7FA4C0]">本年计量水量:</span>
                <span class="text-[13px] font-bold text-[#9BEAFF] font-spec-num">
                  {{ getMeterYearVolume(selectedMeterPoint).toFixed(4) }}<small class="ml-0.5 text-[9px] font-normal text-[#5D8AAA]">万m³</small>
                </span>
              </div>
              <div class="grid grid-cols-[82px_minmax(0,1fr)] gap-2 items-start">
                <span class="text-[#7FA4C0]">年度证照水量合计:</span>
                <span class="text-[#DCF2FF] font-spec-num">--</span>
              </div>
              <div class="grid grid-cols-[82px_minmax(0,1fr)] gap-2 items-start">
                <span class="text-[#7FA4C0]">年度直报水量:</span>
                <span class="text-[#DCF2FF] font-spec-num">--</span>
              </div>
              <div class="grid grid-cols-[82px_minmax(0,1fr)] gap-2 items-start">
                <span class="text-[#7FA4C0]">年度税务申报水量:</span>
                <span class="text-[#DCF2FF] font-spec-num">--</span>
              </div>
              <div class="grid grid-cols-[82px_minmax(0,1fr)] gap-2 items-start">
                <span class="text-[#7FA4C0]">年许可水量:</span>
                <span class="text-[#DCF2FF] font-spec-num">--</span>
              </div>
              <div class="grid grid-cols-[82px_minmax(0,1fr)] gap-2 items-start">
                <span class="text-[#7FA4C0]">年取水计划量:</span>
                <span class="text-[#DCF2FF] font-spec-num">--</span>
              </div>
            </div>
          </aside>

          <section class="min-h-0 overflow-y-auto bg-[radial-gradient(circle_at_top_left,rgba(28,91,139,0.2),transparent_46%)] px-4 py-3 xl:px-5">
            <div class="flex items-center gap-1.5 text-[16px] font-bold text-[#9BEAFF]">
              <span>水量统计</span>
              <span class="mt-1 block h-[3px] w-8 rounded-full bg-[#3FD0FF] shadow-[0_0_8px_rgba(63,208,255,0.55)]"></span>
            </div>

            <div class="mt-3 flex flex-wrap items-center justify-between gap-3">
              <div class="flex items-center gap-3 text-[11px]">
                <span class="min-w-10 px-4 py-1.5 text-center bg-[#146EB4] border border-[#3FD0FF]/55 text-white shadow-[0_0_10px_rgba(63,208,255,0.18)]">日</span>
                <span class="min-w-10 px-3 py-1.5 text-center text-[#8FB6D4] border border-transparent">月</span>
                <span class="min-w-10 px-3 py-1.5 text-center text-[#8FB6D4] border border-transparent">季度</span>
                <span class="min-w-10 px-3 py-1.5 text-center text-[#8FB6D4] border border-transparent">年</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="h-8 min-w-[250px] px-3 bg-[rgba(7,31,56,0.9)] border border-[rgba(70,180,235,0.32)] flex items-center justify-between text-[10px] text-[#9BEAFF] font-spec-num">
                  <span>2026-06-01</span>
                  <span class="text-[#5D8AAA]">至</span>
                  <span>2026-08-25</span>
                  <svg class="w-3.5 h-3.5 text-[#5D8AAA]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
                    <rect x="3" y="5" width="18" height="16" rx="2"></rect>
                    <path d="M16 3v4M8 3v4M3 10h18"></path>
                  </svg>
                </div>
                <span class="h-8 px-4 bg-[#0E74B8] border border-[#3FD0FF]/45 text-white text-[11px] flex items-center shadow-[0_0_10px_rgba(63,208,255,0.16)]">查询</span>
              </div>
            </div>

            <div class="relative mt-4 bg-[rgba(4,16,31,0.72)] border border-[rgba(70,180,235,0.24)] px-3 pt-3 pb-2">
              <div class="absolute top-8 left-7 text-[10px] text-[#7FA4C0]">水量(m³)</div>
              <div class="absolute top-3 right-4 text-[10px] text-[#9BEAFF] font-spec-num">29,268.43</div>
              <svg
                class="block w-full h-[250px] xl:h-[280px]"
                viewBox="0 0 780 280"
                preserveAspectRatio="none"
                role="img"
                :aria-label="`${selectedMeterPoint.name}计量水量趋势`"
              >
                <g stroke="rgba(70,180,235,0.19)" stroke-width="1">
                  <line x1="58" y1="28" x2="758" y2="28"></line>
                  <line x1="58" y1="68" x2="758" y2="68"></line>
                  <line x1="58" y1="108" x2="758" y2="108"></line>
                  <line x1="58" y1="148" x2="758" y2="148"></line>
                  <line x1="58" y1="188" x2="758" y2="188"></line>
                  <line x1="58" y1="228" x2="758" y2="228" stroke="rgba(70,180,235,0.38)"></line>
                </g>
                <g fill="#7FA4C0" font-size="9" text-anchor="end" font-family="monospace">
                  <text x="48" y="31">25,000</text>
                  <text x="48" y="71">20,000</text>
                  <text x="48" y="111">15,000</text>
                  <text x="48" y="151">10,000</text>
                  <text x="48" y="191">5,000</text>
                  <text x="48" y="231">0</text>
                </g>
                <g fill="#5D8AAA" font-size="8" text-anchor="middle" font-family="monospace">
                  <text x="70" y="250">2026-06-01</text>
                  <text x="145" y="250">2026-06-10</text>
                  <text x="220" y="250">2026-06-19</text>
                  <text x="295" y="250">2026-06-28</text>
                  <text x="370" y="250">2026-07-07</text>
                  <text x="445" y="250">2026-07-16</text>
                  <text x="520" y="250">2026-07-25</text>
                  <text x="595" y="250">2026-08-03</text>
                  <text x="670" y="250">2026-08-12</text>
                  <text x="745" y="250">2026-08-21</text>
                </g>
                <rect x="428" y="44" width="8" height="184" fill="#3FD0FF"></rect>
                <rect x="447" y="88" width="8" height="140" fill="#2BA8E8"></rect>
                <rect x="484" y="66" width="264" height="25" fill="#FF6B7A" opacity="0.26"></rect>
                <g stroke="#FF8A95" stroke-width="1" opacity="0.4">
                  <line x1="528" y1="66" x2="528" y2="91"></line>
                  <line x1="570" y1="66" x2="570" y2="91"></line>
                  <line x1="612" y1="66" x2="612" y2="91"></line>
                  <line x1="654" y1="66" x2="654" y2="91"></line>
                  <line x1="696" y1="66" x2="696" y2="91"></line>
                </g>
              </svg>
              <div class="pointer-events-none absolute left-[24%] top-[42%] min-w-[150px] rounded-md border border-[rgba(70,180,235,0.38)] bg-[#082540] px-3 py-2 text-[11px] text-[#DCF2FF] shadow-[0_4px_16px_rgba(0,0,0,0.35)]">
                <div class="font-spec-num">2026-06-01</div>
                <div class="mt-1">计量水量: <b class="font-spec-num text-[#9BEAFF]">{{ getMeterDailyDisplayVolume(selectedMeterPoint).toLocaleString('zh-CN') }}m³</b></div>
              </div>
            </div>

            <div class="mt-3 border border-[rgba(70,180,235,0.24)] bg-[rgba(5,20,38,0.62)]">
              <div class="grid grid-cols-[72px_1fr_1.25fr_1fr] bg-[#0B3354] text-[11px] text-[#9BEAFF] font-semibold">
                <div class="px-3 py-2 text-center border-r border-[rgba(70,180,235,0.2)]">序号</div>
                <div class="px-3 py-2 text-center border-r border-[rgba(70,180,235,0.2)]">日期</div>
                <div class="px-3 py-2 text-center border-r border-[rgba(70,180,235,0.2)]">计量水量（m³）</div>
                <div class="px-3 py-2 text-center">数据状态</div>
              </div>
              <div class="grid grid-cols-[72px_1fr_1.25fr_1fr] text-[11px] text-[#DCF2FF] border-t border-[rgba(70,180,235,0.18)]">
                <div class="px-3 py-2.5 text-center border-r border-[rgba(70,180,235,0.18)] font-spec-num">1</div>
                <div class="px-3 py-2.5 text-center border-r border-[rgba(70,180,235,0.18)] font-spec-num">2026-08-24</div>
                <div class="px-3 py-2.5 text-center border-r border-[rgba(70,180,235,0.18)] font-spec-num">{{ getMeterDailyDisplayVolume(selectedMeterPoint).toLocaleString('zh-CN') }}</div>
                <div class="px-3 py-2.5 text-center text-[#3DDC97]">正常</div>
              </div>
              <div class="grid grid-cols-[72px_1fr_1.25fr_1fr] text-[11px] text-[#DCF2FF] border-t border-[rgba(70,180,235,0.18)]">
                <div class="px-3 py-2.5 text-center border-r border-[rgba(70,180,235,0.18)] font-spec-num">2</div>
                <div class="px-3 py-2.5 text-center border-r border-[rgba(70,180,235,0.18)] font-spec-num">2026-08-23</div>
                <div class="px-3 py-2.5 text-center border-r border-[rgba(70,180,235,0.18)] font-spec-num">{{ getMeterPreviousDayVolume(selectedMeterPoint).toLocaleString('zh-CN') }}</div>
                <div class="px-3 py-2.5 text-center text-[#FF8A95]">极大值、负值</div>
              </div>
            </div>
          </section>
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

    <!-- ================= 8. 区县计划水量与直报水量管控比对弹窗 (支持实时微调直报/计划水量) ================= -->
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
                  {{ exceededDistrictsList.length }} 个区县直报超计划
                </span>
              </div>
              <p class="text-xs text-[#5D8AAA] mt-0.5 font-spec-cn">
                规则联动：在地图区县名称处展示计划与直报水量；直报水量大于计划水量时纳入超计划统计
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
                {{ exceededDistrictsList.length }} <span class="text-xs font-normal font-spec-cn">个区县 (超计划)</span>
              </div>
            </div>
            <div class="bg-[rgba(10,36,58,0.55)] p-3 rounded-xl border border-[#3DDC97]/30">
              <div class="text-[11px] text-[#5D8AAA]">合规受控区县数</div>
              <div class="text-xl font-bold font-spec-num text-[#3DDC97] mt-1">
                {{ 7 - exceededDistrictsList.length }} <span class="text-xs font-normal font-spec-cn">个区县 (受控)</span>
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
                  <th class="py-2.5 px-2 text-center font-spec-cn">超计划状态</th>
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
                      超计划
                    </span>
                    <span
                      v-else
                      class="text-xs text-[#5D8AAA] flex items-center justify-center gap-1"
                    >
                      <span class="w-2.5 h-1 rounded bg-slate-500"></span>
                      受控
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
                当 <code class="text-[#FF6B7A] bg-black/40 px-1 py-0.5 rounded font-spec-num">直报水量 > 计划水量</code> 时，区县纳入超计划统计；预警研判图例中的直报、税务与执行图层按证照逐条统计，区划仅用于定位证照归属。
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
    <div class="pointer-events-none fixed inset-0 z-50 overflow-hidden">
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
          <span class="font-spec-cn tracking-wide">开发标注 · {{ annotationList.length }}项</span>
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
              <span class="font-bold text-sm tracking-wide text-white">开发标注 · 共 {{ annotationList.length }} 项</span>
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
                :title="`复制所有${annotationList.length}项卡片规格说明为文本格式`"
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
            <span class="text-[#5D8AAA] font-mono">{{ annotationList.length }} / {{ annotationList.length }} 模块已对齐</span>
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
          <span>{{ annotationList.length }}项开发标注清单已成功复制到剪贴板！</span>
        </div>
      </transition>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';
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
const planWaterStatisticsDefaultYear = new Date().getFullYear() - 1;

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
    title: '区域用水态势分析 (左侧总览)',
    source: '全域用水数据库，包含计量水量、直报水量、税务水量、许可水量、计划水量与管控指标占比数据。',
    interaction: '与地图左上角行政区划、年份下拉独立筛选栏实时联动；鼠标悬浮柱体或数据节点弹出6项指标对比浮窗；点击区划联动全域地图定位。',
    keyPoints: [
      '【行政区域用水对比】：如果是省级，就展示各个市州的水量数据对比，如果是市级，就展示各个区县的水量数据对比；如果是区县，则展示当前县的水量数据对比',
      '【行政区划用水统计趋势】：以月维度统计实际用水（柱）与计划用水（折线），与中间行政区划（如城东区、城北区、西宁市等）实时联动重算与超计划红柱告警。',
    ],
  },
  {
    id: 3,
    title: '用水时间变化趋势 (近5年五指标)',
    source: '计量、直报、税务、许可、计划五类年度用水汇总数据，以及年度管控指标。',
    interaction: '默认展示截至所选年份的近5个年度数据；鼠标悬停任一年度节点，查看该年度的五类水量明细。',
    keyPoints: [
      '横轴按年度展示，默认窗口为近5年，并随年份筛选切换统计区间。',
      '计量、直报、税务、许可、计划水量分别以独立【曲线面积图】展示年度变化，样例数据需体现起伏和交叉。',
      '管控指标使用红色虚线单独展示，不绘制渐变面积。',
      '悬浮年度节点时，一次性展示该年度五类水量和管控指标数值。',
    ],
  },
  {
    id: 4,
    title: '用水结构',
    source: '计量、直报、税务、许可、计划五类水量按行业与水源类型统计。',
    interaction: '切换五类业务口径后，行业结构与水源结构同步更新；数值跟随行政区划和年份联动。',
    keyPoints: [
      '顶部提供计量、直报、税务、许可、计划五段式切换。',
      '左侧展示工业、农业、生活、环境四类行业占比，右侧展示地表水与地下水两类水源占比。',
    ],
  },
  {
    id: 5,
    title: '西宁全域 GIS 数字孪生底图 (核心)',
    source: '西宁市国土三调矢量底图、湟水河全水系地理矢量、区县审批管控占比、超许可计量点及三类超计划告警数据。',
    interaction: '行政区划按省级、市州、区县三级顺序下拉；年份使用深色下拉；专题图层可在右上角独立开关。',
    keyPoints: [
      '筛选区整体下移，行政区划、年份与图层控制在指标看板下方统一排布。',
      '行政层级采用省级、市州、区县三级下拉，下级选项随上级区划联动更新。',
      '三项专题图层分别对应审批管控占比、计量超许可点位与直报/税务/执行超计划。',
      '图层1按行政区划四档填色并显示占比；图层2以脉冲告警点位展示超许可计量点。',
      '图层3在7个行政区分别展示蓝色透明悬浮标签，点击任一标签展开本区三类告警明细气泡。',
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
    source: '场景模式控制器、五类预警研判口径及地图图例配置中心。',
    interaction: '点击胶囊在“综合应用场景”与“专项业务应用场景”间平滑切换；点击图例类型切换地图表达。',
    keyPoints: [
      '支持图例展开/收起切换，不遮挡中央数字孪生地图核心水系。',
      '综合场景保留五类研判图例切换与一键比对管控入口。',
    ],
  },
  {
    id: 8,
    title: '常态化预警监测 (右1)',
    source: '取用水常态化预警中枢，覆盖审批超管控、计量超许可、直报超许可、税务超计划、执行超月计划五类预警规则。',
    interaction: '点击五类预警卡片或事项明细，联动打开预警处置与工单调度弹窗。',
    keyPoints: [
      '超管控审批：以行政区划维度，对比许可审批水量占管控指标的比例，超过100%预警，（在地图中需要有区域填充塞和百分比的展示，超指标的还需要有颜色标识）',
      '计量超许可：以证的维度统计，小字说明具体涉计量点数量；以第一个取水工程的坐标在地图中可以展示，点击展示弹窗信息，基础、计量水量、许可水量、异常分析信息）',
      '直报超许可：以直报名录维度统计，地图中直接以区域的形式展示告警数量，点击数据展示详细的弹窗情况）',
      '税务申报水量超计划：以证照为维度统计，地图中以区域的形式展示告警信息，点击数据展示详细的弹窗情况。',
      '实际用水执行和月计划：从取水计划模块中的用水执行上报获取实际用水数据，将实际用水和月计划做对比，超计划则告警，实际用水执行的数据找【任万福】',
    ],
  },
  {
    id: 9,
    title: '业务关联研判 (右2)',
    source: '取水许可电子证照库、取水户档案完整度核算库与取用水名录关联台账。',
    interaction: '点击证照疑似问题数量或名录治理分类，弹窗查看对应问题明细。',
    keyPoints: [
      '证照数据治理展示治理完成率与疑似问题数量。①证照治理完成率：已整改完成的数量/证照治理问题的总数②疑似存在的问题：根据全国违规问题中证照【证照数据治理列表获取数量】，接口已有【问倩姐】',
      '档案完整度按优/良/中/差展示数量与占比，接口已有【问刘栋】。',
      '名录数据治理覆盖无证取水、证照失效、绑定冲突、无效证照四类问题。接口已有，问【倩姐】',
    ],
  },
  {
    id: 10,
    title: '计量点接入、到报与异常率监控 (右3)',
    source: '根据证照划分，统计规模以上农业、规模以上非农、中央发展资金的接入率、到报率数据，其中规模以上农业和规模以上非农保留异常率',
    interaction: '查看三类计量点的当前接入率、到报率，以及规模以上农业和规模以上非农的异常率',
    keyPoints: [
      '规模以上农业：使用绿色、规模以上非农使用蓝色、中央发展资金使用橙色，同类别在不同指标间保持同色。',
      '实线表示左轴到报率，虚线表示右轴异常率，两轴均采用0~100%刻度。',
      '图表按月展示近6个月时间序列，并明确标注左右Y轴含义及正向、负向指标。',
    ],
  },
  {
    id: 11,
    title: '行政区划用水统计趋势 (计划用水年度统计)',
    source: '计划用水管理模块中省、市、县三级填报的年度实际用水量和年度计划用水量。',
    interaction: `默认仅展示当前年份前一年（${planWaterStatisticsDefaultYear}年）的数据；切换省、市、县行政区划后，按对应层级重新汇总统计。`,
    keyPoints: [
      '统计口径取自计划用水模块的省、市、县填报数据。',
      '年度实际用水量与年度计划用水量分别汇总，并据两者计算执行率。',
      `默认只有当前年份前一年（${planWaterStatisticsDefaultYear}年）的数据，其他年份需主动切换后展示。`,
      '按省级统计市州、市级统计区县、县级统计当前县的层级范围进行汇总。',
    ],
  },
  {
    id: 12,
    title: '重点取水户概况 (专项业务场景)',
    source: '取水许可电子证照库与取用水户名录，按取水许可证维度统计规模以上重点取水企业。',
    interaction: '重点取水户数量、年许可总量、年累计取水与今日告警按当前统计口径汇总；点击排名企业进入一户一档。',
    keyPoints: [
      '企业数量以有效取水许可证为统计单元，同一企业多张证照按证照分别归集后再去重统计规上企业。',
      '年许可总量按规上企业证照的许可水量汇总，并展示其占全域许可水量的比例。',
      '取水量排名与许可执行进度均关联企业证照、计量水量和年度累计取水数据。',
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
  selectedAdministrativeRegion.value = '西宁市';
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

// ================= 青海省 → 市州 → 区县 三级行政区划 =================
const xiningCountyList = ['城东区', '城中区', '城西区', '城北区', '湟中区', '湟源县', '大通县'];
const qinghaiCityOptions = [
  '西宁市',
  '海东市',
  '海北藏族自治州',
  '黄南藏族自治州',
  '海南藏族自治州',
  '果洛藏族自治州',
  '玉树藏族自治州',
  '海西蒙古族藏族自治州',
];
const qinghaiCountyOptionsByCity: Record<string, string[]> = {
  '西宁市': xiningCountyList,
  '海东市': ['乐都区', '平安区', '民和回族土族自治县', '互助土族自治县', '化隆回族自治县', '循化撒拉族自治县'],
  '海北藏族自治州': ['门源回族自治县', '祁连县', '海晏县', '刚察县'],
  '黄南藏族自治州': ['同仁市', '尖扎县', '泽库县', '河南蒙古族自治县'],
  '海南藏族自治州': ['共和县', '同德县', '贵德县', '兴海县', '贵南县'],
  '果洛藏族自治州': ['玛沁县', '班玛县', '甘德县', '达日县', '久治县', '玛多县'],
  '玉树藏族自治州': ['玉树市', '杂多县', '称多县', '治多县', '囊谦县', '曲麻莱县'],
  '海西蒙古族藏族自治州': ['德令哈市', '格尔木市', '茫崖市', '乌兰县', '都兰县', '天峻县'],
};
const allAdministrativeCountyOptions = Object.values(qinghaiCountyOptionsByCity).flat();
const searchableAdministrativeRegions = ['青海省', ...qinghaiCityOptions, ...allAdministrativeCountyOptions];
const selectedAdministrativeRegion = ref('西宁市');

const administrativeSelectionLabel = computed(() => {
  if (selectedAdministrativeRegion.value === '青海省') return '青海省';
  return selectedAdministrativeRegion.value;
});

const selectedAdministrativeProvince = computed({
  get: () => '青海省',
  set: (province: string) => {
    if (province === '青海省') {
      selectAdministrativeRegion('青海省');
    }
  },
});

const selectedAdministrativeCity = computed({
  get: () => {
    const region = selectedAdministrativeRegion.value;
    if (region === '青海省') return '西宁市';
    const countyCity = Object.entries(qinghaiCountyOptionsByCity)
      .find(([, counties]) => counties.includes(region))?.[0];
    if (countyCity) return countyCity;
    return qinghaiCityOptions.includes(region) ? region : '西宁市';
  },
  set: (city: string) => {
    if (qinghaiCityOptions.includes(city)) {
      selectAdministrativeRegion(city);
    }
  },
});

const administrativeCountyOptions = computed(() => qinghaiCountyOptionsByCity[selectedAdministrativeCity.value] || []);

const selectedAdministrativeCounty = computed({
  get: () => {
    const region = selectedAdministrativeRegion.value;
    return allAdministrativeCountyOptions.includes(region) ? region : '';
  },
  set: (county: string) => {
    if (county) {
      selectAdministrativeRegion(county);
      return;
    }
    selectAdministrativeRegion(selectedAdministrativeCity.value);
  },
});

function selectAdministrativeRegion(region: '青海省' | '西宁市' | string) {
  if (
    region !== '青海省'
    && !qinghaiCityOptions.includes(region)
    && !allAdministrativeCountyOptions.includes(region)
  ) return;
  selectedAdministrativeRegion.value = region;
}

watch(selectedAdministrativeRegion, (region) => {
  const districtScope = region === '青海省' ? '西宁市' : region;
  if (filterParams.value.district !== districtScope) {
    filterParams.value.district = districtScope;
  }
});

watch(() => filterParams.value.district, (district) => {
  if (selectedAdministrativeRegion.value === '青海省' && district === '西宁市') return;
  if (selectedAdministrativeRegion.value !== district) {
    selectedAdministrativeRegion.value = district;
  }
});

// ================= 深色年份筛选菜单 =================
const yearFilterOptions = ['2026', '2025', '2024'];
const isYearMenuOpen = ref(false);
const yearFilterRef = ref<HTMLElement | null>(null);

function selectYearFilter(year: string) {
  filterParams.value.year = year;
  isYearMenuOpen.value = false;
}

function handleYearOutsidePointer(event: PointerEvent) {
  if (!yearFilterRef.value?.contains(event.target as Node)) {
    isYearMenuOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener('pointerdown', handleYearOutsidePointer);
});

onUnmounted(() => {
  document.removeEventListener('pointerdown', handleYearOutsidePointer);
});

// Layer Toggles (综合场景: 三项专题图层；专项场景: 计量点 / 计量监控 / 国控计量点 / 预警事件)
const activeLayers = ref({
  approvalRatio: true, // 综合应用场景图层1：审批管控占比
  meterOver: true,     // 综合应用场景图层2：计量超许可点位
  overPlanLabel: true, // 综合应用场景图层3：直报/税务/执行超计划悬浮标签
  meterMonitoring: true, // 专项应用场景：计量设施运行状态监控图层
  users: false,       // 综合应用场景：重点用水户可选叠加
  meters: false,      // 专项应用场景：计量点
  nationalControl: false, // 专项应用场景：国控计量点
  warnings: false,    // 专项应用场景：预警事件
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

// ================= 综合应用场景：五类预警研判图例与地图表达 =================
type MapLegendTypeId = 'approval' | 'meterOver' | 'directOver' | 'taxOver' | 'actualOver';
type MapLegendDisplayMode = 'region-color' | 'certificate-points';

interface MapLegendType {
  id: MapLegendTypeId;
  label: string;
  shortLabel: string;
  color: string;
  displayMode: MapLegendDisplayMode;
  description: string;
  totalLabel: string;
}

const mapLegendTypes: MapLegendType[] = [
  {
    id: 'approval',
    label: '审批管控占比',
    shortLabel: '审批管控占比',
    color: '#f87171',
    displayMode: 'region-color',
    description: '按行政区划展示审批量占管控指标比例，四档分级填色',
    totalLabel: '7区县',
  },
  {
    id: 'meterOver',
    label: '计量超许可',
    shortLabel: '计量超许可',
    color: '#ef4444',
    displayMode: 'certificate-points',
    description: '计量点维度：超许可计量点以脉冲告警点位显示',
    totalLabel: '3处计量点',
  },
  {
    id: 'directOver',
    label: '直报超许可',
    shortLabel: '直报超许可',
    color: '#FF9F43',
    displayMode: 'certificate-points',
    description: '证照维度：每张直报超许可取水许可证标注一个点位',
    totalLabel: '2张证照',
  },
  {
    id: 'taxOver',
    label: '税务申报水量超计划',
    shortLabel: '税务超计划',
    color: '#38BDF8',
    displayMode: 'certificate-points',
    description: '证照维度：每张税务申报超计划取水许可证标注一个点位',
    totalLabel: '7张证照',
  },
  {
    id: 'actualOver',
    label: '执行超用水计划',
    shortLabel: '执行超用水计划',
    color: '#A78BFA',
    displayMode: 'certificate-points',
    description: '证照维度：每张执行超用水计划取水许可证标注一个点位',
    totalLabel: '10张证照',
  },
];

// 综合场景当前接入图层1与图层2；图层3将在后续按口径扩展。
const activeMapLegendTypes = ref<MapLegendTypeId[]>(['approval', 'meterOver']);
const activeMapLegendType = computed(() => activeMapLegendTypes.value[0] || 'approval');
const activeMapLegend = computed(() => mapLegendTypes.find(type => type.id === activeMapLegendType.value) || mapLegendTypes[0]);

function isMapLegendTypeActive(typeId: MapLegendTypeId): boolean {
  return activeMapLegendTypes.value.includes(typeId);
}

function syncComprehensiveLayerTypes() {
  const types: MapLegendTypeId[] = [];
  if (activeLayers.value.approvalRatio) types.push('approval');
  if (activeLayers.value.meterOver) types.push('meterOver');
  activeMapLegendTypes.value = types;
}

function toggleApprovalRatioLayer() {
  activeLayers.value.approvalRatio = !activeLayers.value.approvalRatio;
  syncComprehensiveLayerTypes();
}

function toggleMeterOverMapLayer() {
  activeLayers.value.meterOver = !activeLayers.value.meterOver;
  syncComprehensiveLayerTypes();
}

function toggleOverPlanLabelLayer() {
  activeLayers.value.overPlanLabel = !activeLayers.value.overPlanLabel;
  if (!activeLayers.value.overPlanLabel) {
    showOverPlanBubble.value = false;
    selectedOverPlanDistrictName.value = null;
  }
}

function toggleOverPlanDistrictBubble(districtName: string) {
  if (selectedOverPlanDistrictName.value === districtName && showOverPlanBubble.value) {
    showOverPlanBubble.value = false;
    return;
  }
  selectedOverPlanDistrictName.value = districtName;
  showOverPlanBubble.value = true;
}

function toggleMapLegendType(typeId: MapLegendTypeId) {
  activeMapLegendTypes.value = isMapLegendTypeActive(typeId)
    ? activeMapLegendTypes.value.filter(id => id !== typeId)
    : mapLegendTypes.map(type => type.id).filter(id => id === typeId || isMapLegendTypeActive(id));
}

function showAllMapLegendTypes() {
  activeMapLegendTypes.value = mapLegendTypes.map(type => type.id);
}

type LicenseWarningTypeId = Exclude<MapLegendTypeId, 'approval'>;

interface LicenseWarningMarker {
  id: string;
  typeId: LicenseWarningTypeId;
  licenseNo: string;
  licensee: string;
  district: string;
  meterName?: string;
  meterCode?: string;
  accessMethod?: string;
  x: number;
  y: number;
  currentValue: number;
  limitValue: number;
  ratio: number;
  time: string;
  color: string;
}

const licenseWarningMarkerSeed: Omit<LicenseWarningMarker, 'color'>[] = [
  {
    id: 'cert-meter-01',
    typeId: 'meterOver',
    licenseNo: '取水（青）字〔2022〕第031号',
    licensee: '青海湟源大华耐火新材料有限公司',
    district: '湟源县',
    meterName: '大华工业园区特种耐火材料车间取水口',
    meterCode: 'JLD-630123-0022',
    accessMethod: '在线计量 · 4G远传',
    x: 439,
    y: 482,
    currentValue: 2153.75,
    limitValue: 1910.0,
    ratio: 112.7,
    time: '05-20 08:10',
  },
  {
    id: 'cert-meter-02',
    typeId: 'meterOver',
    licenseNo: '取水（青）字〔2021〕第018号',
    licensee: '青海黄家寨热电有限公司',
    district: '大通县',
    meterName: '黄家寨煤电热力循环供水管高精度测点',
    meterCode: 'JLD-630122-0039',
    accessMethod: '在线计量 · 专线接入',
    x: 552,
    y: 232,
    currentValue: 4826.4,
    limitValue: 4418.0,
    ratio: 109.2,
    time: '05-20 07:56',
  },
  {
    id: 'cert-meter-03',
    typeId: 'meterOver',
    licenseNo: '取水（青）字〔2023〕第045号',
    licensee: '青海水泥股份有限公司',
    district: '城东区',
    meterName: '青海水泥八一路干法生产线总进水主表',
    meterCode: 'JLD-630101-0010',
    accessMethod: '在线计量 · 物联网网关',
    x: 684,
    y: 469,
    currentValue: 3618.2,
    limitValue: 3284.0,
    ratio: 110.2,
    time: '05-20 07:42',
  },
  {
    id: 'cert-direct-01',
    typeId: 'directOver',
    licenseNo: '取水（青）字〔2022〕第009号',
    licensee: '青海南川高科半导体材料有限公司',
    district: '城中区',
    x: 633,
    y: 536,
    currentValue: 6512.44,
    limitValue: 6184.6,
    ratio: 105.3,
    time: '05-20 07:45',
  },
  {
    id: 'cert-direct-02',
    typeId: 'directOver',
    licenseNo: '取水（青）字〔2020〕第022号',
    licensee: '鲁沙尔万亩现代化灌区',
    district: '湟中区',
    x: 554,
    y: 585,
    currentValue: 7288.1,
    limitValue: 7026.4,
    ratio: 103.7,
    time: '05-20 07:31',
  },
  {
    id: 'cert-tax-01',
    typeId: 'taxOver',
    licenseNo: '取水（青）字〔2019〕第016号',
    licensee: '青海祁连山水泥有限公司',
    district: '湟中区',
    x: 577,
    y: 566,
    currentValue: 5326.18,
    limitValue: 5140.1,
    ratio: 103.6,
    time: '05-20 07:30',
  },
  {
    id: 'cert-tax-02',
    typeId: 'taxOver',
    licenseNo: '取水（青）字〔2021〕第027号',
    licensee: '青海海湖铝业高科',
    district: '城北区',
    x: 612,
    y: 428,
    currentValue: 3862.7,
    limitValue: 3690.5,
    ratio: 104.7,
    time: '05-20 07:22',
  },
  {
    id: 'cert-tax-03',
    typeId: 'taxOver',
    licenseNo: '取水（青）字〔2022〕第011号',
    licensee: '西宁中区供水工程运营处',
    district: '城中区',
    x: 646,
    y: 510,
    currentValue: 2948.4,
    limitValue: 2862.1,
    ratio: 103.0,
    time: '05-20 07:16',
  },
  {
    id: 'cert-tax-04',
    typeId: 'taxOver',
    licenseNo: '取水（青）字〔2023〕第038号',
    licensee: '西宁城东供水运营有限公司',
    district: '城东区',
    x: 681,
    y: 493,
    currentValue: 3421.9,
    limitValue: 3306.4,
    ratio: 103.5,
    time: '05-20 07:08',
  },
  {
    id: 'cert-tax-05',
    typeId: 'taxOver',
    licenseNo: '取水（青）字〔2020〕第014号',
    licensee: '大通县现代农业科技示范园',
    district: '大通县',
    x: 523,
    y: 265,
    currentValue: 2688.5,
    limitValue: 2580.2,
    ratio: 104.2,
    time: '05-20 06:58',
  },
  {
    id: 'cert-tax-06',
    typeId: 'taxOver',
    licenseNo: '取水（青）字〔2022〕第042号',
    licensee: '湟源县润泉自来水有限责任公司',
    district: '湟源县',
    x: 405,
    y: 500,
    currentValue: 1874.6,
    limitValue: 1798.2,
    ratio: 104.2,
    time: '05-20 06:46',
  },
  {
    id: 'cert-tax-07',
    typeId: 'taxOver',
    licenseNo: '取水（青）字〔2018〕第006号',
    licensee: '青海绿岛酒店物业管理有限公司',
    district: '城西区',
    x: 586,
    y: 474,
    currentValue: 1268.7,
    limitValue: 1238.1,
    ratio: 102.5,
    time: '05-20 06:35',
  },
  {
    id: 'cert-actual-01',
    typeId: 'actualOver',
    licenseNo: '取水（青）字〔2021〕第023号',
    licensee: '湟中联合钢铁取水站',
    district: '湟中区',
    x: 594,
    y: 545,
    currentValue: 4128.9,
    limitValue: 4055.9,
    ratio: 101.8,
    time: '05-20 07:12',
  },
  {
    id: 'cert-actual-02',
    typeId: 'actualOver',
    licenseNo: '取水（青）字〔2022〕第037号',
    licensee: '城北双苏供水加压站',
    district: '城北区',
    x: 661,
    y: 452,
    currentValue: 2386.2,
    limitValue: 2342.9,
    ratio: 101.8,
    time: '05-20 07:02',
  },
  {
    id: 'cert-actual-03',
    typeId: 'actualOver',
    licenseNo: '取水（青）字〔2020〕第019号',
    licensee: '湟中区鲁沙尔镇农业综合服务中心',
    district: '湟中区',
    x: 520,
    y: 596,
    currentValue: 3562.4,
    limitValue: 3498.6,
    ratio: 101.8,
    time: '05-20 06:54',
  },
  {
    id: 'cert-actual-04',
    typeId: 'actualOver',
    licenseNo: '取水（青）字〔2023〕第026号',
    licensee: '西宁海湖新区市政服务有限公司',
    district: '城西区',
    x: 609,
    y: 487,
    currentValue: 2148.7,
    limitValue: 2109.2,
    ratio: 101.9,
    time: '05-20 06:43',
  },
  {
    id: 'cert-actual-05',
    typeId: 'actualOver',
    licenseNo: '取水（青）字〔2021〕第034号',
    licensee: '青海省引大济湟工程建设管理局',
    district: '大通县',
    x: 550,
    y: 205,
    currentValue: 4861.5,
    limitValue: 4776.8,
    ratio: 101.8,
    time: '05-20 06:31',
  },
  {
    id: 'cert-actual-06',
    typeId: 'actualOver',
    licenseNo: '取水（青）字〔2022〕第048号',
    licensee: '西宁市城东区市政公用服务中心',
    district: '城东区',
    x: 710,
    y: 514,
    currentValue: 2766.8,
    limitValue: 2718.3,
    ratio: 101.8,
    time: '05-20 06:18',
  },
  {
    id: 'cert-actual-07',
    typeId: 'actualOver',
    licenseNo: '取水（青）字〔2019〕第012号',
    licensee: '西宁市南山生态景区管理处',
    district: '城中区',
    x: 652,
    y: 568,
    currentValue: 1186.4,
    limitValue: 1165.8,
    ratio: 101.8,
    time: '05-20 06:06',
  },
  {
    id: 'cert-actual-08',
    typeId: 'actualOver',
    licenseNo: '取水（青）字〔2021〕第029号',
    licensee: '湟源县丹噶尔文化旅游投资公司',
    district: '湟源县',
    x: 424,
    y: 518,
    currentValue: 863.2,
    limitValue: 848.0,
    ratio: 101.8,
    time: '05-20 05:52',
  },
  {
    id: 'cert-actual-09',
    typeId: 'actualOver',
    licenseNo: '取水（青）字〔2020〕第033号',
    licensee: '西宁市城北区园林绿化管护中心',
    district: '城北区',
    x: 648,
    y: 416,
    currentValue: 1594.3,
    limitValue: 1565.9,
    ratio: 101.8,
    time: '05-20 05:40',
  },
  {
    id: 'cert-actual-10',
    typeId: 'actualOver',
    licenseNo: '取水（青）字〔2022〕第040号',
    licensee: '大通县景阳镇农田节水灌溉合作联社',
    district: '大通县',
    x: 488,
    y: 292,
    currentValue: 3286.7,
    limitValue: 3227.6,
    ratio: 101.8,
    time: '05-20 05:26',
  },
];

const licenseWarningMarkers = computed<LicenseWarningMarker[]>(() =>
  licenseWarningMarkerSeed.map(marker => ({
    ...marker,
    color: mapLegendTypes.find(type => type.id === marker.typeId)?.color ?? '#8FB6D4',
  }))
);

const hoveredMeterOverMarker = ref<LicenseWarningMarker | null>(null);

interface OverPlanWarningGroupDefinition {
  typeId: Extract<LicenseWarningTypeId, 'directOver' | 'taxOver' | 'actualOver'>;
  label: string;
  shortLabel: string;
  color: string;
}

const overPlanWarningGroupDefinitions: OverPlanWarningGroupDefinition[] = [
  { typeId: 'directOver', label: '直报超许可', shortLabel: '直报', color: '#FF9F43' },
  { typeId: 'taxOver', label: '税务超计划', shortLabel: '税务', color: '#38BDF8' },
  { typeId: 'actualOver', label: '执行超计划', shortLabel: '执行', color: '#A78BFA' },
];

const overPlanWarningGroups = computed(() =>
  overPlanWarningGroupDefinitions.map(group => ({
    ...group,
    items: licenseWarningMarkers.value
      .filter(marker => marker.typeId === group.typeId)
      .sort((a, b) => b.ratio - a.ratio),
  }))
);

const showOverPlanBubble = ref(false);
const selectedOverPlanDistrictName = ref<string | null>(null);

const overPlanDistrictLabelAnchors: Record<string, { x: number; y: number }> = {
  '大通县': { x: 520, y: 150 },
  '城北区': { x: 620, y: 350 },
  '城西区': { x: 500, y: 405 },
  '城东区': { x: 740, y: 430 },
  '湟源县': { x: 480, y: 520 },
  '城中区': { x: 680, y: 530 },
  '湟中区': { x: 620, y: 600 },
};

const overPlanDistrictSummaries = computed(() =>
  xiningDistrictsGeo.map(geo => {
    const name = normalizeDistrictName(geo.name);
    const groups = overPlanWarningGroupDefinitions.map(group => ({
      ...group,
      items: licenseWarningMarkers.value.filter(marker =>
        marker.typeId === group.typeId && normalizeDistrictName(marker.district) === name
      ),
    }));
    return {
      name,
      center: geo.center,
      anchor: overPlanDistrictLabelAnchors[name] ?? { x: geo.center[0], y: geo.center[1] - 30 },
      groups,
      total: groups.reduce((sum, group) => sum + group.items.length, 0),
    };
  })
);

const selectedOverPlanDistrictSummary = computed(() =>
  overPlanDistrictSummaries.value.find(item => item.name === selectedOverPlanDistrictName.value) ?? null
);

interface CertificateAnnualWaterStats {
  metered: number;
  reported: number;
  tax: number;
  licensed: number;
  planned: number;
  execution: number;
}

// 单张证照本年累计水量，单位：万m³
const certificateAnnualWaterStatsById: Record<string, CertificateAnnualWaterStats> = {
  'cert-meter-01': { metered: 2153.75, reported: 2088.4, tax: 2012.8, licensed: 1910.0, planned: 1875.0, execution: 2090.2 },
  'cert-meter-02': { metered: 4826.4, reported: 4610.8, tax: 4558.2, licensed: 4418.0, planned: 4280.0, execution: 4685.3 },
  'cert-meter-03': { metered: 3618.2, reported: 3475.6, tax: 3410.7, licensed: 3284.0, planned: 3210.0, execution: 3524.8 },
  'cert-direct-01': { metered: 6418.3, reported: 6512.44, tax: 6102.8, licensed: 6184.6, planned: 6040.0, execution: 6598.1 },
  'cert-direct-02': { metered: 7132.6, reported: 7288.1, tax: 7010.2, licensed: 7026.4, planned: 6890.0, execution: 7315.7 },
  'cert-tax-01': { metered: 5490.4, reported: 5388.2, tax: 5326.18, licensed: 5140.1, planned: 5218.4, execution: 5419.6 },
  'cert-tax-02': { metered: 3950.2, reported: 3814.6, tax: 3862.7, licensed: 3690.5, planned: 3748.3, execution: 3895.1 },
  'cert-tax-03': { metered: 3024.1, reported: 2978.5, tax: 2948.4, licensed: 2862.1, planned: 2900.0, execution: 2996.8 },
  'cert-tax-04': { metered: 3508.6, reported: 3462.1, tax: 3421.9, licensed: 3306.4, planned: 3350.8, execution: 3495.7 },
  'cert-tax-05': { metered: 2742.8, reported: 2712.6, tax: 2688.5, licensed: 2580.2, planned: 2638.4, execution: 2731.9 },
  'cert-tax-06': { metered: 1902.4, reported: 1888.7, tax: 1874.6, licensed: 1798.2, planned: 1832.6, execution: 1915.3 },
  'cert-tax-07': { metered: 1306.2, reported: 1288.1, tax: 1268.7, licensed: 1238.1, planned: 1248.5, execution: 1299.4 },
};

const meterOverHoverStats = computed(() => {
  const marker = hoveredMeterOverMarker.value;
  if (!marker) return null;
  return certificateAnnualWaterStatsById[marker.id] ?? {
    metered: marker.currentValue,
    reported: marker.currentValue,
    tax: marker.currentValue,
    licensed: marker.limitValue,
    planned: marker.limitValue,
    execution: marker.currentValue,
  };
});

const meterOverHoverWaterMetrics = computed(() => {
  const stats = meterOverHoverStats.value;
  if (!stats) return [];
  return [
    { label: '累计计量水量', value: stats.metered, color: '#FF8A95' },
    { label: '直报水量', value: stats.reported, color: '#9BEAFF' },
    { label: '税务水量', value: stats.tax, color: '#77B9FF' },
    { label: '许可水量', value: stats.licensed, color: '#FFC65C' },
    { label: '计划水量', value: stats.planned, color: '#DCF2FF' },
    { label: '执行水量', value: stats.execution, color: '#C4B5FD' },
  ];
});

interface ApprovalControlLevel {
  id: 'over100' | '75to100' | '50to75' | 'below50';
  range: string;
  label: string;
  color: string;
  strokeColor: string;
  opacity: number;
  warning: boolean;
}

const approvalControlLevels: ApprovalControlLevel[] = [
  { id: 'over100', range: '占比 > 100%', label: '大于100%', color: '#ef4444', strokeColor: '#fca5a5', opacity: 0.5, warning: true },
  { id: '75to100', range: '75% ≤ 占比 ≤ 100%', label: '75%–100%', color: '#f59e0b', strokeColor: '#fbbf24', opacity: 0.4, warning: false },
  { id: '50to75', range: '50% ≤ 占比 < 75%', label: '50%–75%', color: '#38bdf8', strokeColor: '#7dd3fc', opacity: 0.34, warning: false },
  { id: 'below50', range: '占比 < 50%', label: '小于50%', color: '#10b981', strokeColor: '#6ee7b7', opacity: 0.28, warning: false },
];

const approvalControlRates: Record<string, number> = {
  '湟中区': 108.2,
  '大通县': 96.4,
  '城北区': 88.6,
  '城东区': 72.5,
  '城西区': 64.8,
  '城中区': 58.3,
  '湟源县': 46.2,
};

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
 * 依据真实地理中心自适应微调标签坐标（避免城东/城中/城西/城北近邻重叠）
 */
function getDistrictLabelPosition(district: { name: string; center: [number, number] }): { x: number; y: number } {
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
  return { x, y };
}

function getDistrictBadgeTransform(district: { name: string; center: [number, number] }): string {
  const { x, y } = getDistrictLabelPosition(district);
  return `translate(${x}, ${y})`;
}

function getDistrictUsage(districtName: string): number {
  return getDistrictQuota(districtName).usage;
}

function getDistrictTier(districtName: string): WaterUsageTier | undefined {
  const quota = getDistrictQuota(districtName);
  return waterUsageTiers.find(t => t.id === quota.tierId);
}

function getApprovalControlRate(rawName: string): number {
  return approvalControlRates[normalizeDistrictName(rawName)] ?? 0;
}

function getApprovalControlLevel(rawName: string): ApprovalControlLevel {
  const rate = getApprovalControlRate(rawName);
  if (rate > 100) return approvalControlLevels[0];
  if (rate >= 75) return approvalControlLevels[1];
  if (rate >= 50) return approvalControlLevels[2];
  return approvalControlLevels[3];
}

function isApprovalWarningDistrict(rawName: string): boolean {
  return scenarioMode.value === 'comprehensive'
    && isMapLegendTypeActive('approval')
    && getApprovalControlLevel(rawName).warning;
}

function getLicenseWarningCountByDistrict(rawName: string, typeId: LicenseWarningTypeId): number {
  const name = normalizeDistrictName(rawName);
  return licenseWarningMarkers.value.filter(marker =>
    marker.typeId === typeId && normalizeDistrictName(marker.district) === name
  ).length;
}

function getLicenseWarningTypeLabel(typeId: LicenseWarningTypeId): string {
  if (typeId === 'meterOver') return '计量超许可';
  if (typeId === 'directOver') return '直报超许可';
  if (typeId === 'taxOver') return '税务超计划';
  return '执行超用水计划';
}

function showLicenseMarkerHover(marker: LicenseWarningMarker) {
  if (marker.typeId === 'meterOver') {
    hoveredMeterOverMarker.value = marker;
  }
}

function hideLicenseMarkerHover(marker: LicenseWarningMarker) {
  if (hoveredMeterOverMarker.value?.id === marker.id) {
    hoveredMeterOverMarker.value = null;
  }
}

function handleLicenseWarningMarker(marker: LicenseWarningMarker) {
  if (marker.typeId === 'meterOver') return;
  filterParams.value.district = marker.district;
  hoveredDistrictName.value = marker.district;
  openCertificateWarningDetail(marker);
}

function getDistrictMapTitle(rawName: string): string {
  const name = normalizeDistrictName(rawName);
  if (scenarioMode.value === 'comprehensive') {
    const summary: string[] = [];
    if (isMapLegendTypeActive('approval')) {
      summary.push(`审批管控占比 ${getApprovalControlRate(rawName).toFixed(1)}%`);
    }
    if (isMapLegendTypeActive('meterOver')) {
      summary.push(`计量超许可 ${getLicenseWarningCountByDistrict(rawName, 'meterOver')} 个计量点`);
    }
    if (isMapLegendTypeActive('directOver')) {
      summary.push(`直报超许可 ${getLicenseWarningCountByDistrict(rawName, 'directOver')} 张证照`);
    }
    if (isMapLegendTypeActive('taxOver')) {
      summary.push(`税务超计划 ${getLicenseWarningCountByDistrict(rawName, 'taxOver')} 张证照`);
    }
    if (isMapLegendTypeActive('actualOver')) {
      summary.push(`执行超月计划 ${getLicenseWarningCountByDistrict(rawName, 'actualOver')} 张证照`);
    }
    return summary.length > 0 ? `${name} - ${summary.join(' | ')}` : `${name} - 当前未叠加研判图层`;
  }
  const quota = getDistrictQuota(rawName);
  return `${name} - 计划: ${quota.planned}万m³, 直报: ${quota.reported}万m³`;
}

function getComprehensiveHoverTransform(rawName: string): string {
  const geo = xiningDistrictsGeo.find(d => d.name === rawName || normalizeDistrictName(d.name) === normalizeDistrictName(rawName));
  const cx = geo ? geo.center[0] : 500;
  const cy = geo ? geo.center[1] - 50 : 300;
  return `translate(${cx}, ${cy})`;
}

function getActiveMapAccent(rawName: string): string {
  if (activeMapLegendType.value === 'approval') return getApprovalControlLevel(rawName).strokeColor;
  if (activeMapLegendType.value === 'meterOver') return '#f87171';
  return activeMapLegend.value.color;
}

function getActiveMapHoverValue(rawName: string): string {
  const typeId = activeMapLegendType.value;
  if (typeId === 'approval') return `审批管控占比 ${getApprovalControlRate(rawName).toFixed(1)}%`;
  if (typeId === 'meterOver') return `计量超许可 ${getLicenseWarningCountByDistrict(rawName, 'meterOver')} 个计量点`;
  return `${getLicenseWarningTypeLabel(typeId)} ${getLicenseWarningCountByDistrict(rawName, typeId)} 张证照`;
}

function getDistrictFill(districtName: string): string {
  const isSelectedOrHovered = hoveredDistrictName.value === districtName || filterParams.value.district === districtName || filterParams.value.district === normalizeDistrictName(districtName);
  if (scenarioMode.value === 'comprehensive') {
    if (isMapLegendTypeActive('approval')) return getApprovalControlLevel(districtName).color;
    return isSelectedOrHovered ? '#1E7BE8' : '#0E4C6E';
  }
  return isSelectedOrHovered ? '#00b4d8' : '#0ea5e9';
}

function getDistrictFillOpacity(districtName: string): number {
  const isSelectedOrHovered = hoveredDistrictName.value === districtName || filterParams.value.district === districtName || filterParams.value.district === normalizeDistrictName(districtName);
  if (scenarioMode.value === 'comprehensive') {
    if (isMapLegendTypeActive('approval')) {
      const baseOpacity = getApprovalControlLevel(districtName).opacity * 0.52;
      return isSelectedOrHovered ? Math.min(0.3, baseOpacity + 0.05) : baseOpacity;
    }
    if (isSelectedOrHovered) return 0.58;
    return 0.30;
  }
  return isSelectedOrHovered ? 0.42 : 0.20;
}

/**
 * 行政区划边界描边颜色：审批管控占比图层不绘制内部边框
 */
function getDistrictStroke(districtName: string): string {
  const isSelectedOrHovered = hoveredDistrictName.value === districtName || filterParams.value.district === districtName || filterParams.value.district === normalizeDistrictName(districtName);
  if (scenarioMode.value === 'comprehensive') {
    if (isMapLegendTypeActive('approval')) return 'transparent';
    if (isSelectedOrHovered) return '#ffffff';
    return '#2c7da0';
  }
  return isSelectedOrHovered ? '#00e5ff' : '#67e8f9';
}

/**
 * 行政区划边界描边线宽：审批管控占比图层不绘制内部边框
 */
function getDistrictStrokeWidth(districtName: string): number {
  const isSelectedOrHovered = hoveredDistrictName.value === districtName || filterParams.value.district === districtName || filterParams.value.district === normalizeDistrictName(districtName);
  if (scenarioMode.value === 'comprehensive' && isMapLegendTypeActive('approval')) return 0;
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


// 计量点状态筛选 (全部 / 正常 / 停用 / 故障 / 待检定)
type MeterStatus = 'normal' | 'offline' | 'fault' | 'pending';
type MeterStatusFilter = 'all' | MeterStatus;

const meterStatusFilter = ref<MeterStatusFilter>('all');
const monitoringStatusFilter = ref<MeterStatusFilter>('all');

// 计量点详情弹窗与悬浮提示状态
const showMeterDetailModal = ref(false);
const showMeterWaterModal = ref(false);
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
  meterStatus: MeterStatus;  // 计量状态: 正常 | 停用 | 故障 | 待检定
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
  offlineReason?: string;    // 停用说明 (若停用)
  x: number;                 // SVG x 坐标
  y: number;                 // SVG y 坐标
}

function getMeterStatusLabel(status: MeterStatus): string {
  if (status === 'normal') return '正常';
  if (status === 'offline') return '停用';
  if (status === 'fault') return '故障';
  return '待检定';
}

function getMeterStatusColor(status: MeterStatus): string {
  if (status === 'normal') return '#10b981';
  if (status === 'offline') return '#8FB6D4';
  if (status === 'fault') return '#ef4444';
  return '#f59e0b';
}

function getMeterStatusBadgeClass(status: MeterStatus): string {
  if (status === 'normal') return 'bg-[#3DDC97]/15 text-[#71E7B4] border-[#3DDC97]/35';
  if (status === 'offline') return 'bg-[#8FB6D4]/12 text-[#B9D1E5] border-[#8FB6D4]/30';
  if (status === 'fault') return 'bg-[#FF6B7A]/15 text-[#FF9AA4] border-[#FF6B7A]/35';
  return 'bg-[#FFC65C]/15 text-[#FFD88C] border-[#FFC65C]/35';
}

function getMeterWaterSource(meter: MeterPoint): string {
  if (meter.waterType.includes('市政') || meter.waterType.includes('公共')) return '公共供水（计量）';
  return '自计量（计量）';
}

function getMeterWaterReportMethod(meter: MeterPoint): string {
  return meter.meterStatus === 'offline' ? '人工上报' : '协议接收';
}

function getMeterDailyDisplayVolume(meter: MeterPoint): number {
  return meter.dailyAccumulated > 0
    ? meter.dailyAccumulated
    : Math.max(120, Math.round(meter.instantFlow * 12));
}

function getMeterMonthVolume(meter: MeterPoint): number {
  return (getMeterDailyDisplayVolume(meter) * 21) / 10000;
}

function getMeterYearVolume(meter: MeterPoint): number {
  return getMeterMonthVolume(meter) * 8.6;
}

function getMeterPreviousDayVolume(meter: MeterPoint): number {
  return Math.max(1, Math.round(getMeterDailyDisplayVolume(meter) * 0.86));
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
  alarmType: string;
  orderNo: string;
  orderStatus: string;
  timeoutStatus: string;
  orderType: string;
  facilityName: string;
  facilityCode: string;
  latestAlarmTime: string;
  alarmContent: string;
  disposalTimeRange: string;
  maintenanceUnit: string;
  maintenancePerson: string;
  contactPhone: string;
  alarmCause: string;
  handlingStatus: string;
  attachments: string;
  x: number;
  y: number;
}

// 模拟全西宁市 31 个代表性计量点分布 (涵盖 4区3县，区分正常、停用、故障、待检定)
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
    meterStatus: 'offline',
    district: '城西区',
    userEnterprise: '青海绿岛酒店物业管理有限公司',
    waterType: '市政中水管网',
    instantFlow: 0,
    dailyAccumulated: 0,
    checkAgency: '青海省计量检定测试院',
    certificateNo: 'QH-JL-2024-07221',
    checkCycle: '12个月',
    offlineReason: '换热站按计划停运检修，计量设施已同步停用并保持关阀状态',
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
    meterStatus: 'offline',
    district: '湟源县',
    userEnterprise: '日月乡农牧节水灌溉合作联社',
    waterType: '高标准农田地表水',
    instantFlow: 0,
    dailyAccumulated: 0,
    checkAgency: '青海省水文水资源测报中心',
    certificateNo: 'QH-SW-2024-05258',
    checkCycle: '12个月',
    offlineReason: '灌溉季结束，按计划停用分水闸计量设施并完成设备保养',
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
  {
    id: 'w-1',
    title: '东川园区某微电子企业设备断线',
    level: 'red',
    levelLabel: '高风险',
    district: '城东区',
    enterprise: '青晶微电子半导体',
    desc: '通信中断超24小时，数据缺失',
    time: '10:15:22',
    alarmType: '数据断报',
    orderNo: 'GJGD20261027000601',
    orderStatus: '待处置',
    timeoutStatus: '未超时',
    orderType: '普通',
    facilityName: '东川工业园区微电子企业取水计量点',
    facilityCode: '630102JL00412',
    latestAlarmTime: '2026-10-27 10:15:22',
    alarmContent: '终端连续24小时未上报遥测数据，心跳信号中断，系统已自动补0并对账。',
    disposalTimeRange: '2026-10-27 10:30:00 至 2026-11-03 10:30:00',
    maintenanceUnit: '城东区水务综合执法大队',
    maintenancePerson: '张伟',
    contactPhone: '0971-8123456',
    alarmCause: '现场4G通信模块无响应',
    handlingStatus: '已派单，等待运维人员到场核查',
    attachments: '--',
    x: 685,
    y: 525,
  },
  {
    id: 'w-2',
    title: '南山公园水泵站流速反向超差',
    level: 'orange',
    levelLabel: '中风险',
    district: '城中区',
    enterprise: '南山生态景区管理处',
    desc: '瞬时流速突发负差异常',
    time: '09:40:11',
    alarmType: '负值告警',
    orderNo: 'GJGD20261027000602',
    orderStatus: '工单处理中',
    timeoutStatus: '未超时',
    orderType: '普通',
    facilityName: '南山公园水泵站进水计量点',
    facilityCode: '630103JL00186',
    latestAlarmTime: '2026-10-27 09:40:11',
    alarmContent: '瞬时流量连续3个采集周期出现负值，系统已标记异常并暂停该时段水量累计。',
    disposalTimeRange: '2026-10-27 09:48:00 至 2026-11-03 09:48:00',
    maintenanceUnit: '城中区供水保障所',
    maintenancePerson: '李海平',
    contactPhone: '0971-8234678',
    alarmCause: '疑似流量计接线极性反接',
    handlingStatus: '运维人员已到场，正在校验信号接线',
    attachments: '--',
    x: 622,
    y: 548,
  },
  {
    id: 'w-3',
    title: '湟源大华耐火车间空管干烧告警',
    level: 'red',
    levelLabel: '高风险',
    district: '湟源县',
    enterprise: '大华耐火新材料',
    desc: '管道空管告警，传感器接地异常',
    time: '08:50:03',
    alarmType: '空管告警',
    orderNo: 'GJGD20261027000603',
    orderStatus: '待审核',
    timeoutStatus: '未超时',
    orderType: '紧急',
    facilityName: '大华耐火车间生产用水计量点',
    facilityCode: '630123JL00073',
    latestAlarmTime: '2026-10-27 08:50:03',
    alarmContent: '管道内液位持续低于传感器测量下限，触发空管告警并停止瞬时流量计算。',
    disposalTimeRange: '2026-10-27 09:00:00 至 2026-11-03 09:00:00',
    maintenanceUnit: '湟源县供水安全督查组',
    maintenancePerson: '韩青海',
    contactPhone: '0971-8432157',
    alarmCause: '生产车间临时停水检修',
    handlingStatus: '现场已恢复供水，待区县主管部门复核',
    attachments: '--',
    x: 435,
    y: 475,
  },
  {
    id: 'w-4',
    title: '海湖铝业取水泵房日水量超阈值',
    level: 'yellow',
    levelLabel: '低风险',
    district: '城北区',
    enterprise: '青海海湖铝业',
    desc: '日累计水量超过核定阈值',
    time: '昨天',
    alarmType: '超阈值',
    orderNo: 'GJGD20261027000604',
    orderStatus: '待处置',
    timeoutStatus: '未超时',
    orderType: '普通',
    facilityName: '海湖铝业取水泵房主计量点',
    facilityCode: '630104JL00092',
    latestAlarmTime: '2026-10-26 23:58:36',
    alarmContent: '当日累计取水量超过核定日阈值8.6%，系统已生成超阈值告警。',
    disposalTimeRange: '2026-10-27 08:10:00 至 2026-11-03 08:10:00',
    maintenanceUnit: '城北区水务综合执法大队',
    maintenancePerson: '马建国',
    contactPhone: '0971-8312560',
    alarmCause: '生产负荷临时增加',
    handlingStatus: '待取水户补充说明当日用水计划调整情况',
    attachments: '--',
    x: 605,
    y: 435,
  },
  {
    id: 'w-5',
    title: '朝阳热电厂冷却水表连续断联',
    level: 'red',
    levelLabel: '高风险',
    district: '城北区',
    enterprise: '朝阳热电有限责任公司',
    desc: '4G远传失联，信号极弱',
    time: '07:20:18',
    alarmType: '未上报',
    orderNo: 'GJGD20261027000605',
    orderStatus: '待处置',
    timeoutStatus: '已超时',
    orderType: '紧急',
    facilityName: '朝阳热电厂冷却水回用计量点',
    facilityCode: '630104JL00305',
    latestAlarmTime: '2026-10-27 07:20:18',
    alarmContent: '冷却水表连续12小时未上报数据，现场信号强度低于通信阈值。',
    disposalTimeRange: '2026-10-27 07:30:00 至 2026-11-03 07:30:00',
    maintenanceUnit: '市水利信息化运维组',
    maintenancePerson: '赵守信',
    contactPhone: '0971-8396321',
    alarmCause: '厂区通信基站临时停电',
    handlingStatus: '超时未反馈，已升级督办',
    attachments: '--',
    x: 645,
    y: 425,
  },
]);

// 计量点数量统计 (全部、正常、停用、故障、待检定)
const meterStats = computed(() => {
  const total = meterPointsList.value.length;
  const normal = meterPointsList.value.filter(m => m.meterStatus === 'normal').length;
  const offline = meterPointsList.value.filter(m => m.meterStatus === 'offline').length;
  const fault = meterPointsList.value.filter(m => m.meterStatus === 'fault').length;
  const pending = meterPointsList.value.filter(m => m.meterStatus === 'pending').length;
  return { total, normal, offline, fault, pending };
});

const districtMeterPoints = computed(() => {
  return meterPointsList.value.filter(m => {
    if (filterParams.value.district !== '西宁市' && m.district !== filterParams.value.district) {
      return false;
    }
    return true;
  });
});

// 国控计量点按现有代表性站点标记，行政区和状态仍沿用同一套数据。
const nationalControlMeterIds = new Set([
  'm-cb-1',
  'm-cb-4',
  'm-cx-1',
  'm-cz-1',
  'm-cd-1',
  'm-hz-1',
  'm-dt-1',
  'm-hy-1',
]);

const nationalControlMeterPoints = computed(() =>
  districtMeterPoints.value.filter(meter => nationalControlMeterIds.has(meter.id))
);

const meterStatusLegendMeta: Array<{
  status: MeterStatus;
  key: string;
  label: string;
  color: string;
  iconClass: string;
}> = [
  { status: 'normal', key: 'normal', label: '正常', color: '#10b981', iconClass: 'w-2.5 h-2.5 rounded-full border' },
  { status: 'offline', key: 'offline', label: '停用', color: '#8FB6D4', iconClass: 'w-2.5 h-2.5 rounded-sm border' },
  { status: 'fault', key: 'fault', label: '故障', color: '#ef4444', iconClass: 'w-2.5 h-2.5 rounded-full border' },
  { status: 'pending', key: 'pending', label: '待检定', color: '#f59e0b', iconClass: 'w-2.5 h-2.5 rounded-full border' },
];

function buildMeterStatusLegendItems(points: MeterPoint[]) {
  return meterStatusLegendMeta.map(item => ({
    ...item,
    value: points.filter(point => point.meterStatus === item.status).length,
    borderColor: '#E8F5FF',
  }));
}

const meterPointLegendItems = computed(() => buildMeterStatusLegendItems(districtMeterPoints.value));
const nationalControlLegendItems = computed(() => buildMeterStatusLegendItems(nationalControlMeterPoints.value));

const warningLegendItems = computed(() => [
  { key: 'red', label: '高风险预警', value: warningEventsList.value.filter(item => item.level === 'red').length, color: '#ef4444' },
  { key: 'orange', label: '中风险预警', value: warningEventsList.value.filter(item => item.level === 'orange').length, color: '#f97316' },
  { key: 'yellow', label: '低风险预警', value: warningEventsList.value.filter(item => item.level === 'yellow').length, color: '#f59e0b' },
]);

const hasActiveSpecialMapLayer = computed(() =>
  activeLayers.value.meters
  || activeLayers.value.meterMonitoring
  || activeLayers.value.nationalControl
  || activeLayers.value.warnings
);

const mapLegendTitle = computed(() => {
  if (scenarioMode.value === 'comprehensive') return '专题图层图例';
  if (activeLayers.value.meters) return '计量点图例';
  if (activeLayers.value.meterMonitoring) return '计量监控图例';
  if (activeLayers.value.nationalControl) return '国控计量点图例';
  if (activeLayers.value.warnings) return '预警事件图例';
  return '地图图例';
});

// 计量点基础图层筛选
const filteredMeterPoints = computed(() => {
  return districtMeterPoints.value.filter(m => {
    if (meterStatusFilter.value === 'all') return true;
    return m.meterStatus === meterStatusFilter.value;
  });
});

// 计量监控图层筛选：默认展示五类全部点位
const visibleMeterPoints = computed(() => {
  if (activeLayers.value.nationalControl) return nationalControlMeterPoints.value;
  if (!activeLayers.value.meterMonitoring) return filteredMeterPoints.value;
  return districtMeterPoints.value.filter(m =>
    monitoringStatusFilter.value === 'all' || m.meterStatus === monitoringStatusFilter.value
  );
});

// 打开计量点详情弹窗
function openMeterDetail(meter: MeterPoint) {
  selectedMeterPoint.value = meter;
  showMeterWaterModal.value = false;
  showMeterDetailModal.value = true;
}

// 专项地图图层互斥：计量点 / 计量监控 / 国控计量点 / 预警事件
function setSpecialMapLayer(layer: 'meters' | 'meterMonitoring' | 'nationalControl' | 'warnings') {
  const shouldEnable = !activeLayers.value[layer];
  activeLayers.value.meters = false;
  activeLayers.value.meterMonitoring = false;
  activeLayers.value.nationalControl = false;
  activeLayers.value.warnings = false;

  if (!shouldEnable) return;

  activeLayers.value[layer] = true;
  showMapLegend.value = true;
  if (layer === 'meterMonitoring') {
    monitoringStatusFilter.value = 'all';
  }
}

function toggleMeterLayer() {
  setSpecialMapLayer('meters');
}

function toggleMeterMonitoringLayer() {
  setSpecialMapLayer('meterMonitoring');
}

function toggleNationalControlLayer() {
  setSpecialMapLayer('nationalControl');
}

function toggleWarningLayer() {
  setSpecialMapLayer('warnings');
}

function selectMeterMonitoringStatus(status: MeterStatusFilter) {
  monitoringStatusFilter.value = status;
}

function openMeterWaterDetail() {
  if (!selectedMeterPoint.value) return;
  showMeterDetailModal.value = false;
  showMeterWaterModal.value = true;
}

function closeMeterWaterDetail() {
  showMeterWaterModal.value = false;
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

// 1. 行政区域用水量对比: 五类业务值与管控指标
interface DistrictWaterItem {
  name: string;
  metered: number;   // 计量水量 (万m³)
  reported: number;  // 直报水量 (万m³)
  taxWater: number;  // 税务水量 (万m³)
  licensed: number;  // 许可水量 (万m³)
  planned: number;   // 计划水量 (万m³)
  controlTarget: number; // 管控指标 (万m³)
}

const districtBarDataBase: DistrictWaterItem[] = [
  { name: '城东区', metered: 12450, reported: 16500, taxWater: 12100, licensed: 16200, planned: 15100, controlTarget: 18000 },
  { name: '城中区', metered: 8320,  reported: 9200,  taxWater: 8150,  licensed: 11400, planned: 10600, controlTarget: 12800 },
  { name: '城西区', metered: 9680,  reported: 10800, taxWater: 9500,  licensed: 12600, planned: 11900, controlTarget: 13800 },
  { name: '城北区', metered: 15820, reported: 20500, taxWater: 15400, licensed: 20200, planned: 19100, controlTarget: 22000 },
  { name: '湟中区', metered: 24200, reported: 31200, taxWater: 23600, licensed: 31500, planned: 29800, controlTarget: 33500 },
  { name: '湟源县', metered: 12600, reported: 13800, taxWater: 12300, licensed: 16800, planned: 15400, controlTarget: 18200 },
  { name: '大通县', metered: 18450, reported: 21500, taxWater: 18050, licensed: 24200, planned: 22800, controlTarget: 26000 },
];

const districtWaterYearFactors: Record<string, number> = {
  '2026': 1,
  '2025': 0.96,
  '2024': 0.92,
};

const districtBarData = computed<DistrictWaterItem[]>(() => {
  const factor = districtWaterYearFactors[filterParams.value.year] ?? 1;
  return districtBarDataBase.map(item => ({
    name: item.name,
    metered: Math.round(item.metered * factor),
    reported: Math.round(item.reported * factor),
    taxWater: Math.round(item.taxWater * factor),
    licensed: Math.round(item.licensed * factor),
    planned: Math.round(item.planned * factor),
    controlTarget: Math.round(item.controlTarget * factor),
  }));
});

const hoveredBarDistrict = ref<DistrictWaterItem | null>(null);
const hoveredBarDistrictIdx = ref<number | null>(null);

const DISTRICT_WATER_CHART_MAX = 40000;

function districtWaterChartY(value: number): number {
  const clampedValue = Math.max(0, Math.min(value, DISTRICT_WATER_CHART_MAX));
  return 96 - (clampedValue / DISTRICT_WATER_CHART_MAX) * 78;
}

// 行政区域用水对比：悬浮弹窗紧凑跟随柱位动态定位 (无透明度纯实色，控制尺寸不远离)
const districtBarTooltipStyle = computed(() => {
  if (hoveredBarDistrictIdx.value === null) return {};
  const idx = hoveredBarDistrictIdx.value;
  // SVG viewBox 0 0 380 120，每个柱中心为 54.5 + idx * 46
  const pctX = ((54.5 + idx * 46) / 380) * 100;
  if (idx < 4) {
    return {
      position: 'absolute' as const,
      left: `calc(${pctX.toFixed(1)}% + 14px)`,
      right: 'auto',
      top: '0px',
      zIndex: 50,
      pointerEvents: 'none' as const,
    };
  } else {
    return {
      position: 'absolute' as const,
      right: `calc(${(100 - pctX).toFixed(1)}% + 14px)`,
      left: 'auto',
      top: '0px',
      zIndex: 50,
      pointerEvents: 'none' as const,
    };
  }
});

// 五类水量与管控基准动态汇总 (支持当前区划选中联动或全域总和)
const districtTotals = computed(() => {
  const list = filterParams.value.district === '西宁市'
    ? districtBarData.value
    : districtBarData.value.filter(d => d.name === filterParams.value.district);
  const metered = list.reduce((s, i) => s + i.metered, 0);
  const reported = list.reduce((s, i) => s + i.reported, 0);
  const taxWater = list.reduce((s, i) => s + i.taxWater, 0);
  const licensed = list.reduce((s, i) => s + i.licensed, 0);
  const planned = list.reduce((s, i) => s + i.planned, 0);
  const controlTarget = list.reduce((s, i) => s + i.controlTarget, 0);
  return { metered, reported, taxWater, licensed, planned, controlTarget };
});

const districtRiverOutsideShares: Record<string, number> = {
  '城东区': 0.18,
  '城中区': 0.12,
  '城西区': 0.16,
  '城北区': 0.24,
  '湟中区': 0.38,
  '湟源县': 0.42,
  '大通县': 0.35,
};

const approvedRiverSplit = computed(() => {
  const list = filterParams.value.district === '西宁市'
    ? districtBarData.value
    : districtBarData.value.filter(item => item.name === filterParams.value.district);
  const approved = list.reduce((sum, item) => sum + item.licensed, 0);
  const riverOutside = list.reduce(
    (sum, item) => sum + item.licensed * (districtRiverOutsideShares[item.name] ?? 0),
    0,
  );
  const controlTarget = list.reduce((sum, item) => sum + item.controlTarget, 0);
  return {
    approved,
    riverInside: approved - riverOutside,
    riverOutside,
    outsideControlRate: controlTarget > 0 ? (riverOutside / controlTarget) * 100 : 0,
  };
});

// 许可水量折线路径
const licensedLinePath = computed(() => {
  return districtBarData.value.map((item, idx) => {
    const x = 54.5 + idx * 46;
    const y = districtWaterChartY(item.licensed);
    return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');
});

// 计划水量折线路径
const plannedLinePath = computed(() => {
  return districtBarData.value.map((item, idx) => {
    const x = 54.5 + idx * 46;
    const y = districtWaterChartY(item.planned);
    return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');
});

// 管控指标折线路径
const controlTargetLinePath = computed(() => {
  return districtBarData.value.map((item, idx) => {
    const x = 54.5 + idx * 46;
    const y = districtWaterChartY(item.controlTarget);
    return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');
});

// ================= 行政区划全局统一搜索 (地图左上角) =================
const isDistrictPanelCollapsed = ref(true);
const globalSearchText = ref('');
const currentDistrictUsersCount = computed(() => {
  if (filterParams.value.district === '西宁市') return waterUsersList.value.length;
  return waterUsersList.value.filter(u => u.district === filterParams.value.district).length;
});

const matchedDistricts = computed(() => {
  const q = globalSearchText.value.trim();
  if (!q) return [];
  return searchableAdministrativeRegions.filter(d => d.includes(q));
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
  selectAdministrativeRegion(dist);
  filterParams.value.district = dist === '青海省' ? '西宁市' : dist;
  hoveredDistrictName.value = dist === '西宁市' || dist === '青海省' ? null : dist;
  globalSearchText.value = '';
}

function selectSearchMeter(meter: MeterPoint) {
  selectedAdministrativeRegion.value = meter.district;
  filterParams.value.district = meter.district;
  openMeterDetail(meter);
  globalSearchText.value = '';
}

function selectSearchUser(user: WaterUserPoint) {
  selectedAdministrativeRegion.value = user.district;
  filterParams.value.district = user.district;
  globalSearchText.value = '';
}

function selectSearchWarning(warn: WarningEventPoint) {
  selectedAdministrativeRegion.value = warn.district;
  filterParams.value.district = warn.district;
  openWarningEventDetail(warn);
  globalSearchText.value = '';
}

// ================= 行政区划用水统计趋势 (以月维度统计实际用水执行与计划用水，与中间行政区划切换联动) =================
interface DistrictMonthlyWaterRecord {
  month: string;
  actual: number;   // 实际用水量 (万m³)
  planned: number;  // 计划指标量 (万m³)
  rate: number;     // 执行率 (%)
}

// 7个行政区划基础逐月数据 (实际用水 vs 计划用水)
// 夏季 (5-8月) 为西宁市及各区用水高峰期，部分重负荷区县在高峰期实际用水略超计划
const districtMonthlyRawData: Record<string, { actual: number[]; planned: number[] }> = {
  '城东区': {
    actual:  [980, 850, 1120, 1340, 1680, 1720, 1850, 1620, 1310, 1080, 950, 890],
    planned: [1100, 950, 1180, 1300, 1550, 1600, 1700, 1550, 1300, 1150, 1020, 950],
  },
  '城中区': {
    actual:  [620, 540, 710, 790, 880, 920, 960, 890, 780, 690, 610, 580],
    planned: [750, 650, 780, 850, 950, 980, 1020, 950, 850, 780, 700, 650],
  },
  '城西区': {
    actual:  [720, 640, 810, 910, 1050, 1120, 1180, 1090, 920, 810, 710, 670],
    planned: [850, 750, 880, 960, 1100, 1150, 1200, 1120, 980, 890, 800, 740],
  },
  '城北区': {
    actual:  [1210, 1080, 1420, 1680, 2150, 2280, 2360, 2110, 1720, 1380, 1190, 1100],
    planned: [1350, 1200, 1480, 1650, 2000, 2100, 2200, 2050, 1700, 1450, 1300, 1220],
  },
  '湟中区': {
    actual:  [1650, 1420, 2350, 3120, 4280, 4650, 4820, 4390, 3210, 2260, 1750, 1580],
    planned: [1900, 1650, 2450, 3050, 4000, 4300, 4500, 4100, 3150, 2400, 1950, 1750],
  },
  '湟源县': {
    actual:  [850, 760, 1180, 1420, 1820, 1950, 2020, 1880, 1490, 1180, 920, 810],
    planned: [1000, 880, 1220, 1450, 1850, 1980, 2050, 1900, 1550, 1280, 1050, 940],
  },
  '大通县': {
    actual:  [1420, 1250, 1850, 2290, 2980, 3190, 3320, 3080, 2460, 1850, 1480, 1330],
    planned: [1600, 1400, 1920, 2350, 3050, 3250, 3380, 3150, 2550, 2000, 1650, 1480],
  },
};

const hoveredDistrictMonthIdx = ref<number | null>(null);

// 当前联动区划的12个月用水统计列表 (选'西宁市'时自动全域7区县矢量加和)
const currentDistrictMonthlyList = computed<DistrictMonthlyWaterRecord[]>(() => {
  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  const dist = filterParams.value.district;

  if (dist !== '西宁市' && districtMonthlyRawData[dist]) {
    const raw = districtMonthlyRawData[dist];
    return months.map((m, idx) => {
      const actual = raw.actual[idx] ?? 0;
      const planned = raw.planned[idx] ?? 0;
      const rate = planned > 0 ? Math.round((actual / planned) * 1000) / 10 : 0;
      return { month: m, actual, planned, rate };
    });
  }

  // 全市聚合 (7区县逐月求和)
  const keys = Object.keys(districtMonthlyRawData);
  return months.map((m, idx) => {
    let actualSum = 0;
    let plannedSum = 0;
    for (const k of keys) {
      actualSum += districtMonthlyRawData[k].actual[idx] ?? 0;
      plannedSum += districtMonthlyRawData[k].planned[idx] ?? 0;
    }
    const rate = plannedSum > 0 ? Math.round((actualSum / plannedSum) * 1000) / 10 : 0;
    return { month: m, actual: actualSum, planned: plannedSum, rate };
  });
});

// 当前区划月度汇总统计卡片指标 (年实际用水、年计划指标、综合执行率)
const currentDistrictMonthTotals = computed(() => {
  const list = currentDistrictMonthlyList.value;
  const totalActual = list.reduce((s, i) => s + i.actual, 0);
  const totalPlanned = list.reduce((s, i) => s + i.planned, 0);
  const executionRate = totalPlanned > 0 ? Math.round((totalActual / totalPlanned) * 1000) / 10 : 0;
  return { totalActual, totalPlanned, executionRate };
});

// SVG图表坐标与路径计算: viewBox="0 0 380 120"
const districtMonthChartData = computed(() => {
  const list = currentDistrictMonthlyList.value;
  const xStart = 36;
  const xEnd = 368;
  const yBaseline = 94;
  const yTop = 16;
  const chartHeight = yBaseline - yTop; // 78px
  const count = list.length;
  const stepX = (xEnd - xStart) / count;
  const barWidth = 14;

  const rawMax = Math.max(...list.map(i => Math.max(i.actual, i.planned)), 100);
  let yMax = 1000;
  if (rawMax > 12000) yMax = Math.ceil(rawMax / 3000) * 3000;
  else if (rawMax > 4000) yMax = Math.ceil(rawMax / 1000) * 1000;
  else if (rawMax > 1500) yMax = Math.ceil(rawMax / 500) * 500;
  else yMax = Math.ceil(rawMax / 200) * 200;

  // 4刻度点: yTop (yMax), yTop + 26 (yMax * 2/3), yTop + 52 (yMax * 1/3), yBaseline (0)
  const formatTick = (val: number) => {
    if (val >= 10000) return `${(val / 10000).toFixed(1)}w`;
    return String(Math.round(val));
  };
  const yTicks = [
    { label: formatTick(yMax), y: 19 },
    { label: formatTick((yMax * 2) / 3), y: 45 },
    { label: formatTick(yMax / 3), y: 71 },
    { label: '0', y: 97 },
  ];

  const items = list.map((record, idx) => {
    const cx = xStart + (idx + 0.5) * stepX;
    const barX = cx - barWidth / 2;
    const barHeight = Math.max(2, Math.min(chartHeight, (record.actual / yMax) * chartHeight));
    const barY = yBaseline - barHeight;
    const planY = Math.max(yTop, Math.min(yBaseline, yBaseline - (record.planned / yMax) * chartHeight));
    const isExceeded = record.actual > record.planned;

    return {
      record,
      cx,
      barX,
      barY,
      barWidth,
      barHeight,
      planY,
      isExceeded,
    };
  });

  const planLinePath = items.map((it, idx) => {
    return `${idx === 0 ? 'M' : 'L'} ${it.cx.toFixed(1)} ${it.planY.toFixed(1)}`;
  }).join(' ');

  return {
    yTicks,
    items,
    planLinePath,
  };
});

// 行政区划用水统计趋势：悬浮弹窗紧凑跟随月份柱位动态定位 (无透明度纯实色，控制尺寸不远离)
const districtMonthTooltipStyle = computed(() => {
  if (hoveredDistrictMonthIdx.value === null) return {};
  const idx = hoveredDistrictMonthIdx.value;
  const count = currentDistrictMonthlyList.value.length || 12;
  const stepX = 332 / count;
  const cx = 36 + (idx + 0.5) * stepX;
  const pctX = (cx / 380) * 100;
  if (idx < 6) {
    return {
      position: 'absolute' as const,
      left: `calc(${pctX.toFixed(1)}% + 12px)`,
      right: 'auto',
      top: '0px',
      zIndex: 50,
      pointerEvents: 'none' as const,
    };
  } else {
    return {
      position: 'absolute' as const,
      right: `calc(${(100 - pctX).toFixed(1)}% + 12px)`,
      left: 'auto',
      top: '0px',
      zIndex: 50,
      pointerEvents: 'none' as const,
    };
  }
});

// 2. 用水时间变化趋势：五类年度水量，默认展示截至筛选年份的近5年数据
interface AnnualWaterTrendRecord {
  year: number;
  metered: number;
  reported: number;
  taxWater: number;
  licensed: number;
  planned: number;
  controlTarget: number;
}

type AnnualTrendMetricKey = Exclude<keyof AnnualWaterTrendRecord, 'year' | 'controlTarget'>;

interface AnnualTrendMetricDefinition {
  key: AnnualTrendMetricKey;
  label: string;
  shortLabel: string;
  color: string;
}

const annualTrendMetricDefinitions: AnnualTrendMetricDefinition[] = [
  { key: 'metered', label: '计量水量', shortLabel: '计量', color: '#3FD0FF' },
  { key: 'reported', label: '直报水量', shortLabel: '直报', color: '#38BDF8' },
  { key: 'taxWater', label: '税务水量', shortLabel: '税务', color: '#A78BFA' },
  { key: 'licensed', label: '许可水量', shortLabel: '许可', color: '#FFC65C' },
  { key: 'planned', label: '计划水量', shortLabel: '计划', color: '#E4F6FF' },
];

const annualWaterTrendRaw: AnnualWaterTrendRecord[] = [
  { year: 2020, metered: 67200, reported: 85000, taxWater: 64100, licensed: 97300, planned: 89100, controlTarget: 101500 },
  { year: 2021, metered: 74100, reported: 79100, taxWater: 68800, licensed: 92500, planned: 94800, controlTarget: 105000 },
  { year: 2022, metered: 64500, reported: 111800, taxWater: 62300, licensed: 98600, planned: 84200, controlTarget: 117000 },
  { year: 2023, metered: 92600, reported: 87400, taxWater: 81600, licensed: 119400, planned: 112800, controlTarget: 124000 },
  { year: 2024, metered: 73800, reported: 121600, taxWater: 70600, licensed: 103500, planned: 95600, controlTarget: 131000 },
  { year: 2025, metered: 98600, reported: 92700, taxWater: 95300, licensed: 135200, planned: 128100, controlTarget: 139500 },
  { year: 2026, metered: 101520, reported: 123500, taxWater: 99100, licensed: 132900, planned: 124700, controlTarget: 144300 },
];

const selectedYearNum = computed(() => parseInt(filterParams.value.year, 10) || 2026);

const trendYearData = computed<AnnualWaterTrendRecord[]>(() => {
  const endYear = selectedYearNum.value;
  const startYear = endYear - 4;
  const matched = annualWaterTrendRaw.filter(item => item.year >= startYear && item.year <= endYear);
  return matched.length === 5 ? matched : annualWaterTrendRaw.slice(-5);
});

const hoveredTrendIdx = ref<number | null>(null);

// 用水时间变化趋势：悬浮弹窗跟随年度节点定位
const trendTooltipStyle = computed(() => {
  if (hoveredTrendIdx.value === null) return {};
  const idx = hoveredTrendIdx.value;
  const count = trendYearData.value.length || 5;
  const stepX = (368 - 36) / Math.max(1, count - 1);
  const cx = 36 + idx * stepX;
  const pctX = (cx / 380) * 100;
  if (idx < Math.ceil(count / 2)) {
    return {
      position: 'absolute' as const,
      left: `calc(${pctX.toFixed(1)}% + 12px)`,
      right: 'auto',
      top: '0px',
      zIndex: 50,
      pointerEvents: 'none' as const,
    };
  } else {
    return {
      position: 'absolute' as const,
      right: `calc(${(100 - pctX).toFixed(1)}% + 12px)`,
      left: 'auto',
      top: '0px',
      zIndex: 50,
      pointerEvents: 'none' as const,
    };
  }
});

// 行业用水与水源类型结构悬浮明细
interface StructureDetailItem {
  type: 'industry' | 'source';
  name: string;
  rate: string;
  volume: string;
  focus: string;
  color: string;
}

type WaterStructureMetricKey = 'metered' | 'reported' | 'taxWater' | 'licensed' | 'planned';

interface WaterStructureMetricOption {
  key: WaterStructureMetricKey;
  label: string;
  color: string;
}

interface WaterStructureShareDefinition {
  key: string;
  label: string;
  percent: number;
  color: string;
  focus: string;
}

interface WaterStructureShareItem extends WaterStructureShareDefinition {
  volume: number;
  volumeText: string;
  dashArray: string;
  dashOffset: number;
}

const waterStructureMetricOptions: WaterStructureMetricOption[] = [
  { key: 'metered', label: '计量', color: '#3FD0FF' },
  { key: 'reported', label: '直报', color: '#9BEAFF' },
  { key: 'taxWater', label: '税务', color: '#60A5FA' },
  { key: 'licensed', label: '许可', color: '#FFC65C' },
  { key: 'planned', label: '计划', color: '#DCF2FF' },
];

const waterStructureMetric = ref<WaterStructureMetricKey>('metered');

const industryShareProfiles: Record<WaterStructureMetricKey, WaterStructureShareDefinition[]> = {
  metered: [
    { key: 'industry', label: '工业', percent: 34.1, color: '#1E7BE8', focus: '规上电解铝、晶硅及新材料生产用水' },
    { key: 'agriculture', label: '农业', percent: 41.4, color: '#3FD0FF', focus: '现代化灌区与引湟灌溉用水' },
    { key: 'domestic', label: '生活', percent: 17.2, color: '#60A5FA', focus: '市政供水与城乡居民生活用水' },
    { key: 'environment', label: '环境', percent: 7.3, color: '#818CF8', focus: '城市景观水系与生态补水' },
  ],
  reported: [
    { key: 'industry', label: '工业', percent: 36.8, color: '#1E7BE8', focus: '重点工业取水户直报生产用水' },
    { key: 'agriculture', label: '农业', percent: 39.5, color: '#3FD0FF', focus: '灌区管理单位直报农业用水' },
    { key: 'domestic', label: '生活', percent: 16.4, color: '#60A5FA', focus: '公共供水单位直报生活用水' },
    { key: 'environment', label: '环境', percent: 7.3, color: '#818CF8', focus: '生态与景观补水直报用水' },
  ],
  taxWater: [
    { key: 'industry', label: '工业', percent: 38.6, color: '#1E7BE8', focus: '涉税工业取用水量核验口径' },
    { key: 'agriculture', label: '农业', percent: 35.8, color: '#3FD0FF', focus: '农业取用水涉税申报核算' },
    { key: 'domestic', label: '生活', percent: 18.2, color: '#60A5FA', focus: '公共供水及生活用水涉税申报' },
    { key: 'environment', label: '环境', percent: 7.4, color: '#818CF8', focus: '生态补水涉税水量核验' },
  ],
  licensed: [
    { key: 'industry', label: '工业', percent: 42.1, color: '#1E7BE8', focus: '工业取水许可证核定水量' },
    { key: 'agriculture', label: '农业', percent: 34.6, color: '#3FD0FF', focus: '农业取水许可证核定水量' },
    { key: 'domestic', label: '生活', percent: 16.3, color: '#60A5FA', focus: '公共供水取水许可证核定水量' },
    { key: 'environment', label: '环境', percent: 7.0, color: '#818CF8', focus: '生态环境取水许可核定水量' },
  ],
  planned: [
    { key: 'industry', label: '工业', percent: 35.5, color: '#1E7BE8', focus: '工业年度计划用水量' },
    { key: 'agriculture', label: '农业', percent: 40.2, color: '#3FD0FF', focus: '农业年度计划用水量' },
    { key: 'domestic', label: '生活', percent: 16.8, color: '#60A5FA', focus: '生活年度计划用水量' },
    { key: 'environment', label: '环境', percent: 7.5, color: '#818CF8', focus: '生态环境年度计划用水量' },
  ],
};

const sourceShareProfiles: Record<WaterStructureMetricKey, WaterStructureShareDefinition[]> = {
  metered: [
    { key: 'surface', label: '地表水', percent: 78.4, color: '#00E5FF', focus: '湟水河天然水系与黑泉水库' },
    { key: 'ground', label: '地下水', percent: 21.6, color: '#FFC65C', focus: '深井自备水，执行红线刚性限采' },
  ],
  reported: [
    { key: 'surface', label: '地表水', percent: 76.8, color: '#00E5FF', focus: '直报取水户地表水源水量' },
    { key: 'ground', label: '地下水', percent: 23.2, color: '#FFC65C', focus: '直报取水户地下水源水量' },
  ],
  taxWater: [
    { key: 'surface', label: '地表水', percent: 75.6, color: '#00E5FF', focus: '税务申报地表水源水量' },
    { key: 'ground', label: '地下水', percent: 24.4, color: '#FFC65C', focus: '税务申报地下水源水量' },
  ],
  licensed: [
    { key: 'surface', label: '地表水', percent: 74.2, color: '#00E5FF', focus: '取水许可核定的地表水源水量' },
    { key: 'ground', label: '地下水', percent: 25.8, color: '#FFC65C', focus: '取水许可核定的地下水源水量' },
  ],
  planned: [
    { key: 'surface', label: '地表水', percent: 77.1, color: '#00E5FF', focus: '年度计划配置的地表水源水量' },
    { key: 'ground', label: '地下水', percent: 22.9, color: '#FFC65C', focus: '年度计划配置的地下水源水量' },
  ],
};

const WATER_STRUCTURE_RADIUS = 22;
const WATER_STRUCTURE_CIRCUMFERENCE = 2 * Math.PI * WATER_STRUCTURE_RADIUS;

const currentWaterStructureMetric = computed(() =>
  waterStructureMetricOptions.find(option => option.key === waterStructureMetric.value)
    ?? waterStructureMetricOptions[0]
);

const currentWaterStructureTotal = computed(() => districtTotals.value[waterStructureMetric.value]);

function buildWaterStructureShares(
  definitions: WaterStructureShareDefinition[],
  total: number,
): WaterStructureShareItem[] {
  let accumulated = 0;
  return definitions.map(item => {
    const arcLength = WATER_STRUCTURE_CIRCUMFERENCE * (item.percent / 100);
    const result = {
      ...item,
      volume: total * (item.percent / 100),
      volumeText: `${Math.round(total * (item.percent / 100)).toLocaleString()}万m³`,
      dashArray: `${arcLength.toFixed(2)} ${(WATER_STRUCTURE_CIRCUMFERENCE - arcLength).toFixed(2)}`,
      dashOffset: -accumulated,
    };
    accumulated += arcLength;
    return result;
  });
}

const waterStructureIndustryShares = computed(() =>
  buildWaterStructureShares(
    industryShareProfiles[waterStructureMetric.value],
    currentWaterStructureTotal.value,
  )
);

const waterStructureSourceShares = computed(() =>
  buildWaterStructureShares(
    sourceShareProfiles[waterStructureMetric.value],
    currentWaterStructureTotal.value,
  )
);

const hoveredStructureDetail = ref<StructureDetailItem | null>(null);
const hoveredStructureSide = ref<'left' | 'right'>('left');

function selectWaterStructureMetric(key: WaterStructureMetricKey) {
  waterStructureMetric.value = key;
  hoveredStructureDetail.value = null;
}

function showStructureDetail(
  type: 'industry' | 'source',
  item: WaterStructureShareItem,
  side: 'left' | 'right',
) {
  hoveredStructureDetail.value = {
    type,
    name: item.label,
    rate: `${item.percent.toFixed(1)}%`,
    volume: item.volumeText,
    focus: item.focus,
    color: item.color,
  };
  hoveredStructureSide.value = side;
}

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

// 用水时间变化趋势坐标计算: viewBox="0 0 380 150"
const trendChartData = computed(() => {
  const xStart = 36;
  const xEnd = 368;
  const yBaseline = 128;
  const yTop = 20;
  const records = trendYearData.value;
  const count = records.length;
  const stepX = (xEnd - xStart) / Math.max(1, count - 1);
  const values = records.flatMap(record =>
    [
      ...annualTrendMetricDefinitions.map(metric => record[metric.key]),
      record.controlTarget,
    ]
  );
  const maxValue = Math.max(...values, 1);
  const maxY = Math.max(20000, Math.ceil(maxValue / 10000) * 10000);
  const formatAxisValue = (value: number) => {
    if (value >= 10000) {
      const valueInTenThousands = value / 10000;
      return `${valueInTenThousands.toFixed(valueInTenThousands % 1 === 0 ? 0 : 1)}w`;
    }
    return Math.round(value).toString();
  };

  const yTicks = [1, 2 / 3, 1 / 3, 0].map((ratio, index) => {
    const value = maxY * ratio;
    return {
      value,
      label: formatAxisValue(value),
      y: yTop + (index * (yBaseline - yTop)) / 3,
    };
  });

  const yearPoints = records.map((record, index) => ({
    year: record.year,
    x: xStart + index * stepX,
    index,
  }));

  const series = annualTrendMetricDefinitions.map(metric => {
    const points = records.map((record, index) => {
      const value = record[metric.key];
      return {
        year: record.year,
        index,
        x: xStart + index * stepX,
        y: yBaseline - (value / maxY) * (yBaseline - yTop),
        value,
      };
    });
    const linePath = getSmoothLinePath(points);
    return {
      ...metric,
      points,
      path: linePath,
      areaPath: `${linePath} L ${points[count - 1].x.toFixed(1)},${yBaseline} L ${points[0].x.toFixed(1)},${yBaseline} Z`,
    };
  });

  const controlPoints = records.map((record, index) => ({
    year: record.year,
    index,
    x: xStart + index * stepX,
    y: yBaseline - (record.controlTarget / maxY) * (yBaseline - yTop),
    value: record.controlTarget,
  }));

  return {
    series,
    controlSeries: {
      points: controlPoints,
      path: getSmoothLinePath(controlPoints),
    },
    yearPoints,
    yTicks,
  };
});

// Warning Modal state
const showWarningModal = ref(false);
const selectedEvent = ref('');
const showWarningEventDetailModal = ref(false);
const selectedWarningEventId = ref<string | null>(null);
const showCertificateWarningModal = ref(false);
const selectedCertificateWarningId = ref<string | null>(null);
const showMeterOverPointModal = ref(false);
const selectedMeterOverPointId = ref<string | null>(null);

const selectedWarningEvent = computed(() =>
  warningEventsList.value.find(event => event.id === selectedWarningEventId.value) ?? null
);

const selectedCertificateWarning = computed(() =>
  licenseWarningMarkers.value.find(marker => marker.id === selectedCertificateWarningId.value) ?? null
);

const selectedMeterOverPoint = computed(() =>
  licenseWarningMarkers.value.find(marker =>
    marker.id === selectedMeterOverPointId.value && marker.typeId === 'meterOver'
  ) ?? null
);

function formatWaterVolume(value: number): string {
  return value.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const selectedCertificateData = computed(() => {
  const marker = selectedCertificateWarning.value;
  if (!marker) return null;
  const stats = certificateAnnualWaterStatsById[marker.id] ?? {
    metered: marker.currentValue,
    reported: marker.currentValue,
    tax: marker.currentValue,
    licensed: marker.limitValue,
    planned: marker.limitValue,
    execution: marker.currentValue,
  };
  return {
    marker,
    stats,
    typeLabel: getLicenseWarningTypeLabel(marker.typeId),
    overValue: Math.max(0, marker.currentValue - marker.limitValue),
    overRate: Math.max(0, marker.ratio - 100),
  };
});

const selectedCertificateWaterChart = computed(() => {
  const data = selectedCertificateData.value;
  if (!data) return [];
  const metrics = [
    { key: 'metered', label: '计量', value: data.stats.metered, color: '#FF6B7A' },
    { key: 'reported', label: '直报', value: data.stats.reported, color: '#FF9F43' },
    { key: 'tax', label: '税务', value: data.stats.tax, color: '#38BDF8' },
    { key: 'licensed', label: '许可', value: data.stats.licensed, color: '#FFC65C' },
    { key: 'planned', label: '计划', value: data.stats.planned, color: '#DCF2FF' },
    { key: 'execution', label: '执行', value: data.stats.execution, color: '#A78BFA' },
  ];
  const chartMax = Math.max(...metrics.map(metric => metric.value), 1) * 1.12;
  const alertMetricKey =
    data.marker.typeId === 'meterOver' ? 'metered'
      : data.marker.typeId === 'directOver' ? 'reported'
        : data.marker.typeId === 'taxOver' ? 'tax'
          : 'execution';

  return metrics.map(metric => ({
    ...metric,
    heightPercent: Math.max(8, (metric.value / chartMax) * 100),
    isAlertMetric: metric.key === alertMetricKey,
  }));
});

const selectedCertificateChartMax = computed(() =>
  Math.max(...selectedCertificateWaterChart.value.map(metric => metric.value), 0)
);

function getWarningLevelColor(level: WarningEventPoint['level']): string {
  if (level === 'red') return '#FF6B7A';
  if (level === 'orange') return '#FF9F43';
  return '#FFC65C';
}

function openWarningEventDetail(event: WarningEventPoint) {
  showWarningModal.value = false;
  showCertificateWarningModal.value = false;
  showMeterOverPointModal.value = false;
  selectedWarningEventId.value = event.id;
  showWarningEventDetailModal.value = true;
}

function closeWarningEventDetail() {
  showWarningEventDetailModal.value = false;
}

function openCertificateWarningDetail(marker: LicenseWarningMarker) {
  showWarningModal.value = false;
  showWarningEventDetailModal.value = false;
  showMeterOverPointModal.value = false;
  selectedCertificateWarningId.value = marker.id;
  showCertificateWarningModal.value = true;
}

function closeCertificateWarningDetail() {
  showCertificateWarningModal.value = false;
}

function openMeterOverPointDetail(marker: LicenseWarningMarker) {
  if (marker.typeId !== 'meterOver') return;
  showWarningModal.value = false;
  showWarningEventDetailModal.value = false;
  showCertificateWarningModal.value = false;
  selectedMeterOverPointId.value = marker.id;
  showMeterOverPointModal.value = true;
}

function closeMeterOverPointDetail() {
  showMeterOverPointModal.value = false;
}

interface WarningTypeCard {
  label: string;
  count: number;
  rule: string;
  color: string;
  borderColor: string;
  dimensionLabel: '行政区划' | '证照';
}

const warningTypeCards = computed<WarningTypeCard[]>(() => [
  { label: '审批超管控', count: 5, rule: '审批 > 管控', color: '#3FD0FF', borderColor: 'rgba(63,208,255,0.32)', dimensionLabel: '行政区划' },
  { label: '计量超许可', count: licenseWarningMarkers.value.filter(item => item.typeId === 'meterOver').length, rule: '计量 > 许可', color: '#3FD0FF', borderColor: 'rgba(63,208,255,0.32)', dimensionLabel: '证照' },
  { label: '直报超许可', count: licenseWarningMarkers.value.filter(item => item.typeId === 'directOver').length, rule: '直报 > 许可', color: '#3FD0FF', borderColor: 'rgba(63,208,255,0.32)', dimensionLabel: '证照' },
  { label: '税务超计划', count: licenseWarningMarkers.value.filter(item => item.typeId === 'taxOver').length, rule: '税务 > 计划', color: '#3FD0FF', borderColor: 'rgba(63,208,255,0.32)', dimensionLabel: '证照' },
  { label: '执行超用水计划', count: licenseWarningMarkers.value.filter(item => item.typeId === 'actualOver').length, rule: '执行 > 用水计划', color: '#3FD0FF', borderColor: 'rgba(63,208,255,0.32)', dimensionLabel: '证照' }
]);

interface WarningTableRow {
  id: string;
  type: string;
  objectName: string;
  licenseNo: string;
  district: string;
  currentValue: string;
  indicatorRate: string;
  time: string;
  dimensionLabel: '行政区划' | '证照';
}

const approvalWarningRows: WarningTableRow[] = [
  {
    id: 'warning-row-approval-01',
    type: '审批超管控',
    objectName: '湟中区',
    licenseNo: '',
    district: '湟中区',
    currentValue: '173.12',
    indicatorRate: '108.2%',
    time: '05-20 08:30',
    dimensionLabel: '行政区划',
  },
];

const warningTableRows = computed<WarningTableRow[]>(() => [
  ...approvalWarningRows,
  ...licenseWarningMarkers.value.map(marker => ({
    id: `warning-${marker.id}`,
    type: getLicenseWarningTypeLabel(marker.typeId),
    objectName: marker.licensee,
    licenseNo: marker.licenseNo,
    district: marker.district,
    currentValue: marker.currentValue.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    indicatorRate: `${marker.ratio.toFixed(1)}%`,
    time: marker.time,
    dimensionLabel: '证照' as const,
  })),
]);

const selectedWarningType = ref<string | null>(null);

const filteredWarningTableRows = computed(() =>
  selectedWarningType.value
    ? warningTableRows.value.filter(row => row.type === selectedWarningType.value)
    : warningTableRows.value
);

function toggleWarningTypeFilter(type: string) {
  selectedWarningType.value = selectedWarningType.value === type ? null : type;
}

function getWarningTypeCardTitle(alert: WarningTypeCard): string {
  const action = selectedWarningType.value === alert.label
    ? '，再次点击查看全部类型'
    : '，点击筛选下方实时预警事项';
  return `${alert.label}：${alert.count} 条，${alert.dimensionLabel}维度（${alert.rule}）${action}`;
}

function clearWarningTypeFilter() {
  selectedWarningType.value = null;
}

function getWarningTypeColor(type: string) {
  return warningTypeCards.value.find(card => card.label === type)?.color ?? '#8FB6D4';
}

interface WarningEventMeta {
  level: string;
  levelClass: string;
  deadline: string;
  description: string;
}

const warningEventMeta = computed<WarningEventMeta>(() => {
  const name = selectedEvent.value;
  if (name.includes('审批超管控')) {
    return {
      level: '中风险 (审批超管控)',
      levelClass: 'text-[#FFC65C]',
      deadline: '剩余 4 小时 20 分',
      description: '城东区某取水户年度审批水量已超管控指标 8.2%，系统已暂停新增审批并推送水政复核。'
    };
  }
  if (name.includes('计量超许可')) {
    return {
      level: '高风险 (计量超许可)',
      levelClass: 'text-[#FF6B7A]',
      deadline: '剩余 2 小时 45 分',
      description: '湟源县某工业取水户计量累计水量已超许可 12.7%，系统已锁定相关取水闸门遥控频次并触发二级督办。'
    };
  }
  if (name.includes('直报超许可')) {
    return {
      level: '高风险 (直报超许可)',
      levelClass: 'text-[#FF6B7A]',
      deadline: '剩余 2 小时 10 分',
      description: '城中区某取水户直报累计水量超许可 5.3%，已触发直报数据回溯与现场核验任务。'
    };
  }
  if (name.includes('税务超计划')) {
    return {
      level: '中风险 (税务超计划)',
      levelClass: 'text-[#FFC65C]',
      deadline: '剩余 5 小时 30 分',
      description: '湟中区某取水户税务核定水量超年度计划 3.6%，已推送税务与水利联合比对。'
    };
  }
  if (name.includes('执行超用水计划') || name.includes('执行超月计划') || name.includes('执行超计划')) {
    return {
      level: '中风险 (执行超月计划)',
      levelClass: 'text-[#FFC65C]',
      deadline: '剩余 6 小时 00 分',
      description: '大通县某灌区本月执行水量超月计划 1.8%，已生成节水调度建议并下发灌区管理单位。'
    };
  }
  if (name.includes('今日高危')) {
    return {
      level: '高风险 (综合态势)',
      levelClass: 'text-[#FF6B7A]',
      deadline: '剩余 3 小时 15 分',
      description: '全域今日累计触发预警 27 条，其中超许可类 5 条，已按风险等级分派至各区县水政执法队伍。'
    };
  }
  if (name.includes('专项业务督办')) {
    return {
      level: '中风险 (专项督办)',
      levelClass: 'text-[#FFC65C]',
      deadline: '剩余 8 小时 40 分',
      description: '专项业务督办工单核办中 2 件，系统已按处置时限向责任单位推送催办提醒。'
    };
  }
  return {
    level: '高风险 (超许可预警)',
    levelClass: 'text-[#FF6B7A]',
    deadline: '剩余 2 小时 45 分',
    description: '监测到湟源县某工业取水户累计已超许可 12.7%，系统已自动锁定相关取水闸门遥控频次，触发二级水政督办流程。'
  };
});

// ================= 计量点接入、到报与异常月度趋势 =================
type MeterTrendMetricKey = 'access' | 'report' | 'anomaly';

interface MeterMonitorCategoryDefinition {
  key: string;
  label: string;
  shortLabel: string;
  accent: string;
  showAnomalyRate: boolean;
  series: Record<MeterTrendMetricKey, number[]>;
}

const meterTrendMonths = ['1月', '2月', '3月', '4月', '5月', '6月'];

const meterMonitorCategoryDefinitions: MeterMonitorCategoryDefinition[] = [
  {
    key: 'largeScaleAgriculture',
    label: '规模以上农业',
    shortLabel: '规上农业',
    accent: '#3DDC97',
    showAnomalyRate: true,
    series: {
      access: [89.2, 90.1, 90.8, 91.4, 91.9, 92.36],
      report: [83.1, 84.6, 85.4, 86.8, 87.6, 88.45],
      anomaly: [3.4, 3.1, 2.8, 2.5, 2.3, 2.18],
    },
  },
  {
    key: 'largeScaleIndustry',
    label: '规模以上非农',
    shortLabel: '规上非农',
    accent: '#38BDF8',
    showAnomalyRate: true,
    series: {
      access: [91.2, 92.0, 93.1, 94.0, 94.7, 95.12],
      report: [86.5, 87.2, 88.0, 88.7, 89.2, 89.86],
      anomaly: [2.8, 2.5, 2.2, 1.9, 1.7, 1.58],
    },
  },
  {
    key: 'centralDevelopmentFunds',
    label: '中央发展资金',
    shortLabel: '中央资金',
    accent: '#FF9F43',
    showAnomalyRate: false,
    series: {
      access: [93.1, 93.4, 94.0, 94.8, 95.2, 95.62],
      report: [89.2, 90.1, 91.0, 91.7, 92.3, 92.84],
      anomaly: [2.1, 1.9, 1.7, 1.5, 1.3, 1.16],
    },
  },
];

function formatMeterRate(value: number): string {
  return value.toFixed(2);
}

const meterMonitorCategories = computed(() => meterMonitorCategoryDefinitions.map(category => {
  return {
    ...category,
    accessRate: formatMeterRate(category.series.access[category.series.access.length - 1]),
    reportRate: formatMeterRate(category.series.report[category.series.report.length - 1]),
    anomalyRate: formatMeterRate(category.series.anomaly[category.series.anomaly.length - 1]),
  };
}));

const meterTrendChart = computed(() => {
  const plotLeft = 34;
  const plotRight = 366;
  const plotTop = 12;
  const plotBottom = 126;
  const axisMax = 100;
  const monthStep = (plotRight - plotLeft) / Math.max(1, meterTrendMonths.length - 1);
  const toY = (value: number) =>
    plotBottom - (Math.max(0, Math.min(axisMax, value)) / axisMax) * (plotBottom - plotTop);
  const xTicks = meterTrendMonths.map((label, index) => ({
    label,
    x: Number((plotLeft + index * monthStep).toFixed(2)),
  }));
  const yTicks = [100, 80, 60, 40, 20, 0].map(value => ({
    value,
    y: Number(toY(value).toFixed(2)),
  }));

  const buildSeries = (metric: 'report' | 'anomaly') =>
    meterMonitorCategoryDefinitions
      .filter(category => metric === 'report' || category.showAnomalyRate)
      .map(category => {
        const pointList = category.series[metric].map((value, index) => ({
          month: meterTrendMonths[index],
          value,
          x: Number((plotLeft + index * monthStep).toFixed(2)),
          y: Number(toY(value).toFixed(2)),
        }));
        return {
          id: `${category.key}-${metric}`,
          categoryLabel: category.label,
          metric,
          metricLabel: metric === 'report' ? '到报率' : '异常率',
          color: category.accent,
          pointList,
          points: pointList.map(point => `${point.x},${point.y}`).join(' '),
        };
      });

  return {
    plotLeft,
    plotRight,
    plotTop,
    plotBottom,
    xTicks,
    yTicks,
    // 先绘制正向的到报率，再绘制负向的异常率，保证虚线不被实线覆盖。
    series: [...buildSeries('report'), ...buildSeries('anomaly')],
  };
});

// Top Map 6 Metrics KPI Strip (根据综合应用场景 vs 专项业务应用场景动态展现)
interface TopMapMetric {
  title: string;
  value: string;
  unit: string;
  subText: string;
  subClass: string;
  iconType: 'none' | 'warning' | 'red-dot';
  clickable?: boolean;
  action: () => void;
}

const topMapMetrics = computed<TopMapMetric[]>(() => {
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
  const totals = districtTotals.value;
  const riverSplit = approvedRiverSplit.value;
  const toHundredMillion = (value: number) => (value / 10000).toFixed(2);
  const toPercent = (value: number, base: number) => base > 0 ? `${((value / base) * 100).toFixed(1)}%` : '0.0%';

  return [
    {
      title: '区域管控指标',
      value: '18.62',
      unit: '亿m³',
      subText: '同比 +2.3%',
      subClass: 'text-cyan-300',
      iconType: 'none',
      action: () => {}
    },
    {
      title: '批复总量',
      value: toHundredMillion(riverSplit.approved),
      unit: '亿m³',
      subText: `河道内 ${toHundredMillion(riverSplit.riverInside)} · 河道外 ${toHundredMillion(riverSplit.riverOutside)}\n河道外占管控 ${riverSplit.outsideControlRate.toFixed(1)}%`,
      subClass: 'text-cyan-300',
      iconType: 'none',
      action: () => {}
    },
    {
      title: '直报水量总量',
      value: toHundredMillion(totals.reported),
      unit: '亿m³',
      subText: `占计划水量 ${toPercent(totals.reported, totals.planned)}`,
      subClass: 'text-cyan-300',
      iconType: 'none',
      action: () => {}
    },
    {
      title: '计量水量总量',
      value: toHundredMillion(totals.metered),
      unit: '亿m³',
      subText: `占许可水量 ${toPercent(totals.metered, totals.licensed)}`,
      subClass: 'text-cyan-300',
      iconType: 'none',
      action: () => {
        navigate('facility_management');
      }
    },
    {
      title: '税务申报水量',
      value: toHundredMillion(totals.taxWater),
      unit: '亿m³',
      subText: `占计划水量 ${toPercent(totals.taxWater, totals.planned)}`,
      subClass: 'text-cyan-300',
      iconType: 'none',
      action: () => {
        navigate('enterprise_dossier');
      }
    },
    {
      title: '计划水量',
      value: toHundredMillion(totals.planned),
      unit: '亿m³',
      subText: `占管控指标 ${toPercent(totals.planned, totals.controlTarget)}`,
      subClass: 'text-cyan-300',
      iconType: 'none',
      action: () => {
        navigate('water_data_revision');
      }
    }
  ];
});

function handleEventClick(eventName: string) {
  showWarningEventDetailModal.value = false;
  showCertificateWarningModal.value = false;
  showMeterOverPointModal.value = false;
  selectedEvent.value = eventName;
  showWarningModal.value = true;
}

function dispatchWarningWorkOrder() {
  showWarningModal.value = false;
  showWarningEventDetailModal.value = false;
  showCertificateWarningModal.value = false;
  showMeterOverPointModal.value = false;
  navigate('fault');
}

// =========================================================================
// 综合应用场景 - 业务关联研判数据治理
// =========================================================================

type DirectoryIssueKey = 'noLicense' | 'expired' | 'conflict' | 'invalid';

interface LicenseIssueRecord {
  id: string;
  entity: string;
  creditCode: string;
  licenseNo: string;
  district: string;
  issueType: string;
}

interface DirectoryIssueRecord {
  id: string;
  category: DirectoryIssueKey;
  name: string;
  creditCode: string;
  licenseNo: string;
  district: string;
  detail: string;
}

interface GovernanceDetailRow {
  id: string;
  name: string;
  creditCode: string;
  licenseNo: string;
  district: string;
  note: string;
}

const LICENSE_LEDGER_TOTAL = 58;

const licenseIssueList = ref<LicenseIssueRecord[]>([
  { id: 'lic-01', entity: '青海青稞酒业有限公司', creditCode: '91630121MA7523XK8B', licenseNo: '取水（青）字〔2022〕第018号', district: '湟源县', issueType: '证照信息缺失' },
  { id: 'lic-02', entity: '西宁特殊钢股份有限公司', creditCode: '91630000226581234T', licenseNo: '取水（青）字〔2021〕第007号', district: '城北区', issueType: '许可量与台账不一致' },
  { id: 'lic-03', entity: '青海云天化国际化肥有限公司', creditCode: '91630100698512345Q', licenseNo: '取水（青）字〔2020〕第032号', district: '湟中区', issueType: '证照有效期已过期' },
  { id: 'lic-04', entity: '大通县北川工业园区供水有限公司', creditCode: '91630121MA7548YL2N', licenseNo: '取水（青）字〔2023〕第011号', district: '大通县', issueType: '取水用途与许可事项不符' },
  { id: 'lic-05', entity: '西宁供水（集团）有限责任公司', creditCode: '91630100226598765K', licenseNo: '取水（青）字〔2019〕第004号', district: '城西区', issueType: '取水口坐标未校准' },
  { id: 'lic-06', entity: '青海宜化化工有限责任公司', creditCode: '91630122698543210W', licenseNo: '取水（青）字〔2022〕第025号', district: '湟中区', issueType: '证照附件缺失' },
  { id: 'lic-07', entity: '青海桥头铝电股份有限公司', creditCode: '91630121698567890E', licenseNo: '取水（青）字〔2021〕第016号', district: '大通县', issueType: '许可量单位换算异常' },
  { id: 'lic-08', entity: '西宁市湟水投资管理有限公司', creditCode: '91630100MA7589PL3R', licenseNo: '取水（青）字〔2023〕第009号', district: '城东区', issueType: '证照状态未同步' }
]);

const directoryIssueList = ref<DirectoryIssueRecord[]>([
  { id: 'dir-01', category: 'noLicense', name: '湟源县和平乡小高陵灌溉机井', creditCode: '91630123MA7591KE4C', licenseNo: '—', district: '湟源县', detail: '未关联有效取水许可证' },
  { id: 'dir-02', category: 'noLicense', name: '大通县东峡镇田家沟村集中供水工程', creditCode: '91630121MA75A2BC7D', licenseNo: '—', district: '大通县', detail: '名录有记录，证照库无有效证照' },
  { id: 'dir-03', category: 'noLicense', name: '湟中区拦隆口镇班仲营村灌溉机井', creditCode: '91630122MA75B3CD8E', licenseNo: '—', district: '湟中区', detail: '取水户已注销，名录未清理' },
  { id: 'dir-04', category: 'noLicense', name: '城北区二十里铺镇花园台村取水点', creditCode: '91630105MA75C4DE9F', licenseNo: '—', district: '城北区', detail: '未关联任何取水许可' },
  { id: 'dir-05', category: 'noLicense', name: '湟源县申中乡莫布拉村人饮工程', creditCode: '91630123MA75D5EF1G', licenseNo: '—', district: '湟源县', detail: '证照关联为空' },
  { id: 'dir-06', category: 'noLicense', name: '大通县城关镇李家磨村灌溉机井', creditCode: '91630121MA75E6FG2H', licenseNo: '—', district: '大通县', detail: '临时取水未办理许可' },
  { id: 'dir-07', category: 'expired', name: '青海华鼎实业股份有限公司', creditCode: '91630000226587654M', licenseNo: '取水（青）字〔2018〕第021号', district: '城北区', detail: '证照已注销，名录仍在用' },
  { id: 'dir-08', category: 'expired', name: '青海盐湖海纳化工有限公司', creditCode: '91630122698576543N', licenseNo: '取水（青）字〔2017〕第013号', district: '湟中区', detail: '证照已吊销' },
  { id: 'dir-09', category: 'expired', name: '西宁中油燃气有限责任公司', creditCode: '91630100226543210P', licenseNo: '取水（青）字〔2019〕第028号', district: '城东区', detail: '证照已撤销' },
  { id: 'dir-10', category: 'expired', name: '大通县金地燃气有限公司', creditCode: '91630121MA7567QR3S', licenseNo: '取水（青）字〔2020〕第035号', district: '大通县', detail: '证照有效期已过期' },
  { id: 'dir-11', category: 'conflict', name: '青海祁连山水泥有限公司 / 湟中分公司', creditCode: '91630122698532109R / 91630122MA7578ST4U', licenseNo: '取水（青）字〔2021〕第019号', district: '湟中区', detail: '同一证照绑定2个不同信用代码' },
  { id: 'dir-12', category: 'conflict', name: '西宁城投能源开发有限公司 / 环境资源公司', creditCode: '91630100MA7589UV5W / 91630100MA7590XY6Z', licenseNo: '取水（青）字〔2022〕第026号', district: '城西区', detail: '证照重复绑定，信用代码不一致' },
  { id: 'dir-13', category: 'invalid', name: '青海省投资集团有限公司', creditCode: '91630000226512345A', licenseNo: '取水（青）字〔2009〕第002号', district: '城中区', detail: '旧版证照未换发' },
  { id: 'dir-14', category: 'invalid', name: '西宁市第一人民医院', creditCode: '12630100440012345B', licenseNo: '取水（青）密字第003号', district: '城中区', detail: '涉密证码未纳入校验库' },
  { id: 'dir-15', category: 'invalid', name: '青海大学附属医院', creditCode: '12630000440067890C', licenseNo: '取水（青）密字第007号', district: '城西区', detail: '涉密证码无法自动核验' }
]);

const licenseGovernanceStats = computed(() => {
  const issueCount = licenseIssueList.value.length;
  const completed = LICENSE_LEDGER_TOTAL - issueCount;
  const completionPercent = (completed / LICENSE_LEDGER_TOTAL) * 100;
  return {
    total: LICENSE_LEDGER_TOTAL,
    completed,
    issueCount,
    completionPercent,
    completionRate: `${completionPercent.toFixed(1)}%`
  };
});

const licenseGovernanceRing = computed(() => {
  const circumference = 2 * Math.PI * 37;
  return {
    circumference,
    offset: circumference * (1 - licenseGovernanceStats.value.completionPercent / 100)
  };
});

const archiveCompletenessLevels = [
  { label: '优', count: 1842, rate: '65.3%', color: '#3FD0FF' },
  { label: '良', count: 612, rate: '21.7%', color: '#3FD0FF' },
  { label: '中', count: 248, rate: '8.8%', color: '#3FD0FF' },
  { label: '差', count: 117, rate: '4.2%', color: '#FF6B7A' }
];

const archiveCompletenessTotal = computed(() =>
  archiveCompletenessLevels.reduce((total, level) => total + level.count, 0)
);

const directoryIssueCategories: Array<{ key: DirectoryIssueKey; label: string; desc: string; color: string }> = [
  { key: 'noLicense', label: '无证取水名录', desc: '未关联有效证照', color: '#FFC65C' },
  { key: 'expired', label: '证照失效名录', desc: '注销/吊销/过期', color: '#FF6B7A' },
  { key: 'conflict', label: '证照绑定冲突', desc: '同一证照重复绑定', color: '#A78BFA' },
  { key: 'invalid', label: '绑定无效证照', desc: '老证 / 涉密证码', color: '#38BDF8' }
];

const directoryIssueCounts = computed<Record<DirectoryIssueKey, number>>(() => {
  const counts: Record<DirectoryIssueKey, number> = { noLicense: 0, expired: 0, conflict: 0, invalid: 0 };
  for (const item of directoryIssueList.value) {
    counts[item.category] += 1;
  }
  return counts;
});

const directoryIssueTotal = computed(() => directoryIssueList.value.length);

const showGovernanceDetailModal = ref(false);
const governanceDetailMode = ref<'license' | 'directory'>('license');
const selectedDirectoryIssueKey = ref<DirectoryIssueKey | null>(null);

const governanceDetailCategory = computed(() =>
  directoryIssueCategories.find(category => category.key === selectedDirectoryIssueKey.value) ?? null
);

const governanceDetailAccent = computed(() => {
  if (governanceDetailMode.value === 'license') return '#FFC65C';
  return governanceDetailCategory.value?.color ?? '#00E5FF';
});

const governanceDetailTitle = computed(() => {
  if (governanceDetailMode.value === 'license') return '证照问题明细';
  return `${governanceDetailCategory.value?.label ?? '名录'} `;
});

const governanceDetailSubtitle = computed(() => {
  if (governanceDetailMode.value === 'license') {
    const { total, completed, issueCount } = licenseGovernanceStats.value;
    return `证照台账 ${total} 件 · 完成治理 ${completed} 件 · 待整改 ${issueCount} 件`;
  }
  const category = governanceDetailCategory.value;
  return category ? `${category.desc} · 共 ${directoryIssueCounts.value[category.key]} 条` : '';
});

const governanceDetailColumns = computed(() =>
  governanceDetailMode.value === 'license'
    ? ['取水权人名称', '统一社会信用代码', '取水许可证号', '所属区县', '错误类型']
    : ['名录名称', '统一社会信用代码', '关联证照编号', '所属区县', '问题说明']
);

const governanceDetailRows = computed<GovernanceDetailRow[]>(() => {
  if (governanceDetailMode.value === 'license') {
    return licenseIssueList.value.map(item => ({
      id: item.id,
      name: item.entity,
      creditCode: item.creditCode,
      licenseNo: item.licenseNo,
      district: item.district,
      note: item.issueType
    }));
  }
  const selectedKey = selectedDirectoryIssueKey.value;
  if (!selectedKey) return [];
  return directoryIssueList.value
    .filter(item => item.category === selectedKey)
    .map(item => ({
      id: item.id,
      name: item.name,
      creditCode: item.creditCode,
      licenseNo: item.licenseNo,
      district: item.district,
      note: item.detail
    }));
});

function openLicenseIssueDetail() {
  governanceDetailMode.value = 'license';
  selectedDirectoryIssueKey.value = null;
  showGovernanceDetailModal.value = true;
}

function openDirectoryIssueDetail(key: DirectoryIssueKey) {
  governanceDetailMode.value = 'directory';
  selectedDirectoryIssueKey.value = key;
  showGovernanceDetailModal.value = true;
}

// =========================================================================
// 专项业务应用场景 4 大专业模块数据结构与交互
// =========================================================================

const meterAbnormalStats = [
  { key: 'message', label: '极大值告警', count: 6, desc: '帧头或校验位异常', color: '#FFC65C' },
  { key: 'parse', label: '水位异常', count: 3, desc: '规约字段解析失败', color: '#A78BFA' },
  { key: 'data', label: '瞬时流量异常', count: 9, desc: '负值、突增或恒值', color: '#3FD0FF' },
  { key: 'voltage', label: '负值告警', count: 2, desc: '终端供电电压越限', color: '#FF6B7A' },
  { key: 'voltage', label: '负值告警', count: 2, desc: '终端供电电压越限', color: '#FF6B7A' },
];

interface CentralFundYearStat {
  year: string;
  total: number;
  normal: number;
  fault: number;
  offline: number;
}

const centralFundYearStats: CentralFundYearStat[] = [
  { year: '2023', total: 42, normal: 37, fault: 3, offline: 2 },
  { year: '2024', total: 46, normal: 41, fault: 3, offline: 2 },
  { year: '2025', total: 50, normal: 45, fault: 3, offline: 2 },
  { year: '2026', total: 54, normal: 48, fault: 2, offline: 2 },
];

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
  { district: '城北区', total: 61, online: 55, offline: 2, fault: 1, pending: 3, rate: 90.2 },
  { district: '城西区', total: 54, online: 49, offline: 2, fault: 1, pending: 2, rate: 90.7 },
  { district: '城中区', total: 50, online: 45, offline: 2, fault: 1, pending: 2, rate: 90.0 },
  { district: '城东区', total: 46, online: 42, offline: 2, fault: 1, pending: 1, rate: 91.3 },
  { district: '湟中区', total: 42, online: 38, offline: 2, fault: 1, pending: 1, rate: 90.5 },
  { district: '大通县', total: 36, online: 32, offline: 2, fault: 1, pending: 1, rate: 88.9 },
  { district: '湟源县', total: 29, online: 23, offline: 2, fault: 2, pending: 2, rate: 79.3 },
]);

const currentFacilityUnits = computed(() => {
  const target = normalizeDistrictName(filterParams.value.district);
  if (target === '西宁市') return districtDeviceStats.value;
  return districtDeviceStats.value.filter(item => item.district === target);
});

const meterDeviceSummary = computed(() => {
  const list = currentFacilityUnits.value;
  const total = list.reduce((sum, item) => sum + item.total, 0);
  const online = list.reduce((sum, item) => sum + item.online, 0);
  const offline = list.reduce((sum, item) => sum + item.offline, 0);
  const fault = list.reduce((sum, item) => sum + item.fault, 0);
  const pending = list.reduce((sum, item) => sum + item.pending, 0);
  return {
    total,
    online,
    offline,
    fault,
    pending,
    onlineRate: total > 0 ? `${((online / total) * 100).toFixed(1)}%` : '0.0%',
  };
});

const meterMonitoringLegendItems = computed(() => {
  const summary = meterDeviceSummary.value;
  return [
    { key: 'total', filter: 'all' as const, label: '站点总数', value: summary.total, color: '#DCF2FF', borderColor: '#8FB6D4', textColor: '#DCF2FF' },
    { key: 'normal', filter: 'normal' as const, label: '正常站点', value: summary.online, color: '#3FD0FF', borderColor: '#B9F3FF', textColor: '#DCF2FF' },
    { key: 'offline', filter: 'offline' as const, label: '停用站点', value: summary.offline, color: '#8FB6D4', borderColor: '#C7D6E5', textColor: '#DCF2FF' },
    { key: 'fault', filter: 'fault' as const, label: '故障异常', value: summary.fault, color: '#FF6B7A', borderColor: '#FFD0D5', textColor: '#DCF2FF' },
    { key: 'pending', filter: 'pending' as const, label: '待检定', value: summary.pending, color: '#FFC65C', borderColor: '#FFF0C2', textColor: '#DCF2FF' },
  ].map(item => ({
    ...item,
    iconClass: item.key === 'offline'
      ? 'w-2.5 h-2.5 rounded-sm border'
      : 'w-2.5 h-2.5 rounded-full border',
  }));
});

interface FacilityStatusChartUnit extends DistrictDeviceStat {
  shortName: string;
  centerX: number;
  barX: [number, number, number, number];
}

const facilityStatusChartUnits = computed<FacilityStatusChartUnit[]>(() => {
  const list = currentFacilityUnits.value;
  const groupWidth = 342 / Math.max(1, list.length);
  const barWidth = list.length > 4 ? 7 : 14;
  const gap = list.length > 4 ? 2 : 3;
  const barsWidth = barWidth * 4 + gap * 3;
  return list.map((item, index) => {
    const centerX = 38 + groupWidth * (index + 0.5);
    const startX = centerX - barsWidth / 2;
    return {
      ...item,
      shortName: item.district.replace(/[区县]$/, ''),
      centerX,
      barX: [
        startX,
        startX + barWidth + gap,
        startX + (barWidth + gap) * 2,
        startX + (barWidth + gap) * 3,
      ],
    };
  });
});

const facilityStatusChartMax = computed(() => {
  const maxValue = Math.max(...currentFacilityUnits.value.map(item => item.online), 1);
  return maxValue <= 20 ? 20 : Math.ceil(maxValue / 20) * 20;
});

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
.dashboard-dark-select {
  color-scheme: dark;
  background-color: rgba(30, 123, 232, 0.28);
  backdrop-filter: blur(6px);
  box-shadow: inset 0 1px 0 rgba(155, 234, 255, 0.08);
}

.dashboard-dark-select:hover {
  background-color: rgba(41, 142, 255, 0.38);
}

.dashboard-dark-select option {
  background-color: #07172f;
  color: #DCF2FF;
}

.dashboard-dark-select option:checked {
  background-color: #0d3a63;
  color: #9BEAFF;
}

.license-governance-card {
  background:
    radial-gradient(circle at 50% 54%, rgba(61, 220, 151, 0.12), transparent 58%),
    linear-gradient(145deg, rgba(10, 36, 58, 0.66), rgba(7, 27, 46, 0.88));
}

.license-governance-ring-progress {
  stroke-dasharray: var(--license-ring-circumference);
  stroke-dashoffset: var(--license-ring-offset);
  animation: license-governance-ring-draw 1.1s cubic-bezier(0.16, 1, 0.3, 1) backwards;
  filter: drop-shadow(0 0 4px rgba(61, 220, 151, 0.55));
  transition: stroke-dashoffset 850ms cubic-bezier(0.16, 1, 0.3, 1);
}


.license-governance-issue:hover {
  background: linear-gradient(90deg, rgba(58, 46, 27, 0.94), rgba(19, 46, 62, 0.96));
  box-shadow:
    inset 2px 0 0 #FFC65C,
    0 0 12px rgba(255, 198, 92, 0.08);
}

@keyframes license-governance-ring-draw {
  from {
    stroke-dashoffset: var(--license-ring-circumference);
  }
  to {
    stroke-dashoffset: var(--license-ring-offset);
  }
}

.district-ring-card {
  background:
    radial-gradient(circle at 50% 34%, rgba(63, 208, 255, 0.09), transparent 56%),
    rgba(8, 31, 52, 0.58);
  border: 1px solid rgba(70, 180, 235, 0.14);
  transition: transform 180ms ease, border-color 180ms ease, background-color 180ms ease;
}

.district-ring-card:hover {
  transform: translateY(-1px);
  border-color: rgba(63, 208, 255, 0.38);
  background-color: rgba(12, 45, 72, 0.74);
}

.district-ring-progress {
  stroke-dasharray: var(--ring-circumference);
  stroke-dashoffset: var(--ring-offset);
  animation: district-ring-draw 1.05s cubic-bezier(0.16, 1, 0.3, 1) var(--ring-delay) backwards;
  transition: stroke-dashoffset 850ms cubic-bezier(0.16, 1, 0.3, 1);
  filter: drop-shadow(0 0 3px rgba(63, 208, 255, 0.38));
}

.district-ring-endpoint {
  animation: district-ring-pulse 2.8s ease-in-out infinite;
  filter: drop-shadow(0 0 3px currentColor);
}

.certificate-water-bar {
  transform-origin: bottom;
  animation: certificate-water-grow 520ms cubic-bezier(0.16, 1, 0.3, 1) backwards;
}

.certificate-water-bar-alert {
  border: 1px solid rgba(255, 255, 255, 0.38);
  animation:
    certificate-water-grow 520ms cubic-bezier(0.16, 1, 0.3, 1) backwards,
    certificate-water-alert 2.6s ease-in-out 520ms infinite;
}

.meter-alarm-wave,
.meter-legend-wave {
  transform-box: fill-box;
  transform-origin: center;
  animation: meter-alarm-wave 2.1s ease-out infinite;
}

.meter-alarm-wave-delay {
  animation-delay: 0.72s;
}

.approval-warning-district {
  animation: approval-warning-district-pulse 2.6s ease-in-out infinite;
}

@keyframes approval-warning-district-pulse {
  0%,
  100% {
    fill-opacity: 0.22;
    filter: drop-shadow(0 0 1px rgba(255, 107, 122, 0.35));
  }
  50% {
    fill-opacity: 0.36;
    filter: drop-shadow(0 0 8px rgba(255, 107, 122, 0.85));
  }
}

.over-plan-district-tag {
  outline: none;
  transition: opacity 160ms ease, filter 160ms ease;
}

.over-plan-tag-glass {
  transform-box: fill-box;
  transform-origin: center;
  animation: over-plan-tag-breathe 3.6s ease-in-out infinite;
  transition: stroke 160ms ease, fill-opacity 160ms ease;
}

.over-plan-tag-chevron {
  filter: drop-shadow(0 0 2px rgba(155, 234, 255, 0.7));
  transition: opacity 160ms ease, stroke 160ms ease;
}

.over-plan-district-tag:hover,
.over-plan-district-tag:focus-visible {
  opacity: 1;
  filter: brightness(1.22) drop-shadow(0 0 5px rgba(155, 234, 255, 0.5));
}

.over-plan-district-tag:hover .over-plan-tag-glass,
.over-plan-district-tag:focus-visible .over-plan-tag-glass,
.over-plan-district-tag.is-selected .over-plan-tag-glass {
  stroke: rgba(217, 250, 255, 0.96);
  fill-opacity: 0.96;
}

.over-plan-district-tag:hover .over-plan-tag-chevron,
.over-plan-district-tag:focus-visible .over-plan-tag-chevron,
.over-plan-district-tag.is-selected .over-plan-tag-chevron {
  stroke: #E1FCFF;
  opacity: 1;
}

@keyframes over-plan-tag-breathe {
  0%,
  100% {
    opacity: 0.78;
  }
  50% {
    opacity: 1;
  }
}

@keyframes district-ring-draw {
  from {
    stroke-dashoffset: var(--ring-circumference);
  }
  to {
    stroke-dashoffset: var(--ring-offset);
  }
}

@keyframes district-ring-pulse {
  0%,
  100% {
    opacity: 0.72;
  }
  50% {
    opacity: 1;
  }
}

@keyframes certificate-water-grow {
  from {
    transform: scaleY(0.08);
    opacity: 0.25;
  }
  to {
    transform: scaleY(1);
    opacity: 1;
  }
}

@keyframes certificate-water-alert {
  0%,
  100% {
    filter: brightness(0.92);
  }
  50% {
    filter: brightness(1.16);
  }
}

@keyframes meter-alarm-wave {
  0% {
    transform: scale(0.45);
    opacity: 0.9;
  }
  72% {
    transform: scale(1.55);
    opacity: 0.08;
  }
  100% {
    transform: scale(1.55);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .license-governance-ring-progress,
  .district-ring-progress,
  .district-ring-endpoint,
  .certificate-water-bar,
  .certificate-water-bar-alert,
  .meter-alarm-wave,
  .meter-legend-wave,
  .approval-warning-district,
  .over-plan-tag-glass {
    animation: none;
  }
}

@media (max-height: 820px) {
  .map-legend-filter {
    top: 26.5rem;
    bottom: auto;
  }

  .map-legend-filter .spec-card {
    max-height: 7.25rem;
    overflow-y: auto;
  }
}

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

/* Tooltip floating overlay - 绝对定位悬浮展示，不撑开父级或下方图表 */
.spec-tooltip {
  position: absolute !important;
  pointer-events: none !important;
  z-index: 50 !important;
}
</style>
