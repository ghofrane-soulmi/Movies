<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Movie Details Page</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
      <ion-card class="movie-card">
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
              <!-- <template v-else>
                <ion-label><strong>Overview:</strong> {{ movie.overview }}</ion-label>
               
              </template> -->
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
            <!-- <ion-item v-else>
              <ion-label>Loading...</ion-label>
            </ion-item> -->
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
const movieId = route.params.id;



 
  const movie = ref([] as { id: number, title: string, release_date: string, overview: string, poster_path: string | null }[]);

  onMounted(async () => {
   
    movie.value = await fetchMovieDetails(movieId); // Use the fetchMovies function
  });

  const getMoviePosterUrl = (posterPath: string | null) => {
  return posterPath ? `${API_IMAGE_BASE_URL}/${posterPath}` : '';
};
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };




  
// control the overview of the film if it is too long to slice it adding a button read more and show less
const maxOverviewLength = 150; 

const expandedMovies = ref<Set<number>>(new Set());

  const isOverviewLong = (overview: string): boolean => {
  return overview && overview.length > maxOverviewLength;
};

const truncateOverview = (overview: string): string => {
  return overview ? overview.slice(0, maxOverviewLength) + '...' : '';
};

const toggleShowMore = (movieId: number, expand: boolean): void => {
  const set = expandedMovies.value;
  if (expand) {
    set.add(movieId);
  } else {
    set.delete(movieId);
  }
};

const isOverviewExpanded = (movieId: number): boolean => {
  return expandedMovies.value.has(movieId);
};
  </script>
  
  <style scoped>
  .movie-poster {
  width: auto; /* Set the image width to 100% of its container */
  height: auto; /* Let the height adjust proportionally based on the width */
  max-width: 100%; /* Ensure the image does not exceed the container width */
  max-height: 100%; /* Ensure the image does not exceed the container height */
}
  .movie-card {
    margin: 20px;
  }
  .movie-details {
    padding: 20px;
  }
  </style>
  