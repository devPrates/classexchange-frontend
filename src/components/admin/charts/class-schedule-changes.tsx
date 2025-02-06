"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { day: "Seg", trocas: 8 },
  { day: "Ter", trocas: 5 },
  { day: "Qua", trocas: 7 },
  { day: "Qui", trocas: 3 },
  { day: "Sex", trocas: 9 },
  { day: "Sáb", trocas: 6 },
]

export function ClassScheduleChanges() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Line type="monotone" dataKey="trocas" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}

