import { Box, Grid } from "@mui/material";
import "./AddToCard.scss";

import aroundRight from "../../assets/icons/aroundRight.svg";
import heart from "../../assets/icons/heart.svg";
import deleted from "../../assets/icons/delete.svg";
import giftAdd from "../../assets/icons/giftAdd.svg";
import aroundLeft from "../../assets/icons/aroundLeft.svg";
import Button from "../../components/Button/Button";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../hooks/UserContextUser";
import axios from "axios";
// import cate2 from "../../assets/images/cate2.png";
// import cate3 from "../../assets/images/cate3.png";

const AddToCard = () => {
    const [user, setUser] = useState({});
    const [orders, setOrders] = useState([]);
    const orderItems = orders[0]?.order;
    const [quantity, setQuantity] = useState();
    console.log(quantity);
    // Lấy thông tin người dùng
    const userData = useContext(UserContext);
    useEffect(() => {
        setUser(userData);
    }, [userData]);

    // Lấy giỏ hàng người dùng
    useEffect(() => {
        if (user?._id) {
            try {
                const fetchOrders = async () => {
                    const res = await axios.get(`http://localhost:3000/order/orders/${user?._id}`);
                    setOrders(res.data.data);
                };
                fetchOrders();
            } catch (error) {
                console.log(error);
            }
        }
    }, [user?._id]);

    if (!orders.length) {
        return <div>Loading...</div>;
    }

    // Tính tổng giá
    const totalPrice = () => {
        const amounts = orderItems.map((item) => item.totalAmount);
        const total = amounts.reduce((acc, cur) => acc + cur, 0);
        return total;
    };
    const total = totalPrice();

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
                backgroundColor: "var(--bg-addToCard)",
                padding: "25px 0",
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

            <Grid
                container
                columns={{ xs: 1.7, sm: 1.7, md: 1.7, lg: 6, xl: 6 }}
                style={{ padding: "30px 0" }}
                className="add-list"
            >
                {/* Left */}
                <Grid item xs={4.3} className="add-left">
                    {/*  */}
                    {orderItems.map((item) => (
                        <div key={item?._id}>
                            <section className="add-item">
                                <div className="add-item__image">
                                    <img src={item.productId?.imageURL} alt="" />
                                </div>
                                {/*  */}
                                <div className="add-item__main">
                                    <div className="add-item__title">
                                        <h1 className="add-item__heading">{item.productId?.name}</h1>
                                        <p className="add-item__price">${item.totalAmount}</p>
                                    </div>
                                    <div className="add-item__stock">${item.productId?.price} | In Stock</div>
                                    <div className="product-option">
                                        <form className="product-option__form">
                                            <select name="" id="" className="product-option__select">
                                                <option value="LavAzza" className="product-option__select-option">
                                                    LavAzza
                                                </option>
                                            </select>
                                            <div className="product-option__quantity">
                                                <input
                                                    type="number"
                                                    onChange={(e) => setQuantity(e.target.value)}
                                                    defaultValue={item.quantity}
                                                />
                                            </div>
                                        </form>
                                        <div className="product-option__icon">
                                            <div className="product-option__icon-item">
                                                <img src={heart} alt="heart" />
                                                Save
                                            </div>
                                            <div className="product-option__icon-item">
                                                <img src={deleted} alt="" />
                                                Delete
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <div className="add__dot"></div>
                        </div>
                    ))}
                    <div className="addLeft-bottom">
                        <div className="addLeft-bottom__left">
                            <img src={aroundLeft} alt="" />
                            Continue Shopping
                        </div>
                        <div className="addLeft-bottom__list">
                            <div className="addLeft-bottom__items">
                                <p className="addLeft-bottom__item">Subtotal:</p>
                                <p className="addLeft-bottom__item">${total}</p>
                            </div>
                            <div className="addLeft-bottom__items">
                                <p className="addLeft-bottom__item">Shipping:</p>
                                <p className="addLeft-bottom__item">$10:00</p>
                            </div>
                            <div className="add__dot "></div>
                            <div className="addLeft-bottom__items">
                                <p className="addLeft-bottom__total">Total:</p>
                                <p className="addLeft-bottom__total">${total + 10}</p>
                            </div>
                        </div>
                    </div>
                </Grid>
                {/* Right */}
                <Grid item xs={1.7} className="add-right">
                    <section className="add-right__top">
                        <div className="add-right__subtotal">
                            <p className="add-right__subtotal-left">
                                Subtotal <span style={{ fontWeight: "400" }}>(items)</span>
                            </p>
                            <p className="add-right__subtotal-right">3</p>
                        </div>
                        <div className="add-right__subtotal">
                            <p className="add-right__subtotal-left">
                                Price <span style={{ fontWeight: "400" }}>(Total)</span>
                            </p>
                            <p className="add-right__subtotal-right">$191.65</p>
                        </div>
                        <div className="add-right__subtotal">
                            <p className="add-right__subtotal-left">Shipping</p>
                            <p className="add-right__subtotal-right">$10.00</p>
                        </div>
                        <div className="add__dot add__dot-right"></div>
                        <div className="add-right__subtotal">
                            <p className="add-right__subtotal-left">Estimated Total</p>
                            <p className="add-right__subtotal-right">$201.65</p>
                        </div>

                        <div className="add-btn">
                            <Button title="Continue to checkout" />
                        </div>
                    </section>

                    {/* Gift */}
                    <section className="add-gift">
                        <div className="add-gift__image">
                            <img src={giftAdd} alt="" />
                        </div>
                        <div className="add-gift__text">
                            <p className="add-gift__title">Send this order as a gift.</p>
                            <p className="add-gift__desc">Available items will be shipped to your gift recipient.</p>
                        </div>
                    </section>
                </Grid>
            </Grid>
        </Box>
    );
};
export default AddToCard;
