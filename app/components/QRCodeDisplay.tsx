'use client';

import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { QRCodeData, QRCodeStyle as QRCodeStyleType } from '../types/qrcode';

interface QRCodeDisplayProps {
  data: QRCodeData;
  style: QRCodeStyleType;
}

export default function QRCodeDisplay({ data, style }: QRCodeDisplayProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling>();

  useEffect(() => {
    if (!qrCode.current) {
      qrCode.current = new QRCodeStyling({
        width: 300,
        height: 300,
        type: 'canvas',
        data: '',
        dotsOptions: {
          color: style.fgColor,
          type: 'square',
        },
        backgroundOptions: {
          color: style.bgColor,
        },
        cornersSquareOptions: {
          type: style.eyeStyle,
        },
        cornersDotOptions: {
          type: 'square',
        },
      });
    }

    if (qrRef.current) {
      qrCode.current.append(qrRef.current);
    }

    return () => {
      if (qrRef.current) {
        qrRef.current.innerHTML = '';
      }
    };
  }, []);

  useEffect(() => {
    if (qrCode.current) {
      qrCode.current.update({
        data: data.content,
        dotsOptions: {
          color: style.fgColor,
        },
        backgroundOptions: {
          color: style.bgColor,
        },
        cornersSquareOptions: {
          type: style.eyeStyle,
        },
        image: style.logo,
        imageOptions: {
          hideBackgroundDots: true,
          imageSize: 0.4,
          margin: 0,
        },
      });
    }
  }, [data, style]);

  return <div ref={qrRef} className="w-full aspect-square" />;
} 