import { Link } from "react-router-dom";
import "./style.scss";
import logo from "../../assets/icons/logo.svg";

const Logo = () => {
    return (
        <div className="logo">
            <Link to="/">
                <img src={logo} alt="" className="logo__image" />
            </Link>
            <h1 className="logo__title">grocerymart</h1>
        </div>
    );
};

export default Logo;
