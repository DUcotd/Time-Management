import React from 'react';
import { Check } from 'lucide-react';

interface ColorOption {
  bg: string;
  text: string;
  name: string;
}

const COLOR_OPTIONS: ColorOption[] = [
  { bg: 'bg-blue-100', text: 'text-blue-800', name: '蓝色' },
  { bg: 'bg-green-100', text: 'text-green-800', name: '绿色' },
  { bg: 'bg-purple-100', text: 'text-purple-800', name: '紫色' },
  { bg: 'bg-red-100', text: 'text-red-800', name: '红色' },
  { bg: 'bg-yellow-100', text: 'text-yellow-800', name: '黄色' },
  { bg: 'bg-pink-100', text: 'text-pink-800', name: '粉色' },
  { bg: 'bg-indigo-100', text: 'text-indigo-800', name: '靛蓝' },
  { bg: 'bg-orange-100', text: 'text-orange-800', name: '橙色' },
  { bg: 'bg-teal-100', text: 'text-teal-800', name: '青色' },
  { bg: 'bg-cyan-100', text: 'text-cyan-800', name: '蓝绿' },
];

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {COLOR_OPTIONS.map((color) => {
        const colorClass = `${color.bg} ${color.text}`;
        const isSelected = value === colorClass;
        
        return (
          <button
            key={color.name}
            type="button"
            onClick={() => onChange(colorClass)}
            className={`
              w-10 h-10 rounded-full flex items-center justify-center
              border-2 transition-all
              ${isSelected ? 'border-gray-800' : 'border-transparent hover:border-gray-300'}
            `}
            title={color.name}
          >
            <div className={`
              w-8 h-8 rounded-full ${color.bg}
              flex items-center justify-center
            `}>
              {isSelected && <Check className="w-4 h-4" />}
            </div>
          </button>
        );
      })}
    </div>
  );
}