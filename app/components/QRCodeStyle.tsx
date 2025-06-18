'use client';

import { useState, useEffect } from 'react';

export interface QRCodeStyle {
  fgColor: string;
  bgColor: string;
  eyeStyle: 'square' | 'circle';
  logo?: string;
}

interface QRCodeStyleProps {
  style: QRCodeStyle;
  onStyleChange: (style: QRCodeStyle) => void;
}

export default function QRCodeStyle({ style, onStyleChange }: QRCodeStyleProps) {
  const [localStyle, setLocalStyle] = useState<QRCodeStyle>({
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
    onStyleChange(newStyle);
  };

  const handleEyeStyleChange = (style: 'square' | 'circle') => {
    const newStyle = { ...localStyle, eyeStyle: style };
    setLocalStyle(newStyle);
    onStyleChange(newStyle);
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newStyle = { ...localStyle, logo: e.target?.result as string };
        setLocalStyle(newStyle);
        onStyleChange(newStyle);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Style Settings</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Foreground Color
          </label>
          <input
            type="color"
            value={localStyle.fgColor}
            onChange={(e) => handleColorChange('fgColor', e.target.value)}
            className="w-full h-10 rounded-lg cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Background Color
          </label>
          <input
            type="color"
            value={localStyle.bgColor}
            onChange={(e) => handleColorChange('bgColor', e.target.value)}
            className="w-full h-10 rounded-lg cursor-pointer"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Eye Style
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleEyeStyleChange('square')}
            className={`p-2 border rounded-lg ${
              localStyle.eyeStyle === 'square'
                ? 'bg-blue-100 border-blue-500'
                : 'border-gray-300 hover:border-blue-300'
            }`}
          >
            <div className="w-6 h-6 mx-auto border-2 border-current" />
          </button>
          <button
            onClick={() => handleEyeStyleChange('circle')}
            className={`p-2 border rounded-lg ${
              localStyle.eyeStyle === 'circle'
                ? 'bg-blue-100 border-blue-500'
                : 'border-gray-300 hover:border-blue-300'
            }`}
          >
            <div className="w-6 h-6 mx-auto border-2 border-current rounded-full" />
          </button>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          添加 Logo
        </label>
        <div className="flex items-center space-x-4">
          <label className="flex-1">
            <div className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 text-center">
              <span className="text-sm text-gray-600">选择图片</span>
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
                onStyleChange(newStyle);
              }}
              className="px-3 py-2 text-sm text-red-600 hover:text-red-700"
            >
              移除
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 