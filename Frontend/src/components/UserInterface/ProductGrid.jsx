import React, { useEffect, useState } from 'react'
import api from '../../axios/axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const ProductGrid = () => {
  const [products, setProduct] = useState([]);
  const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;
    //usequery
    useEffect(() => {
        
        api.get("/products")
            .then((res) => {
            setProduct(res.data.data)
        }
        )
        .catch((error)=>console.log(error)
        )
    }, [])
  
    
  return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4 md:px-12 py-6 ">
      
      {products.map((item) => (
        <div key={item._id} onClick={()=>navigate(`/productDetails/${item._id}`)} className="group border-b border-gray-300 pb-3">
          
          {/* Product Image */}
          <div className="w-full overflow-hidden rounded-md">
            <img
              src={`${API_URL}${item.image}`}
              alt={item.name}
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              
              
            />
          </div>

          {/* Rating */}
          <div className="flex items-center mt-2">
            <span className="text-yellow-500 text-sm">★</span>
            <span className="ml-1 text-sm font-medium">{item.rating}</span>
            <span className="ml-1 text-xs text-gray-500">({5})</span>
          </div>

          {/* Product title */}
          <h3 className="mt-1 text-lg font-semibold text-gray-900">
            {item.name}
          </h3>

          {/* Subtitle */}
          <p className="text-sm text-gray-500">{item.title}</p>

          {/* Price */}
          <div className="mt-1">
            <span className="font-semibold text-gray-900">{`Rs,${item.price}`}</span>
            <span className="ml-2 line-through text-gray-400 text-sm">
              {item.oldPrice}
            </span>
          </div>
        </div>
      ))}

      {/* Dots under images (just example) */}
      <div className="col-span-full flex justify-center mt-4 gap-2">
        <div className="w-2 h-2 bg-black rounded-full"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
      </div>

    </div>

  )
}

export default ProductGrid
