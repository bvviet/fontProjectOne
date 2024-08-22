/* eslint-disable react/prop-types */
import { useInView } from "react-intersection-observer";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import "./Products.scss";
import PropTypes from "prop-types";
import start from "../../assets/icons/start.svg";
import AddFavorite from "../AddFavourite/AddFavourite";

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
                <p className="product-item__lava">{product?.category?.name}</p>
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

export default ProductItem;
