import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState([]);
    const [userId, setUserId] = useState("");
    const token = localStorage.getItem("token");

    const fetchToken = () => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserId(decoded.id);
            } catch (error) {
                console.error("Lỗi khi giải mã token:", error.message);
            }
        } else {
            setUserId(null);
        }
    };

    useEffect(() => {
        fetchToken();
    }, [token]);

    useEffect(() => {
        const fetchUserId = async () => {
            if (userId) {
                try {
                    const response = await axios.get(`https://project-one-navy.vercel.app/auth/${userId}`);
                    setUserData(response.data.data);
                } catch (error) {
                    console.error("Lỗi khi fetch user:", error.message);
                }
            }
        };
        fetchUserId();
    }, [userId]);

    return (
        <UserContext.Provider value={{ userData, setUserData, setUserId, fetchToken }}>{children}</UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node,
};

export { UserProvider, UserContext };
