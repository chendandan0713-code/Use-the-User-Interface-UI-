<template>
  <t-dialog
    v-model:visible="visible"
    header="物联遥测网关与DTU终端绑定"
    width="520px"
    :confirm-btn="{ content: '完成绑定', theme: 'primary' }"
    :cancel-btn="{ content: '取消' }"
    @confirm="handleConfirm"
  >
    <div v-if="facility" class="space-y-3 text-xs select-none py-1">
      <div class="p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div class="font-bold text-blue-900">{{ facility.name }}</div>
        <div class="text-blue-700 font-mono mt-0.5">设施编号: {{ facility.code }}</div>
      </div>

      <div class="space-y-2">
        <div>
          <label class="block text-slate-600 mb-1 font-medium">网关设备类型</label>
          <t-select v-model="gatewayType" placeholder="请选择网关型号">
            <t-option value="4G-DTU-工业级全网通网关" label="4G-DTU-工业级全网通网关 (HJ212)" />
            <t-option value="NB-IoT低功耗遥测终端" label="NB-IoT低功耗遥测终端 (SL651)" />
            <t-option value="光纤直连以太网通信机" label="光纤直连以太网通信机" />
          </t-select>
        </div>

        <div>
          <label class="block text-slate-600 mb-1 font-medium">DTU终端 IMEI/序列号 <span class="text-red-500">*</span></label>
          <t-input v-model="gatewaySerial" placeholder="如：868923049281039" />
        </div>

        <div>
          <label class="block text-slate-600 mb-1 font-medium">物联通信协议</label>
          <t-select v-model="protocol" placeholder="请选择通信协议">
            <t-option value="SL651-2014 水文水资源规约" label="SL651-2014 水文水资源规约" />
            <t-option value="SZY206-2016 水资源监测数据传输规约" label="SZY206-2016 水资源监测数据传输规约" />
            <t-option value="HJ212-2017 环保物联规约" label="HJ212-2017 环保物联规约" />
            <t-option value="Modbus-RTU / TCP 工业标准" label="Modbus-RTU / TCP 工业标准" />
          </t-select>
        </div>

        <div>
          <label class="block text-slate-600 mb-1 font-medium">采样与上报周期</label>
          <t-select v-model="samplingInterval" placeholder="采样周期">
            <t-option value="5分钟" label="每 5 分钟上报一次" />
            <t-option value="15分钟" label="每 15 分钟上报一次 (国标推荐)" />
            <t-option value="1小时" label="每 1 小时上报一次" />
          </t-select>
        </div>
      </div>
    </div>
  </t-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type { WaterFacility } from '../../types';

const props = defineProps<{
  visible: boolean;
  facility: WaterFacility | null;
}>();

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void;
  (e: 'confirm', payload: { id: string; gatewaySerial: string }): void;
}>();

const visible = computed({
  get: () => props.visible,
  set: (val: boolean) => emit('update:visible', val),
});

const gatewayType = ref('4G-DTU-工业级全网通网关');
const gatewaySerial = ref('868923049281039');
const protocol = ref('SZY206-2016 水资源监测数据传输规约');
const samplingInterval = ref('15分钟');

const handleConfirm = () => {
  if (!props.facility) return;
  if (!gatewaySerial.value.trim()) {
    MessagePlugin.error('请输入DTU终端序列号');
    return;
  }
  emit('confirm', {
    id: props.facility.id,
    gatewaySerial: gatewaySerial.value,
  });
  visible.value = false;
  MessagePlugin.success(`设施【${props.facility.name}】已成功绑定DTU终端 ${gatewaySerial.value}`);
};
</script>
