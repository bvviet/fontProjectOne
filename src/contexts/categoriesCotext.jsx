// src/context/CategoryContext.js
import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("https://project-one-navy.vercel.app/categories");
            setCategories(response.data.data);
        } catch (error) {
            console.error("Lỗi khi lấy danh mục:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return <CategoryContext.Provider value={{ categories, fetchCategories }}>{children}</CategoryContext.Provider>;
};

CategoryProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { CategoryProvider, CategoryContext };
