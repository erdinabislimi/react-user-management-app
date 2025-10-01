import { Routes, Route } from "react-router-dom";
import UsersPage from "./pages/UsersPage";           
import UserDetailsPage from "./pages/UserDetailsPage"; 

export default function App() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",   
        padding: "16px"
      }}
    >
      <header style={{ display: "flex", justifyContent: "space-between" }}>
      </header>

      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="/users/:id" element={<UserDetailsPage />} />
      </Routes>
    </div>
  );
}
