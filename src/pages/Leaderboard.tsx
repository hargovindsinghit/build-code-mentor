import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { Trophy, Medal, Award, Crown, TrendingUp } from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  username: string;
  display_name: string;
  avatar_url?: string;
  total_score: number;
  problems_solved: number;
  current_streak: number;
  country?: string;
}

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, display_name, avatar_url, total_score, problems_solved, current_streak, country')
        .order('total_score', { ascending: false })
        .order('problems_solved', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error fetching leaderboard:', error);
      } else {
        setLeaderboard(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-500 text-white';
      case 2:
        return 'bg-gray-400 text-white';
      case 3:
        return 'bg-amber-600 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Trophy className="h-8 w-8" />
            Leaderboard
          </h1>
          <p className="text-muted-foreground">
            Top coders ranked by total score and problems solved
          </p>
        </div>

        {/* Top 3 Podium */}
        {leaderboard.length >= 3 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* 2nd Place */}
            <Card className="order-1 md:order-1">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <Medal className="h-12 w-12 text-gray-400" />
                </div>
                <Avatar className="h-16 w-16 mx-auto mb-4">
                  <AvatarImage src={leaderboard[1]?.avatar_url} />
                  <AvatarFallback className="text-lg">
                    {leaderboard[1]?.display_name?.charAt(0) || leaderboard[1]?.username?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-lg">{leaderboard[1]?.display_name || leaderboard[1]?.username}</h3>
                <p className="text-2xl font-bold text-primary">{leaderboard[1]?.total_score}</p>
                <p className="text-sm text-muted-foreground">{leaderboard[1]?.problems_solved} problems</p>
              </CardContent>
            </Card>

            {/* 1st Place */}
            <Card className="order-2 md:order-2 border-yellow-500 bg-gradient-to-b from-yellow-50 to-background dark:from-yellow-950/20">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <Crown className="h-16 w-16 text-yellow-500" />
                </div>
                <Avatar className="h-20 w-20 mx-auto mb-4 ring-4 ring-yellow-500">
                  <AvatarImage src={leaderboard[0]?.avatar_url} />
                  <AvatarFallback className="text-xl">
                    {leaderboard[0]?.display_name?.charAt(0) || leaderboard[0]?.username?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-xl">{leaderboard[0]?.display_name || leaderboard[0]?.username}</h3>
                <p className="text-3xl font-bold text-primary">{leaderboard[0]?.total_score}</p>
                <p className="text-sm text-muted-foreground">{leaderboard[0]?.problems_solved} problems</p>
                <Badge className="mt-2 bg-yellow-500 text-white">Champion</Badge>
              </CardContent>
            </Card>

            {/* 3rd Place */}
            <Card className="order-3 md:order-3">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <Award className="h-12 w-12 text-amber-600" />
                </div>
                <Avatar className="h-16 w-16 mx-auto mb-4">
                  <AvatarImage src={leaderboard[2]?.avatar_url} />
                  <AvatarFallback className="text-lg">
                    {leaderboard[2]?.display_name?.charAt(0) || leaderboard[2]?.username?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-lg">{leaderboard[2]?.display_name || leaderboard[2]?.username}</h3>
                <p className="text-2xl font-bold text-primary">{leaderboard[2]?.total_score}</p>
                <p className="text-sm text-muted-foreground">{leaderboard[2]?.problems_solved} problems</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Full Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Full Rankings
            </CardTitle>
            <CardDescription>Complete leaderboard with all participants</CardDescription>
          </CardHeader>
          <CardContent>
            {leaderboard.length > 0 ? (
              <div className="space-y-2">
                {leaderboard.map((entry, index) => {
                  const rank = index + 1;
                  return (
                    <div
                      key={entry.id}
                      className={`flex items-center justify-between p-4 rounded-lg border transition-colors hover:bg-muted/50 ${
                        rank <= 3 ? 'bg-muted/30' : ''
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-10 h-10">
                          {getRankIcon(rank)}
                        </div>
                        
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={entry.avatar_url} />
                          <AvatarFallback>
                            {entry.display_name?.charAt(0) || entry.username?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">
                              {entry.display_name || entry.username}
                            </h4>
                            {rank <= 3 && (
                              <Badge className={getRankBadgeColor(rank)}>
                                Top {rank}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{entry.problems_solved} problems solved</span>
                            <span>🔥 {entry.current_streak} day streak</span>
                            {entry.country && <span>📍 {entry.country}</span>}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-xl font-bold text-primary">
                          {entry.total_score}
                        </div>
                        <div className="text-sm text-muted-foreground">points</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No rankings yet</h3>
                <p className="text-muted-foreground">
                  Be the first to solve problems and claim the top spot!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;