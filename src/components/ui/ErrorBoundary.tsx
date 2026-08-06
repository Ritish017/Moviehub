/**
 * MovieHub X — Error Boundary (Functional Implementation)
 * 
 * True React error boundaries require class components, but this project's
 * tsconfig (useDefineForClassFields: false + experimentalDecorators) causes
 * TypeScript to lose `this.state/props/setState` bindings on class components.
 *
 * Implementation: wraps children normally, provides ErrorDisplay for async errors.
 * Sections use try/catch in their own data fetching hooks for error handling.
 */
import React, { useState, useCallback } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorDisplayProps {
  error?: Error | string | null;
  onReset?: () => void;
  message?: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  onReset,
  message,
}) => (
  <div className="p-8 rounded-2xl bg-red-950/20 border border-red-500/20 text-center space-y-4">
    <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
      <AlertTriangle className="w-5 h-5 text-red-400" />
    </div>
    <div className="space-y-1">
      <p className="text-sm font-bold text-white">
        {message ?? "Something went wrong"}
      </p>
      {error && (
        <p className="text-xs text-gray-400 font-mono max-w-xs mx-auto truncate">
          {typeof error === "string" ? error : error?.message}
        </p>
      )}
    </div>
    {onReset && (
      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/20 transition-colors cursor-pointer"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        Try Again
      </button>
    )}
  </div>
);

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Functional error wrapper. Each child section handles its own errors
 * via hooks (useAiAnalysis, useTrending, etc.) which return error state.
 * This component provides the wrapper API for future class-based upgrade.
 */
export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  children,
  fallback,
}) => {
  return <>{children}</>;
};
