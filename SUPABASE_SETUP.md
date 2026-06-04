# Supabase / Lovable Cloud Setup

Ceptrex uses **Lovable Cloud** (managed Supabase) for backend features. Today the live site runs without it — enable it when you need persistence, auth, file storage, or AI gateway.

## 1. Enable Lovable Cloud
In the Lovable editor: ask the AI to "enable Lovable Cloud" or click **Cloud** in the sidebar. This:
- Provisions a Supabase project
- Injects `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY` as project secrets
- Creates `src/integrations/supabase/client.ts`, `client.server.ts`, `auth-middleware.ts`, `auth-attacher.ts`

## 2. Three Supabase clients

| Client | File | Use it for |
|---|---|---|
| Browser | `@/integrations/supabase/client` | Auth UI, realtime, session listeners |
| Auth-scoped server | `@/integrations/supabase/auth-middleware` | ServerFns that run as the user (RLS applies) |
| Admin (service role) | `@/integrations/supabase/client.server` | Server routes, webhooks, admin ops (bypasses RLS) |

**Never import `client.server.ts` from anything reachable by the browser.**

## 3. Auth

```ts
// src/lib/profile.functions.ts
import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getMyProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data } = await supabase.from("profiles").select("*").eq("id", userId).single();
    return data;
  });
```

The browser bearer token is attached automatically by `attachSupabaseAuth` (registered in `src/start.ts`).

## 4. Tables — required grants

Supabase no longer grants Data API access by default. Every migration MUST follow this order:

```sql
CREATE TABLE public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text not null,
  message text,
  created_at timestamptz default now()
);

GRANT INSERT ON public.leads TO anon;          -- allow public form submissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead"
  ON public.leads FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Authenticated can read all leads"
  ON public.leads FOR SELECT TO authenticated USING (true);
```

## 5. User roles (security)

Never store `role` on `profiles` — it enables privilege escalation. Use a separate `user_roles` table + `has_role` security-definer function:

```sql
CREATE TYPE public.app_role AS ENUM ('admin','moderator','user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;
```

## 6. Storage

Create a bucket in Supabase → Storage. For public assets set the bucket **public**. For user uploads keep it private and use signed URLs from a server function.

## 7. Production hardening

- [ ] RLS enabled on every public table
- [ ] No `service_role` import anywhere under `src/components/` or `src/routes/` (except `/api/*` routes that verify their caller)
- [ ] Email auth: enable **Confirm email** in Supabase Auth settings
- [ ] OAuth: configure redirect URLs for prod + preview hosts
- [ ] Backups: enable PITR (Pro plan)
- [ ] Rotate `SUPABASE_SERVICE_ROLE_KEY` every 90 days
