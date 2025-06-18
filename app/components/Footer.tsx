export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} QR Code Generator. All rights reserved.
          </div>
          <div className="hidden">
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500"
            >
              关于我们
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500"
            >
              使用条款
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500"
            >
              隐私政策
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 