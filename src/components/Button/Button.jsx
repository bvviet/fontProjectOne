import "./Button.scss";
import PropTypes from "prop-types";

const Button = ({ title }) => {
    return <button className="btn">{title}</button>;
};

Button.propTypes = {
    title: PropTypes.string,
};

export default Button;
