<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import getUsers from "../composables/getUsers.js";

const router = useRouter();

const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const availibility = ref(null);
const errorMessage = ref(null);

const { users, error, load } = getUsers();

load();

// broken lol
const checkUsername = () => {
	users.value.find((u) => {
		console.log(u);
		if (u.username === username.value) {
			availibility.value = "Already in use!";
		} else if (u.username !== username.value) {
			availibility.value = "";
		}
	});
};

const handleRegister = () => {
	console.log(username.value);
	console.log(password.value);
	console.log(confirmPassword.value);
};
</script>
<template>
	<div class="container">
		<div class="img-logo"><img class="img-logo" src="src/assets/logo-black.png" alt="" /></div>
		<div>
			<form class="form-container" @submit.prevent="handleSubmit">
				<label>Username</label>
				<input type="text" required @input="checkUsername" v-model="username" />
				<p v-if="availibility">{{ availibility }}</p>
				<label>Password</label>
				<input type="password" required v-model="password" />
				<label>Confirm Password</label>
				<input type="password" required v-model="confirmPassword" />
				<p v-if="errorMessage">{{ errorMessage }}</p>
				<button class="pink-btn" type="submit">Register</button>
			</form>
		</div>
	</div>
</template>
<style></style>
