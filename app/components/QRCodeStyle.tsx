'use client';

import { useState, useEffect } from 'react';
import { QRCodeStyle as QRCodeStyleType } from '../types/qrcode';

export interface QRCodeStyle {
  fgColor: string;
  bgColor: string;
  eyeStyle: 'square' | 'rounded' | 'circle';
  logo?: string;
}

interface QRCodeStyleProps {
  style: QRCodeStyleType;
  onChange: (style: QRCodeStyleType) => void;
}

export default function QRCodeStyle({ style, onChange }: QRCodeStyleProps) {
  const [localStyle, setLocalStyle] = useState<QRCodeStyleType>({
    ...style,
    eyeStyle: style.eyeStyle || 'square'
  });

  useEffect(() => {
    setLocalStyle({
      ...style,
      eyeStyle: style.eyeStyle || 'square'
    });
  }, [style]);

  const handleColorChange = (type: 'fgColor' | 'bgColor', value: string) => {
    const newStyle = { ...localStyle, [type]: value };
    setLocalStyle(newStyle);
    onChange(newStyle);
  };

  const handleEyeStyleChange = (style: 'square' | 'rounded' | 'circle') => {
    const newStyle = { ...localStyle, eyeStyle: style };
    setLocalStyle(newStyle);
    onChange(newStyle);
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newStyle = { ...localStyle, logo: e.target?.result as string };
        setLocalStyle(newStyle);
        onChange(newStyle);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Style Settings</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Foreground Color
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={localStyle.fgColor}
              onChange={(e) => handleColorChange('fgColor', e.target.value)}
              className="w-10 h-10 rounded-lg cursor-pointer border border-gray-200"
            />
            <span className="text-xs text-gray-500">{localStyle.fgColor}</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Background Color
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={localStyle.bgColor}
              onChange={(e) => handleColorChange('bgColor', e.target.value)}
              className="w-10 h-10 rounded-lg cursor-pointer border border-gray-200"
            />
            <span className="text-xs text-gray-500">{localStyle.bgColor}</span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Eye Style
        </label>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => handleEyeStyleChange('square')}
            className={`p-3 border-2 rounded-lg transition-all duration-200 ${
              localStyle.eyeStyle === 'square'
                ? 'bg-blue-50 border-blue-500 text-blue-600'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
            }`}
          >
            <div className="w-6 h-6 mx-auto border-2 border-current" />
            <span className="block mt-1 text-xs font-medium">Square</span>
          </button>
          
          <button
            onClick={() => handleEyeStyleChange('rounded')}
            className={`p-3 border-2 rounded-lg transition-all duration-200 ${
              localStyle.eyeStyle === 'rounded'
                ? 'bg-blue-50 border-blue-500 text-blue-600'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
            }`}
          >
            <div className="w-6 h-6 mx-auto border-2 border-current" />
            <span className="block mt-1 text-xs font-medium">Rounded</span>
          </button>
          
          <button
            onClick={() => handleEyeStyleChange('circle')}
            className={`p-3 border-2 rounded-lg transition-all duration-200 ${
              localStyle.eyeStyle === 'circle'
                ? 'bg-blue-50 border-blue-500 text-blue-600'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
            }`}
          >
            <div className="w-6 h-6 mx-auto border-2 border-current rounded-full" />
            <span className="block mt-1 text-xs font-medium">Circle</span>
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Logo
        </label>
        <div className="flex items-center space-x-3">
          <label className="flex-1">
            <div className="w-full px-3 py-2 bg-white border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-center">
              <span className="text-xs font-medium text-gray-600">Choose Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </div>
          </label>
          {style.logo && (
            <button
              onClick={() => {
                const newStyle = { ...style, logo: undefined };
                setLocalStyle(newStyle);
                onChange(newStyle);
              }}
              className="px-3 py-2 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 