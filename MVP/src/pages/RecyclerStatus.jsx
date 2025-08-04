import { useCallback, useEffect, useState } from "react"
import { MapRoute } from "../components/MapRoute"
import { Laptop, Smartphone } from "lucide-react"

const dummyRecyclerLocation = [77.5806, 12.9352]
const dummyUserLocation = [77.5946, 12.9716]

export const RecyclerStatus = ({ onBack, onLogout, isDark }) => {
  const [eta, setEta] = useState(18)
  const [isNavigating, setIsNavigating] = useState(false)
  const [collectionStatus, setCollectionStatus] = useState("en-route")

  const intervalCalculation = useCallback(()=>{
    const interval = setInterval(() => {
      setEta((prev) => Math.max(prev - 1, 0))
    }, 60000)
    return () => clearInterval(interval)
  },[])

  useEffect(() => {
    intervalCalculation()
  }, [intervalCalculation])

  const handleNavigation = () => {
    setIsNavigating(true)
    setTimeout(() => setIsNavigating(false), 2000)
  }

  const handleMarkCollected = () => {
    setCollectionStatus("collected")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 ml-16">
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">Collection Route</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Navigate to pickup location and complete the e-waste collection
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden mb-8">
            <div
              className={`p-6 ${
                collectionStatus === "collected"
                  ? "bg-gradient-to-r from-green-500 to-emerald-500"
                  : "bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-600 dark:to-indigo-600"
              }`}
            >
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center">
                  <div className="bg-white/20 rounded-full p-3 mr-4">
                    {collectionStatus === "collected" ? (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">
                      {collectionStatus === "collected" ? "Collection Completed!" : "Active Collection"}
                    </h2>
                    <p className="text-blue-100 text-lg">
                      {collectionStatus === "collected"
                        ? "Successfully collected e-waste"
                        : "En route to pickup location"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{eta} min</div>
                  <div className="text-blue-100">ETA</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 p-4">
              <h3 className="text-white font-semibold text-lg flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
                Navigation Route
              </h3>
            </div>
            <div className="h-80 overflow-hidden">
              <MapRoute userLocation={dummyRecyclerLocation} recyclerLocation={dummyUserLocation} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-5 border border-blue-100 dark:border-blue-800 shadow-sm">
              <h3 className="font-semibold text-blue-800 dark:text-blue-400 mb-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                Estimated Time
              </h3>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">15-20 min</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Current traffic conditions</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-5 border border-green-100 dark:border-green-800 shadow-sm">
              <h3 className="font-semibold text-green-800 dark:text-green-400 mb-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                    clipRule="evenodd"
                  />
                </svg>
                Collection Value
              </h3>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">₹420</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Estimated payout</p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-5 border border-amber-100 dark:border-amber-800 shadow-sm">
              <h3 className="font-semibold text-amber-800 dark:text-amber-400 mb-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                Items to Collect
              </h3>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">3 devices</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Smartphone, Laptop, Tablet</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Collection Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
                <h4 className="font-semibold text-blue-800 dark:text-blue-400 mb-3 flex items-center">
                  <Smartphone className="w-5 h-5 mr-2" /> Smartphone
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Brand: Apple iPhone 12</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Condition: Good</p>
                <p className="text-lg font-bold text-blue-700 dark:text-blue-400">₹180</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 border border-green-100 dark:border-green-800">
                <h4 className="font-semibold text-green-800 dark:text-green-400 mb-3 flex items-center">
                  <Laptop className="w-5 h-5 mr-2" /> Laptop
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Brand: Dell Inspiron</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Condition: Fair</p>
                <p className="text-lg font-bold text-green-700 dark:text-green-400">₹190</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border border-purple-100 dark:border-purple-800">
                <h4 className="font-semibold text-purple-800 dark:text-purple-400 mb-3 flex items-center">
                  <Smartphone className="w-5 h-5 mr-2" /> Tablet
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Brand: Samsung Galaxy</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Condition: Good</p>
                <p className="text-lg font-bold text-purple-700 dark:text-purple-400">₹50</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Customer Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="bg-indigo-100 dark:bg-indigo-900/50 rounded-full p-2 mr-3">
                    <svg
                      className="w-4 h-4 text-indigo-600 dark:text-indigo-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Customer Name</p>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">Rajesh Kumar</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="bg-green-100 dark:bg-green-900/50 rounded-full p-2 mr-3">
                    <svg
                      className="w-4 h-4 text-green-600 dark:text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Phone Number</p>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">+91 98765 43210</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="bg-blue-100 dark:bg-blue-900/50 rounded-full p-2 mr-3 mt-1">
                    <svg
                      className="w-4 h-4 text-blue-600 dark:text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Address</p>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      123 MG Road, Bangalore, Karnataka 560001
                    </p>
                  </div>
                </div>
                <div className="flex items-start p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                  <div className="bg-amber-100 dark:bg-amber-900/50 rounded-full p-2 mr-3 mt-1">
                    <svg
                      className="w-4 h-4 text-amber-600 dark:text-amber-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-amber-700 dark:text-amber-400 font-medium">Special Instructions</p>
                    <p className="text-sm text-amber-800 dark:text-amber-300">
                      Ring bell twice, ask for Rajesh. Items are in the garage.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={handleNavigation}
              disabled={isNavigating}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              {isNavigating ? "Opening Maps..." : "Navigate Now"}
            </button>
            <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Call Customer
            </button>
            <button
              onClick={handleMarkCollected}
              disabled={collectionStatus === "collected"}
              className={`${
                collectionStatus === "collected"
                  ? "bg-gray-400"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              } text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {collectionStatus === "collected" ? "Collection Completed" : "Mark as Collected"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
