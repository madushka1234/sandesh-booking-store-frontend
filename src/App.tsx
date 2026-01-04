import { Route, Routes } from "react-router-dom";

import AdminLayout from "./view/pages/common/AdminLayout/AdminLayout.tsx";
import { AdminContext } from "./view/pages/common/AdminContext/AdminContext.tsx";
import { Login } from "./view/pages/Log.tsx";
import Register from "./view/pages/Register.tsx";
import { DefaultLayout } from "./view/pages/common/DefaultLayout/DefaultLayout.tsx";

function App() {
    return (
        <Routes>
            <Route path="*" element={<DefaultLayout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/admin/*" element={<AdminLayout />}>

                <Route path="" element={<AdminContext />} />
            </Route>
        </Routes>
    );
}

export default App;
