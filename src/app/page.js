import SummaryCards from "../components/dashboard/SummaryCards";
import StatisticsCard from "../components/dashboard/StatisticsCard";
import RecentActivity from "../components/dashboard/RecentActivity";
import BranchProductChart from "../components/dashboard/BranchProductChart";
import PaymentDueList from "../components/dashboard/PaymentDueList";
import StockAlertList from "../components/dashboard/StockAlertList";
import DashboardCalendar from "../components/dashboard/DashboardCalendar";
import TodoList from "../components/dashboard/TodoList";

export const metadata = {
  title: "Dashboard | ERP Dost",
  description:
    "ERP Dost business management dashboard for sales, purchases, inventory, accounts and operations.",
};

export default function DashboardPage() {
  return (
   <main className="erp-dashboard min-h-screen px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      {/* Page Header */}
      <header className="mb-7 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Quick Summary
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Monitor your business operations from one place.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            "Today",
            "This Week",
            "This Month",
            "This Financial Year",
          ].map((item, index) => (
            <button
              key={item}
              type="button"
              className={`
                rounded-full border px-4 py-2 text-xs font-semibold
                transition sm:px-5 sm:text-sm
                ${
                  index === 0
                    ? "border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                    : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:text-indigo-600"
                }
              `}
            >
              {item}
            </button>
          ))}
        </div>
      </header>

      {/* Summary */}
      <SummaryCards />

      {/* Statistics */}
      <div className="mt-6 space-y-6">
        <StatisticsCard
          title="Sale Statistics"
          description="Track your sales performance over time."
          filters={["monthly", "yearly"]}
          activeFilter="monthly"
        />

        <StatisticsCard
          title="Profit Statistics"
          description="Monitor profit and business performance."
          filters={[
            "daily",
            "weekly",
            "monthly",
            "yearly",
          ]}
          activeFilter="daily"
        />
      </div>

      {/* Recent Activity + Branch Chart */}
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <RecentActivity />

        <BranchProductChart />
      </div>

      {/* Payment + Stock */}
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <PaymentDueList />

        <StockAlertList />
      </div>

      {/* Calendar + Todo */}
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <DashboardCalendar />

        <TodoList />
      </div>
    </main>
  );
}