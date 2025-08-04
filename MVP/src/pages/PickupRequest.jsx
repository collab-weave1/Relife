import { useEffect, useState } from "react"
import Tesseract from "tesseract.js"
import * as mobilenet from '@tensorflow-models/mobilenet'
import * as tf from "@tensorflow/tfjs"  
import '@tensorflow/tfjs-backend-webgl'

export const PickupRequest = ({ onLogout, onBack, onNavigate, isDark }) => {
  const [formData, setFormData] = useState({
    device: "",
    brand: "",
    location: "",
    preferredTime: "",
  })

  const [imageFile, setImageFile] = useState(null);
  const [barcodeFile, setBarcodeFile] = useState(null);
  const [classification, setClassification] = useState("");
  const [ocrText, setOcrText] = useState("");
  const [model, setModel] = useState(null)

  useEffect(() => {
    (async () => {
      await tf.setBackend("webgl")
      await tf.ready()

      const m = await mobilenet.load()
      setModel(m)
    })()
  }, [])

  useEffect(() => {
    if (!barcodeFile) return;

    Tesseract.recognize(barcodeFile, "eng")
      .then(({ data: { text } }) => setOcrText(text.trim()))
      .catch(console.error);

  }, [barcodeFile]);

  useEffect(() => {
    if (!imageFile || !model)
      return
    const img = new Image()
    img.src = URL.createObjectURL(imageFile)

    img.onload = async () => {
      const predictions = await model.classify(img)
      setClassification(predictions[0]?.className || '')
    }
  }, [imageFile, model])

  useEffect(() => {
    if (!classification) 
      return;

    let deviceType = "";

    if(classification.includes("cellular") || classification.includes("telephone") || classification.includes("phone")
      || classification.includes("cellphone") || classification.includes("cell") || classification.includes("mobile") )
      deviceType = "Smartphone"
    
    else if(classification.includes("notebook") )
      deviceType = "Laptop"

    else if(classification.includes("desktop") )
      deviceType = "Desktop Computer"
    
    else if(classification.includes("desktop") )
      deviceType = "Desktop Computer"
        
    else if(classification.includes("television") )
      deviceType = "TV"

    else if(classification.includes("printer") )
      deviceType = "Printer"

    if (deviceType) {
      setFormData(fd => ({ ...fd, device: deviceType }));
    }
  }, [classification]);

  const handleFile = e => {
    setImageFile(e.target.files[0]);
  }

  const handleBarcode = e => setBarcodeFile(e.target.files[0]);

  const handleSubmit = () => {
    if (formData.device && formData.brand && formData.location && formData.preferredTime) {
      onNavigate("pickup-route")
    } else {
      alert("Please fill in all fields")
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const deviceTypes = ["Smartphone", "Laptop", "Battery", "Desktop Computer", "Tablet", "TV", "Printer", "Gaming Console", "Other"]
  const popularBrands = ["Apple", "Samsung", "Dell", "HP", "Sony", "LG", "Lenovo", "Asus", "Exide", "Amaron", "Eveready", "Other"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">Schedule E-Waste Pickup</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Turn your electronic waste into environmental impact. Get picked up within 24 hours.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6">
              <div className="flex items-center text-white">
                <div className="bg-white/20 rounded-full p-2 mr-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Secure & Certified</h3>
                  <p className="text-green-100 text-sm">Data wiping & eco-friendly disposal guaranteed</p>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-6">
              
            <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Device Image
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFile}
                    className="hidden"
                    id="device-image"
                  />
                  <label
                    htmlFor="device-image"
                    className="flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:border-green-400 dark:hover:border-green-400 cursor-pointer transition-all duration-200 bg-gray-50 dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-gray-600"
                  >
                    <div className="text-center">
                      <svg className="w-8 h-8 text-gray-400 mb-2 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload device image</p>
                    </div>
                  </label>
                </div>

                {imageFile && (
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={URL.createObjectURL(imageFile)} 
                        alt="Device preview"
                        className="w-24 h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {imageFile.name}
                        </p>
                        {classification && (
                          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Detected: {classification}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Device Type *
                </label>
                <div className="relative">
                  <select
                    name="device"
                    value={formData.device}
                    onChange={handleChange}
                    className="w-full text-gray-700 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 p-4 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 appearance-none"
                  >
                    <option value="">Select device type...</option>
                    {deviceTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Brand *</label>
                <div className="relative">
                  <select
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full text-gray-700 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 p-4 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 appearance-none"
                  >
                    <option value="">Select brand...</option>
                    {popularBrands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Pickup Location *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter your complete address"
                    className="w-full text-gray-700 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 p-4 pl-12 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Preferred Pickup Time *
                </label>
                <div className="relative">
                  <input
                    type="datetime-local"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    className="w-full text-gray-700 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 p-4 pl-12 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Device Barcode <span className="text-xs text-gray-500">(Optional)</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBarcode}
                    className="hidden"
                    id="device-barcode"
                  />
                  <label
                    htmlFor="device-barcode"
                    className="flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:border-green-400 dark:hover:border-green-400 cursor-pointer transition-all duration-200 bg-gray-50 dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-gray-600"
                  >
                    <div className="text-center">
                      <svg className="w-8 h-8 text-gray-400 mb-2 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload barcode image</p>
                    </div>
                  </label>
                </div>

                {barcodeFile && (
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={URL.createObjectURL(barcodeFile)} 
                        alt="Barcode preview"
                        className="w-24 h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {barcodeFile.name}
                        </p>
                        {ocrText && (
                          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Extracted Text:</p>
                            <p className="text-sm font-mono text-gray-900 dark:text-gray-100 break-all">
                              {ocrText}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Schedule Pickup Now
                </button>
              </div>

            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-6 text-center">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">24hrs</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Pickup Time</div>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Data Secure</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
