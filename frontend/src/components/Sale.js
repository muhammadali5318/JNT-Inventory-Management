import React, { useState, useEffect } from "react";
import axios from "axios";

function Sale({products}) {
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
    const salesResponse = await axios.get(`http://localhost:3000/api/sales/findbydate?date=${selectedDate}`);
    setSales(salesResponse.data);
    calculateTotalSales(salesResponse.data)
  }

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
    const total = salesData.reduce((acc, sale) => acc + sale.salePrice * sale.saleQuantity, 0);
    setTotalSales(total);
  };


  const testing = (value) => {
    setSelectedDate(value.currentTarget.value)
  }

  return (
    <>

      <input type="date" id="Select-Date" onChange={testing}  name="Select-Date"></input>
      <div className="container mx-auto" >
      <h3 className="text-4xl font-bold	" >Sales</h3>
        <table className="container" >
          <thead>
            <tr className="flex justify-between">
              <th>Product Name</th>
              <th>Product Quantity</th>
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
                <td>{getProductById(sale.product)?.quantity}</td>
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
