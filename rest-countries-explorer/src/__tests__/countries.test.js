import axios from 'axios';
import { getAllCountries, getCountryByCode, searchCountries, getCountriesByRegion } from '../api/countries';

jest.mock('axios');

const BASE_URL = 'https://restcountries.com/v3.1';

describe('Countries API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllCountries', () => {
    it('should fetch all countries successfully', async () => {
      const mockCountries = [
        { name: { common: 'Germany' }, capital: ['Berlin'] },
        { name: { common: 'France' }, capital: ['Paris'] }
      ];

      axios.get.mockResolvedValueOnce({ data: mockCountries });

      const result = await getAllCountries();

      expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/all`);
      expect(result).toEqual(mockCountries);
    });

    it('should handle error when fetching all countries', async () => {
      const error = new Error('Network error');
      axios.get.mockRejectedValueOnce(error);

      await expect(getAllCountries()).rejects.toThrow('Network error');
      expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/all`);
    });
  });

  describe('getCountryByCode', () => {
    it('should fetch country by code successfully', async () => {
      const mockCountry = { name: { common: 'Germany' }, capital: ['Berlin'] };
      axios.get.mockResolvedValueOnce({ data: [mockCountry] });

      const result = await getCountryByCode('DEU');

      expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/alpha/DEU`);
      expect(result).toEqual(mockCountry);
    });

    it('should handle error when fetching country by code', async () => {
      const error = new Error('Country not found');
      axios.get.mockRejectedValueOnce(error);

      await expect(getCountryByCode('XXX')).rejects.toThrow('Country not found');
      expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/alpha/XXX`);
    });
  });

  describe('searchCountries', () => {
    it('should search countries by name successfully', async () => {
      const mockCountries = [
        { name: { common: 'Germany' }, capital: ['Berlin'] }
      ];

      axios.get.mockResolvedValueOnce({ data: mockCountries });

      const result = await searchCountries('german');

      expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/name/german`);
      expect(result).toEqual(mockCountries);
    });

    it('should return empty array when search fails', async () => {
      axios.get.mockRejectedValueOnce(new Error('Not found'));

      const result = await searchCountries('nonexistent');

      expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/name/nonexistent`);
      expect(result).toEqual([]);
    });
  });

  describe('getCountriesByRegion', () => {
    it('should fetch countries by region successfully', async () => {
      const mockCountries = [
        { name: { common: 'Germany' }, capital: ['Berlin'] },
        { name: { common: 'France' }, capital: ['Paris'] }
      ];

      axios.get.mockResolvedValueOnce({ data: mockCountries });

      const result = await getCountriesByRegion('europe');

      expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/region/europe`);
      expect(result).toEqual(mockCountries);
    });

    it('should return empty array when region fetch fails', async () => {
      axios.get.mockRejectedValueOnce(new Error('Region not found'));

      const result = await getCountriesByRegion('invalid');

      expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/region/invalid`);
      expect(result).toEqual([]);
    });
  });
});