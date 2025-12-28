-- جدول الألعاب
CREATE TABLE public.games (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code VARCHAR(4) NOT NULL UNIQUE,
  host_name TEXT NOT NULL,
  subject_id TEXT NOT NULL,
  subject_name TEXT NOT NULL,
  question_count INTEGER NOT NULL DEFAULT 5,
  max_players INTEGER NOT NULL DEFAULT 4,
  difficulty TEXT NOT NULL DEFAULT 'medium',
  time_per_question INTEGER NOT NULL DEFAULT 15,
  status TEXT NOT NULL DEFAULT 'waiting',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول اللاعبين في اللعبة
CREATE TABLE public.game_players (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  game_id UUID NOT NULL REFERENCES public.games(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  is_host BOOLEAN NOT NULL DEFAULT false,
  score INTEGER NOT NULL DEFAULT 0,
  current_question INTEGER NOT NULL DEFAULT 0,
  is_ready BOOLEAN NOT NULL DEFAULT false,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- فهارس للبحث السريع
CREATE INDEX idx_games_code ON public.games(code);
CREATE INDEX idx_games_status ON public.games(status);
CREATE INDEX idx_game_players_game_id ON public.game_players(game_id);

-- تفعيل RLS
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_players ENABLE ROW LEVEL SECURITY;

-- سياسات الوصول للألعاب (متاحة للجميع لأنها لعبة عامة بدون تسجيل دخول)
CREATE POLICY "Anyone can view games" ON public.games FOR SELECT USING (true);
CREATE POLICY "Anyone can create games" ON public.games FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update games" ON public.games FOR UPDATE USING (true);

-- سياسات الوصول للاعبين
CREATE POLICY "Anyone can view players" ON public.game_players FOR SELECT USING (true);
CREATE POLICY "Anyone can join games" ON public.game_players FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update their status" ON public.game_players FOR UPDATE USING (true);
CREATE POLICY "Anyone can leave games" ON public.game_players FOR DELETE USING (true);

-- تفعيل Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.games;
ALTER PUBLICATION supabase_realtime ADD TABLE public.game_players;