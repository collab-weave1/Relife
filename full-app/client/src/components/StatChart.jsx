import { BarChart3 } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const sampleData = [
  { month: "Jan", devices: 120 },
  { month: "Feb", devices: 200 },
  { month: "Mar", devices: 150 },
  { month: "Apr", devices: 300 },
  { month: "May", devices: 280 },
  { month: "Jun", devices: 350 },
]

export const StatChart = ({ isDark }) => {
  return (
    <div className="shadow-lg rounded-lg p-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center">
        <BarChart3 className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
        Devices Processed Over Time
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={sampleData}>
          <XAxis
            dataKey="month"
            tick={{ fill: isDark ? "#9CA3AF" : "#374151" }}
            axisLine={{ stroke: isDark ? "#4B5563" : "#D1D5DB" }}
          />
          <YAxis
            tick={{ fill: isDark ? "#9CA3AF" : "#374151" }}
            axisLine={{ stroke: isDark ? "#4B5563" : "#D1D5DB" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
              border: `1px solid ${isDark ? "#374151" : "#E5E7EB"}`,
              borderRadius: "8px",
              color: isDark ? "#F9FAFB" : "#111827",
            }}
          />
          <Bar dataKey="devices" fill={isDark ? "#10B981" : "#4ade80"} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
