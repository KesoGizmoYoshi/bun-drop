import { ref } from "vue";

function getProducts() {
	const products = ref([]);
	const error = ref(null);

	const load = async () => {
		try {
			let data = await fetch("http://localhost:3000/products");

			if (!data.ok) {
				throw error("No products could be found!");
			}
			products.value = await data.json();
		} catch (err) {
			error.value = err.message;
		}
	};

	return { products, error, load };
}

export default getProducts;
