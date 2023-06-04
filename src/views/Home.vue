<script setup>
import Product from "../components/Product.vue";
import getProducts from "../composables/getProducts.js";

const { products, error, load } = getProducts();

load();
</script>

<template>
	<div class="container">
		<div v-for="product in products" :key="product.id">
			<Product :product="product" />
		</div>
	</div>
</template>
