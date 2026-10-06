"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const weeks = [
  ["30", "31", "1", "2", "3", "4", "5"],
  ["6", "7", "8", "9", "10", "11", "12"],
  ["13", "14", "15", "16", "17", "18", "19"],
  ["20", "21", "22", "23", "24", "25", "26"],
  ["27", "28", "29", "30", "1", "2", "3"],
];

const days = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

export default function DashboardCalendar() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Calendar
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Manage your schedule and events.
            </p>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              aria-label="Previous month"
            >
              <ChevronLeft size={17} />
            </button>

            <button
              type="button"
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              aria-label="Next month"
            >
              <ChevronRight size={17} />
            </button>

            <button
              type="button"
              className="ml-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Today
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex rounded-lg bg-slate-50 p-1">
            {["Month", "Week", "Day"].map((item, index) => (
              <button
                key={item}
                type="button"
                className={`
                  rounded-md px-3 py-1.5 text-[11px] font-semibold
                  ${
                    index === 0
                      ? "bg-indigo-600 text-white"
                      : "text-slate-500"
                  }
                `}
              >
                {item}
              </button>
            ))}
          </div>

          <h3 className="text-sm font-bold text-slate-700">
            Current Month
          </h3>
        </div>
      </div>

      <div className="overflow-x-auto p-4 sm:p-5">
        <div className="min-w-[650px] overflow-hidden rounded-xl border border-slate-200">
          <div className="grid grid-cols-7 bg-slate-50">
            {days.map((day) => (
              <div
                key={day}
                className="border-r border-slate-200 px-3 py-3 text-center text-[10px] font-bold uppercase text-slate-400 last:border-r-0"
              >
                {day}
              </div>
            ))}
          </div>

          {weeks.map((week, weekIndex) => (
            <div
              key={weekIndex}
              className="grid grid-cols-7"
            >
              {week.map((date, dateIndex) => {
                const muted =
                  (weekIndex === 0 && dateIndex < 2) ||
                  (weekIndex === 4 && dateIndex > 3);

                return (
                  <div
                    key={`${weekIndex}-${dateIndex}`}
                    className={`
                      min-h-[72px] border-r border-t border-slate-200
                      p-2 last:border-r-0 sm:min-h-[85px]
                      ${
                        date === "25"
                          ? "bg-indigo-600 text-white"
                          : "bg-white"
                      }
                    `}
                  >
                    <span
                      className={`
                        text-xs font-medium
                        ${
                          date === "25"
                            ? "text-white"
                            : muted
                              ? "text-slate-300"
                              : "text-slate-500"
                        }
                      `}
                    >
                      {date}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}