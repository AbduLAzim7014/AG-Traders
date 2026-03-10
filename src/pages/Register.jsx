import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await setDoc(doc(db, "users", userCred.user.uid), {
        name: name,
        email: email,
        uid: userCred.user.uid,
      });

      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="authBox">
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Register</button>

        <p>
          Already account ? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
  