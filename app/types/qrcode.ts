export type QRCodeType = 'url' | 'text' | 'vcard' | 'wifi' | 'email' | 'phone' | 'sms' | 'event' | 'location';

export interface QRCodeStyle {
  fgColor: string;
  bgColor: string;
  eyeStyle: 'square' | 'rounded';
  logo?: string;
}

export interface QRCodeData {
  text?: string;
  url?: string;
  vcard?: {
    name?: string;
    phone?: string;
    email?: string;
    company?: string;
    title?: string;
    address?: string;
  };
  wifi?: {
    ssid?: string;
    password?: string;
    encryption?: 'WPA' | 'WEP' | 'nopass';
    hidden?: boolean;
  };
  email?: {
    address?: string;
    subject?: string;
    body?: string;
  };
  phone?: string;
  sms?: {
    phone?: string;
    message?: string;
  };
  event?: {
    title?: string;
    start?: string;
    end?: string;
    location?: string;
    description?: string;
  };
  location?: {
    latitude?: number;
    longitude?: number;
    name?: string;
  };
} 