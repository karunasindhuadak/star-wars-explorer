"use client"

import type { Character, FilterState } from "@/types";
import { useMemo } from "react";

export function useFilters(characters: Character[], filterState: FilterState) {
  const filteredCharacters  = useMemo(() => {
    const query = filterState.searchQuery.trim().toLowerCase()

    return characters.filter((character) => {
      const matchesSearch = query === "" || character.name.toLowerCase().includes(query)

      return matchesSearch
    })
  }, [characters, filterState])

  return {filteredCharacters}
}
