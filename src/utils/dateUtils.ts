export const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};

export const formatTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};