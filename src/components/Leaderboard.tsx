import { Button } from '@/components/ui/button';
import { Trophy, Swords, Share2, Home, Medal, Crown, Award, User } from 'lucide-react';
import { leaderboardData, currentUser } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface LeaderboardProps {
  userScore: number;
  onNewChallenge: () => void;
  onHome: () => void;
}

export function Leaderboard({ userScore, onNewChallenge, onHome }: LeaderboardProps) {
  // Sort by score including user's new score
  const sortedData = [...leaderboardData].map(item => ({
    ...item,
    points: item.id === currentUser.id ? userScore : item.points
  })).sort((a, b) => b.points - a.points).map((item, index) => ({
    ...item,
    rank: index + 1
  }));

  const top3 = sortedData.slice(0, 3);
  const rest = sortedData.slice(3);
  const userRank = sortedData.find(item => item.id === currentUser.id)?.rank || 0;

  const getRankIcon = (rank: number) => {
    switch(rank) {
      case 1: return <Crown className="w-7 h-7 text-warning animate-bounce-gentle" />;
      case 2: return <Medal className="w-6 h-6 text-muted-foreground" />;
      case 3: return <Award className="w-6 h-6 text-secondary" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="p-6 text-center gradient-primary">
        <Trophy className="w-12 h-12 mx-auto mb-3 text-primary-foreground animate-pulse-slow" />
        <h1 className="text-2xl font-extrabold text-primary-foreground">لوحة المتصدرين</h1>
        <p className="text-primary-foreground/80 mt-1">نتائج التحدي</p>
      </div>

      {/* Top 3 podium */}
      <div className="px-6 -mt-4">
        <div className="flex items-end justify-center gap-3 mb-6">
          {/* 2nd place */}
          {top3[1] && (
            <div className="flex flex-col items-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center border-4 border-card shadow-lg">
                <User className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="mt-1">{getRankIcon(2)}</div>
              <p className="font-bold text-foreground text-sm mt-1">{top3[1].name}</p>
              <p className="text-xs text-muted-foreground">{top3[1].points} نقطة</p>
              <div className="w-20 h-16 mt-2 rounded-t-lg bg-muted/50" />
            </div>
          )}

          {/* 1st place */}
          {top3[0] && (
            <div className="flex flex-col items-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center border-4 border-warning shadow-glow-primary">
                <User className="w-10 h-10 text-primary-foreground" />
              </div>
              <div className="mt-1">{getRankIcon(1)}</div>
              <p className="font-bold text-foreground mt-1">{top3[0].name}</p>
              <p className="text-sm text-primary font-bold">{top3[0].points} نقطة</p>
              <div className="w-24 h-24 mt-2 rounded-t-lg gradient-primary/30" />
            </div>
          )}

          {/* 3rd place */}
          {top3[2] && (
            <div className="flex flex-col items-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center border-4 border-card shadow-lg">
                <User className="w-8 h-8 text-secondary" />
              </div>
              <div className="mt-1">{getRankIcon(3)}</div>
              <p className="font-bold text-foreground text-sm mt-1">{top3[2].name}</p>
              <p className="text-xs text-muted-foreground">{top3[2].points} نقطة</p>
              <div className="w-20 h-12 mt-2 rounded-t-lg bg-secondary/20" />
            </div>
          )}
        </div>

        {/* Your rank highlight */}
        <div className="bg-card rounded-2xl p-4 shadow-card border-2 border-primary/30 mb-6 animate-scale-in">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
              <Medal className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">ترتيبك</p>
              <p className="text-2xl font-extrabold text-foreground">#{userRank}</p>
            </div>
            <div className="text-left">
              <p className="text-sm text-muted-foreground">نقاطك</p>
              <p className="text-2xl font-extrabold text-primary">{userScore}</p>
            </div>
          </div>
        </div>

        {/* Rest of the list */}
        {rest.length > 0 && (
          <div className="space-y-3 mb-6">
            {rest.map((item, index) => (
              <div
                key={item.id}
                className={cn(
                  'flex items-center gap-4 p-4 rounded-xl bg-card shadow-card animate-slide-up',
                  item.id === currentUser.id && 'border-2 border-primary/30'
                )}
                style={{ animationDelay: `${(index + 4) * 0.1}s` }}
              >
                <span className="w-8 text-center font-bold text-muted-foreground">
                  {item.rank}
                </span>
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <User className="w-5 h-5 text-muted-foreground" />
                </div>
                <span className="flex-1 font-medium text-foreground">{item.name}</span>
                <span className="font-bold text-foreground">{item.points}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto p-4 space-y-3 border-t border-border bg-card/50">
        <Button
          variant="secondary"
          size="lg"
          className="w-full"
          onClick={onNewChallenge}
        >
          <Swords className="ml-2 w-5 h-5" />
          تحدي جديد
        </Button>

        <div className="flex gap-3">
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={onHome}
          >
            <Home className="ml-2 w-5 h-5" />
            الرئيسية
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="flex-1"
          >
            <Share2 className="ml-2 w-5 h-5" />
            مشاركة
          </Button>
        </div>
      </div>
    </div>
  );
}
