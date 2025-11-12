import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../axios/axios";

const UserRegister = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password: "",
    confirmpassword:""
  })

  const [validation, setValidation] = useState({});
  const [loading, setLoading] = useState(false);
  

  //handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
    
    
  }
//form validation at frontend
  const validate = () => {
    const newError = {};

    //do log to know whts inside newError
    
    

    if (!formData.name.trim()) {
      newError.name = "full name is required"
      
    }
    

    if (!formData.email.trim()) {
      newError.email="email required"
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newError.email="invalid email adress"
    }
  

  if (!formData.password) {
    newError.password="password required"
  } else if (formData.password < 6) {
    newError.password="password must be at least 6 characters"
  }

  if (!formData.confirmpassword) {
    newError.confirmpassword="confirm password is required"
  } else if (formData.password !== formData.confirmpassword) {
    newError.confirmpassword='password do not matches'
  }
    return newError;
  }
  

  //handle for submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validator = validate();
    
    setValidation(validator);

    

    if (Object.keys(validator) > 0) return;

    try {
      setLoading(true);

      const res = await api.post("/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmpassword:formData.confirmpassword
          
        })
      
      
      console.log("res",res);
      
      
      alert("registration sucessfull");
      navigate("/login")

    } catch (error) {
      console.log("error",error.response.data.mess);
      alert(error.response.data.mess);

      
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-4xl font-bold mb-6 text-center">B E Y O U R S</h2>
        
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-500"
              onChange={handleChange}
            />
            {validation.name && (
              <p className="text-red-500 text-sm mt-1">{validation.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-500"
            />
            {validation.email && (
              <p className="text-red-500 text-sm mt-1">{validation.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-500"
            />
            {validation.password && (
              <p className="text-red-500 text-sm mt-1">{validation.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              name="confirmpassword"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-500"
            />
            {validation.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{validation.confirmPassword}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-400"
          >
            {loading?"Registering..":"Register"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default UserRegister;
