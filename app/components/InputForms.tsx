import { QRCodeType } from './TypeSelector';

interface InputFormsProps {
  type: QRCodeType;
  values: {
    url?: string;
    text?: string;
    wifi?: {
      ssid: string;
      password: string;
      encryption: 'WPA' | 'WEP' | 'nopass';
    };
    vcard?: {
      name: string;
      phone: string;
      email: string;
      company: string;
      title: string;
    };
  };
  onChange: (type: QRCodeType, value: any) => void;
}

export default function InputForms({ type, values, onChange }: InputFormsProps) {
  const renderUrlInput = () => (
    <div className="space-y-4">
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700">
          网址
        </label>
        <input
          type="url"
          id="url"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="https://example.com"
          value={values.url || ''}
          onChange={(e) => onChange('url', e.target.value)}
        />
      </div>
    </div>
  );

  const renderTextInput = () => (
    <div className="space-y-4">
      <div>
        <label htmlFor="text" className="block text-sm font-medium text-gray-700">
          文本内容
        </label>
        <textarea
          id="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={4}
          placeholder="输入文本内容..."
          value={values.text || ''}
          onChange={(e) => onChange('text', e.target.value)}
        />
      </div>
    </div>
  );

  const renderWifiInput = () => (
    <div className="space-y-4">
      <div>
        <label htmlFor="ssid" className="block text-sm font-medium text-gray-700">
          网络名称 (SSID)
        </label>
        <input
          type="text"
          id="ssid"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={values.wifi?.ssid || ''}
          onChange={(e) => onChange('wifi', { ...values.wifi, ssid: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          密码
        </label>
        <input
          type="password"
          id="password"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={values.wifi?.password || ''}
          onChange={(e) => onChange('wifi', { ...values.wifi, password: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="encryption" className="block text-sm font-medium text-gray-700">
          加密类型
        </label>
        <select
          id="encryption"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={values.wifi?.encryption || 'WPA'}
          onChange={(e) => onChange('wifi', { ...values.wifi, encryption: e.target.value as 'WPA' | 'WEP' | 'nopass' })}
        >
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">无密码</option>
        </select>
      </div>
    </div>
  );

  const renderVCardInput = () => (
    <div className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          姓名
        </label>
        <input
          type="text"
          id="name"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={values.vcard?.name || ''}
          onChange={(e) => onChange('vcard', { ...values.vcard, name: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          电话
        </label>
        <input
          type="tel"
          id="phone"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={values.vcard?.phone || ''}
          onChange={(e) => onChange('vcard', { ...values.vcard, phone: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          邮箱
        </label>
        <input
          type="email"
          id="email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={values.vcard?.email || ''}
          onChange={(e) => onChange('vcard', { ...values.vcard, email: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700">
          公司
        </label>
        <input
          type="text"
          id="company"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={values.vcard?.company || ''}
          onChange={(e) => onChange('vcard', { ...values.vcard, company: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          职位
        </label>
        <input
          type="text"
          id="title"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={values.vcard?.title || ''}
          onChange={(e) => onChange('vcard', { ...values.vcard, title: e.target.value })}
        />
      </div>
    </div>
  );

  switch (type) {
    case 'url':
      return renderUrlInput();
    case 'text':
      return renderTextInput();
    case 'wifi':
      return renderWifiInput();
    case 'vcard':
      return renderVCardInput();
    default:
      return null;
  }
} 