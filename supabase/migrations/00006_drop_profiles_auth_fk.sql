-- supabase/migrations/00006_drop_profiles_auth_fk.sql
-- Drop FK from profiles.id -> auth.users.id
-- NextAuth users don't exist in auth.users, but we still need profiles
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;
