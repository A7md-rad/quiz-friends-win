import { useState } from 'react';
import { ArrowRight, UserPlus, Swords, Check, User, Star } from 'lucide-react';
import { Friend } from '@/types/app';
import { cn } from '@/lib/utils';

interface FriendsListProps {
  onBack: () => void;
  onCreateChallenge: (selectedFriends: Friend[]) => void;
}

// Hardcoded friends list
const friendsList: Friend[] = [
  { id: '2', name: 'أحمد', avatar: 'user', points: 150, isOnline: true },
  { id: '3', name: 'صالح', avatar: 'user', points: 95, isOnline: true },
  { id: '4', name: 'خالد', avatar: 'user', points: 60, isOnline: false },
];

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
          <h1 className="text-2xl font-bold text-foreground">تحدّى أصدقائك</h1>
        </div>
      </div>

      <div className="flex-1 px-5">
        {/* Friends section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">أصدقائي</h2>
            <button className="text-primary font-medium flex items-center gap-1">
              <UserPlus className="w-4 h-4" />
              إضافة صديق
            </button>
          </div>

          {/* Friends list */}
          <div className="space-y-3">
            {friendsList.map((friend, index) => {
              const isSelected = selectedFriends.some(f => f.id === friend.id);
              
              return (
                <button
                  key={friend.id}
                  onClick={() => toggleFriend(friend)}
                  className={cn(
                    'w-full bg-card rounded-2xl p-4 shadow-card transition-all duration-300',
                    'flex items-center gap-4 animate-slide-up',
                    isSelected 
                      ? 'ring-2 ring-primary' 
                      : 'hover:shadow-md'
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Avatar */}
                  <div className="relative">
                    <div className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center',
                      isSelected ? 'gradient-primary' : 'bg-muted'
                    )}>
                      <User className={cn(
                        'w-6 h-6',
                        isSelected ? 'text-primary-foreground' : 'text-muted-foreground'
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
                      ? 'border-primary bg-primary text-primary-foreground' 
                      : 'border-muted-foreground/30'
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
      <div className="p-5">
        <button
          disabled={selectedFriends.length === 0}
          onClick={() => onCreateChallenge(selectedFriends)}
          className={cn(
            'w-full py-4 rounded-2xl font-bold text-lg transition-all active:scale-[0.98]',
            selectedFriends.length > 0
              ? 'gradient-secondary text-secondary-foreground shadow-glow-secondary'
              : 'bg-muted text-muted-foreground'
          )}
        >
          <div className="flex items-center justify-center gap-2">
            <Swords className="w-5 h-5" />
            إنشاء تحدي {selectedFriends.length > 0 && `(${selectedFriends.length})`}
          </div>
        </button>
      </div>
    </div>
  );
}
