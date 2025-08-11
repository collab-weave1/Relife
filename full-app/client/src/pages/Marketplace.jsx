import { PlusCircle, ShoppingCart } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const initialProducts = [
  {
    id: 1,
    name: "Refurbished Phone",
    price: 3000,
    sellerType: "Recycler",
    condition: "Excellent",
    warranty: "6 months",
    imageUrl:
      "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1738252498-samsung-galaxy-z-fold-6-006-679ba0c7c43be.jpg?crop=1xw:1xh;center,top&resize=980:*",
  },
  {
    id: 2,
    name: "Recycled Laptop Parts",
    price: 1500,
    sellerType: "Recycler",
    condition: "Good",
    warranty: "3 months",
    imageUrl:
      "https://www.pcworld.com/wp-content/uploads/2025/04/Framework-Laptop-13-Core-Ultra-1-open-3.jpg?resize=1536%2C1157&quality=50&strip=all",
  },
  {
    id: 3,
    name: "Eco-friendly Smartwatch",
    price: 5000,
    sellerType: "Producer",
    condition: "New",
    warranty: "1 year",
    imageUrl:
      "https://www.parents.com/thmb/CjbD-yxpDiRfdG5Q3gTYCN2uvcE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/prt-gabb-watch-3e-justyna-rivera-5-b59af4bc9ca04e4f9555c36f3e15c4cd.jpeg",
  },
]

export const Marketplace = ({ role }) => {
  const [products, setProducts] = useState(initialProducts)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    condition: "Good",
    warranty: "3 months",
    image: null,
    sellerType: role,
  })
  const [showAddForm, setShowAddForm] = useState(false)

  const onNavigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAddProduct = () => {
    if (formData.name && formData.price) {
      setProducts([
        ...products,
        {
          id: products.length + 1,
          name: formData.name,
          price: Number.parseInt(formData.price, 10),
          condition: formData.condition,
          warranty: formData.warranty,
          sellerType: formData.sellerType,
          imageUrl: "https://via.placeholder.com/300x300?text=New+Product",
        },
      ])
      setFormData({
        name: "",
        price: "",
        condition: "Good",
        warranty: "3 months",
        image: null,
        sellerType: role,
      })
      setShowAddForm(false)
    }
  }

  const getConditionColor = (condition) => {
    switch (condition) {
      case "Excellent":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
      case "Good":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400"
      case "Fair":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400"
      case "New":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400"
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
    }
  }

  return (
    <div className="ml-0 lg:ml-16 pl-6 mt-8 pt-8 pb-8 px-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-r from-green-200 to-blue-300 rounded-full p-3">
              <span className="text-white text-2xl">
                <ShoppingCart className="w-5 h-5" />
              </span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Marketplace</h2>
              <p className="text-gray-600 dark:text-gray-400">Discover sustainable tech solutions</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.imageUrl || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getConditionColor(product.condition)}`}
                  >
                    {product.condition}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-black/20 backdrop-blur-sm rounded-full p-2">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-gray-800 dark:text-gray-100">{product.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-3xl font-bold text-green-600 dark:text-green-400">₹{product.price}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                    ₹{Math.floor(product.price * 1.3)}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Sold by:</span>
                  <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-sm font-medium text-gray-800 dark:text-gray-200">
                    {product.sellerType}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{product.warranty} warranty</span>
                </div>

                <button className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 px-6 rounded-xl hover:from-green-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {(role === "recycler" || role === "producer") && (
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-purple-500 rounded-full p-2">
                  <span className="text-white text-xl">
                    <PlusCircle className="w-5 h-5" />
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Add New Product</h3>
              </div>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-xl transition-all duration-300 font-medium"
              >
                {showAddForm ? "Cancel" : "Add Product"}
              </button>
            </div>
            {showAddForm && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Product Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 p-3 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter product name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 p-3 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    placeholder="Enter price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 p-3 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Condition</label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 p-3 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                  >
                    <option value="New">New</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Warranty</label>
                  <select
                    name="warranty"
                    value={formData.warranty}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 p-3 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                  >
                    <option value="1 month">1 month</option>
                    <option value="3 months">3 months</option>
                    <option value="6 months">6 months</option>
                    <option value="1 year">1 year</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleAddProduct}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 px-6 rounded-xl hover:from-green-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Add Product
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
