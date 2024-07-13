import "./Comment.scss";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Rating from "@mui/material/Rating";
import PropTypes from "prop-types";

import { UserContext } from "../../hooks/UserContextUser";
import axios from "axios";
import { toast } from "react-toastify";
import { LoadingContext } from "../../hooks/LoadingContext";
import { MessagesContext } from "../../hooks/MessagesContext";
import CommentItem from "./CommentItem";

const Comment = ({ productId }) => {
    const { userData } = useContext(UserContext);
    const { setIsLoading } = useContext(LoadingContext);
    const { setMessages } = useContext(MessagesContext);

    const [user, setUser] = useState({});
    const [comment, setComment] = useState([]);
    const [visible, setVisible] = useState(false);
    const [ratingValue, setRatingValue] = useState(2.5);

    // Lấy thông tin user
    useEffect(() => {
        setUser(userData);
    }, [userData]);

    const handleRatingChange = (event, newValue) => {
        setRatingValue(newValue);
    };

    // Lấy bình luận theo id sản phẩm
    const fetchCommentDetail = async () => {
        try {
            const response = await axios.get(`https://project-one-navy.vercel.app/comment/${productId}`);
            setComment(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCommentDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // Thêm bình luận
    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            const response = await axios({
                method: "post",
                url: "https://project-one-navy.vercel.app/comment",
                data: {
                    productId,
                    userId: user._id,
                    content: data.content,
                    rating: ratingValue,
                },
            });
            if (response.status === 200) {
                toast.success("Đã thêm bình luận✅", {
                    position: "top-right",
                    autoClose: 1500,
                });
                reset();
            }
            setVisible(false);
            fetchCommentDetail();
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
    };

    // Xóa bình luận
    const deleteComment = async (id) => {
        try {
            const response = await axios.delete(`https://project-one-navy.vercel.app/comment/${id}`);
            if (response.status === 200) {
                toast.success("Xóa bình luận thành công", {
                    position: "top-right",
                    autoClose: 1500,
                });
            }
            fetchCommentDetail();
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
    };

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
                                                {errors.content && (
                                                    <div style={{ color: "red", marginTop: "10px" }}>
                                                        Không được để trống
                                                    </div>
                                                )}
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
            <CommentItem user={user} comment={comment} deleteComment={deleteComment} />
        </div>
    );
};

Comment.propTypes = {
    productId: PropTypes.string,
};

export default Comment;
