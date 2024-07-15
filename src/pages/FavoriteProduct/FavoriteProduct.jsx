import { Box, Grid } from "@mui/material";
import aroundRight from "../../assets/icons/aroundRight.svg";
import deleted from "../../assets/icons/delete.svg";
import aroundLeft from "../../assets/icons/aroundLeft.svg";
import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../../hooks/LoadingContext";
import { MessagesContext } from "../../hooks/MessagesContext";
import axios from "axios";
import ButtonAddToCard from "../DetailProduct/ButtonAddToCard";
import AlertDialog from "../../components/DeleteConfirm/Delete";
import { toast } from "react-toastify";
import { FavoriteContext } from "../../hooks/FavoriteContext";
import AddFavorite from "../../components/AddFavourite/AddFavourite";

const FavoriteProduct = () => {
    const { setIsLoading } = useContext(LoadingContext);
    const { setMessages } = useContext(MessagesContext);
    const { fetchDetail, products } = useContext(FavoriteContext);
    const [productsFavorite, setProductsFavorite] = useState();

    // Xóa sản phẩm yêu thích
    const handleDeleteOrderItem = async (productId) => {
        if (productId) {
            try {
                setIsLoading(true);
                const res = await axios.delete(`https://project-one-navy.vercel.app/favorite/${productId}`);
                fetchDetail();
                if (res.status === 200) {
                    toast.success("Xóa sản phẩm yêu thích thành công", {
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

    useEffect(() => {
        setProductsFavorite(products.length);
    }, [products]);

    console.log(productsFavorite);

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
                <Grid item xs={6} className="add-left">
                    {/* Sản phẩm */}
                    {products.length > 0 ? (
                        products.map((item) => (
                            <div key={item._id}>
                                <section className="add-item">
                                    <div className="add-item__image">
                                        <img src={item.productId?.imageURL} alt="" style={{ borderRadius: "5px" }} />
                                    </div>
                                    {/*  */}
                                    <div className="add-item__main">
                                        <div className="add-item__title">
                                            <h1 className="add-item__heading">{item.productId?.name}</h1>
                                            <p className="add-item__price">${item.productId.price}</p>
                                        </div>
                                        <div className="add-item__stock">${item.productId?.price} | In Stock</div>
                                        <div className="product-option">
                                            <form className="product-option__form">
                                                <select name="" id="" className="product-option__select">
                                                    <option value="LavAzza" className="product-option__select-option">
                                                        LavAzza
                                                    </option>
                                                </select>

                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "30px",
                                                    }}
                                                >
                                                    <AddFavorite productId={item?.productId._id} />
                                                    <AlertDialog handleDelete={() => handleDeleteOrderItem(item?._id)}>
                                                        <div className="product-option__icon-item">
                                                            <img src={deleted} alt="" />
                                                            Delete
                                                        </div>
                                                    </AlertDialog>
                                                </div>
                                            </form>
                                            <div className="product-option__icon">
                                                <ButtonAddToCard productId={item.productId._id} product={item} />
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <div className="add__dot"></div>
                            </div>
                        ))
                    ) : (
                        <div>Loading ...</div>
                    )}

                    {/* Bottom */}
                    <div className="addLeft-bottom" style={{ marginTop: "50px" }}>
                        <div className="addLeft-bottom__left">
                            <img src={aroundLeft} alt="" />
                            Continue Shopping
                        </div>
                        <div className="addLeft-bottom__list"></div>
                    </div>
                </Grid>
            </Grid>
        </Box>
    );
};

export default FavoriteProduct;
