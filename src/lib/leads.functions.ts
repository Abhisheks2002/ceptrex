import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const LeadSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  company: z.string().min(1).max(160),
  role: z.string().max(120).optional().default(""),
  budget: z.string().max(60).optional().default(""),
  message: z.string().max(2000).optional().default(""),
  source: z.string().max(60).optional().default("contact"),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => LeadSchema.parse(data))
  .handler(async ({ data }) => {
    // Production: forward to CRM / Resend / Supabase here.
    // Kept side-effect-free in template; logs server-side for now.
    console.log("[lead]", { ...data, at: new Date().toISOString() });
    return { ok: true as const, id: crypto.randomUUID() };
  });
