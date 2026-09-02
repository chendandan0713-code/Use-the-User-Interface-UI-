import React, { useState } from 'react';
import { Folder, FolderOpen, FileText, ChevronDown, ChevronRight, Search, MapPin } from 'lucide-react';
import { DistrictNode } from '../../types';

interface WaterDistrictTreeProps {
  districts: DistrictNode;
  selectedDistrict: string;
  onSelectDistrict: (districtName: string) => void;
}

export const WaterDistrictTree: React.FC<WaterDistrictTreeProps> = ({
  districts,
  selectedDistrict,
  onSelectDistrict,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCityExpanded, setIsCityExpanded] = useState(true);

  // Filter children based on search term
  const filteredChildren = districts.children?.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  return (
    <div className="w-56 flex-shrink-0 bg-white rounded-xl border border-slate-300 p-3.5 flex flex-col h-full shadow-xs">
      {/* Card Header: 行政区划标题 */}
      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-200">
        <div className="flex items-center gap-1.5 font-bold text-slate-800 text-xs">
          <MapPin className="w-3.5 h-3.5 text-blue-600" />
          <span>行政区划</span>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative mb-3">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="搜索区县名称..."
          className="w-full h-8 pl-7 pr-2.5 text-xs bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 placeholder-slate-400 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all"
        />
        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2.5 pointer-events-none" />
      </div>

      {/* District Tree Structure */}
      <div className="flex-1 overflow-y-auto space-y-1 text-xs select-none custom-scrollbar pr-0.5">
        {/* Root Node: 西宁市 */}
        <div>
          <div
            onClick={() => {
              onSelectDistrict(districts.name);
            }}
            className={`flex items-center justify-between px-2 py-1.5 rounded-lg cursor-pointer transition-all ${
              selectedDistrict === districts.name
                ? 'bg-blue-50 text-blue-700 font-semibold'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCityExpanded(!isCityExpanded);
                }}
                className="p-0.5 hover:bg-slate-200 rounded text-slate-500"
              >
                {isCityExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5" />
                )}
              </button>
              {isCityExpanded ? (
                <FolderOpen className="w-4 h-4 text-blue-500" />
              ) : (
                <Folder className="w-4 h-4 text-blue-500" />
              )}
              <span className="truncate">{districts.name}</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.2 bg-slate-100 text-slate-500 rounded-full font-normal">
              {districts.count}
            </span>
          </div>

          {/* Child Sub-Districts */}
          {isCityExpanded && filteredChildren && (
            <div className="pl-4 mt-1 space-y-0.5 ml-1">
              {filteredChildren.map((item) => {
                const isSelected = selectedDistrict === item.name;
                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectDistrict(item.name)}
                    className={`flex items-center justify-between px-2 py-1.5 rounded-lg cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-100/70 text-blue-700 font-semibold shadow-xs'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <FileText
                        className={`w-3.5 h-3.5 ${
                          isSelected ? 'text-blue-600' : 'text-slate-400'
                        }`}
                      />
                      <span className="truncate">{item.name}</span>
                    </div>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isSelected
                          ? 'bg-blue-200/70 text-blue-800'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {item.count}
                    </span>
                  </div>
                );
              })}

              {filteredChildren.length === 0 && (
                <div className="py-3 text-center text-slate-400 text-[11px]">
                  未匹配到区县
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Selected Scope Indicator */}
      <div className="pt-2.5 border-t border-slate-100 mt-2 flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-1 truncate">
          <MapPin className="w-3 h-3 text-blue-500 flex-shrink-0" />
          <span className="truncate font-medium">辖区: {selectedDistrict || '全市'}</span>
        </div>
        {selectedDistrict !== districts.name && (
          <button
            type="button"
            onClick={() => onSelectDistrict(districts.name)}
            className="text-blue-600 hover:underline text-[10px] flex-shrink-0"
          >
            重置全市
          </button>
        )}
      </div>
    </div>
  );
};
