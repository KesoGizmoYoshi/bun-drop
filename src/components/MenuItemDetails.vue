<script setup>
import { inject, ref } from "vue";
const props = defineProps({
	menuItem: {},
});

const eventBus = inject("eventBus");

const currentUser = JSON.parse(sessionStorage.getItem("login"));
const currentLocalStorage = JSON.parse(localStorage.getItem(currentUser.username));

const favorites = ref(currentLocalStorage.favorites);

const isFavorite = ref(false);

favorites.value.filter((f) => {
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

const addToFavorite = (menuItem) => {
	const currentUser = JSON.parse(sessionStorage.getItem("login"));
	const currentLocalStorage = JSON.parse(localStorage.getItem(currentUser.username));
	currentLocalStorage.favorites.push({ name: menuItem.name });
	localStorage.setItem(currentUser.username, JSON.stringify(currentLocalStorage));
	isFavorite.value = true;
	eventBus.$trigger("localStorageUpdated");
};

const removeFromFavorite = (menuItem) => {
	const currentUser = JSON.parse(sessionStorage.getItem("login"));
	const currentLocalStorage = JSON.parse(localStorage.getItem(currentUser.username));
	const favorites = currentLocalStorage.favorites;
	let index;

	for (let i = 0; i < favorites.length; i++) {
		if (favorites[i].name === menuItem.name) {
			index = i;
		}
	}

	favorites.splice(index, 1);
	currentLocalStorage.favorites = favorites;
	localStorage.setItem(currentUser.username, JSON.stringify(currentLocalStorage));
	isFavorite.value = false;
	eventBus.$trigger("localStorageUpdated");
};
</script>

<template>
	<div class="container">
		<div class="menu-item-details-container">
			<img class="img-item-details" :src="`/src/assets/images/${menuItem.image}`" alt="" />
		</div>
		<div class="menu-item-details-container">
			<h2>{{ menuItem.name }}</h2>
			<h4>Price: ${{ menuItem.price }}</h4>
			<button @:click="addToOrder(menuItem)" class="pink-btn">Add to Order</button>
			<button @:click="addToFavorite(menuItem)" class="blue-btn" v-if="!isFavorite">Add to Favorites</button>
			<button @:click="removeFromFavorite(menuItem)" class="blue-btn" v-else>Remove from Favorites</button>
			<p>{{ menuItem.description }}</p>

			<button class="dark-btn"><router-link to="/menu">Back to menu</router-link></button>
		</div>
	</div>
</template>
