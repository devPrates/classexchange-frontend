"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { campus: "Campus A", turmas: 64 },
  { campus: "Campus B", turmas: 58 },
  { campus: "Campus C", turmas: 45 },
  { campus: "Campus D", turmas: 39 },
  { campus: "Campus E", turmas: 30 },
  { campus: "Campus F", turmas: 20 },
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
