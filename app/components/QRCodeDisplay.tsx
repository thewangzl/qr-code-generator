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
    if (qrDataUrl) {
      const link = document.createElement('a');
      link.href = qrDataUrl;
      link.download = 'qrcode.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleCopy = async () => {
    if (qrDataUrl) {
      try {
        await navigator.clipboard.writeText(qrDataUrl);
        alert('QR code image URL copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy:', err);
        alert('Failed to copy QR code URL');
      }
    }
  };

  if (!data) {
    return (
      <div className={`flex items-center justify-center ${isPreview ? 'w-[120px] h-[120px]' : 'w-[300px] h-[300px]'} bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200`}>
        <p className="text-sm text-gray-400">Enter content to generate QR code</p>
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex justify-center">
          <div ref={qrRef} className="w-full max-w-[400px] aspect-square" />
        </div>
        {qrDataUrl && (
          <div className="mt-4 flex justify-center space-x-4">
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Download
            </button>
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Copy
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 