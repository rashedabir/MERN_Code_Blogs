import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://code-blogs-tech.herokuapp.com/user/login", {
        userName: userName,
        password: password,
      });
      window.location.href = "/";
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="bg-white border container p-3 login mx-auto text-center">
      <i className="fas fa-user border p-4 rounded-circle fs-2 mt-3"></i>
      <h4 className="text-uppercase py-3 pb-5">Admin Login</h4>
      <form onSubmit={formSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <label for="floatingInput">User Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <label for="floatingPassword">Password</label>
        </div>
        <button type="submit" className="text-uppercase py-2 w-100 btn mb-4">
          sign in
        </button>
      </form>
    </div>
  );
}

export default Login;
