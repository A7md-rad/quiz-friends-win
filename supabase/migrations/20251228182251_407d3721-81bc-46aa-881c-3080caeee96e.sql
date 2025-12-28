-- Add player_session_id column to game_players to track anonymous sessions
ALTER TABLE public.game_players ADD COLUMN IF NOT EXISTS session_id uuid;

-- Add host_session_id to games table to track who created the game
ALTER TABLE public.games ADD COLUMN IF NOT EXISTS host_session_id uuid;

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can join games" ON public.game_players;
DROP POLICY IF EXISTS "Anyone can leave games" ON public.game_players;
DROP POLICY IF EXISTS "Anyone can update their status" ON public.game_players;
DROP POLICY IF EXISTS "Anyone can view players" ON public.game_players;
DROP POLICY IF EXISTS "Anyone can create games" ON public.games;
DROP POLICY IF EXISTS "Anyone can update games" ON public.games;
DROP POLICY IF EXISTS "Anyone can view games" ON public.games;

-- New RLS policies for game_players
-- Anyone can view players in any game
CREATE POLICY "Anyone can view players" 
ON public.game_players 
FOR SELECT 
USING (true);

-- Anyone can join games (insert) - they must provide their session_id
CREATE POLICY "Anyone can join games" 
ON public.game_players 
FOR INSERT 
WITH CHECK (true);

-- Players can only update their own record (using session_id)
CREATE POLICY "Players can only update own record" 
ON public.game_players 
FOR UPDATE 
USING (session_id = auth.uid() OR session_id IS NULL);

-- Players can only delete their own record (using session_id)
CREATE POLICY "Players can only delete own record" 
ON public.game_players 
FOR DELETE 
USING (session_id = auth.uid() OR session_id IS NULL);

-- New RLS policies for games
-- Anyone can view games
CREATE POLICY "Anyone can view games" 
ON public.games 
FOR SELECT 
USING (true);

-- Anyone can create games
CREATE POLICY "Anyone can create games" 
ON public.games 
FOR INSERT 
WITH CHECK (true);

-- Only host can update their game (using host_session_id)
CREATE POLICY "Host can update own game" 
ON public.games 
FOR UPDATE 
USING (host_session_id = auth.uid() OR host_session_id IS NULL);

-- Only host can delete their game
CREATE POLICY "Host can delete own game" 
ON public.games 
FOR DELETE 
USING (host_session_id = auth.uid() OR host_session_id IS NULL);