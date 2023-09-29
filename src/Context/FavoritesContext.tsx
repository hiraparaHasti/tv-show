// FavoritesContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface FavoritesContextType {
  favorites: number[];
  addFavorite: (showId: number) => void;
  removeFavorite: (showId: number) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);
// console.log('FavoritesContext', FavoritesContext);
export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<number[]>([]);
    // console.log('favorites', favorites);
  const addFavorite = (showId: number) => {
    if (!favorites.includes(showId)) {
      setFavorites([...favorites, showId]);
    }
  };

  const removeFavorite = (showId: number) => {
    setFavorites(favorites.filter((id) => id !== showId));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    // console.log('context', context);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
