<script setup>
import { inject } from "vue";
const props = defineProps({
	menuItem: {},
});

const eventBus = inject("eventBus");

const addToOrder = (menuItem) => {
	const currentUser = JSON.parse(sessionStorage.getItem("login"));
	const currentLocalStorage = JSON.parse(localStorage.getItem(currentUser.username));
	currentLocalStorage.orderItems.push({ id: menuItem.id, name: menuItem.name });
	currentLocalStorage.orderSize = currentLocalStorage.orderItems.length;
	localStorage.setItem(currentUser.username, JSON.stringify(currentLocalStorage));

	eventBus.$trigger("localStorageUpdated");
};

const addToFavorites = (menuItem) => {
	const currentUser = JSON.parse(sessionStorage.getItem("login"));
	const currentLocalStorage = JSON.parse(localStorage.getItem(currentUser.username));
	currentLocalStorage.favorites.push({ name: menuItem.name });
	localStorage.setItem(currentUser.username, JSON.stringify(currentLocalStorage));

	eventBus.$trigger("localStorageUpdated");
};
</script>

<template>
	<div class="product-card-details">
		<img class="img-product" :src="`/src/assets/images/${menuItem.image}`" alt="" />
		<div>
			<p>{{ menuItem.name }}</p>
			<p>{{ menuItem.description }}</p>
			<button class="pink-btn">Return to menu</button>
			<button @:click="addToOrder(menuItem)" class="pink-btn">Add</button>
			<button @:click="addToFavorites(menuItem)" class="blue-btn">Make Favorite</button>
		</div>
	</div>
</template>
