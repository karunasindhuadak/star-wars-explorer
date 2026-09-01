"use client";

import { Skeleton } from "./ui/skeleton";
import {motion} from "framer-motion"

function SkeletonCard() {
  return (
    <div className="bg-sw-surface border border-sw-border rounded-xl overflow-hidden">
      {/*  Image Placeholder  */}
      <Skeleton className="w-full h-48 rounded-none bg-sw-bg" />

      {/*  Content Placeholder  */}
      <div className="p-4 space-y-3">
        {/* Name */}
        <Skeleton className="h-6 w-3/4 bg-sw-bg" />

        {/* Species Badge */}
        <Skeleton className="h-5 w-20 rounded-full bg-sw-bg" />

        {/* Birth year + Gender row */}
        <div className="flex justify-between pt-1">
          <Skeleton className="h-3 w-16 bg-sw-bg" />
          <Skeleton className="h-3 w-12 bg-sw-bg" />
        </div>
      </div>
    </div>
  );
}

export function LoadingGrid() {
  return (
    <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    transition={{duration: 0.3}}
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {Array.from({ length: 8 }, (_, index) => (
        <SkeletonCard key={index} />
      ))}
    </motion.div>
  );
}
