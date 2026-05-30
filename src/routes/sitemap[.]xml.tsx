import { createFileRoute } from "@tanstack/react-router";
import { posts } from "@/data/blog";
import { cases } from "@/data/cases";
import { services } from "@/data/services";
import { industries } from "@/data/industries";

const SITE = "https://ceptrex.lovable.app";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const staticPaths = [
          "/", "/about", "/services", "/process", "/portfolio", "/case-studies",
          "/industries", "/pricing", "/ai-audit", "/roi-calculator", "/book-call",
          "/contact", "/blog", "/resources", "/n8n-projects", "/tech-stack",
          "/privacy-policy", "/terms",
        ];

        const urls = [
          ...staticPaths.map((p) => ({ loc: SITE + p, priority: p === "/" ? "1.0" : "0.8" })),
          ...services.map((s) => ({ loc: `${SITE}/services/${s.slug}`, priority: "0.7" })),
          ...industries.map((i) => ({ loc: `${SITE}/industries/${i.slug}`, priority: "0.7" })),
          ...cases.map((c) => ({ loc: `${SITE}/case-studies/${c.slug}`, priority: "0.7" })),
          ...cases.map((c) => ({ loc: `${SITE}/portfolio/${c.slug}`, priority: "0.6" })),
          ...posts.map((p) => ({ loc: `${SITE}/blog/${p.slug}`, priority: "0.6" })),
        ];

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><priority>${u.priority}</priority></url>`).join("\n")}
</urlset>`;

        return new Response(xml, {
          status: 200,
          headers: { "content-type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
