<script setup>
import { inject, ref } from "vue";
import { useRouter } from "vue-router";

const eventBus = inject("eventBus");
const router = useRouter();

const currentLocalStorage = ref([]);
const orderItems = ref([]);

const auth = () => {
	const currentUser = JSON.parse(sessionStorage.getItem("login"));

	if (currentUser === null) {
		router.push("/login");
	} else {
		eventBus.$trigger("localStorageUpdated");
		orderItems.value = ref(JSON.parse(localStorage.getItem(currentUser.username)).cart);
	}
};

auth();

const remove = (index) => {
	const currentUser = JSON.parse(sessionStorage.getItem("login"));
	currentLocalStorage.value = JSON.parse(localStorage.getItem(currentUser.username));
	currentLocalStorage.value.cart.splice(index, 1);
	console.log(orderItems.value);
	//currentLocalStorage.value.cart = orderItems.value;
	console.log(currentLocalStorage.value.cart);
	//const currentUser = JSON.parse(sessionStorage.getItem("login"));
	localStorage.setItem(
		currentLocalStorage.value.username,
		JSON.stringify({
			username: currentLocalStorage.value.username,
			cart: currentLocalStorage.value.cart,
			cartSize: currentLocalStorage.value.cart.length,
			favorites: currentLocalStorage.value.favorites,
		})
	);
	console.log(currentLocalStorage.value.cart);
	orderItems.value = ref(currentLocalStorage.value.cart);
	console.log(orderItems.value);
	eventBus.$trigger("localStorageUpdated");
};
</script>

<template>
	<div class="container">
		<div class="myorder-container">
			<div class="order-item-container" v-for="(item, index) in orderItems.value" :key="index">
				{{ item.name }}
				<button class="dark-btn" @:click="remove(index)">X</button>
			</div>
		</div>
		<button class="pink-btn"><router-link to="/payment">Continue to payment</router-link></button>
	</div>
</template>
