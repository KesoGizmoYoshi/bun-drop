<script setup>
import { inject, ref } from "vue";
import { RouterLink } from "vue-router";

const eventBus = inject("eventBus");
const currentUser = ref("");
const orderSize = ref(0);

// if (currentUser.value !== null) {
// 	orderSize.value = 0;
// }

// eventBus.$on("currentUserUpdated", () => {
// 	currentUser.value = JSON.parse(sessionStorage.getItem("login"));
// 	orderSize.value = JSON.parse(localStorage.getItem(currentUser.value.username)).cartSize;
// });

eventBus.$on("localStorageUpdated", () => {
	if (currentUser.value === null) {
		orderSize.value = 0;
	} else {
		currentUser.value = JSON.parse(sessionStorage.getItem("login"));
		orderSize.value = JSON.parse(localStorage.getItem(currentUser.value.username)).orderSize;
	}
});
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
</template>
