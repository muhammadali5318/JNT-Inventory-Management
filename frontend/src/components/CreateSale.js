import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function CreateSale({ visible, changeState, products }) {

  const [formData, setFormData] = useState({
    product: null,
    salePrice: null,
    saleQuantity: null,
    saleDate: null,
  });
  // const [productQuantity , setProductQuantity] = useState(0)
   // State to store the selected product
   const [selectedProduct, setSelectedProduct] = useState(null);

   // Effect to set the default selected product to the first product in the list
   useEffect(() => {
    const product = products[0]
     setSelectedProduct(product);
     setFormData({
      ...formData,
      'product': product?._id,
    });
   }, [products]);
 


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const selectProduct = (e) => {
    handleInputChange(e)
    const product = products.find(product => product._id === e.target.value)
    // setProductQuantity(product.quantity) 
    setSelectedProduct(product)
  }

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      // Send POST request with formData
      const response = await axios.post("http://localhost:3000/api/sales", formData);
      console.log("Response:", response.data);
      changeState()
      // Reset form after successful submission if needed
      setFormData({
        product: null,
        salePrice: null,
        saleQuantity: null,
        saleDate: null,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    console.log(formData);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm text-black flex justify-center items-center">
      <div className="bg-white p-10 rounded-md flex flex-col items-center justify-center">
        Add new Sale
        <form onSubmit={submitForm}>
          <div>
            <select value={selectedProduct ? selectedProduct.id : ''} name="product" onChange={selectProduct}>
              {products.map((product) => {
                return (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>Remaining Quantity: {selectedProduct?.quantity}</div>
          <div>
            <input
              onChange={handleInputChange}
              name="salePrice"
              type="number"
              placeholder="Sale price"
            ></input>
          </div>
          <div>
            <input
              onChange={handleInputChange}
              type="number"
              name="saleQuantity"
              placeholder="Sale Quantity"
            ></input>
          </div>
          <div>
            <input
              onChange={handleInputChange}
              type="date"
              name="saleDate"
              placeholder="Sale Date"
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
              disabled={selectedProduct.quantity == 0 ? true : false}
              className="rounded-full bg-slate-500 px-3 py-1 mx-3 text-white hover:text-cyan-200 disabled:text-white disabled:bg-slate-300 disabled:border-slate-500 "
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateSale;
