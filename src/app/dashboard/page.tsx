"use client";

import { useState, useMemo } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import MetricsRow from "@/components/MetricsRow";
import NotificationBar from "@/components/NotificationBar";
import ListingCard from "@/components/ListingCard";
import { mockListings, mockMetrics, mockNotifications } from "@/lib/mockData";
import { ListingStatus } from "@/lib/types";
import { Search, Plus, SlidersHorizontal } from "lucide-react";

const FILTER_TABS: { label: string; value: ListingStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Intake", value: "intake" },
  { label: "Processing", value: "processing" },
  { label: "Review", value: "review" },
  { label: "Published", value: "published" },
  { label: "Archived", value: "archived" },
];

export default function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState<ListingStatus | "all">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return mockListings.filter((l) => {
      const matchesStatus =
        activeFilter === "all" || l.status === activeFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        l.address.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q) ||
        l.state.toLowerCase().includes(q) ||
        (l.mls_number ?? "").toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-parchment">
      <DashboardHeader unreadCount={unreadCount} />

      <main className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* ── Page title row ── */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink">
              My Listings
            </h1>
            <p className="font-sans text-sm text-stone mt-1">
              {mockListings.length} total · {mockMetrics.activeListings} active
            </p>
          </div>

          {/* New listing button */}
          <button className="flex items-center gap-2 bg-gilt hover:bg-gilt/90 text-midnight font-sans font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            New Listing
          </button>
        </div>

        {/* ── Notification bar ── */}
        <NotificationBar notifications={mockNotifications} />

        {/* ── Metrics row ── */}
        <MetricsRow metrics={mockMetrics} />

        {/* ── Search + filter row ── */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone/60 pointer-events-none" />
            <input
              type="search"
              placeholder="Search by address, city, MLS#…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full font-sans text-sm bg-white border border-ink/10 rounded-xl pl-9 pr-4 py-2.5 text-ink placeholder:text-stone/50 outline-none focus:border-gilt focus:ring-2 focus:ring-gilt/20 transition-all"
            />
          </div>

          {/* Filter button (decorative for now) */}
          <button className="flex items-center gap-2 bg-white border border-ink/10 hover:border-gilt/50 text-stone font-sans text-sm px-4 py-2.5 rounded-xl transition-colors">
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

        {/* ── Filter tabs ── */}
        <div className="flex items-center gap-1 overflow-x-auto pb-0.5 scrollbar-hide">
          {FILTER_TABS.map((tab) => {
            const count =
              tab.value === "all"
                ? mockListings.length
                : mockListings.filter((l) => l.status === tab.value).length;
            const isActive = activeFilter === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`flex-shrink-0 flex items-center gap-1.5 font-sans text-sm px-3.5 py-1.5 rounded-lg transition-all ${
                  isActive
                    ? "bg-ink text-parchment font-medium"
                    : "text-stone hover:text-ink hover:bg-ink/5"
                }`}
              >
                {tab.label}
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-md ${
                    isActive ? "bg-parchment/15 text-parchment/70" : "bg-ink/6 text-stone/70"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Listings grid ── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onClick={(id) => console.log("navigate to listing", id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-ink/5 flex items-center justify-center mb-4">
              <Search className="w-7 h-7 text-stone/40" />
            </div>
            <h3 className="font-display text-xl text-ink">No listings found</h3>
            <p className="font-sans text-sm text-stone mt-1">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
