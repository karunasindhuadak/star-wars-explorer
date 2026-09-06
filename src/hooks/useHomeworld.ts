"use client"

import { fetchPlanet } from "@/lib/api";
import type { Homeworld } from "@/types";
import { useEffect, useRef, useState } from "react"


// URL -> full object(Homeworld)
const planetCache = new Map<string, Homeworld>()

export function useHomeworld(url: string) {
  const [homeworld, setHomeworld] = useState<Homeworld | null>(null)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchedUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (!url) return
    if(fetchedUrlRef.current === url) return
    
    const cached = planetCache.get(url)
    if (cached) {
      setHomeworld(cached)
      setIsLoading(false)
      setError(null)
      fetchedUrlRef.current = url
      return
    }

    let cancelled = false;
    fetchedUrlRef.current = url
    async function loadPlanet() {
      setIsLoading(true)
      setError(null)

      try {
        const planet = await fetchPlanet(url)

        // Build the Homeworld object 
        const homeworldData: Homeworld = {
          name: planet.name,
          terrain: planet.terrain,
          climate: planet.climate,
          population: planet.population,
        }

        if (!cancelled) {
          planetCache.set(url, homeworldData)  // Cache the full object
          setHomeworld(homeworldData)           // Store the full object
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load homeworld")
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    loadPlanet()

    return () => {
      cancelled = true
    }
  }, [url])

  return {
    homeworld,
    isLoading,
    error
  }
}

