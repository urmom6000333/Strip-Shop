import React from 'react';

interface PaymentButtonProps {
  amount: number;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ amount, onSuccess, onError }) => {
  const handlePayment = async () => {
    const lineItems = [
      {
        price_data: {
          currency: 'usd',
          product_data: { name: 'Sample Product' },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      },
    ];

    try {
      const response = await fetch('https://deeply-wistful-columnist.glitch.me/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lineItems }),
      });

      if (!response.ok) throw new Error('Failed to create checkout session');

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
        onSuccess(data);
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error: any) {
      onError(error);
    }
  };

  return (
    <button onClick={handlePayment}>
      Pay ${amount}
    </button>
  );
};

export default PaymentButton;