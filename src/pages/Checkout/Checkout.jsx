import { Box, Grid } from "@mui/material";
import "./style.scss";

import aroundRight from "../../assets/icons/aroundRight.svg";
const Checkout = () => {
    return (
        <Box
            sx={{
                px: {
                    xs: "16px",
                    sm: "20px",
                    md: "30px",
                    lg: "50px",
                    xl: "50px",
                },
                backgroundColor: "var(--bg-main)",
                padding: "25px 0",
            }}
        >
            {/* Filter */}
            <div className="filter">
                <div className="filter__item">
                    <a href="#" className="filter__heading">
                        Home
                    </a>
                    <img src={aroundRight} alt="aroundRight" className="filter__icon" />
                </div>
                <div className="filter__item">
                    <a href="#" className="filter__heading">
                        checkout
                    </a>
                </div>
            </div>
            <Grid container rowSpacing={0} columnSpacing={{ sm: "50px" }} columns={{ xs: 6, md: 12, lg: 12 }}>
                {/* Check out left */}
                <Grid item xs={6} sm={8}>
                    <div className="checkout-right">
                        <div className="checkout-right__item">
                            <div className="checkout-right__img">
                                <img src="" alt="" />
                            </div>
                            <div className="checkout-right__content">
                                <div>
                                    <h1 className="checkout-right__heading">
                                        Coffee Beans - Espresso Arabica and Robusta Beans
                                    </h1>
                                    <p className="checkout-right__price">$47.00</p>
                                </div>
                                <p className="checkout-right__in">$47.00 | In Stock</p>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={6} sm={4}>
                    <h1>aa</h1>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Checkout;
