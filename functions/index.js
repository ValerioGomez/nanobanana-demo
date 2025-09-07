const { GoogleGenerativeAI } = require("@google/generative-ai");
const functions = require("firebase-functions");

const genAI = new GoogleGenerativeAI(functions.config().gemini.key);

exports.chat = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.status(204).send("");
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Método no permitido. Usa POST." });
    return;
  }

  const { message } = req.body;

  if (!message) {
    res.status(400).json({ error: "Falta el 'message' en el body." });
    return;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(message);
    const text = result.response.text();

    res.status(200).json({ reply: text });
  } catch (error) {
    console.error("Error con Gemini:", error);
    res.status(500).json({ error: "Algo salió mal. Intenta de nuevo." });
  }
});
