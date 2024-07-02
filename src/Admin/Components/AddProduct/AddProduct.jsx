import "./addProduct.scss";
import { useForm } from "react-hook-form";
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

const AddProduct = () => {
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState("");

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

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post("https://project-one-navy.vercel.app/product", data);
            if (response.status === 200) {
                toast.success("Thêm thành công.", {
                    position: "top-right",
                    autoClose: 1500,
                });
                setTimeout(() => {
                    // navigate("/");
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
                        />
                    </div>

                    <Box sx={{ minWidth: 120 }} className="add-form__item">
                        <FormControl fullWidth error={!!errors.category}>
                            <InputLabel id="demo-simple-select-label">Danh mục sản phẩm</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Danh mục sản phẩm"
                                defaultValue=""
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

export default AddProduct;
