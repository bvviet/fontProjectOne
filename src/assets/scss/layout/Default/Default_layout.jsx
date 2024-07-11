import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "../../../../layouts/header/Header";
import "./style.scss";
import Loading from "../../../../components/Loading/Loading";
import { useContext } from "react";
import { LoadingContext } from "../../../../hooks/LoadingContext";

const Default_layout = () => {
    const { loading } = useContext(LoadingContext);
    return (
        <>
            <Loading isShow={loading} />
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
