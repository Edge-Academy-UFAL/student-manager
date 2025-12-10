"use client";

import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";

const renderActiveShape = (props: any) => {
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
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" className="text-xs">{`Qty ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999" className="text-xs">
        {`(Rate ${(percent * 100).toFixed(0)}%)`}
      </text>
    </g>
  );
};

export default function DashboardOverview() {
  const [activeIndex, setActiveIndex] = useState(0);

  const retentionData = [
    { month: "Mai", rate: 72 },
    { month: "Jun", rate: 77 },
    { month: "Jul", rate: 80 },
    { month: "Ago", rate: 88 },
    { month: "Set", rate: 82 },
    { month: "Out", rate: 91 },
    { month: "Nov", rate: 85 },
    { month: "Dez", rate: 95 }
  ];

  const projectData = [
    { month: "Mai", rate: 72 },
    { month: "Jun", rate: 77 },
    { month: "Jul", rate: 80 },
    { month: "Ago", rate: 88 },
    { month: "Set", rate: 82 },
    { month: "Out", rate: 94 },
    { month: "Nov", rate: 90 },
    { month: "Dez", rate: 97 }
  ];

  const studentsData = [
    { name: "Turma 1", value: 35, color: "#0ea5e9" },
    { name: "Turma 2", value: 40, color: "#0284c7" },
    { name: "Turma 3", value: 25, color: "#0369a1" },
    { name: "Turma 4", value: 45, color: "#075985" },
    { name: "Turma 5", value: 30, color: "#0c4a6e" },
    { name: "Turma 6", value: 20, color: "#082f49" }
  ];

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-action-500 text-center">
              Taxa de retenção
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-x-auto">
                <LineChart
                  style={{width: "100%", height: '300px', minWidth: '400px'}}
                  data={retentionData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                  />
                  <YAxis 
                    domain={[0, 100]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="#0891b2"
                    strokeWidth={2}
                    dot={{ fill: "#0891b2", r: 4 }}
                    label={({ x, y, value }) => (
                      <text x={x} y={y - 10} fill="#0891b2" fontSize={12} fontWeight="600" textAnchor="middle">
                        {value}%
                      </text>
                    )}
                  />
                </LineChart>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-action-500 text-center">
              Taxa de alunos em projeto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-x-auto">
              <LineChart
                style={{width: "100%", height: '300px', minWidth: '400px'}}
                data={projectData}
                margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                />
                <YAxis 
                  domain={[0, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#0891b2"
                  strokeWidth={2}
                  dot={{ fill: "#0891b2", r: 4 }}
                  label={({ x, y, value }) => (
                    <text x={x} y={y - 10} fill="#0891b2" fontSize={12} fontWeight="600" textAnchor="middle">
                      {value}%
                    </text>
                  )}
                />
              </LineChart>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-action-500 text-center">
              Alunos
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div>
              <span className="text-6xl font-bold text-action-950">
                {studentsData.reduce((acc, curr) => acc + curr.value, 0)}
              </span>
            </div>
            
            <div className="w-full h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart >
                  <Pie
                    activeShape={renderActiveShape}
                    data={studentsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                  >
                    {studentsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 w-full mt-4">
              {studentsData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div
                    className="w-3 h-3 rounded-sm shrink-0"
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className={`text-gray-700 truncate ${index === activeIndex ? "font-bold" : ""}`}>
                    {entry.name} ({entry.value})
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}