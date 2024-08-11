// src/context/ProductContext.js
import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("https://project-one-navy.vercel.app/product");
            setProducts(response.data.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products, setProducts, fetchProducts }}>{children}</ProductContext.Provider>
    );
};

ProductProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { ProductProvider, ProductContext };
