import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { posts } from "@/data/blog";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPost,
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} — NexaForge AI` },
          { name: "description", content: loaderData.post.excerpt },
          { property: "og:title", content: loaderData.post.title },
          { property: "og:description", content: loaderData.post.excerpt },
          { property: "article:published_time", content: loaderData.post.date },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="py-32 text-center">
        <h1 className="font-display text-4xl">Post not found</h1>
        <Link to="/blog" className="text-cyan mt-4 inline-block">← All posts</Link>
      </div>
    </SiteLayout>
  ),
});

function BlogPost() {
  const { post } = Route.useLoaderData();
  return (
    <SiteLayout>
      <article className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <Link to="/blog" className="text-sm text-cyan hover:underline">← All posts</Link>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="px-2.5 py-1 rounded-full bg-primary/15 text-cyan font-mono">{post.category}</span>
            <span>{post.readTime}</span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.author}</span>
          </div>
          <h1 className="mt-5 font-display text-4xl md:text-5xl font-bold leading-tight">{post.title}</h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{post.excerpt}</p>
          <div className="mt-10 space-y-5 text-foreground/90 leading-relaxed">
            {post.content.map((p: string, i: number) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </article>
    </SiteLayout>
  );
}
