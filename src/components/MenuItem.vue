<script setup>
import { inject, ref } from "vue";

const props = defineProps({
	menuItem: {},
});
const $emit = defineEmits({
	getMenuItem: Function,
});
const eventBus = inject("eventBus");

const currentUser = JSON.parse(sessionStorage.getItem("login"));
const favorites = ref(JSON.parse(localStorage.getItem(currentUser.username)).favorites);

const isFavorite = ref(false);

favorites.value.filter((f) => {
	if (f.name === props.menuItem.name) {
		isFavorite.value = true;
		$emit("menuItem", props.menuItem);
	}
});
</script>

<template>
	<div class="product-card">
		<div>
			<router-link :to="{ name: 'Details', params: { id: menuItem.id } }">
				<img class="img-item" :src="`src/assets/images/${menuItem.image}`" alt="" />
				<img class="img-gold-star" src="src/assets/gold-star.png" alt="" v-if="isFavorite" />
			</router-link>
		</div>
		<p>{{ menuItem.name }}</p>
	</div>
</template>
