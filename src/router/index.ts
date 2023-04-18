import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LoginPage from '../views/auth/Login.vue';
import LoginPageOTP from '../views/auth/LoginOTP.vue';
import SignupPage from '../views/auth/Signup.vue';
import ForgotPasswordPage from '../views/auth/ForgotPassword.vue';
import DashboardPage from '../views/dashboard/Dashboard.vue';
import AccountInfoPage from '../views/Account/account-info.vue';
import VouchersPage from '../views/Vouchers/vouchers.vue';
import CaptivePortalPage from '../views/captive/captive-portal.vue';
import FileMediaPage from '../views/File/file-media.vue';
import SupportTicketsPage from '../views/support/support-tickets.vue';
import BillingsPage from '../views/billings/billings.vue';
import HomePage from '../views/home/home.vue';
import FeedbackPage from '../views/feedback/feedback.vue';
import store from "../store";

const title = 'Ared SME';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: LoginPage,
    meta: {
      title: `${title} - Login`,
    },
    
  },
  {
    path: '/otp',
    name: 'otp',
    component: LoginPageOTP,
    meta: {
      title: `${title} - OTP`,
    },
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupPage,
    meta: {
      title: `${title} - SIGNUP`,
    },
    
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPasswordPage,
    meta: {
      title: `${title} - SIGNUP`
     
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: HomePage,
    meta: {
      title: `${title} - Dashboard`,
      requireAuth:true
    },
  },
  {
    path: '/routers',
    name: 'routers',
    component: DashboardPage,
    meta: {
      title: `${title} - Routers`,
      requireAuth:true
    },
  },
  {
    path: '/account-info',
    name: 'account-info',
    component: AccountInfoPage,
    meta: {
      title: `${title} - AccountInfo`,
      requireAuth:true
    },
  },
  {
    path: '/vouchers',
    name: 'vouchers',
    component: VouchersPage,
    meta: {
      title: `${title} - Vouchers`,
      requireAuth:true
    },
  },
  {
    path: '/captive-portal',
    name: 'captive-portal',
    component: CaptivePortalPage,
    meta: {
      title: `${title} - CaptivePortal`,
      requireAuth:true
    },
  },
  {
    path: '/file-media',
    name: 'file-media',
    component: FileMediaPage,
    meta: {
      title: `${title} - FileMedia`,
      requireAuth:true
    },
  },
  {
    path: '/support-tickets',
    name: 'support-tickets',
    component: SupportTicketsPage,
    meta: {
      title: `${title} - SupportTickets`,
      requireAuth:true
    },
  },
  {
    path: '/billings',
    name: 'billings',
    component: BillingsPage,
    meta: {
      title: `${title} - Billings`,
      requireAuth:true
    },
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: FeedbackPage,
    meta: {
      title: `${title} - Feedback`,
      requireAuth:true
    },
  },
  
];



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const titleFromParams = to.params?.pageTitle;
  const isAuthenticated = localStorage.getItem('access_token');
  if (titleFromParams) {
    document.title = `${titleFromParams} - ${document.title}`;
  } else {
    document.title = (to.meta?.title as string) ?? title;
  }
  if (to.matched.some(record => record.meta.requireAuth) && !isAuthenticated) {
    next('/')
  } else if ((to.path === '/' || to.path === '/signup'|| to.path === '/forgot-password') && isAuthenticated) {
    next('/dashboard') 
  } 
  else {
    next() // 
  }
  next();
});

export default router;
