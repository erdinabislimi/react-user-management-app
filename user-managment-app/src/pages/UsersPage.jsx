import { useEffect, useMemo, useState } from "react";
import { fetchUsers } from "../api/Users";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("name-asc");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        setUsers(await fetchUsers());
      } catch (e) {
        setErr(e.message || "Load failed");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addTop = (u) => {
    const id = crypto.randomUUID?.() ?? Date.now();
    setUsers((p) => [{ ...u, id }, ...p]);
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
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
        User Management
      </Typography>

      {/* Search + Sort */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          value={q}
          onChange={(e) => setQ(e.target.value)}
          label="Search"
          variant="outlined"
          size="small"
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

      {/* Add User Form */}
      <AddForm onAdd={addTop} />

      {/* Table */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Company</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {view.map((u) => (
              <TableRow key={u.id} hover>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  {u.company?.name ? (
                    <Chip label={u.company.name} color="primary" variant="outlined" />
                  ) : (
                    "-"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

function AddForm({ onAdd }) {
  const [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [company, setCompany] = useState("");

  const submit = (e) => {
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
  };

  return (
    <Box
      component="form"
      onSubmit={submit}
      sx={{
        display: "flex",
        gap: 2,
        mb: 2,
        p: 2,
        border: "1px solid #eee",
        borderRadius: 2,
      }}
    >
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        size="small"
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        size="small"
      />
      <TextField
        label="Company (optional)"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        size="small"
      />
      <Button type="submit" variant="contained">
        Add
      </Button>
    </Box>
  );
}
