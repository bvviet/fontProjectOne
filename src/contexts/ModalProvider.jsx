/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import clearIcon from "../assets/icons/clear.svg";

const ModalContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useModelContext = () => {
    return useContext(ModalContext);
};

const ModalProvider = ({ children }) => {
    const [isShowing, setIsShowing] = useState(false);
    const [content, setContent] = useState();

    useEffect(() => {
        if (isShowing) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "scroll";
        }
    }, [isShowing]);

    const openPopup = (content) => {
        setIsShowing(true);
        setContent(content);
    };

    return (
        <ModalContext.Provider value={{ openPopup, setIsShowing }}>
            {children}
            {isShowing && (
                <div className="fixed inset-0 flex items-center justify-center bg-slate-600/60 ">
                    <div className="relative">
                        {/* Nút "Đóng" nằm ở mép trên bên phải của content */}
                        <div className="absolute top-2 right-4 p-2 cursor-pointer" onClick={() => setIsShowing(false)}>
                            <img src={clearIcon} alt="close" width={20} style={{ filter: " var(--icon--color)" }} />
                        </div>
                        {content}
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    );
};
export default ModalProvider;
