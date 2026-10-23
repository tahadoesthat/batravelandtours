'use client';

import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  Plane,
  Building2,
  DollarSign,
  Users,
  Plus,
  Trash2,
  Check,
  ChevronDown,
  Info,
} from 'lucide-react';
import { POPULAR_AIRPORTS, AirportItem } from '@/data/airportsData';

export interface TripOverviewData {
  enabled: boolean;
  startDate?: string;
  endDate?: string;
  travelDatesText?: string;
  duration?: string;
  route?: string[];
  hotels?: string[];
  pricePkr?: string;
  priceUsd?: string;
  totalSlots?: string;
}

interface TripOverviewEditorProps {
  data: TripOverviewData;
  onChange: (updated: TripOverviewData) => void;
}

function calculateDuration(start: string, end: string): string {
  if (!start || !end) return '';
  const d1 = new Date(start);
  const d2 = new Date(end);
  const diff = d2.getTime() - d1.getTime();
  if (isNaN(diff) || diff < 0) return '';
  const nights = Math.round(diff / (1000 * 60 * 60 * 24));
  const days = nights + 1;
  return `${days} Days / ${nights} Nights`;
}

function formatDatesLabel(start: string, end: string): string {
  if (!start || !end) return '';
  try {
    const d1 = new Date(start + 'T00:00:00');
    const d2 = new Date(end + 'T00:00:00');
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return `${d1.toLocaleDateString('en-US', options)} – ${d2.toLocaleDateString('en-US', options)}`;
  } catch {
    return `${start} – ${end}`;
  }
}

export default function TripOverviewEditor({ data, onChange }: TripOverviewEditorProps) {
  const enabled = Boolean(data.enabled);
  const route = data.route && data.route.length > 0 ? data.route : ['Lahore (LHE)', 'Kuala Lumpur (KUL)'];
  const hotels = data.hotels && data.hotels.length > 0 ? data.hotels : [''];

  const handleToggle = () => {
    onChange({
      ...data,
      enabled: !enabled,
      route: !enabled && (!data.route || data.route.length === 0) ? ['Lahore (LHE)', 'Kuala Lumpur (KUL)'] : data.route,
      hotels: !enabled && (!data.hotels || data.hotels.length === 0) ? [''] : data.hotels,
    });
  };

  const handleDatesChange = (start: string, end: string) => {
    const autoDuration = calculateDuration(start, end);
    const formattedDates = formatDatesLabel(start, end);
    onChange({
      ...data,
      startDate: start,
      endDate: end,
      travelDatesText: formattedDates || data.travelDatesText,
      duration: autoDuration || data.duration,
    });
  };

  const handleRouteChange = (index: number, value: string) => {
    const updated = [...route];
    updated[index] = value;
    onChange({ ...data, route: updated });
  };

  const handleAddStop = () => {
    onChange({ ...data, route: [...route, ''] });
  };

  const handleRemoveStop = (index: number) => {
    const updated = route.filter((_, i) => i !== index);
    onChange({ ...data, route: updated.length > 0 ? updated : [''] });
  };

  const handleHotelChange = (index: number, value: string) => {
    const updated = [...hotels];
    updated[index] = value;
    onChange({ ...data, hotels: updated });
  };

  const handleAddHotel = () => {
    onChange({ ...data, hotels: [...hotels, ''] });
  };

  const handleRemoveHotel = (index: number) => {
    const updated = hotels.filter((_, i) => i !== index);
    onChange({ ...data, hotels: updated.length > 0 ? updated : [''] });
  };

  return (
    <div className="bg-brand-alabaster/70 border border-brand-stone rounded-2xl p-5 sm:p-6 space-y-6">
      {/* 1. Header & Toggle Switch */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Plane className="w-4 h-4 text-brand-emerald" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-charcoal">
              Quick Trip Overview Table
            </h3>
          </div>
          <p className="text-xs text-brand-slate mt-0.5">
            Add a prominent dossier table displaying dates, auto-calculated duration, flight route, hotels, and bold pricing.
          </p>
        </div>

        {/* Toggle Button */}
        <button
          type="button"
          onClick={handleToggle}
          role="switch"
          aria-checked={enabled}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            enabled ? 'bg-brand-emerald' : 'bg-gray-300'
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              enabled ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* 2. Expanded Options (Only visible if enabled) */}
      {enabled && (
        <div className="space-y-6 pt-4 border-t border-brand-stone/80 animate-fade-in">
          {/* A. Travel Dates & Auto-Calculated Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-brand-stone/80">
            <div>
              <label className="block text-xs font-semibold text-brand-charcoal mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-brand-emerald" />
                <span>Travel Dates (Start &amp; End)</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={data.startDate || ''}
                  onChange={(e) => handleDatesChange(e.target.value, data.endDate || '')}
                  className="w-full text-xs px-3 py-2 border border-brand-stone rounded-lg focus:ring-1 focus:ring-brand-emerald outline-none"
                />
                <input
                  type="date"
                  value={data.endDate || ''}
                  onChange={(e) => handleDatesChange(data.startDate || '', e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-brand-stone rounded-lg focus:ring-1 focus:ring-brand-emerald outline-none"
                />
              </div>
              <input
                type="text"
                placeholder="Custom date label (e.g. Dec 29 – Jan 03)"
                value={data.travelDatesText || ''}
                onChange={(e) => onChange({ ...data, travelDatesText: e.target.value })}
                className="mt-2 w-full text-xs px-3 py-1.5 border border-brand-stone/80 rounded-lg text-brand-slate outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-charcoal mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-emerald" />
                <span>Duration (Auto-calculated or custom)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. 6 Days / 5 Nights"
                value={data.duration || ''}
                onChange={(e) => onChange({ ...data, duration: e.target.value })}
                className="w-full text-xs px-3 py-2 border border-brand-stone rounded-lg font-medium text-brand-charcoal focus:ring-1 focus:ring-brand-emerald outline-none"
              />
              <p className="text-[11px] text-brand-slate mt-1.5">
                Automatically calculated when dates are picked, or type your own.
              </p>
            </div>
          </div>

          {/* B. Flight Route (Airports with Airport Codes) */}
          <div className="bg-white p-4 rounded-xl border border-brand-stone/80">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-brand-charcoal flex items-center gap-1.5">
                <Plane className="w-3.5 h-3.5 text-brand-emerald" />
                <span>Route &amp; Airports (Origin ➔ Layovers ➔ Destination)</span>
              </label>
              <button
                type="button"
                onClick={handleAddStop}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-emerald hover:text-brand-pine px-2.5 py-1 rounded-md bg-brand-emerald/10 hover:bg-brand-emerald/20 transition"
              >
                <Plus className="w-3 h-3" />
                <span>Add Airport Stop</span>
              </button>
            </div>
            <p className="text-[11px] text-brand-slate mb-3">
              Select or type airport codes. <strong className="text-brand-charcoal">The last airport on the route is the final destination.</strong>
            </p>

            <div className="space-y-2.5">
              {route.map((stop, index) => {
                const isFirst = index === 0;
                const isLast = index === route.length - 1 && route.length > 1;

                return (
                  <div key={index} className="flex items-center gap-2">
                    <span className="w-6 text-center text-xs font-bold text-brand-slate">
                      {index + 1}.
                    </span>

                    {/* Datalist Airport Autocomplete Input */}
                    <div className="relative flex-1">
                      <input
                        list="airports-list"
                        type="text"
                        value={stop}
                        onChange={(e) => handleRouteChange(index, e.target.value)}
                        placeholder={
                          isFirst
                            ? 'Departure Airport, e.g. Lahore (LHE)'
                            : isLast
                            ? 'Destination Airport, e.g. Kuala Lumpur (KUL)'
                            : 'Layover Airport, e.g. Doha (DOH)'
                        }
                        className="w-full text-xs px-3 py-2 border border-brand-stone rounded-lg focus:ring-1 focus:ring-brand-emerald outline-none"
                      />
                    </div>

                    {isLast && (
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                        Destination
                      </span>
                    )}

                    {route.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveStop(index)}
                        className="text-gray-400 hover:text-red-500 p-1.5 rounded transition"
                        title="Remove Stop"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Datalist element providing browser autocomplete for popular airports */}
            <datalist id="airports-list">
              {POPULAR_AIRPORTS.map((apt) => (
                <option key={apt.code} value={`${apt.city} (${apt.code})`}>
                  {apt.name} — {apt.country}
                </option>
              ))}
            </datalist>
          </div>

          {/* C. Hotel Accommodation */}
          <div className="bg-white p-4 rounded-xl border border-brand-stone/80">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-brand-charcoal flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-brand-emerald" />
                <span>Hotel Accommodation</span>
              </label>
              <button
                type="button"
                onClick={handleAddHotel}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-emerald hover:text-brand-pine px-2.5 py-1 rounded-md bg-brand-emerald/10 hover:bg-brand-emerald/20 transition"
              >
                <Plus className="w-3 h-3" />
                <span>Add Another Hotel</span>
              </button>
            </div>
            <p className="text-[11px] text-brand-slate mb-3">
              Type hotel names and ratings. Add multiple if your journey includes several properties.
            </p>

            <div className="space-y-2">
              {hotels.map((hotel, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="w-5 text-center text-xs text-brand-slate">
                    {index + 1}.
                  </span>
                  <input
                    type="text"
                    value={hotel}
                    onChange={(e) => handleHotelChange(index, e.target.value)}
                    placeholder="e.g. Furama Hotel Bukit Bintang (4-Star)"
                    className="flex-1 text-xs px-3 py-2 border border-brand-stone rounded-lg focus:ring-1 focus:ring-brand-emerald outline-none"
                  />
                  {hotels.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveHotel(index)}
                      className="text-gray-400 hover:text-red-500 p-1.5 rounded transition"
                      title="Remove Hotel"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* D. Pricing (PKR + USD in brackets, BOLD) & Total Slots */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-brand-stone/80">
            <div>
              <label className="block text-xs font-semibold text-brand-charcoal mb-1 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-brand-emerald" />
                <span>Per Person Price (PKR &amp; USD)</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="PKR, e.g. PKR 325,000"
                  value={data.pricePkr || ''}
                  onChange={(e) => onChange({ ...data, pricePkr: e.target.value })}
                  className="text-xs px-3 py-2 border border-brand-stone rounded-lg font-bold text-brand-charcoal focus:ring-1 focus:ring-brand-emerald outline-none"
                />
                <input
                  type="text"
                  placeholder="USD, e.g. $1,160 USD"
                  value={data.priceUsd || ''}
                  onChange={(e) => onChange({ ...data, priceUsd: e.target.value })}
                  className="text-xs px-3 py-2 border border-brand-stone rounded-lg text-brand-slate focus:ring-1 focus:ring-brand-emerald outline-none"
                />
              </div>
              <p className="text-[11px] text-brand-slate mt-1.5">
                Will display as: <strong className="text-brand-charcoal">{data.pricePkr || 'PKR 325,000'}</strong>{' '}
                <span className="text-brand-slate">({data.priceUsd || '$1,160 USD'})</span> per person
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-charcoal mb-1 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-brand-emerald" />
                <span>Total Slots / Availability</span>
              </label>
              <input
                type="text"
                placeholder="e.g. 12 Slots Available or Limited to 15 Guests"
                value={data.totalSlots || ''}
                onChange={(e) => onChange({ ...data, totalSlots: e.target.value })}
                className="w-full text-xs px-3 py-2 border border-brand-stone rounded-lg text-brand-charcoal focus:ring-1 focus:ring-brand-emerald outline-none"
              />
              <p className="text-[11px] text-brand-slate mt-1.5">
                Optional badge showing available capacity or booking status.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
