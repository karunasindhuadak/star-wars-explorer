"use client";

import { CharacterCard } from "@/components/CharacterCard";
import { ErrorState } from "@/components/ErrorState";
import { LoadingGrid } from "@/components/LoadingGrid";
import { useCharacters } from "@/hooks/useCharacters";
import { Character } from "@/types";
import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { usePagination } from "@/hooks/usePagination";
import { PAGE_SIZE } from "@/lib/constants";
import { Pagination } from "@/components/Pagination";
import { CharacterModal } from "@/components/CharacterModal";
import { Navbar } from "@/components/Navbar";
import { SearchBar } from "@/components/SearchBar";

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
  const { paginatedItems, currentPage, totalPages, goToPage, nextPage, prevPage } = usePagination(
    characters,
    PAGE_SIZE,
  );
  const [searchQuery, setSearchQuery] = useState("")

  if (isLoading) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-8">
        <LoadingGrid />
      </main>
    );
  }
  if (error) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-8">
        <ErrorState message={error} onRetry={refetch} />
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <SearchBar onSearch={setSearchQuery}/>
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
          key={currentPage} // Forces stagger animation to replay on page change
        >
          {paginatedItems.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onClick={() => {
                setSelectedCharacter(character);
                console.log("Character: ", character.name);
              }}
            />
          ))}
        </motion.div>

        {/*Pagination Controls */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={characters.length}
          pageSize={PAGE_SIZE}
          onPageChange={goToPage}
          onNext={nextPage}
          onPrev={prevPage}
        />

        {/*Character Modal */}
        <CharacterModal
          character={selectedCharacter}
          open={selectedCharacter !== null}
          onClose={() => setSelectedCharacter(null)}
        />
      </main>
    </>
  );
}
