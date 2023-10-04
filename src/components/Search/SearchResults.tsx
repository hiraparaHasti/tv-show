import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Container,
} from "@mui/material";
import { fetchSearchResults } from "../../Services/dataServices";

interface SearchResult {
  id: number;
  name: string;
  image: {
    medium: string;
  };
}
function SearchResults() {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (searchQuery) {
      fetchSearchResults(searchQuery)
        .then((data) => {
          setSearchResults(data.map((result: any) => result.show));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [searchQuery]);

  return (
    <Container maxWidth="lg">
      <div style={{ marginTop: "147px" }}>
        <Typography
          variant="h4"
          style={{
            marginBottom: "41px",
            color: " darkcyan",
            textShadow: "2px 7px 3px black",
            fontSize: "40px",
            fontFamily: "fantasy",
          }}
        >
          Search Results
        </Typography>
        <Grid container spacing={6}>
          {searchResults.map((result) => (
            <Grid item key={result.id} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardMedia
                  component="img"
                  alt={result.name}
                  height="300"
                  image={result.image?.medium}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {result.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
}

export default SearchResults;
