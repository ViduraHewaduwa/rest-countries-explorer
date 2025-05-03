import { useState, useEffect } from 'react';
import { getAllCountries, searchCountries, getCountriesByRegion } from '../api/countries';

export const useCountries = (initialQuery = '', initialRegion = '') => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [region, setRegion] = useState(initialRegion);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let data;
        
        if (searchQuery) {
          data = await searchCountries(searchQuery);
        } else if (region) {
          data = await getCountriesByRegion(region);
        } else {
          data = await getAllCountries();
        }
        
        setCountries(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchData, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, region]);

  return {
    countries,
    loading,
    error,
    searchQuery,
    region,
    setSearchQuery,
    setRegion,
  };
};