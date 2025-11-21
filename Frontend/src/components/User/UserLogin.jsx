import React, {
  useContext,
  useState
} from 'react'
import { useNavigate ,Link} from 'react-router-dom';
import api from '../../axios/axios';
import { toast } from 'react-toastify';
import { logginContext } from '../../context/LogginContext';

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {isLogged,setIsLogged}=useContext(logginContext)
  

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await api.post("/login", { email, password });
      console.log("Response:", res);
      setIsLogged(true);
      alert("Login successful");
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || "Login failed");
    }
  }
 
  async function handleLogout() {
    try {
      const res = await api.post("/logout")
      console.log(res)
      toast.success("logout sucessfull")
    } catch (error) {
      toast.error("logout failed")
      console.log(error)
    }
  }
  return (
   <div className="flex items-center  justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-100">
        <h2 className="text-4xl font-bold mb-6 text-center">B E Y O U R S</h2>
        
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        
        <form onSubmit={handleLogin}> 
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-500"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-500"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-400"          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4 ">
          Don’t have an account?{" "}
          <Link to="/register " className="text-indigo-600 hover:underline">
          Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default UserLogin
