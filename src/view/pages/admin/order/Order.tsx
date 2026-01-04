
import React, { useEffect, useState } from "react";
import axios from "axios";
import type { OrderData } from "../../../../model/orderData";

const Order: React.FC = () => {
    const [orders, setOrders] = useState<OrderData[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await axios.get("http://localhost:5001/api/order/all", {
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
    }, []);

    if (loading) {
        return <p className="text-center mt-10 text-gray-500">Loading orders...</p>;
    }

    if (orders.length === 0) {
        return <p className="text-center mt-10 text-gray-500">No orders found.</p>;
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Order Management</h1>

            <table className="min-w-full border rounded shadow-sm">
                <thead className="bg-gray-100">
                <tr>
                    <th className="p-3 text-left">Order ID</th>
                    <th className="p-3 text-left">Customer</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Phone</th>
                    <th className="p-3 text-left max-w-xs">Shipping Address</th>
                    <th className="p-3 text-left">Items</th>
                    <th className="p-3 text-left">Total (Rs.)</th>

                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order._id} className="border-t hover:bg-gray-50 align-top">
                        <td className="p-3">{order._id}</td>
                        <td className="p-3">{order.fullName}</td>
                        <td className="p-3">{order.email}</td>
                        <td className="p-3">{order.phone}</td>
                        <td className="p-3 max-w-xs truncate">{order.shippingAddress}</td>
                        <td className="p-3 max-w-sm">
                            <ul className="list-disc list-inside text-sm">
                                {order.items.map((item) => (
                                    <li key={item._id}>
                                        {item.title} — {item.quantity} × Rs.{item.price}
                                    </li>
                                ))}
                            </ul>
                        </td>
                        <td className="p-3 font-semibold">{order.total.toFixed(2)}</td>

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Order;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import type { OrderData } from "../../../../model/orderData";

// const Order: React.FC = () => {
//     const [orders, setOrders] = useState<OrderData[]>([]);
//     const [loading, setLoading] = useState(true);

//     const fetchOrders = async () => {
//         const token = localStorage.getItem("token");
//         try {
//             const res = await axios.get("http://localhost:5001/api/order/all", {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setOrders(res.data.orders || []);
//         } catch (err: any) {
//             console.error("Failed to fetch orders:", err.response?.data || err.message);
//             alert("Failed to fetch orders: " + (err.response?.data?.message || err.message));
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchOrders();
//     }, []);

//     if (loading)
//         return (
//             <p className="text-center mt-10 text-gray-500 text-lg font-medium">
//                 Loading orders...
//             </p>
//         );

//     if (orders.length === 0)
//         return (
//             <p className="text-center mt-10 text-gray-500 text-lg font-medium">
//                 No orders found.
//             </p>
//         );

//     return (
//         <div className="max-w-7xl mx-auto p-6">
//             <h1 className="text-4xl font-extrabold text-indigo-600 mb-8 text-center">
//                 Order Management
//             </h1>

//             <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
//                 <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-indigo-50">
//                     <tr>
//                         <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-700 uppercase tracking-wider">
//                             Order ID
//                         </th>
//                         <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-700 uppercase tracking-wider">
//                             Customer
//                         </th>
//                         <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-700 uppercase tracking-wider">
//                             Email
//                         </th>
//                         <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-700 uppercase tracking-wider">
//                             Phone
//                         </th>
//                         <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-700 uppercase tracking-wider max-w-xs">
//                             Shipping Address
//                         </th>
//                         <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-700 uppercase tracking-wider">
//                             Items
//                         </th>
//                         <th className="px-6 py-3 text-right text-sm font-semibold text-indigo-700 uppercase tracking-wider">
//                             Total (Rs.)
//                         </th>
//                     </tr>
//                     </thead>

//                     <tbody className="bg-white divide-y divide-gray-100">
//                     {orders.map((order) => (
//                         <tr
//                             key={order._id}
//                             className="hover:bg-indigo-50 transition-colors duration-200"
//                         >
//                             <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-700">
//                                 {order._id}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                                 {order.fullName}
//                             </td>
//                             <td
//                                 className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 underline cursor-pointer truncate max-w-xs"
//                                 title={order.email}
//                             >
//                                 {order.email}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                                 {order.phone}
//                             </td>
//                             <td
//                                 className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 truncate max-w-xs"
//                                 title={order.shippingAddress}
//                             >
//                                 {order.shippingAddress}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                   <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded-full">
//                     {order.items.length} item{order.items.length > 1 ? "s" : ""}
//                   </span>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-right text-indigo-700">
//                                 Rs.{order.total.toFixed(2)}
//                             </td>
//                         </tr>
//                     ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default Order;
