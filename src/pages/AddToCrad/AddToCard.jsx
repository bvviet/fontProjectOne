import { Box, Grid } from "@mui/material";
import "./AddToCard.scss";

import aroundRight from "../../assets/icons/aroundRight.svg";
import heart from "../../assets/icons/heart.svg";
import deleted from "../../assets/icons/delete.svg";
import giftAdd from "../../assets/icons/giftAdd.svg";
import aroundLeft from "../../assets/icons/aroundLeft.svg";
import Button from "../../components/Button/Button";
import { useContext } from "react";
import { OrderContext } from "../../hooks/OrderContext";
import axios from "axios";
import { LoadingContext } from "../../hooks/LoadingContext";
import { MessagesContext } from "../../hooks/MessagesContext";
import { toast } from "react-toastify";
import AlertDialog from "../../components/DeleteConfirm/Delete";

const AddToCard = () => {
    const { orderItems, orders, total, sumQuantity, fetchOrders } = useContext(OrderContext);
    const { setIsLoading } = useContext(LoadingContext);
    const { setMessages } = useContext(MessagesContext);

    const handleDeleteOrderItem = async (orderItemId) => {
        if (orderItemId) {
            try {
                setIsLoading(true);
                const res = await axios.delete(`https://project-one-navy.vercel.app/order/${orderItemId}`);
                fetchOrders();
                if (res.status === 200) {
                    toast.success("Xóa khỏi vào giỏ hàng thành công ✅", {
                        position: "top-right",
                        autoClose: 1500,
                    });
                }
            } catch (error) {
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
        }
    };

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
                                                    defaultValue={item.quantity}
                                                    style={{ width: "38px" }}
                                                />
                                            </div>
                                        </form>
                                        <div className="product-option__icon">
                                            <div className="product-option__icon-item">
                                                <img src={heart} alt="heart" />
                                                Save
                                            </div>
                                            <AlertDialog handleDelete={() => handleDeleteOrderItem(item?._id)}>
                                                <div className="product-option__icon-item">
                                                    <img src={deleted} alt="" />
                                                    Delete
                                                </div>
                                            </AlertDialog>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <div className="add__dot"></div>
                        </div>
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
                        <div className="add-right__subtotal">
                            <p className="add-right__subtotal-left">
                                Subtotal <span style={{ fontWeight: "400" }}>(items)</span>
                            </p>
                            <p className="add-right__subtotal-right">{sumQuantity}</p>
                        </div>
                        <div className="add-right__subtotal">
                            <p className="add-right__subtotal-left">
                                Price <span style={{ fontWeight: "400" }}>(Total)</span>
                            </p>
                            <p className="add-right__subtotal-right">${total}</p>
                        </div>
                        <div className="add-right__subtotal">
                            <p className="add-right__subtotal-left">Shipping</p>
                            <p className="add-right__subtotal-right">$10.00</p>
                        </div>
                        <div className="add__dot add__dot-right"></div>
                        <div className="add-right__subtotal">
                            <p className="add-right__subtotal-left">Estimated Total</p>
                            <p className="add-right__subtotal-right">${total + 10}</p>
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
