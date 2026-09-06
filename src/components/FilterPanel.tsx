"use client"

import type { FilterState, SwapiFilm, SwapiPlanet } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface FilterPanelProps {
  species: string[];           
  films: SwapiFilm[];           
  planets: SwapiPlanet[];       
  filterState: FilterState;
  onFilterChange: (updates: Partial<FilterState>) => void
  onClearFilters: () => void
}

export function FilterPanel({species, films, planets, filterState, onFilterChange, onClearFilters}: FilterPanelProps)  {
  const activeFilterCount = [
    filterState.selectedSpecies,
    filterState.selectedFilm,
    filterState.selectedHomeworld
  ].filter(Boolean).length

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Species Dropdown */}
      <Select
        value={filterState.selectedSpecies ?? "all"}
        onValueChange={(value) => {
          onFilterChange({selectedSpecies: value === "all" ? null : value})
        }}
      >
        <SelectTrigger aria-label="Filter by species" className="bg-sw-surface border-sw-border text-sw-text min-w-[140px]">
          <SelectValue placeholder="Species"/>
        </SelectTrigger>
        <SelectContent className="bg-sw-surface border-sw-border">
          <SelectItem value="all" className="text-sw-text-muted">
            All Species
          </SelectItem>
          {species.map((name) => (
            <SelectItem key={name} value={name} className="text-sw-text">
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Film Dropdown */}
      <Select
        value={filterState.selectedFilm ?? "all"}
        onValueChange={(value) => {
          onFilterChange({selectedFilm: value === "all" ? null : value})
        }}
      >
        <SelectTrigger aria-label="Filter by film" className="bg-sw-surface border-sw-border text-sw-text min-w-[140px]">
          <SelectValue placeholder="Film"/>
        </SelectTrigger>
        <SelectContent className="bg-sw-surface border-sw-border">
          <SelectItem value="all" className="text-sw-text-muted">
            All Films
          </SelectItem>
          {films
            .sort((a, b) => a.episode_id - b.episode_id)
            .map((film) => (
              <SelectItem key={film.url} value={film.url} className="text-sw-text">
                {film.title}
              </SelectItem>
            ))
          }
        </SelectContent>
      </Select>

      {/* Homeworld Dropdown */}
      <Select
        value={filterState.selectedHomeworld ?? "all"}
        onValueChange={(value) => {
          onFilterChange({selectedHomeworld: value === "all" ? null : value})
        }}
      >
        <SelectTrigger aria-label="Filter by homeworld" className="bg-sw-surface border-sw-border text-sw-text min-w-[140px]">
          <SelectValue placeholder="Homeworld"/>
        </SelectTrigger>
        <SelectContent className="bg-sw-surface border-sw-border max-h-60">
          <SelectItem value="all" className="text-sw-text-muted">
            All Homeworlds
          </SelectItem>
          {planets
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((planet) => (
              <SelectItem key={planet.name} value={planet.name} className="text-sw-text">
                {planet.name}
              </SelectItem>
            ))
          }
        </SelectContent>
      </Select>

      {/* Active Filter Count + Clear All */}
      {activeFilterCount > 0 && (
        <div className="flex items-center gap-2 ml-2">
          <Badge variant="secondary" className="bg-amber-500/20 text-amber-400 border-none">
            {activeFilterCount} active
          </Badge>
          <button
            onClick={onClearFilters}
            className="text-sm text-sw-text-muted hover:text-amber-400 transition-colors"
          >
            Clear All
          </button>
        </div>
      )} 
    </div>
  )
}
