import React, { useState } from 'react';
import { X, Search, Calendar, Tag, Download, RefreshCw } from 'lucide-react';
import type { ArchivedSchedule, ArchiveFilter } from '../../types/schedule';
import { formatDateTime } from '../../utils/dateUtils';
import { TAG_COLORS, TAG_LABELS } from '../../constants/scheduleConstants';

interface ArchiveDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  archivedSchedules: ArchivedSchedule[];
  onRestore: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ArchiveDrawer({
  isOpen,
  onClose,
  archivedSchedules,
  onRestore,
  onDelete,
}: ArchiveDrawerProps) {
  const [filter, setFilter] = useState<ArchiveFilter>({});

  const handleExport = () => {
    const data = JSON.stringify(archivedSchedules, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `archived-schedules-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } z-50`}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">已归档任务</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索归档任务..."
                value={filter.searchText || ''}
                onChange={(e) => setFilter({ ...filter, searchText: e.target.value })}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleExport}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
              >
                <Download className="w-4 h-4" />
                导出
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {archivedSchedules.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              暂无归档任务
            </div>
          ) : (
            archivedSchedules.map((schedule) => (
              <div
                key={schedule.id}
                className="bg-gray-50 p-4 rounded-lg space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">{schedule.title}</h3>
                    <span className={`inline-block px-2 py-0.5 text-xs rounded-full mt-1 ${
                      TAG_COLORS[schedule.tag]
                    }`}>
                      {TAG_LABELS[schedule.tag]}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onRestore(schedule.id)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      title="恢复任务"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('确定要删除这个归档任务吗？')) {
                          onDelete(schedule.id);
                        }
                      }}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                      title="删除任务"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    归档时间：{formatDateTime(schedule.archivedAt)}
                  </div>
                  {schedule.description && (
                    <p className="mt-2 text-gray-600">{schedule.description}</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}