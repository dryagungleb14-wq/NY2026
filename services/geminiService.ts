
import { GoogleGenAI } from "@google/genai";

// Объявляем глобальную переменную process для TypeScript, так как она будет подставлена Vite при сборке
declare var process: {
  env: {
    API_KEY: string;
  };
};

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateNewYearPrediction = async (category: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Придумай ОДНО доброе и вдохновляющее предсказание на 2026 год. 
      СФЕРА: ${category}.
      
      ТРЕБОВАНИЯ:
      - Будь позитивным и конкретным. 
      - Коротко (до 10 слов).
      - Стиль: минимализм, эстетика "Korean Simple".
      - Ответь ТОЛЬКО текстом предсказания без точки в конце.`,
      config: {
        temperature: 0.8,
        topP: 0.95,
        thinkingConfig: { thinkingBudget: 0 },
      },
    });

    return response.text?.trim().replace(/\.$/, '') || `В 2026 году в сфере ${category.toLowerCase()} тебя ждет успех`;
  } catch (error) {
    // Безопасное логирование: выводим только сообщение ошибки, а не весь объект, чтобы избежать circular structure error
    console.error("Error generating prediction:", error instanceof Error ? error.message : String(error));
    return `2026: время для новых свершений в сфере ${category.toLowerCase()}`;
  }
};
