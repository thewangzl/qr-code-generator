'use client';

import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { QRCodeType, QRCodeData, QRCodeStyle } from '../types/qrcode';

interface QRCodeDisplayProps {
  type: QRCodeType;
  data: QRCodeData;
  style: QRCodeStyle;
}

export default function QRCodeDisplay({ type, data, style }: QRCodeDisplayProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (!qrCode.current) {
      qrCode.current = new QRCodeStyling({
        width: 300,
        height: 300,
        type: 'canvas',
        image: style.logo,
        dotsOptions: {
          color: style.fgColor,
          type: 'rounded',
        },
        backgroundOptions: {
          color: style.bgColor,
        },
        cornersSquareOptions: {
          type: style.eyeStyle,
        },
        cornersDotOptions: {
          type: style.eyeStyle,
        },
      });
    }

    if (qrRef.current) {
      qrRef.current.innerHTML = '';
      qrCode.current.append(qrRef.current);
    }

    return () => {
      if (qrRef.current) {
        qrRef.current.innerHTML = '';
      }
    };
  }, []);

  useEffect(() => {
    if (!qrCode.current) return;

    let content = '';
    switch (type) {
      case 'url':
        content = data.url || '';
        break;
      case 'text':
        content = data.text || '';
        break;
      case 'vcard':
        if (data.vcard) {
          const { name, phone, email, company, title, address } = data.vcard;
          content = `BEGIN:VCARD\nVERSION:3.0\n${name ? `FN:${name}\n` : ''}${phone ? `TEL:${phone}\n` : ''}${email ? `EMAIL:${email}\n` : ''}${company ? `ORG:${company}\n` : ''}${title ? `TITLE:${title}\n` : ''}${address ? `ADR:${address}\n` : ''}END:VCARD`;
        }
        break;
      case 'wifi':
        if (data.wifi) {
          const { ssid, password, encryption, hidden } = data.wifi;
          content = `WIFI:S:${ssid || ''};T:${encryption || 'WPA'};P:${password || ''};${hidden ? 'H:true;' : ''};`;
        }
        break;
      case 'email':
        if (data.email) {
          const { address, subject, body } = data.email;
          content = `mailto:${address || ''}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}${body ? `${subject ? '&' : '?'}body=${encodeURIComponent(body)}` : ''}`;
        }
        break;
      case 'phone':
        content = data.phone ? `tel:${data.phone}` : '';
        break;
      case 'sms':
        if (data.sms) {
          const { phone, message } = data.sms;
          content = `sms:${phone || ''}${message ? `?body=${encodeURIComponent(message)}` : ''}`;
        }
        break;
      case 'event':
        if (data.event) {
          const { title, start, end, location, description } = data.event;
          content = `BEGIN:VEVENT\nSUMMARY:${title || ''}\nDTSTART:${start || ''}\nDTEND:${end || ''}${location ? `\nLOCATION:${location}` : ''}${description ? `\nDESCRIPTION:${description}` : ''}\nEND:VEVENT`;
        }
        break;
      case 'location':
        if (data.location) {
          const { latitude, longitude, name } = data.location;
          content = `geo:${latitude || ''},${longitude || ''}${name ? `?q=${encodeURIComponent(name)}` : ''}`;
        }
        break;
    }

    qrCode.current.update({
      data: content,
      dotsOptions: {
        color: style.fgColor,
        type: 'rounded',
      },
      backgroundOptions: {
        color: style.bgColor,
      },
      cornersSquareOptions: {
        type: style.eyeStyle,
      },
      cornersDotOptions: {
        type: style.eyeStyle,
      },
      image: style.logo,
    });
  }, [type, data, style]);

  return (
    <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200/50 backdrop-blur-sm p-6 sm:p-8">
      <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-6">QR Code Preview</h2>
      <div className="flex justify-center">
        <div ref={qrRef} className="w-full max-w-[300px] aspect-square" />
      </div>
    </div>
  );
} 