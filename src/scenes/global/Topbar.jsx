import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const Topbar = (props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="start" p={2}>
      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
      </Box>
      {props.uid !== "" && (
        <Box display="flex" marginLeft={4}>
          <IconButton
            onClick={() => {
              signOut(auth)
                .then(() => {
                  props.signOut();
                  navigate("/login");
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            <Logout />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default Topbar;
