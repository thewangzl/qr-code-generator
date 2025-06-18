import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import QRCodeTemplates from './QRCodeTemplates';
import { QRCodeStyle as QRCodeStyleType } from '../types/qrcode';

interface QRCodeStylePanelProps {
  style: QRCodeStyleType;
  onStyleChange: (style: QRCodeStyleType) => void;
}

// 预设的 Logo 选项
const PRESET_LOGOS = [
  {
    id: 'camera',
    name: 'Camera',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
      <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
      <path fill-rule="evenodd" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
    </svg>`
  },
  {
    id: 'scan',
    name: 'Scan Me',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
      <path fill-rule="evenodd" d="M2.25 4.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875V17.25a4.5 4.5 0 11-9 0V4.125zm4.5 14.25a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" clip-rule="evenodd" />
      <path d="M10.719 21.75h9.156c1.036 0 1.875-.84 1.875-1.875v-5.25c0-1.036-.84-1.875-1.875-1.875h-.14l-8.742 8.743c-.09.089-.18.175-.274.257zM12.738 17.625l6.474-6.474a1.875 1.875 0 000-2.651L15.5 4.787a1.875 1.875 0 00-2.651 0l-.1.099V17.25c0 .126-.003.251-.01.375z" />
    </svg>`
  },
  {
    id: 'qr',
    name: 'QR Code',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/><path d="M7 17v.01M3 21h4v-4"/></svg>`
  }
];

export default function QRCodeStylePanel({ style, onStyleChange }: QRCodeStylePanelProps) {
  const [activeSection, setActiveSection] = useState<'template' | 'color' | 'eye' | 'logo' | null>(null);

  const toggleSection = (section: 'template' | 'color' | 'eye' | 'logo') => {
    setActiveSection(activeSection === section ? null : section);
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
              <div className="grid grid-cols-8 gap-1.5">
                {/* 预设 Logo 选项 */}
                {PRESET_LOGOS.map((logo) => (
                  <button
                    key={logo.id}
                    onClick={() => onStyleChange({ ...style, logo: `data:image/svg+xml,${encodeURIComponent(logo.svg)}` })}
                    className={`aspect-square p-1 rounded border flex items-center justify-center transition-all duration-200 ${
                      style.logo?.includes(logo.id)
                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500/20'
                        : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
                    }`}
                  >
                    <span className="w-6 h-6 flex items-center justify-center text-gray-600">
                      <span style={{ display: 'block', width: '100%', height: '100%' }} dangerouslySetInnerHTML={{ __html: logo.svg.replace('<svg ', '<svg style=\'display:block;width:100%;height:100%;\' ') }} />
                    </span>
                  </button>
                ))}

                {/* 自定义上传 */}
                <label className="aspect-square flex flex-col items-center justify-center">
                  <div className={`w-full h-full flex flex-col items-center justify-center rounded border transition-all duration-200 cursor-pointer ${
                    style.logo && !PRESET_LOGOS.some(logo => style.logo?.includes(logo.id))
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500/20'
                      : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
                  }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-600 block">
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                    </svg>
                    <span className="block text-xs text-gray-500 mt-1">Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </div>
                </label>

                {/* 移除按钮 */}
                {style.logo && (
                  <button
                    onClick={() => onStyleChange({ ...style, logo: undefined })}
                    className="aspect-square p-1 rounded border border-gray-200 hover:border-red-200 hover:bg-red-50 flex flex-col items-center justify-center transition-all duration-200 group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-400 group-hover:text-red-500 block">
                      <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.12" />
                      <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M15 9l-6 6m0-6l6 6" />
                    </svg>
                    <span className="block text-xs text-gray-500 mt-1">Remove</span>
                  </button>
                )}
              </div>
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
      </div>
    </div>
  );
} 