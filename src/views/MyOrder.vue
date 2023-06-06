<script setup>
import { inject, ref } from "vue";
import LoginForm from "../components/LoginForm.vue";

const eventBus = inject("eventBus");
//const { currentUser, checkUserAuth } = authentication();
const orderItems = ref([]);

//checkUserAuth();

const currentUser = JSON.parse(sessionStorage.getItem("login"));
if (currentUser) {
	orderItems.value = JSON.parse(localStorage.getItem(currentUser.username)).orderItems;
}

const remove = (index) => {
	const currentLocalStorage = JSON.parse(localStorage.getItem(currentUser.username));
	currentLocalStorage.orderItems.splice(index, 1);
	currentLocalStorage.orderSize = currentLocalStorage.orderItems.length;
	localStorage.setItem(currentLocalStorage.username, JSON.stringify(currentLocalStorage));
	orderItems.value = currentLocalStorage.orderItems;
	eventBus.$trigger("localStorageUpdated");
};
</script>

<template>
	<div class="container" v-if="currentUser">
		<div class="myorder-container">
			<div class="order-item-container" v-for="(item, index) in orderItems" :key="index">
				{{ item.name }}
				<button class="dark-btn" @:click="remove(index)">X</button>
			</div>
		</div>
		<button class="pink-btn"><router-link to="/payment">Continue to payment</router-link></button>
	</div>
	<div class="container" v-else>
		<LoginForm />
	</div>
</template>
