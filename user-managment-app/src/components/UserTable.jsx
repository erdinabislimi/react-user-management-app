import { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip, Button,
  Dialog, DialogContent, DialogActions, DialogTitle,
  Card, CardContent, Avatar, Typography, Box
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import DeleteUser from "./DeleteUser";

export default function UserTable({ users, onDelete, onEdit }) {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <>
      <TableContainer component={Paper} sx={{ width: "100%", mt: 2 }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Company</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  {u.company?.name ? (
                    <Chip label={u.company.name} color="primary" variant="outlined" />
                  ) : "-"}
                </TableCell>
                <TableCell sx={{ display: "flex", gap: 1 }}>
                  <Button
                    size="small"
                    color="primary"
                    startIcon={<Edit />}
                    onClick={() => onEdit(u)}
                  >
                    Edit
                  </Button>

                  <DeleteUser user={u} onDelete={onDelete} />

                  <Button
                    size="small"
                    color="secondary"
                    startIcon={<Visibility />}
                    onClick={() => setSelectedUser(u)}
                  >
                    See More
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", color: "primary.main" }}>
          User Details
        </DialogTitle>
        <DialogContent dividers>
          {selectedUser && (
            <Card elevation={0} sx={{ boxShadow: "none" }}>
              <CardContent>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: "primary.main",
                      fontSize: 28,
                      mb: 2
                    }}
                  >
                    {selectedUser.name?.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography variant="h5" fontWeight="bold">
                    {selectedUser.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedUser.company?.name ?? "No Company"}
                  </Typography>
                </Box>

                <Typography><b>Email:</b> {selectedUser.email}</Typography>
                <Typography><b>Phone:</b> {selectedUser.phone ?? "-"}</Typography>
                <Typography><b>Website:</b> {selectedUser.website ?? "-"}</Typography>
                <Typography>
                  <b>Address:</b>{" "}
                  {selectedUser.address
                    ? `${selectedUser.address.street}, ${selectedUser.address.city}`
                    : "-"}
                </Typography>
              </CardContent>
            </Card>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={() => setSelectedUser(null)} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
