import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function CreateSale({ visible, changeState, products }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Function to get today's date in "YYYY-MM-DD" format
  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    product: null,
    salePrice: null,
    saleQuantity: 1,
    saleDate: getTodayDateString(),
  });
  // const [productQuantity , setProductQuantity] = useState(0)
  // State to store the selected product
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Effect to set the default selected product to the first product in the list
  useEffect(() => {
    const product = products[0];
    setSelectedProduct(product);
    setFormData({
      ...formData,
      product: product?._id,
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
    handleInputChange(e);
    const product = products?.find((product) => product._id === e.target.value);
    // setProductQuantity(product.quantity)
    setSelectedProduct(product);
  };

  const formatDate = (dateString = new Date()) => {
    const date = new Date(`${dateString}T00:00:00Z`);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const submitForm = async (e) => {
    formData.saleDate = formatDate(formData.saleDate);
    if (
      formData.product == null ||
      formData.salePrice == null ||
      formData.saleQuantity == null ||
      formData.saleDate === null
    ) {
      changeState();
      return;
    }
    e.preventDefault();
    try {
      // Send POST request with formData
      const response = await axios.post(
        "http://localhost:3000/api/sales",
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("Response:", response.data);
      changeState();
      // Reset form after successful submission if needed
      setFormData({
        product: null,
        salePrice: null,
        saleQuantity: 1,
        saleDate: getTodayDateString(),
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      changeState();
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm text-black flex justify-center items-center">
      <div className="bg-gray-700  w-1/4 px-10 py-2 pb-4 rounded-md">
        <h1 className="text-2xl text-white font-bold my-4">Add new Sale</h1>
        <form className="w-full" onSubmit={submitForm}>
          <div>
            <select
              className="w-full py-2 px-1 border  border-sky-500 rounded-sm border-solid "
              value={selectedProduct ? selectedProduct.id : ""}
              name="product"
              onChange={selectProduct}
            >
              {products.map((product) => {
                return (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="text-white text-sm mb-3">
            Remaining Quantity: {selectedProduct?.quantity}
          </div>
          <div>
            <input
              onChange={handleInputChange}
              name="salePrice"
              type="number"
              placeholder="Sale price"
              className="w-full py-2 px-1 mb-3 border  border-sky-500 rounded-sm border-solid "
            ></input>
          </div>
          <div>
            <input
              onChange={handleInputChange}
              type="number"
              name="saleQuantity"
              placeholder="Sale Quantity"
              defaultValue={1}
              className="w-full py-2 px-1 mb-3 border  border-sky-500 rounded-sm border-solid "
            ></input>
          </div>
          <div>
            <input
              onChange={handleInputChange}
              type="date"
              name="saleDate"
              placeholder="Sale Date"
              className="w-full py-2 px-1 mb-3 border  border-sky-500 rounded-sm border-solid "
              value={formData.saleDate}
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
