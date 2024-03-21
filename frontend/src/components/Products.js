import React, { useState } from "react";
import CreateProduct from "./CreateProduct";

function Product({ allCategories, products, fetchProducts }) {
  const [isCreatingNewProduct, setIsCreatingProduct] = useState(false);
  const [modalTitle, setModalTitle] = useState(null);
  const [selectedProduct, setSelectProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isUpdatingProduct, setIsUpdatingProduct] = useState(false);

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
        <h3 className="text-4xl font-bold	mt-4">Products</h3>

        <div className="my-4">
          <button
            onClick={() => showModal(null, "Create Product")}
            className="rounded-full bg-slate-500 px-3 py-1 text-white hover:text-cyan-200"
          >
            Create Product
          </button>
        </div>
        <table className="container">
          <thead>
            <tr className="flex justify-between">
              <th>Product Name</th>
              <th>Product Category</th>
              <th>Product Quantity</th>
              <th>Product Buying Price</th>
              <th>Actions</th>
              {/* Add more table headers if needed */}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr className="flex justify-between" key={product._id}>
                <td>{product?.name}</td>
                <td>
                  {
                    allCategories.find(
                      (category) => category._id == product.category
                    )?.name
                  }
                </td>
                <td>{product?.quantity}</td>
                <td>{product?.price}</td>
                <td>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
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
