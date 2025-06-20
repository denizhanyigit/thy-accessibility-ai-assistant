"use client";

import { useEffect } from "react";
import { useAssistantContext } from "../provider/AccessibilityAssistantProvider";

// Klavye erişimi için Alt+H gibi kısa yol
export const AccessibilityKeyboardShortcut = () => {
  const { setIsOpen } = useAssistantContext();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "h") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return null;
};
