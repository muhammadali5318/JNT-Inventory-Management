import React, { useState, useEffect } from "react";
import axios from "axios";

function Sale({ products, showModal }) {
  const [sales, setSales] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [selectedDate, setSelectedDate] = useState(0);

  const fetchSales = async () => {
    try {
      const salesResponse = await axios.get(`http://localhost:3000/api/sales`);

      setSales(salesResponse.data);
      calculateTotalSales(salesResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchSalesByDate = async () => {
    const salesResponse = await axios.get(
      `http://localhost:3000/api/sales/findbydate?date=${selectedDate}`
    );
    setSales(salesResponse.data);
    calculateTotalSales(salesResponse.data);
  };

  useEffect(() => {
    fetchSales();
    // eslint-disable-next-line
  }, [products]);

  useEffect(() => {
    fetchSalesByDate();
    // eslint-disable-next-line
  }, [selectedDate]);

  const getProductById = (productId) => {
    return products?.find((product) => product._id === productId);
  };

  const calculateTotalSales = (salesData) => {
    const total = salesData.reduce(
      (acc, sale) => acc + sale.salePrice * sale.saleQuantity,
      0
    );
    setTotalSales(total);
  };

  const testing = (value) => {
    setSelectedDate(value.currentTarget.value);
  };

  return (
    <>
      <div className="container mx-auto">
        <h3 className="text-4xl font-bold	">Sales</h3>
        <div className="container mx-auto my-4">
          <button
            onClick={showModal}
            className="rounded-full bg-slate-500 px-3 py-1 text-white hover:text-cyan-200"
          >
            Create Sale
          </button>
        </div>
        <input
          type="date"
          id="Select-Date"
          onChange={testing}
          name="Select-Date"
          className="appearance-none block w-40 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />

        <table className="container">
          <thead>
            <tr className="flex justify-between">
              <th>Product Name</th>
              <th>Product Buying Price</th>
              <th>Sale Amount</th>
              <th>Sale Qty</th>
              {/* Add more table headers if needed */}
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr className="flex justify-between" key={sale._id}>
                <td>{getProductById(sale.product)?.name}</td>
                <td>{getProductById(sale.product)?.price}</td>
                <td>{sale.salePrice}</td>
                <td>{sale.saleQuantity}</td>
                {/* Display more sale details as needed */}
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Total Sales: {totalSales}</h3>
      </div>
    </>
  );
}

export default Sale;
