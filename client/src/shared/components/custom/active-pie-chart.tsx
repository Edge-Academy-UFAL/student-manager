"use client";

import React, { useState } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

interface DataItem {
  name: string;
  value: number;
  color: string;
  [key: string]: any;
}

interface CustomActivePieChartProps {
  data: DataItem[];
  unit?: string;
  height?: number | string;
}

const renderActiveShape = (props: any, unit: string) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="text-sm font-bold">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" className="text-xs font-medium">
        {`${value} ${unit}`}
      </text>
      
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999" className="text-xs">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export function CustomActivePieChart({ data, unit = "", height = 350 }: CustomActivePieChartProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <div style={{ width: "100%", height: height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
            <Pie
            activeShape={(props: any) => renderActiveShape(props, unit)}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            dataKey="value"
            onMouseEnter={onPieEnter}
            >
            {data.map((entry: DataItem, index: number) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}