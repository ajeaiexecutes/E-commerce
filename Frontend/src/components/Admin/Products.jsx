import React, { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import api from "../../axios/axios";

const Products = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, [])
    
const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await api.delete(`/admin/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
      alert("Product deleted successfully");
    } catch (err) {
      alert("Failed to delete product");
    }
  };

    
    

    async function fetchProducts() {
        try {
            
                
                const res = await api.get("/admin/products", { withCredentials: true });
                
            console.log(res);
                
                setProducts(res.data.list)
            } catch (error) {
                console.error(error);
                
            }
    }

    const addproducts = () => {
        navigate("/adminDashboard/addproducts")
    }
    
    
    

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header + Add Product Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Products</h2>
        <button onClick={addproducts} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + Add Product
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3 border-b">Category Name</th>
              <th className="p-3 border-b">Product Name</th>
              <th className="p-3 border-b">Description</th>
              <th className="p-3 border-b">Price</th>
              <th className="p-3 border-b">Photo</th>
              <th className="p-3 border-b text-center">Action</th>
            </tr>
          </thead>
          <tbody>
                      {products.map((pro) => (
                            <tr  key={pro._id}  className="hover:bg-gray-50">
              <td className="p-3 border-b">{pro.category?.name || "no category "}</td>
              <td className="p-3 border-b">{pro.name}</td>
              <td className="p-3 border-b">{pro.description}</td>
              <td className="p-3 border-b">{pro.price }</td>
              <td className="p-3 border-b">
                <img
                  src={`http://localhost:3000${pro.image}`}
                  alt="Product"
                  className="rounded-md w-12 h-12 object-cover"
                />
              </td>
              <td className="p-3 border-b text-center">
                <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600">
                <Link to={`/adminDashboard/products/${pro._id}`}>
                         Edit
                  </Link>
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={()=>handleDelete(pro._id)}>
                  Delete
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

export default Products;
