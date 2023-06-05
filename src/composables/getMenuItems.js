import { ref } from "vue";

function getMenuItems() {
	const menuItems = ref([]);
	const error = ref(null);

	const load = async () => {
		try {
			let data = await fetch("http://localhost:3000/menuItems");

			if (!data.ok) {
				throw error("No menu Items could be found!");
			}
			menuItems.value = await data.json();
		} catch (err) {
			error.value = err.message;
		}
	};

	return { menuItems, error, load };
}

export default getMenuItems;
