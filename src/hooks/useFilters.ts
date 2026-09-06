"use client"

import type { Character, FilterState } from "@/types";
import { useMemo } from "react";

export function useFilters(characters: Character[], filterState: FilterState) {
  const filteredCharacters = useMemo(() => {
    const query = filterState.searchQuery.trim().toLowerCase()

    return characters.filter((character) => {
      //Filter 1: Search by name
      const matchesSearch =
        query === "" || character.name.toLowerCase().includes(query)

      //Filter 2: Species dropdown
      const matchesSpecies =
        filterState.selectedSpecies === null || character.speciesName === filterState.selectedSpecies

      //Filter 3: Film dropdown
      const matchesFilm =
        filterState.selectedFilm === null || character.filmUrls.includes(filterState.selectedFilm)

      //Filter 4: Homeworld dropdown
      const matchesHomeworld =
        filterState.selectedHomeworld === null || character.homeworldName === filterState.selectedHomeworld

      // ─── AND logic: ALL must be true ───
      return matchesSearch && matchesSpecies && matchesFilm && matchesHomeworld
    })
  }, [characters, filterState])

  return { filteredCharacters }
}
