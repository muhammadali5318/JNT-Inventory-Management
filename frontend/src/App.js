import React, { useEffect, useState } from 'react';
import './App.css'
import Sale from './components/Sale'
import Products from './components/Products'
import CreateSale from './components/CreateSale'
import axios from "axios";


const App = () => {
  const [visibleProp, setVisibleProp] = useState(false)
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  
  const showModal = () => {
    setVisibleProp(pre => !pre)
  }

  const fetchSalesAndProducts = async () => {
    try {
      const productsResponse = await axios.get(
        "http://localhost:3000/api/products"
      );
      // const salesResponse = await axios.get(`http://localhost:3000/api/sales/findbydate?date=2024-02-21`);

      setProducts(productsResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const categoriesResponse = await axios.get(
        "http://localhost:3000/api/category"
      );

      setCategories(categoriesResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSalesAndProducts();
    // eslint-disable-next-line
  }, []);


  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line
  }, []);

return (
  <>
  <div className='container text-center py-8'>
    <button onClick={showModal} className='rounded-full bg-slate-500 px-3 py-1 text-white hover:text-cyan-200'>
      Create Sale
    </button>
  </div>
  <Sale products={products} />
  <hr></hr>
  <Products allCategories={categories} products={products} />
  <CreateSale visible={visibleProp} changeState={showModal} products={products}/>
  </>
)
};

export default App;
