import { useEffect, useMemo, useState } from "react";
import { fetchUsers } from "../api/Users";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem, InputAdornment,InputLabel, FormControl
} from "@mui/material";
import AddUserForm from "../components/AddUserForm";
import UserTable from "../components/UserTable";
import EditUserForm from "../components/EditUserForm"; 
import Pagination from "../components/Pagination";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("name-asc");
  const [editUser, setEditUser] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

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
    setOpenAdd(false); 
  };

  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const updateUser = (id, patch) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...patch } : u))
    );
  };

const view = useMemo(() => {
  const term = q.trim().toLowerCase();
  let arr = term
    ? users.filter((u) => u.name?.toLowerCase().includes(term)) 
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

  const totalPages = Math.ceil(view.length / usersPerPage);
  const paginatedUsers = view.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <Box sx={{ p: 3, width: "100%" }}>
      <Typography
  variant="h4"
  fontWeight="bold"
  color="primary"
  gutterBottom
  sx={{
    fontFamily: "'Merriweather', serif"
  }}
>
  User Management
</Typography>


      <Box sx={{ display: "flex", gap: 2, mb: 2, width: "100%" }}>
<TextField
  value={q}
  onChange={(e) => setQ(e.target.value)}
  label="Search by name"
  size="small"
  fullWidth
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon color="action" />
      </InputAdornment>
    ),
  }}
/>
   <FormControl size="small" sx={{ minWidth: 150 }}>
  <InputLabel id="sort-label">Sort By</InputLabel>
  <Select
    labelId="sort-label"
    value={sort}
    onChange={(e) => setSort(e.target.value)}
    IconComponent={ArrowDropDownIcon}
  >
    <MenuItem value="name-asc">Name ↑</MenuItem>
    <MenuItem value="name-desc">Name ↓</MenuItem>
    <MenuItem value="email-asc">Email ↑</MenuItem>
    <MenuItem value="email-desc">Email ↓</MenuItem>
  </Select>
</FormControl>

        <AddUserForm 
          open={openAdd} 
          onClose={() => setOpenAdd(false)} 
          onAdd={addUser} 
        />
      </Box>

      <UserTable users={paginatedUsers} onDelete={deleteUser} onEdit={setEditUser} />

      <EditUserForm
        open={!!editUser}
        user={editUser}
        onClose={() => setEditUser(null)}
        onUpdate={updateUser}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </Box>
  );
}
