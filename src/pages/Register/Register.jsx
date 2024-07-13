import "./Register.scss";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Box } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

import loginBanner from "../../assets/images/login.png";
import google from "../../assets/icons/google.svg";
import message from "../../assets/icons/message.svg";
import lock from "../../assets/icons/lock.svg";
import close from "../../assets/icons/close.svg";
import Button from "../../components/Button/Button";
import Logo from "../../components/Logo/Logo";
import { LoadingContext } from "../../hooks/LoadingContext";
import Loading from "../../components/Loading/Loading";

const Register = () => {
    const [messages, setMessages] = useState("");
    const navigate = useNavigate();
    const { loading, setIsLoading } = useContext(LoadingContext);
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
            setMessages("");
        }
    }, [messages]);

    const onSubmit = async (data) => {
        setIsLoading(true);
        const { userName, email, password } = data;

        try {
            const response = await axios.post("https://project-one-navy.vercel.app/auth/register", {
                userName,
                email,
                password,
            });

            if (response.status === 200) {
                toast.success("Đăng ký thành công.", {
                    position: "top-right",
                    autoClose: 1500,
                });
                setTimeout(() => {
                    navigate("/login");
                }, 2300);
            }
        } catch (error) {
            console.log(error);
            let errorMessage = "";
            if (!error.response) {
                errorMessage = "Không có kết nối mạng. Vui lòng kiểm tra lại kết nối.";
            } else if (error.response.status === 404) {
                errorMessage = "API hiện tại đang bị lỗi :((";
            } else if (error.response.data.message || error.response.data.errors) {
                errorMessage = error.response.data.message || error.response.data.errors[0];
            } else {
                errorMessage = "Đã xảy ra lỗi vui lòng thử lại";
            }
            setMessages(errorMessage);
        } finally {
            setIsLoading(false);
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
            ></Box>
            <Loading isShow={loading} />
            {/* Hiển thị messages */}
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
                            <h2 className="login-main__heading">Sign Up</h2>
                            <p className="login-main__desc">
                                Let’s create your account and Shop like a pro and save money.
                            </p>
                        </div>
                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="login__form">
                            {/* Confirm password */}
                            <div className="login-item">
                                <input
                                    type="text"
                                    {...register("userName", { required: true })}
                                    placeholder="User name"
                                    className="login-item__input"
                                />
                                <img src={lock} alt="" className="login-item__icon" />
                            </div>
                            {errors.userName && <span className="login-item__messages">Tên không được bỏ trống.</span>}

                            {/* Email */}
                            <div className="login-item">
                                <input
                                    type="email"
                                    {...register("email", { required: true })}
                                    placeholder="Email"
                                    className="login-item__input"
                                />
                                <img src={message} alt="" className="login-item__icon" />
                            </div>
                            {errors.email && <span className="login-item__messages">Email không được bỏ trống.</span>}

                            {/* Password */}
                            <div className="login-item">
                                <input
                                    type="Password"
                                    {...register("password", { required: true })}
                                    placeholder="Password"
                                    className="login-item__input"
                                />
                                <img src={lock} alt="" className="login-item__icon" />
                            </div>
                            {errors.password && (
                                <span className="login-item__messages">Password không được bỏ trống.</span>
                            )}

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
                            <Link to="/login" className="login-title__signUp">
                                Sign In
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </Box>
    );
};

export default Register;
