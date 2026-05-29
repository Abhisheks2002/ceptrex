import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { posts } from "@/data/blog";

export const Route = createFileRoute("/blog")({
  component: BlogIndex,
  head: () => ({
    meta: [
      { title: "Blog — Ceptrex" },
      { name: "description", content: "Playbooks, deep-dives, and field notes on building production AI agents and automation systems." },
      { property: "og:title", content: "Ceptrex Blog" },
      { property: "og:description", content: "Playbooks for AI agents, n8n, WhatsApp AI and voice." },
    ],
  }),
});

function BlogIndex() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Blog" title="Field notes from" highlight="the AI frontier" subtitle="Playbooks, postmortems and deep-dives on shipping AI in production." />
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-6 space-y-4">
          {posts.map((p) => (
            <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="block rounded-2xl border border-border bg-surface/60 backdrop-blur p-7 hover:border-primary/50 transition-colors group">
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
                <span className="px-2.5 py-1 rounded-full bg-primary/15 text-cyan font-mono">{p.category}</span>
                <span>{p.readTime}</span>
                <span>·</span>
                <span>{p.date}</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold group-hover:text-gradient transition-colors">{p.title}</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{p.excerpt}</p>
              <div className="mt-4 text-xs text-muted-foreground">By {p.author}</div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
