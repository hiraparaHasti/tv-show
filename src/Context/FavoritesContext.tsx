import React, { createContext, useContext, useEffect, useState } from "react";
import {
  setDataToLocalStorage,
  getDataFromLocalStorage,
} from "../utils/LocalStorageUtils";

interface FavoritesContextType {
  favorites: number[];
  addFavorite: (showId: number) => void;
  removeFavorite: (showId: number) => void;
}
interface UserData {
  email: string;
  favoriteShowIds: number[];
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const loggedInUserEmail = getDataFromLocalStorage("loginUser");

  const addFavorite = (showId: number) => {
    const updatedFavorites = [...favorites, showId];
    updateLocalStorage(updatedFavorites);
    setFavorites(updatedFavorites);
  };

  const removeFavorite = (showId: number) => {
    const updatedFavorites = favorites.filter((id) => id !== showId);
    setFavorites(updatedFavorites);
    updateLocalStorage(updatedFavorites);
  };

  const updateLocalStorage = (updatedFavorites: number[]) => {
    const storedData = getDataFromLocalStorage("loginData");
    if (loggedInUserEmail && storedData) {
      const otherUserData =
        storedData.filter(
          (user: UserData) => user.email !== loggedInUserEmail
        ) ?? [];
      const userData = storedData.find(
        (user: UserData) => user.email === loggedInUserEmail
      );

      if (userData) {
        userData.favoriteShowIds = updatedFavorites;
        setDataToLocalStorage("loginData", [...otherUserData, userData]);
      }
    }
  };

  useEffect(() => {
    const storedFavorites = getDataFromLocalStorage("loginData")?.find(
      (user: UserData) => user.email === loggedInUserEmail
    )?.favoriteShowIds;
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, [loggedInUserEmail]);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
