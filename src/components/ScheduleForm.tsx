import React, { useState, useEffect } from 'react';
import { CalendarClock, X, Tag as TagIcon } from 'lucide-react';
import { TagManager } from './TagManager';
import { ReminderSettings } from './ReminderSettings';
import { useTags } from '../hooks/useTags';
import type { Schedule, ScheduleFormData } from '../types/schedule';

interface ScheduleFormProps {
  onSubmit: (data: ScheduleFormData) => void;
  onCancel?: () => void;
  initialData?: Schedule;
}

export function ScheduleForm({ onSubmit, onCancel, initialData }: ScheduleFormProps) {
  const { tags, addTag, updateTag, deleteTag } = useTags();
  const [showTagManager, setShowTagManager] = useState(false);
  const [startTime, setStartTime] = useState(initialData?.startTime || '');
  const [reminderTime, setReminderTime] = useState(initialData?.reminderTime);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const scheduleData: ScheduleFormData = {
      title: formData.get('title') as string,
      startTime: formData.get('startTime') as string,
      endTime: formData.get('endTime') as string,
      description: formData.get('description') as string,
      tag: formData.get('tag') as string,
      reminderTime: reminderTime,
    };
    
    onSubmit(scheduleData);
    e.currentTarget.reset();
    setReminderTime(undefined);
  };

  useEffect(() => {
    if (initialData) {
      setStartTime(initialData.startTime);
      setReminderTime(initialData.reminderTime);
    }
  }, [initialData]);

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <CalendarClock className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">
              {initialData ? '编辑日程' : '新建日程'}
            </h2>
          </div>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            标题
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            defaultValue={initialData?.title}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入日程标题"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
              开始时间
            </label>
            <input
              type="datetime-local"
              id="startTime"
              name="startTime"
              required
              defaultValue={initialData?.startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
              结束时间
            </label>
            <input
              type="datetime-local"
              id="endTime"
              name="endTime"
              required
              defaultValue={initialData?.endTime}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            提醒设置
          </label>
          <ReminderSettings
            startTime={startTime}
            reminderTime={reminderTime}
            onReminderChange={setReminderTime}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="tag" className="block text-sm font-medium text-gray-700">
              标签
            </label>
            <button
              type="button"
              onClick={() => setShowTagManager(true)}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <TagIcon className="w-4 h-4" />
              管理标签
            </button>
          </div>
          <select
            id="tag"
            name="tag"
            required
            defaultValue={initialData?.tag || tags[0]?.id}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {tags.map(tag => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            描述（选填）
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            defaultValue={initialData?.description}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="添加日程描述..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          {initialData ? '更新日程' : '添加日程'}
        </button>
      </form>

      {showTagManager && (
        <TagManager
          tags={tags}
          onAddTag={addTag}
          onUpdateTag={updateTag}
          onDeleteTag={deleteTag}
          onClose={() => setShowTagManager(false)}
        />
      )}
    </>
  );
}