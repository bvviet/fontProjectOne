import "./UpdateProduct.scss";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

const CustomTextField = styled(TextField)({
    "& label.MuiFormLabel-root": {
        fontSize: "1.6rem",
    },
    background: "transparent",
});

const UpdateProduct = () => {
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState("");
    const [product, setProduct] = useState({
        name: "",
        price: 0,
        description: "",
        stock: 0,
        imageURL: "",
        category: 10,
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (messages) {
            toast.error(messages, {
                position: "top-right",
                autoClose: 2000,
            });
            setMessages("");
        }
    }, [messages]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Lấy thông tin sản phẩm
    useEffect(() => {
        const getDetail = async () => {
            const response = await axios.get(`https://project-one-navy.vercel.app/product/${id}`);
            console.log(response.data);
            setProduct(response.data.data);
        };
        getDetail();
    }, [id]);

    const onSubmit = async (data) => {
        console.log(data);
        setLoading(true);
        try {
            const response = await axios.put(`https://project-one-navy.vercel.app/product/${id}`, data);
            if (response.status === 200) {
                toast.success("Cập nhật thành công.", {
                    position: "top-right",
                    autoClose: 1500,
                });
                setTimeout(() => {
                    navigate("/admin/list");
                }, 2300);
            }
        } catch (error) {
            console.log(error);
            let errorMessage = "";
            if (!error.response) {
                errorMessage = "Không có kết nối mạng. Vui lòng kiểm tra lại kết nối.";
            } else if (error.response.status === 404) {
                errorMessage = "API hiện tại đang bị lỗi :((";
            } else if (error.response.data.message || error.response.data.errors) {
                errorMessage = error.response.data.message || error.response.data.errors[0];
            } else {
                errorMessage = "Đã xảy ra lỗi vui lòng thử lại";
            }
            setMessages(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ position: "relative" }}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 9999,
                }}
            >
                {loading && <CircularProgress />}
            </Box>
            {/* Hiển thị messages */}
            <ToastContainer />
            <div className="container">
                <h1 className="heading">Thêm sản phẩm</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="add-form">
                    <div className="add-form__item">
                        <CustomTextField
                            id="outlined-basic"
                            label="Tên sản phẩm"
                            variant="outlined"
                            className="add-form__item-name"
                            {...register("name", { required: "Tên sản phẩm là bắt buộc" })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            value={product.name}
                            onChange={(e) => setProduct({ ...product, name: e.target.value })}
                        />
                    </div>

                    <div className="add-form__item">
                        <CustomTextField
                            id="outlined-basic"
                            label="Giá"
                            type="number"
                            variant="outlined"
                            className="add-form__item-name"
                            {...register("price", {
                                required: "Giá là bắt buộc",
                                min: { value: 0, message: "Giá phải lớn hơn hoặc bằng 0" },
                            })}
                            error={!!errors.price}
                            helperText={errors.price?.message}
                            value={product?.price}
                            onChange={(e) => setProduct({ ...product, price: e.target.value })}
                        />
                    </div>

                    <div className="add-form__item">
                        <CustomTextField
                            id="outlined-basic"
                            label="Mô tả"
                            variant="outlined"
                            className="add-form__item-name"
                            {...register("description", { required: "Mô tả là bắt buộc" })}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                            value={product?.description}
                            onChange={(e) => setProduct({ ...product, description: e.target.value })}
                        />
                    </div>

                    <div className="add-form__item">
                        <CustomTextField
                            id="outlined-basic"
                            label="Số lượng"
                            type="number"
                            variant="outlined"
                            className="add-form__item-name"
                            {...register("stock", { required: "Số lượng là bắt buộc" })}
                            error={!!errors.stock}
                            helperText={errors.stock?.message}
                            value={product?.stock}
                            onChange={(e) => setProduct({ ...product, stock: e.target.value })}
                        />
                    </div>

                    <div className="add-form__item">
                        <CustomTextField
                            id="outlined-basic"
                            label="Hình ảnh"
                            type="text"
                            variant="outlined"
                            className="add-form__item-name"
                            {...register("imageURL", { required: "Hình ảnh là bắt buộc" })}
                            error={!!errors.imageURL}
                            helperText={errors.imageURL?.message}
                            value={product?.imageURL}
                            onChange={(e) => setProduct({ ...product, imageURL: e.target.value })}
                        />
                    </div>

                    <Box sx={{ minWidth: 120 }} className="add-form__item">
                        <FormControl fullWidth error={!!errors.category}>
                            <InputLabel id="demo-simple-select-label">Danh mục sản phẩm</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Danh mục sản phẩm"
                                defaultValue={product.category === product.category}
                                {...register("category", { required: "Danh mục sản phẩm là bắt buộc" })}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                            {errors.category && <p className="error-message">{errors.category.message}</p>}
                        </FormControl>
                    </Box>

                    <Button className="button-form" type="submit" variant="outlined">
                        Thêm
                    </Button>
                </form>
            </div>
        </Box>
    );
};

export default UpdateProduct;
