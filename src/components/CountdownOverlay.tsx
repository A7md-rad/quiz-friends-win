import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface CountdownOverlayProps {
  onComplete: () => void;
  startFrom?: number;
}

export function CountdownOverlay({ onComplete, startFrom = 3 }: CountdownOverlayProps) {
  const [count, setCount] = useState(startFrom);
  const [phase, setPhase] = useState<'counting' | 'go' | 'done'>('counting');
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // العد التنازلي
  useEffect(() => {
    if (phase !== 'counting') return;
    
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setPhase('go');
    }
  }, [count, phase]);

  // عرض "ابدأ" ثم الانتقال للعبة
  useEffect(() => {
    if (phase !== 'go') return;
    
    const timer = setTimeout(() => {
      setPhase('done');
      onCompleteRef.current();
    }, 800);
    
    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
      <div className="text-center">
        {phase === 'counting' && count > 0 ? (
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
