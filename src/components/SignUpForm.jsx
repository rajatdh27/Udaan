import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Paper, TextField, Box, IconButton } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signOut,
} from "firebase/auth";

import { collection, addDoc, getDocs } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1F2A40",
    },
  },
});

const SignUpForm = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [disable, setDisable] = useState(false);
  const [err, setError] = useState({
    message: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    register();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && !auth.currentUser.emailVerified) {
        setError(() => {
          return { message: "xauth/Please check your mail and then refresh )" };
        });
      } else if (currentUser && auth.currentUser.emailVerified) {
        setError({ message: "" });
        console.log(currentUser);
        props.login(currentUser);
        navigate("/");
      }
    });
  }, [navigate, userInput.userName]);
  const registerID = async (id) => {
    try {
      addDoc(collection(db, `userID/`), {
        uid: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const register = async () => {
    try {
      console.log(userInput);
      const x = await createUserWithEmailAndPassword(
        auth,
        userInput.email,
        userInput.password
      );
      if (x.user) {
        sendEmailVerification(x.user).then(() => {
          alert("Please check your email!");
        });
        setError(() => {
          return { message: "xauth/Please check your mail and then refresh )" };
        });
      }

      if (x.user.uid !== undefined) {
        addDoc(collection(db, `userData/${x.user.uid}/userDetails/`), {
          name: userInput.name,
        });
        registerID(x.user.uid);
      }
    } catch (error) {
      setError(() => {
        return {
          message: error.message,
        };
      });
    }
  };
  const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(true);

  useEffect(() => {
    if (name && email && password) {
      setIsAllFieldsFilled(true);
      setDisable(true);
    } else {
      setIsAllFieldsFilled(false);
    }
  }, [name, email, password]);

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
            Badho
          </Box>
          <TextField
            id="name"
            label="Name"
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setUserInput((prevInput) => {
                return { ...prevInput, name: event.target.value };
              });
            }}
            sx={{
              margin: "10px",
            }}
          />
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
          {disable && (
            <Button
              type="submit"
              sx={{ backgroundColor: "#1F2A40", color: "white" }}
              onClick={handleSubmit}
              variant="contained"
            >
              Sign Up
            </Button>
          )}
          <Button
            type="submit"
            sx={{
              backgroundColor: "#1F2A40",
              color: "white",
              marginTop: "10px",
            }}
            onClick={() => {
              navigate("/login");
            }}
            variant="contained"
          >
            Go to Login Page
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

export default SignUpForm;
