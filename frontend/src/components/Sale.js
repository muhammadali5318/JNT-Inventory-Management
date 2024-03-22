import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateSale from "./CreateSale";

function Sale({ products, fetchProducts }) {
  const [sales, setSales] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [selectedDate, setSelectedDate] = useState(0);
  const [startDate, setStartDate] = useState(0);
  const [endDate, setEndDate] = useState(0);
  const [visibleProp, setVisibleProp] = useState(false);


  const showModal = () => {
    setVisibleProp((pre) => !pre);
    fetchProducts();
  };

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

  const fetchSalesBetweenDates = async () => {
    const salesResponse = await axios.get(
      `http://localhost:3000/api/sales/findBetweenTwoDates?startDate=${startDate}&endDate=${endDate}`
    );
    setSales(salesResponse.data);
    calculateTotalSales(salesResponse.data);
  };

  useEffect(() => {
    calculateTotalPrice(sales);
  }, [sales]);

  const calculateTotalPrice = (sales) => {
    const total = sales.reduce((accumulator, sale) => {
      const product = getProductById(sale.product);
      const totalSale = product?.price * sale.saleQuantity;
      return accumulator + totalSale;
    }, 0);
    setTotalCost(total);
  };

  return (
    <>
      <div className="container mx-auto">
        <h3 className="text-2xl font-bold	mt-4">Sales</h3>
        <CreateSale
        visible={visibleProp}
        changeState={showModal}
        products={products}
      />
        <div className="container mx-auto my-4">
          <button
            onClick={showModal}
            className="rounded-full bg-slate-500 px-3 py-1 text-white hover:text-cyan-200"
          >
            Create Sale
          </button>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="flex space-x-1">
              <div>
                Start Date
                <input
                  type="date"
                  id="Select-Date"
                  name="Select-Date"
                  onChange={(e) => setStartDate(e.target.value)}
                  className="appearance-none block w-40 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                End Date
                <input
                  type="date"
                  id="Select-Date"
                  onChange={(e) => setEndDate(e.target.value)}
                  name="Select-Date"
                  className="appearance-none block w-40 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <button
              onClick={fetchSalesBetweenDates}
              className="rounded-full bg-slate-500 px-3 py-1 mt-3 text-white hover:text-cyan-200"
            >
              Filter Sales
            </button>
          </div>
          <div>
            Filter By Date
            <input
              type="date"
              id="Select-Date"
              onChange={testing}
              name="Select-Date"
              className="appearance-none block w-40 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm "
            />
          </div>
        </div>

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
        <h3>Product cost: {totalCost}</h3>
        <h3>Gross Profit: {totalSales - totalCost}</h3>
      </div>
    </>
  );
}

export default Sale;
