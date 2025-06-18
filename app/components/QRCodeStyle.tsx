'use client';

import { useState } from 'react';

export interface QRCodeStyleProps {
  onStyleChange: (style: {
    fgColor: string;
    bgColor: string;
    eyeRadius: number;
    logo?: string;
  }) => void;
}

export default function QRCodeStyle({ onStyleChange }: QRCodeStyleProps) {
  const [style, setStyle] = useState({
    fgColor: '#000000',
    bgColor: '#FFFFFF',
    eyeRadius: 0,
    logo: '',
  });

  const handleColorChange = (type: 'fg' | 'bg', color: string) => {
    const newStyle = {
      ...style,
      [type === 'fg' ? 'fgColor' : 'bgColor']: color,
    };
    setStyle(newStyle);
    onStyleChange(newStyle);
  };

  const handleEyeRadiusChange = (radius: number) => {
    const newStyle = { ...style, eyeRadius: radius };
    setStyle(newStyle);
    onStyleChange(newStyle);
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newStyle = { ...style, logo: e.target?.result as string };
        setStyle(newStyle);
        onStyleChange(newStyle);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          二维码颜色
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">前景色</label>
            <input
              type="color"
              value={style.fgColor}
              onChange={(e) => handleColorChange('fg', e.target.value)}
              className="w-full h-8 rounded cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">背景色</label>
            <input
              type="color"
              value={style.bgColor}
              onChange={(e) => handleColorChange('bg', e.target.value)}
              className="w-full h-8 rounded cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          定位点样式
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="range"
            min="0"
            max="20"
            value={style.eyeRadius}
            onChange={(e) => handleEyeRadiusChange(Number(e.target.value))}
            className="w-full"
          />
          <span className="text-sm text-gray-500">{style.eyeRadius}px</span>
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
                const newStyle = { ...style, logo: '' };
                setStyle(newStyle);
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