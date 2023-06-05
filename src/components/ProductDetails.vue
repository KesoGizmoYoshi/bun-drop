<script setup>
const props = defineProps({
	product: {},
});

function handleClick() {}
</script>

<template>
	<div class="product-card-details">
		<img class="img-product" :src="`/src/assets/images/${product.image}`" alt="" />
		<div>
			<p>{{ product.name }}</p>
			<p>{{ product.description }}</p>
			<button @:click="handleClick" class="pink-btn">Add</button>
		</div>
	</div>
</template>
