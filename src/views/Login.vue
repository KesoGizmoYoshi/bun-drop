<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import getUsers from "../composables/getUsers.js";

const router = useRouter();

const username = ref("");
const password = ref("");
const errorMessage = ref(null);

const { users, error, load } = getUsers();

const handleLogin = () => {
	load();

	const user = [];

	if (Array.isArray(users) && users.length > 0) {
		const user = users.find((u) => {
			if (u.username == username && u.password == password) {
				router.push("/");
			}
		});
	}

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
