<script setup>
import { useRoute, useRouter } from "vue-router";
import { inject } from "vue";
import MenuItemDetails from "../components/MenuItemDetails.vue";
import getMenuItem from "../composables/getMenuItem.js";

const router = useRouter();
const route = useRoute();
const id = route.params.id;
const eventBus = inject("eventBus");

const { menuItem, error, load } = getMenuItem(id);

const currentUser = JSON.parse(sessionStorage.getItem("login"));

if (currentUser) {
	load();
	eventBus.$trigger("localStorageUpdated");
} else {
	router.push("/login");
}
</script>

<template>
	<div><MenuItemDetails :menuItem="menuItem" /></div>
</template>
