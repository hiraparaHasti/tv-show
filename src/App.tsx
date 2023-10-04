import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Details from "./components/Details/Details";
import SearchResults from "./components/Search/SearchResults";
import Navbar from "./components/Navbar/Navbar";
import User from "./components/User/User";
import Favorite from "./components/Favorite/Favorite";
import { FavoritesProvider } from "./Context/FavoritesContext";
import { SortFilterProvider } from "./Context/SortFilterContext";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <SortFilterProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/Home" element={<Home />}></Route>
            <Route path="/Details/:showId" element={<Details />} />
            <Route path="/search-results" element={<SearchResults />}></Route>
            <Route path="/user" element={<User />}></Route>
            <Route path="/favorite" element={<Favorite />}></Route>
          </Routes>
        </SortFilterProvider>
      </FavoritesProvider>
    </BrowserRouter>
  );
};

export default App;
