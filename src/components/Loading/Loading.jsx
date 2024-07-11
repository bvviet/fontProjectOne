import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

export default function Loading({ isShow }) {
    return (
        isShow && (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    zIndex: 9999,
                    backgroundColor: "#e6e2e2",
                    opacity: 0.6,
                }}
            >
                <CircularProgress />
            </Box>
        )
    );
}

Loading.propTypes = {
    isShow: PropTypes.bool.isRequired,
};
