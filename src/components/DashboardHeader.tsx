"use client";

import AutolystLogo from "@/components/AutolystLogo";
import { Bell, Settings, ChevronDown } from "lucide-react";

interface DashboardHeaderProps {
  unreadCount: number;
  realtorName?: string;
}

export default function DashboardHeader({
  unreadCount,
  realtorName = "Sarah Mitchell",
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-midnight border-b border-white/5">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Logo + wordmark */}
        <AutolystLogo size={32} showWordmark />

        {/* Right: actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notification bell */}
          <button
            className="relative p-2 rounded-lg text-parchment/60 hover:text-gilt hover:bg-white/5 transition-colors"
            aria-label={`${unreadCount} unread notifications`}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-gilt" />
            )}
          </button>

          {/* Settings */}
          <button
            className="p-2 rounded-lg text-parchment/60 hover:text-gilt hover:bg-white/5 transition-colors"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* Avatar / name */}
          <button className="hidden sm:flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors">
            <div className="w-7 h-7 rounded-full bg-gilt/20 border border-gilt/40 flex items-center justify-center">
              <span className="font-sans text-xs font-semibold text-gilt">
                {realtorName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </span>
            </div>
            <span className="font-sans text-sm text-parchment/80">
              {realtorName}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-parchment/40" />
          </button>
        </div>
      </div>
    </header>
  );
}
