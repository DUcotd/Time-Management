import React from 'react';
import { CheckCircle2, Clock, Calendar, TrendingUp, Target } from 'lucide-react';
import type { Schedule } from '../types/schedule';

interface ScheduleStatsProps {
  schedules: Schedule[];
}

export function ScheduleStats({ schedules }: ScheduleStatsProps) {
  const total = schedules.length;
  const completed = schedules.filter(s => s.status === 'completed').length;
  const pending = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  // 计算今日任务
  const today = new Date();
  const todaySchedules = schedules.filter(s => {
    const startDate = new Date(s.startTime);
    return startDate.toDateString() === today.toDateString();
  });

  // 计算即将到期（3天内）的任务
  const threeDaysFromNow = new Date();
  threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
  const upcomingDeadlines = schedules.filter(s => {
    const endDate = new Date(s.endTime);
    return endDate <= threeDaysFromNow && endDate >= today && s.status === 'pending';
  });

  const stats = [
    {
      icon: Calendar,
      label: '总日程',
      value: total,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: CheckCircle2,
      label: '完成率',
      value: `${completionRate}%`,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Clock,
      label: '进行中',
      value: pending,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      icon: Target,
      label: '今日任务',
      value: todaySchedules.length,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: TrendingUp,
      label: '即将到期',
      value: upcomingDeadlines.length,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      {stats.map(({ icon: Icon, label, value, color, bgColor }) => (
        <div key={label} className={`${bgColor} p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow`}>
          <div className="flex items-center gap-2">
            <Icon className={`w-5 h-5 ${color}`} />
            <span className="text-gray-600 text-sm">{label}</span>
          </div>
          <div className="mt-2">
            <span className={`text-2xl font-bold ${color}`}>{value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}