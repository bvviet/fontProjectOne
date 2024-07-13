/* eslint-disable react/prop-types */
import { Grid, Rating } from "@mui/material";
import AlertDialog from "../DeleteConfirm/Delete";
import deleted from "../../assets/icons/delete.svg";

const CommentItem = ({ user, comment, deleteComment }) => {
    return (
        <Grid container spacing={{ sm: "30px" }} columns={{ xs: 3, sm: 3, md: 6, lg: 9, xl: 9 }} style={{}}>
            {comment.map((value) => (
                <Grid item xs={3} key={value._id}>
                    <article className="comment__item">
                        <section className="comment__top">
                            <img
                                src="https://inkythuatso.com/uploads/thumbnails/800/2022/03/anh-ronaldo-4k-dep-3-14-16-56-57.jpg"
                                alt=""
                                className="comment__top-avatar"
                            />
                            <div className="comment__top-info">
                                <h3 className="comment__top-heading">{value?.userId?.userName}</h3>
                                <p className="comment__top-desc">{value?.content}</p>
                            </div>
                            {user?._id === value?.userId?._id ? (
                                <div style={{ marginLeft: "auto", cursor: "pointer" }}>
                                    <AlertDialog handleDelete={() => deleteComment(value._id)}>
                                        <div className="comment__top-delete">
                                            <img src={deleted} alt="" />
                                        </div>
                                    </AlertDialog>
                                </div>
                            ) : (
                                ""
                            )}
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
    );
};
export default CommentItem;
