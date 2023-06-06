<script setup>
import { ref } from "vue";

const props = defineProps({
	menuItem: {},
});
const $emit = defineEmits({
	getMenuItem: Function,
});

const currentUser = JSON.parse(sessionStorage.getItem("login"));
const favorites = ref(JSON.parse(localStorage.getItem(currentUser.username)).favorites);

const isFavorite = ref(false);

favorites.value.filter((f) => {
	if (f.name === props.menuItem.name) {
		isFavorite.value = true;
		$emit("menuItem", props.menuItem);
	}
});

const addToFavorite = (menuItem) => {
	const currentUser = JSON.parse(sessionStorage.getItem("login"));
	const currentLocalStorage = JSON.parse(localStorage.getItem(currentUser.username));
	currentLocalStorage.favorites.push({ name: menuItem.name });
	localStorage.setItem(currentUser.username, JSON.stringify(currentLocalStorage));
	isFavorite.value = true;
};

const removeFromFavorite = (menuItem) => {
	const currentUser = JSON.parse(sessionStorage.getItem("login"));
	const currentLocalStorage = JSON.parse(localStorage.getItem(currentUser.username));
	const favorites = currentLocalStorage.favorites;
	let index;

	for (let i = 0; i < favorites.length; i++) {
		if (favorites[i].name === props.menuItem.name) {
			index = i;
		}
	}

	favorites.splice(index, 1);
	currentLocalStorage.favorites = favorites;
	localStorage.setItem(currentUser.username, JSON.stringify(currentLocalStorage));
	isFavorite.value = false;
};
</script>

<template>
	<div class="product-card">
		<div>
			<router-link :to="{ name: 'Details', params: { id: menuItem.id } }">
				<img class="img-item" :src="`src/assets/images/${menuItem.image}`" alt="" />
				<img class="img-gold-star" src="src/assets/gold-star.png" alt="" v-if="isFavorite" />
			</router-link>
		</div>
		<button @click="addToFavorite(menuItem)" v-if="!isFavorite">Add to favorite</button>
		<button @click="removeFromFavorite(menuItem)" v-else>Remove from favorite</button>
		<p>{{ menuItem.name }}</p>
	</div>
</template>
