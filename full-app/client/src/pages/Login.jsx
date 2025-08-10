import { Globe, Moon, Sun, Eye, EyeOff, ChevronDown, Loader2 } from "lucide-react"
import { useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"

const ROLES = [
  { value: "user", label: "User", description: "Individual recycler" },
  { value: "recycler", label: "Recycler", description: "Collection facility" },
  { value: "producer", label: "Admin", description: "Producer administrator" }
]

const STATS = [
  { value: "2.3M", label: "Devices Recycled", color: "text-green-400" },
  { value: "850K", label: "CO₂ Saved (kg)", color: "text-blue-400" },
  { value: "45K", label: "Active Users", color: "text-purple-400" },
  { value: "120+", label: "Cities Served", color: "text-orange-400" }
]

export const Login = ({ onLogin, isDark, onDarkToggle }) => {
    const [formData, setFormData] = useState({
        role: "user",
        // email: "",
        // password: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    // const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})

    // const validateForm = useCallback(() => {
    //     const newErrors = {}
        
    //     if (!formData.email.trim()) {
    //         newErrors.email = "Email is required"
    //     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    //         newErrors.email = "Please enter a valid email"
    //     }
        
    //     if (!formData.password.trim()) {
    //         newErrors.password = "Password is required"
    //     } else if (formData.password.length < 6) {
    //         newErrors.password = "Password must be at least 6 characters"
    //     }
        
    //     setErrors(newErrors)
    //     return Object.keys(newErrors).length === 0
    // }, [formData])

    const onNavigate = useNavigate()

    const handleInputChange = useCallback((field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }))
        }
    }, [errors])

    const handleLogin = async (e) => {
        e.preventDefault()
        
        // if (!validateForm()) return
        
        setIsLoading(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500))
            onLogin(formData.role)
            onNavigate('/'+formData.role)

        } catch (error) {
            setErrors({ submit: "Login failed. Please try again." })
        } finally {
            setIsLoading(false)
        }
    }

    const selectedRole = ROLES.find(r => r.value === formData.role)

    return (
        <div className="flex bg-gray-50 dark:bg-gray-900">
            {/* Left side */}
            <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden pt-5">
                <div
                    className="absolute inset-0 bg-cover bg-center brightness-150"
                    style={{
                        backgroundImage:
                            "url('https://www.dotmagazine.online/_Resources/Persistent/e/8/6/6/e8660cd9a90ddc83b7c18718666f810178e78e01/Galeanu%20Mihai-1409544550.jpg-web.jpg')",
                    }}
                ></div>
                <div className={`absolute inset-0 ${isDark ? "bg-black/70" : "bg-black/50"} z-0`}></div>
                
                <div className="relative z-10 flex flex-col justify-center p-8 text-white">
                    <div className="max-w-md">
                        
                        <h1 className="text-5xl font-bold mb-2 leading-tight">
                            Welcome to
                            <span className="block bg-gradient-to-r from-green-200 to-blue-200 bg-clip-text text-transparent">
                                Relife
                            </span>
                        </h1>
                        
                        <p className="text-2xl font-bold text-white/90 mb-8 leading-relaxed">
                            Join thousands making a difference in the e-waste revolution. 
                            Every device recycled is a step toward a sustainable future.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            {STATS.map((stat, index) => (
                                <div 
                                    key={stat.label}
                                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                                        {stat.value}
                                    </div>
                                    <div className="text-white/80 text-sm font-medium">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Login form */}
            <div className="flex-1 lg:w-2/5 flex items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">                        
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Welcome back
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Sign in to continue your eco-journey
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                                I am a
                            </label>
                            <div className="relative">
                                <select
                                    value={formData.role}
                                    onChange={(e) => handleInputChange('role', e.target.value)}
                                    className="w-full text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-4 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 dark:focus:border-green-400 transition-all appearance-none cursor-pointer font-medium shadow-sm hover:shadow-md"
                                    aria-describedby="role-description"
                                >
                                    {ROLES.map(role => (
                                        <option key={role.value} value={role.value}>
                                            {role.label}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                            </div>
                            <p id="role-description" className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                {selectedRole?.description}
                            </p>
                        </div>
                        
                        {/* <div>
                            <label htmlFor="email" className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                className={`w-full text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border-2 ${
                                    errors.email 
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                                        : 'border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 focus:ring-green-500/20'
                                } p-4 rounded-xl focus:ring-4 transition-all font-medium shadow-sm hover:shadow-md`}
                                placeholder="Enter your email"
                                autoComplete="email"
                                disabled={isLoading}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-2 font-medium">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    className={`w-full text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border-2 ${
                                        errors.password 
                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                                            : 'border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 focus:ring-green-500/20'
                                    } p-4 pr-12 rounded-xl focus:ring-4 transition-all font-medium shadow-sm hover:shadow-md`}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    disabled={isLoading}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-2 font-medium">{errors.password}</p>
                            )}
                        </div> */}

                        {/* {errors.submit && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                                <p className="text-red-600 dark:text-red-400 text-sm font-medium">{errors.submit}</p>
                            </div>
                        )} */}

                        <button
                            onClick={handleLogin}
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-md"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-3">
                                    <Loader2 className="animate-spin w-5 h-5" />
                                    <span>Signing in...</span>
                                </div>
                            ) : (
                                `Sign in as ${selectedRole?.label}`
                            )}
                        </button>
                    </div>

                    <div className="text-center mt-8">
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Don't have an account?{' '}
                            <button
                                onClick={() => onNavigate('/signup')}
                                className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-semibold transition-colors"
                            >
                                Sign up
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}