import React from 'react';
import { X, Clock, CalendarRange, Tag, CheckCircle } from 'lucide-react';
import { Schedule } from '../../types/schedule';
import { TAG_LABELS, STATUS_LABELS } from '../../constants/scheduleConstants';
import { formatDateTime } from '../../utils/dateUtils';

interface ScheduleModalProps {
  schedule: Schedule;
  onClose: () => void;
  onEdit: (schedule: Schedule) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export function ScheduleModal({
  schedule,
  onClose,
  onEdit,
  onDelete,
  onToggleStatus
}: ScheduleModalProps) {
  const handleToggleStatus = () => {
    onToggleStatus(schedule.id);
    onClose(); // 切换状态后关闭模态框
  };

  const handleDelete = () => {
    if (confirm('确定要删除这个日程吗？')) {
      onDelete(schedule.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-gray-800">{schedule.title}</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-gray-600" />
              <span className={`px-2 py-1 rounded-full text-sm ${schedule.color}`}>
                {TAG_LABELS[schedule.tag]}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700">
                开始：{formatDateTime(schedule.startTime)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <CalendarRange className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700">
                结束：{formatDateTime(schedule.endTime)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700">
                状态：{STATUS_LABELS[schedule.status]}
              </span>
            </div>

            {schedule.description && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">描述</h4>
                <p className="text-gray-600 whitespace-pre-wrap">{schedule.description}</p>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button
              onClick={handleToggleStatus}
              className={`px-4 py-2 rounded ${
                schedule.status === 'completed'
                  ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {schedule.status === 'completed' ? '标记为进行中' : '标记为已完成'}
            </button>
            <button
              onClick={() => {
                onEdit(schedule);
                onClose();
              }}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
            >
              编辑
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
            >
              删除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}