"use client";

import { useAssistantContext } from "../provider/AccessibilityAssistantProvider";

// Üst menüde sabit yazılı erişim bağlantısı
export const AccessibilityMenuButton = () => {
  const { setIsOpen } = useAssistantContext();

  return (
    <button
      onClick={() => setIsOpen(true)}
      aria-label="Erişilebilirlik yardımcısını aç"
      className="fixed top-2 right-2 bg-blue-600 text-white px-4 py-2 rounded z-50"
    >
      Erişilebilirlik Asistanı
    </button>
  );
};
