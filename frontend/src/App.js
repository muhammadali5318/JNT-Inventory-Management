import React, { useEffect, useState } from "react";
import "./App.css";
import Sale from "./components/Sale";
import Products from "./components/Products";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./components/Header";
import axios from "axios";
import Login from "./components/Login";

const App = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const AppLayout = () => {
    return (
      <div className="app bg-gray-900">
        {!token ? (
          <Login updateToken={updateToken} />
        ) : (
          <>
            <Header />
            <Outlet />
            <h1 className="text-sm mt-8 mx-5">
              JNT-Inventory - Copyright Reserved
            </h1>
          </>
        )}
      </div>
    );
  };

  const updateToken = () => {
    setToken(localStorage.getItem("token"));
  };

  const fetchProducts = async () => {
    try {
      const productsResponse = await axios.get(
        "http://localhost:3000/api/products",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setProducts(productsResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const categoriesResponse = await axios.get(
        "http://localhost:3000/api/category",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setCategories(categoriesResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      // errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: (
            <Products
              allCategories={categories}
              products={products}
              fetchProducts={fetchProducts}
              fetchCategories={fetchCategories}
            />
          ),
        },
        {
          path: "/sales",
          element: <Sale products={products} fetchProducts={fetchProducts} />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
