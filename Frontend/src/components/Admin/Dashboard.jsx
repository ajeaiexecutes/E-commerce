import React from 'react'
import api  from '../../axios/axios';
import { useNavigate ,Outlet,Link} from 'react-router-dom';


const Dashboard = () => {

  const navigate = useNavigate();

  async function handleLogout(){
    try {
      await axios.post('/logout',
        {},
        { withCredentials: true });
      
      localStorage.removeItem("token");
      sessionStorage.clear();

      navigate("/adminLogin");

      console.log('logged out');
      
    } catch (error) {
      console.error("failed",error);
      
    }
  }
  return (
     <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col">
        <h2 className="text-xl font-bold text-center p-4 border-b border-gray-700">
          Admin Panel
        </h2>
        <nav className="flex flex-col mt-6 px-4  space-y-3 mx-5">
          <a href="/adminDashboard" className="hover:bg-gray-700 px-3 py-2 rounded">
            Dashboard
          </a>
          <Link to={"/adminDashboard/categories"} className="hover:bg-gray-700 px-3 py-2 rounded">
            Categories
          </Link>
          <Link to={"/adminDashboard/products"} className="hover:bg-gray-700 px-3 py-2 rounded">
            Products
          </Link>
          <Link to={"/adminDashboard/users"} className="hover:bg-gray-700 px-3 py-2 rounded">
            Users
          </Link>
          <Link to={"/adminDashboard/orders"} className="hover:bg-gray-700 px-3 py-2 rounded">
            Orders
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow-md h-16 flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold">B E Y O U R S </h1>
          <button onClick={handleLogout} className="bg-black text-white px-4 py-2 rounded hover:bg-red-600">
            Logout
          </button>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-lg font-semibold">Total Products</h3>
              <p className="text-3xl font-bold mt-2 text-blue-600">120</p>
            </div>

            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-lg font-semibold">Total Orders</h3>
              <p className="text-3xl font-bold mt-2 text-green-600">85</p>
            </div>

            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-lg font-semibold">Total Users</h3>
              <p className="text-3xl font-bold mt-2 text-purple-600">45</p>
            </div>
          </div> */}
        <Outlet /> 
        
        </main>

      </div>
    </div>
  )
}

export default Dashboard
