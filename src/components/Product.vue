<script setup>
const props = defineProps({
	product: {},
});
</script>

<template>
	<div class="product-card">
		<img class="img-product" :src="`src/assets/images/${product.image}`" alt="" />
		<p>{{ product.name }}</p>
	</div>
</template>
