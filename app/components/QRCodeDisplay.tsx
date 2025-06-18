'use client';

import { useEffect, useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import QRCodeStyling, { DrawType, CornerSquareType } from 'qr-code-styling';
import { QRCodeStyle } from './QRCodeStyle';

export type EyeStyleType = 'square' | 'rounded' | 'circle';

export interface QRCodeDisplayProps {
  data: string;
  style: QRCodeStyle;
  isPreview?: boolean;
}

export default function QRCodeDisplay({ data, style, isPreview = false }: QRCodeDisplayProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  // 获取定位点样式
  const getEyeStyle = (style: string): CornerSquareType => {
    switch (style) {
      case 'circle':
        return 'extra-rounded';
      case 'rounded':
        return 'rounded';
      default:
        return 'square';
    }
  };

  // 初始化 QR 码
  useEffect(() => {
    if (!data || !qrRef.current) return;

    // 清理之前的 QR 码
    if (qrRef.current) {
      qrRef.current.innerHTML = '';
    }
    if (qrCodeRef.current) {
      qrCodeRef.current = null;
    }

    console.log('QRCodeDisplay - Current style:', {
      ...style,
      logo: style.logo ? 'Logo present' : 'No logo'
    });

    // 创建 QR 码实例
    const qrCode = new QRCodeStyling({
      width: isPreview ? 120 : 300,
      height: isPreview ? 120 : 300,
      type: 'canvas',
      data: data,
      dotsOptions: {
        color: style.fgColor,
        type: 'rounded',
      },
      cornersSquareOptions: {
        color: style.fgColor,
        type: getEyeStyle(style.eyeStyle),
      },
      cornersDotOptions: {
        color: style.fgColor,
        type: 'dot',
      },
      backgroundOptions: {
        color: style.bgColor,
      },
      qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: 'H',
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 0,
      },
    });

    // 如果有 logo，设置它
    if (style.logo) {
      console.log('Setting logo in QR code');
      qrCode.update({
        image: style.logo,
        imageOptions: {
          hideBackgroundDots: true,
          imageSize: 0.4,
          margin: 0,
        },
      });
    }

    // 保存实例引用
    qrCodeRef.current = qrCode;

    // 渲染 QR 码
    try {
      qrCode.append(qrRef.current);
      console.log('QRCodeDisplay - QR code generated successfully');

      // 获取 QR 码的 Data URL
      qrCode.getRawData().then((data) => {
        if (data) {
          const blob = new Blob([data], { type: 'image/png' });
          const url = URL.createObjectURL(blob);
          setQrDataUrl(url);
        }
      }).catch(error => {
        console.error('QRCodeDisplay - Error getting QR code data:', error);
      });
    } catch (error) {
      console.error('QRCodeDisplay - Error generating QR code:', error);
    }

    // 清理函数
    return () => {
      if (qrRef.current) {
        qrRef.current.innerHTML = '';
      }
      if (qrDataUrl) {
        URL.revokeObjectURL(qrDataUrl);
      }
    };
  }, [data, style, isPreview]);

  const handleDownload = () => {
    if (!qrCodeRef.current) return;
    qrCodeRef.current.download({ name: 'qrcode', extension: 'png' });
  };

  if (!data) {
    return (
      <div className={`flex items-center justify-center ${isPreview ? 'w-[120px] h-[120px]' : 'w-[300px] h-[300px]'} bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200`}>
        <p className="text-sm text-gray-400">Enter content to generate QR code</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center ${isPreview ? 'w-[120px]' : 'w-[300px]'}`}>
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <div ref={qrRef} className="rounded-xl overflow-hidden" />
        {/* 备用 QR 码显示 */}
        {!qrDataUrl && (
          <QRCodeSVG
            value={data}
            size={isPreview ? 120 : 300}
            bgColor={style.bgColor}
            fgColor={style.fgColor}
            level="H"
            includeMargin={true}
            className="rounded-xl"
          />
        )}
      </div>
      {!isPreview && (
        <div className="mt-6 text-center space-y-4">
          <p className="text-sm text-gray-500">Scan this QR code with your device</p>
          <button
            onClick={handleDownload}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200 font-medium shadow-sm hover:shadow-md"
          >
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
} 