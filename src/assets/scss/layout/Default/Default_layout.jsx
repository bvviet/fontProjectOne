import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "../../../../layouts/header/Header";
import "./style.scss";

const Default_layout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );
};

Default_layout.propTypes = {
    children: PropTypes.node,
};

export default Default_layout;
