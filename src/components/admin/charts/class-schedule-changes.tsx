"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { day: "Seg", changes: 8 },
  { day: "Ter", changes: 5 },
  { day: "Qua", changes: 7 },
  { day: "Qui", changes: 3 },
  { day: "Sex", changes: 9 },
  { day: "Sáb", changes: 6 },
  { day: "Dom", changes: 0 },
]

export function ClassScheduleChanges() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Line type="monotone" dataKey="changes" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}

