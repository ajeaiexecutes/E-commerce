import React, { act, useEffect, useState } from "react";
import api from "../../axios/axios";

const Users = () => {
  // Example static users
  
    
    const [user, setUser] = useState([]);
    
    
    useEffect(() => {
        fetchUsers();
    },[])
    

    async function fetchUsers() {
        try {
            const res = await api.get("/admin/users", { withCredentials: true });
            console.log(res.data);
            
            setUser(res.data.users)
        } catch (error) {
            
        }
    }

    async function statusChange(id, currstatus) {

        try {
            const status = (currstatus === "Active" ? "Deactive" : "Active")
            const res = await api.put(`/admin/users/${id}`, { status })
            setUser(user.map((u) => u._id === id ? {...u, status:status }: u ));
        } catch (error) {
            console.error(error);
            
        }
    }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Users List</h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="border border-gray-200 px-4 py-2 text-left">#</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Email</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Role</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-200 px-4 py-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {user.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-200 px-4 py-2">{user.name}</td>
                <td className="border border-gray-200 px-4 py-2">{user.email}</td>
                <td className="border border-gray-200 px-4 py-2 capitalize">{user.role}</td>
                <td className="border border-gray-200 px-4 py-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                {/* ✅ Single conditional button */}
                <td className="border border-gray-200 px-4 py-2 text-center">
                        <button
                            onClick={()=>statusChange(user._id, user.status)}
                    className={`px-3 py-1 rounded text-white transition ${
                      user.status === "Active"
                        ? "bg-red-500 hover:bg-red-600 "
                        : "bg-green-500 hover:bg-green-600"
                                }`}
                  >
                            {user.status === "Active" ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
