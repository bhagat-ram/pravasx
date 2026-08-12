import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as AdminLoginForm } from "./AdminLoginForm-DOHbCjUC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.login-DohPH0zi.js
var import_jsx_runtime = require_jsx_runtime();
function AdminLoginPage() {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-sand px-4 py-16 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto flex min-h-[calc(100vh-8rem)] max-w-md items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mb-5 inline-block text-sm font-bold text-accent",
					children: "← Back to PravasX"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLoginForm, { onSuccess: () => navigate({ to: "/admin" }) })]
			})
		})
	});
}
//#endregion
export { AdminLoginPage as component };
