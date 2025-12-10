"use client";

import React from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import DashboardOverview from "@/features/dashboard/overview";

export default function DashboardPage() {
  const iraPerPeriodoData = [
    { periodo: 1, ira: 9.2 },
    { periodo: 2, ira: 7.8 },
    { periodo: 3, ira: 8.58 },
    { periodo: 4, ira: 8.2 },
    { periodo: 5, ira: 8.9 },
    { periodo: 6, ira: 9.3 },
    { periodo: 7, ira: 8.7 },
    { periodo: 8, ira: 9.0 },
    { periodo: 9, ira: 8.0 }
  ];

  const studentsData = [
    { name: "50 Homens", value: 50, color: "#0891b2" },
    { name: "67 Mulheres", value: 67, color: "#1e40af" },
    { name: "3 Não Binários", value: 3, color: "#0c4a6e" },
  ];

  return (
    <div className="min-h-screen font-sans p-4">
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Visão geral */}
          <Card className="rounded-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-blue-900">Visão geral</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col lg:flex-row justify-between gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle className="text-md text-action-500 font-medium text-center">Taxa de evasão</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-5xl font-medium text-action-500">5%</span>
                      <TrendingDown className="size-5 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-md text-action-500 font-medium text-center">Alunos em projeto</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <span className="text-5xl font-medium text-action-500">100</span>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-md text-action-500 font-medium text-center">Evasões</CardTitle>
                  </CardHeader>
                  <CardContent className="flex gap-4 justify-center items-center">
                    <span className="text-5xl font-medium text-action-500">13</span>
                    <div className="text-xs text-neutral-500 space-y-0.5">
                      <div>8 - 2025.1</div>
                      <div>5 - 2025.2</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-none shadow-none w-full lg:w-auto">
                <CardHeader>
                  <CardTitle className="text-md text-action-500 font-medium text-center">Alunos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                    <div>
                      <PieChart width={160} height={160}>
                        <Pie
                          data={studentsData}
                          cx={80}
                          cy={80}
                          innerRadius={50}
                          outerRadius={70}
                          paddingAngle={2}
                          dataKey="value"
                          stroke="none"
                        >
                          {studentsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </div>
                    <div className="space-y-3">
                      <span className="text-5xl font-medium text-action-950">120</span>
                      <div className="space-y-1.5">
                        {studentsData.map((entry, index) => (
                          <div key={index} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: entry.color }}
                              ></div>
                              <span className="text-gray-700">{entry.name}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Detalhes acadêmicos */}
          <Card className="rounded-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-blue-900">Detalhes acadêmicos</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col lg:flex-row justify-between gap-6">
              <Card className="border-none shadow-none w-full lg:w-md">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold text-gray-900 text-center">IRA do aluno por período</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full overflow-x-auto">
                    <ResponsiveContainer width="100%" height={250} minWidth={300}>
                      <LineChart
                        data={iraPerPeriodoData}
                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                          dataKey="periodo" 
                          tick={{ fontSize: 11 }}
                          label={{ value: 'Período', position: 'insideBottom', offset: -5, fontSize: 11 }}
                        />
                        <YAxis 
                          domain={[7, 10]} 
                          tick={{ fontSize: 11 }}
                          label={{ value: 'IRA', angle: -90, position: 'insideLeft', fontSize: 11 }}
                        />
                        <Tooltip />
                        <Line
                          dataKey="ira"
                          stroke="#1e40af"
                          strokeWidth={2}
                          dot={{ fill: "#1e40af", r: 3 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle className="text-md text-action-500 font-medium text-center">Taxa de reprovações</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-5xl font-medium text-action-500">4%</span>
                      <TrendingUp className="size-5 text-red-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-md text-action-500 font-medium text-center">Média IRA</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <span className="text-5xl font-medium text-action-500">8.4</span>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-md text-action-500 font-medium text-center">Taxa de aprovações</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-5xl font-medium text-action-500">91%</span>
                      <TrendingUp className="size-5 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visao-geral">
          <DashboardOverview />
        </TabsContent>
      </Tabs>
    </div>
  );
}