import React, { useState } from 'react';
import PaymentButton from '../components/PaymentButton';

const Checkout: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentError, setPaymentError] = useState('');

    const handlePaymentSuccess = () => {
        setPaymentSuccess(true);
        setPaymentError('');
    };

    const handlePaymentError = (error: string) => {
        setPaymentError(error);
        setPaymentSuccess(false);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Additional form submission logic can be added here
    };

    return (
        <div>
            <h1>Checkout</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Address:</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <PaymentButton
                    amount={50}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                />
            </form>
            {paymentSuccess && <p>Payment processed successfully!</p>}
            {paymentError && <p>Error processing payment: {paymentError}</p>}
        </div>
    );
};

export default Checkout;