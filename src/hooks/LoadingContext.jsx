import { createContext, useState } from "react";
import PropTypes from "prop-types";

const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {
    const [loading, setIsLoading] = useState(false);
    return <LoadingContext.Provider value={{ loading, setIsLoading }}>{children}</LoadingContext.Provider>;
};

LoadingProvider.propTypes = {
    children: PropTypes.node,
};

export { LoadingProvider, LoadingContext };
