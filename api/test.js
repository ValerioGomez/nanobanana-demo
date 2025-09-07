// api/test.js
export default async function handler(req, res) {
  res
    .status(200)
    .json({
      message: "✅ ¡La API funciona!",
      timestamp: new Date().toISOString(),
    });
}
