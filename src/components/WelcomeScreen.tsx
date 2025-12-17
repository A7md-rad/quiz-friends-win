import { Button } from '@/components/ui/button';
import { User, Users, LogIn, Gamepad2, Star, Rocket } from 'lucide-react';
import { currentUser } from '@/data/mockData';

interface WelcomeScreenProps {
  onSoloChallenge: () => void;
  onFriendsChallenge: () => void;
}

export function WelcomeScreen({ onSoloChallenge, onFriendsChallenge }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-40 left-10 w-40 h-40 rounded-full bg-secondary/10 blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full bg-accent/10 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* User points badge */}
      <div className="absolute top-6 left-6 flex items-center gap-2 bg-card rounded-full px-4 py-2 shadow-card">
        <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
          <User className="w-5 h-5 text-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">{currentUser.name}</span>
          <span className="text-xs text-primary font-bold flex items-center gap-1">
            {currentUser.points} نقطة
            <Star className="w-3 h-3 text-warning fill-warning animate-pulse-slow" />
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-md mx-auto">
        {/* Logo / App icon */}
        <div className="mb-6 animate-float">
          <div className="w-28 h-28 mx-auto rounded-3xl gradient-primary flex items-center justify-center shadow-glow-primary">
            <Gamepad2 className="w-14 h-14 text-primary-foreground animate-wiggle" />
          </div>
        </div>

        {/* App name */}
        <h1 className="text-4xl font-extrabold text-foreground mb-3">
          لعب و<span className="text-gradient-primary">تعلّم</span>
        </h1>

        {/* Tagline */}
        <p className="text-lg text-muted-foreground mb-10 flex items-center justify-center gap-2">
          تعلم باللعب ونافس أصدقاءك!
          <Rocket className="w-5 h-5 text-secondary animate-bounce-gentle" />
        </p>

        {/* Main buttons */}
        <div className="space-y-4">
          <Button
            variant="default"
            size="xl"
            className="w-full"
            onClick={onSoloChallenge}
          >
            <User className="ml-2" />
            تحدّى نفسك
          </Button>

          <Button
            variant="secondary"
            size="xl"
            className="w-full"
            onClick={onFriendsChallenge}
          >
            <Users className="ml-2" />
            تحدّى أصدقائك
          </Button>
        </div>

        {/* Login button */}
        <Button
          variant="ghost"
          size="sm"
          className="mt-8 text-muted-foreground"
        >
          <LogIn className="ml-1 w-4 h-4" />
          تسجيل دخول / إنشاء حساب
        </Button>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
    </div>
  );
}
