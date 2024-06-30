import "./style.scss";
import axios from "axios";
import Tippy from "@tippyjs/react/headless";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSpring, motion, AnimatePresence } from "framer-motion";

import useDebounce from "../../hooks/useDebounce";
import pro1 from "../../assets/images/product1.png";
import search from "../../assets/icons/search.svg";
import clear from "../../assets/icons/clear.svg";
import loadingIcon from "../../assets/icons/loading.svg";

const Search = () => {
    const inputRef = useRef();
    const [searchResult, setSearchResult] = useState([]);
    const [valueInput, setValueInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [showResult, setShowResult] = useState(true);

    const debounce = useDebounce(valueInput, 500);

    // Lấy dữ liệu input
    const handleSearch = (event) => {
        setValueInput(event.target.value);
        console.log(valueInput);
    };

    // Xóa dữ liệu input
    const clearValueInput = () => {
        setValueInput("");
        inputRef.current.focus();
    };

    useEffect(() => {
        if (!debounce.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchProduct = async () => {
            try {
                setLoading(true);
                const result = await axios.get("https://project-one-navy.vercel.app/product/search", {
                    params: {
                        name: debounce,
                    },
                });
                setSearchResult(result.data.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        if (debounce.trim() !== "") {
            fetchProduct();
        } else {
            setSearchResult([]);
        }
    }, [debounce]);

    // Ẩn nội kết quả tìm kiếm
    const handleHideResult = () => {
        setShowResult(false);
    };

    const springConfig = { damping: 15, stiffness: 300 };
    const initialScale = 0.5;
    const opacity = useSpring(0, springConfig);
    const scale = useSpring(initialScale, springConfig);

    function onMount() {
        scale.set(1);
        opacity.set(1);
    }

    function onHide({ unmount }) {
        const cleanup = scale.onChange((value) => {
            if (value <= initialScale) {
                cleanup();
                unmount();
            }
        });

        scale.set(initialScale);
        opacity.set(0);
    }

    return (
        <Tippy
            visible={showResult && searchResult.length > 0}
            interactive
            onClickOutside={handleHideResult}
            animation={true}
            onMount={onMount}
            onHide={onHide}
            render={(attrs) => (
                <div tabIndex="-1" {...attrs}>
                    <div className="wrapper">
                        <AnimatePresence>
                            {searchResult.map((value) => (
                                <motion.div
                                    key={value._id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="result-item">
                                        <div className="result-item__right">
                                            <Link to="#">
                                                <p className="result-item__title">{value.name}</p>
                                            </Link>
                                            <span className="result-item__price">{value.price}$</span>
                                        </div>
                                        <div className="result-item__img">
                                            <img src={pro1} alt="" />
                                        </div>
                                    </div>
                                    <hr />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            )}
        >
            <form className="top-action__group-search">
                <input
                    type="text"
                    ref={inputRef}
                    value={valueInput}
                    onChange={handleSearch}
                    onFocus={() => setShowResult(true)}
                    placeholder="Tìm kiếm sản phẩm"
                />
                {valueInput && !loading && (
                    <button onClick={clearValueInput}>
                        <img src={clear} alt="clear" className="top-action__icon icon top-action__icon-clear" />
                    </button>
                )}
                {loading && (
                    <img src={loadingIcon} alt="loading" className="top-action__icon icon top-action__icon-loading" />
                )}
                <button className="top-action__btn">
                    <img src={search} alt="search" className="top-action__icon icon" />
                </button>
            </form>
        </Tippy>
    );
};

export default Search;
