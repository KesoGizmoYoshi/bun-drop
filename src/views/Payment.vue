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
const street = ref("");
const city = ref("");
const postalCode = ref("");

const paymentMethod = ref("");

const cardnumber = ref("");
const expirationDate = ref("");
const cvc = ref("");
const phoneNumber = ref("");

const errorMessage = ref("");

const handleSubmit = (orderItems) => {
	if (fullName.value.trim().length > 1 && street.value.trim().length > 1 && postalCode.value.trim().length > 1 && city.value.trim().length > 1) {
		if (paymentMethod.value !== "") {
			console.log(isNaN(Number(cardnumber.value)));
			console.log(cardnumber.value.length);
			console.log(isNaN(Number(cvc.value)));
			console.log(cvc.value.length);
			console.log(expirationDate.value.length);
			if (paymentMethod.value === "Mastercard/Visa") {
				if (
					!isNaN(Number(cardnumber.value.trim())) &&
					cardnumber.value.trim().length === 16 &&
					!isNaN(Number(cvc.value.trim())) &&
					cvc.value.trim().length === 3 &&
					expirationDate.value.trim().length === 5
				) {
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
				} else {
					errorMessage.value = "Please make sure that the cardnumber and CVC is only numbers. Cardnumber: 16 digits, CVC: 3 digits, and please format the Expiration date like 00/00!";
					return;
				}
			} else if (paymentMethod.value === "Swish") {
				if (!isNaN(Number(phoneNumber.value.trim())) && phoneNumber.value.trim().length === 10) {
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
				} else {
					errorMessage.value = "Please make sure that the phonenumber has 10 digits!";
					return;
				}
			}
		} else {
			errorMessage.value = "Please select a payment method!";
		}
	} else {
		errorMessage.value = "Please make sure that you fill all fields related to name and adress!";
	}
};
</script>

<template>
	<div class="container" v-if="orderItems.length > 0 && !confirmedOrder">
		<form class="container" @submit.prevent="handleSubmit(orderItems)">
			<div class="input-container">
				<label>Full Name</label>
				<input type="text" required v-model="fullName" />
				<label>Street</label>
				<input type="text" required v-model="street" />
				<label>City</label>
				<input type="text" required v-model="city" />
				<label>Postal code</label>
				<input type="text" required v-model="postalCode" />
			</div>
			<div class="input-container">
				<div class="input-container">
					<label>Payment Method</label>
					<select v-model="paymentMethod" @change="console.log(paymentMethod)">
						<option>Mastercard/Visa</option>
						<option>Swish</option>
					</select>
				</div>
				<div class="input-container" v-if="paymentMethod === 'Mastercard/Visa'">
					<label>Cardnumber</label>
					<input type="text" required v-model="cardnumber" />
					<label>Expiration Date</label>
					<input type="text" required v-model="expirationDate" />
					<label>CVC</label>
					<input type="text" required v-model="cvc" />
				</div>
				<div class="input-container" v-else-if="paymentMethod === 'Swish'">
					<label>Phone number</label>
					<input type="text" required v-model="phoneNumber" />
				</div>
			</div>
			<div>
				<p>{{ errorMessage }}</p>
				<button class="pink-btn" typ="submit">Order Now</button>
			</div>
		</form>
	</div>
	<div class="container" v-else-if="confirmedOrder">
		<Confirmation />
	</div>
	<div class="container" v-else>Your order is empty, please add some items from our menu, before you can proceed to payment.</div>
</template>
