"use client";

import {
  CheckCircle2,
  Plus,
} from "lucide-react";

export default function TodoList() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 p-5 sm:p-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            To Do List
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Keep track of your tasks.
          </p>
        </div>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm transition hover:bg-indigo-700"
          aria-label="Add task"
        >
          <Plus size={17} />
        </button>
      </div>

      <div className="flex border-b border-slate-100 px-5 pt-4">
        <button
          type="button"
          className="border-b-2 border-indigo-600 px-3 pb-3 text-xs font-semibold text-indigo-600"
        >
          Incomplete
        </button>

        <button
          type="button"
          className="px-3 pb-3 text-xs font-semibold text-slate-400"
        >
          Completed
        </button>
      </div>

      <div className="flex min-h-[250px] flex-col items-center justify-center p-6 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-300">
          <CheckCircle2 size={22} />
        </div>

        <p className="mt-3 text-sm font-semibold text-slate-500">
          No tasks available
        </p>

        <p className="mt-1 max-w-xs text-xs leading-5 text-slate-400">
          Your tasks will appear here when you create them.
        </p>
      </div>
    </section>
  );
}