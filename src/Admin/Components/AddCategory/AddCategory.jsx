import "./addCategory.scss";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { CategoryContext } from "../../../contexts/categoriesCotext";

const CustomTextField = styled(TextField)({
    "& label.MuiFormLabel-root": {
        fontSize: "1.6rem",
    },
    background: "transparent",
});

const AddCategory = () => {
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState("");
    const { fetchCategories } = useContext(CategoryContext);

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
            const response = await axios.post("http://localhost:3000/categories", data);
            if (response.status === 200) {
                fetchCategories();
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
                <h1 className="heading">Thêm đanh mục</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="add-formCategories">
                    <div className="add-form__item">
                        <CustomTextField
                            id="outlined-basic"
                            label="Tên danh mục"
                            variant="outlined"
                            className="add-form__item-name"
                            {...register("name", { required: "Tên danh mục là bắt buộc" })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
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
                            label="Hình ảnh"
                            type="text"
                            variant="outlined"
                            className="add-form__item-name"
                            {...register("image", { required: "Hình ảnh là bắt buộc" })}
                            error={!!errors.image}
                            helperText={errors.image?.message}
                        />
                    </div>

                    <Button className="button-form" type="submit" variant="outlined">
                        Thêm
                    </Button>
                </form>
            </div>
        </Box>
    );
};

export default AddCategory;
