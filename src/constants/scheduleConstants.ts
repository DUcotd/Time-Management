import type { ScheduleTag, ScheduleStatus } from '../types/schedule';

export const SCHEDULE_TAGS: ScheduleTag[] = ['work', 'personal', 'meeting', 'other'];

export const SCHEDULE_STATUSES: ScheduleStatus[] = ['pending', 'completed'];

export const TAG_LABELS: Record<ScheduleTag, string> = {
  work: '工作',
  personal: '个人',
  meeting: '会议',
  other: '其他'
};

export const STATUS_LABELS: Record<ScheduleStatus, string> = {
  pending: '进行中',
  completed: '已完成'
};

export const TAG_COLORS: Record<ScheduleTag, string> = {
  work: 'bg-blue-100 text-blue-800',
  personal: 'bg-green-100 text-green-800',
  meeting: 'bg-purple-100 text-purple-800',
  other: 'bg-gray-100 text-gray-800'
};