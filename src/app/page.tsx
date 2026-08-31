"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function HomePage() {
  const { isLoading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.push("/dashboard")
      } else {
        router.push("/login")
      }
    }
  }, [isLoading, isAuthenticated, router])
  return (
    <main className="min-h-screen bg-sw-bg flex flex-col items-center justify-center gap-4">
      <div
        className="w-10 h-10 border-3 border-sw-border border-t-sw-accent rounded-full animate-spin"
        role="status"
        aria-label="Loading application..."
      />
      <p className="text-sw-text-secondary text-sm font-heading animate-pulse">
        Entering the Galaxy...
      </p>
    </main>
  );
}
