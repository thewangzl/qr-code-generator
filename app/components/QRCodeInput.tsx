import { QRCodeType, QRCodeData } from '../types/qrcode';

interface QRCodeInputProps {
  type: QRCodeType;
  data: QRCodeData;
  onTypeChange: (type: QRCodeType) => void;
  onDataChange: (data: QRCodeData) => void;
}

export default function QRCodeInput({ type, data, onTypeChange, onDataChange }: QRCodeInputProps) {
  const renderInputField = () => {
    switch (type) {
      case 'url':
        return (
          <input
            type="url"
            id="url"
            value={data.url || ''}
            onChange={(e) => onDataChange({ ...data, url: e.target.value })}
            placeholder="Enter URL"
            className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        );
      case 'text':
        return (
          <textarea
            id="text"
            value={data.text || ''}
            onChange={(e) => onDataChange({ ...data, text: e.target.value })}
            placeholder="Enter text"
            rows={4}
            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        );
      case 'vcard':
        return (
          <div className="space-y-4">
            <input
              type="text"
              value={data.vcard?.name || ''}
              onChange={(e) => onDataChange({ ...data, vcard: { ...data.vcard, name: e.target.value } })}
              placeholder="Name"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            <input
              type="tel"
              value={data.vcard?.phone || ''}
              onChange={(e) => onDataChange({ ...data, vcard: { ...data.vcard, phone: e.target.value } })}
              placeholder="Phone"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            <input
              type="email"
              value={data.vcard?.email || ''}
              onChange={(e) => onDataChange({ ...data, vcard: { ...data.vcard, email: e.target.value } })}
              placeholder="Email"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        );
      case 'wifi':
        return (
          <div className="space-y-4">
            <input
              type="text"
              value={data.wifi?.ssid || ''}
              onChange={(e) => onDataChange({ ...data, wifi: { ...data.wifi, ssid: e.target.value } })}
              placeholder="Network name (SSID)"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            <input
              type="password"
              value={data.wifi?.password || ''}
              onChange={(e) => onDataChange({ ...data, wifi: { ...data.wifi, password: e.target.value } })}
              placeholder="Password"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            <select
              value={data.wifi?.encryption || 'WPA'}
              onChange={(e) => onDataChange({ ...data, wifi: { ...data.wifi, encryption: e.target.value as 'WPA' | 'WEP' | 'nopass' } })}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            >
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">No Password</option>
            </select>
          </div>
        );
      case 'email':
        return (
          <div className="space-y-4">
            <input
              type="email"
              value={data.email?.address || ''}
              onChange={(e) => onDataChange({ ...data, email: { ...data.email, address: e.target.value } })}
              placeholder="Email address"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            <input
              type="text"
              value={data.email?.subject || ''}
              onChange={(e) => onDataChange({ ...data, email: { ...data.email, subject: e.target.value } })}
              placeholder="Subject (optional)"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            <textarea
              value={data.email?.body || ''}
              onChange={(e) => onDataChange({ ...data, email: { ...data.email, body: e.target.value } })}
              placeholder="Message (optional)"
              rows={4}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        );
      case 'phone':
        return (
          <input
            type="tel"
            value={data.phone || ''}
            onChange={(e) => onDataChange({ ...data, phone: e.target.value })}
            placeholder="Phone number"
            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        );
      case 'sms':
        return (
          <div className="space-y-4">
            <input
              type="tel"
              value={data.sms?.phone || ''}
              onChange={(e) => onDataChange({ ...data, sms: { ...data.sms, phone: e.target.value } })}
              placeholder="Phone number"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            <textarea
              value={data.sms?.message || ''}
              onChange={(e) => onDataChange({ ...data, sms: { ...data.sms, message: e.target.value } })}
              placeholder="Message (optional)"
              rows={4}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        );
      case 'event':
        return (
          <div className="space-y-4">
            <input
              type="text"
              value={data.event?.title || ''}
              onChange={(e) => onDataChange({ ...data, event: { ...data.event, title: e.target.value } })}
              placeholder="Event title"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            <input
              type="datetime-local"
              value={data.event?.start || ''}
              onChange={(e) => onDataChange({ ...data, event: { ...data.event, start: e.target.value } })}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            <input
              type="datetime-local"
              value={data.event?.end || ''}
              onChange={(e) => onDataChange({ ...data, event: { ...data.event, end: e.target.value } })}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            <input
              type="text"
              value={data.event?.location || ''}
              onChange={(e) => onDataChange({ ...data, event: { ...data.event, location: e.target.value } })}
              placeholder="Location (optional)"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            <textarea
              value={data.event?.description || ''}
              onChange={(e) => onDataChange({ ...data, event: { ...data.event, description: e.target.value } })}
              placeholder="Description (optional)"
              rows={4}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        );
      case 'location':
        return (
          <div className="space-y-4">
            <input
              type="number"
              value={data.location?.latitude || ''}
              onChange={(e) => onDataChange({ ...data, location: { ...data.location, latitude: parseFloat(e.target.value) } })}
              placeholder="Latitude"
              step="any"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            <input
              type="number"
              value={data.location?.longitude || ''}
              onChange={(e) => onDataChange({ ...data, location: { ...data.location, longitude: parseFloat(e.target.value) } })}
              placeholder="Longitude"
              step="any"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            <input
              type="text"
              value={data.location?.name || ''}
              onChange={(e) => onDataChange({ ...data, location: { ...data.location, name: e.target.value } })}
              placeholder="Location name (optional)"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200/50 backdrop-blur-sm p-6 sm:p-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-4">QR Code Content</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onTypeChange('url')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                type === 'url'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-gray-700 hover:bg-gray-50 ring-1 ring-gray-200'
              }`}
            >
              URL
            </button>
            <button
              onClick={() => onTypeChange('text')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                type === 'text'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-gray-700 hover:bg-gray-50 ring-1 ring-gray-200'
              }`}
            >
              Text
            </button>
            <button
              onClick={() => onTypeChange('vcard')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                type === 'vcard'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-gray-700 hover:bg-gray-50 ring-1 ring-gray-200'
              }`}
            >
              Contact
            </button>
            <button
              onClick={() => onTypeChange('wifi')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                type === 'wifi'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-gray-700 hover:bg-gray-50 ring-1 ring-gray-200'
              }`}
            >
              WiFi
            </button>
            <button
              onClick={() => onTypeChange('email')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                type === 'email'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-gray-700 hover:bg-gray-50 ring-1 ring-gray-200'
              }`}
            >
              Email
            </button>
            <button
              onClick={() => onTypeChange('phone')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                type === 'phone'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-gray-700 hover:bg-gray-50 ring-1 ring-gray-200'
              }`}
            >
              Phone
            </button>
            <button
              onClick={() => onTypeChange('sms')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                type === 'sms'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-gray-700 hover:bg-gray-50 ring-1 ring-gray-200'
              }`}
            >
              SMS
            </button>
            <button
              onClick={() => onTypeChange('event')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                type === 'event'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-gray-700 hover:bg-gray-50 ring-1 ring-gray-200'
              }`}
            >
              Event
            </button>
            <button
              onClick={() => onTypeChange('location')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                type === 'location'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-gray-700 hover:bg-gray-50 ring-1 ring-gray-200'
              }`}
            >
              Location
            </button>
          </div>
        </div>
        <div>{renderInputField()}</div>
      </div>
    </div>
  );
} 