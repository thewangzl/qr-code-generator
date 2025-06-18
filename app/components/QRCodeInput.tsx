import { QRCodeType } from '../types/qrcode';

interface QRCodeInputProps {
  type: QRCodeType;
  content: string;
  onTypeChange: (type: QRCodeType) => void;
  onContentChange: (content: string) => void;
}

export default function QRCodeInput({ type, content, onTypeChange, onContentChange }: QRCodeInputProps) {
  const renderInputField = () => {
    switch (type) {
      case 'url':
        return (
          <div>
            <div className="flex gap-2">
              <input
                type="url"
                id="content"
                value={content}
                onChange={(e) => onContentChange(e.target.value)}
                placeholder="Enter URL"
                className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>
        );

      case 'text':
        return (
          <div>
            <div className="flex gap-2">
              <textarea
                id="content"
                value={content}
                onChange={(e) => onContentChange(e.target.value)}
                placeholder="Enter text"
                rows={4}
                className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
              />
            </div>
          </div>
        );

      case 'vcard':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Name</label>
                <input
                  type="text"
                  value={content}
                  onChange={(e) => onContentChange(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Phone</label>
                <input
                  type="tel"
                  value={content}
                  onChange={(e) => onContentChange(e.target.value)}
                  placeholder="+1234567890"
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Email</label>
              <input
                type="email"
                value={content}
                onChange={(e) => onContentChange(e.target.value)}
                placeholder="john@example.com"
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>
        );

      case 'wifi':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Network Name (SSID)</label>
              <input
                type="text"
                value={content}
                onChange={(e) => onContentChange(e.target.value)}
                placeholder="My WiFi"
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Password</label>
              <input
                type="password"
                value={content}
                onChange={(e) => onContentChange(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200/50 backdrop-blur-sm p-6 sm:p-8">
      {/* Type Selection */}
      <div className="mb-6">
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
            vCard
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
            disabled
            className="px-4 py-2 rounded-xl text-sm font-medium text-gray-400 bg-gray-50 ring-1 ring-gray-200 cursor-not-allowed"
          >
            Email
          </button>
          <button
            disabled
            className="px-4 py-2 rounded-xl text-sm font-medium text-gray-400 bg-gray-50 ring-1 ring-gray-200 cursor-not-allowed"
          >
            Phone
          </button>
          <button
            disabled
            className="px-4 py-2 rounded-xl text-sm font-medium text-gray-400 bg-gray-50 ring-1 ring-gray-200 cursor-not-allowed"
          >
            SMS
          </button>
          <button
            disabled
            className="px-4 py-2 rounded-xl text-sm font-medium text-gray-400 bg-gray-50 ring-1 ring-gray-200 cursor-not-allowed"
          >
            Event
          </button>
          <button
            disabled
            className="px-4 py-2 rounded-xl text-sm font-medium text-gray-400 bg-gray-50 ring-1 ring-gray-200 cursor-not-allowed"
          >
            Location
          </button>
        </div>
      </div>

      {/* Content Input */}
      {renderInputField()}
    </div>
  );
} 