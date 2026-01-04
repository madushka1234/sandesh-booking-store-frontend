export interface OrderItem {
    _id: string;
    bookId: string;
    title: string;
    price: number;
    quantity: number;
}

export interface OrderData {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    shippingAddress: string;
    items: OrderItem[];
    total: number;

}
