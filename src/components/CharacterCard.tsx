import type { Character } from "@/types";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { motion, type Variants } from "framer-motion";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

interface CharacterCardProps {
  character: Character;
  onClick: () => void;
}

export function CharacterCard({ character, onClick }: CharacterCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        scale: 1.03,
        boxShadow: `0 8px 30px ${character.speciesColor}25`,
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-sw-surface border border-sw-border rounded-xl cursor-pointer overflow-hidden transition-colors hover:border-sw-accent/30"
      style={{ borderLeftWidth: "3px", borderLeftColor: character.speciesColor }}
    >
      {/*----Character Image----*/}
      <div className="relative w-full h-48 bg-sw-bg overflow-hidden">
        <Image
          src={character.imageUrl}
          alt={character.name}
          fill
          unoptimized
          referrerPolicy="no-referrer"
          loading="eager"
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          onError={(e) => {
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(character.name)}&size=200&background=1e2540&color=e2e8f0&font-size=0.33`;
          }}
        />
      </div>

      {/*----Card Content----*/}
      <div className="p-4 space-y-2">
        {/* Character Name */}
        <h3 className="text-sw-text font-heading font-semibold text-lg truncate">
          {character.name}
        </h3>

        {/* Species Badge */}
        <Badge
          className="border-0 text-xs font-medium"
          style={{
            backgroundColor: `color-mix(in srgb ${character.speciesColor} 15%, transparent)`,
            color: character.speciesColor,
          }}
        >
          {character.speciesName}
        </Badge>

        {/* Quick Info */}
        <div className="flex justify-between pt-1 text-xs text-sw-text-muted">
          <span>{character.birthYear !== "unknown" ? character.birthYear : "Unknown"}</span>
          <span className="capitalize">{character.gender}</span>
        </div>
      </div>
    </motion.div>
  );
}
