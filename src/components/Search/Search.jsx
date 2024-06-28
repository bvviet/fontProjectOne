import "./style.scss";
import Tippy from "@tippyjs/react/headless";
import search from "../../assets/icons/search.svg";
import clear from "../../assets/icons/clear.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

import pro1 from "../../assets/images/product1.png";

const Search = () => {
    const [searchResult, setSearchResult] = useState([1, 4]);
    console.log(setSearchResult);

    return (
        <Tippy
            visible={searchResult.length > 0}
            interactive
            render={(attrs) => (
                <div tabIndex="-1" {...attrs}>
                    <div className="wrapper">
                        <div className="result-item">
                            <div className="result-item__right">
                                <Link to="#">
                                    <p className="result-item__title">
                                        Coffee Beans - Espresso Arabica and Robusta Beans
                                    </p>
                                </Link>
                                <span className="result-item__price">3,600,000</span>
                            </div>
                            <div className="result-item__img">
                                <img src={pro1} alt="" />
                            </div>
                        </div>
                        <hr />
                        <div className="result-item">
                            <div className="result-item__right">
                                <Link to="#">
                                    <p className="result-item__title">
                                        Coffee Beans - Espresso Arabica and Robusta Beans
                                    </p>
                                </Link>
                                <span className="result-item__price">3,600,000</span>
                            </div>
                            <div className="result-item__img">
                                <img src={pro1} alt="" />
                            </div>
                        </div>
                        <hr />
                        <div className="result-item">
                            <div className="result-item__right">
                                <Link to="#">
                                    <p className="result-item__title">
                                        Coffee Beans - Espresso Arabica and Robusta Beans
                                    </p>
                                </Link>
                                <span className="result-item__price">3,600,000</span>
                            </div>
                            <div className="result-item__img">
                                <img src={pro1} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        >
            <form className="top-action__group-search">
                <input type="text" placeholder="Tìm kiếm sản phẩm" />
                <button className="top-action__btn">
                    <img src={clear} alt="search" className="top-action__icon icon top-action__icon-clear" />
                    <img src={search} alt="search" className="top-action__icon icon" />
                </button>
            </form>
        </Tippy>
    );
};

export default Search;
