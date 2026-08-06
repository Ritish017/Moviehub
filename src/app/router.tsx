import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
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
const LayoutWithOutlet: React.FC = () => (
  <AppLayout>
    <Suspense fallback={<PageSkeleton />}>
      <Outlet />
    </Suspense>
  </AppLayout>
);

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
