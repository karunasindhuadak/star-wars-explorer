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
  onF
}
