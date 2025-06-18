'use client';

import QRCodeDisplay from './QRCodeDisplay';
import { QRCodeStyle as QRCodeStyleType } from '../types/qrcode';

interface QRCodeTemplatesProps {
  onTemplateSelect: (style: QRCodeStyleType) => void;
}

export default function QRCodeTemplates({ onTemplateSelect }: QRCodeTemplatesProps) {
  const templates = [
    {
      name: 'Classic',
      style: {
        fgColor: '#000000',
        bgColor: '#FFFFFF',
        eyeStyle: 'square' as const,
      },
    },
    {
      name: 'Modern',
      style: {
        fgColor: '#2563EB',
        bgColor: '#F8FAFC',
        eyeStyle: 'rounded' as const,
      },
    },
    {
      name: 'Dark',
      style: {
        fgColor: '#FFFFFF',
        bgColor: '#1E293B',
        eyeStyle: 'rounded' as const,
      },
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {templates.map((template) => (
        <button
          key={template.name}
          onClick={() => onTemplateSelect(template.style)}
          className="flex flex-col items-center p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:ring-2 hover:ring-blue-500/20 transition-all"
        >
          <div
            className="w-16 h-16 rounded-lg mb-2"
            style={{
              background: `linear-gradient(45deg, ${template.style.fgColor}, ${template.style.bgColor})`,
            }}
          />
          <span className="text-sm text-gray-600">{template.name}</span>
        </button>
      ))}
    </div>
  );
} 