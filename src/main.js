// Replace with your own Stripe publishable key
const stripe = Stripe('pk_test_YourPublishableKeyHere');

const elements = stripe.elements();
const cardElement = elements.create('card');
cardElement.mount('#card-element');

const form = document.getElementById('payment-form');
const paymentMessage = document.getElementById('payment-message');

const BACKEND_URL = "https://deeply-wistful-columnist.glitch.me";

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  paymentMessage.textContent = "Processing...";

  const amount = 1000; // $10.00 in cents
  const currency = 'usd';

  let clientSecret;
  try {
    const response = await fetch(`${BACKEND_URL}/create-payment-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, currency })
    });

    if (!response.ok) {
      throw new Error('Failed to create PaymentIntent');
    }

    const data = await response.json();
    clientSecret = data.clientSecret;
    if (!clientSecret) throw new Error('No clientSecret returned from backend.');
  } catch (err) {
    paymentMessage.textContent = "Error: " + err.message;
    return;
  }

  // Confirm the card payment
  const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: cardElement,
    }
  });

  if (error) {
    paymentMessage.textContent = `Payment failed: ${error.message}`;
  } else if (paymentIntent && paymentIntent.status === 'succeeded') {
    paymentMessage.textContent = "Payment succeeded!";
    form.reset();
    cardElement.clear();
  } else {
    paymentMessage.textContent = "Payment did not complete.";
  }
});