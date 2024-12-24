import React from 'react';
import { Bell } from 'lucide-react';
import { Schedule } from '../types/schedule';

interface ReminderSettingsProps {
  startTime: string;
  reminderTime: string | undefined;
  onReminderChange: (time: string | undefined) => void;
}

export function ReminderSettings({ startTime, reminderTime, onReminderChange }: ReminderSettingsProps) {
  const handleReminderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onReminderChange(value === 'none' ? undefined : value);
  };

  const startDate = new Date(startTime);
  const options = [
    { value: 'none', label: '不提醒' },
    { value: new Date(startDate.getTime() - 5 * 60000).toISOString(), label: '提前5分钟' },
    { value: new Date(startDate.getTime() - 15 * 60000).toISOString(), label: '提前15分钟' },
    { value: new Date(startDate.getTime() - 30 * 60000).toISOString(), label: '提前30分钟' },
    { value: new Date(startDate.getTime() - 60 * 60000).toISOString(), label: '提前1小时' },
    { value: new Date(startDate.getTime() - 24 * 60 * 60000).toISOString(), label: '提前1天' },
  ];

  return (
    <div className="flex items-center gap-2">
      <Bell className="w-4 h-4 text-gray-600" />
      <select
        value={reminderTime || 'none'}
        onChange={handleReminderChange}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}