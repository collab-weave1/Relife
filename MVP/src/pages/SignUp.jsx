import { Globe, Moon, Sun, Eye, EyeOff, ChevronDown, Loader2, Check } from "lucide-react"
import { useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"

const ROLES = [
  { value: "user", label: "User", description: "Individual recycler" },
  { value: "recycler", label: "Recycler", description: "Collection facility" },
  { value: "admin", label: "Admin", description: "Producer administrator" }
]

const STATS = [
  { value: "2.3M", label: "Devices Recycled", color: "text-green-400" },
  { value: "850K", label: "CO₂ Saved (kg)", color: "text-blue-400" },
  { value: "45K", label: "Active Users", color: "text-purple-400" },
  { value: "120+", label: "Cities Served", color: "text-orange-400" }
]

export const SignUp = ({ onLogin, isDark, onDarkToggle }) => {
    const [formData, setFormData] = useState({
        role: "user",
        // firstName: "",
        // lastName: "",
        // email: "",
        // password: "",
        // confirmPassword: "",
        // agreeToTerms: false
    })
    const [isLoading, setIsLoading] = useState(false)

    const onNavigate = useNavigate()

    // const [showPassword, setShowPassword] = useState(false)
    // const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    // const [errors, setErrors] = useState({})

    // const validateForm = useCallback(() => {
    //     const newErrors = {}
        
    //     if (!formData.firstName.trim()) {
    //         newErrors.firstName = "First name is required"
    //     }
        
    //     if (!formData.lastName.trim()) {
    //         newErrors.lastName = "Last name is required"
    //     }
        
    //     if (!formData.email.trim()) {
    //         newErrors.email = "Email is required"
    //     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    //         newErrors.email = "Please enter a valid email"
    //     }
        
    //     if (!formData.password.trim()) {
    //         newErrors.password = "Password is required"
    //     } else if (formData.password.length < 8) {
    //         newErrors.password = "Password must be at least 8 characters"
    //     } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
    //         newErrors.password = "Password must include uppercase, lowercase, and number"
    //     }
        
    //     if (!formData.confirmPassword.trim()) {
    //         newErrors.confirmPassword = "Please confirm your password"
    //     } else if (formData.password !== formData.confirmPassword) {
    //         newErrors.confirmPassword = "Passwords do not match"
    //     }
        
    //     if (!formData.agreeToTerms) {
    //         newErrors.agreeToTerms = "You must agree to the terms and conditions"
    //     }
        
    //     setErrors(newErrors)
    //     return Object.keys(newErrors).length === 0
    // }, [formData])

    const handleInputChange = useCallback((field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        // if (errors[field]) {
        //     setErrors(prev => ({ ...prev, [field]: null }))
        // }
    }, [
        // errors
    ])

    const handleSignup = async (e) => {
        e.preventDefault()
        
        // if (!validateForm()) return
        
        setIsLoading(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000))
            // Handle successful signup
            console.log('Signup successful:', formData)
        } catch (error) {
            // setErrors({ submit: "Signup failed. Please try again." })
        } finally {
            setIsLoading(false)
            onNavigate('/login')
        }
    }

    const selectedRole = ROLES.find(r => r.value === formData.role)

    // const getPasswordStrength = () => {
    //     const password = formData.password
    //     if (!password) return { strength: 0, label: "" }
        
    //     let score = 0
    //     if (password.length >= 8) score++
    //     if (/[a-z]/.test(password)) score++
    //     if (/[A-Z]/.test(password)) score++
    //     if (/\d/.test(password)) score++
    //     if (/[^a-zA-Z0-9]/.test(password)) score++
        
    //     const labels = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"]
    //     const colors = ["", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500", "bg-green-600"]
        
    //     return { strength: score, label: labels[score], color: colors[score] }
    // }

    // const passwordStrength = getPasswordStrength()

    return (
            <div className="flex bg-gray-50 dark:bg-gray-900">
                {/* Left side - Branding and stats */}
                <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden">
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
                                Join the
                                <span className="block bg-gradient-to-r from-green-200 to-blue-200 bg-clip-text text-transparent">
                                    Relife Movement
                                </span>
                            </h1>
                            
                            <p className="text-xl font-medium text-white/90 mb-8 leading-relaxed">
                                Be part of the solution. Create your account and start making a positive impact on our planet's future through responsible e-waste recycling.
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

                {/* Right side - Signup form */}
                <div className="flex-1 lg:w-2/5 flex items-center justify-center p-6 lg:p-12">
                    <div className="w-full max-w-md">

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

                            {/* <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                                        First name
                                    </label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        value={formData.firstName}
                                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                                        className={`w-full text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border-2 ${
                                            errors.firstName 
                                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                                                : 'border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 focus:ring-green-500/20'
                                        } p-4 rounded-xl focus:ring-4 transition-all font-medium shadow-sm hover:shadow-md`}
                                        placeholder="John"
                                        autoComplete="given-name"
                                        disabled={isLoading}
                                    />
                                    {errors.firstName && (
                                        <p className="text-red-500 text-sm mt-1 font-medium">{errors.firstName}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                                        Last name
                                    </label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        value={formData.lastName}
                                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                                        className={`w-full text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border-2 ${
                                            errors.lastName 
                                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                                                : 'border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 focus:ring-green-500/20'
                                        } p-4 rounded-xl focus:ring-4 transition-all font-medium shadow-sm hover:shadow-md`}
                                        placeholder="Doe"
                                        autoComplete="family-name"
                                        disabled={isLoading}
                                    />
                                    {errors.lastName && (
                                        <p className="text-red-500 text-sm mt-1 font-medium">{errors.lastName}</p>
                                    )}
                                </div>
                            </div>

                            <div>
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
                                    placeholder="john.doe@example.com"
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
                                        placeholder="Create a strong password"
                                        autoComplete="new-password"
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
                                
                                {formData.password && (
                                    <div className="mt-2">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                <div 
                                                    className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                                                    style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                {passwordStrength.label}
                                            </span>
                                        </div>
                                    </div>
                                )}
                                
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-2 font-medium">{errors.password}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                                    Confirm password
                                </label>
                                <div className="relative">
                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={formData.confirmPassword}
                                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                        className={`w-full text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border-2 ${
                                            errors.confirmPassword 
                                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                                                : 'border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 focus:ring-green-500/20'
                                        } p-4 pr-12 rounded-xl focus:ring-4 transition-all font-medium shadow-sm hover:shadow-md`}
                                        placeholder="Confirm your password"
                                        autoComplete="new-password"
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                        disabled={isLoading}
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                                    <div className="flex items-center gap-2 mt-2">
                                        <Check className="w-4 h-4 text-green-500" />
                                        <span className="text-sm text-green-600 dark:text-green-400 font-medium">Passwords match</span>
                                    </div>
                                )}
                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-sm mt-2 font-medium">{errors.confirmPassword}</p>
                                )}
                            </div>

                            <div>
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.agreeToTerms}
                                        onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                                        className="mt-1 w-5 h-5 text-green-500 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded focus:ring-green-500 focus:ring-2"
                                        disabled={isLoading}
                                    />
                                    <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                        I agree to the{' '}
                                        <button type="button" className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-semibold transition-colors underline">
                                            Terms of Service
                                        </button>{' '}
                                        and{' '}
                                        <button type="button" className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-semibold transition-colors underline">
                                            Privacy Policy
                                        </button>
                                    </span>
                                </label>
                                {errors.agreeToTerms && (
                                    <p className="text-red-500 text-sm mt-2 font-medium">{errors.agreeToTerms}</p>
                                )}
                            </div> */}

                            {/* {errors.submit && (
                                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                                    <p className="text-red-600 dark:text-red-400 text-sm font-medium">{errors.submit}</p>
                                </div>
                            )} */}

                            <button
                                onClick={handleSignup}
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-md"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-3">
                                        <Loader2 className="animate-spin w-5 h-5" />
                                        <span>Creating account...</span>
                                    </div>
                                ) : (
                                    `Create ${selectedRole?.label} Account`
                                )}
                            </button>
                        </div>

                        <div className="text-center mt-8">
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Already have an account?{' '}
                                <button 
                                    onClick={() => onNavigate('/login')}
                                    className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-semibold transition-colors"
                                >
                                    Sign in
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
    )
}