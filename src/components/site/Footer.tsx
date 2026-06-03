import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border/60 py-14 mt-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 max-w-sm">
            <div className="group mb-4 inline-flex opacity-90 hover:opacity-100 transition-opacity">
              <Logo height={42} />
            </div>
            <div className="text-xs uppercase tracking-[0.2em] text-cyan font-mono mb-3">
              AI Automation Agency
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Automate everything. Scale infinitely. Production-grade AI agents,
              websites, apps and automation systems for high-growth companies.
            </p>

            <div className="mt-5 text-xs text-muted-foreground space-y-1">
              <div>Stockholm · Dubai · New York · London</div>
              <div>ceptrexai@gmail.com</div>
            </div>
          </div>
          <FooterCol title="Services" links={[
            ["AI Agents", "/services/ai-agents"],
            ["n8n Automation", "/services/n8n-automation"],
            ["WhatsApp AI", "/services/whatsapp-automation"],
            ["CRM Automation", "/services/crm-automation"],
            ["Voice AI", "/services/voice-ai"],
            ["AI Analytics", "/services/ai-analytics"],
            ["Website Building", "/services/website-building"],
            ["App Development", "/services/app-development"],
          ]} />

          <FooterCol title="Industries" links={[
            ["Healthcare", "/industries/healthcare"],
            ["Real Estate", "/industries/real-estate"],
            ["E-commerce", "/industries/ecommerce"],
            ["SaaS", "/industries/saas"],
            ["Finance", "/industries/finance"],
            ["Logistics", "/industries/logistics"],
          ]} />
          <FooterCol title="Company" links={[
            ["About", "/about"],
            ["Case Studies", "/case-studies"],
            ["Portfolio", "/portfolio"],
            ["Pricing", "/pricing"],
            ["Blog", "/blog"],
            ["Resources", "/resources"],
            ["ROI Calculator", "/roi-calculator"],
            ["AI Audit", "/ai-audit"],
            ["Contact", "/contact"],
            ["Tech Stack", "/tech-stack"],
            ["Admin", "/dashboard"],
            ["Privacy", "/privacy-policy"],
            ["Terms", "/terms"],
          ]} />
        </div>
        <div className="mt-12 pt-6 border-t border-border/60 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© 2026 Ceptrex. All rights reserved.</div>
          <div className="font-mono">v1.0.0 · status: <span className="text-success">all systems operational</span></div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">{title}</div>
      <ul className="space-y-2 text-sm">
        {links.map(([label, to]) => (
          <li key={to}>
            <Link to={to} className="text-muted-foreground hover:text-foreground transition-colors">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
