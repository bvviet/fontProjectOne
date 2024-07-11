import SlideShow from "../../components/SlidesShow/Slides";
import Category from "../../components/categories/Category";
import Products from "../../components/Products/Products";
import { Box } from "@mui/material";

const Home = () => {
    return (
        <div>
            <Box
                sx={{
                    px: {
                        xs: "16px", // padding cho kích thước rất nhỏ (extra-small)
                        sm: "20px", // padding cho kích thước nhỏ (small)
                        md: "30px", // padding cho kích thước trung bình (medium)
                        lg: "50px", // padding cho kích thước lớn (large)
                        xl: "50px", // padding cho kích thước rất lớn (extra-large)
                    },
                    backgroundColor: "var(--bg-detail)",
                }}
            >
                {/* Slide */}
                <SlideShow />
                {/* Category */}
                <>
                    <Category />
                    <Products />
                </>
            </Box>
        </div>
    );
};

export default Home;
