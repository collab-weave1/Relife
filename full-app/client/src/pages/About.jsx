import { ArrowRight, Globe, Sprout, Target, Users, Zap, Heart, TreePine, Recycle, Shield, Award } from "lucide-react";
import { LayoutWrapper } from "../style-components/LayoutWrapper";
import { useNavigate } from "react-router-dom";

export const About = ({ isDark }) => {
    const teamMembers = [
        {
            name: 'Nevin Mathew',
            role: 'Product Lead',
            icon: Target,
            gradient: 'from-purple-500 to-pink-500',
            bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
            borderColor: 'border-purple-100 dark:border-purple-800/30'
        },
        {
            name: 'John Smith',
            role: 'Tech Lead',
            icon: Zap,
            gradient: 'from-blue-500 to-cyan-500',
            bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
            borderColor: 'border-blue-100 dark:border-blue-800/30'
        },
        {
            name: 'Alice Smith',
            role: 'UX Designer',
            icon: Heart,
            gradient: 'from-emerald-500 to-teal-500',
            bgGradient: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20',
            borderColor: 'border-emerald-100 dark:border-emerald-800/30'
        }
    ];

    const ngos = [
        {
            name: 'Green Earth',
            link: 'https://greenearth.org',
            icon: TreePine,
            description: 'Leading environmental conservation efforts globally',
            gradient: 'from-green-500 to-emerald-500'
        },
        {
            name: 'Recycle India',
            link: 'https://recycleindia.org',
            icon: Recycle,
            description: 'Transforming India\'s recycling landscape',
            gradient: 'from-blue-500 to-teal-500'
        },
        {
            name: 'Clean Planet',
            link: 'https://cleanplanet.org',
            icon: Globe,
            description: 'Building a cleaner, sustainable future',
            gradient: 'from-purple-500 to-indigo-500'
        }
    ];

    const achievements = [
        {
            icon: Award,
            title: 'Innovation Award',
            description: 'Winner of Tech for Good Award',
            gradient: 'from-yellow-500 to-orange-500'
        },
        {
            icon: Users,
            title: 'Community Impact',
            description: '10,000+ active users across 50 cities',
            gradient: 'from-blue-500 to-purple-500'
        },
        {
            icon: Shield,
            title: 'Compliance Leader',
            description: 'First platform to achieve EPR certification',
            gradient: 'from-emerald-500 to-teal-500'
        }
    ];

    const onNavigate = useNavigate()

    return (
        <LayoutWrapper isDark={isDark}>
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-600/70 via-indigo-500/70 to-purple-600/70 text-white">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>

                <div className="relative max-w-6xl mx-auto py-20 px-6 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                        <Users className="w-4 h-4" />
                        <span className="text-sm font-medium">Our Story & Mission</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl bg-gradient-to-r from-yellow-300 to-orange-300 mt-1 bg-clip-text text-transparent font-bold mb-6 leading-tight">
                        About ReLife
                    </h1>

                    <p className="text-xl text-blue-50 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Discover how we're revolutionizing e-waste management through innovation,
                        community engagement, and sustainable technology solutions.
                    </p>
                </div>
            </section>

            <main className="max-w-7xl mx-auto space-y-20 py-16">

                <section className="px-6">
                    <div className="bg-white/70 dark:bg-gray-800/70 rounded-3xl shadow-xl p-12 border border-gray-100 dark:border-gray-700">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl">
                                    <Sprout className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100">Our Story</h2>
                            </div>

                            <div className="prose prose-lg max-w-none">
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                    ReLife was born from a simple yet powerful idea during an event:
                                    <span className="font-semibold text-emerald-600 dark:text-emerald-400"> Innovate for Nature</span>.
                                    What started as a project has evolved into a comprehensive platform that's reshaping
                                    how we think about electronic waste.
                                </p>

                                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                    We recognized that the e-waste challenge isn't just about recycling, it's about creating
                                    connections. Our platform bridges the gap between consumers who want to dispose responsibly,
                                    recyclers who need steady supply chains, and brands committed to circular economy principles.
                                    Through technology, gamification, and community building, we're making sustainable choices
                                    accessible and rewarding for everyone.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="group bg-gradient-to-br from-emerald-500/80 to-teal-600/80 rounded-3xl p-10 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                            <div className="relative">
                                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl w-fit mb-6">
                                    <Target className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
                                <p className="text-emerald-50 text-lg leading-relaxed">
                                    To create a world where electronic waste becomes a valuable resource,
                                    connecting communities through technology and making sustainable choices
                                    the easiest and most rewarding option for everyone.
                                </p>
                            </div>
                        </div>

                        <div className="group bg-gradient-to-br from-purple-500/80 to-indigo-600/80 rounded-3xl p-10 text-white relative overflow-hidden">
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>
                            <div className="relative">
                                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl w-fit mb-6">
                                    <Globe className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
                                <p className="text-purple-50 text-lg leading-relaxed">
                                    A circular economy where every electronic device is designed for longevity,
                                    reuse, and responsible recycling; creating a sustainable future for generations
                                    to come while building thriving communities.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Our Achievements</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Recognition and milestones that fuel our commitment to environmental innovation
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {achievements.map((achievement, index) => (
                            <div
                                className="group bg-white/70 dark:bg-gray-800/70 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                            >
                                <div className={`inline-flex p-4 bg-gradient-to-r ${achievement.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform`}>
                                    <achievement.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">{achievement.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{achievement.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* <section className="px-6">
            <div className="bg-white/70 dark:bg-gray-800/70 rounded-3xl shadow-xl p-12 border border-gray-100 dark:border-gray-700">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100/20 to-purple-100/20 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full px-4 py-2 mb-4">
                  <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Meet the Team</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">The People Behind ReLife</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  A passionate team of innovators, designers, and sustainability advocates working together 
                  to create meaningful environmental impact.
                </p>
              </div>
  
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <div
                    className={`group p-8 bg-gradient-to-br ${member.bgGradient} rounded-2xl border ${member.borderColor} hover:shadow-lg transition-all duration-300`}
                  >
                    <div className="text-center">
                      <div className={`inline-flex p-4 bg-gradient-to-r ${member.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform`}>
                        <member.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{member.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 font-medium">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section> */}

                <section className="px-6">
                    <div className="bg-gradient-to-br from-purple-600/80 to-pink-600/80 rounded-3xl shadow-2xl text-white relative overflow-hidden">
                        <div className="absolute inset-0">
                            <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-36 translate-x-36"></div>
                            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-48 -translate-x-48"></div>
                        </div>

                        <div className="relative px-12 pt-12">
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                                    <Heart className="w-4 h-4" />
                                    <span className="text-sm font-medium">Community Support</span>
                                </div>
                                <h2 className="text-4xl font-bold mb-4">Support Our Partners</h2>
                                <p className="text-purple-100 text-lg max-w-3xl mx-auto">
                                    Together with these amazing NGOs, we're creating lasting change in e-waste recycling
                                    and environmental justice. Your support helps amplify their incredible work.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                                {ngos.map((ngo, index) => (
                                    <div
                                        className="group bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300"
                                    >
                                        <div className="text-center">
                                            <div className={`inline-flex p-4 bg-gradient-to-r ${ngo.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform`}>
                                                <ngo.icon className="w-8 h-8 text-white" />
                                            </div>
                                            <h3 className="text-xl font-bold mb-3">{ngo.name}</h3>
                                            <p className="text-purple-100 text-sm mb-6 leading-relaxed">{ngo.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center justify-center mx-auto">
                                <button
                                    onClick={() => onNavigate('/donate')}
                                    className="group/btn inline-flex items-center justify-center gap-2 my-8 bg-indigo-500/70 hover:bg-indigo-500/80 backdrop-blur-sm px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
                                >
                                    <span>Support Now</span>
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                                </div>
                        </div>
                    </div>
                </section>

                <section className="px-6 pb-20">
                    <div className="text-center max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                            Join Our Mission
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                            Be part of the solution. Whether you're an individual looking to recycle responsibly,
                            a business seeking sustainable practices, or an organization wanting to make a difference—
                            there's a place for you in the ReLife community.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button
                                onClick={() => onNavigate('/login')}
                                className="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold px-10 py-4 rounded-full hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg flex items-center gap-3"
                            >
                                Start Your Journey
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </button>

                            {/* <button 
                  onClick={() => onNavigate('contact')}
                  className="text-gray-700 dark:text-gray-300 font-medium px-8 py-4 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                >
                  Get in Touch
                </button> */}
                        </div>
                    </div>
                </section>

            </main>
        </LayoutWrapper>
    );
};