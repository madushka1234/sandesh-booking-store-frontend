import { Routes, Route } from "react-router-dom";

import AdminDashboard from "../../dashbord/AdminDashbord.tsx";
import AdminUsersPage from "../../admin/users/AdminUsersPage.tsx";
import AdminBooksPage from "../../admin/book/AdminBooksPage.tsx";
import Order from "../../admin/order/Order.tsx";




export function AdminContext() {
    return (
        <Routes>
            <Route path="" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="book" element={<AdminBooksPage />} />
            <Route path="order" element={<Order />} />
        </Routes>
    );
}
