import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { 
  Trophy, 
  Code, 
  Flame, 
  Target, 
  BookOpen, 
  TrendingUp,
  Clock,
  Award
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Profile {
  username: string;
  display_name: string;
  total_score: number;
  problems_solved: number;
  current_streak: number;
  max_streak: number;
}

interface Problem {
  id: string;
  title: string;
  difficulty: string;
  points: number;
  tags: string[];
}

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [recommendedProblems, setRecommendedProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    fetchProfile();
    fetchRecommendedProblems();
  }, [user, navigate]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchRecommendedProblems = async () => {
    try {
      const { data, error } = await supabase
        .from('problems')
        .select('id, title, difficulty, points, tags')
        .eq('is_approved', true)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) {
        console.error('Error fetching problems:', error);
      } else {
        setRecommendedProblems(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-success text-success-foreground';
      case 'Medium': return 'bg-warning text-warning-foreground';
      case 'Hard': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {profile?.display_name || profile?.username || 'Coder'}! 👋
          </h1>
          <p className="text-muted-foreground">Ready to solve some problems today?</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Score</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profile?.total_score || 0}</div>
              <p className="text-xs text-muted-foreground">Points earned</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Problems Solved</CardTitle>
              <Code className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profile?.problems_solved || 0}</div>
              <p className="text-xs text-muted-foreground">Challenges completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Flame className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profile?.current_streak || 0}</div>
              <p className="text-xs text-muted-foreground">Days in a row</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Best Streak</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profile?.max_streak || 0}</div>
              <p className="text-xs text-muted-foreground">Personal record</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Quick Practice
              </CardTitle>
              <CardDescription>Jump into coding with these actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => navigate('/practice')}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Browse All Problems
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => navigate('/practice?difficulty=Easy')}
              >
                <Target className="h-4 w-4 mr-2" />
                Easy Problems
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => navigate('/leaderboard')}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                View Leaderboard
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recommended for You
              </CardTitle>
              <CardDescription>Problems picked based on your progress</CardDescription>
            </CardHeader>
            <CardContent>
              {recommendedProblems.length > 0 ? (
                <div className="space-y-3">
                  {recommendedProblems.map((problem) => (
                    <div 
                      key={problem.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => navigate(`/problem/${problem.id}`)}
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{problem.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getDifficultyColor(problem.difficulty)}>
                            {problem.difficulty}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {problem.points} pts
                          </span>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        Solve
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No problems available yet. Check back soon!
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Daily Goal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="h-5 w-5" />
              Daily Coding Goal
            </CardTitle>
            <CardDescription>
              Keep your streak alive! Solve at least one problem today.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Today's Challenge</p>
                  <p className="text-sm text-muted-foreground">
                    Solve 1 problem to maintain your streak
                  </p>
                </div>
              </div>
              <Button onClick={() => navigate('/practice')}>
                Start Coding
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;