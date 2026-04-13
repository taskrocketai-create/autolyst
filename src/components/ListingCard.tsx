"use client";

import { Listing } from "@/lib/types";
import StatusBadge from "@/components/ui/StatusBadge";
import { BedDouble, Bath, Maximize2, MapPin } from "lucide-react";

interface ListingCardProps {
  listing: Listing;
  onClick?: (id: string) => void;
}

function formatPrice(price: number): string {
  if (price >= 1_000_000) {
    return `$${(price / 1_000_000).toFixed(price % 1_000_000 === 0 ? 0 : 2)}M`;
  }
  return `$${price.toLocaleString()}`;
}

export default function ListingCard({ listing, onClick }: ListingCardProps) {
  return (
    <article
      className="group relative bg-white border border-ink/8 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-[0_4px_24px_rgba(26,24,20,0.10)] hover:-translate-y-0.5"
      onClick={() => onClick?.(listing.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick?.(listing.id)}
      aria-label={`View listing at ${listing.address}`}
    >
      {/* Cover image / placeholder */}
      <div className="relative h-44 bg-parchment overflow-hidden">
        {listing.cover_image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={listing.cover_image_url}
            alt={listing.address}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-parchment to-stone/10">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M6 20L24 6L42 20V42H30V30H18V42H6V20Z"
                stroke="#C8A96E"
                strokeWidth="2"
                strokeLinejoin="round"
                fill="none"
                opacity="0.5"
              />
            </svg>
          </div>
        )}
        {/* Status badge — top right */}
        <div className="absolute top-3 right-3">
          <StatusBadge status={listing.status} />
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">
        {/* Address */}
        <div className="flex items-start gap-1.5 mb-1">
          <MapPin className="w-3.5 h-3.5 text-stone mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-sans font-medium text-sm text-ink leading-snug">
              {listing.address}
            </p>
            <p className="font-sans text-xs text-stone">
              {listing.city}, {listing.state} {listing.zip}
            </p>
          </div>
        </div>

        {/* Price */}
        <p className="font-display text-2xl font-semibold text-ink mt-2 mb-3 leading-none">
          {formatPrice(listing.price)}
        </p>

        {/* Stats row */}
        <div className="flex items-center gap-3 text-xs font-sans text-stone">
          <span className="flex items-center gap-1">
            <BedDouble className="w-3.5 h-3.5" />
            {listing.bedrooms} bd
          </span>
          <span className="w-px h-3 bg-stone/30" />
          <span className="flex items-center gap-1">
            <Bath className="w-3.5 h-3.5" />
            {listing.bathrooms} ba
          </span>
          <span className="w-px h-3 bg-stone/30" />
          <span className="flex items-center gap-1">
            <Maximize2 className="w-3.5 h-3.5" />
            {listing.sqft.toLocaleString()} sqft
          </span>
        </div>

        {/* MLS number */}
        {listing.mls_number && (
          <p className="mt-3 text-[11px] font-sans text-stone/60 tracking-wider uppercase">
            MLS# {listing.mls_number}
          </p>
        )}
      </div>
    </article>
  );
}
