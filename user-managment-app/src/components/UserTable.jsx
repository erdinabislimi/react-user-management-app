import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip, IconButton
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

export default function UserTable({ users, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper} sx={{ width: "100%", mt: 2 }}>
  <Table sx={{ minWidth: 800 }}>
    <TableHead>
      <TableRow>
        <TableCell><b>Nadme</b></TableCell>
        <TableCell><b>Email</b></TableCell>
        <TableCell><b>Company</b></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {view.map((u) => (
        <TableRow key={u.id}>
          <TableCell>{u.name}</TableCell>
          <TableCell>{u.email}</TableCell>
          <TableCell>
            {u.company?.name ? (
              <Chip label={u.company.name} color="primary" variant="outlined" />
            ) : "-"}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

  );
}
