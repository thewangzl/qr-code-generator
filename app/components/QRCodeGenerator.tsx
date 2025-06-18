'use client';

import { useState } from 'react';
import QRCodeDisplay from './QRCodeDisplay';
import QRCodeStyle from './QRCodeStyle';
import QRCodeTemplates from './QRCodeTemplates';
import { QRCodeStyle as QRCodeStyleType } from './QRCodeStyle';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { QrCodeIcon } from '@heroicons/react/24/outline';

type StyleSection = 'template' | 'style' | 'eye' | 'logo';

type QRCodeType = 'url' | 'text' | 'vcard' | 'wifi';

interface VCardData {
  name: string;
  company: string;
  title: string;
  phone: string;
  email: string;
  website: string;
}

interface WiFiData {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export default function QRCodeGenerator() {
  const [type, setType] = useState<QRCodeType>('url');
  const [content, setContent] = useState('');
  const [vcardData, setVCardData] = useState<VCardData>({
    name: '',
    company: '',
    title: '',
    phone: '',
    email: '',
    website: ''
  });
  const [wifiData, setWifiData] = useState<WiFiData>({
    ssid: '',
    password: '',
    encryption: 'WPA',
    hidden: false
  });
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<StyleSection | null>(null);
  const [style, setStyle] = useState<QRCodeStyleType>({
    fgColor: '#000000',
    bgColor: '#FFFFFF',
    eyeStyle: 'square',
  });

  const handleTypeChange = (newType: QRCodeType) => {
    setType(newType);
    setContent('');
    setQrCodeData(null);
  };

  const handleVCardChange = (field: keyof VCardData, value: string) => {
    setVCardData(prev => ({ ...prev, [field]: value }));
  };

  const handleWiFiChange = (field: keyof WiFiData, value: string | boolean) => {
    setWifiData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = () => {
    let qrContent = '';
    
    switch (type) {
      case 'url':
      case 'text':
        if (!content) return;
        qrContent = content;
        break;
      case 'vcard':
        qrContent = `BEGIN:VCARD
VERSION:3.0
FN:${vcardData.name}
ORG:${vcardData.company}
TITLE:${vcardData.title}
TEL:${vcardData.phone}
EMAIL:${vcardData.email}
URL:${vcardData.website}
END:VCARD`;
        break;
      case 'wifi':
        qrContent = `WIFI:S:${wifiData.ssid};T:${wifiData.encryption};P:${wifiData.password};H:${wifiData.hidden};`;
        break;
    }

    setQrCodeData(qrContent);
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

  const renderInputField = () => {
    switch (type) {
      case 'url':
        return (
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter URL"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
              <button
                onClick={handleGenerate}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm whitespace-nowrap"
              >
                Generate
              </button>
            </div>
          </div>
        );
      case 'text':
        return (
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Text
            </label>
            <div className="flex gap-2">
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter text"
                rows={4}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
              />
              <button
                onClick={handleGenerate}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm whitespace-nowrap"
              >
                Generate
              </button>
            </div>
          </div>
        );
      case 'vcard':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={vcardData.name}
                  onChange={(e) => handleVCardChange('name', e.target.value)}
                  placeholder="Full Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                <input
                  type="text"
                  value={vcardData.company}
                  onChange={(e) => handleVCardChange('company', e.target.value)}
                  placeholder="Company Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={vcardData.title}
                  onChange={(e) => handleVCardChange('title', e.target.value)}
                  placeholder="Job Title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={vcardData.phone}
                  onChange={(e) => handleVCardChange('phone', e.target.value)}
                  placeholder="Phone Number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={vcardData.email}
                  onChange={(e) => handleVCardChange('email', e.target.value)}
                  placeholder="Email Address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                <input
                  type="url"
                  value={vcardData.website}
                  onChange={(e) => handleVCardChange('website', e.target.value)}
                  placeholder="Website URL"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleGenerate}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Generate
              </button>
            </div>
          </div>
        );
      case 'wifi':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Network Name (SSID)</label>
                <input
                  type="text"
                  value={wifiData.ssid}
                  onChange={(e) => handleWiFiChange('ssid', e.target.value)}
                  placeholder="WiFi Network Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={wifiData.password}
                  onChange={(e) => handleWiFiChange('password', e.target.value)}
                  placeholder="WiFi Password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Encryption</label>
                <select
                  value={wifiData.encryption}
                  onChange={(e) => handleWiFiChange('encryption', e.target.value as 'WPA' | 'WEP' | 'nopass')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                >
                  <option value="WPA">WPA/WPA2</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">No Password</option>
                </select>
              </div>
              <div className="flex items-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={wifiData.hidden}
                    onChange={(e) => handleWiFiChange('hidden', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Hidden Network</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleGenerate}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Generate
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="py-4 sm:py-6 lg:py-8">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">QR Code Generator</h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600">
          Create beautiful QR codes with custom styles and logos
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* 左侧：设置面板 */}
        <div className="lg:col-span-9 space-y-4">
          {/* QR Code Content */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6">
            {/* Type Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleTypeChange('url')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    type === 'url'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  URL
                </button>
                <button
                  onClick={() => handleTypeChange('text')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    type === 'text'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Text
                </button>
                <button
                  onClick={() => handleTypeChange('vcard')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    type === 'vcard'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  vCard
                </button>
                <button
                  onClick={() => handleTypeChange('wifi')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    type === 'wifi'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  WiFi
                </button>
                <button
                  disabled
                  className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-400 bg-gray-50 cursor-not-allowed"
                >
                  Email
                </button>
                <button
                  disabled
                  className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-400 bg-gray-50 cursor-not-allowed"
                >
                  Phone
                </button>
                <button
                  disabled
                  className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-400 bg-gray-50 cursor-not-allowed"
                >
                  SMS
                </button>
                <button
                  disabled
                  className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-400 bg-gray-50 cursor-not-allowed"
                >
                  Event
                </button>
                <button
                  disabled
                  className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-400 bg-gray-50 cursor-not-allowed"
                >
                  Location
                </button>
              </div>
            </div>

            {/* Content Input */}
            {renderInputField()}
          </div>

          {/* Style Settings */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6">
            <button
              onClick={() => toggleSection('style')}
              className="w-full flex items-center justify-between text-left"
            >
              <h2 className="text-base sm:text-lg font-medium text-gray-900">Style Settings</h2>
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
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6">
            <button
              onClick={() => toggleSection('template')}
              className="w-full flex items-center justify-between text-left"
            >
              <h2 className="text-base sm:text-lg font-medium text-gray-900">Templates</h2>
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
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-4">QR Code Preview</h2>
            <div className="flex justify-center">
              {qrCodeData ? (
                <div className="w-full">
                  <QRCodeDisplay data={qrCodeData} style={style} />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed border-gray-300 rounded-lg">
                  <QrCodeIcon className="w-12 h-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">Generate a QR code to see preview</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 