import { ArrowRight, Globe, Recycle, TreePine } from "lucide-react";
import { LayoutWrapper } from "../style-components/LayoutWrapper";
import { useEffect, useState } from "react";

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
      console.log('Creating order for NGO:', ngo.name);
      

      const orderResponse = await fetch('/api/payment/order', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          amount: 100, // ₹1 = 100 paise
          ngo: ngo.id 
        })
      });

      if (!orderResponse.ok) {
        const errorText = await orderResponse.text();
        console.error('Order creation failed:', errorText);
        alert('Failed to create order. Please try again.');
        return;
      }

      const orderRes = await orderResponse.json();
      console.log('Order created:', orderRes);

      if (!orderRes.id) {
        console.error('Could not initiate donation - no order ID');
        alert('Could not initiate donation. Please try again.');
        return;
      }

      let prefResponse;
      try {
        prefResponse = await fetch('/api/payment/preference', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ 
            order_id: orderRes.id, 
            amount: orderRes.amount 
          })
        });

        if (!prefResponse.ok) {
          console.warn('Preference creation failed, continuing without it');
        }
      } catch (prefError) {
        console.warn('Preference creation error:', prefError);
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: orderRes.amount,
        currency: orderRes.currency,
        name: ngo.name,
        description: 'Support ' + ngo.name,
        order_id: orderRes.id,
        handler: async (response) => {
          try {
            console.log('Payment successful:', response);
            
            const captureResponse = await fetch('/api/payment/capture', {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                payment_id: response.razorpay_payment_id,
                amount: orderRes.amount
              })
            });

            if (!captureResponse.ok) {
              const errorText = await captureResponse.text();
              console.error('Payment capture failed:', errorText);
              alert('Payment was successful but capture failed. Please contact support.');
              return;
            }

            const captureRes = await captureResponse.json();
            
            if (captureRes.status === 'captured') {
              console.log('Payment captured successfully');
              alert(`Thank you for your ₹1 donation to ${ngo.name}!`);
            } else {
              console.error('Payment capture unsuccessful:', captureRes);
              alert('Payment capture was unsuccessful. Please contact support.');
            }
          } catch (error) {
            console.error('Error during payment capture:', error);
            alert('Error processing payment. Please contact support.');
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: ''
        },
        theme: { 
          color: '#3399cc' 
        },
        modal: {
          ondismiss: function() {
            console.log('Payment modal closed');
            setLoading(false);
          }
        }
      };

      const rz = new window.Razorpay(options);
      rz.open();
      
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
                    className={`mt-2 inline-flex items-center gap-2 bg-white text-purple-600 font-bold px-6 py-3 rounded-full transition-all duration-200 ${
                      loading 
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