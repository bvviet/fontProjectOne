import "./style.scss";
import { useContext, useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";

import { UserContext } from "../../hooks/UserContextUser";

import Button from "../../components/Button/Button";
import avatar from "../../assets/images/avatar.avif";
import person from "../../assets/icons/person.svg";
import address from "../../assets/icons/address.svg";
import communication from "../../assets/icons/communications.svg";
import dowload from "../../assets/icons/dowload.svg";
import heart from "../../assets/icons/heart.svg";
import gift from "../../assets/icons/gift.svg";
import protection from "../../assets/icons/protection.svg";
import help from "../../assets/icons/help.svg";
import danger from "../../assets/icons/danger.svg";
import add from "../../assets/icons/add.svg";
import phone from "../../assets/icons/phone.svg";
import payment1 from "../../assets/images/payment1.png";
import payment2 from "../../assets/images/payment2.png";
import product1 from "../../assets/images/product1.png";

const Profile = () => {
    const [user, setUser] = useState({});
    const userData = useContext(UserContext);
    useEffect(() => {
        setUser(userData);
    }, [userData]);

    return (
        <Box
            sx={{
                px: {
                    xs: "16px", // padding cho kích thước rất nhỏ (extra-small)
                    sm: "20px", // padding cho kích thước nhỏ (small)
                    md: "30px", // padding cho kích thước trung bình (medium)
                    lg: "50px", // padding cho kích thước lớn (large)
                    xl: "50px", // padding cho kích thước rất lớn (extra-large)
                },
                backgroundColor: "var(--bg-main)",
                padding: "25px 0",
            }}
        >
            <Grid
                container
                rowSpacing={0}
                columnSpacing={{ sm: "50px" }}
                columns={{ xs: 6, md: 12, lg: 12 }}
                className="content"
            >
                {/* Profile left */}
                <Grid item xs={6} sm={4}>
                    <div className="profile">
                        <div className="profile-info">
                            <img src={avatar} alt="" className="profile-info__image" />
                            <h1 className="profile-info__name">{user?.userName}</h1>
                            {user && user.createdAt && (
                                <p className="profile-info__desc">
                                    Registered: {new Date(user.createdAt).toDateString()}
                                </p>
                            )}
                        </div>

                        {/* Profile menu 1*/}
                        <div className="profile-menu">
                            <h3 className="profile-menu__title">Manage Account</h3>
                            <ul className="profile-menu__list">
                                <li>
                                    <a href="#!" className="profile-menu__link">
                                        <span className="profile-menu__icon">
                                            <img src={person} alt="" />
                                        </span>
                                        Personal info
                                    </a>
                                </li>
                                <li>
                                    <a href="#!" className="profile-menu__link">
                                        <span className="profile-menu__icon">
                                            <img src={address} alt="" />
                                        </span>
                                        Addresses
                                    </a>
                                </li>
                                <li>
                                    <a href="#!" className="profile-menu__link">
                                        <span className="profile-menu__icon">
                                            <img src={communication} alt="" />
                                        </span>
                                        Communications & privacy
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Profile menu 2*/}
                        <div className="profile-menu">
                            <h3 className="profile-menu__title">My items</h3>
                            <ul className="profile-menu__list">
                                <li>
                                    <a href="#!" className="profile-menu__link">
                                        <span className="profile-menu__icon">
                                            <img src={dowload} alt="" />
                                        </span>
                                        Reorder
                                    </a>
                                </li>
                                <li>
                                    <a href="#!" className="profile-menu__link">
                                        <span className="profile-menu__icon">
                                            <img src={heart} alt="" />
                                        </span>
                                        Lists
                                    </a>
                                </li>
                                <li>
                                    <a href="#!" className="profile-menu__link">
                                        <span className="profile-menu__icon">
                                            <img src={gift} alt="" />
                                        </span>
                                        Registries
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Profile menu 3*/}
                        <div className="profile-menu">
                            <h3 className="profile-menu__title">Subscriptions & plans</h3>
                            <ul className="profile-menu__list">
                                <li>
                                    <a href="#!" className="profile-menu__link">
                                        <span className="profile-menu__icon">
                                            <img src={protection} alt="" />
                                        </span>
                                        Protection plans
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Profile menu 4*/}
                        <div className="profile-menu">
                            <h3 className="profile-menu__title">Customer Service</h3>
                            <ul className="profile-menu__list">
                                <li>
                                    <a href="#!" className="profile-menu__link">
                                        <span className="profile-menu__icon">
                                            <img src={help} alt="" />
                                        </span>
                                        Help
                                    </a>
                                </li>
                                <li>
                                    <a href="#!" className="profile-menu__link">
                                        <span className="profile-menu__icon">
                                            <img src={danger} alt="" />
                                        </span>
                                        Terms of Use
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Grid>
                {/* Profile right */}
                <Grid item xs={6} sm={8} className="profile-right">
                    <div className="profile-right__content">
                        {/* Payment */}
                        <div className="payment">
                            <h2 className="profile-title">My Wallet</h2>
                            <p className="profile-desc">Payment methods</p>
                            <div className="payment-card">
                                <img src={payment1} alt="payment1" />
                                <img src={payment2} alt="payment2" />
                                <div className="payment-card__add">
                                    <img src={add} alt="" className="payment-card__icon" />
                                    <p className="payment-card__title">Add New Card</p>
                                </div>
                            </div>
                        </div>

                        {/* Account info */}
                        <div className="account">
                            <h2 className="profile-title">My Wallet</h2>
                            <p className="profile-desc">Payment methods</p>
                            <div className="account-list">
                                <section className="account-item">
                                    <div className="account-item__icon">
                                        <img src={communication} alt="" />
                                    </div>
                                    <div>
                                        <p className="account-item__email-title">Email Address</p>
                                        <p className="account-item__email">tarek97.ta@gmail.com</p>
                                    </div>
                                </section>
                                <section className="account-item">
                                    <div className="account-item__icon">
                                        <img src={phone} alt="" />
                                    </div>
                                    <div>
                                        <p className="account-item__email-title">Phone number</p>
                                        <p className="account-item__email">+000 11122 2345 657</p>
                                    </div>
                                </section>
                                <section className="account-item">
                                    <div className="account-item__icon">
                                        <img src={address} alt="" />
                                    </div>
                                    <div>
                                        <p className="account-item__email-title">Add an address</p>
                                        <p className="account-item__email">Bangladesh Embassy, Washington, DC 20008</p>
                                    </div>
                                </section>
                            </div>
                        </div>

                        {/* List */}
                        <div className="list">
                            <h2 className="profile-title">Lists</h2>
                            <p className="profile-desc">2 items - Primary</p>

                            {/* item 1 */}
                            <article className="profile-list">
                                <section className="profile-item">
                                    <div className="profile-item__img">
                                        <img src={product1} alt="" />
                                    </div>
                                    <div>
                                        <h3 className="profile-item__title">
                                            Coffee Beans - Espresso Arabica and Robusta Beans
                                        </h3>
                                        <div className="profile-item__cost">
                                            <p className="profile-item__price">$47.00</p>
                                            <Button title={"Add to cart"} className="profile-item__btn" />
                                        </div>
                                    </div>
                                </section>
                            </article>

                            <div className="profile-list__stock"></div>

                            {/* item 2 */}
                            <article className="profile-list">
                                <section className="profile-item">
                                    <div className="profile-item__img">
                                        <img src={product1} alt="" />
                                    </div>
                                    <div>
                                        <h3 className="profile-item__title">
                                            Coffee Beans - Espresso Arabica and Robusta Beans
                                        </h3>
                                        <div className="profile-item__cost">
                                            <p className="profile-item__price">$47.00</p>
                                            <Button title={"Add to cart"} className="profile-item__btn" />
                                        </div>
                                    </div>
                                </section>
                            </article>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Profile;
