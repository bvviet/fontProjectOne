/* eslint-disable react/prop-types */
// import avatar from "../../assets/images/avatar.avif";
import person from "../../assets/icons/person.svg";
import address from "../../assets/icons/address.svg";
import communication from "../../assets/icons/communications.svg";
import dowload from "../../assets/icons/dowload.svg";
import heart from "../../assets/icons/heart.svg";
import gift from "../../assets/icons/gift.svg";
import protection from "../../assets/icons/protection.svg";
import help from "../../assets/icons/help.svg";
import danger from "../../assets/icons/danger.svg";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProfileLeft = ({ user }) => {
    return (
        <Grid item xs={6} sm={3.5}>
            <div className="profile">
                <div className="profile-info">
                    <img src={user.avatar} alt="" className="profile-info__image" />
                    <h1 className="profile-info__name">{user?.userName}</h1>
                    {user && user.createdAt && (
                        <p className="profile-info__desc">Registered: {new Date(user.createdAt).toDateString()}</p>
                    )}
                </div>

                {/* Profile menu 1*/}
                <div className="profile-menu">
                    <h3 className="profile-menu__title">Manage Account</h3>
                    <ul className="profile-menu__list">
                        <li>
                            <Link to={`/profile/update/${user._id}`} className="profile-menu__link">
                                <span className="profile-menu__icon">
                                    <img src={person} alt="" />
                                </span>
                                Personal info
                            </Link>
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
    );
};
export default ProfileLeft;
