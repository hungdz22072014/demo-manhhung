// =================================================================
// VERCEL SERVERLESS FUNCTION - GEMINI AI CHAT & SOCRATIC MULTI-MODEL FALLBACK
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

  // Fallback đọc key.txt nếu deploy kèm file
  if (!apiKey) {
    try {
      const fs = require("fs");
      const path = require("path");
      const keyFile = path.join(__dirname, "..", "key.txt");
      if (fs.existsSync(keyFile)) {
        apiKey = fs.readFileSync(keyFile, "utf8").trim();
      }
    } catch (e) { }
  }

  try {
    const { prompt, mode, context } = req.body || {};
    const studentName = context?.studentName || "em";
    const grade = context?.grade || 7;

    let geminiSystemInstruction = `Bạn là "Thầy AI Socratic" - Trợ lý & Gia sư AI Toán học Thông Thái, Toàn Năng (Đồng hành cùng học sinh THCS lớp 6, 7 theo bộ sách Kết nối tri thức với cuộc sống và Toán học tổng quát).
Phong cách:
- Thân thiện, sư phạm, xưng là "Thầy" và gọi học sinh là "${studentName}".
- Sử dụng tiếng Việt chuẩn mực, công thức toán viết bằng ký hiệu KaTeX/LaTeX chuẩn ($...$ cho inline và $$...$$ cho khối công thức).
- Trả lời thông minh, chính xác, linh hoạt theo đúng bản chất câu hỏi:
  + Nếu học sinh yêu cầu TÍNH TOÁN CỤ THỂ (ví dụ: căn bậc n, lũy thừa, biểu thức số học, giá trị đại số...): Thầy PHẢI tính toán chính xác kết quả số học ra giá trị cụ thể, hiển thị công thức đẹp mắt, giải thích từng bước rõ ràng. Tuyệt đối không từ chối và không trả lời rập khuôn theo một khuôn mẫu không liên quan.
  + Nếu học sinh hỏi BÀI TẬP / HÌNH HỌC / ĐỊNH LÝ: Thầy gợi mở tư duy theo phương pháp Socratic, nêu rõ giả thiết, định lý liên quan và hướng dẫn từng bước để học sinh hiểu sâu bản chất.
  + Nếu học sinh hỏi BẤT KỲ CÂU HỎI NÀO KHÁC (kiến thức chung, mẹo tính nhanh, logic toán...): Thầy trả lời tường minh, sâu sắc, hữu ích và truyền cảm hứng học tập.`;

    if (mode === "socratic") {
      geminiSystemInstruction += `
[QUY TẮC SOCRATIC - GỢI MỞ CHUYÊN SÂU & CHỈ RÕ ĐỊNH LÝ CỐT LÕI]:
1. Tuyệt đối KHÔNG đưa ngay đáp số cuối cùng để học sinh tự rèn luyện tư duy.
2. NHẬN DIỆN BÀI TOÁN & NÊU ĐÍCH DANH ĐỊNH LÝ TRỌNG TÂM CẦN DÙNG:
   - Tính góc tam giác -> **Định lý Tổng ba góc trong một tam giác** ($180^\\circ$).
   - Hai đường thẳng song song -> **Dấu hiệu / Tính chất hai đường thẳng song song** (so le trong bằng nhau, đồng vị bằng nhau, trong cùng phía bù nhau).
   - Hai góc đối đỉnh -> **Định lý Hai góc đối đỉnh**.
   - Chứng minh tam giác bằng nhau -> Các trường hợp: c-c-c, c-g-c, g-c-g hoặc các trường hợp tam giác vuông.
   - Đại số lớp 6-7 -> Quy tắc dấu ngoặc, lũy thừa, tính chất chia hết, tỉ lệ thức và dãy tỉ số bằng nhau.
3. CẤU TRÚC PHẢN HỒI SOCRATIC CHUẨN:
   - 🔍 **Bước 1: Giả thiết & Bài toán**: Tóm tắt ngắn gọn các dữ kiện đề bài.
   - 💡 **Bước 2: Định lý Bí Kíp**: Nêu tên định lý cụ thể + công thức KaTeX.
   - ❓ **Bước 3: Dẫn dắt từng bước**: Đặt một câu hỏi hướng dẫn cụ thể để học sinh tự làm.`;
    } else if (mode === "evaluate") {
      geminiSystemInstruction += `
[CHẾ ĐỘ CHẤM ĐIỂM & ĐÁNH GIÁ VẤN ĐÁP ĐỊNH LÝ]:
Định lý: "${context?.theoremTitle || ""}"
Chuẩn SGK Kết nối tri thức: "${context?.standardAnswer || ""}"
Từ khóa trọng tâm: ${JSON.stringify(context?.keywords || [])}
Câu trả lời của học sinh: "${context?.studentAnswer || prompt}"

TIÊU CHÍ CHẤM ĐIỂM NGHIÊM NGẶT (TUYỆT ĐỐI TUÂN THỦ):
1. NẾU HỌC SINH NÓI "KHÔNG BIẾT", "CHƯA HỌC", "QUÊN RỒI", "CHỊU", "TÔI KHÔNG BIẾT", "KHÔNG NHỚ", HOẶC TRẢ LỜI LINH TINH / SAI HOÀN TOÀN:
   - BẮT BUỘC CHẤM: 0 / 10 hoặc 1 / 10 điểm.
   - Nhận xét nhẹ nhàng, động viên học sinh đừng nản lòng và hướng dẫn em đọc kỹ định lý chuẩn bên dưới để ôn tập.
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

    const geminiPayload = {
      contents: [
        {
          role: "user",
          parts: [{ text: `${geminiSystemInstruction}\n\n[CÂU HỎI HOẶC YÊU CẦU CỦA HỌC SINH]:\n${prompt || "Xin chào Thầy!"}` }]
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

    for (const modelName of PREFERRED_MODELS) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(geminiPayload)
        });

        const data = await response.json();
        if (data.error) {
          throw new Error(data.error.message || `Model ${modelName} error`);
        }

        const parts = data?.candidates?.[0]?.content?.parts;
        if (Array.isArray(parts)) {
          for (const p of parts) {
            if (p.text) replyText += p.text;
          }
        }

        if (replyText) {
          usedModel = modelName;
          break;
        }
      } catch (err) {
        lastError = err;
      }
    }

    if (!replyText) {
      throw lastError || new Error("All AI models failed");
    }

    return res.status(200).json({
      success: true,
      reply: replyText,
      model: usedModel
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
