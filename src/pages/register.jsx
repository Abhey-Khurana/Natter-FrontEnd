import React, { useState } from 'react'
import styled from "styled-components"
import Logo from "../assets/logo.svg"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerRoute } from "../utils/apiRoutes"
import axios from 'axios';

function Register() {

  const navigate=useNavigate();

  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (handleValidation()) {
      const { username, email, password } = value;
      const {data} = await axios.post(registerRoute, {
        username,
        email,
        password
      });

      if (data.status === true) {
        localStorage.setItem("chat-app-user",JSON.stringify(data.user));
        toast.success(data.message,toastOptions);
        setTimeout(()=>{
          navigate("/");
        },2500);
      }
      if(data.status===false) {
        toast.error(data.message,toastOptions);
      }
    }

  }

  function handleValidation() {
    const { username, email, password, confirmPassword } = value;

    if ([username, email, password, confirmPassword].some((field) => field.trim() === "")) {
      toast.error("All Fields are Mandatory", toastOptions);
      return false;
    }
    else if (password !== confirmPassword) {
      toast.error("Password and ConfirmPassword doesn't match", toastOptions);
      return false;
    }
    else if (username.length < 3) {
      toast.error("Short Username", toastOptions);
      return false;
    }
    else if (password.length < 8) {
      toast.error("Weak Password", toastOptions);
      return false;
    }
    else if (!email.includes("@")) {
      toast.error("Enter Valid Email", toastOptions);
      return false;
    }

    return true;

  }
  function handleChange(e) {
    setValue({ ...value, [e.target.name]: e.target.value });
  }

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>natter</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={value.username}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={value.email}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={value.password}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={value.confirmPassword}
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;


export default Register;