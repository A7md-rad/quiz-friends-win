import { useState } from 'react';
import { ArrowRight, UserPlus, Loader2 } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { isValidGameCode } from '@/utils/gameUtils';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

interface JoinGameProps {
  onBack: () => void;
  onJoinSuccess: (code: string) => void;
}

export function JoinGame({ onBack, onJoinSuccess }: JoinGameProps) {
  const [code, setCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);

  const handleCodeChange = (value: string) => {
    setCode(value);
  };

  const handleJoin = async () => {
    if (!isValidGameCode(code)) {
      toast.error('أدخل كود صحيح من 4 أرقام');
      return;
    }

    setIsJoining(true);
    
    // التحقق من وجود اللعبة في قاعدة البيانات
    const { data: game, error } = await (supabase as any)
      .from('games')
      .select('*')
      .eq('code', code)
      .eq('status', 'waiting')
      .maybeSingle();

    if (error) {
      console.error('Error checking game:', error);
      toast.error('حدث خطأ في البحث عن اللعبة');
      setIsJoining(false);
      return;
    }

    if (!game) {
      toast.error('كود اللعبة غير موجود أو اللعبة بدأت بالفعل');
      setIsJoining(false);
      return;
    }
    
    toast.success('تم الانضمام للعبة! جاري انتظار اختيار صاحب اللعبة للمادة...');
    onJoinSuccess(code);
  };

  const isCodeComplete = code.length === 4;

  return (
    <div className="min-h-screen flex flex-col p-6 dotted-bg">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="w-12 h-12 rounded-2xl bg-card shadow-card flex items-center justify-center hover:shadow-md transition-shadow active:scale-95"
        >
          <ArrowRight className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-2xl font-bold text-foreground">انضمام للعبة</h1>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-16">
        {/* Icon */}
        <div className="w-28 h-28 rounded-full gradient-secondary flex items-center justify-center shadow-glow-secondary mb-8 animate-float">
          <UserPlus className="w-14 h-14 text-secondary-foreground" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-foreground mb-2">أدخل كود اللعبة</h2>
        <p className="text-muted-foreground mb-8">اطلب الكود من صديقك الذي أنشأ اللعبة</p>

        {/* Code Input */}
        <div className="mb-8">
          <InputOTP
            maxLength={4}
            value={code}
            onChange={handleCodeChange}
          >
            <InputOTPGroup className="gap-3">
              <InputOTPSlot 
                index={0} 
                className="w-16 h-16 text-2xl font-bold rounded-xl border-2 border-border bg-card shadow-card" 
              />
              <InputOTPSlot 
                index={1} 
                className="w-16 h-16 text-2xl font-bold rounded-xl border-2 border-border bg-card shadow-card" 
              />
              <InputOTPSlot 
                index={2} 
                className="w-16 h-16 text-2xl font-bold rounded-xl border-2 border-border bg-card shadow-card" 
              />
              <InputOTPSlot 
                index={3} 
                className="w-16 h-16 text-2xl font-bold rounded-xl border-2 border-border bg-card shadow-card" 
              />
            </InputOTPGroup>
          </InputOTP>
        </div>

        {/* Join Button */}
        <button
          onClick={handleJoin}
          disabled={!isCodeComplete || isJoining}
          className={cn(
            'w-full max-w-sm py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98]',
            isCodeComplete && !isJoining
              ? 'gradient-secondary text-secondary-foreground shadow-glow-secondary'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          )}
        >
          {isJoining ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              جاري الانضمام...
            </>
          ) : (
            <>
              <UserPlus className="w-6 h-6" />
              انضمام
            </>
          )}
        </button>
      </div>
    </div>
  );
}
