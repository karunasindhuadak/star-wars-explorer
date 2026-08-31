"use client";

import { fetchAllFilms, fetchAllPeople, fetchAllPlanets, fetchAllSpecies } from "@/lib/api";
import { extractIdFromUrl, getSpeciesColor } from "@/lib/utils";
import type { Character, SwapiFilm, SwapiPerson, SwapiPlanet, SwapiSpecies } from "@/types";
import { useCallback, useEffect, useState } from "react";

export function useCharacters() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [species, setSpecies] = useState<string[]>([]);
  const [films, setFilms] = useState<SwapiFilm[]>([]);
  const [planets, setPlanets] = useState<SwapiPlanet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function fetchData() {
      try {
        const results = await Promise.allSettled([
          fetchAllPeople(),
          fetchAllSpecies(),
          fetchAllFilms(),
          fetchAllPlanets(),
        ]);

        if (cancelled) return;

        const peopleData: SwapiPerson[] = results[0].status === "fulfilled" ? results[0].value : [];
        const speciesData: SwapiSpecies[] =
          results[1].status === "fulfilled" ? results[1].value : [];
        const filmsData: SwapiFilm[] = results[2].status === "fulfilled" ? results[2].value : [];
        const planetsData: SwapiPlanet[] =
          results[3].status === "fulfilled" ? results[3].value : [];

        if (results[0].status === "rejected") {
          throw new Error("Failed to fetch characters. Please try again.");
        }

        const speciesMap = new Map<string, string>();
        speciesData.forEach((s) => {
          speciesMap.set(s.url, s.name);
        });

        const transformedCharacters: Character[] = peopleData.map((person) => {
          const id = extractIdFromUrl(person.url);

          const speciesName =
            person.species.length > 0 ? speciesMap.get(person.species[0]) || "Unknown" : "Unknown";

          const speciesColor = getSpeciesColor(speciesName);

          const imageUrl = `https://picsum.photos/seed/${id}-${person.name}/200/300`;

          return {
            id,
            name: person.name,
            height: person.height,
            mass: person.mass,
            birthYear: person.birth_year,
            gender: person.gender,
            homeworldUrl: person.homeworld,
            speciesUrls: person.species,
            filmUrls: person.films,
            created: person.created,
            imageUrl,
            speciesName,
            speciesColor,
          };
        });

        const uniqueSpecies = Array.from(
          new Set(transformedCharacters.map((c) => c.speciesName)),
        ).sort();

        setCharacters(transformedCharacters);
        setFilms(filmsData);
        setPlanets(planetsData);
        setSpecies(uniqueSpecies);
        setError(null);
      } catch (err) {
        //In catch, err could be anything (Error object, string, number, etc.). instanceof Error checks if it's actually an Error object before accessing .message. This prevents crashes if something weird was thrown.
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "An unexpected error occurred");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true; //TODO Doubts
    };
  }, [fetchTrigger]);


  // Refetch function (for retry button)
  const refetch = useCallback(() => {
    setIsLoading(true);
    setError(null);
    setFetchTrigger((prev) => prev + 1);
  }, []);

  return {
    characters,
    films,
    planets,
    species,
    isLoading,
    error,
    refetch,
  };
}
