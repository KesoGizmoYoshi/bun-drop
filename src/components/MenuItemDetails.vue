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
	<div class="container">
		<div class="menu-item-details-container">
			<img class="img-item-details" :src="`/src/assets/images/${menuItem.image}`" alt="" />
		</div>
		<div class="menu-item-details-container">
			<p>{{ menuItem.name }}</p>
			<button @:click="addToFavorites(menuItem)" class="blue-btn">Make Favorite</button>
			<p>{{ menuItem.description }}</p>
			<button class="dark-btn">Return to menu</button>
			<button @:click="addToOrder(menuItem)" class="pink-btn">Add</button>
		</div>
	</div>
</template>
