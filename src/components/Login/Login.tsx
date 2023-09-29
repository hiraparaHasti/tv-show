import React, { useState } from "react";
import { Button, TextField, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  setDataToLocalStorage,
  getDataFromLocalStorage,
} from "../../utils/LocalStorageUtils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface UserData {
  id: string;
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //   const handleLogin = () => {
  //     const storedData = localStorage.getItem('loginData');
  //     const existingData: UserData[] = storedData ? JSON.parse(storedData) : [];
  //     // console.log('existingData', existingData);
  //     const userExists = existingData.some((userData) => userData.email === email);
  // // console.log('userExists', userExists);
  //     if (!userExists) {
  //       const newLoginData = {
  //         id: uuidv4(),
  //         email,
  //         password,
  //       };

  //       existingData.push(newLoginData);
  //       localStorage.setItem('loginData', JSON.stringify(existingData));
  //     }
  //     if (email.trim() === '') {
  //       return;
  //     }
  //     localStorage.setItem('loginUser', email);

  //     navigate('/Home');
  //     window.location.reload();
  //   };

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const handleLogin = () => {
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (password.length < 5) {
      toast.error("Password must be at least 5 characters long");
      return;
    }

    const existingData: UserData[] = getDataFromLocalStorage("loginData");

    const userExists = existingData.some(
      (userData) => userData.email === email
    );

    if (!userExists) {
      const newLoginData = {
        id: uuidv4(),
        email,
        password,
      };

      existingData.push(newLoginData);
      setDataToLocalStorage("loginData", existingData);
    }

    if (email.trim() === "") {
      return;
    }

    setDataToLocalStorage("loginUser", email);
    navigate("/Home");
    window.location.reload();
  };
  return (
    <Container maxWidth="sm">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Typography variant="h4" align="center" mt={30}>
        Login
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
        style={{ marginTop: "16px" }}
      >
        Login
      </Button>
    </Container>
  );
};

export default Login;
