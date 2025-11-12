import React, { useState, useEffect  } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../../axios/axios";



const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

   useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const res = await api.get("admin/categories", { withCredentials: true })
      setCategories(res.data.categories)
      console.log(res.data.categories);
      
    } catch (error){
      console.log(error);
      
    }
  }


  //create collection
  async function createCategory(e) {
    e.preventDefault();
    if (!name)
      return alert("please enter a category name")
    try {
      const res=await api.post("/admin/categories",
        { name },
        { withCredentials: true }
      );
      setName('')

      alert("added")
      
      console.log("result-", res.data);
      fetchCategories();
      
    } catch (error) {
      console.log(error);
      
    }
  }



  //delete categories
  async function deleteCategory(id) {
    
    try {
      console.log("in try");
      
      const res = await api.delete(`/admin/categories/${id}`,{withCredentials:true})
      window.confirm("are u sure");
      fetchCategories();
      
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Create Category Tile */}
      <div className="bg-white p-6 rounded-lg shadow-md h-fit ">
        <h2 className="text-2xl font-bold mb-4">Create Category</h2>
        <input
          type="text"
          placeholder="Enter category name"
          className="border rounded-lg w-full px-3 py-2 mb-4 focus:ring focus:ring-blue-300 outline-none"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
        <button onClick={createCategory } className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Add Category
        </button>
      </div>

      {/* See Categories Tile */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">All Categories</h2>

          
        <ul className="space-y-3">
          {categories.map((cat) => (
            <li key={cat.id || cat._id} className="flex items-center justify-between border p-3 rounded-lg">
            <span className="font-medium">{cat.name}</span>
            <div className="flex gap-2">
              <Link to={`/adminDashboard/edit/${cat._id}`} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                Edit
              </Link>
              <button  onClick={()=>deleteCategory(cat._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          </li>
          ))}

          
        </ul>
      </div>
    </div>
  );
};

export default Categories;
