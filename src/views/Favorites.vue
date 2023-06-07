<script setup>
import { inject, ref, computed } from "vue";
import { useRouter } from "vue-router";
import MenuItem from "../components/MenuItem.vue";
import getMenuItems from "../composables/getMenuItems.js";
const router = useRouter();
const eventBus = inject("eventBus");
const currentUser = JSON.parse(sessionStorage.getItem("login"));
const favorites = ref([]);

const { menuItems, error, load } = getMenuItems();

if (currentUser) {
	load();
	favorites.value = JSON.parse(localStorage.getItem(currentUser.username)).favorites;
	eventBus.$trigger("localStorageUpdated");
} else {
	router.push("/login");
}

const favoriteMenuItems = computed(() => {
	return menuItems.value.filter((m) => {
		return favorites.value.some((f) => {
			return m.name === f.name;
		});
	});
});
</script>

<template>
	<div class="container">
		<div v-for="menuItem in favoriteMenuItems" :key="menuItem.id">
			<MenuItem :menuItem="menuItem" />
		</div>
	</div>
</template>
