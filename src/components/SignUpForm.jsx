import React from "react";
import { Button, Grid, Paper, TextField, Box, IconButton } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1F2A40",
    },
  },
});

const SignUpForm = (props) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.login();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
            onChange={(event) => setName(event.target.value)}
            sx={{
              margin: "10px",
            }}
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
              onChange={(event) => setPassword(event.target.value)}
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
          <Button
            type="submit"
            sx={{ backgroundColor: "#1F2A40", color: "white" }}
            onClick={handleSubmit}
            variant="contained"
          >
            Sign Up
          </Button>
        </Paper>
      </Grid>
    </ThemeProvider>
  );
};

export default SignUpForm;
