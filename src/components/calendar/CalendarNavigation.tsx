import React from 'react';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';

interface CalendarNavigationProps {
  currentDate: Date;
  onNavigate: (direction: 'prev' | 'next') => void;
  onDateSelect: (date: Date) => void;
}

export function CalendarNavigation({ currentDate, onNavigate, onDateSelect }: CalendarNavigationProps) {
  const today = new Date();
  const isCurrentMonth = 
    currentDate.getMonth() === today.getMonth() && 
    currentDate.getFullYear() === today.getFullYear();

  const handleMonthSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(parseInt(e.target.value));
    onDateSelect(newDate);
  };

  const handleYearSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(parseInt(e.target.value));
    onDateSelect(newDate);
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800 hidden sm:block">
          {currentDate.getFullYear()}年{currentDate.getMonth() + 1}月
        </h2>
        <div className="flex items-center gap-2 sm:hidden">
          <select
            value={currentDate.getMonth()}
            onChange={handleMonthSelect}
            className="px-2 py-1 border border-gray-300 rounded-md"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {i + 1}月
              </option>
            ))}
          </select>
          <select
            value={currentDate.getFullYear()}
            onChange={handleYearSelect}
            className="px-2 py-1 border border-gray-300 rounded-md"
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i} value={today.getFullYear() - 5 + i}>
                {today.getFullYear() - 5 + i}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {!isCurrentMonth && (
          <button
            onClick={() => onDateSelect(today)}
            className="px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-md flex items-center gap-1 transition-colors"
          >
            <CalendarDays className="w-4 h-4" />
            <span className="hidden sm:inline">返回今天</span>
          </button>
        )}
        <div className="flex items-center border border-gray-200 rounded-md">
          <button
            onClick={() => onNavigate('prev')}
            className="p-1.5 hover:bg-gray-50 border-r border-gray-200"
            title="上个月"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => onNavigate('next')}
            className="p-1.5 hover:bg-gray-50"
            title="下个月"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}