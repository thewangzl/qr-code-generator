'use client';

import { useEffect, useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import QRCodeStyling from 'qr-code-styling';
import { QRCodeStyle } from './QRCodeStyle';

interface QRCodeDisplayProps {
  text: string;
  style: QRCodeStyle;
  isPreview?: boolean;
}

export default function QRCodeDisplay({ text, style, isPreview = false }: QRCodeDisplayProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const qrCode = useRef<QRCodeStyling | null>(null);

  // 获取定位点样式
  const getEyeStyle = (style: string) => {
    return style === 'circle' ? 'extra-rounded' : 'square';
  };

  // 初始化 QR 码
  useEffect(() => {
    if (!qrRef.current) return;

    // 清除之前的 QR 码
    qrRef.current.innerHTML = '';

    // 创建新的 QR 码实例
    qrCode.current = new QRCodeStyling({
      width: isPreview ? 120 : 300,
      height: isPreview ? 120 : 300,
      type: 'canvas',
      data: text || ' ',
      dotsOptions: {
        color: style.fgColor,
        type: 'rounded',
      },
      cornersSquareOptions: {
        type: getEyeStyle(style.eyeStyle),
        color: style.fgColor,
      },
      cornersDotOptions: {
        type: 'square',
        color: style.fgColor,
      },
      backgroundOptions: {
        color: style.bgColor,
      },
      image: style.logo,
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 10,
      },
    });

    // 将 QR 码添加到 DOM
    qrCode.current.append(qrRef.current);

    // 获取 QR 码的 Data URL
    qrCode.current.getRawData().then((data) => {
      if (data) {
        const blob = new Blob([data], { type: 'image/png' });
        const url = URL.createObjectURL(blob);
        setQrDataUrl(url);
      }
    });

    return () => {
      if (qrRef.current) {
        qrRef.current.innerHTML = '';
      }
      if (qrDataUrl) {
        URL.revokeObjectURL(qrDataUrl);
      }
    };
  }, [style.eyeStyle]); // 添加 style.eyeStyle 作为依赖

  // 更新 QR 码内容
  useEffect(() => {
    if (!qrCode.current) return;

    qrCode.current.update({
      data: text || ' ',
      dotsOptions: {
        color: style.fgColor,
        type: 'rounded',
      },
      cornersSquareOptions: {
        type: getEyeStyle(style.eyeStyle),
        color: style.fgColor,
      },
      cornersDotOptions: {
        type: 'square',
        color: style.fgColor,
      },
      backgroundOptions: {
        color: style.bgColor,
      },
      image: style.logo,
    });

    // 更新 QR 码的 Data URL
    qrCode.current.getRawData().then((data) => {
      if (data) {
        const blob = new Blob([data], { type: 'image/png' });
        const url = URL.createObjectURL(blob);
        setQrDataUrl((prevUrl) => {
          if (prevUrl) {
            URL.revokeObjectURL(prevUrl);
          }
          return url;
        });
      }
    });
  }, [text, style.fgColor, style.bgColor, style.logo]); // 分离样式依赖

  const handleDownload = () => {
    if (!qrCode.current) return;
    qrCode.current.download({ name: 'qrcode', extension: 'png' });
  };

  if (!text) {
    return (
      <div className={`flex items-center justify-center ${isPreview ? 'w-[120px] h-[120px]' : 'w-[300px] h-[300px]'} bg-gray-100 rounded-lg`}>
        <p className="text-gray-400 text-sm">Enter content to generate QR code</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center ${isPreview ? 'w-[120px]' : 'w-[300px]'}`}>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div ref={qrRef} />
        {/* 备用 QR 码显示 */}
        {!qrDataUrl && (
          <QRCodeSVG
            value={text}
            size={isPreview ? 120 : 300}
            bgColor={style.bgColor}
            fgColor={style.fgColor}
            level="H"
            includeMargin={true}
          />
        )}
      </div>
      {!isPreview && (
        <div className="mt-4 text-center space-y-2">
          <p className="text-sm text-gray-600">Scan this QR code with your device</p>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
} 