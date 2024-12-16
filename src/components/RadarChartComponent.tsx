"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  Tooltip,
} from "recharts";

const chartData = [
  { category: "Leadership", level: 2, label: "Emerging", color: "#3A4FFF", fillColor: "#3A4FFF" },
  { category: "Skills", level: 2, label: "Emerging", color: "#379C89", fillColor: "#379C89" },
  { category: "Culture", level: 3, label: "Learning", color: "#4CC63F", fillColor: "#4CC63F" },
  { category: "Data", level: 3, label: "Learning", color: "#F5C21B", fillColor: "#F5C21B" },
  { category: "Tools", level: 2, label: "Emerging", color: "#3A3A3A", fillColor: "#3A3A3A" },
  { category: "Uses", level: 4, label: "Developing", color: "#AD2474", fillColor: "#AD2474" },
  { category: "Analysis", level: 3, label: "Learning", color: "#D72C2C", fillColor: "#D72C2C" },
];

export default function RadarChartComponent() {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <Card className="bg-transparent border-none my-16">
      {/* <CardHeader>
        <CardTitle className="text-white">Radar Chart - Sector Overview</CardTitle>
        <CardDescription>
          Performance levels from Unaware to Mastering
        </CardDescription>
      </CardHeader> */}
      <CardContent className="flex justify-center">
        <RadarChart
          width={600}
          height={600}
          data={chartData}
          onMouseLeave={() => setHoveredCategory(null)} // Clear hover state
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="category" />
          <PolarRadiusAxis domain={[0, 5]} tick={false} axisLine={false} tickCount={6} />
          <Radar
            name="Level"
            dataKey="level"
            stroke={
              hoveredCategory
                ? chartData.find((d) => d.category === hoveredCategory)?.color || "#66CF66"
                : "#66CF66"
            }
            fill={
              hoveredCategory
                ? chartData.find((d) => d.category === hoveredCategory)?.fillColor || "#66d066"
                : "#66d066"
            }
            fillOpacity={hoveredCategory ? 0.8 : 0.6}
            onMouseEnter={(e) => setHoveredCategory(e.category)} // Set hover category
          />
          <Tooltip
            content={({ payload }) => {
              if (payload && payload.length) {
                return (
                  <div className="p-2 bg-white/20 rounded shadow-md backdrop-blur-md">
                    <p className="font-medium text-white">{payload[0].payload.category}</p>
                    <p className="text-white/80">
                      {payload[0].payload.label}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
        </RadarChart>
      </CardContent>
    </Card>
  );
}
