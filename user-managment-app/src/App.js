import { Routes, Route, Link } from "react-router-dom";
import UsersPage from "./pages/UsersPage";           
import UserDetailsPage from "./pages/UserDetailsPage"; 

export default function App() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <header style={{ display: "flex", justifyContent: "space-between" }}>
      </header>

      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="/users/:id" element={<UserDetailsPage />} />
      </Routes>
    </div>
  );
}
