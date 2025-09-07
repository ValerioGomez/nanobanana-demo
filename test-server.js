// test-server.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import http from "http";

const genAI = new GoogleGenerativeAI("AIzaSyBPZ58vC3CXNLlhHjNpeDz1fCrp4Fk9fCg");

const server = http.createServer(async (req, res) => {
  // Configurar CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/api/chat") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const { message } = JSON.parse(body);

        if (!message) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: "Falta el mensaje" }));
          return;
        }

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(message);
        const text = result.response.text();

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ reply: text }));
      } catch (error) {
        console.error("Error:", error);
        res.writeHead(500);
        res.end(JSON.stringify({ error: "Error interno del servidor" }));
      }
    });
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Ruta no encontrada" }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Servidor local ejecutándose en http://localhost:${PORT}`);
  console.log(
    `📋 Para probar: curl -X POST http://localhost:3000/api/chat -H "Content-Type: application/json" -d '{"message":"Hola"}'`
  );
});
