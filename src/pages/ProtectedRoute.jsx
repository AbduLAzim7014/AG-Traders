import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" />;

  return children;
}
