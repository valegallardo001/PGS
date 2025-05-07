"use client";
// components/TraitChart.js
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const colors = ["#8e44ad", "#2980b9", "#2ecc71", "#e74c3c", "#f1c40f", "#d35400"];

export default function TraitChart({ data }) {
  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={70}
        outerRadius={100}
        fill="#8884d8"
        paddingAngle={3}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}
