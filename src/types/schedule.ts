export type ScheduleTag = 'work' | 'personal' | 'meeting' | 'other';
export type ScheduleStatus = 'pending' | 'completed';

export interface Schedule {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  tag: ScheduleTag;
  status: ScheduleStatus;
  createdAt: string;
  updatedAt?: string;
  completedAt?: string | null;
  reminderTime?: string; // 添加提醒时间
  reminderSent?: boolean; // 标记提醒是否已发送
}

export interface ScheduleFormData {
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  tag: ScheduleTag;
  reminderTime?: string;
}

export interface ArchivedSchedule extends Schedule {
  archivedAt: string;
}

export type ArchiveFilter = {
  startDate?: string;
  endDate?: string;
  tags?: string[];
  searchText?: string;
};

export interface CustomTag {
  id: string;
  name: string;
  color: string;
}