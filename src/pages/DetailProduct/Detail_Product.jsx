import "./styles.scss";
import { Box, Grid } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../hooks/UserContextUser";

import start from "../../assets/icons/start.svg";
import aroundRight from "../../assets/icons/aroundRight.svg";
import around from "../../assets/icons/around.svg";
import compare from "../../assets/icons/compare.svg";
import buy from "../../assets/icons/buy.svg";
import pickup from "../../assets/icons/pickup.svg";
import heart from "../../assets/icons/heart.svg";
import Button from "../../components/Button/Button";
import Comment from "../../components/Comment/Comment";

const Detail_Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [user, setUser] = useState({});

    // Lấy thông tin người dùng
    const userData = useContext(UserContext);
    useEffect(() => {
        setUser(userData);
    }, [userData]);

    useEffect(() => {
        if (id) {
            const fetchDetail = async () => {
                try {
                    const response = await axios.get(`https://project-one-navy.vercel.app/product/${id}`);
                    setProduct(response.data.data);
                } catch (error) {
                    console.error("Error fetching product detail:", error);
                }
            };
            fetchDetail();
        }
    }, [id]);

    // Thêm sản phẩm vào giỏ hàng
    const handleAddToCard = async (productId) => {
        console.log(productId);
        if (productId) {
            try {
                const res = await axios.post(`http://localhost:3000/order/${user._id}`, {
                    productId: productId,
                    quantity: product.quantity || 1,
                });
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        }
    };

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
                backgroundColor: "var(--bg-detail)",
                padding: "25px 0",
            }}
        >
            <div className="detail">
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
            </div>

            <Grid container columns={{ xs: 5, sm: 5, md: 5, lg: 12, xl: 12 }} style={{ padding: "25px 0" }}>
                <Grid item xs={5}>
                    <div className="detail__img">
                        <img src={product?.imageURL} alt="" />
                    </div>
                </Grid>

                <Grid item xs={7} className="detail-right">
                    <h2 className="detail-right-title">{product?.name}</h2>
                    <Grid container columnSpacing={8} columns={{ xs: 6, sm: 6, md: 12, lg: 12, xl: 12 }}>
                        <Grid item xs={6}>
                            <div className="detail-right__item">
                                <div className="detail-right__comment">
                                    <img src={start} alt="start" className="detail-right__start" />
                                    <span className="detail-right__text">(3.5) 1100 reviews</span>
                                </div>
                                {/*  */}
                                <div className="detail-select">
                                    <h3 className="detail-right__size">Size/Weight</h3>
                                    <div className="detail-select__group">
                                        <div className="detail-select__item">
                                            <p className="detail-select__gam">500g</p>
                                            <img src={around} alt="" className="detail-select__img" />
                                        </div>
                                        <div className="detail-select__rectangle"></div>
                                        <div className="detail-select__item">
                                            <p className="detail-select__gam">500g</p>
                                            <img src={around} alt="" className="detail-select__img" />
                                        </div>
                                    </div>
                                    <div className="detail-btn">
                                        <button className="detail-btn__item">Small</button>
                                        <button className="detail-btn__item">Medium</button>
                                        <button className="detail-btn__item">Large</button>
                                    </div>
                                </div>
                                {/*  */}
                            </div>
                        </Grid>
                        {/* Info */}
                        <Grid item xs={6}>
                            <div className="detail-info">
                                <div className="detail-info__item">
                                    <img src={compare} alt="" className="detail-info__icon" />
                                    <p className="detail-info__title">Compare</p>
                                </div>
                                <div className="detail-info__item">
                                    <img src={buy} alt="" className="detail-info__icon" />
                                    <div>
                                        <p className="detail-info__title">Delivery</p>
                                        <p className="detail-info__desc">From $6 for 1-3 days</p>
                                    </div>
                                </div>
                                <div className="detail-info__item">
                                    <img src={pickup} alt="" className="detail-info__icon" />
                                    <div>
                                        <p className="detail-info__title">Pickup</p>
                                        <p className="detail-info__desc">Out of 2 store, today</p>
                                    </div>
                                </div>
                                <div className="add-to-card">
                                    <div className="add-to-card__item">
                                        <div className="add-to-card__sale-price">${product?.price}</div>
                                        <div className="add-to-card__sale-number">10%</div>
                                    </div>
                                    <div className="add-to-card__item">
                                        <div className="add-to-card__sale-price add-to-card__sale-center">
                                            ${product?.price}
                                        </div>
                                    </div>
                                    <div className="add-to-card__item add-to-card__btn--group">
                                        <Button title={"Add to cart"} onClick={() => handleAddToCard(product?._id)} />
                                        <div className="add-to-card__heart">
                                            <img src={heart} alt="" className="add-to-card__heart-icon" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/* Điều hướng */}
            <div className="directional">
                <ul className="directional__list">
                    <li className="directional__item">
                        <a href="#!" className="directional__link">
                            Description
                        </a>
                    </li>
                    <li>
                        <a href="#!" className="directional__link">
                            Features
                        </a>
                    </li>
                    <li>
                        <a href="#!" className="directional__link directional__link-active">
                            Review (1100)
                        </a>
                    </li>
                    <li>
                        <a href="#!" className="directional__link">
                            Similar
                        </a>
                    </li>
                </ul>
            </div>
            {/* Comment */}
            <Comment productId={id} />
        </Box>
    );
};

export default Detail_Product;
