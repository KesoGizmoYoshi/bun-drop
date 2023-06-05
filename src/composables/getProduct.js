import { ref } from "vue";

function getProduct(id) {
	const product = ref({});
	const error = ref(null);

	const load = async () => {
		try {
			let data = await fetch(`http://localhost:3000/products/${id}`);

			if (!data.ok) {
				throw error("No product could be found!");
			}
			product.value = await data.json();
		} catch (err) {
			error.value = err.message;
		}
	};

	return { product, error, load };
}

export default getProduct;
