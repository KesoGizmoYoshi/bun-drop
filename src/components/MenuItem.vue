<script setup>
const props = defineProps({
	menuItem: {},
});
</script>

<template>
	<div class="product-card">
		<div>
			<img class="img-product" :src="`src/assets/images/${menuItem.image}`" alt="" />
			<img class="img-gold-star" src="src/assets/gold-star.png" alt="" />
		</div>

		<p>{{ menuItem.name }}</p>
	</div>
</template>
