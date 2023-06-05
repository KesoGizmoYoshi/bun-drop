<script setup>
import { ref, computed } from "vue";
import Product from "../components/Product.vue";
import getProducts from "../composables/getProducts.js";

const { products, error, load } = getProducts();
const search = ref("");
load();

const matchingProducts = computed(() => {
	return products.value.filter((product) => product.includes(search.value));
});
</script>

<template>
	<div class="container">
		<input type="text" v-model="search" />
		<button class="pink-btn">Burgers</button>
		<button class="pink-btn">Fries</button>
		<button class="pink-btn">Drinks</button>
		<button class="pink-btn">Favorites</button>
	</div>
	<div class="container">
		<div v-if="search === ''" v-for="product in products" :key="product.id">
			<router-link :to="`/menu/${product.id}`">
				<Product :product="product" />
			</router-link>
		</div>
		<div v-if="search !== ''" v-for="product in matchingProducts" :key="product.name">
			<Product :product="product" />
		</div>
	</div>
</template>
