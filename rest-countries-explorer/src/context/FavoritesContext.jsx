import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (country) => {
    setFavorites((prev) => {
      if (!prev.some((fav) => fav.cca3 === country.cca3)) {
        return [...prev, country];
      }
      return prev;
    });
  };

  const removeFavorite = (countryCode) => {
    setFavorites((prev) => prev.filter((country) => country.cca3 !== countryCode));
  };

  const isFavorite = (countryCode) => {
    return favorites.some((country) => country.cca3 === countryCode);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};