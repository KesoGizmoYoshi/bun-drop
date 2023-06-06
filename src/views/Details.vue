<script setup>
import { useRoute } from "vue-router";
import MenuItemDetails from "../components/MenuItemDetails.vue";
import getMenuItem from "../composables/getMenuItem.js";
import LoginForm from "../components/LoginForm.vue";

const route = useRoute();
const id = route.params.id;
const { menuItem, error, load } = getMenuItem(id);

const currentUser = JSON.parse(sessionStorage.getItem("login"));

load();
</script>

<template>
	<div v-if="currentUser"><MenuItemDetails :menuItem="menuItem" /></div>
	<div class="container" v-else>
		<LoginForm />
	</div>
</template>
