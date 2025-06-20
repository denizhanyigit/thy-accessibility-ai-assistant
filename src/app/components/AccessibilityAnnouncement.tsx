"use client";

import { useEffect } from "react";
import { useAssistantContext } from "../provider/AccessibilityAssistantProvider";

// Sayfa açılışında ekran okuyucuya yakalanan kısa bilgi kutusu
export const AccessibilityAnnouncement = () => {
  const { isFirstVisit, setIsFirstVisit, setIsOpen } = useAssistantContext();

  useEffect(() => {
    if (isFirstVisit) {
      setTimeout(() => {
        alert(
          "Sitemizi daha kolay kullanmak için yapay zeka yardımcısını deneyin."
        );
        setIsFirstVisit(false);
      }, 1000);
    }
  }, []);

  return null;
};
