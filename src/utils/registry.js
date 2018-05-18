window.appRegistry = (() => {
	const apps = [];

	return {
		register: (app) => {
			apps.push({ id: app.id });
		},
		get apps() {
			return apps;
		}
	};
})();
