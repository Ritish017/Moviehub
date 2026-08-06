import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AppLayout } from "./layouts/AppLayout";

// Lazy-load all page components for code splitting
const HomePage = lazy(() => import("./pages/HomePage"));
const MoviePage = lazy(() => import("./pages/MoviePage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage"));
const CommunityPage = lazy(() => import("./pages/CommunityPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const TrailersPage = lazy(() => import("./pages/TrailersPage"));
const LiveApiPage = lazy(() => import("./pages/LiveApiPage"));

// Minimal page-level skeleton while lazy chunks load
const PageSkeleton: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-2 border-[#f95716]/30 border-t-[#f95716] rounded-full animate-spin" />
      <p className="text-xs text-gray-500 font-mono tracking-widest uppercase">Loading</p>
    </div>
  </div>
);

// Layout wrapper that renders Navbar + Sidebar + <Outlet> + Footer
const LayoutWithOutlet: React.FC = () => {
  const location = useLocation();
  
  return (
    <AppLayout>
      <Suspense fallback={<PageSkeleton />}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </Suspense>
    </AppLayout>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWithOutlet />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "movie/:id", element: <MoviePage /> },
      { path: "search", element: <SearchPage /> },
      { path: "analytics", element: <AnalyticsPage /> },
      { path: "community", element: <CommunityPage /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "trailers", element: <TrailersPage /> },
      { path: "live-api", element: <LiveApiPage /> },
    ],
  },
]);

export const AppRouter: React.FC = () => <RouterProvider router={router} />;
