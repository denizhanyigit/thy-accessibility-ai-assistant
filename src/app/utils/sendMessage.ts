// src/lib/sendMessage.ts
export async function sendMessageToAI(userMessage: string): Promise<string> {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer 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`, // OpenRouter API key'in buraya
    },
    body: JSON.stringify({
      model: "meta-llama/llama-4-maverick", // ücretsiz ve Türkçe destekli
      messages: [
        {
          role: "system",
          content:
            "Sen Türk Hava Yolları web sitesi için erişilebilirlik asistanısın. Kullanıcıya yardımcı ol, yönlendirici konuş.",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
    }),
  });

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "Cevap alınamadı.";
}
