<template>
  <div class="fixed inset-0 z-50 w-screen h-screen bg-[#071328] text-white flex flex-col overflow-hidden font-sans select-none">
    
    <!-- ================= 1. TOP GLOBAL NAVIGATION HEADER ================= -->
    <header class="h-14 bg-gradient-to-b from-[#091a36] via-[#091b38] to-[#071328] border-b border-[#163665]/60 flex items-center justify-between px-5 shrink-0 z-40 relative shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      
      <!-- Top Left: Logo & Platform Title -->
      <div class="flex items-center gap-3">
        <!-- Glowing Water Drop Hex Icon -->
        <div class="relative w-9 h-9 flex items-center justify-center">
          <div class="absolute inset-0 bg-cyan-500/20 rounded-xl blur-xs"></div>
          <div class="relative w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white shadow-md">
            <svg class="w-5 h-5 text-white filter drop-shadow" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" opacity="0.9" />
              <path d="M12 7l2.8 2.8a3.8 3.8 0 1 1-5.6 0z" fill="#ffffff" />
            </svg>
          </div>
        </div>

        <h1 class="text-xl font-bold tracking-wider text-white font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
          西宁市取用水管理平台
        </h1>
      </div>

      <!-- Top Center: 5 Master Navigation Tabs -->
      <div class="flex items-center gap-2">
        <!-- Tab 1: 综合应用场景 (Active Glowing Shape) -->
        <div class="relative group cursor-pointer">
          <div class="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-md blur-xs opacity-80"></div>
          <div class="relative px-6 py-2 bg-gradient-to-b from-[#1956a6] to-[#0f3b79] border-t border-b border-cyan-400 text-white font-bold text-sm tracking-wide rounded shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)] flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-cyan-300 animate-pulse"></span>
            <span>综合应用场景</span>
          </div>
        </div>

        <!-- Tab 2: 取用水量核算 -->
        <button
          type="button"
          @click="navigate('irrigation_accounting')"
          class="px-5 py-2 text-slate-300 hover:text-white hover:bg-white/5 rounded text-sm font-medium transition cursor-pointer"
        >
          取用水量核算
        </button>

        <!-- Tab 3: 数据归集 -->
        <button
          type="button"
          @click="navigate('manual_collection')"
          class="px-5 py-2 text-slate-300 hover:text-white hover:bg-white/5 rounded text-sm font-medium transition cursor-pointer"
        >
          数据归集
        </button>

        <!-- Tab 4: 取用水户数据资源规范化整合 -->
        <button
          type="button"
          @click="navigate('enterprise_dossier')"
          class="px-5 py-2 text-slate-300 hover:text-white hover:bg-white/5 rounded text-sm font-medium transition cursor-pointer"
        >
          取用水户数据资源规范化整合
        </button>

        <!-- Tab 5: 数据治理及质量控制 -->
        <button
          type="button"
          @click="navigate('violation_national')"
          class="px-5 py-2 text-slate-300 hover:text-white hover:bg-white/5 rounded text-sm font-medium transition cursor-pointer"
        >
          数据治理及质量控制
        </button>
      </div>

      <!-- Top Right: Notification & Weather & Realtime Clock & Actions -->
      <div class="flex items-center gap-4 text-xs font-mono text-slate-200">
        
        <!-- Notifications Bell with Red Badge 12 -->
        <div class="relative cursor-pointer hover:opacity-80 transition" @click="showWarningModal = true">
          <svg class="w-5 h-5 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span class="absolute -top-1.5 -right-2 px-1.5 py-0.2 rounded-full bg-red-600 text-white text-[10px] font-bold border border-[#091a36]">
            12
          </span>
        </div>

        <!-- Weather: 18℃ -->
        <div class="flex items-center gap-1.5 text-slate-300">
          <svg class="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
          </svg>
          <span class="font-sans font-medium text-white">18℃</span>
        </div>

        <!-- Time & Date -->
        <div class="flex items-center gap-2 pl-1 border-l border-slate-700/60">
          <span class="text-sm font-bold text-white tracking-wider">{{ currentTimeStr }}</span>
          <div class="flex flex-col text-[10px] leading-tight text-slate-400 font-sans">
            <span>2025-05-20</span>
            <span>星期二</span>
          </div>
        </div>

        <!-- Fullscreen / Return Workbench Icon Buttons -->
        <div class="flex items-center gap-2 pl-2 border-l border-slate-700/60">
          <button
            type="button"
            @click="toggleFullscreen"
            class="p-1 text-slate-400 hover:text-white transition cursor-pointer"
            title="全屏切换"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
            </svg>
          </button>

          <!-- Back to Workbench button -->
          <button
            type="button"
            @click="navigate('home')"
            class="px-2 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-[11px] font-sans transition cursor-pointer flex items-center gap-1"
            title="返回标准工作台"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
    <main class="flex-1 relative min-h-0 overflow-hidden flex">
      
      <!-- Central GIS Satellite Vector & Contour Map (Background Layer) -->
      <div class="absolute inset-0 z-0 bg-[#061224] overflow-hidden">
        
        <!-- Dark Satellite Terrain Gradients & Contours -->
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0c2445] via-[#08182f] to-[#040c1a]"></div>
        
        <!-- Subtle Topographic Contour Lines -->
        <svg class="absolute inset-0 w-full h-full opacity-15 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
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

              <!-- Terrain Elevation Texture Pattern -->
              <radialGradient id="terrainGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#14345c" stop-opacity="0.9" />
                <stop offset="45%" stop-color="#0d284a" stop-opacity="0.8" />
                <stop offset="100%" stop-color="#061c36" stop-opacity="0.9" />
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
            <g v-if="activeLayers.boundaries && activeLayers.quotaWarning" class="pointer-events-none">
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

            <!-- 4. District Label Badges Positioned at Real Geographic Centroids (展示区县名称、计划水量与直报水量，超计划显著标红) -->
            <g
              v-for="district in xiningDistrictsGeo"
              :key="'label-' + district.adcode"
              :transform="getDistrictBadgeTransform(district)"
            >
              <g
                class="cursor-pointer transition-transform duration-150 hover:scale-105 select-none"
                @click="filterParams.district = normalizeDistrictName(district.name)"
                @mouseenter="hoveredDistrictName = district.name"
                @mouseleave="hoveredDistrictName = null"
              >
                <!-- 胶囊外框背景 (直报大于计划时，低饱和度红边轻度告警，中间底色保持暗色科技感) -->
                <rect
                  :x="-65"
                  :y="-16"
                  :width="130"
                  :height="32"
                  :rx="5"
                  :fill="filterParams.district === normalizeDistrictName(district.name) ? '#0284c7' : '#07182f'"
                  :fill-opacity="0.94"
                  :stroke="isDirectReportExceeded(district.name) ? '#f87171' : (filterParams.district === normalizeDistrictName(district.name) ? '#38bdf8' : '#1b4372')"
                  :stroke-width="isDirectReportExceeded(district.name) ? 1.4 : 1.0"
                />

                <!-- 顶部状态指示点 (超计划为低饱和度玫瑰红点，正常为水量梯级色) -->
                <circle
                  :cx="-54"
                  :cy="-6"
                  :r="3.2"
                  :fill="isDirectReportExceeded(district.name) ? '#f87171' : getDistrictFill(district.name)"
                />

                <!-- 区县名称 -->
                <text
                  :x="-46"
                  :y="-3"
                  fill="#ffffff"
                  font-size="10.5"
                  font-weight="bold"
                  text-anchor="start"
                >
                  {{ normalizeDistrictName(district.name) }}
                </text>

                <!-- 超计划状态微型徽标 / 正常合规徽标 -->
                <text
                  v-if="isDirectReportExceeded(district.name)"
                  :x="58"
                  :y="-3.5"
                  fill="#fb7185"
                  font-size="8.5"
                  font-weight="bold"
                  text-anchor="end"
                  letter-spacing="-0.3"
                >
                  超计划!
                </text>
                <text
                  v-else
                  :x="58"
                  :y="-3.5"
                  fill="#10b981"
                  font-size="8.5"
                  text-anchor="end"
                >
                  合规
                </text>

                <!-- 下层数据展示行: 计划水量 与 直报水量 -->
                <!-- 计划水量 -->
                <text
                  :x="-56"
                  :y="9.5"
                  fill="#94a3b8"
                  font-size="8.5"
                  font-family="monospace"
                  text-anchor="start"
                >
                  计:{{ getDistrictQuota(district.name).planned }}万m³
                </text>

                <!-- 分隔符 -->
                <text
                  :x="4"
                  :y="9"
                  fill="#334155"
                  font-size="8.5"
                  text-anchor="middle"
                >
                  |
                </text>

                <!-- 直报水量 (超计划用亮红字体高亮，否则用天蓝亮色) -->
                <text
                  :x="58"
                  :y="9.5"
                  :fill="isDirectReportExceeded(district.name) ? '#f87171' : '#38bdf8'"
                  font-size="8.5"
                  font-family="monospace"
                  font-weight="bold"
                  text-anchor="end"
                >
                  报:{{ getDistrictQuota(district.name).reported }}万m³
                </text>
              </g>
            </g>

            <!-- 5. 综合应用场景：区县悬浮详细水量卡片 (跟随光标区划即时提示) -->
            <g
              v-if="hoveredDistrictName"
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
            <g v-if="scenarioMode !== 'comprehensive' && activeLayers.users">
              <g
                v-for="user in waterUsersList"
                :key="'user-' + user.id"
                :transform="`translate(${user.x}, ${user.y})`"
                class="cursor-pointer transition-transform duration-150 hover:scale-125"
                @click="filterParams.district = user.district"
              >
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
      <aside class="relative z-20 w-[430px] 2xl:w-[470px] h-full p-2.5 flex flex-col gap-2.5 pointer-events-auto shrink-0 overflow-y-auto custom-dark-scrollbar">
        
        <!-- A. 综合应用场景 -->
        <template v-if="scenarioMode === 'comprehensive'">
        <!-- ================= Card 1: 行政区域用水对比 (独立卡片 1) ================= -->
        <div class="bg-[#081b36]/90 backdrop-blur-md rounded-xl border border-[#143b6b] p-3.5 shadow-xl flex-1 min-h-[220px] flex flex-col justify-between">
          <!-- Card Header & Filter -->
          <div class="flex items-center justify-between pb-2 border-b border-[#143b6b]/80">
            <div class="flex items-center gap-2">
              <span class="w-1.5 h-4 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
              <h2 class="text-sm 2xl:text-base font-bold text-white tracking-wide">行政区域用水对比</h2>
              <span class="text-xs text-slate-300 font-medium">(万m³)</span>
            </div>
            
            <div class="flex items-center gap-1.5">
              <select
                v-model="filterParams.district"
                class="bg-[#0b2447] border border-[#1b4372] rounded-md px-2 py-1 text-slate-100 text-xs focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                <option value="西宁市">全域西宁</option>
                <option value="城东区">城东区</option>
                <option value="城中区">城中区</option>
                <option value="城西区">城西区</option>
                <option value="城北区">城北区</option>
                <option value="湟中区">湟中区</option>
                <option value="湟源县">湟源县</option>
                <option value="大通县">大通县</option>
              </select>

              <select
                v-model="filterParams.timeRange"
                class="bg-[#0b2447] border border-[#1b4372] rounded-md px-2 py-1 text-slate-100 text-xs focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                <option value="curr">2025年度</option>
                <option value="1y">近1年</option>
                <option value="3y">近3年</option>
              </select>
            </div>
          </div>

          <!-- Total KPIs Quick Strip inside Card 1 (5项参数：水蓝系柱族 + 金白管控线族) -->
          <div class="bg-[#0a2244]/60 rounded-lg p-1.5 my-1.5 border border-[#143b6b]/60">
            <div class="grid grid-cols-5 gap-1">
              <div class="text-center">
                <div class="text-[10px] text-slate-300">计量水量</div>
                <div class="text-xs font-bold font-mono text-cyan-300 mt-0.5">{{ districtTotals.metered.toLocaleString() }}</div>
              </div>
              <div class="text-center">
                <div class="text-[10px] text-slate-300">直报水量</div>
                <div class="text-xs font-bold font-mono text-sky-300 mt-0.5">{{ districtTotals.reported.toLocaleString() }}</div>
              </div>
              <div class="text-center">
                <div class="text-[10px] text-slate-300">税务水量</div>
                <div class="text-xs font-bold font-mono text-blue-300 mt-0.5">{{ districtTotals.taxWater.toLocaleString() }}</div>
              </div>
              <div class="text-center">
                <div class="text-[10px] text-slate-300">许可水量</div>
                <div class="text-xs font-bold font-mono text-amber-300 mt-0.5">{{ districtTotals.licensed.toLocaleString() }}</div>
              </div>
              <div class="text-center">
                <div class="text-[10px] text-slate-300">计划水量</div>
                <div class="text-xs font-bold font-mono text-slate-200 mt-0.5">{{ districtTotals.planned.toLocaleString() }}</div>
              </div>
            </div>
          </div>

          <!-- 5 Legends Bar (减少杂色，归拢为水蓝柱族与管控线族) -->
          <div class="flex items-center justify-between px-1 mb-1">
            <span class="text-xs font-medium text-slate-400">统计参数:</span>
            <div class="flex items-center gap-2.5 text-[11px] flex-wrap">
              <!-- 水蓝柱族 -->
              <div class="flex items-center gap-1">
                <span class="w-2.5 h-2.5 rounded-xs bg-[#00e5ff]"></span>
                <span class="text-slate-200">计量水量</span>
              </div>
              <div class="flex items-center gap-1">
                <span class="w-2.5 h-2.5 rounded-xs bg-[#38bdf8]"></span>
                <span class="text-slate-200">直报水量</span>
              </div>
              <div class="flex items-center gap-1">
                <span class="w-2.5 h-2.5 rounded-xs bg-[#60a5fa]"></span>
                <span class="text-slate-200">税务水量</span>
              </div>
              <!-- 管控线族 -->
              <div class="flex items-center gap-1">
                <span class="inline-flex items-center text-[#f59e0b] font-bold text-xs tracking-tighter">―●―</span>
                <span class="text-amber-300">许可水量</span>
              </div>
              <div class="flex items-center gap-1">
                <span class="inline-flex items-center text-slate-300 font-bold text-xs tracking-tighter">┄○┄</span>
                <span class="text-slate-300">计划水量</span>
              </div>
            </div>
          </div>

          <!-- SVG 5-Parameter Combo Chart: 3 Bars (水蓝同色系) + 2 Lines (金白管控线) -->
          <div class="w-full flex-1 min-h-[145px] relative">
            <svg viewBox="0 0 380 120" class="w-full h-full overflow-visible">
              <!-- Horizontal grids -->
              <g stroke="#163866" stroke-width="0.8">
                <line x1="34" y1="18" x2="375" y2="18" />
                <line x1="34" y1="44" x2="375" y2="44" />
                <line x1="34" y1="70" x2="375" y2="70" />
                <line x1="34" y1="96" x2="375" y2="96" stroke="#1f4b82" stroke-width="1.2" />
              </g>

              <!-- Y-Axis labels (font-size 10, monospace) -->
              <g fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="end">
                <text x="30" y="21">35k</text>
                <text x="30" y="47">25k</text>
                <text x="30" y="73">12k</text>
                <text x="30" y="99">0</text>
              </g>

              <!-- 1. 7 Districts Grouped 3 Bars: 计量水量 (青 #00e5ff), 直报水量 (天蓝 #38bdf8), 税务水量 (柔蓝 #60a5fa) -->
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
                  fill="#00e5ff"
                  :fill-opacity="filterParams.district === item.name ? 0.09 : 0"
                  class="group-hover:fill-opacity-10 transition-all rounded"
                  rx="3"
                />

                <!-- 1. 计量水量 Bar (Cyan #00e5ff) -->
                <rect
                  :x="41.5 + idx * 46"
                  :y="96 - Math.max(3, (item.metered / 35000) * 78)"
                  width="7.5"
                  :height="Math.max(3, (item.metered / 35000) * 78)"
                  fill="#00e5ff"
                  rx="1"
                  class="transition-opacity group-hover:opacity-90"
                >
                  <title>{{ item.name }} 计量水量: {{ item.metered }} 万m³</title>
                </rect>

                <!-- 2. 直报水量 Bar (Sky #38bdf8) -->
                <rect
                  :x="50.5 + idx * 46"
                  :y="96 - Math.max(3, (item.reported / 35000) * 78)"
                  width="7.5"
                  :height="Math.max(3, (item.reported / 35000) * 78)"
                  fill="#38bdf8"
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
                  :fill="filterParams.district === item.name ? '#00e5ff' : '#cbd5e1'"
                  class="group-hover:fill-cyan-300 transition-colors"
                >
                  {{ item.name }}
                </text>
              </g>

              <!-- 2. 许可水量折线 (金黄暖色 #f59e0b) -->
              <path
                :d="licensedLinePath"
                fill="none"
                stroke="#f59e0b"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="pointer-events-none drop-shadow-[0_0_4px_rgba(245,158,11,0.6)]"
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
                  fill="#f59e0b"
                  stroke="#ffffff"
                  stroke-width="1.6"
                  class="hover:scale-125 transition-transform"
                >
                  <title>{{ item.name }} 许可水量: {{ item.licensed }} 万m³</title>
                </circle>
              </g>

              <!-- 3. 计划水量折线 (银白虚线 #cbd5e1) -->
              <path
                :d="plannedLinePath"
                fill="none"
                stroke="#cbd5e1"
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
                  stroke="#94a3b8"
                  stroke-width="1.4"
                  class="hover:scale-125 transition-transform"
                >
                  <title>{{ item.name }} 计划水量: {{ item.planned }} 万m³</title>
                </circle>
              </g>
            </svg>

            <!-- Hover Popover Tooltip for District 5 Parameters -->
            <div
              v-if="hoveredBarDistrict"
              class="absolute top-1 right-2 bg-[#06182e]/95 border border-cyan-500/60 rounded-lg p-2.5 text-xs shadow-2xl pointer-events-none z-30 min-w-[175px]"
            >
              <div class="font-bold text-cyan-300 mb-1.5 border-b border-cyan-500/30 pb-1 flex items-center justify-between">
                <span>{{ hoveredBarDistrict.name }} 水量明细</span>
                <span class="text-[10px] text-slate-400 font-normal">万m³</span>
              </div>
              <div class="space-y-1 font-mono text-[11px]">
                <div class="text-cyan-300 flex justify-between gap-3 items-center">
                  <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-xs bg-[#00e5ff]"></span>计量水量:</span>
                  <span class="font-bold text-white">{{ hoveredBarDistrict.metered.toLocaleString() }}</span>
                </div>
                <div class="text-sky-300 flex justify-between gap-3 items-center">
                  <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-xs bg-[#38bdf8]"></span>直报水量:</span>
                  <span class="font-bold text-white">{{ hoveredBarDistrict.reported.toLocaleString() }}</span>
                </div>
                <div class="text-blue-300 flex justify-between gap-3 items-center">
                  <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-xs bg-[#60a5fa]"></span>税务水量:</span>
                  <span class="font-bold text-white">{{ hoveredBarDistrict.taxWater.toLocaleString() }}</span>
                </div>
                <div class="text-amber-300 flex justify-between gap-3 items-center">
                  <span class="flex items-center gap-1.5"><span class="w-2.5 h-0.5 bg-[#f59e0b]"></span>许可水量:</span>
                  <span class="font-bold text-white">{{ hoveredBarDistrict.licensed.toLocaleString() }}</span>
                </div>
                <div class="text-slate-200 flex justify-between gap-3 items-center">
                  <span class="flex items-center gap-1.5"><span class="w-2.5 h-0.5 border-t border-dashed border-slate-300"></span>计划水量:</span>
                  <span class="font-bold text-white">{{ hoveredBarDistrict.planned.toLocaleString() }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ================= Card 2: 用水时间变化趋势 (独立卡片 2: 实际取水[渐变面积] / 历史同期 / 许可水量) ================= -->
        <div class="bg-[#081b36]/90 backdrop-blur-md rounded-xl border border-[#143b6b] p-3.5 shadow-xl flex-1 min-h-[220px] flex flex-col justify-between">
          <div class="flex items-center justify-between pb-2 border-b border-[#143b6b]/80">
            <div class="flex items-center gap-2">
              <span class="w-1.5 h-4 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
              <h2 class="text-sm 2xl:text-base font-bold text-white tracking-wide">用水时间变化趋势</h2>
              <span class="text-xs text-slate-300 font-medium">(万m³)</span>
            </div>

            <!-- 3 Trend Legend Items -->
            <div class="flex items-center gap-3 text-xs">
              <!-- 实际取水 (带面积渐变) -->
              <div class="flex items-center gap-1.5">
                <span class="w-3.5 h-2 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-xs shadow-[0_0_5px_#00e5ff]"></span>
                <span class="text-cyan-300 font-medium">实际取水</span>
              </div>
              <!-- 历史同期 (深蓝实线) -->
              <div class="flex items-center gap-1.5">
                <span class="w-3.5 h-0.5 bg-[#3b82f6] rounded-xs"></span>
                <span class="text-slate-200 font-medium">历史同期</span>
              </div>
              <!-- 许可水量 (绿色虚线) -->
              <div class="flex items-center gap-1.5">
                <span class="w-3.5 h-0.5 border-t border-dashed border-[#10b981]"></span>
                <span class="text-slate-200 font-medium">许可水量</span>
              </div>
            </div>
          </div>

          <!-- Highlight Metric Strip inside Card 2 -->
          <div class="flex items-center justify-between px-2 py-1.5 bg-[#0a2244]/60 rounded-lg border border-[#143b6b]/60 my-1 text-xs">
            <div class="flex items-center gap-1.5">
              <span class="text-slate-300 font-medium">当前月份(5月):</span>
              <span class="text-base font-bold font-mono text-cyan-300">12,850 万m³</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-amber-400 font-mono font-medium">同期比 +3.6% ↑</span>
              <span class="text-emerald-400 font-mono font-medium">许可红线 15,600</span>
            </div>
          </div>

          <!-- SVG Smooth Curve & Area Gradient Trend Chart -->
          <div class="w-full flex-1 min-h-[145px] relative">
            <svg viewBox="0 0 380 120" class="w-full h-full overflow-visible">
              <defs>
                <!-- Area gradient for 实际取水 -->
                <linearGradient id="actualAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#00e5ff" stop-opacity="0.45" />
                  <stop offset="50%" stop-color="#00b4d8" stop-opacity="0.20" />
                  <stop offset="100%" stop-color="#0284c7" stop-opacity="0.0" />
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
              <g stroke="#163866" stroke-width="0.8">
                <line x1="36" y1="16" x2="368" y2="16" />
                <line x1="36" y1="42" x2="368" y2="42" />
                <line x1="36" y1="68" x2="368" y2="68" />
                <line x1="36" y1="94" x2="368" y2="94" stroke="#1f4b82" stroke-width="1.2" />
              </g>

              <!-- Y-Axis labels (font-size 10) -->
              <g fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="end">
                <text x="32" y="19">18k</text>
                <text x="32" y="45">12k</text>
                <text x="32" y="71">6k</text>
                <text x="32" y="97">0</text>
              </g>

              <!-- 1. 实际取水 Gradient Area -->
              <path
                :d="trendChartData.actualArea"
                fill="url(#actualAreaGrad)"
                class="transition-all duration-300"
              />

              <!-- 2. 许可水量 Line (Green Dashed Baseline #10b981) -->
              <path
                :d="trendChartData.licensedLine"
                fill="none"
                stroke="#10b981"
                stroke-width="1.8"
                stroke-dasharray="4 3"
                opacity="0.85"
              />

              <!-- 3. 历史同期 Line (Blue Solid Line #3b82f6) -->
              <path
                :d="trendChartData.historyLine"
                fill="none"
                stroke="#3b82f6"
                stroke-width="2"
                opacity="0.85"
              />

              <!-- 4. 实际取水 Line (Glowing Cyan #00e5ff) -->
              <path
                :d="trendChartData.actualLine"
                fill="none"
                stroke="#00e5ff"
                stroke-width="2.5"
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
                  :fill="hoveredTrendIdx === idx ? '#00e5ff' : '#cbd5e1'"
                >
                  {{ item.month }}
                </text>

                <!-- Data point dot on 实际取水 line -->
                <circle
                  :cx="36 + idx * (332 / 11)"
                  :cy="94 - (item.actual / 18000) * 78"
                  :r="hoveredTrendIdx === idx ? 4.5 : 2.5"
                  fill="#ffffff"
                  stroke="#00e5ff"
                  :stroke-width="hoveredTrendIdx === idx ? 2.5 : 1.5"
                  class="transition-all"
                />
              </g>
            </svg>

            <!-- Hover Month Tooltip -->
            <div
              v-if="hoveredTrendIdx !== null"
              class="absolute top-1 right-2 bg-[#06182e]/95 border border-cyan-500/60 rounded-lg p-2 text-xs shadow-xl pointer-events-none z-30"
            >
              <div class="font-bold text-cyan-300 mb-1 border-b border-cyan-500/30 pb-0.5">
                {{ monthlyTrendData[hoveredTrendIdx].month }} 用水情况
              </div>
              <div class="space-y-0.5 font-mono">
                <div class="text-[#00e5ff] flex justify-between gap-3">
                  <span>实际取水:</span>
                  <span class="font-bold">{{ monthlyTrendData[hoveredTrendIdx].actual }} 万m³</span>
                </div>
                <div class="text-[#3b82f6] flex justify-between gap-3">
                  <span>历史同期:</span>
                  <span>{{ monthlyTrendData[hoveredTrendIdx].history }} 万m³</span>
                </div>
                <div class="text-[#10b981] flex justify-between gap-3">
                  <span>许可水量:</span>
                  <span>{{ monthlyTrendData[hoveredTrendIdx].licensed }} 万m³</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ================= Card 3: 行业用水结构占比 (独立卡片 3) ================= -->
        <div class="bg-[#081b36]/90 backdrop-blur-md rounded-xl border border-[#143b6b] p-3.5 shadow-xl flex-1 min-h-[220px] flex flex-col justify-between">
          <div class="flex items-center justify-between pb-2 border-b border-[#143b6b]/80">
            <div class="flex items-center gap-2">
              <span class="w-1.5 h-4 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
              <h2 class="text-sm 2xl:text-base font-bold text-white tracking-wide">行业用水结构占比</h2>
            </div>
            <div class="text-xs text-cyan-300 font-mono font-bold">
              全域总额: 61,327 万m³
            </div>
          </div>

          <!-- Donut Chart & Detailed Industry Breakdown (统一水蓝渐变色系，减少杂色) -->
          <div class="flex items-center gap-4 my-auto py-1">
            <!-- Left: Donut Chart with center total -->
            <div class="w-32 h-32 relative shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 100 100" class="w-full h-full -rotate-90">
                <!-- 农业 38.60% (circumference ~ 226) #00e5ff -->
                <circle cx="50" cy="50" r="36" fill="transparent" stroke="#00e5ff" stroke-width="15" stroke-dasharray="87.2 138.8" stroke-dashoffset="0" />
                <!-- 工业 31.78% #0284c7 -->
                <circle cx="50" cy="50" r="36" fill="transparent" stroke="#0284c7" stroke-width="15" stroke-dasharray="71.8 154.2" stroke-dashoffset="-87.2" />
                <!-- 城镇公共 12.35% #38bdf8 -->
                <circle cx="50" cy="50" r="36" fill="transparent" stroke="#38bdf8" stroke-width="15" stroke-dasharray="27.9 198.1" stroke-dashoffset="-159.0" />
                <!-- 居民生活 7.02% #60a5fa -->
                <circle cx="50" cy="50" r="36" fill="transparent" stroke="#60a5fa" stroke-width="15" stroke-dasharray="15.9 210.1" stroke-dashoffset="-186.9" />
                <!-- 生态环境 6.85% #818cf8 -->
                <circle cx="50" cy="50" r="36" fill="transparent" stroke="#818cf8" stroke-width="15" stroke-dasharray="15.5 210.5" stroke-dashoffset="-202.8" />
                <!-- 其他 3.40% #94a3b8 -->
                <circle cx="50" cy="50" r="36" fill="transparent" stroke="#94a3b8" stroke-width="15" stroke-dasharray="7.7 218.3" stroke-dashoffset="-218.3" />
              </svg>
              <!-- Center Text Inside Donut -->
              <div class="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span class="text-[11px] text-slate-300 font-medium">全行业</span>
                <span class="text-sm font-bold font-mono text-cyan-300">100%</span>
              </div>
            </div>

            <!-- Right: 6 Industry Items List with Volumes & Percentages -->
            <div class="flex-1 space-y-1.5 text-xs">
              <div class="flex items-center justify-between pb-1 border-b border-[#143b6b]/40">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-xs bg-[#00e5ff]"></span>
                  <span class="text-slate-200 font-medium">农业用水</span>
                </div>
                <div class="flex items-center gap-2 font-mono">
                  <span class="text-slate-300">23,672万m³</span>
                  <span class="font-bold text-cyan-300">38.60%</span>
                </div>
              </div>

              <div class="flex items-center justify-between pb-1 border-b border-[#143b6b]/40">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-xs bg-[#0284c7]"></span>
                  <span class="text-slate-200 font-medium">工业用水</span>
                </div>
                <div class="flex items-center gap-2 font-mono">
                  <span class="text-slate-300">19,490万m³</span>
                  <span class="font-bold text-sky-300">31.78%</span>
                </div>
              </div>

              <div class="flex items-center justify-between pb-1 border-b border-[#143b6b]/40">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-xs bg-[#38bdf8]"></span>
                  <span class="text-slate-200 font-medium">城镇公共</span>
                </div>
                <div class="flex items-center gap-2 font-mono">
                  <span class="text-slate-300">7,574万m³</span>
                  <span class="font-bold text-sky-200">12.35%</span>
                </div>
              </div>

              <div class="flex items-center justify-between pb-1 border-b border-[#143b6b]/40">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-xs bg-[#60a5fa]"></span>
                  <span class="text-slate-200 font-medium">居民生活</span>
                </div>
                <div class="flex items-center gap-2 font-mono">
                  <span class="text-slate-300">4,305万m³</span>
                  <span class="font-bold text-blue-200">7.02%</span>
                </div>
              </div>

              <div class="flex items-center justify-between pb-1 border-b border-[#143b6b]/40">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-xs bg-[#818cf8]"></span>
                  <span class="text-slate-200 font-medium">生态环境</span>
                </div>
                <div class="flex items-center gap-2 font-mono">
                  <span class="text-slate-300">4,201万m³</span>
                  <span class="font-bold text-indigo-200">6.85%</span>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-xs bg-[#94a3b8]"></span>
                  <span class="text-slate-200 font-medium">其他用水</span>
                </div>
                <div class="flex items-center gap-2 font-mono">
                  <span class="text-slate-300">2,085万m³</span>
                  <span class="font-bold text-slate-300">3.40%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </template>

        <!-- B. 专项业务应用场景 (左侧模块 1: 计量设施总体情况 & 模块 2: 重点取水户概况 - 紧凑合理布局，消除空白) -->
        <template v-else>
          <!-- ================= 专项 Card 1: 计量设施总体情况 ================= -->
          <div class="bg-[#081b36]/90 backdrop-blur-md rounded-xl border border-[#143b6b] p-3.5 shadow-xl flex-1 flex flex-col gap-2">
            <!-- Card Header -->
            <div class="flex items-center justify-between pb-2 border-b border-[#143b6b]/80 shrink-0">
              <div class="flex items-center gap-2">
                <span class="w-1.5 h-4 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
                <h2 class="text-sm 2xl:text-base font-bold text-white tracking-wide">计量设施总体情况</h2>
              </div>
              <div class="flex items-center gap-1.5 text-xs text-cyan-300 font-mono">
                <span class="text-slate-400 font-sans">全域在线率:</span>
                <span class="font-bold text-cyan-300 font-mono">{{ meterDeviceOverview.onlineRate }}</span>
                <span class="text-[10px] text-cyan-400/80 bg-cyan-950/40 px-1 py-0.2 rounded border border-cyan-500/20 font-sans">运行良好</span>
              </div>
            </div>

            <!-- 5 Status Badges: 设备总数、在线、离线、故障、待检定数量 -->
            <div class="grid grid-cols-5 gap-1.5 shrink-0">
              <!-- 总数 -->
              <div class="bg-[#0b2447] border border-[#1b4372] rounded-lg p-2 text-center">
                <span class="text-[10px] text-slate-400 block font-medium">设备总数</span>
                <span class="text-base 2xl:text-lg font-bold font-mono text-white mt-0.5 block">{{ meterDeviceOverview.total }}</span>
                <span class="text-[9px] text-slate-400 block">全网纳管</span>
              </div>
              <!-- 在线 (水蓝稳定态) -->
              <div class="bg-cyan-950/30 border border-cyan-500/35 rounded-lg p-2 text-center">
                <span class="text-[10px] text-cyan-300 block font-medium">在线运行</span>
                <span class="text-base 2xl:text-lg font-bold font-mono text-cyan-300 mt-0.5 block">{{ meterDeviceOverview.online }}</span>
                <span class="text-[9px] text-cyan-300/80 block">实时传输</span>
              </div>
              <!-- 离线 (中性灰) -->
              <div class="bg-slate-800/40 border border-slate-600/35 rounded-lg p-2 text-center">
                <span class="text-[10px] text-slate-300 block font-medium">离线脱网</span>
                <span class="text-base 2xl:text-lg font-bold font-mono text-slate-300 mt-0.5 block">{{ meterDeviceOverview.offline }}</span>
                <span class="text-[9px] text-slate-400 block">信号弱/断电</span>
              </div>
              <!-- 故障 (警示红) -->
              <div class="bg-rose-950/25 border border-rose-500/35 rounded-lg p-2 text-center">
                <span class="text-[10px] text-rose-300 block font-medium">故障异常</span>
                <span class="text-base 2xl:text-lg font-bold font-mono text-rose-400 mt-0.5 block">{{ meterDeviceOverview.fault }}</span>
                <span class="text-[9px] text-rose-300/80 block">需抢修</span>
              </div>
              <!-- 待检定 (告警橙) -->
              <div class="bg-amber-950/25 border border-amber-500/35 rounded-lg p-2 text-center">
                <span class="text-[10px] text-amber-300 block font-medium">待检定</span>
                <span class="text-base 2xl:text-lg font-bold font-mono text-amber-400 mt-0.5 block">{{ meterDeviceOverview.pending }}</span>
                <span class="text-[9px] text-amber-300/80 block">周期到期</span>
              </div>
            </div>

            <!-- 区域计量设施在线分析与分布列表 (紧凑合理布局，消除空白) -->
            <div class="flex-1 flex flex-col gap-1.5 min-h-0">
              <div class="flex items-center justify-between text-xs font-semibold text-slate-300 shrink-0">
                <span class="flex items-center gap-1">
                  <span class="text-cyan-400 font-bold">|</span>
                  <span>区域计量设施在线分析</span>
                </span>
                <span class="text-[11px] text-cyan-300 font-normal">7区县全域接入</span>
              </div>

              <div class="space-y-1.5 text-xs flex-1 overflow-y-auto custom-dark-scrollbar pr-0.5">
                <div
                  v-for="d in districtDeviceStats"
                  :key="'dev-' + d.district"
                  class="flex items-center justify-between p-1.5 rounded-lg bg-[#091f3d]/60 border border-[#163b66]/60 hover:bg-[#0d2a52] transition cursor-pointer"
                  @click="filterParams.district = d.district"
                >
                  <!-- 区县名称 -->
                  <div class="w-16 font-medium text-white flex items-center gap-1.5 shrink-0">
                    <span class="w-1.5 h-1.5 rounded-full" :class="d.rate >= 90 ? 'bg-cyan-400' : 'bg-amber-400'"></span>
                    <span>{{ d.district }}</span>
                  </div>

                  <!-- 进度条与数量 -->
                  <div class="flex-1 mx-3">
                    <div class="flex justify-between text-[10px] text-slate-400 mb-0.5">
                      <span>总 {{ d.total }} 台 · 在线 {{ d.online }}</span>
                      <span :class="d.fault > 0 ? 'text-rose-400' : 'text-slate-400'">
                        {{ d.fault > 0 ? `故障 ${d.fault}台` : '无故障' }}
                        {{ d.pending > 0 ? `· 待检 ${d.pending}` : '' }}
                      </span>
                    </div>
                    <div class="h-1.5 w-full bg-slate-700/60 rounded-full overflow-hidden flex">
                      <div class="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-300" :style="{ width: `${d.rate}%` }"></div>
                    </div>
                  </div>

                  <!-- 在线率 -->
                  <div class="w-12 text-right font-mono font-bold text-xs shrink-0" :class="d.rate >= 90 ? 'text-cyan-300' : 'text-amber-300'">
                    {{ d.rate }}%
                  </div>
                </div>
              </div>

              <!-- 设施运行与在线度简报底栏 -->
              <div class="pt-1.5 border-t border-[#143b6b]/60 flex items-center justify-between text-[10px] text-slate-400 shrink-0">
                <span>设施健康度评定：<span class="text-cyan-300 font-bold">优良 (98.2分)</span></span>
                <span>巡检消缺：<span class="text-slate-200">月度全域覆盖</span></span>
              </div>
            </div>
          </div>

          <!-- ================= 专项 Card 2: 重点取水户概况 ================= -->
          <div class="bg-[#081b36]/90 backdrop-blur-md rounded-xl border border-[#143b6b] p-3.5 shadow-xl flex-1 flex flex-col gap-2">
            <!-- Card Header -->
            <div class="flex items-center justify-between pb-2 border-b border-[#143b6b]/80 shrink-0">
              <div class="flex items-center gap-2">
                <span class="w-1.5 h-4 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
                <h2 class="text-sm 2xl:text-base font-bold text-white tracking-wide">重点取水户概况</h2>
              </div>
              <div class="text-xs text-cyan-300 font-mono">
                纳管率: <span class="font-bold text-cyan-300">100%</span>
                <span class="text-slate-400 ml-1 font-sans">重点监控 58 家</span>
              </div>
            </div>

            <!-- 4大核心统计参数: 重点取水户数量、年许可水量总量、今日累计取水量、今日告警次数 -->
            <div class="grid grid-cols-4 gap-2 shrink-0">
              <!-- 1. 重点取水户数量 -->
              <div class="bg-[#0b2447] border border-[#1b4372] rounded-lg p-2 text-center">
                <span class="text-[10px] text-slate-300 block font-medium">重点取水户</span>
                <div class="flex items-baseline justify-center gap-0.5 mt-0.5">
                  <span class="text-xl font-bold font-mono text-cyan-300">{{ majorUserStats.totalCount }}</span>
                  <span class="text-[10px] text-slate-400 font-sans">家</span>
                </div>
                <span class="text-[9px] text-slate-400 block mt-0.5">规上重点监造</span>
              </div>

              <!-- 2. 年许可水量总量 -->
              <div class="bg-[#0b2447] border border-[#1b4372] rounded-lg p-2 text-center">
                <span class="text-[10px] text-slate-300 block font-medium">年许可总量</span>
                <div class="flex items-baseline justify-center gap-0.5 mt-0.5">
                  <span class="text-xl font-bold font-mono text-blue-300">{{ (majorUserStats.annualLicensedQuota / 10000).toFixed(2) }}</span>
                  <span class="text-[10px] text-slate-400 font-sans">亿m³</span>
                </div>
                <span class="text-[9px] text-slate-400 block mt-0.5">占全域 71.8%</span>
              </div>

              <!-- 3. 今日累计取水量 -->
              <div class="bg-[#0b2447] border border-[#1b4372] rounded-lg p-2 text-center">
                <span class="text-[10px] text-slate-300 block font-medium">今日累计取水</span>
                <div class="flex items-baseline justify-center gap-0.5 mt-0.5">
                  <span class="text-xl font-bold font-mono text-cyan-300">{{ majorUserStats.todayAccumulatedWater }}</span>
                  <span class="text-[10px] text-slate-400 font-sans">万m³</span>
                </div>
                <span class="text-[9px] text-slate-400 block mt-0.5">较昨日 -1.2%</span>
              </div>

              <!-- 4. 今日告警次数 -->
              <div class="bg-rose-950/20 border border-rose-500/30 rounded-lg p-2 text-center">
                <span class="text-[10px] text-rose-300 block font-medium">今日告警次数</span>
                <div class="flex items-baseline justify-center gap-0.5 mt-0.5">
                  <span class="text-xl font-bold font-mono text-rose-400">{{ majorUserStats.todayAlertCount }}</span>
                  <span class="text-[10px] text-slate-400 font-sans">次</span>
                </div>
                <span class="text-[9px] text-rose-300/80 block mt-0.5">高危预警 2次</span>
              </div>
            </div>

            <!-- 取水量排名列表 (合理布局，去除中间空白与产品类型标签) -->
            <div class="flex-1 flex flex-col gap-1.5 min-h-0">
              <div class="flex items-center justify-between text-xs font-semibold text-slate-300 shrink-0">
                <span class="flex items-center gap-1">
                  <span class="text-cyan-400 font-bold">|</span>
                  <span>重点取水户取水量排名 (Top 5)</span>
                </span>
                <span class="text-[10px] text-slate-400 font-normal">年许可执行进度比</span>
              </div>

              <div class="space-y-1.5 text-xs flex-1 overflow-y-auto custom-dark-scrollbar pr-0.5">
                <div
                  v-for="(user, idx) in majorUserRankings"
                  :key="user.id"
                  class="p-2 rounded-lg bg-[#091f3d]/60 border border-[#163b66]/60 hover:bg-[#0d2a52] transition flex flex-col gap-1.5 cursor-pointer"
                  @click="navigate('enterprise_dossier')"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2 min-w-0">
                      <span
                        class="w-4 h-4 rounded-full flex items-center justify-center font-mono font-bold text-[10px] shrink-0"
                        :class="idx === 0 ? 'bg-amber-400 text-amber-950' : idx === 1 ? 'bg-slate-300 text-slate-900' : idx === 2 ? 'bg-amber-700 text-white' : 'bg-slate-700 text-slate-300'"
                      >
                        {{ idx + 1 }}
                      </span>
                      <span class="font-medium text-white truncate max-w-[210px] 2xl:max-w-[250px]" :title="user.name">{{ user.name }}</span>
                    </div>

                    <div class="flex items-center gap-2.5 font-mono shrink-0">
                      <span class="text-slate-300 text-[11px]">今日 {{ user.todayWater }}m³</span>
                      <span
                        class="text-xs font-bold"
                        :class="user.progressRate >= 90 ? 'text-rose-400' : user.progressRate >= 80 ? 'text-amber-400' : 'text-cyan-300'"
                      >
                        {{ user.progressRate }}%
                      </span>
                    </div>
                  </div>

                  <!-- 年度取水进度条与配额使用情况 -->
                  <div class="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                    <div class="flex-1 h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                      <div
                        class="h-full rounded-full transition-all duration-300"
                        :class="user.progressRate >= 90 ? 'bg-gradient-to-r from-amber-500 to-rose-500' : user.progressRate >= 80 ? 'bg-gradient-to-r from-cyan-500 to-amber-400' : 'bg-gradient-to-r from-cyan-500 to-blue-500'"
                        :style="{ width: `${user.progressRate}%` }"
                      ></div>
                    </div>
                    <span class="shrink-0 text-[10px] text-slate-400">已累取 {{ user.annualAccumulated }} / 许可 {{ user.annualLicensed }}万m³</span>
                  </div>
                </div>
              </div>

              <!-- 重点户监管底栏 -->
              <div class="pt-1.5 border-t border-[#143b6b]/60 flex items-center justify-between text-[10px] text-slate-400 shrink-0">
                <span>重点户纳管覆盖：<span class="text-cyan-300 font-bold">100% 实时遥测</span></span>
                <span>超许可预警：<span class="text-slate-200">进度达 80% 触发预警</span></span>
              </div>
            </div>
          </div>
        </template>

      </aside>

      <!-- ================= Central Column: Top 6-Metrics KPI Banner & Unblocked Map Overlay ================= -->
      <div class="flex-1 min-w-0 pointer-events-none relative flex flex-col justify-between items-center pt-2.5 pb-3 z-30 h-full">
        <!-- 6 Metrics Banner (Above Map) with clear larger readable fonts -->
        <div class="w-full max-w-5xl px-3 pointer-events-auto">
          <div class="relative bg-[#091b36]/92 backdrop-blur-md rounded-xl border border-[#1b4372] shadow-[0_4px_25px_rgba(0,0,0,0.5)] overflow-hidden">
            <!-- Top cyan decorative glow line -->
            <div class="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent"></div>
            
            <!-- 6 Columns Grid with Dividers -->
            <div class="grid grid-cols-6 divide-x divide-[#163866]/80 py-3 px-1">
              <div
                v-for="item in topMapMetrics"
                :key="item.title"
                class="flex flex-col items-center justify-center px-2 py-1 text-center hover:bg-white/5 transition-colors cursor-pointer group"
                @click="item.action()"
              >
                <!-- Title -->
                <span class="text-xs 2xl:text-sm font-semibold text-slate-200 tracking-wide group-hover:text-cyan-300 transition-colors">
                  {{ item.title }}
                </span>
                
                <!-- Main Value -->
                <div class="my-1 flex items-baseline justify-center gap-1 font-mono">
                  <span class="text-2xl lg:text-3xl font-bold text-white tracking-tight drop-shadow-sm group-hover:text-cyan-400 transition-colors">
                    {{ item.value }}
                  </span>
                  <span class="text-xs text-slate-300 font-sans font-medium">
                    {{ item.unit }}
                  </span>
                </div>

                <!-- Subtitle / Status badge -->
                <div class="text-xs font-medium flex items-center justify-center gap-1.5 mt-0.5" :class="item.subClass">
                  <span v-if="item.iconType === 'warning'" class="inline-flex items-center text-amber-400">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </span>
                  <span v-else-if="item.iconType === 'red-dot'" class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                  </span>
                  <span>{{ item.subText }}</span>
                </div>
              </div>
            </div>

            <!-- Bottom subtle border line -->
            <div class="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
          </div>
        </div>

        <!-- ================= 行政区划全局统一搜索 (地图左上角，顶部对齐地图图层，整体下移至 top-28，支持收起/展开) ================= -->
        <div class="absolute top-28 left-4 pointer-events-auto z-30 transition-all duration-300">
          <!-- 1. 收起状态：紧凑胶囊入口 -->
          <div
            v-if="isDistrictPanelCollapsed"
            class="bg-[#091b36]/95 backdrop-blur-md rounded-xl border border-[#1b4372] px-3 py-2 shadow-2xl flex items-center gap-2 cursor-pointer hover:border-cyan-400/80 hover:bg-[#0c2447] transition group"
            @click="isDistrictPanelCollapsed = false"
            title="点击展开行政区划与全局搜索"
          >
            <span class="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#00e5ff]"></span>
            <span class="text-xs font-bold text-white tracking-wide">行政区划</span>
            <span
              class="text-[10px] px-1.5 py-0.5 rounded-full border font-mono font-medium"
              :class="filterParams.district === '西宁市'
                ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400/40'
                : 'bg-blue-500/25 text-blue-200 border-blue-400/50 font-bold'"
            >
              {{ filterParams.district === '西宁市' ? '全市视角' : filterParams.district }}
            </span>
            <span class="text-[11px] text-cyan-400 group-hover:text-cyan-200 transition ml-0.5 flex items-center gap-0.5 font-medium">
              <span>展开</span>
              <svg class="w-3.5 h-3.5 transition group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18l6-6-6-6"></path>
              </svg>
            </span>
          </div>

          <!-- 2. 展开状态：完整行政区划与全局搜索卡片 -->
          <div
            v-else
            class="w-72 2xl:w-80 bg-[#091b36]/95 backdrop-blur-md rounded-xl border border-[#1b4372] p-2.5 shadow-2xl transition-all"
          >
            <!-- Header: Title, Selected District Badge & 收起/重置操作 -->
            <div class="flex items-center justify-between pb-2 mb-2 border-b border-[#1b4372]/80">
              <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00e5ff]"></span>
                <span class="text-xs font-bold text-white tracking-wide">行政区划 · 全局搜索</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span
                  class="text-[10px] font-medium px-1.5 py-0.5 rounded-full border transition"
                  :class="filterParams.district === '西宁市'
                    ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400/40'
                    : 'bg-blue-500/25 text-blue-200 border-blue-400/50 font-bold'"
                >
                  {{ filterParams.district === '西宁市' ? '全市视角' : filterParams.district }}
                </span>
                <button
                  v-if="filterParams.district !== '西宁市'"
                  type="button"
                  @click="resetMapView"
                  class="text-[10px] text-cyan-400 hover:text-cyan-200 transition cursor-pointer p-0.5"
                  title="重置为全域西宁"
                >
                  重置
                </button>
                <button
                  type="button"
                  @click="isDistrictPanelCollapsed = true"
                  class="flex items-center gap-0.5 text-[10px] text-slate-400 hover:text-cyan-300 transition cursor-pointer px-1 py-0.5 rounded hover:bg-white/10 ml-0.5"
                  title="收起行政区划"
                >
                  <span>收起</span>
                  <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 18l-6-6 6-6"></path>
                  </svg>
                </button>
              </div>
            </div>

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
          <div class="flex flex-col bg-[#091b36]/95 backdrop-blur-md border border-[#1b4372] rounded-xl p-2 shadow-2xl text-xs w-[132px] 2xl:w-[142px]">
            <!-- Header with Compass & reset button -->
            <div class="px-1 py-0.5 flex items-center justify-between border-b border-[#1b4372]/70 mb-1.5">
              <div class="flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#00e5ff]"></span>
                <span class="text-[11px] font-bold text-slate-200 tracking-wide">地图图层</span>
              </div>
              <div class="flex items-center gap-1">
                <!-- Compass (指北针徽标) -->
                <button
                  type="button"
                  class="w-5 h-5 rounded-full border border-cyan-400/50 bg-[#071932] flex items-center justify-center cursor-pointer hover:border-cyan-300 hover:bg-cyan-500/20 transition shadow-sm"
                  title="正北方向·点击重置全域视角"
                  @click="resetMapView"
                >
                  <span class="text-[9px] font-bold text-cyan-400 font-mono leading-none">N</span>
                </button>
                <button
                  type="button"
                  class="text-slate-400 hover:text-cyan-300 transition cursor-pointer p-0.5 rounded hover:bg-white/5"
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
              <!-- 1. 水量使用情况图层 (4个等级颜色标记各区域) -->
              <button
                type="button"
                class="w-full px-2 py-1.5 rounded-lg transition-all flex items-center justify-between cursor-pointer mb-1 border"
                :class="activeLayers.waterUsage
                  ? 'bg-cyan-500/25 text-cyan-200 border-cyan-400/50 shadow-[0_0_8px_rgba(6,182,212,0.25)] font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5 border-transparent'"
                @click="activeLayers.waterUsage = !activeLayers.waterUsage"
                title="按水量使用情况4个等级（>100万方、>70万方、>50万方、<50万方）色块标记各区域"
              >
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-xs bg-gradient-to-br from-blue-500 via-cyan-400 to-emerald-400 shadow-[0_0_6px_#00e5ff]"></span>
                  <span>水量使用</span>
                </div>
                <span
                  class="text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold"
                  :class="activeLayers.waterUsage ? 'bg-cyan-400/20 text-cyan-200' : 'bg-white/10 text-slate-400'"
                >
                  4等级
                </span>
              </button>

              <!-- 2. 水系水网图层 -->
              <button
                type="button"
                class="w-full px-2 py-1.5 rounded-lg transition-all flex items-center justify-between cursor-pointer mb-1 border"
                :class="activeLayers.rivers
                  ? 'bg-sky-500/25 text-sky-200 border-sky-400/50 shadow-[0_0_8px_rgba(56,189,248,0.25)] font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5 border-transparent'"
                @click="activeLayers.rivers = !activeLayers.rivers"
                title="展示湟水河及其干支流水系脉络"
              >
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                  <span>水系脉络</span>
                </div>
                <span
                  class="text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold"
                  :class="activeLayers.rivers ? 'bg-sky-400/20 text-sky-200' : 'bg-white/10 text-slate-400'"
                >
                  流域
                </span>
              </button>

              <!-- 3. 行政区划图层 -->
              <button
                type="button"
                class="w-full px-2 py-1.5 rounded-lg transition-all flex items-center justify-between cursor-pointer border"
                :class="activeLayers.boundaries
                  ? 'bg-indigo-500/25 text-indigo-200 border-indigo-400/50 shadow-[0_0_8px_rgba(99,102,241,0.25)] font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5 border-transparent'"
                @click="activeLayers.boundaries = !activeLayers.boundaries"
                title="展示全域7区县行政边界与注记"
              >
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-xs bg-indigo-400"></span>
                  <span>行政区划</span>
                </div>
                <span
                  class="text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold"
                  :class="activeLayers.boundaries ? 'bg-indigo-400/20 text-indigo-200' : 'bg-white/10 text-slate-400'"
                >
                  7区县
                </span>
              </button>

              <!-- 4. 直报超计划预警图层 (直报 > 计划 红色边缘标记) -->
              <button
                type="button"
                class="w-full px-2 py-1.5 rounded-lg transition-all flex items-center justify-between cursor-pointer border mt-1"
                :class="activeLayers.quotaWarning
                  ? 'bg-rose-500/25 text-rose-200 border-rose-400/50 shadow-[0_0_8px_rgba(244,63,94,0.25)] font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5 border-transparent'"
                @click="activeLayers.quotaWarning = !activeLayers.quotaWarning"
                title="直报水量大于计划水量时，行政区划边缘用红色显著标记"
              >
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-xs bg-rose-500 shadow-[0_0_6px_#ef4444]"></span>
                  <span>超计划红边</span>
                </div>
                <span
                  class="text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold"
                  :class="activeLayers.quotaWarning ? 'bg-rose-400/20 text-rose-200' : 'bg-white/10 text-slate-400'"
                >
                  {{ exceededDistrictsList.length }}超额
                </span>
              </button>
            </template>

            <!-- B. 专项业务应用场景图层 (计量点 / 用水户 / 预警事件) -->
            <template v-else>
              <!-- 1. 计量点图层 (纵向行) -->
              <button
                type="button"
                class="w-full px-2 py-1.5 rounded-lg transition-all flex items-center justify-between cursor-pointer mb-1 border"
                :class="activeLayers.meters
                  ? 'bg-cyan-500/25 text-cyan-200 border-cyan-400/50 shadow-[0_0_8px_rgba(6,182,212,0.25)] font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5 border-transparent'"
                @click="toggleMeterLayer"
                title="展示西宁全域计量点分布与运行状态"
              >
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00e5ff]"></span>
                  <span>计量点</span>
                </div>
                <span
                  class="text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold"
                  :class="activeLayers.meters ? 'bg-cyan-400/20 text-cyan-200' : 'bg-white/10 text-slate-400'"
                >
                  {{ meterStats.total }}
                </span>
              </button>

              <!-- 2. 用水户图层 (纵向行) -->
              <button
                type="button"
                class="w-full px-2 py-1.5 rounded-lg transition-all flex items-center justify-between cursor-pointer mb-1 border"
                :class="activeLayers.users
                  ? 'bg-blue-500/25 text-blue-200 border-blue-400/50 shadow-[0_0_8px_rgba(59,130,246,0.25)] font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5 border-transparent'"
                @click="activeLayers.users = !activeLayers.users"
                title="展示重点规上工业 / 现代化灌区 / 自来水厂分布"
              >
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-xs bg-blue-400"></span>
                  <span>用水户</span>
                </div>
                <span
                  class="text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold"
                  :class="activeLayers.users ? 'bg-blue-400/20 text-blue-200' : 'bg-white/10 text-slate-400'"
                >
                  {{ waterUsersList.length }}
                </span>
              </button>

              <!-- 3. 预警事件图层 (纵向行) -->
              <button
                type="button"
                class="w-full px-2 py-1.5 rounded-lg transition-all flex items-center justify-between cursor-pointer border"
                :class="activeLayers.warnings
                  ? 'bg-rose-500/25 text-rose-200 border-rose-400/50 shadow-[0_0_8px_rgba(244,63,94,0.25)] font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5 border-transparent'"
                @click="activeLayers.warnings = !activeLayers.warnings"
                title="展示超许可预警 / 设备离线等告警点位"
              >
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-rose-400 animate-pulse"></span>
                  <span>预警事件</span>
                </div>
                <span
                  class="text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold"
                  :class="activeLayers.warnings ? 'bg-rose-400/20 text-rose-200' : 'bg-white/10 text-slate-400'"
                >
                  {{ warningEventsList.length }}
                </span>
              </button>
            </template>
          </div>
        </div>

        <!-- ================= Fully Visible Map Legend (Bottom-Left of Center Area) ================= -->
        <div class="absolute bottom-14 left-4 pointer-events-auto z-30">
          <div class="bg-[#091b36]/95 backdrop-blur-md rounded-xl border border-[#1b4372] p-3 shadow-2xl transition-all duration-200 min-w-[310px] max-w-[360px]">
            <!-- Legend Header -->
            <div class="flex items-center justify-between gap-3 pb-1.5 border-b border-[#1b4372]/80">
              <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00e5ff]"></span>
                <span class="text-xs font-bold text-white tracking-wide">
                  {{ scenarioMode === 'comprehensive' ? '水量使用情况图例' : '西宁全域监控图例' }}
                </span>
              </div>
              <div class="flex items-center gap-2">
                <span v-if="scenarioMode === 'comprehensive'" class="text-[10px] text-cyan-300 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-500/30">
                  4个等级划分
                </span>
                <span v-else-if="activeLayers.meters" class="text-[10px] text-cyan-300 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-500/30">
                  计量点模式
                </span>
                <button
                  type="button"
                  class="text-[11px] text-cyan-400 hover:text-cyan-300 transition cursor-pointer"
                  @click="showMapLegend = !showMapLegend"
                >
                  {{ showMapLegend ? '收起' : '展开' }}
                </button>
              </div>
            </div>

            <!-- Legend Body (Unblocked and clean) -->
            <div v-if="showMapLegend" class="mt-2 space-y-2 text-xs">
              
              <!-- A. 综合应用场景图例：水量使用情况 4个等级图例 (大于100万方、大于70万方、大于50万方、小于50万方) -->
              <template v-if="scenarioMode === 'comprehensive'">
                <div class="space-y-1.5">
                  <div
                    v-for="tier in waterUsageTiers"
                    :key="tier.id"
                    class="p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-between"
                    :class="selectedUsageTierFilter === tier.id
                      ? 'bg-cyan-500/20 border-cyan-400/80 shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                      : 'bg-[#07172f]/80 border-[#143b6b]/70 hover:bg-[#0c2447] hover:border-cyan-500/40'"
                    @click="selectedUsageTierFilter = selectedUsageTierFilter === tier.id ? null : tier.id"
                  >
                    <div class="flex items-center gap-2.5">
                      <!-- 颜色标识块 -->
                      <span
                        class="w-4 h-4 rounded-sm flex items-center justify-center border shadow-xs shrink-0"
                        :style="{ backgroundColor: tier.color, borderColor: tier.strokeColor }"
                      >
                        <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
                      </span>

                      <div>
                        <div class="flex items-center gap-1.5">
                          <span class="text-xs font-bold text-white">{{ tier.label }}</span>
                          <span class="text-[10px] font-mono text-cyan-300/80">({{ tier.range }})</span>
                        </div>
                        <div class="text-[10px] text-slate-300 mt-0.5">
                          {{ tier.districts.map(d => `${d} ${getDistrictUsage(d)}万m³`).join('、') }}
                        </div>
                      </div>
                    </div>

                    <div class="text-right shrink-0 ml-2">
                      <span
                        class="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold"
                        :style="{
                          backgroundColor: tier.color + '33',
                          color: tier.strokeColor,
                          border: '1px solid ' + tier.strokeColor + '66'
                        }"
                      >
                        {{ tier.districts.length }}个区县
                      </span>
                    </div>
                  </div>

                  <!-- 5. 直报水量超计划红色边缘标记图例项 -->
                  <div
                    class="p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-between"
                    :class="selectedUsageTierFilter === 'exceeded'
                      ? 'bg-rose-500/25 border-rose-400 shadow-[0_0_10px_rgba(239,68,68,0.4)]'
                      : 'bg-[#07172f]/80 border-rose-500/40 hover:bg-[#1f1022] hover:border-rose-400/80'"
                    @click="selectedUsageTierFilter = selectedUsageTierFilter === 'exceeded' ? null : 'exceeded'"
                    title="点击高亮所有直报水量大于计划水量的区县"
                  >
                    <div class="flex items-center gap-2.5">
                      <!-- 红色低饱和警示线方块 -->
                      <span class="w-4 h-4 rounded-sm flex items-center justify-center border-2 border-rose-400/80 bg-rose-950/60 shadow-[0_0_6px_rgba(248,113,113,0.5)] shrink-0">
                        <span class="w-1.5 h-1.5 rounded-full bg-rose-300"></span>
                      </span>

                      <div>
                        <div class="flex items-center gap-1.5">
                          <span class="text-xs font-bold text-rose-200">直报超计划 (低饱和红边)</span>
                          <span class="text-[10px] font-mono text-rose-300/90 font-medium">直报 > 计划</span>
                        </div>
                        <div class="text-[10px] text-slate-300 mt-0.5">
                          {{ exceededDistrictsList.map(d => `${d.name}超${(d.reported - d.planned).toFixed(1)}万m³`).join('、') }}
                        </div>
                      </div>
                    </div>

                    <div class="text-right shrink-0 ml-2">
                      <span class="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/50">
                        {{ exceededDistrictsList.length }}个超额区县
                      </span>
                    </div>
                  </div>
                </div>

                <!-- 综合底栏说明与微调测试入口 -->
                <div class="pt-2 border-t border-[#1b4372]/50 flex items-center justify-between text-slate-300 text-[10px]">
                  <div class="flex items-center gap-2">
                    <span class="text-slate-400">点击等级项可高亮区县</span>
                    <button
                      v-if="selectedUsageTierFilter"
                      type="button"
                      class="text-cyan-400 hover:underline cursor-pointer"
                      @click.stop="selectedUsageTierFilter = null"
                    >
                      重置筛选
                    </button>
                  </div>
                  <button
                    type="button"
                    class="px-2 py-0.5 rounded bg-cyan-950/70 hover:bg-cyan-900/80 text-cyan-300 border border-cyan-500/40 cursor-pointer font-medium transition flex items-center gap-1"
                    @click.stop="showWaterQuotaModal = true"
                  >
                    <span>水量比对管控</span>
                    <span class="w-1.5 h-1.5 rounded-full bg-rose-400" v-if="exceededDistrictsList.length"></span>
                  </button>
                </div>
              </template>

              <!-- B. 专项业务应用场景图例：计量点 / 用水户 / 预警事件 -->
              <template v-else>
                <!-- 核心图例模块 1: 点击计量点图层时，展示图例颜色区分状态 (正常/故障/待检定) -->
                <div v-if="activeLayers.meters" class="bg-[#07172f]/80 p-2.5 rounded-lg border border-cyan-500/30">
                  <div class="flex items-center justify-between text-[11px] font-bold text-white mb-2">
                    <div class="flex items-center gap-1.5">
                      <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
                      <span>计量点运行状态 (共 {{ meterStats.total }} 处)</span>
                    </div>
                    <span class="text-[10px] text-slate-400 font-normal">点击快速筛选</span>
                  </div>

                  <!-- 快速筛选状态按钮组 -->
                  <div class="grid grid-cols-4 gap-1 mb-2 text-[10px]">
                    <button
                      type="button"
                      class="py-1 rounded text-center transition cursor-pointer border"
                      :class="meterStatusFilter === 'all'
                        ? 'bg-cyan-500/25 text-cyan-200 border-cyan-400/60 font-bold'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'"
                      @click="meterStatusFilter = 'all'"
                    >
                      全部 {{ meterStats.total }}
                    </button>
                    <button
                      type="button"
                      class="py-1 rounded text-center transition cursor-pointer border"
                      :class="meterStatusFilter === 'normal'
                        ? 'bg-emerald-500/25 text-emerald-200 border-emerald-400/60 font-bold'
                        : 'bg-white/5 text-emerald-300/80 border-white/10 hover:bg-white/10'"
                      @click="meterStatusFilter = meterStatusFilter === 'normal' ? 'all' : 'normal'"
                    >
                      正常 {{ meterStats.normal }}
                    </button>
                    <button
                      type="button"
                      class="py-1 rounded text-center transition cursor-pointer border"
                      :class="meterStatusFilter === 'fault'
                        ? 'bg-rose-500/25 text-rose-200 border-rose-400/60 font-bold'
                        : 'bg-white/5 text-rose-300/80 border-white/10 hover:bg-white/10'"
                      @click="meterStatusFilter = meterStatusFilter === 'fault' ? 'all' : 'fault'"
                    >
                      故障 {{ meterStats.fault }}
                    </button>
                    <button
                      type="button"
                      class="py-1 rounded text-center transition cursor-pointer border"
                      :class="meterStatusFilter === 'pending'
                        ? 'bg-amber-500/25 text-amber-200 border-amber-400/60 font-bold'
                        : 'bg-white/5 text-amber-300/80 border-white/10 hover:bg-white/10'"
                      @click="meterStatusFilter = meterStatusFilter === 'pending' ? 'all' : 'pending'"
                    >
                      待检 {{ meterStats.pending }}
                    </button>
                  </div>

                  <!-- 颜色图例清单 (区分正常、故障、待检定) -->
                  <div class="space-y-1.5 text-[11px]">
                    <!-- 正常 (Normal - 绿色) -->
                    <div
                      class="flex items-center justify-between p-1 rounded transition cursor-pointer hover:bg-white/5"
                      @click="meterStatusFilter = meterStatusFilter === 'normal' ? 'all' : 'normal'"
                    >
                      <div class="flex items-center gap-2">
                        <span class="w-3 h-3 rounded-full bg-[#10b981] border border-white shadow-[0_0_6px_#10b981] flex items-center justify-center">
                          <span class="w-1 h-1 rounded-full bg-white"></span>
                        </span>
                        <span class="text-emerald-300 font-semibold">正常状态</span>
                      </div>
                      <span class="text-slate-300 text-[10px]">实时在线·数据平稳 ({{ meterStats.normal }}个)</span>
                    </div>

                    <!-- 故障 (Fault - 红色) -->
                    <div
                      class="flex items-center justify-between p-1 rounded transition cursor-pointer hover:bg-white/5"
                      @click="meterStatusFilter = meterStatusFilter === 'fault' ? 'all' : 'fault'"
                    >
                      <div class="flex items-center gap-2">
                        <span class="w-3 h-3 rounded-full bg-[#ef4444] border border-white shadow-[0_0_6px_#ef4444] animate-pulse flex items-center justify-center">
                          <span class="text-[8px] text-white font-black leading-none">!</span>
                        </span>
                        <span class="text-rose-300 font-semibold">故障状态</span>
                      </div>
                      <span class="text-slate-300 text-[10px]">设备离线·通信异常 ({{ meterStats.fault }}个)</span>
                    </div>

                    <!-- 待检定 (Pending - 橙黄色) -->
                    <div
                      class="flex items-center justify-between p-1 rounded transition cursor-pointer hover:bg-white/5"
                      @click="meterStatusFilter = meterStatusFilter === 'pending' ? 'all' : 'pending'"
                    >
                      <div class="flex items-center gap-2">
                        <span class="w-3 h-3 rounded-full bg-[#f59e0b] border border-dashed border-white shadow-[0_0_6px_#f59e0b] flex items-center justify-center">
                          <span class="w-1 h-1 rounded-full bg-amber-900"></span>
                        </span>
                        <span class="text-amber-300 font-semibold">待检定状态</span>
                      </div>
                      <span class="text-slate-300 text-[10px]">周期届满·待现场定检 ({{ meterStats.pending }}个)</span>
                    </div>
                  </div>
                </div>

                <!-- 模块 2: 用水户图例 (当用水户图层开启时) -->
                <div v-if="activeLayers.users" class="pt-1.5 border-t border-[#1b4372]/60">
                  <div class="text-[11px] font-semibold text-slate-300 mb-1">用水户类别 (共 {{ waterUsersList.length }} 户):</div>
                  <div class="grid grid-cols-3 gap-1.5 text-slate-200 text-[11px] font-medium">
                    <div class="flex items-center gap-1.5">
                      <span class="w-2.5 h-2.5 bg-[#38bdf8] rotate-45 border border-white"></span>
                      <span>规上工业</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <span class="w-2.5 h-2.5 rounded-xs bg-[#00e5ff] border border-white"></span>
                      <span>现代化灌区</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <span class="w-2.5 h-2.5 rounded-full bg-[#818cf8] border border-white"></span>
                      <span>自来水厂</span>
                    </div>
                  </div>
                </div>

                <!-- 模块 3: 预警事件图例 (当预警图层开启时) -->
                <div v-if="activeLayers.warnings" class="pt-1.5 border-t border-[#1b4372]/60">
                  <div class="text-[11px] font-semibold text-slate-300 mb-1">预警事件等级:</div>
                  <div class="flex items-center gap-3 text-slate-200 text-[11px] font-medium">
                    <div class="flex items-center gap-1.5">
                      <span class="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                      <span>高风险 (超许可/断线)</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                      <span>中/低风险预警</span>
                    </div>
                  </div>
                </div>

                <!-- 模块 4: 地图底图水系 -->
                <div class="pt-1.5 border-t border-[#1b4372]/50 flex items-center justify-between text-slate-300 text-[10px]">
                  <div class="flex items-center gap-1.5">
                    <span class="w-4 h-1 rounded-full bg-gradient-to-r from-[#0284c7] to-[#38bdf8]"></span>
                    <span>湟水河干流水系</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <span class="w-3 h-2 border border-[#00e5ff] rounded-xs bg-[#00b4d8]/20"></span>
                    <span>西宁4区3县区划</span>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>

        <!-- ================= Bottom Center: Scenario Switcher Tabs (两个切换: 综合应用场景 / 专项业务应用场景) ================= -->
        <div class="absolute bottom-3 inset-x-0 mx-auto w-fit pointer-events-auto z-30">
          <div class="flex items-center bg-[#091b36]/95 backdrop-blur-md border border-[#1b4372] rounded-full p-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.6)] text-xs gap-1.5">
            <!-- 1. 综合应用场景 -->
            <button
              type="button"
              class="px-5 py-2 rounded-full font-bold transition-all duration-200 cursor-pointer flex items-center gap-2"
              :class="scenarioMode === 'comprehensive'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-[0_0_14px_rgba(6,182,212,0.45)] border border-cyan-400/40'
                : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'"
              @click="switchScenarioMode('comprehensive')"
            >
              <svg class="w-4 h-4 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              <span class="tracking-wide text-xs 2xl:text-sm">综合应用场景</span>
            </button>

            <!-- 2. 专项业务应用场景 -->
            <button
              type="button"
              class="px-5 py-2 rounded-full font-bold transition-all duration-200 cursor-pointer flex items-center gap-2"
              :class="scenarioMode === 'special'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-[0_0_14px_rgba(6,182,212,0.45)] border border-cyan-400/40'
                : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'"
              @click="switchScenarioMode('special')"
            >
              <svg class="w-4 h-4 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span class="tracking-wide text-xs 2xl:text-sm">专项业务应用场景</span>
            </button>
          </div>
        </div>

      </div>

      <!-- ================= 4. RIGHT COLUMN (综合应用场景 预警研判 vs 专项业务应用场景 异常处置与对比分析引擎) ================= -->
      <aside class="relative z-10 w-[420px] 2xl:w-[460px] h-full p-2.5 flex flex-col gap-2.5 pointer-events-auto shrink-0 overflow-y-auto custom-dark-scrollbar">
        
        <!-- A. 综合应用场景 (常态化预警监测 & 业务关联研判 & 计量点接入与到报率监控) -->
        <template v-if="scenarioMode === 'comprehensive'">
        <!-- ================= Right Box 1: 常态化预警监测 ================= -->
        <div class="bg-[#081b36]/90 backdrop-blur-md rounded-xl border border-[#143b6b] p-3.5 shadow-xl flex-1 min-h-[200px] flex flex-col justify-between">
          <div class="flex items-center justify-between pb-2 border-b border-[#143b6b]/80">
            <div class="flex items-center gap-2">
              <span class="w-1.5 h-4 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
              <h2 class="text-sm 2xl:text-base font-bold text-white tracking-wide">常态化预警监测</h2>
            </div>
            <button
              type="button"
              class="text-xs text-cyan-400 hover:text-cyan-300 transition cursor-pointer flex items-center gap-0.5"
              @click="navigate('violation_national')"
            >
              <span>更多</span>
              <span>&gt;</span>
            </button>
          </div>

          <!-- 3 Warning Status Badges (Enlarged) -->
          <div class="grid grid-cols-3 gap-2 my-1.5">
            <!-- 1. 接近计划值 (12) -->
            <div class="bg-[#0c264c]/70 border border-[#1e4976] rounded-lg p-2.5 flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <div class="min-w-0">
                <div class="text-xs text-slate-200 font-medium truncate">接近计划值</div>
                <div class="text-xl font-bold font-mono text-amber-400 leading-tight">12</div>
                <div class="text-[11px] text-slate-400 font-mono">80%≤占&lt;100%</div>
              </div>
            </div>

            <!-- 2. 超计划预警 (7) -->
            <div class="bg-[#0c264c]/70 border border-[#1e4976] rounded-lg p-2.5 flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2l10 18H2L12 2z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <div class="min-w-0">
                <div class="text-xs text-slate-200 font-medium truncate">超计划预警</div>
                <div class="text-xl font-bold font-mono text-orange-400 leading-tight">7</div>
                <div class="text-[11px] text-slate-400 font-mono">占比≥100%</div>
              </div>
            </div>

            <!-- 3. 超许可预警 (3) -->
            <div class="bg-[#0c264c]/70 border border-[#1e4976] rounded-lg p-2.5 flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <div class="min-w-0">
                <div class="text-xs text-slate-200 font-medium truncate">超许可预警</div>
                <div class="text-xl font-bold font-mono text-red-400 leading-tight">3</div>
                <div class="text-[11px] text-slate-400 font-mono">超许可红线</div>
              </div>
            </div>
          </div>

          <!-- Table: 预警事项列表 (Improved readability) -->
          <div class="flex-1 min-h-[95px]">
            <div class="text-xs font-bold text-white mb-1.5 flex items-center gap-1.5">
              <span class="text-cyan-400 font-bold">|</span>
              <span>实时预警事项列表</span>
            </div>
            <table class="w-full text-xs text-left">
              <thead>
                <tr class="text-slate-400 border-b border-[#143b6b]">
                  <th class="py-1 font-medium">预警类型</th>
                  <th class="py-1 font-medium">行政区</th>
                  <th class="py-1 text-right font-medium">当前用水(万m³)</th>
                  <th class="py-1 text-right font-medium">占指标比</th>
                  <th class="py-1 text-right font-medium">预警时间</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#143b6b]/40 font-mono text-slate-300">
                <tr class="hover:bg-white/5 transition cursor-pointer" @click="handleEventClick('城东区接近计划值')">
                  <td class="py-1 text-amber-400 font-sans font-medium">接近计划值</td>
                  <td class="py-1 font-sans">城东区</td>
                  <td class="py-1 text-right">8,432.21</td>
                  <td class="py-1 text-right text-amber-400">82.6%</td>
                  <td class="py-1 text-right text-slate-400 font-sans">05-20 08:30</td>
                </tr>
                <tr class="hover:bg-white/5 transition cursor-pointer" @click="handleEventClick('城中区超计划预警')">
                  <td class="py-1 text-orange-400 font-sans font-medium">超计划预警</td>
                  <td class="py-1 font-sans">城中区</td>
                  <td class="py-1 text-right">6,512.44</td>
                  <td class="py-1 text-right text-orange-400 font-bold">105.3%</td>
                  <td class="py-1 text-right text-slate-400 font-sans">05-20 08:10</td>
                </tr>
                <tr class="hover:bg-white/5 transition cursor-pointer" @click="handleEventClick('湟源县超许可预警')">
                  <td class="py-1 text-red-400 font-sans font-medium">超许可预警</td>
                  <td class="py-1 font-sans">湟源县</td>
                  <td class="py-1 text-right">2,153.75</td>
                  <td class="py-1 text-right text-red-400 font-bold">112.7%</td>
                  <td class="py-1 text-right text-slate-400 font-sans">05-20 07:45</td>
                </tr>
                <tr class="hover:bg-white/5 transition cursor-pointer" @click="handleEventClick('湟中区接近计划值')">
                  <td class="py-1 text-amber-400 font-sans font-medium">接近计划值</td>
                  <td class="py-1 font-sans">湟中区</td>
                  <td class="py-1 text-right">5,326.18</td>
                  <td class="py-1 text-right text-amber-400">78.4%</td>
                  <td class="py-1 text-right text-slate-400 font-sans">05-20 07:30</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- ================= Right Box 2: 业务关联研判 ================= -->
        <div class="bg-[#081b36]/90 backdrop-blur-md rounded-xl border border-[#143b6b] p-3.5 shadow-xl flex-1 min-h-[200px] flex flex-col justify-between">
          <div class="flex items-center justify-between pb-2 border-b border-[#143b6b]/80">
            <div class="flex items-center gap-2">
              <span class="w-1.5 h-4 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
              <h2 class="text-sm 2xl:text-base font-bold text-white tracking-wide">业务关联研判</h2>
            </div>
            <button
              type="button"
              class="text-xs text-cyan-400 hover:text-cyan-300 transition cursor-pointer flex items-center gap-0.5"
              @click="navigate('enterprise_dossier')"
            >
              <span>更多</span>
              <span>&gt;</span>
            </button>
          </div>

          <!-- 4 Key Metric Cards (Enlarged) -->
          <div class="grid grid-cols-4 gap-2 text-center my-1.5">
            <div class="bg-[#0c264c]/70 border border-[#163e70] rounded-lg p-1.5">
              <div class="text-xs text-slate-300 font-medium">许可误差率</div>
              <div class="text-sm lg:text-base font-bold font-mono text-cyan-300 mt-0.5">2.35%</div>
              <div class="text-[11px] text-emerald-400 font-mono mt-0.5">-0.45%</div>
            </div>

            <div class="bg-[#0c264c]/70 border border-[#163e70] rounded-lg p-1.5">
              <div class="text-xs text-slate-300 font-medium">证照问题数</div>
              <div class="text-sm lg:text-base font-bold font-mono text-amber-400 mt-0.5">56 个</div>
              <div class="text-[11px] text-emerald-400 font-mono mt-0.5">-12 个</div>
            </div>

            <div class="bg-[#0c264c]/70 border border-[#163e70] rounded-lg p-1.5">
              <div class="text-xs text-slate-300 font-medium">治理完成率</div>
              <div class="text-sm lg:text-base font-bold font-mono text-emerald-400 mt-0.5">92.35%</div>
              <div class="text-[11px] text-emerald-400 font-mono mt-0.5">+2.35%</div>
            </div>

            <div class="bg-[#0c264c]/70 border border-[#163e70] rounded-lg p-1.5">
              <div class="text-xs text-slate-300 font-medium">未治理占比</div>
              <div class="text-sm lg:text-base font-bold font-mono text-rose-400 mt-0.5">7.65%</div>
              <div class="text-[11px] text-emerald-400 font-mono mt-0.5">-2.35%</div>
            </div>
          </div>

          <!-- Sub-Row: TOP5 Error Rates & License Issue Types -->
          <div class="grid grid-cols-2 gap-3 pt-1.5 border-t border-[#143b6b]/60 flex-1">
            <!-- Left: 许可水量误差率TOP -->
            <div>
              <div class="text-xs font-bold text-white mb-1.5 flex items-center gap-1.5">
                <span class="text-cyan-400 font-bold">|</span>
                <span>许可水量误差TOP</span>
              </div>
              <table class="w-full text-xs text-left">
                <thead>
                  <tr class="text-slate-400 border-b border-[#143b6b]/60">
                    <th class="py-1 font-medium w-4">#</th>
                    <th class="py-1 font-medium">单位名称</th>
                    <th class="py-1 text-right font-medium">误差率</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[#143b6b]/40 font-mono text-slate-300">
                  <tr>
                    <td class="py-1 text-center text-amber-400 font-bold">1</td>
                    <td class="py-1 font-sans truncate max-w-[85px]">湟源县某农水户</td>
                    <td class="py-1 text-right text-rose-400 font-bold">8.72%</td>
                  </tr>
                  <tr>
                    <td class="py-1 text-center text-amber-400 font-bold">2</td>
                    <td class="py-1 font-sans truncate max-w-[85px]">大通县某工业户</td>
                    <td class="py-1 text-right text-rose-400">6.35%</td>
                  </tr>
                  <tr>
                    <td class="py-1 text-center text-slate-400">3</td>
                    <td class="py-1 font-sans truncate max-w-[85px]">城北区某企业</td>
                    <td class="py-1 text-right text-amber-400">4.28%</td>
                  </tr>
                  <tr>
                    <td class="py-1 text-center text-slate-400">4</td>
                    <td class="py-1 font-sans truncate max-w-[85px]">湟中区某灌区</td>
                    <td class="py-1 text-right text-slate-300">3.21%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Right: 证照问题类型分布 (Donut chart & stats) -->
            <div class="flex flex-col justify-between">
              <div class="text-xs font-bold text-white mb-1.5 flex items-center justify-between">
                <div class="flex items-center gap-1.5">
                  <span class="text-cyan-400 font-bold">|</span>
                  <span>证照问题分布</span>
                </div>
                <span class="text-[10px] text-slate-400 font-mono font-normal">共 56 个</span>
              </div>
              <div class="flex items-center gap-2 mt-0.5">
                <!-- Mini Donut -->
                <div class="w-14 h-14 relative shrink-0">
                  <svg viewBox="0 0 100 100" class="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="36" fill="transparent" stroke="#0284c7" stroke-width="15" stroke-dasharray="72.4 153.8" stroke-dashoffset="0">
                      <title>计量水量超许可: 18个 (32%)</title>
                    </circle>
                    <circle cx="50" cy="50" r="36" fill="transparent" stroke="#06b6d4" stroke-width="15" stroke-dasharray="56.5 169.7" stroke-dashoffset="-72.4">
                      <title>直报水量超许可: 14个 (25%)</title>
                    </circle>
                    <circle cx="50" cy="50" r="36" fill="transparent" stroke="#f59e0b" stroke-width="15" stroke-dasharray="40.7 185.5" stroke-dashoffset="-128.9">
                      <title>违规新增取水许可: 10个 (18%)</title>
                    </circle>
                    <circle cx="50" cy="50" r="36" fill="transparent" stroke="#ef4444" stroke-width="15" stroke-dasharray="31.7 194.5" stroke-dashoffset="-169.6">
                      <title>证照失效仍取水: 8个 (14%)</title>
                    </circle>
                    <circle cx="50" cy="50" r="36" fill="transparent" stroke="#8b5cf6" stroke-width="15" stroke-dasharray="24.9 201.3" stroke-dashoffset="-201.3">
                      <title>取水计量数据异常: 6个 (11%)</title>
                    </circle>
                  </svg>
                  <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span class="text-[11px] font-bold font-mono text-cyan-300 leading-none">56</span>
                    <span class="text-[8px] text-slate-400 scale-90 leading-none mt-0.5">个</span>
                  </div>
                </div>

                <!-- Labels -->
                <div class="space-y-0.5 text-[11px] text-slate-300 leading-tight flex-1 min-w-0">
                  <div
                    class="flex items-center justify-between gap-1 hover:text-white transition-colors cursor-pointer group"
                    title="计量水量超许可: 18个 (32%)"
                    @click="handleEventClick('计量水量超许可研判')"
                  >
                    <div class="flex items-center gap-1.5 min-w-0">
                      <span class="w-1.5 h-1.5 rounded-xs shrink-0 bg-[#0284c7]"></span>
                      <span class="truncate group-hover:text-cyan-300 transition-colors">计量水量超许可</span>
                    </div>
                    <span class="font-mono text-cyan-400 text-[10px] shrink-0">32%</span>
                  </div>

                  <div
                    class="flex items-center justify-between gap-1 hover:text-white transition-colors cursor-pointer group"
                    title="直报水量超许可: 14个 (25%)"
                    @click="handleEventClick('直报水量超许可研判')"
                  >
                    <div class="flex items-center gap-1.5 min-w-0">
                      <span class="w-1.5 h-1.5 rounded-xs shrink-0 bg-[#06b6d4]"></span>
                      <span class="truncate group-hover:text-cyan-300 transition-colors">直报水量超许可</span>
                    </div>
                    <span class="font-mono text-cyan-400 text-[10px] shrink-0">25%</span>
                  </div>

                  <div
                    class="flex items-center justify-between gap-1 hover:text-white transition-colors cursor-pointer group"
                    title="违规新增取水许可: 10个 (18%)"
                    @click="handleEventClick('违规新增取水许可研判')"
                  >
                    <div class="flex items-center gap-1.5 min-w-0">
                      <span class="w-1.5 h-1.5 rounded-xs shrink-0 bg-[#f59e0b]"></span>
                      <span class="truncate group-hover:text-amber-300 transition-colors">违规新增取水许可</span>
                    </div>
                    <span class="font-mono text-amber-400 text-[10px] shrink-0">18%</span>
                  </div>

                  <div
                    class="flex items-center justify-between gap-1 hover:text-white transition-colors cursor-pointer group"
                    title="证照失效仍取水: 8个 (14%)"
                    @click="handleEventClick('证照失效仍取水研判')"
                  >
                    <div class="flex items-center gap-1.5 min-w-0">
                      <span class="w-1.5 h-1.5 rounded-xs shrink-0 bg-[#ef4444]"></span>
                      <span class="truncate group-hover:text-rose-300 transition-colors">证照失效仍取水</span>
                    </div>
                    <span class="font-mono text-rose-400 text-[10px] shrink-0">14%</span>
                  </div>

                  <div
                    class="flex items-center justify-between gap-1 hover:text-white transition-colors cursor-pointer group"
                    title="取水计量数据异常: 6个 (11%)"
                    @click="handleEventClick('取水计量数据异常研判')"
                  >
                    <div class="flex items-center gap-1.5 min-w-0">
                      <span class="w-1.5 h-1.5 rounded-xs shrink-0 bg-[#8b5cf6]"></span>
                      <span class="truncate group-hover:text-purple-300 transition-colors">取水计量数据异常</span>
                    </div>
                    <span class="font-mono text-purple-400 text-[10px] shrink-0">11%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ================= Right Box 3: 计量点接入与到报率监控 ================= -->
        <div class="bg-[#081b36]/90 backdrop-blur-md rounded-xl border border-[#143b6b] p-3.5 shadow-xl flex-1 min-h-[200px] flex flex-col justify-between">
          <div class="flex items-center justify-between pb-2 border-b border-[#143b6b]/80">
            <div class="flex items-center gap-2">
              <span class="w-1.5 h-4 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
              <h2 class="text-sm 2xl:text-base font-bold text-white tracking-wide">计量点接入与到报率监控</h2>
            </div>
            <button
              type="button"
              class="text-xs text-cyan-400 hover:text-cyan-300 transition cursor-pointer flex items-center gap-0.5"
              @click="navigate('facility_management')"
            >
              <span>更多</span>
              <span>&gt;</span>
            </button>
          </div>

          <!-- 2 Meter Category Stats -->
          <div class="grid grid-cols-2 gap-2 text-center text-xs my-1.5">
            <div class="bg-[#0c264c]/70 border border-[#163e70] rounded-lg p-2">
              <div class="text-xs text-slate-300 font-medium mb-1">规模以上农业计量点</div>
              <div class="flex justify-around items-center font-mono">
                <div>
                  <span class="text-[11px] text-slate-400 block font-sans">接入率</span>
                  <span class="font-bold text-cyan-400 text-sm">92.36%</span>
                </div>
                <div class="w-px h-6 bg-[#163e70]"></div>
                <div>
                  <span class="text-[11px] text-slate-400 block font-sans">到报率</span>
                  <span class="font-bold text-emerald-400 text-sm">88.45%</span>
                </div>
              </div>
            </div>

            <div class="bg-[#0c264c]/70 border border-[#163e70] rounded-lg p-2">
              <div class="text-xs text-slate-300 font-medium mb-1">规模以上非农计量点</div>
              <div class="flex justify-around items-center font-mono">
                <div>
                  <span class="text-[11px] text-slate-400 block font-sans">接入率</span>
                  <span class="font-bold text-cyan-400 text-sm">95.12%</span>
                </div>
                <div class="w-px h-6 bg-[#163e70]"></div>
                <div>
                  <span class="text-[11px] text-slate-400 block font-sans">到报率</span>
                  <span class="font-bold text-emerald-400 text-sm">91.27%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Sub-Row: 接入率月度趋势对比 & 到报率滞后点位TOP -->
          <div class="grid grid-cols-2 gap-3 pt-1.5 border-t border-[#143b6b]/60 flex-1">
            <!-- Left: 接入率月度趋势对比 -->
            <div>
              <div class="text-xs font-bold text-white mb-1 flex items-center justify-between">
                <span class="text-cyan-400">| 接入率趋势对比</span>
                <div class="flex items-center gap-2 text-xs text-slate-300">
                  <span class="text-blue-400 font-medium">● 农业</span>
                  <span class="text-cyan-400 font-medium">● 非农</span>
                </div>
              </div>
              <!-- Mini SVG line chart -->
              <div class="w-full h-20">
                <svg viewBox="0 0 160 70" class="w-full h-full overflow-visible">
                  <line x1="22" y1="10" x2="155" y2="10" stroke="#163866" stroke-width="0.8" />
                  <line x1="22" y1="30" x2="155" y2="30" stroke="#163866" stroke-width="0.8" />
                  <line x1="22" y1="50" x2="155" y2="50" stroke="#163866" stroke-width="0.8" />

                  <g fill="#94a3b8" font-size="8" font-family="monospace">
                    <text x="18" y="13" text-anchor="end">100</text>
                    <text x="18" y="33" text-anchor="end">50</text>
                    <text x="18" y="53" text-anchor="end">0</text>
                  </g>

                  <!-- 农业 Line -->
                  <path d="M 28,20 L 52,18 L 76,17 L 100,16 L 124,15 L 148,14" fill="none" stroke="#2563eb" stroke-width="1.8" />
                  <!-- 非农 Line -->
                  <path d="M 28,15 L 52,14 L 76,13 L 100,12 L 124,11 L 148,10" fill="none" stroke="#00e5ff" stroke-width="1.8" />

                  <!-- Month Labels -->
                  <g fill="#cbd5e1" font-size="8" text-anchor="middle">
                    <text x="28" y="63">1月</text>
                    <text x="52" y="63">2月</text>
                    <text x="76" y="63">3月</text>
                    <text x="100" y="63">4月</text>
                    <text x="124" y="63">5月</text>
                    <text x="148" y="63">6月</text>
                  </g>
                </svg>
              </div>
            </div>

            <!-- Right: 到报率滞后点位TOP -->
            <div>
              <div class="text-xs font-bold text-white mb-1 flex items-center gap-1.5">
                <span class="text-cyan-400 font-bold">|</span>
                <span>到报率滞后TOP</span>
              </div>
              <table class="w-full text-xs text-left">
                <thead>
                  <tr class="text-slate-400 border-b border-[#143b6b]/60">
                    <th class="py-0.5 font-medium w-4">#</th>
                    <th class="py-0.5 font-medium">点位名称</th>
                    <th class="py-0.5 text-right font-medium">到报率</th>
                    <th class="py-0.5 text-right font-medium">滞后</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[#143b6b]/40 font-mono text-slate-300">
                  <tr>
                    <td class="py-0.5 text-center text-amber-400 font-bold">1</td>
                    <td class="py-0.5 font-sans truncate max-w-[75px]">城东区某取水口</td>
                    <td class="py-0.5 text-right text-rose-400">76.2%</td>
                    <td class="py-0.5 text-right text-rose-400 font-bold">3天</td>
                  </tr>
                  <tr>
                    <td class="py-0.5 text-center text-amber-400 font-bold">2</td>
                    <td class="py-0.5 font-sans truncate max-w-[75px]">湟源县某灌区</td>
                    <td class="py-0.5 text-right text-rose-400">78.5%</td>
                    <td class="py-0.5 text-right text-rose-400">2天</td>
                  </tr>
                  <tr>
                    <td class="py-0.5 text-center text-slate-400">3</td>
                    <td class="py-0.5 font-sans truncate max-w-[75px]">城北区某企业</td>
                    <td class="py-0.5 text-right text-amber-400">80.1%</td>
                    <td class="py-0.5 text-right text-amber-400">2天</td>
                  </tr>
                  <tr>
                    <td class="py-0.5 text-center text-slate-400">4</td>
                    <td class="py-0.5 font-sans truncate max-w-[75px]">大通县某水厂</td>
                    <td class="py-0.5 text-right text-slate-300">81.1%</td>
                    <td class="py-0.5 text-right text-slate-300">1天</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </template>

        <!-- B. 专项业务应用场景 (右侧模块 3: 异常情况处置 & 模块 4: 取水数据对比分析与复核跟踪 - 精炼色彩) -->
        <template v-else>
          <!-- ================= 专项 Card 3: 异常情况处置与运维能效评估 ================= -->
          <div class="bg-[#081b36]/90 backdrop-blur-md rounded-xl border border-[#143b6b] p-3.5 shadow-xl flex-1 min-h-[300px] flex flex-col justify-between">
            <!-- Card Header -->
            <div class="flex items-center justify-between pb-2 border-b border-[#143b6b]/80">
              <div class="flex items-center gap-2">
                <span class="w-1.5 h-4 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
                <h2 class="text-sm 2xl:text-base font-bold text-white tracking-wide">异常情况处置与能效评估</h2>
              </div>
              <div class="flex items-center gap-1.5 text-xs text-cyan-300 font-mono">
                <span class="text-slate-400 font-sans">闭环率:</span>
                <span class="font-bold text-cyan-300">{{ operationEfficiencyMetrics.closedLoopRate }}%</span>
              </div>
            </div>

            <!-- 1. 异常类型统计 (负值、超阈值、奇异值、通信掉线) -->
            <div class="my-2">
              <div class="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1.5">
                <span class="flex items-center gap-1">
                  <span class="text-cyan-400 font-bold">|</span>
                  <span>异常类型多维分布统计</span>
                </span>
                <span class="text-[10px] text-slate-400">本月累计 {{ anomalyWorkOrderStatus.total }} 起</span>
              </div>

              <!-- 4 Types Grid -->
              <div class="grid grid-cols-4 gap-1.5 text-center">
                <div
                  v-for="anom in anomalyTypeStats"
                  :key="anom.type"
                  class="bg-[#0b2447] border border-[#183f6d] rounded-lg p-1.5 relative overflow-hidden group hover:border-cyan-400/50 transition cursor-pointer"
                  :title="anom.desc"
                >
                  <div class="text-[10px] text-slate-300 truncate font-medium">{{ anom.type }}</div>
                  <div class="text-base 2xl:text-lg font-bold font-mono my-0.5" :style="{ color: anom.color }">
                    {{ anom.count }}
                    <span class="text-[10px] text-slate-400 font-normal">次</span>
                  </div>
                  <div class="text-[10px] text-slate-400 font-mono">{{ anom.percentage }}%</div>
                  <div class="h-1 w-full bg-slate-700/50 rounded-full mt-1 overflow-hidden">
                    <div class="h-full rounded-full" :style="{ width: `${anom.percentage}%`, backgroundColor: anom.color }"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 2. 异常工单处置流程 (待处置 ➔ 处置中 ➔ 待水量修订 ➔ 已完成 - 统一蓝系底色) -->
            <div class="my-1.5 p-2 bg-[#06182e]/80 rounded-lg border border-[#13355e]">
              <div class="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1.5">
                <span class="flex items-center gap-1">
                  <span class="text-cyan-400 font-bold">|</span>
                  <span>异常工单处置全流程流转</span>
                </span>
                <span class="text-[10px] text-cyan-300">智能工单引擎</span>
              </div>

              <!-- 4-step Pipeline with Flow Connectors -->
              <div class="grid grid-cols-4 gap-1 text-center relative items-center">
                <!-- 1. 待处置 (告警橙) -->
                <div class="bg-[#0b2447] border border-amber-500/40 rounded-lg p-1.5 transition hover:bg-amber-950/20">
                  <div class="text-[10px] text-amber-300 font-medium">1. 待处置</div>
                  <div class="text-base font-bold font-mono text-amber-400 mt-0.5">{{ anomalyWorkOrderStatus.pending }}</div>
                  <div class="text-[9px] text-amber-300/70">工单派发中</div>
                </div>

                <!-- 2. 处置中 (科技蓝) -->
                <div class="bg-[#0b2447] border border-cyan-500/40 rounded-lg p-1.5 transition hover:bg-cyan-950/20">
                  <div class="text-[10px] text-cyan-300 font-medium">2. 处置中</div>
                  <div class="text-base font-bold font-mono text-cyan-400 mt-0.5">{{ anomalyWorkOrderStatus.processing }}</div>
                  <div class="text-[9px] text-cyan-300/70">现场排查消缺</div>
                </div>

                <!-- 3. 待水量修订 (柔和天蓝) -->
                <div class="bg-[#0b2447] border border-blue-500/40 rounded-lg p-1.5 transition hover:bg-blue-950/20">
                  <div class="text-[10px] text-blue-300 font-medium">3. 待水量修订</div>
                  <div class="text-base font-bold font-mono text-blue-400 mt-0.5">{{ anomalyWorkOrderStatus.revisionNeeded }}</div>
                  <div class="text-[9px] text-blue-300/70">算法补算校验</div>
                </div>

                <!-- 4. 已完成 (中性灰闭环) -->
                <div class="bg-[#0b2447] border border-slate-600/40 rounded-lg p-1.5 transition hover:bg-slate-800/20">
                  <div class="text-[10px] text-slate-300 font-medium">4. 已完成</div>
                  <div class="text-base font-bold font-mono text-slate-200 mt-0.5">{{ anomalyWorkOrderStatus.completed }}</div>
                  <div class="text-[9px] text-slate-400">归档销号闭环</div>
                </div>
              </div>
            </div>

            <!-- 3. 处置能效评估 (4项核心指标) -->
            <div class="my-1.5">
              <div class="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1">
                <span class="flex items-center gap-1">
                  <span class="text-cyan-400 font-bold">|</span>
                  <span>处置能效综合评估</span>
                </span>
                <span class="text-[10px] text-cyan-300 font-mono">达成率 A+</span>
              </div>

              <div class="grid grid-cols-4 gap-1.5 text-center">
                <div class="bg-[#0b2447] border border-[#163c6a] rounded-lg p-1.5">
                  <span class="text-[10px] text-slate-300 block">平均处置时长</span>
                  <div class="text-sm 2xl:text-base font-bold font-mono text-cyan-300 mt-0.5">
                    {{ operationEfficiencyMetrics.avgResolutionTime }}<span class="text-[10px] font-normal text-slate-400">h</span>
                  </div>
                  <span class="text-[9px] text-slate-400 block mt-0.5">环比 -0.4h ↓</span>
                </div>

                <div class="bg-[#0b2447] border border-[#163c6a] rounded-lg p-1.5">
                  <span class="text-[10px] text-slate-300 block">处置成功率</span>
                  <div class="text-sm 2xl:text-base font-bold font-mono text-cyan-300 mt-0.5">
                    {{ operationEfficiencyMetrics.successRate }}<span class="text-[10px] font-normal text-slate-400">%</span>
                  </div>
                  <span class="text-[9px] text-slate-400 block mt-0.5">首派高准度</span>
                </div>

                <div class="bg-[#0b2447] border border-[#163c6a] rounded-lg p-1.5">
                  <span class="text-[10px] text-slate-300 block">重复异常率</span>
                  <div class="text-sm 2xl:text-base font-bold font-mono text-blue-300 mt-0.5">
                    {{ operationEfficiencyMetrics.repeatAnomalyRate }}<span class="text-[10px] font-normal text-slate-400">%</span>
                  </div>
                  <span class="text-[9px] text-slate-400 block mt-0.5">同比 -1.5% ↓</span>
                </div>

                <div class="bg-[#0b2447] border border-[#163c6a] rounded-lg p-1.5">
                  <span class="text-[10px] text-slate-300 block">闭环率</span>
                  <div class="text-sm 2xl:text-base font-bold font-mono text-cyan-300 mt-0.5">
                    {{ operationEfficiencyMetrics.closedLoopRate }}<span class="text-[10px] font-normal text-slate-400">%</span>
                  </div>
                  <span class="text-[9px] text-slate-400 block mt-0.5">全域销号</span>
                </div>
              </div>
            </div>

            <!-- 4. 运维单位能效排名 -->
            <div class="mt-1 pt-1.5 border-t border-[#143b6b]/60">
              <div class="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1.5">
                <span class="flex items-center gap-1">
                  <span class="text-cyan-400 font-bold">|</span>
                  <span>运维单位能效排名榜</span>
                </span>
                <span class="text-[10px] text-slate-400">综合消缺实效</span>
              </div>

              <div class="space-y-1 text-xs">
                <div
                  v-for="team in maintenanceTeamRanks"
                  :key="team.rank"
                  class="flex items-center justify-between p-1.5 rounded-lg bg-[#091f3d]/60 border border-[#163b66]/60 hover:bg-[#0d2a52] transition text-[11px]"
                >
                  <div class="flex items-center gap-2 min-w-0">
                    <span
                      class="w-4 h-4 rounded-full flex items-center justify-center font-mono font-bold text-[10px] shrink-0"
                      :class="team.rank === 1 ? 'bg-amber-400 text-amber-950' : team.rank === 2 ? 'bg-slate-300 text-slate-900' : team.rank === 3 ? 'bg-amber-700 text-white' : 'bg-slate-700 text-slate-300'"
                    >
                      {{ team.rank }}
                    </span>
                    <span class="font-medium text-slate-200 truncate max-w-[140px] 2xl:max-w-[160px]">{{ team.name }}</span>
                  </div>

                  <div class="flex items-center gap-3 font-mono text-slate-300">
                    <span class="text-[10px] text-slate-400 font-sans">工单 {{ team.resolvedOrders }}/{{ team.totalOrders }}</span>
                    <span class="text-cyan-300 text-[11px]">{{ team.avgHours }}h</span>
                    <span class="font-bold text-cyan-300 text-xs">{{ team.score }}分</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ================= 专项 Card 4: 取水数据对比分析与复核跟踪 ================= -->
          <div class="bg-[#081b36]/90 backdrop-blur-md rounded-xl border border-[#143b6b] p-3.5 shadow-xl flex-1 min-h-[340px] flex flex-col justify-between">
            <!-- Card Header with Engine Controls -->
            <div class="flex items-center justify-between pb-2 border-b border-[#143b6b]/80">
              <div class="flex items-center gap-2">
                <span class="w-1.5 h-4 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
                <h2 class="text-sm 2xl:text-base font-bold text-white tracking-wide">取水数据对比分析</h2>
              </div>

              <!-- Actions: Time Window & Review Tracking Button -->
              <div class="flex items-center gap-1.5">
                <!-- Time Window Select (自动重算对比数据) -->
                <select
                  v-model="compareTimeWindow"
                  @change="triggerCompareAnalysis"
                  class="bg-[#0b2447] border border-[#1b4372] rounded-md px-2 py-1 text-slate-100 text-[11px] focus:outline-none focus:border-cyan-400 cursor-pointer"
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
                  class="px-2 py-1 rounded-md bg-white/10 hover:bg-white/15 text-cyan-300 text-[11px] border border-cyan-500/30 flex items-center gap-1 cursor-pointer transition"
                  title="查看复核任务流转与跟踪中心"
                >
                  <span>复核跟踪</span>
                  <span class="w-4 h-4 rounded-full bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 text-[10px] font-mono font-bold flex items-center justify-center">
                    {{ reviewTaskList.filter(t => t.status !== 'closed').length }}
                  </span>
                </button>
              </div>
            </div>

            <!-- 柱状图直观呈现比对结果 (4 Bars: 水蓝系+计划金+剩余银灰) -->
            <div class="my-1.5">
              <div class="flex items-center justify-between text-xs mb-1">
                <span class="font-semibold text-slate-300 flex items-center gap-1">
                  <span class="text-cyan-400 font-bold">|</span>
                  <span>重点对象多维水量比对柱状图 (万m³)</span>
                </span>

                <!-- 4 Legends -->
                <div class="flex items-center gap-2 text-[10px]">
                  <div class="flex items-center gap-1">
                    <span class="w-2 h-2 rounded-xs bg-[#00e5ff]"></span>
                    <span class="text-slate-300">当前取水</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <span class="w-2 h-2 rounded-xs bg-[#38bdf8]"></span>
                    <span class="text-slate-300">3年均值</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <span class="w-2 h-2 rounded-xs bg-[#f59e0b]"></span>
                    <span class="text-slate-300">当月计划</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <span class="w-2 h-2 rounded-xs bg-[#94a3b8]"></span>
                    <span class="text-slate-300">许可剩余</span>
                  </div>
                </div>
              </div>

              <!-- SVG Grouped 4-Bar Chart -->
              <div class="w-full h-24 relative bg-[#06182e]/60 rounded-lg p-1 border border-[#13355e]">
                <svg viewBox="0 0 380 90" class="w-full h-full overflow-visible">
                  <!-- Horizontal grid lines -->
                  <line x1="25" y1="15" x2="375" y2="15" stroke="#163866" stroke-width="0.7" stroke-dasharray="2,2" />
                  <line x1="25" y1="40" x2="375" y2="40" stroke="#163866" stroke-width="0.7" stroke-dasharray="2,2" />
                  <line x1="25" y1="65" x2="375" y2="65" stroke="#1f4b82" stroke-width="1" />

                  <g fill="#94a3b8" font-size="8" font-family="monospace" text-anchor="end">
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
                      fill="#00e5ff"
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
                      fill="#38bdf8"
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
                      fill="#f59e0b"
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
                      class="font-medium"
                    >
                      {{ item.name.slice(0, 4) }}
                    </text>
                  </g>
                </svg>
              </div>
            </div>

            <!-- 差值表直观呈现比对结果与复核任务下发 -->
            <div class="mt-1">
              <div class="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1">
                <span class="flex items-center gap-1">
                  <span class="text-cyan-400 font-bold">|</span>
                  <span>取水数据差值比对与复核下发</span>
                </span>
                <span class="text-[10px] text-slate-400">支持下发复核指令</span>
              </div>

              <!-- Difference Table -->
              <div class="overflow-x-auto">
                <table class="w-full text-xs text-left">
                  <thead>
                    <tr class="text-slate-400 border-b border-[#143b6b] text-[10px]">
                      <th class="py-1 font-medium">分析对象</th>
                      <th class="py-1 text-right font-medium">当前(万m³)</th>
                      <th class="py-1 text-right font-medium">同期均值/偏差</th>
                      <th class="py-1 text-right font-medium">当月计划</th>
                      <th class="py-1 text-right font-medium">许可剩余</th>
                      <th class="py-1 text-center font-medium">复核操作</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#143b6b]/40 text-slate-300 text-[11px] font-mono">
                    <tr
                      v-for="item in standardCompareList"
                      :key="item.id"
                      class="hover:bg-white/5 transition"
                    >
                      <!-- Name -->
                      <td class="py-1.5 font-sans">
                        <div class="font-medium text-white truncate max-w-[90px] 2xl:max-w-[105px]" :title="item.name">
                          {{ item.name }}
                        </div>
                        <span class="text-[9px] text-slate-400">{{ item.category }}</span>
                      </td>

                      <!-- Current Water -->
                      <td class="py-1.5 text-right font-bold text-cyan-300">
                        {{ item.currentWater }}
                      </td>

                      <!-- Three Year Avg & Deviation -->
                      <td class="py-1.5 text-right">
                        <div>{{ item.threeYearAvg }}</div>
                        <span
                          class="text-[10px] font-bold block"
                          :class="item.isAbnormal ? (item.avgDeviation > 0 ? 'text-cyan-300' : 'text-blue-300') : 'text-slate-400'"
                        >
                          {{ item.avgDeviation > 0 ? '+' : '' }}{{ item.avgDeviation }}%
                        </span>
                      </td>

                      <!-- Monthly Plan & Deviation -->
                      <td class="py-1.5 text-right text-slate-300">
                        <div>{{ item.monthlyPlan }}</div>
                        <span class="text-[9px] text-slate-400 block font-sans">
                          {{ item.planDeviation > 0 ? '+' : '' }}{{ item.planDeviation }}%
                        </span>
                      </td>

                      <!-- Licensed Remaining -->
                      <td class="py-1.5 text-right text-slate-200 font-bold">
                        {{ item.licensedRemaining }}
                      </td>

                      <!-- Action: Dispatch Review Task Button -->
                      <td class="py-1.5 text-center font-sans">
                        <button
                          v-if="item.isAbnormal"
                          type="button"
                          @click="dispatchReviewTask(item)"
                          class="px-2 py-0.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] shadow-sm shadow-blue-900/40 cursor-pointer transition active:scale-95 whitespace-nowrap"
                          title="下发复核指令"
                        >
                          下发复核
                        </button>
                        <span v-else class="text-[10px] text-cyan-300 bg-cyan-950/30 px-1.5 py-0.5 rounded border border-cyan-500/20">
                          正常受控
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- 复核任务实时流转跟踪状态简报条 -->
            <div class="mt-2 pt-1.5 border-t border-[#143b6b]/60 flex items-center justify-between text-xs">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span class="text-slate-300 text-[11px]">
                  复核任务流转跟踪：<span class="text-white font-bold font-mono">{{ reviewTaskList.length }}</span> 件在线
                </span>
              </div>
              <button
                type="button"
                @click="showReviewTaskModal = true"
                class="text-[11px] text-cyan-400 hover:text-cyan-300 transition flex items-center gap-0.5 cursor-pointer font-medium"
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
    <footer class="h-8 bg-[#061429] border-t border-[#143b6b]/60 flex items-center justify-between px-5 text-[11px] text-slate-400 font-sans z-40 shrink-0">
      <div class="flex items-center gap-2">
        <span>数据更新时间: 2025-05-20 10:25:00</span>
        <button
          type="button"
          @click="refreshData"
          class="text-cyan-400 hover:text-cyan-300 transition cursor-pointer"
          title="刷新数据"
        >
          <svg class="w-3.5 h-3.5" :class="{ 'animate-spin': isRefreshing }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
          </svg>
        </button>
      </div>

      <div class="flex items-center gap-4 text-slate-400">
        <span>数据来源: 西宁市水务局</span>
      </div>
    </footer>

    <!-- ================= 6. MODAL: 预警事件处置中心 ================= -->
    <div
      v-if="showWarningModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
    >
      <div class="bg-[#0a2244] border border-cyan-500/50 rounded-xl shadow-2xl w-full max-w-xl overflow-hidden text-white animate-scale-in">
        <div class="px-5 py-3.5 bg-gradient-to-r from-blue-700 to-cyan-700 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
            </svg>
            <span class="font-bold text-sm tracking-wide">常态化预警与工单调度中心</span>
          </div>
          <button
            type="button"
            class="text-white/80 hover:text-white cursor-pointer"
            @click="showWarningModal = false"
          >
            ✕
          </button>
        </div>

        <div class="p-5 space-y-4 text-xs">
          <div class="p-3 bg-[#08182f] rounded-lg border border-[#1b4372]">
            <div class="font-bold text-cyan-300 mb-1">当前处置预警事件: {{ selectedEvent || '西宁全域水资源风控事件' }}</div>
            <div class="text-slate-300 leading-relaxed text-[11px]">
              监测到湟源县某工业取水户累计已超许可 12.7%，系统已自动锁定相关取水闸门遥控频次，触发二级水政督办流程。
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 text-slate-300">
            <div class="p-2.5 rounded bg-white/5 border border-white/10">
              <div class="text-slate-400 text-[10px]">事件等级</div>
              <div class="font-bold text-red-400 mt-0.5">高风险 (超许可预警)</div>
            </div>
            <div class="p-2.5 rounded bg-white/5 border border-white/10">
              <div class="text-slate-400 text-[10px]">响应时限</div>
              <div class="font-bold text-amber-400 mt-0.5">剩余 2 小时 45 分</div>
            </div>
          </div>
        </div>

        <div class="px-5 py-3 bg-[#06152b] border-t border-[#1b4372] flex justify-end gap-2 text-xs">
          <button
            type="button"
            class="px-4 py-1.5 rounded border border-slate-600 text-slate-300 hover:bg-white/10 cursor-pointer"
            @click="showWarningModal = false"
          >
            关闭
          </button>
          <button
            type="button"
            class="px-4 py-1.5 rounded bg-cyan-600 text-white font-bold hover:bg-cyan-500 cursor-pointer"
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
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
      @click.self="showMeterDetailModal = false"
    >
      <div class="bg-[#091f3d] border border-cyan-500/60 rounded-xl shadow-2xl w-full max-w-md overflow-hidden text-white transition-all transform animate-fade-in">
        <!-- 弹窗顶栏 (简洁紧凑) -->
        <div class="px-4 py-3 bg-gradient-to-r from-[#0c2b55] to-[#081d3a] border-b border-[#1b4372] flex items-center justify-between">
          <div class="flex items-center gap-2 min-w-0">
            <span
              class="w-2.5 h-2.5 rounded-full shrink-0"
              :class="selectedMeterPoint.meterStatus === 'normal'
                ? 'bg-emerald-400 shadow-[0_0_6px_#10b981]'
                : selectedMeterPoint.meterStatus === 'fault'
                  ? 'bg-rose-500 shadow-[0_0_6px_#ef4444]'
                  : 'bg-amber-400 shadow-[0_0_6px_#f59e0b]'"
            ></span>
            <h3 class="text-sm font-bold text-white truncate tracking-wide">
              {{ selectedMeterPoint.name }}
            </h3>
            <span
              class="px-1.5 py-0.2 rounded text-[10px] font-bold border shrink-0"
              :class="selectedMeterPoint.meterStatus === 'normal'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : selectedMeterPoint.meterStatus === 'fault'
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40'"
            >
              {{ selectedMeterPoint.meterStatus === 'normal' ? '正常' : selectedMeterPoint.meterStatus === 'fault' ? '故障' : '待检定' }}
            </span>
          </div>

          <button
            type="button"
            class="text-slate-400 hover:text-white p-1 rounded hover:bg-white/10 transition cursor-pointer text-xs"
            @click="showMeterDetailModal = false"
          >
            ✕
          </button>
        </div>

        <!-- 弹窗主体内容: 简洁清晰指标卡片 + 核心参数清单 -->
        <div class="p-4 space-y-3 text-xs">
          <!-- 实时数据双指标卡片 -->
          <div class="grid grid-cols-2 gap-2 text-center">
            <div class="p-2.5 rounded-lg bg-[#07172f] border border-cyan-500/30">
              <span class="text-slate-400 text-[10px] block">瞬时流速 / 流量</span>
              <div class="text-lg font-bold font-mono text-cyan-300 mt-0.5">
                {{ selectedMeterPoint.instantFlow }} <span class="text-[10px] font-normal text-slate-400">m³/h</span>
              </div>
            </div>
            <div class="p-2.5 rounded-lg bg-[#07172f] border border-blue-500/30">
              <span class="text-slate-400 text-[10px] block">今日累计取水</span>
              <div class="text-lg font-bold font-mono text-blue-300 mt-0.5">
                {{ selectedMeterPoint.dailyAccumulated }} <span class="text-[10px] font-normal text-slate-400">m³</span>
              </div>
            </div>
          </div>

          <!-- 核心属性精简列表 -->
          <div class="p-3 rounded-lg bg-[#06162d]/80 border border-[#1b4372]/60 space-y-1.5 text-[11px]">
            <div class="flex items-center justify-between">
              <span class="text-slate-400">计量编码</span>
              <span class="font-mono text-cyan-300 font-semibold select-all">{{ selectedMeterPoint.meterCode }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-slate-400">器具类型</span>
              <span class="text-slate-200 font-medium">{{ selectedMeterPoint.deviceType }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-slate-400">所属用水户</span>
              <span class="text-slate-200 truncate max-w-[210px] text-right">{{ selectedMeterPoint.userEnterprise }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-slate-400">安装位置</span>
              <span class="text-slate-200 truncate max-w-[210px] text-right" :title="selectedMeterPoint.installLocation">{{ selectedMeterPoint.installLocation }}</span>
            </div>
            <div class="flex items-center justify-between pt-1 border-t border-[#1b4372]/40">
              <span class="text-slate-400">检定有效期</span>
              <span class="font-mono" :class="selectedMeterPoint.meterStatus === 'pending' ? 'text-amber-400 font-bold' : 'text-slate-200'">
                {{ selectedMeterPoint.lastCheckDate }} ~ {{ selectedMeterPoint.nextCheckDate }}
              </span>
            </div>
          </div>

          <!-- 异常状态极简提醒 (仅在故障/待检定时显示) -->
          <div
            v-if="selectedMeterPoint.meterStatus === 'fault'"
            class="p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/40 text-[11px] text-rose-200 flex items-start gap-1.5"
          >
            <span class="text-rose-400 font-bold shrink-0">异常诊断:</span>
            <span>{{ selectedMeterPoint.faultDesc || '设备通信中断，已连续脱网超24小时' }}</span>
          </div>
          <div
            v-else-if="selectedMeterPoint.meterStatus === 'pending'"
            class="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/40 text-[11px] text-amber-200 flex items-start gap-1.5"
          >
            <span class="text-amber-400 font-bold shrink-0">定检催告:</span>
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
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
      @click.self="showReviewTaskModal = false"
    >
      <div class="bg-[#091b36] border border-cyan-500/50 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden text-white transition-all animate-fade-in flex flex-col max-h-[85vh]">
        <!-- Modal Header -->
        <div class="px-6 py-4 bg-gradient-to-r from-[#0c254a] to-[#07172f] border-b border-[#1b4372] flex items-center justify-between shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 11l3 3L22 4"></path>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-base font-bold text-white tracking-wide">
                取水数据对比与复核任务跟踪中心
              </h3>
              <p class="text-xs text-slate-400 mt-0.5">
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
        <div class="px-6 py-3 bg-[#0a2346]/80 border-b border-[#1b4372] grid grid-cols-4 gap-3 text-center shrink-0">
          <div
            class="p-2 rounded-lg border transition cursor-pointer"
            :class="reviewTaskStatusFilter === 'all' ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200' : 'bg-white/5 border-white/10 text-slate-300'"
            @click="reviewTaskStatusFilter = 'all'"
          >
            <span class="text-[10px] block font-medium">复核任务总数</span>
            <span class="text-lg font-bold font-mono text-cyan-300 mt-0.5 block">{{ reviewTaskList.length }}</span>
          </div>
          <div
            class="p-2 rounded-lg border transition cursor-pointer"
            :class="reviewTaskStatusFilter === 'pending' ? 'bg-amber-500/25 border-amber-400 text-amber-200' : 'bg-amber-950/20 border-amber-500/30 text-amber-300'"
            @click="reviewTaskStatusFilter = 'pending'"
          >
            <span class="text-[10px] block font-medium">待现场核验</span>
            <span class="text-lg font-bold font-mono text-amber-400 mt-0.5 block">
              {{ reviewTaskList.filter(t => t.status === 'pending').length }}
            </span>
          </div>
          <div
            class="p-2 rounded-lg border transition cursor-pointer"
            :class="reviewTaskStatusFilter === 'in_progress' ? 'bg-blue-500/25 border-blue-400 text-blue-200' : 'bg-blue-950/20 border-blue-500/30 text-blue-300'"
            @click="reviewTaskStatusFilter = 'in_progress'"
          >
            <span class="text-[10px] block font-medium">核查进行中</span>
            <span class="text-lg font-bold font-mono text-blue-400 mt-0.5 block">
              {{ reviewTaskList.filter(t => t.status === 'in_progress').length }}
            </span>
          </div>
          <div
            class="p-2 rounded-lg border transition cursor-pointer"
            :class="reviewTaskStatusFilter === 'closed' ? 'bg-slate-700/40 border-slate-400 text-slate-100' : 'bg-slate-800/20 border-slate-600/30 text-slate-300'"
            @click="reviewTaskStatusFilter = 'closed'"
          >
            <span class="text-[10px] block font-medium">已完成水量核定</span>
            <span class="text-lg font-bold font-mono text-slate-200 mt-0.5 block">
              {{ reviewTaskList.filter(t => t.status === 'closed').length }}
            </span>
          </div>
        </div>

        <!-- Modal Task List Content -->
        <div class="p-6 overflow-y-auto custom-dark-scrollbar space-y-3 flex-1 text-xs">
          <div
            v-for="task in filteredReviewTasks"
            :key="task.id"
            class="p-4 rounded-xl bg-[#0c2344] border border-[#1b4372] space-y-2 hover:border-cyan-500/50 transition"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="font-mono text-xs font-bold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                  {{ task.taskCode }}
                </span>
                <span class="font-bold text-sm text-white">{{ task.targetName }}</span>
              </div>

              <span
                class="px-2.5 py-0.5 rounded-full text-xs font-bold border"
                :class="task.status === 'pending'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                  : task.status === 'in_progress'
                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                    : 'bg-slate-700/30 text-slate-200 border-slate-600/40'"
              >
                ● {{ task.statusLabel }}
              </span>
            </div>

            <div class="grid grid-cols-3 gap-2 text-slate-300 bg-black/20 p-2.5 rounded-lg border border-white/5">
              <div><span class="text-slate-400">偏差特征：</span><span class="text-rose-400 font-bold">{{ task.deviationInfo }}</span></div>
              <div><span class="text-slate-400">责任专员：</span>{{ task.inspector }}</div>
              <div><span class="text-slate-400">调度时限：</span><span class="font-mono text-amber-300">{{ task.deadline }}</span></div>
            </div>

            <div class="text-slate-300 flex items-start gap-2 bg-[#08182f] p-2.5 rounded-lg border border-[#143b6b]">
              <span class="text-cyan-400 font-bold shrink-0">现场进展与复核结果：</span>
              <span class="leading-relaxed">{{ task.result || '专员排班中，等待现场核验反馈。' }}</span>
            </div>

            <div class="flex items-center justify-end gap-2 pt-1">
              <button
                v-if="task.status === 'pending'"
                type="button"
                class="px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold transition cursor-pointer"
                @click="task.status = 'in_progress'; task.statusLabel = '核查进行中'; task.result = '专员已到达现场，正在校验超声流量计读数与出厂标定曲线。'"
              >
                开始现场核查
              </button>
              <button
                v-if="task.status === 'in_progress'"
                type="button"
                class="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition cursor-pointer"
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

          <div v-if="filteredReviewTasks.length === 0" class="text-center py-8 text-slate-400 text-xs">
            暂无该状态下的复核任务
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="px-6 py-3.5 bg-[#06152b] border-t border-[#1b4372] flex items-center justify-between text-xs shrink-0">
          <div class="text-slate-400 flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>标准化复核引擎闭环率：99.2%</span>
          </div>

          <button
            type="button"
            class="px-5 py-1.5 rounded-lg bg-[#102b52] hover:bg-[#153868] text-cyan-300 border border-cyan-500/40 font-semibold transition cursor-pointer"
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
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs select-none"
      @click.self="showWaterQuotaModal = false"
    >
      <div class="bg-[#091b36] border border-[#1b4372] rounded-2xl w-full max-w-4xl max-h-[88vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <!-- Modal Header -->
        <div class="px-6 py-4 bg-[#06152b] border-b border-[#1b4372] flex items-center justify-between shrink-0">
          <div class="flex items-center gap-3">
            <span class="w-3.5 h-3.5 rounded-sm bg-gradient-to-br from-rose-500 to-amber-500 shadow-[0_0_8px_#ef4444]"></span>
            <div>
              <div class="flex items-center gap-2.5">
                <h3 class="text-base font-bold text-white tracking-wide">
                  西宁市区县计划水量与直报水量管控比对
                </h3>
                <span class="px-2 py-0.5 rounded text-[11px] font-bold font-mono bg-rose-500/20 text-rose-300 border border-rose-500/50">
                  {{ exceededDistrictsList.length }} 个区县直报超计划 (已标红)
                </span>
              </div>
              <p class="text-xs text-slate-400 mt-0.5">
                规则联动：在地图区县名称处展示计划与直报水量；若直报水量大于计划水量，相应行政区划边缘自动以红色发光标记
              </p>
            </div>
          </div>
          <button
            type="button"
            class="text-slate-400 hover:text-white transition cursor-pointer p-1.5 rounded-lg hover:bg-white/10"
            @click="showWaterQuotaModal = false"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="flex-1 overflow-y-auto p-5 space-y-4">
          <!-- KPI Summary Strip -->
          <div class="grid grid-cols-4 gap-3">
            <div class="bg-[#0b2142] p-3 rounded-xl border border-cyan-500/30">
              <div class="text-[11px] text-slate-300">全市核定计划总量</div>
              <div class="text-xl font-bold font-mono text-cyan-300 mt-1">
                {{ Object.values(districtWaterQuotaMap).reduce((s, i) => s + i.planned, 0).toFixed(1) }} <span class="text-xs font-normal">万m³</span>
              </div>
            </div>
            <div class="bg-[#0b2142] p-3 rounded-xl border border-sky-500/30">
              <div class="text-[11px] text-slate-300">全市实际直报总量</div>
              <div class="text-xl font-bold font-mono text-sky-300 mt-1">
                {{ Object.values(districtWaterQuotaMap).reduce((s, i) => s + i.reported, 0).toFixed(1) }} <span class="text-xs font-normal">万m³</span>
              </div>
            </div>
            <div class="bg-[#0b2142] p-3 rounded-xl border border-rose-500/40">
              <div class="text-[11px] text-slate-300">直报超计划区县数</div>
              <div class="text-xl font-bold font-mono text-rose-400 mt-1">
                {{ exceededDistrictsList.length }} <span class="text-xs font-normal">个区县 (边缘红标)</span>
              </div>
            </div>
            <div class="bg-[#0b2142] p-3 rounded-xl border border-emerald-500/30">
              <div class="text-[11px] text-slate-300">合规受控区县数</div>
              <div class="text-xl font-bold font-mono text-emerald-400 mt-1">
                {{ 7 - exceededDistrictsList.length }} <span class="text-xs font-normal">个区县 (正常边缘)</span>
              </div>
            </div>
          </div>

          <!-- District Quotas Table -->
          <div class="border border-[#1b4372] rounded-xl overflow-hidden bg-[#061427]">
            <table class="w-full text-left text-xs">
              <thead class="bg-[#081b36] text-slate-300 border-b border-[#1b4372]">
                <tr>
                  <th class="py-2.5 px-3">行政区县</th>
                  <th class="py-2.5 px-2">水量梯级</th>
                  <th class="py-2.5 px-3 text-right">计划水量 (万m³)</th>
                  <th class="py-2.5 px-3 text-right">直报水量 (万m³)</th>
                  <th class="py-2.5 px-3 text-right">差额 (直报-计划)</th>
                  <th class="py-2.5 px-2 text-center">管控状态</th>
                  <th class="py-2.5 px-2 text-center">地图边缘标记</th>
                  <th class="py-2.5 px-3 text-center">动态调节测试</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#1b4372]/60 font-mono">
                <tr
                  v-for="d in Object.values(districtWaterQuotaMap)"
                  :key="d.name"
                  class="transition-colors hover:bg-white/5"
                  :class="d.reported > d.planned ? 'bg-rose-950/20' : ''"
                >
                  <td class="py-2.5 px-3 font-sans font-bold text-white flex items-center gap-1.5">
                    <span
                      class="w-2 h-2 rounded-full"
                      :class="d.reported > d.planned ? 'bg-rose-500' : 'bg-emerald-400'"
                    ></span>
                    <span>{{ d.name }}</span>
                  </td>
                  <td class="py-2.5 px-2 font-sans">
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
                  <td class="py-2.5 px-3 text-right font-bold" :class="d.reported > d.planned ? 'text-rose-400 font-black' : 'text-sky-300'">
                    {{ d.reported.toFixed(1) }}
                  </td>
                  <td class="py-2.5 px-3 text-right font-bold" :class="d.reported > d.planned ? 'text-rose-400' : 'text-emerald-400'">
                    {{ d.reported > d.planned ? '+' + (d.reported - d.planned).toFixed(1) : (d.reported - d.planned).toFixed(1) }}
                  </td>
                  <td class="py-2.5 px-2 text-center font-sans">
                    <span
                      v-if="d.reported > d.planned"
                      class="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/25 text-rose-300 border border-rose-500/60 inline-flex items-center gap-1"
                    >
                      <span class="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>
                      超计划
                    </span>
                    <span
                      v-else
                      class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    >
                      合规安全
                    </span>
                  </td>
                  <td class="py-2.5 px-2 text-center font-sans">
                    <span
                      v-if="d.reported > d.planned"
                      class="text-xs font-bold text-rose-400 flex items-center justify-center gap-1"
                    >
                      <span class="w-2.5 h-1 rounded bg-rose-500 shadow-[0_0_6px_#ef4444]"></span>
                      红色边缘标记
                    </span>
                    <span
                      v-else
                      class="text-xs text-slate-400 flex items-center justify-center gap-1"
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
                        class="px-2 py-0.5 rounded transition cursor-pointer text-[10px] font-bold border ml-1"
                        :class="d.reported > d.planned
                          ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border-emerald-500/40'
                          : 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border-rose-500/40'"
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
          <div class="p-3 bg-[#08182f] border border-cyan-500/30 rounded-xl text-xs text-slate-300 flex items-start gap-2.5">
            <span class="text-cyan-400 font-bold text-sm shrink-0">💡</span>
            <div class="space-y-1 leading-relaxed">
              <div>
                <strong>当前比对规则：</strong>系统针对西宁全域 4区3县（湟中区、大通县、城北区、城东区、城西区、城中区、湟源县）实时计算直报水量与计划水量的管控关系。
              </div>
              <div class="text-slate-400 text-[11px]">
                当 <code class="text-rose-300 bg-black/40 px-1 py-0.5 rounded">直报水量 > 计划水量</code> 时，地图对应的行政区划多边形边缘将采用红色（<span class="text-rose-400 font-bold">#ef4444</span>）发光描边显著高亮，区县中心胶囊显示红底警示标与直报红字；当直报水量受控在计划以内时，恢复为水量梯级色与标准边界。
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="px-6 py-3.5 bg-[#06152b] border-t border-[#1b4372] flex items-center justify-between text-xs shrink-0">
          <button
            type="button"
            class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition cursor-pointer"
            @click="resetDistrictQuotas"
          >
            恢复默认基准数据
          </button>

          <button
            type="button"
            class="px-5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition cursor-pointer shadow-md"
            @click="showWaterQuotaModal = false"
          >
            返回地图查看
          </button>
        </div>
      </div>
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
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
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
  timeRange: '1y',
});

// Layer Toggles (综合场景: 水量使用情况 / 水系脉络 / 行政区划 / 直报超计划红边; 专项场景: 计量点 / 用水户 / 预警事件)
const activeLayers = ref({
  waterUsage: true,   // 综合应用场景：区域水量使用情况图层 (4个等级颜色标记)
  rivers: true,       // 综合应用场景：水系水网脉络
  boundaries: true,   // 综合应用场景：行政区划边界与注记
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
    if (isSelectedOrHovered) return 0.72;
    if (selectedUsageTierFilter.value) {
      if (selectedUsageTierFilter.value === 'exceeded') {
        return isDirectReportExceeded(districtName) ? 0.68 : 0.15;
      }
      const tier = getDistrictTier(districtName);
      if (tier && tier.id === selectedUsageTierFilter.value) return 0.65;
      return 0.16; // 非高亮等级透明淡化
    }
    const tier = getDistrictTier(districtName);
    if (!tier) return 0.35;
    if (tier.id === 'gt100') return 0.58;
    if (tier.id === 'gt70') return 0.48;
    if (tier.id === 'gt50') return 0.42;
    return 0.35;
  }
  return isSelectedOrHovered ? 0.35 : 0.14;
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
]);

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

// 2. 用水时间变化趋势 3项序列: 实际取水 (带面积渐变) / 历史同期 / 许可水量
interface MonthlyTrendItem {
  month: string;
  actual: number;      // 实际取水 (万m³)
  history: number;     // 历史同期 (万m³)
  licensed: number;    // 许可水量 (万m³)
}

const monthlyTrendData = ref<MonthlyTrendItem[]>([
  { month: '1月', actual: 4850, history: 4620, licensed: 7500 },
  { month: '2月', actual: 4320, history: 4180, licensed: 7200 },
  { month: '3月', actual: 6980, history: 6750, licensed: 9800 },
  { month: '4月', actual: 9450, history: 9120, licensed: 12500 },
  { month: '5月', actual: 12850, history: 12400, licensed: 15600 },
  { month: '6月', actual: 14120, history: 13650, licensed: 16800 },
  { month: '7月', actual: 14680, history: 14100, licensed: 17200 },
  { month: '8月', actual: 13950, history: 13520, licensed: 16500 },
  { month: '9月', actual: 10840, history: 10450, licensed: 13800 },
  { month: '10月', actual: 8250, history: 7980, licensed: 11200 },
  { month: '11月', actual: 5920, history: 5740, licensed: 8800 },
  { month: '12月', actual: 5120, history: 4950, licensed: 7800 },
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

// 用水时间变化趋势坐标计算: viewBox="0 0 380 110"
const trendChartData = computed(() => {
  const xStart = 34;
  const xEnd = 366;
  const yBaseline = 90;
  const yTop = 14;
  const maxY = 20000;
  const count = monthlyTrendData.value.length;
  const stepX = (xEnd - xStart) / (count - 1);

  const actualPts = monthlyTrendData.value.map((d, i) => ({
    x: xStart + i * stepX,
    y: yBaseline - (d.actual / maxY) * (yBaseline - yTop),
    val: d.actual,
    item: d
  }));

  const historyPts = monthlyTrendData.value.map((d, i) => ({
    x: xStart + i * stepX,
    y: yBaseline - (d.history / maxY) * (yBaseline - yTop),
    val: d.history,
    item: d
  }));

  const licensedPts = monthlyTrendData.value.map((d, i) => ({
    x: xStart + i * stepX,
    y: yBaseline - (d.licensed / maxY) * (yBaseline - yTop),
    val: d.licensed,
    item: d
  }));

  const actualLine = getSmoothLinePath(actualPts);
  const actualArea = `${actualLine} L ${actualPts[count - 1].x.toFixed(1)},${yBaseline} L ${actualPts[0].x.toFixed(1)},${yBaseline} Z`;
  const historyLine = getSmoothLinePath(historyPts);
  const licensedLine = getSmoothLinePath(licensedPts);

  return {
    actualPts,
    historyPts,
    licensedPts,
    actualLine,
    actualArea,
    historyLine,
    licensedLine,
    yBaseline,
  };
});

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

// 1. 计量设备总体情况
const meterDeviceOverview = ref({
  total: 318,
  online: 284,
  offline: 14,
  fault: 8,
  pending: 12,
  onlineRate: '89.3%',
});

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

const anomalyWorkOrderStatus = ref({
  pending: 5,          // 待处置
  processing: 8,       // 处置中
  revisionNeeded: 4,   // 待水量修订
  completed: 47,       // 已完成
  total: 64,
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
</style>
