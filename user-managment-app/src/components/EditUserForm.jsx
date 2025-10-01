import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditUserForm({ open, onClose, user, onUpdate }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setCompany(user.company?.name || "");
    }
  }, [user]);

const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Name is required");
    if (!/\S+@\S+\.\S+/.test(email)) return toast.error("Valid email is required");

    onUpdate(user.id, {
      name: name.trim(),
      email: email.trim(),
      company: company ? { name: company.trim() } : undefined,
    });

    toast.success("User updated successfully!");
    onClose();
  };

 return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}