import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { UserContext } from "./UserContextUser";
import axios from "axios";

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [orders, setOrders] = useState([]);
    const { userData } = useContext(UserContext);

    useEffect(() => {
        setUser(userData);
    }, [userData]);

    const fetchOrders = async () => {
        if (user?._id) {
            try {
                const res = await axios.get(`https://project-one-navy.vercel.app/order/orders/${user?._id}`);
                setOrders(res.data.data);
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        fetchOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?._id]);

    const orderItems = orders[0]?.order || [];

    // Tính tổng giá
    const totalPrice = () => {
        const amounts = orderItems.map((item) => item.totalAmount);
        const total = amounts.reduce((acc, cur) => acc + cur, 0);
        return total;
    };
    const total = totalPrice();

    // Tính tổng sản phẩm
    const totalQuantity = () => {
        const amounts = orderItems.map((item) => item.quantity);
        const total = amounts.reduce((acc, cur) => acc + cur, 0);
        return total;
    };
    const sumQuantity = totalQuantity();

    return (
        <OrderContext.Provider value={{ orderItems, orders, total, sumQuantity, fetchOrders }}>
            {children}
        </OrderContext.Provider>
    );
};

OrderProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { OrderProvider, OrderContext };
