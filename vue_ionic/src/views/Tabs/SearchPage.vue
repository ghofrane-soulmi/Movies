<style scoped>

</style>
<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Search Page</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <div class="example-content">Listen now content</div>
      </ion-content>
       <!-- <ion-card-content>
            <div v-if="isOverviewLong(movie.overview)">
              <template v-if="!isOverviewExpanded(movie.id)">
                {{ truncateOverview(movie.overview) }}
                <a href="#" @click.prevent="toggleShowMore(movie.id, true)">
                  Read more
                </a>
              </template>
              <template v-else>
                {{ movie.overview }}
                <a href="#" @click.prevent="toggleShowMore(movie.id, false)">
                  Show less
                </a>
              </template>
            </div>
            <div v-else>
              {{ movie.overview }}
            </div>
          </ion-card-content> -->
    </ion-page>
  </template>

<script setup lang="ts">
  import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage } from '@ionic/vue';

// control the overview of the film if it is too long to slice it adding a button read more and show less
// const maxOverviewLength = 50; 

// const expandedMovies = ref<Set<number>>(new Set());

// const isOverviewLong = (overview: string): boolean => {
//   return overview.length > maxOverviewLength;
// };

// const truncateOverview = (overview: string): string => {
//   return overview.slice(0, maxOverviewLength) + '...';
// };

// const toggleShowMore = (movieId: number, expand: boolean): void => {
//   const set = expandedMovies.value;
//   if (expand) {
//     set.add(movieId);
//   } else {
//     set.delete(movieId);
//   }
// };

// const isOverviewExpanded = (movieId: number): boolean => {
//   return expandedMovies.value.has(movieId);
// };


</script>