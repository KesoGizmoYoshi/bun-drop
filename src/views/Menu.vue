<script setup>
import { inject, ref, computed } from "vue";
import MenuItem from "../components/MenuItem.vue";
import getMenuItems from "../composables/getMenuItems.js";
import LoginForm from "../components/LoginForm.vue";
const eventBus = inject("eventBus");

const currentUser = JSON.parse(sessionStorage.getItem("login"));
const { menuItems, error, load } = getMenuItems();
const search = ref("");

if (currentUser) {
	load();
	eventBus.$trigger("localStorageUpdated");
}

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
	<div class="filter-container" v-if="currentUser">
		<input class="search-input" type="text" v-model="search" />
		<div>
			<button class="blue-btn">Burgers</button>
			<button class="blue-btn">Fries</button>
			<button class="blue-btn">Drinks</button>
			<button class="blue-btn">Favorites</button>
		</div>
	</div>
	<div class="container" v-if="currentUser">
		<div v-for="menuItem in matchingMenuItems.value" :key="MenuItem.id">
			<router-link :to="{ name: 'Details', params: { id: menuItem.id } }">
				<MenuItem :menuItem="menuItem" />
			</router-link>
		</div>
	</div>
	<div class="container" v-else>
		<LoginForm />
	</div>
</template>
