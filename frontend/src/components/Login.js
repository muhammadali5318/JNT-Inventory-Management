import React, { useState } from "react";
import axios from "axios";

const Login = ({ updateToken }) => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  const authenticateUser = async (e) => {
    e.preventDefault();
    try {
      const user = await axios.post(
        "http://localhost:3000/api/user/login",
        data
      );
      const token = user.data.token;
      localStorage.setItem("token", token);
      updateToken();
    } catch (error) {
      localStorage.setItem("token");
      console.log("User is unauthorised" + Error);
    }
  };

  return (
    <>
      <div className="container mx-auto">
        <form onSubmit={authenticateUser}>
          <div className="p-2 h-screen">
            <h1 className="text-4xl my-10 font-bold"> JNT-Mobiles</h1>
            <div className="w-1/3">
              <p className="text-sm text-white">User name</p>
              <input
                className="w-full py-2 px-1 mb-3 border text-black  border-sky-500 rounded-sm border-solid "
                name="username"
                type="text"
                placeholder="Username"
                onChange={handleInputChange}
              ></input>
            </div>

            <div className="w-1/3">
              <p className="text-sm text-white">Password</p>
              <input
                className="w-full py-2 px-1 mb-3 border text-black border-sky-500 rounded-sm border-solid "
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleInputChange}
              ></input>
            </div>

            <div className="w-1/3 text-center">
              <button
                type="submit"
                className="rounded-full bg-slate-500 px-8 font-bold py-1 mx-3 text-white hover:text-cyan-200 disabled:text-white disabled:bg-slate-300 disabled:border-slate-500 "
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
