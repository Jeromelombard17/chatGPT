"use client";

import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import { DimensionScore } from "@/lib/types";

const RADAR_DOMAIN = [0, 5];

export type RadarChartCardProps = {
  data: DimensionScore[];
};

export default function RadarChartCard({ data }: RadarChartCardProps) {
  const chartData = data.map((dimension) => ({
    dimension: dimension.title,
    score: dimension.average
  }));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-base font-semibold text-slate-900">Radar des dimensions</h3>
      <p className="text-sm text-slate-600">
        Moyennes par dimension (1 à 5). Survolez pour le détail.
      </p>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="dimension" tick={{ fill: "#334155", fontSize: 12 }} />
            <PolarRadiusAxis
              domain={RADAR_DOMAIN}
              tick={{ fill: "#64748b", fontSize: 10 }}
              angle={90}
            />
            <Tooltip formatter={(value: number) => value.toFixed(2)} />
            <Legend />
            <Radar
              name="Moyenne"
              dataKey="score"
              stroke="#2f7cf6"
              fill="#2f7cf6"
              fillOpacity={0.4}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
