<script setup>
const props = defineProps({
	menuItem: {},
});
</script>

<template>
	<div class="product-card">
		<img class="img-product" :src="`src/assets/images/${menuItem.image}`" alt="" />
		<p>{{ menuItem.name }}</p>
	</div>
</template>
