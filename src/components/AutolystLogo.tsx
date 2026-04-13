import React from "react";

interface AutolystLogoProps {
  /** Width in pixels (height is proportional) */
  size?: number;
  /** Override the mark color (default: gilt #C8A96E) */
  color?: string;
  /** Show the wordmark beside the icon */
  showWordmark?: boolean;
  className?: string;
}

/**
 * Autolyst logomark — geometric "A" with gilt scan-lines.
 *
 * The mark is a stylised capital A built from two diagonal strokes
 * and a horizontal cross-bar, overlaid with three thin parallel
 * scan-lines (evocative of AI processing / listing analysis).
 */
export default function AutolystLogo({
  size = 40,
  color = "#C8A96E",
  showWordmark = false,
  className = "",
}: AutolystLogoProps) {
  const h = size;
  const w = size * 0.8; // A is slightly narrower than tall

  // Core geometry (all values as % of w/h, then scaled)
  const mx = w / 2; // midpoint x
  const strokeW = size * 0.055;
  const scanOpacity = 0.35;

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* ── Mark ── */}
      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Autolyst logomark"
      >
        {/* Left diagonal leg */}
        <line
          x1={mx}
          y1={size * 0.04}
          x2={size * 0.02}
          y2={h - size * 0.04}
          stroke={color}
          strokeWidth={strokeW}
          strokeLinecap="round"
        />
        {/* Right diagonal leg */}
        <line
          x1={mx}
          y1={size * 0.04}
          x2={w - size * 0.02}
          y2={h - size * 0.04}
          stroke={color}
          strokeWidth={strokeW}
          strokeLinecap="round"
        />
        {/* Cross-bar */}
        <line
          x1={w * 0.22}
          y1={h * 0.58}
          x2={w * 0.78}
          y2={h * 0.58}
          stroke={color}
          strokeWidth={strokeW * 0.8}
          strokeLinecap="round"
        />

        {/* ── Scan-lines (3 horizontal, clipped inside the A silhouette) ── */}
        {/* We use a clipPath matching the A shape for a clean trim */}
        <defs>
          <clipPath id="a-clip">
            <polygon
              points={`
                ${mx},${size * 0.04}
                ${size * 0.02},${h - size * 0.04}
                ${w * 0.15},${h - size * 0.04}
                ${w * 0.22},${h * 0.58}
                ${w * 0.78},${h * 0.58}
                ${w * 0.85},${h - size * 0.04}
                ${w - size * 0.02},${h - size * 0.04}
              `}
            />
          </clipPath>
        </defs>

        {[0.33, 0.5, 0.67].map((frac) => (
          <line
            key={frac}
            x1={0}
            y1={h * frac}
            x2={w}
            y2={h * frac}
            stroke={color}
            strokeWidth={strokeW * 0.5}
            strokeOpacity={scanOpacity}
            clipPath="url(#a-clip)"
          />
        ))}
      </svg>

      {/* ── Word-mark ── */}
      {showWordmark && (
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color,
            fontSize: size * 0.7,
            fontWeight: 500,
            letterSpacing: "0.08em",
            lineHeight: 1,
          }}
        >
          AUTOLYST
        </span>
      )}
    </div>
  );
}
