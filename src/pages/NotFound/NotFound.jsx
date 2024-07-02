import "./style.scss";
import NotFondPC from "../../assets/images/NotFoundPC.png";
import NotFoundMobile from "../../assets/images/NotFoundMobile.png";

const NotFound = () => {
    return (
        <div className="notFound-page">
            <div className="notFound-page__left">
                <img src={NotFondPC} className="notFound-page__pc" alt="" />
                <img src={NotFoundMobile} className="notFound-page__mobile" alt="" />
            </div>
            <div className="notFound-page__right">
                <div className="notFound-page__item">
                    <p className="notFound-page__oops">Oopps!</p>
                    <p className="notFound-page__heading">Page not Found</p>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
