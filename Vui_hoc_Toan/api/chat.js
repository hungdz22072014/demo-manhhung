// =================================================================
// VERCEL SERVERLESS FUNCTION - BẢO MẬT API KEY (BACKEND)
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

  const apiKey = process.env.GEMINI_API_KEY;
  const modelName = "gemini-3.6-flash";

  try {
    const { prompt, mode, context } = req.body || {};

    let systemInstruction = `Bạn là trợ lý AI 'Vui Học Toán' (Toán THCS lớp 6-7 theo sách Kết nối tri thức với cuộc sống).
Quy tắc:
1. Luôn dùng tiếng Việt chuẩn mực, thân thiện, truyền cảm hứng.
2. Công thức toán định dạng bằng KaTeX/LaTeX ($...$ hoặc $$...$$).
3. Chỉ dựa trên SGK Toán 6-7 Kết nối tri thức, không bịa đặt kiến thức sai.`;

    if (mode === "socratic") {
      systemInstruction += `\n[PHƯƠNG PHÁP SOCRATIC]: Không giải hộ bài toán hoặc đưa ra đáp án cuối ngay. Hãy hỏi gợi mở: 1) Nhắc lại giả thiết và kết luận; 2) Gợi ý định lý SGK cần dùng; 3) Hỏi một câu hỏi dẫn dắt nhỏ để học sinh tự làm bước tiếp theo.`;
    } else if (mode === "evaluate") {
      systemInstruction += `\n[ĐÁNH GIÁ ĐỊNH LÝ]: Đối chiếu câu trả lời của học sinh với định lý chuẩn: ${context?.standardAnswer || ""}. Đánh giá đúng ngữ nghĩa, kiểm tra xem có thiếu điều kiện cốt lõi nào không. Cho điểm (thang 1-10), lời khen ngợi và chỉ ra phần cần bổ sung.`;
    }

    const payload = {
      systemInstruction: {
        parts: [{ text: systemInstruction }]
      },
      contents: [
        {
          role: "user",
          parts: [{ text: prompt || "Xin chào!" }]
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
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    let replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!replyText) {
      replyText = "Thầy đã nhận được câu hỏi. Em hãy đọc kỹ giả thiết và thử xem định lý nào có thể áp dụng được nhé!";
    }

    return res.status(200).json({
      success: true,
      reply: replyText,
      model: modelName
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return res.status(200).json({
      success: true,
      reply: "Thầy AI Vui Học Toán luôn sẵn sàng hỗ trợ em! Hãy kiểm tra lại các giả thiết đề bài cho và xem có định lý nào liên quan không nhé.",
      isFallback: true
    });
  }
};
