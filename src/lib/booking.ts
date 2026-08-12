export type TripRequest = {
  name: string;
  phone: string;
  destination: string;
  pickup: string;
  date: string;
  time: string;
  duration: string;
  travellers: string;
  budget: string;
  travelStyle: string;
  interests: string[];
  pace: string;
  guideLanguage: string;
  notes: string;
};

export type StoredTripRequest = TripRequest & {
  reference: string;
  createdAt: string;
  status: "New" | "Contacted" | "Confirmed" | "Completed" | "Cancelled";
  matchScore: number;
  guide: string;
};

const STORAGE_KEY = "pravasx-trip-requests";

export function createReference() {
  return `PX-${Date.now().toString(36).toUpperCase().slice(-6)}`;
}

export function saveTripRequest(request: TripRequest, matchScore = 94, guide = "Aarav Mehta") {
  const reference = createReference();
  const record: StoredTripRequest = {
    reference,
    createdAt: new Date().toISOString(),
    status: "New",
    matchScore,
    guide,
    ...request,
  };
  const existing: StoredTripRequest[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  localStorage.setItem(STORAGE_KEY, JSON.stringify([record, ...existing].slice(0, 100)));
  return reference;
}

export function getTripRequests(): StoredTripRequest[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

export function updateTripStatus(reference: string, status: StoredTripRequest["status"]) {
  const updated = getTripRequests().map((item) => (item.reference === reference ? { ...item, status } : item));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function buildWhatsAppUrl(request: TripRequest, reference: string, guide = "Aarav Mehta") {
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
    request.notes ? `Notes: ${request.notes}` : "",
  ].filter(Boolean).join("\n");

  return `https://wa.me/919970348409?text=${encodeURIComponent(message)}`;
}
