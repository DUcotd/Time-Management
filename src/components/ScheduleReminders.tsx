import React from 'react';
import { Bell, Calendar, Clock } from 'lucide-react';
import type { Schedule } from '../types/schedule';
import { formatDateTime } from '../utils/dateUtils';

interface ScheduleRemindersProps {
  schedules: Schedule[];
  onScheduleClick: (schedule: Schedule) => void;
}

export function ScheduleReminders({ schedules, onScheduleClick }: ScheduleRemindersProps) {
  const today = new Date();
  const threeDaysFromNow = new Date();
  threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);

  const upcomingSchedules = schedules
    .filter(schedule => {
      const endDate = new Date(schedule.endTime);
      return endDate <= threeDaysFromNow && 
             endDate >= today && 
             schedule.status === 'pending';
    })
    .sort((a, b) => new Date(a.endTime).getTime() - new Date(b.endTime).getTime());

  if (upcomingSchedules.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="w-5 h-5 text-yellow-500" />
        <h3 className="text-lg font-semibold text-gray-800">任务提醒</h3>
      </div>
      
      <div className="space-y-3">
        {upcomingSchedules.map(schedule => {
          const endDate = new Date(schedule.endTime);
          const daysLeft = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          
          return (
            <button
              key={schedule.id}
              onClick={() => onScheduleClick(schedule)}
              className="w-full text-left p-3 rounded-lg bg-yellow-50 hover:bg-yellow-100 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-gray-800">{schedule.title}</h4>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDateTime(schedule.endTime)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>
                        {daysLeft === 0 ? '今天截止' : 
                         daysLeft === 1 ? '明天截止' : 
                         `还剩 ${daysLeft} 天`}
                      </span>
                    </div>
                  </div>
                </div>
                {daysLeft <= 1 && (
                  <span className="px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-full">
                    紧急
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}