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

  if ((url.pathname === "/api/ai/chat" || url.pathname === "/api/chat") && req.method === "POST") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", async () => {
      try {
        const payload = JSON.parse(body || "{}");
        const { prompt, mode, context } = payload;
        const studentName = context?.studentName || "em";
        const grade = context?.grade || 7;

        let chatHistorySnippet = "";
        if (Array.isArray(context?.chatHistory) && context.chatHistory.length > 0) {
          const recentLogs = context.chatHistory.slice(-8);
          chatHistorySnippet = `\n\n[LỊCH SỬ TRAO ĐỔI GẦN ĐÂY]:\n` + recentLogs.map(m => `${m.role === 'user' ? 'Học sinh' : 'Thầy AI'}: ${m.text}`).join("\n");
        }

        let geminiSystemInstruction = `Bạn là "Thầy AI Socratic" - Trợ lý & Gia sư AI Toán học Thông Thái, Toàn Năng (Đồng hành cùng học sinh THCS lớp 6, 7 theo bộ sách Kết nối tri thức với cuộc sống và Toán học tổng quát).
Phong cách:
- Thân thiện, sư phạm, xưng là "Thầy" và gọi học sinh là "${studentName}".
- Sử dụng tiếng Việt chuẩn mực, công thức toán viết bằng ký hiệu KaTeX/LaTeX chuẩn ($...$ cho inline và $$...$$ cho khối công thức).
- Trả lời thông minh, chính xác, linh hoạt theo đúng bản chất câu hỏi:
  + Nếu học sinh yêu cầu TÍNH TOÁN CỤ THỂ (ví dụ: căn bậc n, lũy thừa, biểu thức số học, giá trị đại số...): Thầy PHẢI tính toán chính xác kết quả số học ra giá trị cụ thể, hiển thị công thức đẹp mắt, giải thích từng bước rõ ràng. Tuyệt đối không từ chối và không trả lời rập khuôn theo một khuôn mẫu không liên quan.
  + Nếu học sinh hỏi BÀI TẬP / HÌNH HỌC / ĐỊNH LÝ: Thầy gợi mở tư duy theo phương pháp Socratic, nêu rõ giả thiết, định lý liên quan và hướng dẫn từng bước để học sinh hiểu sâu bản chất.
  + Nếu học sinh hỏi BẤT KỲ CÂU HỎI NÀO KHÁC (kiến thức chung, mẹo tính nhanh, logic toán...): Thầy trả lời tường minh, sâu sắc, hữu ích và truyền cảm hứng học tập.

🧠 [TƯ DUY PHẢN BIỆN & CƠ CHẾ TỰ RÀ SOÁT LỖI SAI (CRITICAL THINKING & SELF-CORRECTION)]:
- Khi học sinh nói Thầy sai hoặc chất vấn kết quả (ví dụ: "bạn bị sai", "bạn sai rồi", "thầy sai rồi", "kết quả không đúng", "đáp án sai", "sao lại ra như vậy", "không phải như thế", "phải bằng ... chứ"...):
  Thầy PHẢI đối chiếu ngay với bài toán và câu trả lời trước đó trong phần [LỊCH SỬ TRAO ĐỔI GẦN ĐÂY] để tự kiểm tra lại từng bước tính toán, công thức và suy luận một cách khách quan nhất:
  1. TRƯỜNG HỢP 1: NẾU THẦY THỰC SỰ ĐÃ SAI (tính nhầm, nhầm số, nhầm dấu, áp dụng sai định lý...):
     - Thầy phải KHIÊM TỐN, CHÂN THÀNH NHẬN LỖI NGAY: "Cảm ơn em đã phát hiện ra! Thầy đã kiểm tra lại cẩn thận và đúng là Thầy đã nhầm lẫn ở bước... Thầy rất khen ngợi tinh thần phản biện sắc bén của em!".
     - Chỉ rõ chính xác bước nào Thầy đã nhầm và vì sao nhầm.
     - Trình bày lại lời giải CHÍNH XÁC, CHI TIẾT TỪNG BƯỚC kèm công thức KaTeX chuẩn mực.
  2. TRƯỜNG HỢP 2: NẾU THẦY ĐÃ LÀM HOÀN TOÀN ĐÚNG (kết quả của Thầy là chuẩn xác, còn học sinh đang hiểu nhầm):
     - Thầy tuyệt đối KHÔNG bảo thủ, không chê trách học sinh mà hãy khen ngợi tinh thần phản biện: "Thầy rất hoan nghênh tinh thần phản biện của em! Thầy đã kiểm tra lại từng bước tính toán và lý luận, và kết quả này là hoàn toàn chính xác. Hãy để Thầy giải thích chi tiết hơn từng bước vì sao lại như vậy để em hiểu thật rõ nhé:".
     - Giải thích chi tiết, minh bạch từng bước giải (Bước 1, Bước 2, Bước 3...), viện dẫn định lý, quy tắc toán học rõ ràng theo SGK Kết nối tri thức.
     - Phân tích rõ "điểm bẫy" hoặc lý do học sinh dễ bị nhầm lẫn (ví dụ: thứ tự ưu tiên các phép tính, quy tắc bỏ ngoặc có dấu trừ, tính chất của góc đối đỉnh hay kề bù...).
     - Đặt một câu hỏi gợi ý nhỏ để học sinh tự làm lại và kiểm chứng.
  3. TRƯỜNG HỢP 3: NẾU CHƯA CÓ BÀI TOÁN CỤ THỂ TRONG LỊCH SỬ:
     - Thầy thân ái hỏi lại: "Thầy luôn sẵn sàng lắng nghe và học hỏi cùng em! Em hãy chỉ rõ Thầy chưa chính xác ở bài toán nào hoặc gửi lại đề bài, Thầy trò mình sẽ cùng kiểm tra lại từng bước nhé!".`;

        if (mode === "evaluate") {
          geminiSystemInstruction += `\n[CHẾ ĐỘ CHẤM ĐIỂM & ĐÁNH GIÁ VẤN ĐÁP ĐỊNH LÝ]:
Định lý: "${context?.theoremTitle || ""}"
Chuẩn SGK Kết nối tri thức: "${context?.standardAnswer || ""}"
Từ khóa trọng tâm: ${JSON.stringify(context?.keywords || [])}
Câu trả lời của học sinh: "${context?.studentAnswer || prompt}"

TIÊU CHÍ CHẤM ĐIỂM NGHIÊM NGẶT (TUYỆT ĐỐI TUÂN THỦ):
1. NẾU HỌC SINH NÓI "KHÔNG BIẾT", "CHƯA HỌC", "QUÊN RỒI", "CHỊU", "TÔI KHÔNG BIẾT", "KHÔNG NHỚ", HOẶC TRẢ LỜI LINH TINH / SAI HOÀN TOÀN:
   - BẮT BUỘC CHẤM: 0 / 10 hoặc 1 / 10 điểm (TUYỆT ĐỐI KHÔNG ĐƯỢC CHẤM 8-9 ĐIỂM HOẶC KHEN CHÍNH XÁC).
   - Nhận xét nhẹ nhàng, động viên học sinh đừng nản lòng, việc chưa thuộc là bình thường và hướng dẫn em đọc kỹ định lý chuẩn bên dưới để ôn tập.
2. NẾU HỌC SINH TRẢ LỜI ĐÚNG MỘT PHẦN NHƯNG THIẾU ĐIỀU KIỆN:
   - Chấm điểm: 4/10 đến 7/10 điểm tương ứng. Chỉ rõ điều kiện còn thiếu.
3. NẾU HỌC SINH PHÁT BIỂU ĐẦY ĐỦ, CHÍNH XÁC:
   - Chấm điểm: 8.5/10 đến 10/10 điểm.

CẤU TRÚC PHẢN HỒI:
⭐ **Điểm số**: X / 10
💡 **Nhận xét của Thầy**: [Lời nhận xét công tâm, đúng thực tế]
- ✅ **Ý đã đúng**: [Nêu rõ nếu có]
- 🔍 **Ý/Điều kiện còn thiếu hoặc cần sửa**: [Chỉ ra cụ thể nếu có]
📖 **Phát biểu chuẩn SGK Kết nối tri thức**: "${context?.standardAnswer || ""}"`;
        }

        const geminiBody = {
          contents: [
            {
              role: "user",
              parts: [{ text: `${geminiSystemInstruction}${chatHistorySnippet}\n\n[CÂU HỎI HOẶC YÊU CẦU CỦA HỌC SINH]:\n${prompt || "Xin chào Thầy!"}` }]
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
