import "./styleAdmin.scss";
import { Outlet } from "react-router-dom";
import HeaderAdmin from "../../../../Admin/Layout/Header/HeaderAdmin";
import Sidebar from "../../../../Admin/Layout/Sidebar/Sidebar";
const AdminLayout = () => {
    return (
        <div className="main">
            <Sidebar />
            <div className="content">
                <HeaderAdmin />
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
