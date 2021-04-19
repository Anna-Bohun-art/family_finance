import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
// styles

import '@fortawesome/fontawesome-free/css/all.min.css';
import '@/assets/styles/tailwind.css';

// mouting point for the whole app

import App from '@/App';

// layouts

// import Admin from '@/layouts/Admin.vue';
import Auth from '@/components/layouts/Auth';


// views for Auth layout

import Login from '@/components/views/auth/Login';
import Register from '@/components/views/auth/Register';

// views without layouts

import Profile from '@/components/views/auth/Profile';
import Index from '@/components/views/auth/Index';
import Newproducts from '@/components/views/auth/Newproducts';
import Report from '@/components/views/auth/Report';
import Confirmation from '@/components/views/auth/Confirmation';

// routes

const routes = [
  {
    path: '/user',
    redirect: '/user/',
    component: Auth,
    children: [
      {
        path: '/user/newProducts',
        component: Newproducts,
      },
      {
        path: '/user/report',
        component: Report,
      },
    ],
  },
  {
    path: '/',
    component: Index,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/auth',
    component: Auth,
    children: [
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/register',
        component: Register,
      },
      {
        path: '/confirm',
        component: Confirmation,
      }
    ],

  },
  {
  path: '/logout',
  component: Login,
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem('jwt') == null) {
          next({
              path: '/login',
              params: { nextUrl: to.fullPath }
          })
      } else {
          let user = JSON.parse(localStorage.getItem('user'))
          if(to.matched.some(record => record.meta.is_admin)) {
              if(user.is_admin == 1){
                  next()
              }
              else{
                  next({ name: 'userboard'})
              }
          }else {
              next()
          }
      }
  } else if(to.matched.some(record => record.meta.guest)) {
      if(localStorage.getItem('jwt') == null){
        next()
      }
      else{
        next({ name: 'userboard'})
      }
  }else {
    next()
  }
})

createApp(App).use(router).use(VueAxios, axios).mount('#app');