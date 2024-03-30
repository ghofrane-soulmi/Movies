<template>
  <ion-page>
    <ion-content>
      <!-- Search input field -->
      <ion-searchbar v-model="searchQuery"></ion-searchbar>
      
      <!-- Display movie list only if searchQuery is not empty -->
      <ion-list v-if="searchQuery">
        <ion-item v-for="movie in filteredMovies" :key="movie.id" @click="viewMovieDetails(movie.id)">
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
import axios from 'axios';
import { ref, computed, onMounted, watch } from 'vue';
import router from '../../router'
import { API_KEY, API_BASE_URL, API_IMAGE_BASE_URL } from '../../apiConfig'; // Adjust the path as needed

import {IonLabel,IonCardSubtitle, IonImg,IonPage, IonContent, IonSearchbar, IonList, IonItem, IonThumbnail, IonCard, IonCardHeader, IonCardTitle } from '@ionic/vue';


const searchQuery = ref('');
const movies = ref([] as { id: number, title: string, release_date: string, overview: string, poster_path: string | null }[]);

const fetchMovies = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    movies.value = response.data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};

const viewMovieDetails = (id: number) => {
  router.push({ path: `/movie/${id}` });
};

const getMoviePosterUrl = (posterPath: string | null) => {
  return posterPath ? `${API_IMAGE_BASE_URL}/${posterPath}` : '';
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const getReleaseYear = (dateString: string) => {
  return new Date(dateString).getFullYear();
};

onMounted(() => {
  fetchMovies();
});

const filteredMovies = computed(() => {
  return movies.value.filter(movie => {
    console.log ("moviess" ,movies.value);
       return movie.title.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});

watch(searchQuery, (newValue) => {
  console.log('Search query changed. New value:', newValue);
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