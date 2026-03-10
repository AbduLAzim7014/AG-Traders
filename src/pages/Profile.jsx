import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const user = auth.currentUser;

  const logout = async () => {
    await signOut(auth);

    navigate("/login");
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Profile</h1>

      <img src={user?.photoURL} alt="" className="w-20 rounded-full mt-4" />

      <p className="mt-3">{user?.email}</p>

      <button onClick={logout} className="bg-red-500 text-white px-4 py-2 mt-5">
        Logout
      </button>
    </div>
  );
}
