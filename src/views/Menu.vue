<script setup>
import { inject, ref, computed } from "vue";
import MenuItem from "../components/MenuItem.vue";
import getMenuItems from "../composables/getMenuItems.js";
const eventBus = inject("eventBus");
eventBus.$trigger("localStorageUpdated");

const { menuItems, error, load } = getMenuItems();
const search = ref("");

load();

const matchingMenuItems = computed(() => {
	const query = search.value.toLowerCase().trim();
	if (query === "") {
		return menuItems;
	} else {
		const filteredMenuItems = ref([]);
		menuItems.value.forEach((menuItem) => {
			if (menuItem.name.toLowerCase().includes(query)) {
				filteredMenuItems.value.push(menuItem);
			}
		});
		return filteredMenuItems;
	}
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
		<div v-for="menuItem in matchingMenuItems.value" :key="MenuItem.id">
			<router-link :to="{ name: 'Details', params: { id: menuItem.id } }">
				<MenuItem :menuItem="menuItem" />
			</router-link>
		</div>
	</div>
</template>
