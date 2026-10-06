"use client";

import { ArrowRight, FileText } from "lucide-react";

const columns = [
  "Invoice No",
  "Date",
  "Branch",
  "Amount",
  "Customer",
  "Status",
];

export default function RecentActivity() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Recent Activity
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Recent business activity will appear here.
          </p>
        </div>

        <div className="flex gap-1 rounded-lg bg-slate-50 p-1">
          <button
            type="button"
            className="rounded-md bg-indigo-600 px-3 py-1.5 text-[10px] font-semibold text-white"
          >
            Sales
          </button>

          <button
            type="button"
            className="rounded-md px-3 py-1.5 text-[10px] font-semibold text-slate-500"
          >
            Purchase
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60">
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-5 py-3 text-[10px] font-bold uppercase tracking-wide text-slate-400"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr>
              <td
                colSpan={columns.length}
                className="h-[220px] px-5 text-center"
              >
                <EmptyTableState
                  icon={FileText}
                  text="No recent activity"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-center border-t border-slate-100 p-4">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700"
        >
          View All
          <ArrowRight size={14} />
        </button>
      </div>
    </section>
  );
}

function EmptyTableState({ icon: Icon, text }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-slate-300">
        <Icon size={20} />
      </div>

      <p className="mt-3 text-sm font-semibold text-slate-500">
        {text}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        No records available yet.
      </p>
    </div>
  );
}