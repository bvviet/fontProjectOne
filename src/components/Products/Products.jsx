import { useInView } from "react-intersection-observer";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import "./Products.scss";
import PropTypes from "prop-types";
import start from "../../assets/icons/start.svg";
import { useContext } from "react";
import AddFavorite from "../AddFavourite/AddFavourite";
import { ProductContext } from "../../contexts/productsCotext";

const ProductItem = ({ product }) => {
    const { ref, inView } = useInView({
        triggerOnce: true, // Chỉ kích hoạt một lần
        threshold: 0.1, // Kích hoạt khi 10% của phần tử được nhìn thấy
    });

    return (
        <Grid item xs={1}>
            <article className="product-item" ref={ref}>
                <div className="product-item__img">
                    <Link to={`/product/${product._id}`} className="product-item__img-link">
                        {inView && <img src={product.imageURL} alt="" className="product-item__thumb" />}
                    </Link>
                    <div className="product-item__heart">
                        <AddFavorite productId={product._id} />
                    </div>
                </div>
                <h3 className="product-item__title">{product.name}</h3>
                <p className="product-item__lava">{product.description}</p>
                <div className="product-item__footer">
                    <p className="product-item__price">${product.price}</p>
                    <div className="product-item__comment">
                        <img src={start} alt="" className="product-item__start" />
                        <p className="product-item__number">4.6</p>
                    </div>
                </div>
            </article>
        </Grid>
    );
};

ProductItem.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        imageURL: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
};

const Products = () => {
    const { products } = useContext(ProductContext);
    console.log("products", products);

    return (
        <div className="product">
            <h2 className="product__title">Total LavAzza 1320</h2>
            <Box sx={{ width: "100%" }}>
                <Grid
                    container
                    rowSpacing={3}
                    columnSpacing={{ sm: "30px" }}
                    columns={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }}
                >
                    {products?.length > 0
                        ? products.map((product) => <ProductItem key={product._id} product={product} />)
                        : <p style={{margin:"20px 0", fontWeight:"600", fontSize:"1.5vw"}}>không có sản phẩm nào.</p>}
                </Grid>
            </Box>
        </div>
    );
};

export default Products;
