import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const SITE_KEY = "6Ldm110lAAAAAHslGUbY57RhzjdhLBZ6kDdxSFps";

const App = () => {
  const history = useNavigate();

  const [formValues, setFormValues] = useState({});
  const [recaptchaValue, setRecaptchaValue] = useState("");

  const [pass, setPass] = useState({ inputpass: "" });
  const [passResponse, setPassResponse] = useState("");
  const captchaRef = useRef();

  const handleInput = (e) => {
    const values = { ...formValues };

    values[e.target.name] = e.target.value;

    setFormValues(values);

    const pattern = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
    );

    let inputpass = values[e.target.name];
    if (e.target.name === "password")
      setPass({
        inputpass: values[e.target.name],
      });

    if (pattern.test(inputpass) && inputpass.length <= 8)
      setPassResponse("Medium");
    else if (pattern.test(inputpass) && inputpass.length >= 8)
      setPassResponse("Strong");
    else setPassResponse("Weak");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    captchaRef.current.reset();

    axios
      .post("http://localhost:8000/user/register", {
        ...formValues,
        recaptchaValue,
      })
      .then(() => {
        alert("User created!");
        history("/login");
      })
      .catch((err) => {
        console.log(err);
        alert("Registration Failed");
      });
  };

  const onChange = (value) => {
    console.log(value);
    setRecaptchaValue(value);
  };

  return (
    <div className="app">
      <form
        onSubmit={handleSubmit}
        style={{ width: "550px", margin: "20px auto", background: "#C5E3EC" }}
      >
        <h3 style={{ textAlign: "center" }}>Register</h3>
        <div className="form-group mx-3">
          <label htmlFor="fname">First Name</label>
          <input className="form-control" name="fname" onChange={handleInput} />
        </div>

        <div className="form-group mx-3">
          <label htmlFor="lname">Last Name</label>
          <input className="form-control" name="lname" onChange={handleInput} />
        </div>

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

        <div className="form-group mx-3">
          {pass.inputpass ? (
            passResponse === "Strong" ? (
              <span style={{ color: "green" }}> Strong Password</span>
            ) : passResponse === "Medium" ? (
              <span style={{ color: "blue" }}> Medium Password</span>
            ) : (
              <span style={{ color: "red" }}> Weak Password</span>
            )
          ) : null}
        </div>

        <div className="form-group mx-3">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            name="cpassword"
            onChange={handleInput}
          />
        </div>

        <div className="form-group mt-2 mx-5">
          <ReCAPTCHA sitekey={SITE_KEY} onChange={onChange} ref={captchaRef} />
        </div>

        <div className="form-group mt-2 text-center">
          <button className="btn btn-primary mt-2" type="submit">
            Submit
          </button>
        </div>

        <div className="form-group text-center">
          <span>
            Already have an account? Please{" "}
            <a
              onClick={() => history("/login")}
              style={{ color: "blueviolet" }}
            >
              Login
            </a>{" "}
            here
          </span>
        </div>
      </form>
    </div>
  );
};

export default App;
