// src/App.jsx
import { Routes, Route, Link } from "react-router-dom";
import UsersPage from "./pages/UsersPage";            // pa kllapa = default import
import UserDetailsPage from "./pages/UserDetailsPage"; // pa kllapa = default import

export default function App() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <header style={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/" style={{ textDecoration: "none" }}><h1>User Management</h1></Link>
      </header>

      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="/users/:id" element={<UserDetailsPage />} />
      </Routes>
    </div>
  );
}
