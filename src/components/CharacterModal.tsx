import { useHomeworld } from "@/hooks/useHomeworld";
import type { Character } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {motion} from "framer-motion"
import { formatDate, formatHeight, formatMass, formatPopulation } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";


interface CharacterModalProps {
  character: Character | null;
  open: boolean;
  onClose: () => void;
}

export function CharacterModal({character, open, onClose}:CharacterModalProps) {
  const {homeworld, isLoading: homeworldLoading } = useHomeworld(character?.homeworldUrl ?? "")

  if(!character) return null

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if(!isOpen) onClose()
      }}
    >
      <DialogContent className="bg-sw-surface border-sw-border text-sw-text max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle
            className="text-2xl font-heading font-bold"
            style={{color: character.speciesColor}}
          >
            {character.name}
          </DialogTitle>
        </DialogHeader>

        <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y:0}}
        transition={{duration: 0.3, ease: "easeOut"}}
        className="space-y-5"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <StatItem label="Height" value={formatHeight(character.height)} />
            <StatItem label="Mass" value={formatMass(character.mass)} />
            <StatItem label="Birth Year" value={character.birthYear !== "unknown" ? character.birthYear : "Unknown"} />
            <StatItem label="Gender" value={character.gender} />
            <StatItem label="Films" value={`${character.filmUrls.length} film${character.filmUrls.length !== 1 ? "s" : ""}`} />
            <StatItem label="Added" value={formatDate(character.created)} />
          </div>

          <Separator className="bg-sw-border" />

          {/*Homeworld Section*/}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-sw-text-muted uppercase tracking-wider">
              Homeworld
            </h4>

            {homeworldLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-5 w-3/4 bg-sw-border"/>
                <Skeleton className="h-5 w-1/2 bg-sw-border"/>
                <Skeleton className="h-5 w-2/3 bg-sw-border"/>
              </div>
            ) : homeworld ? (
                <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.3}}
                className="grid grid-cols-2 gap-4"
                >
                  <StatItem label="Planet" value={homeworld.name} />
                  <StatItem label="Terrain" value={homeworld.terrain} />
                  <StatItem label="Climate" value={homeworld.climate} />
                  <StatItem label="Residents" value={formatPopulation(homeworld.population)} />
                </motion.div>
            ) : null}
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}


function StatItem({label, value}: {label: string, value: string}) {
  return (
    <div>
      <p className="text-xs text-sw-text-muted uppercase tracking-wider">{label}</p>
      <p className="text-sm font-medium text-sw-text capitalize mt-0.5">{value}</p>
    </div>
  )
}


