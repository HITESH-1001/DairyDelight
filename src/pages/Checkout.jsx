import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { createOrder } from '../utils/api';

function Checkout() {
    const { items, getTotal, clearCart } = useCartStore();
    const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate();

    const handlePayment = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }


        try {
            const options = {
                key: "YOUR_RAZORPAY_KEY",
                amount: getTotal() * 100,
                currency: "INR",
                name: "Your Store Name",
                description: "Purchase Description",
                handler: async function (response) {
                    try {
                        // Verify payment on backend
                        const verifyResponse = await fetch('/api/verify-payment', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature
                            })
                        });

                        const data = await verifyResponse.json();

                        if (data.success) {
                            const orderData = {
                                items: items.map(item => ({
                                    product: item.product._id,
                                    quantity: item.quantity,
                                    price: item.product.price
                                })),
                                total: getTotal(),
                                paymentId: response.razorpay_payment_id,
                                shippingAddress: {
                                    street: e.target.street.value,
                                    city: e.target.city.value,
                                    state: e.target.state.value,
                                    zipCode: e.target.zipCode.value,
                                    country: 'India'
                                }
                            };

                            await createOrder(orderData);
                            clearCart();
                            alert('Order placed successfully!');
                            navigate('/');
                        } else {
                            throw new Error('Payment verification failed');
                        }
                    } catch (error) {
                        alert('Failed to verify payment. Please contact support.');
                    }
                },
                prefill: {
                    name: "Customer Name",
                    email: "customer@example.com"
                },
                theme: {
                    color: "#3B82F6"
                }
            };
            const razorpay = new window.Razorpay(options);
            razorpay.open();

        } catch (error) {
            alert('Payment failed. Please try again.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Checkout</h2>

            {/* Order Summary */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                {items.map((item, index) => (
                    <div key={index} className="flex justify-between mb-2">
                        <span>{item.product.name} x {item.quantity}</span>
                        <span>₹{(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
                <div className="border-t mt-4 pt-4">
                    <p className="text-lg font-semibold flex justify-between">
                        <span>Total:</span>
                        <span>₹{getTotal().toFixed(2)}</span>
                    </p>
                </div>
            </div>

            <form onSubmit={handlePayment} className="space-y-6">
                <div>
                    <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                        Street Address
                    </label>
                    <input
                        id="street"
                        type="text"
                        name="street"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                            City
                        </label>
                        <input
                            id="city"
                            type="text"
                            name="city"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                            State
                        </label>
                        <input
                            id="state"
                            type="text"
                            name="state"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                            ZIP Code
                        </label>
                        <input
                            id="zipCode"
                            type="text"
                            name="zipCode"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                            Country
                        </label>
                        <input
                            id="country"
                            type="text"
                            name="country"
                            defaultValue="India"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                    Pay ₹{getTotal().toFixed(2)}
                </button>
            </form>
        </div>
    );
}

export default Checkout;
