import { useState } from "react";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DeleteUser({ user, onDelete }) {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onDelete(user.id);
    toast.success(`User "${user.name}" deleted successfully!`, {
      position: "top-right",
      autoClose: 3000,
    });
    setOpen(false);
  };

  return (
    <>
      <IconButton color="error" onClick={() => setOpen(true)}>
        <Delete />
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete <b>{user.name}</b>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleConfirm} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
