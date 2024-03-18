import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";

function CreateProduct({ isCreatingProduct, changeState, categories }) {

  const [formData, setFormData] = useState({
    name: null,
    price: null,
    quantity: null,
    category: null,
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      // Send POST request with formData
      const response = await axios.post("http://localhost:3000/api/products", formData);
      console.log("Response:", response.data);
      // Reset form after successful submission if needed
      setFormData({
        name: null,
        price: null,
        quantity: null,
        category: null,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    console.log(formData);
  };

  if (!isCreatingProduct) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm text-black flex justify-center items-center">
      <div className="bg-white p-10 rounded-md flex flex-col items-center justify-center">
        Add new product
        <form onSubmit={submitForm}>
          

        <div>
            <select name="category" onChange={handleInputChange}>
              {categories.map((category) => {
                return (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <input
              onChange={handleInputChange}
              name="name"
              type="text"
              placeholder="Product Name"
            ></input>
          </div>
          <div>
            <input
              onChange={handleInputChange}
              type="number"
              name="price"
              placeholder="Product Price"
            ></input>
          </div>
          <div>
            <input
              onChange={handleInputChange}
              type="number"
              name="quantity"
              placeholder="Quantity"
            ></input>
          </div>



          <div>
            <button
              onClick={changeState}
              className="rounded-full bg-slate-500 px-3 py-1 text-white hover:text-cyan-200"
            >
              cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-slate-500 px-3 py-1 text-white hover:text-cyan-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct
