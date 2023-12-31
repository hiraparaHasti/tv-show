import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
  TextField,
  createTheme,
  Badge,
  ThemeProvider,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import BrightnessLowIcon from "@mui/icons-material/BrightnessLow";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  deleteDataFromLocalStorage,
  getDataFromLocalStorage,
} from "../../utils/LocalStorageUtils";
import { useTheme } from "../../Context/ThemeContext";
import { useFavorites } from "../../Context/FavoritesContext";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#000",
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976D2",
    },
  },
});

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { theme, toggleTheme } = useTheme();
  const { favorites } = useFavorites();
  const [userData, setUserData] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userLoginData = getDataFromLocalStorage("loginUser");
    setUserData(userLoginData);
  }, []);

  const handleSearch = () => {
    navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`);
  };
  const handleLogout = () => {
    setUserData(null);
    deleteDataFromLocalStorage("loginUser");
    navigate("/");
  };

  const handleChangeRoute = (key: string) => {
    setSearchQuery("");
    navigate(`/${key}`);
  };

  const isLoginRoute = location.pathname === "/";

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      {!isLoginRoute && (
        <Container>
          <CssBaseline />
          {userData ? (
            <AppBar
              style={{
                backgroundColor: "#0f636f",
                boxShadow: "0px 8px 10px black",
              }}
            >
              <Toolbar>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ flexGrow: 1 }}
                  style={{
                    color: "white",
                    marginLeft: 40,
                    fontFamily: "math",
                    fontWeight: 900,
                    fontSize: "33px",
                  }}
                >
                  Tv Show
                </Typography>
                <TextField
                  placeholder="Search"
                  variant="outlined"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{ style: { color: "red" } }}
                  style={{
                    background: "white",
                    marginBottom: "7px",
                    width: "454px",
                    marginTop: "10px",
                    marginRight: "-67px",
                    border: "2px solid black",
                    borderRadius: "10px",
                  }}
                />
                <Button
                  onClick={handleSearch}
                  style={{ marginRight: "526px", color: "blue" }}
                >
                  <SearchIcon />
                </Button>
                <Button
                  onClick={() => handleChangeRoute("Home")}
                  style={{ color: "white" }}
                >
                  Show
                </Button>
                <Tooltip title="Account">
                  <Button
                    onClick={() => handleChangeRoute("user")}
                    style={{ color: "white" }}
                  >
                    <AccountCircleIcon />
                  </Button>
                </Tooltip>
                <Tooltip title="Favorites">
                  <Badge badgeContent={favorites.length} color="error">
                    <FavoriteIcon
                      style={{ fontSize: "27px", color: "white" }}
                      onClick={() => handleChangeRoute("favorite")}
                    />
                  </Badge>
                </Tooltip>
                <Tooltip title={theme ? "Light Mode" : "Dark Mode"}>
                  <Button onClick={toggleTheme} style={{ color: "white" }}>
                    {theme === "dark" ? (
                      <BrightnessLowIcon />
                    ) : (
                      <Brightness4Icon />
                    )}
                  </Button>
                </Tooltip>
                <Button style={{ color: "#77ed08" }} onClick={handleLogout}>
                  Logout
                </Button>
              </Toolbar>
            </AppBar>
          ) : null}
        </Container>
      )}
    </ThemeProvider>
  );
};

export default Navbar;
