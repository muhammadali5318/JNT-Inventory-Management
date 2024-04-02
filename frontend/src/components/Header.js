import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="container mx-auto font-bold text-2xl mt-7">
      <ul className="flex space-x-4">
      <li >
        JNT-Inventory Management
        </li>
        <li>
          <Link to="/">Products</Link>
        </li>
        <li className="px-2">
          <Link to="/sales">Sales</Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
