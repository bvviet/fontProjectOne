import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/system";

// eslint-disable-next-line react/prop-types
export default function AlertDialog({ children, handleDelete }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmDelete = () => {
        handleDelete();
        setOpen(false);
    };

    return (
        <React.Fragment>
            <div onClick={handleClickOpen}>{children}</div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{}}
            >
                <DialogTitle id="alert-dialog-title" sx={{ fontSize: "1.5rem" }}>
                    {"BVV shop cho biết 📢"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{ fontSize: "1.3rem" }}>
                        Bạn có chắc chắn muốn xóa chứ❓
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <ButtonCancel onClick={handleClose} color="error">
                        Hủy
                    </ButtonCancel>
                    <Button onClick={handleConfirmDelete} autoFocus sx={{ fontSize: "1.2rem" }}>
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

const ButtonCancel = styled(Button)({
    fontSize: "1.2rem",
});
