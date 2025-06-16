import axios from 'axios';

type PaymentDetails = {
  amount: number;
  // Add other fields as needed
};

type PaymentResponse =
  | { transactionId: string }
  | { error: string };

const PAYMENT_API_URL = '/api/payment'; // Replace with your real endpoint

export const processPayment = async (paymentDetails: PaymentDetails): Promise<PaymentResponse> => {
    try {
        const response = await axios.post(PAYMENT_API_URL, paymentDetails);
        return {
            transactionId: response.data.transactionId,
        };
    } catch (error) {
        return {
            error: (error as any).response?.data?.message || 'Payment processing failed',
        };
    }
};