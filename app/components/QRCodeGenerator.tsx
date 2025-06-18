'use client';

import { useState } from 'react';
import QRCodeDisplay from './QRCodeDisplay';
import QRCodeStyle from './QRCodeStyle';
import QRCodeTemplates from './QRCodeTemplates';
import { QRCodeStyle as QRCodeStyleType } from './QRCodeStyle';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { QrCodeIcon } from '@heroicons/react/24/outline';

type StyleSection = 'template' | 'style' | 'eye' | 'logo';

export default function QRCodeGenerator() {
  const [type, setType] = useState<'url' | 'text'>('url');
  const [content, setContent] = useState('');
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<StyleSection | null>(null);
  const [style, setStyle] = useState<QRCodeStyleType>({
    fgColor: '#000000',
    bgColor: '#FFFFFF',
    eyeStyle: 'square',
  });

  const handleTypeChange = (newType: 'url' | 'text') => {
    setType(newType);
    setContent('');
    setQrCodeData(null);
  };

  const handleGenerate = () => {
    if (!content) return;
    setQrCodeData(content);
  };

  const handleStyleChange = (newStyle: QRCodeStyleType) => {
    console.log('Style changed:', {
      ...newStyle,
      logo: newStyle.logo ? 'Logo present' : 'No logo'
    });
    setStyle(newStyle);
  };

  const handleTemplateSelect = (templateStyle: QRCodeStyleType) => {
    setStyle(templateStyle);
    setActiveSection(null);
  };

  const toggleSection = (section: StyleSection) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">QR Code Generator</h1>
          <p className="mt-2 text-base text-gray-600">
            Create beautiful QR codes with custom styles and logos
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：设置面板 */}
          <div className="space-y-6">
            {/* QR Code Type */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">QR Code Type</h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleTypeChange('url')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    type === 'url'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  URL
                </button>
                <button
                  onClick={() => handleTypeChange('text')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    type === 'text'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Text
                </button>
              </div>
            </div>

            {/* Content Input */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Content</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                    {type === 'url' ? 'URL' : 'Text'}
                  </label>
                  <input
                    type="text"
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={type === 'url' ? 'Enter URL' : 'Enter text'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button
                  onClick={handleGenerate}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Generate QR Code
                </button>
              </div>
            </div>

            {/* Style Settings */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <button
                onClick={() => toggleSection('style')}
                className="w-full flex items-center justify-between text-left"
              >
                <h2 className="text-lg font-medium text-gray-900">Style Settings</h2>
                <ChevronDownIcon
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    activeSection === 'style' ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {activeSection === 'style' && (
                <div className="mt-4">
                  <QRCodeStyle style={style} onStyleChange={handleStyleChange} />
                </div>
              )}
            </div>

            {/* Templates */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <button
                onClick={() => toggleSection('template')}
                className="w-full flex items-center justify-between text-left"
              >
                <h2 className="text-lg font-medium text-gray-900">Templates</h2>
                <ChevronDownIcon
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    activeSection === 'template' ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {activeSection === 'template' && (
                <div className="mt-4">
                  <QRCodeTemplates onTemplateSelect={handleTemplateSelect} />
                </div>
              )}
            </div>
          </div>

          {/* 右侧：QR 码显示 */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">QR Code Preview</h2>
            {qrCodeData ? (
              <QRCodeDisplay data={qrCodeData} style={style} />
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] border-2 border-dashed border-gray-300 rounded-lg">
                <QrCodeIcon className="w-12 h-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">Generate a QR code to see preview</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 