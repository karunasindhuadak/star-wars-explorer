"use client"

import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";


interface ErrorStateProps {
  message?: string;
  onRetry?: () => void
}

export function ErrorState({message, onRetry}: ErrorStateProps) {
  return (
    <motion.div
      initial={{opacity: 0, x: 0}}
      animate={{
        opacity: 1,
        x: [0, -10, 10, -10, 10, 0]
      }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-20 gap-4"
    >
      {/* Warning Icon */}
      <AlertTriangle className="w-12 h-12 text-sw-accent" />

      {/*Error Message*/}
      <div className="text-center space-y-1">
        <h3 className="text-sw-text text-lg font-semibold font-heading">Something went wrong</h3>
        <p className="text-sw-text-muted text-sm max-w-md">
          {message ?? "An unexpected error occurred. Please try again."}
        </p>
      </div>

      {/*Retry Button*/}
      {onRetry && (
        <Button
          onClick={onRetry}
          className="mt-2 bg-sw-accent hover:bg-sw-accent-hover text-black font-semibold"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      )}
    </motion.div>
  );
}
