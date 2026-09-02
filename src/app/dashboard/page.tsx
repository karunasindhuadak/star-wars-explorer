"use client";

import { CharacterCard } from "@/components/CharacterCard";
import { ErrorState } from "@/components/ErrorState";
import { LoadingGrid } from "@/components/LoadingGrid";
import { useCharacters } from "@/hooks/useCharacters";
import { Character } from "@/types";
import { useState } from "react";
import { motion, type Variants } from "framer-motion";

// Stagger Animation Variants
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function DashboardPage() {
  const { characters, isLoading, refetch, error } = useCharacters();
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  if (isLoading) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-8">
        <LoadingGrid />
      </main>
    );
  }
  if (error) {
    <main className="max-w-7xl mx-auto px-4 py-8">
      <ErrorState message={error} onRetry={refetch} />
    </main>;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/*Page Header*/}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-sw-text">Characters</h1>
        <p className="text-sw-text-muted mt-1">{characters.length} characters found</p>
      </div>

      {/*Character Grid*/}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            onClick={() => {
              setSelectedCharacter(character);
              console.log("Character: ", selectedCharacter);
            }}
          />
        ))}
      </motion.div>
    </main>
  );
}
