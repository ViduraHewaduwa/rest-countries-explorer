import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';

// Create axios instance
export const api = axios.create({
  baseURL: BASE_URL,
});

export const getAllCountries = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/all`);
    return data;
  } catch (error) {
    console.error('Error fetching all countries:', error);
    throw error;
  }
};

export const getCountryByCode = async (code) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/alpha/${code}`);
    return data[0];
  } catch (error) {
    console.error('Error fetching country by code:', error);
    throw error;
  }
};

export const searchCountries = async (name) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/name/${name}`);
    return data;
  } catch (error) {
    console.error('Error searching countries:', error);
    return [];
  }
};

export const getCountriesByRegion = async (region) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/region/${region}`);
    return data;
  } catch (error) {
    console.error('Error fetching countries by region:', error);
    return [];
  }
};