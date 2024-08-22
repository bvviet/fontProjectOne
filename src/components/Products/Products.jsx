import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import "./Products.scss";
import { useContext } from "react";
import { ProductContext } from "../../contexts/productsCotext";
import ProductItem from "./ProductItem";

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
                    {products?.length > 0 ? (
                        products.map((product) => <ProductItem key={product._id} product={product} />)
                    ) : (
                        <p style={{ margin: "20px 0", fontWeight: "600", fontSize: "1.5vw" }}>không có sản phẩm nào.</p>
                    )}
                </Grid>
            </Box>
        </div>
    );
};

export default Products;
