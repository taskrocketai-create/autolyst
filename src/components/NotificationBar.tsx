"use client";

import { Notification } from "@/lib/types";
import { Bell, X } from "lucide-react";
import { useState } from "react";

interface NotificationBarProps {
  notifications: Notification[];
}

export default function NotificationBar({
  notifications,
}: NotificationBarProps) {
  const unread = notifications.filter((n) => !n.read);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const visible = unread.filter((n) => !dismissed.has(n.id));

  if (visible.length === 0) return null;

  // Show only the most recent
  const latest = visible[0];

  return (
    <div className="flex items-start gap-3 bg-gilt/10 border border-gilt/30 rounded-xl px-4 py-3">
      <Bell className="w-4 h-4 text-gilt mt-0.5 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="font-sans font-semibold text-sm text-ink">
          {latest.title}
          {visible.length > 1 && (
            <span className="ml-2 text-xs font-normal text-stone">
              +{visible.length - 1} more
            </span>
          )}
        </p>
        <p className="font-sans text-xs text-stone mt-0.5 truncate">
          {latest.body}
        </p>
      </div>
      <button
        onClick={() =>
          setDismissed((prev) => {
            const next = new Set(Array.from(prev));
            visible.forEach((n) => next.add(n.id));
            return next;
          })
        }
        className="flex-shrink-0 p-1 rounded-md hover:bg-gilt/20 transition-colors"
        aria-label="Dismiss notifications"
      >
        <X className="w-3.5 h-3.5 text-stone" />
      </button>
    </div>
  );
}
