'use client';

import { useState } from 'react';
import { QrCodeIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import QRCodeDisplay from './QRCodeDisplay';
import QRCodeStylePanel from './QRCodeStylePanel';
import QRCodeTemplates from './QRCodeTemplates';
import QRCodeInput from './QRCodeInput';
import { QRCodeType, QRCodeStyle, QRCodeData } from '../types/qrcode';

function isValidContent(type: QRCodeType, data: QRCodeData) {
  switch (type) {
    case 'url': return !!data.url;
    case 'text': return !!data.text;
    case 'vcard': return !!data.vcard && (data.vcard.name || data.vcard.phone || data.vcard.email);
    case 'wifi': return !!data.wifi && data.wifi.ssid;
    case 'email': return !!data.email && data.email.address;
    case 'phone': return !!data.phone;
    case 'sms': return !!data.sms && data.sms.phone;
    case 'event': return !!data.event && data.event.title;
    case 'location': return !!data.location && (data.location.latitude || data.location.longitude);
    default: return false;
  }
}

export default function QRCodeGenerator() {
  const [type, setType] = useState<QRCodeType>('url');
  const [data, setData] = useState<QRCodeData>({ url: '' });
  const [style, setStyle] = useState<QRCodeStyle>({
    fgColor: '#000000',
    bgColor: '#ffffff',
    eyeStyle: 'square',
  });
  const [activeSection, setActiveSection] = useState<'template' | 'color' | 'eye' | 'logo'>('template');
  const [lastValidType, setLastValidType] = useState<QRCodeType>('url');
  const [lastValidData, setLastValidData] = useState<QRCodeData>({ url: '' });

  const handleTypeChange = (newType: QRCodeType) => {
    setType(newType);
    // 只清空输入框，不清空二维码
    switch (newType) {
      case 'url': setData({ url: '' }); break;
      case 'text': setData({ text: '' }); break;
      case 'vcard': setData({ vcard: {} }); break;
      case 'wifi': setData({ wifi: {} }); break;
      case 'email': setData({ email: {} }); break;
      case 'phone': setData({ phone: '' }); break;
      case 'sms': setData({ sms: {} }); break;
      case 'event': setData({ event: {} }); break;
      case 'location': setData({ location: {} }); break;
      default: setData({});
    }
  };

  const handleDataChange = (newData: QRCodeData) => {
    setData(newData);
    if (isValidContent(type, newData)) {
      setLastValidType(type);
      setLastValidData(newData);
    }
  };

  const handleStyleChange = (newStyle: QRCodeStyle) => {
    setStyle(newStyle);
  };

  const handleTemplateSelect = (templateStyle: QRCodeStyle) => {
    setStyle(templateStyle);
  };

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
        handleStyleChange({ ...style, logo: result });
      }
    };
    reader.onerror = () => {
      alert('Error reading file');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-10/12 mx-auto bg-gradient-to-br from-gray-50 to-gray-100 py-8 sm:py-12">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          QR Code Generator
        </h1>
        <p className="mt-3 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Create beautiful QR codes with custom styles and logos
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Panel - Input and Style */}
        <div className="lg:col-span-2 space-y-8">
          <QRCodeInput
            type={type}
            data={data}
            onTypeChange={handleTypeChange}
            onDataChange={handleDataChange}
          />
          <QRCodeStylePanel
            style={style}
            onStyleChange={handleStyleChange}
          />
        </div>

        {/* Right Panel - QR Code Preview */}
        <div className="lg:col-span-1">
          <div className="flex justify-center">
            <div className="max-w-[400px] w-full">
              <QRCodeDisplay
                type={lastValidType}
                data={lastValidData}
                style={style}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 