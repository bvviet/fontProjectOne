import "./style.scss";
import { useContext, useEffect, useState } from "react";
import logoAdmin from "../../../assets/icons/logoAdmin.svg";
import { NavLink, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

import { UserContext } from "../../../hooks/UserContextUser";
const Sidebar = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const userData = useContext(UserContext);
    useEffect(() => {
        setUser(userData);
    }, [userData]);

    return (
        <div className="sidebar">
            <NavLink to="/admin">
                <img src={logoAdmin} alt="Admin Logo" className="sidebar-logo" />
            </NavLink>
            <ul className="sidebar__list">
                <li className="sidebar__item">
                    <NavLink
                        to="/admin/list"
                        className={({ isActive }) => `sidebar__link ${isActive ? "sidebar__link--active" : ""}`}
                    >
                        <img src="" alt="" />
                        List Product
                    </NavLink>
                </li>
                <li className="sidebar__item">
                    <NavLink
                        to="/admin/add"
                        className={({ isActive }) => `sidebar__link ${isActive ? "sidebar__link--active" : ""}`}
                    >
                        <img src="" alt="" />
                        Add Product
                    </NavLink>
                </li>
                <li className="sidebar__item">
                    <NavLink
                        to="/admin/users"
                        className={({ isActive }) => `sidebar__link ${isActive ? "sidebar__link--active" : ""}`}
                    >
                        <img src="" alt="" />
                        List User
                    </NavLink>
                </li>
            </ul>
            <div className="info-admin">
                <Avatar alt="V" src="/static/images/avatar/1.jpg" />
                <p className="info-admin__name">{user?.userName}</p>
            </div>
            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/");
                }}
                className="logout-admin"
            >
                Đăng xuất
            </button>
        </div>
    );
};

export default Sidebar;
