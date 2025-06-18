'use client';

import { QRCodeSVG } from 'qrcode.react';

interface QRCodeDisplayProps {
  text: string;
  style?: {
    fgColor: string;
    bgColor: string;
    eyeRadius: number;
    logo?: string;
  };
}

export default function QRCodeDisplay({ text, style }: QRCodeDisplayProps) {
  const handleDownload = () => {
    const svg = document.querySelector('svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = 'qrcode.png';
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-lg relative">
        {text ? (
          <div className="relative">
            <QRCodeSVG
              value={text}
              size={200}
              level="H"
              includeMargin={true}
              fgColor={style?.fgColor || '#000000'}
              bgColor={style?.bgColor || '#FFFFFF'}
              imageSettings={style?.logo ? {
                src: style.logo,
                height: 48,
                width: 48,
                excavate: true,
              } : undefined}
            />
          </div>
        ) : (
          <div className="w-[200px] h-[200px] flex items-center justify-center text-gray-400">
            二维码将在这里显示
          </div>
        )}
      </div>
      {text && (
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          下载二维码
        </button>
      )}
    </div>
  );
} 