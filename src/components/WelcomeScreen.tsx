import { useState, useEffect } from 'react';
import { Users, Gamepad2, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface WelcomeScreenProps {
  onSoloChallenge: () => void;
  onFriendsChallenge: () => void;
  userName: string;
  totalPoints: number;
  onNameChange: (name: string) => void;
}

export function WelcomeScreen({ 
  onSoloChallenge, 
  onFriendsChallenge, 
  userName,
  totalPoints,
  onNameChange 
}: WelcomeScreenProps) {
  const [isEditing, setIsEditing] = useState(!userName);
  const [tempName, setTempName] = useState(userName);

  useEffect(() => {
    setTempName(userName);
    setIsEditing(!userName);
  }, [userName]);

  const handleSaveName = () => {
    if (tempName.trim()) {
      onNameChange(tempName.trim());
      setIsEditing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 relative dotted-bg">
      {/* Header with points */}
      <div className="flex items-center justify-center mb-12">
        {/* Points badge */}
        <div className="flex items-center gap-2 px-5 py-3 rounded-full gradient-secondary shadow-md">
          <span className="text-lg font-bold text-secondary-foreground">{totalPoints}</span>
          <Star className="w-5 h-5 text-secondary-foreground fill-secondary-foreground" />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-8">
        {/* Logo / App icon */}
        <div className="mb-8 animate-float">
          <div className="w-36 h-36 rounded-[2rem] gradient-primary flex items-center justify-center shadow-glow-primary">
            <Gamepad2 className="w-20 h-20 text-primary-foreground" />
          </div>
        </div>

        {/* App name */}
        <h1 className="text-4xl font-extrabold text-foreground mb-3">
          العب و تعلم
        </h1>

        {/* User name section */}
        {isEditing ? (
          <div className="w-full max-w-xs mb-8">
            <p className="text-muted-foreground text-center mb-3">أدخل اسمك</p>
            <div className="flex gap-2">
              <Input
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="اسمك هنا..."
                className="text-center text-lg"
                autoFocus
              />
              <button
                onClick={handleSaveName}
                disabled={!tempName.trim()}
                className="px-4 py-2 rounded-xl gradient-primary text-primary-foreground font-bold disabled:opacity-50"
              >
                حفظ
              </button>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => setIsEditing(true)}
            className="mb-8 px-4 py-2 rounded-xl bg-card shadow-card hover:shadow-md transition-all"
          >
            <p className="text-lg text-foreground font-medium">
              مرحباً، <span className="text-primary font-bold">{userName}</span> 👋
            </p>
          </button>
        )}

        {/* Main buttons */}
        <div className="w-full max-w-sm space-y-4">
          <button
            onClick={onSoloChallenge}
            disabled={isEditing}
            className="w-full py-5 px-8 rounded-2xl gradient-primary text-primary-foreground font-bold text-xl flex items-center justify-center gap-3 shadow-glow-primary hover:opacity-95 transition-opacity active:scale-[0.98] disabled:opacity-50"
          >
            <Gamepad2 className="w-7 h-7" />
            تحدّى نفسك
          </button>

          <button
            onClick={onFriendsChallenge}
            disabled={isEditing}
            className="w-full py-5 px-8 rounded-2xl gradient-secondary text-secondary-foreground font-bold text-xl flex items-center justify-center gap-3 shadow-glow-secondary hover:opacity-95 transition-opacity active:scale-[0.98] disabled:opacity-50"
          >
            <Users className="w-7 h-7" />
            تحدّى أصدقائك
          </button>
        </div>
      </div>
    </div>
  );
}
