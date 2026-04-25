import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onLoadingComplete?.();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-500">
      <div className="text-center">
        <div className="text-zinc-500 text-sm mb-2">Loading...</div>
        <div className="w-32 h-0.5 bg-zinc-800 rounded overflow-hidden">
          <div className="h-full bg-indigo-500 animate-pulse" style={{ width: '60%' }} />
        </div>
      </div>
    </div>
  );
}