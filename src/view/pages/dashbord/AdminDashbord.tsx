import "./AdminDashbord.css";

import  {useEffect, useState} from "react";

import type {OrderData} from "../../../model/orderData.ts";
import axios from "axios";
import {backendApi} from "../../../../api.ts";
import type {BookData} from "../../../model/bookData.ts";
import type {UserData} from "../../../model/userData.ts";


const AdminDashboard = () => {
    const [orders, setOrders] = useState<OrderData[]>([]);
    const [books, setBooks] = useState<BookData[]>([]);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<UserData[]>([]);
    const fetchUsers = async () => {
        try {
            const res = await backendApi.get("/admin/users");
            setUsers(res.data);
        } catch (err) {
            console.error("Failed to fetch users", err);
        }
    };

    const fetchBooks = async () => {
        try {
            const res = await backendApi.get("admin/book");
            setBooks(res.data);
        } catch (err) {
            console.error("Failed to fetch books", err);
        }
    };
    const fetchOrders = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await axios.get("http://localhost:3000/api/order/all", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setOrders(res.data.orders || []);
        } catch (err: any) {
            console.error("Failed to fetch orders:", err.response?.data || err.message);
            alert("Failed to fetch orders: " + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
        fetchBooks();
        fetchUsers();
    }, []);


    if (loading)
        return (
            <p className="text-center mt-10 text-gray-500 text-lg font-medium">
                Loading orders...
            </p>
        );

    if (orders.length === 0)
        return (
            <p className="text-center mt-10 text-gray-500 text-lg font-medium">
                No orders found.
            </p>
        );
    return (
        <div className="dashboard">


            <main className="main-content ">
                <h1 className="page-title">Dashboard Overview</h1>
                <div className="cards">
                    <div className="card">
                        <h2>{users.length}</h2>
                        <p>Registered Users</p>
                    </div>
                    <div className="card">
                        <h2>{books.length}</h2>
                        <p>Total Books</p>
                    </div>
                    <div className="card">
                        <h2>{orders.length}</h2>
                        <p>All Orders </p>
                    </div>
                </div>
                <table className="min-w-full border rounded mt-6">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3">Name</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Phone</th>
                        <th className="p-3">Address</th>
                        <th className="p-3">Qty</th>
                        <th className="p-3">Price</th>

                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                    {orders.map((order) => (
                        <tr
                            key={order._id}
                            className="hover:bg-indigo-50 transition-colors duration-200"
                        >

                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {order.fullName}
                            </td>
                            <td
                                className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 underline cursor-pointer truncate max-w-xs"
                                title={order.email}
                            >
                                {order.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {order.phone}
                            </td>
                            <td
                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 truncate max-w-xs"
                                title={order.shippingAddress}
                            >
                                {order.shippingAddress}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <span
                      className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded-full">
                    {order.items.length} item{order.items.length > 1 ? "s" : ""}
                  </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-right text-indigo-700">
                                Rs.{order.total.toFixed(2)}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default AdminDashboard;
