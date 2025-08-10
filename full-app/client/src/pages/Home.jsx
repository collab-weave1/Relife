import React, { useEffect, useMemo, useState } from 'react';

import { Globe, Sprout, Battery, Lock, Heart, ArrowRight, Recycle, TreePine, Shield, Leaf, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { RotateLoader } from "react-spinners";

import InteractiveEarth from '../style-components/InteractiveEarth';
import SplitText from '../style-components/SplitText';
import { FadeInText, TypewriterText } from '../style-components/TextReveal';
import { LayoutWrapper } from '../style-components/LayoutWrapper';
import { useNavigate } from 'react-router-dom';

const LoadingScreen = ({ loading }) => {
    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    {/* Animated background elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div
                            className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl"
                            animate={{
                                scale: [1, 1.3, 1],
                                x: [0, 20, 0],
                                y: [0, -10, 0],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <motion.div
                            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-200/25 to-blue-200/25 rounded-full blur-3xl"
                            animate={{
                                scale: [1.2, 1, 1.2],
                                x: [0, -15, 0],
                                y: [0, 15, 0],
                            }}
                            transition={{
                                duration: 7,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </div>

                    <div className="relative z-10 text-center max-w-md mx-auto px-6">
                        {/* Logo/Icon section */}
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="mb-8"
                        >
                            <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                />
                                <Recycle className="w-10 h-10 text-white z-10" />
                            </div>
                        </motion.div>

                        <motion.h1
                            className="text-3xl font-bold mb-2 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            ReLife Loading...
                        </motion.h1>

                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <RotateLoader
                                color="#0891b2"
                                loading={loading}
                                size={15}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </motion.div>

                        <motion.p
                            className="text-slate-600 text-base font-medium mb-6"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.5 }}
                        >
                            Transforming e-waste into sustainable impact
                        </motion.p>

                        <motion.div
                            className="flex justify-center space-x-8"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.5 }}
                        >
                            <motion.div
                                className="flex flex-col items-center"
                                animate={{ y: [0, -3, 0] }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: 0,
                                    ease: "easeInOut"
                                }}
                            >
                                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mb-1">
                                    <Recycle className="w-4 h-4 text-emerald-600" />
                                </div>
                                <span className="text-xs text-slate-500 font-medium">Recycle</span>
                            </motion.div>

                            <motion.div
                                className="flex flex-col items-center"
                                animate={{ y: [0, -3, 0] }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: 0.7,
                                    ease: "easeInOut"
                                }}
                            >
                                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mb-1">
                                    <Leaf className="w-4 h-4 text-teal-600" />
                                </div>
                                <span className="text-xs text-slate-500 font-medium">Sustain</span>
                            </motion.div>

                            <motion.div
                                className="flex flex-col items-center"
                                animate={{ y: [0, -3, 0] }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: 1.4,
                                    ease: "easeInOut"
                                }}
                            >
                                <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center mb-1">
                                    <ShieldCheck className="w-4 h-4 text-cyan-600" />
                                </div>
                                <span className="text-xs text-slate-500 font-medium">Comply</span>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export const Home = ({ isDark }) => {

    const onNavigate = useNavigate()

    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 4500);
        
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen">

            <LoadingScreen loading={loading} />

            <LayoutWrapper isDark={isDark}>
                <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600/70 via-green-500/70 to-teal-600/70 text-white mb-12">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>

                    <div className="relative max-w-6xl mx-auto py-20 px-6 text-center">

                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="mb-2"
                        >
                            <FadeInText delay={5}>
                                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                                    ReLife
                                    <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 mt-1 bg-clip-text text-transparent text-4xl md:text-5xl">
                                        Transform E‑Waste into Opportunity
                                    </span>
                                </h1>
                            </FadeInText>
                        </motion.div>

                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="mb-2"
                        >
                            <FadeInText delay={5.2}>
                                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-3">
                                    <Recycle className="w-4 h-4" />
                                    <span className="text-sm font-medium">Sustainable Technology Solutions</span>
                                </div>
                            </FadeInText>
                        </motion.div>

                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="mb-2"
                        >
                            <FadeInText delay={5.3}>
                                <TypewriterText
                                    text="Join our mission to recycle electronics, save precious resources, and build a cleaner, greener planet for future generations."
                                    delay={5.4}
                                    className="text-xl  text-green-50 mb-10 max-w-2xl mx-auto mt-5 pl-1 leading-relaxed"
                                />
                            </FadeInText>
                        </motion.div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button
                                onClick={() => onNavigate('/login')}
                                className="group bg-white text-green-600 font-bold px-8 py-4 rounded-full hover:bg-green-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                            >
                                Get Started with Relife
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button 
                                onClick={() => onNavigate('/about')}
                                className="text-white font-medium px-6 py-4 rounded-full border-2 border-white/30 hover:bg-white/10 transition-all duration-300">
                                Learn More
                            </button>
                        </div>
                    </div>
                </section>

                <main className="max-w-7xl mx-auto space-y-20">

                    <section className="px-7 ">
                        <div className="relative group max-w-4xl mx-auto ">
                            <div className="absolute inset-0 rounded-3xl transition-all duration-500"></div>

                            <div className="relative bg-white/70 dark:bg-gray-900/70 rounded-3xl border border-white/20 dark:border-gray-700/20 shadow-2xl overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -translate-y-32 translate-x-32 group-hover:scale-110 transition-transform duration-700"></div>
                                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full translate-y-24 -translate-x-24 group-hover:scale-110 transition-transform duration-700"></div>

                                <div className="relative p-7">
                                    <div className="text-center mb-6">
                                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100/20 to-indigo-100/20 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full px-4 mb-1">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Live Planet Status</span>
                                        </div>

                                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                                            Our Planet's Health
                                        </h2>
                                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                                            Explore how your actions contribute to planetary wellness
                                        </p>
                                    </div>

                                    <div className="flex justify-center">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-emerald-500/20 to-teal-500/20 rounded-full blur-2xl scale-110 group-hover:scale-125 transition-transform duration-700"></div>

                                            <div className="relative bg-gradient-to-br from-gray-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-900/50 rounded-3xl p-8 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 shadow-inner group-hover:shadow-lg transition-all duration-500">
                                                <InteractiveEarth
                                                    size={220}
                                                    showControls={true}
                                                    showProgress={true}
                                                    showMessage={true}
                                                    className="text-gray-700 dark:text-gray-300"
                                                />
                                            </div>

                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                            </div>
                                            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-500 rounded-full animate-pulse shadow-lg"></div>
                                        </div>
                                    </div>

                                    <div className="text-center mt-8">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Click and interact with the planet to explore different environmental metrics
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="px-16">
                        <div className="bg-gradient-to-br from-red-500/80 to-orange-500/80 dark:from-red-900/20 dark:to-orange-900/20 rounded-3xl p-12 border border-red-100 dark:border-red-800/30">
                            <div className="max-w-4xl mx-auto">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-2xl">
                                        <Shield className="w-8 h-8 text-red-600 dark:text-red-400" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">What is E‑Waste?</h2>
                                </div>

                                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                    Electronic waste (e‑waste) refers to discarded electronic devices such as smartphones, laptops, TVs, and batteries.
                                    <span className="font-semibold text-red-600 dark:text-red-400"> Improper disposal often leads to toxic chemicals leaching into soil and water</span>,
                                    while valuable materials go unrecovered, creating both environmental hazards and economic waste.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="px-16">
                        <div className="bg-white/70 dark:bg-gray-800/70 rounded-3xl shadow-xl p-12 border border-gray-100 dark:border-gray-700">
                            <div className="max-w-5xl mx-auto">
                                <div className="text-center mb-12">
                                    <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">About ReLife</h2>
                                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                                        ReLife is a scalable web platform connecting consumers, recyclers and brands in a circular e‑waste economy.
                                        We're building the future of sustainable technology.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="group p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl hover:shadow-lg transition-all duration-300 border border-green-100 dark:border-green-800/30">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl group-hover:scale-110 transition-transform">
                                                <Sprout className="w-6 h-6 text-green-600 dark:text-green-400" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Geo‑Enabled Pickup</h3>
                                                <p className="text-gray-600 dark:text-gray-400">Schedule collection with intelligent map‑based routing and real-time tracking.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="group p-6 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-2xl hover:shadow-lg transition-all duration-300 border border-red-100 dark:border-red-800/30">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl group-hover:scale-110 transition-transform">
                                                <Heart className="w-6 h-6 text-red-500 dark:text-red-400" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Gamified Incentives</h3>
                                                <p className="text-gray-600 dark:text-gray-400">Earn eco‑points, badges, and rewards for responsible recycling behaviors.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="group p-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl hover:shadow-lg transition-all duration-300 border border-yellow-100 dark:border-yellow-800/30">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl group-hover:scale-110 transition-transform">
                                                <Battery className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Circular Marketplace</h3>
                                                <p className="text-gray-600 dark:text-gray-400">Buy & sell certified refurbished electronics with quality guarantees.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="group p-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl hover:shadow-lg transition-all duration-300 border border-purple-100 dark:border-purple-800/30">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl group-hover:scale-110 transition-transform">
                                                <Lock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">EPR & Impact Dashboards</h3>
                                                <p className="text-gray-600 dark:text-gray-400">Real‑time analytics and compliance reporting for producers and brands.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="px-16 pb-20">
                        <div className="bg-gradient-to-br from-blue-600/80 to-indigo-700/80 rounded-3xl shadow-2xl text-white relative overflow-hidden">
                            <div className="absolute inset-0">
                                <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-36 translate-x-36"></div>
                                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-48 -translate-x-48"></div>
                            </div>

                            <div className="relative p-12">
                                <div className="text-center mb-12">
                                    <h2 className="text-4xl font-bold mb-4">Our Impact So Far</h2>
                                    <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                                        Together, we're making a real difference in creating a sustainable future. Here's what we've achieved so far.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="text-center group">
                                        <div className="inline-flex p-4 bg-white/10 backdrop-blur-sm rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                                            <Globe className="w-12 h-12 text-blue-200" />
                                        </div>
                                        <p className="text-5xl font-bold mb-2">1,200+</p>
                                        <p className="text-blue-200 text-lg font-medium">Pickup Requests</p>
                                        <p className="text-blue-100 text-sm mt-1">And growing every day</p>
                                    </div>

                                    <div className="text-center group">
                                        <div className="inline-flex p-4 bg-white/10 backdrop-blur-sm rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                                            <Sprout className="w-12 h-12 text-green-300" />
                                        </div>
                                        <p className="text-5xl font-bold mb-2">50,000 kg</p>
                                        <p className="text-green-200 text-lg font-medium">E‑Waste Collected</p>
                                        <p className="text-blue-100 text-sm mt-1">Safely recycled & processed</p>
                                    </div>

                                    <div className="text-center group">
                                        <div className="inline-flex p-4 bg-white/10 backdrop-blur-sm rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                                            <TreePine className="w-12 h-12 text-yellow-300" />
                                        </div>
                                        <p className="text-5xl font-bold mb-2">22,000 kg</p>
                                        <p className="text-yellow-200 text-lg font-medium">CO₂ Saved</p>
                                        <p className="text-blue-100 text-sm mt-1">Equivalent to 500 trees planted</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="px-16 pb-20">
                        <div className="text-center max-w-3xl mx-auto">
                            <h2 className="text-4xl font-bold text-green-800 dark:text-green-300 mb-6">
                                Ready to Make a Difference?
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
                                Join thousands of eco-conscious individuals who are already making an impact.
                                Start your journey towards a sustainable future today.
                            </p>

                            <button
                                onClick={() => onNavigate('/login')}
                                className="group bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold px-10 py-4 rounded-full hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg flex items-center gap-3 mx-auto"
                            >
                                Get Started with ReLife
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </section>
                </main>
            </LayoutWrapper>
        </div>
    );
};