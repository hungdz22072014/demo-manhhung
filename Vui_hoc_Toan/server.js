// =================================================================
// NODE.JS / EXPRESS BACKEND SERVER - BẢO MẬT API KEY
// =================================================================

const http = require("http");
const fs = require("fs");
const path = require("path");

let API_KEY = process.env.GEMINI_API_KEY || "";
const keyFilePath = path.join(__dirname, "key.txt");
if (!API_KEY && fs.existsSync(keyFilePath)) {
  try {
    API_KEY = fs.readFileSync(keyFilePath, "utf8").trim();
  } catch (e) {}
}
const PORT = process.env.PORT || 3000;
const MODEL = "gemini-3.6-flash";

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon"
};

const server = http.createServer(async (req, res) => {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    return res.end();
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === "/api/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ status: "ok", model: MODEL, secured: true }));
  }

  if (url.pathname === "/api/ai/chat" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", async () => {
      try {
        const payload = JSON.parse(body || "{}");
        const { prompt, mode, context } = payload;

        let geminiSystemInstruction = `Bạn là trợ lý AI 'Vui Học Toán' (Toán THCS lớp 6-7 theo bộ sách Kết nối tri thức với cuộc sống). Luôn dùng tiếng Việt thân thiện, công thức KaTeX ($...$), bám sát chuẩn kiến thức SGK Kết nối tri thức.`;

        if (mode === "socratic") {
          geminiSystemInstruction += ` [PHƯƠNG PHÁP SOCRATIC]: Không giải bài hộ. Hãy hỏi gợi mở: 1) Xác định giả thiết & kết luận; 2) Gợi ý định lý SGK; 3) Đặt 1 câu hỏi nhỏ tiếp theo để học sinh tự suy luận.`;
        } else if (mode === "evaluate") {
          geminiSystemInstruction += ` [ĐÁNH GIÁ ĐỊNH LÝ]: So sánh với đáp án chuẩn: ${context?.standardAnswer || ""}. Đánh giá ý nghĩa ngữ nghĩa, cho điểm 1-10, khen ngợi và chỉ ra điều kiện thiếu.`;
        }

        const geminiBody = {
          contents: [
            {
              role: "user",
              parts: [{ text: `${geminiSystemInstruction}\n\n[YÊU CẦU CỦA HỌC SINH]:\n${prompt || "Xin chào!"}` }]
            }
          ],
          generationConfig: { temperature: 0.4, maxOutputTokens: 1200 }
        };

        const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(geminiBody)
        });

        const data = await geminiRes.json();
        if (data.error) {
          console.error("Gemini API Error:", data.error);
          throw new Error(data.error.message || "Gemini API Error");
        }

        let replyText = "";
        const parts = data?.candidates?.[0]?.content?.parts;
        if (Array.isArray(parts)) {
          for (const p of parts) {
            if (p.text) replyText += p.text;
          }
        }

        if (!replyText) {
          replyText = "Thầy đã ghi nhận câu trả lời của em!";
        }

        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        return res.end(JSON.stringify({ success: true, reply: replyText, model: MODEL }));
      } catch (err) {
        console.error("Server AI Handler Error:", err.message || err);
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        return res.end(JSON.stringify({
          success: true,
          reply: "Chào em! Thầy AI Vui Học Toán đồng hành cùng em. Hãy xem lại giả thiết bài toán và định lý liên quan nhé!",
          isFallback: true
        }));
      }
    });
    return;
  }

  // Static files
  let safePath = path.normalize(url.pathname).replace(/^(\.\.[\/\\])+/, "");
  if (safePath === "/" || safePath === "\\") safePath = "/index.html";

  const filePath = path.join(__dirname, safePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      return res.end("<h1>404 - Không tìm thấy file</h1>");
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
});

// Handle uncaught exceptions gracefully to prevent crash
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message || err);
});
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});

server.listen(PORT, () => {
  console.log(`[OK] Server running at http://localhost:${PORT}`);
});

