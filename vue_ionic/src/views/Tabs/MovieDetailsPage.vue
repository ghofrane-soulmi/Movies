<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Movie Details Page</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
      <ion-card class="movie-card"  v-if="movie">
        <ion-img :src="getMoviePosterUrl(movie.poster_path)" :alt="movie.title" class="movie-poster"></ion-img>
        <ion-card-content>
          <ion-list lines="none">
            <ion-item v-if="movie">
              <ion-label><strong>Title:</strong> {{ movie.title }}</ion-label>
            </ion-item>
            <ion-item v-if="movie">
              <ion-label><strong>Release Date:</strong> {{ formatDate(movie.release_date) }}</ion-label>
            </ion-item>
            <ion-item v-if="movie">
              <template v-if="isOverviewLong(movie.overview) && !isOverviewExpanded(movie.id)">
                <ion-label><strong>Overview:</strong> {{ truncateOverview(movie.overview) }}</ion-label>
                <a href="#" @click.prevent="toggleShowMore(movie.id, true)">
                  Read more
                </a>
              </template>
              <template v-else>
              <ion-label><strong>Overview:</strong> {{ movie.overview }}</ion-label>
              <a href="#" @click.prevent="toggleShowMore(movie.id, false)">
                Show less 
              </a>
            </template>
    

          
            </ion-item>

            <ion-item v-if="movie && movie.genres">
              <ion-label><strong>Genres:</strong> 
                <span v-for="(genre, index) in movie.genres" :key="index">
                  
                  {{ genre.name }}
                  {{ index !== movie.genres.length - 1 ? ', ' : '' }}</span>
              </ion-label>
            </ion-item>
            <ion-item v-if="movie && movie.original_language">
              <ion-label><strong>Original Language:</strong> 
          
                  
                  {{ movie.original_language }}
               
              </ion-label>
            </ion-item>
            <ion-item v-if="movie && movie.vote_average">
              <ion-label><strong>Vote Average :</strong> 
          
                  
                  {{ movie.vote_average }}
               
              </ion-label>
            </ion-item>
            <ion-item v-if="movie && movie.vote_count">
              <ion-label><strong>Vote Count :</strong> 
          
                  
                  {{ movie.vote_count }}
               
              </ion-label>
            </ion-item>
            <ion-item v-if="movie && movie.adult">
              <ion-label><strong>Adult :</strong> 
          
                  
                  {{ movie.adult }}
               
              </ion-label>
            </ion-item>
          
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import {useRoute} from 'vue-router'
  import { fetchMovieDetails } from '../../movieApi'; 
  const API_IMAGE_BASE_URL: string = 'https://image.tmdb.org/t/p/w500';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonImg, IonCardContent, IonList, IonItem, IonLabel } from '@ionic/vue';
  const route = useRoute();



  interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string | null;
  genres: { name: string }[];
  original_language: string;
  vote_average: number;
  vote_count: number;
  adult: boolean;
}

const movie = ref<Movie | null>(null); 

const movieId = Number(route.params.id); // Convert string to number

onMounted(async () => {
  movie.value = await fetchMovieDetails(movieId);
});

// get the image path for the images src
  const getMoviePosterUrl = (posterPath: string | null) => {
  return posterPath ? `${API_IMAGE_BASE_URL}/${posterPath}` : '';
};

// format date for the list of movies 
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };


// control the overview of the film if it is too long to slice it adding a button read more and show less
const maxOverviewLength = 50; 

const expandedMovies = ref<Set<number>>(new Set());

// function to check if the overview is longer than the maximum length
  const isOverviewLong = (overview: string): boolean => {
  return  typeof overview && overview.length > maxOverviewLength;
};

// function to truncate movie overview if it exceeds the maximum length
const truncateOverview = (overview: string): string => {
  return overview ? overview.slice(0, maxOverviewLength) + '...' : '';
};

// function to toggle the display of full movie overview
const toggleShowMore = (movieId: number, expand: boolean): void => {
  const set = expandedMovies.value;
  if (expand) {
    set.add(movieId);
  } else {
    set.delete(movieId);
  }
};

// function to check if the overview for a movie is expanded
const isOverviewExpanded = (movieId: number): boolean => {
  return expandedMovies.value.has(movieId);
};
  </script>
  
  <style scoped>
  .movie-poster {
  width: auto; 
  height: auto;
  max-width: 100%;
  max-height: 100%; 
}
  .movie-card {
    margin: 20px;
  }
  .movie-details {
    padding: 20px;
  }
  </style>
  