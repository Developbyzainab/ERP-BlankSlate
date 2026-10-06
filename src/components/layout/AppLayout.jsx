"use client";

import { useState } from "react";
import Sidebar from "../layout/sidebar";
import Topbar from "../layout/Topbar";

export default function AppLayout({
  children,
}) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ONE SIDEBAR */}

      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* RIGHT SIDE AREA */}

      <div className="min-h-screen lg:pl-[260px]">
        <Topbar
          onMenuClick={() =>
            setSidebarOpen(true)
          }
        />

        <main className="min-h-[calc(100vh-64px)] pt-16">
          {children}
        </main>
      </div>
    </div>
  );}