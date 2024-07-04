import "./Comment.scss";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { Grid } from "@mui/material";
import Rating from "@mui/material/Rating";
import PropTypes from "prop-types";

import { UserContext } from "../../hooks/UserContextUser";
import axios from "axios";

const Comment = ({ productId }) => {
    // Lấy thông tin người dùng
    const [user, setUser] = useState({});
    const userData = useContext(UserContext);
    const [comment, setComment] = useState([]);

    const [visible, setVisible] = useState(false);
    const [ratingValue, setRatingValue] = useState(2.5);

    // Lấy thong tin người dùng
    useEffect(() => {
        setUser(userData);
    }, [userData]);

    const handleRatingChange = (event, newValue) => {
        setRatingValue(newValue);
    };

    // Tạo bình luận mới
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data.content);
        try {
            const response = await axios({
                method: "post",
                url: "https://project-one-navy.vercel.app/comment",
                data: {
                    productId: productId,
                    userId: user?._id,
                    content: data.content,
                    rating: ratingValue,
                },
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    // Lấy bình luận theo id sản phẩm
    useEffect(() => {
        const fetchCommentDetail = async () => {
            try {
                const response = await axios.get(`https://project-one-navy.vercel.app/comment/${productId}`);
                setComment(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCommentDetail();
    }, [productId]);

    console.log(comment);

    return (
        <div className="comment">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h3 className="comment__title">What our customers are saying</h3>
                <Button
                    variant="outlined"
                    style={{ height: "40px", fontSize: "1.2rem", fontWeight: "600" }}
                    onClick={() => setVisible(true)}
                >
                    Viết đánh giá mới
                </Button>
            </div>

            {/* Form bình luận */}
            {visible && (
                <div className="overlay" onClick={() => setVisible(false)}>
                    <div className="tippy-container" onClick={(e) => e.stopPropagation()}>
                        <Tippy
                            visible={true}
                            interactive={true}
                            render={(attrs) => (
                                <div {...attrs}>
                                    <div className="tippy-content">
                                        <form onSubmit={handleSubmit(onSubmit)} className="tippy-content__form">
                                            <h1 className="tippy-content__heading">Viết đánh giá mới</h1>
                                            <div>
                                                <label htmlFor="">Mô tả ✏️</label>
                                                <textarea
                                                    name=""
                                                    id=""
                                                    {...register("content", { required: true })}
                                                ></textarea>
                                                {errors.content && <span>This field is required</span>}
                                            </div>
                                            <div>
                                                <label htmlFor="">Đánh giá</label>
                                                <Rating
                                                    size="large"
                                                    name="half-rating"
                                                    defaultValue={2.5}
                                                    precision={0.1}
                                                    onChange={handleRatingChange}
                                                    sx={{
                                                        fontSize: "2.5rem",
                                                    }}
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
                                                <Button variant="contained" type="submit">
                                                    Gửi đánh giá
                                                </Button>
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

            {/* Nội dung bình luận */}
            <Grid container spacing={{ sm: "30px" }} columns={{ xs: 3, sm: 3, md: 6, lg: 9, xl: 9 }} style={{}}>
                {comment.map((value) => (
                    <Grid item xs={3} key={value._id}>
                        <article className="comment__item">
                            <section className="comment__top">
                                <img src={value?.userId?.avatar} alt="" className="comment__top-avatar" />
                                <div className="comment__top-info">
                                    <h3 className="comment__top-heading">{value?.userId?.userName}</h3>
                                    <p className="comment__top-desc">{value?.content}</p>
                                </div>
                                {user?._id === value?.userId?._id ? <p>3 cham</p> : ""}
                            </section>
                            <div className="comment__bottom">
                                <div className="comment__bottom__start-list">
                                    <Rating
                                        name="read-only"
                                        value={value?.rating}
                                        precision={0.1}
                                        size="large"
                                        readOnly
                                        sx={{
                                            fontSize: "2.5rem",
                                        }}
                                    />
                                </div>
                                <p className="comment__bottom-review">( {value?.rating} ) Review</p>
                            </div>
                        </article>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

Comment.propTypes = {
    productId: PropTypes.string,
};

export default Comment;
