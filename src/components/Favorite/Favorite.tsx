import React, { useEffect, useState } from "react";
import { useFavorites } from "../../Context/FavoritesContext";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import { fetchAllShows } from "../../Services/dataServices";

interface Show {
  id: number;
  name: string;
  image: {
    medium: string;
  };
}

const Favorite: React.FC = () => {
  const { favorites } = useFavorites();
  const [favoriteShows, setFavoriteShows] = useState<Show[]>([]);

  useEffect(() => {
    fetchAllShows()
      .then((data) => {
        const favoriteShowsInFavorites = data.filter((show: Show) =>
          favorites.includes(show.id)
        );
        setFavoriteShows(favoriteShowsInFavorites);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [favorites]);

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        style={{
          marginTop: "153px",
          color: "darkcyan",
          textShadow: "2px 7px 3px black",
          fontSize: "40px",
          fontFamily: "fantasy",
        }}
      >
        Favorite Show
      </Typography>
      <Grid container spacing={6} style={{ marginTop: "-16px" }}>
        {favoriteShows.length === 0 ? (
          <Typography
            variant="body1"
            style={{
              marginTop: "108px",
              marginLeft: "439px",
              fontSize: "30px",
              color: "red",
              fontFamily: "monospace",
              fontWeight: 700,
            }}
          >
            You have no favorite shows.
          </Typography>
        ) : (
          favoriteShows.map((show) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={show.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="378px"
                  image={show.image.medium}
                  alt={show.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {show.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default Favorite;
