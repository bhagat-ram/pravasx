import { i as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { _ as require_jsx_runtime, v as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as cn } from "./router-BJYadRjh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Reveal-2X68XO8D.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var hero_default = "/assets/hero-CTOT-pqt.jpg";
/** Reveals an element once it scrolls into view. */
function useReveal(threshold = .15) {
	const ref = (0, import_react.useRef)(null);
	const [visible, setVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		if (typeof IntersectionObserver === "undefined") {
			setVisible(true);
			return;
		}
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setVisible(true);
					observer.disconnect();
				}
			});
		}, {
			threshold,
			rootMargin: "0px 0px -60px 0px"
		});
		observer.observe(el);
		return () => observer.disconnect();
	}, [threshold]);
	return {
		ref,
		visible
	};
}
function Reveal({ children, delay = 0, className, as: Tag = "div" }) {
	const { ref, visible } = useReveal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
		ref,
		"data-visible": visible,
		style: { transitionDelay: `${delay}ms` },
		className: cn("reveal", className),
		children
	});
}
//#endregion
export { hero_default as n, Reveal as t };
