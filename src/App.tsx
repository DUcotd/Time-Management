import React, { useState } from 'react';
import { Calendar, Archive } from 'lucide-react';
import { ScheduleForm } from './components/ScheduleForm';
import { ScheduleList } from './components/ScheduleList';
import { ScheduleFilters } from './components/ScheduleFilters';
import { ScheduleStats } from './components/ScheduleStats';
import { ScheduleReminders } from './components/ScheduleReminders';
import { CalendarView } from './components/CalendarView';
import { ArchiveDrawer } from './components/archive/ArchiveDrawer';
import { useSchedules } from './hooks/useSchedules';
import { useArchivedSchedules } from './hooks/useArchivedSchedules';
import { filterSchedules } from './utils/scheduleUtils';
import type { Schedule } from './types/schedule';

export function App() {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [view, setView] = useState<'list' | 'calendar'>('calendar');
  const [showArchive, setShowArchive] = useState(false);

  const { schedules, addSchedule, updateSchedule, deleteSchedule, toggleStatus } = useSchedules();
  const { archivedSchedules, archiveSchedule, restoreSchedule, deleteArchived } = useArchivedSchedules();

  const filteredSchedules = filterSchedules(schedules, search, selectedTag, selectedStatus);

  const handleToggleStatus = async (id: string) => {
    const schedule = schedules.find(s => s.id === id);
    if (schedule && schedule.status === 'pending') {
      const archived = archiveSchedule(schedule);
      if (archived) {
        deleteSchedule(id);
      }
    } else if (schedule) {
      toggleStatus(id);
    }
  };

  const handleRestoreSchedule = (id: string) => {
    const schedule = restoreSchedule(id);
    if (schedule) {
      const { archivedAt, ...restSchedule } = schedule;
      addSchedule({
        ...restSchedule,
        status: 'pending',
      });
    }
  };

  const handleDateSelect = (date: Date) => {
    const startTime = new Date(date);
    startTime.setHours(9, 0, 0, 0);
    
    const endTime = new Date(date);
    endTime.setHours(18, 0, 0, 0);

    setEditingSchedule({
      id: '',
      title: '',
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      status: 'pending',
      tag: 'work',
      createdAt: '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <header className="flex items-center justify-center mb-8">
          <Calendar className="w-8 h-8 text-blue-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-800">日程管理</h1>
        </header>

        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <ScheduleStats schedules={schedules} />
            <button
              onClick={() => setShowArchive(true)}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
            >
              <Archive className="w-5 h-5" />
              <span className="hidden sm:inline">查看归档</span>
            </button>
          </div>

          <ScheduleReminders 
            schedules={schedules} 
            onScheduleClick={(schedule) => {
              setEditingSchedule(schedule);
              setView('calendar');
            }} 
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className={view === 'calendar' ? 'lg:col-span-2' : 'lg:col-span-3'}>
              {view === 'calendar' ? (
                <CalendarView
                  schedules={schedules}
                  onSelectDate={handleDateSelect}
                  onEdit={setEditingSchedule}
                  onDelete={deleteSchedule}
                  onToggleStatus={handleToggleStatus}
                />
              ) : (
                <>
                  <ScheduleFilters
                    search={search}
                    onSearchChange={setSearch}
                    selectedTag={selectedTag}
                    onTagChange={setSelectedTag}
                    selectedStatus={selectedStatus}
                    onStatusChange={setSelectedStatus}
                  />
                  <ScheduleList
                    schedules={filteredSchedules}
                    onDelete={deleteSchedule}
                    onEdit={setEditingSchedule}
                    onToggleStatus={handleToggleStatus}
                  />
                </>
              )}
            </div>
            
            <div className={view === 'calendar' ? 'lg:col-span-1' : 'lg:col-span-3'}>
              <ScheduleForm
                onSubmit={editingSchedule?.id
                  ? (data) => {
                      updateSchedule(editingSchedule.id, data);
                      setEditingSchedule(null);
                    }
                  : addSchedule
                }
                onCancel={editingSchedule ? () => setEditingSchedule(null) : undefined}
                initialData={editingSchedule || undefined}
              />
            </div>
          </div>
        </div>
      </div>

      <ArchiveDrawer
        isOpen={showArchive}
        onClose={() => setShowArchive(false)}
        archivedSchedules={archivedSchedules}
        onRestore={handleRestoreSchedule}
        onDelete={deleteArchived}
      />
    </div>
  );
}