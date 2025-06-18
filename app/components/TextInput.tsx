interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TextInput({ value, onChange }: TextInputProps) {
  return (
    <div className="space-y-4">
      <label htmlFor="text-input" className="block text-sm font-medium text-gray-700">
        输入文本
      </label>
      <textarea
        id="text-input"
        className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="请输入要生成二维码的文本..."
      />
    </div>
  );
} 