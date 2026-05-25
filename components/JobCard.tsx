"use client";

import { useState } from "react";

type JobCardProps = {
  title: string;
  budget: number;
  company: string;
  className?: string;
  featured?: boolean;
};

export default function JobCard({ title, company, budget }: JobCardProps) {
  const [applied, setApplied] = useState(false);

  function handleApply() {
    setApplied(true);
  }

  return (
    <article className="*bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <div className="text-sm text-gray-600 mb-4">
        Company: <span className="text-gray-800 font-semibold">{company}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-300 text-gray-800 text-sm font-medium">
          {budget} ETB
        </div>
        {applied ? (
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg cursor-not-allowed"
            disabled
          >
            Applied
          </button>
        ) : (
          <button
            onClick={handleApply}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Apply Now
          </button>
        )}
      </div>
    </article>
  );
}
