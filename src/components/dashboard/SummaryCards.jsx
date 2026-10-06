"use client";

import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Banknote,
  CircleDollarSign,
  FileWarning,
  Receipt,
  ShoppingBag,
  Wallet,
} from "lucide-react";

const cards = [
  {
    title: "Total Purchase",
    icon: ShoppingBag,
  },
  {
    title: "Total Sale",
    icon: ArrowUpFromLine,
  },
  {
    title: "Expenses",
    icon: Wallet,
  },
  {
    title: "Purchase Due",
    icon: FileWarning,
  },
  {
    title: "Invoice Due",
    icon: Receipt,
  },
  {
    title: "Total In Bank",
    icon: Banknote,
  },
  {
    title: "Total In Cash",
    icon: CircleDollarSign,
  },
  {
    title: "Net Profit",
    icon: ArrowDownToLine,
  },
];

export default function SummaryCards() {
  return (
    <section
      aria-label="Business summary"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article
            key={card.title}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-100 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Icon size={18} strokeWidth={2} />
              </div>

              <span className="text-xs text-slate-300">
                —
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              {card.title}
            </p>

            <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              —
            </p>

            <p className="mt-1 text-xs text-slate-400">
              No data available
            </p>
          </article>
        );
      })}
    </section>
  );
}