import React, { useState,useEffect } from 'react';
import styled from "styled-components";
import Chat from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginRoute } from "../utils/apiRoutes"
import axios from 'axios';

function Login() {

  let axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_DB_URL
  });

  const navigate = useNavigate();

  const [value, setValue] = useState({
    username: "",
    password: "",
  });

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {

      let username = JSON.parse(localStorage.getItem("chat-app-user"));


      toast.success(`Welcome Back ${username.username}`, toastOptions);

      setTimeout(() => {
        navigate("/")
      }, 2000);
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (handleValidation()) {
      const { username, password } = value;

      const { data } = await axiosInstance.post(loginRoute, {
        username,
        password
      });

      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));

        toast.success(data.message, toastOptions);
        setTimeout(() => {
          navigate("/");
        }, 700);
    }
      if (data.status === false) {
        toast.error(data.message, toastOptions);
      }
    }

  }

  function handleValidation() {
    const { username, password } = value;

    if ([username, password].some((field) => field.trim() === "")) {
      toast.error("All Fields are Mandatory", toastOptions);
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
            <img src={Chat} alt="logo" />
            <h1>ping</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={value.username}
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={value.password}
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Login</button>
          <span>
            Don't have an account ? <Link to="/register">Register</Link>
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


export default Login;