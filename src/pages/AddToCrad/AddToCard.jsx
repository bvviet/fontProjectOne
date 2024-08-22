import { Box, Grid } from "@mui/material";
import "./AddToCard.scss";

import aroundRight from "../../assets/icons/aroundRight.svg";
import giftAdd from "../../assets/icons/giftAdd.svg";
import aroundLeft from "../../assets/icons/aroundLeft.svg";
import Button from "../../components/Button/Button";
import { useContext } from "react";
import { OrderContext } from "../../hooks/OrderContext";
import { Link } from "react-router-dom";
import ProductOrderItem from "./ProductOrderItem";
import Subtotal from "./Subtotal";

const AddToCard = () => {
    const { orderItems, orders, total } = useContext(OrderContext);

    if (!orders.length) {
        return <div>Loading...</div>;
    }

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
            <div className="addToCard">
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
                        {/* Sản phẩm */}
                        {orderItems.map((item) => (
                            <ProductOrderItem key={item._id} item={item} />
                        ))}
                        {/* Bottom */}
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
                                    <p className="addLeft-bottom__item">$10.00</p>
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
                            <Subtotal />
                            <div className="add-btn">
                                <Link to={"/checkout"}>
                                    <Button title="Continue to checkout" />
                                </Link>
                            </div>
                        </section>

                        {/* Gift */}
                        <section className="add-gift">
                            <div className="add-gift__image">
                                <img src={giftAdd} alt="" />
                            </div>
                            <div className="add-gift__text">
                                <p className="add-gift__title">Send this order as a gift.</p>
                                <p className="add-gift__desc">
                                    Available items will be shipped to your gift recipient.
                                </p>
                            </div>
                        </section>
                    </Grid>
                </Grid>
            </div>
        </Box>
    );
};

export default AddToCard;
