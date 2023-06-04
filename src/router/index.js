import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import About from "../views/About.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: Home,
		},
		{
			path: "/login",
			name: "Login",
			component: Login,
		},
		{
			path: "/register",
			name: "Register",
			component: Register,
		},
		{
			path: "/about",
			name: "About",
			component: About,
		},
	],
});

export default router;
