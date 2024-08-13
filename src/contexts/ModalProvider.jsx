/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const ModalContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useModelContext = () => {
    return useContext(ModalContext);
};

const ModalProvider = ({ children }) => {
    const [isShowing, setIsSShowing] = useState(false);
    const [content, setContent] = useState();

    useEffect(() => {
        if (isShowing) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "scroll";
        }
    }, [isShowing]);

    const modalStyle = {
        position: "fixed",
        inset: "0",
    };

    return (
        <ModalContext.Provider value={{ setIsSShowing, isShowing, setContent }}>
            {children}
            {isShowing && (
                <div style={modalStyle}>
                    <div
                        style={{
                            position: "absolute",
                            inset: "0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "rgba(0, 0, 0, 0.4)",
                        }}
                    >
                        {content}
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    );
};
export default ModalProvider;
