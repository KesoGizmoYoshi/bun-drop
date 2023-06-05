<script setup>
import { inject, ref } from "vue";
import { useRouter } from "vue-router";
import getUsers from "../composables/getUsers.js";

const router = useRouter();
const eventBus = inject("eventBus");
const username = ref("");
const password = ref("");
const errorMessage = ref(null);

const { users, error, load } = getUsers();

load();

const handleLogin = () => {
	users.value.forEach((u) => {
		if (u.username === username.value && u.password === password.value) {
			if (localStorage.getItem(u.username) === null) {
				localStorage.setItem(u.username, JSON.stringify({ username: u.username, cart: [], cartSize: 0, favorites: [] }));
			}
			sessionStorage.setItem("login", JSON.stringify({ username: u.username }));
			eventBus.$trigger("localStorageUpdated");
			router.push("/");
		}
	});

	errorMessage.value = "User was not found!";
};
</script>

<template>
	<div class="container">
		<div class="img-logo"><img class="img-logo" src="src/assets/logo-black.png" alt="" /></div>
		<div>
			<form class="form-container" @submit.prevent="handleLogin">
				<label>Username</label>
				<input type="text" required v-model="username" />
				<label>Password</label>
				<input type="password" required v-model="password" />
				<p v-if="errorMessage">{{ errorMessage }}</p>
				<button class="dark-btn" type="submit">Login</button>
				<button class="pink-btn"><router-link to="/register">Register</router-link></button>
			</form>
		</div>
	</div>
</template>

<style scoped></style>
