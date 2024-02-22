import React, { useState, useEffect } from 'react';
import './App.css'
import axios from 'axios';

const App = () => {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalSales, setTotalSales] = useState(0);


  useEffect(() => {
    const fetchSalesAndProducts = async () => {
      try {
        // const salesResponse = await axios.get(`http://localhost:3000/api/sales/findbydate?date=2024-02-21`);
        const salesResponse = await axios.get(`http://localhost:3000/api/sales`);
        const productsResponse = await axios.get('http://localhost:3000/api/products');

        setSales(salesResponse.data);
        setProducts(productsResponse.data);
        calculateTotalSales(salesResponse.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSalesAndProducts();
  }, []);

  const getProductById = productId => {
    return products.find(product => product.id === productId);
  };

  const calculateTotalSales = salesData => {
    const total = salesData.reduce((acc, sale) => acc + sale.salePrice, 0);
    setTotalSales(total);
  };


  return (
    <>

    <table>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Product Quantity</th>
          <th>Product Buying Price</th>
          <th>Sale Amount</th>
          <th>Sale Qty</th>
          {/* Add more table headers if needed */}
        </tr>
      </thead>
      <tbody>
        {sales.map(sale => (
          <tr key={sale.id}>
            <td>{getProductById(sale.productId)?.name}</td>
            <td>{getProductById(sale.productId)?.quantity}</td>
            <td>{getProductById(sale.productId)?.price}</td>
            <td>{sale.salePrice}</td>
            <td>{sale.saleQuantity}</td>
            {/* Display more sale details as needed */}
          </tr>
        ))}
      </tbody>
    </table>


      <h3>Total Sales: {totalSales}</h3>
    </>

  );

};

export default App;
