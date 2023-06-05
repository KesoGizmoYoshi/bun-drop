import { inject, ref } from "vue";
import { useRouter } from "vue-router";

function authentication() {
	const eventBus = inject("eventBus");
	const router = useRouter();
	const currentUser = ref({});

	const checkUserAuth = () => {
		currentUser.value = JSON.parse(sessionStorage.getItem("login"));
		console.log(currentUser.value);
		if (currentUser.value === null) {
			router.push("/login");
		} else {
			eventBus.$trigger("localStorageUpdated");
		}
	};

	return { currentUser, checkUserAuth };
}

export default authentication;
