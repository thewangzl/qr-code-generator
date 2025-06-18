'use client';

import { QRCodeStyle } from './QRCodeStyle';
import QRCodeDisplay from './QRCodeDisplay';

interface Template {
  id: string;
  name: string;
  style: QRCodeStyle;
  preview: string;
}

export interface QRCodeTemplatesProps {
  onTemplateSelect: (templateStyle: QRCodeStyle) => void;
}

export default function QRCodeTemplates({ onTemplateSelect }: QRCodeTemplatesProps) {
  const templates: Template[] = [
    {
      id: 'classic',
      name: 'Classic Black and White',
      style: {
        fgColor: '#000000',
        bgColor: '#FFFFFF',
        eyeStyle: 'square',
      },
      preview: 'https://example.com',
    },
    {
      id: 'modern-blue',
      name: 'Modern Blue',
      style: {
        fgColor: '#2563EB',
        bgColor: '#FFFFFF',
        eyeStyle: 'rounded',
      },
      preview: 'https://example.com',
    },
    {
      id: 'dark-mode',
      name: 'Dark Mode',
      style: {
        fgColor: '#FFFFFF',
        bgColor: '#1F2937',
        eyeStyle: 'circle',
      },
      preview: 'https://example.com',
    },
    {
      id: 'gradient-purple',
      name: 'Gradient Purple',
      style: {
        fgColor: '#8B5CF6',
        bgColor: '#F3F4F6',
        eyeStyle: 'rounded',
      },
      preview: 'https://example.com',
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Templates</h3>
      <div className="grid grid-cols-2 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onTemplateSelect(template.style)}
            className="p-4 border rounded-lg hover:border-blue-500 transition-colors"
          >
            <div className="space-y-2">
              <div className="mt-2">
                <QRCodeDisplay
                  data="https://example.com"
                  style={template.style}
                  isPreview={true}
                />
              </div>
              <p className="text-sm text-gray-600">{template.name}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
} 