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
        handleStyleChange({ ...style, logo: result });
      }
    };
    reader.onerror = () => {
      alert('Error reading file');
    };
    reader.readAsDataURL(file);
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
        <div className="lg:col-span-7 space-y-4">
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
            <div className="space-y-6">
              {/* Templates */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Templates</h3>
                <QRCodeTemplates onTemplateSelect={handleTemplateSelect} />
              </div>

              {/* Color Settings */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Colors</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Foreground</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={style.fgColor}
                        onChange={(e) => handleStyleChange({ ...style, fgColor: e.target.value })}
                        className="w-10 h-10 rounded-lg border border-gray-300 cursor-pointer"
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
                        onChange={(e) => handleStyleChange({ ...style, bgColor: e.target.value })}
                        className="w-10 h-10 rounded-lg border border-gray-300 cursor-pointer"
                      />
                      <span className="text-sm text-gray-600">{style.bgColor}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Eye Style */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Eye Style</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStyleChange({ ...style, eyeStyle: 'square' })}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      style.eyeStyle === 'square'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Square
                  </button>
                  <button
                    onClick={() => handleStyleChange({ ...style, eyeStyle: 'rounded' })}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      style.eyeStyle === 'rounded'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Rounded
                  </button>
                </div>
              </div>

              {/* Logo Upload */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Logo</h3>
                <div className="flex items-center gap-4">
                  <label className="flex-1">
                    <div className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
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
                      onClick={() => handleStyleChange({ ...style, logo: undefined })}
                      className="px-3 py-1.5 text-sm text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
                {style.logo && (
                  <div className="mt-2">
                    <img
                      src={style.logo}
                      alt="Logo preview"
                      className="w-16 h-16 object-contain rounded-lg border border-gray-200"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：QR 码显示 */}
        <div className="lg:col-span-5">
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