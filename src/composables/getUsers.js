import { ref } from "vue";

function getUsers() {
	const users = ref([]);
	const error = ref(null);

	const load = async () => {
		try {
			let data = await fetch("http://localhost:3000/users");

			if (!data.ok) {
				throw error("No users could be found!");
			}
			users.value = await data.json();
		} catch (err) {
			error.value = err.message;
		}
	};

	return { users, error, load };
}

export default getUsers;
