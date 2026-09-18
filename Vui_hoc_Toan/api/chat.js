// =================================================================
// VERCEL SERVERLESS FUNCTION - GEMINI AI CHAT & SOCRATIC
// =================================================================

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
  const modelName = "gemini-3.6-flash";

  // Fallback đọc key.txt nếu deploy kèm file
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

    let systemInstruction = `Bạn là trợ lý AI 'Vui Học Toán' (Toán THCS lớp 6-7 theo bộ sách Kết nối tri thức với cuộc sống). Luôn dùng tiếng Việt thân thiện, công thức KaTeX ($...$), bám sát chuẩn kiến thức SGK Kết nối tri thức.`;

    if (mode === "socratic") {
      systemInstruction += ` [PHƯƠNG PHÁP SOCRATIC]: Không giải bài hộ hoặc đưa ra đáp số ngay. Hãy hỏi gợi mở: 1) Xác định giả thiết & kết luận; 2) Gợi ý định lý SGK cần dùng; 3) Đặt 1 câu hỏi nhỏ dẫn dắt tiếp theo để học sinh tự làm.`;
    } else if (mode === "evaluate") {
      systemInstruction += ` [ĐÁNH GIÁ ĐỊNH LÝ]: So sánh với định lý chuẩn: ${context?.standardAnswer || ""}. Đánh giá đúng ngữ nghĩa, kiểm tra điều kiện cốt lõi. Cho điểm (1-10), lời khen ngợi và chỉ ra phần cần bổ sung.`;
    }

    const geminiPayload = {
      contents: [
        {
          role: "user",
          parts: [{ text: `${systemInstruction}\n\n[YÊU CẦU CỦA HỌC SINH]:\n${prompt || "Xin chào!"}` }]
        }
      ],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 1200
      }
    };

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(geminiPayload)
    });

    const data = await response.json();
    if (data.error) {
      console.error("Gemini Cloud Error:", data.error);
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
      replyText = "Thầy đã ghi nhận câu trả lời của em! Em hãy tiếp tục suy luận nhé.";
    }

    return res.status(200).json({
      success: true,
      reply: replyText,
      model: modelName
    });
  } catch (error) {
    console.error("Vercel Chat Function Error:", error);
    return res.status(200).json({
      success: true,
      reply: "Chào em! Thầy AI Vui Học Toán đồng hành cùng em. Hãy đọc kỹ lại giả thiết đề bài và các định lý liên quan nhé!",
      isFallback: true
    });
  }
};
