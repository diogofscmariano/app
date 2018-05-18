import './registry';
import axios from 'axios';

const filesRegex = [
	new RegExp('src="(.*).js', 'gi'),
	new RegExp('href="(.*).css', 'gi')
];

const load = (apps) => {
	apps.forEach(async (app) => {
		// Register app on global registry
		window.appRegistry.register(app);

		// Create custom element for each app
		const element = document.createElement(app.id);

		const rootElement = document.querySelector('.root');
		rootElement.appendChild(element);

		// Load app async
		const content = await axios.get(app.path);

		// Fixes app dependencies paths (TODO: only relative paths!!)
		const withPaths = _fixDepPaths(content.data, app.path);

		// Create shadow dom for encapsulation
		const shadowRoot = element.attachShadow({ mode: 'open' });
		shadowRoot.innerHTML = withPaths;

		_runScripts(shadowRoot);
	});
};

const _fixDepPaths = (htmlString, path) => {
	let str = htmlString;

	filesRegex.forEach((fileType) => {
		const fileMatches = str.match(fileType);

		if (fileMatches) {
			fileMatches.forEach((match) => {
				const idx = match.indexOf('"') + 1;
				const toReplace = match.slice(0, idx) + path + match.slice(idx);
				str = str.replace(match, toReplace);
			});
		}
	});

	return str;
};

const _runScripts = (container) => {
	const scripts = container.querySelectorAll('script');

	scripts.forEach((script) => {
		const scriptTag = _createScriptTag(script);

		container.appendChild(scriptTag);
		script.parentNode.removeChild(script);
	});
};

const _createScriptTag = (script) => {
	const tag = document.createElement('script');
	tag.type = 'text/javascript';

	if (script.src) {
		tag.src = script.src;
	} else {
		tag.textContent = script.innerText;
	}

	return tag;
};

export { load };
