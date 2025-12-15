"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";

import { CustomActivePieChart } from "@/shared/components/custom/active-pie-chart";

export default function DashboardOverview() {
  
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-action-500 text-center">
              Alunos
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <div className="w-[500px]">
              <CustomActivePieChart 
                data={studentsData} 
                unit="Alunos" 
                height={350} 
              />
            </div>

          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-action-500 text-center">
              Taxa de retenção
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-x-auto">
              <LineChart
                style={{width: "100%", height: '300px', minWidth: '400px'}}
                data={retentionData}
                margin={{ top: 30, right: 30, left: 0, bottom: 10 }}
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
                    <text x={x} y={typeof y === 'number' ? y - 10 : y} fill="#0891b2" fontSize={12} fontWeight="600" textAnchor="middle">
                      {value}%
                    </text>
                  )}
                />
              </LineChart>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-action-500 text-center">
              Taxa de alunos em projeto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-x-auto">
              <LineChart
                style={{width: "100%", height: '300px', minWidth: '400px'}}
                data={projectData}
                margin={{ top: 30, right: 30, left: 0, bottom: 10 }}
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
                    <text x={x} y={typeof y === 'number' ? y - 10 : y} fill="#0891b2" fontSize={12} fontWeight="600" textAnchor="middle">
                      {value}%
                    </text>
                  )}
                />
              </LineChart>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}