<script setup>
import { inject } from "vue";
const props = defineProps({
	product: {},
});

const eventBus = inject("eventBus");

const handleClick = (product) => {
	const currentUser = JSON.parse(sessionStorage.getItem("login"));
	const currentLocalStorage = JSON.parse(localStorage.getItem(currentUser.username));
	currentLocalStorage.cart.push({ id: product.id, name: product.name });
	currentLocalStorage.cartSize = currentLocalStorage.cart.length;
	localStorage.setItem(currentUser.username, JSON.stringify(currentLocalStorage));

	eventBus.$emit("localStorageUpdated");
};
</script>

<template>
	<div class="product-card-details">
		<img class="img-product" :src="`/src/assets/images/${product.image}`" alt="" />
		<div>
			<p>{{ product.name }}</p>
			<p>{{ product.description }}</p>
			<button @:click="handleClick(product)" class="pink-btn">Add</button>
		</div>
	</div>
</template>
