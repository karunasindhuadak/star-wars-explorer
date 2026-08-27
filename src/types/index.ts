// ===== API Response Types =====

export interface SwapiPerson {
  name: string;
  height: string; // "172" or "unknown"
  mass: string; // "77" or "1,358" or "unknown"
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string; // "19BBY" or "unknown"
  gender: string;
  homeworld: string; // URL: "https://swapi.info/api/planets/1"
  films: string[]; // Array of URLs
  species: string[]; // Array of URLs (can be empty)
  vehicles: string[];
  starships: string[];
  created: string; // ISO timestamp
  edited: string;
  url: string;
}

export interface SwapiPlanet {
  name: string;
  terrain: string;
  climate: string;
  population: string;
  // ... other fields
}

export interface SwapiSpecies {
  name: string;
  url: string;
  // ... other fields
}

export interface SwapiFilm {
  title: string;
  url: string;
  episode_id: number;
  // ... other fields
}

// ===== App Domain Types =====

interface Character {
  id: string; // Extracted from URL
  name: string;
  height: string;
  mass: string;
  birthYear: string;
  gender: string;
  homeworldUrl: string;
  speciesUrls: string[];
  filmUrls: string[];
  created: string;
  imageUrl: string; // Picsum URL
  speciesName: string; // Resolved species name ("Human", "Droid", etc.)
  speciesColor: string; // CSS color for card
}

interface Homeworld {
  name: string;
  terrain: string;
  climate: string;
  population: string;
}

// ===== Auth Types =====

interface AuthState {
  isAuthenticated: boolean;
  user: { username: string } | null;
  accessToken: string | null;
}

interface LoginCredentials {
  username: string;
  password: string;
}

// ===== Filter Types =====

interface FilterState {
  searchQuery: string;
  selectedSpecies: string | null;
  selectedFilm: string | null;
  selectedHomeworld: string | null;
}
