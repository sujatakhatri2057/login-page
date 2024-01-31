import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const history = useNavigate();
  const [formValues, setFormValues] = useState({});

  const handleInput = (e) => {
    const values = { ...formValues };

    values[e.target.name] = e.target.value;

    setFormValues(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/user/login", {
        ...formValues,
      })
      .then((res) => {
        alert("User Login!");
        if (res.status === 200 && res.data.message.role === "role_user") {
          localStorage.setItem("username", res.data.message.fname);
          localStorage.setItem("useremail", res.data.message.email);
          history("/dashboard");
        }
      })
      .catch(() => {
        alert("Login Failed");
      });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{ width: "550px", margin: "20px auto", background: "#C5E3EC" }}
      >
        <h3 style={{ textAlign: "center" }}>Login</h3>
        <div className="form-group mx-3">
          <label htmlFor="email">Email</label>
          <input className="form-control" name="email" onChange={handleInput} />
        </div>

        <div className="form-group mx-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={handleInput}
          />
        </div>

        <div className="form-group mt-2 text-center">
          <button className="btn btn-primary mt-2" type="submit">
            Submit
          </button>
        </div>

        <div className="form-group text-center">
          <span>
            Does not have an account? Please{" "}
            <a onClick={() => history("/")} style={{ color: "blueviolet" }}>
              Register
            </a>{" "}
            here
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
