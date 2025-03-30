"use client";

import React from "react";
import { ThemeProvider } from "next-themes";

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {children}
    </ThemeProvider>
  );
}

export default Provider;
