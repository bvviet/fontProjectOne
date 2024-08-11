import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const columns = [
    { id: "name", label: "Tên danh mục", minWidth: 170 },
    {
        id: "description",
        label: "Mô tả",
        minWidth: 170,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "image",
        label: "Ảnh",
        minWidth: 170,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "actions",
        label: "Hành động",
        minWidth: 170,
        align: "right",
    },
];

const ListCategories = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState([]);
    const navigate = useNavigate();

    const createData = (data) => {
        return data.map((item) => ({
            id: item._id,
            name: item.name,
            description: item.description,
            image: item.image,
        }));
    };

    const fetchProducts = async () => {
        const response = await axios.get("http://localhost:3000/categories");
        setRows(createData(response.data.data));
    };

    React.useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleEdit = (id) => {
        navigate(`/admin/update/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            if (window.confirm("Bạn có chắc chắn xóa")) {
                const response = await axios.delete(`http://localhost:3000/categories/${id}`);
                console.log(response);
                fetchProducts();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="list-admin">
            <Typography sx={{ fontSize: "20px", fontWeight: "500", marginBottom: "20px" }}>
                Danh sách dah mục
            </Typography>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 540 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            if (column.id === "actions") {
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        <Button onClick={() => handleEdit(row.id)}>Sửa</Button>
                                                        <Button onClick={() => handleDelete(row.id)}>Xóa</Button>
                                                    </TableCell>
                                                );
                                            }
                                            if (column.id === "image") {
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        <img
                                                            src={value}
                                                            alt={row.name}
                                                            style={{
                                                                maxWidth: "60px",
                                                                height: "60px",
                                                                marginLeft: "auto",
                                                            }}
                                                        />
                                                    </TableCell>
                                                );
                                            }
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === "number"
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
};

export default ListCategories;
