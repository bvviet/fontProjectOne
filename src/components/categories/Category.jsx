import "./Category.scss";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import cate1 from "../../assets/images/cate1.png";
import cate2 from "../../assets/images/cate2.png";
import cate3 from "../../assets/images/cate3.png";

const Category = () => {
    return (
        <div className="cate">
            <h2 className="cate__title">Browse Categories</h2>
            <Box sx={{ width: "100%" }}>
                <Grid container rowSpacing={0} columnSpacing={{ sm: "50px" }} columns={{ xs: 1, md: 3, lg: 3 }}>
                    <Grid item xs={1}>
                        <article className="cate-item">
                            <img src={cate1} alt="" className="cate-item__thumb" />
                            <div className="cate-item__info">
                                <p className="cate-item__price">$24 - $150</p>
                                <h3 className="cate-item__desc">New sumatra mandeling coffe blend</h3>
                            </div>
                        </article>
                    </Grid>
                    <Grid item xs={1}>
                        <article className="cate-item">
                            <img src={cate2} alt="" className="cate-item__thumb" />
                            <div className="cate-item__info">
                                <p className="cate-item__price">$24 - $150</p>
                                <h3 className="cate-item__desc">New sumatra mandeling coffe blend</h3>
                            </div>
                        </article>
                    </Grid>
                    <Grid item xs={1}>
                        <article className="cate-item">
                            <img src={cate3} alt="" className="cate-item__thumb" />
                            <div className="cate-item__info">
                                <p className="cate-item__price">$24 - $150</p>
                                <h3 className="cate-item__desc">New sumatra mandeling coffe blend</h3>
                            </div>
                        </article>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default Category;
