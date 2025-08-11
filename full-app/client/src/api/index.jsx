export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080/api';

const handleResponse = async (res) => {
    if (!res.ok) {
        const error = await res.json().catch(() => ({ message: 'Server Error' }));
        throw new Error(error.message || 'Unknown Error');
    }
    return res.status !== 204 ? res.json() : null;
};

export const api = {
    async get(path) {
        return handleResponse(await fetch(`${API_BASE}${path}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                // credentials: 'include'
            }

        ));
    },
    async options(path) {
        return handleResponse(await fetch(`${API_BASE}${path}`,
            {
                method: 'OPTIONS',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                // credentials: 'include'
            }

        ));
    },
    async post(path, body) {
        return handleResponse(await fetch(`${API_BASE}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body),
            // credentials: 'include'
        }));
    },
    async put(path, body) {
        return handleResponse(await fetch(`${API_BASE}${path}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body),
            // credentials: 'include'
        }));
    },
    async delete(path) {
        return handleResponse(await fetch(`${API_BASE}${path}`, {
            method: 'DELETE',
            // credentials: 'include'
        }));
    }
};

//---X---

export const handlePayment = async (ngo) => {
    console.log('Creating order for NGO:', ngo.name);


    const orderResponse = await fetch(`${API_BASE}/api/payment/order`, {
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
        prefResponse = await fetch(`${API_BASE}/api/payment/preference`, {
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

                const captureResponse = await fetch(`${API_BASE}/api/payment/capture`, {
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
            ondismiss: function () {
                console.log('Payment modal closed');
                setLoading(false);
            }
        }
    };

    const rz = new window.Razorpay(options);
    rz.open();
}


export const submitForm = async (formData) => {
    try {
        if (formData.device && formData.brand && formData.location && formData.preferredTime) {
            await api.post(`/api/pickup`, formData)
            return {
                success: true,
                message: 'Request submitted successfully'
            }
        } else {
            return {
                success: false,
                message: 'Please fill in all fields'
            }
        }
    } catch (err) {
        return {
            success: false,
            message: 'Failed to submit: ' + err.message
        }
    }
}

export const fetchAdminStats = async () => {
    try {
        const response = await api.get(`/api/admin/stats`)
        console.log(response)
        return {
            success: true,
            message: response
        }
    } catch (error) {
        console.error("Error fetching admin stats:", error)
        return {
            success: false,
            message: 'Error fetching data'
        }
    }
}

export const fetchRecyclerData = async () => {
    try {
        const response = await api.get("/api/pickups");
        return {
            success: true,
            message: response
        }
    } catch (error) {
        console.error("Error fetching recycler pickups:", error)
        return {
            success: false,
            message: 'Error fetching data'
        }
    }
}

export const userPickup = async () => {
    try {
        const response = api
            .get(`/pickup/user`)
        return {
            success: true,
            message: response
        }
    } catch (error) {
        console.error("Error fetching recycler pickups:", error)
        return {
            success: false,
            message: 'Error fetching data'
        }
    }
}
