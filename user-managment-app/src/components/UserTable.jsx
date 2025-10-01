import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip, IconButton
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";  
import DeleteUser from "./DeleteUser";

export default function UserTable({ users, onDelete, onEdit }) {
  return (
<TableContainer component={Paper} sx={{ width: "100%", overflowX: "auto" }}>
  <Table sx={{ width: "100%" }}>
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
                <IconButton color="primary" onClick={() => onEdit(u)}>
                  <EditIcon />
                </IconButton>

                <DeleteUser user={u} onDelete={onDelete} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
