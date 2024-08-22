import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../../../hooks/LoadingContext";
import ProductItem from "../../../components/Products/ProductItem";
import "./Similar.scss";

/* eslint-disable react/prop-types */
const Similar = ({ categoriesId }) => {
    const { setIsLoading } = useContext(LoadingContext);
    const [products, setProducts] = useState(null);

    useEffect(() => {
        if (categoriesId) {
            const fetchDetail = async () => {
                try {
                    setIsLoading(true);
                    const response = await axios.get(
                        `https://project-one-navy.vercel.app/product/categories/${categoriesId}`
                    );
                    setProducts(response.data.data);
                } catch (error) {
                    console.log(error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchDetail();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoriesId]);

    return (
        <div>
            <h2 className="similar__title">Similar items you might like</h2>
            <div className="similar">
                {products?.length > 0 ? (
                    products.map((product) => <ProductItem key={product._id} product={product} />)
                ) : (
                    <p style={{ margin: "20px 0", fontWeight: "600", fontSize: "1.5vw" }}>không có sản phẩm nào.</p>
                )}
            </div>
        </div>
    );
};
export default Similar;
