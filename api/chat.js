// api/chat.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Usa la NUEVA API key
const apiKey =
  process.env.GEMINI_API_KEY || "AIzaSyCI_cL1WTnPG6zxcE7VOlKdar9jITW4HHI";
const genAI = new GoogleGenerativeAI(apiKey);

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Falta el mensaje" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(message);
    const text = result.response.text();

    res.status(200).json({ reply: text });
  } catch (error) {
    console.error("Error con Gemini:", error);

    // Respuesta de fallback
    res.status(200).json({
      reply:
        "¡Hola! 😊 Estoy aquí para ayudarte. En este momento estoy teniendo dificultades técnicas. Por favor, intenta tu pregunta de nuevo en un momento.",
    });
  }
}
