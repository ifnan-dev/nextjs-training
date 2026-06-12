"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";

type JobCardProps = {
  title: string;
  budget: number;
  company: string;
  className?: string;
  featured?: boolean;
};

export default function JobCard({
  title,
  company,
  budget,
  featured,
  className,
}: JobCardProps) {
  const [applied, setApplied] = useState(false);

  function handleApply() {
    setApplied(true);
  }

  return (
    <article
      className={twMerge(
        "group bg-surface border border-border rounded-xl p-5 mb-4 shadow-sm hover:shadow-md hover:border-primary/30 transition-all",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        {featured && (
          <span className="shrink-0 inline-flex items-center rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
            Featured
          </span>
        )}
      </div>
      <div className="text-sm text-muted mb-4">
        {company}
      </div>

      <div className="flex items-center justify-between">
        <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
          {budget.toLocaleString()} ETB
        </div>
        {applied ? (
          <button
            className="rounded-lg bg-success/10 px-4 py-2 text-sm font-medium text-success cursor-not-allowed"
            disabled
          >
            ✓ Applied
          </button>
        ) : (
          <button
            onClick={handleApply}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover shadow-sm transition-colors"
          >
            Apply Now
          </button>
        )}
      </div>
    </article>
  );
}
