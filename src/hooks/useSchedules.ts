import { useState, useCallback } from 'react';
import type { Schedule, ScheduleFormData } from '../types/schedule';
import { sortSchedules } from '../utils/scheduleUtils';

export function useSchedules() {
  const [schedules, setSchedules] = useState<Schedule[]>(() => {
    const saved = localStorage.getItem('schedules');
    return saved ? JSON.parse(saved) : [];
  });

  const saveToLocalStorage = useCallback((newSchedules: Schedule[]) => {
    localStorage.setItem('schedules', JSON.stringify(newSchedules));
  }, []);

  const addSchedule = useCallback((data: ScheduleFormData) => {
    const newSchedule: Schedule = {
      ...data,
      id: crypto.randomUUID(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    
    const newSchedules = sortSchedules([...schedules, newSchedule]);
    setSchedules(newSchedules);
    saveToLocalStorage(newSchedules);
  }, [schedules, saveToLocalStorage]);

  const updateSchedule = useCallback((id: string, data: ScheduleFormData) => {
    const newSchedules = sortSchedules(
      schedules.map((schedule) =>
        schedule.id === id
          ? { ...schedule, ...data, updatedAt: new Date().toISOString() }
          : schedule
      )
    );
    setSchedules(newSchedules);
    saveToLocalStorage(newSchedules);
  }, [schedules, saveToLocalStorage]);

  const deleteSchedule = useCallback((id: string) => {
    const newSchedules = schedules.filter((schedule) => schedule.id !== id);
    setSchedules(newSchedules);
    saveToLocalStorage(newSchedules);
  }, [schedules, saveToLocalStorage]);

  const toggleStatus = useCallback((id: string) => {
    const newSchedules = schedules.map((schedule) =>
      schedule.id === id
        ? {
            ...schedule,
            status: schedule.status === 'completed' ? 'pending' : 'completed',
            completedAt: schedule.status === 'completed' ? null : new Date().toISOString(),
          }
        : schedule
    );
    setSchedules(newSchedules);
    saveToLocalStorage(newSchedules);
  }, [schedules, saveToLocalStorage]);

  return {
    schedules,
    addSchedule,
    updateSchedule,
    deleteSchedule,
    toggleStatus,
  };
}