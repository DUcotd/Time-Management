import { useState, useCallback } from 'react';
import type { Schedule, ArchivedSchedule, ArchiveFilter } from '../types/schedule';
import { filterArchivedSchedules } from '../utils/archiveUtils';

export function useArchivedSchedules() {
  const [archivedSchedules, setArchivedSchedules] = useState<ArchivedSchedule[]>(() => {
    const saved = localStorage.getItem('archivedSchedules');
    return saved ? JSON.parse(saved) : [];
  });

  const saveToLocalStorage = useCallback((schedules: ArchivedSchedule[]) => {
    localStorage.setItem('archivedSchedules', JSON.stringify(schedules));
  }, []);

  const archiveSchedule = useCallback((schedule: Schedule) => {
    const archivedSchedule: ArchivedSchedule = {
      ...schedule,
      archivedAt: new Date().toISOString(),
    };
    const newArchived = [archivedSchedule, ...archivedSchedules];
    setArchivedSchedules(newArchived);
    saveToLocalStorage(newArchived);
    return archivedSchedule;
  }, [archivedSchedules, saveToLocalStorage]);

  const restoreSchedule = useCallback((id: string) => {
    const schedule = archivedSchedules.find(s => s.id === id);
    const newArchived = archivedSchedules.filter(s => s.id !== id);
    setArchivedSchedules(newArchived);
    saveToLocalStorage(newArchived);
    return schedule;
  }, [archivedSchedules, saveToLocalStorage]);

  const deleteArchived = useCallback((id: string) => {
    const newArchived = archivedSchedules.filter(s => s.id !== id);
    setArchivedSchedules(newArchived);
    saveToLocalStorage(newArchived);
  }, [archivedSchedules, saveToLocalStorage]);

  const getFilteredSchedules = useCallback((filter: ArchiveFilter) => {
    return filterArchivedSchedules(archivedSchedules, filter);
  }, [archivedSchedules]);

  return {
    archivedSchedules,
    archiveSchedule,
    restoreSchedule,
    deleteArchived,
    getFilteredSchedules,
  };
}