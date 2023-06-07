<script setup>
import { inject, ref } from "vue";
import { useRouter } from "vue-router";
import getUsers from "../composables/getUsers.js";

const router = useRouter();
const eventBus = inject("eventBus");

const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const availibility = ref(null);
const errorMessage = ref(null);

const { users, error, load } = getUsers();

load();

const handleSubmit = () => {
	console.log(username.value);
	console.log(password.value);
	console.log(confirmPassword.value);

	const isUsernameAvailable = users.value.find((u) => u.username === username.value);

	if (isUsernameAvailable) {
		errorMessage.value = "Username is already used!";
	} else {
		if (password.value.length < 8 || confirmPassword.value.length < 8) {
			errorMessage.value = "Password requires atleast 8 characters!";
		} else {
			if (password.value !== confirmPassword.value) {
				errorMessage.value = "Passwords does not match!";
			} else {
				fetch("http://localhost:3000/users", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ username: username.value, password: password.value }),
				});

				sessionStorage.setItem("login", JSON.stringify({ username: username.value }));
				localStorage.setItem(username.value, JSON.stringify({ username: username.value, orderItems: [], orderSize: 0, favorites: [] }));
				eventBus.$trigger("localStorageUpdated");
				router.push("/");
			}
		}
	}
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
