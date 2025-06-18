'use client';

import { useState } from 'react';
import TypeSelector, { QRCodeType } from './TypeSelector';
import InputForms from './InputForms';
import QRCodeDisplay from './QRCodeDisplay';
import QRCodeStyle from './QRCodeStyle';

interface QRCodeStyle {
  fgColor: string;
  bgColor: string;
  eyeRadius: number;
  logo?: string;
}

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

  const [style, setStyle] = useState<QRCodeStyle>({
    fgColor: '#000000',
    bgColor: '#FFFFFF',
    eyeRadius: 0,
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

  const handleStyleChange = (newStyle: QRCodeStyle) => {
    setStyle(newStyle);
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
          <QRCodeStyle onStyleChange={handleStyleChange} />
        </div>
      </div>
      <QRCodeDisplay text={getQRCodeValue()} style={style} />
    </div>
  );
} 