// test-gemini-cjs.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyBPZ58vC3CXNLlhHjNpeDz1fCrp4Fk9fCg");

async function test() {
  try {
    console.log("🔍 Probando conexión con Gemini...");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("Hola");
    console.log("✅ Éxito:", result.response.text());
  } catch (error) {
    console.log("❌ Error:", error.message);
  }
}

test();
