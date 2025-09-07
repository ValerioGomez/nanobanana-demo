// test-new-key.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCI_cL1WTnPG6zxcE7VOlKdar9jITW4HHI");

async function test() {
  try {
    console.log("🔍 Probando NUEVA API key con Gemini...");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("Hola");
    console.log("✅ Éxito:", result.response.text());
  } catch (error) {
    console.log("❌ Error:", error.message);

    // Prueba con otros modelos si falla
    const modelsToTry = [
      "gemini-1.0-pro",
      "gemini-1.5-pro",
      "gemini-pro-vision",
    ];
    for (const modelName of modelsToTry) {
      try {
        console.log(`Probando con modelo: ${modelName}...`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hola");
        console.log(`✅ Éxito con ${modelName}:`, result.response.text());
        break;
      } catch (err) {
        console.log(`❌ ${modelName}:`, err.message);
      }
    }
  }
}

test();
