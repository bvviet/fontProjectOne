import axios from "axios";
import heart from "../../assets/icons/heart.svg";
import heartRed from "../../assets/icons/heartRed.svg";
import { UserContext } from "../../hooks/UserContextUser";
import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MessagesContext } from "../../hooks/MessagesContext";
import { FavoriteContext } from "../../hooks/FavoriteContext";
// eslint-disable-next-line react/prop-types
const AddFavorite = ({ productId }) => {
    const { userData } = useContext(UserContext);
    const { products } = useContext(FavoriteContext);
    const { setMessages } = useContext(MessagesContext);
    const { fetchDetail } = useContext(FavoriteContext);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        setIsFavorite(products.some((item) => item.productId._id === productId));
    }, [products, productId]);

    // Thêm sản phẩm vào danh sách yêu thích
    const handleAddFavorite = useCallback(async () => {
        try {
            const response = await axios.post("https://project-one-navy.vercel.app/favorite", {
                productId: productId,
                userId: userData._id,
            });
            if (response.status === 200) {
                fetchDetail();
                toast.success(response.data.message, {
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
        }
    }, [fetchDetail, productId, userData._id, setMessages]);

    // Lấy danh sách yêu thích theo người dùng

    return (
        <div className="" onClick={handleAddFavorite}>
            {isFavorite ? (
                <img src={heartRed} alt="" style={{ marginTop: "8px", cursor: "pointer" }} />
            ) : (
                <img src={heart} alt="" style={{ cursor: "pointer" }} />
            )}
        </div>
    );
};
export default AddFavorite;
