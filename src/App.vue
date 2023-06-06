<script setup>
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
</script>

<template>
	<Header />
	<RouterView />

	<footer class="footer-container">© Copyright Bun Drop 2023</footer>
</template>

<style scoped></style>
