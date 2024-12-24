// 在现有的 types/schedule.ts 中添加
export interface ArchivedSchedule extends Schedule {
  archivedAt: string;
}

export type ArchiveFilter = {
  startDate?: string;
  endDate?: string;
  tags?: string[];
  searchText?: string;
};