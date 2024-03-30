import axios from 'axios';


// Access API_KEY and API_BASE_URL
const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;




// this function is about to fetch movies in the home page from the consumed api 
export async function fetchMovies() {
    try {
      console.log(import.meta.env.VITE_API_KEY);
      console.log(import.meta.env.VITE_API_BASE_URL);


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
  //fetchMovieDetails is about fetching the details of the fils clicked by the user 
  export async function fetchMovieDetails(movieId:number) {
    try {
      const response = await axios.get(`${API_BASE_URL}/movie/${movieId}`, {
        params: {
          api_key: API_KEY,
          language: 'en-US'
        }
      });
      return response.data; 
    } catch (error) {
      console.error('Error fetching movie details:', error);
      return null; 
    }
  }
  // search movies is about to search the movies by the key words writed by the user
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
  