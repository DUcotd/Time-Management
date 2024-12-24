import React from 'react';
import { Search } from 'lucide-react';
import { SCHEDULE_TAGS, SCHEDULE_STATUSES, TAG_LABELS, STATUS_LABELS } from '../constants/scheduleConstants';

interface ScheduleFiltersProps {
  search: string;
  onSearchChange: (search: string) => void;
  selectedTag: string;
  onTagChange: (tag: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

export function ScheduleFilters({
  search,
  onSearchChange,
  selectedTag,
  onTagChange,
  selectedStatus,
  onStatusChange,
}: ScheduleFiltersProps) {
  return (
    <div className="space-y-4 mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="搜索日程..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            按标签筛选
          </label>
          <select
            value={selectedTag}
            onChange={(e) => onTagChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">全部标签</option>
            {SCHEDULE_TAGS.map(tag => (
              <option key={tag} value={tag}>
                {TAG_LABELS[tag]}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            按状态筛选
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">全部状态</option>
            {SCHEDULE_STATUSES.map(status => (
              <option key={status} value={status}>
                {STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}