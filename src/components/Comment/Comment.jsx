import "./Comment.scss";
import Button from "@mui/material/Button";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { Grid } from "@mui/material";
import { useState } from "react";
import Rating from "@mui/material/Rating";

import avatarComment from "../../assets/images/avatar-comment.png";
import start from "../../assets/icons/start.svg";
import start50 from "../../assets/icons/start50.svg";
import start0 from "../../assets/icons/start0.svg";
// import Button from "../../../../components/Button/Button";

const Comment = () => {
    const [visible, setVisible] = useState(false);
    const [ratingValue, setRatingValue] = useState(null);

    const handleRatingChange = (event, newValue) => {
        setRatingValue(newValue);
    };

    console.log(ratingValue);
    return (
        <div className="comment">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3 className="comment__title">What our customers are saying</h3>
                <Button
                    variant="outlined"
                    style={{ height: "40px", fontSize: "1.2rem", fontWeight: "600" }}
                    onClick={() => setVisible(true)}
                >
                    Viết đánh giá mới
                </Button>
            </div>

            {visible && (
                <div className="overlay" onClick={() => setVisible(false)}>
                    <div className="tippy-container" onClick={(e) => e.stopPropagation()}>
                        <Tippy
                            visible={true}
                            interactive={true}
                            render={(attrs) => (
                                <div {...attrs}>
                                    <div className="tippy-content">
                                        <form action="" className="tippy-content__form">
                                            <h1 className="tippy-content__heading">Viết đánh giá mới</h1>
                                            <div>
                                                <label htmlFor="">Tiêu đề</label>
                                                <input type="text" />
                                            </div>
                                            <div>
                                                <label htmlFor="">Mô tả ✏️</label>
                                                <textarea name="" id=""></textarea>
                                            </div>
                                            <div>
                                                <label htmlFor="">Đánh giá</label>
                                                <Rating
                                                    size="large"
                                                    name="half-rating"
                                                    defaultValue={2.5}
                                                    precision={0.5}
                                                    onChange={handleRatingChange}
                                                />
                                            </div>
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <Button
                                                    color="error"
                                                    variant="outlined"
                                                    onClick={() => {
                                                        setVisible(false);
                                                    }}
                                                >
                                                    Hủy
                                                </Button>
                                                <Button variant="contained">Gửi đánh giá</Button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                        >
                            <p></p>
                        </Tippy>
                    </div>
                </div>
            )}

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
    );
};
export default Comment;
