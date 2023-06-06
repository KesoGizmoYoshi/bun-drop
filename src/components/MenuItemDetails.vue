<script setup>
import { inject, ref } from "vue";
const props = defineProps({
	menuItem: {},
});

const eventBus = inject("eventBus");
const isFavorite = ref(null);

const currentUser = JSON.parse(sessionStorage.getItem("login"));
const currentLocalStorage = JSON.parse(localStorage.getItem(currentUser.username));

const favorites = currentLocalStorage.favorites;

favorites.filter((f) => {
	if (f.name === props.menuItem.name) {
		isFavorite.value = true;
	}
});

const addToOrder = (menuItem) => {
	const currentUser = JSON.parse(sessionStorage.getItem("login"));
	const currentLocalStorage = JSON.parse(localStorage.getItem(currentUser.username));
	currentLocalStorage.orderItems.push({ id: menuItem.id, name: menuItem.name });
	currentLocalStorage.orderSize = currentLocalStorage.orderItems.length;
	localStorage.setItem(currentUser.username, JSON.stringify(currentLocalStorage));

	eventBus.$trigger("localStorageUpdated");
};

const handleFavorite = (menuItem) => {
	// const currentUser = JSON.parse(sessionStorage.getItem("login"));
	// const currentLocalStorage = JSON.parse(localStorage.getItem(currentUser.username));
	// currentLocalStorage.favorites.push({ name: menuItem.name });
	// localStorage.setItem(currentUser.username, JSON.stringify(currentLocalStorage));
	// isFavorite.value = true;
	// eventBus.$trigger("localStorageUpdated");
	const currentUser = JSON.parse(sessionStorage.getItem("login"));
	const currentLocalStorage = JSON.parse(localStorage.getItem(currentUser.username));

	const favorites = currentLocalStorage.favorites;

	favorites.filter((f) => {
		if (f.name === props.menuItem.name) {
			isFavorite.value = true;
		}
	});

	if (!isFavorite.value) {
		currentLocalStorage.favorites.push({ name: menuItem.name });
		localStorage.setItem(currentUser.username, JSON.stringify(currentLocalStorage));
		isFavorite.value = true;
	} else {
		currentLocalStorage.favorites = favorites;
		localStorage.setItem(currentUser.username, JSON.stringify(currentLocalStorage));
		isFavorite.value = false;
	}

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
			<button @:click="handleFavorite(menuItem)" class="blue-btn" v-if="!isFavorite">Make Favorite</button>
			<button @:click="handleFavorite(menuItem)" class="blue-btn" v-else>Remove Favorite</button>
			<button class="blue-btn" v-else>Remove Favorite</button>
			<p>{{ menuItem.description }}</p>
			<button class="dark-btn">Return to menu</button>
			<button @:click="addToOrder(menuItem)" class="pink-btn">Add</button>
		</div>
	</div>
</template>
