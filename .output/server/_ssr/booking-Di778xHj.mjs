//#region node_modules/.nitro/vite/services/ssr/assets/booking-Di778xHj.js
var STORAGE_KEY = "pravasx-trip-requests";
function createReference() {
	return `PX-${Date.now().toString(36).toUpperCase().slice(-6)}`;
}
function saveTripRequest(request, matchScore = 94, guide = "Aarav Mehta") {
	const reference = createReference();
	const record = {
		reference,
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		status: "New",
		matchScore,
		guide,
		...request
	};
	const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
	localStorage.setItem(STORAGE_KEY, JSON.stringify([record, ...existing].slice(0, 100)));
	return reference;
}
function getTripRequests() {
	if (typeof window === "undefined") return [];
	return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}
function updateTripStatus(reference, status) {
	const updated = getTripRequests().map((item) => item.reference === reference ? {
		...item,
		status
	} : item);
	localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
	return updated;
}
function buildWhatsAppUrl(request, reference, guide = "Aarav Mehta") {
	const message = [
		"Hi PravasX, I want to plan a guided trip.",
		`Reference: ${reference}`,
		`Name: ${request.name}`,
		`Phone: ${request.phone}`,
		`Destination: ${request.destination}`,
		`Pickup: ${request.pickup}`,
		`Date: ${request.date}`,
		`Time: ${request.time}`,
		`Duration: ${request.duration}`,
		`Travellers: ${request.travellers}`,
		`Budget: ${request.budget}`,
		`Style: ${request.travelStyle}`,
		`Interests: ${request.interests.join(", ")}`,
		`Pace: ${request.pace}`,
		`Guide language: ${request.guideLanguage}`,
		`Suggested local: ${guide}`,
		request.notes ? `Notes: ${request.notes}` : ""
	].filter(Boolean).join("\n");
	return `https://wa.me/919970348409?text=${encodeURIComponent(message)}`;
}
//#endregion
export { updateTripStatus as i, getTripRequests as n, saveTripRequest as r, buildWhatsAppUrl as t };
