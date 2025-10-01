import { useState } from "react";
import {
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Slide,
  Box,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

const Transition = (props) => <Slide direction="up" {...props} />;

export default function AddUserForm({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Name is required");
    if (!/\S+@\S+\.\S+/.test(email)) return alert("Valid email is required");

    onAdd({
      name: name.trim(),
      email: email.trim(),
      company: company ? { name: company.trim() } : undefined,
    });

    setName("");
    setEmail("");
    setCompany("");
    setOpen(false);
  };

  return (
    <>
      {/* Floating Add Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => setOpen(true)}
          sx={{ boxShadow: 3 }}
        >
          <AddIcon />
        </Fab>
      </Box>

      {/* Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { borderRadius: 3, p: 1 },
        }}
      >
        <DialogTitle textAlign="center" color="primary">
          ➕ Add New User
        </DialogTitle>

        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 1,
          }}
        >
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
          />
          <TextField
            label="Company (optional)"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            variant="outlined"
          />
        </DialogContent>

        <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 2 }}>
          <Button onClick={() => setOpen(false)} variant="outlined" color="error">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Add User
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
