import React, { useState } from "react";
import type { UserData } from "../../../../model/userData.ts";
import { backendApi } from "../../../../../api.ts";

interface Props {
    user: UserData;
    onClose: () => void;
}

const UpdateUserModal: React.FC<Props> = ({ user, onClose }) => {
    const [form, setForm] = useState({
        name: user.name,
        email: user.email,
        role: user.role,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await backendApi.put(`/admin/users/update/${user.email}`, form);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Edit User
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="name"
                        value={form.name}
                        placeholder="Full Name"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="email"
                        value={form.email}
                        placeholder="Email Address"
                        type="email"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={handleChange}
                        required
                    />
                    <select
                        name="role"
                        value={form.role}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={handleChange}
                    >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </select>
                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateUserModal;
