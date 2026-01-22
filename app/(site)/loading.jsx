// app/(site)/loading.js
export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      <div className="relative flex items-center justify-center">
        <div className="w-24 h-24 border-4 border-gray-100 border-t-blue-600 rounded-full animate-spin"></div>
        <img src="/Hansi-Logo1.png" alt="Logo" className="absolute w-12 h-12 animate-pulse" />
      </div>
      <h2 className="mt-4 text-xl font-bold tracking-[0.2em] text-gray-800 animate-bounce">
        HANSI TRANS
      </h2>
    </div>
  );
}