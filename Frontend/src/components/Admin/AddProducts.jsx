import React, { useEffect, useState } from 'react'
import api from "../../axios/axios";
import { useNavigate, useParams } from 'react-router-dom';

const AddProducts = () => {
    const navigate = useNavigate();
    const { id } = useParams();
      const [image, setImage] = useState(null);

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
    });
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetchCategories();
        if (id) {
            fetchProductById(id)
        }
    },[id])
    
    async function fetchCategories() {
        try {
            const res = await api.get("/admin/categories", { withCredentials: true })
            
            setCategories(res.data.categories)
            console.log("cattt",res.data.categories);
            
        } catch (error) {
            console.log(error);
            
        }
    }


    async function fetchProductById(id) {
        try {
            const res = await api.get(`admin/products/${id}`, { withCredentials: ture })
            setProduct(res.data)
            console.log("products",res.data);
            
        } catch (error) {
            console.log(error);
            
        }
    }

    const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    // if (file) {
    //   setImagePreview(URL.createObjectURL(file));
    // }
  };

    async function addProducts(e) {
        e.preventDefault();
        
        try {
            const formData = new FormData();
            formData.append("name", product.name)
            formData.append("title", product.title)
            formData.append("description", product.description);
            formData.append("price", product.price);
            formData.append("category", product.category)
            formData.append("image", image)
            

            if (id) {
                const res = await api.put(`/admin/products/${id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
                alert("updated sucessfully")
            } else {
                const res = await api.post("/admin/products", formData, {
                     headers: { "Content-Type": "multipart/form-data" },
                })
                alert("added sucessfuly")
            }

                navigate("/adminDashboard/products")


            // const res = await api.post("/admin/products",
            //     formData,
            //     { headers: { "Content-Type": "multipart/form-data" } })
            
            // alert("product added");
            // navigate("/adminDashboard/products")
        } catch (error) {
            console.log(error);
            alert("failed")
            
        }
    }

    
    


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">{id? "Edit Product":" Add New Product"}</h2>

      <form onSubmit={addProducts} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
        {/* Product Name */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            Product Name
          </label>
                  <input
                      type="text"
                      name="name"
                      placeholder="Enter product name"
                      value={product.name}
                      onChange={(e) => {
                          setProduct({
                              ...product,
                              [e.target.name]: e.target.value
                          }); 
                       }}
            className="border border-gray-300 p-2 w-full rounded focus:ring focus:ring-blue-200"
            required
          />
        </div>
        {/* Product title */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            Product title
          </label>
                  <input
                      type="text"
                      name="title"
                      placeholder="Enter product name"
                      value={product.title}
                      onChange={(e) => {
                          setProduct({
                              ...product,
                              [e.target.name]: e.target.value
                          }); 
                       }}
            className="border border-gray-300 p-2 w-full rounded focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            Description
          </label>
          <textarea
                      placeholder="Write short description..."
                      name='description'
                      value={product.description}
                      onChange={(e) => {
                          setProduct({
                              ...product, [e.target.name]: e.target.value
                          })
                          
                      }}
            className="border border-gray-300 p-2 w-full rounded focus:ring focus:ring-blue-200"
          ></textarea>
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Price</label>
          <input
            type="number"
                      placeholder="Enter price"
                      name='price'
                      value={product.price}
                      onChange={(e) => {
                          setProduct({
                              ...product, [e.target.name]: e.target.value
                          })
                          
                      }}
            className="border border-gray-300 p-2 w-full rounded focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Category Dropdown */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Category</label>
                  <select
                      name="category"
                      value={product.category}
                      onChange={(e)=>setProduct({...product,[e.target.name]:e.target.value})}
            className="border border-gray-300 p-2 w-full rounded focus:ring focus:ring-blue-200"
            required
          >
            <option value="">Select Category</option>
                      {categories.map((cat) => (
                          <option key={cat._id} value={cat._id}>{ cat.name}</option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            Product Image
          </label>
          <input
            type="file"
                      accept="image/*"
                      onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 
                       file:rounded file:border-0 file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
        >
          {id?"Update Product":"Add Product"}
        </button>
      </form>
    </div>
  );

  
}

export default AddProducts
