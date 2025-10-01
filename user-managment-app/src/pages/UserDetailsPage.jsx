import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { fetchUserById } from "../api/Users"; 

export default function UserDetailsPage() {
  const { id } = useParams();
  const fromList = useLocation().state?.user;
  const [user,setUser] = useState(fromList||null);
  const [loading,setLoading] = useState(!fromList);
  const [err,setErr] = useState(null);

  useEffect(()=>{
    if (fromList) return;
    const ac = new AbortController();
    (async()=>{
      try { setLoading(true); setErr(null);
        setUser(await fetchUserById(id,{ signal: ac.signal }));
      } catch(e){ if(e.name!=="AbortError") setErr(e.message||"Load failed"); }
      finally { setLoading(false); }
    })();
    return ()=>ac.abort();
  },[id,fromList]);

  if (loading) return <p>Loading…</p>;
  if (err)     return <p style={{color:"crimson"}}>Error: {err}</p>;
  if (!user)   return <p>User not found.</p>;

  const a = user.address;
  return (
    <div>
      <Link to="/">&larr; Back</Link>
      <h2 style={{marginTop:8}}>{user.name}</h2>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Phone:</b> {user.phone ?? "-"}</p>
      <p><b>Website:</b> {user.website ?? "-"}</p>
      <p><b>Address:</b> {a ? `${a.street}, ${a.suite}, ${a.city}` : "-"}</p>
    </div>
  );
}
