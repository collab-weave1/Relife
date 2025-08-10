import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowRight, BarChart3, Download, Package, Smartphone, Sprout, Users } from "lucide-react"
import { SectionHeading } from "../components/SectionHeading"
import { StatChart } from "../components/StatChart"
import { ExportButtons } from "../components/ExportButtons"
import { fetchAdminStats } from "../api"

export const AdminDashboard = ({ onLogout, isDark }) => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  const onNavigate = useNavigate()

  const setAdminStats = useCallback(() => {
    fetchAdminStats().then((stats) => {
      console.log(stats)
      setStats(stats.message)
      setLoading(false)
    })
  },[])

  useEffect(() => {
    setAdminStats()
  }, [setAdminStats])

  const reportData = stats
    ? [
      { metric: "Total E-Waste Collected", value: stats.totalWeight },
      { metric: "EPR Reports Logged", value: stats.totalBrands },
      { metric: "Registered Recyclers", value: stats.totalRecyclers },
      { metric: "User Engagement", value: stats.totalUsers },
      { metric: "CO₂ Saved", value: stats.totalCO2Saved },
      { metric: "Refurbished Devices Sold", value: stats.totalMarketplaceItems },
    ]
    : []

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200 dark:border-green-700 border-t-green-600 dark:border-t-green-400 mx-auto mb-6"></div>
          <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">Loading admin statistics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="bg-gray-100 dark:bg-gray-900 py-6"></div>
      <div className="p-8 pt-15 pl-6 ml-16">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <SectionHeading title="Admin Dashboard" subtitle="Overview & Reports" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <AdminCard
              title="Total E-Waste Collected"
              stat={stats.totalWeight}
              icon={<Package className="w-5 h-5 mr-2" />}
              color="bg-teal-600"
            />
            <AdminCard
              title="EPR Reports Logged"
              stat={stats.totalBrands}
              icon={<BarChart3 className="w-5 h-5 mr-2" />}
              color="bg-cyan-600"
            />
            <AdminCard title="Registered Recyclers" stat={stats.totalRecyclers} icon="♻️" color="bg-pink-600" />
            <AdminCard
              title="User Engagement"
              stat={stats.totalUsers}
              icon={<Users className="w-5 h-5 mr-2" />}
              color="bg-red-600"
            />
            <AdminCard
              title="CO₂ Saved"
              stat={stats.totalCO2Saved}
              icon={<Sprout className="w-5 h-5 mr-2" />}
              color="bg-emerald-600"
            />
            <AdminCard
              title="Refurbished Devices Sold"
              stat={stats.totalMarketplaceItems}
              icon={<Smartphone className="w-5 h-5 mr-2" />}
              color="bg-purple-600"
            />
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
            <StatChart />
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-500 rounded-full p-2">
                <span className="text-white text-xl">
                  <Download className="w-5 h-5" />
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Download Reports</h2>
            </div>
            <ExportButtons data={reportData} />
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate('/donate')}
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-full transition"
            >
              Support Our NGOs
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

const AdminCard = ({ title, stat, icon, color }) => (
  <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
    <div className={`${color} p-4 text-white`}>
      <div className="flex items-center justify-between">
        <span className="text-2xl">{icon}</span>
        <div className="bg-white/20 rounded-full p-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200">
        {title}
      </h3>
      <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{stat}</p>
    </div>
  </div>
)
