// test-gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBPZ58vC3CXNLlhHjNpeDz1fCrp4Fk9fCg");

async function test() {
  try {
    console.log("🔍 Probando conexión con Gemini...");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent("Hola");
    console.log("✅ Éxito:", result.response.text());
  } catch (error) {
    console.log("❌ Error:", error.message);
    console.log("Probando con gemini-1.0-pro...");

    // Prueba con el otro modelo
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
      const result = await model.generateContent("Hola");
      console.log("✅ Éxito con gemini-1.0-pro:", result.response.text());
    } catch (error2) {
      console.log("❌ Error con ambos modelos:", error2.message);
    }
  }
}

test();
