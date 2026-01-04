

import AdminNavbar from "../navbar/AdminNavbar.tsx";


import {AdminContext} from "../AdminContext/AdminContext.tsx";

const AdminLayout = () => {
    return (
        <div className="admin-layout">
            <AdminNavbar/>
            <div className="ml-44 p-2 ">
                <AdminContext/>
            </div>
        </div>
    );
};

export default AdminLayout;
