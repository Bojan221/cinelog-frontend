"use client";

import { createContext, useContext, useTransition } from "react";
import { useRouter } from "next/navigation";

interface NavigationContextValue {
  navigate: (url: string) => void;
  isPending: boolean;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const navigate = (url: string) => {
    startTransition(() => {
      router.push(url);
    });
  };

  return (
    <NavigationContext.Provider value={{ navigate, isPending }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}
