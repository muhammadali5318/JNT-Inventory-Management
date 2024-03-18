import React, { useState } from "react";
import CreateProduct from "./CreateProduct";



function Product({allCategories ,products }) {
const [isCreatingNewProduct, setIsCreatingProduct] = useState(false)


  const showModal = () => {
    setIsCreatingProduct(pre => !pre)
  }

  return (
    <>
    <button onClick={showModal} className='rounded-full bg-slate-500 px-3 py-1 text-white hover:text-cyan-200'>
      Create Product
    </button>
  <CreateProduct categories={allCategories} isCreatingProduct={isCreatingNewProduct} changeState={showModal} products={products}/>

      <div className="container mx-auto">
        <h3 className="text-4xl font-bold	">Products</h3>
        <table className="container">
          <thead>
            <tr className="flex justify-between">
              <th>Product Name</th>
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
                <td>{product?.quantity}</td>
                <td>{product?.price}</td>
                <td>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
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

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function Sale() {
//   const [sales, setSales] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [totalSales, setTotalSales] = useState(0);

//   const fetchSalesAndProducts = async () => {
//     try {
//       // const salesResponse = await axios.get(`http://localhost:3000/api/sales/findbydate?date=2024-02-21`);
//       const salesResponse = await axios.get(`http://localhost:3000/api/sales`);
//       const productsResponse = await axios.get(
//         "http://localhost:3000/api/products"
//       );

//       setSales(salesResponse.data);
//       setProducts(productsResponse.data);
//       calculateTotalSales(salesResponse.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchSalesAndProducts();
//     // eslint-disable-next-line
//   }, []);

//   const getProductById = (productId) => {
//     return products.find((product) => product.id === productId);
//   };

//   const calculateTotalSales = (salesData) => {
//     const total = salesData.reduce((acc, sale) => acc + sale.salePrice, 0);
//     setTotalSales(total);
//   };

//   return (
//     <>
//       <div className="container mx-auto" >
//       <h3 className="text-4xl font-bold	" >Sales</h3>
//         <table className="container" >
//           <thead>
//             <tr className="flex justify-between">
//               <th>Product Name</th>
//               <th>Product Quantity</th>
//               <th>Product Buying Price</th>
//               <th>Sale Amount</th>
//               <th>Sale Qty</th>
//               {/* Add more table headers if needed */}
//             </tr>
//           </thead>
//           <tbody>
//             {sales.map((sale) => (
//               <tr className="flex justify-between" key={sale._id}>
//                 <td>{getProductById(sale.productId)?.name}</td>
//                 <td>{getProductById(sale.productId)?.quantity}</td>
//                 <td>{getProductById(sale.productId)?.price}</td>
//                 <td>{sale.salePrice}</td>
//                 <td>{sale.saleQuantity}</td>
//                 {/* Display more sale details as needed */}
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <h3>Total Sales: {totalSales}</h3>
//       </div>
//     </>
//   );
// }

// export default Sale;
