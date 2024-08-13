import { Link } from "react-router-dom";
import "./PurchaseOrder.scss";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../../hooks/LoadingContext";
import { toast } from "react-toastify";
import { UserContext } from "../../hooks/UserContextUser";

const PurchaseOrder = () => {
    const [orders, setOrders] = useState([]);
    const { setIsLoading } = useContext(LoadingContext);
    const [user, setUser] = useState({});
    const { userData } = useContext(UserContext);

    useEffect(() => {
        setUser(userData);
    }, [userData]);

    const getOrderPurchase = async (userId) => {
        try {
            setIsLoading(true);
            if (userId) {
                const res = await axios.get(`https://project-one-navy.vercel.app/orderReal/${userId}`);
                setOrders(res.data.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user?._id) {
            getOrderPurchase(user._id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const handleDeletePurchaseOrder = async (id) => {
        try {
            await axios.delete(`https://project-one-navy.vercel.app/orderReal/${id}`);
            getOrderPurchase(user._id);
            toast.success("Xóa thành công");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="purchase">
            <div className="purchase-list">
                {orders.map((order) => (
                    <div key={order._id} className="purchase-item">
                        <p className="purchase-time">{new Date(order?.createdAt).toLocaleString()}</p>
                        <button onClick={() => handleDeletePurchaseOrder(order._id)}>Xóa</button>
                        {(order.products || []).map((product) => (
                            <div className="purchase-main" key={product._id}>
                                <img
                                    src={product?.productId?.imageURL}
                                    alt={product?.productId?.name}
                                    className="purchase-main__image"
                                />
                                <div>
                                    <p className="purchase-main__title">{product?.productId?.name}</p>
                                    <p className="purchase-main__quantity">Số lượng: {product?.quantity}</p>
                                    <p className="purchase-main__pass">Trả hàng miễn phí 15 ngày</p>
                                </div>
                                <p className="purchase-main__total">{product?.totalAmount}đ</p>
                            </div>
                        ))}

                        <div className="purchase-action">
                            {order?.shipping === "noFree" && (
                                <p className="purchase-total">
                                    Tiền ship: <span>₫10.000</span>
                                </p>
                            )}

                            <p className="purchase-total">
                                Thành tiền: <span>₫{order?.totalPrice}</span>
                            </p>
                            <div className="purchase-btn">
                                <Link to={"/"} className="purchase-btn__pass">
                                    Mua lại
                                </Link>
                                <Link to={"#"} className="purchase-btn__contact">
                                    Liên hệ người bán
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PurchaseOrder;
