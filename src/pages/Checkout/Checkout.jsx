import { Box, Grid } from "@mui/material";
import "./style.scss";
import aroundRight from "../../assets/icons/aroundRight.svg";
import fedex from "../../assets/images/fedex.png";
import dhl from "../../assets/images/DHL.png";
import edit from "../../assets/icons/edit.svg";
import { useModelContext } from "../../contexts/ModalProvider";
import UpdateProfile from "../Profile/UpdateProfile";
import { UserContext } from "../../hooks/UserContextUser";
import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../hooks/OrderContext";
import ProductOrderItem from "../AddToCrad/ProductOrderItem";
import Subtotal from "../AddToCrad/Subtotal";
import axios from "axios";
import { toast } from "react-toastify";
import { LoadingContext } from "../../hooks/LoadingContext";
import PopupSuccess from "../../components/PopupSuccess/PopupSuccess";

const Checkout = () => {
    const { setIsSShowing, setContent } = useModelContext();
    const { orderItems } = useContext(OrderContext);
    const [user, setUser] = useState({});
    const { userData } = useContext(UserContext);
    const { setIsLoading } = useContext(LoadingContext);
    useEffect(() => {
        setUser(userData);
    }, [userData]);

    const [selectedOption, setSelectedOption] = useState("free");
    const [note, setNote] = useState("");
    const { total } = useContext(OrderContext);
    const totalMoney = selectedOption === "noFree" ? total + 10000 : total;

    const handleSelect = (option) => {
        setSelectedOption(option);
    };

    const orderItem = orderItems.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        totalAmount: item.quantity * item.productId.price,
        unitAmount: item.productId.price,
    }));

    const data = {
        products: orderItem,
        userId: user?._id,
        totalPrice: totalMoney,
        status: "Đang xử lý",
        shipping: selectedOption,
        note: note,
    };

    console.log(orderItems.map((item) => item));
    console.log(data);

    const handleCreateOrder = async () => {
        try {
            setIsLoading(true);
            await axios.post("https://project-one-navy.vercel.app/orderReal", data);
            setIsSShowing(true);
            setContent(<PopupSuccess />);
        } catch (error) {
            toast.error("Mua hàng thất bại 😒");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box
            sx={{
                px: {
                    xs: "16px",
                    sm: "20px",
                    md: "30px",
                    lg: "50px",
                    xl: "50px",
                },
                backgroundColor: "var(--bg-main)",
                padding: "25px 0",
                color: "var(--color-addToCard-heading)",
            }}
        >
            {/* Filter */}
            <div className="filter">
                <div className="filter__item">
                    <a href="#" className="filter__heading">
                        Departments
                    </a>
                    <img src={aroundRight} alt="aroundRight" className="filter__icon" />
                </div>
                <div className="filter__item">
                    <a href="#" className="filter__heading">
                        Coffee
                    </a>
                    <img src={aroundRight} alt="aroundRight" className="filter__icon" />
                </div>
                <div className="filter__item">
                    <a href="#" className="filter__heading">
                        Coffee Beans
                    </a>
                    <img src={aroundRight} alt="aroundRight" className="filter__icon" />
                </div>
                <div className="filter__item">
                    <a href="#" className="filter__heading filter__heading-active">
                        LavAzza
                    </a>
                </div>
            </div>

            <Grid container rowSpacing={0} columns={{ xs: 6, md: 12, lg: 12 }}>
                {/* Check out left */}
                <Grid item xs={6} sm={8} className="checkout-left">
                    <div className="checkout-address">
                        <h1 className="checkout-address__title">
                            1. Shipping, arrives between Mon, May 16—Tue, May 24
                        </h1>
                        <hr className="checkout-address__hr" />
                        {/* Address */}

                        <div>
                            <div className="checkout-address__top">
                                <div>
                                    <p className="checkout-address__shipping">🌎 Shipping address</p>
                                    <p className="checkout-address__where"> Where should we deliver your order?</p>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsSShowing(true);
                                        setContent(<UpdateProfile />);
                                    }}
                                    className="checkout-address__button"
                                >
                                    ➕ Add a new address
                                </button>
                            </div>
                            <div className="checkout-info">
                                <div className="checkout-info__left">
                                    <p className="checkout-info__title">🧑 User Name: {user?.userName}</p>
                                    <p className="checkout-info__desc">🏡 Address: {user?.address}</p>
                                    <p className="checkout-info__desc">☎️ Phone: {user?.phone}</p>
                                    <div className="checkout-info__status">
                                        <p className="checkout-info__status-item">Shipping</p>
                                        <p className="checkout-info__status-item">Delivery from store</p>
                                    </div>
                                </div>
                                <div
                                    className="checkout-info__right"
                                    onClick={() => {
                                        setIsSShowing(true);
                                        setContent(<UpdateProfile />);
                                    }}
                                >
                                    <img src={edit} alt="" />
                                    Edit
                                </div>
                            </div>
                            {/* Shipping Method*/}
                            <div className="shipping">
                                <p className="shipping__select">🚚 Availeble Shipping method</p>
                                <div className="shipping__list">
                                    <label htmlFor="free">
                                        <div className="shipping-item">
                                            <img src={fedex} alt="" className="shipping-item__image" />
                                            <div>
                                                <p className="shipping-item__title">Fedex Delivery</p>
                                                <p className="shipping-item__desc">Delivery: 2-3 days work</p>
                                            </div>
                                            <div className="shipping-item__select">
                                                <p className="shipping-item__label">Free</p>
                                                <input
                                                    id="free"
                                                    type="checkbox"
                                                    className="shipping-item__checkbox"
                                                    checked={selectedOption === "free"}
                                                    onChange={() => handleSelect("free")}
                                                />
                                            </div>
                                        </div>
                                    </label>

                                    <label htmlFor="noFree" className="shipping-item__label">
                                        <div className="shipping-item">
                                            <img src={dhl} alt="" className="shipping-item__image" />
                                            <div>
                                                <p className="shipping-item__title">DHL Delivery</p>
                                                <p className="shipping-item__desc">Delivery: 2-3 days work</p>
                                            </div>
                                            <div className="shipping-item__select">
                                                <p htmlFor="noFree">$10.00</p>
                                                <input
                                                    id="noFree"
                                                    type="checkbox"
                                                    className="shipping-item__checkbox"
                                                    checked={selectedOption === "noFree"}
                                                    onChange={() => handleSelect("noFree")}
                                                />
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <div className="form-profile__item">
                                    <label htmlFor="userName" className="form-profile__item-label">
                                        ✏️ Note to seller
                                    </label>
                                    <input
                                        onChange={(e) => setNote(e.target.value)}
                                        type="text"
                                        id="userName"
                                        className="form-profile__item-input"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="checkout-right">
                        <p className="checkout-right__title">Items details</p>
                        {orderItems.map((item) => (
                            <ProductOrderItem key={item._id} item={item} />
                        ))}
                    </div>
                </Grid>
                <Grid item xs={6} sm={3.5} style={{ marginLeft: "auto" }}>
                    <Subtotal selectedOption={selectedOption} />
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "30px" }}>
                        <button
                            onClick={handleCreateOrder}
                            style={{ width: "100%" }}
                            className="checkout-address__button"
                        >
                            💸 Pay ${totalMoney}
                        </button>
                    </div>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Checkout;
