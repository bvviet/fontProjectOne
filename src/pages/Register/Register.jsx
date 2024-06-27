import "./Register.scss";

import loginBanner from "../../assets/images/login.png";
import google from "../../assets/icons/google.svg";
import message from "../../assets/icons/message.svg";
import lock from "../../assets/icons/lock.svg";
import close from "../../assets/icons/close.svg";
import Button from "../../components/Button/Button";
import Logo from "../../components/Logo/Logo";
import { Link } from "react-router-dom";

const Register = () => {
    return (
        <div className="login">
            <div className="login__left">
                <div className="login__left-content">
                    <img src={loginBanner} alt="" className="login__left-banner" />
                    <p className="login__left-desc">
                        The best of luxury brand values, high quality products, and innovative services
                    </p>
                </div>
            </div>
            <section className="login-main">
                <div className="login-main__content">
                    <Link to="/">
                        <img src={close} alt="" className="close__icon" />
                    </Link>

                    {/* Logo */}
                    <Logo />
                    {/* content */}
                    <div className="login-main__title">
                        <h2 className="login-main__heading">Sign Up</h2>
                        <p className="login-main__desc">
                            Let’s create your account and Shop like a pro and save money.
                        </p>
                    </div>
                    {/* Form */}
                    <form action="" className="login__form">
                        <div className="login-item">
                            <input type="email" placeholder="Email" className="login-item__input" />
                            <img src={message} alt="" className="login-item__icon" />
                        </div>
                        <div className="login-item">
                            <input type="Password" placeholder="Password" className="login-item__input" />
                            <img src={lock} alt="" className="login-item__icon" />
                        </div>
                        <div className="login-item">
                            <input type="Password" placeholder="Confirm Password" className="login-item__input" />
                            <img src={lock} alt="" className="login-item__icon" />
                        </div>
                        <div className="bottom">
                            <input type="checkbox" id="set" className="bottom__checkBox" />
                            <label htmlFor="set" className="bottom__label">
                                Set as default card
                            </label>
                            <p className="bottom__recovery">Recovery Password</p>
                        </div>
                        {/* Btn */}
                        <Button title={"Sign Up"} />
                        <div className="withEmail">
                            <img src={google} alt="" className="withEmail__icon" />
                            <a href="#" className="withEmail__link">
                                Sign in with Gmail
                            </a>
                        </div>
                    </form>
                    {/* Do not */}
                    <div className="login-title">
                        <p className="login-title__donNot">Don’t have an account yet?</p>
                        <a href="#" className="login-title__signUp">
                            Sign In
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Register;
