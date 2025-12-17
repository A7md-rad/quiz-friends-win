import { ArrowRight, Swords, Share2, Home, Crown } from 'lucide-react';
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

  // Get first letter of name for avatar
  const getInitial = (name: string) => name.charAt(0);

  // Reorder for podium display: 2nd, 1st, 3rd
  const podiumOrder = [top3[1], top3[0], top3[2]].filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col dotted-bg">
      {/* Header */}
      <div className="p-5 pt-8">
        <div className="flex items-center justify-between mb-2">
          <button 
            onClick={onHome}
            className="w-12 h-12 rounded-xl flex items-center justify-center hover:bg-card/50 transition-colors"
          >
            <ArrowRight className="w-7 h-7 text-foreground" />
          </button>
          
          <h1 className="text-2xl font-bold text-foreground">المتصدرين</h1>
          
          <div className="w-12" /> {/* Spacer */}
        </div>
      </div>

      {/* Podium Section */}
      <div className="px-5 flex-1">
        {/* Crown for 1st place */}
        <div className="flex justify-center mb-2">
          <Crown className="w-10 h-10 text-warning fill-warning animate-bounce-gentle" />
        </div>

        {/* Podium with avatars */}
        <div className="flex items-end justify-center gap-2 mb-4">
          {/* 3rd Place */}
          {top3[2] && (
            <div className="flex flex-col items-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-secondary-foreground">
                  {getInitial(top3[2].name)}
                </span>
              </div>
              <p className="font-bold text-foreground text-sm">{top3[2].name}</p>
              <p className="text-xs text-muted-foreground">{top3[2].points} نقطة</p>
              {/* Podium */}
              <div className="w-24 h-20 mt-3 rounded-t-2xl bg-secondary/30 flex items-start justify-center pt-3">
                <span className="text-2xl font-bold text-secondary">3</span>
              </div>
            </div>
          )}

          {/* 1st Place */}
          {top3[0] && (
            <div className="flex flex-col items-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-20 h-20 rounded-full bg-warning flex items-center justify-center mb-2 shadow-glow-secondary">
                <span className="text-3xl font-bold text-warning-foreground">
                  {getInitial(top3[0].name)}
                </span>
              </div>
              <p className="font-bold text-foreground">{top3[0].name}</p>
              <p className="text-sm text-muted-foreground">{top3[0].points} نقطة</p>
              {/* Podium */}
              <div className="w-28 h-32 mt-3 rounded-t-2xl bg-warning/30 flex items-start justify-center pt-3">
                <span className="text-3xl font-bold text-warning">1</span>
              </div>
            </div>
          )}

          {/* 2nd Place */}
          {top3[1] && (
            <div className="flex flex-col items-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 rounded-full bg-muted-foreground/50 flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-card">
                  {getInitial(top3[1].name)}
                </span>
              </div>
              <p className="font-bold text-foreground text-sm">{top3[1].name}</p>
              <p className="text-xs text-muted-foreground">{top3[1].points} نقطة</p>
              {/* Podium */}
              <div className="w-24 h-24 mt-3 rounded-t-2xl bg-muted flex items-start justify-center pt-3">
                <span className="text-2xl font-bold text-muted-foreground">2</span>
              </div>
            </div>
          )}
        </div>

        {/* Rest of the list */}
        {rest.length > 0 && (
          <div className="space-y-3 mt-6">
            {rest.map((item, index) => (
              <div
                key={item.id}
                className={cn(
                  'flex items-center gap-4 p-4 rounded-2xl bg-card shadow-card animate-slide-up',
                  item.id === currentUser.id && 'ring-2 ring-primary/30'
                )}
                style={{ animationDelay: `${(index + 4) * 0.1}s` }}
              >
                {/* Rank */}
                <span className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center font-bold text-muted-foreground">
                  {item.rank}
                </span>
                
                {/* Avatar */}
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                  <span className="text-lg font-bold text-muted-foreground">
                    {getInitial(item.name)}
                  </span>
                </div>
                
                {/* Name & Points */}
                <div className="flex-1 text-right">
                  <p className="font-bold text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.points} نقطة</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-5 space-y-4">
        <button
          onClick={onNewChallenge}
          className="w-full py-4 rounded-2xl gradient-primary text-primary-foreground font-bold text-lg shadow-glow-primary hover:opacity-95 transition-opacity active:scale-[0.98]"
        >
          <div className="flex items-center justify-center gap-2">
            <Swords className="w-5 h-5" />
            تحدي جديد
          </div>
        </button>

        <div className="flex items-center justify-center gap-8">
          <button
            onClick={onHome}
            className="flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors"
          >
            <Home className="w-5 h-5" />
            الرئيسية
          </button>
          
          <button
            className="flex items-center gap-2 px-6 py-3 rounded-2xl border-2 border-primary text-primary font-medium hover:bg-primary/5 transition-colors"
          >
            <Share2 className="w-5 h-5" />
            مشاركة
          </button>
        </div>
      </div>
    </div>
  );
}
