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
import Auth from '@/components/pages/Auth';


// views for Auth layout

import Login from '@/components/views/Login';
import Register from '@/components/views/Register';

// views without layouts

import Profile from '@/components/views/Profile';
import Newentry from '@/components/views/Newentry';
import Report from '@/components/views/Report';
import Dashboard from '@/components/views/Dashboard';
import Userspace from '@/components/pages/UserSpace';
import Logout from '@/components/views/Logout'
// routes

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: Userspace,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/dashboard',
        component: Dashboard,
      },
      {
        path: '/newentry',
        component: Newentry,
      },
      {
        path: '/report',
        component: Report,
      },
      {
        path: '/profile',
        component: Profile,
      }
    ]
  },
  {
    path: '/auth',
    redirect: '/login',
    component: Auth,
    children: [
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/register',
        component: Register,
      }
    ],
  },
  {
    path: '/logout',
    component: Logout,
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