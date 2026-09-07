<template>
  <!-- 遮罩层：样式同违规问题处理弹窗 (ViolationDetailModal.vue) 一致 -->
  <div
    v-if="visible && facility"
    class="fixed inset-0 z-60 flex items-center justify-center bg-black/45 p-4 backdrop-blur-2xs select-none"
    @click.self="handleClose"
  >
    <!-- 弹窗主体容器：浅色顶栏、精致边框与投影、居中大宽度自适应布局 -->
    <div
      class="bg-white rounded-xl shadow-2xl border border-slate-200/90 w-full max-w-[1240px] my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]"
    >
      <!-- 1. 浅色顶部标题栏 (Light Header)：浅灰蓝背景、精致微光与底边分割线 -->
      <div class="px-6 py-3.5 bg-[#f8fafc] border-b border-slate-200/80 flex items-center justify-between shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1677ff] shadow-2xs">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
            </svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-[15px] font-semibold text-slate-800 tracking-wide">计量设施全生命周期详情</h3>
              <span
                class="px-2 py-0.5 rounded text-[11px] font-medium border"
                :class="[
                  facility.status === '正常'
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                    : facility.status === '故障'
                    ? 'bg-rose-50 text-rose-600 border-rose-200'
                    : 'bg-slate-100 text-slate-600 border-slate-200'
                ]"
              >
                {{ facility.status }}
              </span>
              <span class="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-50 text-blue-600 border border-blue-200">
                {{ facility.code }}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          @click="handleClose"
          class="text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition cursor-pointer p-1.5 rounded-lg -mr-1"
          title="关闭"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- 2. 精品导航 Tab 切换栏 (基本信息 / 取水工程 / 所属证照 / 故障记录 / 停用启用 / 检定记录 / 换表记录) -->
      <div class="bg-white border-b border-slate-200/90 px-6 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 select-none">
        <button
          v-for="tab in tabList"
          :key="tab.key"
          type="button"
          @click="activeTab = tab.key"
          class="flex items-center gap-2 py-3 px-3 text-xs font-medium border-b-2 transition-all whitespace-nowrap cursor-pointer"
          :class="[
            activeTab === tab.key
              ? 'border-[#1677ff] text-[#1677ff] font-semibold bg-blue-50/40'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
          ]"
        >
          <component :is="tab.icon" class="w-3.5 h-3.5 shrink-0" />
          <span>{{ tab.label }}</span>
          <span
            v-if="tab.badge !== undefined"
            class="px-1.5 py-0.2 rounded-full text-[10px] font-mono"
            :class="activeTab === tab.key ? 'bg-blue-100 text-[#1677ff]' : 'bg-slate-100 text-slate-500'"
          >
            {{ tab.badge }}
          </span>
        </button>
      </div>

      <!-- 3. 内容滚动区：样式同违规问题处理详情卡片 -->
      <div class="p-3.5 overflow-y-auto space-y-2.5 text-xs text-slate-800 custom-scrollbar flex-1 bg-[#f8fafc]/50">
        
        <!-- Tab 1: 基本信息 -->
        <div v-if="activeTab === 'basic'" class="space-y-2.5 animate-in fade-in duration-150">
          <!-- 1.1 计量设施基本参数及安装位置 (合并卡片) -->
          <div class="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
            <div class="flex items-center justify-between border-b border-slate-100 pb-2">
              <div class="flex items-center gap-2">
                <span class="w-1 h-3.5 bg-[#1677ff] rounded-full"></span>
                <span class="text-[14px] font-bold text-slate-800">计量设施基本参数及安装位置</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-[11px] text-slate-400">
                  档案状态：
                  <span :class="facility.isArchived ? 'text-emerald-600 font-medium' : 'text-amber-600 font-medium'">
                    {{ facility.isArchived ? '已归档（档案完备）' : '待补录补充附件' }}
                  </span>
                </span>
                <span class="text-[11px] px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200 font-mono">
                  器具编码: {{ facility.code }}
                </span>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-[12.5px]">
              <!-- 1. 行政区划 -->
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">行政区划</span>
                <span class="text-slate-800 font-medium">青海省 · 西宁市 · {{ facility.district }}</span>
              </div>

              <!-- 2. 取水权人 -->
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">取水权人</span>
                <span class="text-slate-800 font-medium leading-relaxed truncate" :title="facility.waterOwner">{{ facility.waterOwner }}</span>
              </div>

              <!-- 3. 关联证照 -->
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">关联证照</span>
                <span class="text-slate-800 font-mono font-medium bg-slate-50 px-2 py-0.5 rounded border border-slate-200/60 truncate" :title="facility.permitNumber">
                  {{ facility.permitNumber }}
                </span>
              </div>

              <!-- 4. 计量设施(器具)编号 -->
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">计量设施(器具)编号</span>
                <span class="text-slate-800 font-mono font-medium">{{ facility.code }}</span>
              </div>

              <!-- 5. 计量设施名称 -->
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">计量设施名称</span>
                <span class="text-slate-800 font-medium leading-relaxed">{{ facility.name }}</span>
              </div>

              <!-- 6. 监测点编码 -->
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">监测点编码</span>
                <span class="text-slate-800 font-mono">{{ facility.monitorPointCode || 'MP-6301-0082' }}</span>
              </div>

              <!-- 7. 监测站名称 -->
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">监测站名称</span>
                <span class="text-slate-800 font-medium">{{ facility.stationName || (facility.name + '遥测监测站') }}</span>
              </div>

              <!-- 8. 取水口 -->
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">取水口</span>
                <span class="text-slate-800 font-medium">{{ facility.waterIntake || '1号引水泵站进水口' }}</span>
              </div>

              <!-- 9. 规格型号 -->
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">规格型号</span>
                <span class="text-slate-800 font-mono font-medium">{{ facility.specModel }}</span>
              </div>

              <!-- 10. 计量器具类型 -->
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">计量器具类型</span>
                <span class="text-slate-800 font-medium">{{ facility.facilityType }}</span>
              </div>

              <!-- 11. 计量方式 -->
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">计量方式</span>
                <span class="text-slate-800 font-medium">{{ facility.meteringMethod }}</span>
              </div>

              <!-- 12. 管径大小 -->
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">管径大小</span>
                <span class="text-slate-800 font-mono font-medium">{{ facility.pipeDiameter || 'DN150 (150mm)' }}</span>
              </div>

              <!-- 13. 测量范围 -->
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">测量范围</span>
                <span class="text-slate-800 font-mono">{{ facility.measuringRange || '0.8 ~ 360 m³/h' }}</span>
              </div>

              <!-- 14. 一次性计量纲 -->
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">一次性计量纲</span>
                <span class="text-slate-800 font-mono font-medium">{{ facility.meteringDimension || 'm³ (立方米)' }}</span>
              </div>

              <!-- 15. 水源类型 -->
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">水源类型</span>
                <span class="text-slate-800 font-medium">{{ facility.waterSourceType }}</span>
              </div>

              <!-- 16. 取水用途 -->
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">取水用途</span>
                <span class="text-slate-800 font-medium">{{ facility.waterUsage }}</span>
              </div>

              <!-- 17. 日最大取水量 -->
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">日最大取水量</span>
                <span class="text-slate-800 font-mono font-medium text-[#1677ff]">{{ facility.maxDailyWater || '4,500 m³/d' }}</span>
              </div>

              <!-- 18. 安装类型 -->
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">安装类型</span>
                <span class="text-slate-800 font-medium">{{ facility.installType || '井下管道法兰连接' }}</span>
              </div>

              <!-- 19. 安装形式 -->
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">安装形式</span>
                <span class="text-slate-800 font-medium">{{ facility.installForm || '水平安装' }}</span>
              </div>

              <!-- 20. 传输方式 -->
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">传输方式</span>
                <span class="text-slate-800 font-medium">{{ facility.transmissionMethod }}</span>
              </div>

              <!-- 21. 上报方式 -->
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">上报方式</span>
                <span class="text-slate-800 font-medium">{{ facility.reportMethod }}</span>
              </div>

              <!-- 22. 数据来源类型 -->
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">数据来源类型</span>
                <span class="text-slate-800 font-medium">{{ facility.dataSourceType || facility.dataSource || '自建遥测物联直传' }}</span>
              </div>

              <!-- 23. 安装时间 -->
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">安装时间</span>
                <span class="text-slate-800 font-mono">{{ facility.installDate || '2024-09-15' }}</span>
              </div>

              <!-- 24. 经纬度 -->
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">经纬度</span>
                <span class="text-slate-800 font-mono">{{ facility.coordinates || '东经 101°48′22.4″, 北纬 36°38′15.1″' }}</span>
              </div>

              <!-- 25. 安装具体位置 (占2列便于完整展示详细地址) -->
              <div class="md:col-span-2 lg:col-span-3 flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">安装位置</span>
                <span class="text-slate-800 font-medium leading-relaxed">{{ facility.address || '青海省西宁市东川工业园区开元路水表监测井' }}</span>
              </div>
            </div>
          </div>

          <!-- 1.2 管理及运维单位 -->
          <div class="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
            <div class="flex items-center justify-between border-b border-slate-100 pb-2">
              <div class="flex items-center gap-2">
                <span class="w-1 h-3.5 bg-[#1677ff] rounded-full"></span>
                <span class="text-[14px] font-bold text-slate-800">管理及运维单位</span>
              </div>
              <span class="text-[11px] text-slate-400 font-mono">中央资金年份：{{ facility.fundingYear }} 年</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-[12.5px]">
              <!-- 管理单位 -->
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">管理单位</span>
                <span class="text-slate-800 font-medium">{{ facility.manageUnit || ('西宁市水务局' + (facility.district ? facility.district + '水务所' : '水资源管理中心')) }}</span>
              </div>

              <!-- 承建单位 -->
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">承建单位</span>
                <span class="text-slate-800 font-medium">{{ facility.builderUnit || '中水北方勘测设计水利水工工程局' }}</span>
              </div>

              <!-- 运维单位 -->
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">运维单位</span>
                <span class="text-slate-800 font-medium">{{ facility.maintainUnit || '西宁智慧水务科技有限公司' }}</span>
              </div>

              <!-- 运维截止日期 -->
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">运维截止日期</span>
                <span class="text-slate-800 font-mono font-medium text-blue-600">{{ facility.maintainExpiryDate || '2027-12-31' }}</span>
              </div>

              <!-- 中央资金年份 -->
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">中央资金年份</span>
                <span class="text-slate-800 font-mono">{{ facility.fundingYear }} 年</span>
              </div>

              <!-- 最新检定时间 -->
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">最新检定时间</span>
                <span class="text-slate-800 font-mono font-medium">{{ facility.lastCalibrationTime || '2025-05-18' }}</span>
              </div>

              <!-- 下次检定日期 -->
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">下次检定日期</span>
                <span class="text-slate-800 font-mono font-medium text-emerald-600">{{ facility.nextCalibrationDate || facility.calibrationExpiryDate || '2027-05-17' }}</span>
              </div>

              <!-- 运维责任人 -->
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">运维责任人</span>
                <span class="text-slate-800 font-medium">{{ facility.maintainPerson || '李工 (13897128841)' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab 2: 取水工程 -->
        <div v-else-if="activeTab === 'project'" class="space-y-2.5 animate-in fade-in duration-150">
          <div class="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
            <div class="flex items-center justify-between border-b border-slate-100 pb-2">
              <div class="flex items-center gap-2">
                <span class="w-1 h-3.5 bg-[#1677ff] rounded-full"></span>
                <span class="text-[14px] font-bold text-slate-800">关联取水工程基本信息</span>
              </div>
              <span class="text-[11px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded border border-blue-200">
                工程代码：WPE-630102-2024-0028
              </span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-[12.5px]">
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">取水工程名称</span>
                <span class="text-slate-800 font-medium">{{ facility.name }}配套取水泵站工程</span>
              </div>
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">工程建设类型</span>
                <span class="text-slate-800 font-medium">提水引水泵站与地下水管井综合工程</span>
              </div>
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">水源类型</span>
                <span class="text-slate-800 font-medium">{{ facility.waterSourceType }}</span>
              </div>
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">取水水源水系</span>
                <span class="text-slate-800 font-medium">黄河流域 · 湟水河水系主干流</span>
              </div>
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">设计年取水量</span>
                <span class="text-slate-800 font-mono font-medium">120.00 万m³/年</span>
              </div>
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">最大日取水能力</span>
                <span class="text-slate-800 font-mono font-medium">4,500 m³/日</span>
              </div>
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">取水地点</span>
                <span class="text-slate-800 font-medium">{{ facility.address || '西宁市东川经济技术开发区水源地' }}</span>
              </div>
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">工程竣工投运日期</span>
                <span class="text-slate-800 font-mono">2023-11-20</span>
              </div>
            </div>
          </div>

          <!-- 机电与管网配置 -->
          <div class="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
            <div class="flex items-center justify-between border-b border-slate-100 pb-2">
              <div class="flex items-center gap-2">
                <span class="w-1 h-3.5 bg-[#1677ff] rounded-full"></span>
                <span class="text-[14px] font-bold text-slate-800">提水水泵及管线设施</span>
              </div>
              <span class="text-[11px] text-slate-400">运行工况平稳</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-[12.5px]">
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">主抽水泵组</span>
                <span class="text-slate-800 font-mono">2用1备 (共3台, 单机 45kW)</span>
              </div>
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">进出水管径</span>
                <span class="text-slate-800 font-mono">DN200 聚乙烯防腐钢管</span>
              </div>
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">输水管线全长</span>
                <span class="text-slate-800 font-mono">1.65 公里</span>
              </div>
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">工程运行状况</span>
                <span class="text-emerald-600 font-medium">正常运行</span>
              </div>
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">日常巡查周期</span>
                <span class="text-slate-800">每周 2 次现场排查</span>
              </div>
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">安全管理责任人</span>
                <span class="text-slate-800">马主任 (13997015523)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab 3: 所属证照 -->
        <div v-else-if="activeTab === 'permit'" class="space-y-2.5 animate-in fade-in duration-150">
          <div class="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
            <div class="flex items-center justify-between border-b border-slate-100 pb-2">
              <div class="flex items-center gap-2">
                <span class="w-1 h-3.5 bg-[#1677ff] rounded-full"></span>
                <span class="text-[14px] font-bold text-slate-800">取水许可证信息</span>
              </div>
              <span class="inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11.5px] font-medium">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                许可有效存续中
              </span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-[12.5px]">
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">取水许可证编号</span>
                <span class="text-slate-800 font-medium font-mono bg-slate-50 px-2 py-0.5 rounded border border-slate-200/60">
                  {{ facility.permitNumber }}
                </span>
              </div>
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">发证机关</span>
                <span class="text-slate-800 font-medium">西宁市水务局</span>
              </div>
              <div class="md:col-span-2 flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">取水权人全称</span>
                <span class="text-slate-800 font-medium text-sm text-blue-900">{{ facility.waterOwner }}</span>
              </div>
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">统一社会信用代码</span>
                <span class="text-slate-800 font-mono font-medium">91630100MA75ABCD88</span>
              </div>
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">法定代表人</span>
                <span class="text-slate-800 font-medium">张建国</span>
              </div>
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">有效起始日期</span>
                <span class="text-slate-800 font-mono">2024-01-01</span>
              </div>
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">有效截止日期</span>
                <span class="text-slate-800 font-mono font-medium text-emerald-600">2029-12-31</span>
              </div>
            </div>
          </div>

          <!-- 水量控制指标与额度执行 -->
          <div class="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
            <div class="flex items-center justify-between border-b border-slate-100 pb-2">
              <div class="flex items-center gap-2">
                <span class="w-1 h-3.5 bg-[#1677ff] rounded-full"></span>
                <span class="text-[14px] font-bold text-slate-800">年许可控制指标与执行进度</span>
              </div>
              <span class="text-[11px] text-slate-400">核定年度：2026年度</span>
            </div>

            <div class="space-y-3">
              <div class="flex items-center justify-between text-xs">
                <div>
                  <span class="text-slate-500">年许可取水量：</span>
                  <span class="font-bold text-slate-800 font-mono text-sm">120.00</span>
                  <span class="text-slate-400 text-[11px]"> 万m³</span>
                </div>
                <div>
                  <span class="text-slate-500">当年累计取水量：</span>
                  <span class="font-bold text-[#1677ff] font-mono text-sm">68.45</span>
                  <span class="text-slate-400 text-[11px]"> 万m³ (占比 57.0%)</span>
                </div>
                <div>
                  <span class="text-slate-500">剩余可用指标：</span>
                  <span class="font-bold text-emerald-600 font-mono text-sm">51.55</span>
                  <span class="text-slate-400 text-[11px]"> 万m³</span>
                </div>
              </div>

              <!-- 进度条 -->
              <div class="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div class="bg-blue-600 h-full rounded-full transition-all duration-500" style="width: 57%"></div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-[12.5px] pt-2">
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">取水用途类别</span>
                <span class="text-slate-800 font-medium">{{ facility.waterUsage }}</span>
              </div>
              <div class="flex items-baseline">
                <span class="w-32 shrink-0 text-slate-400 font-normal">水资源论证意见</span>
                <span class="text-slate-800 font-mono">青水资审[2023]第042号 (符合水资源双控)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab 4: 故障记录 -->
        <div v-else-if="activeTab === 'fault'" class="space-y-2.5 animate-in fade-in duration-150">
          <div class="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
            <div class="flex items-center justify-between border-b border-slate-100 pb-2">
              <div class="flex items-center gap-2">
                <span class="w-1 h-3.5 bg-[#1677ff] rounded-full"></span>
                <span class="text-[14px] font-bold text-slate-800">历史故障与报修记录台账</span>
              </div>
              <div class="text-[11px] text-slate-500">
                累计工单：<span class="font-bold text-[#1677ff] font-mono">2</span> 条 · 已修复：<span class="font-bold text-emerald-600 font-mono">2</span> 条
              </div>
            </div>

            <!-- 故障表格 -->
            <div class="overflow-x-auto rounded-lg border border-[#b8cde6]">
              <table class="w-full text-left text-xs border-collapse">
                <thead class="bg-[#eaf1fb] text-slate-700 font-semibold border-b border-[#a6c1e2]">
                  <tr>
                    <th class="p-2.5 text-center w-12 border-r border-[#b8cde6]">序号</th>
                    <th class="p-2.5 min-w-[130px] border-r border-[#b8cde6]">故障工单编号</th>
                    <th class="p-2.5 min-w-[120px] border-r border-[#b8cde6]">发生时间</th>
                    <th class="p-2.5 min-w-[110px] border-r border-[#b8cde6]">故障类型</th>
                    <th class="p-2.5 min-w-[100px] border-r border-[#b8cde6]">故障表底数</th>
                    <th class="p-2.5 min-w-[160px] border-r border-[#b8cde6]">现象描述与排查情况</th>
                    <th class="p-2.5 min-w-[90px] border-r border-[#b8cde6]">处理状态</th>
                    <th class="p-2.5 min-w-[120px] border-r border-[#b8cde6]">修复时间</th>
                    <th class="p-2.5 min-w-[90px] border-r border-[#b8cde6]">维修责任人</th>
                    <th class="p-2.5 text-center w-24">佐证附件</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200">
                  <tr v-for="(fault, fIdx) in mockFacilityFaults" :key="fault.id" class="hover:bg-[#f5f8fd] transition">
                    <td class="p-2.5 text-center font-mono text-slate-500 border-r border-[#c4d8ee]">{{ fIdx + 1 }}</td>
                    <td class="p-2.5 font-mono text-blue-600 font-medium border-r border-[#c4d8ee]">{{ fault.code }}</td>
                    <td class="p-2.5 font-mono text-slate-600 border-r border-[#c4d8ee]">{{ fault.time }}</td>
                    <td class="p-2.5 border-r border-[#c4d8ee]">
                      <span class="px-2 py-0.5 rounded bg-rose-50 text-rose-600 text-[11px] border border-rose-200">
                        {{ fault.type }}
                      </span>
                    </td>
                    <td class="p-2.5 font-mono font-bold text-slate-800 border-r border-[#c4d8ee]">{{ fault.reading }} m³</td>
                    <td class="p-2.5 text-slate-700 max-w-[200px] truncate border-r border-[#c4d8ee]" :title="fault.desc">
                      {{ fault.desc }}
                    </td>
                    <td class="p-2.5 border-r border-[#c4d8ee]">
                      <span class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 text-[11px] font-medium border border-emerald-200">
                        {{ fault.status }}
                      </span>
                    </td>
                    <td class="p-2.5 font-mono text-slate-500 border-r border-[#c4d8ee]">{{ fault.finishTime }}</td>
                    <td class="p-2.5 text-slate-700 border-r border-[#c4d8ee]">{{ fault.engineer }}</td>
                    <td class="p-2.5 text-center">
                      <button
                        type="button"
                        @click="previewMediaModal('现场维修佐证照片', fault.img)"
                        class="text-[#1677ff] hover:text-blue-700 cursor-pointer font-medium"
                      >
                        查看照片
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Tab 5: 停用启用 -->
        <div v-else-if="activeTab === 'toggle'" class="space-y-2.5 animate-in fade-in duration-150">
          <div class="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
            <div class="flex items-center justify-between border-b border-slate-100 pb-2">
              <div class="flex items-center gap-2">
                <span class="w-1 h-3.5 bg-[#1677ff] rounded-full"></span>
                <span class="text-[14px] font-bold text-slate-800">当前启用状态与控制</span>
              </div>
              <span
                class="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                :class="facility.status === '正常' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'"
              >
                当前系统识别状态：{{ facility.status }}
              </span>
            </div>

            <!-- 当前状态提示卡 -->
            <div class="p-4 rounded-lg bg-blue-50/50 border border-blue-100 flex items-start gap-3">
              <div class="p-2 rounded-lg bg-blue-100 text-[#1677ff] shrink-0 mt-0.5">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div class="space-y-1">
                <div class="text-sm font-bold text-blue-900">计量设施在网状态受水利法监督</div>
                <div class="text-xs text-blue-700 leading-relaxed">
                  任何计划性检修、季节性停产或设施拆装停用，均须提前 3 个工作日向西宁市水务局提交《取水计量设施停用/封存申请书》，经现场铅封并备案后方可停用；恢复通水前需申请启封复核。
                </div>
              </div>
            </div>

            <!-- 停用启用全生命周期审批流转历史 -->
            <div class="pt-2">
              <div class="text-xs font-bold text-slate-800 mb-3 flex items-center gap-1.5">
                <span>停用 / 启封流转历史履历</span>
                <span class="text-[10px] text-slate-400 font-mono">（共 2 次流转记录）</span>
              </div>

              <div class="overflow-x-auto rounded-lg border border-[#b8cde6]">
                <table class="w-full text-left text-xs border-collapse">
                  <thead class="bg-[#eaf1fb] text-slate-700 font-semibold border-b border-[#a6c1e2]">
                    <tr>
                      <th class="p-2.5 text-center w-12 border-r border-[#b8cde6]">序号</th>
                      <th class="p-2.5 min-w-[90px] border-r border-[#b8cde6]">变更类型</th>
                      <th class="p-2.5 min-w-[120px] border-r border-[#b8cde6]">申请时间</th>
                      <th class="p-2.5 min-w-[120px] border-r border-[#b8cde6]">生效时间</th>
                      <th class="p-2.5 min-w-[100px] border-r border-[#b8cde6]">经办人员</th>
                      <th class="p-2.5 min-w-[160px] border-r border-[#b8cde6]">停用 / 启用原因说明</th>
                      <th class="p-2.5 min-w-[110px] border-r border-[#b8cde6]">关阀铅封编号</th>
                      <th class="p-2.5 min-w-[90px] border-r border-[#b8cde6]">审批结果</th>
                      <th class="p-2.5 text-center w-24">佐证凭证</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-200">
                    <tr class="hover:bg-[#f5f8fd] transition">
                      <td class="p-2.5 text-center font-mono text-slate-500 border-r border-[#c4d8ee]">1</td>
                      <td class="p-2.5 border-r border-[#c4d8ee]">
                        <span class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 font-medium text-[11px] border border-emerald-200">恢复启用</span>
                      </td>
                      <td class="p-2.5 font-mono text-slate-600 border-r border-[#c4d8ee]">2026-03-01 09:15</td>
                      <td class="p-2.5 font-mono text-slate-600 border-r border-[#c4d8ee]">2026-03-02 00:00</td>
                      <td class="p-2.5 text-slate-700 border-r border-[#c4d8ee]">王建民 (水务科)</td>
                      <td class="p-2.5 text-slate-700 border-r border-[#c4d8ee]">冬季防冻停水结束，春灌与工业供水复产恢复启封</td>
                      <td class="p-2.5 font-mono text-slate-600 border-r border-[#c4d8ee]">QF-6301-2026-018</td>
                      <td class="p-2.5 text-emerald-600 font-medium border-r border-[#c4d8ee]">已核验启封</td>
                      <td class="p-2.5 text-center">
                        <button type="button" @click="previewMediaModal('启封核查现场单', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800')" class="text-[#1677ff] hover:underline">
                          查看材料
                        </button>
                      </td>
                    </tr>
                    <tr class="hover:bg-[#f5f8fd] transition">
                      <td class="p-2.5 text-center font-mono text-slate-500 border-r border-[#c4d8ee]">2</td>
                      <td class="p-2.5 border-r border-[#c4d8ee]">
                        <span class="px-2 py-0.5 rounded bg-amber-50 text-amber-600 font-medium text-[11px] border border-amber-200">计划性停用</span>
                      </td>
                      <td class="p-2.5 font-mono text-slate-600 border-r border-[#c4d8ee]">2025-12-15 14:30</td>
                      <td class="p-2.5 font-mono text-slate-600 border-r border-[#c4d8ee]">2025-12-16 00:00</td>
                      <td class="p-2.5 text-slate-700 border-r border-[#c4d8ee]">张主管</td>
                      <td class="p-2.5 text-slate-700 border-r border-[#c4d8ee]">冬季严寒排空防冻胀裂，现场关阀铅封</td>
                      <td class="p-2.5 font-mono text-slate-600 border-r border-[#c4d8ee]">QF-6301-2025-092</td>
                      <td class="p-2.5 text-slate-700 border-r border-[#c4d8ee]">审批通过 (备案)</td>
                      <td class="p-2.5 text-center">
                        <button type="button" @click="previewMediaModal('停用申请审批表', 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800')" class="text-[#1677ff] hover:underline">
                          查看材料
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab 6: 检定记录 -->
        <div v-else-if="activeTab === 'calibration'" class="space-y-2.5 animate-in fade-in duration-150">
          <div class="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
            <div class="flex items-center justify-between border-b border-slate-100 pb-2">
              <div class="flex items-center gap-2">
                <span class="w-1 h-3.5 bg-[#1677ff] rounded-full"></span>
                <span class="text-[14px] font-bold text-slate-800">计量器具法定周期检定档案</span>
              </div>
              <div class="flex items-center gap-2 text-[11.5px]">
                <span class="text-slate-400">法定检定周期：</span>
                <span class="font-bold text-slate-700 font-mono">24 个月 / 次</span>
                <span class="inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-medium">
                  检定有效中
                </span>
              </div>
            </div>

            <!-- 检定周期倒计时小卡 -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div class="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div class="text-[11px] text-slate-400">最近法定检定日期</div>
                <div class="font-bold font-mono text-slate-800 mt-1 text-sm">
                  {{ facility.lastCalibrationTime || '2025-05-18' }}
                </div>
              </div>
              <div class="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div class="text-[11px] text-slate-400">检定有效期截止日</div>
                <div class="font-bold font-mono text-emerald-600 mt-1 text-sm">
                  {{ facility.calibrationExpiryDate || '2027-05-17' }}
                </div>
              </div>
              <div class="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div class="text-[11px] text-slate-400">剩余合规有效期</div>
                <div class="font-bold font-mono text-blue-600 mt-1 text-sm">
                  619 天 (合规在保)
                </div>
              </div>
            </div>

            <!-- 历史检定表格 -->
            <div class="overflow-x-auto rounded-lg border border-[#b8cde6] mt-2">
              <table class="w-full text-left text-xs border-collapse">
                <thead class="bg-[#eaf1fb] text-slate-700 font-semibold border-b border-[#a6c1e2]">
                  <tr>
                    <th class="p-2.5 text-center w-12 border-r border-[#b8cde6]">序号</th>
                    <th class="p-2.5 min-w-[140px] border-r border-[#b8cde6]">检定证书编号</th>
                    <th class="p-2.5 min-w-[110px] border-r border-[#b8cde6]">检定日期</th>
                    <th class="p-2.5 min-w-[110px] border-r border-[#b8cde6]">有效期截止</th>
                    <th class="p-2.5 min-w-[160px] border-r border-[#b8cde6]">法定检定机构</th>
                    <th class="p-2.5 min-w-[140px] border-r border-[#b8cde6]">检定规程依据</th>
                    <th class="p-2.5 min-w-[80px] border-r border-[#b8cde6]">相对误差</th>
                    <th class="p-2.5 min-w-[80px] border-r border-[#b8cde6]">检定结论</th>
                    <th class="p-2.5 min-w-[90px] border-r border-[#b8cde6]">主检人员</th>
                    <th class="p-2.5 text-center w-24">证书原件</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200">
                  <tr class="hover:bg-[#f5f8fd] transition">
                    <td class="p-2.5 text-center font-mono text-slate-500 border-r border-[#c4d8ee]">1</td>
                    <td class="p-2.5 font-mono text-blue-600 font-medium border-r border-[#c4d8ee]">青计检[2025]字第08821号</td>
                    <td class="p-2.5 font-mono text-slate-700 border-r border-[#c4d8ee]">2025-05-18</td>
                    <td class="p-2.5 font-mono text-emerald-600 font-medium border-r border-[#c4d8ee]">2027-05-17</td>
                    <td class="p-2.5 text-slate-700 border-r border-[#c4d8ee]">青海省计量检定测试院</td>
                    <td class="p-2.5 text-slate-600 font-mono border-r border-[#c4d8ee]">JJG 1033-2007</td>
                    <td class="p-2.5 font-mono text-slate-700 border-r border-[#c4d8ee]">+0.28%</td>
                    <td class="p-2.5 border-r border-[#c4d8ee]">
                      <span class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 font-medium text-[11px] border border-emerald-200">
                        合格
                      </span>
                    </td>
                    <td class="p-2.5 text-slate-700 border-r border-[#c4d8ee]">马晓明 / 审核:刘强</td>
                    <td class="p-2.5 text-center">
                      <button type="button" @click="previewMediaModal('计量检定证书扫描件', 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800')" class="text-[#1677ff] hover:underline">
                        查看证书
                      </button>
                    </td>
                  </tr>
                  <tr class="hover:bg-[#f5f8fd] transition">
                    <td class="p-2.5 text-center font-mono text-slate-500 border-r border-[#c4d8ee]">2</td>
                    <td class="p-2.5 font-mono text-blue-600 font-medium border-r border-[#c4d8ee]">青计检[2023]字第04192号</td>
                    <td class="p-2.5 font-mono text-slate-700 border-r border-[#c4d8ee]">2023-05-19</td>
                    <td class="p-2.5 font-mono text-slate-500 border-r border-[#c4d8ee]">2025-05-18</td>
                    <td class="p-2.5 text-slate-700 border-r border-[#c4d8ee]">青海省计量检定测试院</td>
                    <td class="p-2.5 text-slate-600 font-mono border-r border-[#c4d8ee]">JJG 1033-2007</td>
                    <td class="p-2.5 font-mono text-slate-700 border-r border-[#c4d8ee]">-0.35%</td>
                    <td class="p-2.5 border-r border-[#c4d8ee]">
                      <span class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 font-medium text-[11px] border border-emerald-200">
                        合格
                      </span>
                    </td>
                    <td class="p-2.5 text-slate-700 border-r border-[#c4d8ee]">何工 / 审核:刘强</td>
                    <td class="p-2.5 text-center">
                      <button type="button" @click="previewMediaModal('历史计量检定证书', 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800')" class="text-[#1677ff] hover:underline">
                        查看证书
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Tab 7: 换表记录 -->
        <div v-else-if="activeTab === 'replace'" class="space-y-2.5 animate-in fade-in duration-150">
          <div class="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-2xs space-y-2">
            <div class="flex items-center justify-between border-b border-slate-100 pb-2">
              <div class="flex items-center gap-2">
                <span class="w-1 h-3.5 bg-[#1677ff] rounded-full"></span>
                <span class="text-[14px] font-bold text-slate-800">水表轮换与新旧交接台账</span>
              </div>
              <div class="text-[11px] text-slate-400">
                当前在役表已稳定运行：<span class="font-mono text-[#1677ff] font-bold">1.3</span> 年
              </div>
            </div>

            <!-- 换表台账表格 -->
            <div class="overflow-x-auto rounded-lg border border-[#b8cde6]">
              <table class="w-full text-left text-xs border-collapse">
                <thead class="bg-[#eaf1fb] text-slate-700 font-semibold border-b border-[#a6c1e2]">
                  <tr>
                    <th class="p-2.5 text-center w-12 border-r border-[#b8cde6]">序号</th>
                    <th class="p-2.5 min-w-[130px] border-r border-[#b8cde6]">换表工单号</th>
                    <th class="p-2.5 min-w-[110px] border-r border-[#b8cde6]">实施换表日期</th>
                    <th class="p-2.5 min-w-[120px] border-r border-[#b8cde6]">旧表编号</th>
                    <th class="p-2.5 min-w-[110px] border-r border-[#b8cde6]">旧表拆除止码</th>
                    <th class="p-2.5 min-w-[120px] border-r border-[#b8cde6]">新表编号</th>
                    <th class="p-2.5 min-w-[100px] border-r border-[#b8cde6]">新表安装起码</th>
                    <th class="p-2.5 min-w-[140px] border-r border-[#b8cde6]">换表原因</th>
                    <th class="p-2.5 min-w-[90px] border-r border-[#b8cde6]">施工负责人</th>
                    <th class="p-2.5 min-w-[90px] border-r border-[#b8cde6]">水利验收人</th>
                    <th class="p-2.5 text-center w-24">交接单据</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200">
                  <tr class="hover:bg-[#f5f8fd] transition">
                    <td class="p-2.5 text-center font-mono text-slate-500 border-r border-[#c4d8ee]">1</td>
                    <td class="p-2.5 font-mono text-blue-600 font-medium border-r border-[#c4d8ee]">HB-202409-002</td>
                    <td class="p-2.5 font-mono text-slate-700 border-r border-[#c4d8ee]">2024-09-12</td>
                    <td class="p-2.5 font-mono text-slate-500 border-r border-[#c4d8ee]">630102008819</td>
                    <td class="p-2.5 font-mono font-bold text-slate-800 border-r border-[#c4d8ee]">82,410 m³</td>
                    <td class="p-2.5 font-mono font-bold text-emerald-600 border-r border-[#c4d8ee]">{{ facility.code }}</td>
                    <td class="p-2.5 font-mono font-bold text-emerald-600 border-r border-[#c4d8ee]">0.00 m³</td>
                    <td class="p-2.5 text-slate-700 border-r border-[#c4d8ee]">表具达到6年法定周期轮换，升级无线电磁水表</td>
                    <td class="p-2.5 text-slate-700 border-r border-[#c4d8ee]">周工程师</td>
                    <td class="p-2.5 text-slate-700 border-r border-[#c4d8ee]">赵科长 (水务局)</td>
                    <td class="p-2.5 text-center">
                      <button type="button" @click="previewMediaModal('换表交接与铅封单据', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800')" class="text-[#1677ff] hover:underline">
                        查看单据
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      <!-- 4. 浅色底部操作栏 (Light Footer)：提示说明与操作按钮，样式与违规详情完全一致 -->
      <div class="px-5 py-2.5 bg-[#f8fafc] border-t border-slate-200/80 flex items-center justify-between shrink-0">
        <div class="text-xs text-slate-500 flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-[#1677ff]"></span>
          <span>提示：该计量设施已接入西宁市水资源遥测专网，并向全国取水许可监管系统实时核验到报。</span>
        </div>
        <div class="flex items-center gap-2.5">
          <button
            type="button"
            @click="handleExportArchive"
            class="px-3.5 py-1.5 rounded-md text-xs font-medium text-white bg-[#1677ff] hover:bg-blue-600 transition shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            导出全生命周期档案
          </button>
          <button
            type="button"
            @click="handleClose"
            class="px-4 py-1.5 rounded-md text-xs font-medium text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 hover:text-slate-800 transition cursor-pointer"
          >
            关闭
          </button>
        </div>
      </div>
    </div>

    <!-- 凭证材料放大预览子弹窗 -->
    <div
      v-if="previewModalVisible"
      class="fixed inset-0 z-70 flex items-center justify-center bg-black/60 p-4"
      @click.self="previewModalVisible = false"
    >
      <div class="bg-white rounded-xl shadow-2xl max-w-xl w-full p-5 space-y-3 animate-in fade-in zoom-in-95">
        <div class="flex items-center justify-between border-b border-slate-100 pb-2">
          <div class="font-bold text-sm text-slate-800">{{ previewTitle }}</div>
          <button type="button" @click="previewModalVisible = false" class="p-1 text-slate-400 hover:text-slate-700 rounded">
            ✕
          </button>
        </div>
        <div class="rounded-lg overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center min-h-[260px]">
          <img
            :src="previewImgUrl"
            :alt="previewTitle"
            class="max-h-[380px] w-auto object-contain"
            referrerpolicy="no-referrer"
          />
        </div>
        <div class="flex justify-end pt-1">
          <button
            type="button"
            @click="previewModalVisible = false"
            class="px-4 py-1.5 bg-[#1677ff] text-white rounded text-xs hover:bg-blue-600 transition"
          >
            关闭预览
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type { WaterFacility } from '../../types';

const props = defineProps<{
  visible: boolean;
  facility: WaterFacility | null;
}>();

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void;
  (e: 'close'): void;
}>();

// Tab 状态：基本信息、取水工程、所属证照、故障记录、停用启用、检定记录、换表记录
const activeTab = ref<'basic' | 'project' | 'permit' | 'fault' | 'toggle' | 'calibration' | 'replace'>('basic');

// 图标简易组件函数 (采用纯 SVG)
const createIcon = (svgPaths: string[]) => {
  return () => h('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }, svgPaths.map(d => h('path', { d })));
};

// 7 个 Tab 定义
const tabList = [
  {
    key: 'basic' as const,
    label: '基本信息',
    icon: createIcon(['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6', 'M16 13H8', 'M16 17H8']),
  },
  {
    key: 'project' as const,
    label: '取水工程',
    icon: createIcon(['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M9 22V12h6v10']),
  },
  {
    key: 'permit' as const,
    label: '所属证照',
    icon: createIcon(['M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z', 'M22 6l-10 7L2 6']),
  },
  {
    key: 'fault' as const,
    label: '故障记录',
    badge: 2,
    icon: createIcon(['M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z', 'M12 9v4', 'M12 17h.01']),
  },
  {
    key: 'toggle' as const,
    label: '停用启用',
    badge: 2,
    icon: createIcon(['M18.36 6.64a9 9 0 1 1-12.73 0', 'M12 2v10']),
  },
  {
    key: 'calibration' as const,
    label: '检定记录',
    badge: 2,
    icon: createIcon(['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', 'M9 12l2 2 4-4']),
  },
  {
    key: 'replace' as const,
    label: '换表记录',
    badge: 1,
    icon: createIcon(['M23 4v6h-6', 'M1 20v-6h6', 'M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15']),
  },
];

// 模拟设施故障数据
const mockFacilityFaults = [
  {
    id: 'f1',
    code: 'GZ-202607-009',
    time: '2026-07-14 09:20',
    type: '传感器离线',
    reading: 42150,
    desc: 'NB-IoT 物联通讯信号偶发性中断，现场测试为天线接头松动氧化',
    status: '已修复',
    finishTime: '2026-07-14 16:30',
    engineer: '刘工程师',
    img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
  },
  {
    id: 'f2',
    code: 'GZ-202511-031',
    time: '2025-11-03 14:10',
    type: '供电电池欠压',
    reading: 28900,
    desc: '连续阴雨导致太阳能蓄电池电压跌破3.3V，已现场更换大容量耐低温锂电池组',
    status: '已修复',
    finishTime: '2025-11-04 11:00',
    engineer: '张师傅',
    img: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800',
  },
];

// 图片/材料预览弹窗
const previewModalVisible = ref(false);
const previewTitle = ref('');
const previewImgUrl = ref('');

const previewMediaModal = (title: string, url: string) => {
  previewTitle.value = title;
  previewImgUrl.value = url;
  previewModalVisible.value = true;
};

// 关闭操作
const handleClose = () => {
  emit('update:visible', false);
  emit('close');
};

// 导出档案
const handleExportArchive = () => {
  MessagePlugin.success(`已生成【${props.facility?.name}】全生命周期档案 PDF 并开始导出`);
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f8fafc;
}

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
