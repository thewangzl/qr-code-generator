import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import QRCodeTemplates from './QRCodeTemplates';
import { QRCodeStyle as QRCodeStyleType } from '../types/qrcode';

interface QRCodeStylePanelProps {
  style: QRCodeStyleType;
  onStyleChange: (style: QRCodeStyleType) => void;
}

export default function QRCodeStylePanel({ style, onStyleChange }: QRCodeStylePanelProps) {
  const [activeSection, setActiveSection] = useState<'template' | 'color' | 'eye' | 'logo'>('template');

  const toggleSection = (section: 'template' | 'color' | 'eye' | 'logo') => {
    setActiveSection(activeSection === section ? 'template' : section);
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 检查文件类型
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // 检查文件大小（2MB限制）
    if (file.size > 2 * 1024 * 1024) {
      alert('File size should be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        onStyleChange({ ...style, logo: result });
      }
    };
    reader.onerror = () => {
      alert('Error reading file');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200/50 backdrop-blur-sm p-6 sm:p-8">
      <div className="space-y-4">
        {/* Templates */}
        <div>
          <button
            onClick={() => toggleSection('template')}
            className="w-full flex items-center justify-between text-left group bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 p-4 rounded-xl transition-all duration-200"
          >
            <h3 className="text-base font-medium text-gray-900 group-hover:text-blue-600 transition-colors">Templates</h3>
            <ChevronDownIcon
              className={`w-5 h-5 text-gray-500 transition-all duration-200 ${
                activeSection === 'template' ? 'transform rotate-180 text-blue-600' : ''
              }`}
            />
          </button>
          {activeSection === 'template' && (
            <div className="mt-4">
              <QRCodeTemplates onTemplateSelect={onStyleChange} />
            </div>
          )}
        </div>

        {/* Color Settings */}
        <div>
          <button
            onClick={() => toggleSection('color')}
            className="w-full flex items-center justify-between text-left group bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 p-4 rounded-xl transition-all duration-200"
          >
            <h3 className="text-base font-medium text-gray-900 group-hover:text-blue-600 transition-colors">Colors</h3>
            <ChevronDownIcon
              className={`w-5 h-5 text-gray-500 transition-all duration-200 ${
                activeSection === 'color' ? 'transform rotate-180 text-blue-600' : ''
              }`}
            />
          </button>
          {activeSection === 'color' && (
            <div className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Foreground</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={style.fgColor}
                      onChange={(e) => onStyleChange({ ...style, fgColor: e.target.value })}
                      className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer hover:ring-2 hover:ring-blue-500/20 transition-all"
                    />
                    <span className="text-sm text-gray-600">{style.fgColor}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Background</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={style.bgColor}
                      onChange={(e) => onStyleChange({ ...style, bgColor: e.target.value })}
                      className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer hover:ring-2 hover:ring-blue-500/20 transition-all"
                    />
                    <span className="text-sm text-gray-600">{style.bgColor}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Eye Style */}
        <div>
          <button
            onClick={() => toggleSection('eye')}
            className="w-full flex items-center justify-between text-left group bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 p-4 rounded-xl transition-all duration-200"
          >
            <h3 className="text-base font-medium text-gray-900 group-hover:text-blue-600 transition-colors">Eye Style</h3>
            <ChevronDownIcon
              className={`w-5 h-5 text-gray-500 transition-all duration-200 ${
                activeSection === 'eye' ? 'transform rotate-180 text-blue-600' : ''
              }`}
            />
          </button>
          {activeSection === 'eye' && (
            <div className="mt-4">
              <div className="flex gap-2">
                <button
                  onClick={() => onStyleChange({ ...style, eyeStyle: 'square' })}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    style.eyeStyle === 'square'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                      : 'bg-white text-gray-700 hover:bg-gray-50 ring-1 ring-gray-200'
                  }`}
                >
                  Square
                </button>
                <button
                  onClick={() => onStyleChange({ ...style, eyeStyle: 'rounded' })}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    style.eyeStyle === 'rounded'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                      : 'bg-white text-gray-700 hover:bg-gray-50 ring-1 ring-gray-200'
                  }`}
                >
                  Rounded
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Logo Upload */}
        <div>
          <button
            onClick={() => toggleSection('logo')}
            className="w-full flex items-center justify-between text-left group bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 p-4 rounded-xl transition-all duration-200"
          >
            <h3 className="text-base font-medium text-gray-900 group-hover:text-blue-600 transition-colors">Logo</h3>
            <ChevronDownIcon
              className={`w-5 h-5 text-gray-500 transition-all duration-200 ${
                activeSection === 'logo' ? 'transform rotate-180 text-blue-600' : ''
              }`}
            />
          </button>
          {activeSection === 'logo' && (
            <div className="mt-4">
              <div className="flex items-center gap-4">
                <label className="flex-1">
                  <div className="flex items-center justify-center w-full px-4 py-2 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 hover:ring-2 hover:ring-blue-500/20 transition-all">
                    <span className="text-sm text-gray-600">Choose logo</span>
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
                    onClick={() => onStyleChange({ ...style, logo: undefined })}
                    className="px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
              {style.logo && (
                <div className="mt-4">
                  <img
                    src={style.logo}
                    alt="Logo preview"
                    className="w-16 h-16 object-contain rounded-xl border border-gray-200 shadow-sm"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 