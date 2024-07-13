import axios from "axios";
import heart from "../../assets/icons/heart.svg";
import { UserContext } from "../../hooks/UserContextUser";
import { useContext } from "react";
import { toast } from "react-toastify";
import { MessagesContext } from "../../hooks/MessagesContext";
// eslint-disable-next-line react/prop-types
const AddFavorite = ({ productId }) => {
    const { userData } = useContext(UserContext);
    const { setMessages } = useContext(MessagesContext);

    // Thêm sản phẩm vào danh sách yêu thích
    const handleAddFavorite = async () => {
        try {
            const response = await axios.post("https://project-one-navy.vercel.app/favorite", {
                productId: productId,
                userId: userData._id,
            });
            if (response.status === 200) {
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
    };

    // Lấy danh sách yêu thích theo người dùng

    return (
        <div className="add-to-card__heart" onClick={handleAddFavorite}>
            <img src={heart} alt="" className="add-to-card__heart-icon" />
        </div>
    );
};
export default AddFavorite;
