import { Link, useNavigate } from "react-router-dom";
import { FaBook, FaClipboardList, FaUsers } from "react-icons/fa";
import {useEffect} from "react";


const AdminNavbar = () => {


    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const goToDashbord = () => {
        navigate("/admin");
    };
    return (
        <div className="admin-navbar">
            <aside className="bg-gray-800 text-white w-44 min-h-screen p-6 shadow-md fixed">
                <div>
                <h2 className="text-2xl font-bold mb-8 cursor-pointer" onClick={goToDashbord}>📚 Pavithra Admin </h2>

                </div>
                <nav>
                    <ul className="space-y-4">

                        <li>
                            <Link
                                to="/admin/users"
                                className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded transition"
                            >
                                <FaUsers/> Users
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/book"
                                className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded transition"
                            >
                                <FaBook/> Books
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/order"
                                className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded transition"
                            >
                                <FaClipboardList/> Orders
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                className="w-full py-2 mt-6 bg-red-600 hover:bg-red-700 text-white rounded"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>
        </div>
    );
};

export default AdminNavbar;
