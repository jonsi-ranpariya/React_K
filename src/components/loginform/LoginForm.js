import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function LoginForm() {
  const navigate = useNavigate();
  const handleSubmit = async (email, password) => {
    console.log(email, password);
    // axios.post(`https://interview-api.kodecreators.com/api/users/login`)
    await axios
      .post("https://interview-api.kodecreators.com/api/users/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log("resdata", response.data);

        const token = response.data.token;
        sessionStorage.setItem("token", token);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="App">
      <RegistrationForm onSubmit={handleSubmit} />
    </div>
  );
}

function RegistrationForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isEnable, setEnable] = useState(true);
  const handleKeyUp = () => {
    if (email.length > 0 && password.length > 0) setEnable(false);
    else setEnable(true);
  };

  return (
    <div className="wrapper d-flex align-item-center justify-content-center w-100">
      <div className="login">
        <h2 className="title">Login</h2>
        <div className="form-group mb-2">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email-input"
            placeholder="Email"
            value={email}
            onKeyUp={handleKeyUp}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="form-group mb-2">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password-input"
            className="form-control"
            placeholder="Password"
            onKeyUp={handleKeyUp}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <button
          type="submit"
          id="button-input"
          disabled={isEnable}
          onClick={() => onSubmit(email, password)}
          className="btn btn-success w-100 block mt-4"
        >
          Login
        </button>
      </div>
    </div>
    // <div>
    //   <label>Email</label>
    //   <input
    //     type="email"
    //     id="email-input"
    //     placeholder="Email"
    //     value={email}
    //     onKeyUp={handleKeyUp}
    //     onChange={(e) => setEmail(e.target.value)}
    //   />
    //   <br />
    //   <br />
    //   <label>Password</label>
    //   <input
    //     type="password"
    //     id="password-input"
    //     placeholder="Password"
    //     onKeyUp={handleKeyUp}
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //   />
    //   <br />
    //   <br />
    //   <button
    //     type="submit"
    //     id="button-input"
    //     disabled={isEnable}
    //     onClick={() => onSubmit(email, password)}
    //   >
    //     Login
    //   </button>
    // </div>
  );
}
