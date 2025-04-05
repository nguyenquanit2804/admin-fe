import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";

// Styles
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";

// Mounting point for the whole app
import App from "@/App.vue";

// Layouts
import Admin from "@/layouts/Admin.vue";
import Auth from "@/layouts/Auth.vue";

// Views for Admin layout
import Dashboard from "@/views/admin/Dashboard.vue";
import Search from "@/views/admin/Search.vue";
import CreatePartner from "@/views/admin/CreatePartner.vue";

// Views for Auth layout
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

// Views without layouts
// Services
import authService from '@/services/api-admin-service';

// Check token
const token = localStorage.getItem('token');
const tokenExpiry = localStorage.getItem('tokenExpiry');

if (!token || (tokenExpiry && Date.now() > tokenExpiry)) {
  // Token không tồn tại hoặc đã hết hạn
  if (window.location.pathname !== '/auth/login') {
    authService.logout();
  }
}

// Routes
const routes = [
  {
    path: "/admin",
    redirect: "/admin/dashboard",
    component: Admin,
    children: [
      {
        path: "/admin/dashboard",
        component: Dashboard,
      },
      {
        path: "/admin/search",
        component: Search,
      },
      {
        path: "/admin/create",
        component: CreatePartner,
      },
    ],
  },
  {
    path: "/auth",
    redirect: "/auth/login",
    component: Auth,
    children: [
      {
        path: "/auth/login",
        component: Login,
      },
      {
        path: "/auth/register",
        component: Register,
      },
    ],
  },

  {
    path: "/",
    redirect: "/admin/dashboard",
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Mount the app
createApp(App).use(router).mount("#app");