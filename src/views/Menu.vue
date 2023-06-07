<script setup>
import { inject, ref, computed } from "vue";
import { useRouter } from "vue-router";
import MenuItem from "../components/MenuItem.vue";
import getMenuItems from "../composables/getMenuItems.js";

const router = useRouter();
const eventBus = inject("eventBus");
const currentUser = JSON.parse(sessionStorage.getItem("login"));
const { menuItems, error, load } = getMenuItems();
const search = ref("");
const favoriteItems = ref([]);

if (currentUser) {
	load();
	eventBus.$trigger("localStorageUpdated");
} else {
	router.push("/login");
}

// const matchingMenuItems = computed(() => {
// 	const query = search.value.toLowerCase().trim();
// 	if (query === "") {
// 		return menuItems;
// 	} else {
// 		const filteredMenuItems = ref([]);
// 		menuItems.value.forEach((menuItem) => {
// 			if (menuItem.name.toLowerCase().includes(query)) {
// 				filteredMenuItems.value.push(menuItem);
// 			}
// 		});
// 		return filteredMenuItems;
// 	}
// });

const matchingMenuItems = computed(() => {
	const query = search.value.toLowerCase().trim();
	if (query === "") {
		return menuItems.value;
	} else {
		const filteredMenuItems = [];
		menuItems.value.forEach((menuItem) => {
			if (menuItem.name.toLowerCase().includes(query)) {
				filteredMenuItems.push(menuItem);
			}
		});
		return filteredMenuItems;
	}
});

function getMenuItem(menuItem) {
	favoriteItems.value.push(menuItem);
}
</script>

<template>
	<div class="filter-container">
		<input class="search-input" type="text" v-model="search" />
		<div>
			<button class="blue-btn">Burgers</button>
			<button class="blue-btn">Fries</button>
			<button class="blue-btn">Drinks</button>
		</div>
	</div>
	<div class="container">
		<div v-for="menuItem in matchingMenuItems" :key="menuItem.id">
			<MenuItem :menuItem="menuItem" @menuItem="getMenuItem" />
		</div>
	</div>
</template>
