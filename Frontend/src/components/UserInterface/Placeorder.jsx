import React,{useState} from 'react'
import api from '../../axios/axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Placeorder = () => {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        city: "",
        phone: "",
        paymentMethod:"UPI"
        
    })

    const navigate = useNavigate();

    const location = useLocation()
    const total=location.state.total
       
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
        
        
    }

     async function handleSubmit (e)  {
         e.preventDefault();
         
         try {
            console.log("formdata",formData)
            const res = await api.post("/order", formData)
             console.log(res);
             toast.success("order placed");
             navigate("/home")
        } catch (error) {
           console.log(error);
           toast.error("something went wrong")
           
            
        }
    }
  return (
     <div className="max-w-2xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-semibold text-center mb-8">Place Your Order</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 border-t border-gray-200 pt-8"
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-black"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="2"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-black"
            required
          />
        </div>


        {/* Country / Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-black"
              required
            />
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Method
          </label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-black"
          >
            <option>Cash on Delivery</option>
            <option>Credit Card</option>
            <option>Debit Card</option>
            <option>UPI</option>
            <option>Net Banking</option>
          </select>
        </div>

        {/* Total */}
        <div className="border-t border-gray-300 pt-4 flex justify-between items-center">
          <h3 className="text-lg font-medium">Total:</h3>
          <p className="text-xl font-bold">Rs. {total} {/* {total.toLocaleString()}  */}</p>
        </div>

        {/* ✅ Submit Button */}
        <button
                  type="submit"
                  onSubmit={handleSubmit}
          className="w-full bg-black text-white py-3 rounded-md font-medium tracking-wide hover:bg-gray-900 transition"
        >
          Confirm Order
        </button>
      </form>
    </div>
  )
}

export default Placeorder

