import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SPECIES_COLORS } from "@/lib/constants";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// "172" → "1.72 m" | "unknown" → "Unknown"
function formatHeight(raw: string): string {
  if (!raw || raw.toLowerCase() === "unknown") return "Unknown";
  const cm = parseFloat(raw);
  if (isNaN(cm)) return "Unknown";
  return `${(cm / 100).toFixed(2)} m`;
}

// "1,358" → "1,358 kg" | "unknown" → "Unknown"
function formatMass(raw: string) {
  if (!raw || raw.toLowerCase() === "unknown") return "Unknown";

  return `${raw} kg`;
}

// "2014-12-09T13:50:51.644000Z" → "09-12-2014"
function formatDate(iso: string) {
  const date = new Date(iso);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  // console.log(formattedDate)
  return formattedDate;
}

// "https://swapi.info/api/people/1/" → "1"
function extractIdFromUrl(url: string) {
  const parts = url.replace(/\/$/, "").split("/");
  return parts[parts.length - 1];
}

// "Droid" → "hsl(42, 80%, 55%)"
function getSpeciesColor(speciesName: string) {
  return SPECIES_COLORS[speciesName] || SPECIES_COLORS["Unknown"];
}

export {
  cn,
  formatHeight,
  formatMass,
  formatDate,
  extractIdFromUrl,
  getSpeciesColor,
};
