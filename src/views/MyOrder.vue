<script setup>
import { inject, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const eventBus = inject("eventBus");
const orderItems = ref([]);
const currentUser = JSON.parse(sessionStorage.getItem("login"));

if (currentUser) {
	eventBus.$trigger("localStorageUpdated");
} else {
	router.push("/login");
}

if (currentUser) {
	orderItems.value = JSON.parse(localStorage.getItem(currentUser.username)).orderItems;
}

const remove = (index) => {
	const currentLocalStorage = JSON.parse(localStorage.getItem(currentUser.username));
	currentLocalStorage.orderItems.splice(index, 1);
	currentLocalStorage.orderSize = currentLocalStorage.orderItems.length;
	localStorage.setItem(currentLocalStorage.username, JSON.stringify(currentLocalStorage));
	orderItems.value = currentLocalStorage.orderItems;
	eventBus.$trigger("localStorageUpdated");
};
</script>

<template>
	<div class="container">
		<div class="myorder-container" v-if="orderItems.length > 0">
			<div class="order-item-container" v-for="(item, index) in orderItems" :key="index">
				{{ item.name }}
				<button class="dark-btn" @:click="remove(index)">X</button>
			</div>
			<button class="pink-btn"><router-link to="/payment">Continue to payment</router-link></button>
		</div>
		<div v-else>Your order is empty, please add some items from our menu, before you can proceed to payment.</div>
	</div>
</template>
