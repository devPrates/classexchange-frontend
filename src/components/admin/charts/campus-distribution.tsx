"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { campus: "Naviraí", turmas: 64 },
  { campus: "Dourados", turmas: 58 },
  { campus: "C. Grande", turmas: 45 },
  { campus: "N. Andradina", turmas: 39 },
  { campus: "Coxim", turmas: 30 },
  { campus: "T. Lagoas", turmas: 20 },
]

export function CampusDistribution() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="campus" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Bar dataKey="turmas" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
