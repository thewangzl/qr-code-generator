'use client';

import QRCodeDisplay from './QRCodeDisplay';
import { QRCodeStyle } from './QRCodeStyle';

const templates = [
  {
    style: {
      fgColor: '#000000',
      bgColor: '#FFFFFF',
      eyeStyle: 'square',
    } as QRCodeStyle,
  },
  {
    style: {
      fgColor: '#1E40AF',
      bgColor: '#FFFFFF',
      eyeStyle: 'rounded',
    } as QRCodeStyle,
  },
  {
    style: {
      fgColor: '#FFFFFF',
      bgColor: '#1E40AF',
      eyeStyle: 'square',
    } as QRCodeStyle,
  },
  {
    style: {
      fgColor: '#FFFFFF',
      bgColor: '#1E40AF',
      eyeStyle: 'rounded',
    } as QRCodeStyle,
  },
  {
    style: {
      fgColor: '#000000',
      bgColor: '#F3F4F6',
      eyeStyle: 'square',
    } as QRCodeStyle,
  },
  {
    style: {
      fgColor: '#000000',
      bgColor: '#F3F4F6',
      eyeStyle: 'rounded',
    } as QRCodeStyle,
  },
  {
    style: {
      fgColor: '#1E40AF',
      bgColor: '#F3F4F6',
      eyeStyle: 'square',
    } as QRCodeStyle,
  },
  {
    style: {
      fgColor: '#1E40AF',
      bgColor: '#F3F4F6',
      eyeStyle: 'rounded',
    } as QRCodeStyle,
  },
];

interface QRCodeTemplatesProps {
  onTemplateSelect: (style: QRCodeStyle) => void;
}

export default function QRCodeTemplates({ onTemplateSelect }: QRCodeTemplatesProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {templates.map((template, index) => (
        <button
          key={index}
          onClick={() => onTemplateSelect(template.style)}
          className="group relative bg-white rounded-lg p-3 hover:shadow-md transition-shadow"
        >
          <div className="aspect-square w-full max-w-[120px] mx-auto">
            <QRCodeDisplay
              data="https://example.com"
              style={template.style}
              size={120}
            />
          </div>
        </button>
      ))}
    </div>
  );
} 