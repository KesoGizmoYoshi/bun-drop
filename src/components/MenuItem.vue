<script setup>
import { ref } from "vue";
const props = defineProps({
	menuItem: {},
});

const currentUser = JSON.parse(sessionStorage.getItem("login"));
const favorites = ref(JSON.parse(localStorage.getItem(currentUser.username)).favorites);
console.log(favorites);

const isFavorite = ref(false);

favorites.value.filter((f) => {
	console.log();
	console.log(`${f.name} ---- ${props.menuItem.name}`);
	if (f.name === props.menuItem.name) {
		isFavorite.value = true;
	}
});
console.log(isFavorite.name);
</script>

<template>
	<div class="product-card">
		<div>
			<img class="img-item" :src="`src/assets/images/${menuItem.image}`" alt="" />
			<img class="img-gold-star" src="src/assets/gold-star.png" alt="" v-if="isFavorite" />
		</div>

		<p>{{ menuItem.name }}</p>
	</div>
</template>
