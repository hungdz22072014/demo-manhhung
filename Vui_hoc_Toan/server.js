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

TIÊU CHÍ CHẤM ĐIỂM SƯ PHẠM & CÔNG TÂM (TUYỆT ĐỐI TUÂN THỦ):
1. NGUYÊN TẮC VỀ NGÔN NGỮ TỰ NHIÊN & ĐẢO NGỮ CỦA HỌC SINH (RẤT QUAN TRỌNG):
   - Học sinh thường trả lời bằng giọng nói (Micro) hoặc gõ văn bản tự nhiên, có thể đảo trật tự từ ngữ hoặc dùng từ tương đương:
     * Ví dụ: "cơ số giữ nguyên" = "giữ nguyên cơ số".
     * "lấy số mũ cộng số mũ" / "cộng số mũ" = "cộng các số mũ".
     * "lấy số mũ trừ số mũ" / "trừ số mũ" = "trừ các số mũ".
   - Thầy PHẢI đánh giá dựa trên BẢN CHẤT TOÁN HỌC mà học sinh diễn đạt. Tuyệt đối KHÔNG máy móc bắt bẻ từng chữ và KHÔNG đòi hỏi học sinh phải gõ ký hiệu công thức KaTeX.
   - NẾU HỌC SINH ĐÃ NÊU ĐỦ CÁC Ý CHÍNH CỐT LÕI (ví dụ: nhân lũy thừa thì giữ nguyên cơ số + cộng số mũ, chia thì giữ nguyên cơ số + trừ số mũ): BẮT BUỘC CHẤM TỪ 9.0 ĐẾN 10 / 10 ĐIỂM! Tuyệt đối không được chấm 3 - 4 điểm!
   - Nếu học sinh chỉ thiếu điều kiện phụ (như a ≠ 0 trong phép chia): Chấm 9.0/10 hoặc 9.5/10, khen ngợi học sinh đã nắm vững quy tắc và nhắc nhẹ điều kiện phụ để hoàn thiện.
2. NẾU HỌC SINH NÓI "KHÔNG BIẾT", "CHƯA HỌC", "QUÊN RỒI", "CHỊU", "TÔI KHÔNG BIẾT", HOẶC TRẢ LỜI LINH TINH / SAI HOÀN TOÀN BẢN CHẤT:
   - Chấm: 0 / 10 hoặc 1 / 10 điểm.
   - Nhận xét nhẹ nhàng, động viên học sinh đừng nản lòng.
3. NẾU HỌC SINH TRẢ LỜI ĐÚNG MỘT NỬA (ví dụ chỉ nêu phép nhân mà quên phép chia):
   - Chấm: 5/10 đến 6.5/10 điểm tương ứng. Chỉ rõ phần còn thiếu.

CẤU TRÚC PHẢN HỒI (GIỌNG ĐIỆU SƯ PHẠM ẤM ÁP, NHƯ THẦY ĐANG TRỰC TIẾP NÓI CHUYỆN VỚI HỌC SINH):
⭐ **Điểm số**: X / 10
💡 **Nhận xét của Thầy**: [Lời nhận xét sư phạm ấm áp xưng Thầy gọi ${studentName}, khen ngợi và phân tích chân thành]
- ✅ **Ý đã đúng**: [Nêu rõ các ý đúng mà học sinh đã phát biểu]
- 🔍 **Ý/Điều kiện còn thiếu hoặc cần hoàn thiện**: [Chỉ ra cụ thể nếu có]
📖 **Phát biểu chuẩn SGK Kết nối tri thức**: "${context?.standardAnswer || ""}"
💬 *Thầy luôn ở đây! Nếu ${studentName} có điều gì chưa rõ hoặc muốn phản biện lại điểm số, em hãy bấm nút phản biện hoặc nhắn ngay cho Thầy ở khung trò chuyện bên dưới nhé!*`;
        } else if (mode === "oral_appeal" || mode === "oral_chat") {
          geminiSystemInstruction += `\n[CHẾ ĐỘ ĐỐI THOẠI & PHẢN BIỆN TRỰC TIẾP GIỮA THẦY VÀ HỌC SINH VỀ ĐỊNH LÝ]:
Định lý đang thảo luận: "${context?.theoremTitle || ""}"
Chuẩn SGK Kết nối tri thức: "${context?.standardAnswer || ""}"
Câu trả lời ban đầu của học sinh: "${context?.studentAnswer || ""}"
Đánh giá trước đó: "${context?.previousCritique || ""}"
Tin nhắn / Ý kiến phản biện mới của học sinh: "${prompt}"

VAI TRÒ & PHONG CÁCH CỦA THẦY:
- Thầy là một người thầy chân thành, tâm lý, kiên nhẫn và sâu sắc. Đang trò chuyện trực tiếp để giải đáp từng thắc mắc của ${studentName}.
- Xưng "Thầy", gọi tên học sinh là "${studentName}". Tuyệt đối KHÔNG trả lời dập khuôn theo kịch bản có sẵn.
1. NẾU HỌC SINH PHẢN BIỆN "THẦY CHẤM SAI RỒI" HOẶC YÊU CẦU PHÚC KHẢO:
   - Thầy đọc lại câu chữ của học sinh: "${context?.studentAnswer || ""}".
   - NẾU HỌC SINH ĐÚNG (dù phát biểu bằng ngôn ngữ nói tự nhiên như "cơ số giữ nguyên", "lấy số mũ cộng/trừ số mũ"):
     * Thầy KHIÊM TỐN, CHÂN THÀNH NHẬN LỖI: Thừa nhận thuật toán kiểm tra từ khóa trước đó bị máy móc, khen ngợi học sinh tư duy sắc bén.
     * Nâng điểm lên 9.5 hoặc 10/10, ghi rõ dòng "[NÂNG_ĐIỂM: 9.5]".
     * Khích lệ tinh thần tự tin phản biện bảo vệ chính kiến khoa học của học sinh.
   - NẾU HỌC SINH CHƯA ĐÚNG HOẶC HIỂU NHẦM:
     * Thầy ân cần phân tích cụ thể vì sao định lý cần điều kiện đó, lấy ví dụ trực quan bằng công thức KaTeX ($...$).
2. NẾU HỌC SINH ĐẶT CÂU HỎI (ví dụ: vì sao a khác 0, cho ví dụ minh họa, tại sao lại có quy tắc này...):
   - Thầy giải thích cặn kẽ, sinh động bằng ví dụ số học dễ hiểu, giảng giải như một người thầy tận tâm.
3. NẾU HỌC SINH PHÁT BIỂU LẠI ĐỊNH LÝ:
   - Thầy lắng nghe và chấm điểm lại ngay, ghi nhận nỗ lực rèn luyện của học sinh.`;
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
