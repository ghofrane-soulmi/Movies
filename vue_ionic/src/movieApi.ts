import axios, { AxiosResponse } from 'axios';

// Define the API key
const API_KEY: string = 'ec9aa3d3f23d7f5416f52c10f7ffa2ac';
const API_BASE_URL: string = 'https://api.themoviedb.org/3';


export async function fetchMovies() {
    try {
      const response = await axios.get(`${API_BASE_URL}/movie/popular`, {
        params: {
          api_key: API_KEY,
          language: 'en-US',
          page: 1
        }
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
  }
  export async function fetchMovieDetails(movieId:number) {
    try {
      const response = await axios.get(`${API_BASE_URL}/movie/${movieId}`, {
        params: {
          api_key: API_KEY,
          language: 'en-US'
        }
      });
      return response.data; // Assuming you want to return the entire response data
    } catch (error) {
      console.error('Error fetching movie details:', error);
      return null; // Return null in case of error
    }
  }
  export async function searchMovies(query:string) {
    try {
      const response = await axios.get(`${API_BASE_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          language: 'en-US',
          query: query,
          page: 1
        }
      });
      return response.data.results;
    } catch (error) {
      console.error('Error searching movies:', error);
      return [];
    }
  }
  
  