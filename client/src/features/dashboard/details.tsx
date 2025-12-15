"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  LineChart,
  Line,
  LabelList,
} from "recharts";
import { Users, GraduationCap } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/shared/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";


type TurmaData = {
  reprovacoes: { name: string; value: number }[];
  iraPizza: { name: string; value: number; color: string }[];
  horasPizza: { name: string; value: number; color: string }[];
  iraLinha: { name: string; value: number }[];
  iraBarraLateral: { name: string; value: number }[];
  stats: {
    mediaGeral: number;
    totalAlunos: number;
    evasoes: number;
    homens: number;
    mulheres: number;
  };
};

const DATABASE: Record<string, TurmaData> = {
  "turma-1": {
    reprovacoes: [
      { name: "JUL", value: 93 },
      { name: "AGO", value: 89 },
      { name: "SET", value: 93 },
      { name: "OUT", value: 96 },
    ],
    iraPizza: [
      { name: "Excelente", value: 11, color: "#0ea5e9" },
      { name: "Bom", value: 7, color: "#1e3a8a" },
      { name: "Mediano", value: 5, color: "#64748b" },
      { name: "Ruim", value: 3, color: "#0f172a" },
    ],
    horasPizza: [
      { name: "Completo", value: 30, color: "#1e3a8a" },
      { name: "Incompleto", value: 24, color: "#06b6d4" },
    ],
    iraLinha: [
      { name: "Mai", value: 72 },
      { name: "Jun", value: 77 },
      { name: "Jul", value: 80 },
      { name: "Ago", value: 88 },
      { name: "Set", value: 91 },
    ],
    iraBarraLateral: [
      { name: "2024.1", value: 7.8 },
      { name: "2024.4", value: 9.3 },
      { name: "2025.1", value: 9.1 },
      { name: "Set", value: 9.3 },
      { name: "Out", value: 9.6 },
    ],
    stats: {
      mediaGeral: 8.2,
      totalAlunos: 54,
      evasoes: 4,
      homens: 24,
      mulheres: 30
    }
  },
  "turma-2": {
    reprovacoes: [
      { name: "JUL", value: 60 },
      { name: "AGO", value: 65 },
      { name: "SET", value: 70 },
      { name: "OUT", value: 75 },
    ],
    iraPizza: [
      { name: "Excelente", value: 5, color: "#0ea5e9" },
      { name: "Bom", value: 10, color: "#1e3a8a" },
      { name: "Mediano", value: 15, color: "#64748b" },
      { name: "Ruim", value: 10, color: "#0f172a" },
    ],
    horasPizza: [
      { name: "Completo", value: 10, color: "#1e3a8a" },
      { name: "Incompleto", value: 30, color: "#06b6d4" },
    ],
    iraLinha: [
      { name: "Mai", value: 60 },
      { name: "Jun", value: 62 },
      { name: "Jul", value: 65 },
      { name: "Ago", value: 68 },
      { name: "Set", value: 70 },
    ],
    iraBarraLateral: [
      { name: "2024.1", value: 6.5 },
      { name: "2024.4", value: 7.0 },
      { name: "2025.1", value: 7.2 },
      { name: "Set", value: 7.4 },
      { name: "Out", value: 7.5 },
    ],
    stats: {
      mediaGeral: 7.1,
      totalAlunos: 40,
      evasoes: 8,
      homens: 20,
      mulheres: 20
    }
  }
};

export default function DashboardDetails() {
  const [selectedTurma, setSelectedTurma] = useState<string>("turma-1");

  const data = DATABASE[selectedTurma];

  return (
    <div className="min-h-screen font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-2 px-4">
          <span className="text-sm font-medium text-slate-600">Visualizar dados de:</span>
          <Select value={selectedTurma} onValueChange={setSelectedTurma}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Selecione a turma" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="turma-1">Turma 1</SelectItem>
              <SelectItem value="turma-2">Turma 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <Card className="border-slate-100 shadow-sm">
            <CardHeader className="pb-2">
               <div className="flex items-center justify-between">
                 <CardTitle className="text-xl text-[#1e3a8a]">Indicadores de Desempenho</CardTitle>
               </div>
               <CardDescription>Acompanhamento mensal de aprovações e reprovações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 mt-4">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <h3 className="text-center font-semibold text-sm mb-4 text-[#1e3a8a] uppercase">Taxa de Frequência</h3>
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.reprovacoes} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} domain={[0, 100]} />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                          {data.reprovacoes.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 3 ? "#0ea5e9" : "#dbeafe"} />
                          ))}
                          <LabelList dataKey="value" position="top" style={{ fill: '#334155', fontSize: '12px', fontWeight: 'bold' }} />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <h3 className="text-center font-semibold text-sm mb-4 text-[#1e3a8a] uppercase">Taxa de Aprovação</h3>
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.reprovacoes} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} domain={[0, 100]} />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                          {data.reprovacoes.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 3 ? "#1e3a8a" : "#cbd5e1"} />
                          ))}
                          <LabelList dataKey="value" position="top" style={{ fill: '#334155', fontSize: '12px', fontWeight: 'bold' }} />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col items-center bg-white">
                  <h3 className="text-[#1e3a8a] font-semibold mb-2 text-sm">Distribuição de IRA</h3>
                  <div className="flex items-center w-full justify-center gap-4">
                    <div className="w-[140px] h-[140px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={data.iraPizza} dataKey="value" cx="50%" cy="50%" outerRadius={60} stroke="none">
                            {data.iraPizza.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="text-xs space-y-1 text-slate-600">
                      {data.iraPizza.map((item) => (
                        <div key={item.name} className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                          <span>{item.name}: {item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col items-center bg-white">
                  <h3 className="text-[#1e3a8a] font-semibold mb-2 text-sm">Horas Extensivas</h3>
                  <div className="flex items-center w-full justify-center gap-4">
                    <div className="w-[140px] h-[140px] relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={data.horasPizza} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={60} stroke="none">
                            {data.horasPizza.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="text-xs space-y-2 text-slate-600">
                      {data.horasPizza.map((item) => (
                        <div key={item.name} className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                          <span>{item.name} {item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-slate-100 rounded-xl p-6 shadow-sm bg-white">
                <h3 className="text-[#1e3a8a] font-semibold mb-4 text-center text-sm">Evolução do IRA (Semestral)</h3>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.iraLinha} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#e2e8f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} padding={{ left: 20, right: 20 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#0ea5e9" 
                        strokeWidth={2} 
                        dot={{ fill: "#0ea5e9", r: 4 }} 
                        activeDot={{ r: 8 }}
                      >
                        <LabelList dataKey="value" position="bottom" offset={10} style={{ fill: '#0ea5e9', fontSize: '12px', fontWeight: 'bold' }} />
                      </Line>
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <Card className="h-fit">
            <CardHeader className="pb-2">
              <CardTitle className="text-center text-[#1e3a8a] text-lg">Histórico de IRA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.iraBarraLateral} margin={{ top: 20, right: 0, left: -20, bottom: 0 }} barCategoryGap={5}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} interval={0} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} domain={[0, 10]} hide />
                    <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                      {data.iraBarraLateral.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === data.iraBarraLateral.length - 1 ? "#0ea5e9" : "#dbeafe"} />
                      ))}
                      <LabelList 
                          dataKey="value" 
                          position="top" 
                          style={{ fill: '#334155', fontSize: '10px', fontWeight: 'bold' }} 
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="flex flex-col items-center justify-center py-6">
               <span className="text-xs font-semibold text-[#1e3a8a] mb-2 uppercase">Média Geral</span>
               <span className="text-4xl font-bold text-[#1e3a8a]">{data.stats.mediaGeral}</span>
            </Card>
            <Card className="flex flex-col items-center justify-center py-6">
               <span className="text-xs font-semibold text-[#1e3a8a] mb-2 uppercase">Total Alunos</span>
               <span className="text-4xl font-bold text-[#1e3a8a]">{data.stats.totalAlunos}</span>
            </Card>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="p-4">
                <div className="text-center mb-2">
                    <span className="block text-xs font-semibold text-[#1e3a8a] uppercase">Evasão</span>
                    <span className="block text-3xl font-bold text-red-500">{data.stats.evasoes}</span>
                </div>
                <div className="text-[10px] text-slate-500 space-y-1 mb-2">
                    <div className="flex justify-between"><span>Transferência</span> <span>{Math.floor(data.stats.evasoes / 2)}</span></div>
                    <div className="flex justify-between"><span>Desistência</span> <span>{Math.ceil(data.stats.evasoes / 2)}</span></div>
                </div>
            </Card>

            <Card className="p-4">
                <div className="text-center mb-2">
                    <span className="block text-xs font-semibold text-[#1e3a8a] uppercase">Gênero</span>
                    <div className="flex justify-center gap-2 mt-1">
                      <Users className="w-5 h-5 text-slate-400" />
                    </div>
                </div>
                <div className="text-[10px] text-slate-500 space-y-1 mb-2">
                    <div className="flex justify-between"><span>Mulheres</span> <span className="font-bold">{data.stats.mulheres}</span></div>
                    <div className="flex justify-between"><span>Homens</span> <span className="font-bold">{data.stats.homens}</span></div>
                </div>
            </Card>

             <Card className="p-4">
                <div className="text-center mb-2">
                    <span className="block text-xs font-semibold text-[#1e3a8a] uppercase">Concluintes</span>
                    <div className="flex justify-center gap-2 mt-1">
                      <GraduationCap className="w-5 h-5 text-slate-400" />
                    </div>
                </div>
                <div className="text-[10px] text-slate-500 space-y-1 mb-2">
                    <div className="flex justify-between"><span>2024.1</span> <span>8</span></div>
                    <div className="flex justify-between"><span>2024.2</span> <span>5</span></div>
                </div>
            </Card>

            {/* Pendências (Mock) */}
             <Card className="p-4">
                <div className="text-center mb-2">
                    <span className="block text-xs font-semibold text-[#1e3a8a] uppercase">Pendências</span>
                    <span className="block text-3xl font-bold text-amber-500">3</span>
                </div>
                <div className="text-[10px] text-slate-500 space-y-1 mb-2">
                    <div className="flex justify-between"><span>Docs</span> <span>2</span></div>
                    <div className="flex justify-between"><span>Financeiro</span> <span>1</span></div>
                </div>
            </Card>

          </div>

        </div>
      </div>
    </div>
  );
}