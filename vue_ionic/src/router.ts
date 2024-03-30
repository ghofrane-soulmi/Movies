import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabRootView from './views/Tabs/TabsRoot.vue';
//import MovieDetailsPage from '../views/Tabs/MovieDetailsPage.vue';
const routes: Array<RouteRecordRaw> = [

  {
    path: '/',
    component: TabRootView,
    children: [
      {
        path: '',
        redirect: '/home',
      },
   
      {
        path: 'search',
        component: () => import('./views/Tabs/SearchPage.vue'),
      },
      {
        path: 'home',
        component: () => import('./views/Tabs/HomePage.vue'),
      },
      {
        path: '/movie/:id',
        component: () => import('./views/Tabs/MovieDetailsPage.vue'),
      }
     
    ],
  },
];

const router = createRouter({
  // Use: createWebHistory(process.env.BASE_URL) in your app
  history: createWebHistory(),
  routes,
});

export default router;