import "./PopupSuccess.scss";
import success from "../../assets/icons/success.svg";
import { Link } from "react-router-dom";
import { useModelContext } from "../../contexts/ModalProvider";
const PopupSuccess = () => {
    const { setIsSShowing } = useModelContext();
    return (
        <div className="popup">
            <div className="popup__top">
                <img src={success} alt="success" className="popup__icon" />
                <p className="popup__title">SUCCESS</p>
            </div>
            <div className="popup-content">
                <p className="popup-content__thank">Thank you for your request.</p>
                <p className="popup-content__we"> We are working hard to find the best service and deals for you.</p>
                <p className="popup-content__shortly"> Shortly you will find a confirmation in your email.</p>
            </div>
            <div className="popup-action">
                <Link onClick={() => setIsSShowing(false)} to={"/purchaseOrder"} className="popup-button">
                    Continue
                </Link>
            </div>
        </div>
    );
};
export default PopupSuccess;
