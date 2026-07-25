# Supabase setup (accounts, login, saved worlds)

Mythforge's login, "my account" page, and saved-worlds feature run on
[Supabase](https://supabase.com) — a free hosted Postgres database with
built-in auth (password hashing, sessions, password-reset emails) and
file storage for profile pictures. Everything else in the app keeps
working with zero setup; login and saving worlds are the only things
gated on this.

## 1. Create a project

1. Go to [supabase.com](https://supabase.com) and sign up (free tier is enough).
2. Create a new project. Pick any name/region; save the database password it
   generates somewhere (you likely won't need it directly, Supabase manages
   the connection for you).
3. Wait for the project to finish provisioning (a couple of minutes).

## 2. Get your API keys

In your project, go to **Settings → API Keys**. You need two values:

- **Project URL** → this is `VITE_SUPABASE_URL`
- **Publishable key** (starts with `sb_publishable_...`; on older projects this
  may instead be called the **anon / public key**, a long JWT string starting
  with `eyJ...`) → this is `VITE_SUPABASE_ANON_KEY`

> ⚠️ Do **not** copy the **Secret key** (`sb_secret_...`, or the legacy
> `service_role` key) into `VITE_SUPABASE_ANON_KEY`. That key bypasses all
> Row Level Security and Supabase actively blocks it from being used in a
> browser — you'll get a "Forbidden use of secret API key in browser" error
> at signup if you do this. The publishable key is the one that's *meant*
> to be public; it's kept safe by the RLS policies from step 3, not by
> secrecy.

Add both to your `.env` file (copy `.env.example` if you haven't already):

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

The anon key is safe to expose client-side — it's designed for that, and
access is actually controlled by the Row Level Security policies you'll
set up in step 3, not by keeping this key secret.

## 3. Run the database setup SQL

In your Supabase project, open the **SQL Editor** (left sidebar) and run
the following in one go:

```sql
-- Profile info (full name, about me, avatar) for each account.
-- id matches the built-in auth.users id 1:1.
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  about_me text,
  avatar_url text,
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create a profiles row the moment someone signs up, using the
-- full_name/about_me passed in at signup time. This runs as a trigger
-- (rather than the app inserting the row itself) so it works whether or
-- not "confirm email" is turned on — the app might not have an active
-- session yet right after signup if email confirmation is required.
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, about_me)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'about_me'
  );
  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Saved worlds. world_bible stores the full exported world as JSON.
create table public.worlds (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  world_bible jsonb not null,
  created_at timestamptz default now()
);

alter table public.worlds enable row level security;

create policy "Users can view own worlds"
  on public.worlds for select
  using (auth.uid() = user_id);

create policy "Users can insert own worlds"
  on public.worlds for insert
  with check (auth.uid() = user_id);

create policy "Users can update own worlds"
  on public.worlds for update
  using (auth.uid() = user_id);

create policy "Users can delete own worlds"
  on public.worlds for delete
  using (auth.uid() = user_id);
```

This creates two tables, both locked down with Row Level Security so a
user can only ever read or write their own rows — Supabase enforces this
at the database level using the logged-in user's ID, so the app's client-side
code never has to (and never could) reach another user's data even if it
tried.

## 4. Create the avatar storage bucket

Still in Supabase: go to **Storage** (left sidebar) → **New bucket**.

- Name: `avatars`
- Public bucket: **on** (so profile pictures can be displayed without a signed URL)

Then open the new `avatars` bucket → **Policies** → add a policy allowing
authenticated users to upload/update/delete files inside a folder named
after their own user ID. The easiest way is to use Supabase's policy
template picker and choose "Give users access to a folder only to
authenticated users" (or run this in the SQL editor):

```sql
create policy "Avatar images are publicly accessible"
  on storage.objects for select
  using (bucket_id = 'avatars');

create policy "Users can upload their own avatar"
  on storage.objects for insert
  with check (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can update their own avatar"
  on storage.objects for update
  using (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);
```

## 5. Turn off "confirm email" (optional, recommended for a personal project)

By default Supabase requires clicking a confirmation link before a new
account can log in. For a small personal tool that's usually more friction
than it's worth. To skip it: **Authentication → Providers → Email** →
turn off **Confirm email**. (You can leave it on if you'd rather have that
extra verification step — the app works either way, it'll just tell a
freshly-signed-up user to check their inbox if it's on.)

## 6. Deploying (Vercel)

Add the same two variables in your Vercel project under **Settings →
Environment Variables**:

```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

Redeploy after adding them — Vite bakes `VITE_*` env vars in at build time,
so they need to be set before the build runs, not just at runtime.

## That's it

Run `npm install` (this adds the new `@supabase/supabase-js` dependency),
then `npm run dev`. You should be able to sign up, log in, edit your
profile, and save a world to your account.
