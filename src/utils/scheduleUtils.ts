import { Schedule } from '../types/schedule';

export const sortSchedules = (schedules: Schedule[]): Schedule[] => {
  return [...schedules].sort((a, b) => 
    new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );
};

export const filterSchedules = (
  schedules: Schedule[],
  search: string,
  tag?: string,
  status?: string
): Schedule[] => {
  return schedules.filter(schedule => {
    const matchesSearch = schedule.title.toLowerCase().includes(search.toLowerCase()) ||
      schedule.description?.toLowerCase().includes(search.toLowerCase());
    const matchesTag = !tag || schedule.tag === tag;
    const matchesStatus = !status || schedule.status === status;
    return matchesSearch && matchesTag && matchesStatus;
  });
};