<template>
  <ion-page>
    <ion-content>
      <!-- Search input field -->
      <ion-searchbar v-model="searchQuery"></ion-searchbar>
      
      <!-- Display movie list only if searchQuery is not empty -->
      <ion-list v-if="searchQuery">
  <div v-if="filteredMovies.length === 0">
    No movies found.
  </div>
  <ion-item v-else v-for="movie in filteredMovies" :key="movie.id" @click="viewMovieDetails(movie.id)">
    <ion-thumbnail slot="start">
      <ion-img :src="getMoviePosterUrl(movie.poster_path)" :alt="movie.title"></ion-img>
    </ion-thumbnail>
          <ion-label>
            <h5>{{ movie.title }}</h5>
            <p>Release Year: {{ getReleaseYear(movie.release_date) }}</p>
            <!-- Add more movie information here -->
          </ion-label>
        </ion-item>
      </ion-list>

      <!-- Cards container -->
      <div class="cards-container" v-else>
        <ion-card v-for="movie in movies" :key="movie.id" class="movie-card"  @click="viewMovieDetails(movie.id)">
          <img :src="getMoviePosterUrl(movie.poster_path)" :alt="movie.title" />
          <ion-card-header>
            <ion-card-title>{{ movie.title }}</ion-card-title>
            <ion-card-subtitle>{{ formatDate(movie.release_date) }}</ion-card-subtitle>
          </ion-card-header>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import router from '../../router';
import { fetchMovies, searchMovies } from '../../movieApi';
import { IonLabel, IonCardSubtitle, IonImg, IonPage, IonContent, IonSearchbar, IonList, IonItem, IonThumbnail, IonCard, IonCardHeader, IonCardTitle } from '@ionic/vue';

const API_IMAGE_BASE_URL: string = 'https://image.tmdb.org/t/p/w500';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string | null;
}

const searchQuery = ref('');
const movies = ref<Movie[]>([]);
const filteredMovies = ref<Movie[]>([]); 

const viewMovieDetails = (id: number) => {
  router.push({ path: `/movie/${id}` });
};

// get the image path for the images src
const getMoviePosterUrl = (posterPath: string | null) => {
  return posterPath ? `${API_IMAGE_BASE_URL}/${posterPath}` : '';
};

// format date for the list of movies 
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

// get the year the be displayed in the result of films searched 
const getReleaseYear = (dateString: string) => {
  return new Date(dateString).getFullYear();
};

// filter the movie with title and release date 


watch(searchQuery, async (newValue) => {
  const trimmedQuery = newValue.trim();
  if (trimmedQuery) {
    filteredMovies.value = await searchMovies(trimmedQuery);
  } else {
    filteredMovies.value = movies.value;
  }
});
onMounted(async () => {
  // Fetch movies when the component is mounted
  movies.value = await fetchMovies();
});
</script>

<style scoped>
.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px;
}

.movie-card {
  width: calc(50% - 20px);
  margin: 10px;
  max-width: 300px;
}

.movie-card img {
  width: 100%;
  height: auto;
}
</style>
