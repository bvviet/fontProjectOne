import "./styles.scss";
import { Box, Grid } from "@mui/material";

import detailImg from "../../../images/detail.png";
import start from "../../../icons/start.svg";
import aroundRight from "../../../icons/aroundRight.svg";
import around from "../../../icons/around.svg";
import compare from "../../../icons/compare.svg";
import buy from "../../../icons/buy.svg";
import pickup from "../../../icons/pickup.svg";
import heart from "../../../icons/heart.svg";
import avatarComment from "../../../images/avatar-comment.png";
import start50 from "../../../icons/start50.svg";
import start0 from "../../../icons/start0.svg";
import Button from "../../../../components/Button/Button";

const Detail_Product = () => {
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
                        <img src={detailImg} alt="" />
                    </div>
                </Grid>

                <Grid item xs={7} className="detail-right">
                    <h2 className="detail-right-title">Coffee Beans - Espresso Arabica and Robusta Beans</h2>
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
                                        <div className="add-to-card__sale-price">$500.00</div>
                                        <div className="add-to-card__sale-number">10%</div>
                                    </div>
                                    <div className="add-to-card__item">
                                        <div className="add-to-card__sale-price add-to-card__sale-center">$500.00</div>
                                    </div>
                                    <div className="add-to-card__item add-to-card__btn--group">
                                        <Button title={"Add to cart"} />
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
            <div className="comment">
                <h3 className="comment__title">What our customers are saying</h3>
                <Grid container spacing={{ sm: "30px" }} columns={{ xs: 3, sm: 3, md: 6, lg: 9, xl: 9 }} style={{}}>
                    <Grid item xs={3}>
                        <article className="comment__item">
                            <section className="comment__top">
                                <img src={avatarComment} alt="" className="comment__top-avatar" />
                                <div className="comment__top-info">
                                    <h3 className="comment__top-heading">Jakir Hussen</h3>
                                    <p className="comment__top-desc">Great product, I love this Coffee Beans </p>
                                </div>
                            </section>
                            <div className="comment__bottom">
                                <div className="comment__bottom__start-list">
                                    <img src={start} alt="" className="comment__bottom-start" />
                                    <img src={start} alt="" className="comment__bottom-start" />
                                    <img src={start} alt="" className="comment__bottom-start" />
                                    <img src={start50} alt="" className="comment__bottom-start" />
                                    <img src={start0} alt="" className="comment__bottom-start" />
                                </div>
                                <p className="comment__bottom-review">(3.5) Review</p>
                            </div>
                        </article>
                    </Grid>
                    <Grid item xs={3}>
                        <article className="comment__item">
                            <section className="comment__top">
                                <img src={avatarComment} alt="" className="comment__top-avatar" />
                                <div className="comment__top-info">
                                    <h3 className="comment__top-heading">Jubed Ahmed</h3>
                                    <p className="comment__top-desc">Awesome Coffee, I love this Coffee Beans</p>
                                </div>
                            </section>
                            <div className="comment__bottom">
                                <div className="comment__bottom__start-list">
                                    <img src={start} alt="" className="comment__bottom-start" />
                                    <img src={start} alt="" className="comment__bottom-start" />
                                    <img src={start} alt="" className="comment__bottom-start" />
                                    <img src={start50} alt="" className="comment__bottom-start" />
                                    <img src={start0} alt="" className="comment__bottom-start" />
                                </div>
                                <p className="comment__bottom-review">(3.5) Review</p>
                            </div>
                        </article>
                    </Grid>
                    <Grid item xs={3}>
                        <article className="comment__item">
                            <section className="comment__top">
                                <img src={avatarComment} alt="" className="comment__top-avatar" />
                                <div className="comment__top-info">
                                    <h3 className="comment__top-heading">Delwar Hussain</h3>
                                    <p className="comment__top-desc">Great product, I love this Coffee Beans </p>
                                </div>
                            </section>
                            <div className="comment__bottom">
                                <div className="comment__bottom__start-list">
                                    <img src={start} alt="" className="comment__bottom-start" />
                                    <img src={start} alt="" className="comment__bottom-start" />
                                    <img src={start} alt="" className="comment__bottom-start" />
                                    <img src={start50} alt="" className="comment__bottom-start" />
                                    <img src={start0} alt="" className="comment__bottom-start" />
                                </div>
                                <p className="comment__bottom-review">(3.5) Review</p>
                            </div>
                        </article>
                    </Grid>
                </Grid>
            </div>
        </Box>
    );
};

export default Detail_Product;
