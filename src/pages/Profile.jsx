import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const logoutUser = () => {
    signOut(auth);
  };

  if (!user) {
    return <h2 style={{ textAlign: "center" }}>Please Login</h2>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>User Profile</h2>

      <img
        src={user.photoURL}
        alt="profile"
        style={{ width: "120px", borderRadius: "50%" }}
      />

      <h3>{user.displayName}</h3>
      <p>{user.email}</p>

      <button onClick={logoutUser}>Logout</button>
    </div>
  );
}
