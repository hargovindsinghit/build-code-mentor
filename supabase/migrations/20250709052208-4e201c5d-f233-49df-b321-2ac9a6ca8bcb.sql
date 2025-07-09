-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  country TEXT,
  total_score INTEGER DEFAULT 0,
  problems_solved INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  max_streak INTEGER DEFAULT 0,
  last_activity DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create programming languages table
CREATE TABLE public.programming_languages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  judge0_id INTEGER UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create problem difficulty enum
CREATE TYPE public.difficulty_level AS ENUM ('Easy', 'Medium', 'Hard');

-- Create problems table
CREATE TABLE public.problems (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  input_format TEXT,
  output_format TEXT,
  sample_input TEXT,
  sample_output TEXT,
  constraints TEXT,
  difficulty difficulty_level NOT NULL DEFAULT 'Easy',
  points INTEGER DEFAULT 100,
  tags TEXT[],
  test_cases JSONB,
  created_by UUID REFERENCES auth.users(id),
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create submissions table
CREATE TABLE public.submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  problem_id UUID NOT NULL REFERENCES public.problems(id) ON DELETE CASCADE,
  language_id UUID NOT NULL REFERENCES public.programming_languages(id),
  code TEXT NOT NULL,
  status TEXT, -- 'Accepted', 'Wrong Answer', 'Time Limit Exceeded', etc.
  execution_time FLOAT,
  memory_used INTEGER,
  score INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programming_languages ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Problems policies
CREATE POLICY "Everyone can view approved problems" ON public.problems FOR SELECT USING (is_approved = true);
CREATE POLICY "Users can create problems" ON public.problems FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Users can update their own problems" ON public.problems FOR UPDATE USING (auth.uid() = created_by);

-- Submissions policies
CREATE POLICY "Users can view their own submissions" ON public.submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own submissions" ON public.submissions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Programming languages are public
CREATE POLICY "Everyone can view programming languages" ON public.programming_languages FOR SELECT USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_problems_updated_at
  BEFORE UPDATE ON public.problems
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, username, display_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'username',
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample programming languages
INSERT INTO public.programming_languages (name, judge0_id) VALUES
  ('Python', 71),
  ('Java', 62),
  ('C++', 54),
  ('JavaScript', 63),
  ('C', 50),
  ('C#', 51),
  ('Go', 60),
  ('Rust', 73);

-- Insert sample problems
INSERT INTO public.problems (title, description, input_format, output_format, sample_input, sample_output, difficulty, points, tags, is_approved) VALUES
  (
    'Two Sum',
    'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    'First line contains n (length of array) and target. Second line contains n space-separated integers.',
    'Two space-separated integers representing the indices.',
    '4 9\n2 7 11 15',
    '0 1',
    'Easy',
    100,
    ARRAY['Array', 'Hash Table'],
    true
  ),
  (
    'Add Two Numbers',
    'You are given two non-empty linked lists representing two non-negative integers. Add the two numbers and return the sum as a linked list.',
    'Two lines, each containing space-separated digits representing a number in reverse order.',
    'Space-separated digits representing the sum in reverse order.',
    '2 4 3\n5 6 4',
    '7 0 8',
    'Medium',
    200,
    ARRAY['Linked List', 'Math'],
    true
  ),
  (
    'Longest Substring Without Repeating Characters',
    'Given a string s, find the length of the longest substring without repeating characters.',
    'A single line containing the string s.',
    'An integer representing the length of the longest substring.',
    'abcabcbb',
    '3',
    'Medium',
    200,
    ARRAY['String', 'Sliding Window'],
    true
  );