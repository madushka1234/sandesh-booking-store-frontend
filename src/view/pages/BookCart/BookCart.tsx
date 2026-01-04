import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../../store/store";
import { useState } from "react";
import CryptoJS from "crypto-js";
import "../../../index.css";
import {backendApi} from "../../../../api.ts";

export function BookCart() {
    const { books } = useSelector((state: RootState) => state.cart);
    const navigate = useNavigate();

    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const token = localStorage.getItem("token");

    const totalAmount = books.reduce(
        (sum, item) => sum + (item.books.price || 0) * item.booksCount,
        0
    );

    // ---- PayHere Config ----
    const getMd5 = (input: string) =>
        CryptoJS.MD5(input).toString().toUpperCase();
    const merchantID = "1230013";
    const merchantSecret =
        "Mjg1NjQxNDI3NzI5MTc3NDY4OTcxNjU2NDk2NjMzMzAwNTA2NjkyNw==";

    const orderID = String(new Date().getTime());
    const amountFormatted = totalAmount.toFixed(2);
    const currency = "LKR";
    const hash = getMd5(
        merchantID +
        orderID +
        amountFormatted +
        currency +
        getMd5(merchantSecret)
    );
    function handlePaymentResponse(
        status: string | null,
        orderId: string | null,
        bookId: string | null
    ) {
        console.log(bookId, "bookId");

        if (status === "SUCCESS" && orderId) {
            backendApi
                .post(
                    "/admin/customer/order/checkout",
                    {
                        bookId,
                        paymentStatus: "paid",
                        total: totalAmount,
                        orderId,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((res) => {
                    alert("Order Saved");
                    console.log("Payment saved:", res.data);
                })
                .catch((err) => console.error("Error saving payment:", err));
        } else if (status === "CANCEL") {
            alert("Payment Canceled");
        }

        // Remove query params from URL
        window.history.replaceState({}, document.title, "/");
    }

    const queryParams = new URLSearchParams(window.location.search);
    const status = queryParams.get("status");
    const orderId = queryParams.get("order_id");
    const bookId = queryParams.get("bookId");

    if (status || orderId) {
        handlePaymentResponse(status, orderId, bookId);
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-200 p-6 flex items-start justify-center">
            <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="text-center bg-indigo-700 text-white py-6 text-3xl font-bold">
                    🛒 Your Book Cart
                </div>

                {/* --- Cart Table --- */}
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm sm:text-base text-left">
                        <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th className="px-5 py-4">Image</th>
                            <th className="px-5 py-4">Title</th>
                            <th className="px-5 py-4">Author</th>
                            <th className="px-5 py-4">Qty</th>
                            <th className="px-5 py-4">Price</th>
                            <th className="px-5 py-4">Total</th>
                        </tr>
                        </thead>
                        <tbody className="text-gray-800">
                        {books.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="text-center py-6 bg-indigo-100 text-indigo-700 font-medium"
                                >
                                    Your cart is empty.
                                </td>
                            </tr>
                        ) : (
                            books.map((item, index) => (
                                <tr
                                    key={item.books._id}
                                    className={`${
                                        index % 2 === 0
                                            ? "bg-indigo-50"
                                            : "bg-indigo-100"
                                    } border-b border-indigo-200`}
                                >
                                    <td className="px-5 py-4">
                                        <img
                                            src={`http://localhost:3000/uploads/books/${item.books.photo}`}
                                            alt={item.books.title}
                                            className="w-16 h-20 object-cover rounded-lg shadow"
                                        />
                                    </td>
                                    <td className="px-5 py-4 font-bold">
                                        {item.books.title}
                                    </td>
                                    <td className="px-5 py-4">
                                        {item.books.author}
                                    </td>
                                    <td className="px-5 py-4 text-center">
                                        {item.booksCount}
                                    </td>
                                    <td className="px-5 py-4">
                                        {item.books.price} LKR
                                    </td>
                                    <td className="px-5 py-4 font-semibold text-indigo-800">
                                        {(
                                            item.books.price! *
                                            item.booksCount
                                        ).toFixed(2)}{" "}
                                        LKR
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>

                {books.length > 0 && (
                    <div className="flex justify-between items-center px-6 py-4 bg-indigo-50 border-t border-indigo-200">
                        <span className="text-lg font-bold text-indigo-900">
                            Total: {totalAmount.toFixed(2)} LKR
                        </span>
                        <div className="flex gap-3">
                            <button
                                onClick={() => navigate("/checkout")}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
                            >
                                Cash On Delivery
                            </button>
                            <button
                                onClick={() => setShowPaymentModal(true)}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
                            >
                                Pay with PayHere
                            </button>
                        </div>
                    </div>
                )}

                {showPaymentModal && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-200"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="payhere-title"
                    >
                        {/* Modal */}
                        <div className="w-[22rem] sm:w-[26rem] rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 dark:bg-zinc-900 dark:text-zinc-100 animate-[fadeIn_.2s_ease-out]">
                            {/* Header */}
                            <div className="flex items-start justify-between px-6 pt-5">
                                <h2
                                    id="payhere-title"
                                    className="text-xl font-semibold tracking-tight"
                                >
                                    Payment Required
                                </h2>


                                <button
                                    type="button"
                                    onClick={() => setShowPaymentModal(false)}
                                    className="ml-3 inline-flex size-8 items-center justify-center rounded-full text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:hover:bg-zinc-800"
                                    aria-label="Close"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Body */}
                            <div className="px-6 pb-6 pt-2">
                                <form
                                    method="post"
                                    action="https://sandbox.payhere.lk/pay/checkout"
                                    className="space-y-4"
                                >
                                    <input
                                        type="hidden"
                                        name="merchant_id"
                                        value={merchantID}
                                    />
                                    <input type="hidden" name="return_url"
                                           value="http://localhost:5173/bookCart?status=SUCCESS&bookId=..."/>
                                    <input type="hidden" name="cancel_url"
                                           value="http://localhost:5173/bookCart?status=CANCEL"/>

                                    <input
                                        type="hidden"
                                        name="notify_url"
                                        value="http://localhost:3001/api/payments/notify"
                                    />
                                    <input
                                        type="hidden"
                                        name="order_id"
                                        value={orderID}
                                    />
                                    <input
                                        type="hidden"
                                        name="items"
                                        value="Book Purchase"
                                    />
                                    <input
                                        type="hidden"
                                        name="currency"
                                        value={currency}
                                    />
                                    <input
                                        type="hidden"
                                        name="amount"
                                        value={amountFormatted}
                                    />
                                    <input
                                        type="hidden"
                                        name="hash"
                                        value={hash}
                                    />


                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <input
                                            type="text"
                                            name="first_name"
                                            placeholder="First Name"
                                            className="input"
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="last_name"
                                            placeholder="Last Name"
                                            className="input"
                                            required
                                        />
                                    </div>

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        className="input"
                                        required
                                    />

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <input
                                            type="text"
                                            name="phone"
                                            placeholder="Phone"
                                            className="input"
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="city"
                                            placeholder="City"
                                            className="input"
                                            required
                                        />
                                    </div>

                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Address"
                                        className="input"
                                        required
                                    />

                                    <input
                                        type="text"
                                        name="country"
                                        placeholder="Country"
                                        className="input"
                                        defaultValue="Sri Lanka"
                                        required
                                    />


                                    <div className="flex justify-end gap-2 pt-2">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPaymentModal(false)
                                            }
                                            className="btn btn-ghost"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Pay Now
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
