import React, { useEffect, useState } from "react";
import { HiPencil, HiTrash } from "react-icons/hi";
import CreateUserModal from "./CreateUserModal";
import UpdateUserModal from "./UpdateUserModal";
import { backendApi } from "../../../../../api.ts";
import type { UserData } from "../../../../model/userData.ts";

const AdminUsersPage: React.FC = () => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [editingUser, setEditingUser] = useState<UserData | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const fetchUsers = async () => {
        try {
            const res = await backendApi.get("/admin/users");
            setUsers(res.data);
        } catch (err) {
            console.error("Failed to fetch users", err);
        }
    };

    const handleDelete = async (email: string) => {
        try {
            await backendApi.delete(`/admin/users/delete/${email}`);
            fetchUsers();
        } catch (err) {
            console.error("Failed to delete user", err);
        }
    };


    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">User Management</h2>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    + Add User
                </button>
            </div>

            <table className="min-w-full border rounded">
                <thead className="bg-gray-100">
                <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id} className="border-t hover:bg-gray-50">
                        <td className="p-3">{user.name}</td>
                        <td className="p-3">{user.email}</td>
                        <td className="p-3 capitalize">{user.role}</td>
                        <td className="p-3 space-x-2">
                            <button
                                onClick={() => setEditingUser(user)}
                                className="text-blue-500"
                            >
                                <HiPencil />
                            </button>
                            <button
                                onClick={() => handleDelete(user.email)}
                                className="text-red-500"
                            >
                                <HiTrash />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {showCreateModal && (
                <CreateUserModal
                    onClose={() => {
                        setShowCreateModal(false);
                        fetchUsers();
                    }}
                />
            )}

            {editingUser && (
                <UpdateUserModal
                    user={editingUser}
                    onClose={() => {
                        setEditingUser(null);
                        fetchUsers();
                    }}
                />
            )}
        </div>
    );
};

export default AdminUsersPage;
