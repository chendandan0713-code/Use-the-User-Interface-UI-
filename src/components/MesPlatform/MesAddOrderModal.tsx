import React, { useState, useEffect } from 'react';
import { X, Save, Layers, Package, Calendar, User, Clock } from 'lucide-react';
import { WorkOrder, PriorityLevel, WorkOrderStatus, WorkOrderType } from '../../types';

interface MesAddOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: WorkOrder | null;
  onSave: (orderData: Partial<WorkOrder>) => void;
}

export const MesAddOrderModal: React.FC<MesAddOrderModalProps> = ({
  isOpen,
  onClose,
  order,
  onSave,
}) => {
  const isEditing = !!order;

  const [formData, setFormData] = useState<Partial<WorkOrder>>({
    orderCode: '',
    orderTag: '',
    productName: '',
    productCode: '',
    spec: '',
    unit: '台',
    materialGrade: '',
    partNumber: '',
    productionBatch: '',
    type: '自制',
    productionPlan: 'PLN-2026Q3-09',
    customerName: '西宁市供水集团总公司',
    creator: '管理员(88018)',
    relatedOrder: '',
    priority: '中',
    status: '待排产',
    plannedQuantity: 100,
    completedQuantity: 0,
    progress: 0,
    createTime: '2026-09-01 10:00',
    planStartDate: '2026-09-02',
    planEndDate: '2026-09-10',
    workshop: '精密制造一车间',
    currentProcess: '下料与机加',
    operator: '张师傅',
  });

  useEffect(() => {
    if (order) {
      setFormData(order);
    } else {
      const randNum = Math.floor(100 + Math.random() * 900);
      setFormData({
        orderCode: `WO20260901-${randNum}`,
        orderTag: `TAG-XN-${8800 + randNum}`,
        productName: '',
        productCode: `PRD-XN-${randNum}`,
        spec: 'DN100 PN16 标准配置',
        unit: '台',
        materialGrade: '304不锈钢/QT450',
        partNumber: `DWG-2026-${randNum}`,
        productionBatch: `BAT-202609-P${randNum}`,
        type: '自制',
        productionPlan: 'PLN-2026Q3-09',
        customerName: '西宁市供水集团总公司',
        creator: '管理员(88018)',
        relatedOrder: `SO-202608-0${randNum}`,
        priority: '中',
        status: '待排产',
        plannedQuantity: 100,
        completedQuantity: 0,
        progress: 0,
        createTime: '2026-09-01 10:00',
        planStartDate: '2026-09-02',
        planEndDate: '2026-09-10',
        workshop: '精密制造一车间',
        currentProcess: '下料与机加',
        operator: '李永强',
      });
    }
  }, [order, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.productName?.trim()) {
      alert('请输入产品名称');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {isEditing ? '编辑生产工单' : '新建生产工单'}
              </h3>
              <p className="text-xs text-slate-500">MES 制造执行与生产调度系统</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs custom-scrollbar">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* 工单编号 */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                <span className="text-rose-500 mr-0.5">*</span>工单编号
              </label>
              <input
                type="text"
                required
                value={formData.orderCode || ''}
                onChange={(e) => setFormData({ ...formData, orderCode: e.target.value })}
                className="w-full h-8 px-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none font-mono"
              />
            </div>

            {/* 产品名称 */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                <span className="text-rose-500 mr-0.5">*</span>产品名称
              </label>
              <input
                type="text"
                required
                value={formData.productName || ''}
                onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                placeholder="例如: 智能电磁水表传感器总成"
                className="w-full h-8 px-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none"
              />
            </div>

            {/* 产品编号 */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">产品编号</label>
              <input
                type="text"
                value={formData.productCode || ''}
                onChange={(e) => setFormData({ ...formData, productCode: e.target.value })}
                className="w-full h-8 px-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none font-mono"
              />
            </div>

            {/* 规格 */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">规格型号</label>
              <input
                type="text"
                value={formData.spec || ''}
                onChange={(e) => setFormData({ ...formData, spec: e.target.value })}
                placeholder="例如: DN100 PN16"
                className="w-full h-8 px-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none"
              />
            </div>

            {/* 材料牌号 */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">材料牌号</label>
              <input
                type="text"
                value={formData.materialGrade || ''}
                onChange={(e) => setFormData({ ...formData, materialGrade: e.target.value })}
                placeholder="例如: 316L/QT450"
                className="w-full h-8 px-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none"
              />
            </div>

            {/* 零件图号 */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">零件图号</label>
              <input
                type="text"
                value={formData.partNumber || ''}
                onChange={(e) => setFormData({ ...formData, partNumber: e.target.value })}
                placeholder="例如: DWG-XN-1002-A"
                className="w-full h-8 px-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none font-mono"
              />
            </div>

            {/* 生产批次 */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">生产批次</label>
              <input
                type="text"
                value={formData.productionBatch || ''}
                onChange={(e) => setFormData({ ...formData, productionBatch: e.target.value })}
                className="w-full h-8 px-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none font-mono"
              />
            </div>

            {/* 类型 */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">工单类型</label>
              <select
                value={formData.type || '自制'}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as WorkOrderType })}
                className="w-full h-8 px-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none bg-white"
              >
                <option value="自制">自制</option>
                <option value="委外">委外</option>
                <option value="返工">返工</option>
                <option value="试制">试制</option>
              </select>
            </div>

            {/* 优先级 */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">优先级</label>
              <select
                value={formData.priority || '中'}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as PriorityLevel })}
                className="w-full h-8 px-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none bg-white"
              >
                <option value="特急">特急 (P0)</option>
                <option value="高">高 (P1)</option>
                <option value="中">中 (P2)</option>
                <option value="低">低 (P3)</option>
              </select>
            </div>

            {/* 工单状态 */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">工单状态</label>
              <select
                value={formData.status || '待排产'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as WorkOrderStatus })}
                className="w-full h-8 px-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none bg-white"
              >
                <option value="待排产">待排产</option>
                <option value="生产中">生产中</option>
                <option value="质检中">质检中</option>
                <option value="已完工">已完工</option>
                <option value="暂停">暂停</option>
              </select>
            </div>

            {/* 计划数量 */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">计划数量</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={formData.plannedQuantity || 100}
                  onChange={(e) => setFormData({ ...formData, plannedQuantity: Number(e.target.value) })}
                  className="flex-1 h-8 px-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none font-mono"
                />
                <input
                  type="text"
                  value={formData.unit || '台'}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  placeholder="单位"
                  className="w-16 h-8 px-2 text-center rounded-lg border border-slate-300 outline-none"
                />
              </div>
            </div>

            {/* 客户名称 */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">客户名称</label>
              <input
                type="text"
                value={formData.customerName || ''}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                placeholder="例如: 西宁市供水集团总公司"
                className="w-full h-8 px-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none"
              />
            </div>

            {/* 计划开始时间 */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">计划开始日期</label>
              <input
                type="date"
                value={formData.planStartDate || '2026-09-02'}
                onChange={(e) => setFormData({ ...formData, planStartDate: e.target.value })}
                className="w-full h-8 px-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none font-mono"
              />
            </div>

            {/* 计划结束时间 */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">计划结束日期</label>
              <input
                type="date"
                value={formData.planEndDate || '2026-09-10'}
                onChange={(e) => setFormData({ ...formData, planEndDate: e.target.value })}
                className="w-full h-8 px-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none font-mono"
              />
            </div>

          </div>

          {/* Footer actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium transition"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm flex items-center gap-1.5 transition"
            >
              <Save className="w-4 h-4" />
              <span>{isEditing ? '保存修改' : '确认创建'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
