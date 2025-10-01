import { useEffect, useMemo, useState } from "react";
import { fetchUsers } from "../api/Users";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddUserForm from "../components/AddUserForm";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("name-asc");

  useEffect(() => {
    (async () => {
      try {
        setUsers(await fetchUsers());
      } catch (e) {
        setErr(e.message || "Load failed");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addUser = (u) => {
    const id = crypto.randomUUID?.() ?? Date.now();
    setUsers((prev) => [{ ...u, id }, ...prev]);
  };

  const view = useMemo(() => {
    const term = q.trim().toLowerCase();
    let arr = term
      ? users.filter(
          (u) =>
            u.name?.toLowerCase().includes(term) ||
            u.email?.toLowerCase().includes(term)
        )
      : users.slice();

    const [f, d] = sort.split("-");
    const get = (u) =>
      (f === "email" ? u.email : u.name)?.toLowerCase() || "";
    return arr.sort((a, b) =>
      get(a) < get(b) ? (d === "asc" ? -1 : 1) : get(a) > get(b) ? (d === "asc" ? 1 : -1) : 0
    );
  }, [users, q, sort]);

  if (loading) return <p>Loading…</p>;
  if (err) return <p style={{ color: "crimson" }}>Error: {err}</p>;

return (
  <Box sx={{ p: 3, width: "100%" }}>
    <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
      User Management
    </Typography>

    {/* Search + Sort */}
    <Box sx={{ display: "flex", gap: 2, mb: 2, width: "100%" }}>
      <TextField
        value={q}
        onChange={(e) => setQ(e.target.value)}
        label="Search"
        size="small"
        fullWidth
      />
      <Select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        size="small"
      >
        <MenuItem value="name-asc">Name ↑</MenuItem>
        <MenuItem value="name-desc">Name ↓</MenuItem>
        <MenuItem value="email-asc">Email ↑</MenuItem>
        <MenuItem value="email-desc">Email ↓</MenuItem>
      </Select>
    </Box>

    {/* Table */}
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table sx={{ width: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell><b>Name</b></TableCell>
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

    {/* Add User Button */}
    <AddUserForm onAdd={addUser} />
  </Box>
);


}
