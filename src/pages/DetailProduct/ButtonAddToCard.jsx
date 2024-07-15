import Button from "../../components/Button/Button";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../../hooks/LoadingContext";
import { MessagesContext } from "../../hooks/MessagesContext";
import { toast } from "react-toastify";
import { OrderContext } from "../../hooks/OrderContext";
import { UserContext } from "../../hooks/UserContextUser";

// eslint-disable-next-line react/prop-types
const ButtonAddToCard = ({ productId, product }) => {
    const { setIsLoading } = useContext(LoadingContext);
    const { setMessages } = useContext(MessagesContext);
    const { fetchOrders } = useContext(OrderContext);
    const [user, setUser] = useState({});
    // Lấy thông tin người dùng
    const { userData } = useContext(UserContext);
    useEffect(() => {
        setUser(userData);
    }, [userData]);

    const handleAddToCard = async () => {
        if (productId) {
            try {
                setIsLoading(true);
                const res = await axios.post(`https://project-one-navy.vercel.app/order/${user._id}`, {
                    productId: productId,
                    // eslint-disable-next-line react/prop-types
                    quantity: product.quantity || 1,
                });
                if (res.status === 200) {
                    toast.success("Thêm vào giỏ hàng thành công ✅", {
                        position: "top-right",
                        autoClose: 1500,
                    });
                }
                fetchOrders();
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
    return <Button title={"Add to cart"} onClick={handleAddToCard} />;
};
export default ButtonAddToCard;
