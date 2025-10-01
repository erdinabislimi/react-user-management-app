import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { fetchUserById } from "../api/Users"; 
import { Button } from "@mui/material";

export default function UserDetailsPage() {
  const { id } = useParams();
  const fromList = useLocation().state?.user;
  const [user, setUser] = useState(fromList || null);
  const [loading, setLoading] = useState(!fromList);
  const [err, setErr] = useState(null);
  const [showMore, setShowMore] = useState(false); 
  useEffect(() => {
    if (fromList) return;
    const ac = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        setUser(await fetchUserById(id, { signal: ac.signal }));
      } catch (e) {
        if (e.name !== "AbortError") setErr(e.message || "Load failed");
      } finally {
        setLoading(false);
      }
    })();
    return () => ac.abort();
  }, [id, fromList]);

  if (loading) return <p>Loading…</p>;
  if (err) return <p style={{ color: "crimson" }}>Error: {err}</p>;
  if (!user) return <p>User not found.</p>;

  const a = user.address;

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <Link to="/" style={{ textDecoration: "none", color: "blue" }}>
        &larr; Back
      </Link>

      <h2 style={{ marginTop: 8 }}>{user.name}</h2>
      <p><b>Email:</b> {user.email}</p>

      <Button 
        variant="outlined" 
        size="small" 
        onClick={() => setShowMore(!showMore)}
        sx={{ mb: 2 }}
      >
        {showMore ? "Show less" : "See more"}
      </Button>

      {showMore && (
        <div>
          <p><b>Phone:</b> {user.phone ?? "-"}</p>
          <p><b>Website:</b> {user.website ?? "-"}</p>
          <p><b>Address:</b> {a ? `${a.street}, ${a.suite}, ${a.city}, ${a.zipcode}` : "-"}</p>
          {user.company && (
            <p><b>Company:</b> {user.company.name} - "{user.company.catchPhrase}"</p>
          )}
        </div>
      )}
    </div>
  );
}
