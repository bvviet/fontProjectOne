import "./profileUpdate.scss";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import arowLeft from "../../assets/icons/arowLeft.svg";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../hooks/UserContextUser";
import { toast } from "react-toastify";

const UpdateProfile = () => {
    const [user, setUser] = useState({});
    const { userData, fetchUserId } = useContext(UserContext);
    useEffect(() => {
        setUser(userData);
    }, [userData]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const onSubmit = async (data) => {
        try {
            const res = await axios.patch(`https://project-one-navy.vercel.app/auth/update/${user._id}`, data);
            if (res.status === 200) {
                toast.success("Cập nhật thành công.", {
                    position: "top-right",
                    autoClose: 2000,
                });
                fetchUserId();
                console.log("Update successful:", res.data);
            }
        } catch (error) {
            console.error("Update failed:", error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        reset(user);
    }, [user, reset]);

    return (
        <div className="profile-right__content">
            <div className="update-profile">
                <div className="update-profile__link">
                    <Link to={"/profile"} className="">
                        <img src={arowLeft} className="update-profile__link-icon" alt="Back" />
                    </Link>
                    <p>Personal info</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="form-profile">
                    <div className="form-profile__list">
                        <div className="form-profile__item">
                            <label htmlFor="userName" className="form-profile__item-label">
                                Full name
                            </label>
                            <input
                                type="text"
                                id="userName"
                                {...register("userName")}
                                className="form-profile__item-input"
                            />
                        </div>

                        <div className="form-profile__item">
                            <label htmlFor="email" className="form-profile__item-label">
                                Email address
                            </label>
                            <input
                                type="email"
                                id="email"
                                {...register("email")}
                                className="form-profile__item-input"
                            />
                        </div>

                        <div className="form-profile__item">
                            <label htmlFor="phone" className="form-profile__item-label">
                                Phone number
                            </label>
                            <input
                                type="text"
                                id="phone"
                                {...register("phone", {
                                    minLength: {
                                        value: 10,
                                        message: "Số điện thoại không được dưới 10 số.",
                                    },
                                })}
                                className="form-profile__item-input"
                            />
                            {errors.phone && <p className="error">{errors.phone.message}</p>}
                        </div>

                        <div className="form-profile__item">
                            <label htmlFor="address" className="form-profile__item-label">
                                Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                {...register("address")}
                                className="form-profile__item-input"
                            />
                        </div>

                        <div className="form-profile__item">
                            <label htmlFor="avatar" className="form-profile__item-label">
                                Avatar
                            </label>
                            <input
                                type="text"
                                id="avatar"
                                {...register("avatar")}
                                className="form-profile__item-input"
                            />
                            {errors.avatar && <p className="error">{errors.avatar.message}</p>}
                        </div>
                    </div>

                    <div className="formButton">
                        <Link to={"/profile"} className="formButton-cancel">
                            Cancel
                        </Link>

                        <button type="submit" className={`formButton-submit `}>
                            Save Edit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;
