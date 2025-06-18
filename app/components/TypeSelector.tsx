export type QRCodeType = 'url' | 'text' | 'wifi' | 'vcard';

interface TypeSelectorProps {
  selectedType: QRCodeType;
  onTypeChange: (type: QRCodeType) => void;
}

export default function TypeSelector({ selectedType, onTypeChange }: TypeSelectorProps) {
  const types: { value: QRCodeType; label: string }[] = [
    { value: 'url', label: '网址' },
    { value: 'text', label: '文本' },
    { value: 'wifi', label: 'WiFi' },
    { value: 'vcard', label: '名片' },
  ];

  return (
    <div className="mb-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {types.map((type) => (
          <button
            key={type.value}
            onClick={() => onTypeChange(type.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${selectedType === type.value
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
} 