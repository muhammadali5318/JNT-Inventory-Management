import React, { useState } from "react";
import axios from "axios";

function CreateCategory({
  isCreatingCategory,
  showCategoryModal,
  fetchCategories,
}) {
  const [newCategory, setNewCategory] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  const createNewCategory = async (e) => {
    const category = {
      name: newCategory,
    };
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:3000/api/category",
      category,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(response);
    showCategoryModal();
    fetchCategories();
  };

  if (!isCreatingCategory) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm text-black flex justify-center items-center">
      <div className="bg-white w-1/4 px-10 py-2 pb-4 rounded-md flex flex-col items-center ">
        <h1 className="text-2xl font-bold my-4">Create New Category</h1>

        <form className="w-full" onSubmit={createNewCategory}>
          <div>
            <input
              className="w-full py-2 px-1 my-3 border  border-sky-500 rounded-sm border-solid "
              name="name"
              type="text"
              placeholder="Category Name"
              onChange={(e) => setNewCategory(e.target.value)}
            ></input>
          </div>
          <div className="text-center">
            <button
              onClick={showCategoryModal}
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

export default CreateCategory;
