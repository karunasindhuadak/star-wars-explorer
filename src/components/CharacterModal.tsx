import { useHomeworld } from "@/hooks/useHomeworld";
import type { Character } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {motion} from "framer-motion"
import { formatDate, formatHeight, formatMass } from "@/lib/utils";
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
      <DialogContent className="bg-sw-surface border-sw-border text-sw-text max-w-lg">
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
                <Skeleton className="h-5 w-3/4 bg-sw-border"/>
              </div>
            ) : (
                <motion.p
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.3}}
                className="text-lg font-medium text-sw-text"
                >
                  {homeworld}
                </motion.p>
            )}
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
