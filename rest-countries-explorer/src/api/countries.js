import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';

const api = axios.create({
  baseURL: BASE_URL,
});

export const getAllCountries = async () => {
  try {
    const { data } = await api.get('/all');
    return data;
  } catch (error) {
    console.error('Error fetching all countries:', error);
    throw error;
  }
};

export const getCountryByCode = async (code) => {
  try {
    const { data } = await api.get(`/alpha/${code}`);
    return data[0];
  } catch (error) {
    console.error('Error fetching country by code:', error);
    throw error;
  }
};

export const searchCountries = async (name) => {
  try {
    const { data } = await api.get(`/name/${name}`);
    return data;
  } catch (error) {
    console.error('Error searching countries:', error);
    return [];
  }
};

export const getCountriesByRegion = async (region) => {
  try {
    const { data } = await api.get(`/region/${region}`);
    return data;
  } catch (error) {
    console.error('Error fetching countries by region:', error);
    return [];
  }
};