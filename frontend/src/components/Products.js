import React, { useState } from "react";
import CreateProduct from "./CreateProduct";
import CreateCategory from "./CreateCategory";
import Select from "react-select";

function Product({ allCategories, products, fetchProducts, fetchCategories }) {
  const [isCreatingNewProduct, setIsCreatingProduct] = useState(false);
  const [modalTitle, setModalTitle] = useState(null);
  const [selectedProduct, setSelectProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [isUpdatingProduct, setIsUpdatingProduct] = useState(false);
  const [productList, setProductList] = useState(products)

  const showModal = (product, title, isUpdatingProduct = false) => {
    setIsCreatingProduct((pre) => !pre);
    setModalTitle(title);
    setIsUpdatingProduct(isUpdatingProduct);
    if (product === null) return;
    fetchProducts();
    setSelectProduct(product);
    setSelectedCategory(
      allCategories.find((category) => category._id == product.category)
    );
  };

  const showCategoryModal = () => {
    setIsCreatingCategory((pre) => !pre);
  };


  const handleSelection = (e) => {
    const newList = products.filter(product => e.value === product.category)
    setProductList(newList)
    
  }

  const categories = allCategories.map((option) => ({
    value: option?._id,
    label: option?.name,
  }));
  return (
    <>
      <CreateProduct
        selectedCategory={selectedCategory}
        categories={allCategories}
        isCreatingProduct={isCreatingNewProduct}
        changeState={showModal}
        products={products}
        product={selectedProduct}
        modalTitle={modalTitle}
        isUpdatingProduct={isUpdatingProduct}
      />

      <div className="container mx-auto">
        <h3 className="text-2xl font-bold	mt-4">Products</h3>

        <div className="flex justify-between my-4">
          <div>
            <button
              onClick={() => showModal(null, "Create Product")}
              className="rounded-full me-2 bg-slate-500 px-3 py-1 text-white hover:text-cyan-200"
            >
              Create Product
            </button>
            <button
              onClick={showCategoryModal}
              className="rounded-full bg-slate-500 px-3 py-1 text-white hover:text-cyan-200"
            >
              Create New Category
            </button>
          </div>
          <div className="w-80">
            <Select
              className="border  border-sky-500 rounded-sm border-solid"
              placeholder="Category"
              options={categories}
              onChange={handleSelection}
            />
          </div>
        </div>

        <CreateCategory
          showCategoryModal={showCategoryModal}
          isCreatingCategory={isCreatingCategory}
          fetchCategories={fetchCategories}
        />

        <table className="container table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr >
              <th scope="col" className="text-center px-6 py-3 border border-slate-600">Product Name</th>
              <th scope="col" className="text-center px-6 py-3 border border-slate-600">Product Category</th>
              <th scope="col" className="text-center px-6 py-3 border border-slate-600">Product Quantity</th>
              <th scope="col" className="text-center px-6 py-3 border border-slate-600">Product Buying Price</th>
              <th scope="col" className="text-center px-6 py-3 border border-slate-600">Actions</th>
              {/* Add more table headers if needed */}
            </tr>
          </thead>
          <tbody>
            {productList.map((product) => (
              <tr className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={product._id}>
                <td scope="row"  className="text-center border border-slate-700 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">  {product?.name}</td>
                <td scope="row"  className="text-center border border-slate-700">  
                  {
                    allCategories.find(
                      (category) => category._id == product.category
                    )?.name
                  }
                </td>
                <td scope="row"  className="text-center border border-slate-700">  {product?.quantity}</td>
                <td scope="row"  className="text-center border border-slate-700">  {product?.price}</td>
                <td scope="row"  className="text-center border border-slate-700">  
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="mx-auto text-center w-6 h-6 cursor-pointer"
                    onClick={() => showModal(product, "Update Product", true)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </td>
                {/* Display more sale details as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Product;
