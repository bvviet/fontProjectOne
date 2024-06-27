import "./Login.scss";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Đảm bảo import CSS của react-toastify

import loginBanner from "../../assets/images/login.png";
import google from "../../assets/icons/google.svg";
import message from "../../assets/icons/message.svg";
import lock from "../../assets/icons/lock.svg";
import close from "../../assets/icons/close.svg";
import Button from "../../components/Button/Button";
import Logo from "../../components/Logo/Logo";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(0);
    const [messages, setMessages] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (messages) {
            toast.error(messages, {
                position: "top-right",
                autoClose: 2000,
            });
        }
    }, [messages]);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await fetch("https://project-one-navy.vercel.app/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.message) {
                    setMessages(errorData.message);
                } else if (errorData.errors && errorData.errors.length > 0) {
                    setMessages(errorData.errors[0]);
                }
                throw new Error(errorData.message || "Đăng nhập thất bại");
            }

            const result = await response.json();

            setStatus(response.status);

            toast.success("Đăng nhập thành công!", {
                position: "top-right",
                autoClose: 2000,
            });

            console.log(result.message, status);
        } catch (error) {
            if (error.name === "TypeError" && error.message === "Failed to fetch") {
                setMessages("Không có kết nối mạng. Vui lòng kiểm tra lại kết nối.");
            }
            toast.error(messages || "Đăng nhập thất bại. Vui lòng thử lại.", {
                position: "top-right",
                autoClose: 2000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ position: "relative" }}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 9999,
                }}
            >
                {loading && <CircularProgress />}
            </Box>
            {/* Hiển thị lỗi */}
            <ToastContainer />

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
                            <h2 className="login-main__heading">Hello Again!</h2>
                            <p className="login-main__desc">
                                Welcome back to sign in. As a returning customer, you have access to your previously
                                saved all information.
                            </p>
                        </div>
                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="login__form">
                            <div className="login-item">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    {...register("email", { required: true })}
                                    className="login-item__input"
                                />
                                <img src={message} alt="" className="login-item__icon" />
                            </div>
                            {errors.email && <span>This field is required</span>}

                            <div className="login-item">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    {...register("password", { required: true })}
                                    className="login-item__input"
                                />
                                <img src={lock} alt="" className="login-item__icon" />
                            </div>
                            {errors.password && <span>This field is required</span>}

                            <div className="bottom">
                                <input type="checkbox" id="set" className="bottom__checkBox" />

                                <label htmlFor="set" className="bottom__label">
                                    Set as default card
                                </label>
                                <p className="bottom__recovery">Recovery Password</p>
                            </div>

                            {/* Btn */}
                            <Button title={"Login"} />
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
                                Sign Up
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </Box>
    );
};

export default Login;
