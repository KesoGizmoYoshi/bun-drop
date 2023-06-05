<script setup>
import { inject, ref } from "vue";
import { RouterLink, RouterView } from "vue-router";

const eventBus = inject("eventBus");
const currentUser = JSON.parse(sessionStorage.getItem("login"));
const orderSize = ref(JSON.parse(localStorage.getItem(currentUser.username)).cartSize);

eventBus.$on("localStorageUpdated", () => {
	orderSize.value = JSON.parse(localStorage.getItem(currentUser.username)).cartSize;
});

// const currentUser = JSON.parse(sessionStorage.getItem("login"));
// const currentLocalStorage = JSON.parse(localStorage.getItem(currentUser.username));
// const orderSize = ref(currentLocalStorage.cartSize);

// watch(
// 	() => localStorage.getItem(currentUser.username),
// 	(updateCurrentLocalStorage) => {
// 		currentLocalStorage = JSON.parse(updateCurrentLocalStorage);
// 		orderSize.value = currentLocalStorage.cartSize;
// 	}
// );

// console.log(orderSize.value);
</script>

<template>
	<header>
		<div class="nav-container">
			<h1>BUN DROP</h1>
			<nav>
				<ul>
					<li><router-link to="/login">Login</router-link></li>
					<li><router-link to="/register">Register</router-link></li>
					<li>
						<router-link to="/myorder">My Order {{ orderSize }}</router-link>
					</li>
					<li><router-link to="/about">About</router-link></li>
				</ul>
			</nav>
		</div>
	</header>

	<RouterView />

	<footer class="footer-container">© Copyright Bun Drop 2023</footer>
</template>

<style scoped></style>
