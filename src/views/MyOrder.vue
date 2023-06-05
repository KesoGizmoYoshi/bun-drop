<script setup>
import { inject, ref } from "vue";
import authentication from "../composables/authentication.js";
// import { useRouter } from "vue-router";

// const eventBus = inject("eventBus");
// const router = useRouter();
const eventBus = inject("eventBus");
const { currentUser, checkUserAuth } = authentication();
checkUserAuth();
console.log(currentUser.value.username);

// const currentLocalStorage = ref([]);
const orderItems = ref(JSON.parse(localStorage.getItem(currentUser.value.username)).orderItems);
console.log(orderItems.value);
// const auth = () => {
// 	const currentUser = JSON.parse(sessionStorage.getItem("login"));

// 	if (currentUser === null) {
// 		router.push("/login");
// 	} else {
// 		eventBus.$trigger("localStorageUpdated");
// 		orderItems.value = ref(JSON.parse(localStorage.getItem(currentUser.username)).cart);
// 	}
// };

// auth();

const remove = (index) => {
	const currentLocalStorage = JSON.parse(localStorage.getItem(currentUser.value.username));
	currentLocalStorage.orderItems.splice(index, 1);
	currentLocalStorage.orderSize = currentLocalStorage.orderItems.length;
	localStorage.setItem(currentLocalStorage.username, JSON.stringify(currentLocalStorage));
	orderItems.value = currentLocalStorage.orderItems;
	eventBus.$trigger("localStorageUpdated");
};
</script>

<template>
	<div class="container">
		<div class="myorder-container">
			<div class="order-item-container" v-for="(item, index) in orderItems" :key="index">
				{{ item.name }}
				<button class="dark-btn" @:click="remove(index)">X</button>
			</div>
		</div>
		<button class="pink-btn"><router-link to="/payment">Continue to payment</router-link></button>
	</div>
</template>
