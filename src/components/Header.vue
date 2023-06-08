<script setup>
import { inject, ref } from "vue";
import { useRouter, RouterLink } from "vue-router";

const router = useRouter();
const eventBus = inject("eventBus");
const orderSize = ref(0);
const currentUser = ref(JSON.parse(sessionStorage.getItem("login")));

eventBus.$on("localStorageUpdated", () => {
	if (!currentUser) {
		orderSize.value = 0;
	} else {
		currentUser.value = JSON.parse(sessionStorage.getItem("login"));
		orderSize.value = JSON.parse(localStorage.getItem(currentUser.value.username)).orderSize;
	}
});

const logOut = () => {
	sessionStorage.clear();
	router.push("/login");
	currentUser.value = false;
};
</script>

<template>
	<header>
		<div class="nav-container">
			<h1>BUN DROP</h1>
			<button class="mobile-nav-toggle" aria-expanded="false"></button>
			<nav>
				<ul class="primary-navigation" data-visible="false" v-if="currentUser">
					<li><router-link to="/">Home</router-link></li>
					<li><router-link to="/menu">Menu</router-link></li>
					<li><router-link to="/favorites">Favorites</router-link></li>
					<li>
						<router-link to="/myorder">My Order </router-link>
						<span class="order-size-display">{{ orderSize }}</span>
					</li>
					<li><router-link to="/about">About</router-link></li>
					<li><a @click="logOut">Log out</a></li>
				</ul>
				<ul class="primary-navigation" data-visible="false" v-else>
					<li><router-link to="/login">Login</router-link></li>
					<li><router-link to="/register">Register</router-link></li>
					<li><router-link to="/about">About</router-link></li>
				</ul>
			</nav>
		</div>
	</header>
</template>
