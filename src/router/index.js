import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import About from "../views/About.vue";
import Menu from "../views/Menu.vue";
import Details from "../views/Details.vue";
import MyOrder from "../views/MyOrder.vue";
import Payment from "../views/Payment.vue";
import OrderConfirmation from "../views/OrderConfirmation.vue";

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
		{
			path: "/menu",
			name: "Menu",
			component: Menu,
		},
		{
			path: "/menu/:id",
			name: "Details",
			component: Details,
			props: true,
		},
		{
			path: "/myorder",
			name: "MyOrder",
			component: MyOrder,
		},
		{
			path: "/payment",
			name: "Payment",
			component: Payment,
		},
		{
			path: "/orderconfirmation",
			name: "OrderConfirmation",
			component: OrderConfirmation,
		},
	],
});

export default router;
