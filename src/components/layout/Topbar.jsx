"use client";

import {
  Bell,
  ChevronDown,
  Globe2,
  Menu,
  Search,
  Settings,
  SlidersHorizontal,
} from "lucide-react";

export default function Topbar({ setIsOpen }) {
  return (
    <header
  className="erp-topbar fixed left-0 right-0 top-0 z-30 h-[76px] border-b border-slate-200 bg-white/90 backdrop-blur-xl lg:left-[280px]"
>
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu size={21} />
          </button>

          {/* Search */}
          <div className="hidden h-10 w-[300px] items-center gap-3 rounded-xl border border-transparent bg-slate-50 px-4 transition focus-within:border-indigo-200 focus-within:bg-white sm:flex">
            <Search size={18} className="text-slate-400" />

            <input
              type="search"
              placeholder="Search anything..."
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              aria-label="Search"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Branch */}
          <button
            type="button"
            className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 md:flex"
          >
            <span>Branch</span>
            <ChevronDown size={15} />
          </button>

          {/* Language */}
          <button
            type="button"
            className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 md:flex"
          >
            <Globe2 size={17} className="text-slate-400" />
            <span>EN</span>
            <ChevronDown size={15} />
          </button>

          <div className="mx-1 hidden h-7 w-px bg-slate-200 md:block" />

          {/* Quick settings */}
          <button
            type="button"
            className="rounded-xl p-2.5 text-slate-500 hover:bg-slate-100"
            aria-label="Quick settings"
          >
            <SlidersHorizontal size={18} />
          </button>

          <button
            type="button"
            className="rounded-xl p-2.5 text-slate-500 hover:bg-slate-100"
            aria-label="Settings"
          >
            <Settings size={18} />
          </button>

          {/* Notifications */}
          <button
            type="button"
            className="relative rounded-xl p-2.5 text-slate-500 hover:bg-slate-100"
            aria-label="Notifications"
          >
            <Bell size={19} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white" />
          </button>

          {/* Profile */}
          <button
            type="button"
            className="ml-1 flex items-center gap-2 rounded-xl p-1.5 hover:bg-slate-50"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-600">
              U
            </div>

            <ChevronDown
              size={15}
              className="hidden text-slate-400 sm:block"
            />
          </button>
        </div>
      </div>
    </header>
  );
}



