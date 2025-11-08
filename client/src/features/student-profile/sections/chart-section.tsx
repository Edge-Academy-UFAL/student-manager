import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

const iraPerPeriod = [
  { period: 1, ira: 9.0 },
  { period: 2, ira: 7.3 },
  { period: 3, ira: 8.56 },
  { period: 4, ira: 8.1 },
  { period: 5, ira: 8.8 },
  { period: 6, ira: 9.0 },
  { period: 7, ira: 8.5 },
  { period: 8, ira: 8.6 },
  { period: 9, ira: 7.8 },
];

const iraCumulative = [
  { period: 1, ira: 9.0 },
  { period: 2, ira: 8.2 },
  { period: 3, ira: 8.15 },
  { period: 4, ira: 8.2 },
  { period: 5, ira: 8.5 },
  { period: 6, ira: 8.75 },
  { period: 7, ira: 8.85 },
  { period: 8, ira: 8.9 },
  { period: 9, ira: 8.85 },
];

export function ChartSection({ studentInfo }: { studentInfo?: any }) {
  return (
    <div className="bg-white rounded-md shadow-sm py-3 px-4">
      <h2 className="text-heading-xs text-action-500 mb-6">Histórico do Rendimento acadêmico</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* IRA por período */}
        <div className="border rounded-md p-6">
          <h3 className="text-center text-sm font-semibold text-gray-700 mb-4">
            IRA do aluno por período
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={iraPerPeriod}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="period"
                label={{ value: 'Período', position: 'insideBottom', offset: -5 }}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                domain={[6.5, 10]}
                label={{ value: 'IRA', angle: -90, position: 'insideLeft' }}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
                formatter={(value: any) => [value.toFixed(2), 'IRA']}
              />
              <ReferenceLine
                y={8.56}
                stroke="#6366f1"
                strokeDasharray="3 3"
                label={{
                  value: '8,56',
                  position: 'top',
                  fill: '#6366f1',
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="ira"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* IRA acumulado */}
        <div className="border rounded-md p-6">
          <h3 className="text-center text-sm font-semibold text-gray-700 mb-4">
            IRA acumulado por período
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={iraCumulative}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="period"
                label={{ value: 'Período', position: 'insideBottom', offset: -5 }}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                domain={[7.5, 10]}
                label={{ value: 'IRA', angle: -90, position: 'insideLeft' }}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
                formatter={(value: any) => [value.toFixed(2), 'IRA']}
              />
              <Line
                type="monotone"
                dataKey="ira"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ fill: '#ef4444', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}