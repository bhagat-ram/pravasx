globalThis.__nitro_main__ = import.meta.url;
import { n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.png": {
		"type": "image/png",
		"etag": "\"1337-4/Io/wPC2ov0ZU7KSvGCcoHgJw0\"",
		"mtime": "2026-08-12T18:24:25.600Z",
		"size": 4919,
		"path": "../public/favicon.png"
	},
	"/assets/admin-CbUGAOwq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2845-jIhIejtk03qyaUVUNkgB4OxkTuo\"",
		"mtime": "2026-08-12T18:52:17.522Z",
		"size": 10309,
		"path": "../public/assets/admin-CbUGAOwq.js"
	},
	"/assets/AdminLoginForm-fTDIeG7Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cfa-G8Ir6z3ChBmKji4p0MdnvkCY6IU\"",
		"mtime": "2026-08-12T18:52:17.520Z",
		"size": 7418,
		"path": "../public/assets/AdminLoginForm-fTDIeG7Q.js"
	},
	"/assets/admin.login-Dtu3hIsv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"242-VwUH2TwUWHa/h0XuaYaPAFduTI8\"",
		"mtime": "2026-08-12T18:52:17.522Z",
		"size": 578,
		"path": "../public/assets/admin.login-Dtu3hIsv.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-08-12T18:24:25.591Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/hero-CTOT-pqt.jpg": {
		"type": "image/jpeg",
		"etag": "\"32b64-ofqRS3CMV8j2VxE8fH3yIaSDRQc\"",
		"mtime": "2026-08-12T18:52:17.523Z",
		"size": 207716,
		"path": "../public/assets/hero-CTOT-pqt.jpg"
	},
	"/assets/pravasx-logo-BRB_VQEp.webp": {
		"type": "image/webp",
		"etag": "\"387e-U4Wfv92LxQCw/3f64VXjYQnB3tU\"",
		"mtime": "2026-08-12T18:52:17.524Z",
		"size": 14462,
		"path": "../public/assets/pravasx-logo-BRB_VQEp.webp"
	},
	"/assets/pune-C2rP0iik.jpg": {
		"type": "image/jpeg",
		"etag": "\"2e53-ewOvJ7iY6kmLUwrqe4LlApqZNrY\"",
		"mtime": "2026-08-12T18:52:17.525Z",
		"size": 11859,
		"path": "../public/assets/pune-C2rP0iik.jpg"
	},
	"/assets/Reveal-Cpk_mJH_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"75e-Ia3f4SGDQ4n+YcOzGWbj7DV0pqQ\"",
		"mtime": "2026-08-12T18:52:17.521Z",
		"size": 1886,
		"path": "../public/assets/Reveal-Cpk_mJH_.js"
	},
	"/assets/mumbai-DvzhLE1Q.jpg": {
		"type": "image/jpeg",
		"etag": "\"d36b-CG/c0DK7zHZ48KH1y2NloWLx5Rw\"",
		"mtime": "2026-08-12T18:52:17.524Z",
		"size": 54123,
		"path": "../public/assets/mumbai-DvzhLE1Q.jpg"
	},
	"/assets/routes-Cddcg6le.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"abf2-OJUee/9c0PE+FDSBDOvkzCEzVWU\"",
		"mtime": "2026-08-12T18:52:17.523Z",
		"size": 44018,
		"path": "../public/assets/routes-Cddcg6le.js"
	},
	"/assets/about-D4Z52ZmZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1964-hJrNLRARUVuobwt+j50C4B3lcsw\"",
		"mtime": "2026-08-12T18:52:17.521Z",
		"size": 6500,
		"path": "../public/assets/about-D4Z52ZmZ.js"
	},
	"/assets/shield-check-BHb_uOrC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"135-DHH8RyNFFVdZwcnLFHOTXw+Y8UQ\"",
		"mtime": "2026-08-12T18:52:17.523Z",
		"size": 309,
		"path": "../public/assets/shield-check-BHb_uOrC.js"
	},
	"/assets/sambhajinagar-Ds9e9Saj.jpg": {
		"type": "image/jpeg",
		"etag": "\"8b27-diTsDuFFDE70lIQ0Tlr/zaQ+/60\"",
		"mtime": "2026-08-12T18:52:17.525Z",
		"size": 35623,
		"path": "../public/assets/sambhajinagar-Ds9e9Saj.jpg"
	},
	"/assets/booking-Cpe11Moj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"627-pfTimlGqRGdo1IVaOyjMW6xYoro\"",
		"mtime": "2026-08-12T18:52:17.522Z",
		"size": 1575,
		"path": "../public/assets/booking-Cpe11Moj.js"
	},
	"/assets/styles-CC8jfd5b.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"175c6-1Ixxr8ByFZ607aN1EIDu0MJ1MZk\"",
		"mtime": "2026-08-12T18:52:17.525Z",
		"size": 95686,
		"path": "../public/assets/styles-CC8jfd5b.css"
	},
	"/assets/index-CJTOJKRe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"66bda-MFzbcGEx2DurGSUvGFC40UvDB1k\"",
		"mtime": "2026-08-12T18:52:17.520Z",
		"size": 420826,
		"path": "../public/assets/index-CJTOJKRe.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_x4Xuy9 = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_x4Xuy9
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
