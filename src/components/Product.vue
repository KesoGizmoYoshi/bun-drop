<script setup>
const props = defineProps({
	product: {},
});
</script>

<template>
	<div class="container">
		<p>{{ product.name }}</p>
	</div>
</template>
