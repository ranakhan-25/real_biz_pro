import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

const POSTS = [
  {
    title: "How to cut lead response time from hours to minutes",
    excerpt:
      "The teams that convert the most leads aren't the ones with the biggest ad budget \u2014 they're the ones who call back first. Here's how auto-assignment changes that.",
    readTime: "6 min read",
    tag: "Playbook",
    accent: "text-brand-blue",
  },
  {
    title: "Spreadsheets worked at 5 agents. Here's when they stop.",
    excerpt:
      "A practical breakdown of the signs your team has outgrown spreadsheet-based lead tracking, and what to look for in whatever replaces it.",
    readTime: "5 min read",
    tag: "Guide",
    accent: "text-brand-teal",
  },
  {
    title: "Setting up approval layers without slowing your team down",
    excerpt:
      "Approval workflows exist to prevent mistakes, not to create bottlenecks. Here's how growing agencies strike that balance.",
    readTime: "4 min read",
    tag: "Guide",
    accent: "text-brand-violet",
  },
];

export function BlogPreview() {
  return (
    <section className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="font-mono-accent text-[11.5px] font-semibold tracking-wider text-brand-teal">
              FROM THE BLOG
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-brand-ink md:text-4xl">
              Resources for growing real estate teams
            </h2>
          </div>
          <Link
            href="#"
            className="flex items-center gap-1.5 text-[13.5px] font-medium text-brand-ink/70 hover:text-brand-ink"
          >
            View all articles
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {POSTS.map((post) => (
            <Link
              key={post.title}
              href="#"
              className="group flex flex-col rounded-2xl border border-brand-ink/[0.07] bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-ink/6"
            >
              <span className={`text-[11.5px] font-semibold ${post.accent}`}>{post.tag}</span>
              <h3 className="mt-3 font-display text-[16px] font-semibold leading-snug text-brand-ink">
                {post.title}
              </h3>
              <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-brand-ink/55">
                {post.excerpt}
              </p>
              <div className="mt-5 flex items-center gap-1.5 text-[11.5px] text-brand-ink/45">
                <Clock size={12} />
                {post.readTime}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
