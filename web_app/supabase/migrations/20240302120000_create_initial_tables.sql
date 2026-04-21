-- Create a table for public user profiles
-- This links to the auth.users table managed by Supabase Authentication
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  first_name text,
  last_name text,
  avatar_url text
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table public.profiles enable row level security;

-- Create policies for profiles
create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check ((select auth.uid()) = id);

create policy "Users can update own profile." on profiles
  for update using ((select auth.uid()) = id);

-- Create a table for saved resumes
create table public.resumes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text,
  file_url text,
  content_text text,
  metrics jsonb
);

-- Set up RLS for resumes
alter table public.resumes enable row level security;

-- Resumes are private by default
create policy "Individuals can view their own resumes." on resumes
  for select using ((select auth.uid()) = user_id);

create policy "Individuals can insert their own resumes." on resumes
  for insert with check ((select auth.uid()) = user_id);

create policy "Individuals can update their own resumes." on resumes
  for update using ((select auth.uid()) = user_id);

create policy "Individuals can delete their own resumes." on resumes
  for delete using ((select auth.uid()) = user_id);
