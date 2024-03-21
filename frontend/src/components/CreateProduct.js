import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

function CreateProduct({
  isCreatingProduct,
  changeState,
  categories,
  modalTitle,
  product,
  selectedCategory,
  isUpdatingProduct,
}) {
  const allCategories = categories.map((option) => ({
    value: option?._id,
    label: option?.name,
  }));
  const selectedProduct = {
    value: selectedCategory?._id,
    label: selectedCategory?.name,
  };
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelection = (e) => {
    const { value } = e;
    setFormData({
      ...formData,
      category: value,
    });
  };

  useEffect(() => {
    if (product) {
      setFormData({
        name: product?.name,
        price: product?.price,
        quantity: product?.quantity,
        category: product?.category,
      });
    }
  }, [product]);

  const updateProduct = async () => {
    const response = await axios.put(
      `http://localhost:3000/api/products/${product._id}`,
      formData
    );
    changeState(product, "");
    return response;
  };
  const createProduct = async () => {
    const response = await axios.post(
      "http://localhost:3000/api/products",
      formData
    );
    changeState(product, "");
    return response;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      isUpdatingProduct === true ? updateProduct() : createProduct();

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
      <div className="bg-white w-1/4	h-1/2 px-10 py-2 pb-4 rounded-md flex flex-col items-center ">
        <h1 className="text-2xl font-bold my-4">{modalTitle}</h1>
        <form className="w-full" onSubmit={submitForm}>
          <div>
            <Select
              className="border  border-sky-500 rounded-sm border-solid"
              placeholder="Product Category"
              defaultValue={selectedProduct}
              onChange={handleSelection}
              options={allCategories}
            />
          </div>

          <div className>
            <input
              className="w-full py-2 px-1 my-3 border  border-sky-500 rounded-sm border-solid "
              name="name"
              type="text"
              defaultValue={formData.name}
              placeholder="Product Name"
              onChange={handleInputChange}
            ></input>
          </div>
          <div>
            <input
              className="w-full py-2 px-1 my-3 border  border-sky-500 rounded-sm border-solid "
              type="number"
              name="price"
              placeholder="Product Price"
              onChange={handleInputChange}
              defaultValue={formData.price}
            ></input>
          </div>
          <div>
            <input
              className="w-full py-2 px-1 my-3 border  border-sky-500 rounded-sm border-solid "
              type="number"
              name="quantity"
              placeholder="Quantity"
              defaultValue={formData.quantity}
              onChange={handleInputChange}
            ></input>
          </div>

          <div className="text-center">
            <button
              onClick={changeState}
              className="rounded-full mx-2 mt-4 bg-slate-500 px-3 py-1 text-white hover:text-cyan-200"
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

export default CreateProduct;
