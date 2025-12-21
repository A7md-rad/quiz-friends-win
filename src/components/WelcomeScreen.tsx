import { useState } from 'react';
import { User, Users, Gamepad2, Star, Trophy } from 'lucide-react';
import { currentUser } from '@/data/mockData';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

interface WelcomeScreenProps {
  onSoloChallenge: () => void;
  onFriendsChallenge: () => void;
  onProfile?: () => void;
  onLeaderboard?: () => void;
}

export function WelcomeScreen({ onSoloChallenge, onFriendsChallenge, onProfile, onLeaderboard }: WelcomeScreenProps) {
  const [code, setCode] = useState('');

  const handleCodeComplete = (value: string) => {
    setCode(value);
    if (value.length === 4) {
      // Handle code submission
      console.log('Code entered:', value);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 relative dotted-bg">
      {/* Header with profile, points, and trophy */}
      <div className="flex items-center justify-between mb-12">
        {/* Profile button */}
        <button 
          onClick={onProfile}
          className="w-14 h-14 rounded-2xl bg-card shadow-card flex items-center justify-center hover:shadow-md transition-shadow active:scale-95"
        >
          <User className="w-6 h-6 text-primary" />
        </button>

        {/* Points badge */}
        <div className="flex items-center gap-2 px-5 py-3 rounded-full gradient-secondary shadow-md">
          <span className="text-lg font-bold text-secondary-foreground">{currentUser.points}</span>
          <Star className="w-5 h-5 text-secondary-foreground fill-secondary-foreground" />
        </div>

        {/* Trophy button */}
        <button 
          onClick={onLeaderboard}
          className="w-14 h-14 rounded-2xl bg-card shadow-card flex items-center justify-center hover:shadow-md transition-shadow active:scale-95"
        >
          <Trophy className="w-6 h-6 text-warning" />
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-16">
        {/* Logo / App icon */}
        <div className="mb-8 animate-float">
          <div className="w-36 h-36 rounded-[2rem] gradient-primary flex items-center justify-center shadow-glow-primary">
            <Gamepad2 className="w-20 h-20 text-primary-foreground" />
          </div>
        </div>

        {/* App name */}
        <h1 className="text-4xl font-extrabold text-foreground mb-3">
          لعب وتعلّم
        </h1>

        {/* Tagline */}
        <p className="text-lg text-muted-foreground mb-12">
          تعلم باللعب ونافس أصدقاءك!
        </p>

        {/* Main buttons */}
        <div className="w-full max-w-sm space-y-4">
          <button
            onClick={onSoloChallenge}
            className="w-full py-5 px-8 rounded-2xl gradient-primary text-primary-foreground font-bold text-xl flex items-center justify-center gap-3 shadow-glow-primary hover:opacity-95 transition-opacity active:scale-[0.98]"
          >
            <Gamepad2 className="w-7 h-7" />
            تحدّى نفسك
          </button>

          <button
            onClick={onFriendsChallenge}
            className="w-full py-5 px-8 rounded-2xl gradient-secondary text-secondary-foreground font-bold text-xl flex items-center justify-center gap-3 shadow-glow-secondary hover:opacity-95 transition-opacity active:scale-[0.98]"
          >
            <Users className="w-7 h-7" />
            تحدّى أصدقائك
          </button>
        </div>

        {/* Code input section */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <p className="text-muted-foreground text-base">أدخل كود الانضمام</p>
          <InputOTP
            maxLength={4}
            value={code}
            onChange={handleCodeComplete}
          >
            <InputOTPGroup className="gap-2">
              <InputOTPSlot index={0} className="w-14 h-14 text-2xl font-bold rounded-xl border-2 border-border bg-card" />
              <InputOTPSlot index={1} className="w-14 h-14 text-2xl font-bold rounded-xl border-2 border-border bg-card" />
              <InputOTPSlot index={2} className="w-14 h-14 text-2xl font-bold rounded-xl border-2 border-border bg-card" />
              <InputOTPSlot index={3} className="w-14 h-14 text-2xl font-bold rounded-xl border-2 border-border bg-card" />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </div>
    </div>
  );
}
