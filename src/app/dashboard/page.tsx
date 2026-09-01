"use client"

import { LoadingGrid } from "@/components/LoadingGrid"
import { useCharacters } from "@/hooks/useCharacters"

export default function DashboardPage() {
  // const { characters, films, planets, species, isLoading, error } = useCharacters();

  // console.log("Characters: ", characters)
  // console.log("Films: ", films)
  // console.log("Planets: ", planets)
  // console.log("Species: ", species)
  // console.log("Loading: ", isLoading)
  // console.log("Error: ", error)

  return (
    <LoadingGrid/>
  )
}
