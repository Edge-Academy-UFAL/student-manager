"use client";

import React from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function DashboardPage() {
  const chartData = [
    { periodo: 1, ira: 9.2 },
    { periodo: 2, ira: 7.5 },
    { periodo: 3, ira: 8.56 },
    { periodo: 4, ira: 8.1 },
    { periodo: 5, ira: 8.8 },
    { periodo: 6, ira: 9.1 },
    { periodo: 7, ira: 8.9 },
    { periodo: 8, ira: 8.7 },
    { periodo: 9, ira: 7.8 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-blue-900 mb-4">Visão geral</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg border p-6">
            <div className="text-md text-center font-semibold font-sans text-action-500 mb-2">Taxa de Evasão</div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-4xl font-bold text-blue-900">5%</span>
              <TrendingDown className="w-6 h-6 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg border p-6">
            <div className="text-md text-center font-semibold font-sans text-action-500 mb-2">Evasões</div>
            <div className="text-4xl font-bold text-blue-900 mb-2">13</div>
            <div className="text-xs text-gray-500 space-y-0.5">
              <div>🎓 2025.1</div>
              <div>💰 2025.2</div>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-md text-center font-semibold font-sans text-action-500">Alunos</div>
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-center gap-8">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#1e40af"
                    strokeWidth="20"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#0891b2"
                    strokeWidth="20"
                    strokeDasharray="120 251.2"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs text-gray-500">48%</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-5xl font-bold text-blue-900">120</div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-900 rounded-md text-center font-semibold font-sans text-action-500"></div>
                    <span>50 Homens</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-cyan-600 rounded-md text-center font-semibold font-sans text-action-500"></div>
                    <span>185 Mulheres</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-blue-900 mb-4">Detalhes Acadêmicos</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-md font-sans text-action-500 font-medium text-center mb-4">IRA do aluno por período</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="periodo" 
                  label={{ value: "Período", position: "insideBottom", offset: -5 }}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  domain={[7, 10]}
                  label={{ value: "IRA", angle: -90, position: "insideLeft" }}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="ira" 
                  stroke="#1e40af" 
                  strokeWidth={2}
                  dot={{ fill: "#1e40af", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg border p-6">
              <div className="text-md text-center font-semibold font-sans text-action-500 mb-2">Taxa de Reprovações</div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-4xl font-bold text-blue-900">4%</span>
                <TrendingUp className="w-5 h-5 text-red-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg border p-6">
              <div className="text-md text-center font-semibold font-sans text-action-500 mb-2">Média IRA</div>
              <div className="text-4xl font-bold text-center text-blue-900">8.4</div>
            </div>

            <div className="bg-white rounded-lg border p-6">
              <div className="text-md text-center font-semibold font-sans text-action-500 mb-2">Taxa de Aprovações</div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-4xl font-bold text-blue-900">91%</span>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg border p-6">
              <div className="text-md text-center font-semibold font-sans text-action-500 mb-2">Evasões</div>
              <div className="text-4xl font-bold text-center text-blue-900">13</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}