"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { ASSISTANT } from "@/app/(main)/ai_assistants/page";

type AssistantContextType = {
  assistant: ASSISTANT | null;
  setAssistant: (assistant: ASSISTANT | null) => void;
};

export const AssistantContext = createContext<AssistantContextType | undefined>(undefined);

export const AssistantProvider = ({ children }: { children: ReactNode }) => {
  const [assistant, setAssistant] = useState<ASSISTANT | null>(null);

  return (
    <AssistantContext.Provider value={{ assistant, setAssistant }}>
      {children}
    </AssistantContext.Provider>
  );
};

export const useAssistant = () => {
  const context = useContext(AssistantContext);
  if (!context) {
    throw new Error("useAssistant must be used within an AssistantProvider");
  }
  return context;
};
