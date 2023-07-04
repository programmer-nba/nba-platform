import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';
import { UserService } from '@/services/user';
import { Component } from 'ionicons/dist/types/stencil-public-runtime';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path:'/login',
    name: 'Login',
    component: ()=> import('@/views/LoginPage.vue')
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/home'
      },
      {
        path: 'home',
        component: () => import('@/views/HomePage.vue')
      },
      {
        path:'services',
        name:'Services',
        component: ()=> import('@/views/CounterServicePage.vue'),
        children:[
          {
            path:'',
            name:'ServicesHome',
            component: ()=> import('@/views/counterservices/HomeView.vue'),
          }
        ]
      },
      {
        path:'topups',
        name:'Topups',
        component: () => import('@/views/TopupView.vue'),
        children:[
          {
            path:'',
            name:'TopupHome',
            component: () => import('@/views/topup/HomeTopupView.vue')
          }
        ]
      },
      {
        path:'cardtopup',
        name:'Cardtopup',
        component: () => import('@/views/CardTopupPage.vue'),
        children:[
          {
            path:'',
            name:'CardTopupHome',
            component: () => import('@/views/cardtopup/HomeCardTopup.vue')
          }
        ]
      },
      {
        path:'proserm',
        name:'Proserm',
        component: () => import('@/views/ProsermPage.vue'),
        children:[
          {
            path:'',
            name:'ProsermHome',
            component: () => import('@/views/prosermservices/HomeProserm.vue')
          },
        ]
      },
      {
        path:'detailproserm',
        name:'Detailproserm',
        component: () => import('@/views/prosermservices/HomeProserm.vue'),
        children:[
          {
            path:'',
            name:'ProsermDetail',
            component: () => import('@/views/prosermservices/DetailProserm.vue')
          },
        ]
      },
      {
        path:'keyservice',
        name:'Keyservice',
        component: () => import('@/views/KeyservicePage.vue'),
        children:[
          {
            path:'',
            name:'KeyserviceHome',
            component: () => import('@/views/keyservice/HomeKeyservice.vue')
          }
        ]
      },
      {
        path:'wallet',
        name:'Wallet',
        component: () => import('@/views/WalletPage.vue'),
        children:[
          {
            path:'',
            name:'WalletServiceHome',
            component: () => import('@/views/prosermservices/DetailProserm.vue')
          },
        ]
      },
      {
        path:'cash',
        name:'Cash',
        component: () => import('@/views/CashPage.vue'),
        children:[
          {
            path:'',
            name:'CashServiceHome',
            component: () => import('@/views/cash/HomeCash.vue')
          },
        ]
      },
      {
        path:'nbaservices',
        name:'Nbaservices',
        component: () => import('@/views/NBAservicePage.vue'),
        children:[
          {
            path:'',
            name:'NbaservicesHome',
            component: () => import('@/views/nbaservices/HomeNbaserviceView.vue')
        }
        ]
      },
      {
        path: 'history',
        component: () => import('@/views/HistoryPage.vue')
      },
      {
        path: 'user',
        component: () => import('@/views/UserPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeResolve(async (to,from,next)=>{

  const auth = await Authorize();

  if(to.name !== 'Login' && !auth){
    next({name: 'Login'})
  }else if(auth){
    next();
  }else{
    next({name:'Login'})
  }
})

export default router

const Authorize = async () =>{
  console.log('authrize process');
  let authorize=false;
  const userservice = new UserService();
  await userservice.GetMe().then((user:any)=>{
    if(user){
      authorize=true;
   
    }else{
      authorize=false
    }
  })
  return authorize;
}