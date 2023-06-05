import { reactive } from "vue";

const eventBus = reactive({
	events: {},
	$on(eventName, handler) {
		if (!this.events[eventName]) {
			this.events[eventName] = [];
		}
		this.events[eventName].push(handler);
	},
	$trigger(eventName) {
		if (this.events[eventName]) {
			this.events[eventName].forEach((handler) => handler());
		}
	},
});

export default eventBus;
