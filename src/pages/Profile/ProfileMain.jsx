import Button from "../../components/Button/Button";
import address from "../../assets/icons/address.svg";
import communication from "../../assets/icons/communications.svg";
import add from "../../assets/icons/add.svg";
import phone from "../../assets/icons/phone.svg";
import payment1 from "../../assets/images/payment1.png";
import payment2 from "../../assets/images/payment2.png";
import product1 from "../../assets/images/product1.png";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../hooks/UserContextUser";
import { Link } from "react-router-dom";

const ProfileMain = () => {
    const [user, setUser] = useState({});
    const { userData } = useContext(UserContext);
    useEffect(() => {
        setUser(userData);
    }, [userData]);
    return (
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
                        <Link to={`/profile/update/${user._id}`}>
                            <div>
                                <p className="account-item__email-title">Email Address</p>
                                <p className="account-item__email">{user.email}</p>{" "}
                            </div>
                        </Link>
                    </section>
                    <section className="account-item">
                        <div className="account-item__icon">
                            <img src={phone} alt="" />
                        </div>
                        <Link to={`/profile/update/${user._id}`}>
                            <div>
                                <p className="account-item__email-title">Phone number</p>
                                <p className="account-item__email">{user.phone}</p>
                            </div>
                        </Link>
                    </section>
                    <section className="account-item">
                        <div className="account-item__icon">
                            <img src={address} alt="" />
                        </div>
                        <Link to={`/profile/update/${user._id}`}>
                            <div>
                                <p className="account-item__email-title">Add an address</p>
                                <p className="account-item__email">{user.address}</p>
                            </div>
                        </Link>
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
                            <h3 className="profile-item__title">Coffee Beans - Espresso Arabica and Robusta Beans</h3>
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
                            <h3 className="profile-item__title">Coffee Beans - Espresso Arabica and Robusta Beans</h3>
                            <div className="profile-item__cost">
                                <p className="profile-item__price">$47.00</p>
                                <Button title={"Add to cart"} className="profile-item__btn" />
                            </div>
                        </div>
                    </section>
                </article>
            </div>
        </div>
    );
};
export default ProfileMain;
