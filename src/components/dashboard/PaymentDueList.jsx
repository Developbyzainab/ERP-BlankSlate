"use client";

import { CircleDollarSign } from "lucide-react";

const columns = [
  "Invoice No",
  "Date",
  "Branch",
  "Payable Amount",
  "Customer",
  "Due",
];

export default function PaymentDueList() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-5 sm:p-6">
        <h2 className="text-lg font-bold text-slate-900">
          Payment Due List
        </h2>

        <p className="mt-1 text-xs text-slate-400">
          Outstanding payments will appear here.
        </p>
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
                className="h-[220px] text-center"
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-slate-300">
                    <CircleDollarSign size={20} />
                  </div>

                  <p className="mt-3 text-sm font-semibold text-slate-500">
                    No payment due
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Outstanding payments will appear here.
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}