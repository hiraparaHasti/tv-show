import axios from "axios";

const API_BASE_URL = "https://api.tvmaze.com";

export const fetchSearchResults = (query: string) => {
  const url = `${API_BASE_URL}/search/shows?q=${query}`;
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching search results:", error);
      throw error;
    });
};

export const fetchShowDetails = (showId: string) => {
  const url = `${API_BASE_URL}/shows/${showId}`;
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching show details:", error);
      throw error;
    });
};

export const fetchAllShows = () => {
  const url = `${API_BASE_URL}/shows`;
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching all shows:", error);
      throw error;
    });
};
