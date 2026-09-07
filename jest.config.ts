import type { Config } from "jest";

const config: Config = {
  // ─── Use jsdom to simulate a browser environment ───
  // Without this, things like document, window, and DOM APIs don't exist
  testEnvironment: "jsdom",

  // ─── Run this file before every test ───
  // It imports @testing-library/jest-dom which adds matchers like toBeInTheDocument()
  setupFilesAfterEnv: ["<rootDir>/__tests__/setup.tsx"],

  // ─── Translate import paths so Jest can understand them ───
  moduleNameMapper: {
    // 1. Path alias: @/anything → src/anything
    "^@/(.*)$": "<rootDir>/src/$1",

    // 2. CSS/SCSS imports: return an empty object (Jest can't parse CSS)
    "\\.(css|less|scss|sass)$": "<rootDir>/__tests__/mocks/styleMock.ts",

    // 3. Image imports: return a dummy string
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__tests__/mocks/fileMock.ts",
  },

  // ─── Transform TypeScript/TSX files using ts-jest (built into Jest 30) ───
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
        // Use ESM-compatible JSX transform (React 17+ doesn't need import React)
        jsx: "react-jsx",
      },
    ],
  },

  // ─── Where to find test files ───
  // Matches: __tests__/**/*.test.ts, __tests__/**/*.test.tsx, src/**/*.test.ts
  testMatch: [
    "<rootDir>/__tests__/**/*.test.(ts|tsx)",
    "<rootDir>/src/**/*.test.(ts|tsx)",
  ],

  // ─── Don't try to transform node_modules (they're already compiled) ───
  transformIgnorePatterns: ["/node_modules/"],
};

export default config;
