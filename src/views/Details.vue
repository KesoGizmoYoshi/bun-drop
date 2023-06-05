<script setup>
import { useRoute } from "vue-router";
import ProductDetails from "../components/ProductDetails.vue";
import getProduct from "../composables/getProduct.js";

const route = useRoute();
const id = route.params.id;
const { product, error, load } = getProduct(id);

load();
</script>

<template>
	<div class="container"><ProductDetails :product="product" /></div>
</template>
