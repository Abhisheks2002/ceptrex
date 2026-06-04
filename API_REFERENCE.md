# API Reference

Ceptrex exposes two kinds of server APIs:

1. **Server Functions** — typed RPC called from the React app via `useServerFn` / `createServerFn`.
2. **Server Routes** — raw HTTP endpoints under `src/routes/api/` (currently none — add for webhooks).

All inputs are validated with **Zod**. All responses are JSON.

---

## Server Functions

### `submitLead`
Location: `src/lib/leads.functions.ts`
Method: `POST` (RPC)
Auth: public (no auth middleware)

**Input**
```ts
{
  name: string;            // 1..120
  email: string;           // valid email, ≤200
  company: string;         // 1..160
  role?: string;           // ≤120
  budget?: string;         // ≤60
  message?: string;        // ≤2000
  source?: string;         // ≤60, default "contact"
}
```

**Response**
```ts
{ ok: true; id: string }   // crypto.randomUUID()
```

**Errors**
- `ZodError` — input validation failed (400)
- Any thrown error → branded 500 via `src/server.ts`

**Example**
```ts
import { useServerFn } from "@tanstack/react-start";
import { submitLead } from "@/lib/leads.functions";

const send = useServerFn(submitLead);
await send({ data: { name, email, company, source: "contact" } });
```

---

## Server Routes (file-based HTTP)

Add new endpoints under `src/routes/api/`. Use `src/routes/api/public/*` for webhooks (auth bypass on published deploys). Always:

1. Verify a signature on every request body
2. Validate parsed input with Zod
3. Never return user PII

Skeleton:
```ts
// src/routes/api/public/webhook.ts
import { createFileRoute } from "@tanstack/react-router";
import { createHmac, timingSafeEqual } from "crypto";

export const Route = createFileRoute("/api/public/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const sig = request.headers.get("x-signature") ?? "";
        const body = await request.text();
        const expected = createHmac("sha256", process.env.WEBHOOK_SECRET!)
          .update(body).digest("hex");
        if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
          return new Response("Invalid signature", { status: 401 });
        }
        // ...handle event
        return new Response("ok");
      },
    },
  },
});
```

---

## SEO endpoints
| Path           | File                              | Purpose                  |
|----------------|-----------------------------------|--------------------------|
| `/robots.txt`  | `src/routes/robots[.]txt.tsx`     | Crawler directives       |
| `/sitemap.xml` | `src/routes/sitemap[.]xml.tsx`    | URL index                |

---

## Rate limits
Not enforced in code. Apply at the edge (Cloudflare WAF) — recommended 30 req/min/IP on `/_serverFn/*` and `/api/*`.
