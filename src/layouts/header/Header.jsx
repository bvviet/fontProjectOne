import "./Header.scss";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

import DarkMode from "../../components/Switch/Switch";
import { UserContext } from "../../hooks/UserContextUser";

import heart from "../../assets/icons/heart.svg";
import buy from "../../assets/icons/buy.svg";
import avatar from "../../assets/images/avatar.avif";
import documents from "../../assets/icons/document.svg";
import close from "../../assets/icons/close.svg";
import around from "../../assets/icons/around.svg";
import Logo from "../../components/Logo/Logo";
import Search from "../../components/Search/Search";
import { OrderContext } from "../../hooks/OrderContext";

const NavBar = () => (
    <ul className="navbar">
        <li className="navbar__item">
            <a href="#" className="navbar__link">
                Departments
            </a>
            <img src={around} alt="" className="navbar__around icon" />
        </li>
        <li className="navbar__item">
            <a href="#" className="navbar__link">
                Grocery
            </a>
            <img src={around} alt="" className="navbar__around icon" />
        </li>
        <li className="navbar__item">
            <a href="#" className="navbar__link">
                Beauty
            </a>
            <img src={around} alt="" className="navbar__around icon" />
        </li>
    </ul>
);

export default function Header() {
    const [open, setOpen] = useState(false);
    const [wrapper, setWrapper] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { total, sumQuantity } = useContext(OrderContext);
    // Lấy thông tin người dùng
    const { userData, setUserData, setUserId } = useContext(UserContext);
    useEffect(() => {
        setUser(userData);
    }, [userData]);

    // Lấy token
    const token = localStorage.getItem("token");

    // Đăng xuất
    const handleLogOut = () => {
        setUserData([]);
        setUserId("");
        localStorage.removeItem("token");
        navigate("/login");
    };

    // Ẩn hiện menu điện thoại
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    // Ẩn hiện popper profile
    const toggleDialog = () => {
        setWrapper(!wrapper);
    };

    // Nội dung menu điện thoại
    const DrawerList = () => (
        <Box className="box" height={100000} sx={{ width: 250 }} role="presentation" onKeyDown={toggleDrawer(false)}>
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <div className="close">
                            <button onClick={toggleDrawer(false)} className="close-left">
                                <img src={close} alt="" className="close-left__icons" />
                            </button>

                            <Link to="/addToCard" className="close-btn">
                                <img src={buy} alt="" className="close-btn__icons" />
                                <span className="close-btn__title">Card</span>
                                <span className="close-btn__qnt">{sumQuantity}</span>
                            </Link>

                            <Link to="/favorite" className="close-btn">
                                <img src={heart} alt="" className="close-btn__icons" />
                                <span className="close-btn__title">Card</span>
                                <span className="close-btn__qnt">3</span>
                            </Link>
                        </div>
                    </ListItemButton>
                </ListItem>
            </List>
            <List>
                <ListItem disablePadding>
                    <ListItemButton className="drawer">
                        <NavBar />
                    </ListItemButton>
                </ListItem>
                <ListItemButton>
                    <DarkMode />
                </ListItemButton>
            </List>
        </Box>
    );

    return (
        <header className="header">
            <Box
                sx={{
                    px: {
                        xs: "16px", // padding cho kích thước rất nhỏ (extra-small)
                        sm: "20px", // padding cho kích thước nhỏ (small)
                        md: "30px", // padding cho kích thước trung bình (medium)
                        lg: "50px", // padding cho kích thước lớn (large)
                        xl: "50px", // padding cho kích thước rất lớn (extra-large)
                    },
                }}
            >
                <div className="containers">
                    {/* More */}
                    <div className="top-bar">
                        <Button onClick={toggleDrawer(true)} className="top-bar__more">
                            <img src={documents} alt="" className="top-bar__more-icon" />
                        </Button>
                        <Drawer open={open} onClose={toggleDrawer(false)}>
                            <DrawerList />
                        </Drawer>
                    </div>

                    {/* Logo */}
                    <Logo />
                    {/* Navbar */}
                    <nav className="nav">
                        <NavBar />
                    </nav>

                    {/* Tìm kiếm */}
                    <Search />

                    {/* Button Đăng ký, đăng nhập */}
                    {!token && (
                        <>
                            <div className="button-list">
                                <Link to="/register" className="button-list__item button-list__item-signUp">
                                    Sign Up
                                </Link>
                                <Link to="/login" className="button-list__item button-list__item-login">
                                    Login
                                </Link>
                            </div>
                        </>
                    )}

                    {/* Action */}
                    {token && (
                        <div className="top-action">
                            <div className="top-action__group top-action__group-double">
                                <Link to={"/favorite"} className="top-action__btn">
                                    <img src={heart} alt="heart" className="top-action__icon icon" />
                                    <span className="top-action__title">03</span>
                                </Link>
                                <div className="top-action__rectangle"></div>
                                <Link to={"/addToCard"} className="top-action__btn">
                                    <img src={buy} alt="buy" className="top-action__icon icon" />
                                    <span className="top-action__title">${total}</span>
                                </Link>
                            </div>

                            {/* Avatar */}
                            <div className="top-action__avatar">
                                <img src={avatar} alt="" className="top-action__avatar-image" onClick={toggleDialog} />

                                {/* Dialog */}
                                <div id="dialog" className={`${wrapper ? "" : "dialog__hidden"} dialog`}>
                                    <div className="dialog__info">
                                        <img src={avatar} alt="" className="dialog__avatar" />
                                        <p className="dialog__name">{user?.userName}</p>
                                    </div>

                                    <hr className="dialog__hr" />

                                    <ul className="dialog__list">
                                        <li className="dialog__item">
                                            <Link to="/profile" className="dialog__link">
                                                Trang cá nhân
                                            </Link>
                                        </li>
                                    </ul>

                                    <hr className="dialog__hr" />
                                    <ul className="dialog__list">
                                        <li className="dialog__item">
                                            <Link to="#!" className="dialog__link">
                                                Viết blog
                                            </Link>
                                            <Link to="#!" className="dialog__link">
                                                Bài viết của tôi
                                            </Link>
                                        </li>
                                    </ul>

                                    <hr className="dialog__hr" />
                                    <ul className="dialog__list">
                                        <li className="dialog__item">
                                            <Link to="#!" className="dialog__link">
                                                Bài viết đã lưu
                                            </Link>
                                        </li>
                                    </ul>

                                    <hr className="dialog__hr" />
                                    <ul className="dialog__list">
                                        <li className="dialog__item">
                                            <Link to="#!" className="dialog__link">
                                                Cài đặt
                                            </Link>
                                        </li>
                                    </ul>

                                    <hr className="dialog__hr" />
                                    <ul className="dialog__list">
                                        <li className="dialog__item">
                                            <Link to="/admin" className="dialog__link">
                                                Trang quản trị
                                            </Link>
                                        </li>
                                    </ul>

                                    <hr className="dialog__hr" />
                                    <ul className="dialog__list">
                                        <li className="dialog__item">
                                            <p onClick={handleLogOut} className="dialog__link">
                                                Đăng xuất
                                            </p>
                                        </li>
                                    </ul>
                                    <hr className="dialog__hr" />
                                    {/* Light Dark */}
                                    <div className="dark-mode">
                                        <DarkMode />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Box>
        </header>
    );
}
