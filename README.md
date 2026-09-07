# Star Wars Explorer
A modern, responsive web application for exploring the Star Wars universe, featuring advanced filtering, authentication, and comprehensive testing.

## Live Demo
Check out the live deployment here: [Star Wars Explorer Live Demo](https://star-wars-explorer-liard.vercel.app)

---

## 📸 Screenshots

### 1. Login Screen
![Login Screen](/public/screenshots/login.jpg)

### 2. Dashboard
![Dashboard Overview](/public/screenshots/dashboard.jpg)

### 3. Character Modal
![Character Details Modal](/public/screenshots/modal.jpg)

### 4. Active Search & Filters
![Search Active](/public/screenshots/search_active.jpg)

### 5. Loading State
![Loading Skeletons](/public/screenshots/loading.jpg)

### 6. Error States
![Error State](/public/screenshots/error_states.jpg)

---

## 🛠️ Tech Stack

| Technology | Purpose |
| ---------- | ------- |
| **Next.js 15 (App Router)** | React framework for routing and rendering |
| **TypeScript** | Static typing for robust code quality |
| **TailwindCSS v4** | Utility-first CSS styling |
| **shadcn/ui** | Accessible, customizable UI components |
| **Framer Motion** | Fluid animations and page transitions |
| **Lucide React** | Scalable vector icons |
| **Jest & React Testing Library** | Unit and Integration testing |
| **JSON Web Tokens (jose)** | Secure, stateless authentication |

---

## ✨ Features

### Core Requirements
- **Authentication:** Secure login flow using hardcoded credentials and JWT-based session management via HTTP-only cookies.
- **Protected Routes:** Next.js Middleware prevents unauthenticated users from accessing the dashboard.
- **Dashboard Grid:** Displays Star Wars characters fetched from the [SWAPI](https://swapi.info/) API.
- **Character Modal:** Clicking a card opens a modal displaying detailed information (height, mass, birth year, films) and automatically fetches the character's homeworld details.
- **Pagination:** Client-side pagination navigating through the entire list of 82 characters.
- **Search & Filters:** Search characters by name or filter by Homeworld, Film, and Species.

### Brownie Points Achieved 🏆
1. **Advanced Filtering:** Multi-select 4-way `AND` filtering. Users can combine Name, Homeworld, Film, and Species filters seamlessly.
2. **Beautiful UI/UX:** Leveraging TailwindCSS and Framer Motion for smooth transitions, micro-interactions, skeleton loading states, and custom empty states.
3. **Integration Testing:** Extensive integration tests (`Jest` + `@testing-library/react`) covering the Character Grid, Pagination, Modal interactions, and Empty States. Test coverage exceeds 70%.

---

## 🚀 Quick Start

1. **Clone the repository and install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open the app:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

### 🔑 Login Credentials
Use the following credentials to bypass the login screen:
- **Username:** `admin`
- **Password:** `password`

---

## 🏗️ Architecture Overview

- **App Router (`src/app`):** Uses Next.js App Router. The `/login` page is public, while the `/dashboard` page is protected.
- **Middleware (`src/middleware.ts`):** Intercepts requests to ensure valid JWT authentication before granting access to protected routes.
- **Custom Hooks (`src/hooks`):** Separation of concerns strategy.
  - `useCharacters`: Manages fetching and caching the main dataset.
  - `useHomeworld`: Handles fetching planet data specifically for the modal.
  - `useFilters`: Extracts complex 4-way AND filtering logic from the UI.
  - `usePagination`: Handles dividing the filtered dataset into pages.
- **Components (`src/components`):** Reusable UI building blocks, deeply integrating `shadcn/ui` and `framer-motion` for a premium feel.

---

## 🧪 Testing

The project uses Jest and React Testing Library for comprehensive integration testing. Mocks are configured for `next/navigation`, `next/image`, and `framer-motion` to ensure standard JSDOM compatibility.

**Run the test suite:**
```bash
npm test
```

**Generate a test coverage report:**
```bash
npm run test:coverage
```

---

## 💡 Design Decisions
- **Client-Side Filtering & Pagination:** The original SWAPI does not support advanced combination filtering natively (e.g., filtering by both Species and Film simultaneously). To provide a snappy, instant UX, the app fetches all characters upfront and processes filtering/pagination entirely on the client-side.
- **Stateless Authentication:** Using `jose` to sign and verify JWTs on the Edge via Next.js Middleware. This eliminates the need for a database while still demonstrating secure authentication principles.
- **CSS-First Tailwind v4:** Adopted the latest TailwindCSS version without a config file, relying on CSS variables and `@theme` blocks for maximum performance and modern CSS features.
- **Skeleton Loaders over Spinners:** Replaced traditional loading spinners with layout-matching skeletons (`<LoadingGrid />`) to reduce perceived loading time and avoid Layout Shifts.
