<script setup>
import { useRoute } from "vue-router";
import MenuItemDetails from "../components/MenuItemDetails.vue";
import getMenuItem from "../composables/getMenuItem.js";

const route = useRoute();
const id = route.params.id;
const { menuItem, error, load } = getMenuItem(id);

load();
</script>

<template>
	<div class="container"><MenuItemDetails :menuItem="menuItem" /></div>
</template>
