import "./Header.scss";
import DarkMode from "../../components/Switch/Switch";
import around from "../../assets/icons/around.svg";

import heart from "../../assets/icons/heart.svg";
import buy from "../../assets/icons/buy.svg";
import avatar from "../../assets/images/avatar.avif";
import documents from "../../assets/icons/document.svg";
import close from "../../assets/icons/close.svg";

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Logo from "../../components/Logo/Logo";
import { Link } from "react-router-dom";
import Search from "../../components/Search/Search";

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
    const [open, setOpen] = React.useState(false);
    const [wrapper, setWrapper] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const toggleDialog = () => {
        setWrapper(!wrapper);
    };
    const DrawerList = () => (
        <Box
            className="box"
            height={100000}
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <div className="close">
                            <button className="close-left">
                                <img src={close} alt="" className="close-left__icons" />
                            </button>

                            <a href="#" className="close-btn">
                                <img src={buy} alt="" className="close-btn__icons" />
                                <span className="close-btn__title">Card</span>
                                <span className="close-btn__qnt">3</span>
                            </a>

                            <a href="#" className="close-btn">
                                <img src={heart} alt="" className="close-btn__icons" />
                                <span className="close-btn__title">Card</span>
                                <span className="close-btn__qnt">3</span>
                            </a>
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

                    {/* Action */}
                    <div className="top-action">
                        <div className="top-action__group top-action__group-double">
                            <button className="top-action__btn">
                                <img src={heart} alt="heart" className="top-action__icon icon" />
                                <span className="top-action__title">03</span>
                            </button>
                            <div className="top-action__rectangle"></div>
                            <button className="top-action__btn">
                                <img src={buy} alt="buy" className="top-action__icon icon" />
                                <span className="top-action__title">$65.42</span>
                            </button>
                        </div>
                        {/* Avatar */}
                        <div className="top-action__avatar">
                            <img src={avatar} alt="" className="top-action__avatar-image" onClick={toggleDialog} />
                            {/* Dialog */}
                            <div id="dialog" className={`${wrapper ? "" : "dialog__hidden"} dialog`}>
                                <div className="dialog__info">
                                    <img src={avatar} alt="" className="dialog__avatar" />
                                    <p className="dialog__name">Bàn Văn Việt</p>
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
                                        <Link to="#!" className="dialog__link">
                                            Đăng xuất
                                        </Link>
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
                </div>
            </Box>
        </header>
    );
}
