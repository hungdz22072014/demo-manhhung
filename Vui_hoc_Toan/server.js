// =================================================================
// NODE.JS / EXPRESS BACKEND SERVER - BẢO MẬT API KEY & MULTI-MODEL FALLBACK
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
const PREFERRED_MODELS = [
  "gemini-3.5-flash",
  "gemini-3.5-flash-lite",
  "gemini-3.6-flash",
  "gemini-flash-latest",
  "gemini-3.1-flash-lite",
  "gemini-3-flash-preview"
];

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
    return res.end(JSON.stringify({
      status: "ok",
      models: PREFERRED_MODELS,
      activeModel: PREFERRED_MODELS[0],
      secured: true
    }));
  }

  if (url.pathname === "/api/ai/chat" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", async () => {
      try {
        const payload = JSON.parse(body || "{}");
        const { prompt, mode, context } = payload;
        const studentName = context?.studentName || "em";
        const grade = context?.grade || 7;

        let geminiSystemInstruction = `Bạn là "Thầy AI Socratic" - Trợ lý & Gia sư AI Toán học Thông Thái, Toàn Năng (Đồng hành cùng học sinh THCS lớp 6, 7 theo bộ sách Kết nối tri thức với cuộc sống và Toán học tổng quát).
Phong cách:
- Thân thiện, sư phạm, xưng là "Thầy" và gọi học sinh là "${studentName}".
- Sử dụng tiếng Việt chuẩn mực, công thức toán viết bằng ký hiệu KaTeX/LaTeX chuẩn ($...$ cho inline và $$...$$ cho khối công thức).
- Trả lời thông minh, chính xác, linh hoạt theo đúng bản chất câu hỏi:
  + Nếu học sinh yêu cầu TÍNH TOÁN CỤ THỂ (ví dụ: căn bậc n, luỹ thừa, biểu thức số học, giá trị đại số...): Thầy PHẢI tính toán chính xác kết quả số học ra giá trị cụ thể, hiển thị công thức đẹp mắt, giải thích từng bước rõ ràng. Tuyệt đối không từ chối và không trả lời rập khuôn theo một khuôn mẫu không liên quan.
  + Nếu học sinh hỏi BÀI TẬP / HÌNH HỌC / ĐỊNH LÝ: Thầy gợi mở tư duy theo phương pháp Socratic, nêu rõ giả thiết, định lý liên quan và hướng dẫn từng bước để học sinh hiểu sâu bản chất.
  + Nếu học sinh hỏi BẤT KỲ CÂU HỎI NÀO KHÁC (kiến thức chung, mẹo tính nhanh, logic toán...): Thầy trả lời tường minh, sâu sắc, hữu ích và truyền cảm hứng học tập.`;

        if (mode === "evaluate") {
          geminiSystemInstruction += `\n[CHẾ ĐỘ ĐÁNH GIÁ ĐỊNH LÝ]: So sánh với đáp án chuẩn: "${context?.standardAnswer || ""}". Đánh giá ý nghĩa ngữ nghĩa, cho điểm 1-10, khen ngợi và chỉ ra điều kiện thiếu một cách tường tận.`;
        }

        const geminiBody = {
          contents: [
            {
              role: "user",
              parts: [{ text: `${geminiSystemInstruction}\n\n[CÂU HỎI HOẶC YÊU CẦU CỦA HỌC SINH]:\n${prompt || "Xin chào Thầy!"}` }]
            }
          ],
          generationConfig: { temperature: 0.3, maxOutputTokens: 2000 }
        };

        let replyText = "";
        let usedModel = "";
        let lastError = null;

        for (const modelName of PREFERRED_MODELS) {
          try {
            const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(geminiBody)
            });

            const data = await geminiRes.json();
            if (geminiRes.ok && data.candidates && data.candidates[0]?.content?.parts) {
              const parts = data.candidates[0].content.parts;
              for (const p of parts) {
                if (p.text) replyText += p.text;
              }
              if (replyText.trim()) {
                usedModel = modelName;
                break;
              }
            } else {
              lastError = data.error || { message: `Model ${modelName} code ${geminiRes.status}` };
            }
          } catch (modelErr) {
            lastError = modelErr;
          }
        }

        if (!replyText) {
          throw new Error(lastError?.message || "Không gọi được AI");
        }

        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        return res.end(JSON.stringify({ success: true, reply: replyText, model: usedModel }));
      } catch (err) {
        console.error("Server AI Handler Error:", err.message || err);
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        return res.end(JSON.stringify({
          success: false,
          error: err.message || "Lỗi xử lý AI",
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
