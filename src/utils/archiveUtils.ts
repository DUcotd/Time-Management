import type { ArchivedSchedule, ArchiveFilter } from '../types/schedule';

export function filterArchivedSchedules(
  schedules: ArchivedSchedule[],
  filter: ArchiveFilter
): ArchivedSchedule[] {
  return schedules.filter(schedule => {
    const matchesDate =
      (!filter.startDate || new Date(schedule.archivedAt) >= new Date(filter.startDate)) &&
      (!filter.endDate || new Date(schedule.archivedAt) <= new Date(filter.endDate));

    const matchesTags =
      !filter.tags?.length || filter.tags.includes(schedule.tag);

    const matchesSearch =
      !filter.searchText ||
      schedule.title.toLowerCase().includes(filter.searchText.toLowerCase()) ||
      schedule.description?.toLowerCase().includes(filter.searchText.toLowerCase());

    return matchesDate && matchesTags && matchesSearch;
  });
}