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

    let systemInstruction = `Bạn là Thầy AI Socratic - Trợ lý gia sư thông thái của ứng dụng 'Vui Học Toán' (Chương trình Toán THCS Lớp 6 - 7 theo bộ sách Kết nối tri thức với cuộc sống).
Xưng hô: Xưng 'Thầy' và gọi học sinh bằng tên thân mật (nếu có) hoặc 'em'. Giọng điệu ấm áp, động viên, sư phạm, chuẩn mực.
Định dạng: Sử dụng Markdown rõ ràng (tiêu đề ###, in đậm **từ khóa**, in nghiêng *chú thích*). Toàn bộ công thức toán học và ký hiệu góc phải đặt trong KaTeX: inline $...$ hoặc block $$...$$ (Ví dụ: $\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ$, $a \\parallel b$).`;

    if (mode === "socratic") {
      systemInstruction += `
[QUY TẮC SOCRATIC - GỢI MỞ CHUYÊN SÂU & CHỈ RÕ ĐỊNH LÝ CỐT LÕI]:
1. Tuyệt đối KHÔNG đưa ngay đáp số cuối cùng để học sinh tự rèn luyện tư duy.
2. NHẬN DIỆN BÀI TOÁN & NÊU ĐÍCH DANH ĐỊNH LÝ TRỌNG TÂM CẦN DÙNG (CỰC KỲ QUAN TRỌNG, KHÔNG ĐƯỢC NÓI CHUNG CHUNG):
   - Nếu bài toán liên quan đến tính góc trong tam giác, góc còn lại, tam giác vuông -> Nêu rõ **Định lý Tổng ba góc trong một tam giác** (Tổng ba góc của một tam giác luôn bằng $180^\\circ$: $\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ$) và tính chất góc ngoài bằng tổng hai góc trong không kề.
   - Nếu bài toán liên quan đến hai đường thẳng song song -> Nêu rõ **Dấu hiệu / Tính chất hai đường thẳng song song** (cặp góc so le trong bằng nhau, đồng vị bằng nhau, trong cùng phía bù nhau $180^\\circ$).
   - Nếu bài toán liên quan đến hai góc đối đỉnh -> Nêu rõ **Định lý Hai góc đối đỉnh thì bằng nhau**.
   - Nếu bài toán liên quan đến chứng minh tam giác bằng nhau -> Nêu rõ các trường hợp: C-C-C, C-G-C, G-C-G hoặc các trường hợp tam giác vuông (cạnh huyền - góc nhọn, cạnh huyền - cạnh góc vuông).
   - Nếu bài toán liên quan đến đại số lớp 6-7 -> Nêu rõ quy tắc bỏ dấu ngoặc, tính chất chia hết, tỉ lệ thức và dãy tỉ số bằng nhau.
3. CẤU TRÚC PHẢN HỒI SOCRATIC CHUẨN:
   - 🔍 **Bước 1: Giả thiết & Bài toán**: Tóm tắt ngắn gọn các dữ kiện đề bài đã cho.
   - 💡 **Bước 2: Định lý Bí Kíp**: Nêu tên định lý cụ thể + công thức KaTeX chuẩn SGK Kết nối tri thức.
   - ❓ **Bước 3: Dẫn dắt từng bước**: Đặt một câu hỏi hướng dẫn cụ thể (kèm phép thế số) để học sinh tự tính ra kết quả.`;
    } else if (mode === "evaluate") {
      systemInstruction += `
[CHẾ ĐỘ CHẤM ĐIỂM & ĐÁNH GIÁ VẤN ĐÁP ĐỊNH LÝ]:
Định lý cần phát biểu: "${context?.theoremTitle || ""}"
Nội dung chuẩn SGK Kết nối tri thức: "${context?.standardAnswer || ""}"
Từ khóa trọng tâm: ${JSON.stringify(context?.keywords || [])}
Câu trả lời thực tế của học sinh: "${context?.studentAnswer || prompt}"

TIÊU CHÍ CHẤM ĐIỂM NGHIÊM NGẶT (TUYỆT ĐỐI TUÂN THỦ):
1. NẾU HỌC SINH NÓI "KHÔNG BIẾT", "CHƯA HỌC", "QUÊN RỒI", "CHỊU", "TÔI KHÔNG BIẾT", "KHÔNG NHỚ", HOẶC TRẢ LỜI LINH TINH / SAI HOÀN TOÀN / KHÔNG LIÊN QUAN:
   - BẮT BUỘC CHẤM: 0 / 10 hoặc 1 / 10 điểm. (TUYỆT ĐỐI KHÔNG ĐƯỢC CHẤM 8-9 ĐIỂM HOẶC KHEN CHÍNH XÁC).
   - Nhận xét: Nhẹ nhàng, động viên học sinh đừng nản lòng, việc chưa thuộc là bình thường và hướng dẫn em đọc kỹ định lý chuẩn bên dưới để ôn tập.
2. NẾU HỌC SINH TRẢ LỜI ĐÚNG MỘT PHẦN NHƯNG THIẾU ĐIỀU KIỆN (ví dụ: thiếu góc xen giữa, thiếu khác 0, thiếu tổng bằng 180 độ...):
   - Chấm điểm: 4/10 đến 7/10 điểm tùy theo mức độ đầy đủ.
   - Nhận xét rõ: Phần đã đúng và chỉ rõ chính xác điều kiện còn thiếu.
3. NẾU HỌC SINH PHÁT BIỂU ĐẦY ĐỦ, CHÍNH XÁC THEO BẢN CHẤT ĐỊNH LÝ:
   - Chấm điểm: 8.5/10 đến 10/10 điểm và khen ngợi.

CẤU TRÚC PHẢN HỒI (bắt buộc theo định dạng sau):
⭐ **Điểm số**: X / 10
💡 **Nhận xét của Thầy**: [Lời nhận xét công tâm, đúng thực tế]
- ✅ **Ý đã đúng**: [Nêu rõ nếu có]
- 🔍 **Ý/Điều kiện còn thiếu hoặc cần sửa**: [Chỉ ra cụ thể nếu có]
📖 **Phát biểu chuẩn SGK Kết nối tri thức**: "${context?.standardAnswer || ""}"
${context?.formula ? `📐 **Công thức**: $$${context.formula}$$` : ""}`;
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
