import React, { useEffect, useState } from 'react';

export default function Success() {
  const [session, setSession] = useState(null);
  const [lineItems, setLineItems] = useState([]);
  const [error, setError] = useState(null);

  // Get session_id from the URL
  const sessionId = new URLSearchParams(window.location.search).get('session_id');

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch(`http://localhost:4242/checkout-session?session_id=${sessionId}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setSession(data);
      } catch (err) {
        setError('Could not fetch session details.');
      }
    };

    const fetchLineItems = async () => {
      try {
        const res = await fetch(`http://localhost:4242/checkout-session/line-items?session_id=${sessionId}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setLineItems(data.data || []);
      } catch (err) {
        setError('Could not fetch line items.');
      }
    };

    if (sessionId) {
      fetchSession();
      fetchLineItems();
    } else {
      setError('No session ID found in URL.');
    }
  }, [sessionId]);

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1>Thank you for your purchase!</h1>
      <p>Payment Status: <b>{session.payment_status}</b></p>
      <p>Amount Paid: <b>{(session.amount_total / 100).toFixed(2)} {session.currency?.toUpperCase()}</b></p>
      <h2>Order Details:</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {lineItems.length === 0 && <li>No products found.</li>}
        {lineItems.map(item => (
          <li key={item.id}>
            {item.description} x {item.quantity}
          </li>
        ))}
      </ul>
      <p>A confirmation email has been sent to <b>{session.customer_email}</b>.</p>
      <a href="/" style={{ display: 'inline-block', marginTop: '2rem', fontSize: '1.1rem' }}>
        Return to Home
      </a>
    </div>
  );
}