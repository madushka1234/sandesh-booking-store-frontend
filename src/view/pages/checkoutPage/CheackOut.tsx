import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../store/store";
import { clearCart } from "../../../slices/cartSlice";

import {backendApi} from "../../../../api.ts";
import {useNavigate} from "react-router-dom";

export function Checkout() {
    const { books } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();

    const [address, setAddress] = useState({
        fullName: "",
        email: "",
        phone: "",
        shippingAddress: "",
    });
    const navigate = useNavigate();
    const total = books.reduce((sum, item) => sum + (item.books.price || 0) * item.booksCount, 0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const orderPayload = {
            fullName: address.fullName,
            email: address.email,
            phone: address.phone,
            shippingAddress: address.shippingAddress,
            items: books.map((item) => ({
                bookId: item.books._id,
                title: item.books.title,
                price: item.books.price,
                quantity: item.booksCount,
            })),
            total,
        };
        const token = localStorage.getItem("token")
        try {
            const response =  await backendApi.post("/admin/customer/order/checkout", orderPayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            console.log("Order successful:", response.data);

            alert(`Thank you for your order! Total: ${total.toFixed(2)} LKR`);

            dispatch(clearCart());
        } catch (err: any) {
            if (err.response?.status === 401) {
                alert("You are not logged in. Please log in to place an order.");
                navigate("/login");
                return;
            }
            console.error("Failed to place order", err);
            alert("Order failed. Please try again.");
        }

    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-8">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">Cash On Delivery (COD)</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        required
                        type="text"
                        placeholder="Full Name"
                        value={address.fullName}
                        onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    />
                    <input
                        required
                        type="email"
                        placeholder="Email"
                        value={address.email}
                        onChange={(e) => setAddress({ ...address, email: e.target.value })}
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    />
                    <input
                        required
                        type="tel"
                        placeholder="Phone Number"
                        value={address.phone}
                        onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    />
                    <textarea
                        required
                        placeholder="Shipping Address"
                        value={address.shippingAddress}
                        onChange={(e) => setAddress({ ...address, shippingAddress: e.target.value })}
                        className="w-full border border-gray-300 rounded px-4 py-2 h-24"
                    />
                    <div className="flex justify-between mt-6 items-center">
                        <span className="text-lg font-semibold text-indigo-800">
                            Total: {total.toFixed(2)} LKR
                        </span>
                        <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded shadow"
                        >
                            Place Order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
