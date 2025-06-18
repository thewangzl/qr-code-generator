'use client';

import { useEffect, useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import QRCodeStyling, { DrawType, CornerSquareType } from 'qr-code-styling';
import { QRCodeStyle } from './QRCodeStyle';

export type EyeStyleType = 'square' | 'rounded' | 'circle';

export interface QRCodeDisplayProps {
  data: string;
  style: QRCodeStyle;
  size?: number;
}

export default function QRCodeDisplay({ data, style, size = 400 }: QRCodeDisplayProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (!qrRef.current) return;

    // 清理旧的 QR 码
    if (qrRef.current) {
      qrRef.current.innerHTML = '';
    }

    // 创建 QR 码实例
    const qrCode = new QRCodeStyling({
      width: size,
      height: size,
      type: 'canvas',
      data: data,
      image: style.logo,
      dotsOptions: {
        color: style.fgColor,
        type: 'rounded',
      },
      backgroundOptions: {
        color: style.bgColor,
      },
      cornersSquareOptions: {
        type: style.eyeStyle === 'rounded' ? 'extra-rounded' : 'square',
        color: style.fgColor,
      },
      cornersDotOptions: {
        type: style.eyeStyle === 'rounded' ? 'dot' : 'square',
        color: style.fgColor,
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 0,
      },
    });

    // 保存实例引用
    qrCodeRef.current = qrCode;

    // 渲染 QR 码
    qrCode.append(qrRef.current);

    // 清理函数
    return () => {
      if (qrRef.current) {
        qrRef.current.innerHTML = '';
      }
      qrCodeRef.current = null;
    };
  }, [data, style, size]);

  return (
    <div className="flex justify-center items-center w-full aspect-square">
      <div ref={qrRef} className="w-full h-full" />
    </div>
  );
} 