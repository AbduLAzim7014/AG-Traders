import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    await createUserWithEmailAndPassword(auth, email, password);

    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="shadow-lg p-8 w-96">
        <h2 className="text-2xl font-bold mb-5">Register</h2>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={register}
          className="bg-green-500 text-white w-full p-2 mb-3"
        >
          Register
        </button>

        <p>
          Already have account ?
          <Link to="/login" className="text-blue-500 ml-2">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
