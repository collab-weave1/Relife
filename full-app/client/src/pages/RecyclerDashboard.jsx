import { Calendar, Clipboard, Clock, DollarSign, Laptop, MapPin, Settings, Smartphone, Truck, Tv, Lock, Battery, Lightbulb, Link2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetchRecyclerData } from "../api"

export const RecyclerDashboard = () => {
  const onNavigate = useNavigate()

  const [requests, setRequests] = useState(
    [
    //   {
    //     id: 1,
    //     device: "Smart TV",
    //     brand: "Samsung",
    //     status: "Waiting",
    //     submittedDate: "2024-06-15",
    //     value: 2800,
    //     location: "Koramangala",
    //   },
    //   {
    //     id: 2,
    //     device: "Laptop",
    //     brand: "Dell",
    //     status: "In Progress",
    //     submittedDate: "2024-06-18",
    //     value: 3200,
    //     location: "Whitefield",
    //   },
    //   {
    //     id: 3,
    //     device: "iPhone",
    //     brand: "Apple",
    //     status: "Completed",
    //     submittedDate: "2024-06-20",
    //     value: 1500,
    //     location: "Indiranagar",
    //   },
    //   {
    //     id: 4,
    //     device: "Tablet",
    //     brand: "iPad",
    //     status: "Waiting",
    //     submittedDate: "2024-06-22",
    //     value: 1800,
    //     location: "HSR Layout",
    //   },
    ]
  )


  const getRecyclerData = async () => {
    try {
      const res = await fetchRecyclerData()
      setRequests(res.message);
    } catch (err) {
      setRequests([])
      console.error("Error fetching recycler data", err);
    } 
    // finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    getRecyclerData()
  }, []);

  const handleClick = (request) => {
    if (request.status !== "Completed") {
      onNavigate("/recycler-status")
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Waiting":
        return "bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg"
      case "In Progress":
        return "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
      case "Completed":
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
    }
  }

  const getButtonStyle = (status) => {
    const baseStyle = "w-full text-left transition-all duration-300 transform group hover:scale-[1.02]"

    switch (status) {
      case "Waiting":
        return `${baseStyle} hover:shadow-xl cursor-pointer bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 hover:from-yellow-100 hover:to-orange-100 dark:hover:from-yellow-900/30 dark:hover:to-orange-900/30 border-l-4 border-yellow-400`
      case "In Progress":
        return `${baseStyle} hover:shadow-xl cursor-pointer bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 border-l-4 border-blue-500`
      case "Completed":
        return `${baseStyle} hover:shadow-md cursor-pointer bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 border-l-4 border-green-500`
      default:
        return `${baseStyle} hover:shadow-lg cursor-pointer`
    }
  }

  const getDeviceIcon = (device) => {
    switch (device.toLowerCase()) {
      case "smart tv":
        return <Tv className="w-5 h-5 mr-2" />
      case "laptop":
        return <Laptop className="w-5 h-5 mr-2" />
      case "iphone":
        return <Smartphone className="w-5 h-5 mr-2" />
      case "tablet":
        return <Smartphone className="w-5 h-5 mr-2" />
      default:
        return <Settings className="w-5 h-5 mr-2" />
    }
  }

  const totalValue = requests.reduce((sum, req) => sum + req.value, 0)
  const completedValue = requests.filter((r) => r.status === "Completed").reduce((sum, req) => sum + req.value, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 ml-16">

      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="bg-gray-100 dark:bg-gray-900 py-8"></div>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">♻️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Recycler Dashboard</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage your e-waste collection requests</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700 dark:text-green-400">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Requests</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{requests.length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl ml-2">
                  <Clipboard className="w-5 h-5 mr-2" />
                </span>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">Updated just now</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Pickup</p>
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                  {requests.filter((r) => r.status === "Waiting").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                <span className="text-white text-xl ml-2">
                  <Clock className="w-5 h-5 mr-2" />
                </span>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">Requires attention</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {requests.filter((r) => r.status === "In Progress").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl ml-2">
                  <Truck className="w-5 h-5 mr-2" />
                </span>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">On the way</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Value</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">₹{totalValue.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl ml-2">
                  <DollarSign className="w-5 h-5 mr-2" />
                </span>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Earned: ₹{completedValue.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <section className="bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 dark:from-yellow-900/20 dark:via-amber-900/20 dark:to-orange-900/20 rounded-2xl p-8 mb-8 shadow-lg border border-yellow-200 dark:border-yellow-800/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-300/20 to-orange-300/20 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-300/20 to-yellow-300/20 rounded-full -ml-12 -mb-12"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h2 id="recycler-did-you-know" className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mr-3">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                Pro Recycler Tips
              </h2>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-lg">
              Maximize your earnings and efficiency with these proven strategies:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-5 backdrop-blur-sm border border-yellow-200/50 dark:border-yellow-700/50 hover:shadow-md transition-all duration-300">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Battery className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Battery Safety First</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Removing batteries before processing boosts yields
                      <sup>
                        <a
                          href="https://getenviropass.com/recycling-electronic-equipment/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs align-super ml-0.5 underline"
                        ><Link2 className="w-3 h-3 inline" /></a>
                      </sup> and halves fire Risk
                      <sup>
                        <a
                          href="https://www.call2recycle.org/california-campaign-release/?srsltid=AfmBOorblTsLFlfzEm8VKPdN7E-srupPKYUeutss3ntgsLs4Ulof-bqO"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs align-super ml-0.5 underline"
                        ><Link2 className="w-3 h-3 inline" /></a>
                      </sup>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-5 backdrop-blur-sm border border-yellow-200/50 dark:border-yellow-700/50 hover:shadow-md transition-all duration-300">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Data Security Check</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Integrate data-wipe checks at intake to protect customers and speeds up your processing time
                      <sup>
                        <a
                          href="https://www.ecsenvironment.com/process/#:~:text=e%2DWaste%20management%20process%20includes%20the%20following:&text=Data%20Sanitization:%20ensuring%20that%20data,to%20build%20new%20electronic%20products."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs align-super ml-0.5 underline"
                        ><Link2 className="w-3 h-3 inline mr-1" /></a>
                      </sup>
                      by avoiding re-sorts.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-5 backdrop-blur-sm border border-yellow-200/50 dark:border-yellow-700/50 hover:shadow-md transition-all duration-300">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Smart Route Planning</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Grouping nearby pickups and confirming GPS off-peak to save fuel
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-5 backdrop-blur-sm border border-yellow-200/50 dark:border-yellow-700/50 hover:shadow-md transition-all duration-300">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Peak Hour Avoidance</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Scheduling most collections between 10 AM - 4 PM can cut delays and make +40%
                      <sup>
                        <a
                          href="https://www.mckinsey.com/~/media/mckinsey/industries/travel%20logistics%20and%20infrastructure/our%20insights/technology%20delivered%20implications%20for%20cost%20customers%20and%20competition%20in%20the%20last%20mile%20ecosystem/fast-forwarding-last-mile-delivery-implications-for-the-ecosystem.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs align-super ml-0.5 underline"
                        ><Link2 className="w-3 h-3 inline mr-1" /></a>
                      </sup>
                      more pickups
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 dark:from-green-400/10 dark:to-emerald-400/10 rounded-lg p-4 border border-green-200/50 dark:border-green-700/50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-700 dark:text-green-400">Earnings Boost</p>
                  <p className="text-xs text-green-600 dark:text-green-500">
                    Following these tips can increase your monthly earnings by 25-40% while reducing operational costs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-b border-gray-200 dark:border-gray-600">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Collection Requests</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Click on any request to view details and start collection
            </p>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {requests.map((request) => (
                <button
                  key={request.id}
                  className={getButtonStyle(request.status)}
                  onClick={() => handleClick(request)}
                >
                  <div className="flex items-center justify-between p-6 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl text-gray-600 dark:text-gray-400">{getDeviceIcon(request.device)}</div>
                      <div className="text-left">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 group-hover:text-gray-800 dark:group-hover:text-gray-200">
                          {request.device} - {request.brand}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <p className="flex justify-center text-sm text-gray-600 dark:text-gray-400">
                            <MapPin className="w-5 h-5 mr-2" /> {request.location}
                          </p>
                          <p className="flex justify-center text-sm text-gray-600 dark:text-gray-400">
                            <Calendar className="w-5 h-5 mr-2" /> {new Date(request.submittedDate).toLocaleDateString()}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-green-600 dark:text-green-400 mt-1">
                          Value: ₹{request.value.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(request.status)}`}
                      >
                        {request.status}
                      </span>
                      {request.status !== "Completed" && (
                        <div className="text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">Ready to collect more e-waste?</h3>
              <p className="text-blue-100 dark:text-blue-200 mt-2">Help the environment while earning money</p>
            </div>
            <button className="bg-white dark:bg-gray-100 text-blue-600 dark:text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-200 transition-colors">
              View Map
            </button>
          </div>
        </div>

        <div className="mt-12 max-w-7xl mx-auto px-6 text-center">
          <button
            onClick={() => onNavigate('/donate')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-3 rounded-full transition shadow-lg"
          >
            Donate to NGOs
          </button>
        </div>

      </div>
    </div>
  )
}
