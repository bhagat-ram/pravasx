import { i as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { _ as require_jsx_runtime, v as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as ShieldCheck, m as LockKeyhole } from "../_libs/lucide-react.mjs";
import { t as Button } from "./router-BJYadRjh.mjs";
import { i as getServerFnById, n as createServerFn, t as TSS_SERVER_FUNCTION } from "./server-DD_XEmkH.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AdminLoginForm-DOHbCjUC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var loginSchema = objectType({
	username: stringType().trim().min(1).max(100),
	password: stringType().min(1).max(200)
});
var getAdminSession = createServerFn({ method: "GET" }).handler(createSsrRpc("5657035a0ee6556f722dba234784a0e3c2460389c82b35f94de2f5440bef5f56"));
var loginAdmin = createServerFn({ method: "POST" }).validator(loginSchema).handler(createSsrRpc("b30f690c7c4db6ee5c0d491cd43f1c8eb07322a9bac537eba1f13ddbb4f26745"));
var logoutAdmin = createServerFn({ method: "POST" }).handler(createSsrRpc("714b8bdd6e41622ea8c921b2022f0a7efd279b2c04f4ab839072930e553f0a5c"));
function AdminLoginForm({ onSuccess }) {
	const [username, setUsername] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	async function handleSubmit(event) {
		event.preventDefault();
		setError("");
		setLoading(true);
		try {
			const result = await loginAdmin({ data: {
				username,
				password
			} });
			if (!result.ok) {
				setError(result.error);
				return;
			}
			onSuccess?.();
		} catch (err) {
			console.error(err);
			setError("Unable to sign in right now. Please try again.");
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "w-full rounded-[2rem] border bg-card p-7 shadow-elevated sm:p-9",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-6 w-6" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-5 font-display text-3xl font-extrabold",
				children: "Admin sign in"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted-foreground",
				children: "This area is restricted to authorized PravasX operators."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-8 space-y-5",
				onSubmit: handleSubmit,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-bold",
							children: "Username"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							autoComplete: "username",
							className: "mt-2 h-12 w-full rounded-xl border bg-background px-4 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15",
							value: username,
							onChange: (event) => setUsername(event.target.value),
							placeholder: "Admin username",
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-bold",
							children: "Password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							autoComplete: "current-password",
							className: "mt-2 h-12 w-full rounded-xl border bg-background px-4 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15",
							value: password,
							onChange: (event) => setPassword(event.target.value),
							placeholder: "Admin password",
							required: true
						})]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						role: "alert",
						className: "rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm font-semibold text-destructive",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						variant: "brand",
						className: "h-12 w-full",
						disabled: loading,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { className: "h-4 w-4" }), loading ? "Signing in…" : "Sign in to dashboard"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 rounded-2xl bg-secondary p-4 text-xs leading-relaxed text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					className: "text-foreground",
					children: "Local demo:"
				}), " use the credentials shown in the project README. For production, set the admin credentials and session secret through environment variables."]
			})
		]
	});
}
//#endregion
export { getAdminSession as n, logoutAdmin as r, AdminLoginForm as t };
