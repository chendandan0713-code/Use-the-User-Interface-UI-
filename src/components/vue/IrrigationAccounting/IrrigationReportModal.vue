<template>
  <t-dialog
    v-model:visible="dialogVisible"
    :header="isEdit ? '修改小型灌区农业取用水量核算填报' : '县级小型灌区农业取用水量核算填报'"
    width="860px"
    :footer="false"
    :close-on-overlay-click="false"
  >
    <div class="space-y-4 max-h-[75vh] overflow-y-auto pr-1 text-xs select-none">
      <!-- Top banner prompt -->
      <div class="bg-blue-50/80 border border-blue-200/80 p-3 rounded-xl flex items-start gap-2.5">
        <svg class="w-4 h-4 text-blue-600 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        <div class="text-[11.5px] text-blue-900 leading-relaxed">
          <span class="font-bold">填报指引：</span>
          小型灌区核算以<strong>【取水许可证照】</strong>为基准维度，支持<strong>【按月进行逐月核算填报】</strong>。县级完成农业用水量7项明细及其中地下水量填报并提交后，将流转至市水务局进行初审、省水利厅进行终审入库。
        </div>
      </div>

      <!-- Section 1: 证照与灌区选择 (证照维度) -->
      <div class="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
        <div class="font-bold text-slate-800 text-xs flex items-center gap-1.5 mb-2.5">
          <span class="w-1.5 h-3.5 rounded-full bg-blue-600"></span>
          <span>一、关联取水许可证照信息（证照维度）</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <!-- 1. 选择许可证 -->
          <div class="col-span-1 sm:col-span-2">
            <label class="block text-slate-600 mb-1 font-medium">
              选择取水许可证号 <span class="text-rose-500">*</span>
            </label>
            <select
              v-model="formData.licenseId"
              @change="handleLicenseChange"
              :disabled="isEdit"
              class="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 font-mono disabled:bg-slate-100 cursor-pointer"
            >
              <option value="" disabled>-- 请选择小型灌区取水许可证 --</option>
              <option
                v-for="lic in licenses"
                :key="lic.id"
                :value="lic.id"
              >
                {{ lic.permitNumber }} - {{ lic.irrigationName }} ({{ lic.district }})
              </option>
            </select>
          </div>

          <!-- 2. 所属区县 -->
          <div>
            <label class="block text-slate-600 mb-1 font-medium">所属区县</label>
            <input
              type="text"
              :value="currentLicense?.district || ''"
              disabled
              placeholder="自动带出"
              class="w-full bg-slate-100 border border-slate-200 rounded-md px-2.5 py-1.5 text-xs text-slate-700"
            />
          </div>

          <!-- 3. 灌区名称 -->
          <div>
            <label class="block text-slate-600 mb-1 font-medium">小型灌区名称</label>
            <input
              type="text"
              :value="currentLicense?.irrigationName || ''"
              disabled
              placeholder="自动带出"
              class="w-full bg-slate-100 border border-slate-200 rounded-md px-2.5 py-1.5 text-xs text-slate-700 font-semibold"
            />
          </div>

          <!-- 4. 取水权人 / 供水单位 -->
          <div>
            <label class="block text-slate-600 mb-1 font-medium">取水权人 / 管理主体</label>
            <input
              type="text"
              :value="currentLicense?.waterOwner || ''"
              disabled
              placeholder="自动带出"
              class="w-full bg-slate-100 border border-slate-200 rounded-md px-2.5 py-1.5 text-xs text-slate-700 truncate"
            />
          </div>

          <!-- 5. 水源类型与指标 -->
          <div>
            <label class="block text-slate-600 mb-1 font-medium">核准水源与年许可量</label>
            <input
              type="text"
              :value="currentLicense ? `${currentLicense.waterSourceType} | 年许可: ${currentLicense.annualQuota}万m³` : ''"
              disabled
              placeholder="自动带出"
              class="w-full bg-slate-100 border border-slate-200 rounded-md px-2.5 py-1.5 text-xs text-slate-700"
            />
          </div>
        </div>
      </div>

      <!-- Section 2: 核算期次选择 (按月填报) -->
      <div class="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
        <div class="font-bold text-slate-800 text-xs flex items-center gap-1.5 mb-2.5">
          <span class="w-1.5 h-3.5 rounded-full bg-blue-600"></span>
          <span>二、核算时间期次（支持按月填报）</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="block text-slate-600 mb-1 font-medium">核算年份 <span class="text-rose-500">*</span></label>
            <select
              v-model="formData.year"
              :disabled="isEdit"
              class="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer disabled:bg-slate-100"
            >
              <option :value="2026">2026 年</option>
              <option :value="2025">2025 年</option>
              <option :value="2024">2024 年</option>
            </select>
          </div>

          <div>
            <label class="block text-slate-600 mb-1 font-medium">核算月份 <span class="text-rose-500">*</span></label>
            <select
              v-model="formData.month"
              :disabled="isEdit"
              class="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer disabled:bg-slate-100 font-semibold text-blue-700"
            >
              <option :value="3">03 月 (2026春灌期)</option>
              <option :value="2">02 月</option>
              <option :value="1">01 月</option>
              <option :value="4">04 月</option>
              <option :value="5">05 月</option>
              <option :value="6">06 月</option>
              <option :value="7">07 月</option>
              <option :value="8">08 月</option>
              <option :value="9">09 月</option>
              <option :value="10">10 月</option>
              <option :value="11">11 月</option>
              <option :value="12">12 月</option>
            </select>
          </div>

          <div>
            <label class="block text-slate-600 mb-1 font-medium">核算期次标识</label>
            <div class="h-8 flex items-center px-3 rounded-md bg-blue-50 text-blue-800 font-mono font-bold border border-blue-200">
              {{ formData.year }}年{{ String(formData.month).padStart(2, '0') }}月
            </div>
          </div>
        </div>
      </div>

      <!-- Section 3: 农业用水量核算填报核心表格 (七项分类及小计、其中取用地下) -->
      <div class="bg-white p-3.5 rounded-xl border-2 border-blue-200/90 shadow-2xs">
        <div class="flex flex-wrap items-center justify-between gap-2 pb-2 mb-3 border-b border-slate-200">
          <div class="font-bold text-slate-900 text-sm flex items-center gap-2">
            <span class="w-2 h-4 rounded bg-blue-600"></span>
            <span>三、农业用水量填报表（法定核算项）</span>
          </div>
          <div class="text-[11px] text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 font-medium">
            计量单位：<strong>万m³</strong> (换算比：1 万m³ = 10,000 立方米)
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          <!-- (一) 耕地灌溉 -->
          <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <label class="block text-slate-700 font-semibold mb-1 flex items-center justify-between">
              <span>(一) 耕地灌溉 <span class="text-rose-500">*</span></span>
              <span class="text-[10.5px] text-slate-400 font-normal">粮食/蔬菜大田</span>
            </label>
            <div class="relative flex items-center">
              <input
                v-model.number="formData.waterData.farmland"
                type="number"
                step="0.01"
                min="0"
                class="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-xs text-slate-900 font-mono font-bold focus:outline-none focus:border-blue-500"
                placeholder="0.00"
              />
              <span class="absolute right-2.5 text-[11px] text-slate-400">万m³</span>
            </div>
          </div>

          <!-- (二) 林地灌溉 -->
          <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <label class="block text-slate-700 font-semibold mb-1 flex items-center justify-between">
              <span>(二) 林地灌溉 <span class="text-rose-500">*</span></span>
              <span class="text-[10.5px] text-slate-400 font-normal">防护林/苗木生态</span>
            </label>
            <div class="relative flex items-center">
              <input
                v-model.number="formData.waterData.woodland"
                type="number"
                step="0.01"
                min="0"
                class="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-xs text-slate-900 font-mono font-bold focus:outline-none focus:border-blue-500"
                placeholder="0.00"
              />
              <span class="absolute right-2.5 text-[11px] text-slate-400">万m³</span>
            </div>
          </div>

          <!-- (三) 园地灌溉 -->
          <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <label class="block text-slate-700 font-semibold mb-1 flex items-center justify-between">
              <span>(三) 园地灌溉 <span class="text-rose-500">*</span></span>
              <span class="text-[10.5px] text-slate-400 font-normal">果园/茶园/经济林</span>
            </label>
            <div class="relative flex items-center">
              <input
                v-model.number="formData.waterData.orchard"
                type="number"
                step="0.01"
                min="0"
                class="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-xs text-slate-900 font-mono font-bold focus:outline-none focus:border-blue-500"
                placeholder="0.00"
              />
              <span class="absolute right-2.5 text-[11px] text-slate-400">万m³</span>
            </div>
          </div>

          <!-- (四) 牧草地灌溉 -->
          <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <label class="block text-slate-700 font-semibold mb-1 flex items-center justify-between">
              <span>(四) 牧草地灌溉 <span class="text-rose-500">*</span></span>
              <span class="text-[10.5px] text-slate-400 font-normal">人工草场/燕麦草</span>
            </label>
            <div class="relative flex items-center">
              <input
                v-model.number="formData.waterData.pasture"
                type="number"
                step="0.01"
                min="0"
                class="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-xs text-slate-900 font-mono font-bold focus:outline-none focus:border-blue-500"
                placeholder="0.00"
              />
              <span class="absolute right-2.5 text-[11px] text-slate-400">万m³</span>
            </div>
          </div>

          <!-- (五) 鱼塘补水 -->
          <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <label class="block text-slate-700 font-semibold mb-1 flex items-center justify-between">
              <span>(五) 鱼塘补水 <span class="text-rose-500">*</span></span>
              <span class="text-[10.5px] text-slate-400 font-normal">水产养殖补水</span>
            </label>
            <div class="relative flex items-center">
              <input
                v-model.number="formData.waterData.fishpond"
                type="number"
                step="0.01"
                min="0"
                class="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-xs text-slate-900 font-mono font-bold focus:outline-none focus:border-blue-500"
                placeholder="0.00"
              />
              <span class="absolute right-2.5 text-[11px] text-slate-400">万m³</span>
            </div>
          </div>

          <!-- (六) 畜禽用水 -->
          <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <label class="block text-slate-700 font-semibold mb-1 flex items-center justify-between">
              <span>(六) 畜禽用水 <span class="text-rose-500">*</span></span>
              <span class="text-[10.5px] text-slate-400 font-normal">牛羊饮水及养殖清洗</span>
            </label>
            <div class="relative flex items-center">
              <input
                v-model.number="formData.waterData.livestock"
                type="number"
                step="0.01"
                min="0"
                class="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-xs text-slate-900 font-mono font-bold focus:outline-none focus:border-blue-500"
                placeholder="0.00"
              />
              <span class="absolute right-2.5 text-[11px] text-slate-400">万m³</span>
            </div>
          </div>

          <!-- (七) 小计 (系统自动实时求和) -->
          <div class="p-2.5 rounded-lg bg-blue-50/80 border-2 border-blue-300 col-span-1 sm:col-span-2 lg:col-span-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div class="font-bold text-blue-950 text-xs flex items-center gap-1">
                <span>(七) 小计（系统自动汇总计算）</span>
                <span class="text-[10px] bg-blue-200/60 text-blue-800 px-1.5 py-0.2 rounded font-normal">
                  = (一)+(二)+(三)+(四)+(五)+(六)
                </span>
              </div>
              <div class="text-[11px] text-blue-700 mt-0.5 font-mono">
                换算合计：<strong>{{ (calculatedSubtotal * 10000).toLocaleString() }}</strong> m³
              </div>
            </div>

            <div class="flex items-center gap-2">
              <div class="text-2xl font-bold font-mono text-blue-700">
                {{ calculatedSubtotal.toFixed(2) }}
              </div>
              <span class="text-xs font-semibold text-blue-600">万m³</span>
            </div>
          </div>

          <!-- 其中：取用地下 (专项核算项，重点校验) -->
          <div
            :class="[
              'p-3 rounded-lg border-2 col-span-1 sm:col-span-2 lg:col-span-3 transition',
              isGroundwaterExceeded
                ? 'bg-rose-50/90 border-rose-400'
                : 'bg-cyan-50/70 border-cyan-300'
            ]"
          >
            <div class="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <label class="text-cyan-950 font-bold text-xs flex items-center gap-1.5">
                <svg class="w-4 h-4 text-cyan-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                <span>其中：取用地下水水量 <span class="text-rose-500">*</span></span>
                <span class="text-[10.5px] font-normal text-cyan-700">(若灌区取用地下水或机井提水，请输入)</span>
              </label>

              <span v-if="isGroundwaterExceeded" class="text-xs text-rose-600 font-bold flex items-center gap-1">
                <svg class="w-3.5 h-3.5 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span>校验错误：取用地下水量不可大于农业用水小计！</span>
              </span>
              <span v-else class="text-[11px] text-cyan-800">
                地下水占比：<strong>{{ groundwaterRatio }}%</strong>
              </span>
            </div>

            <div class="relative flex items-center">
              <input
                v-model.number="formData.waterData.groundwater"
                type="number"
                step="0.01"
                min="0"
                :max="calculatedSubtotal"
                :class="[
                  'w-full bg-white rounded-md px-3 py-1.5 text-xs font-mono font-bold focus:outline-none transition',
                  isGroundwaterExceeded
                    ? 'border-2 border-rose-500 text-rose-700 focus:border-rose-600'
                    : 'border border-cyan-300 text-cyan-900 focus:border-cyan-500'
                ]"
                placeholder="0.00"
              />
              <span class="absolute right-3 text-[11px] text-slate-400">万m³</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Section 4: 核算依据与凭证材料 -->
      <div class="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
        <div class="font-bold text-slate-800 text-xs flex items-center gap-1.5 mb-2.5">
          <span class="w-1.5 h-3.5 rounded-full bg-blue-600"></span>
          <span>四、核算依据、填报凭证与负责人</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <!-- 核算方法 -->
          <div>
            <label class="block text-slate-600 mb-1 font-medium">
              农业用水核算方法 <span class="text-rose-500">*</span>
            </label>
            <select
              v-model="formData.calculationMethod"
              class="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="以电折水核算">以电折水核算 (灌区机井/泵站用电折算)</option>
              <option value="计量仪表实测">计量仪表实测 (电磁/超声波流量计直读)</option>
              <option value="渠系量水尺量测">渠系量水尺量测 (巴歇尔槽/量水堰水力计算)</option>
              <option value="定额面积推算">定额面积推算 (综合净灌溉定额×有效面积)</option>
            </select>
          </div>

          <!-- 填报单位 -->
          <div>
            <label class="block text-slate-600 mb-1 font-medium">填报单位 (县级水行政主管单位)</label>
            <input
              type="text"
              v-model="formData.reporter.unit"
              class="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
            />
          </div>

          <!-- 填报人员 -->
          <div>
            <label class="block text-slate-600 mb-1 font-medium">填报人姓名 <span class="text-rose-500">*</span></label>
            <input
              type="text"
              v-model="formData.reporter.name"
              class="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              placeholder="请输入经办人姓名"
            />
          </div>

          <!-- 联系电话 -->
          <div>
            <label class="block text-slate-600 mb-1 font-medium">联系电话 <span class="text-rose-500">*</span></label>
            <input
              type="text"
              v-model="formData.reporter.phone"
              class="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              placeholder="请输入联系手机号码"
            />
          </div>

          <!-- 凭证附件模拟 -->
          <div class="col-span-1 sm:col-span-2">
            <label class="block text-slate-600 mb-1 font-medium">
              现场核算凭证材料 (电量电费结算单/水表底数抄报单/现场照片)
            </label>
            <div class="flex flex-wrap items-center gap-2">
              <span
                v-for="(f, i) in formData.voucherFiles"
                :key="i"
                class="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-blue-50 border border-blue-200 text-blue-800 text-[11px]"
              >
                <svg class="w-3.5 h-3.5 text-blue-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                <span class="truncate max-w-[200px]">{{ f }}</span>
                <button
                  type="button"
                  @click="removeVoucher(i)"
                  class="text-rose-500 hover:text-rose-700 ml-1 cursor-pointer"
                >
                  ×
                </button>
              </span>

              <button
                type="button"
                @click="addVoucher"
                class="px-2.5 py-1 rounded border border-dashed border-blue-400 bg-blue-50/50 hover:bg-blue-100 text-blue-700 text-[11px] font-medium flex items-center gap-1 cursor-pointer transition"
              >
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span>添加凭证附件</span>
              </button>
            </div>
          </div>

          <!-- 备注 -->
          <div class="col-span-1 sm:col-span-2">
            <label class="block text-slate-600 mb-1 font-medium">核算补充说明 / 备注</label>
            <textarea
              v-model="formData.remarks"
              rows="2"
              placeholder="如有春灌特别调度、防冻微灌、电折水系数调整等情况，请在此简要说明..."
              class="w-full bg-white border border-slate-300 rounded-md p-2 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Action Buttons in Dialog -->
      <div class="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200">
        <button
          type="button"
          @click="dialogVisible = false"
          class="px-4 py-1.5 rounded-md bg-white border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition cursor-pointer text-xs"
        >
          取消返回
        </button>

        <!-- 保存为县级草稿 -->
        <button
          type="button"
          @click="handleSubmit('draft')"
          :disabled="isGroundwaterExceeded"
          class="px-4 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-semibold transition cursor-pointer text-xs disabled:opacity-50 disabled:cursor-not-allowed"
        >
          暂存为草稿
        </button>

        <!-- 直接提交市级初审 -->
        <button
          type="button"
          @click="handleSubmit('pending_city')"
          :disabled="isGroundwaterExceeded || !formData.licenseId"
          class="px-5 py-1.5 rounded-md bg-[#2563EB] hover:bg-blue-700 text-white font-bold transition cursor-pointer text-xs flex items-center gap-1.5 shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>提交市级初审</span>
        </button>
      </div>
    </div>
  </t-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type { IrrigationLicense, IrrigationAccountingRecord, IrrigationAuditStatus } from '../../../types';

const props = defineProps<{
  visible: boolean;
  licenses: IrrigationLicense[];
  initialRecord?: IrrigationAccountingRecord | null;
}>();

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void;
  (e: 'submit', recordData: Partial<IrrigationAccountingRecord>, targetStatus: IrrigationAuditStatus): void;
}>();

const dialogVisible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val),
});

const isEdit = computed(() => !!props.initialRecord);

const formData = reactive({
  licenseId: '',
  year: 2026,
  month: 3,
  calculationMethod: '以电折水核算',
  waterData: {
    farmland: 0,
    woodland: 0,
    orchard: 0,
    pasture: 0,
    fishpond: 0,
    livestock: 0,
    subtotal: 0,
    groundwater: 0,
  },
  voucherFiles: [] as string[],
  remarks: '',
  reporter: {
    name: '何晓峰',
    phone: '13897109823',
    unit: '西宁市县级水务局农水科',
  },
});

const currentLicense = computed(() => {
  return props.licenses.find((l) => l.id === formData.licenseId) || null;
});

// 自动计算小计：(一)+(二)+(三)+(四)+(五)+(六)
const calculatedSubtotal = computed(() => {
  const { farmland, woodland, orchard, pasture, fishpond, livestock } = formData.waterData;
  const sum = (Number(farmland) || 0) +
    (Number(woodland) || 0) +
    (Number(orchard) || 0) +
    (Number(pasture) || 0) +
    (Number(fishpond) || 0) +
    (Number(livestock) || 0);
  return Number(sum.toFixed(2));
});

// 实时校验：取用地下 <= 小计
const isGroundwaterExceeded = computed(() => {
  const gw = Number(formData.waterData.groundwater) || 0;
  return gw > calculatedSubtotal.value;
});

const groundwaterRatio = computed(() => {
  if (calculatedSubtotal.value <= 0) return '0.0';
  const gw = Number(formData.waterData.groundwater) || 0;
  return ((gw / calculatedSubtotal.value) * 100).toFixed(1);
});

// 切换许可证时更新填报单位
const handleLicenseChange = () => {
  if (currentLicense.value) {
    formData.reporter.unit = `${currentLicense.value.district}水务局农水水利科`;
  }
};

const addVoucher = () => {
  const sampleVouchers = [
    `小型灌区${formData.month}月用电量电费结算凭证.pdf`,
    `灌区机井电磁流量计${formData.month}月表底数抄验单.jpg`,
    `农业灌溉提水泵站巡检及量水记录表.xlsx`,
  ];
  const next = sampleVouchers[formData.voucherFiles.length % sampleVouchers.length];
  formData.voucherFiles.push(next);
  MessagePlugin.success(`已添加佐证凭证：${next}`);
};

const removeVoucher = (idx: number) => {
  formData.voucherFiles.splice(idx, 1);
};

// Reset or fill data when modal opens
watch(
  () => props.visible,
  (val) => {
    if (val) {
      if (props.initialRecord) {
        formData.licenseId = props.initialRecord.licenseId;
        formData.year = props.initialRecord.year;
        formData.month = props.initialRecord.month;
        formData.calculationMethod = props.initialRecord.calculationMethod || '以电折水核算';
        formData.waterData = {
          farmland: props.initialRecord.waterData.farmland,
          woodland: props.initialRecord.waterData.woodland,
          orchard: props.initialRecord.waterData.orchard,
          pasture: props.initialRecord.waterData.pasture,
          fishpond: props.initialRecord.waterData.fishpond,
          livestock: props.initialRecord.waterData.livestock,
          subtotal: props.initialRecord.waterData.subtotal,
          groundwater: props.initialRecord.waterData.groundwater,
        };
        formData.voucherFiles = [...(props.initialRecord.voucherFiles || [])];
        formData.remarks = props.initialRecord.remarks || '';
        formData.reporter = {
          name: props.initialRecord.reporter.name || '何晓峰',
          phone: props.initialRecord.reporter.phone || '13897109823',
          unit: props.initialRecord.reporter.unit || '县级水务局',
        };
      } else {
        // Defaults for new report
        formData.licenseId = props.licenses[0]?.id || '';
        formData.year = 2026;
        formData.month = 3;
        formData.calculationMethod = '以电折水核算';
        formData.waterData = {
          farmland: 8.5,
          woodland: 1.2,
          orchard: 0.6,
          pasture: 1.0,
          fishpond: 0.3,
          livestock: 0.5,
          subtotal: 12.1,
          groundwater: 1.5,
        };
        formData.voucherFiles = ['小型灌区3月用电量电费结算凭证.pdf'];
        formData.remarks = '';
        if (props.licenses[0]) {
          formData.reporter.unit = `${props.licenses[0].district}水务局农水科`;
        }
      }
    }
  }
);

const handleSubmit = (targetStatus: IrrigationAuditStatus) => {
  if (!formData.licenseId) {
    MessagePlugin.error('请选择小型灌区取水许可证');
    return;
  }
  if (!formData.reporter.name.trim()) {
    MessagePlugin.error('请输入填报人员姓名');
    return;
  }
  if (isGroundwaterExceeded.value) {
    MessagePlugin.error('取用地下水水量不能大于农业用水小计');
    return;
  }

  const lic = currentLicense.value!;
  const payload: Partial<IrrigationAccountingRecord> = {
    licenseId: lic.id,
    permitNumber: lic.permitNumber,
    irrigationName: lic.irrigationName,
    district: lic.district,
    waterOwner: lic.waterOwner,
    waterSourceType: lic.waterSourceType,
    annualQuota: lic.annualQuota,
    year: formData.year,
    month: formData.month,
    periodKey: `${formData.year}-${String(formData.month).padStart(2, '0')}`,
    periodLabel: `${formData.year}年${String(formData.month).padStart(2, '0')}月`,
    waterData: {
      farmland: Number(formData.waterData.farmland) || 0,
      woodland: Number(formData.waterData.woodland) || 0,
      orchard: Number(formData.waterData.orchard) || 0,
      pasture: Number(formData.waterData.pasture) || 0,
      fishpond: Number(formData.waterData.fishpond) || 0,
      livestock: Number(formData.waterData.livestock) || 0,
      subtotal: calculatedSubtotal.value,
      groundwater: Number(formData.waterData.groundwater) || 0,
    },
    calculationMethod: formData.calculationMethod,
    voucherFiles: [...formData.voucherFiles],
    remarks: formData.remarks,
    reporter: {
      name: formData.reporter.name,
      phone: formData.reporter.phone,
      unit: formData.reporter.unit,
      time: new Date().toLocaleString('zh-CN', { hour12: false }),
    },
  };

  emit('submit', payload, targetStatus);
  dialogVisible.value = false;
};
</script>
