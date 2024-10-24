import React, { useState, useEffect } from 'react';  // Make sure to import useEffect
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your_stripe_publishable_key'); // Replace with your publishable key

const PaymentForm = ({ clientSecret }) => {  // Accept clientSecret as a prop
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);

        if (!stripe || !elements || !clientSecret) {
            setError('Stripe has not been properly initialized or clientSecret is missing');
            setLoading(false);
            return;
        }

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        setLoading(false);

        if (error) {
            setError(error.message);
        } else {
            setSuccess(true);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Make a Payment</h2>
            <form onSubmit={handleSubmit}>
                <CardElement
                    className="border border-gray-300 p-4 rounded-md"
                    options={{ style: { base: { fontSize: '18px' } } }}
                />
                <button
                    type="submit"
                    className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md"
                    disabled={!stripe || loading}
                >
                    {loading ? 'Processing...' : 'Pay Now'}
                </button>
                {error && <div className="text-red-500 mt-2">{error}</div>}
                {success && <div className="text-green-500 mt-2">Payment Successful!</div>}
            </form>
        </div>
    );
};

const PaymentPage = () => {
    const [clientSecret, setClientSecret] = useState('');

    // Fetch the client secret from the backend
    const fetchPaymentIntent = async () => {
        const response = await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: 5000 }), // Example amount (50.00 USD)
        });

        const { clientSecret } = await response.json();
        setClientSecret(clientSecret);
    };

    useEffect(() => {
        fetchPaymentIntent();
    }, []);

    return (
        <Elements stripe={stripePromise}>
            {clientSecret && <PaymentForm clientSecret={clientSecret} />}  {/* Pass clientSecret as a prop */}
        </Elements>
    );
};

export default PaymentPage;
