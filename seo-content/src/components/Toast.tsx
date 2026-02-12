import { useEffect } from 'react';

interface ToastProps {
  type: 'success' | 'error';
  message: string;
  onDismiss: () => void;
}

export default function Toast({ type, message, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slideUp">
      <div
        className={`flex items-center gap-3 rounded-2xl px-5 py-3.5 text-sm font-medium shadow-xl backdrop-blur-lg ${
          type === 'success'
            ? 'bg-emerald-600/95 text-white shadow-emerald-500/25'
            : 'bg-red-600/95 text-white shadow-red-500/25'
        }`}
      >
        {type === 'success' ? (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
        ) : (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
        )}
        <span>{message}</span>
        <button onClick={onDismiss} className="ml-2 rounded-full p-0.5 opacity-70 hover:opacity-100 transition-opacity">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
