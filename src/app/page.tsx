import { AccessibilityAnnouncement } from "./components/AccessibilityAnnouncement";
import { AccessibilityChatWidget } from "./components/AccessibilityChatWidget";
import { AccessibilityKeyboardShortcut } from "./components/AccessibilityKeyboardShortcut";
import { AccessibilityMenuButton } from "./components/AccessibilityMenuButton";
import { AccessibilityAssistantProvider } from "./provider/AccessibilityAssistantProvider";

export default function HomePage() {
  return (
    <AccessibilityAssistantProvider>
      {/* Erişilebilirlik AI Assistant */}
      <AccessibilityAnnouncement />
      <AccessibilityMenuButton />
      <AccessibilityChatWidget />
      <AccessibilityKeyboardShortcut />

      {/* Sayfanın geri kalan içeriği */}
      <main>
        <h1>Hoş geldiniz!</h1>
        {/* ... */}
      </main>
    </AccessibilityAssistantProvider>
  );
}
