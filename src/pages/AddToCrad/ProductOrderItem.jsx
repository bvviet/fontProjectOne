/* eslint-disable react/prop-types */
import { useContext } from "react";
import AddFavorite from "../../components/AddFavourite/AddFavourite";
import AlertDialog from "../../components/DeleteConfirm/Delete";
import { OrderContext } from "../../hooks/OrderContext";
import { LoadingContext } from "../../hooks/LoadingContext";
import { MessagesContext } from "../../hooks/MessagesContext";
import { toast } from "react-toastify";
import deleted from "../../assets/icons/delete.svg";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const ProductOrderItem = ({ item }) => {
    const { fetchOrders } = useContext(OrderContext);
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

    return (
        // eslint-disable-next-line react/prop-types
        <div key={item?._id}>
            <section className="add-item">
                <div className="add-item__image">
                    <img src={item?.productId?.imageURL} alt="" style={{ borderRadius: "5px" }} />
                </div>
                {/*  */}
                <div className="add-item__main">
                    <div className="add-item__title">
                        <h1 className="add-item__heading">{item?.productId?.name}</h1>
                        <p className="add-item__price">${item?.totalAmount}</p>
                    </div>
                    <div className="add-item__stock">${item?.productId?.price} | In Stock</div>
                    <div className="product-option">
                        <form className="product-option__form">
                            <select name="" id="" className="product-option__select">
                                <option value="LavAzza" className="product-option__select-option">
                                    LavAzza
                                </option>
                            </select>
                            <div className="product-option__quantity">
                                <input type="number" defaultValue={item.quantity} style={{ width: "38px" }} />
                            </div>
                        </form>
                        <div className="product-option__icon">
                            <div className="product-option__icon-item">
                                <AddFavorite productId={item.productId?._id} />
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
    );
};
export default ProductOrderItem;
