import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

export default function StripeCheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    // In a real app, you'd call your backend to create a PaymentIntent here.
    setMessage('Payment processing would happen here with a real backend.');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 24, background: '#f9fafc', padding: 24, borderRadius: 8 }}>
      <h2>Payment</h2>
      <CardElement options={{ style: { base: { fontSize: '18px' } } }} />
      <button type="submit" style={{ marginTop: 16, padding: '8px 24px' }} disabled={!stripe}>
        Pay Now
      </button>
      {message && <p style={{ color: 'green', marginTop: 16 }}>{message}</p>}
    </form>
  );
}