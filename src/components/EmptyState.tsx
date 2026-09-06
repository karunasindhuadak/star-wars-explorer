"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onClearFilters: () => void;
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-sw-surface border border-sw-border flex items-center justify-center mb-6">
        <Search className="w-7 h-7 text-sw-text-muted" />
      </div>

      {/* Message  */}
      <h3 className="text-lg font-heading font-semibold text-sw-text mb-2">
        No characters found
      </h3>
      <p className="text-sm text-sw-text-muted max-w-sm mb-6">
        Try adjusting your search or filters to find what you&apos;re looking for.
      </p>

      {/* Clear Filters Action  */}
      <Button
        variant="link"
        onClick={onClearFilters}
        className="text-amber-400 hover:text-amber-300"
      >
        Clear all filters
      </Button>
    </motion.div>
  );
}
