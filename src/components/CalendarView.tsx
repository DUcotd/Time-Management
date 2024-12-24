import React, { useState } from 'react';
import { Schedule } from '../types/schedule';
import { DayCell } from './calendar/DayCell';
import { ScheduleModal } from './calendar/ScheduleModal';
import { CalendarNavigation } from './calendar/CalendarNavigation';

interface CalendarViewProps {
  schedules: Schedule[];
  onSelectDate: (date: Date) => void;
  onEdit: (schedule: Schedule) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export function CalendarView({
  schedules,
  onSelectDate,
  onEdit,
  onDelete,
  onToggleStatus
}: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const getDaySchedules = (date: Date) => {
    return schedules.filter(schedule => {
      const startDate = new Date(schedule.startTime);
      const endDate = new Date(schedule.endTime);
      const currentDate = new Date(date);
      currentDate.setHours(0, 0, 0, 0);
      
      return (
        (startDate <= currentDate && endDate >= currentDate) ||
        startDate.toDateString() === date.toDateString() ||
        endDate.toDateString() === date.toDateString()
      );
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="min-h-[120px] bg-gray-50/50 border border-gray-200 rounded-lg" />
      );
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const daySchedules = getDaySchedules(date);
      const isToday = new Date().toDateString() === date.toDateString();

      days.push(
        <DayCell
          key={day}
          day={day}
          date={date}
          isToday={isToday}
          schedules={daySchedules}
          onSelectDate={onSelectDate}
          onScheduleClick={setSelectedSchedule}
        />
      );
    }

    return days;
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <CalendarNavigation
          currentDate={currentDate}
          onNavigate={navigateMonth}
          onDateSelect={setCurrentDate}
        />

        <div className="grid grid-cols-7 gap-2">
          {['日', '一', '二', '三', '四', '五', '六'].map(day => (
            <div
              key={day}
              className="text-center py-2 text-gray-600 font-medium"
            >
              {day}
            </div>
          ))}
          {renderCalendar()}
        </div>
      </div>

      {selectedSchedule && (
        <ScheduleModal
          schedule={selectedSchedule}
          onClose={() => setSelectedSchedule(null)}
          onEdit={(schedule) => {
            onEdit(schedule);
            setSelectedSchedule(null);
          }}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      )}
    </>
  );
}