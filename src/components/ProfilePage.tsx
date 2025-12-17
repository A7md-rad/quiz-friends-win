import { ArrowRight, Star, Trophy, Target, Flame, Award, BookOpen, Gamepad2 } from 'lucide-react';
import { currentUser } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface ProfilePageProps {
  onBack: () => void;
}

const achievements = [
  { id: 1, name: 'أول تحدي', description: 'أكمل أول تحدي', icon: Gamepad2, unlocked: true, color: 'primary' },
  { id: 2, name: '10 إجابات صحيحة', description: 'أجب على 10 أسئلة بشكل صحيح', icon: Target, unlocked: true, color: 'success' },
  { id: 3, name: 'نجم الرياضيات', description: 'أكمل 5 تحديات رياضيات', icon: Star, unlocked: true, color: 'warning' },
  { id: 4, name: 'سلسلة 3 أيام', description: 'العب 3 أيام متتالية', icon: Flame, unlocked: false, color: 'secondary' },
  { id: 5, name: 'المتفوق', description: 'احصل على 100% في تحدي', icon: Trophy, unlocked: false, color: 'accent' },
  { id: 6, name: 'متعدد المواهب', description: 'العب في 6 مواد مختلفة', icon: BookOpen, unlocked: false, color: 'arabic' },
];

const stats = [
  { label: 'التحديات', value: 15, icon: Gamepad2 },
  { label: 'الإجابات الصحيحة', value: 87, icon: Target },
  { label: 'أفضل سلسلة', value: 5, icon: Flame },
];

const colorClasses: Record<string, string> = {
  primary: 'gradient-primary',
  secondary: 'gradient-secondary',
  success: 'gradient-success',
  warning: 'bg-warning',
  accent: 'gradient-accent',
  arabic: 'gradient-arabic',
};

export function ProfilePage({ onBack }: ProfilePageProps) {
  const firstLetter = currentUser.name.charAt(0);
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="min-h-screen flex flex-col dotted-bg">
      {/* Header */}
      <div className="p-5">
        <div className="flex items-center justify-center gap-4 mb-6">
          <button 
            onClick={onBack}
            className="absolute right-5 w-12 h-12 rounded-xl flex items-center justify-center hover:bg-card/50 transition-colors"
          >
            <ArrowRight className="w-7 h-7 text-foreground" />
          </button>
          <h1 className="text-2xl font-bold text-foreground">الملف الشخصي</h1>
        </div>
      </div>

      <div className="flex-1 px-5 pb-5">
        {/* Profile Card */}
        <div className="bg-card rounded-3xl p-6 shadow-card mb-6 text-center">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full gradient-primary mx-auto mb-4 flex items-center justify-center shadow-glow-primary">
            <span className="text-4xl font-bold text-primary-foreground">{firstLetter}</span>
          </div>
          
          {/* Name */}
          <h2 className="text-2xl font-bold text-foreground mb-2">{currentUser.name}</h2>
          
          {/* Points */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full gradient-secondary">
            <span className="text-lg font-bold text-secondary-foreground">{currentUser.points}</span>
            <Star className="w-5 h-5 text-secondary-foreground fill-secondary-foreground" />
          </div>

          {/* Level */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">المستوى 3</span>
              <span className="text-primary font-bold">120 / 200</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full gradient-primary rounded-full" style={{ width: '60%' }} />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-card rounded-2xl p-4 shadow-card text-center animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="bg-card rounded-3xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Award className="w-5 h-5 text-warning" />
              الإنجازات
            </h3>
            <span className="text-sm text-muted-foreground">{unlockedCount}/{achievements.length}</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {achievements.map((achievement, index) => (
              <div 
                key={achievement.id}
                className={cn(
                  'flex flex-col items-center p-3 rounded-2xl transition-all animate-slide-up',
                  achievement.unlocked ? 'bg-muted/50' : 'bg-muted/30 opacity-50'
                )}
                style={{ animationDelay: `${(index + 3) * 0.08}s` }}
              >
                <div className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center mb-2',
                  achievement.unlocked ? colorClasses[achievement.color] : 'bg-muted'
                )}>
                  <achievement.icon className={cn(
                    'w-6 h-6',
                    achievement.unlocked ? 'text-white' : 'text-muted-foreground'
                  )} />
                </div>
                <p className={cn(
                  'text-xs font-medium text-center',
                  achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'
                )}>
                  {achievement.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
