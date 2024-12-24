import { useState, useCallback } from 'react';
import type { CustomTag } from '../types/schedule';

const DEFAULT_TAGS: CustomTag[] = [
  { id: 'work', name: '工作', color: 'bg-blue-100 text-blue-800' },
  { id: 'personal', name: '个人', color: 'bg-green-100 text-green-800' },
  { id: 'meeting', name: '会议', color: 'bg-purple-100 text-purple-800' },
  { id: 'other', name: '其他', color: 'bg-gray-100 text-gray-800' },
];

export function useTags() {
  const [tags, setTags] = useState<CustomTag[]>(() => {
    const saved = localStorage.getItem('tags');
    return saved ? JSON.parse(saved) : DEFAULT_TAGS;
  });

  const saveToLocalStorage = useCallback((newTags: CustomTag[]) => {
    localStorage.setItem('tags', JSON.stringify(newTags));
  }, []);

  const addTag = useCallback((name: string) => {
    const newTag: CustomTag = {
      id: crypto.randomUUID(),
      name,
      color: 'bg-blue-100 text-blue-800', // 默认颜色
    };
    const newTags = [...tags, newTag];
    setTags(newTags);
    saveToLocalStorage(newTags);
    return newTag;
  }, [tags, saveToLocalStorage]);

  const updateTag = useCallback((id: string, name: string, color: string) => {
    const newTags = tags.map(tag =>
      tag.id === id ? { ...tag, name, color } : tag
    );
    setTags(newTags);
    saveToLocalStorage(newTags);
  }, [tags, saveToLocalStorage]);

  const deleteTag = useCallback((id: string) => {
    const newTags = tags.filter(tag => tag.id !== id);
    setTags(newTags);
    saveToLocalStorage(newTags);
  }, [tags, saveToLocalStorage]);

  return {
    tags,
    addTag,
    updateTag,
    deleteTag,
  };
}