'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface VisitsChartProps {
  data: Array<{ name: string; visits: number }>;
}

export default function VisitsChart({ data }: VisitsChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-xs text-brand-slate bg-brand-alabaster/50 rounded-xl border border-brand-stone/60">
        No visit traffic logged yet for this timeframe.
      </div>
    );
  }

  return (
    <div className="w-full h-64 select-none">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#264E41" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#264E41" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={{ stroke: '#E2E8F0' }}
            tick={{ fill: '#718096', fontSize: 11 }}
            dy={8}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#718096', fontSize: 11 }}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 8px 24px -4px rgba(28, 35, 33, 0.08)',
              fontSize: '12px',
              color: '#1C2321',
            }}
            formatter={(value: any) => [`${value} Visits`, 'Traffic']}
          />
          <Area
            type="monotone"
            dataKey="visits"
            stroke="#264E41"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#emeraldGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
