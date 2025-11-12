import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../axios/axios";
const EditCategory = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch category data
  useEffect(() => {
    async function fetchCategory() {
      try {
        const res = await api.get(`/categories/${id}`);
        setName(res.data.name);
      } catch (error) {
        console.error("Error fetching category:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategory();
  }, [id]);

 

  // 🔹 Handle update
  async function handleUpdate(e) {
    e.preventDefault();
    if (!name.trim()) return alert("Please enter a category name");

    try {
      await api.put(`/admin/categories/${id}`, { name });
      alert("Category updated successfully!");
      navigate("/adminDashboard/categories"); // redirect back
    } catch (error) {
      console.error("Error updating category:", error);
    }
  }

  if (loading) return <p className="p-6">Loading category...</p>;


  
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Category</h2>

      <form onSubmit={handleUpdate} className="flex gap-2 mb-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter new category name"
          className="border px-3 py-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
        <button
          type="button"
          onClick={() => navigate("/adminDashboard/categories")}
          className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditCategory;
