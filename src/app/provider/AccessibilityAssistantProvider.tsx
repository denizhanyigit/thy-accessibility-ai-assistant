"use client";
import { createContext, ReactNode, useContext, useState } from "react";

// Context & global state yönetimi

// null default context (gerekirse fallback tanımlanabilir)
export const AssistantContext = createContext<AssistantContextType | null>(
  null
);

export const AccessibilityAssistantProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  return (
    <AssistantContext.Provider
      value={{ isOpen, setIsOpen, isFirstVisit, setIsFirstVisit }}
    >
      {children}
    </AssistantContext.Provider>
  );
};

type AssistantContextType = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  isFirstVisit: boolean;
  setIsFirstVisit: (val: boolean) => void;
};

// Hook tanımı
export const useAssistantContext = () => {
  const context = useContext(AssistantContext);
  if (!context) {
    throw new Error(
      "useAssistantContext must be used within an AccessibilityAssistantProvider"
    );
  }
  return context;
};
