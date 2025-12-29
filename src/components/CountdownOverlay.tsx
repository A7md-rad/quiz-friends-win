import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface CountdownOverlayProps {
  onComplete: () => void;
  startFrom?: number;
}

export function CountdownOverlay({ onComplete, startFrom = 3 }: CountdownOverlayProps) {
  const [count, setCount] = useState(startFrom);
  const [showGo, setShowGo] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    console.log('Countdown effect - count:', count, 'showGo:', showGo);
    
    if (count > 0) {
      const timer = setTimeout(() => {
        console.log('Decreasing count from', count, 'to', count - 1);
        setCount(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (count === 0 && !showGo) {
      console.log('Count is 0, showing GO');
      setShowGo(true);
      const timer = setTimeout(() => {
        console.log('Calling onComplete');
        onCompleteRef.current();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [count, showGo]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
      <div className="text-center">
        {!showGo ? (
          <div
            key={count}
            className={cn(
              "text-9xl font-extrabold animate-countdown",
              count === 3 && "text-destructive",
              count === 2 && "text-warning",
              count === 1 && "text-success"
            )}
          >
            {count}
          </div>
        ) : (
          <div className="text-7xl font-extrabold text-primary animate-countdown">
            ابدأ! 🚀
          </div>
        )}
        
        {/* Progress dots */}
        <div className="flex justify-center gap-3 mt-8">
          {[3, 2, 1].map((num) => (
            <div
              key={num}
              className={cn(
                "w-4 h-4 rounded-full transition-all duration-300",
                count < num ? "bg-primary scale-100" : "bg-muted scale-75"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
