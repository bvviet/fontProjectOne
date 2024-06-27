import "./Products.scss";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

import pro1 from "../../assets/images/product1.png";
import pro2 from "../../assets/images/product2.png";
import pro3 from "../../assets/images/product3.png";
import pro4 from "../../assets/images/product4.png";
import heart from "../../assets/icons/heart.svg";
import heartRed from "../../assets/icons/heartRed.svg";
import start from "../../assets/icons/start.svg";

const Products = () => {
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
                    <Grid item xs={1}>
                        <article className="product-item">
                            <div className="product-item__img">
                                <Link to="/product/1">
                                    <img src={pro1} alt="" className="product-item__thumb" />
                                </Link>
                                <div className="product-item__heart">
                                    <img src={heartRed} alt="" />
                                </div>
                            </div>
                            <h3 className="product-item__title">Coffee Beans - Espresso Arabica and Robusta Beans</h3>
                            <p className="product-item__lava">Lavazza</p>
                            <div className="product-item__footer">
                                <p className="product-item__price">$47.00</p>
                                <div className="product-item__comment">
                                    <img src={start} alt="" className="product-item__start" />
                                    <p className="product-item__number">4.3</p>
                                </div>
                            </div>
                        </article>
                    </Grid>

                    <Grid item xs={1}>
                        <article className="product-item">
                            <div className="product-item__img">
                                <img src={pro2} alt="" className="product-item__thumb" />
                                <div className="product-item__heart">
                                    <img src={heart} alt="" className="product-item__heart--img" />
                                </div>
                            </div>
                            <h3 className="product-item__title">Lavazza Coffee Blends - Try the Italian Espresso</h3>
                            <p className="product-item__lava">Lavazza</p>
                            <div className="product-item__footer">
                                <p className="product-item__price">$47.00</p>
                                <div className="product-item__comment">
                                    <img src={start} alt="" className="product-item__start" />
                                    <p className="product-item__number">3.4</p>
                                </div>
                            </div>
                        </article>
                    </Grid>

                    <Grid item xs={1}>
                        <article className="product-item">
                            <div className="product-item__img">
                                <img src={pro3} alt="" className="product-item__thumb" />
                                <div className="product-item__heart">
                                    <img src={heart} alt="" className="product-item__heart--img" />
                                </div>
                            </div>
                            <h3 className="product-item__title">Lavazza - Caffè Espresso Black Tin - Ground coffee</h3>
                            <p className="product-item__lava">welikecoffee</p>
                            <div className="product-item__footer">
                                <p className="product-item__price">$99.99</p>
                                <div className="product-item__comment">
                                    <img src={start} alt="" className="product-item__start" />
                                    <p className="product-item__number">5.0</p>
                                </div>
                            </div>
                        </article>
                    </Grid>

                    <Grid item xs={1}>
                        <article className="product-item">
                            <div className="product-item__img">
                                <img src={pro4} alt="" className="product-item__thumb" />
                                <div className="product-item__heart">
                                    <img src={heart} alt="" className="product-item__heart--img" />
                                </div>
                            </div>
                            <h3 className="product-item__title">Qualità Oro Mountain Grown - Espresso Coffee Beans</h3>
                            <p className="product-item__lava">Lavazza</p>
                            <div className="product-item__footer">
                                <p className="product-item__price">$38.65</p>
                                <div className="product-item__comment">
                                    <img src={start} alt="" className="product-item__start" />
                                    <p className="product-item__number">4.4</p>
                                </div>
                            </div>
                        </article>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default Products;
