import React from 'react';
import { Schedule } from '../../types/schedule';
import { TAG_COLORS } from '../../constants/scheduleConstants';
import { formatTime } from '../../utils/dateUtils';

interface DayCellProps {
  day: number;
  date: Date;
  isToday: boolean;
  schedules: Schedule[];
  onSelectDate: (date: Date) => void;
  onScheduleClick: (schedule: Schedule) => void;
}

export function DayCell({
  day,
  date,
  isToday,
  schedules,
  onSelectDate,
  onScheduleClick
}: DayCellProps) {
  const startSchedules = schedules.filter(s => 
    new Date(s.startTime).toDateString() === date.toDateString()
  );
  
  const endSchedules = schedules.filter(s => 
    new Date(s.endTime).toDateString() === date.toDateString() &&
    new Date(s.startTime).toDateString() !== date.toDateString()
  );

  return (
    <div
      className={`min-h-[120px] border border-gray-200 p-2 hover:bg-gray-50/50 transition-colors rounded-lg
        ${isToday ? 'bg-blue-50/50 ring-2 ring-blue-500 ring-opacity-50' : 'bg-white'}`}
    >
      <div 
        className={`text-sm mb-2 cursor-pointer flex items-center justify-between
          ${isToday ? 'font-bold text-blue-600' : 'text-gray-700'}`}
        onClick={() => onSelectDate(date)}
      >
        <span>{day}</span>
        {isToday && (
          <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">今天</span>
        )}
      </div>
      
      <div className="space-y-1">
        {startSchedules.map(schedule => (
          <button
            key={schedule.id}
            onClick={() => onScheduleClick(schedule)}
            className={`w-full text-left text-xs truncate rounded px-1.5 py-1
              ${TAG_COLORS[schedule.tag]} hover:opacity-90 transition-opacity shadow-sm`}
          >
            <span className="font-medium">{formatTime(schedule.startTime)}</span>
            <br />
            {schedule.title}
          </button>
        ))}
        
        {endSchedules.map(schedule => (
          <button
            key={`end-${schedule.id}`}
            onClick={() => onScheduleClick(schedule)}
            className={`w-full text-left text-xs truncate rounded px-1.5 py-1
              ${TAG_COLORS[schedule.tag]} hover:opacity-90 transition-opacity shadow-sm opacity-75`}
          >
            <span className="font-medium">截止 {formatTime(schedule.endTime)}</span>
            <br />
            {schedule.title}
          </button>
        ))}
      </div>
    </div>
  );
}