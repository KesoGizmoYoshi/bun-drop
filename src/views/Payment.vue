<script setup>
import { inject, ref } from "vue";
import { useRouter } from "vue-router";
import Confirmation from "../components/Confirmation.vue";
const router = useRouter();
const eventBus = inject("eventBus");
const currentUser = JSON.parse(sessionStorage.getItem("login"));
const orderItems = ref([]);
const confirmedOrder = ref(false);

if (currentUser) {
	orderItems.value = JSON.parse(localStorage.getItem(currentUser.username)).orderItems;
	eventBus.$trigger("localStorageUpdated");
} else {
	router.push("/login");
}

const fullName = ref("");
const address = ref("");
const city = ref("");
const postalCode = ref("");
const cardnumber = ref("");
const expirationDate = ref("");
const cvc = ref("");
const swish = ref("");

const handleSubmit = (orderItems) => {
	console.log(orderItems);
	if (fullName && address && postalCode && city) {
		if ((cardnumber && expirationDate && cvc) || swish) {
			fetch("http://localhost:3000/orders", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ orderContent: orderItems }),
			});

			confirmedOrder.value = true;

			const currentLocalStorage = JSON.parse(localStorage.getItem(currentUser.username));
			currentLocalStorage.orderItems = [];
			currentLocalStorage.orderSize = 0;
			localStorage.setItem(currentUser.username, JSON.stringify(currentLocalStorage));
			eventBus.$trigger("localStorageUpdated");
		}
	} else {
		console.log("derp");
	}
};
</script>

<template>
	<div class="container" v-if="orderItems.length > 0 && !confirmedOrder">
		<form class="form-container" @submit.prevent="handleSubmit(orderItems)">
			<div>
				<label>Full Name</label>
				<input type="text" required v-model="fullName" />
				<label>Address</label>
				<input type="text" required v-model="address" />
				<label>City</label>
				<input type="text" required v-model="city" />
				<label>Postal code</label>
				<input type="text" required v-model="postalCode" />
			</div>
			<div>
				<label>Cardnumber</label>
				<input type="text" required v-model="cardnumber" />
				<label>Expiration Date</label>
				<input type="text" required v-model="expirationDate" />
				<label>CVC</label>
				<input type="text" required v-model="cvc" />
				<label>Swish</label>
				<input type="text" required v-model="swish" />

				<button class="pink-btn" typ="submit">Order Now</button>
			</div>
		</form>
	</div>
	<div class="container centered-text" v-else-if="confirmedOrder">
		<Confirmation />
	</div>
	<div class="container" v-else>Your order is empty, please add some items from our menu, before you can proceed to payment.</div>
</template>
