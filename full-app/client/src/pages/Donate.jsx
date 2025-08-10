import { ArrowRight, Globe, Recycle, TreePine } from "lucide-react";
import { LayoutWrapper } from "../style-components/LayoutWrapper";
import { useEffect, useState } from "react";
import { handlePayment } from "../api";

const loadRazorpay = (src) =>
  new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

export const Donate = () => {
  const [loading, setLoading] = useState(false);

  const ngos = [
    {
      id: 1,
      name: 'Green Earth',
      link: 'https://greenearth.org',
      icon: TreePine,
      description: 'Leading environmental conservation efforts globally',
      gradient: 'from-green-500/70 to-emerald-500/70'
    },
    {
      id: 2,
      name: 'Recycle India',
      link: 'https://recycleindia.org',
      icon: Recycle,
      description: 'Transforming India\'s recycling landscape',
      gradient: 'from-blue-500/70 to-teal-500/70'
    },
    {
      id: 3,
      name: 'Clean Planet',
      link: 'https://cleanplanet.org',
      icon: Globe,
      description: 'Building a cleaner, sustainable future',
      gradient: 'from-purple-500/70 to-indigo-500/70'
    }
  ];

  useEffect(() => {
    loadRazorpay('https://checkout.razorpay.com/v1/checkout.js');
  }, []);

  const handleDonate = async (ngo) => {
    if (loading) return;

    setLoading(true);

    try {
      handlePayment(ngo);

    } catch (error) {
      console.error('Error initiating donation:', error);
      alert('Error initiating donation. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutWrapper>
      <section className="bg-gradient-to-r from-purple-600/80 to-pink-600/80 text-white py-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl font-extrabold mb-4">Support Our Partners</h1>
          <p className="text-lg">Help NGOs drive e‑waste recycling and environmental justice by donating ₹1.</p>
        </div>
      </section>

      <main className="max-w-7xl mx-16 py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-6">
          {ngos.map(ngo => {
            const Icon = ngo.icon;
            return (
              <div key={ngo.id} className={`bg-gradient-to-br ${ngo.gradient} text-white rounded-2xl p-8 text-center relative overflow-hidden`}>
                <div className="absolute top-4 right-4 opacity-20">
                  <Icon className="w-12 h-12" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">{ngo.name}</h2>
                <p className="text-sm opacity-90 mb-6">{ngo.description}</p>
                <button
                  onClick={() => handleDonate(ngo)}
                  disabled={loading}
                  className={`mt-2 inline-flex items-center gap-2 bg-white text-purple-600 font-bold px-6 py-3 rounded-full transition-all duration-200 ${loading
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-gray-100 hover:scale-105'
                    }`}
                >
                  {'Donate ₹1'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </LayoutWrapper>
  )
}