import React, { useState } from 'react';
import { Plus, X, Edit2 } from 'lucide-react';
import { CustomTag } from '../types/schedule';
import { ColorPicker } from './ColorPicker';

interface TagManagerProps {
  tags: CustomTag[];
  availableColors: string[];
  onAddTag: (name: string) => void;
  onUpdateTag: (id: string, name: string, color: string) => void;
  onDeleteTag: (id: string) => void;
  onClose: () => void;
}

export function TagManager({
  tags,
  onAddTag,
  onUpdateTag,
  onDeleteTag,
  onClose,
}: TagManagerProps) {
  const [newTagName, setNewTagName] = useState('');
  const [editingTag, setEditingTag] = useState<CustomTag | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTagName.trim()) {
      onAddTag(newTagName.trim());
      setNewTagName('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">标签管理</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="输入新标签名称"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                添加
              </button>
            </div>
          </form>

          <div className="space-y-4">
            {tags.map(tag => (
              <div
                key={tag.id}
                className="bg-gray-50 rounded-md p-4"
              >
                {editingTag?.id === tag.id ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editingTag.name}
                      onChange={(e) => setEditingTag({ ...editingTag, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        选择颜色
                      </label>
                      <ColorPicker
                        value={editingTag.color}
                        onChange={(color) => setEditingTag({ ...editingTag, color })}
                      />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => {
                          onUpdateTag(editingTag.id, editingTag.name, editingTag.color);
                          setEditingTag(null);
                        }}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        保存
                      </button>
                      <button
                        onClick={() => setEditingTag(null)}
                        className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                      >
                        取消
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1.5 rounded ${tag.color}`}>
                      {tag.name}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingTag(tag)}
                        className="p-1 text-gray-600 hover:text-gray-800"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('确定要删除这个标签吗？')) {
                            onDeleteTag(tag.id);
                          }
                        }}
                        className="p-1 text-red-600 hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}