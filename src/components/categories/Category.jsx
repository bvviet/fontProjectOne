import "./Category.scss";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { CategoryContext } from "../../contexts/categoriesCotext";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../contexts/productsCotext";
import axios from "axios";
import { LoadingContext } from "../../hooks/LoadingContext";

const Category = () => {
    const { categories } = useContext(CategoryContext);
    const { setProducts } = useContext(ProductContext);
    const { setIsLoading } = useContext(LoadingContext);
    const [isActive, setIsActive] = useState("");

    useEffect(() => {
        const fetchProductByCategory = async () => {
            try {
                setIsLoading(true);
                const url = isActive
                    ? `https://project-one-navy.vercel.app/product/categories/${isActive}`
                    : `https://project-one-navy.vercel.app/product`;
                const response = await axios.get(url);

                setProducts(response.data.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProductByCategory();
    }, [isActive, setProducts]);

    console.log("isActive", isActive);

    const handleCategoryClick = (categoryId) => {
        if (isActive === categoryId) {
            setIsActive("");
        } else {
            setIsActive(categoryId);
        }
    };

    return (
        <div className="cate">
            <h2 className="cate__title">Browse Categories</h2>
            <Box sx={{ width: "100%" }}>
                <Grid container rowSpacing={0} columnSpacing={{ sm: "50px" }} columns={{ xs: 1, md: 3, lg: 3 }}>
                    {categories.map((category) => (
                        <Grid item xs={1} key={category._id}>
                            <article
                                className={`cate-item ${isActive === category._id ? "cate-item__active" : ""} `}
                                onClick={() => handleCategoryClick(category._id)}
                            >
                                <img src={category.image} alt="" className="cate-item__thumb " />
                                <div className="cate-item__info">
                                    <h3 className="cate-item__title">{category.name}</h3>
                                    <p className="cate-item__price">$24 - $150</p>
                                    <h3 className="cate-item__desc">{category.description}</h3>
                                </div>
                            </article>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
};

export default Category;
