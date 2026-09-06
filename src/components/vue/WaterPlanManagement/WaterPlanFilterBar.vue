<template>
  <div class="bg-white rounded-lg p-3 border border-[#b4c7e0] shadow-2xs text-xs select-none space-y-3">
    <!-- Top Filter Inputs Container (与计量设施管理页面严格一致的平铺网格与自适应换行，无分割线) -->
    <div class="flex flex-wrap items-center gap-2.5">
      <!-- 1. 用水户类型单选组 (完全同计量设施管理页面的查询方式单选框样式) -->
      <div class="flex items-center gap-3 px-2 py-1 bg-[#f8fafc] rounded border border-[#b8cde6] text-gray-700 shrink-0">
        <span class="text-gray-500">用水户类型:</span>
        <label class="inline-flex items-center gap-1 cursor-pointer hover:text-gray-900">
          <input
            type="radio"
            name="planQueryUserType"
            value="all"
            v-model="filterParams.userType"
            class="accent-[#1677ff] cursor-pointer"
            @change="$emit('search')"
          />
          <span :class="filterParams.userType === 'all' ? 'text-[#1677ff] font-medium' : ''">全部</span>
        </label>
        <label class="inline-flex items-center gap-1.5 cursor-pointer hover:text-gray-900">
          <input
            type="radio"
            name="planQueryUserType"
            value="permit"
            v-model="filterParams.userType"
            class="accent-[#1677ff] cursor-pointer"
            @change="$emit('search')"
          />
          <span :class="filterParams.userType === 'permit' ? 'text-[#1677ff] font-medium' : ''">取水许可单位</span>
        </label>
        <label class="inline-flex items-center gap-1.5 cursor-pointer hover:text-gray-900">
          <input
            type="radio"
            name="planQueryUserType"
            value="public_supply"
            v-model="filterParams.userType"
            class="accent-[#1677ff] cursor-pointer"
            @change="$emit('search')"
          />
          <span :class="filterParams.userType === 'public_supply' ? 'text-[#1677ff] font-medium' : ''">公共供水单位</span>
        </label>
      </div>

      <!-- 2. 请输入取用水户名称 (宽 190px，同计量设施管理规范) -->
      <div class="relative w-[190px] shrink-0">
        <input
          v-model="filterParams.waterUserName"
          type="text"
          placeholder="请输入取用水户名称/代码"
          class="w-full pl-2.5 pr-6 py-1.5 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#1677ff] transition placeholder-gray-400 text-gray-800"
          @keydown.enter="$emit('search')"
        />
        <button
          v-if="filterParams.waterUserName"
          type="button"
          @click="clearField('waterUserName')"
          class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5"
          title="清空"
        >
          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- 3. 请输入取水许可编号 (宽 190px，同计量设施管理规范) -->
      <div class="relative w-[190px] shrink-0">
        <input
          v-model="filterParams.permitNumber"
          type="text"
          placeholder="请输入取水许可编号"
          class="w-full pl-2.5 pr-6 py-1.5 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#1677ff] transition placeholder-gray-400 text-gray-800 font-mono"
          @keydown.enter="$emit('search')"
        />
        <button
          v-if="filterParams.permitNumber"
          type="button"
          @click="clearField('permitNumber')"
          class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5"
          title="清空"
        >
          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- 4. 审批状态: 请选择 (CustomSelect 宽 180px) -->
      <CustomSelect
        v-model="filterParams.status"
        :options="[
          { value: '', label: '审批状态: 全部' },
          { value: '县级待审核', label: '县级待审核', badge: 'true', badgeColor: 'bg-blue-500' },
          { value: '市级待审核', label: '市级待审核', badge: 'true', badgeColor: 'bg-blue-600' },
          { value: '省级待审核', label: '省级待审核', badge: 'true', badgeColor: 'bg-purple-500' },
          { value: '审核通过', label: '审核通过', badge: 'true', badgeColor: 'bg-emerald-500' },
          { value: '审核驳回', label: '审核驳回', badge: 'true', badgeColor: 'bg-rose-500' },
          { value: '已下达计划', label: '已下达计划', badge: 'true', badgeColor: 'bg-cyan-500' },
          { value: '报备中', label: '报备中', badge: 'true', badgeColor: 'bg-amber-500' },
          { value: '计划重新下达', label: '计划重新下达', badge: 'true', badgeColor: 'bg-slate-500' },
        ]"
        placeholder="审批状态: 请选择"
        customClass="w-[180px] shrink-0"
        @change="$emit('search')"
      />

      <!-- 5. 事项类型: 请选择 (CustomSelect 宽 180px) -->
      <CustomSelect
        v-model="filterParams.itemType"
        :options="[
          { value: '', label: '事项类型: 全部' },
          { value: '首次填报', label: '首次填报' },
          { value: '年计划调整', label: '年计划调整' },
          { value: '月计划调整', label: '月计划调整' },
        ]"
        placeholder="事项类型: 请选择"
        customClass="w-[180px] shrink-0"
        @change="$emit('search')"
      />

      <!-- 6. 行业类型: 请选择 (CustomSelect 宽 180px) -->
      <CustomSelect
        v-model="filterParams.industryType"
        :options="[
          { value: '', label: '行业类型: 全部' },
          { value: '工业', label: '工业行业' },
          { value: '4.有色', label: '4.有色金属冶炼' },
          { value: '电力', label: '电力热力生产' },
          { value: '制造', label: '装备制造业' },
          { value: '农业', label: '现代生态农业' },
          { value: '建筑业', label: '建筑与市政' },
          { value: '服务业', label: '现代商业服务' },
        ]"
        placeholder="行业类型: 请选择"
        customClass="w-[180px] shrink-0"
        @change="$emit('search')"
      />

      <!-- 高级展开筛选字段 (与计量设施管理页面高级筛选布局一致) -->
      <template v-if="isExpanded">
        <!-- 7. 查询年份 -->
        <CustomSelect
          v-model="filterParams.year"
          :options="[
            { value: '2026', label: '申报年度: 2026年' },
            { value: '2025', label: '申报年度: 2025年' },
            { value: '2024', label: '申报年度: 2024年' },
            { value: '2023', label: '申报年度: 2023年' },
          ]"
          placeholder="申报年度: 请选择"
          customClass="w-[180px] shrink-0"
          @change="$emit('search')"
        />

        <!-- 8. 是否自备水源取水 -->
        <CustomSelect
          v-model="filterParams.isSelfWaterSource"
          :options="[
            { value: '', label: '自备水源取水: 全部' },
            { value: '是', label: '自备水源 (是)' },
            { value: '否', label: '公共管网 (否)' },
          ]"
          placeholder="自备水源取水: 请选择"
          customClass="w-[180px] shrink-0"
          @change="$emit('search')"
        />

        <!-- 9. 取水类型 -->
        <CustomSelect
          v-model="filterParams.waterIntakeType"
          :options="[
            { value: '', label: '取水类型: 全部' },
            { value: '水资源配置类', label: '水资源配置类' },
            { value: '河道内生产类', label: '河道内生产类' },
            { value: '基础设施或公用事业类', label: '基础设施或公用事业类' },
            { value: '自备水源类', label: '自备水源类' },
          ]"
          placeholder="取水类型: 请选择"
          customClass="w-[180px] shrink-0"
          @change="$emit('search')"
        />

        <!-- 10. 上级主管部门 -->
        <div class="relative w-[190px] shrink-0">
          <input
            v-model="filterParams.supervisorUnit"
            type="text"
            placeholder="请输入上级主管部门"
            class="w-full pl-2.5 pr-6 py-1.5 text-xs rounded border border-[#b8cde6] bg-[#f8fafc] focus:bg-white focus:outline-none focus:border-[#1677ff] transition placeholder-gray-400 text-gray-800"
            @keydown.enter="$emit('search')"
          />
          <button
            v-if="filterParams.supervisorUnit"
            type="button"
            @click="clearField('supervisorUnit')"
            class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5"
            title="清空"
          >
            <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- 11. 重点监督单位 -->
        <CustomSelect
          v-model="filterParams.keySupervisionUnit"
          :options="[
            { value: '', label: '重点监督单位: 全部' },
            { value: '重点', label: '重点监管单位', badge: 'true', badgeColor: 'bg-amber-500' },
            { value: '非重点', label: '一般监管单位', badge: 'true', badgeColor: 'bg-slate-400' },
          ]"
          placeholder="重点监督单位: 请选择"
          customClass="w-[180px] shrink-0"
          @change="$emit('search')"
        />

        <!-- 12. 直管类型 -->
        <CustomSelect
          v-model="filterParams.directManageType"
          :options="[
            { value: '', label: '直管类型: 全部' },
            { value: '流域管理机构', label: '流域管理机构' },
            { value: '省级', label: '省级' },
            { value: '市级', label: '市级' },
            { value: '县级', label: '县级' },
          ]"
          placeholder="直管类型: 请选择"
          customClass="w-[180px] shrink-0"
          @change="$emit('search')"
        />

        <!-- 13. 是否规上 -->
        <CustomSelect
          v-model="filterParams.isAboveDesignatedSize"
          :options="[
            { value: '', label: '是否规上: 全部' },
            { value: '是', label: '规模以上企业 (是)' },
            { value: '否', label: '非规模以上 (否)' },
          ]"
          placeholder="是否规上: 请选择"
          customClass="w-[180px] shrink-0"
          @change="$emit('search')"
        />

        <!-- 14. 许可水量规模 -->
        <CustomSelect
          v-model="filterParams.permitVolumeFilter"
          :options="[
            { value: '', label: '许可水量规模: 全部' },
            { value: '0-50', label: '≤ 50 万m³' },
            { value: '50-100', label: '50 ~ 100 万m³' },
            { value: '100-200', label: '100 ~ 200 万m³' },
            { value: '>200', label: '> 200 万m³' },
          ]"
          placeholder="许可水量规模: 请选择"
          customClass="w-[180px] shrink-0"
          @change="$emit('search')"
        />

        <!-- 15. 计划水量规模 -->
        <CustomSelect
          v-model="filterParams.planVolumeFilter"
          :options="[
            { value: '', label: '计划水量规模: 全部' },
            { value: '0-50', label: '≤ 50 万m³' },
            { value: '50-100', label: '50 ~ 100 万m³' },
            { value: '100-200', label: '100 ~ 200 万m³' },
            { value: '>200', label: '> 200 万m³' },
          ]"
          placeholder="计划水量规模: 请选择"
          customClass="w-[180px] shrink-0"
          @change="$emit('search')"
        />

        <!-- 16. 地表水配置 -->
        <CustomSelect
          v-model="filterParams.surfaceWaterFilter"
          :options="[
            { value: '', label: '地表水源: 全部' },
            { value: '有', label: '有地表水配置' },
            { value: '无', label: '无地表水' },
          ]"
          placeholder="地表水源: 请选择"
          customClass="w-[180px] shrink-0"
          @change="$emit('search')"
        />

        <!-- 17. 地下水配置 -->
        <CustomSelect
          v-model="filterParams.groundwaterFilter"
          :options="[
            { value: '', label: '地下水源: 全部' },
            { value: '有', label: '有地下水配置' },
            { value: '无', label: '无地下水' },
          ]"
          placeholder="地下水源: 请选择"
          customClass="w-[180px] shrink-0"
          @change="$emit('search')"
        />

        <!-- 18. 非常规水配置 -->
        <CustomSelect
          v-model="filterParams.unconventionalFilter"
          :options="[
            { value: '', label: '非常规水源: 全部' },
            { value: '有', label: '有非常规水配置' },
            { value: '无', label: '无非常规水' },
          ]"
          placeholder="非常规水源: 请选择"
          customClass="w-[180px] shrink-0"
          @change="$emit('search')"
        />
      </template>
    </div>

    <!-- Bottom Action Row (严格与计量设施管理保持一致的排布与颜色规范) -->
    <div class="flex flex-wrap items-center justify-between gap-2 pt-1">
      <!-- Left: 按钮集合 -->
      <div class="flex flex-wrap items-center gap-2">
        <!-- 1. 查询 (亮纯蓝 #1677ff) -->
        <button
          type="button"
          @click="$emit('search')"
          class="px-4 py-1.5 rounded bg-[#1677ff] hover:bg-blue-600 text-white font-medium flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
        >
          <svg class="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <span>查询</span>
        </button>

        <!-- 2. 重置 (微淡蓝背景 + 蓝字) -->
        <button
          type="button"
          @click="$emit('reset')"
          class="px-3.5 py-1.5 rounded bg-[#f0f5fe] text-[#1677ff] border border-[#d2e2fa] hover:bg-blue-100/50 font-medium flex items-center gap-1.5 transition cursor-pointer"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
          </svg>
          <span>重置</span>
        </button>

        <!-- 3. + 计划用水申报填报 (统一为与新增计量设施一致的高饱和亮蓝 #1677ff) -->
        <button
          type="button"
          @click="$emit('add-report')"
          class="px-3.5 py-1.5 rounded bg-[#1677ff] hover:bg-blue-600 text-white font-medium flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>计划用水申报填报</span>
        </button>

        <!-- 4. 导出 (翠绿) -->
        <button
          type="button"
          @click="$emit('export-data')"
          class="px-3.5 py-1.5 rounded bg-[#00a854] hover:bg-emerald-600 text-white font-medium flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          <span>导出</span>
        </button>

        <!-- 5. 水量单位说明 (亮蓝) -->
        <div class="flex items-center gap-1.5 ml-1 px-2.5 py-1 rounded bg-blue-50/60 border border-blue-100 text-[#1677ff] font-medium text-xs">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <span>水量单位：万m³</span>
        </div>
      </div>

      <!-- Right: 展开/收起高级筛选 -->
      <div>
        <button
          type="button"
          @click="isExpanded = !isExpanded"
          class="text-[#1677ff] hover:text-blue-700 font-medium flex items-center gap-1 cursor-pointer text-xs"
        >
          <span>{{ isExpanded ? '收起高级筛选' : '展开高级筛选' }}</span>
          <svg
            :class="['w-3.5 h-3.5 transition-transform duration-200', isExpanded ? 'rotate-180' : '']"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { WaterPlanFilterParams } from '../../../types';
import CustomSelect from '../CustomSelect.vue';

const props = defineProps<{
  filterParams: WaterPlanFilterParams;
}>();

const emit = defineEmits<{
  (e: 'search'): void;
  (e: 'reset'): void;
  (e: 'export-data'): void;
  (e: 'add-report'): void;
}>();

const isExpanded = ref(false);

const clearField = (field: keyof WaterPlanFilterParams) => {
  (props.filterParams as any)[field] = '';
  emit('search');
};
</script>
