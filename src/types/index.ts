export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

export interface PaymentResponse {
    success: boolean;
    message: string;
    transactionId?: string;
}