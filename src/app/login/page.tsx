"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const success = await login(username, password);

    if (!success) {
      setError("Invalid credentials. Please try again.");
    }

    setIsSubmitting(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-sw-bg px-4">
      <motion.div className="w-full max-w-md">
        <Card className="bg-sw-surface border-sw-border">
          {/* Header */}
          <CardHeader className="text-center space-y-2">
            <h1 className="text-2xl font-heading font-bold text-sw-text">Star Wars Explorer</h1>
            <p className="text-sw-text-secondary text-sm">Sign in to explore the galaxy</p>
          </CardHeader>

          {/*---Form---*/}
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sw-text-secondary">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="bg-sw-bg border-sw-border text-sw-text"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sw-text-secondary">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-sw-bg border-sw-border text-sw-text"
                />
              </div>

              {/* Error Message */}
              {error && <p className="text-sw-danger text-sm text-center">{error}</p>}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-sw-accent hover:bg-sw-accent-hover text-black font-semibold"
              >
                {isSubmitting ? "Signing in..." : "SIGN IN"}
              </Button>
            </form>
          </CardContent>

          {/*Footer Hint */}
          <CardFooter className="justify-center">
            <p className="text-sw-text-muted text-xs">
              Use <span className="text-sw-text-secondary font-medium">admin</span> /{" "}
              <span className="text-sw-text-secondary font-medium">password</span> to sign in
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
