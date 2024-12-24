import { useEffect, useCallback } from 'react';
import type { Schedule } from '../types/schedule';

export function useScheduleReminders(schedules: Schedule[]) {
  const checkReminders = useCallback(() => {
    const now = new Date();
    
    schedules.forEach(schedule => {
      if (schedule.reminderTime && !schedule.reminderSent) {
        const reminderTime = new Date(schedule.reminderTime);
        
        if (now >= reminderTime) {
          // 检查浏览器是否支持通知
          if ('Notification' in window) {
            // 请求通知权限
            Notification.requestPermission().then(permission => {
              if (permission === 'granted') {
                new Notification('日程提醒', {
                  body: `${schedule.title} 即将开始`,
                  icon: '/favicon.ico'
                });
              }
            });
          }
          
          // 可以在这里添加其他提醒方式，比如声音提醒
          const audio = new Audio('/notification.mp3');
          audio.play().catch(() => {
            // 处理自动播放限制
            console.log('Audio playback failed');
          });
        }
      }
    });
  }, [schedules]);

  useEffect(() => {
    // 每分钟检查一次提醒
    const intervalId = setInterval(checkReminders, 60000);
    
    // 初始检查
    checkReminders();
    
    return () => clearInterval(intervalId);
  }, [checkReminders]);
}