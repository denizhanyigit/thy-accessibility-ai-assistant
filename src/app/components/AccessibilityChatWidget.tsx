"use client";

import { useState, useRef } from "react";
import { useAssistantContext } from "../provider/AccessibilityAssistantProvider";
import { sendMessageToAI } from "../utils/sendMessage";

export const AccessibilityChatWidget = () => {
  const { isOpen, setIsOpen } = useAssistantContext();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { sender: "user" | "ai"; text: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const handleSend = async (userMessage?: string) => {
    const message = userMessage ?? input.trim();
    if (!message) return;

    setMessages((prev) => [...prev, { sender: "user", text: message }]);
    setInput("");
    setLoading(true);

    const aiReply = await sendMessageToAI(message);

    setMessages((prev) => [...prev, { sender: "ai", text: aiReply }]);
    setLoading(false);

    // 🗣️ Yanıtı sesli oku
    const utterance = new SpeechSynthesisUtterance(aiReply);
    utterance.lang = "tr-TR";
    window.speechSynthesis.speak(utterance);
  };

  const handleVoiceInput = () => {
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      alert("Tarayıcınız sesli giriş desteklemiyor.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "tr-TR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      handleSend(transcript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Sesli giriş hatası:", event.error);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  if (!isOpen)
    return (
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Yardım penceresini aç"
        className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-full p-3 z-50"
      >
        💬
      </button>
    );

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed bottom-4 right-4 bg-white shadow-lg rounded-xl w-[350px] h-[500px] z-50 flex flex-col"
    >
      <div className="p-3 bg-blue-600 text-white flex justify-between items-center rounded-t-xl">
        <span>Yapay Zeka Yardımcısı</span>
        <button onClick={() => setIsOpen(false)} aria-label="Pencereyi kapat">
          ✖️
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-2 text-sm">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded ${
              msg.sender === "user"
                ? "bg-blue-100 self-end"
                : "bg-gray-100 self-start"
            }`}
          >
            <strong>{msg.sender === "user" ? "Sen:" : "Asistan:"}</strong>{" "}
            {msg.text}
          </div>
        ))}
        {loading && <div className="text-gray-500 italic">Yazıyor...</div>}
      </div>

      <div className="p-2 border-t flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Sorunuzu yazın..."
          className="flex-1 border rounded px-2 py-1 text-sm"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-3 rounded text-sm"
        >
          Gönder
        </button>
        <button
          onClick={handleVoiceInput}
          className="bg-gray-200 px-3 rounded text-sm"
          title="Sesle konuş"
        >
          🎙️
        </button>
      </div>
    </div>
  );
};
