import { createContext, useCallback, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { UserContext } from "./UserContextUser";
import { LoadingContext } from "./LoadingContext";
import { MessagesContext } from "./MessagesContext";
import axios from "axios";

const FavoriteContext = createContext();

const FavoriteProvider = ({ children }) => {
    const { userData } = useContext(UserContext);
    const { setIsLoading } = useContext(LoadingContext);
    const { setMessages } = useContext(MessagesContext);
    const [products, setProducts] = useState([]);

    // Lấy sản phẩm yêu thích theo người dùng
    const fetchDetail = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`https://project-one-navy.vercel.app/favorite/${userData._id}`);
            setProducts(response.data.favorites);
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
    }, [setIsLoading, setMessages, userData]);

    useEffect(() => {
        if (userData?._id) {
            fetchDetail();
        }
    }, [fetchDetail, userData]);

    const lengthFavorite = () => {
        const number = products.length;
        return number;
    };

    const productsFavoriteLength = lengthFavorite();

    return (
        <FavoriteContext.Provider value={{ products, productsFavoriteLength, fetchDetail }}>
            {children}
        </FavoriteContext.Provider>
    );
};

FavoriteProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { FavoriteContext, FavoriteProvider };
