import React from "react";
import { AppRouter } from "./app/router";

/**
 * MovieHub X — Application Root
 * All routing is handled by AppRouter (React Router DOM).
 * All state is managed by Zustand stores (useAppStore, useUserStore, useMovieStore).
 * All layout is handled by AppLayout (Navbar, Sidebar, Footer).
 */
export default function App() {
  return <AppRouter />;
}
