'use client';

import { useState } from 'react';
import TypeSelector, { QRCodeType } from './TypeSelector';
import InputForms from './InputForms';
import QRCodeDisplay from './QRCodeDisplay';
import QRCodeStyle from './QRCodeStyle';
import QRCodeTemplates from './QRCodeTemplates';
import { QRCodeStyle as QRCodeStyleType } from './QRCodeStyle';

export default function QRCodeGenerator() {
  const [selectedType, setSelectedType] = useState<QRCodeType>('text');
  const [values, setValues] = useState({
    url: '',
    text: '',
    wifi: {
      ssid: '',
      password: '',
      encryption: 'WPA' as const,
    },
    vcard: {
      name: '',
      phone: '',
      email: '',
      company: '',
      title: '',
    },
  });

  const [style, setStyle] = useState<QRCodeStyleType>({
    fgColor: '#000000',
    bgColor: '#FFFFFF',
    eyeStyle: 'square',
  });

  const handleTypeChange = (type: QRCodeType) => {
    setSelectedType(type);
  };

  const handleValueChange = (type: QRCodeType, value: any) => {
    setValues(prev => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleStyleChange = (newStyle: QRCodeStyleType) => {
    setStyle(newStyle);
  };

  const handleTemplateSelect = (templateStyle: QRCodeStyleType) => {
    setStyle(templateStyle);
  };

  const getQRCodeValue = () => {
    switch (selectedType) {
      case 'url':
        return values.url;
      case 'text':
        return values.text;
      case 'wifi':
        const { ssid, password, encryption } = values.wifi;
        return `WIFI:S:${ssid};T:${encryption};P:${password};;`;
      case 'vcard':
        const { name, phone, email, company, title } = values.vcard;
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL:${phone}\nEMAIL:${email}\nORG:${company}\nTITLE:${title}\nEND:VCARD`;
      default:
        return '';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <TypeSelector selectedType={selectedType} onTypeChange={handleTypeChange} />
        <InputForms type={selectedType} values={values} onChange={handleValueChange} />
        <div className="border-t pt-6">
          <QRCodeTemplates onSelectTemplate={handleTemplateSelect} />
          <div className="mt-6">
            <QRCodeStyle style={style} onStyleChange={handleStyleChange} />
          </div>
        </div>
      </div>
      <QRCodeDisplay text={getQRCodeValue()} style={style} />
    </div>
  );
} 