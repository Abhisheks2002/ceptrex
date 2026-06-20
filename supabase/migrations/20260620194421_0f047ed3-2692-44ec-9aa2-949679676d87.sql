
CREATE TABLE public.audit_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text NOT NULL,
  email text NOT NULL,
  revenue text,
  stack text,
  goal text,
  source text NOT NULL DEFAULT 'ai-audit',
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.audit_requests TO anon;
GRANT SELECT, INSERT ON public.audit_requests TO authenticated;
GRANT ALL ON public.audit_requests TO service_role;

ALTER TABLE public.audit_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an audit request"
  ON public.audit_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 120
    AND char_length(company) BETWEEN 1 AND 160
    AND char_length(email) BETWEEN 3 AND 200
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  );

CREATE POLICY "Authenticated can read audit requests"
  ON public.audit_requests FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX audit_requests_created_at_idx ON public.audit_requests (created_at DESC);
