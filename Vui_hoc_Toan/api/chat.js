// =================================================================
// VERCEL SERVERLESS FUNCTION - GEMINI AI CHAT & SOCRATIC
// =================================================================

const PREFERRED_MODELS = [
  "gemini-3.5-flash",
  "gemini-3.5-flash-lite",
  "gemini-3.6-flash",
  "gemini-flash-latest",
  "gemini-3.1-flash-lite",
  "gemini-3-flash-preview"
];

module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  let apiKey = process.env.GEMINI_API_KEY || "";

  // Fallback đọc key.txt nếu deploy kèm file hoặc chạy nội bộ
  if (!apiKey) {
    try {
      const fs = require("fs");
      const path = require("path");
      const keyFile = path.join(__dirname, "..", "key.txt");
      if (fs.existsSync(keyFile)) {
        apiKey = fs.readFileSync(keyFile, "utf8").trim();
      }
    } catch (e) {}
  }

  try {
    const { prompt, mode, context } = req.body || {};
    const studentName = context?.studentName || "em";
    const grade = context?.grade || 7;

    let systemInstruction = `Bạn là "Thầy AI Socratic" - Trợ lý & Gia sư AI Toán học Thông Thái, Toàn Năng (Đồng hành cùng học sinh THCS lớp 6, 7 theo bộ sách Kết nối tri thức với cuộc sống và Toán học tổng quát).
Phong cách:
- Thân thiện, sư phạm, xưng là "Thầy" và gọi học sinh là "${studentName}".
- Sử dụng tiếng Việt chuẩn mực, công thức toán viết bằng ký hiệu KaTeX/LaTeX chuẩn ($...$ cho inline và $$...$$ cho khối công thức).
- Trả lời thông minh, chính xác, linh hoạt theo đúng bản chất câu hỏi:
  + Nếu học sinh yêu cầu TÍNH TOÁN CỤ THỂ (ví dụ: căn bậc n, luỹ thừa, biểu thức số học, giá trị đại số...): Thầy PHẢI tính toán chính xác kết quả số học ra giá trị cụ thể, hiển thị công thức đẹp mắt, giải thích từng bước rõ ràng. Tuyệt đối không từ chối và không trả lời rập khuôn theo một khuôn mẫu không liên quan.
  + Nếu học sinh hỏi BÀI TẬP / HÌNH HỌC / ĐỊNH LÝ: Thầy gợi mở tư duy theo phương pháp Socratic, nêu rõ giả thiết, định lý liên quan và hướng dẫn từng bước để học sinh hiểu sâu bản chất.
  + Nếu học sinh hỏi BẤT KỲ CÂU HỎI NÀO KHÁC (kiến thức chung, mẹo tính nhanh, logic toán...): Thầy trả lời tường minh, sâu sắc, hữu ích và truyền cảm hứng học tập.`;

    if (mode === "evaluate") {
      systemInstruction += `\n[CHẾ ĐỘ ĐÁNH GIÁ ĐỊNH LÝ]: So sánh với định lý chuẩn: "${context?.standardAnswer || ""}". Đánh giá đúng ngữ nghĩa, kiểm tra điều kiện cốt lõi. Cho điểm (thang điểm 1-10), lời khen ngợi động viên và hướng dẫn bổ sung phần còn thiếu một cách chi tiết.`;
    }

    const geminiPayload = {
      contents: [
        {
          role: "user",
          parts: [{ text: `${systemInstruction}\n\n[CÂU HỎI HOẶC YÊU CẦU CỦA HỌC SINH]:\n${prompt || "Xin chào Thầy!"}` }]
        }
      ],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 2000
      }
    };

    let replyText = "";
    let usedModel = "";
    let lastError = null;

    // Multi-model fallback retry loop
    for (const modelName of PREFERRED_MODELS) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(geminiPayload)
        });

        const data = await response.json();
        if (response.ok && data.candidates && data.candidates[0]?.content?.parts) {
          const parts = data.candidates[0].content.parts;
          for (const p of parts) {
            if (p.text) replyText += p.text;
          }
          if (replyText.trim()) {
            usedModel = modelName;
            break;
          }
        } else {
          lastError = data.error || { message: `Model ${modelName} returned status ${response.status}` };
          console.warn(`[Gemini Try Fail] ${modelName}:`, lastError);
        }
      } catch (callErr) {
        lastError = callErr;
        console.warn(`[Gemini Fetch Error] ${modelName}:`, callErr.message);
      }
    }

    if (!replyText) {
      throw new Error(lastError ? (lastError.message || JSON.stringify(lastError)) : "Không nhận được phản hồi từ AI");
    }

    return res.status(200).json({
      success: true,
      reply: replyText,
      model: usedModel
    });
  } catch (error) {
    console.error("Vercel Chat Function Error:", error);
    return res.status(200).json({
      success: false,
      error: error.message || "Lỗi xử lý AI",
      isFallback: true
    });
  }
};
