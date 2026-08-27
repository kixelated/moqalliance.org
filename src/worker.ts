import astro from "@astrojs/cloudflare/entrypoints/server";

const DEMOQED_HOST = "demoqed.moqalliance.org";
const DEMOQED_PATH = "/demoqed-2026";

const fetch: typeof astro.fetch = (request, env, context) => {
	const url = new URL(request.url);

	if (url.hostname === DEMOQED_HOST && url.pathname === "/") {
		url.pathname = `${DEMOQED_PATH}/`;
		return env.ASSETS.fetch(url);
	}

	if (
		url.hostname === "moqalliance.org" &&
		(url.pathname === DEMOQED_PATH || url.pathname === `${DEMOQED_PATH}/`)
	) {
		return Response.redirect(`https://${DEMOQED_HOST}/`, 308);
	}

	return astro.fetch(request, env, context);
};

export default { fetch };
