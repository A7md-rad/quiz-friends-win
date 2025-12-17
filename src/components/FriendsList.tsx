import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, UserPlus, Swords, Check, User, Star } from 'lucide-react';
import { friends, currentUser } from '@/data/mockData';
import { Friend } from '@/types/app';
import { cn } from '@/lib/utils';

interface FriendsListProps {
  onBack: () => void;
  onCreateChallenge: (selectedFriends: Friend[]) => void;
}

export function FriendsList({ onBack, onCreateChallenge }: FriendsListProps) {
  const [selectedFriends, setSelectedFriends] = useState<Friend[]>([]);

  const toggleFriend = (friend: Friend) => {
    setSelectedFriends(prev => {
      const isSelected = prev.some(f => f.id === friend.id);
      if (isSelected) {
        return prev.filter(f => f.id !== friend.id);
      }
      return [...prev, friend];
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowRight className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">تحدّى أصدقائك</h1>
        </div>
      </div>

      <div className="flex-1 p-6">
        {/* My profile card */}
        <div className="bg-card rounded-2xl p-4 shadow-card mb-6 border-2 border-primary/20">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center">
              <User className="w-7 h-7 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-foreground text-lg">{currentUser.name}</p>
              <p className="text-primary font-semibold flex items-center gap-1">
                {currentUser.points} نقطة
                <Star className="w-4 h-4 text-warning fill-warning animate-pulse-slow" />
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              أنت
            </span>
          </div>
        </div>

        {/* Friends section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">أصدقائي</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              <UserPlus className="ml-1 w-4 h-4" />
              إضافة صديق
            </Button>
          </div>

          {/* Friends list */}
          <div className="space-y-3">
            {friends.map((friend, index) => {
              const isSelected = selectedFriends.some(f => f.id === friend.id);
              
              return (
                <button
                  key={friend.id}
                  onClick={() => toggleFriend(friend)}
                  className={cn(
                    'w-full bg-card rounded-xl p-4 shadow-card border-2 transition-all duration-300',
                    'flex items-center gap-4 animate-slide-up',
                    isSelected 
                      ? 'border-secondary bg-secondary/5' 
                      : 'border-transparent hover:border-border'
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Avatar */}
                  <div className="relative">
                    <div className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center',
                      isSelected ? 'bg-secondary/20' : 'bg-muted'
                    )}>
                      <User className={cn(
                        'w-6 h-6',
                        isSelected ? 'text-secondary' : 'text-muted-foreground'
                      )} />
                    </div>
                    {/* Online indicator */}
                    {friend.isOnline && (
                      <div className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-success border-2 border-card" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-right">
                    <p className="font-bold text-foreground">{friend.name}</p>
                    <p className="text-sm text-muted-foreground">{friend.points} نقطة</p>
                  </div>

                  {/* Selection indicator */}
                  <div className={cn(
                    'w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all',
                    isSelected 
                      ? 'border-secondary bg-secondary text-secondary-foreground' 
                      : 'border-border'
                  )}>
                    {isSelected && <Check className="w-5 h-5" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
        <Button
          variant="secondary"
          size="lg"
          className="w-full"
          disabled={selectedFriends.length === 0}
          onClick={() => onCreateChallenge(selectedFriends)}
        >
          <Swords className="ml-2 w-5 h-5" />
          إنشاء تحدي {selectedFriends.length > 0 && `(${selectedFriends.length})`}
        </Button>
      </div>
    </div>
  );
}
