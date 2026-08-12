import { i as __toESM } from "./rolldown-runtime-D7D4PA-g.mjs";
import { _ as require_jsx_runtime, v as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Eye, a as ShieldCheck, b as CircleCheck, o as RefreshCw, r as Users, u as MessageCircle, w as ChartColumn, y as Clock3 } from "../_libs/lucide-react.mjs";
import { t as Button } from "./router-BJYadRjh.mjs";
import { n as getAdminSession, r as logoutAdmin, t as AdminLoginForm } from "./AdminLoginForm-DOHbCjUC.mjs";
import { i as updateTripStatus, n as getTripRequests } from "./booking-Di778xHj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-B7b1qFnm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var statuses = [
	"New",
	"Contacted",
	"Confirmed",
	"Completed",
	"Cancelled"
];
function seedDemo() {
	if (getTripRequests().length) return;
	const demo = [{
		reference: "PX-DEMO01",
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		status: "New",
		matchScore: 94,
		guide: "Aarav Mehta",
		name: "Demo Traveller",
		phone: "+91 90000 00000",
		destination: "Mumbai",
		pickup: "Bandra",
		date: "2026-08-22",
		time: "10:00",
		duration: "8 hours",
		travellers: "2",
		budget: "₹2,500–₹5,000",
		travelStyle: "Local & slow",
		interests: ["Culture", "Food"],
		pace: "Balanced",
		guideLanguage: "Hindi",
		notes: "First-time Mumbai visit"
	}, {
		reference: "PX-DEMO02",
		createdAt: (/* @__PURE__ */ new Date(Date.now() - 864e5)).toISOString(),
		status: "Confirmed",
		matchScore: 91,
		guide: "Riya Kulkarni",
		name: "Demo Family",
		phone: "+91 91111 11111",
		destination: "Pune",
		pickup: "Pune Station",
		date: "2026-08-25",
		time: "09:30",
		duration: "4 hours",
		travellers: "3–4",
		budget: "₹2,500–₹5,000",
		travelStyle: "Food-first",
		interests: ["Food", "Culture"],
		pace: "Slow & flexible",
		guideLanguage: "English",
		notes: "Vegetarian food"
	}];
	localStorage.setItem("pravasx-trip-requests", JSON.stringify(demo));
}
function AdminLoginGate({ onSuccess }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLoginForm, { onSuccess });
}
function Admin() {
	const [authenticated, setAuthenticated] = (0, import_react.useState)(null);
	const [requests, setRequests] = (0, import_react.useState)([]);
	const [filter, setFilter] = (0, import_react.useState)("All");
	const [selected, setSelected] = (0, import_react.useState)(null);
	const navigate = useNavigate();
	const refresh = () => setRequests(getTripRequests());
	const counts = (0, import_react.useMemo)(() => ({
		total: requests.length,
		new: requests.filter((r) => r.status === "New").length,
		confirmed: requests.filter((r) => r.status === "Confirmed").length,
		completed: requests.filter((r) => r.status === "Completed").length
	}), [requests]);
	const checkSession = async () => {
		try {
			const session = await getAdminSession();
			setAuthenticated(session.authenticated);
			if (session.authenticated) {
				seedDemo();
				refresh();
			}
		} catch (error) {
			console.error(error);
			setAuthenticated(false);
		}
	};
	(0, import_react.useEffect)(() => {
		checkSession();
	}, []);
	if (authenticated === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-sand px-4 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto flex min-h-[70vh] max-w-md items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border bg-card px-6 py-8 text-center shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm font-semibold text-muted-foreground",
					children: "Checking admin session…"
				})]
			})
		})
	});
	if (!authenticated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-sand px-4 py-16 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto flex min-h-[calc(100vh-8rem)] max-w-md items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "mb-5 inline-block text-sm font-bold text-accent",
						children: "← Back to PravasX"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-4 rounded-xl border bg-card px-4 py-3 text-xs font-semibold text-muted-foreground",
						children: "Admin access is protected. Sign in below to continue."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLoginGate, { onSuccess: () => {
						checkSession();
					} }) })
				]
			})
		})
	});
	const visible = requests.filter((r) => filter === "All" || r.status === filter);
	function changeStatus(reference, status) {
		updateTripStatus(reference, status);
		refresh();
		if (selected?.reference === reference) setSelected((current) => current ? {
			...current,
			status
		} : current);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-sand pb-16 pt-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-between gap-5 md:flex-row md:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "text-sm font-bold text-accent",
							children: "← Back to PravasX"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 font-display text-3xl font-extrabold sm:text-4xl",
							children: "Operations dashboard"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Trip requests, guide matching and booking status — all in one place."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: refresh,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4" }), " Refresh"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: async () => {
								await logoutAdmin();
								await navigate({ to: "/admin/login" });
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4" }), " Sign out"]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						{
							icon: ChartColumn,
							label: "Total requests",
							value: counts.total
						},
						{
							icon: Clock3,
							label: "New",
							value: counts.new
						},
						{
							icon: CircleCheck,
							label: "Confirmed",
							value: counts.confirmed
						},
						{
							icon: Users,
							label: "Completed",
							value: counts.completed
						}
					].map(({ icon: Icon, label, value }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border bg-card p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5 text-accent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 text-xs font-bold uppercase tracking-wider text-muted-foreground",
								children: label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-display text-3xl font-extrabold",
								children: value
							})
						]
					}, label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 flex flex-wrap gap-2",
					children: ["All", ...statuses].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setFilter(s),
						className: `rounded-full border px-4 py-2 text-xs font-bold ${filter === s ? "bg-navy text-white" : "bg-card"}`,
						children: s
					}, s))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 overflow-hidden rounded-[2rem] border bg-card shadow-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full min-w-[850px] text-left text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "bg-secondary text-xs uppercase tracking-wider text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-5 py-4",
										children: "Request"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-5 py-4",
										children: "Trip"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-5 py-4",
										children: "Match"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-5 py-4",
										children: "Guide"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-5 py-4",
										children: "Status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-5 py-4",
										children: "Action"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
								className: "divide-y",
								children: [visible.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-secondary/50",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-5 py-5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-bold",
												children: r.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-1 text-xs text-muted-foreground",
												children: [
													r.reference,
													" · ",
													r.phone
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-5 py-5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-semibold",
												children: r.destination
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-1 text-xs text-muted-foreground",
												children: [
													r.date,
													" · ",
													r.duration
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-5 py-5",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent",
												children: [r.matchScore, "%"]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-5 py-5 font-semibold",
											children: r.guide
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-5 py-5",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
												value: r.status,
												onChange: (e) => changeStatus(r.reference, e.target.value),
												className: "rounded-lg border bg-background px-2 py-2 text-xs font-semibold",
												children: statuses.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s }, s))
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-5 py-5",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => setSelected(r),
												className: "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-bold",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" }), " View"]
											})
										})
									]
								}, r.reference)), visible.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									colSpan: 6,
									className: "px-5 py-14 text-center text-muted-foreground",
									children: "No requests in this status."
								}) })]
							})]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex items-center gap-2 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-accent" }), " Admin access is protected by a server-issued HTTP-only session cookie. Trip demo data remains in browser storage for evaluation."]
				})
			]
		}), selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-[60] flex items-center justify-center bg-navy/60 p-4 backdrop-blur-sm",
			onClick: () => setSelected(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-card p-6 shadow-elevated sm:p-8",
				onClick: (e) => e.stopPropagation(),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold uppercase tracking-wider text-accent",
							children: selected.reference
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-2xl font-extrabold",
							children: selected.name
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSelected(null),
							className: "rounded-full border px-3 py-1 text-sm",
							children: "Close"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-7 grid gap-3 sm:grid-cols-2",
						children: [
							["Destination", selected.destination],
							["Pickup", selected.pickup],
							["Date / time", `${selected.date} · ${selected.time}`],
							["Travellers", selected.travellers],
							["Budget", selected.budget],
							["Travel style", selected.travelStyle],
							["Guide language", selected.guideLanguage],
							["Pace", selected.pace]
						].map(([a, b]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-secondary p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
								children: a
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-semibold",
								children: b
							})]
						}, a))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 rounded-2xl border p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
								children: "Interests"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-semibold",
								children: selected.interests.join(" · ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 text-xs font-bold uppercase tracking-wider text-muted-foreground",
								children: "Notes"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted-foreground",
								children: selected.notes || "No extra notes."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-col gap-3 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "brand",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `https://wa.me/${selected.phone.replace(/\D/g, "")}`,
								target: "_blank",
								rel: "noreferrer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }), " Contact customer"]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => changeStatus(selected.reference, "Confirmed"),
							children: "Mark confirmed"
						})]
					})
				]
			})
		})]
	});
}
//#endregion
export { Admin as component };
