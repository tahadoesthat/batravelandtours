import React from 'react';

// Country flag emoji helper
function getFlagEmoji(countryCode: string) {
  if (!countryCode || countryCode.length !== 2) return '🌐';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

interface LocationItem {
  code: string;
  name: string;
  count: number;
  percentage: number;
}

interface GeoDistributionTableProps {
  locations: LocationItem[];
  totalVisits: number;
}

export default function GeoDistributionTable({
  locations,
  totalVisits,
}: GeoDistributionTableProps) {
  if (!locations || locations.length === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center text-xs text-brand-slate bg-brand-alabaster/40 rounded-xl border border-brand-stone/60 p-6 text-center">
        <span>No geographic traffic records logged yet.</span>
        <span className="text-[11px] text-brand-slate/80 mt-1">
          Geo headers (x-vercel-ip-country) populate here automatically upon visitor page requests.
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {locations.map((loc) => {
        return (
          <div key={loc.code} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2.5">
                <span className="text-base leading-none select-none">
                  {getFlagEmoji(loc.code)}
                </span>
                <span className="font-semibold text-brand-charcoal">
                  {loc.name}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-brand-slate">
                <span>{loc.count.toLocaleString()} visits</span>
                <span className="font-bold text-brand-charcoal">({loc.percentage}%)</span>
              </div>
            </div>
            {/* Slim Emerald Progress Indicator */}
            <div className="w-full bg-brand-stone/60 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-brand-emerald h-full rounded-full transition-all duration-700"
                style={{ width: `${Math.max(4, loc.percentage)}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
