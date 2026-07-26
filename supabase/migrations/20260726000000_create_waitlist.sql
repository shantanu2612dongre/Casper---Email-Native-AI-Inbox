-- ─── Wisps Waitlist Table & Row Level Security (RLS) Setup ───

-- 1. Create the waitlist table
CREATE TABLE IF NOT EXISTS public.waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,  -- UNIQUE constraint prevents duplicate normalized emails
  position INTEGER NOT NULL UNIQUE,
  verified BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policy for Service Role (Backend Server Functions)
-- Since all OTP verifications and database inserts happen securely on the server via
-- SUPABASE_SERVICE_ROLE_KEY, we restrict access exclusively to the service_role.
-- No public or anon client can read or write directly to this table.
CREATE POLICY "Service role has full access to waitlist"
  ON public.waitlist
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 4. Create indexes for fast lookup and ordering
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist (email);
CREATE INDEX IF NOT EXISTS idx_waitlist_position ON public.waitlist (position);

-- 5. Grant access to service_role
GRANT ALL ON TABLE public.waitlist TO service_role;
