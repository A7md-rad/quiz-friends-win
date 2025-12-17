import { useState, useEffect } from 'react';
import { Wifi, Signal, BatteryMedium } from 'lucide-react';

export function AndroidStatusBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ar-SA', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="bg-[#1a1a1a] text-white px-4 py-1 flex items-center justify-between text-xs font-medium" dir="ltr">
      {/* Left side - Time */}
      <div className="flex items-center gap-1">
        <span>{formatTime(time)}</span>
      </div>

      {/* Center - Notch area */}
      <div className="w-20 h-5 bg-black rounded-full" />

      {/* Right side - Icons */}
      <div className="flex items-center gap-1">
        <Signal className="w-3.5 h-3.5" />
        <Wifi className="w-3.5 h-3.5" />
        <div className="flex items-center gap-0.5">
          <span className="text-[10px]">85%</span>
          <BatteryMedium className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
