import React from 'react';
import { Clock, CalendarRange, Trash2, Edit2, CheckCircle, Circle } from 'lucide-react';
import { TAG_COLORS, TAG_LABELS } from '../constants/scheduleConstants';
import { formatDateTime } from '../utils/dateUtils';
import type { Schedule } from '../types/schedule';

interface ScheduleListProps {
  schedules: Schedule[];
  onDelete: (id: string) => void;
  onEdit: (schedule: Schedule) => void;
  onToggleStatus: (id: string) => void;
}

export function ScheduleList({ schedules, onDelete, onEdit, onToggleStatus }: ScheduleListProps) {
  return (
    <div className="space-y-4">
      {schedules.map((schedule) => (
        <div
          key={schedule.id}
          className={`bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow ${
            schedule.status === 'completed' ? 'opacity-75' : ''
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <button
                onClick={() => onToggleStatus(schedule.id)}
                className="text-gray-500 hover:text-gray-700"
              >
                {schedule.status === 'completed' ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>
              <div>
                <h3 className={`text-lg font-semibold text-gray-800 ${
                  schedule.status === 'completed' ? 'line-through' : ''
                }`}>
                  {schedule.title}
                </h3>
                <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${TAG_COLORS[schedule.tag]}`}>
                  {TAG_LABELS[schedule.tag]}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(schedule)}
                className="text-gray-500 hover:text-gray-700 p-1"
                aria-label="编辑日程"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(schedule.id)}
                className="text-red-500 hover:text-red-700 p-1"
                aria-label="删除日程"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="mt-2 space-y-2">
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm">
                开始：{formatDateTime(schedule.startTime)}
              </span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <CalendarRange className="w-4 h-4 mr-2" />
              <span className="text-sm">
                结束：{formatDateTime(schedule.endTime)}
              </span>
            </div>
          </div>
          
          {schedule.description && (
            <p className="mt-2 text-gray-600 text-sm">{schedule.description}</p>
          )}
        </div>
      ))}
      
      {schedules.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          暂无日程，请添加新的日程！
        </div>
      )}
    </div>
  );
}