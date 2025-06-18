export type QRCodeType = 'url' | 'text' | 'vcard' | 'wifi' | 'email' | 'phone' | 'sms' | 'event' | 'location';

export interface QRCodeStyle {
  fgColor: string;
  bgColor: string;
  eyeStyle: 'square' | 'rounded';
  logo?: string;
}

export interface QRCodeData {
  type: QRCodeType;
  content: string;
  style: QRCodeStyle;
} 