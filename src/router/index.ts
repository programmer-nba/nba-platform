import { UserService } from '@/services/user';
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue')
  },
  {
    path: '/pin',
    name: 'Pin',
    component: () => import('@/components/Pin.vue')
  },
  {
    path: '/createpin',
    name: 'CreatePin',
    component: () => import('@/components/CreatePin.vue')
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
        path: 'artwork',
        name: 'ArtWork',
        component: () => import('@/views/ArtWorkPage.vue'),
        children: [
          {
            path: '',
            name: 'ArtWorkHome',
            component: () => import('@/views/artwork/HomeArtWork.vue'),
          },
          {
            path: '/artwork/:id',
            name: 'Detailartwork',
            component: () => import('@/views/artwork/DetialArtWork.vue')
          },
        ]
      },
      {
        path: 'services',
        name: 'Services',
        component: () => import('@/views/CounterServicePage.vue'),
        children: [
          {
            path: '',
            name: 'ServicesHome',
            component: () => import('@/views/counterservices/HomeView.vue'),
          },
          {
            path: '/detailservices/:id',
            name: 'DetailServices',
            component: () => import('@/views/counterservices/DetailServices.vue')
          },
        ]
      },
      {
        path: 'topups',
        name: 'Topups',
        component: () => import('@/views/TopupView.vue'),
        children: [
          {
            path: '',
            name: 'TopupHome',
            component: () => import('@/views/mobiletopup/HomeTopupView.vue')
          },
          {
            path: '/detailtopup/:id',
            name: 'DetailTopup',
            component: () => import('@/views/mobiletopup/DetailTopup.vue'),
            props: true,
          },
        ]
      },
      {
        path: '/test',
        name: 'Test',
        component: () => import('@/views/Test.vue')
      },
      {
        path: '/test2',
        name: 'Test2',
        component: () => import('@/views/Test2.vue')
      },
      {
        path: '/test3',
        name: 'Test3',
        component: () => import('@/views/Test3.vue')
      },
      {
        path: 'cardtopup',
        name: 'Cardtopup',
        component: () => import('@/views/CardTopupPage.vue'),
        children: [
          {
            path: '',
            name: 'CardTopupHome',
            component: () => import('@/views/cardtopup/HomeCardTopup.vue')
          },
          {
            path: '/detailcardtopup/:id',
            name: 'DetailCardTopup',
            component: () => import('@/views/cardtopup/DetailCardTopup.vue'),
            props: true,
          },
        ]
      },
      {
        path: 'mobliebill',
        name: 'MoblieBill',
        component: () => import('@/views/MoblieBillPage.vue'),
        children: [
          {
            path: '',
            name: 'MoblieBillHome',
            component: () => import('@/views/mobliebill/MoblieBillView.vue')
          },
          {
            path: '/detailmobliebill/:id',
            name: 'DetailMoblieBill',
            component: () => import('@/views/mobliebill/DetailMoblieBill.vue'),
            props: true,
          },
        ]
      },
      {
        path: 'proserm',
        name: 'Proserm',
        component: () => import('@/views/ProsermPage.vue'),
        children: [
          {
            path: '',
            name: 'ProsermHome',
            component: () => import('@/views/prosermservices/HomeProserm.vue')
          },
        ]
      },
      {
        path: 'detailproserm',
        name: 'Detailproserm',
        component: () => import('@/views/prosermservices/HomeProserm.vue'),
        children: [
          {
            path: '',
            name: 'ProsermDetail',
            component: () => import('@/views/prosermservices/DetailProserm.vue')
          },
        ]
      },
      {
        path: 'keyservice',
        name: 'Keyservice',
        component: () => import('@/views/KeyservicePage.vue'),
        children: [
          {
            path: '',
            name: 'KeyserviceHome',
            component: () => import('@/views/keyservice/HomeKeyservice.vue')
          }
        ]
      },
      {
        path: 'wallet',
        name: 'Wallet',
        component: () => import('@/views/WalletPage.vue'),
        children: [
          {
            path: '',
            name: 'WalletServiceHome',
            component: () => import('@/views/wallet/HomeWallet.vue')
          },
          {
            path: '/detailwallet/:id',
            name: 'DetailWalletHome',
            component: () => import('@/views/wallet/DetailWallet.vue')
          },
        ]
      },
      {
        path: 'cash',
        name: 'Cash',
        component: () => import('@/views/CashPage.vue'),
        children: [
          {
            path: '',
            name: 'CashServiceHome',
            component: () => import('@/views/cash/HomeCash.vue')
          },
        ]
      },
      {
        path: 'nbaservices',
        name: 'Nbaservices',
        component: () => import('@/views/NBAservicePage.vue'),
        children: [
          {
            path: '',
            name: 'NbaservicesHome',
            component: () => import('@/views/nbaservices/HomeNBAserviceView.vue')
          },
          {
            path: '/nbaservices/:id',
            name: 'DetailNBAservices',
            component: () => import('@/views/nbaservices/DetailNBAservices.vue')
          }
        ]
      },
      {
        path: 'accountservice',
        name: 'AccountService',
        component: () => import('@/views/AccountServicePage.vue'),
        children: [
          {
            path: '',
            name: 'AccountServiceHome',
            component: () => import('@/views/accountservice/HomeAccountService.vue')
          },
          {
            path: '/detailaccountservice/:id',
            name: 'DetailAccountService',
            component: () => import('@/views/accountservice/DetailAccountService.vue')
          }
        ]
      },
      {
        path: 'facebookservice',
        name: 'FaceBookService',
        component: () => import('@/views/FacebookService.vue'),
        children: [
          {
            path: '',
            name: 'FaceBookServiceHome',
            component: () => import('@/views/facebookservice/HomeFacebookService.vue')
          },
        ]
      },
      {
        path: 'websiteservice',
        name: 'WebSiteService',
        component: () => import('@/views/WebSiteService.vue'),
        children: [
          {
            path: '',
            name: 'WebSiteServiceHome',
            component: () => import('@/views/website/HomeWebSiteService.vue')
          },
        ]
      },
      {
        path: 'history',
        name: 'History',
        component: () => import('@/views/HistoryPage.vue'),
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/UserPage.vue'),
      },
      {
        path: '/user/genaral',
        name: 'GenaralViews',
        component: () => import('@/views/profile/GenaralView.vue')
      },
      {
        path: '/user/withdraw/history',
        name: 'HistoryCimmisionViews',
        component: () => import('@/views/profile/HistoryCommisions.vue')
      },
      {
        path: '/user/security',
        name: 'SecuritylViews',
        component: () => import('@/views/profile/SecurityView.vue')
      },
      {
        path: '/user/changpassword',
        name: 'ChangPassword',
        component: () => import('@/views/profile/ChangPassword.vue')
      },
      {
        path: '/wallet/topupwallet',
        name: 'TopupWallet',
        component: () => import('@/views/topup/TopupWallet.vue')
      },
      {
        path: '/wallet/historywallet',
        name: 'HistoryWallet',
        component: () => import('@/views/topup/HistoryWallet.vue')
      },
      {
        path: '/withdrawcommission',
        name: 'WithdrawCommission',
        component: () => import('@/views/WithdrawCommission.vue')
      },
      {
        path: '/insurancetaxact',
        name:'Insurancetaxact',
        component: () => import('@/views/insurancetaxact.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeResolve(async (to, from, next) => {

  const auth = await Authorize();

  if (to.name !== 'Login' && !auth) {
    next({ name: 'Login' })
  } else if (auth) {
    next();
  } else {
    next({ name: 'Login' })
  }
})

export default router

const Authorize = async () => {
  console.log('authrize process');
  let authorize = false;
  const userservice = new UserService();
  await userservice.GetMe().then((user: any) => {
    if (user) {
      authorize = true;

    } else {
      authorize = false
    }
  })
  return authorize;
}