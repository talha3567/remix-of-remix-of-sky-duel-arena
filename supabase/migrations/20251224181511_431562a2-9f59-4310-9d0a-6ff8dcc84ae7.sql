-- Create duels table for duel history
CREATE TABLE public.duels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  player1_id UUID NOT NULL,
  player2_id UUID NOT NULL,
  winner_id UUID,
  player1_kills INTEGER NOT NULL DEFAULT 0,
  player2_kills INTEGER NOT NULL DEFAULT 0,
  arena TEXT,
  duration_seconds INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.duels ENABLE ROW LEVEL SECURITY;

-- Everyone can view duels (public leaderboard)
CREATE POLICY "Duels are viewable by everyone" 
ON public.duels 
FOR SELECT 
USING (true);

-- Only authenticated users can insert duels (for server integration)
CREATE POLICY "Authenticated users can insert duels" 
ON public.duels 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- Create indexes for better query performance
CREATE INDEX idx_duels_player1 ON public.duels(player1_id);
CREATE INDEX idx_duels_player2 ON public.duels(player2_id);
CREATE INDEX idx_duels_winner ON public.duels(winner_id);
CREATE INDEX idx_duels_created_at ON public.duels(created_at DESC);

-- Enable realtime for duels
ALTER PUBLICATION supabase_realtime ADD TABLE public.duels;