"use client";

import { BarChart3 } from "lucide-react";

export default function StatisticsCard({
  title,
  description,
  filters = [],
  activeFilter,
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {title}
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-400">
            {description}
          </p>
        </div>

        {filters.length > 0 && (
          <div className="flex flex-wrap gap-1 rounded-xl bg-slate-50 p-1">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`
                  rounded-lg px-3 py-2 text-[11px] font-semibold capitalize
                  transition
                  ${
                    filter === activeFilter
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-500 hover:bg-white hover:text-slate-800"
                  }
                `}
              >
                {filter}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="p-5 sm:p-6">
        <div className="relative h-[300px] overflow-hidden rounded-xl bg-slate-50/70">
          {/* Grid */}
          <div className="absolute inset-0 flex flex-col justify-between px-5 py-5">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="border-t border-dashed border-slate-200"
              />
            ))}
          </div>

          {/* Chart axis */}
          <div className="absolute bottom-5 left-5 right-5 border-b border-slate-300" />

          {/* Empty state */}
          <div className="relative flex h-full flex-col items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-indigo-600 shadow-sm">
              <BarChart3 size={22} />
            </div>

            <p className="mt-3 text-sm font-semibold text-slate-600">
              No data available
            </p>

            <p className="mt-1 max-w-xs text-center text-xs leading-5 text-slate-400">
              Statistics will appear here when business data is connected.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}