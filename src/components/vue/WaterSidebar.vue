<template>
  <aside
    class="w-52 h-full bg-[#2563EB] text-white flex flex-col transition-all duration-300 select-none shrink-0 border-r border-blue-700/50"
  >
    <!-- Navigation Menu Items List (Hidden scrollbar) -->
    <div class="flex-1 overflow-y-auto no-scrollbar py-3 px-2 space-y-0.5 text-xs">
      <!-- 首页 -->
      <button
        type="button"
        @click="selectMenu('home')"
        :class="[
          'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition cursor-pointer text-left',
          activeMenu === 'home'
            ? 'bg-white text-blue-600 font-bold shadow-xs'
            : 'text-white/90 hover:bg-white/10 hover:text-white'
        ]"
      >
        <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
        <span class="truncate">首页</span>
      </button>

      <!-- 一张图 -->
      <button
        type="button"
        @click="selectMenu('map')"
        :class="[
          'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition cursor-pointer text-left',
          activeMenu === 'map'
            ? 'bg-white text-blue-600 font-bold shadow-xs'
            : 'text-white/90 hover:bg-white/10 hover:text-white'
        ]"
      >
        <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
          <line x1="8" y1="2" x2="8" y2="18"></line>
          <line x1="16" y1="6" x2="16" y2="22"></line>
        </svg>
        <span class="truncate">一张图</span>
      </button>

      <!-- 综合应用场景 -->
      <button
        type="button"
        @click="selectMenu('scenarios')"
        :class="[
          'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition cursor-pointer text-left',
          activeMenu === 'scenarios'
            ? 'bg-white text-blue-600 font-bold shadow-xs'
            : 'text-white/90 hover:bg-white/10 hover:text-white'
        ]"
      >
        <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
          <polyline points="2 17 12 22 22 17"></polyline>
          <polyline points="2 12 12 17 22 12"></polyline>
        </svg>
        <span class="truncate">综合应用场景</span>
      </button>

      <!-- 计划用水管理 (Expandable) -->
      <div>
        <button
          type="button"
          @click="isWaterPlanExpanded = !isWaterPlanExpanded"
          class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-white font-medium hover:bg-white/10 transition cursor-pointer text-left"
        >
          <div class="flex items-center gap-2.5 min-w-0">
            <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span class="truncate">计划用水管理</span>
          </div>
          <svg
            :class="['w-3.5 h-3.5 transition-transform duration-200', isWaterPlanExpanded ? 'rotate-180' : '']"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        <!-- Submenu items under 计划用水管理 -->
        <div v-show="isWaterPlanExpanded" class="pl-3 pr-1 py-1 space-y-1">
          <!-- 填报审批 (Active & Clickable!) -->
          <button
            type="button"
            @click="selectMenu('water_plan')"
            :class="[
              'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition cursor-pointer',
              activeMenu === 'water_plan'
                ? 'bg-white text-blue-600 font-bold shadow-xs'
                : 'text-white/85 hover:bg-white/10 hover:text-white'
            ]"
          >
            <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span class="truncate">填报审批</span>
          </button>

          <!-- 计划核定下达 -->
          <button
            type="button"
            @click="selectMenu('water_plan')"
            class="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-white/85 hover:bg-white/10 hover:text-white transition cursor-pointer text-left"
          >
            <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span class="truncate">计划核定下达</span>
          </button>

          <!-- 用水定额管理 -->
          <button
            type="button"
            @click="notifyStub('用水定额管理')"
            class="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-white/85 hover:bg-white/10 hover:text-white transition cursor-pointer text-left"
          >
            <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="20" x2="18" y2="10"></line>
              <line x1="12" y1="20" x2="12" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="14"></line>
            </svg>
            <span class="truncate">用水定额管理</span>
          </button>
        </div>
      </div>

      <!-- 取用水量核算 -->
      <button
        type="button"
        @click="notifyStub('取用水量核算')"
        class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-white/90 hover:bg-white/10 hover:text-white transition cursor-pointer text-left"
      >
        <div class="flex items-center gap-2.5 min-w-0">
          <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="4" y="2" width="16" height="20" rx="2"></rect>
            <line x1="8" y1="6" x2="16" y2="6"></line>
            <line x1="16" y1="14" x2="16" y2="18"></line>
            <path d="M16 10h.01"></path>
            <path d="M12 10h.01"></path>
            <path d="M8 10h.01"></path>
            <path d="M12 14h.01"></path>
            <path d="M8 14h.01"></path>
            <path d="M12 18h.01"></path>
            <path d="M8 18h.01"></path>
          </svg>
          <span class="truncate">取用水量核算</span>
        </div>
        <svg class="w-3.5 h-3.5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      <!-- 数据归集 (可展开子菜单) -->
      <div>
        <button
          type="button"
          @click="isDataCollectionExpanded = !isDataCollectionExpanded"
          class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-white font-medium hover:bg-white/10 transition cursor-pointer text-left"
        >
          <div class="flex items-center gap-2.5 min-w-0">
            <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
            </svg>
            <span class="truncate">数据归集</span>
          </div>
          <svg
            :class="['w-3.5 h-3.5 transition-transform duration-200', isDataCollectionExpanded ? 'rotate-180' : '']"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        <!-- Submenu items under 数据归集 -->
        <div v-show="isDataCollectionExpanded" class="pl-3 pr-1 py-1 space-y-1">
          <!-- 人工归集 (核心新功能页面) -->
          <button
            type="button"
            @click="selectMenu('manual_collection')"
            :class="[
              'w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition cursor-pointer text-xs',
              activeMenu === 'manual_collection'
                ? 'bg-white text-blue-600 font-bold shadow-xs'
                : 'text-white/85 hover:bg-white/10 hover:text-white'
            ]"
          >
            <div class="flex items-center gap-2 min-w-0">
              <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              <span class="truncate">人工归集</span>
            </div>
            <span
              class="px-1.5 py-0.2 rounded-full text-[10px] font-bold"
              :class="activeMenu === 'manual_collection' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/40'"
            >
              非在线
            </span>
          </button>

          <!-- 自动采集监控 -->
          <button
            type="button"
            @click="notifyStub('自动采集监控')"
            class="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-white/85 hover:bg-white/10 hover:text-white transition cursor-pointer text-left text-xs"
          >
            <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
            <span class="truncate">在线自动采集</span>
          </button>
        </div>
      </div>

      <!-- 计量监管 (Expanded by default) -->
      <div>
        <button
          type="button"
          @click="isSupervisionExpanded = !isSupervisionExpanded"
          class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-white font-medium hover:bg-white/10 transition cursor-pointer text-left"
        >
          <div class="flex items-center gap-2.5 min-w-0">
            <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span class="truncate">计量监管</span>
          </div>
          <svg
            :class="['w-3.5 h-3.5 transition-transform duration-200', isSupervisionExpanded ? 'rotate-180' : '']"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        <!-- Submenu items under 计量监管 -->
        <div v-show="isSupervisionExpanded" class="pl-3 pr-1 py-1 space-y-1">
          <!-- 计量审核管理 -->
          <button
            type="button"
            @click="notifyStub('计量审核管理')"
            :class="[
              'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition cursor-pointer',
              activeMenu === 'audit'
                ? 'bg-white text-blue-600 font-bold shadow-xs'
                : 'text-white/85 hover:bg-white/10 hover:text-white'
            ]"
          >
            <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span class="truncate">计量审核管理</span>
          </button>

          <!-- 计量设施管理 (Active in Screenshot!) -->
          <button
            type="button"
            @click="selectMenu('facility_management')"
            :class="[
              'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition cursor-pointer',
              activeMenu === 'facility_management'
                ? 'bg-white text-[#2563EB] font-bold shadow-sm'
                : 'text-white/85 hover:bg-white/10 hover:text-white'
            ]"
          >
            <!-- Droplet/facility icon -->
            <svg class="w-4 h-4 shrink-0" :class="activeMenu === 'facility_management' ? 'text-[#2563EB]' : 'text-white'" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
            <span class="truncate">计量设施管理</span>
          </button>

          <!-- 关联关系维护 -->
          <button
            type="button"
            @click="notifyStub('关联关系维护')"
            class="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-white/85 hover:bg-white/10 hover:text-white transition cursor-pointer text-left"
          >
            <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            <span class="truncate">关联关系维护</span>
          </button>

          <!-- 故障记录 -->
          <button
            type="button"
            @click="selectMenu('fault')"
            :class="[
              'w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-left transition cursor-pointer',
              activeMenu === 'fault'
                ? 'bg-white text-blue-600 font-bold shadow-xs'
                : 'text-white/85 hover:bg-white/10 hover:text-white'
            ]"
          >
            <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span class="truncate">故障记录</span>
          </button>

          <!-- 检定记录 -->
          <button
            type="button"
            @click="notifyStub('检定记录')"
            class="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-white/85 hover:bg-white/10 hover:text-white transition cursor-pointer text-left"
          >
            <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 11l3 3L22 4"></path>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
            </svg>
            <span class="truncate">检定记录</span>
          </button>

          <!-- 停用启用记录 -->
          <button
            type="button"
            @click="notifyStub('停用启用记录')"
            class="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-white/85 hover:bg-white/10 hover:text-white transition cursor-pointer text-left"
          >
            <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="6" width="20" height="12" rx="6"></rect>
              <circle cx="8" cy="12" r="3" fill="currentColor"></circle>
            </svg>
            <span class="truncate">停用启用记录</span>
          </button>

          <!-- 换表记录 -->
          <button
            type="button"
            @click="notifyStub('换表记录')"
            class="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-white/85 hover:bg-white/10 hover:text-white transition cursor-pointer text-left"
          >
            <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
            </svg>
            <span class="truncate">换表记录</span>
          </button>

          <!-- 计量健康状态管理 -->
          <button
            type="button"
            @click="notifyStub('计量健康状态管理')"
            class="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-white/85 hover:bg-white/10 hover:text-white transition cursor-pointer text-left"
          >
            <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span class="truncate">计量健康状态管理</span>
          </button>

          <!-- 计量网格化管理 -->
          <button
            type="button"
            @click="notifyStub('计量网格化管理')"
            class="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-white/85 hover:bg-white/10 hover:text-white transition cursor-pointer text-left"
          >
            <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span class="truncate">计量网格化管理</span>
          </button>
        </div>
      </div>

      <!-- 数据治理 (包含违规问题处理子菜单) -->
      <div>
        <button
          type="button"
          @click="isDataGovernanceExpanded = !isDataGovernanceExpanded"
          class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-white font-medium hover:bg-white/10 transition cursor-pointer text-left"
        >
          <div class="flex items-center gap-2.5 min-w-0">
            <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <polyline points="9 11 12 14 22 4"></polyline>
            </svg>
            <span class="truncate">数据治理</span>
          </div>
          <svg
            :class="['w-3.5 h-3.5 transition-transform duration-200', isDataGovernanceExpanded ? 'rotate-180' : '']"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        <!-- Submenu items under 数据治理 -->
        <div v-show="isDataGovernanceExpanded" class="pl-3 pr-1 py-1 space-y-1">
          <!-- 证照数据治理 -->
          <button
            type="button"
            @click="notifyStub('证照数据治理')"
            class="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-white/85 hover:bg-white/10 hover:text-white transition cursor-pointer text-left"
          >
            <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="16" rx="2"></rect>
              <line x1="7" y1="8" x2="17" y2="8"></line>
              <line x1="7" y1="12" x2="13" y2="12"></line>
            </svg>
            <span class="truncate">证照数据治理</span>
          </button>

          <!-- 取水计量数据治理 -->
          <button
            type="button"
            @click="notifyStub('取水计量数据治理')"
            class="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-white/85 hover:bg-white/10 hover:text-white transition cursor-pointer text-left"
          >
            <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 14 14"></polyline>
            </svg>
            <span class="truncate">取水计量数据治理</span>
          </button>
        </div>
      </div>

      <!-- 数据规范整合 (Expandable) -->
      <div>
        <button
          type="button"
          @click="isDataIntegrationExpanded = !isDataIntegrationExpanded"
          class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-white font-medium hover:bg-white/10 transition cursor-pointer text-left"
        >
          <div class="flex items-center gap-2.5 min-w-0">
            <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="4" y1="21" x2="4" y2="14"></line>
              <line x1="4" y1="10" x2="4" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="3"></line>
              <line x1="20" y1="21" x2="20" y2="16"></line>
              <line x1="20" y1="12" x2="20" y2="3"></line>
              <line x1="1" y1="14" x2="7" y2="14"></line>
              <line x1="9" y1="8" x2="15" y2="8"></line>
              <line x1="17" y1="16" x2="23" y2="16"></line>
            </svg>
            <span class="truncate">数据规范整合</span>
          </div>
          <svg
            :class="['w-3.5 h-3.5 transition-transform duration-200', isDataIntegrationExpanded ? 'rotate-180' : '']"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        <!-- Submenu items under 数据规范整合 -->
        <div v-show="isDataIntegrationExpanded" class="pl-3 pr-1 py-1 space-y-1">
          <!-- 一户一档 (功能菜单) -->
          <button
            type="button"
            @click="selectMenu('enterprise_dossier')"
            :class="[
              'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition cursor-pointer',
              activeMenu === 'enterprise_dossier'
                ? 'bg-white text-blue-600 font-bold shadow-xs'
                : 'text-white/85 hover:bg-white/10 hover:text-white'
            ]"
          >
            <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <circle cx="10" cy="9" r="1.5"></circle>
            </svg>
            <span class="truncate">一户一档</span>
          </button>
        </div>
      </div>

      <!-- 数据质量控制 (Expandable Group with 2nd & 3rd submenus) -->
      <div>
        <button
          type="button"
          @click="isQualityControlExpanded = !isQualityControlExpanded"
          class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-white font-medium hover:bg-white/10 transition cursor-pointer text-left"
        >
          <div class="flex items-center gap-2.5 min-w-0">
            <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <polyline points="9 11 12 14 22 4"></polyline>
            </svg>
            <span class="truncate">数据质量控制</span>
          </div>
          <svg
            :class="['w-3.5 h-3.5 transition-transform duration-200', isQualityControlExpanded ? 'rotate-180' : '']"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        <!-- Submenu items under 数据质量控制 (二级子菜单栏) -->
        <div v-show="isQualityControlExpanded" class="pl-2 pr-1 py-1 space-y-1">
          <!-- 1. 告警处置 (二级菜单，含三级菜单) -->
          <div class="rounded-lg bg-white/5 border border-white/10 p-1">
            <button
              type="button"
              @click="isAlarmExpanded = !isAlarmExpanded"
              class="w-full flex items-center justify-between px-2 py-1.5 rounded text-white font-medium hover:bg-white/10 transition cursor-pointer text-left text-[11.5px]"
            >
              <div class="flex items-center gap-2 min-w-0">
                <svg class="w-3.5 h-3.5 shrink-0 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                <span class="truncate">告警处置</span>
              </div>
              <svg
                :class="['w-3 h-3 transition-transform duration-200 opacity-80', isAlarmExpanded ? 'rotate-180' : '']"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            <!-- 三级菜单: 告警工单、告警明细 -->
            <div v-show="isAlarmExpanded" class="pl-2.5 pr-1 py-1 space-y-0.5 border-l-2 border-white/20 ml-2 mt-0.5">
              <!-- 告警工单 -->
              <button
                type="button"
                @click="selectMenu('alarm_work_order')"
                :class="[
                  'w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-left transition cursor-pointer text-[11px]',
                  activeMenu === 'alarm_work_order'
                    ? 'bg-white text-blue-600 font-bold shadow-xs'
                    : 'text-white/85 hover:bg-white/10 hover:text-white'
                ]"
              >
                <svg class="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                <span class="truncate">告警工单</span>
              </button>

              <!-- 告警明细 -->
              <button
                type="button"
                @click="selectMenu('alarm_detail')"
                :class="[
                  'w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-left transition cursor-pointer text-[11px]',
                  activeMenu === 'alarm_detail'
                    ? 'bg-white text-blue-600 font-bold shadow-xs'
                    : 'text-white/85 hover:bg-white/10 hover:text-white'
                ]"
              >
                <svg class="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
                <span class="truncate">告警明细</span>
              </button>
            </div>
          </div>

          <!-- 2. 水量数据修订 (二级菜单，直接访问) -->
          <button
            type="button"
            @click="selectMenu('water_data_revision')"
            :class="[
              'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition cursor-pointer text-[11.5px] font-medium',
              activeMenu === 'water_data_revision'
                ? 'bg-white text-[#2563EB] font-bold shadow-xs'
                : 'text-white/90 hover:bg-white/10 hover:text-white'
            ]"
          >
            <svg class="w-3.5 h-3.5 shrink-0" :class="activeMenu === 'water_data_revision' ? 'text-[#2563EB]' : 'text-cyan-300'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            <span class="truncate">水量数据修订</span>
          </button>

          <!-- 3. 违规问题排查 (二级菜单，含三级菜单) -->
          <div class="rounded-lg bg-white/5 border border-white/10 p-1">
            <button
              type="button"
              @click="isViolationExpanded = !isViolationExpanded"
              class="w-full flex items-center justify-between px-2 py-1.5 rounded text-white font-medium hover:bg-white/10 transition cursor-pointer text-left text-[11.5px]"
            >
              <div class="flex items-center gap-2 min-w-0">
                <svg class="w-3.5 h-3.5 shrink-0 text-rose-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                <span class="truncate">违规问题排查</span>
              </div>
              <svg
                :class="['w-3 h-3 transition-transform duration-200 opacity-80', isViolationExpanded ? 'rotate-180' : '']"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            <!-- 三级菜单: 违规问题处理（全国）、违规问题处理（省级） -->
            <div v-show="isViolationExpanded" class="pl-2.5 pr-1 py-1 space-y-0.5 border-l-2 border-white/20 ml-2 mt-0.5">
              <!-- 违规问题处理（全国） -->
              <button
                type="button"
                @click="selectMenu('violation_national')"
                :class="[
                  'w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-left transition cursor-pointer text-[11px]',
                  activeMenu === 'violation_national' || activeMenu === 'violation_handling'
                    ? 'bg-white text-blue-600 font-bold shadow-xs'
                    : 'text-white/85 hover:bg-white/10 hover:text-white'
                ]"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></span>
                <span class="truncate">违规问题处理（全国）</span>
              </button>

              <!-- 违规问题处理（省级） -->
              <button
                type="button"
                @click="selectMenu('violation_provincial')"
                :class="[
                  'w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-left transition cursor-pointer text-[11px]',
                  activeMenu === 'violation_provincial'
                    ? 'bg-white text-blue-600 font-bold shadow-xs'
                    : 'text-white/85 hover:bg-white/10 hover:text-white'
                ]"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                <span class="truncate">违规问题处理（省级）</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 系统配置 -->
      <button
        type="button"
        @click="notifyStub('系统配置')"
        class="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/90 hover:bg-white/10 hover:text-white transition cursor-pointer text-left"
      >
        <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
        <span class="truncate">系统配置</span>
      </button>
    </div>

    <!-- Bottom Footer -->
    <div class="py-2.5 px-4 text-[11px] text-white/70 text-center border-t border-blue-600/40 shrink-0">
      西宁水务局 © 2026
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';

const props = defineProps<{
  activeMenu: string;
}>();

const emit = defineEmits<{
  (e: 'select-menu', menu: string): void;
}>();

const isSupervisionExpanded = ref(true);
const isWaterPlanExpanded = ref(true);
const isDataCollectionExpanded = ref(true);
const isDataGovernanceExpanded = ref(false);
const isDataIntegrationExpanded = ref(true);
const isQualityControlExpanded = ref(true);
const isAlarmExpanded = ref(true);
const isViolationExpanded = ref(true);

watch(
  () => props.activeMenu,
  (menu) => {
    if (menu === 'manual_collection') {
      isDataCollectionExpanded.value = true;
    }
    if (menu === 'enterprise_dossier') {
      isDataIntegrationExpanded.value = true;
    }
    if (['alarm_work_order', 'alarm_detail', 'water_data_revision', 'violation_national', 'violation_provincial', 'violation_handling'].includes(menu)) {
      isQualityControlExpanded.value = true;
      if (['alarm_work_order', 'alarm_detail'].includes(menu)) {
        isAlarmExpanded.value = true;
      }
      if (['violation_national', 'violation_provincial', 'violation_handling'].includes(menu)) {
        isViolationExpanded.value = true;
      }
    }
  },
  { immediate: true }
);

const selectMenu = (menu: string) => {
  emit('select-menu', menu);
};

const notifyStub = (name: string) => {
  MessagePlugin.info(`已切换至【${name}】模块`);
};
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}
.no-scrollbar {
  -ms-overflow-style: none !important;
  scrollbar-width: none !important;
}
</style>
