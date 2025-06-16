import React from 'react';

interface PaymentButtonProps {
  amount: number;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ amount, onSuccess, onError }) => {
  const handlePayment = async () => {
    try {
      // Call your backend to create a Stripe Checkout session
      const response = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }), // Pass amount if your backend expects it
      });

      const data = await response.json();

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error('No Stripe URL returned');
      }
    } catch (error) {
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