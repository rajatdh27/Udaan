import React, { useState, useEffect } from "react";
import { Button, Grid, Paper, TextField, Box, IconButton } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1F2A40",
    },
  },
});

const LoginForm = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [err, setError] = useState({
    message: "",
  });
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && !auth.currentUser.emailVerified) {
        setError({ message: "xauth/Email not verified)" });
      } else if (currentUser && auth.currentUser.emailVerified) {
        setError({ message: "" });
        props.login(currentUser);
        navigate("/");
      }
    });
  }, [props, navigate]);
  const requestHandler = () => {
    signInWithEmailAndPassword(auth, userInput.email, userInput.password)
      .then()
      .catch((error) => {
        setError(() => {
          return {
            message: error.message,
          };
        });
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    props.login();
    requestHandler();
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(true);
  useEffect(() => {
    if (email && password) {
      setIsAllFieldsFilled(true);
    } else {
      setIsAllFieldsFilled(false);
    }
  }, [email, password]);

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "80vh",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Paper
          sx={{
            padding: "40px",
            margin: "20px",
            backgroundColor: "#fff",
            color: "#1F2A40",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              fontSize: "30px",
              fontWeight: "bold",
              color: "#1F2A40",
              letterSpacing: "2px",
            }}
          >
            Udaan
          </Box>
          <TextField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setUserInput((prevInput) => {
                return { ...prevInput, email: event.target.value };
              });
            }}
            sx={{
              margin: "10px",
            }}
          />
          <div style={{ position: "relative", margin: "10px" }}>
            <TextField
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setUserInput((prevInput) => {
                  return { ...prevInput, password: event.target.value };
                });
              }}
              style={{ width: "100%" }}
            />
            <IconButton
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </div>
          {isAllFieldsFilled && (
            <Button
              type="submit"
              sx={{ backgroundColor: "#1F2A40", color: "white" }}
              onClick={handleSubmit}
              variant="contained"
            >
              Login
            </Button>
          )}{" "}
          <Button
            type="submit"
            sx={{
              backgroundColor: "#1F2A40",
              color: "white",
              marginTop: "10px",
            }}
            onClick={() => {
              navigate("/signup");
            }}
            variant="contained"
          >
            Go to Sign Up Page
          </Button>
        </Paper>
      </Grid>
      <Grid container justifyContent="center" sx={{ marginTop: "20px" }}>
        {!isAllFieldsFilled && (
          <Box
            sx={{
              backgroundColor: "#f8d7da",
              color: "#721c24",
              padding: "10px",
              border: "1px solid #f5c6cb",
              borderRadius: "5px",
            }}
          >
            Please fill in all fields.
          </Box>
        )}
        {err.message !== "" ? (
          <Box
            sx={{
              backgroundColor: "#f8d7da",
              color: "#721c24",
              padding: "10px",
              border: "1px solid #f5c6cb",
              borderRadius: "5px",
            }}
          >
            {err.message}
          </Box>
        ) : (
          ""
        )}
      </Grid>
    </ThemeProvider>
  );
};

export default LoginForm;
