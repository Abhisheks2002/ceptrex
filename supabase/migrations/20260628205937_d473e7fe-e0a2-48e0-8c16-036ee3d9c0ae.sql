DROP POLICY IF EXISTS "Anyone can submit a contact lead" ON public.contact_leads;

CREATE POLICY "Anyone can submit a contact lead"
  ON public.contact_leads FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 120
    AND char_length(email) BETWEEN 3 AND 200
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND (message IS NULL OR char_length(message) <= 4000)
    AND (company IS NULL OR char_length(company) <= 160)
  );