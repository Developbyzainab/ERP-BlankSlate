"use client";

import { BarChart3 } from "lucide-react";

export default function BranchProductChart() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-5 sm:p-6">
        <h2 className="text-lg font-bold text-slate-900">
          Branch Wise Product Quantity
        </h2>

        <p className="mt-1 text-xs text-slate-400">
          Product quantities by branch will appear here.
        </p>
      </div>

      <div className="p-5 sm:p-6">
        <div className="relative flex h-[300px] items-end overflow-hidden rounded-xl bg-slate-50/70 px-5 pb-8">
          {/* Horizontal lines */}
          <div className="absolute inset-0 flex flex-col justify-between px-5 py-5">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="border-t border-dashed border-slate-200"
              />
            ))}
          </div>

          <div className="relative z-10 mx-auto flex flex-col items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-indigo-600 shadow-sm">
              <BarChart3 size={22} />
            </div>

            <p className="mt-3 text-sm font-semibold text-slate-600">
              No product data
            </p>

            <p className="mt-1 text-center text-xs text-slate-400">
              Branch quantities will appear here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}