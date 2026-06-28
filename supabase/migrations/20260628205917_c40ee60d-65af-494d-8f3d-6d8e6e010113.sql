-- Lead status enum
DO $$ BEGIN
  CREATE TYPE public.lead_status AS ENUM ('NEW','CONTACTED','QUALIFIED','PROPOSAL','CLIENT','LOST');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Audit status enum
DO $$ BEGIN
  CREATE TYPE public.audit_status AS ENUM ('NEW','REVIEWING','SCHEDULED','COMPLETED','CLOSED');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- contact_leads
CREATE TABLE IF NOT EXISTS public.contact_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  country text,
  budget text,
  service text,
  message text,
  status public.lead_status NOT NULL DEFAULT 'NEW',
  source text NOT NULL DEFAULT 'contact',
  ip_address text,
  browser text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  notes text,
  CONSTRAINT contact_leads_name_len CHECK (char_length(name) BETWEEN 1 AND 120),
  CONSTRAINT contact_leads_email_fmt CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND char_length(email) <= 200),
  CONSTRAINT contact_leads_message_len CHECK (message IS NULL OR char_length(message) <= 4000)
);

GRANT INSERT ON public.contact_leads TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.contact_leads TO authenticated;
GRANT ALL ON public.contact_leads TO service_role;

ALTER TABLE public.contact_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a contact lead"
  ON public.contact_leads FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can read contact leads"
  ON public.contact_leads FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update contact leads"
  ON public.contact_leads FOR UPDATE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete contact leads"
  ON public.contact_leads FOR DELETE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX IF NOT EXISTS contact_leads_created_at_idx ON public.contact_leads (created_at DESC);
CREATE INDEX IF NOT EXISTS contact_leads_status_idx ON public.contact_leads (status);

-- Extend audit_requests with the new fields and admin-managed status/notes
ALTER TABLE public.audit_requests
  ADD COLUMN IF NOT EXISTS website text,
  ADD COLUMN IF NOT EXISTS industry text,
  ADD COLUMN IF NOT EXISTS employee_count text,
  ADD COLUMN IF NOT EXISTS biggest_problem text,
  ADD COLUMN IF NOT EXISTS automation_goals text,
  ADD COLUMN IF NOT EXISTS preferred_contact text,
  ADD COLUMN IF NOT EXISTS audit_status public.audit_status NOT NULL DEFAULT 'NEW',
  ADD COLUMN IF NOT EXISTS notes text;

-- Admin write policies for audit_requests (read-admin policy already exists)
DO $$ BEGIN
  CREATE POLICY "Admins can update audit requests"
    ON public.audit_requests FOR UPDATE TO authenticated
    USING (private.has_role(auth.uid(), 'admin'::app_role))
    WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Admins can delete audit requests"
    ON public.audit_requests FOR DELETE TO authenticated
    USING (private.has_role(auth.uid(), 'admin'::app_role));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE INDEX IF NOT EXISTS audit_requests_created_at_idx ON public.audit_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS audit_requests_status_idx ON public.audit_requests (audit_status);