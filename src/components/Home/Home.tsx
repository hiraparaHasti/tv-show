import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Container,
  CssBaseline,
  Typography,
  Grid,
  Box,
  MenuItem,
  FormControl,
  Pagination,
} from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Rating from "@mui/material/Rating";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useFavorites } from "../../Context/FavoritesContext";
import { useSortFilter, SortOption } from "../../Context/SortFilterContext";
import * as api from "../../Services/dataServices";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../../Context/ThemeContext";

interface Show {
  name: string;
  image: { medium: string };
  id: number;
  rating: {
    average: number;
  };
}

const Home: React.FC = () => {
  const [data, setData] = useState<Show[]>([]);
  const { addFavorite, removeFavorite, favorites } = useFavorites();
  const { sortOption, filterOptions, setSortOption, setFilterOptions } =
    useSortFilter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showsPerPage] = useState(10);
  const { theme } = useTheme();

  const fetchInfo = () => {
    return api
      .fetchAllShows()
      .then((response) => {
        const data = response;
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortOption(event.target.value as SortOption);
  };
  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilterOptions({ rating: parseInt(event.target.value as string) });
  };

  let sortedData = [...data];
  if (sortOption === SortOption.NAME_ASC) {
    sortedData = sortedData.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === SortOption.NAME_DESC) {
    sortedData = sortedData.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortOption === SortOption.RATING_ASC) {
    sortedData = sortedData.sort((a, b) => a.rating.average - b.rating.average);
  } else if (sortOption === SortOption.RATING_DESC) {
    sortedData = sortedData.sort((a, b) => b.rating.average - a.rating.average);
  }

  if (filterOptions.rating > 0) {
    sortedData = sortedData.filter(
      (show) => show.rating.average >= filterOptions.rating
    );
  }

  const toggleFavorite = (showId: number) => {
    if (favorites.includes(showId)) {
      toast.info("Remove from favorite cart!");
      removeFavorite(showId);
    } else {
      toast.success("Added to favorite cart!");
      addFavorite(showId);
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };
  const indexOfLastShow = currentPage * showsPerPage;
  const indexOfFirstShow = indexOfLastShow - showsPerPage;
  const showsToShow = sortedData.slice(indexOfFirstShow, indexOfLastShow);

  return (
    <div style={{ background: theme === "dark" ? "#121212" : "white" }}>
      <Container maxWidth="md">
        <CssBaseline />
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
        <Container
          style={{ position: "relative", top: "309px", marginLeft: "-31px" }}
        >
          <Typography
            style={{
              marginLeft: "1033px",
              marginBottom: "28px",
              fontSize: "25px",
              fontFamily: "serif",
              fontWeight: "bolder",
              color: "firebrick",
            }}
          >
            Filter
          </Typography>
          <hr
            style={{ marginTop: "-22px", width: "100px", marginLeft: "1015px" }}
          />
          <Box>
            <Typography
              style={{
                width: "130px",
                marginLeft: "1010px",
                marginBottom: "-56px",
                fontFamily: "revert",
                fontWeight: "700",
                color: "blue",
              }}
            >
              Rating:
            </Typography>
            <FormControl
              style={{
                width: "130px",
                marginLeft: "1010px",
                marginTop: "59px",
                border: "2px solid aliceblue",
                background: "white",
              }}
            >
              <Select
                value={filterOptions.rating.toString()}
                onChange={handleFilterChange}
              >
                <MenuItem value="0">All</MenuItem>
                <MenuItem value="2">2+</MenuItem>
                <MenuItem value="3">3+</MenuItem>
                <MenuItem value="4">4+</MenuItem>
                <MenuItem value="5">5+</MenuItem>
                <MenuItem value="6">6+</MenuItem>
                <MenuItem value="7">7+</MenuItem>
                <MenuItem value="8">8+</MenuItem>
                <MenuItem value="9">9+</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box>
            <Typography
              style={{
                width: "130px",
                marginLeft: "1010px",
                marginBottom: "-56px",
                fontFamily: "revert",
                fontWeight: "700",
                color: "blue",
                marginTop: "15px",
              }}
            >
              Sort By:
            </Typography>

            <FormControl
              style={{
                width: "130px",
                marginLeft: "1010px",
                marginTop: "59px",
                border: "2px solid aliceblue",
                background: "white",
              }}
            >
              <Select value={sortOption} onChange={handleSortChange}>
                <MenuItem value={SortOption.NAME_ASC}>A to Z</MenuItem>
                <MenuItem value={SortOption.NAME_DESC}>Z to A</MenuItem>
                <MenuItem value={SortOption.RATING_ASC}>Lowest Rating</MenuItem>
                <MenuItem value={SortOption.RATING_DESC}>
                  Highest Rating
                </MenuItem>
                <MenuItem value={SortOption.RATING_ASC}>Most Popular</MenuItem>
                <MenuItem value={SortOption.RATING_DESC}>
                  Least Popular
                </MenuItem>
                <MenuItem value={SortOption.RATING_ASC}>Most Followed</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Container>
        <Container style={{ marginTop: "-85px", marginLeft: "-60px" }}>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1 }}
            style={{
              marginBottom: "94px",
              marginLeft: "45px",
              color: "darkcyan",
              textShadow: "2px 7px 3px black",
              fontSize: "40px",
              fontFamily: "fantasy",
            }}
          >
            Shows
          </Typography>
          {loading ? (
            <Typography
              style={{
                color: "red",
                fontWeight: "700",
                fontSize: "25px",
                textAlign: "center",
              }}
            >
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
              />
            </Typography>
          ) : error ? (
            <Typography>Error: {error}</Typography>
          ) : (
            <Grid
              container
              spacing={24}
              rowSpacing={9}
              style={{ marginTop: "-143px" }}
            >
              {showsToShow.map((dataObj) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={dataObj.name}>
                  <Card
                    sx={{
                      padding: "-6px",
                      borderRadius: 2,
                      width: "236px",
                      boxShadow: "0 2px 4px black",
                    }}
                  >
                    <CardContent>
                      <Link
                        to={`/Details/${dataObj.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <img
                          src={dataObj.image.medium}
                          alt="TV Show Logo"
                          style={{ width: "220px", marginLeft: "-7px" }}
                        />
                      </Link>

                      <Typography
                        variant="h6"
                        component="div"
                        sx={{
                          color: "white",
                          textAlign: "center",
                          fontSize: "17px",
                          backgroundColor: "#0f636f",
                          height: "100px",
                          marginTop: "-7px",
                          width: "221px",
                          marginLeft: "-7px",
                        }}
                      >
                        {" "}
                        <Link
                          to={`/Details/${dataObj.id}`}
                          style={{ textDecoration: "none", color: "white" }}
                        >
                          {dataObj.name}
                        </Link>
                        <hr />
                        <FavoriteIcon
                          style={{
                            fontSize: "33px",
                            marginLeft: "-29px",
                            color: favorites?.includes(dataObj.id)
                              ? "red"
                              : "inherit",
                            cursor: "pointer",
                          }}
                          onClick={() => toggleFavorite(dataObj.id)}
                        />
                        <Link
                          to={`/details/${dataObj.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Rating
                            name="customized-10"
                            defaultValue={1}
                            max={1}
                            style={{ marginLeft: "76px", fontSize: "33px" }}
                          ></Rating>
                        </Link>
                        <Typography
                          style={{ marginTop: "-34px", marginLeft: "151px" }}
                        >
                          {dataObj.rating.average}K
                        </Typography>
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
          <Pagination
            count={Math.ceil(sortedData.length / showsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            sx={{
              "& .MuiPaginationItem-page": { color: "red" },
              "& .MuiPaginationItem-page.Mui-selected": { color: "white" },
            }}
            style={{ marginTop: "20px", alignSelf: "center" }}
          />
        </Container>
      </Container>
    </div>
  );
};
export default Home;
