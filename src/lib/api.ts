import { CharacterImage, SwapiFilm, SwapiPerson, SwapiPlanet, SwapiSpecies } from "@/types";
import { CHARACTER_IMAGE_BASE_URL, SWAPI_BASE_URL } from "./constants";

export async function fetchAllPeople(): Promise<SwapiPerson[]> {
  const response = await fetch(`${SWAPI_BASE_URL}/people`);

  if (!response.ok) {
    throw new Error(`Failed to fetch characters: ${response.status}`);
  }

  const data = await response.json();

  return data as SwapiPerson[];
}

export async function fetchAllSpecies(): Promise<SwapiSpecies[]> {
  const response = await fetch(`${SWAPI_BASE_URL}/species`);

  if (!response.ok) {
    throw new Error(`Failed to fetch species: ${response.status}`);
  }

  const data = await response.json();
  return data as SwapiSpecies[];
}

export async function fetchAllFilms(): Promise<SwapiFilm[]> {
  const response = await fetch(`${SWAPI_BASE_URL}/films`);

  if (!response.ok) {
    throw new Error(`Failed to fetch films: ${response.status}`);
  }

  const data = await response.json();
  return data as SwapiFilm[];
}

export async function fetchAllPlanets(): Promise<SwapiPlanet[]> {
  const response = await fetch(`${SWAPI_BASE_URL}/planets`);

  if (!response.ok) {
    throw new Error(`Failed to fetch all planets: ${response.status}`);
  }

  const  data = await response.json()
  return data as SwapiPlanet[]
}

export async function fetchPlanet(url: string): Promise<SwapiPlanet> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch planet: ${response.status}`);
  }

  const data = await response.json()
  return data as SwapiPlanet
}

export async function fetchCharacterImages(): Promise<Map<string, string>> {
  try {
    const response = await fetch(CHARACTER_IMAGE_BASE_URL);
    
    if (!response.ok) return new Map()
    
    const data: CharacterImage[] = await response.json()
    const imageMap = new Map<string, string>()

    data.forEach((item) => {
      if (item.name && item.image) {
        imageMap.set(item.name.toLowerCase().trim(), item.image)
      }
    })

    return imageMap
  } catch {
    return new Map()
  }
}
