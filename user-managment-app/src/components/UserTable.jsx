import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip
} from "@mui/material";
import DeleteUser from "./DeleteUser";

export default function UserTable({ users, onDelete }) {
  return (
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
              <TableCell>
                <DeleteUser user={u} onDelete={onDelete} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
