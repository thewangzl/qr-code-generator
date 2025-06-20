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

  // 判断是否有二维码内容
  const hasContent = (() => {
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
  })();

  return (
    <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200/50 backdrop-blur-sm p-6 sm:p-8">
      <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-4 text-center">QR Code Preview</h2>
      <div className="flex justify-center">
        <div className="w-full max-w-[300px] aspect-square relative flex items-center justify-center">
          <div ref={qrRef} className="w-full h-full" />
          {!hasContent && (
            <svg
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-40 h-40 opacity-60 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            >
              <rect x="8" y="8" width="28" height="28" rx="4" fill="#e5e7eb" />
              <rect x="8" y="44" width="8" height="8" rx="2" fill="#e5e7eb" />
              <rect x="44" y="8" width="8" height="8" rx="2" fill="#e5e7eb" />
              <rect x="44" y="44" width="28" height="28" rx="4" fill="#e5e7eb" />
              <rect x="84" y="8" width="28" height="28" rx="4" fill="#e5e7eb" />
              <rect x="84" y="44" width="8" height="8" rx="2" fill="#e5e7eb" />
              <rect x="8" y="84" width="28" height="28" rx="4" fill="#e5e7eb" />
              <rect x="44" y="84" width="8" height="8" rx="2" fill="#e5e7eb" />
              <rect x="84" y="84" width="28" height="28" rx="4" fill="#e5e7eb" />
              <rect x="60" y="60" width="8" height="8" rx="2" fill="#e5e7eb" />
              <rect x="100" y="60" width="8" height="8" rx="2" fill="#e5e7eb" />
              <rect x="60" y="100" width="8" height="8" rx="2" fill="#e5e7eb" />
            </svg>
          )}
        </div>
      </div>
      {hasContent && (
        <div className="flex justify-center mt-6">
          <button
            className="inline-block px-4 py-1.5 mr-2 rounded-lg bg-blue-600 text-white text-sm font-medium shadow hover:bg-blue-700 transition-colors"
            onClick={() => qrCode.current?.download('png')}
          >
            Download PNG
          </button>
          <button
            className="inline-block px-4 py-1.5 rounded-lg bg-gray-100 text-gray-800 text-sm font-medium shadow hover:bg-gray-200 transition-colors"
            onClick={() => qrCode.current?.download('svg')}
          >
            Download SVG
          </button>
        </div>
      )}
    </div>
  );
} 