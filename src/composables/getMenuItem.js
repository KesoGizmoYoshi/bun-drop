import { ref } from "vue";

function getMenuItem(id) {
	const menuItem = ref({});
	const error = ref(null);

	const load = async () => {
		try {
			let data = await fetch(`http://localhost:3000/menuItems/${id}`);

			if (!data.ok) {
				throw error("No menu item could be found!");
			}
			menuItem.value = await data.json();
		} catch (err) {
			error.value = err.message;
		}
	};

	return { menuItem, error, load };
}

export default getMenuItem;
