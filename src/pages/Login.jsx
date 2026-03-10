import { useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);

      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="authBox">
      <h2>Login</h2>

      <form onSubmit={loginUser}>
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

        <button>Login</button>
      </form>

      <button onClick={googleLogin}>Login with Google</button>

      <p>
        New User ? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
